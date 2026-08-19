import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, MapPin, ShieldCheck, BookOpen, Bot, Waves, Sun, Palmtree, Compass, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { NavPage } from './Navbar';
import sapaFansipanImg from '../assets/images/sapa_fansipan_terraces_1786458401102.jpg';
import haGiangImg from '../assets/images/ha_giang_mapileng_1787098378307.jpg';
import banGiocImg from '../assets/images/cao_bang_bangioc_1787098400108.jpg';
import ninhBinhImg from '../assets/images/ninh_binh_trangan_1787098412494.jpg';
import halongCruiseImg from '../assets/images/halong_emerald_cruise_1787097807698.jpg';
import goldenBridgeImg from '../assets/images/danang_golden_bridge_1786255489649.jpg';
import hoianLanternImg from '../assets/images/hoian_lantern_night_1787097792559.jpg';
import dalatLakeImg from '../assets/images/dalat_spring_lake_1787099173538.jpg';
import nhatrangOceanImg from '../assets/images/nhatrang_ocean_bay_1787097818318.jpg';
import muiNeImg from '../assets/images/muine_sand_dunes_1787098437757.jpg';
import phuQuocImg from '../assets/images/phuquoc_sunset_cablecar_1787098424693.jpg';
import golfResortImg from '../assets/images/vietnam_golf_resort_1787099191979.jpg';
import beachVillaImg from '../assets/images/vietnam_beach_villa_1787099211528.jpg';
import cityVillaImg from '../assets/images/vietnam_city_villa_1787099231914.jpg';

interface HeroProps {
  onNavigate: (page: NavPage) => void;
  onOpenQuiz: () => void;
  onOpenAiAssistant?: () => void;
  onOpenTravelInfo?: (tab?: any) => void;
}

export interface TravelDestinationSlide {
  id: string;
  image: string;
  location: string;
  regionChip: string;
  categoryGroup: '북부' | '중부' | '고원/해양' | '골프/풀빌라';
  title: string;
  badge: string;
  slogan: string;
  subDescription: string;
  highlights: string[];
  ctaText: string;
  navTarget: NavPage;
}

export const HERO_BACKGROUNDS: TravelDestinationSlide[] = [
  {
    id: 'sapa_fansipan',
    image: sapaFansipanImg,
    location: '북부 사파(Sapa) · 판시판 3,143m',
    regionChip: '사파 판시판',
    categoryGroup: '북부',
    title: '[사파] 인도차이나 최고봉 판시판(3,143m)과 깟깟마을 다랑이논',
    badge: '🏔️ 북부 알프스 대자연 비경',
    slogan: '구름바다를 뚫고 오르는 썬월드 케이블카와 몽환적인 소수민족 마을 힐링',
    subDescription: '사계절 시원한 고산 기후, 인도차이나의 지붕 판시판 정상 파노라마와 계단식 논 트레킹을 즐기세요.',
    highlights: ['판시판 케이블카', '깟깟 소수민족 마을', '모아나 사파 포토존', '단독 전용차량'],
    ctaText: '사파 자유여행 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'ha_giang_mapileng',
    image: haGiangImg,
    location: '북부 하장(Hà Giang) · 마피렝 협곡 & 뇨꿰강',
    regionChip: '하장 마피렝',
    categoryGroup: '북부',
    title: '[하장] 베트남 4대 고개 마피렝 협곡과 옥빛 뇨꿰강의 웅장함',
    badge: '🏞️ 유네스코 동반 카르스트 지질공원',
    slogan: '천길 낭떠러지 웅장한 협곡 도로와 에메랄드빛 뇨꿰강 보트 투어',
    subDescription: '베트남 최북단 비경! 가슴 벅찬 카르스트 대협곡과 옥빛 강물 위를 가르는 힐링 보트 어드벤처.',
    highlights: ['마피렝 스카이워크', '뇨꿰강 보트 투어', '동반 고대마을', '룽꾸 국기봉'],
    ctaText: '하장 비경투어 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'cao_bang_bangioc',
    image: banGiocImg,
    location: '북부 까오방(Cao Bằng) · 반족 폭포',
    regionChip: '까오방 반족폭포',
    categoryGroup: '북부',
    title: '[까오방] 아시아 최대 3단 웅장한 국경 폭포, 반족 폭포(Bản Giốc)',
    badge: '🌊 아시아 1위 자연 폭포',
    slogan: '카르스트 기암절벽 사이로 시원하게 쏟아져 내리는 웅장한 에메랄드 물줄기',
    subDescription: '세계 4대 국경 폭포 중 하나로, 뗏목을 타고 폭포 바로 앞까지 다가가 느끼는 장엄한 자연의 전율.',
    highlights: ['반족 폭포 뗏목 체험', '응엄응아오 석회동굴', '파천 산림 트레킹', '단독 VIP 케어'],
    ctaText: '까오방 폭포투어 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'ninh_binh_trangan',
    image: ninhBinhImg,
    location: '북부 닌빈(Ninh Bình) · 짱안 & 땀꼭',
    regionChip: '닌빈 짱안',
    categoryGroup: '북부',
    title: '[닌빈] 육지의 하롱베이라 불리는 유네스코 세계유산 짱안(Tràng An)',
    badge: '🚣 유네스코 복합세계유산',
    slogan: '신비로운 석회암 동굴을 통과하는 사공의 나룻배와 영화 <킹콩> 촬영지',
    subDescription: '맑은 강물 위 전통 나룻배를 타고 기암괴석과 신비로운 수상 사원을 유람하는 평화로운 힐링 여정.',
    highlights: ['짱안 나룻배 동굴 유람', '항무아 전망대', '바이딘 사원', '땀꼭 자전거 투어'],
    ctaText: '닌빈 힐링여행 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'halong_cruise',
    image: halongCruiseImg,
    location: '북부 하롱베이(Hạ Long) · 5성 럭셔리 크루즈',
    regionChip: '하롱베이 크루즈',
    categoryGroup: '북부',
    title: '[하롱베이] 3천여 개 기암괴석 품은 유네스코 세계자연유산 5성 크루즈',
    badge: '🚢 5성급 럭셔리 1박 크루즈',
    slogan: '에메랄드빛 바다 위에서 맞이하는 황홀한 선셋과 신비로운 동굴 카약킹',
    subDescription: '웅장한 송솟 동굴 탐험과 잔잔한 바다 위 카약킹, 미식 디너 뷔페가 포함된 완벽한 해상 호캉스.',
    highlights: ['5성 럭셔리 크루즈 1박', '송솟 동굴 탐험', '루온 동굴 카약', '티톱섬 360도 전망대'],
    ctaText: '하롱베이 크루즈 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'danang_bana',
    image: goldenBridgeImg,
    location: '중부 다낭(Đà Nẵng) · 바나힐 & 골든브릿지',
    regionChip: '다낭 골든브릿지',
    categoryGroup: '중부',
    title: '[다낭] 구름 위 거인의 손이 받치는 천공의 다리, 바나힐 골든브릿지',
    badge: '✨ 자유여행 만족도 1위',
    slogan: '해발 1,487m 시원한 프랑스 테마파크와 기네스북 케이블카 파노라마',
    subDescription: '온 가족이 함께 즐기는 테마파크 & 루지, 미케비치 오션뷰와 한국인 전담 단독 차량 결합.',
    highlights: ['단독 전용 차량', '바나힐 케이블카', '용다리 불쇼 야경', '힐링 스파 마사지'],
    ctaText: '다낭 자유여행 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'hoian_ancient',
    image: hoianLanternImg,
    location: '중부 호이안(Hội An) · 유네스코 올드타운',
    regionChip: '호이안 올드타운',
    categoryGroup: '중부',
    title: '[호이안] 수천 개의 오색 홍등이 밝히는 천년 고도의 낭만 올드타운',
    badge: '🏮 유네스코 세계문화유산',
    slogan: '투본강 위 띄우는 소원배와 노란 골목길 감성 카페 & 야시장 먹거리',
    subDescription: '시간마저 천천히 쉬어가는 베트남 최고의 힐링 감성, 밤하늘을 수놓는 소원등을 직접 띄워보세요.',
    highlights: ['투본강 소원배 체험', '안방비치 오션뷰 카페', '코코넛 바구니배', '야시장 길거리 미식'],
    ctaText: '호이안 힐링여행 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'dalat_spring',
    image: dalatLakeImg,
    location: '남중부 달랏(Đà Lạt) · 영원한 봄의 고원도시',
    regionChip: '달랏 봄의도시',
    categoryGroup: '고원/해양',
    title: '[달랏] 해발 1,500m 영원한 봄의 도시, 쓰엉흐엉 호수와 랑비앙산',
    badge: '🌸 프랑스풍 로맨틱 고원 휴양지',
    slogan: '사계절 쾌적하고 화사한 꽃의 도시, 다딴라 알파인코스터와 호수 힐링',
    subDescription: '소나무 숲과 유럽풍 빌라가 어우러진 베트남의 작은 프랑스! 낭만 가득한 카페 투어와 케이블카 비경.',
    highlights: ['다딴라 루지 코스터', '쓰엉흐엉 호수 산책', '랑비앙산 지프 투어', '달랏 야시장 먹거리'],
    ctaText: '달랏 힐링여행 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'nhatrang_beach',
    image: nhatrangOceanImg,
    location: '남중부 나트랑(Nha Trang) · 동양의 나폴리',
    regionChip: '나트랑 에메랄드비치',
    categoryGroup: '고원/해양',
    title: '[나트랑] 300일 맑은 햇살이 쏟아지는 동양의 나폴리 에메랄드 비치',
    badge: '🏖️ 청정 오션 호핑투어 & 스파',
    slogan: '혼문섬 스노클링 호핑투어부터 빈원더스 테마파크, 머드온천 힐링까지',
    subDescription: '투명한 바닷속 산호초 탐험과 이색 머드 스파, 아이부터 부모님까지 100% 만족하는 바다 휴양.',
    highlights: ['청정 섬 호핑투어', '빈원더스 해상 케이블카', '프라이빗 머드온천', '포나가르 사원'],
    ctaText: '나트랑 휴양여행 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'muine_desert',
    image: muiNeImg,
    location: '남부 무이네(Mũi Né) · 화이트 & 레드 샌드듄',
    regionChip: '무이네 사막',
    categoryGroup: '고원/해양',
    title: '[무이네] 동남아 유일의 신비로운 황금빛 사막 언덕, 무이네 샌드듄',
    badge: '🏜️ 이국적인 일출 지프 사파리',
    slogan: '광활한 모래사막을 질주하는 ATV & 오픈 지프 사파리와 붉은 협곡 요정의 샘',
    subDescription: '황금빛 모래 언덕에서 맞이하는 감동적인 일출과 바다와 사막이 만나는 이국적인 대자연의 조화.',
    highlights: ['일출 지프 사파리', '화이트 샌드듄 ATV', '요정의 샘 트레킹', '피싱 빌리지 선셋'],
    ctaText: '무이네 사막투어 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'phuquoc_island',
    image: phuQuocImg,
    location: '남부 푸꾸옥(Phú Quốc) · 베트남의 진주 청정 섬',
    regionChip: '푸꾸옥 해상케이블카',
    categoryGroup: '고원/해양',
    title: '[푸꾸옥] 세계 최장 7,899m 해상 케이블카와 환상의 황금빛 선셋',
    badge: '🌅 베트남 최고의 럭셔리 청정 휴양섬',
    slogan: '바다 위를 날아가는 혼똔섬 케이블카와 그랜드월드 분수쇼, 에메랄드 사오비치',
    subDescription: '베트남 최남단 청정 에메랄드빛 바다, 5성 리조트 호캉스와 사오비치 휴양의 완벽한 조화.',
    highlights: ['세계 최장 해상 케이블카', '그랜드월드 분수쇼', '사오비치 스노클링', '선셋 타운 야경'],
    ctaText: '푸꾸옥 휴양여행 보기',
    navTarget: 'free_travel'
  },
  {
    id: 'championship_golf',
    image: golfResortImg,
    location: '다낭/나트랑 · 인터내셔널 챔피언십 명문 골프',
    regionChip: '챔피언십 명문골프',
    categoryGroup: '골프/풀빌라',
    title: '[명문 골프] 세계적 거장들이 설계한 챔피언십 90홀 VIP 라운딩',
    badge: '⛳ 1인 1캐디 & 2인 1카트 VIP 골프',
    slogan: '에메랄드빛 바다와 산을 조망하는 바나힐CC · BRG · 호이아나 쇼어스 명품 코스',
    subDescription: '골퍼들의 로망! 5성급 클럽하우스 서비스와 쾌적한 전용 리무진 픽업 케어로 즐기는 완벽한 황제 골프.',
    highlights: ['바나힐CC 야간 라이트', '호이아나 쇼어스 링크스', 'BRG 다낭 골프 리조트', 'VIP 전용 리무진'],
    ctaText: '골프투어 상품 보기',
    navTarget: 'golf'
  },
  {
    id: 'beachfront_pool_villa',
    image: beachVillaImg,
    location: '다낭/나트랑/푸꾸옥 · 오션프론트 독채 풀빌라',
    regionChip: '해변가 오션 풀빌라',
    categoryGroup: '골프/풀빌라',
    title: '[해변 풀빌라] 세계 6대 해변 바로 앞, 프라이빗 인피니티 오션 풀빌라',
    badge: '🌊 프라이빗 단독 전용 수영장',
    slogan: '끝없이 펼쳐진 에메랄드빛 백사장과 우리 일행만의 럭셔리 프라이빗 풀파티',
    subDescription: '해변 도보 1분! 가족, 연인, 모임 여행에 특화된 최고급 독채 풀빌라에서 만끽하는 여유로운 바비큐 파티.',
    highlights: ['개인 전용 인피니티 풀', '미케비치 바로 앞 위치', '프라이빗 바비큐 케어', '전 객실 오션뷰 테라스'],
    ctaText: '오션 풀빌라 보기',
    navTarget: 'villa'
  },
  {
    id: 'city_luxury_villa',
    image: cityVillaImg,
    location: '도심 속 프라이빗 가든 럭셔리 독채 풀빌라',
    regionChip: '도심 가든 풀빌라',
    categoryGroup: '골프/풀빌라',
    title: '[도심 풀빌라] 편리한 도심 인프라와 고요한 시크릿 가든 럭셔리 풀빌라',
    badge: '🏰 도심 속 힐링 프라이빗 하우스',
    slogan: '유명 맛집·야시장 도보 이동 & 밤하늘 조명 수영장에서 즐기는 프라이빗 휴식',
    subDescription: '다낭 시내 및 호이안 중심가 근접! 편리한 관광 접근성과 완벽한 프라이버시가 보장되는 감성 독채 풀빌라.',
    highlights: ['도심 중심가 위치', '야간 무드 조명 수영장', '감성 바비큐 파티 라운지', '24시간 보안 & VIP 케어'],
    ctaText: '도심 풀빌라 보기',
    navTarget: 'villa'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenQuiz,
  onOpenAiAssistant,
  onOpenTravelInfo,
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [activeGroupFilter, setActiveGroupFilter] = useState<'전체' | '북부' | '중부' | '고원/해양' | '골프/풀빌라'>('전체');

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const currentBg = HERO_BACKGROUNDS[currentBgIndex];

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentBgIndex(prev => (prev === 0 ? HERO_BACKGROUNDS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentBgIndex(prev => (prev + 1) % HERO_BACKGROUNDS.length);
  };

  const handleSelectSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentBgIndex(index);
  };

  const filteredSlides = activeGroupFilter === '전체' 
    ? HERO_BACKGROUNDS 
    : HERO_BACKGROUNDS.filter(s => s.categoryGroup === activeGroupFilter);

  return (
    <div 
      className="relative overflow-hidden min-h-[560px] sm:min-h-[620px] lg:min-h-[670px] flex flex-col justify-between select-none bg-slate-950"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background Image with Luminous Tropical Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentBg.id}
          src={currentBg.image}
          alt={currentBg.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = goldenBridgeImg;
          }}
        />
        {/* Crisp multi-gradient overlay preserving vivid natural lighting & readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-sky-950/30" />
        
        {/* Soft tropical ambient highlights */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Prev / Next Quick Nav Arrows for Desktop */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 z-20 justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          aria-label="이전 여행지"
          className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition cursor-pointer pointer-events-auto hover:scale-105 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          aria-label="다음 여행지"
          className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md border border-white/20 transition cursor-pointer pointer-events-auto hover:scale-105 shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          
          {/* Top Destination Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/30 border border-emerald-300/50 backdrop-blur-md text-emerald-300 text-xs font-black shadow-lg">
              <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>베트남 전역 맞춤 여행 · 100% 단독 VIP 케어</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs font-black shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentBg.location}</span>
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-500/30 border border-sky-300/50 text-sky-200 text-xs font-extrabold backdrop-blur-md shadow-lg">
              {currentBg.badge}
            </span>
          </div>

          {/* Meaningful Headline & Destination Slogan */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.2] drop-shadow-xl">
              {currentBg.title}
            </h1>
            
            <div className="text-sm sm:text-lg font-extrabold text-amber-300 leading-snug drop-shadow-md flex items-center gap-1.5">
              <span>{currentBg.slogan}</span>
            </div>

            <p className="text-xs sm:text-base text-slate-100 font-medium leading-relaxed drop-shadow-sm max-w-2xl">
              {currentBg.subDescription}
            </p>
          </div>

          {/* Highlights Mini Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {currentBg.highlights.map((hl, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-200 bg-emerald-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-400/40 shadow-xs"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{hl}</span>
              </span>
            ))}
          </div>

          {/* Action CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={() => onNavigate(currentBg.navTarget)}
              className="px-5 sm:px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-black text-sm sm:text-base shadow-xl shadow-teal-950/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-teal-300/40 active:scale-95"
            >
              <Palmtree className="w-4 h-4 text-emerald-200" />
              <span>{currentBg.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => onNavigate('villa')}
              className="px-5 sm:px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-black text-sm sm:text-base shadow-xl shadow-sky-950/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-sky-300/40 active:scale-95"
            >
              <Waves className="w-4 h-4 text-sky-200" />
              <span>독채 풀빌라 보기</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => onNavigate('golf')}
              className="px-5 sm:px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-950/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-amber-200/60 active:scale-95"
            >
              <span>⛳ 명문 골프 보기</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {/* Quick Helper Floating Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="px-3.5 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-900/90 text-teal-200 hover:text-white font-bold text-xs transition backdrop-blur-md border border-teal-400/40 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Bot className="w-3.5 h-3.5 text-teal-300" />
                <span>AI 맞춤 코스 플래너</span>
              </button>
            )}

            <button
              onClick={onOpenQuiz}
              className="px-3.5 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-900/90 text-amber-200 hover:text-white font-bold text-xs transition backdrop-blur-md border border-amber-400/40 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>3초 여행 취향 추천</span>
            </button>

            {onOpenTravelInfo && (
              <button
                onClick={() => onOpenTravelInfo('course')}
                className="px-3.5 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-900/90 text-sky-200 hover:text-white font-bold text-xs transition backdrop-blur-md border border-sky-400/40 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-300" />
                <span>베트남 여행정보 꿀팁</span>
              </button>
            )}
          </div>
        </div>

        {/* Destination Quick Selector Chips (Bottom Interactive Bar: 14 Full Vietnam Spots & Category Filter) */}
        <div className="mt-8 pt-4 border-t border-white/20 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-teal-200 font-black flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-300" />
                <span>베트남 14대 대표 명소 & 풀빌라·골프 도감 ({currentBgIndex + 1}/{HERO_BACKGROUNDS.length})</span>
              </span>

              {/* Theme Group Filter Buttons */}
              <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                {(['전체', '북부', '중부', '고원/해양', '골프/풀빌라'] as const).map(group => (
                  <button
                    key={group}
                    onClick={() => setActiveGroupFilter(group)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                      activeGroupFilter === group
                        ? 'bg-teal-500 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {HERO_BACKGROUNDS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentBgIndex === idx ? 'w-6 bg-gradient-to-r from-emerald-400 to-teal-300 shadow-sm' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`슬라이드 ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {filteredSlides.map((bg) => {
              const originalIndex = HERO_BACKGROUNDS.findIndex(item => item.id === bg.id);
              const isActive = currentBgIndex === originalIndex;
              return (
                <button
                  key={bg.id}
                  onClick={() => handleSelectSlide(originalIndex)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg border border-emerald-300/80 ring-2 ring-emerald-400/40 scale-105'
                      : 'bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/15'
                  }`}
                >
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    bg.categoryGroup === '북부' ? 'bg-sky-500/40 text-sky-200' :
                    bg.categoryGroup === '중부' ? 'bg-emerald-500/40 text-emerald-200' :
                    bg.categoryGroup === '고원/해양' ? 'bg-teal-500/40 text-teal-200' :
                    'bg-amber-500/40 text-amber-200'
                  }`}>
                    {bg.categoryGroup}
                  </span>
                  <span>{bg.regionChip}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};




