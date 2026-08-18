import { AnalyticsSummary, VisitorAction, VisitorLog } from '../types';

const SESSION_KEY = 'xinchao_analytics_session_id';
const VISITOR_ID_KEY = 'xinchao_analytics_visitor_id';
const LOCAL_ANALYTICS_KEY = 'xinchao_analytics_local_cache';

export function getOrCreateSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = `ses-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch (e) {
    return `ses-${Date.now()}`;
  }
}

export function getOrCreateVisitorId(): string {
  try {
    let vid = localStorage.getItem(VISITOR_ID_KEY);
    if (!vid) {
      vid = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(VISITOR_ID_KEY, vid);
    }
    return vid;
  } catch (e) {
    return `usr-${Date.now()}`;
  }
}

export function getDeviceInfo(): { device: 'mobile' | 'desktop' | 'tablet'; browser: string; os: string } {
  if (typeof window === 'undefined') {
    return { device: 'desktop', browser: 'Unknown', os: 'Unknown' };
  }

  const ua = navigator.userAgent || '';
  let device: 'mobile' | 'desktop' | 'tablet' = 'desktop';

  if (/tablet|ipad|playbook|silk|(android(?!.*mobi))/i.test(ua)) {
    device = 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua) || window.innerWidth < 768) {
    device = 'mobile';
  }

  // Browser detection
  let browser = 'Chrome';
  if (ua.includes('KAKAOTALK') || ua.includes('KakaoTalk')) {
    browser = '카카오 인앱브라우저';
  } else if (ua.includes('NAVER') || ua.includes('NAVER(inapp)')) {
    browser = '네이버 인앱브라우저';
  } else if (ua.includes('SamsungBrowser')) {
    browser = '삼성 인터넷';
  } else if (ua.includes('Whale')) {
    browser = '네이버 웨일';
  } else if (ua.includes('Firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('Edg')) {
    browser = 'Edge';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari';
  } else if (ua.includes('Chrome')) {
    browser = 'Chrome';
  }

  // OS detection
  let os = '기타';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iOS')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';

  return { device, browser, os };
}

export function getCleanReferrer(): string {
  if (typeof document === 'undefined') return '직접 접속';
  const ref = document.referrer;
  if (!ref) return '직접 접속 / 주소창 입력';

  if (ref.includes('naver.com')) return '네이버 (Naver)';
  if (ref.includes('daum.net') || ref.includes('kakao.com')) return '다음/카카오톡';
  if (ref.includes('google.')) return '구글 (Google)';
  if (ref.includes('instagram.com')) return '인스타그램 (Instagram)';
  if (ref.includes('facebook.com')) return '페이스북 (Facebook)';
  if (ref.includes('youtube.com')) return '유튜브 (YouTube)';
  if (ref.includes('blog.naver.com')) return '네이버 블로그';
  if (ref.includes('cafe.naver.com')) return '네이버 카페';

  try {
    const url = new URL(ref);
    return url.hostname;
  } catch (e) {
    return '외부 사이트';
  }
}

// Track an event or page view
export async function trackVisitorEvent(
  action: VisitorAction,
  page: string,
  extra?: { productId?: string; productTitle?: string }
): Promise<void> {
  try {
    const { device, browser, os } = getDeviceInfo();
    const sessionId = getOrCreateSessionId();
    const referrer = getCleanReferrer();

    const payload = {
      action,
      page,
      productId: extra?.productId,
      productTitle: extra?.productTitle,
      device,
      browser,
      os,
      referrer,
      sessionId,
      timestamp: new Date().toISOString()
    };

    // Send to backend analytics API
    fetch('/api/analytics/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(e => {
      // offline or silent fail
    });
  } catch (err) {
    // silent catch
  }
}

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary | null> {
  try {
    const res = await fetch('/api/analytics/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    const data = await res.json();
    if (data && data.success && data.summary) {
      return data.summary;
    }
  } catch (e) {
    console.warn('[Analytics] Failed to fetch server stats:', e);
  }
  return null;
}

export async function resetAnalyticsStats(): Promise<boolean> {
  try {
    const res = await fetch('/api/analytics/reset', { method: 'POST' });
    const data = await res.json();
    return Boolean(data.success);
  } catch (e) {
    return false;
  }
}
