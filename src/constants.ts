export const COMPANY_PHONE = '010-5365-6019';
export const COMPANY_PHONE_TEL = 'tel:010-5365-6019';
export const DEFAULT_KAKAO_LINK = 'https://open.kakao.com/me/wonjutrade';
export const DEFAULT_KAKAO_CHANNEL = 'https://pf.kakao.com/_xincaotour';
export const KAKAO_ID = 'wonjutrade';

export const getKakaoDirectLink = (): string => {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('kakao_direct_link') : null;
  if (saved && saved.trim().length > 0) {
    return saved.trim();
  }
  return DEFAULT_KAKAO_LINK;
};

export const setKakaoDirectLink = (url: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('kakao_direct_link', url.trim());
  }
};

export const handleOpenKakaoTalkDirect = () => {
  const link = getKakaoDirectLink();
  window.open(link, '_blank', 'noopener,noreferrer');
};


