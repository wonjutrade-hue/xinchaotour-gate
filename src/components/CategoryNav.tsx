import React from 'react';
import { Region, City, Category } from '../types';
import { MapPin, ArrowUpDown, Sparkles, Filter } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: Category | '전체';
  activeRegion: Region;
  activeCity: City;
  subFilter?: string;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating';
  onSelectCategory: (cat: Category | '전체') => void;
  onSelectRegion: (reg: Region) => void;
  onSelectCity: (city: City) => void;
  onSelectSubFilter?: (sf: string) => void;
  onSortChange: (sort: 'popular' | 'price_asc' | 'price_desc' | 'rating') => void;
  totalProductsCount: number;
}

export const REGION_CITIES: Record<Exclude<Region, '전체'>, City[]> = {
  북부: ['하노이', '하롱베이', '닌빈', '사파', '하장'],
  중부: ['다낭', '호이안', '후에'],
  남부: ['나트랑', '달랏', '호치민', '푸꾸옥', '무이네'],
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  activeRegion,
  activeCity,
  sortBy,
  onSelectCategory,
  onSelectRegion,
  onSelectCity,
  onSortChange,
  totalProductsCount,
}) => {
  const categories: { key: Category | '전체'; label: string; icon: string; desc: string }[] = [
    { key: '전체', label: '전체 상품', icon: '🌟', desc: '모든 여행' },
    { key: '자유여행', label: '단독 자유여행', icon: '🛫', desc: 'VIP 단독차량' },
    { key: '풀빌라', label: '독채 풀빌라', icon: '🏰', desc: '프라이빗 수영장' },
    { key: '골프투어', label: '명문 골프여행', icon: '⛳', desc: '90홀 챔피언십' },
    { key: '추천패키지', label: '추천 패키지', icon: '🎒', desc: '알찬 힐링코스' },
  ];

  return (
    <div id="filter-section" className="bg-gradient-to-b from-teal-50/50 via-white to-slate-50 border-y border-teal-100/70 py-4 px-3 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-3.5">
        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-black transition-all shrink-0 flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-emerald-500/25 border border-teal-400/40 ring-2 ring-emerald-400/30'
                    : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 border border-slate-200/90 hover:border-emerald-300'
                }`}
              >
                <span className="text-base sm:text-lg">{cat.icon}</span>
                <div className="text-left">
                  <div>{cat.label}</div>
                  <div className={`text-[10px] font-medium hidden sm:block ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {cat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filter Card */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-teal-100/90 shadow-sm space-y-3">
          {/* Region & Sort Controls Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            {/* Region buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-extrabold text-slate-600 flex items-center gap-1 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>권역 선택:</span>
              </span>
              {(['전체', '북부', '중부', '남부'] as const).map((reg) => {
                const isActive = activeRegion === reg;
                return (
                  <button
                    key={reg}
                    onClick={() => {
                      onSelectRegion(reg);
                      onSelectCity('전체');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs border border-emerald-500 ring-2 ring-emerald-300/40'
                        : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200/60'
                    }`}
                  >
                    {reg === '전체' ? '베트남 전역' : reg}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto flex-wrap justify-end">
              {/* Product Count Badge */}
              <span className="text-slate-500 font-bold bg-teal-50 border border-teal-200/60 px-2.5 py-1 rounded-xl">
                총 <strong className="text-teal-700 font-black">{totalProductsCount}</strong>개 여행상품
              </span>

              {/* Sort Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/70">
                <span className="text-[11px] text-slate-400 px-1 font-semibold flex items-center gap-0.5">
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </span>
                {(
                  [
                    { key: 'popular', label: '인기순' },
                    { key: 'rating', label: '평점순' },
                    { key: 'price_asc', label: '낮은가격순' },
                    { key: 'price_desc', label: '높은가격순' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => onSortChange(opt.key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                      sortBy === opt.key
                        ? 'bg-white text-emerald-700 shadow-xs font-black border border-slate-200'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* City sub-filters if a region is selected */}
          {activeRegion !== '전체' && (
            <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100 overflow-x-auto pb-1 text-xs">
              <span className="text-teal-700 font-black shrink-0">📍 {activeRegion} 주요 도시:</span>
              <button
                onClick={() => onSelectCity('전체')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black whitespace-nowrap transition cursor-pointer ${
                  activeCity === '전체'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {activeRegion} 전체
              </button>
              {REGION_CITIES[activeRegion]?.map((city) => (
                <button
                  key={city}
                  onClick={() => onSelectCity(city)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black whitespace-nowrap transition cursor-pointer ${
                    activeCity === city
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
