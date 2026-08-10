import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, ShieldCheck, Compass, Home, Award } from 'lucide-react';
import { Category, Region, City } from '../types';
import goldenBridgeImg from '../assets/images/danang_golden_bridge_1786255489649.jpg';
import myKheBeachImg from '../assets/images/my_khe_beach_1786255505556.jpg';

interface HeroProps {
  onSearch: (city: City, category: Category | '전체', keyword: string) => void;
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
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    tag: "힐링 트레킹 추천"
  }
];

export const Hero: React.FC<HeroProps> = ({ onSearch, onSelectCategory, onOpenQuiz }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchCity, setSearchCity] = useState<City>('전체');
  const [searchCategory, setSearchCategory] = useState<Category | '전체'>('전체');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchCity, searchCategory, keyword);
  };

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 w-full flex-1 flex flex-col justify-center">
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
        <div className="flex items-center gap-2 mt-6">
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

      {/* Floating Integrated Search Bar Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-4 sm:pb-0 sm:-mb-10 w-full">
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-xl border border-slate-100 text-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end"
        >
          {/* City Selection */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>여행 도시 선택</span>
            </label>
            <select
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value as City)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="전체">베트남 전체 (북부/중부/남부)</option>
              <optgroup label="북부">
                <option value="하노이">하노이</option>
                <option value="하롱베이">하롱베이</option>
                <option value="사파">사파</option>
                <option value="닌빈">닌빈</option>
              </optgroup>
              <optgroup label="중부">
                <option value="다낭">다낭</option>
                <option value="호이안">호이안</option>
                <option value="나트랑">나트랑</option>
                <option value="후에">후에</option>
              </optgroup>
              <optgroup label="남부">
                <option value="호치민">호치민</option>
                <option value="푸꾸옥">푸꾸옥</option>
                <option value="달랏">달랏</option>
                <option value="붕따우">붕따우</option>
              </optgroup>
            </select>
          </div>

          {/* Category Selection */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1 whitespace-nowrap">
              <Compass className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>여행 카테고리</span>
            </label>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value as Category | '전체')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="전체">전체 카테고리</option>
              <option value="추천패키지">추천 패키지</option>
              <option value="자유여행">자유 여행</option>
              <option value="골프투어">골프 투어</option>
              <option value="풀빌라">풀빌라 & 리조트</option>
            </select>
          </div>

          {/* Keyword Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1 whitespace-nowrap">
              <Search className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>검색어 (크루즈, 풀빌라, 바나힐 등)</span>
            </label>
            <input
              type="text"
              placeholder="관심 키워드 입력..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-700/20 whitespace-nowrap"
          >
            <Search className="w-4 h-4 text-amber-300 shrink-0" />
            <span>맞춤 상품 검색</span>
          </button>
        </form>
      </div>
    </div>
  );
};
