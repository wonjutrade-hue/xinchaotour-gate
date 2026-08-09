import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Star, 
  Check, 
  XCircle, 
  Clock, 
  Utensils, 
  Hotel, 
  Plane, 
  MessageCircle, 
  ShieldCheck, 
  Share2,
  Sparkles
} from 'lucide-react';
import { ExchangeRates, calculateVNDFromKRW, calculateUSDFromKRW, formatVND, formatUSD } from '../lib/exchangeRate';
import { handleOpenKakaoTalkDirect } from '../constants';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenConsultation: (prod?: Product) => void;
  exchangeRates?: ExchangeRates;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenConsultation,
  exchangeRates,
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusion' | 'reviews'>('itinerary');
  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl);

  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  const liveVND = exchangeRates 
    ? calculateVNDFromKRW(product.priceKRW, exchangeRates)
    : (product.priceVND || Math.round(product.priceKRW * 18.6));

  const liveUSD = exchangeRates 
    ? calculateUSDFromKRW(product.priceKRW, exchangeRates)
    : Math.round(product.priceKRW / 1350);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-teal-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
              {product.category}
            </span>
            <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {product.region} · {product.city}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Title & Rating */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {product.title}
            </h2>
            <p className="text-sm font-medium text-slate-600">
              {product.subTitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating.toFixed(1)}점</span>
                <span className="text-slate-500">({product.reviewCount}개 후기)</span>
              </div>

              <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>여행기간: {product.duration}</span>
              </div>

              <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                <Plane className="w-3.5 h-3.5 text-teal-600" />
                <span>출발가능: {product.departureCities.join(', ')} 출발</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Viewer */}
          <div className="space-y-3">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-teal-600 ring-2 ring-teal-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Special Specs Box */}
          {product.golfSpecs && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                ⛳ 럭셔리 골프 라운딩 구성 ({product.golfSpecs.holes}홀)
              </h4>
              <div className="text-xs text-emerald-800 space-y-1">
                <p>• 포함 골프장: {product.golfSpecs.golfCourseNames.join(' / ')}</p>
                <p>• 그린피, 카트비(2인1카트), 캐디피 포함</p>
              </div>
            </div>
          )}

          {product.villaSpecs && (
            <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-sky-950 text-sm flex items-center gap-2">
                🏰 독채 풀빌라 옵션 스펙
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-sky-900">
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">침실 수</span>
                  <span className="font-bold">{product.villaSpecs.bedrooms} 베드룸</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">개별 수영장</span>
                  <span className="font-bold">{product.villaSpecs.privatePool ? '전용 프라이빗 풀' : '일반'}</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">전경</span>
                  <span className="font-bold">{product.villaSpecs.oceanView ? '파노라마 오션뷰' : '가든뷰'}</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                  <span className="block text-[10px] text-slate-500">최대 수용인원</span>
                  <span className="font-bold">{product.villaSpecs.maxOccupancy}인 투숙 가능</span>
                </div>
              </div>
            </div>
          )}

          {/* Nav Tabs (일정표 / 포함사항 & 불포함 / 여행 소개) */}
          <div className="border-b border-slate-200 flex items-center gap-4 text-sm font-bold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'itinerary' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              📅 일자별 상세 일정표 ({product.itinerary.length}일)
            </button>
            <button
              onClick={() => setActiveTab('inclusion')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'inclusion' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ✅ 포함 / 불포함 사항
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {product.itinerary.map((item) => (
                <div key={item.day} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-700 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                      {item.day}일차
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-2 border-l-2 border-teal-500">
                    {item.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-[11px] text-slate-500 border-t border-slate-200/60">
                    {item.meal && (
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Utensils className="w-3.5 h-3.5 text-amber-600" />
                        식사: {item.meal}
                      </span>
                    )}
                    {item.hotel && (
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Hotel className="w-3.5 h-3.5 text-teal-600" />
                        숙소: {item.hotel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inclusion' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Included */}
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-3">
                <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  포함 사항
                </h4>
                <ul className="space-y-2 text-xs text-emerald-900 font-medium">
                  {product.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-3">
                <h4 className="font-extrabold text-rose-950 text-sm flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  불포함 사항
                </h4>
                <ul className="space-y-2 text-xs text-rose-900 font-medium">
                  {product.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 mt-0.5">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Fixed Booking Bar */}
        <div className="bg-slate-900 p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">
              성인 1인 실시간 최저가 환율 적용
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-400">
                {product.priceKRW.toLocaleString('ko-KR')}원~
              </span>
              <span className="text-xs font-bold text-emerald-400">
                (약 {formatVND(liveVND)} / {formatUSD(liveUSD)})
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleOpenKakaoTalkDirect}
              className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
              title="클릭 시 2단계 없이 바로 카카오톡 개인/직영 상담 연결"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>카톡 1:1 바로상담</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation(product);
              }}
              className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <span>맞춤 견적서 신청</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
