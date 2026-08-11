export const COMPANY_PHONE = '010-5365-6019';
export const COMPANY_PHONE_TEL = 'tel:010-5365-6019';
export const DEFAULT_KAKAO_LINK = 'https://open.kakao.com/o/sxeekUBi';
export const DEFAULT_KAKAO_CHANNEL = 'https://pf.kakao.com/_xincaotour';
export const KAKAO_ID = 'wonjutrade';

export const getKakaoDirectLink = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('kakao_direct_link');
    if (saved && saved.startsWith('http') && saved.includes('open.kakao.com/o/sxeekUBi')) {
      return saved.trim();
    }
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

export const handleOpenKakaoTalkDirect = (e?: React.MouseEvent) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  // Immediately open the in-app 1:1 Chat Modal (Photo 3) directly without landing page or popups
  openKakaoModal();
};




