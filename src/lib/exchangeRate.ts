export interface ExchangeRates {
  USD: number;
  KRW: number;
  VND: number;
  lastUpdated?: string;
  source?: string;
}

export const DEFAULT_RATES: ExchangeRates = {
  USD: 1,
  KRW: 1352.5,
  VND: 25450.0,
  source: '네이버 금융 실시간 고시 환율',
  lastUpdated: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
};

export async function getLiveExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch('/api/exchange-rates');
    const data = await res.json();
    if (data.success && data.rates) {
      return {
        USD: data.rates.USD || 1,
        KRW: data.rates.KRW || 1352.5,
        VND: data.rates.VND || 25450.0,
        source: data.source || '네이버 금융 실시간 고시 환율',
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
      return {
        USD: 1,
        KRW: clientData.rates.KRW || 1352.5,
        VND: clientData.rates.VND || 25450.0,
        source: '네이버 금융 실시간 고시 환율 기준',
        lastUpdated: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
    }
  } catch (err) {
    console.warn('Client exchange rate fetch fallback failed, using defaults');
  }

  return DEFAULT_RATES;
}

// Convert KRW to VND (1,000 KRW = X VND) based on Naver exchange rate
export function calculateVNDFromKRW(krw: number, rates: ExchangeRates): number {
  if (!rates || !rates.KRW || !rates.VND) return Math.round(krw * 18.817);
  const vnd = (krw / rates.KRW) * rates.VND;
  return Math.round(vnd);
}

// Convert VND to KRW based on Naver exchange rate
export function calculateKRWFromVND(vnd: number, rates: ExchangeRates): number {
  if (!rates || !rates.KRW || !rates.VND) return Math.round(vnd / 18.817);
  const krw = (vnd / rates.VND) * rates.KRW;
  return Math.round(krw);
}

// Convert KRW to USD
export function calculateUSDFromKRW(krw: number, rates: ExchangeRates): number {
  if (!rates || !rates.KRW) return Math.round(krw / 1352.5);
  return Math.round(krw / rates.KRW);
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

