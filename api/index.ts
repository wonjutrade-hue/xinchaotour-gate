import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS } from '../src/data/seedProducts.js';
import { Product, ConsultationRequest, VisitorLog, DailyVisitorStat, AnalyticsSummary } from '../src/types.js';

let products: Product[] = [];
let inquiries: ConsultationRequest[] = [];
let analyticsLogs: VisitorLog[] = [];
let analyticsDailyStats: Record<string, DailyVisitorStat> = {};
let analyticsSessions: Record<string, string[]> = {};
let analyticsDevices = { mobile: 0, desktop: 0, tablet: 0 };
let analyticsReferrers: Record<string, number> = {};
let analyticsPageViews: Record<string, number> = {};
let analyticsProductViews: Record<string, { title: string; views: number }> = {};

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
    const dateStr = now.toISOString().substring(0, 10);
    const hour = now.getHours();

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
      sessionId
    };

    if (!analyticsDailyStats[dateStr]) {
      analyticsDailyStats[dateStr] = { date: dateStr, uv: 0, pv: 0, kakaoClicks: 0, phoneClicks: 0, inquiries: 0 };
    }
    const dayStat = analyticsDailyStats[dateStr];

    if (!analyticsSessions[dateStr]) {
      analyticsSessions[dateStr] = [];
    }
    if (!analyticsSessions[dateStr].includes(sessionId)) {
      analyticsSessions[dateStr].push(sessionId);
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

    const devKey = (device === 'mobile' || device === 'tablet' ? device : 'desktop') as 'mobile' | 'desktop' | 'tablet';
    analyticsDevices[devKey] = (analyticsDevices[devKey] || 0) + 1;

    analyticsReferrers[referrer || '직접 접속'] = (analyticsReferrers[referrer || '직접 접속'] || 0) + 1;
    if (page) analyticsPageViews[page] = (analyticsPageViews[page] || 0) + 1;
    if (productId && productTitle) {
      if (!analyticsProductViews[productId]) analyticsProductViews[productId] = { title: productTitle, views: 0 };
      analyticsProductViews[productId].views += 1;
    }

    analyticsLogs.unshift(logEntry);
    if (analyticsLogs.length > 300) analyticsLogs = analyticsLogs.slice(0, 300);

    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.get('/api/analytics/stats', (req: Request, res: Response) => {
  try {
    const now = new Date();
    const todayStr = now.toISOString().substring(0, 10);
    const thisMonthStr = now.toISOString().substring(0, 7);
    const yesterday = new Date(now.getTime() - 86400000);
    const yesterdayStr = yesterday.toISOString().substring(0, 10);

    const todayStat = analyticsDailyStats[todayStr] || { date: todayStr, uv: 0, pv: 0, kakaoClicks: 0, phoneClicks: 0, inquiries: 0 };
    const yesterdayStat = analyticsDailyStats[yesterdayStr] || { date: yesterdayStr, uv: 0, pv: 0, kakaoClicks: 0, phoneClicks: 0, inquiries: 0 };

    let totalUV = 0, totalPV = 0, totalKakao = 0, totalPhone = 0, totalInq = 0, thisMonthUV = 0;
    Object.entries(analyticsDailyStats).forEach(([dStr, stat]) => {
      totalUV += stat.uv || 0;
      totalPV += stat.pv || 0;
      totalKakao += stat.kakaoClicks || 0;
      totalPhone += stat.phoneClicks || 0;
      totalInq += stat.inquiries || 0;
      if (dStr.startsWith(thisMonthStr)) thisMonthUV += stat.uv || 0;
    });

    const hourlyDistribution = new Array(24).fill(0);
    analyticsLogs.forEach(log => {
      if (log.date === todayStr && log.hour >= 0 && log.hour < 24) {
        hourlyDistribution[log.hour] += 1;
      }
    });

    const dailyStatsArray: DailyVisitorStat[] = Object.values(analyticsDailyStats)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30);

    const popularPages = Object.entries(analyticsPageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const popularProducts = Object.entries(analyticsProductViews)
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
      totalKakaoClicks: totalKakao,
      totalPhoneClicks: totalPhone,
      totalInquiries: totalInq,
      dailyStats: dailyStatsArray,
      hourlyDistribution,
      deviceBreakdown: analyticsDevices,
      referrerBreakdown: analyticsReferrers,
      popularPages,
      popularProducts,
      recentLogs: analyticsLogs.slice(0, 50)
    };

    res.json({ success: true, summary });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/analytics/reset', (req: Request, res: Response) => {
  analyticsLogs = [];
  analyticsDailyStats = {};
  analyticsSessions = {};
  analyticsDevices = { mobile: 0, desktop: 0, tablet: 0 };
  analyticsReferrers = {};
  analyticsPageViews = {};
  analyticsProductViews = {};
  res.json({ success: true });
});

export default app;
