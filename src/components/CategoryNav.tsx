import React from 'react';
import { Region, City, Category } from '../types';
import { MapPin, Compass, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: Category | '전체';
  activeRegion: Region;
  activeCity: City;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating';
  onSelectCategory: (cat: Category | '전체') => void;
  onSelectRegion: (reg: Region) => void;
  onSelectCity: (city: City) => void;
  onSortChange: (sort: 'popular' | 'price_asc' | 'price_desc' | 'rating') => void;
  totalProductsCount: number;
}

const REGION_CITIES: Record<Exclude<Region, '전체'>, City[]> = {
  북부: ['하노이', '사파', '하롱베이', '닌빈'],
  중부: ['다낭', '호이안', '후에', '나트랑'],
  남부: ['호치민', '푸꾸옥', '달랏', '붕따우'],
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
  return (
    <div className="bg-slate-50 border-y border-slate-200/80 pt-6 sm:pt-16 pb-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline whitespace-nowrap">
              카테고리:
            </span>
            {(['전체', '추천패키지', '자유여행', '골프투어', '풀빌라'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  onSelectCity('전체');
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === '전체' && '🌏 전체 상품'}
                {cat === '추천패키지' && '🎒 추천 패키지'}
                {cat === '자유여행' && '🛫 자유 여행'}
                {cat === '골프투어' && '⛳ 골프 투어'}
                {cat === '풀빌라' && '🏰 풀빌라 & 리조트'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 whitespace-nowrap shrink-0">
            <span className="text-teal-700 font-extrabold">{totalProductsCount}개</span>
            <span>의 상품 검색됨</span>
          </div>
        </div>

        {/* Region Breakdown Filter (북부 / 중부 / 남부) */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">베트남 지역 및 주요 도시 선택</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
            {/* Region buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-slate-500 mr-1 whitespace-nowrap">지역:</span>
              {(['전체', '북부', '중부', '남부'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    onSelectRegion(reg);
                    onSelectCity('전체');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeRegion === reg
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {reg === '전체' ? '베트남 전역' : reg}
                </button>
              ))}
            </div>

            {/* Sorting selector */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 self-end md:self-auto whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="popular">인기순 추천</option>
                <option value="price_asc">가격 낮은 순</option>
                <option value="price_desc">가격 높은 순</option>
                <option value="rating">평점 높은순</option>
              </select>
            </div>
          </div>

          {/* Major Cities Pills under selected Region */}
          {activeRegion !== '전체' && (
            <div className="pt-2 flex items-center gap-2 flex-wrap border-t border-slate-100 text-xs">
              <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px] whitespace-nowrap">
                {activeRegion} 주요 도시:
              </span>
              <button
                onClick={() => onSelectCity('전체')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCity === '전체'
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {activeRegion} 전체
              </button>
              {REGION_CITIES[activeRegion]?.map((city) => (
                <button
                  key={city}
                  onClick={() => onSelectCity(city)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    activeCity === city
                      ? 'bg-teal-700 text-white font-bold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
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
