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

export const handleOpenKakaoTalkDirect = (e?: React.MouseEvent | React.TouchEvent | any) => {
  if (e && e.preventDefault) {
    try {
      e.preventDefault();
      e.stopPropagation();
    } catch {}
  }

  trackVisitorEvent('kakao_click', '카카오톡 실시간 1:1 상담');
  const targetUrl = getKakaoDirectLink() || DEFAULT_KAKAO_LINK;
  
  if (typeof window === 'undefined') return;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Extract openchat key (e.g. sxeekUBi from https://open.kakao.com/o/sxeekUBi)
  const openChatMatch = targetUrl.match(/open\.kakao\.com\/o\/([a-zA-Z0-9_-]+)/);
  const chatKey = openChatMatch ? openChatMatch[1] : '';

  if (isMobile) {
    if (isAndroid) {
      // Android direct intent to KakaoTalk App
      window.location.href = `intent://open.kakao.com/o/${chatKey}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`;
    } else if (isIOS) {
      // iOS custom scheme to KakaoTalk App
      window.location.href = `kakaotalk://openchat?url=${encodeURIComponent(targetUrl)}`;
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1200);
    } else {
      window.location.href = targetUrl;
    }
  } else {
    // PC Environment: Direct KakaoTalk PC App Protocol Trigger + Focused Messenger Popup
    // 1. Try launching KakaoTalk Desktop App directly via hidden iframe
    try {
      const appProtocolUrl = `kakaotalk://openchat?url=${encodeURIComponent(targetUrl)}`;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appProtocolUrl;
      document.body.appendChild(iframe);
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
        } catch {}
      }, 2000);
    } catch {}

    // 2. Open dedicated messenger-sized popup window (matching KakaoTalk 1:1 modal dimensions: 480x700)
    const width = 480;
    const height = 720;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`;

    try {
      const popup = window.open(targetUrl, 'KakaoTalkDirectChat', windowFeatures);
      if (popup) {
        popup.focus();
      } else {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  }
};





