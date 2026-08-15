import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, MapPin, Tag } from 'lucide-react';
import { Category, Product } from '../types';
import goldenBridgeImg from '../assets/images/danang_golden_bridge_1786255489649.jpg';
import myKheBeachImg from '../assets/images/my_khe_beach_1786255505556.jpg';
import sapaFansipanImg from '../assets/images/sapa_fansipan_terraces_1786458401102.jpg';

interface HeroProps {
  onSelectCategory: (cat: Category | '전체') => void;
  onOpenQuiz: () => void;
  products?: Product[];
  onSelectProduct?: (prod: Product) => void;
}

const DEFAULT_HERO_SLIDES = [
  {
    title: "황금빛 골든브릿지와 바나힐 테마파크",
    subtitle: "다낭 바나힐 손가락 다리 & 케이블카 명품 단독 패키지",
    location: "중부 다낭 · 바나힐",
    imageUrl: goldenBridgeImg,
    tag: "다낭 대표 랜드마크 1위",
    productId: null
  },
  {
    title: "햇살 가득한 미케비치와 호이안 올드타운",
    subtitle: "세계 6대 해변 미케비치 오션뷰 리조트 & 에메랄드 힐링 휴양",
    location: "중부 다낭 · 미케비치",
    imageUrl: myKheBeachImg,
    tag: "에메랄드 해변 휴양",
    productId: null
  },
  {
    title: "유네스코 세계자연유산의 에메랄드 빛 비경",
    subtitle: "하노이 & 하롱베이 5성급 럭셔리 크루즈 오션뷰 숙박 패키지",
    location: "북부 하롱베이 · 하노이",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80",
    tag: "북부 1위 럭셔리 패키지",
    productId: null
  },
  {
    title: "에메랄드빛 프라이빗 오션뷰 힐링 휴양",
    subtitle: "푸꾸옥 & 나트랑 독채 3베드룸 럭셔리 풀빌라 스페셜",
    location: "남부 푸꾸옥 · 나트랑",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    tag: "독채 프라이빗 풀빌라",
    productId: null
  },
  {
    title: "청정 자연 속 사파 산악 계단식 논과 팬시판",
    subtitle: "하노이 출발 사파 트레킹 & 럭셔리 마운틴 리조트",
    location: "북부 사파 · 팬시판",
    imageUrl: sapaFansipanImg,
    tag: "힐링 트레킹 추천",
    productId: null
  }
];

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onOpenQuiz,
  products = [],
  onSelectProduct
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic slides generated from real registered products if available with images
  const activeSlides = React.useMemo(() => {
    const productsWithImages = (products || []).filter(p => Boolean(p.imageUrl || (p.additionalImages && p.additionalImages.length > 0)));
    if (productsWithImages.length > 0) {
      return productsWithImages.slice(0, 5).map((prod) => ({
        title: prod.title,
        subtitle: prod.subTitle || prod.description || `${prod.duration} · ${prod.category} 명품 여행`,
        location: `${prod.region} ${prod.city}`,
        imageUrl: prod.imageUrl || (prod.additionalImages && prod.additionalImages[0]) || goldenBridgeImg,
        tag: prod.isHotDeal ? '🔥 초특가 핫딜' : prod.isPopular ? '👑 인기 추천 베스트' : `✨ ${prod.category}`,
        priceKRW: prod.priceKRW,
        duration: prod.duration,
        product: prod,
        productId: prod.id
      }));
    }
    return DEFAULT_HERO_SLIDES.map(s => ({ ...s, product: null, priceKRW: undefined, duration: undefined }));
  }, [products]);

  useEffect(() => {
    if (currentSlide >= activeSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  const slide = activeSlides[currentSlide] || activeSlides[0] || DEFAULT_HERO_SLIDES[0];

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[520px] sm:min-h-[560px] flex flex-col justify-between">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <img
          key={slide.imageUrl}
          src={slide.imageUrl}
          alt={slide.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = goldenBridgeImg;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 backdrop-blur-md text-teal-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>{slide.tag}</span>
            <span className="text-slate-400">•</span>
            <span className="text-amber-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-300" />
              {slide.location}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {slide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-medium line-clamp-2 leading-relaxed drop-shadow-sm">
            {slide.subtitle}
          </p>

          {/* Price highlight if product */}
          {slide.priceKRW && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-md">
                {slide.priceKRW.toLocaleString()}
                <span className="text-sm font-bold text-white ml-1">원</span>
              </span>
              {slide.duration && (
                <span className="text-xs font-bold text-slate-300 bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-xs">
                  {slide.duration}
                </span>
              )}
            </div>
          )}

          <div className="pt-3 flex flex-wrap items-center gap-3">
            {slide.product && onSelectProduct ? (
              <button
                onClick={() => onSelectProduct(slide.product!)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>이 상품 바로가기</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            ) : null}

            <button
              onClick={onOpenQuiz}
              className={`px-5 py-3.5 rounded-2xl font-black text-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer ${
                slide.product 
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 backdrop-blur-md'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>3초 만에 나에게 딱 맞는 여행 찾기</span>
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        {activeSlides.length > 1 && (
          <div className="flex items-center gap-2 mt-8">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`슬라이드 ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
