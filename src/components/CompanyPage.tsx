import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Award, 
  Users, 
  Compass, 
  HeartHandshake, 
  Sparkles,
  Plane,
  Home,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { DEFAULT_KAKAO_LINK, handleOpenKakaoTalkDirect } from '../constants';

interface CompanyPageProps {
  onOpenConsultation?: () => void;
}

export const CompanyPage: React.FC<CompanyPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-900 text-white p-8 sm:p-14 shadow-2xl border border-emerald-500/20">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-5 border border-emerald-400/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              베트남 No.1 한국인 맞춤 여행 전문 브랜드
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              <span className="text-emerald-400">XinChaoTour</span> (신짜오투어)
            </h1>
            <p className="text-lg sm:text-xl font-medium text-emerald-100 mb-6 leading-relaxed">
              "{COMPANY_INFO.intro}"
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              신짜오투어는 한국 여행객분들이 베트남의 아름다운 자연과 문화를 가장 편안하고 안전하게 경험하실 수 있도록 
              <strong> 100% 단독 전용 차량</strong>과 <strong>검증된 전문 한국어 가이드</strong>, <strong>프리미엄 독채 풀빌라</strong>, 
              <strong>명문 골프 라운딩</strong>을 직영으로 제공하는 베트남 전문 OTA 여행 플랫폼입니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenConsultation}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition text-sm cursor-pointer inline-flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                1:1 맞춤 여행 상담 신청
              </button>
              <a
                href={DEFAULT_KAKAO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleOpenKakaoTalkDirect(e)}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition text-sm cursor-pointer inline-flex items-center gap-2"
                title="카카오톡 1:1 상담 바로가기"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                카카오톡 1:1 상담 바로연결
              </a>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              🛡️
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-base">100% 직영 시스템</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              중간 대행사 없는 현지 직영 운영으로 거품 없는 합리적인 가격과 신속한 응대를 약속합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              🚐
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-base">단독 전용 차량</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              모르는 사람과 섞이지 않고 우리 일행만 프라이빗하게 이동하는 최신형 VIP 리무진 밴 지원.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:shadow-md transition">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              👨‍💼
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-base">한국인/한국어 전담</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              언어 걱정 전혀 없이 역사, 문화 해설부터 식당 주문까지 밀착 케어하는 전문 가이드.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:shadow-md transition">
            <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              📜
            </div>
            <h3 className="font-bold text-slate-900 mb-1.5 text-base">안전 보증보험</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              1억원 기획여행보증보험 가입 및 24시간 긴급 지원 핫라인으로 안심하고 떠나는 베트남 여행.
            </p>
          </div>
        </div>

        {/* 7 Key Services */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              신짜오투어의 주요 서비스
            </h2>
            <p className="text-sm text-slate-600">
              고객님의 여행 스타일에 꼭 맞춘 7가지 핵심 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.services.map((svc, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-emerald-300 transition hover:bg-emerald-50/40"
              >
                <div className="text-3xl mb-3">{svc.icon}</div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Registration & Contact Info Details */}
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-emerald-300 flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            회사 공식 정보 및 연락처
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-300">
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">상호명 :</span>
                <span>{COMPANY_INFO.brandName} ({COMPANY_INFO.name})</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">공식도메인 :</span>
                <span className="text-emerald-400 font-mono">{COMPANY_INFO.domain}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">대표 전화 :</span>
                <a href={COMPANY_INFO.phoneTel} className="text-white font-bold hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">이메일 :</span>
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">카카오톡 ID :</span>
                <span className="text-amber-300 font-bold">{COMPANY_INFO.kakaoId}</span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">국내 사무소 :</span>
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">현지 라운지 :</span>
                <span>{COMPANY_INFO.vietnamOffice}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">사업자 등록 :</span>
                <span>{COMPANY_INFO.businessNumber}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">보증 보험 :</span>
                <span className="text-emerald-300">{COMPANY_INFO.tourLicense}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white w-24 shrink-0">운영 시간 :</span>
                <span className="text-emerald-400 font-semibold">{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
