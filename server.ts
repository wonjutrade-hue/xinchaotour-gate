import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS } from './src/data/seedProducts.js';
import { Product, ConsultationRequest } from './src/types.js';

// In-memory or persisted store for products and inquiries
const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'stored_products.json');

function loadStoredProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileData = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log(`[Server] Loaded ${parsed.length} products from stored_products.json`);
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Server] Failed to read stored_products.json, using INITIAL_PRODUCTS:', err);
  }
  saveStoredProducts(INITIAL_PRODUCTS);
  return [...INITIAL_PRODUCTS];
}

function saveStoredProducts(prods: Product[]) {
  try {
    const dir = path.dirname(PRODUCTS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(prods, null, 2), 'utf-8');
    console.log(`[Server] Persisted ${prods.length} products to stored_products.json`);
  } catch (err) {
    console.error('[Server] Failed to save products to stored_products.json:', err);
  }
}

let products: Product[] = loadStoredProducts();
let inquiries: ConsultationRequest[] = [
  {
    id: 'inq-101',
    userName: '김철수',
    userPhone: '010-1234-5678',
    kakaoId: 'chulsoo_kr',
    productId: 'prod-101',
    productTitle: '[북부/하롱베이] 하노이 & 하롱베이 5성급 럭셔리 크루즈 3박 5일',
    regionPreference: '북부',
    categoryPreference: '추천패키지',
    startDate: '2026-09-15',
    travelerCount: { adult: 2, child: 1 },
    message: '하롱베이 크루즈 객실 오션뷰 업그레이드 및 7세 아동 침대 추가 문의드립니다.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'inq-102',
    userName: '박지영',
    userPhone: '010-9876-5432',
    kakaoId: 'jiyoung_vietnam',
    productId: 'prod-104',
    productTitle: '[골프투어/중부] 다낭 BRG & 바나힐 명문 CC 럭셔리 골프 3박 5일 (54홀)',
    regionPreference: '중부',
    categoryPreference: '골프투어',
    startDate: '2026-10-02',
    travelerCount: { adult: 4, child: 0 },
    message: '성인 4인 골프 36홀 티타임 오전 7시대로 배정 가능한지 확인 부탁드립니다.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

// Lazy Gemini AI setup
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Live Exchange Rates Cache
let cachedRates = {
  USD: 1,
  KRW: 1352.5,
  VND: 25450.0
};
let lastRateFetch = 0;

async function fetchLiveExchangeRates() {
  const now = Date.now();
  // Refresh cache if older than 10 minutes
  if (now - lastRateFetch < 600000 && lastRateFetch > 0) {
    return cachedRates;
  }
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data: any = await res.json();
    if (data && data.rates) {
      cachedRates = {
        USD: 1,
        KRW: data.rates.KRW || 1352.5,
        VND: data.rates.VND || 25450.0
      };
      lastRateFetch = now;
    }
  } catch (err) {
    console.warn('Failed to fetch external exchange rate API, using cached rates');
  }
  return cachedRates;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes

  // 0. Live Exchange Rates
  app.get('/api/exchange-rates', async (req: Request, res: Response) => {
    const rates = await fetchLiveExchangeRates();
    const nowStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    res.json({
      success: true,
      rates,
      lastUpdated: nowStr
    });
  });

  // 1. Get Products
  app.get('/api/products', (req: Request, res: Response) => {
    res.json({ success: true, products });
  });

  // 2. Add Product
  app.post('/api/products', (req: Request, res: Response) => {
    try {
      const newProduct: Product = {
        ...req.body,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      products.unshift(newProduct);
      saveStoredProducts(products);
      res.json({ success: true, product: newProduct });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Update Product
  app.put('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    products[index] = { ...products[index], ...req.body };
    saveStoredProducts(products);
    res.json({ success: true, product: products[index] });
  });

  // 4. Delete Product
  app.delete('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== id);
    saveStoredProducts(products);
    res.json({ success: true, message: 'Product deleted' });
  });

  // 5. Bulk Reset to Initial Seed Data
  app.post('/api/products/reset', (req: Request, res: Response) => {
    products = [...INITIAL_PRODUCTS];
    saveStoredProducts(products);
    res.json({ success: true, products });
  });

  // 6. Bulk Import Products (JSON)
  app.post('/api/products/import', (req: Request, res: Response) => {
    try {
      const { items, replaceExisting } = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ success: false, error: 'Invalid payload: items must be an array' });
      }

      if (replaceExisting) {
        products = items.map((item, idx) => ({
          ...item,
          id: item.id || `prod-imp-${Date.now()}-${idx}`
        }));
      } else {
        const formatted = items.map((item, idx) => ({
          ...item,
          id: item.id || `prod-imp-${Date.now()}-${idx}`
        }));
        products = [...formatted, ...products];
      }

      saveStoredProducts(products);
      res.json({ success: true, productsCount: products.length, products });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. Get Inquiries / Consultation Requests
  app.get('/api/inquiries', (req: Request, res: Response) => {
    res.json({ success: true, inquiries });
  });

  // 8. Submit Inquiry
  app.post('/api/inquiries', (req: Request, res: Response) => {
    try {
      const newInquiry: ConsultationRequest = {
        ...req.body,
        id: `inq-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      inquiries.unshift(newInquiry);
      res.json({ success: true, inquiry: newInquiry });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 9. Update Inquiry Status
  app.put('/api/inquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const inq = inquiries.find(i => i.id === id);
    if (!inq) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    inq.status = status;
    res.json({ success: true, inquiry: inq });
  });

  // 10. AI Travel Assistant (Gemini)
  app.post('/api/ai-consult', async (req: Request, res: Response) => {
    const { prompt, userContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    try {
      const ai = getGenAIClient();
      if (!ai) {
        // Smart fallback rule-based response if GEMINI_API_KEY is not set
        return res.json({
          success: true,
          reply: `안녕하세요! 신차오투어 베트남 맞춤 여행 AI 상담원입니다. 😊\n\n문의하신 내용: "${prompt}"\n\n[추천 베트남 여행 정보]\n• **북부 (하노이/하롱베이/사파)**:웅장한 자연 경관, 5성급 럭셔리 크루즈, 사파 산악 트레킹 추천!\n• **중부 (다낭/호이안/나트랑)**: 가족 휴양, 미케비치, 호이안 등불 야경, 명문 BRG 54홀 골프투어 최고 인기!\n• **남부 (푸꾸옥/달랏/호치민)**: 에메랄드 빛 독채 풀빌라 휴양, 6성급 리젠트 리조트, 시원한 달랏 고원 골프!\n\n저희 신차오투어 실시간 상담원(010-5365-6019 또는 카카오톡 '신차오투어')을 통해 1:1 맞춤 견적 및 단독 전용 차량 예약을 바로 받아보실 수 있습니다!`
        });
      }

      const systemInstruction = `너는 대한민국 최고의 베트남 여행 전문 여행사 '신차오투어(Xin Chao Tour)'의 1:1 베트남 여행 컨시어지 AI 에이전트이다.
고객의 여행 목적(가족, 연인, 골프, 자유여행, 풀빌라 휴양), 지역(북부: 하노이/하롱베이/사파, 중부: 다낭/호이안/나트랑, 남부: 푸꾸옥/달랏/호치민), 기간, 예산에 맞춰 최고로 친절하고 상세하게 한국어로 안내하라.
답변할 때 신차오투어만의 강점(100% 한국인 가이드, 단독 차량, 거품 없는 최저가, 24시간 현지 긴급 지원)을 매력적으로 어필하고, 추천 패키지나 풀빌라/골프 상품을 구체적으로 권유하라.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\n[사용자 질문]\n${prompt}\n\n[사용자 맥락]: ${JSON.stringify(userContext || {})}` }] }
        ]
      });

      res.json({
        success: true,
        reply: response.text || '죄송합니다. 잠시 후 다시 문의해주시거나 실시간 카카오톡 상담을 이용해 주세요.'
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        success: false,
        reply: '안녕하세요! 신차오투어 베트남 전담 상담원입니다. 문의사항을 카카오톡 실시간 상담 또는 상담 신청 폼으로 남겨주시면 즉시 1:1 맞춤 견적을 도와드리겠습니다!'
      });
    }
  });

  // Vite Middleware in Dev, Static serving in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Xin Chao Tour Server listening on http://localhost:${PORT}`);
  });
}

startServer();
