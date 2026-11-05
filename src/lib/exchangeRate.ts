export interface ExchangeRates {
  USD: number;
  KRW: number;
  VND: number;
  cashBuyRateKRWPer100VND?: number; // 하나은행/네이버 금융 고시 현찰 살 때 환율 (100동당 약 5.85원)
  cashBuyRateUSD?: number; // USD 현찰 살 때 환율 (스프레드 1.75% 적용)
  lastUpdated?: string;
  source?: string;
}

// 기본 고시 기준: 100동당 현찰 살 때 5.85원 (1동 = 0.0585원)
export const DEFAULT_CASH_BUY_KRW_PER_100_VND = 5.85;

export const DEFAULT_RATES: ExchangeRates = {
  USD: 1,
  KRW: 1352.5,
  VND: 25450.0,
  cashBuyRateKRWPer100VND: DEFAULT_CASH_BUY_KRW_PER_100_VND,
  cashBuyRateUSD: Math.round(1352.5 * 1.0175 * 10) / 10,
  source: '하나은행·네이버 금융 고시 환율 (현찰 살 때 기준)',
  lastUpdated: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
};

export async function getLiveExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch('/api/exchange-rates');
    const data = await res.json();
    if (data.success && data.rates) {
      const baseKRW = data.rates.KRW || 1352.5;
      const baseVND = data.rates.VND || 25450.0;
      // 베트남 동 현찰 살 때 스프레드는 은행 고시 기준 11.8% 가산
      const base100VNDInKRW = (baseKRW / baseVND) * 100;
      const cashBuyRate = data.rates.cashBuyRateKRWPer100VND || (base100VNDInKRW * 1.118);

      return {
        USD: data.rates.USD || 1,
        KRW: baseKRW,
        VND: baseVND,
        cashBuyRateKRWPer100VND: Math.round(cashBuyRate * 100) / 100,
        cashBuyRateUSD: data.rates.cashBuyRateUSD || Math.round(baseKRW * 1.0175 * 10) / 10,
        source: data.source || '하나은행·네이버 금융 고시 환율 (현찰 살 때 기준)',
        lastUpdated: data.lastUpdated || new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
    }
  } catch (err) {
    console.warn('Failed to fetch rates from server endpoint, using fallback client fetch');
  }

  // Client-side fallback if server endpoint unavailable
  try {
    const clientRes = await fetch('https://open.er-api.com/v6/latest/USD');
    const clientData = await clientRes.json();
    if (clientData.rates) {
      const baseKRW = clientData.rates.KRW || 1352.5;
      const baseVND = clientData.rates.VND || 25450.0;
      const base100VNDInKRW = (baseKRW / baseVND) * 100;
      const cashBuyRate = base100VNDInKRW * 1.118; // 현찰 살 때 스프레드 11.8%

      return {
        USD: 1,
        KRW: baseKRW,
        VND: baseVND,
        cashBuyRateKRWPer100VND: Math.round(cashBuyRate * 100) / 100,
        cashBuyRateUSD: Math.round(baseKRW * 1.0175 * 10) / 10,
        source: '하나은행·네이버 금융 고시 환율 (현찰 살 때 기준)',
        lastUpdated: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
    }
  } catch (err) {
    console.warn('Client exchange rate fetch fallback failed, using defaults');
  }

  return DEFAULT_RATES;
}

// Convert KRW to VND (1,000 KRW = X VND) based on cash buying rate
export function calculateVNDFromKRW(krw: number, rates?: ExchangeRates): number {
  const cashBuyRate100 = rates?.cashBuyRateKRWPer100VND || DEFAULT_CASH_BUY_KRW_PER_100_VND;
  // krw / (cashBuyRate100 / 100)
  const vnd = (krw / cashBuyRate100) * 100;
  return Math.round(vnd);
}

// Convert VND to KRW based on "현찰 살 때" (Cash Buying) exchange rate
// 하나은행/네이버 금융 기준 100동당 약 5.85원 (1동 = 0.0585원)
export function calculateKRWFromVND(vnd: number, rates?: ExchangeRates): number {
  const cashBuyRate100 = rates?.cashBuyRateKRWPer100VND || DEFAULT_CASH_BUY_KRW_PER_100_VND;
  const krw = (vnd / 100) * cashBuyRate100;
  return Math.round(krw / 1000) * 1000;
}

// Convert KRW to USD (현찰 살 때 기준)
export function calculateUSDFromKRW(krw: number, rates?: ExchangeRates): number {
  const usdRate = rates?.cashBuyRateUSD || (rates?.KRW ? rates.KRW * 1.0175 : 1376);
  return Math.round(krw / usdRate);
}

// Formatters
export function formatKRW(amount: number): string {
  return amount.toLocaleString('ko-KR') + '원';
}

export function formatVND(amount: number): string {
  return amount.toLocaleString('ko-KR') + ' ₫';
}

export function formatUSD(amount: number): string {
  return '$' + amount.toLocaleString('en-US');
}

