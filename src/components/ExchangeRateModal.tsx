import React, { useState } from 'react';
import { X, RefreshCw, TrendingUp, DollarSign, Calculator, ArrowRightLeft } from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateUSDFromKRW, formatVND, formatUSD } from '../lib/exchangeRate';

interface ExchangeRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  rates: ExchangeRates;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ExchangeRateModal: React.FC<ExchangeRateModalProps> = ({
  isOpen,
  onClose,
  rates,
  onRefresh,
  isRefreshing,
}) => {
  if (!isOpen) return null;

  const [krwInput, setKrwInput] = useState<number>(100000);
  const [vndInput, setVndInput] = useState<number>(2000000);
  const [calcMode, setCalcMode] = useState<'krwToVnd' | 'vndToKrw'>('krwToVnd');

  const liveVND = calculateVNDFromKRW(krwInput, rates);
  const liveUSD = calculateUSDFromKRW(krwInput, rates);

  // KRW from VND
  const krwFromVnd = Math.round((vndInput / (rates.VND || 25200)) * (rates.KRW || 1350));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">실시간 환율 연동 정보</h3>
              <p className="text-[11px] text-slate-300">
                마지막 업데이트: {new Date(rates.lastUpdated).toLocaleTimeString('ko-KR')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Rates Overview */}
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">1 USD 기준 환율</span>
              <p className="text-base font-black text-slate-900 mt-1">
                $1 = <span className="text-teal-700">{rates.KRW.toLocaleString()}원</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                $1 = {rates.VND.toLocaleString()} ₫
              </p>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 block uppercase">1,000 KRW (원) ≒ 베트남 동</span>
              <p className="text-base font-black text-amber-950 mt-1">
                1,000원 ≒ <span className="text-amber-600">{Math.round((1000 / rates.KRW) * rates.VND).toLocaleString()} ₫</span>
              </p>
              <p className="text-[11px] text-amber-800/80 mt-0.5">
                10만동(VND) ≒ 약 {Math.round((100000 / rates.VND) * rates.KRW).toLocaleString()}원
              </p>
            </div>
          </div>

          {/* Interactive Live Currency Calculator */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                실시간 여행 환율 계산기
              </span>
              <button
                onClick={() => setCalcMode(calcMode === 'krwToVnd' ? 'vndToKrw' : 'krwToVnd')}
                className="text-[10px] font-bold text-teal-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>{calcMode === 'krwToVnd' ? '동(VND) ➔ 원화' : '원화 ➔ 동(VND)'}</span>
              </button>
            </div>

            {calcMode === 'krwToVnd' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">
                    한국 원화 (KRW) 입력
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={krwInput}
                    onChange={(e) => setKrwInput(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">환산 베트남 동 (VND)</span>
                  <p className="text-xl font-black text-amber-400">
                    약 {formatVND(liveVND)}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    (달러 기준 약 {formatUSD(liveUSD)})
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">
                    베트남 동 (VND) 입력
                  </label>
                  <input
                    type="number"
                    step="100000"
                    value={vndInput}
                    onChange={(e) => setVndInput(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block">환산 한국 원화 (KRW)</span>
                  <p className="text-xl font-black text-amber-400">
                    약 {krwFromVnd.toLocaleString('ko-KR')} 원
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
              <span>실시간 환율 새로고침</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
