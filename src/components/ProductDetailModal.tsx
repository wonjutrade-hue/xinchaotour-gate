import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Star, 
  Check, 
  XCircle, 
  Clock, 
  Utensils, 
  Hotel, 
  Plane, 
  MessageCircle, 
  ShieldCheck, 
  Share2,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
  Layers,
  Camera
} from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateKRWFromVND, calculateUSDFromKRW, formatVND, formatUSD } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenConsultation: (prod?: Product) => void;
  exchangeRates?: ExchangeRates;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenConsultation,
  exchangeRates,
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusion' | 'reviews'>('itinerary');
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxMode, setLightboxMode] = useState<'slide' | 'grid'>('slide');

  const subImages = product.additionalImages || (product as any).galleryImages || (product as any).images || [];
  const rawImages = [product.imageUrl, ...subImages];
  const allImages = Array.from(new Set(rawImages.filter(Boolean)));

  const validIndex = currentImgIndex >= 0 && currentImgIndex < allImages.length ? currentImgIndex : 0;
  const currentPhoto = allImages[validIndex] || product.imageUrl || '';

  const handleOpenPhotoTour = (startIndex: number = 0, mode: 'slide' | 'grid' = 'slide') => {
    setCurrentImgIndex(startIndex);
    setLightboxMode(mode);
    setIsLightboxOpen(true);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (allImages.length <= 1) return;
    setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (allImages.length <= 1) return;
    setCurrentImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allImages.length, isLightboxOpen]);

  const displaySubtitle = product.subTitle || (product as any).subtitle || '';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-teal-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
              {product.category}
            </span>
            <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {product.region} · {product.city}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Title & Rating */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {product.title}
            </h2>

            {displaySubtitle && (
              <p className="text-sm font-semibold text-teal-800 bg-teal-50/80 px-3 py-1.5 rounded-xl border border-teal-100">
                {displaySubtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{(product.rating || 5.0).toFixed(1)}점</span>
                <span className="text-slate-500">({product.reviewCount || 10}개 후기)</span>
              </div>

              {product.duration && (
                <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>여행기간: {product.duration}</span>
                </div>
              )}

              {product.departureCities && product.departureCities.length > 0 && (
                <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                  <Plane className="w-3.5 h-3.5 text-teal-600" />
                  <span>출발가능: {product.departureCities.join(', ')} 출발</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-teal-900 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {product.address && (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 px-3.5 py-2.5 rounded-xl text-xs text-slate-800 font-medium">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-bold text-slate-500 shrink-0">상세 위치:</span>
                <span className="font-bold text-slate-800 break-all">{product.address}</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(product.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-teal-700 hover:text-teal-800 font-bold underline text-xs shrink-0 whitespace-nowrap"
                >
                  구글 지도 보기 ↗
                </a>
              </div>
            )}

            {product.externalBookingUrl && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl text-xs text-rose-900 font-medium">
                <ExternalLink className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-bold shrink-0">에어비앤비/외부 원본 링크:</span>
                <a
                  href={product.externalBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-700 hover:text-rose-900 font-bold underline truncate"
                >
                  {product.externalBookingUrl} ↗
                </a>
              </div>
            )}
          </div>

          {/* Airbnb-style Photo Showcase Gallery */}
          <div className="space-y-3">
            {allImages.length >= 5 ? (
              /* Airbnb Signature 5-Photo Grid */
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 group">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5 h-[280px] sm:h-[360px]">
                  {/* Big Hero Photo (Left - 2 Cols) */}
                  <div
                    onClick={() => handleOpenPhotoTour(0, 'slide')}
                    className="md:col-span-2 h-full relative overflow-hidden cursor-pointer group/hero bg-slate-900"
                  >
                    <img
                      src={allImages[0]}
                      alt={`${product.title} - 1`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/hero:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover/hero:bg-transparent transition-colors" />
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-black px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
                      <span>👑 대표 커버</span>
                    </div>
                  </div>

                  {/* Secondary 4 Photos (Right 2 Cols - 2x2 Grid) */}
                  <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-1.5 h-full">
                    {allImages.slice(1, 5).map((img, idx) => (
                      <div
                        key={`hero-grid-${idx}`}
                        onClick={() => handleOpenPhotoTour(idx + 1, 'slide')}
                        className="relative h-full overflow-hidden cursor-pointer group/sub bg-slate-900"
                      >
                        <img
                          src={img}
                          alt={`${product.title} - ${idx + 2}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/sub:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/sub:bg-transparent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating "Show All X Photos" Button (Airbnb Style) */}
                <button
                  type="button"
                  onClick={() => handleOpenPhotoTour(0, 'grid')}
                  className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-900 hover:text-rose-600 px-3.5 py-2 rounded-xl text-xs font-black shadow-lg backdrop-blur-md transition-all flex items-center gap-2 border border-slate-200/80 hover:scale-105 active:scale-95 cursor-pointer z-10"
                >
                  <Grid className="w-4 h-4 text-rose-500" />
                  <span>사진 {allImages.length}장 모두 보기</span>
                </button>
              </div>
            ) : (
              /* Standard High-Impact Photo Frame (for 1~4 photos) */
              <div className="aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 relative group shadow-inner">
                <img
                  src={currentPhoto}
                  alt={product.title}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                  onClick={() => handleOpenPhotoTour(validIndex, 'slide')}
                />

                {/* Click to expand hint overlay */}
                <div 
                  onClick={() => handleOpenPhotoTour(validIndex, 'slide')}
                  className="absolute top-3 right-3 bg-slate-900/80 hover:bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-md z-10"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>크게 보기</span>
                </div>

                {/* Prev / Next Arrows on Main Image */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-teal-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 z-20"
                      title="이전 사진 보기"
                    >
                      <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-teal-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 z-20"
                      title="다음 사진 보기"
                    >
                      <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </button>
                  </>
                )}

                {/* Photo Counter Badge */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 border border-white/10">
                    <span className="text-amber-400 font-bold">📷 사진</span>
                    <span>{validIndex + 1} / {allImages.length}</span>
                  </div>
                )}

                {allImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleOpenPhotoTour(0, 'grid')}
                    className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 border border-slate-200"
                  >
                    <Grid className="w-3.5 h-3.5 text-rose-500" />
                    <span>전체 사진 모아보기</span>
                  </button>
                )}
              </div>
            )}

            {/* Thumbnail Navigation Row */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {allImages.map((img, idx) => {
                  const isActive = validIndex === idx;
                  return (
                    <button
                      key={`thumb-strip-${idx}`}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'border-teal-500 ring-3 ring-teal-500/30 scale-105'
                          : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      {isActive && (
                        <div className="absolute inset-0 bg-teal-500/10 pointer-events-none" />
                      )}
                      <span className="absolute bottom-0.5 right-1 text-[9px] font-black text-white bg-slate-900/70 px-1 rounded">
                        #{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detailed Description Section (상세 소개글) */}
          {product.description && (
            <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b pb-2 border-slate-200">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>📖 상품 상세 소개문 및 안내</span>
              </h4>
              <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                {product.description}
              </div>
            </div>
          )}

          {/* Special Specs Box */}
          {product.golfSpecs && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-3">
              <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                ⛳ 럭셔리 골프 라운딩 구성 ({product.golfSpecs.holes}홀)
              </h4>
              <div className="text-xs text-emerald-800 space-y-1">
                <p>• 포함 골프장: <span className="font-bold">{product.golfSpecs.golfCourseNames.join(' / ')}</span></p>
                <p>• 그린피, 카트비(2인1카트), 캐디피 전액 포함 (캐디팁 별도)</p>
              </div>

              {product.golfSpecs.courseDetails && product.golfSpecs.courseDetails.length > 0 && (
                <div className="mt-3 space-y-2 pt-3 border-t border-emerald-200/80">
                  <span className="text-[11px] font-black text-emerald-900 block">코스별 상세 안내:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.golfSpecs.courseDetails.map((course, idx) => (
                      <div key={idx} className="bg-white/90 p-2.5 rounded-xl border border-emerald-100 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{course.name}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">{course.holes}홀</span>
                        </div>
                        {course.designer && (
                          <p className="text-[11px] text-teal-800 font-medium">설계: {course.designer}</p>
                        )}
                        {course.difficulty && (
                          <p className="text-[10px] text-amber-800">코스 난이도: {course.difficulty}</p>
                        )}
                        <p className="text-[11px] text-slate-600 leading-snug">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {product.villaSpecs && (
            <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-sky-950 text-sm flex items-center gap-2">
                🏰 독채 풀빌라 옵션 스펙
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-sky-900">
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">침실 수</span>
                  <span className="font-bold">{product.villaSpecs.bedrooms} 베드룸</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">개별 수영장</span>
                  <span className="font-bold">{product.villaSpecs.privatePool ? '전용 프라이빗 풀' : '일반'}</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">전경</span>
                  <span className="font-bold">{product.villaSpecs.oceanView ? '파노라마 오션뷰' : '가든뷰'}</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">최대 수용인원</span>
                  <span className="font-bold">{product.villaSpecs.maxOccupancy}인 투숙 가능</span>
                </div>
              </div>
            </div>
          )}

          {/* Nav Tabs (일정표 / 포함사항 & 불포함 / 여행 소개) */}
          <div className="border-b border-slate-200 flex items-center gap-4 text-sm font-bold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'itinerary' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📅 일자별 상세 일정표 ({product.itinerary.length}일)
            </button>
            <button
              onClick={() => setActiveTab('inclusion')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'inclusion' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ✅ 포함 / 불포함 사항
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {product.itinerary.map((item) => (
                <div key={item.day} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-700 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                      {item.day}일차
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-2 border-l-2 border-teal-500">
                    {item.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-slate-500 border-t border-slate-200/60">
                    {item.meal && (
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Utensils className="w-3.5 h-3.5 text-amber-600" />
                        식사: {item.meal}
                      </span>
                    )}
                    {item.hotel && (
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Hotel className="w-3.5 h-3.5 text-teal-600" />
                        숙소: {item.hotel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inclusion' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Included */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  포함 사항
                </h4>
                <ul className="space-y-2 text-xs text-emerald-900 font-medium">
                  {product.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-3">
                <h4 className="font-extrabold text-rose-950 text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  불포함 사항
                </h4>
                <ul className="space-y-2 text-xs text-rose-900 font-medium">
                  {product.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 mt-0.5">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Fixed Booking Bar */}
        <div className="bg-slate-900 p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-slate-400 font-medium">
                성인 1인 기준
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-800/80">
                네이버 금융 실시간 환율 자동 적용
              </span>
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-black text-amber-400">
                {displayVND.toLocaleString('ko-KR')} ₫~
              </span>
              <span className="text-xs sm:text-sm font-bold text-emerald-300">
                (네이버 환율: 약 {displayKRW.toLocaleString('ko-KR')}원 / {formatUSD(liveUSD)})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {product.externalBookingUrl && (
              <a
                href={product.externalBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
                title="에어비앤비 공식 숙소 상세 및 직접 예약 페이지로 이동"
              >
                <ExternalLink className="w-4 h-4" />
                <span>에어비앤비 원본보기</span>
              </a>
            )}

            <button
              onClick={handleOpenKakaoTalkDirect}
              className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
              title="클릭 시 2단계 없이 바로 카카오톡 개인/직영 상담 연결"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>카톡 1:1 바로상담</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation(product);
              }}
              className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <span>맞춤 견적서 신청</span>
            </button>
          </div>
        </div>
      </div>

      {/* Airbnb Fullscreen Photo Tour Modal (Dual Mode: Slide & Grid Wall) */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/98 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-fadeIn select-none">
          {/* Header Bar */}
          <div className="w-full max-w-6xl flex flex-wrap items-center justify-between text-white pb-3 border-b border-slate-800 gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shrink-0">
                {product.category}
              </span>
              <span className="text-sm font-bold truncate text-slate-200">
                {product.title}
              </span>
            </div>

            {/* View Mode Toggle: Slide vs Grid */}
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setLightboxMode('slide')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  lightboxMode === 'slide' 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>슬라이드 뷰</span>
              </button>
              <button
                type="button"
                onClick={() => setLightboxMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  lightboxMode === 'grid' 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>전체 모아보기 ({allImages.length}장)</span>
              </button>
            </div>

            {/* Counter & Close */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs bg-slate-900 text-amber-300 font-bold px-3 py-1.5 rounded-xl border border-slate-800">
                📷 {validIndex + 1} / {allImages.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-800"
                title="닫기 (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mode 1: Slide View Mode */}
          {lightboxMode === 'slide' && (
            <>
              <div className="relative w-full max-w-6xl my-auto flex items-center justify-center max-h-[75vh]">
                <img
                  src={currentPhoto}
                  alt={`${product.title} - ${validIndex + 1}`}
                  className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-slate-800 transition-all duration-200"
                />

                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer z-20 border border-white/10"
                      title="이전 사진 (←)"
                    >
                      <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer z-20 border border-white/10"
                      title="다음 사진 (→)"
                    >
                      <ChevronRight className="w-8 h-8 stroke-[2.5]" />
                    </button>
                  </>
                )}
              </div>

              {/* Slide Thumbnails Scrubber */}
              {allImages.length > 1 && (
                <div className="w-full max-w-6xl flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
                  {allImages.map((img, idx) => (
                    <button
                      key={`lb-thumb-${idx}`}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        validIndex === idx 
                          ? 'border-rose-500 ring-2 ring-rose-500/40 scale-105 opacity-100' 
                          : 'border-slate-800 opacity-40 hover:opacity-90'
                      }`}
                    >
                      <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-white bg-slate-900/80 px-1 rounded">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Mode 2: Airbnb Photo Wall Grid Mode (전체 모아보기) */}
          {lightboxMode === 'grid' && (
            <div className="w-full max-w-6xl flex-1 overflow-y-auto my-4 p-2 sm:p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {allImages.map((img, idx) => (
                  <div
                    key={`wall-photo-${idx}`}
                    onClick={() => {
                      setCurrentImgIndex(idx);
                      setLightboxMode('slide');
                    }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group cursor-pointer hover:border-rose-500 transition-all hover:scale-[1.03]"
                  >
                    <img
                      src={img}
                      alt={`photo-${idx}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-1.5 left-1.5 bg-slate-900/85 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                      {idx === 0 ? '👑 대표 커버' : `#${idx + 1}`}
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded transition-opacity">
                      클릭하여 크게 보기
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
