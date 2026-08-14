import React, { useRef } from 'react';
import { Product } from '../types';
import { Star, MapPin, Calendar, CheckCircle2, ArrowRight, MessageCircle, Edit3, Trash2, Camera } from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateKRWFromVND, calculateUSDFromKRW, formatUSD } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickInquire?: (product: Product) => void;
  exchangeRates?: ExchangeRates;
  isAdminMode?: boolean;
  onQuickEdit?: (product: Product) => void;
  onQuickDelete?: (productId: string) => void;
  onQuickPhotoChange?: (productId: string, newPhotoUrl: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickInquire,
  exchangeRates,
  isAdminMode,
  onQuickEdit,
  onQuickDelete,
  onQuickPhotoChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displaySubtitle = product.subTitle || (product as any).subtitle || product.description || '';
  const subImages = product.additionalImages || (product as any).galleryImages || (product as any).images || [];
  const subImagesCount = subImages.filter(Boolean).length;

  const handleCardDirectPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onQuickPhotoChange) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      try {
        // Upload to server disk
        const res = await fetch('/api/upload-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: [base64] })
        });
        const data = await res.json();
        const finalUrl = (data.success && data.urls?.[0]) ? data.urls[0] : base64;
        onQuickPhotoChange(product.id, finalUrl);
      } catch (err) {
        onQuickPhotoChange(product.id, base64);
      }
    };
  };

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
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
              ⚡ HOT딜
            </span>
          )}
          {product.isPopular && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
              🔥 인기추천
            </span>
          )}
          {product.externalBookingUrl && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs flex items-center gap-1">
              <span>Airbnb</span>
            </span>
          )}
          {product.discountPercent ? (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
              {product.discountPercent}% OFF
            </span>
          ) : null}
          <span className="bg-teal-700/90 backdrop-blur-md text-white text-[11px] font-extrabold px-2 py-0.5 rounded-lg">
            {product.category}
          </span>
        </div>

        {/* Duration & Sub-Photos Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md text-slate-800 px-2.5 py-1 rounded-md text-xs font-bold shadow-xs">
            <Calendar className="w-3 h-3 text-teal-600" />
            <span>{product.duration}</span>
          </div>
          {subImagesCount > 0 && (
            <div className="bg-slate-900/80 backdrop-blur-md text-amber-300 px-2 py-1 rounded-md text-[11px] font-black shadow-xs">
              📷 사진 {subImagesCount + 1}장
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md text-xs font-black">
          <Star className="w-3 h-3 fill-slate-950" />
          <span>{(product.rating || 5.0).toFixed(1)}</span>
          <span className="text-[10px] text-slate-800 font-semibold">({product.reviewCount || 10})</span>
        </div>

        {/* Hidden File Input for Instant Photo Change */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleCardDirectPhotoUpload}
        />

        {/* Direct Admin Toolbar on Hover/Always in Admin Mode */}
        {isAdminMode && (
          <div className="absolute inset-x-0 top-0 p-2 bg-slate-900/90 backdrop-blur-md flex items-center justify-between gap-1.5 z-20 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-black flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
              title="클릭하여 내 컴퓨터 사진으로 즉시 교체"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>사진 즉시교체</span>
            </button>

            <div className="flex items-center gap-1">
              {onQuickEdit && (
                <button
                  type="button"
                  onClick={() => onQuickEdit(product)}
                  className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
                  title="간편 수정"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>수정</span>
                </button>
              )}
              {onQuickDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`'${product.title}' 상품을 정말 삭제하시겠습니까?`)) {
                      onQuickDelete(product.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  title="상품 삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
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
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-teal-700 cursor-pointer transition-colors line-clamp-2"
          >
            {product.title}
          </h3>

          {/* Subtitle / Description */}
          {displaySubtitle && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
              {displaySubtitle}
            </p>
          )}

          {/* Address Line */}
          {product.address && (
            <div className="flex items-center gap-1 text-[11px] text-slate-700 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200/80 truncate">
              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
              <span className="truncate font-medium">{product.address}</span>
            </div>
          )}

          {/* External Booking Link */}
          {product.externalBookingUrl && (
            <a
              href={product.externalBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-rose-600 font-bold hover:underline"
            >
              <span>🔗 에어비앤비/외부 원본 상세 ↗</span>
            </a>
          )}
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
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[10px] font-bold text-slate-400">성인 1인 기준</span>
              <span className="text-[9px] bg-emerald-50 text-emerald-800 font-black px-1.5 py-0.2 rounded border border-emerald-200">
                네이버 환율 연동
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">
                {displayVND.toLocaleString('ko-KR')} ₫
              </span>
              <span className="text-xs font-bold text-slate-700">~</span>
            </div>
            <div className="text-[11px] text-teal-700 font-extrabold flex items-center gap-1.5 mt-0.5">
              <span>약 {displayKRW.toLocaleString('ko-KR')}원</span>
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
