import React from 'react';
import { trackVisitorEvent } from './lib/analytics';

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
  trackVisitorEvent('kakao_click', '카카오톡 실시간 1:1 상담');
  const targetUrl = getKakaoDirectLink() || DEFAULT_KAKAO_LINK;
  
  if (typeof window !== 'undefined') {
    // Open KakaoTalk open chat link directly in new tab/window
    try {
      const a = document.createElement('a');
      a.href = targetUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  }
};




