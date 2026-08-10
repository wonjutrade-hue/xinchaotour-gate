import React, { useState } from 'react';
import { 
  Compass, 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Search, 
  Lock, 
  Sparkles, 
  Menu, 
  X,
  Palmtree,
  Calendar,
  Layers,
  RefreshCw,
  TrendingUp,
  ChevronDown,
  Sun,
  DollarSign,
  FileText,
  Utensils,
  Lightbulb,
  Headphones
} from 'lucide-react';
import { Category, Region, City } from '../types';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';
import { ExchangeRates } from '../lib/exchangeRate';
import { TravelInfoTab } from './TravelInfoModal';

interface NavbarProps {
  activeCategory: Category | '전체';
  activeRegion: Region;
  activeCity: City;
  onSelectCategory: (cat: Category | '전체') => void;
  onSelectRegion: (reg: Region) => void;
  onSelectCity: (city: City) => void;
  onOpenConsultation: () => void;
  onOpenAiAssistant: () => void;
  onOpenAdmin: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  exchangeRates: ExchangeRates;
  onOpenRateCalculator?: () => void;
  onOpenTravelInfo?: (tab?: TravelInfoTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  activeRegion,
  activeCity,
  onSelectCategory,
  onSelectRegion,
  onSelectCity,
  onOpenConsultation,
  onOpenAiAssistant,
  onOpenAdmin,
  searchTerm,
  onSearchChange,
  exchangeRates,
  onOpenRateCalculator,
  onOpenTravelInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [travelDropdownOpen, setTravelDropdownOpen] = useState(false);

  const categories: { key: Category | '전체'; label: string; icon: string }[] = [
    { key: '전체', label: '전체 보기', icon: '🌏' },
    { key: '추천패키지', label: '추천 패키지', icon: '🎒' },
    { key: '자유여행', label: '자유 여행', icon: '🛫' },
    { key: '골프투어', label: '골프 투어', icon: '⛳' },
    { key: '풀빌라', label: '풀빌라 & 리조트', icon: '🏰' },
  ];

  const travelInfoItems: { tab: TravelInfoTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'course', label: '여행정보 코스/안내', icon: <Compass className="w-4 h-4 text-teal-600" /> },
    { tab: 'weather', label: '베트남 날씨', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { tab: 'exchange', label: '베트남 환율', icon: <DollarSign className="w-4 h-4 text-emerald-600" /> },
    { tab: 'visa', label: '비자 가이드', icon: <FileText className="w-4 h-4 text-sky-600" /> },
    { tab: 'food', label: '맛집 가이드', icon: <Utensils className="w-4 h-4 text-rose-500" /> },
    { tab: 'tips', label: '여행 알짜팁', icon: <Lightbulb className="w-4 h-4 text-amber-600" /> },
  ];

  // Calculate live VND per 1000 KRW
  const vndPerThousandKRW = Math.round((1000 / (exchangeRates.KRW || 1350)) * (exchangeRates.VND || 25200));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% 현지 직영 | 한국인 전담 가이드
            </span>
            <span className="hidden md:inline-block text-slate-700">|</span>
            {/* Live Exchange Rate Indicator */}
            <button
              onClick={onOpenRateCalculator}
              className="hidden md:inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700 transition-colors"
              title="실시간 환율 상세 및 환율 계산기 보기"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>실시간 연동 환율: 1,000원 ≒ {vndPerThousandKRW.toLocaleString()} ₫</span>
              <span className="text-[10px] text-slate-400 ml-1">($1 = {Math.round(exchangeRates.KRW).toLocaleString()}원)</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href={COMPANY_PHONE_TEL} 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              고객센터 {COMPANY_PHONE}
            </a>
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold transition-colors bg-amber-400/10 hover:bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30"
              title="카카오톡 개인/직영 상담 즉시 연결"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
              실시간 카톡 바로상담
            </button>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors ml-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-[11px]"
              title="관리자 전용 상품 수정 및 업로드/다운로드"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              관리자
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                onSelectCategory('전체');
                onSelectRegion('전체');
                onSelectCity('전체');
              }}
              className="flex items-center gap-3 text-left group py-1"
            >
              <img 
                src="/logo.svg" 
                alt="Tours XIN CHÀO" 
                className="h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform" 
              />
              <div className="hidden sm:block border-l border-slate-200 pl-3 py-1">
                <span className="text-[10px] font-extrabold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  베트남 현지 직영
                </span>
                <p className="text-[11px] font-bold text-slate-600 mt-0.5">
                  맞춤 패키지 · 골프 · 독채 풀빌라
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Categories */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    onSelectCategory(cat.key);
                    onSelectRegion('전체');
                    onSelectCity('전체');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}

            {/* 여행정보 Dropdown Menu matching Image 2 */}
            <div 
              className="relative"
              onMouseEnter={() => setTravelDropdownOpen(true)}
              onMouseLeave={() => setTravelDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  setTravelDropdownOpen(!travelDropdownOpen);
                  if (onOpenTravelInfo) onOpenTravelInfo('course');
                }}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl font-black text-sm text-teal-800 hover:bg-teal-50 transition-all border border-teal-200 bg-teal-50/50"
              >
                <span>여행정보</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${travelDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {travelDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1 animate-fadeIn z-50">
                  {travelInfoItems.map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => {
                        setTravelDropdownOpen(false);
                        if (onOpenTravelInfo) onOpenTravelInfo(item.tab);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-teal-50 text-slate-800 hover:text-teal-900 text-xs font-bold flex items-center gap-2.5 transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-sm hover:shadow transition-all group"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>AI 여행 가이드</span>
            </button>

            {/* Quick Consultation Button */}
            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>견적/상담 신청</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAiAssistant}
              className="p-2 text-amber-600 bg-amber-50 rounded-xl hover:bg-amber-100"
              title="AI 여행가이드"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4">
          <div>
            <span className="text-[10px] font-black text-slate-400 block uppercase mb-1">카테고리</span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    onSelectCategory(cat.key);
                    onSelectRegion('전체');
                    onSelectCity('전체');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold ${
                    activeCategory === cat.key
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Travel Info Section */}
          <div>
            <span className="text-[10px] font-black text-teal-800 block uppercase mb-1">여행 정보 가이드</span>
            <div className="grid grid-cols-2 gap-2">
              {travelInfoItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTravelInfo) onOpenTravelInfo(item.tab);
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 text-teal-900 text-xs font-bold text-left"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="w-full py-2.5 bg-amber-400 text-slate-950 rounded-xl font-black text-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              카카오톡 1:1 상담 바로 연결
            </button>
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              실시간 예약 및 맞춤견적 신청
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              관리자 패널 (상품 수정/업로드)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

