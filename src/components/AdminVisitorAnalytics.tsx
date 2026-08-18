import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Eye, TrendingUp, Smartphone, Monitor, Tablet, 
  MessageCircle, Phone, Calendar, Clock, RefreshCw, ArrowUpRight, 
  ArrowDownRight, Compass, ShieldAlert, Download, Trash2, Filter,
  CheckCircle2, Flame, MapPin, ChevronRight, FileSpreadsheet
} from 'lucide-react';
import { AnalyticsSummary, VisitorLog, DailyVisitorStat } from '../types';
import { fetchAnalyticsSummary, resetAnalyticsStats } from '../lib/analytics';

interface AdminVisitorAnalyticsProps {
  onNotify?: (msg: string) => void;
}

export const AdminVisitorAnalytics: React.FC<AdminVisitorAnalyticsProps> = ({ onNotify }) => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trendDays, setTrendDays] = useState<7 | 14 | 30>(14);
  const [logFilterAction, setLogFilterAction] = useState<string>('전체');
  const [logSearch, setLogSearch] = useState('');

  const loadData = async (showToast = false) => {
    setIsRefreshing(true);
    try {
      const data = await fetchAnalyticsSummary();
      if (data) {
        setSummary(data);
        if (showToast && onNotify) {
          onNotify('📊 최신 방문자 통계 데이터가 갱신되었습니다.');
        }
      }
    } catch (e) {
      console.warn('Failed to load analytics', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    // Auto refresh every 45 seconds while admin viewing
    const interval = setInterval(() => {
      loadData(false);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = async () => {
    if (window.confirm('정말로 방문자 통계 기록을 초기화하시겠습니까?\n이 작업은 취소할 수 없습니다.')) {
      const ok = await resetAnalyticsStats();
      if (ok) {
        if (onNotify) onNotify('🧹 통계 데이터가 초기화되었습니다.');
        loadData();
      }
    }
  };

  // Export CSV of logs and daily stats
  const handleExportCSV = () => {
    if (!summary) return;
    const lines = [
      'sep=,',
      '=== 신짜오투어 방문자 일별 통계 ===',
      '날짜,방문자수(UV),페이지뷰(PV),카톡상담클릭,전화문의클릭,견적신청건수',
      ...summary.dailyStats.map(d => `${d.date},${d.uv},${d.pv},${d.kakaoClicks},${d.phoneClicks},${d.inquiries}`),
      '',
      '=== 최근 방문자 상세 로그 ===',
      '일시,기기,OS,브라우저,유입경로,열람페이지,액션,IP',
      ...summary.recentLogs.map(l => 
        `"${new Date(l.timestamp).toLocaleString('ko-KR')}","${l.device}","${l.os}","${l.browser}","${l.referrer}","${l.page}","${l.action}","${l.ip || ''}"`
      )
    ];

    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `신짜오투어_방문통계_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    if (onNotify) onNotify('📥 방문 통계 엑셀 CSV 파일이 다운로드되었습니다.');
  };

  if (isLoading && !summary) {
    return (
      <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
        <span className="text-sm font-bold text-slate-300">방문자 통계 데이터를 집계하는 중입니다...</span>
      </div>
    );
  }

  const s = summary || {
    todayUV: 0,
    todayPV: 0,
    yesterdayUV: 0,
    yesterdayPV: 0,
    thisMonthUV: 0,
    totalUV: 0,
    totalPV: 0,
    totalKakaoClicks: 0,
    totalPhoneClicks: 0,
    totalInquiries: 0,
    dailyStats: [],
    hourlyDistribution: new Array(24).fill(0),
    deviceBreakdown: { mobile: 0, desktop: 0, tablet: 0 },
    referrerBreakdown: {},
    popularPages: [],
    popularProducts: [],
    recentLogs: []
  };

  // Calculations
  const uvDiff = s.todayUV - s.yesterdayUV;
  const uvGrowth = s.yesterdayUV > 0 ? ((uvDiff / s.yesterdayUV) * 100).toFixed(1) : '+100';
  const totalDevices = (s.deviceBreakdown.mobile || 0) + (s.deviceBreakdown.desktop || 0) + (s.deviceBreakdown.tablet || 0) || 1;
  const mobilePct = Math.round(((s.deviceBreakdown.mobile || 0) / totalDevices) * 100);
  const desktopPct = Math.round(((s.deviceBreakdown.desktop || 0) / totalDevices) * 100);
  const tabletPct = Math.max(0, 100 - mobilePct - desktopPct);

  // Conversion rate (Kakao + Phone + Inquiry / UV)
  const totalConversions = s.totalKakaoClicks + s.totalPhoneClicks + s.totalInquiries;
  const conversionRate = s.totalUV > 0 ? ((totalConversions / s.totalUV) * 100).toFixed(1) : '0.0';

  // Filtered daily stats for trend chart
  const displayedDaily = s.dailyStats.slice(-trendDays);
  const maxUVInDaily = Math.max(...displayedDaily.map(d => d.uv), 10);
  const maxPVInDaily = Math.max(...displayedDaily.map(d => d.pv), 20);

  // Max in hourly
  const maxHourly = Math.max(...s.hourlyDistribution, 5);

  // Filtered Logs
  const filteredLogs = s.recentLogs.filter(log => {
    const matchAction = logFilterAction === '전체' || log.action === logFilterAction;
    const matchSearch = !logSearch || 
      log.page.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.referrer.toLowerCase().includes(logSearch.toLowerCase()) ||
      (log.productTitle && log.productTitle.toLowerCase().includes(logSearch.toLowerCase())) ||
      log.browser.toLowerCase().includes(logSearch.toLowerCase());
    return matchAction && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Title & Toolbar */}
      <div className="bg-slate-800/90 border border-slate-700 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              실시간 방문자 트래픽 & 고객 행동 통계
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 animate-pulse">
              LIVE 자동 집계
            </span>
          </div>
          <p className="text-xs text-slate-400">
            신짜오투어 홈페이지 방문자수(UV), 페이지 조회수(PV), 유입 경로, 기기 비율 및 카톡/전화 상담 전환율
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-750 text-amber-300 font-bold text-xs border border-amber-400/30 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            title="통계 새로고침"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? '새로고침 중...' : '새로고침'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            title="통계 내역 엑셀 CSV 파일 다운로드"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
            <span>엑셀(CSV) 다운로드</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold text-xs border border-rose-800/40 flex items-center gap-1.5 transition-all cursor-pointer"
            title="통계 초기화"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">초기화</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Card 1: Today UV */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-400/40 p-4 sm:p-5 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-400/20 transition-colors" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>오늘 순 방문자 (UV)</span>
            </span>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-md font-bold">
              오늘
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {s.todayUV.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">명</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] border-t border-slate-700/60 pt-2 text-slate-400">
            <span>어제: <strong className="text-slate-200">{s.yesterdayUV}명</strong></span>
            <span className={`font-bold flex items-center ${uvDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {uvDiff >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {uvDiff >= 0 ? `+${uvDiff}` : `${uvDiff}`} ({uvGrowth}%)
            </span>
          </div>
        </div>

        {/* Card 2: Today PV */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-teal-400/40 p-4 sm:p-5 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-teal-400/20 transition-colors" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>오늘 페이지뷰 (PV)</span>
            </span>
            <span className="text-[10px] bg-teal-400/20 text-teal-300 px-1.5 py-0.5 rounded-md font-bold">
              조회수
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {s.todayPV.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">회</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] border-t border-slate-700/60 pt-2 text-slate-400">
            <span>어제: <strong className="text-slate-200">{s.yesterdayPV}회</strong></span>
            <span className="text-teal-300 font-bold">
              인당 {s.todayUV > 0 ? (s.todayPV / s.todayUV).toFixed(1) : '0'}페이지 열람
            </span>
          </div>
        </div>

        {/* Card 3: Monthly & Total */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-sky-400/40 p-4 sm:p-5 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-sky-400/20 transition-colors" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>이번 달 누적 방문자</span>
            </span>
            <span className="text-[10px] bg-sky-400/20 text-sky-300 px-1.5 py-0.5 rounded-md font-bold">
              MONTH
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {s.thisMonthUV.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">명</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] border-t border-slate-700/60 pt-2 text-slate-400">
            <span>전체 누적: <strong className="text-sky-300 font-black">{s.totalUV.toLocaleString()}명</strong></span>
            <span className="text-slate-400">총 PV: {s.totalPV.toLocaleString()}</span>
          </div>
        </div>

        {/* Card 4: Total Conversions */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-400/40 p-4 sm:p-5 rounded-3xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-400/20 transition-colors" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>고객 상담 전환 건수</span>
            </span>
            <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded-md font-bold">
              전환율 {conversionRate}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {totalConversions.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">건</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] border-t border-slate-700/60 pt-2 text-slate-300">
            <span className="flex items-center gap-1">💬 카톡 <strong className="text-amber-400">{s.totalKakaoClicks}</strong></span>
            <span className="flex items-center gap-1">📞 전화 <strong className="text-teal-400">{s.totalPhoneClicks}</strong></span>
            <span className="flex items-center gap-1">📝 신청 <strong className="text-emerald-400">{s.totalInquiries}</strong></span>
          </div>
        </div>

      </div>

      {/* Row 2: Charts & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Chart 1: Daily Trend (2 cols wide on LG) */}
        <div className="lg:col-span-2 bg-slate-800/90 border border-slate-700 p-5 rounded-3xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>일별 방문자(UV) & 페이지뷰(PV) 추이</span>
              </h3>
              <p className="text-[11px] text-slate-400">최근 날짜별 순 방문자수 및 페이지 열람 추세</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
              {([7, 14, 30] as const).map(days => (
                <button
                  key={days}
                  onClick={() => setTrendDays(days)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    trendDays === days ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {days}일
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          {displayedDaily.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-500 text-xs font-bold">
              아직 집계된 일별 방문 데이터가 없습니다. (오늘부터 실시간 집계 시작)
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <div className="h-52 flex items-end gap-1 sm:gap-2 pt-6 pb-2 px-2 bg-slate-900/60 rounded-2xl border border-slate-750 overflow-x-auto">
                {displayedDaily.map((item, idx) => {
                  const uvHeight = Math.max(8, Math.round((item.uv / maxUVInDaily) * 100));
                  const pvHeight = Math.max(8, Math.round((item.pv / maxPVInDaily) * 100));
                  const dateShort = item.date.substring(5); // MM-DD
                  const isToday = item.date === new Date().toISOString().substring(0, 10);

                  return (
                    <div key={item.date || idx} className="flex-1 min-w-[28px] flex flex-col items-center gap-1 h-full justify-end group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-700 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                        <div className="font-bold text-amber-300">{item.date}</div>
                        <div>방문자(UV): <strong className="text-amber-400">{item.uv}명</strong></div>
                        <div>페이지뷰(PV): <strong className="text-teal-400">{item.pv}회</strong></div>
                        <div>카톡클릭: {item.kakaoClicks}회</div>
                      </div>

                      {/* Bars Group */}
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        {/* UV Bar */}
                        <div
                          style={{ height: `${uvHeight}%` }}
                          className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all ${
                            isToday ? 'bg-gradient-to-t from-amber-500 to-amber-300 shadow-md shadow-amber-400/20' : 'bg-amber-400/80 group-hover:bg-amber-400'
                          }`}
                        />
                        {/* PV Bar */}
                        <div
                          style={{ height: `${pvHeight}%` }}
                          className={`w-2.5 sm:w-3.5 rounded-t-sm transition-all ${
                            isToday ? 'bg-gradient-to-t from-teal-500 to-teal-300 shadow-md shadow-teal-400/20' : 'bg-teal-500/70 group-hover:bg-teal-400'
                          }`}
                        />
                      </div>

                      {/* X-axis Label */}
                      <span className={`text-[9px] font-bold ${isToday ? 'text-amber-300 font-black' : 'text-slate-500'}`}>
                        {dateShort}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-center gap-5 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-amber-400" />
                  <span>방문자수 (UV)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-teal-400" />
                  <span>페이지뷰 (PV)</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Breakdown 1: Device Breakdown (1 col wide) */}
        <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-teal-400" />
              <span>접속 기기 분석 (Device)</span>
            </h3>
            <p className="text-[11px] text-slate-400">모바일 vs 데스크톱 PC vs 태블릿 접속 비율</p>
          </div>

          <div className="space-y-4 py-2">
            {/* Progress Bar Stack */}
            <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${mobilePct}%` }} className="bg-amber-400 transition-all" title={`모바일 ${mobilePct}%`} />
              <div style={{ width: `${desktopPct}%` }} className="bg-teal-400 transition-all" title={`PC ${desktopPct}%`} />
              <div style={{ width: `${tabletPct}%` }} className="bg-sky-400 transition-all" title={`태블릿 ${tabletPct}%`} />
            </div>

            {/* Device Stats List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-xl border border-slate-750">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                    <Smartphone className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">스마트폰 (모바일)</div>
                    <div className="text-[10px] text-slate-400">iPhone, Galaxy, KakaoTalk</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-amber-300">{mobilePct}%</div>
                  <div className="text-[10px] text-slate-400">{s.deviceBreakdown.mobile || 0}회</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-xl border border-slate-750">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-teal-400/20 text-teal-300">
                    <Monitor className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">데스크톱 (PC)</div>
                    <div className="text-[10px] text-slate-400">Windows, Mac, Chrome</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-teal-300">{desktopPct}%</div>
                  <div className="text-[10px] text-slate-400">{s.deviceBreakdown.desktop || 0}회</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-900/80 rounded-xl border border-slate-750">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-sky-400/20 text-sky-300">
                    <Tablet className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">태블릿 (iPad)</div>
                    <div className="text-[10px] text-slate-400">iPad, Galaxy Tab</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-sky-300">{tabletPct}%</div>
                  <div className="text-[10px] text-slate-400">{s.deviceBreakdown.tablet || 0}회</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
            💡 모바일 접속 비중이 높으므로 모바일 상단 카카오톡 상담 배너와 간편 예약 버튼이 핵심 전환 경로입니다.
          </div>
        </div>

      </div>

      {/* Row 3: Hourly Traffic & Referrer & Popular Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Hourly Distribution (오늘 시간대별) */}
        <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-3xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>오늘 시간대별 방문 현황 (24H)</span>
            </h3>
            <span className="text-[10px] text-slate-400">00시 ~ 23시</span>
          </div>

          <div className="h-36 flex items-end gap-0.5 pt-4 pb-1 px-1 bg-slate-900/60 rounded-2xl border border-slate-750">
            {s.hourlyDistribution.map((count, hour) => {
              const hHeight = Math.max(4, Math.round((count / maxHourly) * 100));
              const isPeak = count === maxHourly && count > 0;
              return (
                <div key={hour} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-300 text-[9px] px-1 py-0.5 rounded-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                    {hour}시: {count}회
                  </div>
                  <div
                    style={{ height: `${hHeight}%` }}
                    className={`w-full rounded-t-xs transition-all ${
                      isPeak ? 'bg-amber-400 shadow-sm' : count > 0 ? 'bg-teal-400/80' : 'bg-slate-700/30'
                    }`}
                  />
                  {hour % 4 === 0 && (
                    <span className="text-[8px] text-slate-500 mt-1">{hour}시</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400">
            🕒 가장 방문이 집중되는 시간대를 파악하여 실시간 상담 대기 및 마케팅 타이밍을 최적화할 수 있습니다.
          </p>
        </div>

        {/* Referrer Breakdown (유입 경로) */}
        <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-3xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>유입 경로 분석 (Referrer)</span>
            </h3>
            <span className="text-[10px] text-slate-400">어디서 오셨나요?</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {Object.keys(s.referrerBreakdown).length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">아직 유입 경로 데이터가 없습니다.</div>
            ) : (
              (Object.entries(s.referrerBreakdown) as [string, number][])
                .sort((a, b) => Number(b[1]) - Number(a[1]))
                .slice(0, 5)
                .map(([ref, count], idx) => {
                  const countNum = Number(count);
                  const pct = Math.round((countNum / Math.max(1, s.totalPV)) * 100) || 10;
                  return (
                    <div key={ref} className="space-y-1 p-2 bg-slate-900/60 rounded-xl border border-slate-750">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200 flex items-center gap-1.5 truncate">
                          <span className="text-amber-400 text-[10px] font-mono">#{idx + 1}</span>
                          <span className="truncate">{ref}</span>
                        </span>
                        <span className="text-amber-300 font-bold shrink-0">{countNum}회 ({pct}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div style={{ width: `${Math.min(100, pct * 2)}%` }} className="h-full bg-gradient-to-r from-teal-500 to-amber-400" />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            🔍 네이버, 다음, 구글, 카카오톡 및 블로그 유입 비중을 실시간으로 추적합니다.
          </p>
        </div>

        {/* Popular Travel Products (가장 인기 있는 여행 상품 TOP 5) */}
        <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-3xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>인기 여행 상품 TOP 5 (조회수)</span>
            </h3>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-md font-bold">인기순</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {s.popularProducts.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                손님이 상품 상세페이지를 열람하면 실시간 집계됩니다.
              </div>
            ) : (
              s.popularProducts.slice(0, 5).map((prod, idx) => (
                <div key={prod.productId} className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-750 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-black shrink-0 ${
                      idx === 0 ? 'bg-amber-400 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-200 truncate" title={prod.title}>
                      {prod.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-300 shrink-0">
                    {prod.views}회 열람
                  </span>
                </div>
              ))
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            🔥 손님들이 가장 큰 관심을 보이는 상품을 파악하여 메인 추천 및 프로모션에 활용할 수 있습니다.
          </p>
        </div>

      </div>

      {/* Row 4: Real-time Live Visitor Logs Table */}
      <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <span>실시간 최근 방문자 접속 로그 (최근 50건)</span>
            </h3>
            <p className="text-xs text-slate-400">
              접속 일시, 디바이스, 브라우저, 유입 경로 및 손님이 행한 행동(페이지 조회, 카톡 상담 클릭 등)
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={logFilterAction}
              onChange={(e) => setLogFilterAction(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-hidden"
            >
              <option value="전체">모든 행동 (전체)</option>
              <option value="page_view">페이지 조회</option>
              <option value="product_view">상품 상세 열람</option>
              <option value="kakao_click">💬 카톡 상담 클릭</option>
              <option value="phone_click">📞 전화 연결 클릭</option>
              <option value="inquiry_submit">📝 견적 문의 제출</option>
            </select>

            <input
              type="text"
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
              placeholder="페이지, 유입경로 검색..."
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white placeholder-slate-500 focus:outline-hidden flex-1 md:w-48"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-900/60">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-700 text-[11px]">
              <tr>
                <th className="py-3 px-3.5">접속 일시</th>
                <th className="py-3 px-3">기기 / OS</th>
                <th className="py-3 px-3">브라우저</th>
                <th className="py-3 px-3">유입 경로 (Referrer)</th>
                <th className="py-3 px-3.5">열람 페이지 / 상품</th>
                <th className="py-3 px-3 text-center">액션 (행동)</th>
                <th className="py-3 px-3 text-right">IP (마스킹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-bold text-xs">
                    표시할 최근 방문자 로그가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const d = new Date(log.timestamp);
                  const timeStr = d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  const dateStr = log.date || d.toISOString().substring(5, 10);

                  return (
                    <tr key={log.id} className="hover:bg-slate-800/60 transition-colors">
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-200">{timeStr}</span>
                        <span className="text-[10px] text-slate-500 ml-1.5">({dateStr})</span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {log.device === 'mobile' ? (
                            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                          ) : log.device === 'tablet' ? (
                            <Tablet className="w-3.5 h-3.5 text-sky-400" />
                          ) : (
                            <Monitor className="w-3.5 h-3.5 text-teal-400" />
                          )}
                          <span className="font-bold">{log.device === 'mobile' ? '모바일' : log.device === 'tablet' ? '태블릿' : 'PC'}</span>
                          <span className="text-[10px] text-slate-400">({log.os})</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-300 text-[11px]">
                        {log.browser}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {log.referrer}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 max-w-xs truncate">
                        <span className="font-bold text-white" title={log.page}>
                          {log.productTitle ? `[상품] ${log.productTitle}` : log.page}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-center">
                        {log.action === 'kakao_click' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black shadow-xs animate-bounce">
                            <MessageCircle className="w-3 h-3" />
                            <span>카톡 상담 클릭</span>
                          </span>
                        ) : log.action === 'phone_click' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500 text-white text-[10px] font-black shadow-xs">
                            <Phone className="w-3 h-3" />
                            <span>전화 문의 클릭</span>
                          </span>
                        ) : log.action === 'inquiry_submit' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black shadow-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>견적 신청 제출</span>
                          </span>
                        ) : log.action === 'product_view' ? (
                          <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30">
                            상품 열람
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                            페이지 조회
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-[11px] text-slate-400">
                        {log.ip || '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
