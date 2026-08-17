import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS } from '../src/data/seedProducts.js';
import { Product, ConsultationRequest } from '../src/types.js';

let products: Product[] = [];
let inquiries: ConsultationRequest[] = [];

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/api/exchange-rates', async (req: Request, res: Response) => {
  try {
    const resExp = await fetch('https://open.er-api.com/v6/latest/USD');
    const data: any = await resExp.json();
    const rates = {
      USD: 1,
      KRW: data?.rates?.KRW || 1352.5,
      VND: data?.rates?.VND || 25450.0
    };
    const nowStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    res.json({ success: true, rates, lastUpdated: nowStr });
  } catch (err) {
    res.json({ success: true, rates: { USD: 1, KRW: 1352.5, VND: 25450.0 }, lastUpdated: '12:00' });
  }
});

app.get('/api/products', (req: Request, res: Response) => {
  res.json({ success: true, count: products.length, products });
});

app.get('/api/sync', (req: Request, res: Response) => {
  res.json({
    success: true,
    productsCount: products.length,
    products,
    inquiriesCount: inquiries.length,
    inquiries
  });
});

app.post('/api/products/sync', (req: Request, res: Response) => {
  try {
    const { products: newProducts } = req.body;
    if (Array.isArray(newProducts)) {
      products = newProducts;
      res.json({ success: true, count: products.length, products });
    } else {
      res.status(400).json({ success: false, error: 'products must be an array' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/upload-images', (req: Request, res: Response) => {
  try {
    const { images } = req.body;
    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ success: false, error: 'images array required' });
    }
    // In serverless environment without writable disk, return compressed base64 / data URLs directly
    res.json({
      success: true,
      count: images.length,
      urls: images
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/delete-image', (req: Request, res: Response) => {
  res.json({ success: true });
});

app.post('/api/products/clear', (req: Request, res: Response) => {
  products = [];
  res.json({ success: true, count: 0, products: [] });
});

app.post('/api/products/clear-photos', (req: Request, res: Response) => {
  products = products.map(p => ({
    ...p,
    imageUrl: '',
    additionalImages: []
  }));
  res.json({ success: true, count: products.length, products });
});

app.post('/api/products', (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      ...req.body,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    res.json({ success: true, product: newProduct });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  res.json({ success: true, product: products[index] });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== id);
  res.json({ success: true, message: 'Product deleted' });
});

app.post('/api/products/reset', (req: Request, res: Response) => {
  products = [];
  res.json({ success: true, products: [] });
});

app.get('/api/inquiries', (req: Request, res: Response) => {
  res.json({ success: true, inquiries });
});

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

app.post('/api/ai-consult', async (req: Request, res: Response) => {
  const { prompt, userContext } = req.body;
  if (!prompt) return res.status(400).json({ success: false, error: 'Prompt required' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.json({
      success: true,
      reply: `안녕하세요! 신차오투어 베트남 맞춤 여행 AI 상담원입니다. 😊\n\n문의하신 내용: "${prompt}"\n\n저희 신차오투어 실시간 상담원(010-5365-6019 또는 카카오톡 '신차오투어')을 통해 1:1 맞춤 견적 및 예약을 받아보실 수 있습니다!`
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `너는 신차오투어 여행사의 1:1 베트남 여행 AI 상담원이다.\n\n사용자 질문:\n${prompt}\n\n사용자 맥락:\n${JSON.stringify(userContext || {})}` }] }
      ]
    });
    res.json({ success: true, reply: response.text });
  } catch (err) {
    res.json({ success: true, reply: '신차오투어 실시간 카카오톡 상담을 이용해 주세요.' });
  }
});

export default app;
