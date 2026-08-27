import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS, SAMPLE_PRODUCTS } from './src/data/seedProducts.js';
import { Product, ConsultationRequest, VisitorLog, DailyVisitorStat, AnalyticsSummary } from './src/types.js';
import { COMPANY_INFO } from './src/data/companyInfo.js';
import { INITIAL_REVIEWS } from './src/data/reviews.js';

// Persisted stores
const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'stored_products.json');
const PRODUCTS_DATA_DIR_PATH = path.join(process.cwd(), 'src', 'data', 'stored_products.json');
const PRODUCTS_BACKUP_PATH = path.join(process.cwd(), 'stored_products.backup.json');
const INQUIRIES_FILE_PATH = path.join(process.cwd(), 'stored_inquiries.json');
const REVIEWS_FILE_PATH = path.join(process.cwd(), 'stored_reviews.json');
const SETTINGS_FILE_PATH = path.join(process.cwd(), 'stored_settings.json');
const ANALYTICS_FILE_PATH = path.join(process.cwd(), 'stored_analytics.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  } catch (e) {
    console.warn('Could not create uploads directory:', e);
  }
}

function sanitizeProduct(p: Product): Product {
  if (!p) return p;
  const img = p.imageUrl || '';
  const cleanSubs = (p.additionalImages || []).filter(sub => Boolean(sub) && sub !== 'VILLA_PHOTO_DATA' && sub !== 'TEST_IMG');
  const cleanMain = (img === 'VILLA_PHOTO_DATA' || img === 'TEST_IMG') ? '' : img;

  return {
    ...p,
    imageUrl: cleanMain,
    additionalImages: cleanSubs
  };
}

function loadStoredProducts(): Product[] {
  // 1. Try root stored_products.json
  try {
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileData = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        console.log(`[Server] Loaded ${parsed.length} products from stored_products.json`);
        return parsed.map((p) => sanitizeProduct(p));
      }
    }
  } catch (err) {
    console.warn('[Server] Failed to read stored_products.json:', err);
  }

  // 2. Try src/data/stored_products.json
  try {
    if (fs.existsSync(PRODUCTS_DATA_DIR_PATH)) {
      const fileData = fs.readFileSync(PRODUCTS_DATA_DIR_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        console.log(`[Server] Loaded ${parsed.length} products from src/data/stored_products.json`);
        return parsed.map((p) => sanitizeProduct(p));
      }
    }
  } catch (err) {
    console.warn('[Server] Failed to read src/data/stored_products.json:', err);
  }

  // 3. Try backup file
  try {
    if (fs.existsSync(PRODUCTS_BACKUP_PATH)) {
      const backupData = fs.readFileSync(PRODUCTS_BACKUP_PATH, 'utf-8');
      const parsedBackup = JSON.parse(backupData);
      if (Array.isArray(parsedBackup)) {
        console.log(`[Server] Restored ${parsedBackup.length} products from backup`);
        return parsedBackup.map((p) => sanitizeProduct(p));
      }
    }
  } catch (bErr) {
    console.warn('[Server] Backup read also failed:', bErr);
  }

  if (SAMPLE_PRODUCTS && SAMPLE_PRODUCTS.length > 0) {
    console.log(`[Server] Initializing with default sample catalog (${SAMPLE_PRODUCTS.length} products)`);
    return SAMPLE_PRODUCTS.map((p) => sanitizeProduct(p));
  }

  return [];
}

function saveStoredProducts(prods: Product[]) {
  try {
    const dataStr = JSON.stringify(prods, null, 2);
    fs.writeFileSync(PRODUCTS_FILE_PATH, dataStr, 'utf-8');
    try {
      fs.writeFileSync(PRODUCTS_DATA_DIR_PATH, dataStr, 'utf-8');
    } catch (e) {
      // directory might not exist in prod
    }
    fs.writeFileSync(PRODUCTS_BACKUP_PATH, dataStr, 'utf-8');
    console.log(`[Server] Persisted ${prods.length} products to stored_products.json & backup`);
  } catch (err) {
    console.error('[Server] Failed to save products to stored_products.json:', err);
  }
}

function loadStoredInquiries(): ConsultationRequest[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE_PATH)) {
      const fileData = fs.readFileSync(INQUIRIES_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Server] Failed to read stored_inquiries.json:', err);
  }
  return [];
}

function saveStoredInquiries(inqs: ConsultationRequest[]) {
  try {
    const dataStr = JSON.stringify(inqs, null, 2);
    fs.writeFileSync(INQUIRIES_FILE_PATH, dataStr, 'utf-8');
  } catch (err) {
    console.error('[Server] Failed to save inquiries:', err);
  }
}

function loadStoredReviews(): any[] {
  try {
    if (fs.existsSync(REVIEWS_FILE_PATH)) {
      const fileData = fs.readFileSync(REVIEWS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return INITIAL_REVIEWS;
}

function saveStoredReviews(reviews: any[]) {
  try {
    fs.writeFileSync(REVIEWS_FILE_PATH, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (e) {
    console.error('[Server] Failed to save reviews:', e);
  }
}

function loadStoredSettings(): any {
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const fileData = fs.readFileSync(SETTINGS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    // ignore
  }
  return COMPANY_INFO;
}

function saveStoredSettings(settings: any) {
  try {
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (e) {
    console.error('[Server] Failed to save settings:', e);
  }
}

interface StoredAnalytics {
  dailyStats: Record<string, DailyVisitorStat>;
  recentLogs: VisitorLog[];
  todaySessionIds: Record<string, string[]>;
  deviceCounts: { mobile: number; desktop: number; tablet: number };
  referrerCounts: Record<string, number>;
  pageViews: Record<string, number>;
  productViews: Record<string, { title: string; views: number }>;
}

function getInitialAnalytics(): StoredAnalytics {
  return {
    dailyStats: {},
    recentLogs: [],
    todaySessionIds: {},
    deviceCounts: { mobile: 0, desktop: 0, tablet: 0 },
    referrerCounts: {},
    pageViews: {},
    productViews: {}
  };
}

function loadStoredAnalytics(): StoredAnalytics {
  try {
    if (fs.existsSync(ANALYTICS_FILE_PATH)) {
      const fileData = fs.readFileSync(ANALYTICS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (parsed && typeof parsed === 'object' && parsed.dailyStats) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[Server] Failed to read stored_analytics.json:', e);
  }
  return getInitialAnalytics();
}

function saveStoredAnalytics(data: StoredAnalytics) {
  try {
    fs.writeFileSync(ANALYTICS_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('[Server] Failed to save analytics:', e);
  }
}

function getKSTDateInfo(d = new Date()): { dateStr: string; hour: number; yearMonth: string } {
  try {
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      hour12: false
    });
    const parts = formatter.formatToParts(d);
    const y = parts.find(p => p.type === 'year')?.value || '2026';
    const m = parts.find(p => p.type === 'month')?.value || '01';
    const day = parts.find(p => p.type === 'day')?.value || '01';
    const h = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    return { dateStr: `${y}-${m}-${day}`, hour: h, yearMonth: `${y}-${m}` };
  } catch (e) {
    const iso = d.toISOString();
    return { dateStr: iso.substring(0, 10), hour: d.getUTCHours(), yearMonth: iso.substring(0, 7) };
  }
}

let products: Product[] = loadStoredProducts();
let inquiries: ConsultationRequest[] = loadStoredInquiries();
let reviews: any[] = loadStoredReviews();
let siteSettings: any = loadStoredSettings();
let analyticsData: StoredAnalytics = loadStoredAnalytics();
let lastDataSyncTimestamp = Date.now();

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
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  // Serve static uploaded images
  app.use('/uploads', express.static(UPLOADS_DIR));

  // 0. Batch Upload Images
  app.post('/api/upload-images', (req: Request, res: Response) => {
    try {
      const { images } = req.body;
      if (!Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ success: false, error: 'No images provided' });
      }

      const savedUrls: string[] = [];
      const timestamp = Date.now();

      images.forEach((item: any, idx: number) => {
        const rawData = typeof item === 'string' ? item : item.dataUrl;
        if (!rawData) return;

        if (rawData.startsWith('http://') || rawData.startsWith('https://') || rawData.startsWith('/uploads/')) {
          savedUrls.push(rawData);
          return;
        }

        const matches = rawData.match(/^data:image\/([a-zA-Z0-9\+\-\.]+);base64,(.+)$/is);
        if (!matches || matches.length < 3) {
          savedUrls.push(rawData);
          return;
        }

        let ext = matches[1].toLowerCase().replace('jpeg', 'jpg');
        if (ext === 'svg+xml') ext = 'svg';
        if (!['jpg', 'png', 'webp', 'gif', 'svg'].includes(ext)) ext = 'jpg';

        const buffer = Buffer.from(matches[2].trim(), 'base64');
        const filename = `photo_${timestamp}_${idx}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const targetPath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(targetPath, buffer);
        savedUrls.push(`/uploads/${filename}`);
      });

      res.json({
        success: true,
        count: savedUrls.length,
        urls: savedUrls
      });
    } catch (err: any) {
      console.error('[Server] Failed to upload images:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 0-B. Delete image
  app.post('/api/delete-image', (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      if (url && typeof url === 'string' && url.startsWith('/uploads/')) {
        const filename = path.basename(url);
        const filePath = path.join(UPLOADS_DIR, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // 0-C. Live Exchange Rates
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
    res.json({ success: true, count: products.length, products, lastUpdated: lastDataSyncTimestamp });
  });

  // 1-B. Unified Cross-Device Sync Endpoint (PC ↔ Mobile)
  app.get('/api/sync', (req: Request, res: Response) => {
    res.json({
      success: true,
      timestamp: lastDataSyncTimestamp,
      productsCount: products.length,
      products,
      inquiriesCount: inquiries.length,
      inquiries
    });
  });

  // 2. Add Product
  app.post('/api/products', (req: Request, res: Response) => {
    try {
      const newProduct: Product = {
        ...req.body,
        id: req.body.id || `prod-${Date.now()}`,
        createdAt: req.body.createdAt || new Date().toISOString()
      };
      products = [newProduct, ...products.filter(p => p.id !== newProduct.id)];
      saveStoredProducts(products);
      lastDataSyncTimestamp = Date.now();
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
    lastDataSyncTimestamp = Date.now();
    res.json({ success: true, product: products[index] });
  });

  // 4. Delete Product
  app.delete('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== id);
    saveStoredProducts(products);
    lastDataSyncTimestamp = Date.now();
    res.json({ success: true, message: 'Product deleted' });
  });

  // 4-B. Clear All Products
  app.post('/api/products/clear', (req: Request, res: Response) => {
    products = [];
    saveStoredProducts([]);
    lastDataSyncTimestamp = Date.now();
    res.json({ success: true, count: 0, products: [] });
  });

  // 4-C. Sync Products (Full Array Replacement/Save)
  app.post('/api/products/sync', (req: Request, res: Response) => {
    try {
      const { products: newProducts } = req.body;
      if (Array.isArray(newProducts)) {
        products = newProducts;
        saveStoredProducts(products);
        lastDataSyncTimestamp = Date.now();
        res.json({ success: true, count: products.length, products });
      } else {
        res.status(400).json({ success: false, error: 'products must be an array' });
      }
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4-D. Clear All Photos (Retains product descriptions, zeroes images)
  app.post('/api/products/clear-photos', (req: Request, res: Response) => {
    products = products.map(p => ({
      ...p,
      imageUrl: '',
      additionalImages: []
    }));
    saveStoredProducts(products);
    lastDataSyncTimestamp = Date.now();
    res.json({ success: true, count: products.length, products });
  });

  // 5. Bulk Reset to Initial Seed Data (Admin triggered only)
  app.post('/api/products/reset', (req: Request, res: Response) => {
    products = [...SAMPLE_PRODUCTS];
    saveStoredProducts(products);
    lastDataSyncTimestamp = Date.now();
    res.json({ success: true, products });
  });

  // 7. Get Inquiries
  app.get('/api/inquiries', (req: Request, res: Response) => {
    res.json({ success: true, inquiries });
  });

  // 8. Submit Inquiry
  app.post('/api/inquiries', (req: Request, res: Response) => {
    try {
      const newInquiry: ConsultationRequest = {
        ...req.body,
        id: req.body.id || `inq-${Date.now()}`,
        status: 'pending',
        createdAt: req.body.createdAt || new Date().toISOString()
      };
      inquiries.unshift(newInquiry);
      saveStoredInquiries(inquiries);
      lastDataSyncTimestamp = Date.now();
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
    saveStoredInquiries(inquiries);
    lastDataSyncTimestamp = Date.now();
    res.json({ success: true, inquiry: inq });
  });

  // 9-B. Delete Inquiry
  app.delete('/api/inquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    inquiries = inquiries.filter(i => i.id !== id);
    saveStoredInquiries(inquiries);
    res.json({ success: true });
  });

  // 10. Reviews API
  app.get('/api/reviews', (req: Request, res: Response) => {
    res.json({ success: true, reviews });
  });

  app.post('/api/reviews', (req: Request, res: Response) => {
    const newRev = { ...req.body, id: req.body.id || `rev-${Date.now()}` };
    reviews.unshift(newRev);
    saveStoredReviews(reviews);
    res.json({ success: true, review: newRev });
  });

  app.delete('/api/reviews/:id', (req: Request, res: Response) => {
    reviews = reviews.filter(r => r.id !== req.params.id);
    saveStoredReviews(reviews);
    res.json({ success: true });
  });

  // 11. Settings API
  app.get('/api/settings', (req: Request, res: Response) => {
    res.json({ success: true, settings: siteSettings });
  });

  app.post('/api/settings', (req: Request, res: Response) => {
    siteSettings = { ...siteSettings, ...req.body.settings };
    saveStoredSettings(siteSettings);
    res.json({ success: true, settings: siteSettings });
  });

  // 12. AI Travel Assistant (Gemini)
  app.post('/api/ai-consult', async (req: Request, res: Response) => {
    const { prompt, userContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    try {
      const ai = getGenAIClient();
      if (!ai) {
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

  // 13. Visitor Analytics - Record Hit
  app.post('/api/analytics/record', (req: Request, res: Response) => {
    try {
      const {
        action = 'page_view',
        page = '홈',
        productId,
        productTitle,
        device = 'desktop',
        browser = 'Chrome',
        os = 'Windows',
        referrer = '직접 접속',
        sessionId = `ses-${Date.now()}`
      } = req.body;

      const now = new Date();
      const { dateStr, hour } = getKSTDateInfo(now);

      // Client IP (masked for privacy)
      const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const ip = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1';

      const logEntry: VisitorLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: now.toISOString(),
        date: dateStr,
        hour,
        page,
        action,
        productId,
        productTitle,
        device: device === 'mobile' || device === 'tablet' ? device : 'desktop',
        browser,
        os,
        referrer,
        sessionId,
        ip: ip.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, '$1.$2.***.$4')
      };

      // 1. Update Daily Stats
      if (!analyticsData.dailyStats[dateStr]) {
        analyticsData.dailyStats[dateStr] = {
          date: dateStr,
          uv: 0,
          pv: 0,
          kakaoClicks: 0,
          phoneClicks: 0,
          inquiries: 0
        };
      }
      const dayStat = analyticsData.dailyStats[dateStr];

      // Check UV (Unique session for the day)
      if (!analyticsData.todaySessionIds[dateStr]) {
        analyticsData.todaySessionIds[dateStr] = [];
      }
      if (!analyticsData.todaySessionIds[dateStr].includes(sessionId)) {
        analyticsData.todaySessionIds[dateStr].push(sessionId);
        dayStat.uv += 1;
      }

      if (action === 'page_view' || action === 'product_view' || action === 'tab_change') {
        dayStat.pv += 1;
      } else if (action === 'kakao_click') {
        dayStat.kakaoClicks += 1;
      } else if (action === 'phone_click') {
        dayStat.phoneClicks += 1;
      } else if (action === 'inquiry_submit') {
        dayStat.inquiries += 1;
      }

      // 2. Device Breakdown
      const devKey = (device === 'mobile' || device === 'tablet' ? device : 'desktop') as 'mobile' | 'desktop' | 'tablet';
      analyticsData.deviceCounts[devKey] = (analyticsData.deviceCounts[devKey] || 0) + 1;

      // 3. Referrer Breakdown
      const refKey = referrer || '직접 접속';
      analyticsData.referrerCounts[refKey] = (analyticsData.referrerCounts[refKey] || 0) + 1;

      // 4. Page Views
      if (page) {
        analyticsData.pageViews[page] = (analyticsData.pageViews[page] || 0) + 1;
      }

      // 5. Product Views
      if (productId && productTitle) {
        if (!analyticsData.productViews[productId]) {
          analyticsData.productViews[productId] = { title: productTitle, views: 0 };
        }
        analyticsData.productViews[productId].views += 1;
      }

      // 6. Append to Recent Logs (keep last 300)
      analyticsData.recentLogs.unshift(logEntry);
      if (analyticsData.recentLogs.length > 300) {
        analyticsData.recentLogs = analyticsData.recentLogs.slice(0, 300);
      }

      // Keep only last 60 days of session IDs to save memory
      const allDateKeys = Object.keys(analyticsData.todaySessionIds);
      if (allDateKeys.length > 60) {
        allDateKeys.slice(0, allDateKeys.length - 60).forEach(oldKey => {
          delete analyticsData.todaySessionIds[oldKey];
        });
      }

      saveStoredAnalytics(analyticsData);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // 14. Visitor Analytics - Get Summary Dashboard Data
  app.get('/api/analytics/stats', (req: Request, res: Response) => {
    try {
      const now = new Date();
      const { dateStr: todayStr, yearMonth: thisMonthStr } = getKSTDateInfo(now);
      
      const yesterday = new Date(now.getTime() - 86400000);
      const { dateStr: yesterdayStr } = getKSTDateInfo(yesterday);

      const todayStat = analyticsData.dailyStats[todayStr] || { date: todayStr, uv: 0, pv: 0, kakaoClicks: 0, phoneClicks: 0, inquiries: 0 };
      const yesterdayStat = analyticsData.dailyStats[yesterdayStr] || { date: yesterdayStr, uv: 0, pv: 0, kakaoClicks: 0, phoneClicks: 0, inquiries: 0 };

      // Calculate totals
      let totalUV = 0;
      let totalPV = 0;
      let totalKakaoClicks = 0;
      let totalPhoneClicks = 0;
      let totalInquiries = 0;
      let thisMonthUV = 0;

      Object.entries(analyticsData.dailyStats).forEach(([dStr, stat]) => {
        totalUV += stat.uv || 0;
        totalPV += stat.pv || 0;
        totalKakaoClicks += stat.kakaoClicks || 0;
        totalPhoneClicks += stat.phoneClicks || 0;
        totalInquiries += stat.inquiries || 0;

        if (dStr.startsWith(thisMonthStr)) {
          thisMonthUV += stat.uv || 0;
        }
      });

      // Today's hourly distribution (0 - 23)
      const hourlyDistribution = new Array(24).fill(0);
      analyticsData.recentLogs.forEach(log => {
        if (log.date === todayStr && log.hour >= 0 && log.hour < 24) {
          hourlyDistribution[log.hour] += 1;
        }
      });

      // Sort daily stats (last 30 days)
      const dailyStatsArray: DailyVisitorStat[] = Object.values(analyticsData.dailyStats)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-30);

      // Top 10 popular pages
      const popularPages = Object.entries(analyticsData.pageViews)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      // Top 10 popular products
      const popularProducts = Object.entries(analyticsData.productViews)
        .map(([productId, info]) => ({ productId, title: info.title, views: info.views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      const summary: AnalyticsSummary = {
        todayUV: todayStat.uv,
        todayPV: todayStat.pv,
        yesterdayUV: yesterdayStat.uv,
        yesterdayPV: yesterdayStat.pv,
        thisMonthUV: thisMonthUV || todayStat.uv,
        totalUV: Math.max(totalUV, todayStat.uv),
        totalPV: Math.max(totalPV, todayStat.pv),
        totalKakaoClicks,
        totalPhoneClicks,
        totalInquiries,
        dailyStats: dailyStatsArray,
        hourlyDistribution,
        deviceBreakdown: analyticsData.deviceCounts,
        referrerBreakdown: analyticsData.referrerCounts,
        popularPages,
        popularProducts,
        recentLogs: analyticsData.recentLogs.slice(0, 50)
      };

      res.json({ success: true, summary });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 15. Reset Analytics (Admin)
  app.post('/api/analytics/reset', (req: Request, res: Response) => {
    analyticsData = getInitialAnalytics();
    saveStoredAnalytics(analyticsData);
    res.json({ success: true, message: 'Analytics reset successfully' });
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
