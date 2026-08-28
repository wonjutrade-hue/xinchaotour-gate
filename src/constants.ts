import React from 'react';
import { trackVisitorEvent } from './lib/analytics';

export const COMPANY_PHONE = '010-5365-6019';
export const COMPANY_PHONE_TEL = 'tel:010-5365-6019';
export const DEFAULT_KAKAO_LINK = 'https://open.kakao.com/o/s7OOoshf';
export const DEFAULT_KAKAO_CHANNEL = 'https://pf.kakao.com/_xincaotour';
export const KAKAO_ID = 'wonjutrade';

export const getKakaoDirectLink = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('kakao_direct_link');
    if (saved && saved.trim().startsWith('http')) {
      // If old default is cached, migrate to new link
      if (saved.includes('sxeekUBi')) {
        localStorage.setItem('kakao_direct_link', DEFAULT_KAKAO_LINK);
        return DEFAULT_KAKAO_LINK;
      }
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
  trackVisitorEvent('kakao_click', '카카오톡 실시간 1:1 상담');
  const targetUrl = getKakaoDirectLink() || DEFAULT_KAKAO_LINK;
  
  if (typeof window === 'undefined') return;

  const userAgent = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  // Check if target is Kakao Channel (pf.kakao.com) or OpenChat (open.kakao.com)
  const isChannel = targetUrl.includes('pf.kakao.com');
  const channelMatch = targetUrl.match(/pf\.kakao\.com\/([_a-zA-Z0-9-]+)/);
  const channelId = channelMatch ? channelMatch[1].replace('/chat', '') : '';

  if (isMobile) {
    if (isChannel && channelId) {
      const channelChatUrl = `https://pf.kakao.com/${channelId}/chat`;
      const appScheme = `kakaoplus://plusfriend/chat/${channelId}`;
      window.location.href = appScheme;
      setTimeout(() => {
        window.location.href = channelChatUrl;
      }, 1200);
    } else {
      // Direct 1:1 OpenChat on Mobile
      const openChatScheme = `kakaotalk://openchat?url=${encodeURIComponent(targetUrl)}`;
      if (isAndroid || isIOS) {
        window.location.href = openChatScheme;
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 1000);
      } else {
        window.location.href = targetUrl;
      }
    }
  } else {
    // PC Environment: Open the OpenChat URL directly in a new window/tab and trigger app protocol
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = targetUrl;
    }
  }
};





