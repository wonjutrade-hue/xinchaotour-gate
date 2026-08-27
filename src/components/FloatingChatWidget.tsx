import React from 'react';
import { MessageCircle, PhoneCall, CalendarCheck } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, DEFAULT_KAKAO_LINK, handleOpenKakaoTalkDirect } from '../constants';

interface FloatingChatWidgetProps {
  onOpenConsultation: () => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  onOpenConsultation,
}) => {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* 1. Direct KakaoTalk 1:1 Open Chat Button */}
      <a
        href={DEFAULT_KAKAO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          handleOpenKakaoTalkDirect(e);
        }}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-black text-xs sm:text-sm rounded-full shadow-2xl border-2 border-amber-300 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        title="카카오톡 1:1 오픈채팅으로 바로 연결됩니다."
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-[#191919] text-[#191919]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-black text-[#191919] tracking-tight leading-tight">카카오톡 1:1 상담</span>
          <span className="text-[10px] text-amber-900/80 font-bold leading-none hidden sm:block">신차오투어 직영 실시간 응대</span>
        </div>
      </a>

      {/* 2. Secondary Mini Quick Action Bar */}
      <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-full border border-slate-700/80 shadow-lg">
        <button
          onClick={onOpenConsultation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-600/90 hover:bg-teal-500 text-white text-[11px] font-bold transition-all cursor-pointer"
          title="맞춤 견적서 신청"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>견적문의</span>
        </button>

        <a
          href={COMPANY_PHONE_TEL}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-[11px] font-bold transition-all"
          title={`전화 상담: ${COMPANY_PHONE}`}
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>{COMPANY_PHONE}</span>
        </a>
      </div>
    </div>
  );
};

