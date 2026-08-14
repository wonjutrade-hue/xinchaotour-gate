import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { 
  ArrowLeft, 
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
  Camera,
  Home,
  Users,
  Waves,
  Eye,
  Maximize,
  Compass,
  PhoneCall,
  ListFilter,
  Edit3,
  Trash2
} from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateKRWFromVND, calculateUSDFromKRW, formatVND, formatUSD } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';

interface ProductDetailPageProps {
  product: Product;
  onBackToList: () => void;
  onOpenConsultation: (prod?: Product) => void;
  exchangeRates?: ExchangeRates;
  relatedProducts?: Product[];
  onSelectProduct?: (prod: Product) => void;
  onEditProduct?: (prod: Product) => void;
  onDeleteProduct?: (id: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToList,
  onOpenConsultation,
  exchangeRates,
  relatedProducts = [],
  onSelectProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusion' | 'specs'>('itinerary');
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxMode, setLightboxMode] = useState<'slide' | 'grid'>('slide');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [product.id]);

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

  useEffect(() => {
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

  // Real-time calculated KRW and VND based on Live Exchange Rates
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('📋 현재 상품 상세 페이지 주소가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans animate-fadeIn">
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Two Back Buttons (Arrow & Text) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Top Arrow Back Button */}
            <button
              onClick={onBackToList}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 flex items-center justify-center transition-all border border-slate-200 shadow-xs cursor-pointer group"
              title="이전 화면으로 돌아가기 (화살표)"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Explicit "목록으로 돌아가기" Text Button */}
            <button
              onClick={onBackToList}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-teal-700 hover:text-white text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-slate-200 shadow-xs cursor-pointer"
            >
              <ListFilter className="w-4 h-4" />
              <span>목록으로 돌아가기</span>
            </button>

            {/* Category / Location Breadcrumbs */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-bold ml-2">
              <span className="text-slate-400">/</span>
              <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-extrabold">{product.category}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600">{product.region} {product.city}</span>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {onEditProduct && (
              <button
                onClick={() => onEditProduct(product)}
                className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
                title="상품 정보 및 사진, 일정표 수정"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>상품 수정</span>
              </button>
            )}

            {onDeleteProduct && (
              <button
                onClick={() => {
                  onDeleteProduct(product.id);
                  onBackToList();
                }}
                className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer border border-rose-200"
                title="상품 삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">삭제</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="공유하기"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">공유</span>
            </button>

            <button
              onClick={handleOpenKakaoTalkDirect}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-slate-900 font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span className="hidden sm:inline">카톡 실시간 상담</span>
              <span className="sm:hidden">카톡</span>
            </button>

            <button
              onClick={() => onOpenConsultation(product)}
              className="px-3 sm:px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <span>맞춤 견적 신청</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Title Header Section */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-700 text-white text-xs font-black px-2.5 py-1 rounded-lg">
              {product.category}
            </span>
            <span className="text-xs text-slate-600 font-bold flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              {product.region} · {product.city}
            </span>
            {product.duration && (
              <span className="text-xs text-slate-600 font-bold bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {product.duration}
              </span>
            )}
            <div className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating ? Number(product.rating).toFixed(1) : '5.0'}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount || 120}+ 리뷰)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {product.title}
          </h1>

          {displaySubtitle && (
            <p className="text-sm sm:text-base font-semibold text-teal-900 bg-teal-50/90 px-4 py-2 rounded-xl border border-teal-200">
              ✨ {displaySubtitle}
            </p>
          )}
        </div>

        {/* 3. AIRBNB-STYLE 5-IMAGE SHOWCASE GALLERY */}
        <section className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-lg group">
          {allImages.length >= 5 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[320px] sm:h-[440px] lg:h-[500px]">
              {/* Main Large Photo (Left 2 cols) */}
              <div 
                onClick={() => handleOpenPhotoTour(0, 'slide')}
                className="md:col-span-2 relative h-full cursor-pointer overflow-hidden group/main"
              >
                <img
                  src={allImages[0]}
                  alt="Main villa view"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/main:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/main:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    🔍 클릭하여 크게 보기
                  </span>
                </div>
              </div>

              {/* 2 Middle Sub-photos */}
              <div className="hidden md:grid grid-rows-2 gap-2 h-full">
                <div 
                  onClick={() => handleOpenPhotoTour(1, 'slide')}
                  className="relative h-full cursor-pointer overflow-hidden group/sub1"
                >
                  <img
                    src={allImages[1]}
                    alt="Villa sub 1"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/sub1:scale-105"
                  />
                </div>
                <div 
                  onClick={() => handleOpenPhotoTour(2, 'slide')}
                  className="relative h-full cursor-pointer overflow-hidden group/sub2"
                >
                  <img
                    src={allImages[2]}
                    alt="Villa sub 2"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/sub2:scale-105"
                  />
                </div>
              </div>

              {/* 2 Right Sub-photos */}
              <div className="hidden md:grid grid-rows-2 gap-2 h-full">
                <div 
                  onClick={() => handleOpenPhotoTour(3, 'slide')}
                  className="relative h-full cursor-pointer overflow-hidden group/sub3"
                >
                  <img
                    src={allImages[3]}
                    alt="Villa sub 3"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/sub3:scale-105"
                  />
                </div>
                <div 
                  onClick={() => handleOpenPhotoTour(4, 'slide')}
                  className="relative h-full cursor-pointer overflow-hidden group/sub4"
                >
                  <img
                    src={allImages[4]}
                    alt="Villa sub 4"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/sub4:scale-105"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => handleOpenPhotoTour(0, 'slide')}
              className="relative h-[320px] sm:h-[450px] w-full cursor-pointer overflow-hidden"
            >
              <img
                src={allImages[0]}
                alt="Product main"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* "사진 N장 모두 보기" Overlay Button */}
          <button
            onClick={() => handleOpenPhotoTour(0, 'grid')}
            className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 backdrop-blur-md border border-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
          >
            <Grid className="w-4 h-4 text-teal-700" />
            <span>사진 {allImages.length}장 모두 보기</span>
          </button>
        </section>

        {/* 4. TWO-COLUMN CONTENT & STICKY BOOKING BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Villa Specs Highlights (If 풀빌라) */}
            {product.category === '풀빌라' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Home className="w-5 h-5 text-teal-700" />
                  <span>독채 풀빌라 시설 & 옵션 스펙</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100">
                    <span className="text-[11px] font-bold text-slate-500 block">침실 수</span>
                    <span className="text-sm font-black text-teal-900 mt-0.5 block">
                      {product.villaSpecs?.bedrooms || 3} 베드룸
                    </span>
                  </div>
                  <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100">
                    <span className="text-[11px] font-bold text-slate-500 block">수영장 타입</span>
                    <span className="text-sm font-black text-teal-900 mt-0.5 block">
                      {product.villaSpecs?.privatePool ? '전용 프라이빗 풀' : '공용 풀'}
                    </span>
                  </div>
                  <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100">
                    <span className="text-[11px] font-bold text-slate-500 block">전망</span>
                    <span className="text-sm font-black text-teal-900 mt-0.5 block">
                      {product.villaSpecs?.oceanView ? '오션/비치뷰' : '가든/리버뷰'}
                    </span>
                  </div>
                  <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100">
                    <span className="text-[11px] font-bold text-slate-500 block">최대 수용 인원</span>
                    <span className="text-sm font-black text-teal-900 mt-0.5 block">
                      최대 {product.villaSpecs?.maxOccupancy || 8}인 투숙 가능
                    </span>
                  </div>
                </div>

                {product.villaSpecs?.features && product.villaSpecs.features.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {product.villaSpecs.features.map((feat, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description & Overview */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>상품 소개 및 특징</span>
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {product.description || '베트남 전문 현지 직영 신차오투어에서 선보이는 프리미엄 맞춤 상품입니다.'}
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100"
                    >
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs Navigation: Itinerary / Inclusions */}
            <div className="space-y-4">
              <div className="flex border-b border-slate-200 gap-2">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`pb-3 px-4 font-black text-sm transition-all relative ${
                    activeTab === 'itinerary'
                      ? 'text-teal-800'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  🗓️ 일자별 상세 일정표 ({product.itinerary?.length || 1}일)
                  {activeTab === 'itinerary' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('inclusion')}
                  className={`pb-3 px-4 font-black text-sm transition-all relative ${
                    activeTab === 'inclusion'
                      ? 'text-teal-800'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  ✅ 포함 / 불포함 사항
                  {activeTab === 'inclusion' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700 rounded-full" />
                  )}
                </button>
              </div>

              {/* Tab 1: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {product.itinerary && product.itinerary.length > 0 ? (
                    product.itinerary.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-teal-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                            {item.day}일차
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                            {item.title}
                          </h4>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                          {item.description}
                        </p>

                        {(item.meal || item.hotel) && (
                          <div className="pl-10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                            {item.meal && (
                              <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="font-bold">식사:</span>
                                <span>{item.meal}</span>
                              </div>
                            )}
                            {item.hotel && (
                              <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <Hotel className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                                <span className="font-bold">숙소:</span>
                                <span>{item.hotel}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-500 text-center">
                      상세 일정표는 고객님의 항공편 및 희망 동선에 맞춰 1:1 커스텀 일정으로 제공됩니다.
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Inclusions / Exclusions */}
              {activeTab === 'inclusion' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Included */}
                  <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-3">
                    <h4 className="font-black text-emerald-900 text-sm flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>포함 사항</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                      {product.included && product.included.length > 0 ? (
                        product.included.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{inc}</span>
                          </li>
                        ))
                      ) : (
                        <li>단독 전용차량, 유류비, 한국어 가이드, 입장료 일체 포함</li>
                      )}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 space-y-3">
                    <h4 className="font-black text-rose-900 text-sm flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>불포함 사항</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-rose-950 font-medium">
                      {product.excluded && product.excluded.length > 0 ? (
                        product.excluded.map((exc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{exc}</span>
                          </li>
                        ))
                      ) : (
                        <li>개인 경비, 매너팁, 여행자 보험 (선택 사항)</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Address / Location Section */}
            {product.address && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-700" />
                  <span>위치 및 찾아오시는 길</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  📍 {product.address}
                </p>
              </div>
            )}

            {/* Bottom Back Button & Action Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-extrabold text-slate-900 text-sm">다른 여행 상품도 둘러보시겠어요?</h4>
                <p className="text-xs text-slate-500">신차오투어의 다양한 풀빌라, 투어, 골프 상품을 확인하세요.</p>
              </div>
              <button
                onClick={onBackToList}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>목록으로 돌아가기</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking & Price Card (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              {/* Pricing Header */}
              <div className="space-y-1.5 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                    실시간 최저가 보장
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    네이버 실시간 환율 연동
                  </span>
                </div>

                {/* Primary VND display */}
                <div className="pt-2">
                  <span className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">
                    {formatVND(displayVND)}
                  </span>
                  <span className="text-xs text-slate-400 font-bold ml-1">
                    / {product.duration || '1박'}
                  </span>
                </div>

                {/* Secondary KRW & USD equivalents */}
                <div className="text-xs font-extrabold text-slate-700 flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-teal-900 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-200">
                    약 {displayKRW.toLocaleString('ko-KR')}원
                  </span>
                  <span className="text-slate-500">
                    ({formatUSD(liveUSD)})
                  </span>
                </div>
              </div>

              {/* Core Assurance Badges */}
              <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="font-bold text-slate-800">100% 신차오 현지 직영 단독 차량</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-slate-800">24시간 카카오톡 실시간 안심 케어</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-800">예약 강요 및 쇼핑 없는 안심 여행</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={handleOpenKakaoTalkDirect}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-slate-900 font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-900 text-slate-900" />
                  <span>카카오톡 실시간 1:1 상담하기</span>
                </button>

                <button
                  onClick={() => onOpenConsultation(product)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>맞춤 견적 & 실시간 예약 신청</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <p className="text-[11px] text-slate-400 font-medium">
                  * 일정 변경 및 인원별 단체 맞춤 견적 문의 환영
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              함께 보면 좋은 {product.city} 추천 상품
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProducts.slice(0, 3).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct && onSelectProduct(rel)}
                  className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex gap-3 items-center group"
                >
                  <img
                    src={rel.imageUrl}
                    alt={rel.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-bold bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-900 truncate">
                      {rel.title}
                    </h5>
                    <p className="text-xs font-black text-amber-600">
                      약 {rel.priceKRW?.toLocaleString('ko-KR')}원
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 6. AIRBNB PHOTO TOUR LIGHTBOX (SLIDE & GRID MODES) */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col animate-fadeIn text-white">
          {/* Lightbox Header */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-black text-sm sm:text-base">
                📸 {product.title}
              </span>
              <span className="text-xs text-slate-400 bg-white/10 px-2.5 py-1 rounded-full font-bold">
                {validIndex + 1} / {allImages.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
                <button
                  onClick={() => setLightboxMode('slide')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    lightboxMode === 'slide' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  슬라이드
                </button>
                <button
                  onClick={() => setLightboxMode('grid')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    lightboxMode === 'grid' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  그리드 (모아보기)
                </button>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
                title="닫기 (ESC)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Lightbox Body */}
          {lightboxMode === 'slide' ? (
            <div className="flex-1 flex flex-col min-h-0 relative p-4">
              {/* Main Active Photo */}
              <div className="flex-1 flex items-center justify-center relative min-h-0">
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xl"
                  title="이전 사진 (←)"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>

                <img
                  src={currentPhoto}
                  alt={`Photo ${validIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain rounded-2xl select-none"
                />

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xl"
                  title="다음 사진 (→)"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="h-20 shrink-0 pt-3 flex items-center gap-2 overflow-x-auto justify-center">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`h-14 w-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      validIndex === idx ? 'border-teal-400 scale-105 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentImgIndex(idx);
                      setLightboxMode('slide');
                    }}
                    className="aspect-4/3 rounded-2xl overflow-hidden cursor-pointer group relative border border-white/10 hover:border-teal-400 transition-all"
                  >
                    <img
                      src={img}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold text-white bg-black/60 px-2 py-1 rounded">
                        #{idx + 1} 보기
                      </span>
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
