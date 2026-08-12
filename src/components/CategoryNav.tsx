import React from 'react';
import { Region, City, Category } from '../types';
import { MapPin, Compass, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

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
  const scrollToProducts = () => {
    setTimeout(() => {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="bg-slate-50 border-y border-slate-200/80 py-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Unified Main Filter Card */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          {/* Region & Sort Controls Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            {/* Region buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-slate-500 flex items-center gap-1 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>지역:</span>
              </span>
              {(['전체', '북부', '중부', '남부'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    onSelectRegion(reg);
                    onSelectCity('전체');
                    scrollToProducts();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeRegion === reg
                      ? 'bg-amber-400 text-slate-950 font-black shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {reg === '전체' ? '베트남 전역' : reg}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              {/* Product Count */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200/80 whitespace-nowrap shrink-0">
                <span className="text-teal-700 font-extrabold">{totalProductsCount}개</span>
                <span>의 상품</span>
              </div>

              {/* Sorting selector */}
              <div className="flex items-center gap-2 font-medium text-slate-600 whitespace-nowrap">
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
          </div>

          {/* Major Cities Pills under selected Region */}
          {activeRegion !== '전체' && (
            <div className="pt-2 flex items-center gap-2 flex-wrap border-t border-slate-100 text-xs">
              <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px] whitespace-nowrap">
                {activeRegion} 주요 도시:
              </span>
              <button
                onClick={() => {
                  onSelectCity('전체');
                  scrollToProducts();
                }}
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
                  onClick={() => {
                    onSelectCity(city);
                    scrollToProducts();
                  }}
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
