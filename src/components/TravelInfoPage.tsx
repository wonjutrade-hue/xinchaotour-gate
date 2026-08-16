import React, { useState } from 'react';
import { 
  Compass, 
  Sun, 
  DollarSign, 
  FileText, 
  Utensils, 
  Lightbulb, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  Phone, 
  Smartphone, 
  Calculator,
  CalendarCheck,
  ArrowRight,
  Sparkles
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
  onOpenConsultation?: () => void;
}

export const TravelInfoPage: React.FC<TravelInfoPageProps> = ({
  initialTab = 'course',
  rates,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<TravelInfoTab>(initialTab);
  const [calcKRW, setCalcKRW] = useState<number>(100000);

  const tabs: { id: TravelInfoTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'course', label: '추천 코스 & 동선', icon: <Compass className="w-4 h-4" />, desc: '지역별 대표 코스 & 이동 동선' },
    { id: 'weather', label: '베트남 날씨 & 옷차림', icon: <Sun className="w-4 h-4" />, desc: '도시별 날씨 & 건/우기 옷차림' },
    { id: 'exchange', label: '실시간 환율 & 계산기', icon: <DollarSign className="w-4 h-4" />, desc: '실시간 환율 & 화폐 계산법' },
    { id: 'visa', label: '비자 & 입국 가이드', icon: <FileText className="w-4 h-4" />, desc: '45일 무비자 & 여권 유효기간' },
    { id: 'food', label: '대표 미식 & 맛집 팁', icon: <Utensils className="w-4 h-4" />, desc: '현지 대표 미식 & 고수빼기 팁' },
    { id: 'tips', label: '필수 여행 꿀팁 & 안전', icon: <Lightbulb className="w-4 h-4" />, desc: '그랩/유심/팁문화/비상연락처' },
  ];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>신짜오투어 베트남 여행 필수 정보 가이드</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              베트남 여행 전 꼭 알아야 할 <span className="text-emerald-400">필수 정보 백과사전</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              북부(하노이/사파/하장/하롱베이), 중부(다낭/호이안/후에/나트랑), 남부(호치민/달랏/푸꾸옥)의 
              대표 추천 동선부터 실시간 환율 계산, 45일 무비자 입국 규정, 건·우기 날씨, 그랩 사용법까지 한눈에 확인하세요.
            </p>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="bg-white p-2 rounded-2xl shadow-xs border border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`p-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-emerald-700'
                }`}
              >
                <div className={`${isActive ? 'text-white' : 'text-emerald-600'}`}>
                  {t.icon}
                </div>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          {/* TAB 1: 코스 안내 */}
          {activeTab === 'course' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-emerald-600" />
                  <span>지역별 대표 추천 일정 & 이동 꿀팁</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  베트남 북부, 중부, 남부 핵심 도시를 가장 효율적으로 둘러보는 신짜오투어 추천 동선입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 중부 다낭/호이안 */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4 hover:border-emerald-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                      인기 No.1 중부
                    </span>
                    <span className="text-xs text-slate-500 font-bold">3박 5일 / 4박 6일</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">다낭 · 호이안 · 바나힐</h4>
                  
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex gap-2">
                      <span className="font-bold text-emerald-700 shrink-0">1일차</span>
                      <span>다낭 국제공항 도착 ➔ VIP 전용차량 픽업 ➔ 리조트/풀빌라 체크인 ➔ 미케비치 산책 및 씨푸드</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-emerald-700 shrink-0">2일차</span>
                      <span>바나힐 국립공원 테마파크 (골든브릿지/케이블카) ➔ 마사지 케어 ➔ 한시장 쇼핑</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-emerald-700 shrink-0">3일차</span>
                      <span>오행산(마블마운틴) ➔ 호이안 올드타운 투어 ➔ 바구니배(투본강) ➔ 야시장 & 소원배 띄우기</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-emerald-700 shrink-0">4일차</span>
                      <span>영흥사(링엄사) 해수관음상 ➔ 핑크성당 ➔ 롯데마트 쇼핑 ➔ 공항 샌딩</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 p-3 rounded-xl text-[11px] text-emerald-900 border border-emerald-100">
                    💡 <strong>추천 대상:</strong> 가족 여행, 효도 여행, 커플, 골프 매니아 (이동 거리 짧고 인프라 완벽)
                  </div>
                </div>

                {/* 북부 하노이/하롱베이/사파/하장 */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4 hover:border-emerald-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 text-xs font-black">
                      대자연 북부
                    </span>
                    <span className="text-xs text-slate-500 font-bold">4박 6일 / 5박 7일</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">하노이 · 하롱베이 · 닌빈 / 사파</h4>
                  
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex gap-2">
                      <span className="font-bold text-teal-700 shrink-0">1일차</span>
                      <span>하노이 노이바이 공항 도착 ➔ 호안끼엠 호수 & 구시가지 야경 및 하노이 분짜</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-teal-700 shrink-0">2일차</span>
                      <span>하롱베이 이동 ➔ 5성급 럭셔리 크루즈 탑승 ➔ 기암괴석 & 승솟 동굴 탐험</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-teal-700 shrink-0">3일차</span>
                      <span>크루즈 일출 태극권 ➔ 닌빈(짱안) 이동 ➔ 육지의 하롱베이 나룻배 투어 & 항무아</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-teal-700 shrink-0">4~5일차</span>
                      <span>사파 판시판 산악열차/케이블카 또는 하장 마피렝 루프 대자연 ➔ 하노이 복귀</span>
                    </div>
                  </div>

                  <div className="bg-teal-50/70 p-3 rounded-xl text-[11px] text-teal-900 border border-teal-100">
                    💡 <strong>추천 대상:</strong> 유네스코 자연유산 탐방, 트레킹, 웅장한 대자연을 즐기고 싶은 분
                  </div>
                </div>

                {/* 남부 나트랑/달랏/푸꾸옥 */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4 hover:border-emerald-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-black">
                      휴양/이색 남부
                    </span>
                    <span className="text-xs text-slate-500 font-bold">3박 5일 / 4박 6일</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">나트랑 · 달랏 / 푸꾸옥</h4>
                  
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex gap-2">
                      <span className="font-bold text-amber-700 shrink-0">1일차</span>
                      <span>나트랑 깜라인 공항 ➔ 리조트 체크인 ➔ 포나가르 사원 & 머드온천 스파 힐링</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-amber-700 shrink-0">2일차</span>
                      <span>호핑투어(스노클링/스쿠버다이빙) 또는 빈원더스 테마파크 워터파크</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-amber-700 shrink-0">3일차</span>
                      <span>고원도시 달랏 이동 ➔ 랑비앙산 & 다딴라 폭포 알파인코스터 ➔ 야시장</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold text-amber-700 shrink-0">4일차</span>
                      <span>달랏 기차역 & 린푸억 사원 ➔ 롱비치 일몰 감상 후 귀국</span>
                    </div>
                  </div>

                  <div className="bg-amber-50/70 p-3 rounded-xl text-[11px] text-amber-900 border border-amber-100">
                    💡 <strong>추천 대상:</strong> 휴양과 관광의 완벽한 조화, 따뜻한 해변 호핑 및 고원 힐링
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 날씨 정보 */}
          {activeTab === 'weather' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-amber-500" />
                  <span>베트남 지역별 기후 & 월별 최적 옷차림</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  베트남은 남북으로 1,650km 이상 길게 뻗어 있어 지역에 따라 날씨가 크게 다릅니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 북부 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">북부 (하노이/사파/하롱베이)</h4>
                    <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">4계절 존재</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li>• <strong>11월 ~ 3월 (겨울/건기):</strong> 13°C~22°C로 서늘함. <strong>경량 패딩, 바람막이, 긴팔</strong> 필수 (사파/판시판은 5°C 이하로 떨어짐).</li>
                    <li>• <strong>4월 ~ 10월 (여름/우기):</strong> 28°C~36°C로 덥고 습함. 통풍 잘되는 <strong>반팔/린넨</strong> 및 우산 준비.</li>
                    <li>• <strong>여행 최적기:</strong> 10월 ~ 12월, 3월 ~ 4월</li>
                  </ul>
                </div>

                {/* 중부 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">중부 (다낭/호이안/후에)</h4>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">건기/우기 명확</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li>• <strong>2월 ~ 8월 (건기):</strong> 26°C~35°C로 맑고 해양 스포츠에 최적. <strong>선글라스, 자외선 차단제, 수영복</strong> 필수.</li>
                    <li>• <strong>9월 ~ 1월 (우기):</strong> 스콜성 비나 태풍 가능성 있음. <strong>얇은 외투와 가벼운 우비</strong> 지참 추천.</li>
                    <li>• <strong>여행 최적기:</strong> 2월 ~ 6월 (화창하고 바다 파도 잔잔)</li>
                  </ul>
                </div>

                {/* 남부 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">남부 (호치민/나트랑/푸꾸옥)</h4>
                    <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">연중 여름 (열대)</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li>• <strong>11월 ~ 4월 (건기):</strong> 27°C~33°C로 쾌적하고 맑음. <strong>휴양지 룩, 샌들, 모자</strong> 추천.</li>
                    <li>• <strong>5월 ~ 10월 (우기):</strong> 하루 1~2회 짧은 스콜이 내리며 금방 갬.</li>
                    <li>• <strong>달랏 특이사항:</strong> 해발 1,500m 고원으로 연중 18~24°C '영원한 봄의 도시' (가벼운 자켓 필요).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 환율 & 계산기 */}
          {activeTab === 'exchange' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                  <span>실시간 베트남 동(VND) 환율 및 화폐 계산법</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  베트남 동(VND)은 단위가 커서 헷갈리기 쉽습니다. 손쉬운 꿀팁과 실시간 계산기를 이용해보세요.
                </p>
              </div>

              {/* Quick Formula Card */}
              <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-2xl space-y-4">
                <h4 className="font-extrabold text-base text-amber-300 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  <span>3초 만에 원화(KRW)로 암산하는 공식</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1">
                    <p className="font-bold text-amber-200">1단계: 끝의 0 하나를 뺀다</p>
                    <p className="text-slate-200 text-xs">예: 200,000동 ➔ 20,000</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs space-y-1">
                    <p className="font-bold text-amber-200">2단계: 2로 나눈다 (절반)</p>
                    <p className="text-slate-200 text-xs">예: 20,000 ÷ 2 = <strong>약 10,000원!</strong></p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  * 100,000 VND (10만동) ≒ 약 5,400원 ~ 5,500원 수준입니다.
                </p>
              </div>

              {/* Interactive Calculator */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm">실시간 원화 ➔ 베트남 동(VND) 간편 계산기</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">원화 (KRW)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={calcKRW}
                        onChange={(e) => setCalcKRW(Number(e.target.value))}
                        step="10000"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">원</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">환산 베트남 동 (VND)</label>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-sm font-black text-emerald-800 flex items-center justify-between">
                      <span>{formatVND(calculateVNDFromKRW(calcKRW, rates))}</span>
                      <span className="text-xs font-bold text-emerald-600">동 (VND)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[10000, 50000, 100000, 300000, 500000, 1000000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setCalcKRW(amt)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      {amt.toLocaleString()}원
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency Tips */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1.5">
                <p className="font-extrabold flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>환전 꿀팁 & 화폐 주의사항:</span>
                </p>
                <p>1. <strong>100달러 신권(구김/낙서 없는 것)</strong>을 준비하여 현지 금은방(하노이 항박거리, 다낭 한시장 금은방)이나 환전소에서 환전하는 것이 가장 환율이 좋습니다.</p>
                <p>2. 베트남 지폐는 폴리머(플라스틱) 재질로, <strong>2만동과 50만동, 1만동과 10만동의 색상이 비슷</strong>하므로 계산 시 0의 개수를 꼭 확인하세요!</p>
                <p>3. 트래블로그, 트래블월렛 카드로 VP Bank, TP Bank 등 수수료 무료 ATM에서 출금하는 것도 매우 편리합니다.</p>
              </div>
            </div>
          )}

          {/* TAB 4: 비자 & 입국 */}
          {activeTab === 'visa' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-sky-600" />
                  <span>베트남 무비자 입국 규정 & 출입국 심사 안내</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  대한민국 여권 소지자는 관광 목적으로 45일간 무비자 체류가 가능합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>입국 시 필수 준비사항</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-2.5">
                    <li className="flex gap-2">
                      <span className="font-bold text-emerald-700">1. 여권:</span>
                      <span>입국일 기준 <strong>유효기간이 최소 6개월 이상</strong> 남아있어야 하며 훼손(낙서, 찢김)이 없어야 합니다.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-emerald-700">2. 리턴 항공권:</span>
                      <span>베트남에서 45일 이내 출국하는 <strong>왕복 e-티켓(또는 제3국행 티켓)</strong> 필수 (입국 심사 시 요구될 수 있음).</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-emerald-700">3. 입국신고서 폐지:</span>
                      <span>현재 베트남 입국 시 종이 입국신고서 작성은 폐지되어 여권만 제시하면 됩니다.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>45일 초과 체류 & 전자비자 (E-Visa)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    45일 이상 체류하거나 90일 복수 입국이 필요한 경우 베트남 출입국 포털에서 <strong>E-Visa(전자비자)</strong>를 사전 신청해야 합니다.
                  </p>
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-[11px] text-amber-900 space-y-1">
                    <p>• <strong>푸꾸옥 특례:</strong> 푸꾸옥 직항으로 입국하여 섬 내에서만 체류할 경우 최대 30일 무비자가 별도 적용됩니다.</p>
                    <p>• <strong>재입국 규정 완화:</strong> 기존 30일 이내 재입국 비자 제한이 폐지되어 출국 후 바로 재입국해도 45일 무비자가 적용됩니다.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 맛집 & 음식 가이드 */}
          {activeTab === 'food' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-rose-500" />
                  <span>베트남 대표 미식 10선 & 고수 빼기 꿀팁</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  향긋한 육수와 신선한 허브가 어우러진 베트남 현지 미식을 제대로 즐겨보세요.
                </p>
              </div>

              {/* 고수 빼기 카드 */}
              <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-rose-900 text-sm flex items-center gap-2">
                    🌿 고수(향채)를 못 드신다면 보여주세요!
                  </h4>
                  <p className="text-rose-800 text-xs mt-1">
                    식당에서 아래 문구를 캡처해 보여주시면 고수를 빼고 조리해 드립니다.
                  </p>
                </div>
                <div className="bg-white px-5 py-3 rounded-xl border border-rose-300 text-center shrink-0 shadow-xs">
                  <span className="block text-base font-black text-rose-600">"Không cho rau mùi"</span>
                  <span className="block text-[11px] text-slate-500 font-medium">컴 쪼 라우 무이 (고수 넣지 마세요)</span>
                </div>
              </div>

              {/* 음식 10선 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: '포 (Phở)', desc: '진한 소고기(보) 또는 닭고기(가) 육수의 베트남 전통 쌀국수', tag: '국민 메뉴' },
                  { name: '분짜 (Bún Chả)', desc: '숯불에 구운 돼지고기와 완자를 새콤달콤한 느억맘 소스에 찍어먹는 면요리', tag: '하노이 명물' },
                  { name: '반미 (Bánh Mì)', desc: '바삭한 쌀바게트 속에 고기, 파테, 채소를 듬뿍 넣은 샌드위치', tag: '간식/조식' },
                  { name: '반쎄오 (Bánh Xèo)', desc: '쌀가루 반죽에 새우, 돼지고기, 숙주를 넣어 바삭하게 부친 베트남식 크레페', tag: '다낭/남부' },
                  { name: '분보후에 (Bún Bò Huế)', desc: '칼칼하고 얼큰한 국물에 두툼한 면발이 일품인 후에식 매운 소고기 쌀국수', tag: '얼큰한국물' },
                  { name: '에그커피 (Cà Phê Trứng)', desc: '달걀 노른자와 연유를 크림처럼 휘핑해 올린 하노이 명물 달콤한 커피', tag: '이색 디저트' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.name}</h4>
                      <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: 여행 알짜팁 & 비상연락처 */}
          {activeTab === 'tips' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                  <span>실전 여행 꿀팁 & 비상 연락망</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  그랩(Grab) 차량 호출, 유심/eSIM, 팁 문화 및 현지 비상 상황 대처법입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 교통 & 통신 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>그랩(Grab) & 데이터 유심</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li>• <strong>그랩(Grab) 앱 필수:</strong> 한국에서 미리 앱을 다운로드하고 신용카드를 등록해가면 바가지요금 없이 안전하게 차량/배달 이용 가능합니다.</li>
                    <li>• <strong>유심/eSIM:</strong> Viettel(비엣텔) 또는 Vinaphone(비나폰)이 베트남 전역에서 가장 빠르고 산악지역(사파/하장)에서도 잘 터집니다.</li>
                    <li>• <strong>전압:</strong> 220V, 50Hz로 한국 플러그(2구)를 별도 어댑터 없이 그대로 꽂아 사용 가능합니다.</li>
                  </ul>
                </div>

                {/* 팁 문화 & 식수 */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>팁 문화 & 식수 주의</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li>• <strong>마사지 팁:</strong> 60분 5만동(약 2,500원), 90분~120분 10만동(약 5,000원) 선이 적당합니다 (팁 포함 여부 영수증 확인).</li>
                    <li>• <strong>호텔 벨보이/객실 매너팁:</strong> 2만~5만동 또는 1~2달러.</li>
                    <li>• <strong>식수:</strong> 수돗물은 석회질이 포함되어 마실 수 없으므로 반드시 <strong>편의점에서 생수(Aquafina, Dasani)</strong>를 사서 음용하세요.</li>
                  </ul>
                </div>

                {/* 주베트남 대한민국 대사관 및 긴급 연락처 */}
                <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl space-y-4">
                  <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>긴급 상황 비상 연락망</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white/10 p-3.5 rounded-xl">
                      <p className="font-bold text-slate-200">주베트남 대한민국 대사관 (하노이)</p>
                      <p className="text-amber-300 font-bold mt-1">+84-24-3831-5111</p>
                      <p className="text-[11px] text-slate-400">사건사고 긴급: +84-90-402-6126</p>
                    </div>
                    <div className="bg-white/10 p-3.5 rounded-xl">
                      <p className="font-bold text-slate-200">주일총영사관 (다낭)</p>
                      <p className="text-amber-300 font-bold mt-1">+84-23-6356-6101</p>
                      <p className="text-[11px] text-slate-400">사건사고 긴급: +84-90-114-9990</p>
                    </div>
                    <div className="bg-white/10 p-3.5 rounded-xl">
                      <p className="font-bold text-slate-200">총영사관 (호치민)</p>
                      <p className="text-amber-300 font-bold mt-1">+84-28-3822-5757</p>
                      <p className="text-[11px] text-slate-400">사건사고 긴급: +84-90-894-8138</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black">더 궁금한 점이 있으신가요?</h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              베트남 현지 전문 플래너가 항공, 풀빌라, 골프, 자유여행 일정을 1:1로 맞춤 설계해드립니다.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={(e) => handleOpenKakaoTalkDirect(e)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md"
            >
              카카오톡 실시간 상담
            </button>
            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="bg-white hover:bg-slate-100 text-emerald-800 font-black px-4 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-md"
              >
                1:1 맞춤 견적 신청
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
