export const COMPANY_PHONE = '010-5365-6019';
export const COMPANY_PHONE_TEL = 'tel:010-5365-6019';
export const DEFAULT_KAKAO_LINK = 'https://open.kakao.com/o/sxeekUBi';
export const DEFAULT_KAKAO_CHANNEL = 'https://pf.kakao.com/_xincaotour';
export const KAKAO_ID = 'wonjutrade';

export const getKakaoDirectLink = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('kakao_direct_link');
    if (saved && saved.trim().startsWith('http')) {
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
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const targetUrl = getKakaoDirectLink() || DEFAULT_KAKAO_LINK;
  
  if (typeof window !== 'undefined') {
    const match = targetUrl.match(/open\.kakao\.com\/o\/([a-zA-Z0-9]+)/);
    const code = match ? match[1] : 'sxeekUBi';

    const userAgent = navigator.userAgent || '';
    const isAndroid = /Android/i.test(userAgent);

    // Deep link protocol to launch KakaoTalk app & open 1:1 chatroom directly
    let deepLink = `kakaolink://open.kakao.com/o/${code}`;
    if (isAndroid) {
      deepLink = `intent://open.kakao.com/o/${code}#Intent;scheme=kakaolink;package=com.kakao.talk;end`;
    }

    try {
      // Execute deep link directly
      const a = document.createElement('a');
      a.href = deepLink;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      window.location.href = deepLink;
    }

    // Fallback timer: If KakaoTalk app is not installed or deep link is blocked, open web link after short delay
    const start = Date.now();
    setTimeout(() => {
      if (Date.now() - start < 2500) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
    }, 1200);
  }
};




