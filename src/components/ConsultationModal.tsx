import React, { useState } from 'react';
import { Product } from '../types';
import { X, Send, PhoneCall, MessageCircle, CheckCircle2, ShieldCheck, Calendar, Users } from 'lucide-react';
import { handleOpenKakaoTalkDirect, COMPANY_PHONE, DEFAULT_KAKAO_LINK } from '../constants';
import { trackVisitorEvent } from '../lib/analytics';

interface ConsultationModalProps {
  isOpen: boolean;
  product?: Product | null;
  onClose: () => void;
  onSubmitInquiry: (data: any) => Promise<boolean>;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  product,
  onClose,
  onSubmitInquiry,
}) => {
  if (!isOpen) return null;

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [kakaoId, setKakaoId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert('성함과 연락처를 작성해 주세요.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      userName,
      userPhone,
      kakaoId,
      productId: product?.id,
      productTitle: product?.title || '일반 맞춤 견적 문의',
      regionPreference: product?.region || '상관없음',
      categoryPreference: product?.category || '상관없음',
      startDate,
      travelerCount: { adult: adultCount, child: childCount },
      message,
    };

    const success = await onSubmitInquiry(payload);
    setIsSubmitting(false);

    if (success) {
      trackVisitorEvent('inquiry_submit', `상담 신청: ${payload.productTitle}`, {
        productId: product?.id,
        productTitle: product?.title
      });
      setIsSuccess(true);
    } else {
      alert('상담 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">
                실시간 1:1 예약 & 맞춤 견적 상담
              </h3>
              <p className="text-xs text-teal-100 font-medium">
                24시간 내 베트남 전담 담당자가 해피콜을 드립니다
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black text-slate-900">
                상담 신청이 완료되었습니다!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                신차오투어 베트남 전문 카운셀러가 작성해주신 연락처(<strong>{userPhone}</strong>)로 최저가 견적서를 즉시 발송해 드립니다.
              </p>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-left text-xs space-y-2 text-amber-950 font-medium">
              <div className="flex items-center justify-between">
                <p className="font-bold flex items-center gap-1.5 text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  2단계 없는 카카오톡 즉시 1:1 연결
                </p>
                <a
                  href={DEFAULT_KAKAO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOpenKakaoTalkDirect}
                  className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] shadow-xs flex items-center gap-1 cursor-pointer"
                  title="카카오톡 1:1 상담 바로가기"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                  <span>카톡 바로 연결</span>
                </a>
              </div>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                전화 연결이 어려우신 경우 카카오톡 1:1 상담을 이용하시면 24시간 언제나 담당자와 실시간 소통이 가능합니다. (고객센터: {COMPANY_PHONE})
              </p>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm"
            >
              확인
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Target Product Badge if selected */}
            {product && (
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                    {product.category}
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs truncate mt-0.5">
                    {product.title}
                  </h5>
                  <p className="text-[11px] text-teal-700 font-extrabold">
                    {product.priceKRW.toLocaleString()}원~
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Customer Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  성함 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Customer Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  연락처 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Kakao ID */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  카카오톡 ID (선택)
                </label>
                <input
                  type="text"
                  placeholder="빠른 견적 전송용 Kakao ID"
                  value={kakaoId}
                  onChange={(e) => setKakaoId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Travel Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  희망 출발일
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Travelers Count */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                여행 인원
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs">
                  <span className="font-medium text-slate-600">성인</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      className="w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold">{adultCount}명</span>
                    <button
                      type="button"
                      onClick={() => setAdultCount(adultCount + 1)}
                      className="w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs">
                  <span className="font-medium text-slate-600">아동/유아</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      className="w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold">{childCount}명</span>
                    <button
                      type="button"
                      onClick={() => setChildCount(childCount + 1)}
                      className="w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                문의 내용 및 요청 사항
              </label>
              <textarea
                rows={3}
                placeholder="예: 객실 업그레이드 여부, 골프 티타임 시간 요청, 한국인 가이드 단독 차량 맞춤 견적 등..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? '상담 접수 중...' : '실시간 상담 신청하기'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
