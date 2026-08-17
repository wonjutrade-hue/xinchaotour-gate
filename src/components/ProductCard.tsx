import React from 'react';
import { Product } from '../types';
import { Star, MapPin, Calendar, CheckCircle2, ArrowRight, MessageCircle, Send, ShieldCheck, Users, Waves, Sparkles } from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateKRWFromVND, calculateUSDFromKRW, formatUSD } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';
import { getDisplayProductImage, getProductFallbackImage } from '../lib/imageFallback';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickInquire?: (product: Product) => void;
  exchangeRates?: ExchangeRates;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickInquire,
  exchangeRates,
}) => {
  const displaySubtitle = product.subTitle || product.description || '';
  const subImages = product.additionalImages || [];
  const subImagesCount = subImages.filter(Boolean).length;
  const cardImageUrl = getDisplayProductImage(product);
  const fallbackUrl = getProductFallbackImage(product.category, product.city);

  // Real-time calculated KRW and VND
  let displayKRW = product.priceKRW || 0;
  let displayVND = product.priceVND || 0;

  if (displayKRW > 0) {
    displayVND = exchangeRates 
      ? calculateVNDFromKRW(displayKRW, exchangeRates)
      : Math.round(displayKRW * 18.817);
  } else if (displayVND > 0) {
    displayKRW = exchangeRates 
      ? calculateKRWFromVND(displayVND, exchangeRates)
      : Math.round(displayVND / 18.817);
  }

  const liveUSD = exchangeRates 
    ? calculateUSDFromKRW(displayKRW, exchangeRates)
    : Math.round(displayKRW / 1352.5);

  const hasKoreanGuide = product.included?.some(i => i.includes('한국어')) || product.tags?.some(t => t.includes('한국어'));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container with Badges */}
      <div 
        className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer" 
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={cardImageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackUrl) {
              target.src = fallbackUrl;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Region & City Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold border border-white/20">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>{product.region}</span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-300">{product.city}</span>
        </div>

        {/* Category & Status Sticker */}
        <div className="absolute top-3 right-3 flex flex-wrap items-center justify-end gap-1">
          {product.isHotDeal && (
            <span className="bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-sm animate-pulse">
              🔥 초특가
            </span>
          )}
          {product.isPopular && (
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow-sm">
              👑 베스트
            </span>
          )}
          <span className="bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {product.category}
          </span>
        </div>

        {/* Korean Guide Badge if applicable */}
        {hasKoreanGuide && (
          <div className="absolute bottom-3 left-3 bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-emerald-200" />
            <span>한국어 전담 가이드</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{(product.rating || 5.0).toFixed(1)}</span>
          <span className="text-[10px] text-slate-500">({product.reviewCount || 12})</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                >
                  #{tag.replace(/^#/, '')}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Subtitle */}
          {displaySubtitle && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {displaySubtitle}
            </p>
          )}

          {/* Villa Specific Spec Badges */}
          {product.villaSpecs && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-teal-800 font-semibold bg-teal-50/70 p-2 rounded-xl border border-teal-100">
              <span className="flex items-center gap-1">
                🏰 객실 {product.villaSpecs.bedrooms}실
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                최대 {product.villaSpecs.maxOccupancy}인
              </span>
              {product.villaSpecs.privatePool && (
                <>
                  <span>•</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Waves className="w-3 h-3" />
                    단독 풀장
                  </span>
                </>
              )}
            </div>
          )}

          {/* Golf Specific Spec Badges */}
          {product.golfSpecs && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-amber-900 font-semibold bg-amber-50 p-2 rounded-xl border border-amber-200/70">
              <span>⛳ 총 {product.golfSpecs.holes}홀 라운딩</span>
              <span>•</span>
              <span className="text-emerald-700">1인1캐디 + 2인1카트</span>
            </div>
          )}

          {/* Included preview */}
          {product.included && product.included.length > 0 && !product.villaSpecs && !product.golfSpecs && (
            <div className="space-y-1 pt-1">
              {product.included.slice(0, 2).map((inc, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{inc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & 2 Main Action Buttons: [자세히 보기] & [예약문의] */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{product.duration}</span>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">
                {product.category === '풀빌라' ? '1박 기준' : '1인 예상 경비'}
              </div>
              <div className="text-lg font-black text-slate-900">
                {displayKRW > 0 ? (
                  <>
                    <span className="text-emerald-700">{displayKRW.toLocaleString()}</span>
                    <span className="text-xs font-bold ml-0.5 text-slate-700">원</span>
                  </>
                ) : (
                  <span className="text-emerald-700 text-sm font-bold">견적 문의</span>
                )}
              </div>
              {displayVND > 0 && (
                <div className="text-[11px] text-amber-700 font-bold">
                  {displayVND.toLocaleString()} ₫ <span className="text-[10px] text-slate-400 font-normal">({formatUSD(liveUSD)})</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                if (onQuickInquire) {
                  onQuickInquire(product);
                } else {
                  handleOpenKakaoTalkDirect();
                }
              }}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>예약문의</span>
            </button>
            <button
              onClick={() => onSelectProduct(product)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <span>자세히 보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
