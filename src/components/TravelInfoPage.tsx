import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  MapPin, 
  Sun, 
  CloudRain, 
  DollarSign, 
  FileText, 
  Utensils, 
  Lightbulb, 
  Phone, 
  Smartphone, 
  ShieldAlert, 
  Calendar, 
  ExternalLink,
  Calculator,
  Compass,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Home,
  Clock,
  Send,
  Info
} from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, formatVND } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';

export type TravelInfoTab = 
  | 'course' 
  | 'weather' 
  | 'exchange' 
  | 'visa' 
  | 'food' 
  | 'tips';

interface TravelInfoPageProps {
  initialTab?: TravelInfoTab;
  rates: ExchangeRates;
  onBackToList: () => void;
  onOpenConsultation?: () => void;
}

export const TravelInfoPage: React.FC<TravelInfoPageProps> = ({
  initialTab = 'course',
  rates,
  onBackToList,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<TravelInfoTab>(initialTab);
  const [calcKRW, setCalcKRW] = useState<number>(100000);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const tabs: { id: TravelInfoTab; label: string; icon: React.ReactNode; desc: string; badge?: string }[] = [
    { id: 'course', label: '여행 코스 & 동선', icon: <Compass className="w-4 h-4" />, desc: '지역별 대표 코스 & 이동 동선', badge: '필독' },
    { id: 'weather', label: '베트남 날씨 & 옷차림', icon: <Sun className="w-4 h-4" />, desc: '도시별 기후 & 건/우기 옷차림' },
    { id: 'exchange', label: '실시간 환율 & 계산기', icon: <DollarSign className="w-4 h-4" />, desc: '실시간 환율 & 화폐 계산법', badge: '실시간' },
    { id: 'visa', label: '비자 & 여권 규정', icon: <FileText className="w-4 h-4" />, desc: '45일 무비자 & 여권 유효기간' },
    { id: 'food', label: '대표 맛집 & 미식 가이드', icon: <Utensils className="w-4 h-4" />, desc: '현지 대표 미식 & 고수빼기 팁' },
    { id: 'tips', label: '여행 필수 알짜팁', icon: <Lightbulb className="w-4 h-4" />, desc: '그랩/유심/팁문화/비상연락처' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToList}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>메인 화면으로 돌아가기</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>/</span>
              <span className="flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                홈
              </span>
              <span>/</span>
              <span className="text-teal-800 font-bold">베트남 실전 여행정보 백과</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span className="hidden sm:inline">1:1 카톡 상담</span>
              <span className="sm:hidden">카톡</span>
            </button>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>맞춤 견적 신청</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-black border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>신짜오투어(Tours XIN CHÀO) 베트남 여행백과</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                베트남 현지 실전 여행정보 가이드
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                현지 직영 가이드와 전문가가 직접 검증한 지역별 추천 동선, 실시간 환율 계산, 45일 무비자 규정, 날씨 및 맛집 꿀팁까지 베트남 여행에 필요한 모든 정보를 한눈에 확인하세요.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-2 shrink-0 sm:min-w-[260px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300">오늘의 실시간 환율</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-lg font-black text-amber-300 font-mono">
                10만 원 ≒ {formatVND(calculateVNDFromKRW(100000, rates))}
              </p>
              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-white/10">
                <span>입국 규정: 45일 무비자</span>
                <span>전압: 220V 동일</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation & Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* Sticky Tab Navigation Bar */}
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200/80 mb-8 overflow-x-auto flex items-center gap-2 no-scrollbar">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer flex-1 justify-center ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/25'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                }`}
              >
                <span className={isActive ? 'text-amber-300' : 'text-teal-700'}>{t.icon}</span>
                <span>{t.label}</span>
                {t.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-black ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-teal-100 text-teal-800'
                  }`}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="space-y-8 animate-fadeIn">
          
          {/* ========================================================= */}
          {/* TAB 1: 여행 코스 & 동선 */}
          {/* ========================================================= */}
          {activeTab === 'course' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-teal-50/80 border border-teal-200 p-5 rounded-2xl flex items-start gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg">
                    베트남 지역별 맞춤 추천 코스 & 동선 가이드
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    신짜오투어가 수만 명의 고객 피드백과 현지 전담 가이드 경험을 토대로 검증한 가장 효율적이고 여유로운 대표 추천 코스입니다. 전 일정 단독 전용 차량 및 한국어 가이드 맞춤 조정이 가능합니다.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Da Nang Course */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                      다낭 & 호이안 3박 5일
                    </span>
                    <span className="text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      👑 가족 & 휴양 1위
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">골든브릿지 & 미케비치 힐링 코스</h4>
                    <p className="text-xs text-slate-500 mt-0.5">휴양과 관광, 미식과 마사지까지 가장 완벽한 밸런스</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">1일차</span>
                      <span className="leading-relaxed">다낭 국제공항 전담 가이드 미팅 ➔ 호텔 체크인 ➔ 미케비치 해안 산책 및 최고급 시푸드 만찬</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">2일차</span>
                      <span className="leading-relaxed">바나힐 테마파크 (세계 최장 케이블카 & 골든브릿지 손동상) ➔ 다낭 핑크성당 & 한시장 쇼핑 ➔ 한강 용다리 야경</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">3일차</span>
                      <span className="leading-relaxed">유네스코 호이안 에코 투어 (코코넛 바구니배 & 쿠킹클래스) ➔ 호이안 올드타운 유등 띄우기 & 야시장 투어</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">4~5일차</span>
                      <span className="leading-relaxed">손짜반도 영흥사 해수관음상 ➔ 90분 프리미엄 스파 마사지 ➔ 롯데마트 쇼핑 후 공항 샌딩</span>
                    </li>
                  </ul>
                </div>

                {/* Hanoi Course */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-200">
                      하노이 & 하롱베이 3박 5일
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      🌊 세계자연유산
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">5성급 럭셔리 크루즈 오션뷰 코스</h4>
                    <p className="text-xs text-slate-500 mt-0.5">베트남 천년의 수도 하노이와 3천여 개 섬이 빚어낸 비경</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">1일차</span>
                      <span className="leading-relaxed">노이바이 공항 도착 ➔ 하노이 시티 호안끼엠 호수 & 스트릿푸드 및 맥주거리 야경</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">2일차</span>
                      <span className="leading-relaxed">전용 리무진으로 하롱베이 이동 ➔ 5성급 럭셔리 크루즈 탑승 ➔ 승솟 석회동굴 탐험 & 카약 체험 ➔ 크루즈 선상 파티</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">3일차</span>
                      <span className="leading-relaxed">크루즈 일출 태극권 ➔ 티톱섬 전망대 트레킹 ➔ 하노이 복귀 ➔ 서호(West Lake) 석양 & 고급 분짜 디너</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">4~5일차</span>
                      <span className="leading-relaxed">바딘광장 & 호치민 생가 ➔ 36거리 전통 상점가 & 반미 맛집 ➔ 프리미엄 발 마사지 ➔ 공항 샌딩</span>
                    </li>
                  </ul>
                </div>

                {/* Nha Trang & Dalat Course */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                      나트랑 & 달랏 4박 5일
                    </span>
                    <span className="text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                      📸 커플 & 힐링
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">에메랄드 해변 & 고원 낭만 투어</h4>
                    <p className="text-xs text-slate-500 mt-0.5">연중 온화한 동양의 나폴리와 해발 1,500m 봄의 도시</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">1~2일차</span>
                      <span className="leading-relaxed">나트랑 깜란 공항 도착 ➔ 럭셔리 스피드보트 호핑투어 & 산호초 스노클링 ➔ 포나가르 사원 & 머드온천 힐링</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">3~4일차</span>
                      <span className="leading-relaxed">‘영원한 봄의 도시’ 달랏으로 이동 ➔ 다딴라 폭포 알파인 루지 체험 ➔ 크레이지하우스 & 달랏 기차역 ➔ 달랏 야시장 반짱느엉</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">5일차</span>
                      <span className="leading-relaxed">린프억 사원 ➔ 유명 로컬 카페 투어 ➔ 나트랑 이동 후 공항 출국</span>
                    </li>
                  </ul>
                </div>

                {/* Phu Quoc Course */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      푸꾸옥 3박 5일
                    </span>
                    <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      🏝️ 프라이빗 풀빌라
                    </span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">사파리 & 선셋타운 올인클루시브</h4>
                    <p className="text-xs text-slate-500 mt-0.5">베트남 최남단 청정 에메랄드 섬에서의 완벽한 휴식</p>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">1~2일차</span>
                      <span className="leading-relaxed">푸꾸옥 공항 미팅 ➔ 5성급 오션뷰 독채 풀빌라 체크인 ➔ 아시아 최대 빈펄 사파리 투어 ➔ 빈원더스 테마파크 & 아쿠아리움</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">3~4일차</span>
                      <span className="leading-relaxed">혼똔섬 세계 최장 해상 케이블카 탑승 ➔ 선셋타운 키스 오브 더 씨(Kiss of the Sea) 초대형 불꽃 분수쇼 ➔ 즈엉동 야시장</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-black text-teal-700 shrink-0 bg-teal-100/80 px-2 py-0.5 rounded-md text-xs">5일차</span>
                      <span className="leading-relaxed">풀빌라 레이트 체크아웃 & 자유 수영 ➔ 후추 농장 & 진주 농장 견학 ➔ 공항 샌딩</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: 베트남 날씨 & 옷차림 */}
          {/* ========================================================= */}
          {activeTab === 'weather' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-amber-50/80 border border-amber-200 p-5 rounded-2xl flex items-start gap-3.5 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base sm:text-lg">
                    베트남 주요 도시별 월별 기후 & 옷차림 상세 가이드
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    베트남은 남북 길이만 1,650km에 달해 북부, 중부, 남부의 기후와 계절이 완전히 다릅니다. 방문하실 지역의 건기/우기를 확인하시고 알맞은 옷차림을 준비하세요.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Da Nang */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-black text-slate-900 text-base">중부권 (다낭 · 호이안 · 나트랑)</h4>
                    <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                      건기: 2월 ~ 8월
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      <strong className="text-slate-900">☀️ 특징:</strong> 3월부터 8월까지는 맑고 쾌청하여 해수욕과 해양 액티비티를 즐기기에 가장 완벽한 계절입니다.
                    </p>
                    <p>
                      <strong className="text-slate-900">👕 옷차림 추천:</strong> 시원한 반팔, 통풍 좋은 린넨 셔츠, 원피스, 샌들, 래시가드, 자외선 차단제 및 선글라스.
                    </p>
                    <p className="text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                      <strong>☔ 우기 (9월~1월):</strong> 열대성 스콜이 지나갈 수 있으므로 가벼운 접이식 우산이나 얇은 바람막이를 챙기시면 좋습니다.
                    </p>
                  </div>
                </div>

                {/* Hanoi */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 hover:border-teal-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-black text-slate-900 text-base">북부권 (하노이 · 하롱베이 · 사파)</h4>
                    <span className="text-xs font-black text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                      건기: 10월 ~ 4월
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      <strong className="text-slate-900">🍂 특징:</strong> 뚜렷한 사계절이 있으며, 특히 10월~12월은 한국의 선선한 가을 날씨로 여행하기 가장 좋습니다.
                    </p>
                    <p>
                      <strong className="text-slate-900">🧥 옷차림 추천:</strong> 11월~2월은 기온이 12~18℃까지 내려가 쌀쌀하므로 경량 패딩, 도톰한 가디건, 긴바지 필수.
                    </p>
                    <p className="text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                      <strong>☔ 우기 (5월~9월):</strong> 고온다습한 여름 날씨로 실내 냉방 대비 얇은 겉옷을 준비하세요.
                    </p>
                  </div>
                </div>

                {/* Phu Quoc / Ho Chi Minh */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 hover:border-emerald-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-black text-slate-900 text-base">남부권 (푸꾸옥 · 달랏 · 호치민)</h4>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      건기: 11월 ~ 4월
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>
                      <strong className="text-slate-900">🌴 특징:</strong> 연중 27~32℃의 따뜻한 열대 기후입니다. (단, 고원 지대인 달랏은 연중 18~24℃로 매우 선선함)
                    </p>
                    <p>
                      <strong className="text-slate-900">🕶️ 옷차림 추천:</strong> 휴양지 비치웨어, 모자, 선글라스, 수영복. (달랏 여행 시에는 가벼운 외투 필수)
                    </p>
                    <p className="text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                      <strong>☔ 우기 (5월~10월):</strong> 보통 하루 1~2차례 시원하게 쏟아지는 소나기 형태입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: 실시간 환율 & 계산기 */}
          {/* ========================================================= */}
          {activeTab === 'exchange' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg sm:text-xl text-white">
                        실시간 베트남 동(VND) 화폐 계산기
                      </h3>
                      <p className="text-xs text-slate-400">
                        기준 환율: 1 USD = 약 {Math.round(rates.KRW).toLocaleString()} KRW / {Math.round(rates.VND).toLocaleString()} VND
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 self-start sm:self-auto">
                    ● 실시간 환율 동기화 완료
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">
                      한국 원화 금액 입력 (KRW)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="10000"
                        value={calcKRW}
                        onChange={(e) => setCalcKRW(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3.5 text-lg font-black text-white focus:outline-hidden pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        원
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {[10000, 50000, 100000, 300000, 500000, 1000000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setCalcKRW(amt)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          +{amt.toLocaleString()}원
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-2">
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                      환산된 베트남 동 (VND)
                    </span>
                    <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                      약 {formatVND(calculateVNDFromKRW(calcKRW, rates))}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      (10,000 베트남 동 ≒ 약 {Math.round((10000 / (rates.VND / rates.KRW)))}원 상당)
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips for dong */}
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl space-y-4 text-xs sm:text-sm text-amber-950 shadow-xs">
                <h4 className="font-extrabold text-amber-950 flex items-center gap-2 text-base">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
                  초간단 베트남 '동(VND)' 현장 암산 꿀팁 법칙!
                </h4>
                <p className="leading-relaxed text-amber-900">
                  베트남 지폐는 숫자의 0(공)이 많아 처음엔 헷갈릴 수 있습니다. 가장 쉽고 빠른 암산 방법:
                </p>
                <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-3 font-medium">
                  <p className="text-base font-black text-amber-900 text-center">
                    💡 "지폐 금액에서 맨 뒤의 '0'을 하나 빼고, '2'로 나누면 대략적인 한국 원화 가격!"
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 pt-2 border-t border-slate-100">
                    <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      • <strong>100,000 ₫ (10만 동)</strong> ➔ 10,000 ÷ 2 = <strong>약 5,000원</strong>
                    </div>
                    <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                      • <strong>500,000 ₫ (50만 동)</strong> ➔ 50,000 ÷ 2 = <strong>약 25,000원</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: 비자 & 여권 규정 */}
          {/* ========================================================= */}
          {activeTab === 'visa' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-slate-900">
                      대한민국 국적자 베트남 출입국 비자 & 여권 규정
                    </h3>
                    <p className="text-xs text-slate-500">2023년 8월 15일 개정된 베트남 정부 공식 무비자 정책 기준</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-black text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                      45일 무비자 (No Visa)
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base">45일 이하 일반 관광 입국</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      대한민국 여권 소지자는 사전 비자 발급 없이 **여권(유효기간 6개월 이상)**과 **출국 항공권(리턴 티켓)**만 제시하면 베트남 전 지역에서 최대 45일간 무비자로 자유롭게 여행하실 수 있습니다.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                      전자비자 (e-Visa)
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base">45일 초과 장기 체류 시</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      45일을 초과하여 장기 체류하거나 복수 입국(Multiple Entry)이 필요한 경우, 출국 최소 7일 전 베트남 이민국 공식 사이트에서 최대 90일 전자비자(e-Visa)를 신청하셔야 합니다.
                    </p>
                    <a
                      href="https://evisa.xuatnhapcanh.gov.vn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>베트남 이민국 공식 e-Visa 신청 사이트 바로가기</span>
                    </a>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl text-xs sm:text-sm text-rose-950 font-medium flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-black text-rose-900">
                      ⚠️ 출국 전 여권 유효기간 및 훼손 여부 필수 점검!
                    </p>
                    <p className="leading-relaxed">
                      여권 만료일이 출국일 기준 <strong>반드시 6개월 이상</strong> 남아있어야 하며, 여권 속지 훼손(낙서, 찢김, 물에 젖음, 서명란 오염)이 있는 경우 베트남 공항에서 입국이 거부될 수 있으니 미리 재발급 받으시기 바랍니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: 맛집 & 미식 가이드 */}
          {/* ========================================================= */}
          {activeTab === 'food' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-slate-900">
                      베트남 대표 미식 TOP 6 & 현지어 고수 빼기 팁
                    </h3>
                    <p className="text-xs text-slate-500">한국인 여행객의 입맛을 사로잡은 대표 요리와 주문 노하우</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-amber-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm">1. 쌀국수 (Phở)</h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">국민 메뉴</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      진하게 우려낸 소고기(Phở Bò) 육수 또는 닭고기(Phở Gà) 육수에 신선한 숙주와 라임을 곁들여 먹는 베트남 대표 요리.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-amber-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm">2. 분짜 (Bún Chả)</h4>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">숯불 풍미</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      숯불에 노릇하게 구운 돼지고기와 완자를 새콤달콤한 따뜻한 늑맘 소스에 쌀면과 생야채를 함께 적셔먹는 하노이 정통 요리.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-amber-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm">3. 반미 (Bánh Mì)</h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">겉바속촉</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      프랑스식 쌀 바게트 속에 파테, 고기, 절인 무와 당근, 칠리소스를 듬뿍 채워 넣은 베트남식 길거리 샌드위치.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-amber-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm">4. 반쎄오 (Bánh Xèo)</h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">바삭 부침개</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      쌀가루 반죽에 강황, 새우, 돼지고기, 숙주를 넣어 얇고 바삭하게 부친 후 라이스페이퍼와 상추에 싸서 소스에 찍어 먹는 별미.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-amber-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm">5. 모닝글로리 (Rau Muống)</h4>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">밥도둑 반찬</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      공심채 나물을 센 불에 다진 마늘, 피시소스와 함께 아삭하게 볶아낸 요리로 모든 식사에 곁들이기 좋은 최고의 밥도둑 반찬.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 hover:border-amber-400 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-sm">6. 코코넛 스무디 커피</h4>
                      <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">디저트 1위</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      달콤하고 고소한 코코넛 밀크 슬러시 위에 진한 베트남 에스프레소를 얹어 마시는 콩카페의 시그니처 음료.
                    </p>
                  </div>
                </div>

                {/* Coriander Card */}
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl space-y-3 text-xs sm:text-sm text-emerald-950">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <h4 className="font-black text-emerald-900 text-base">
                      "고수 빼주세요!" 식당 주문용 만능 베트남어 표현
                    </h4>
                  </div>
                  <p className="leading-relaxed text-emerald-800">
                    향신료나 고수(Rau thơm)를 원치 않으실 때는 주문 시 아래 문장을 직원에게 스마트폰 화면으로 직접 보여주세요.
                  </p>
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center shadow-xs">
                    <p className="text-lg sm:text-xl font-black text-slate-950 font-mono tracking-wide">
                      "Không cho rau thơm"
                    </p>
                    <p className="text-xs text-emerald-700 font-bold mt-1">
                      [발음: 콩 조 라우 똠] (뜻: 고수/향채 넣지 말아주세요)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: 여행 알짜팁 & 비상연락망 */}
          {/* ========================================================= */}
          {activeTab === 'tips' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grab */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-teal-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">그랩(Grab) 앱 사전 설치 & 카드 등록</h4>
                      <span className="text-xs text-emerald-700 font-bold">바가지 요금 100% 방지</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    출국 전 한국에서 미리 **그랩(Grab)** 앱을 다운로드하고 해외 결제 가능 신용카드를 등록해 두세요. 출발지와 목적지 요금이 정찰제로 자동 결제되어 안전하고 편리합니다.
                  </p>
                </div>

                {/* Tipping */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-amber-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">베트남 팁(Tip) 매너 가이드</h4>
                      <span className="text-xs text-amber-700 font-bold">스파 & 전담 기사 에티켓</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    일반 식당과 카페는 팁이 필수가 아니지만, **마사지 스파(60분 기준 5만~10만 동 / 약 2,500~5,000원)**나 **전용 차량 기사/가이드 매너팁**은 준비해 주시면 더욱 정성스러운 서비스를 받으실 수 있습니다.
                  </p>
                </div>

                {/* SIM & eSIM */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-teal-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">유심(SIM) vs eSIM 선택 가이드</h4>
                      <span className="text-xs text-teal-700 font-bold">인터넷 데이터 연결</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    한국 전화/문자 수신이 필요한 분은 **eSIM**이 매우 편리하며, 통신망의 가장 안정적인 초고속 무제한 데이터를 원하시면 **현지 공항 수령 유심(Viettel / Vinaphone)**을 추천합니다.
                  </p>
                </div>

                {/* Voltage */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-indigo-400 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">전압 & 콘센트 규격 (220V 동일)</h4>
                      <span className="text-xs text-indigo-700 font-bold">멀티 어댑터 불필요</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    베트남의 전압은 한국과 동일한 **220V, 50Hz**이며 대부분의 호텔과 리조트에서 한국 2구 플러그를 그대로 꽂아 충전기, 드라이기 등을 사용하실 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <h4 className="font-black text-base sm:text-lg text-white">
                    24시간 긴급 비상연락처 및 대사관 콜센터
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[11px]">외교부 영사콜센터 (24시간)</span>
                    <strong className="text-amber-400 font-mono text-sm block">+82-2-3210-0404</strong>
                    <span className="text-[10px] text-slate-500">사고 및 여권 분실 긴급 지원</span>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[11px]">주다낭 대한민국 총영사관</span>
                    <strong className="text-amber-400 font-mono text-sm block">+84-236-3561-000</strong>
                    <span className="text-[10px] text-slate-500">다낭 · 후에 · 호이안 관할</span>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[11px]">주베트남 대한민국 대사관(하노이)</span>
                    <strong className="text-amber-400 font-mono text-sm block">+84-24-3831-5111</strong>
                    <span className="text-[10px] text-slate-500">하노이 및 북부 지역 관할</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-teal-800/50">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              100% 실시간 맞춤 상담
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              베트남 여행에 대해 더 궁금한 점이 있으신가요?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              신짜오투어 현지 직영 한국인 매니저가 1:1로 실시간 맞춤 여행 플랜과 최저가 견적을 안내해 드립니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>카카오톡 1:1 바로 상담</span>
            </button>

            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-5 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md cursor-pointer"
              >
                무료 맞춤 견적 신청하기
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
