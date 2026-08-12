import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { Category, Region } from '../types';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';

interface FooterProps {
  onSelectCategory: (cat: Category | '전체') => void;
  onSelectRegion: (reg: Region) => void;
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectRegion,
  onOpenConsultation,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 p-2 rounded-2xl inline-block border border-white/10">
              <img 
                src="/logo.svg" 
                alt="Tours XIN CHÀO" 
                className="h-16 w-auto object-contain" 
              />
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              한국인 여행객을 위한 100% 맞춤형 베트남 대표 전문 여행사. 현지 직영 시스템으로 거품 없는 최저가와 24시간 한국어 가이드 및 카카오톡 케어를 보장합니다.
            </p>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              여행 테마
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => onSelectCategory('추천패키지')}
                  className="hover:text-amber-400 transition-colors"
                >
                  🎒 올인클루시브 추천 패키지
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('자유여행')}
                  className="hover:text-amber-400 transition-colors"
                >
                  🛫 시티 & 호핑 자유 여행
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('골프투어')}
                  className="hover:text-amber-400 transition-colors"
                >
                  ⛳ 36홀 / 54홀 명문 골프투어
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('풀빌라')}
                  className="hover:text-amber-400 transition-colors"
                >
                  🏰 오션뷰 프라이빗 풀빌라
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              베트남 주요 지역
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => onSelectRegion('북부')}
                  className="hover:text-amber-400 transition-colors"
                >
                  ⛰️ 북부: 하노이 · 하롱베이 · 사파
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectRegion('중부')}
                  className="hover:text-amber-400 transition-colors"
                >
                  🏖️ 중부: 다낭 · 호이안 · 나트랑
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectRegion('남부')}
                  className="hover:text-amber-400 transition-colors"
                >
                  🌴 남부: 푸꾸옥 · 달랏 · 호치민
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Center */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              고객 센터 & 카톡 바로상담
            </h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href={COMPANY_PHONE_TEL}
                className="text-xl font-black text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-5 h-5 text-amber-400" />
                {COMPANY_PHONE}
              </a>
              <p className="text-slate-400">운영시간: 09:00 - 22:00 (연중무휴)</p>
              
              <button
                onClick={handleOpenKakaoTalkDirect}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                카카오톡 1:1 바로 연결
              </button>

              <button
                onClick={onOpenConsultation}
                className="w-full py-2 px-3 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs transition-colors"
              >
                1:1 맞춤 견적서 신청
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Business Info Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} 신차오투어 (Xin Chào Tour). All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">이용약관</span>
            <span className="hover:underline cursor-pointer font-bold text-slate-300">개인정보처리방침</span>
            <button
              onClick={onOpenAdmin}
              className="text-amber-500 font-bold hover:underline"
            >
              [관리자 모드]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
