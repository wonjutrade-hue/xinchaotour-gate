import React, { useState } from 'react';
import { MessageCircle, PhoneCall, ChevronUp, X, Send, CalendarCheck } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';
import { COMPANY_INFO } from '../data/companyInfo';

interface FloatingChatWidgetProps {
  onOpenConsultation: () => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  onOpenConsultation,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2">
      {/* Expanded Quick Options Menu */}
      {expanded && (
        <div className="bg-white rounded-3xl p-3 shadow-2xl border border-slate-200 flex flex-col gap-2 min-w-[240px] animate-fadeIn">
          <div className="text-[11px] font-extrabold text-slate-400 px-2 pt-1 uppercase tracking-wider flex items-center justify-between">
            <span>XinChaoTour 빠른 연결</span>
            <button onClick={() => setExpanded(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* KakaoTalk Direct Link Button */}
          <button
            onClick={() => {
              setExpanded(false);
              handleOpenKakaoTalkDirect();
            }}
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-950 text-xs font-bold transition-colors text-left border border-amber-300/80 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <p className="font-extrabold text-slate-950">카카오톡 1:1 상담</p>
              <p className="text-[10px] text-amber-800">한국어 전담 실시간 연결</p>
            </div>
          </button>

          {/* 1:1 Consultation Form Button */}
          <button
            onClick={() => {
              setExpanded(false);
              onOpenConsultation();
            }}
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-950 text-xs font-bold transition-colors text-left border border-slate-200 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900">맞춤 견적 및 예약문의</p>
              <p className="text-[10px] text-slate-500">무료 견적서 작성 신청</p>
            </div>
          </button>

          {/* Phone Call */}
          <a
            href={COMPANY_PHONE_TEL}
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900">전화 빠른 상담</p>
              <p className="text-[10px] text-slate-500">{COMPANY_PHONE}</p>
            </div>
          </a>
        </div>
      )}

      {/* Main Trigger Button - Direct KakaoTalk Action Button + Expand Toggle */}
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 p-1 rounded-full shadow-2xl border-2 border-amber-200">
        <button
          onClick={handleOpenKakaoTalkDirect}
          className="px-4 py-3 rounded-full bg-slate-950 text-white font-extrabold text-xs hover:bg-slate-900 transition-all flex items-center gap-2 cursor-pointer"
          title="클릭 시 카카오톡 1:1 실시간 상담으로 바로 연결됩니다."
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          </div>
          <span className="text-amber-300 font-extrabold">카카오톡 상담</span>
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-600 flex items-center justify-center transition-all cursor-pointer"
          title="상담 옵션 더보기"
        >
          {expanded ? <X className="w-5 h-5" /> : <ChevronUp className="w-5 h-5 font-black" />}
        </button>
      </div>
    </div>
  );
};
