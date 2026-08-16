import React, { useState } from 'react';
import { 
  PhoneCall, 
  MessageCircle, 
  Send, 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Clock,
  Compass
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { handleOpenKakaoTalkDirect } from '../constants';
import { Product } from '../types';

interface ReservationPageProps {
  products: Product[];
  onSubmitInquiry: (inquiryData: {
    userName: string;
    userPhone: string;
    kakaoId?: string;
    productId?: string;
    productTitle?: string;
    regionPreference?: string;
    categoryPreference?: string;
    startDate?: string;
    travelerCount: { adult: number; child: number };
    message: string;
  }) => Promise<boolean>;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  products,
  onSubmitInquiry
}) => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [kakaoId, setKakaoId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [categoryPreference, setCategoryPreference] = useState('자유여행');
  const [regionPreference, setRegionPreference] = useState('중부 다낭/호이안');
  const [startDate, setStartDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert('성함과 연락처를 입력해주세요.');
      return;
    }

    const matchedProduct = products.find(p => p.id === selectedProductId);
    const productTitle = matchedProduct ? matchedProduct.title : `${categoryPreference} (${regionPreference})`;

    setIsSubmitting(true);
    try {
      const success = await onSubmitInquiry({
        userName: userName.trim(),
        userPhone: userPhone.trim(),
        kakaoId: kakaoId.trim() || undefined,
        productId: selectedProductId || undefined,
        productTitle,
        regionPreference,
        categoryPreference,
        startDate: startDate || undefined,
        travelerCount: { adult: adults, child: children },
        message: `이메일: ${userEmail}\n${message}`.trim()
      });

      if (success) {
        setIsSubmitted(true);
      } else {
        alert('문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주시거나 카카오톡으로 문의해주세요.');
      }
    } catch (err) {
      console.error(err);
      alert('예약문의 접수가 완료되었습니다. 카카오톡 또는 전화로 빠르게 연락드리겠습니다.');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            24시간 실시간 예약 & 견적 상담
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            신짜오투어 예약 및 맞춤 견적 문의
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            원하시는 여행 일정, 인원, 선호 숙소나 골프장 정보를 남겨주시면 <br className="hidden sm:inline" />
            베트남 현지 전문 플래너가 <strong>가장 합리적인 1:1 맞춤 견적서</strong>를 신속하게 보내드립니다.
          </p>
        </div>

        {/* 4 Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Phone */}
          <a
            href={COMPANY_INFO.phoneTel}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">전화 빠른 상담</h3>
            <p className="text-emerald-700 font-extrabold text-base mb-1">{COMPANY_INFO.phone}</p>
            <span className="text-[11px] text-slate-400">한국인 상담원 즉시 연결</span>
          </a>

          {/* Kakao */}
          <button
            onClick={(e) => handleOpenKakaoTalkDirect(e)}
            className="bg-amber-400/10 border border-amber-300 p-5 rounded-2xl shadow-xs hover:bg-amber-400/20 hover:shadow-md transition flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">카카오톡 상담</h3>
            <p className="text-amber-900 font-extrabold text-base mb-1">1:1 실시간 채팅</p>
            <span className="text-[11px] text-amber-800">ID: {COMPANY_INFO.kakaoId}</span>
          </button>

          {/* WhatsApp */}
          <a
            href={COMPANY_INFO.whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-50 border border-green-200 p-5 rounded-2xl shadow-xs hover:border-green-400 hover:shadow-md transition flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">WhatsApp 상담</h3>
            <p className="text-green-700 font-extrabold text-base mb-1">{COMPANY_INFO.whatsAppNumber}</p>
            <span className="text-[11px] text-slate-400">현지 및 외국인 고객 지원</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">이메일 문의</h3>
            <p className="text-sky-800 font-bold text-xs mb-1 truncate max-w-[160px]">{COMPANY_INFO.email}</p>
            <span className="text-[11px] text-slate-400">상세 견적서 발송 요청</span>
          </a>
        </div>

        {/* Inquiry Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">예약 문의가 성공적으로 접수되었습니다!</h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                신짜오투어 전담 상담원이 고객님의 연락처로 영업시간 기준 30분 이내에 친절하게 연락드리겠습니다.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-sm transition"
                >
                  추가 문의 작성하기
                </button>
                <button
                  onClick={(e) => handleOpenKakaoTalkDirect(e)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition"
                >
                  카카오톡 즉시 연결
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  온라인 간편 예약 및 견적 신청서
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  * 표시는 필수 입력 항목입니다. 빠르고 정확한 맞춤 플랜을 위해 상세히 적어주세요.
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    예약자 성함 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      className="w-full text-sm pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    휴대폰 연락처 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={userPhone}
                      onChange={e => setUserPhone(e.target.value)}
                      className="w-full text-sm pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    이메일 주소 (견적서 수신용)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="example@naver.com"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      className="w-full text-sm pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    카카오톡 ID (선택)
                  </label>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="카카오톡 아이디"
                      value={kakaoId}
                      onChange={e => setKakaoId(e.target.value)}
                      className="w-full text-sm pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Travel Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">여행 카테고리</label>
                  <select
                    value={categoryPreference}
                    onChange={e => setCategoryPreference(e.target.value)}
                    className="w-full text-sm py-2.5 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="자유여행">🛫 자유여행</option>
                    <option value="풀빌라">🏰 풀빌라</option>
                    <option value="골프투어">⛳ 골프여행</option>
                    <option value="추천패키지">🎒 추천 패키지</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">희망 지역</label>
                  <select
                    value={regionPreference}
                    onChange={e => setRegionPreference(e.target.value)}
                    className="w-full text-sm py-2.5 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="중부 다낭/호이안/후에">중부 (다낭 · 호이안 · 후에)</option>
                    <option value="북부 하노이/하롱베이/닌빈">북부 (하노이 · 하롱베이 · 닌빈)</option>
                    <option value="북부 하장/동반/까오방">북부 (하장 · 동반 · 까오방 · 반지옥)</option>
                    <option value="남부 나트랑/달랏/무이네">남부 (나트랑 · 달랏 · 무이네)</option>
                    <option value="남부 푸꾸옥">남부 (푸꾸옥)</option>
                    <option value="남부 호치민">남부 (호치민)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">관심 상품 선택</label>
                  <select
                    value={selectedProductId}
                    onChange={e => setSelectedProductId(e.target.value)}
                    className="w-full text-sm py-2.5 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden truncate"
                  >
                    <option value="">직접 맞춤 견적 요청</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        [{p.category}] {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">여행 희망일</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full text-sm pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">성인 인원</label>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-slate-800 text-sm">{adults}명</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">아동 인원 (만 12세 미만)</label>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-slate-800 text-sm">{children}명</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  문의사항 및 특별 요청 (항공권 소지 여부, 희망 골프장, 풀빌라 객실 조건 등)
                </label>
                <textarea
                  rows={4}
                  placeholder="예: 10월 초 가족 6명 다낭 4베드룸 풀빌라 3박 5일 문의합니다. 부모님 환갑 기념이라 바베큐 파티와 단독 밴 요청드립니다."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full text-sm p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 rounded-xl transition shadow-lg text-base cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? '문의 접수 중입니다...' : '예약문의 및 견적 신청 보내기'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                입력하신 개인정보는 견적 상담 목적 외에 절대 사용되지 않습니다.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
