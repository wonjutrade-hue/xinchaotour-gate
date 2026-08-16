import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Heart, MessageCircle, Palmtree, ArrowUpRight } from 'lucide-react';
import { Category, Region } from '../types';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';
import { COMPANY_INFO } from '../data/companyInfo';
import { MainNavPage } from './Navbar';

interface FooterProps {
  onNavigate?: (page: MainNavPage) => void;
  onSelectCategory: (cat: Category | '전체') => void;
  onSelectRegion: (reg: Region) => void;
  onOpenConsultation: () => void;
  onGoHome?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onSelectRegion,
  onOpenConsultation,
  onGoHome,
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
                <span className="block text-[11px] text-slate-400 font-medium">베트남 전문 여행 플랫폼 · 신짜오투어</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-300 max-w-sm">
              "{COMPANY_INFO.intro}"
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-emerald-400">
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">🛡️ 100% 현지 직영</span>
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">🚐 단독 전용 차량</span>
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">👨‍💼 전문 한국어 가이드</span>
            </div>
          </div>

          {/* Key Services Navigation */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              주요 서비스
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('자유여행');
                    else onSelectCategory('자유여행');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  🛫 베트남 자유여행 (북부/중부/남부)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('풀빌라');
                    else onSelectCategory('풀빌라');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  🏰 프리미엄 독채 풀빌라 & 리조트
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('골프여행');
                    else onSelectCategory('골프투어');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  ⛳ 54홀 / 90홀 명문 골프투어
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('여행후기')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  ⭐ 고객 실제 여행후기
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('회사소개')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  🏢 신짜오투어 회사소개
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('예약문의')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  📝 온라인 예약 및 견적문의
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
              주요 여행지
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectRegion('중부');
                    if (onNavigate) onNavigate('자유여행');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  중부 : 다낭 · 호이안 · 바나힐 · 미케비치
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectRegion('북부');
                    if (onNavigate) onNavigate('자유여행');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  북부 : 하노이 · 하장 · 하롱베이 · 닌빈
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectRegion('남부');
                    if (onNavigate) onNavigate('자유여행');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  남부 : 나트랑 · 달랏 · 푸꾸옥 · 호치민
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

              <a
                href={COMPANY_INFO.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 text-xs text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp 바로 상담
              </a>

              <p className="text-[11px] text-slate-400 pt-1">
                연중무휴 24시간 한국어 현지 케어
              </p>
            </div>
          </div>
        </div>

        {/* Company Legal Details & SEO keywords */}
        <div className="border-t border-slate-900 pt-8 text-xs text-slate-300 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-medium text-slate-200">
                상호명: {COMPANY_INFO.brandName} ({COMPANY_INFO.name}) | 대표자: 원주무역 | 사업자등록번호: {COMPANY_INFO.businessNumber}
              </p>
              <p>
                주소: {COMPANY_INFO.address} | 현지 지사: {COMPANY_INFO.vietnamOffice}
              </p>
              <p>
                통신판매업신고 완료 | {COMPANY_INFO.tourLicense} | 공식 도메인: {COMPANY_INFO.domain}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button onClick={onOpenAdmin} className="text-slate-400 hover:text-slate-300 text-[11px]">
                관리자 모드
              </button>
            </div>
          </div>

          {/* SEO Keywords */}
          <div className="pt-2 border-t border-slate-900/60 text-[11px] text-slate-300 flex flex-wrap gap-2">
            <span className="text-slate-200 font-semibold">인기 키워드:</span>
            <span>#베트남여행</span>
            <span>#다낭여행</span>
            <span>#다낭풀빌라</span>
            <span>#다낭골프</span>
            <span>#베트남골프여행</span>
            <span>#하장여행</span>
            <span>#하노이여행</span>
            <span>#호이안여행</span>
            <span>#푸꾸옥여행</span>
            <span>#나트랑풀빌라</span>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-300">
            © {new Date().getFullYear()} XinChaoTour (xinchaotour.com). All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
