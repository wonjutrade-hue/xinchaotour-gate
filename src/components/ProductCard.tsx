import React from 'react';
import { Product } from '../types';
import { Star, MapPin, Calendar, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateKRWFromVND, calculateUSDFromKRW, formatUSD } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';

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
  const displaySubtitle = product.subTitle || (product as any).subtitle || product.description || '';
  const subImages = product.additionalImages || (product as any).galleryImages || (product as any).images || [];
  const subImagesCount = subImages.filter(Boolean).length;

  // Real-time calculated KRW and VND based on Naver Exchange Rate
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

        {/* Region & City Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold border border-white/20">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{product.region}</span>
          <span className="text-slate-400">•</span>
          <span className="text-amber-300">{product.city}</span>
        </div>

        {/* Category & Badges Sticker */}
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
          <span className="bg-teal-700/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {product.category}
          </span>
        </div>

        {/* Photo Gallery Count Badge */}
        {subImagesCount > 0 && (
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <span>📷 사진 {subImagesCount + 1}장</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
          <Star className="w-3 h-3 fill-slate-950" />
          <span>{(product.rating || 5.0).toFixed(1)}</span>
          <span className="text-[10px] text-slate-800 font-semibold">({product.reviewCount || 10})</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100"
                >
                  #{tag.replace(/^#/, '')}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-black text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors line-clamp-2 cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Subtitle / Description */}
          {displaySubtitle && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {displaySubtitle}
            </p>
          )}

          {/* Highlights / Included preview */}
          {product.included && product.included.length > 0 && (
            <div className="space-y-1 pt-1">
              {product.included.slice(0, 2).map((inc, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">{inc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{product.duration}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">1인 기준</div>
              <div className="text-lg font-black text-slate-900">
                {displayKRW > 0 ? (
                  <>
                    <span className="text-teal-700">{displayKRW.toLocaleString()}</span>
                    <span className="text-xs font-bold ml-0.5 text-slate-700">원</span>
                  </>
                ) : (
                  <span className="text-teal-700 text-sm font-bold">견적 문의</span>
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
              onClick={(e) => {
                e.stopPropagation();
                handleOpenKakaoTalkDirect();
              }}
              className="w-full py-2 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-slate-900 font-black text-xs flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
              <span>카톡문의</span>
            </button>
            <button
              onClick={() => onSelectProduct(product)}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-black text-xs flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <span>상세보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
