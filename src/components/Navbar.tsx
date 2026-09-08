import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Search, 
  Lock, 
  Sparkles, 
  Menu, 
  X, 
  Palmtree, 
  DollarSign, 
  CalendarCheck, 
  BookOpen, 
  Bot 
} from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, DEFAULT_KAKAO_LINK, handleOpenKakaoTalkDirect } from '../constants';
import { COMPANY_INFO } from '../data/companyInfo';
import { ExchangeRates } from '../lib/exchangeRate';

export type NavPage = 'home' | 'simple' | 'free_travel' | 'villa' | 'golf' | 'travel_info' | 'reservation';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenConsultation: () => void;
  onOpenAiAssistant?: () => void;
  onOpenTravelInfo?: (tab?: any) => void;
  onOpenAdmin?: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  exchangeRates: ExchangeRates;
  onOpenRateCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation,
  onOpenAiAssistant,
  onOpenTravelInfo,
  onOpenAdmin,
  searchTerm,
  onSearchChange,
  exchangeRates,
  onOpenRateCalculator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const vndPerThousandKRW = Math.round((1000 / (exchangeRates.KRW || 1350)) * (exchangeRates.VND || 25200));

  const navItems: { key: NavPage; label: string; badge?: string }[] = [
    { key: 'simple', label: '⚡심플홈', badge: '인기' },
    { key: 'home', label: '전체상품' },
    { key: 'free_travel', label: '자유여행' },
    { key: 'villa', label: '풀빌라' },
    { key: 'golf', label: '골프여행' },
    { key: 'travel_info', label: '여행필수정보' },
    { key: 'reservation', label: '예약문의' },
  ];

  const handleItemClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-slate-200 text-xs py-1.5 px-3 sm:px-4 border-b border-teal-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs shrink-0 whitespace-nowrap">
            <span className="flex items-center gap-1.5 font-black text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% 현지 직영 · 한국어 전담 가이드 & 단독 VIP 차량</span>
            </span>
            <span className="hidden lg:inline-block text-teal-800">|</span>
            {/* Live Exchange Rate Indicator */}
            <button
              onClick={onOpenRateCalculator}
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-emerald-300 transition cursor-pointer font-bold bg-white/5 px-2 py-0.5 rounded-md border border-white/10"
              title="실시간 베트남 동(VND) 환율 계산기 열기"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>실시간 환율: 1,000원 ≒ <strong className="text-amber-300">{vndPerThousandKRW.toLocaleString()}동</strong></span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 text-xs shrink-0 whitespace-nowrap ml-auto">
            {/* Travel info guide trigger */}
            <button
              onClick={() => handleItemClick('travel_info')}
              className="hidden xl:flex items-center gap-1 text-slate-200 hover:text-amber-300 transition cursor-pointer text-xs font-bold"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span>여행정보 꿀팁</span>
            </button>

            {/* AI Assistant trigger */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="hidden xl:flex items-center gap-1 text-teal-300 hover:text-white transition cursor-pointer text-xs font-bold bg-teal-500/20 px-2 py-0.5 rounded-md border border-teal-400/30"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI 상담</span>
              </button>
            )}

            {/* Phone button */}
            <a
              href={COMPANY_PHONE_TEL}
              className="hidden md:flex items-center gap-1 text-slate-200 hover:text-emerald-300 font-bold transition"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_PHONE}</span>
            </a>

            {/* Kakao quick chat */}
            <a
              href={DEFAULT_KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleOpenKakaoTalkDirect(e)}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-black transition cursor-pointer bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30"
              title="카카오톡 1:1 오픈채팅으로 바로 연결"
            >
              <MessageCircle className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>카톡 상담</span>
            </a>

            {/* Admin trigger button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 flex items-center gap-1 px-2 py-0.5 rounded-md border border-amber-400/40 transition cursor-pointer font-bold shrink-0"
                title="관리자 모드 (상품 등록·수정·관리)"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>관리자</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 lg:gap-4">
          {/* Logo */}
          <button
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2 text-left shrink-0 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition shrink-0">
              <Palmtree className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </div>
            <div className="shrink-0">
              <div className="font-black text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-0.5 leading-none">
                <span>XinChao</span>
                <span className="text-emerald-600">Tour</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-tight mt-0.5 whitespace-nowrap">
                신짜오투어 | 베트남 맞춤여행
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links - Always Single Row */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 shrink-0 flex-nowrap whitespace-nowrap">
            {navItems.map(item => {
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item.key)}
                  className={`px-2.5 lg:px-3 py-2 rounded-xl text-xs lg:text-sm font-extrabold transition-all cursor-pointer relative flex items-center gap-1 shrink-0 whitespace-nowrap leading-none ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : item.key === 'simple'
                      ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[9px] px-1 py-0.2 bg-rose-500 text-white font-black rounded-full shadow-2xs leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search bar & Action Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap whitespace-nowrap">
            {/* Quick Search */}
            <div className="relative hidden 2xl:block w-36">
              <input
                type="text"
                placeholder="지역, 골프 검색"
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-full pl-7 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2 pointer-events-none" />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* AI Advisor button */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI 플래너</span>
              </button>
            )}

            {/* Top Quick Consultation button */}
            <button
              onClick={onOpenConsultation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-xs shadow-sm hover:shadow-md transition flex items-center gap-1.5 shrink-0 cursor-pointer whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>1:1 상담</span>
            </button>

            {/* Mobile Hamburger Toggle (only on smaller screens) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="베트남 여행상품, 풀빌라, 골프 검색"
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item.key)}
                  className={`p-3 rounded-xl text-sm font-extrabold transition text-left flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : item.key === 'simple'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && !isActive && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-rose-500 text-white font-black rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && <span className="text-xs">●</span>}
                </button>
              );
            })}
          </div>

          {/* Quick Tools */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleItemClick('travel_info')}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>여행필수정보</span>
            </button>
            {onOpenAiAssistant && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="p-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI 맞춤 상담</span>
              </button>
            )}
          </div>

          {/* Mobile Quick Contact buttons */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <a
              href={COMPANY_PHONE_TEL}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>전화 상담</span>
            </a>
            <a
              href={DEFAULT_KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleOpenKakaoTalkDirect(e);
              }}
              className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              <span>카카오톡 1:1 상담</span>
            </a>
          </div>

          {/* Mobile Admin Mode Entry Button */}
          {onOpenAdmin && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-amber-300 text-xs font-black flex items-center justify-between shadow-md transition-all cursor-pointer border border-amber-400/30"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>관리자 모드 (상품 등록·수정·관리)</span>
                </div>
                <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-md font-extrabold">ADMIN</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
