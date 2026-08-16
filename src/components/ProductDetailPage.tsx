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
  Trash2,
  Key,
  Coffee,
  Tv,
  Wifi,
  Shield,
  Sun,
  Award
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
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToList,
  onOpenConsultation,
  exchangeRates,
  relatedProducts = [],
  onSelectProduct
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusion' | 'specs'>('itinerary');
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxMode, setLightboxMode] = useState<'slide' | 'grid'>('slide');

  const isVilla = product.category === '풀빌라';

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

  // Google Maps URL Resolver
  const resolvedGoogleMapUrl = product.villaSpecs?.googleMapUrl || product.googleMapUrl || (
    product.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product.address)}` : ''
  );

  const resolvedAirbnbUrl = product.villaSpecs?.airbnbUrl || product.airbnbUrl || product.externalBookingUrl;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans animate-fadeIn">
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Back Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToList}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 flex items-center justify-center transition-all border border-slate-200 shadow-xs cursor-pointer group"
              title="이전 화면으로 돌아가기"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onBackToList}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-teal-700 hover:text-white text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all border border-slate-200 shadow-xs cursor-pointer"
            >
              <ListFilter className="w-4 h-4" />
              <span>목록으로 돌아가기</span>
            </button>

            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-bold ml-2">
              <span className="text-slate-400">/</span>
              <span className={`px-2 py-0.5 rounded-md font-extrabold ${isVilla ? 'bg-teal-50 text-teal-800' : 'bg-amber-50 text-amber-800'}`}>
                {product.category}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600">{product.region} {product.city}</span>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2">
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
              <span>{isVilla ? '풀빌라 예약 문의' : '맞춤 견적 신청'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Title Header Section */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-white text-xs font-black px-2.5 py-1 rounded-lg ${isVilla ? 'bg-teal-700' : 'bg-slate-900'}`}>
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
              <span className="text-slate-400 font-normal">({product.reviewCount || 15}+ 후기)</span>
            </div>
            {product.isHotDeal && (
              <span className="text-xs bg-rose-50 text-rose-600 border border-rose-200 font-black px-2.5 py-1 rounded-lg">
                🔥 초특가 핫딜
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {product.title}
          </h1>

          {displaySubtitle && (
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {displaySubtitle}
            </p>
          )}
        </div>

        {/* 3. AIRBNB-STYLE 5-PHOTO GRID GALLERY */}
        {allImages.length > 0 ? (
          <section className="relative rounded-3xl overflow-hidden shadow-md bg-slate-900">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 aspect-video md:aspect-[2.2/1] max-h-[500px]">
              {/* Big Main Image (Col 1-2) */}
              <div
                onClick={() => handleOpenPhotoTour(0, 'slide')}
                className="md:col-span-2 relative group cursor-pointer overflow-hidden bg-slate-900"
              >
                <img
                  src={allImages[0]}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  👑 대표 사진
                </div>
              </div>

              {/* Sub-Images 1 & 2 (Col 3) */}
              <div className="hidden md:grid grid-rows-2 gap-2">
                <div
                  onClick={() => handleOpenPhotoTour(1 % allImages.length, 'slide')}
                  className="relative group cursor-pointer overflow-hidden bg-slate-900"
                >
                  <img
                    src={allImages[1] || allImages[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  onClick={() => handleOpenPhotoTour(2 % allImages.length, 'slide')}
                  className="relative group cursor-pointer overflow-hidden bg-slate-900"
                >
                  <img
                    src={allImages[2] || allImages[1] || allImages[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Sub-Images 3 & 4 (Col 4) */}
              <div className="hidden md:grid grid-rows-2 gap-2">
                <div
                  onClick={() => handleOpenPhotoTour(3 % allImages.length, 'slide')}
                  className="relative group cursor-pointer overflow-hidden bg-slate-900"
                >
                  <img
                    src={allImages[3] || allImages[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  onClick={() => handleOpenPhotoTour(4 % allImages.length, 'slide')}
                  className="relative group cursor-pointer overflow-hidden bg-slate-900"
                >
                  <img
                    src={allImages[4] || allImages[1] || allImages[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* "사진 N장 모두 보기" Overlay Button */}
            <button
              onClick={() => handleOpenPhotoTour(0, 'grid')}
              className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 backdrop-blur-md border border-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
            >
              <Grid className="w-4 h-4 text-teal-700" />
              <span>사진 {allImages.length}장 모두 보기</span>
            </button>
          </section>
        ) : (
          <section className="rounded-3xl overflow-hidden shadow-xs bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10 text-center text-white space-y-3 border border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/20 shadow-inner">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-amber-300">신차오투어 {product.city} {product.category}</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              현재 등록된 사진을 준비 중입니다. 1:1 카카오톡 및 맞춤 견적 신청을 통해 실시간 사진과 일정을 상담받으실 수 있습니다.
            </p>
          </section>
        )}

        {/* 4. TWO-COLUMN CONTENT & STICKY BOOKING BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* ================= IF POOL VILLA: AIRBNB-STYLE DETAILS ================= */}
            {isVilla ? (
              <>
                {/* Villa Key Specs Banner (Airbnb style) */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Home className="w-5 h-5 text-teal-700" />
                        <span>{product.villaSpecs?.villaName || product.title}</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">
                        베트남 {product.city} 최고급 프라이빗 독채 풀빌라
                      </p>
                    </div>
                    <span className="text-xs bg-teal-50 text-teal-800 font-black px-3 py-1 rounded-xl border border-teal-100">
                      신짜오 검증 인증 숙소
                    </span>
                  </div>

                  {/* Core Airbnb Specs Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100">
                      <span className="text-[11px] font-bold text-slate-500 block">침실 수</span>
                      <span className="text-sm font-black text-teal-950 mt-0.5 block">
                        🛏️ {product.villaSpecs?.bedrooms || 3} 베드룸
                      </span>
                    </div>

                    <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100">
                      <span className="text-[11px] font-bold text-slate-500 block">욕실 수</span>
                      <span className="text-sm font-black text-teal-950 mt-0.5 block">
                        🚿 {product.villaSpecs?.bathrooms || 4} 욕실
                      </span>
                    </div>

                    <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100">
                      <span className="text-[11px] font-bold text-slate-500 block">투숙 인원</span>
                      <span className="text-sm font-black text-teal-950 mt-0.5 block">
                        👥 최대 {product.villaSpecs?.maxOccupancy || 8}인 (기준 {product.villaSpecs?.standardOccupancy || 6}인)
                      </span>
                    </div>

                    <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100">
                      <span className="text-[11px] font-bold text-slate-500 block">수영장 / 전망</span>
                      <span className="text-sm font-black text-teal-950 mt-0.5 block">
                        🏊 {product.villaSpecs?.privatePool ? '단독 프라이빗 풀' : '공용 풀'}
                      </span>
                    </div>
                  </div>

                  {/* Additional Structure Specs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-700 font-bold">
                    {product.villaSpecs?.beds && (
                      <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                        🛌 침대: {product.villaSpecs.beds}
                      </span>
                    )}
                    {product.villaSpecs?.floors && (
                      <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                        🏢 건물: {product.villaSpecs.floors}층 독채 구조
                      </span>
                    )}
                    {product.villaSpecs?.areaSqm && (
                      <span className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                        📐 전용 면적: {product.villaSpecs.areaSqm}m²
                      </span>
                    )}
                    {product.villaSpecs?.oceanView && (
                      <span className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl">
                        🌅 에메랄드 오션뷰
                      </span>
                    )}
                  </div>
                </div>

                {/* Villa Structure & Space Description */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-700" />
                    <span>빌라 공간 및 구조 소개</span>
                  </h3>

                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {product.villaSpecs?.structureDescription || product.description || '베트남 전문 현지 직영 신짜오투어에서 엄선한 럭셔리 독채 풀빌라입니다.'}
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

                {/* Villa Amenities & Facilities (Airbnb Grid) */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>숙소 편의 시설 및 어메니티</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-bold">
                      {product.villaSpecs?.amenities?.length || 10}개 제공
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(product.villaSpecs?.amenities && product.villaSpecs.amenities.length > 0
                      ? product.villaSpecs.amenities
                      : [
                          '🏊 단독 프라이빗 인피니티 풀',
                          '🍳 풀옵션 주방 & 조리도구 완비',
                          '🥩 야외 바베큐 그릴 & 다이닝 공간',
                          '🧺 세탁기 & 건조기 (세제 제공)',
                          '📶 초고속 무료 Wi-Fi (전 구역)',
                          '📺 넷플릭스 & 대형 스마트 TV',
                          '❄️ 전 객실 개별 냉난방 에어컨',
                          '🛡️ 24시간 단지 보안 경비 & CCTV',
                          '🥐 조식 룸서비스 (선택 가능)',
                          '🌅 에메랄드 오션뷰 & 비치 도보 3분',
                          '🚗 전용 무료 주차 공간',
                          '🧹 매일 무료 하우스키핑 & 수건 교체'
                        ]
                    ).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800">
                        <Check className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Villa Location & Google Map / Airbnb Link */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-700" />
                    <span>빌라 위치 및 지도 연결</span>
                  </h3>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs text-slate-500 font-bold block">현지 상세 주소</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        📍 {product.villaSpecs?.address || product.address || `${product.region} ${product.city} 해변 리조트 단지`}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {resolvedGoogleMapUrl ? (
                        <a
                          href={resolvedGoogleMapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>구글 지도에서 위치 보기</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      ) : (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product.city + ' ' + (product.villaSpecs?.address || product.title))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>구글 지도에서 검색하기</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      )}

                      {resolvedAirbnbUrl && (
                        <a
                          href={resolvedAirbnbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Home className="w-3.5 h-3.5" />
                          <span>에어비앤비 / 원본 링크 확인</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Check-in/out & House Rules */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-500" />
                    <span>체크인 안내 및 숙소 이용 규칙</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 space-y-1">
                      <span className="text-xs font-bold text-teal-900 block">체크인 시간</span>
                      <span className="text-sm font-black text-teal-950 block">
                        🕒 {product.villaSpecs?.checkInTime || '15:00'} 이후
                      </span>
                    </div>

                    <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 space-y-1">
                      <span className="text-xs font-bold text-teal-900 block">체크아웃 시간</span>
                      <span className="text-sm font-black text-teal-950 block">
                        🕒 {product.villaSpecs?.checkOutTime || '11:00'} 이전
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">하우스 룰 (숙소 규정)</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {(product.villaSpecs?.houseRules && product.villaSpecs.houseRules.length > 0
                        ? product.villaSpecs.houseRules
                        : ['실내 절대 금연 (발코니 및 야외 흡연 가능)', '반려동물 동반 입실 제한', '22:00 이후 심야 정숙 (매너 타임)', '바베큐 그릴 이용 시 사전 문의']
                      ).map((rule, idx) => (
                        <li key={idx} className="flex items-center gap-2 font-medium">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              /* ================= IF TOUR / GOLF / PACKAGE: TOUR-SPECIFIC DETAILS ================= */
              <>
                {/* Golf Specs Highlights (If 골프투어) */}
                {product.category === '골프투어' && product.golfSpecs && (
                  <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-xs space-y-4">
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <span>⛳ 골프투어 라운딩 스펙</span>
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <span className="text-[11px] font-bold text-slate-500 block">라운딩 홀 수</span>
                        <span className="text-sm font-black text-emerald-900 mt-0.5 block">
                          {product.golfSpecs.holes || 18}홀 라운딩
                        </span>
                      </div>
                      <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <span className="text-[11px] font-bold text-slate-500 block">그린피</span>
                        <span className="text-sm font-black text-emerald-900 mt-0.5 block">
                          {product.golfSpecs.greenFeeIncluded ? '포함' : '별도'}
                        </span>
                      </div>
                      <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <span className="text-[11px] font-bold text-slate-500 block">1인 1캐디피</span>
                        <span className="text-sm font-black text-emerald-900 mt-0.5 block">
                          {product.golfSpecs.caddieFeeIncluded ? '포함' : '별도'}
                        </span>
                      </div>
                      <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <span className="text-[11px] font-bold text-slate-500 block">전동 카트</span>
                        <span className="text-sm font-black text-emerald-900 mt-0.5 block">
                          {product.golfSpecs.cartIncluded ? '포함' : '별도'}
                        </span>
                      </div>
                    </div>

                    {product.golfSpecs.golfCourseNames && product.golfSpecs.golfCourseNames.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-500 block mb-1.5">연계 명문 골프장:</span>
                        <div className="flex flex-wrap gap-2">
                          {product.golfSpecs.golfCourseNames.map((cc, i) => (
                            <span key={i} className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
                              🏌️ {cc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tour Description & Overview */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>투어 상품 소개 및 특징</span>
                  </h3>
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {product.description || '베트남 전문 현지 직영 신짜오투어에서 선보이는 프리미엄 맞춤 여행 상품입니다.'}
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

                {/* Tabs Navigation: Itinerary / Inclusions for Tours */}
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
                          상세 일정표는 고객님의 항공편 및 희망 동선에 맞춰 1:1 맞춤 일정으로 제공됩니다.
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
              </>
            )}

            {/* Bottom Back Button Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-extrabold text-slate-900 text-sm">다른 상품도 함께 둘러보시겠어요?</h4>
                <p className="text-xs text-slate-500">신짜오투어의 다양한 풀빌라, 맞춤 투어, 골프 상품을 만나보세요.</p>
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
                    {isVilla ? '단독 풀빌라 직영 특가' : '실시간 최저가 보장'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    네이버 실시간 환율 연동
                  </span>
                </div>

                {/* Primary Price */}
                <div className="pt-2">
                  <span className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">
                    {displayKRW.toLocaleString('ko-KR')}
                    <span className="text-sm font-bold text-slate-900 ml-1">원</span>
                  </span>
                  <span className="text-xs text-slate-400 font-bold ml-1.5">
                    / {product.duration || (isVilla ? '1박' : '1인')}
                  </span>
                </div>

                {/* Secondary VND & USD equivalents */}
                <div className="text-xs font-extrabold text-slate-700 flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-teal-900 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-200">
                    약 {formatVND(displayVND)}
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
                  <span className="font-bold text-slate-800">
                    {isVilla ? '신짜오 공식 파트너 검증 풀빌라' : '100% 현지 직영 단독 전용차량'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-slate-800">24시간 카카오톡 실시간 안심 케어</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-800">
                    {isVilla ? '예약 확정 시 상세 체크인 가이드 제공' : '의무 쇼핑 없는 정직한 안심 여행'}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={handleOpenKakaoTalkDirect}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-slate-900 font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-900 text-slate-900" />
                  <span>{isVilla ? '카카오톡 풀빌라 실시간 예약' : '카카오톡 1:1 상담하기'}</span>
                </button>

                <button
                  onClick={() => onOpenConsultation(product)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>{isVilla ? '풀빌라 맞춤 예약 신청' : '맞춤 견적 & 실시간 예약 신청'}</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <p className="text-[11px] text-slate-400 font-medium">
                  * 숙박 일정 변경 및 연박 할인, 단체 문의 환영
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
