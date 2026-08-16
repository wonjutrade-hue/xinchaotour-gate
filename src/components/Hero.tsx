import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, MapPin, ShieldCheck, BookOpen, Bot } from 'lucide-react';
import { NavPage } from './Navbar';
import goldenBridgeImg from '../assets/images/danang_golden_bridge_1786255489649.jpg';
import myKheBeachImg from '../assets/images/my_khe_beach_1786255505556.jpg';
import sapaFansipanImg from '../assets/images/sapa_fansipan_terraces_1786458401102.jpg';

interface HeroProps {
  onNavigate: (page: NavPage) => void;
  onOpenQuiz: () => void;
  onOpenAiAssistant?: () => void;
  onOpenTravelInfo?: (tab?: any) => void;
}

const HERO_BACKGROUNDS = [
  {
    image: goldenBridgeImg,
    location: '중부 다낭 · 바나힐 골든브릿지',
    title: '천공의 다리와 바나힐 테마파크'
  },
  {
    image: myKheBeachImg,
    location: '중부 다낭 · 미케비치 럭셔리 풀빌라',
    title: '세계 6대 해변 에메랄드 오션뷰 힐링'
  },
  {
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80',
    location: '북부 하롱베이 · 5성 크루즈',
    title: '유네스코 세계자연유산 기암괴석 크루즈'
  },
  {
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1600&q=80',
    location: '중부 다낭/호이안 · 명문 골프장',
    title: 'BRG & 바나힐 & 호이아나 90홀 라운딩'
  },
  {
    image: sapaFansipanImg,
    location: '북부 사파/하장 · 대자연 비경',
    title: '인도차이나 최고봉 판시판 & 마피렝 협곡'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenQuiz,
  onOpenAiAssistant,
  onOpenTravelInfo,
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentBg = HERO_BACKGROUNDS[currentBgIndex];

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden min-h-[520px] sm:min-h-[580px] flex flex-col justify-between">
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentBg.image}
          src={currentBg.image}
          alt={currentBg.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = goldenBridgeImg;
          }}
        />
        {/* Multi-layered gradient overlay for high contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>XinChaoTour 신짜오투어 베트남 맞춤 여행 플랫폼</span>
            <span className="text-slate-400">•</span>
            <span className="text-amber-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-300" />
              {currentBg.location}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.2] drop-shadow-md">
            베트남의 아름다운 순간을 <br />
            <span className="text-emerald-400">한국인의 편안함</span>으로 여행하세요
          </h1>

          {/* Sub Headline */}
          <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-xs">
            자유여행 · 풀빌라 · 골프여행 <br className="sm:hidden" />
            <strong className="text-emerald-300 font-bold">XinChaoTour</strong>와 함께하세요.
          </p>

          {/* 3 Main Action CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('free_travel')}
              className="px-5 sm:px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-teal-900/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-teal-400/30"
            >
              <span>자유여행 보기</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => onNavigate('villa')}
              className="px-5 sm:px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-emerald-400/30"
            >
              <span>풀빌라 보기</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => onNavigate('golf')}
              className="px-5 sm:px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-900/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-amber-300/40"
            >
              <span>골프여행 보기</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {/* Secondary Helpers: AI Planner & Travel Quiz & Info Guide */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs transition backdrop-blur-md border border-white/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI 맞춤 여행 플래너</span>
              </button>
            )}

            <button
              onClick={onOpenQuiz}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs transition backdrop-blur-md border border-white/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>3초 맞춤 추천 퀴즈</span>
            </button>

            {onOpenTravelInfo && (
              <button
                onClick={() => onOpenTravelInfo('course')}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs transition backdrop-blur-md border border-white/20 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>베트남 여행정보 가이드</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center gap-2 mt-8">
          {HERO_BACKGROUNDS.map((bg, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBgIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentBgIndex === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              title={bg.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
