import React from 'react';
import { ExternalLink, Sparkles, Handshake } from 'lucide-react';
import { PARTNER_COMPANY_INFO } from '../data/companyInfo';

interface BrandLogoLockupProps {
  onNavigateHome?: () => void;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Co-branding Logo Lockup for XinChao Tour ✕ VITRACO Tour
 * Demonstrates the official strategic MOU partnership between the two companies.
 * Carefully harmonized in scale, geometry, stroke-weights, and color balance.
 */
export const BrandLogoLockup: React.FC<BrandLogoLockupProps> = ({
  onNavigateHome,
  size = 'md',
  theme = 'light',
  showSubtitle = true,
  className = ''
}) => {
  const isDark = theme === 'dark';

  // Dimension scaling
  const emblemDim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9 sm:w-10 sm:h-10';
  const mainTextSize = size === 'sm' ? 'text-sm sm:text-base' : size === 'lg' ? 'text-lg sm:text-2xl' : 'text-base sm:text-lg';
  const subTextSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[9.5px] sm:text-[10px]';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 shrink-0 select-none ${className}`}>
      {/* 1. XinChao Tour Brand Logo */}
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-2 text-left shrink-0 group cursor-pointer transition-transform duration-150 active:scale-98"
        title="신짜오투어 메인으로 이동"
      >
        {/* Harmonized XinChao Vector Emblem */}
        <div
          className={`${emblemDim} rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 p-0.5 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all shrink-0`}
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="xcSunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="xcWaveGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A7F3D0" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            {/* Luminous Tropical Sunrise */}
            <circle cx="28" cy="12" r="5" fill="url(#xcSunGlow)" />
            <path d="M28 5V3M33 7L35 5M35 12H37M33 17L35 19M28 19V21" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            {/* Stylized Emerald Tropical Palm Silhouette */}
            <path
              d="M12 33C13.5 24 19 18 24 16C19 20 18 25 18 33"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Graceful Palm Fronds */}
            <path
              d="M23 16.5C18 13.5 11 15 8 18C13 18 17 20 20 23"
              stroke="url(#xcWaveGlow)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23 16.5C22 11 17 8 13 8.5C15.5 12 18.5 14.5 22 17"
              stroke="url(#xcWaveGlow)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Ocean horizon breeze curve */}
            <path
              d="M7 32C13 30 19 33 26 31C29 30 32 31 35 32"
              stroke="#6EE7B7"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="shrink-0 flex flex-col justify-center leading-tight">
          <div className={`${mainTextSize} font-black tracking-tight flex items-center gap-0.5 leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span>XinChao</span>
            <span className="text-emerald-500 font-black">Tour</span>
            <Sparkles className="w-2.5 h-2.5 text-amber-400 fill-amber-400 shrink-0 ml-0.5" />
          </div>
          {showSubtitle && (
            <p className={`${subTextSize} font-bold tracking-tight mt-0.5 ${isDark ? 'text-emerald-400/90' : 'text-emerald-700/80'} whitespace-nowrap`}>
              신짜오투어 <span className="opacity-60 font-medium">| 베트남 맞춤여행</span>
            </p>
          )}
        </div>
      </button>

      {/* 2. MOU Collaboration Connector Badge */}
      <div className="flex items-center gap-1 shrink-0 px-0.5">
        <div className="flex flex-col items-center">
          <span className={`text-xs font-black ${isDark ? 'text-slate-500' : 'text-slate-300'} px-0.5 leading-none`}>
            ✕
          </span>
          <span className="text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 text-amber-500 border border-amber-400/35 uppercase tracking-wider scale-90 sm:scale-100 whitespace-nowrap shadow-2xs mt-0.5">
            MOU 제휴
          </span>
        </div>
      </div>

      {/* 3. VITRACO Tour Partner Brand Logo */}
      <a
        href={PARTNER_COMPANY_INFO.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-left shrink-0 group cursor-pointer transition-transform duration-150 active:scale-98"
        title="베트남 공식 MOU 파트너사 VITRACO Tour 공식 홈페이지 새창 열기 (vitracotour.com)"
      >
        {/* Authentic Vitraco Vector Emblem (Amber/Crimson Soaring A & Wings) */}
        <div
          className={`${emblemDim} rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 p-0.5 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:shadow-amber-500/30 group-hover:scale-105 transition-all shrink-0`}
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vitracoFlame" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
              <linearGradient id="vitracoWing" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {/* Vitraco Signature Dynamic Aerodynamic Wing / Soaring "A" */}
            <path
              d="M20 5L33 31H26L20 18L14 31H7L20 5Z"
              fill="url(#vitracoFlame)"
            />
            {/* Dynamic Upward Thrust Accent Bar */}
            <path
              d="M13 25L20 22L27 25L20 20L13 25Z"
              fill="url(#vitracoWing)"
            />
            {/* Bottom Horizon Road / Motion Swoosh */}
            <path
              d="M8 35C16 33.5 24 33.5 32 35"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Star badge at apex symbolizing top tier excellence */}
            <circle cx="20" cy="5" r="1.5" fill="#FEF08A" />
          </svg>
        </div>

        {/* Vitraco Wordmark */}
        <div className="shrink-0 flex flex-col justify-center leading-tight">
          <div className={`${mainTextSize} font-black tracking-tight flex items-center gap-1 leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span className="font-extrabold tracking-wide">VITRACO</span>
            <span className="text-amber-500 font-black">TOUR</span>
            <ExternalLink className="w-2.5 h-2.5 text-amber-500 opacity-60 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:inline-block" />
          </div>
          {showSubtitle && (
            <p className={`${subTextSize} font-bold tracking-tight mt-0.5 ${isDark ? 'text-amber-400/90' : 'text-amber-700/80'} whitespace-nowrap flex items-center gap-1`}>
              <span>비트라코</span>
              <span className="opacity-60 font-medium">| 다낭 본사 운송·투어</span>
            </p>
          )}
        </div>
      </a>
    </div>
  );
};
