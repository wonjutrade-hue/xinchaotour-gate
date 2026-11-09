import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageCircle, Palmtree, Users, TrendingUp, BarChart2, ExternalLink } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, DEFAULT_KAKAO_LINK, handleOpenKakaoTalkDirect } from '../constants';
import { COMPANY_INFO, PARTNER_COMPANY_INFO } from '../data/companyInfo';
import { NavPage } from './Navbar';
import { fetchAnalyticsSummary } from '../lib/analytics';
import { BrandLogoLockup } from './BrandLogoLockup';

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
  const [visitorStats, setVisitorStats] = useState<{ todayUV: number; totalUV: number } | null>(null);

  useEffect(() => {
    fetchAnalyticsSummary().then(res => {
      if (res) {
        setVisitorStats({
          todayUV: res.todayUV,
          totalUV: res.totalUV
        });
      }
    }).catch(() => {});
  }, []);
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info with Dual Co-Branding Lockup */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogoLockup
              onNavigateHome={() => onNavigate('home')}
              size="md"
              theme="dark"
              showSubtitle={true}
            />

            <p className="text-xs leading-relaxed text-slate-300 max-w-sm">
              "{COMPANY_INFO.intro}" <br />
              한국 본사(원주무역)와 베트남 대표 종합 운송·관광 그룹 <strong className="text-amber-400">VITRACO TOUR</strong>의 공식 MOU 체결로, 
              거품 없는 가격과 단독 VIP 최신형 리무진, 검증된 전문 한국어 가이드가 함께하는 최상의 베트남 여행을 제공합니다.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-emerald-400">
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">🛡️ 100% 현지 직영</span>
              <span className="bg-amber-950/80 border border-amber-800/60 text-amber-300 px-2.5 py-1 rounded-md">🤝 VITRACO 공식 MOU</span>
              <span className="bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-md">🚐 단독 VIP 리무진</span>
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
                  onClick={() => {
                    try {
                      const url = new URL(window.location.href);
                      url.searchParams.set('page', 'simple');
                      window.open(url.toString(), '_blank', 'noopener,noreferrer');
                    } catch (e) {
                      window.open('/?page=simple', '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer font-bold text-emerald-300 flex items-center gap-1"
                  title="새 창에서 심플 모드 열기"
                >
                  <span>⚡ 신짜오투어 심플 모드</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/30 text-emerald-300 rounded-full border border-emerald-500/40">새창</span>
                </button>
              </li>
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

              <a
                href={DEFAULT_KAKAO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleOpenKakaoTalkDirect(e)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-xs"
                title="카카오톡 1:1 상담 바로가기"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                카카오톡 1:1 상담 바로연결
              </a>

              <p className="text-[11px] text-slate-400 pt-1">
                {COMPANY_INFO.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Official Strategic MOU Partnership Banner Block */}
        <div className="border-t border-slate-900 pt-8">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/40 border border-amber-500/30 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-black">
                  <span>🤝</span>
                  <span>공식 전략적 업무협약(MOU) 체결 파트너십</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-extrabold">VERIFIED</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2 pt-1">
                  <span>XinChao Tour</span>
                  <span className="text-amber-400">✕</span>
                  <span>VITRACO Tour & Transport</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {PARTNER_COMPANY_INFO.mouDescription}
                </p>
              </div>

              <a
                href={PARTNER_COMPANY_INFO.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition shadow-md shrink-0 cursor-pointer"
                title="VITRACO Tour 공식 홈페이지 새창 방문"
              >
                <span>VITRACO 공식 웹사이트</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* MOU 4 Key Cooperation Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {PARTNER_COMPANY_INFO.partnershipHighlights.map((hl, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-slate-300 text-[11px] leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complete Company & Partner Legal Details (Dual Column / Structured) */}
        <div className="border-t border-slate-900 pt-8 text-xs text-slate-400 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
            {/* Column 1: XinChao Tour (한국 본사 / 운영사) */}
            <div className="space-y-2 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-white font-extrabold text-sm pb-1 border-b border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>신짜오투어 (한국 총괄 운영)</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">국내 본사</span>
              </div>
              <div className="space-y-1.5 text-slate-300 text-[11.5px] leading-relaxed pt-1">
                <p>
                  <strong className="text-slate-200">상호명:</strong> {COMPANY_INFO.brandName} ({COMPANY_INFO.name}) | <strong className="text-slate-200">대표자:</strong> 원주무역
                </p>
                <p>
                  <strong className="text-slate-200">국내 주소:</strong> {COMPANY_INFO.address}
                </p>
                <p>
                  <strong className="text-slate-200">베트남 현지 지사:</strong> {COMPANY_INFO.vietnamOffice}
                </p>
                <p>
                  <strong className="text-slate-200">고객센터(직통):</strong> <a href={COMPANY_PHONE_TEL} className="text-emerald-400 font-bold hover:underline">{COMPANY_PHONE}</a> | <strong className="text-slate-200">이메일:</strong> {COMPANY_INFO.email}
                </p>
                <p>
                  <strong className="text-slate-200">사업자 등록:</strong> {COMPANY_INFO.businessNumber} | <strong className="text-slate-200">안전 보증:</strong> {COMPANY_INFO.tourLicense}
                </p>
                <p>
                  <strong className="text-slate-200">카카오톡 공식 ID:</strong> <span className="text-amber-300 font-bold">{COMPANY_INFO.kakaoId}</span> | <strong className="text-slate-200">상담 시간:</strong> {COMPANY_INFO.workingHours}
                </p>
              </div>
            </div>

            {/* Column 2: VITRACO Tour (베트남 현지 총괄 파트너사 - 공식 MOU 체결) */}
            <div className="space-y-2 bg-slate-900/40 p-5 rounded-2xl border border-amber-900/30">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-extrabold text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{PARTNER_COMPANY_INFO.nameKo}</span>
                </div>
                <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-800/80 font-bold">공식 MOU 파트너</span>
              </div>
              <div className="space-y-1.5 text-slate-300 text-[11.5px] leading-relaxed pt-1">
                <p>
                  <strong className="text-slate-200">현지 법인명:</strong> {PARTNER_COMPANY_INFO.nameVn}
                </p>
                <p>
                  <strong className="text-slate-200">슬로건:</strong> <span className="text-amber-300 font-semibold">{PARTNER_COMPANY_INFO.slogan}</span>
                </p>
                <p>
                  <strong className="text-slate-200">베트남 본사 주소:</strong> {PARTNER_COMPANY_INFO.headquartersVn}
                </p>
                <p>
                  <strong className="text-slate-200">핫라인(전화):</strong> <span className="text-amber-300 font-bold">{PARTNER_COMPANY_INFO.hotline}</span> (유선: {PARTNER_COMPANY_INFO.phone})
                </p>
                <p>
                  <strong className="text-slate-200">공식 이메일:</strong> {PARTNER_COMPANY_INFO.email} | {PARTNER_COMPANY_INFO.bookingEmail}
                </p>
                <p>
                  <strong className="text-slate-200">사업자 등록(세무코드 MST):</strong> <span className="font-mono text-slate-200 font-bold">{PARTNER_COMPANY_INFO.taxCode}</span> | <strong className="text-slate-200">인가 라이선스:</strong> {PARTNER_COMPANY_INFO.license}
                </p>
                <p className="flex items-center gap-1.5 pt-0.5">
                  <strong className="text-slate-200">공식 웹사이트:</strong>
                  <a
                    href={PARTNER_COMPANY_INFO.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 font-mono font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{PARTNER_COMPANY_INFO.domain}</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Visitor Stats & Admin Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl text-slate-300 text-xs">
              <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px]">
                오늘 방문자: <strong className="text-amber-300 font-bold">{visitorStats ? visitorStats.todayUV.toLocaleString() : '1'}</strong>명
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px]">
                전체 누적: <strong className="text-teal-300 font-bold">{visitorStats ? visitorStats.totalUV.toLocaleString() : '1'}</strong>명
              </span>
            </div>

            {onOpenAdmin && (
              <button onClick={onOpenAdmin} className="text-slate-400 hover:text-slate-300 text-[11px] cursor-pointer">
                관리자 모드
              </button>
            )}
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            © {new Date().getFullYear()} {COMPANY_INFO.brandName} ({COMPANY_INFO.name}) ✕ {PARTNER_COMPANY_INFO.shortName}. Strategic MOU Alliance. All rights reserved. | {COMPANY_INFO.domain} · {PARTNER_COMPANY_INFO.domain}
          </div>
        </div>
      </div>
    </footer>
  );
};
