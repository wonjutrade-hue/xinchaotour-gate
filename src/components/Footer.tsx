import React from 'react';
import { PhoneCall, MessageCircle, Palmtree } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';
import { COMPANY_INFO } from '../data/companyInfo';
import { NavPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onOpenConsultation: () => void;
  onOpenTravelInfo?: (tab?: any) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenTravelInfo,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Palmtree className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-2xl text-white tracking-tight">XinChao<span className="text-emerald-400">Tour</span></span>
                <span className="block text-[11px] text-slate-400 font-medium">신짜오투어 | 한국인을 위한 베트남 맞춤 여행 전문</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-300 max-w-sm">
              "{COMPANY_INFO.intro}" <br />
              베트남 현지 직영 시스템으로 거품 없는 합리적인 가격과 단독 VIP 전용 차량, 검증된 한국인 전담 가이드가 함께하는 최고의 여행을 만듭니다.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-emerald-400">
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">🛡️ 100% 현지 직영</span>
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">🚐 단독 VIP 차량</span>
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">👨‍💼 전문 한국어 가이드</span>
            </div>
          </div>

          {/* Key Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              주요 서비스
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('free_travel')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  🛫 자유여행 (북부 / 중부 / 남부)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('villa')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  🏰 프리미엄 독채 풀빌라
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('golf')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  ⛳ 5대 명문 골프여행 (54/90홀)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('travel_info')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer font-bold text-emerald-400"
                >
                  🧭 여행필수정보 가이드
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer font-bold text-amber-400"
                >
                  📝 예약문의
                </button>
              </li>
            </ul>
          </div>

          {/* Travel Info Guides */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              베트남 여행 정보
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('travel_info')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  🧭 지역별 대표 추천 코스
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('travel_info')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  ☀️ 베트남 월별 날씨 & 옷차림
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('travel_info')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  💵 실시간 환율 & 동 계산법
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('travel_info')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  📋 45일 무비자 입국 가이드
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('travel_info')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  💡 그랩/유심/팁 필수 꿀팁
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              고객센터 & 빠른상담
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={COMPANY_PHONE_TEL}
                className="flex items-center gap-2 text-white font-extrabold text-sm hover:text-emerald-400 transition"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                {COMPANY_PHONE}
              </a>

              <button
                onClick={(e) => handleOpenKakaoTalkDirect(e)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                카카오톡 실시간 상담
              </button>

              <p className="text-[11px] text-slate-400 pt-1">
                {COMPANY_INFO.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Company Legal Details */}
        <div className="border-t border-slate-900 pt-8 text-xs text-slate-400 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-medium text-slate-200">
                상호명: {COMPANY_INFO.brandName} ({COMPANY_INFO.name}) | 대표자: 원주무역 | 고객센터: {COMPANY_PHONE} | 이메일: {COMPANY_INFO.email}
              </p>
              <p>
                주소: {COMPANY_INFO.address} | 베트남 현지 지사: {COMPANY_INFO.vietnamOffice}
              </p>
              <p>
                {COMPANY_INFO.businessNumber} | {COMPANY_INFO.tourLicense} | 카카오톡 ID: {COMPANY_INFO.kakaoId}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              {onOpenAdmin && (
                <button onClick={onOpenAdmin} className="text-slate-400 hover:text-slate-300 text-[11px] cursor-pointer">
                  관리자 모드
                </button>
              )}
            </div>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            © {new Date().getFullYear()} {COMPANY_INFO.brandName} ({COMPANY_INFO.name}). All rights reserved. | {COMPANY_INFO.domain}
          </div>
        </div>
      </div>
    </footer>
  );
};
