import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Car, 
  UserCheck, 
  Utensils, 
  Hotel, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  PhoneCall, 
  Calendar, 
  Users, 
  ArrowRight, 
  Check, 
  ChevronRight,
  Send,
  Palmtree
} from 'lucide-react';
import { Product, Category, City } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, DEFAULT_KAKAO_LINK, handleOpenKakaoTalkDirect } from '../constants';
import { trackVisitorEvent } from '../lib/analytics';
import { ExchangeRates } from '../lib/exchangeRate';

interface SimpleLandingPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenConsultation: () => void;
  onSubmitInquiry: (data: {
    userName: string;
    userPhone: string;
    kakaoId?: string;
    categoryPreference?: string;
    regionPreference?: string;
    travelerCount: { adult: number; child: number };
    message: string;
  }) => Promise<boolean>;
  exchangeRates: ExchangeRates;
  onSwitchToFullView?: () => void;
}

export const SimpleLandingPage: React.FC<SimpleLandingPageProps> = ({
  products,
  onSelectProduct,
  onOpenConsultation,
  onSubmitInquiry,
  exchangeRates,
  onSwitchToFullView,
}) => {
  // Active theme tab: 'free_travel' | 'villa' | 'golf'
  const [selectedTheme, setSelectedTheme] = useState<'free_travel' | 'villa' | 'golf'>('free_travel');
  
  // City filter inside theme
  const [selectedCity, setSelectedCity] = useState<string>('전체');

  // Fast consultation form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formKakao, setFormKakao] = useState('');
  const [formCategory, setFormCategory] = useState('🏝️ 단독 자유여행');
  const [formDestination, setFormDestination] = useState('다낭/호이안');
  const [formAdults, setFormAdults] = useState(2);
  const [formMemo, setFormMemo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Map theme to Category
  const themeCategoryMap: Record<'free_travel' | 'villa' | 'golf', Category> = {
    free_travel: '자유여행',
    villa: '풀빌라',
    golf: '골프투어',
  };

  const currentCategory = themeCategoryMap[selectedTheme];

  // Filter products for this theme
  const themeProducts = products.filter(p => {
    if (selectedTheme === 'free_travel') {
      return p.category === '자유여행' || p.category === '추천패키지';
    }
    return p.category === currentCategory;
  });

  // Unique cities available in this theme
  const availableCities = ['전체', ...Array.from(new Set(themeProducts.map(p => p.city).filter(Boolean)))];

  // Filtered by city & pick top 4 best sellers
  const displayedProducts = themeProducts
    .filter(p => selectedCity === '전체' || p.city === selectedCity)
    .slice(0, 6);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert('성함과 연락처(휴대폰 번호)를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const ok = await onSubmitInquiry({
        userName: formName.trim(),
        userPhone: formPhone.trim(),
        kakaoId: formKakao.trim(),
        categoryPreference: formCategory,
        regionPreference: formDestination,
        travelerCount: { adult: formAdults, child: 0 },
        message: formMemo.trim() || `[심플 간편상담 신청] ${formCategory} / 희망지역: ${formDestination} / 인원: ${formAdults}인`,
      });

      if (ok) {
        setIsSubmitted(true);
        trackVisitorEvent('inquiry_submit', `[심플랜딩] ${formName} - ${formCategory}`);
      } else {
        alert('신청 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주시거나 카카오톡으로 문의해 주세요.');
      }
    } catch (err) {
      alert('접수 처리 중 통신 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="simple-landing-container" className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT & CALL BAR */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-white/20 px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider">신짜오투어 심플</span>
            <span className="truncate">100% 한국어 전담 가이드 & 단독 전용차량 · 노쇼핑 안심케어</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={COMPANY_PHONE_TEL}
              className="flex items-center gap-1 hover:underline text-white font-extrabold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{COMPANY_PHONE}</span>
            </a>
            {onSwitchToFullView && (
              <button
                onClick={onSwitchToFullView}
                className="hidden sm:inline-flex items-center gap-1 bg-black/20 hover:bg-black/30 text-white text-[11px] px-2.5 py-1 rounded-full transition"
                title="전체 상품 카탈로그 보기"
              >
                <span>전체 상품 모드</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. COMPACT HERO: 3-SECOND CLEAR VALUE PROPOSITION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-slate-800">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Logo & Headline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-extrabold mb-5">
            <Palmtree className="w-4 h-4 text-emerald-400" />
            <span>베트남 현지 직영 1등 여행사 · 신짜오투어 (Xin Chao Tour)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] mb-5">
            복잡한 여행 준비는 끝, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              한국어 가이드 & 단독 차량
            </span>
            으로 떠나세요!
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            남들과 섞이지 않는 우리 가족·일행만의 <strong className="text-white font-bold">단독 VIP 차량</strong>,
            언어 걱정 없는 <strong className="text-white font-bold">한국어 전문 가이드</strong>, 
            그리고 <strong className="text-emerald-400 font-bold">1끼 20만동 식대</strong>까지 모두 포함된 투명한 견적.
          </p>

          {/* Quick Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] font-black text-base px-6 py-4 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>카카오톡 1:1 실시간 상담</span>
            </button>

            <a
              href="#simple-quote-form"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base px-6 py-4 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>초간단 맞춤 견적 신청</span>
            </a>
          </div>

          {/* 3 Core Trust Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto mt-10 pt-8 border-t border-slate-800/80 text-left">
            <div className="flex items-start gap-2.5 bg-slate-800/60 p-3 sm:p-4 rounded-2xl border border-slate-700/50">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">100% 한국어 가이드</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">전 일정 밀착 소통 케어</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-800/60 p-3 sm:p-4 rounded-2xl border border-slate-700/50">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0 text-teal-400">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">단독 VIP 전용차량</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">모르는 사람과 합승 없음</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-800/60 p-3 sm:p-4 rounded-2xl border border-slate-700/50">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">1끼 20만동 식대포함</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">현지 검증 로컬 맛집</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE CORE THEMES SELECTOR */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <span className="text-emerald-400 text-xs font-black tracking-widest uppercase">Best Selection</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            원하시는 여행 테마를 선택하세요
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
            핵심 상품만 엄선하여 불필요한 고민 없이 가장 인기 있는 코스로 안내해 드립니다.
          </p>
        </div>

        {/* 3 Big Visual Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-8">
          {/* Tab 1: 자유여행 */}
          <button
            onClick={() => {
              setSelectedTheme('free_travel');
              setSelectedCity('전체');
              trackVisitorEvent('tab_change', '심플-단독자유여행');
            }}
            className={`p-5 rounded-3xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedTheme === 'free_travel'
                ? 'bg-gradient-to-br from-emerald-900/60 to-slate-900 border-emerald-500 ring-2 ring-emerald-500/30 shadow-xl'
                : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="text-3xl mb-2">🏝️</div>
            <h3 className="text-lg font-black text-white">단독 자유여행</h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              공항 맞춤 픽업 + 4·5성급 호텔 + 1끼 20만동 식대 + 단독 전용 차량
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
              <span>상품 보러가기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Tab 2: 풀빌라 */}
          <button
            onClick={() => {
              setSelectedTheme('villa');
              setSelectedCity('전체');
              trackVisitorEvent('tab_change', '심플-독채풀빌라');
            }}
            className={`p-5 rounded-3xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedTheme === 'villa'
                ? 'bg-gradient-to-br from-teal-900/60 to-slate-900 border-teal-500 ring-2 ring-teal-500/30 shadow-xl'
                : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="text-3xl mb-2">🏰</div>
            <h3 className="text-lg font-black text-white">프라이빗 독채 풀빌라</h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              가족·단체 완벽한 프라이빗 수영장 & 대저택 전용 휴양 (조식 포함)
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-teal-400">
              <span>풀빌라 보러가기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Tab 3: 골프투어 */}
          <button
            onClick={() => {
              setSelectedTheme('golf');
              setSelectedCity('전체');
              trackVisitorEvent('tab_change', '심플-명문골프투어');
            }}
            className={`p-5 rounded-3xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedTheme === 'golf'
                ? 'bg-gradient-to-br from-cyan-900/60 to-slate-900 border-cyan-500 ring-2 ring-cyan-500/30 shadow-xl'
                : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="text-3xl mb-2">⛳</div>
            <h3 className="text-lg font-black text-white">명문 54홀 골프투어</h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              4인 1팀 기준 맞춤 견적, 그린피+카트+캐디+클럽하우스 중·석식 올포함
            </p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-cyan-400">
              <span>골프 코스 보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">지역 선택:</span>
          {availableCities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCity === city
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Selected Theme Top 3~6 Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedProducts.map(prod => {
            const displayImg = prod.imageUrl || '/images/danang_golden_bridge.jpg';
            const priceWon = prod.priceKRW ? `${prod.priceKRW.toLocaleString()}원` : '맞춤 견적 문의';

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden hover:border-emerald-500/70 hover:shadow-2xl hover:shadow-emerald-950/50 transition-all flex flex-col group cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={displayImg}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-md text-white font-extrabold text-[11px] shadow-sm">
                      {prod.city || '베트남'}
                    </span>
                    {prod.city === '다낭' && prod.category === '풀빌라' && (
                      <span className="px-2.5 py-1 rounded-lg bg-teal-500/90 backdrop-blur-md text-white font-black text-[11px] shadow-sm border border-teal-300/40">
                        💎 대표 직영
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-slate-200 font-bold text-[11px]">
                      {prod.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-white text-base leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Quick key inclusion points */}
                    <div className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-700/60">
                      {(prod.included || []).slice(0, 2).map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-emerald-300/90">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">1인 예상가 (세금/봉사료 일체포함)</span>
                      <span className="text-xl font-black text-emerald-400">{priceWon}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      <span>상세보기</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* If no products for selected city */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-12 bg-slate-800/40 rounded-3xl border border-slate-700/40">
            <p className="text-slate-400 text-sm">해당 지역의 추천 상품을 준비 중입니다.</p>
            <button
              onClick={() => setSelectedCity('전체')}
              className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              전체 지역 보기
            </button>
          </div>
        )}
      </section>

      {/* 4. FAST QUOTE & 1:1 KAKAO FORM SECTION */}
      <section id="simple-quote-form" className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">Fast & Easy</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                30초 초간단 여행 맞춤 견적 신청
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                출발 희망일, 인원수만 알려주시면 베트남 전문 플래너가 <br className="hidden sm:inline" />
                가장 합리적인 단독 투어 맞춤 일정을 무료로 설계해 드립니다.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-2xl p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">맞춤 견적 신청이 정상 접수되었습니다!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  전문 플래너가 남겨주신 연락처({formPhone})로 빠른 시간 내에 친절한 1:1 맞춤 견적을 보내드립니다.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleOpenKakaoTalkDirect}
                    className="w-full sm:w-auto px-6 py-3 bg-[#FEE500] text-[#191919] font-black rounded-xl text-sm hover:bg-[#FDD835] transition"
                  >
                    카카오톡으로 바로 대화하기
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormName('');
                      setFormPhone('');
                      setFormMemo('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-slate-700 text-slate-200 font-bold rounded-xl text-xs hover:bg-slate-600 transition"
                  >
                    추가 신청하기
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      신청자 성함 <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동"
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      연락처(휴대폰 번호) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="예: 010-1234-5678"
                      value={formPhone}
                      onChange={e => setFormPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">희망 여행 테마</label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="🏝️ 단독 자유여행">🏝️ 단독 자유여행</option>
                      <option value="🏰 프라이빗 독채 풀빌라">🏰 독채 풀빌라</option>
                      <option value="⛳ 명문 54홀 골프투어">⛳ 54홀 골프투어</option>
                      <option value="⭐ 맞춤 프리미엄 패키지">⭐ 단독 맞춤 패키지</option>
                    </select>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">희망 지역</label>
                    <select
                      value={formDestination}
                      onChange={e => setFormDestination(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="다낭/호이안">다낭 / 호이안</option>
                      <option value="나트랑/달랏">나트랑 / 달랏</option>
                      <option value="푸꾸옥">푸꾸옥</option>
                      <option value="하노이/하롱베이/사파">하노이 / 하롱베이 / 사파</option>
                      <option value="호치민/무이네">호치민 / 무이네</option>
                      <option value="기타/추천요청">플래너 추천 요청</option>
                    </select>
                  </div>

                  {/* Adult count */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">예상 인원 (성인)</label>
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => setFormAdults(Math.max(1, formAdults - 1))}
                        className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-sm text-white">{formAdults}명</span>
                      <button
                        type="button"
                        onClick={() => setFormAdults(formAdults + 1)}
                        className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Memo */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    추가 요청사항 (출발 예정일, 숙소 등급, 골프 티타임 등)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="예: 10월 중순 3박 5일 일정, 성인 4명 골프 3회 + 5성급 호텔 희망"
                    value={formMemo}
                    onChange={e => setFormMemo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>전송 중입니다...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>무료 맞춤 견적 신청하기</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Direct Contact Options */}
            <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs text-slate-400">전화 또는 카카오톡으로도 언제든 즉시 상담 가능합니다.</p>
                <p className="text-sm font-black text-white mt-0.5">
                  직통 상담: <a href={COMPANY_PHONE_TEL} className="text-emerald-400 hover:underline">{COMPANY_PHONE}</a> (365일 실시간)
                </p>
              </div>

              <button
                onClick={handleOpenKakaoTalkDirect}
                className="flex items-center gap-2 bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>카카오톡 실시간 상담</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER (MINIMAL) */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 py-10 px-4 sm:px-6 text-xs text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="font-black text-slate-300 text-sm flex items-center justify-center gap-2">
            <span>XinChao Tour</span>
            <span className="text-slate-600">|</span>
            <span>신짜오투어</span>
          </div>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            {COMPANY_INFO.name} · 상호: {COMPANY_INFO.brandName} · 사업자등록번호: {COMPANY_INFO.businessNumber} <br />
            주소: {COMPANY_INFO.address} · 고객센터: {COMPANY_PHONE} · 이메일: {COMPANY_INFO.email}
          </p>
          <div className="pt-2 text-[11px] text-slate-600">
            © 2026 XinChao Tour. All Rights Reserved. 100% 현지 직영 단독투어 시스템.
          </div>
        </div>
      </footer>
    </div>
  );
};
