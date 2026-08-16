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
  Bot,
  Smartphone,
  QrCode
} from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';
import { COMPANY_INFO } from '../data/companyInfo';
import { ExchangeRates } from '../lib/exchangeRate';

export type NavPage = 'home' | 'free_travel' | 'villa' | 'golf' | 'travel_info' | 'reservation';

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
  onOpenDeviceSync?: () => void;
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
  onOpenRateCalculator,
  onOpenDeviceSync
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const vndPerThousandKRW = Math.round((1000 / (exchangeRates.KRW || 1350)) * (exchangeRates.VND || 25200));

  const navItems: { key: NavPage; label: string; icon?: string }[] = [
    { key: 'home', label: 'HOME' },
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
            {/* PC <-> Mobile Sync button */}
            {onOpenDeviceSync && (
              <button
                onClick={onOpenDeviceSync}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 hover:text-emerald-200 border border-emerald-400/40 transition cursor-pointer font-bold text-[11px] shadow-xs"
                title="스마트폰 카메라로 QR 스캔 또는 6자리 코드로 연동"
              >
                <Smartphone className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>PC ⇄ 핸드폰 연동</span>
              </button>
            )}

            {/* Travel info guide trigger */}
            <button
              onClick={() => handleItemClick('travel_info')}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-300 transition cursor-pointer text-xs font-semibold"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span>여행정보 가이드</span>
            </button>

            {/* AI Assistant trigger */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="hidden md:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition cursor-pointer text-xs font-bold"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI 상담</span>
              </button>
            )}

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

            {/* WhatsApp */}
            <a
              href={COMPANY_INFO.whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition"
            >
              <span>WhatsApp</span>
            </a>

            {/* Admin trigger button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 px-1.5 py-0.5 rounded transition cursor-pointer"
                title="관리자 모드"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden lg:inline">관리자</span>
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
            onClick={() => handleItemClick('home')}
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
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider">
                신짜오투어 | 베트남 맞춤 여행 전문
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(item => {
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item.key)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Search bar & Action Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search */}
            <div className="relative hidden md:block w-40 xl:w-48">
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

            {/* AI Advisor button */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI 플래너</span>
              </button>
            )}

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
              const isActive = currentPage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item.key)}
                  className={`p-3 rounded-xl text-sm font-extrabold transition text-left flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs">●</span>}
                </button>
              );
            })}
          </div>

          {/* Quick Tools */}
          <div className="pt-2 grid grid-cols-3 gap-2">
            <button
              onClick={() => handleItemClick('travel_info')}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>여행정보</span>
            </button>
            {onOpenDeviceSync && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDeviceSync();
                }}
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>기기연동</span>
              </button>
            )}
            {onOpenAiAssistant && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="p-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI 상담</span>
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
