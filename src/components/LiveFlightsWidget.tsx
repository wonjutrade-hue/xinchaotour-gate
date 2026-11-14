import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plane, 
  PlaneLanding, 
  PlaneTakeoff, 
  Search, 
  RotateCw, 
  ExternalLink, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Car, 
  MessageCircle,
  MapPin,
  Calendar,
  Building,
  Radio,
  Filter
} from 'lucide-react';
import { flightService } from '../services/flightService';
import { FlightInfo, LiveFlightResponse, GroundingSource } from '../types';
import { handleOpenKakaoTalkDirect } from '../constants';

interface LiveFlightsWidgetProps {
  onOpenConsultationWithFlight?: (flight: FlightInfo) => void;
  isCompact?: boolean;
  className?: string;
}

const AIRPORTS = [
  { code: 'DAD', nameKo: '다낭', fullName: '다낭 국제공항', icon: '🏖️', desc: '풀빌라 & 골프 휴양' },
  { code: 'HAN', nameKo: '하노이', fullName: '노이바이 국제공항', icon: '🏛️', desc: '베트남 수도 & 북부' },
  { code: 'SGN', nameKo: '호치민', fullName: '떤선녓 국제공항', icon: '🏙️', desc: '경제 허브 & 남부' },
  { code: 'CXR', nameKo: '나트랑', fullName: '깜라인 국제공항', icon: '🌊', desc: '에메랄드 비치 휴양' },
  { code: 'PQC', nameKo: '푸꾸옥', fullName: '푸꾸옥 국제공항', icon: '🏝️', desc: '진주섬 & 청정 휴양' },
];

export const LiveFlightsWidget: React.FC<LiveFlightsWidgetProps> = ({
  onOpenConsultationWithFlight,
  isCompact = false,
  className = ''
}) => {
  const [selectedAirport, setSelectedAirport] = useState<string>('DAD');
  const [flightType, setFlightType] = useState<'arrival' | 'departure'>('arrival');
  const [koreaOnly, setKoreaOnly] = useState<boolean>(true);
  const [delayedOnly, setDelayedOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [data, setData] = useState<LiveFlightResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadFlights = async (airport: string, type: 'arrival' | 'departure', forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const res = await flightService.getLiveFlights(airport, type, forceRefresh);
      setData(res);
    } catch (err: any) {
      console.error('Failed to load live flight data:', err);
      setError('실시간 운항 정보를 불러오는 중 일시적인 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFlights(selectedAirport, flightType, false);
  }, [selectedAirport, flightType]);

  const handleManualRefresh = () => {
    loadFlights(selectedAirport, flightType, true);
  };

  const filteredFlights = useMemo(() => {
    if (!data || !Array.isArray(data.flights)) return [];
    return data.flights.filter(f => {
      if (koreaOnly && !f.isKoreaRoute) return false;
      if (delayedOnly && f.status !== '지연' && f.status !== '결항') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchFlight = f.flightNumber.toLowerCase().includes(q);
        const matchAirline = f.airline.toLowerCase().includes(q);
        const matchOrigin = f.origin.toLowerCase().includes(q) || f.originCode.toLowerCase().includes(q);
        const matchDest = f.destination.toLowerCase().includes(q) || f.destinationCode.toLowerCase().includes(q);
        if (!matchFlight && !matchAirline && !matchOrigin && !matchDest) return false;
      }
      return true;
    });
  }, [data, koreaOnly, delayedOnly, searchQuery]);

  const getAirlineColor = (airline: string) => {
    if (airline.includes('대한항공')) return 'bg-sky-50 text-sky-700 border-sky-200';
    if (airline.includes('아시아나')) return 'bg-rose-50 text-rose-700 border-rose-200';
    if (airline.includes('베트남항공')) return 'bg-teal-50 text-teal-800 border-teal-200';
    if (airline.includes('비엣젯')) return 'bg-red-50 text-red-700 border-red-200';
    if (airline.includes('제주항공')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (airline.includes('진에어')) return 'bg-lime-50 text-lime-800 border-lime-200';
    if (airline.includes('티웨이')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (airline.includes('에어부산')) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getStatusBadge = (status: string, statusEn: string) => {
    switch (status) {
      case '도착':
      case 'Landed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            착륙완료 ({statusEn})
          </span>
        );
      case '출발':
      case 'Departed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <PlaneTakeoff className="w-3.5 h-3.5 text-indigo-600" />
            출발완료 ({statusEn})
          </span>
        );
      case '탑승중':
      case 'Boarding':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
            <Radio className="w-3.5 h-3.5 text-amber-600" />
            탑승중 ({statusEn})
          </span>
        );
      case '지연':
      case 'Delayed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            지연 ({statusEn})
          </span>
        );
      case '결항':
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">
            결항 ({statusEn})
          </span>
        );
      case '정상':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            정상 운항 ({statusEn || 'On Time'})
          </span>
        );
    }
  };

  const currentAirportObj = AIRPORTS.find(a => a.code === selectedAirport) || AIRPORTS[0];

  return (
    <section className={`bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden ${className}`} id="live-flights">
      {/* Header Bar with Search Grounding Brand */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 border-b border-teal-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                Google Search Grounding 실시간 검색 연동
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
                Live Tracker
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>✈️ 베트남 주요 공항 실시간 운항 정보</span>
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              다낭(DAD) · 하노이(HAN) · 호치민(SGN) 등 대한민국 직항편의 실시간 도착/출발 시간표 및 지연 여부를 확인하세요.
            </p>
          </div>

          {/* Refresh & Last Updated */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            {data?.updatedAt && (
              <div className="text-right hidden sm:block">
                <div className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>실시간 업데이트:</span>
                </div>
                <div className="text-xs font-semibold text-teal-300">{data.updatedAt}</div>
              </div>
            )}
            <button
              onClick={handleManualRefresh}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md transition cursor-pointer disabled:opacity-50 active:scale-95"
              title="최신 항공편 정보 다시 검색"
            >
              <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-300' : ''}`} />
              <span>{refreshing ? '검색 중...' : '실시간 새로고침'}</span>
            </button>
          </div>
        </div>

        {/* Airport Selection Tabs */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4 border-t border-white/10">
          {AIRPORTS.map(airport => {
            const isSelected = selectedAirport === airport.code;
            return (
              <button
                key={airport.code}
                onClick={() => setSelectedAirport(airport.code)}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl transition text-center cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-b from-teal-500/30 to-teal-600/40 border-teal-400 text-white shadow-lg ring-1 ring-teal-400'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base">
                  <span>{airport.icon}</span>
                  <span>{airport.nameKo}</span>
                  <span className={`text-xs px-1.5 py-0.2 rounded font-mono ${isSelected ? 'bg-teal-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300'}`}>
                    {airport.code}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 truncate max-w-full">
                  {airport.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flight Mode Controls & Filter Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Arrival / Departure Toggle */}
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl self-start">
            <button
              onClick={() => setFlightType('arrival')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-black transition cursor-pointer ${
                flightType === 'arrival'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlaneLanding className={`w-4 h-4 ${flightType === 'arrival' ? 'text-teal-600' : ''}`} />
              <span>🛬 도착 (Arrivals)</span>
            </button>
            <button
              onClick={() => setFlightType('departure')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-black transition cursor-pointer ${
                flightType === 'departure'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlaneTakeoff className={`w-4 h-4 ${flightType === 'departure' ? 'text-teal-600' : ''}`} />
              <span>🛫 출발 (Departures)</span>
            </button>
          </div>

          {/* Quick Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setKoreaOnly(!koreaOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                koreaOnly
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>🇰🇷</span>
              <span>한국 직항편만</span>
              {koreaOnly && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setDelayedOnly(!delayedOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                delayedOnly
                  ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>⚠️</span>
              <span>지연/결항편만</span>
              {delayedOnly && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-64 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="편명(KE463), 도시(인천), 항공사 검색"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI Advisory Callout */}
        {data?.advisory && (
          <div className="mt-4 p-3.5 rounded-xl bg-teal-50/80 border border-teal-200/80 flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs sm:text-sm text-teal-950">
              <strong className="font-extrabold text-teal-900">현지 공항 브리핑: </strong>
              <span>{data.advisory}</span>
            </div>
          </div>
        )}

        {/* Search Grounding Sources Links */}
        {data?.groundingSources && data.groundingSources.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-600">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Search className="w-3 h-3 text-teal-600" />
              검색 근거 출처:
            </span>
            {data.groundingSources.map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-teal-700 hover:text-teal-900 border border-slate-200 transition text-[11px] font-medium"
              >
                <span>{source.title}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Main Flights Board Table / Cards */}
      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 mx-auto rounded-full border-4 border-teal-500 border-t-transparent animate-spin mb-4" />
            <p className="font-bold text-slate-800 text-base">
              Google Search Grounding을 통해 {currentAirportObj.fullName} 운항 정보를 실시간 검색 중입니다...
            </p>
            <p className="text-slate-500 text-xs mt-1">
              항공편 상태, 터미널 정보, 예정 및 변경 시간을 동기화하고 있습니다.
            </p>
          </div>
        ) : error ? (
          <div className="py-12 text-center p-6 bg-rose-50 rounded-xl border border-rose-200">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="font-bold text-rose-900">{error}</p>
            <button
              onClick={() => loadFlights(selectedAirport, flightType, true)}
              className="mt-3 px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition"
            >
              다시 시도하기
            </button>
          </div>
        ) : filteredFlights.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Plane className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700 text-base">해당 조건에 일치하는 항공편이 없습니다.</p>
            <p className="text-xs mt-1">검색어를 지우거나 &apos;한국 직항편만&apos; 필터를 해제해 보세요.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setKoreaOnly(false);
                setDelayedOnly(false);
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-3 px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
              <div className="col-span-2">항공편 / 항공사</div>
              <div className="col-span-3">노선 (출발 ➔ 도착)</div>
              <div className="col-span-2">예정 / 실시간 시간</div>
              <div className="col-span-2">터미널 / 게이트</div>
              <div className="col-span-1 text-center">운항 현황</div>
              <div className="col-span-2 text-right">공항 픽업/예약</div>
            </div>

            {/* Flight Items List */}
            {filteredFlights.map(flight => {
              const isArrival = flight.type === 'arrival';
              return (
                <div
                  key={flight.id}
                  className="bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200/90 p-4 transition shadow-xs hover:shadow-md"
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-3 items-center">
                    {/* Airline & Flight Number */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-extrabold border ${getAirlineColor(flight.airline)}`}>
                          {flight.airline}
                        </span>
                        <span className="font-mono font-black text-slate-900 text-base">
                          {flight.flightNumber}
                        </span>
                      </div>
                      {flight.aircraft && (
                        <div className="text-[11px] text-slate-400 mt-0.5">기종: {flight.aircraft}</div>
                      )}
                    </div>

                    {/* Route */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <span className="text-sm font-extrabold">{flight.origin}</span>
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1 rounded">({flight.originCode})</span>
                        <span className="text-teal-600">➔</span>
                        <span className="text-sm font-extrabold">{flight.destination}</span>
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1 rounded">({flight.destinationCode})</span>
                      </div>
                      {flight.isKoreaRoute && (
                        <div className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                          <span>🇰🇷 한국 직항 정기편</span>
                        </div>
                      )}
                    </div>

                    {/* Times */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-black text-slate-900">
                          {flight.estimatedTime || flight.scheduledTime}
                        </span>
                        {flight.estimatedTime && flight.estimatedTime !== flight.scheduledTime && (
                          <span className="text-xs text-rose-500 line-through">
                            {flight.scheduledTime}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {isArrival ? '도착 예정' : '출발 예정'}
                      </div>
                    </div>

                    {/* Terminal / Gate */}
                    <div className="col-span-2 text-xs text-slate-700">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{flight.terminal || '국제선'}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-2">
                        {flight.gate && <span>게이트: <strong className="text-slate-800">{flight.gate}</strong></span>}
                        {flight.carousel && <span>수하물: <strong className="text-slate-800">{flight.carousel}</strong></span>}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="col-span-1 text-center">
                      {getStatusBadge(flight.status, flight.statusEn)}
                    </div>

                    {/* Action Button */}
                    <div className="col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          if (onOpenConsultationWithFlight) {
                            onOpenConsultationWithFlight(flight);
                          } else {
                            handleOpenKakaoTalkDirect();
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition cursor-pointer active:scale-95 whitespace-nowrap"
                        title="이 항공편에 맞춘 단독 VIP 리무진 공항 픽업/샌딩 예약 문의"
                      >
                        <Car className="w-3.5 h-3.5" />
                        <span>VIP 픽업 예약</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Card Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-xs font-extrabold border ${getAirlineColor(flight.airline)}`}>
                          {flight.airline}
                        </span>
                        <span className="font-mono font-black text-slate-900 text-base">
                          {flight.flightNumber}
                        </span>
                        {flight.isKoreaRoute && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                            🇰🇷 직항
                          </span>
                        )}
                      </div>
                      <div>
                        {getStatusBadge(flight.status, flight.statusEn)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-y border-slate-100">
                      <div>
                        <div className="text-xs text-slate-400">출발</div>
                        <div className="font-black text-slate-900 text-sm">{flight.origin}</div>
                        <div className="text-[11px] font-mono text-slate-500">({flight.originCode})</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-teal-600 text-xs font-bold">➔</span>
                        <div className="text-base font-black text-slate-900 font-mono">
                          {flight.estimatedTime || flight.scheduledTime}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {isArrival ? '도착' : '출발'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">도착</div>
                        <div className="font-black text-slate-900 text-sm">{flight.destination}</div>
                        <div className="text-[11px] font-mono text-slate-500">({flight.destinationCode})</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <span>{flight.terminal || '국제선'}</span>
                        {flight.gate && <span>· {flight.gate}</span>}
                        {flight.carousel && <span>· 수하물 {flight.carousel}</span>}
                      </div>

                      <button
                        onClick={() => {
                          if (onOpenConsultationWithFlight) {
                            onOpenConsultationWithFlight(flight);
                          } else {
                            handleOpenKakaoTalkDirect();
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-extrabold bg-teal-700 text-white"
                      >
                        <Car className="w-3 h-3" />
                        <span>VIP 픽업 예약</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Airport VIP Transfer Banner */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-emerald-500/10 border border-teal-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-700 to-emerald-800 text-white flex items-center justify-center shrink-0 shadow-md">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <span>{currentAirportObj.fullName} 단독 VIP 리무진 픽업 & 샌딩 서비스</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold">
                  VITRACO 직영 배차
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                항공편 지연 시에도 항공편명을 실시간 추적하여 입국 게이트에서 네임피켓으로 대기 및 풀빌라·호텔까지 편안하게 모십니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                if (onOpenConsultationWithFlight && filteredFlights.length > 0) {
                  onOpenConsultationWithFlight(filteredFlights[0]);
                } else {
                  handleOpenKakaoTalkDirect();
                }
              }}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-teal-700 hover:bg-teal-800 text-white shadow-md transition cursor-pointer active:scale-95"
            >
              <Car className="w-4 h-4" />
              <span>공항 픽업 견적 문의</span>
            </button>
            <button
              onClick={() => handleOpenKakaoTalkDirect()}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E] shadow-md transition cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>카카오톡 1:1 상담</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
