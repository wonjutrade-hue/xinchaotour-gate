import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Maximize2,
  Grid,
  Layers,
  Camera,
  Phone,
  CheckCircle2,
  Users,
  Award,
  ThumbsUp
} from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateKRWFromVND, calculateUSDFromKRW, formatVND, formatUSD } from '../lib/exchangeRate';
import { COMPANY_INFO } from '../data/companyInfo';
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
  exchangeRates
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusion'>('itinerary');
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxMode, setLightboxMode] = useState<'slide' | 'grid'>('slide');
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  // Scroll to top on opening product
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const detailContainer = document.getElementById('product-detail-fullpage');
    if (detailContainer) {
      detailContainer.scrollTop = 0;
    }
  }, [product.id]);

  // Back button and ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') setIsLightboxOpen(false);
      } else {
        if (e.key === 'Escape') onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, onClose]);

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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

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
    <div 
      id="product-detail-fullpage"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-50 min-h-screen text-slate-900 flex flex-col animate-fadeIn"
    >
      {/* 1. Top Sticky Fullscreen Navigation Header */}
      <header className="bg-slate-950 text-white sticky top-0 z-40 shadow-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Back to List Button & Breadcrumb */}
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-teal-600 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm shrink-0"
              title="상품 목록으로 돌아가기 (ESC)"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>목록으로</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 truncate">
              <span>홈</span>
              <span>/</span>
              <span className="text-teal-400 font-bold">{product.region} ({product.city})</span>
              <span>/</span>
              <span className="bg-teal-900/80 text-teal-200 px-2 py-0.5 rounded text-[11px] font-black">{product.category}</span>
              <span>/</span>
              <span className="text-slate-300 font-medium truncate max-w-[240px]">{product.title}</span>
            </div>
          </div>

          {/* Right: Quick Action Buttons & Close */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleShare}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              title="링크 복사"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copyFeedback ? '링크 복사됨!' : '공유'}</span>
            </button>

            <button
              onClick={handleOpenKakaoTalkDirect}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              <span>카톡 상담</span>
            </button>

            <button
              onClick={() => onOpenConsultation(product)}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black transition-all cursor-pointer shadow-md"
            >
              <span>1:1 견적 신청</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Full-Page Content Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-32 lg:pb-16">
        {/* Title Header Section */}
        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-600 text-white text-xs font-black px-3 py-1 rounded-lg">
              {product.category}
            </span>
            <span className="text-xs text-teal-800 font-bold bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              {product.region} 권역 · {product.city}
            </span>
            {product.duration && (
              <span className="flex items-center gap-1 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>여행 기간: {product.duration}</span>
              </span>
            )}
            <div className="flex items-center gap-1 bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-lg text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{(product.rating || 5.0).toFixed(1)}점</span>
              <span className="text-slate-500">({product.reviewCount || 10}개 후기)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {product.title}
          </h1>

          {displaySubtitle && (
            <p className="text-sm sm:text-base font-semibold text-teal-900 bg-teal-50/80 p-3.5 rounded-2xl border border-teal-100">
              ✨ {displaySubtitle}
            </p>
          )}

          {/* Tags & Departure & Location */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            {product.departureCities && product.departureCities.length > 0 && (
              <div className="flex items-center gap-1 text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl font-bold border border-slate-200">
                <Plane className="w-3.5 h-3.5 text-teal-600" />
                <span>출발 가능 공항: {product.departureCities.join(', ')}</span>
              </div>
            )}

            {product.tags && product.tags.map((tag, idx) => (
              <span key={idx} className="bg-slate-100 text-teal-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>

          {product.address && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs text-slate-800 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-bold text-slate-500 shrink-0">상세 위치:</span>
                <span className="font-bold text-slate-800">{product.address}</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(product.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:ml-auto text-teal-700 hover:text-teal-900 font-black underline text-xs shrink-0 flex items-center gap-1"
              >
                <span>구글 지도에서 위치 보기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {product.externalBookingUrl && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-4 py-3 rounded-2xl text-xs text-rose-900 font-medium">
              <ExternalLink className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-bold shrink-0">외부 원본 링크:</span>
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
        </section>

        {/* Photo Showcase Gallery Section */}
        <section className="space-y-3">
          {allImages.length >= 5 ? (
            /* Airbnb Signature 5-Photo Showcase Grid */
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[460px]">
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
                  <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-xs font-black px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5">
                    <span>👑 대표 사진</span>
                  </div>
                </div>

                {/* Secondary 4 Photos (Right 2 Cols - 2x2 Grid) */}
                <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
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

              {/* Floating "Show All X Photos" Button */}
              <button
                type="button"
                onClick={() => handleOpenPhotoTour(0, 'grid')}
                className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 hover:text-teal-700 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-2xl backdrop-blur-md transition-all flex items-center gap-2 border border-slate-200 hover:scale-105 active:scale-95 cursor-pointer z-10"
              >
                <Grid className="w-4 h-4 text-teal-600" />
                <span>전체 사진 {allImages.length}장 모아보기</span>
              </button>
            </div>
          ) : allImages.length === 0 ? (
            <div className="aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border border-slate-700 p-8 flex flex-col items-center justify-center text-center relative shadow-inner">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3 border border-teal-500/30">
                <Camera className="w-8 h-8" />
              </div>
              <h4 className="text-white font-black text-lg mb-1">{product.title}</h4>
              <p className="text-teal-300 text-xs font-bold mb-3">{product.region} {product.city} · {product.category} 맞춤 여행</p>
            </div>
          ) : (
            /* High-Impact Frame for 1~4 Photos */
            <div className="aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 relative group shadow-md">
              <img
                src={currentPhoto}
                alt={product.title}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => handleOpenPhotoTour(validIndex, 'slide')}
              />

              <div 
                onClick={() => handleOpenPhotoTour(validIndex, 'slide')}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-teal-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-md z-10"
              >
                <Maximize2 className="w-4 h-4" />
                <span>크게 보기</span>
              </div>

              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-teal-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 z-20"
                    title="이전 사진 보기"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-teal-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 z-20"
                    title="다음 사진 보기"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </>
              )}

              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 border border-white/10">
                  <span className="text-amber-400 font-bold">📷 사진</span>
                  <span>{validIndex + 1} / {allImages.length}</span>
                </div>
              )}

              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleOpenPhotoTour(0, 'grid')}
                  className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 px-4 py-2 rounded-2xl text-xs font-black shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 border border-slate-200"
                >
                  <Grid className="w-4 h-4 text-teal-600" />
                  <span>전체 사진 보기</span>
                </button>
              )}
            </div>
          )}

          {/* Thumbnail Navigation Row */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none">
              {allImages.map((img, idx) => {
                const isActive = validIndex === idx;
                return (
                  <button
                    key={`thumb-strip-${idx}`}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`relative w-24 h-16 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'border-teal-600 ring-3 ring-teal-500/30 scale-105 shadow-md'
                        : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    {isActive && (
                      <div className="absolute inset-0 bg-teal-500/10 pointer-events-none" />
                    )}
                    <span className="absolute bottom-1 right-1 text-[9px] font-black text-white bg-slate-900/80 px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* 2-Column Responsive Layout (Main Details vs Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Main Content Details (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Special Villa Specs */}
            {product.villaSpecs && (
              <div className="bg-sky-50/80 border border-sky-200 p-6 rounded-3xl space-y-4">
                <h3 className="font-extrabold text-sky-950 text-base flex items-center gap-2">
                  🏰 독채 풀빌라 옵션 스펙
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-sky-900">
                  <div className="bg-white p-3.5 rounded-2xl border border-sky-100 shadow-xs">
                    <span className="block text-[11px] text-slate-500 mb-0.5">침실 구성</span>
                    <span className="font-black text-slate-900 text-sm">{product.villaSpecs.bedrooms} 베드룸</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-sky-100 shadow-xs">
                    <span className="block text-[11px] text-slate-500 mb-0.5">수영장 타입</span>
                    <span className="font-black text-slate-900 text-sm">{product.villaSpecs.privatePool ? '전용 프라이빗 풀' : '공용 풀'}</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-sky-100 shadow-xs">
                    <span className="block text-[11px] text-slate-500 mb-0.5">조망 (뷰)</span>
                    <span className="font-black text-slate-900 text-sm">{product.villaSpecs.oceanView ? '파노라마 오션뷰' : '가든뷰'}</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-sky-100 shadow-xs">
                    <span className="block text-[11px] text-slate-500 mb-0.5">최대 투숙인원</span>
                    <span className="font-black text-slate-900 text-sm">최대 {product.villaSpecs.maxOccupancy}인</span>
                  </div>
                </div>

                {product.villaSpecs.amenities && product.villaSpecs.amenities.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-sky-950 block mb-1.5">빌라 부대시설:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.villaSpecs.amenities.map((amenity, idx) => (
                        <span key={idx} className="bg-white text-sky-800 text-xs font-bold px-3 py-1 rounded-xl border border-sky-200">
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Special Golf Specs */}
            {product.golfSpecs && (
              <div className="bg-emerald-50/80 border border-emerald-200 p-6 rounded-3xl space-y-4">
                <h3 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
                  ⛳ 럭셔리 골프 라운딩 구성 ({product.golfSpecs.holes}홀)
                </h3>
                <div className="text-xs text-emerald-900 space-y-1.5 font-medium">
                  <p>• 포함 골프장: <strong className="text-emerald-950 font-black">{product.golfSpecs.golfCourseNames.join(' / ')}</strong></p>
                  <p>• 그린피, 카트비(2인 1카트), 캐디피 전액 포함 (캐디팁 별도)</p>
                </div>

                {product.golfSpecs.courseDetails && product.golfSpecs.courseDetails.length > 0 && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-emerald-200/80">
                    <span className="text-xs font-black text-emerald-950 block">코스별 상세 정보:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.golfSpecs.courseDetails.map((course, idx) => (
                        <div key={idx} className="bg-white p-3.5 rounded-2xl border border-emerald-100 text-xs space-y-1.5 shadow-xs">
                          <div className="flex items-center justify-between font-bold text-slate-900">
                            <span className="font-black text-sm">{course.name}</span>
                            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-lg">{course.holes}홀</span>
                          </div>
                          {course.designer && (
                            <p className="text-[11px] text-teal-800 font-semibold">설계: {course.designer}</p>
                          )}
                          {course.difficulty && (
                            <p className="text-[11px] text-amber-800 font-semibold">코스 난이도: {course.difficulty}</p>
                          )}
                          <p className="text-xs text-slate-600 leading-relaxed">{course.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Detailed Description Section (상세 소개문) */}
            {product.description && (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xs">
                <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2 border-b pb-3 border-slate-100">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <span>📖 여행 상세 안내 및 소개</span>
                </h3>
                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                  {product.description}
                </div>
              </div>
            )}

            {/* Interactive Tabs (일정표 / 포함사항 & 불포함) */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              <div className="border-b border-slate-200 bg-slate-50/70 p-2 flex items-center gap-2 text-xs sm:text-sm font-black">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`flex-1 py-3 px-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === 'itinerary'
                      ? 'bg-teal-700 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>일자별 상세 일정표 ({product.itinerary.length}일)</span>
                </button>
                <button
                  onClick={() => setActiveTab('inclusion')}
                  className={`flex-1 py-3 px-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === 'inclusion'
                      ? 'bg-teal-700 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>포함 / 불포함 사항 안내</span>
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {/* Tab 1: Itinerary */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    {product.itinerary.map((item) => (
                      <div key={item.day} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/90 space-y-3 relative pl-6">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-teal-600 rounded-l-2xl" />
                        <div className="flex items-center gap-3">
                          <span className="bg-teal-700 text-white font-black text-xs px-3 py-1 rounded-xl shadow-xs">
                            {item.day}일차
                          </span>
                          <h4 className="font-black text-slate-900 text-base">{item.title}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                          {item.description}
                        </p>

                        <div className="pt-3 flex flex-wrap gap-4 text-xs text-slate-600 border-t border-slate-200">
                          {item.meal && (
                            <span className="flex items-center gap-1.5 text-slate-800 font-bold bg-white px-3 py-1 rounded-lg border border-slate-200">
                              <Utensils className="w-4 h-4 text-amber-600" />
                              식사: {item.meal}
                            </span>
                          )}
                          {item.hotel && (
                            <span className="flex items-center gap-1.5 text-slate-800 font-bold bg-white px-3 py-1 rounded-lg border border-slate-200">
                              <Hotel className="w-4 h-4 text-teal-600" />
                              숙소: {item.hotel}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 2: Inclusion / Exclusion */}
                {activeTab === 'inclusion' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Included */}
                    <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 space-y-4">
                      <h4 className="font-black text-emerald-950 text-base flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <span>포함 사항 (기본 제공)</span>
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-900 font-medium">
                        {product.included.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Excluded */}
                    <div className="bg-rose-50/70 p-6 rounded-3xl border border-rose-200 space-y-4">
                      <h4 className="font-black text-rose-950 text-base flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>불포함 사항</span>
                      </h4>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-rose-900 font-medium">
                        {product.excluded.map((exc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">✗</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust & Guarantee Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>XinChao Tour 안심 케어 시스템</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black">
                100% 한국인 전문 가이드 & 단독 VIP 전용 차량 결합
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  <span className="font-black text-white block mb-1">🚗 전 일정 단독 차량</span>
                  <span>모르는 사람과의 합승 없는 우리 일행만의 프라이빗 이동</span>
                </div>
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  <span className="font-black text-white block mb-1">💬 24시간 실시간 케어</span>
                  <span>카카오톡을 통해 여행 중 발생할 수 있는 긴급 문의 실시간 해결</span>
                </div>
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  <span className="font-black text-white block mb-1">🚫 의무 쇼핑 0건</span>
                  <span>원치 않는 강제 쇼핑센터 방문 없는 온전한 힐링 보장</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky Booking & Price Card (4 Columns) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 border-2 border-teal-600/30 shadow-xl space-y-5">
              {/* Header Price Info */}
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">성인 1인 기준 견적</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-md">
                    실시간 환율 적용
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-800">
                  {displayVND.toLocaleString('ko-KR')} <span className="text-lg font-bold">₫~</span>
                </div>
                <p className="text-xs font-bold text-slate-600">
                  (네이버 환율 기준: 약 <strong className="text-slate-900">{displayKRW.toLocaleString('ko-KR')}원</strong> / {formatUSD(liveUSD)})
                </p>
              </div>

              {/* Trip Specs Summary */}
              <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-medium">권역 및 도시</span>
                  <span className="font-bold text-slate-900">{product.region} · {product.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">여행 기간</span>
                  <span className="font-bold text-slate-900">{product.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">여행 형태</span>
                  <span className="font-bold text-slate-900">{product.category} (단독 프라이빗)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">예약 상태</span>
                  <span className="font-black text-teal-700">예약 상담 가능</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleOpenKakaoTalkDirect}
                  className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-black text-sm shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="클릭 시 바로 카카오톡 실시간 상담 연결"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>카카오톡 1:1 바로 상담</span>
                </button>

                <button
                  onClick={() => onOpenConsultation(product)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-98 text-white font-black text-sm shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>📝 1:1 맞춤 견적서 신청</span>
                </button>

                {product.externalBookingUrl && (
                  <a
                    href={product.externalBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>외부 원본 페이지 보기</span>
                  </a>
                )}
              </div>

              {/* Direct Phone Call Link */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="text-xs text-slate-500 hover:text-slate-900 font-bold inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>전화 상담: <strong>{COMPANY_INFO.phone}</strong></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Mobile Fixed Bottom Booking Bar (for small/mobile screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-500 block font-bold">1인 기준 (실시간 환율)</span>
          <span className="text-base sm:text-lg font-black text-emerald-800">
            {displayVND.toLocaleString('ko-KR')} ₫~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenKakaoTalkDirect}
            className="px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>카톡상담</span>
          </button>

          <button
            onClick={() => onOpenConsultation(product)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md shadow-teal-600/20 active:scale-95"
          >
            <span>견적 신청</span>
          </button>
        </div>
      </div>

      {/* 4. Fullscreen Photo Tour Lightbox (Dual Mode: Slide & Grid Wall) */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/98 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-fadeIn select-none">
          {/* Header Bar */}
          <div className="w-full max-w-6xl flex flex-wrap items-center justify-between text-white pb-3 border-b border-slate-800 gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="bg-teal-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shrink-0">
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
                    ? 'bg-teal-600 text-white shadow-md' 
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
                    ? 'bg-teal-600 text-white shadow-md' 
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
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-teal-500 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer z-20 border border-white/10"
                      title="이전 사진 (←)"
                    >
                      <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-teal-500 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer z-20 border border-white/10"
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
                          ? 'border-teal-500 ring-2 ring-teal-500/40 scale-105 opacity-100' 
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

          {/* Mode 2: Airbnb Photo Wall Grid Mode */}
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
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group cursor-pointer hover:border-teal-500 transition-all hover:scale-[1.03]"
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
                    <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded transition-opacity">
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
