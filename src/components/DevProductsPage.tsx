import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Send, 
  MessageCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Star, 
  Users, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { Product, Category, City } from '../types';
import { ExchangeRates } from '../lib/exchangeRate';
import { DEFAULT_KAKAO_LINK, COMPANY_PHONE, handleOpenKakaoTalkDirect } from '../constants';

interface DevProductsPageProps {
  onSelectProduct?: (product: Product) => void;
  onOpenConsultation: (targetProduct?: Product | null) => void;
  onNavigateHome: () => void;
  exchangeRates: ExchangeRates;
}

export interface DevProductItem {
  id: string;
  title: string;
  subTitle: string;
  region: '북부' | '중부' | '남부';
  city: City;
  category: Category;
  progress: number; // 0 - 100%
  statusText: string;
  expectedLaunch: string;
  duration: string;
  imageUrl: string;
  highlights: string[];
  included: string[];
  earlyBirdBenefit: string;
  description: string;
}

export const DEV_PRODUCTS_LIST: DevProductItem[] = [
  {
    id: 'dev-sapa-fansipan-trekking-4d',
    title: '[개발중 95%] 사파 & 판시판 클라우드 힐링 트레킹 3박 4일',
    subTitle: '판시판 해발 3,143m 정상 모노레일 정복 · 깟깟 소수민족 마을 & 최고급 에코 롯지 힐링',
    region: '북부',
    city: '사파',
    category: '자유여행',
    progress: 95,
    statusText: '호텔 & 전용 차량 코스 답사 완료 (출시 임박)',
    expectedLaunch: '2026년 상반기 정식 오픈 예정',
    duration: '3박 4일',
    imageUrl: '/images/sapa_fansipan.jpg',
    highlights: [
      '판시판 케이블카 & 정상 모노레일 왕복 올인클루시브',
      '사파 시내 및 다랭이논 뷰 5성급 에코 롯지 숙박',
      '블랙 흐몽족 전통 마을 단독 가이드 워킹 투어',
      '하노이 ↔ 사파 최신형 VIP 우등 리무진 왕복 전용 배차'
    ],
    included: [
      '전 일정 단독 VIP 전용 차량 및 한국어 전문 가이드',
      '사파 최고급 리조트 3박 및 조식 포함',
      '판시판 전 코스 케이블카/모노레일 입장권 일체',
      '현지 전통 특식 3회 및 여행자 보험 1억원 가입'
    ],
    earlyBirdBenefit: '얼리버드 사전 문의 시 단독 차량 무료 업그레이드 & 마사지 90분 제공',
    description: '베트남의 알프스로 불리는 사파의 신비로운 운해와 계단식 논, 인도차이나 최고봉 판시판을 가장 여유롭고 럭셔리하게 경험하는 단독 맞춤 패키지입니다. 현지 제휴를 마치고 출시 준비 중입니다.'
  },
  {
    id: 'dev-hagiang-mapileng-adventure-5d',
    title: '[개발중 90%] 하장 루프 & 마피렝 협곡 비경 탐험 4박 5일',
    subTitle: '베트남 최북단 지질공원 · 마피렝 협곡 파노라마 8선 & 에메랄드빛 뇨꿰강 보트 투어',
    region: '북부',
    city: '하장',
    category: '자유여행',
    progress: 90,
    statusText: '단독 4륜 SUV & 한국어 안전 가이드 배치 완료',
    expectedLaunch: '2026년 정식 오픈 예정',
    duration: '4박 5일',
    imageUrl: '/images/hagiang.jpg',
    highlights: [
      '아시아에서 가장 웅장한 마피렝 협곡 능선 단독 조망',
      '뇨꿰강 협곡 속을 가로지르는 전용 모터보트 프라이빗 투어',
      '동반 카르스트 고원 지질공원 & 룽꾸 국기봉 방문',
      '외국인 전용 북부 허가증 발급 대행 일체 포함'
    ],
    included: [
      '하장 전용 4륜 최고급 SUV 차량 및 베테랑 현지 기사',
      '하노이 출발 전담 한국어 가이드 전 일정 밀착 동행',
      '동반 & 메오박 최고급 부티크 호텔 숙박',
      '뇨꿰강 전용 보트 탑승권 및 전 일정 식사'
    ],
    earlyBirdBenefit: '사전 얼리버드 예약 시 뇨꿰강 프라이빗 티타임 & 고화질 스냅 촬영 무료',
    description: '여행 마니아들이 평생 한 번은 가보고 싶어 하는 베트남의 마지막 비경 하장(Ha Giang). 위험한 오토바이 투어 대신 안전하고 쾌적한 전용 SUV와 한국어 가이드로 편안하게 즐기실 수 있도록 준비 중입니다.'
  },
  {
    id: 'dev-caobang-bangioc-safari-4d',
    title: '[개발중 85%] 까오방 반족 폭포 & 호랑이 동굴 탐험 3박 4일',
    subTitle: '아시아 최대 국경 폭포 반족 폭포 뗏목 유람 · 신비의 응우옴응아오 종유석 동굴',
    region: '북부',
    city: '까오방',
    category: '자유여행',
    progress: 85,
    statusText: '유네스코 지질공원 공식 인증 여행 코스 기획 중',
    expectedLaunch: '2026년 출시 예정',
    duration: '3박 4일',
    imageUrl: '/images/bangioc.jpg',
    highlights: [
      '거대한 수량을 자랑하는 반족 폭포 바로 앞까지 전용 뗏목 유람',
      '수억 년 세월의 종유석이 빚어낸 응우옴응아오 동굴 프라이빗 탐방',
      '청정 에메랄드빛 탕헨 산정 호수 보트 힐링',
      '현지 소수민족 전통 숯불 요리 및 향토 특식 만찬'
    ],
    included: [
      '하노이 왕복 VIP 전용 리무진 밴 & 전문 기사',
      '한국어 능통 전문 가이드 단독 배차',
      '까오방 럭셔리 리조트 숙박 및 전 일정 식사',
      '반족 폭포 뗏목 및 동굴 입장료 일체'
    ],
    earlyBirdBenefit: '얼리버드 신청 고객 전원 까오방 특산 원두커피 & 전신 마사지 제공',
    description: '베트남과 중국 국경에 위치한 웅장한 반족 폭포와 때묻지 않은 자연 그대로의 까오방을 둘러보는 힐링 코스입니다. 현지 라이선스 및 전용 시설 점검 중입니다.'
  },
  {
    id: 'dev-phuquoc-yacht-sunset-3d',
    title: '[개발중 90%] 푸꾸옥 럭셔리 선셋 요트 크루즈 & 프라이빗 호핑',
    subTitle: '안토이 남부 군도 단독 요트 차터 · 선셋 샴페인 디너 & 밤바다 선상 낚시 체험',
    region: '남부',
    city: '푸꾸옥',
    category: '자유여행',
    progress: 90,
    statusText: '프라이빗 카타마란 요트 제휴 계약 완료',
    expectedLaunch: '2026년 출시 예정',
    duration: '반일 / 1일 단독 투어',
    imageUrl: '/images/phuquoc_sunset.jpg',
    highlights: [
      '우리 일행만을 위한 단독 럭셔리 카타마란 요트 전세 운항',
      '감기 손가락 섬, 메이룻 섬 등 청정 에메랄드 스노클링',
      '선상 위 셰프가 즉석 조리하는 신선한 해산물 BBQ & 와인',
      '호텔 로비 전용 리무진 픽업/샌딩 포함'
    ],
    included: [
      '단독 전용 요트 차터 및 승무원/캡틴 서비스',
      '고급 스노클링 장비, 구명조끼, 패들보드 완비',
      '선상 씨푸드 BBQ 디너 & 무제한 음료/와인',
      '한국어 안내 및 여행자 보험 포함'
    ],
    earlyBirdBenefit: '얼리버드 예약 시 푸꾸옥 혼똔섬 케이블카 VIP 패스 1+1 증정',
    description: '베트남의 몰디브로 불리는 푸꾸옥의 아름다운 남부 바다에서 잊지 못할 선셋과 단독 호핑 투어를 만끽할 수 있는 프리미엄 해양 상품입니다.'
  },
  {
    id: 'dev-danang-river-luxury-villa-pack',
    title: '[개발중 95%] 다낭 & 호이안 럭셔리 투본강 리버 크루즈 + 대저택 풀빌라',
    subTitle: '투본강 프라이빗 전통 목선 선셋 크루즈 · 호이안 야경 투어 & 단독 전용 럭셔리 빌라',
    region: '중부',
    city: '다낭',
    category: '풀빌라',
    progress: 95,
    statusText: 'VITRACO 전용 VIP 리무진 및 빌라 라인업 배치 완료',
    expectedLaunch: '2026년 정식 오픈 예정',
    duration: '3박 4일 / 자유 연박',
    imageUrl: '/images/vietnam_beach_villa.jpg',
    highlights: [
      '미케비치 도보 1분 단독 대형 프라이빗 풀빌라 숙박',
      '호이안 구시가지 투본강 전용 전통 목선 프라이빗 샴페인 투어',
      '풀빌라 야외 가든 셰프 단독 BBQ 파티 서비스',
      'VITRACO 단독 VIP 리무진 24시간 전용 케어'
    ],
    included: [
      '단독 풀빌라 독채 전체 사용 및 프라이빗 수영장',
      '호이안 전용 목선 투어 & 올드타운 전 코스 입장권',
      '공항 왕복 VIP 의전 리무진 픽업/샌딩',
      '24시간 한국어 컨시어지 서비스'
    ],
    earlyBirdBenefit: '얼리버드 신청 시 풀빌라 BBQ 파티용 프리미엄 와인 2병 무료 제공',
    description: '다낭의 최고급 독채 풀빌라와 호이안의 로맨틱한 등불 야경, 투본강 프라이빗 선셋 크루즈를 한 번에 누리는 럭셔리 스테이 패키지입니다.'
  },
  {
    id: 'dev-vietnam-masters-golf-72hole',
    title: '[개발중 85%] 베트남 10대 명문 골프 VIP 챔피언십 72홀 마스터즈',
    subTitle: '바나힐스 CC · BRG 다낭 · 몽고메리 · 호이아나 쇼어스 1인 1캐디 올포함 챌린지',
    region: '중부',
    city: '다낭',
    category: '골프투어',
    progress: 85,
    statusText: '2026 프라임 타임 티타임 단독 블록 확보 중',
    expectedLaunch: '2026년 정식 오픈 예정',
    duration: '3박 5일 / 4박 6일',
    imageUrl: '/images/vietnam_golf_resort.jpg',
    highlights: [
      '세계 100대 골프 코스 호이아나 쇼어스 링크스 코스 라운딩',
      '루크 도널드가 설계한 명문 바나힐스 야간 라운딩 옵션',
      '1인 1캐디 + 2인 1카트 (그린피, 캐디피, 전동카트 일체 포함)',
      '골프백 수납 특화 최신형 VIP 리무진 전 일정 단독 수송'
    ],
    included: [
      '72홀 그린피 + 캐디피 + 전동카트비 전액 포함',
      '다낭 최고급 5성 해변 리조트 숙박 및 조식',
      '골프장 ↔ 호텔 ↔ 공항 VIP 단독 리무진 전용 배차',
      '라운딩 후 전신 스포츠 마사지 90분'
    ],
    earlyBirdBenefit: '단체(8인 이상) 얼리버드 예약 시 1인 무료 라운딩 및 프리미엄 골프공 세트 증정',
    description: '베트남 최고의 골프 코스 4곳을 엄선하여 골퍼들의 로망을 완벽하게 실현해 드리는 VIP 전용 챔피언십 투어입니다.'
  },
  {
    id: 'dev-dalat-winery-glamping-4d',
    title: '[개발중 80%] 달랏 고원 와이너리 & 피톤치드 럭셔리 글램핑 3박 4일',
    subTitle: '해발 1,500m 소나무 숲속 프리미엄 글램핑 · 달랏 와이너리 시음 & 커피 농장 드립 체험',
    region: '남부',
    city: '달랏',
    category: '자유여행',
    progress: 80,
    statusText: '랑비앙산 독점 글램핑 사이트 조성 협의 중',
    expectedLaunch: '2026년 가을 시즌 오픈 예정',
    duration: '3박 4일',
    imageUrl: '/images/dalat.jpg',
    highlights: [
      '연중 18도 시원하고 쾌적한 달랏 랑비앙 소나무 숲 글램핑',
      '달랏 현지 빈야드 와이너리 단독 견학 및 치즈 페어링',
      '해발 1,600m 아라비카 유기농 커피 농장 수확 및 핸드드립 클래스',
      '다딴라 알파인 루지 & 린푸옥 사원 단독 투어'
    ],
    included: [
      '달랏 공항 전용 픽업/샌딩 및 전용 차량',
      '럭셔리 글램핑 2박 + 5성 시내 호텔 1박',
      '와이너리 시음권 및 캠프파이어 BBQ 디너',
      '한국어 전문 가이드 전 일정 케어'
    ],
    earlyBirdBenefit: '사전 예약 시 달랏 오리지널 와인 선물세트 및 현지 특산품 증정',
    description: '베트남의 봄의 도시 달랏의 맑은 공기와 유럽풍 와이너리, 낭만적인 별빛 글램핑을 결합한 신개념 감성 힐링 여행입니다.'
  }
];

export const DevProductsPage: React.FC<DevProductsPageProps> = ({
  onSelectProduct,
  onOpenConsultation,
  onNavigateHome,
}) => {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'전체' | '북부' | '중부' | '남부'>('전체');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('전체');

  const filteredItems = DEV_PRODUCTS_LIST.filter(item => {
    if (selectedRegionFilter !== '전체' && item.region !== selectedRegionFilter) return false;
    if (selectedCategoryFilter !== '전체' && item.category !== selectedCategoryFilter) return false;
    return true;
  });

  const handleKakaoInquireItem = (_item: DevProductItem) => {
    handleOpenKakaoTalkDirect();
  };

  const handleConsultItem = (item: DevProductItem) => {
    const targetProd: Product = {
      id: item.id,
      title: item.title,
      subTitle: item.subTitle,
      category: item.category,
      region: item.region,
      city: item.city,
      priceKRW: 0,
      priceVND: 0,
      duration: item.duration,
      imageUrl: item.imageUrl,
      description: item.description,
      included: item.included,
      excluded: ['개인 경비', '국제선 항공권'],
      departureCities: ['인천', '부산', '대구'],
      tags: ['개발중', '얼리버드', item.city],
      rating: 5.0,
      reviewCount: 0,
      highlights: item.highlights
    };
    onOpenConsultation(targetProd);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 홈페이지로 돌아가기</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>신규 R&D 라인업</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">총 {DEV_PRODUCTS_LIST.length}개 상품 기획 진행중</span>
          </div>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 pt-10 pb-12 sm:pt-16 sm:pb-16 border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-emerald-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>2026 신규 기획 & 개발중인 여행 상품 라인업</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            현재 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">현지 답사 & 개발중인</span> 신규 상품
          </h1>

          <p className="max-w-3xl mx-auto text-xs sm:text-base text-slate-300 leading-relaxed font-medium">
            정식 오픈 전, 신짜오투어 현지 전담팀이 직접 코스를 점검하고 있는 프리미엄 여행 라인업입니다.
            <br className="hidden sm:inline" />
            얼리버드(Early Bird) 사전 문의 고객님께는 <strong className="text-amber-300 font-bold">VIP 단독 차량 업그레이드 및 우선 예약 특전</strong>을 제공합니다.
          </p>

          {/* Quick Stats Banner */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% 현지 직영 코스 답사</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>사전 얼리버드 예약 우대</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>맞춤 코스 일정 협의 가능</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1 mr-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>권역별:</span>
            </span>
            {(['전체', '북부', '중부', '남부'] as const).map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedRegionFilter === reg
                    ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {reg === '전체' ? '베트남 전역' : reg}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-400 font-bold mr-1">테마:</span>
            {['전체', '자유여행', '풀빌라', '골프투어'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-slate-800/90 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-950/30 transition-all flex flex-col group"
            >
              {/* Image & Badges Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/danang_golden_bridge.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                {/* Progress Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/50 flex items-center gap-1.5 text-xs font-black text-amber-300 shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>진행도 {item.progress}%</span>
                </div>

                {/* Category & Region */}
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="bg-emerald-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-md">
                    {item.region} · {item.city}
                  </span>
                  <span className="bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>

                {/* Expected Launch */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-bold bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Clock className="w-3 h-3" />
                    <span>{item.expectedLaunch}</span>
                  </span>
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Progress Bar Line */}
              <div className="w-full bg-slate-950 h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 h-full transition-all duration-1000"
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Status Banner */}
                  <div className="text-[11px] font-extrabold text-amber-300 bg-amber-500/10 border border-amber-400/30 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{item.statusText}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-black text-white text-base leading-snug group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.subTitle}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-extrabold text-slate-400 block uppercase tracking-wider">주요 기획 포인트</span>
                    {item.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1 leading-snug">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Early Bird Benefit Box */}
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
                    <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                      <span>얼리버드 사전 예약 특전</span>
                    </span>
                    <p className="text-[11px] text-slate-300 font-semibold leading-snug">
                      {item.earlyBirdBenefit}
                    </p>
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-semibold">예상 견적:</span>
                    <span className="text-sm font-black text-amber-400 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-lg">
                      가격 문의 (얼리버드 협의)
                    </span>
                  </div>

                  {/* 2 Main Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleConsultItem(item)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-sm transition cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>얼리버드 신청</span>
                    </button>
                    <button
                      onClick={() => handleKakaoInquireItem(item)}
                      className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-sm transition cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>카톡 1:1 문의</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Custom Course Planning CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 p-6 sm:p-10 rounded-3xl text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-400/30">
            <Compass className="w-3.5 h-3.5" />
            <span>원하시는 베트남 여행지가 따로 있으신가요?</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white">
            찾으시는 코스가 없더라도 <span className="text-amber-300">1:1 맞춤 일정</span>으로 전담 기획해 드립니다
          </h2>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
            하장, 까오방, 사파, 퐁냐케방, 푸꾸옥 등 베트남 전역의 단독 전용 차량 및 한국어 가이드, 5성급 숙소를
            신짜오투어 × 비트라코 투어 현지 직영 네트워크로 가장 안전하고 합리적으로 구성해 드립니다.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenConsultation(null)}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>1:1 맞춤 여행 무료 견적 요청하기</span>
            </button>
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-600 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>전체 정식 상품 목록 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
