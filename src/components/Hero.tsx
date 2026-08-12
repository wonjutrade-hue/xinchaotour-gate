import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Category } from '../types';
import goldenBridgeImg from '../assets/images/danang_golden_bridge_1786255489649.jpg';
import myKheBeachImg from '../assets/images/my_khe_beach_1786255505556.jpg';
import sapaFansipanImg from '../assets/images/sapa_fansipan_terraces_1786458401102.jpg';

interface HeroProps {
  onSelectCategory: (cat: Category | '전체') => void;
  onOpenQuiz: () => void;
}

const HERO_SLIDES = [
  {
    title: "황금빛 골든브릿지와 바나힐 테마파크",
    subtitle: "다낭 바나힐 손가락 다리 & 케이블카 명품 단독 패키지",
    location: "중부 다낭 · 바나힐",
    imageUrl: goldenBridgeImg,
    tag: "다낭 대표 랜드마크 1위"
  },
  {
    title: "햇살 가득한 미케비치와 호이안 올드타운",
    subtitle: "세계 6대 해변 미케비치 오션뷰 리조트 & 에메랄드 힐링 휴양",
    location: "중부 다낭 · 미케비치",
    imageUrl: myKheBeachImg,
    tag: "에메랄드 해변 휴양"
  },
  {
    title: "유네스코 세계자연유산의 에메랄드 빛 비경",
    subtitle: "하노이 & 하롱베이 5성급 럭셔리 크루즈 오션뷰 숙박 패키지",
    location: "북부 하롱베이 · 하노이",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80",
    tag: "북부 1위 럭셔리 패키지"
  },
  {
    title: "에메랄드빛 프라이빗 오션뷰 힐링 휴양",
    subtitle: "푸꾸옥 & 나트랑 독채 3베드룸 럭셔리 풀빌라 스페셜",
    location: "남부 푸꾸옥 · 나트랑",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    tag: "독채 프라이빗 풀빌라"
  },
  {
    title: "청정 자연 속 사파 산악 계단식 논과 팬시판",
    subtitle: "하노이 출발 사파 트레킹 & 럭셔리 마운틴 리조트",
    location: "북부 사파 · 팬시판",
    imageUrl: sapaFansipanImg,
    tag: "힐링 트레킹 추천"
  }
];

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onOpenQuiz }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden min-h-[520px] flex flex-col justify-between">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.imageUrl}
          alt={slide.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 backdrop-blur-md text-teal-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>{slide.tag}</span>
            <span className="text-slate-400">•</span>
            <span className="text-amber-300">{slide.location}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {slide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-medium">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuiz}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>3초 만에 나에게 딱 맞는 여행 찾기</span>
            </button>
            <span className="text-xs text-slate-300 font-medium">
              * 베트남 전역 (북부/중부/남부) 맞춤 추천
            </span>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 mt-8">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
