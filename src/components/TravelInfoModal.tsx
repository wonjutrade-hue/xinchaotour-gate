import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Sun, 
  CloudRain, 
  DollarSign, 
  FileText, 
  Utensils, 
  Lightbulb, 
  ChevronRight, 
  Phone, 
  Smartphone, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  ExternalLink,
  Calculator,
  Compass,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  MessageCircle
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

interface TravelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: TravelInfoTab;
  rates: ExchangeRates;
  onOpenConsultation?: () => void;
}

export const TravelInfoModal: React.FC<TravelInfoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'course',
  rates,
  onOpenConsultation,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<TravelInfoTab>(initialTab);
  const [calcKRW, setCalcKRW] = useState<number>(100000);

  const tabs: { id: TravelInfoTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'course', label: '여행정보 코스/안내', icon: <Compass className="w-4 h-4" />, desc: '지역별 대표 코스 & 이동 동선' },
    { id: 'weather', label: '베트남 날씨', icon: <Sun className="w-4 h-4" />, desc: '도시별 날씨 & 건/우기 옷차림' },
    { id: 'exchange', label: '베트남 환율', icon: <DollarSign className="w-4 h-4" />, desc: '실시간 환율 & 화폐 계산법' },
    { id: 'visa', label: '비자 가이드', icon: <FileText className="w-4 h-4" />, desc: '45일 무비자 & 여권 유효기간' },
    { id: 'food', label: '맛집 가이드', icon: <Utensils className="w-4 h-4" />, desc: '현지 대표 미식 & 고수빼기 팁' },
    { id: 'tips', label: '여행 알짜팁', icon: <Lightbulb className="w-4 h-4" />, desc: '그랩/유심/팁문화/비상연락처' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-100">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  신차오투어 베트남 여행백과
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black mt-0.5 text-white">
                베트남 현지 실전 여행정보 가이드
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Menu (Horizontal scrollable on mobile) */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-6 py-2.5 overflow-x-auto flex items-center gap-2 shrink-0 no-scrollbar">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: 여행정보 코스/안내 */}
          {activeTab === 'course' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl flex items-start gap-3">
                <Compass className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    베트남 지역별 맞춤 추천 코스 & 동선 가이드
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    신차오투어가 베트남 현지 경험을 토대로 검증한 가장 효율적이고 여유로운 대표 추천 코스입니다.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Da Nang Course */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-teal-400 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                      다낭 & 호이안 3박 5일
                    </span>
                    <span className="text-xs font-bold text-slate-500">인기 1위</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">골든브릿지 & 미케비치 힐링 코스</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">1일차:</span>
                      <span>공항 가이드 미팅 ➔ 호텔 체크인 ➔ 미케비치 산책 및 해산물 다이닝</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">2일차:</span>
                      <span>바나힐 국립공원 (세계 최장 케이블카 & 골든브릿지) ➔ 핑크성당 ➔ 한시장</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">3일차:</span>
                      <span>호이안 에코 투어 (바구니배 체험) ➔ 올드타운 유등 띄우기 & 야시장</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">4~5일차:</span>
                      <span>영흥사 해수관음상 ➔ 프리미엄 마사지 스파 ➔ 공항 출국</span>
                    </li>
                  </ul>
                </div>

                {/* Hanoi Course */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-teal-400 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                      하노이 & 하롱베이 3박 5일
                    </span>
                    <span className="text-xs font-bold text-slate-500">자연유산</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">5성급 럭셔리 크루즈 오션뷰 코스</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">1일차:</span>
                      <span>하노이 노이바이 공항 도착 ➔ 시티 스트릿푸드 및 호안끼엠 야경</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">2일차:</span>
                      <span>하롱베이 이동 ➔ 5성급 럭셔리 크루즈 승선 ➔ 승솟 동굴 탐험 & 카약</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">3일차:</span>
                      <span>크루즈 일출 태극권 ➔ 티톱섬 전망대 ➔ 하노이 복귀 & 서호 석양</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">4~5일차:</span>
                      <span>바딘광장 & 호치민 생가 ➔ 36거리 쇼핑 ➔ 공항 센딩</span>
                    </li>
                  </ul>
                </div>

                {/* Nha Trang & Dalat Course */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-teal-400 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                      나트랑 & 달랏 4박 5일
                    </span>
                    <span className="text-xs font-bold text-slate-500">휴양 & 감성</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">호핑투어 & 고원 휴양지 컬래버 코스</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">1~2일차:</span>
                      <span>나트랑 에메랄드 해변 스노클링 호핑투어 & 포나갈 자압탑</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">3~4일차:</span>
                      <span>‘꽃의 도시’ 달랏 이동 ➔ 루지 체험, 크레이지하우스, 야시장 낭만 투어</span>
                    </li>
                  </ul>
                </div>

                {/* Phu Quoc Course */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-teal-400 transition-all">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      푸꾸옥 3박 5일
                    </span>
                    <span className="text-xs font-bold text-slate-500">독채 풀빌라</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">빈원더스 & 사파리 힐링 코스</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">1~2일차:</span>
                      <span>세계 최대 규모 빈펄 사파리 & 빈원더스 테마파크 워터파크</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-700 shrink-0">3~4일차:</span>
                      <span>혼똔섬 케이블카 & 선셋타운 분수쇼 ➔ 풀빌라 휴식 및 공항 이동</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 베트남 날씨 */}
          {activeTab === 'weather' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <Sun className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    베트남 주요 도시별 월별 날씨 & 옷차림 가이드
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    베트남은 남북으로 긴 지형 특성상 지역별 기후 차이가 큽니다. 여행하시는 지역의 건기/우기를 확인하세요.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Da Nang */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">중부 (다낭/호이안/나트랑)</h4>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      건기: 2월~8월
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>추천 옷차림:</strong> 얇은 반팔, 린넨 의상, 수영복, 선글라스, 모자.<br />
                    <strong>우기 (9월~1월):</strong> 갑작스러운 스콜성 소나기가 올 수 있어 얇은 우비나 접이식 우산 필수.
                  </p>
                </div>

                {/* Hanoi */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">북부 (하노이/사파/하롱베이)</h4>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      건기: 10월~4월
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>추천 옷차림:</strong> 11월~2월은 서늘한 가을/겨울 날씨(12~20℃)로 바람막이, 겉옷 패딩 필요.<br />
                    <strong>우기 (5월~9월):</strong> 무덥고 습함.
                  </p>
                </div>

                {/* Phu Quoc / Ho Chi Minh */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">남부 (푸꾸옥/호치민)</h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      건기: 11월~4월
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>추천 옷차림:</strong> 연중 따뜻한 열대 기후(26~33℃). 화려한 휴양지 룩과 샌들, 자외선 차단제 필수.<br />
                    <strong>우기 (5월~10월):</strong> 짧은 강수.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 베트남 환율 */}
          {activeTab === 'exchange' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    <h3 className="font-black text-base">실시간 베트남 동(VND) 환율 계산기</h3>
                  </div>
                  <span className="text-xs text-slate-400">
                    실시간 기준 ($1 = {Math.round(rates.KRW).toLocaleString()}원)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      한국 원화 (KRW)
                    </label>
                    <input
                      type="number"
                      step="10000"
                      value={calcKRW}
                      onChange={(e) => setCalcKRW(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      환산 베트남 동 (VND)
                    </span>
                    <p className="text-xl font-black text-amber-400 mt-1">
                      약 {formatVND(calculateVNDFromKRW(calcKRW, rates))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips for dong */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2 text-xs text-amber-950">
                <h4 className="font-extrabold text-amber-950 flex items-start gap-1.5 text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  초간단 베트남 '동(VND)' 원화 암산 법칙
                </h4>
                <p className="leading-relaxed">
                  베트남 지폐는 단위가 큽니다. 한국 돈으로 쉽게 계산하는 꿀팁:<br />
                  <span className="font-bold underline text-amber-900">
                    "지폐 금액에서 뒤의 0(공)을 하나 빼고 2로 나누면 약 한국 원화 가격!"
                  </span>
                </p>
                <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200 mt-2 space-y-1 text-slate-800 font-medium">
                  <p>• 100,000 ₫ (10만동) ➔ 10,000 ÷ 2 ≒ <strong>약 5,000원</strong></p>
                  <p>• 500,000 ₫ (50만동) ➔ 50,000 ÷ 2 ≒ <strong>약 25,000원</strong></p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 비자 가이드 */}
          {activeTab === 'visa' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="w-5 h-5 text-teal-700" />
                  <h3 className="font-black text-base text-slate-900">
                    대한민국 국적자 베트남 입국 비자 규정
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-black text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      45일 무비자 (No Visa)
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">45일 이하 관광 입국</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      별도의 비자 신청 없이 **여권(유효기간 6개월 이상 남음)**과 **왕복 항공권**만 있으면 최대 45일까지 무비자로 입국이 가능합니다.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      전자비자 (e-Visa)
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">45일 초과 체류 시</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      45일을 초과하여 장기 체류하거나 복수 입국이 필요한 경우, 베트남 이민국 공식 웹사이트에서 90일 e-Visa를 미리 신청해야 합니다.
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs text-red-950 font-medium flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>필수 체크:</strong> 여권 만료일이 출국일 기준 최소 6개월 이상 남아있는지 꼭 확인하세요! 여권 훼손(서명란 오염, 찢어짐 등) 시 출국이 거부될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 맛집 가이드 */}
          {activeTab === 'food' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Utensils className="w-5 h-5 text-amber-600" />
                  <h3 className="font-black text-base text-slate-900">
                    베트남 여행 필수 먹거리 TOP 6 & 고수 빼기 팁
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs">1. 쌀국수 (Pho)</h4>
                    <p className="text-[11px] text-slate-600 mt-1">소고기(Pho Bo), 닭고기(Pho Ga) 진한 진국 육수</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs">2. 분짜 (Bun Cha)</h4>
                    <p className="text-[11px] text-slate-600 mt-1">숯불 돼지고기와 쌀면을 새콤달콤 늑맘 소스에 적셔먹는 맛</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs">3. 반미 (Banh Mi)</h4>
                    <p className="text-[11px] text-slate-600 mt-1">바삭한 바게트 속 고기와 야채가 가득한 베트남 샌드위치</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs">4. 반쎄오 (Banh Xeo)</h4>
                    <p className="text-[11px] text-slate-600 mt-1">숙주와 새우가 씹히는 바삭한 베트남식 부침개</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs">5. 모닝글로리 (Rau Muong)</h4>
                    <p className="text-[11px] text-slate-600 mt-1">마늘 향이 일품인 대표 밥반찬 공심채 볶음</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs">6. 코코넛 스무디 커피</h4>
                    <p className="text-[11px] text-slate-600 mt-1">콩카페 대표 메뉴! 달콤 쌉싸름한 코코넛 스무디</p>
                  </div>
                </div>

                {/* Coriander Card */}
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-1.5 text-emerald-950 font-medium">
                  <p className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    "고수 빼주세요" 베트남어 만능 현지 표현
                  </p>
                  <p className="bg-white p-3 rounded-lg border border-emerald-200 font-bold text-sm text-center text-slate-900">
                    "Không cho rau thơm" (콩 조 라우 똠)
                  </p>
                  <p className="text-[11px] text-emerald-800 text-center">
                    (위 문장을 스마트폰 화면으로 식당 직원에게 보여주시면 고수를 넣어주지 않습니다!)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: 여행 알짜팁 */}
          {activeTab === 'tips' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Grab Taxi App */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-slate-900 text-sm">그랩(Grab) 앱 필수 사전등록</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    한국에서 미리 **그랩(Grab) 앱 설치 및 신용카드 등록**을 완료해 두세요. 바가지 요금 없이 출발지-목적지 정찰제로 편리하게 택시를 이용할 수 있습니다.
                  </p>
                </div>

                {/* Tipping Culture */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-slate-900 text-sm">베트남 팁(Tip) 문화 안내</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    일반 식당에서는 팁이 필수가 아니지만, **마사지 스파(60분 기준 50,000~100,000₫ 약 3~$5)**, **전담 가이드/기사 매너팁**은 센스있게 챙겨주시면 매우 만족스러워합니다.
                  </p>
                </div>

                {/* eSIM / SIM */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-teal-600" />
                    <h4 className="font-bold text-slate-900 text-sm">유심(SIM) vs eSIM 선택</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    한국 번호 수신이 필요하다면 **eSIM**이 편리하고, 안정적인 속도를 원하시면 **현지 무제한 데이터 유심**을 추천합니다. 현지 공항 도착 즉시 수령 가능합니다.
                  </p>
                </div>

                {/* Voltage & Adapter */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-slate-700" />
                    <h4 className="font-bold text-slate-900 text-sm">전압 & 콘센트 (220V)</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    베트남은 한국과 동일한 **220V, 50/60Hz**를 사용하므로 별도의 멀티 어댑터 없이 한국 전자제품(충전기, 드라이기)을 그대로 꽂아 쓰실 수 있습니다.
                  </p>
                </div>

              </div>

              {/* Emergency Contacts */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
                <h4 className="font-extrabold text-sm text-amber-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-300" />
                  비상연락처 & 영사관 콜센터
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">외교부 영사콜센터 (24시간)</span>
                    <strong className="text-amber-400 font-mono text-xs">+82-2-3210-0404</strong>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">주다낭 총영사관</span>
                    <strong className="text-amber-400 font-mono text-xs">+84-236-3561-000</strong>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block text-[10px]">주베트남 대사관(하노이)</span>
                    <strong className="text-amber-400 font-mono text-xs">+84-24-3831-5111</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Action Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>신차오투어 현지 직영 가이드 카카오톡 1:1 상담 가능</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="px-3.5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>카카오톡 바로 연결</span>
            </button>

            {onOpenConsultation && (
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
              >
                무료 맞춤 견적 신청
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
            >
              닫기
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
