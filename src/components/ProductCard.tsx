import React from 'react';
import { Product } from '../types';
import { Star, MapPin, Calendar, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateUSDFromKRW, formatVND, formatUSD } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickInquire: (product: Product) => void;
  exchangeRates?: ExchangeRates;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickInquire,
  exchangeRates,
}) => {
  const formattedPriceKRW = product.priceKRW.toLocaleString('ko-KR') + '원';
  
  // Real-time calculated VND and USD
  const liveVND = exchangeRates 
    ? calculateVNDFromKRW(product.priceKRW, exchangeRates)
    : (product.priceVND || Math.round(product.priceKRW * 18.6));

  const liveUSD = exchangeRates 
    ? calculateUSDFromKRW(product.priceKRW, exchangeRates)
    : Math.round(product.priceKRW / 1350);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

        {/* Region & City Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold border border-white/20">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{product.region}</span>
          <span className="text-slate-400">•</span>
          <span className="text-amber-300">{product.city}</span>
        </div>

        {/* Category & Discount Sticker */}
        <div className="absolute top-3 right-3 flex items-center gap-1">
          {product.discountPercent && (
            <span className="bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          <span className="bg-teal-700/90 backdrop-blur-md text-white text-[11px] font-extrabold px-2 py-0.5 rounded-lg">
            {product.category}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md text-slate-800 px-2.5 py-1 rounded-md text-xs font-bold">
          <Calendar className="w-3 h-3 text-teal-600" />
          <span>{product.duration}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md text-xs font-black">
          <Star className="w-3 h-3 fill-slate-950" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-[10px] text-slate-800 font-semibold">({product.reviewCount})</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-teal-700 cursor-pointer transition-colors line-clamp-2"
          >
            {product.title}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.subTitle}
          </p>
        </div>

        {/* Specs Highlights */}
        {product.golfSpecs && (
          <div className="bg-emerald-50/80 p-2 rounded-xl text-xs text-emerald-900 font-medium space-y-0.5">
            <p className="font-bold">⛳ Golf: {product.golfSpecs.holes}홀 라운딩 포함</p>
            <p className="text-[11px] text-emerald-700 line-clamp-1">
              코스: {product.golfSpecs.golfCourseNames.join(', ')}
            </p>
          </div>
        )}

        {product.villaSpecs && (
          <div className="bg-sky-50/80 p-2 rounded-xl text-xs text-sky-900 font-medium flex items-center justify-between">
            <span className="font-bold">🏰 {product.villaSpecs.bedrooms}베드룸 독채 풀빌라</span>
            <span className="text-[11px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
              최대 {product.villaSpecs.maxOccupancy}인
            </span>
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block">성인 1인 기준</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">
                {liveVND.toLocaleString('ko-KR')} ₫
              </span>
              <span className="text-xs font-bold text-slate-700">~</span>
            </div>
            <div className="text-[11px] text-teal-700 font-bold flex items-center gap-1.5 mt-0.5">
              <span>약 {(product.priceKRW || 650000).toLocaleString('ko-KR')}원</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal">{formatUSD(liveUSD)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="px-2.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors flex items-center gap-1 shadow-xs"
              title="클릭 시 2단계 없이 카카오톡 개인/직영 상담 연결"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              <span className="hidden sm:inline">카톡상담</span>
            </button>
            <button
              onClick={() => onSelectProduct(product)}
              className="px-3 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1"
            >
              <span>상세</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
