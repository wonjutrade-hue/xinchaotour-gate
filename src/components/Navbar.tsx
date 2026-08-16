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
  DollarSign,
  Star,
  Building2,
  CalendarCheck,
  Send
} from 'lucide-react';
import { Category, Region, City } from '../types';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';
import { ExchangeRates } from '../lib/exchangeRate';

export type MainNavPage = 'home' | '자유여행' | '풀빌라' | '골프여행' | '여행후기' | '회사소개' | '예약문의';

interface NavbarProps {
  currentPage: MainNavPage;
  onNavigate: (page: MainNavPage) => void;
  activeCategory: Category | '전체';
  onSelectCategory: (cat: Category | '전체') => void;
  onOpenConsultation: () => void;
  onOpenAdmin?: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  exchangeRates: ExchangeRates;
  onOpenRateCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  activeCategory,
  onSelectCategory,
  onOpenConsultation,
  onOpenAdmin,
  searchTerm,
  onSearchChange,
  exchangeRates,
  onOpenRateCalculator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { page: MainNavPage; label: string; icon: string }[] = [
    { page: 'home', label: 'HOME', icon: '🏠' },
    { page: '자유여행', label: '자유여행', icon: '🛫' },
    { page: '풀빌라', label: '풀빌라', icon: '🏰' },
    { page: '골프여행', label: '골프여행', icon: '⛳' },
    { page: '여행후기', label: '여행후기', icon: '⭐' },
    { page: '회사소개', label: '회사소개', icon: '🏢' },
    { page: '예약문의', label: '예약문의', icon: '📝' }
  ];

  const handleNavClick = (page: MainNavPage) => {
    onNavigate(page);
    if (page === '자유여행') onSelectCategory('자유여행');
    else if (page === '풀빌라') onSelectCategory('풀빌라');
    else if (page === '골프여행') onSelectCategory('골프투어');
    setMobileMenuOpen(false);
  };

  const vndPerThousandKRW = Math.round((1000 / (exchangeRates.KRW || 1350)) * (exchangeRates.VND || 25200));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-slate-200 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-2.5 text-slate-300 text-[11px] sm:text-xs flex-wrap">
            <span className="flex items-center gap-1.5 font-bold whitespace-nowrap text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              100% 현지 직영 | 한국인 전담 가이드 & 단독 VIP 차량
            </span>
            <span className="hidden md:inline-block text-slate-700">|</span>
            {/* Live Exchange Rate Indicator */}
            <button
              onClick={onOpenRateCalculator}
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition cursor-pointer font-medium"
              title="실시간 베트남 동(VND) 환율 계산기 열기"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>실시간 환율: 1,000원 ≒ <strong>{vndPerThousandKRW.toLocaleString()}동</strong></span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs ml-auto">
            {/* Phone button */}
            <a
              href={COMPANY_PHONE_TEL}
              className="flex items-center gap-1 text-slate-200 hover:text-emerald-400 font-semibold transition"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_PHONE}</span>
            </a>

            {/* Kakao quick chat */}
            <button
              onClick={(e) => handleOpenKakaoTalkDirect(e)}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold transition cursor-pointer"
            >
              <MessageCircle className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>카카오톡 상담</span>
            </button>

            {/* Admin trigger button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 px-1.5 py-0.5 rounded transition cursor-pointer"
                title="관리자 모드"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden md:inline">관리자</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
              <Palmtree className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-1">
                <span>XinChao</span>
                <span className="text-emerald-600">Tour</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                베트남 전문 여행 플랫폼 · 신짜오투어
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-extrabold shadow-2xs'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search bar & Action Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search */}
            <div className="relative hidden md:block w-48 xl:w-56">
              <input
                type="text"
                placeholder="지역, 풀빌라, 골프 검색"
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-full pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Top Quick Consultation button */}
            <button
              onClick={onOpenConsultation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow-md transition flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="hidden sm:inline">1:1 빠른상담</span>
              <span className="sm:hidden">상담</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`p-3 rounded-xl text-sm font-bold transition text-left flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
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
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleOpenKakaoTalkDirect(e);
              }}
              className="p-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>카카오톡 상담</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
