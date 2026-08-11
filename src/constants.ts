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
  const targetUrl = getKakaoDirectLink() || DEFAULT_KAKAO_LINK;
  
  // Open the in-app 1:1 Chat Card Modal immediately
  openKakaoModal();

  // Also trigger external window navigation
  try {
    const linkEl = document.createElement('a');
    linkEl.href = targetUrl;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
  } catch (err) {
    console.error('Failed to launch link:', err);
  }
};




