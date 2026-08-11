export const COMPANY_PHONE = '010-5365-6019';
export const COMPANY_PHONE_TEL = 'tel:010-5365-6019';
export const DEFAULT_KAKAO_LINK = 'https://open.kakao.com/o/sSweaL8b';
export const DEFAULT_KAKAO_CHANNEL = 'https://pf.kakao.com/_xincaotour';
export const KAKAO_ID = 'wonjutrade';

export const getKakaoDirectLink = (): string => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('kakao_direct_link') : null;
  if (saved && saved.trim().length > 0 && !saved.includes('/me/wonjutrade')) {
    return saved.trim();
  }
  return DEFAULT_KAKAO_LINK;
};

export const setKakaoDirectLink = (url: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('kakao_direct_link', url.trim());
  }
};

export const openKakaoModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-kakao-modal'));
  }
};

export const handleOpenKakaoTalkDirect = () => {
  const link = getKakaoDirectLink();
  const targetUrl = (link && link.startsWith('http')) ? link : DEFAULT_KAKAO_LINK;
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
};



