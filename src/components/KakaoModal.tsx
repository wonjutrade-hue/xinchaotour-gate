import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Copy, Check, ExternalLink, Phone, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { COMPANY_PHONE, KAKAO_ID, getKakaoDirectLink, setKakaoDirectLink } from '../constants';

interface KakaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KakaoModal: React.FC<KakaoModalProps> = ({ isOpen, onClose }) => {
  const [kakaoUrl, setKakaoUrl] = useState('');
  const [copiedType, setCopiedType] = useState<'id' | 'phone' | null>(null);
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [showAdminEdit, setShowAdminEdit] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKakaoUrl(getKakaoDirectLink());
      setCopiedType(null);
      setIsSavedToast(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: 'id' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSaveUrl = () => {
    setKakaoDirectLink(kakaoUrl);
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const handleOpenLink = () => {
    const currentLink = getKakaoDirectLink();
    if (currentLink && currentLink.startsWith('http')) {
      window.open(currentLink, '_blank', 'noopener,noreferrer');
    } else {
      handleCopy(KAKAO_ID, 'id');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 p-5 text-slate-950 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center shadow-md shrink-0">
              <MessageCircle className="w-6 h-6 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-amber-900 tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                신차오투어 실시간 상담
              </div>
              <h3 className="text-lg font-black text-slate-950 leading-tight">
                카카오톡 1:1 바로 상담
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Main Call to Action */}
          {getKakaoDirectLink() ? (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  연결 가능한 오픈채팅 / 채널 등록됨
                </span>
                <span className="text-[10px] font-extrabold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  실시간 1:1
                </span>
              </div>
              <button
                onClick={handleOpenLink}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>카카오톡 1:1 채팅창 열기</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>
          ) : (
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 space-y-2">
              <p className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                카카오톡 직접 친구 추가 안내
              </p>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                아래 [카카오톡 ID 복사] 버튼을 누르신 후 카카오톡 앱에서 친구 추가하시면 24시간 실시간 1:1 맞춤 상담이 가능합니다.
              </p>
            </div>
          )}

          {/* Toast Notification */}
          {copiedType && (
            <div className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>
                {copiedType === 'id'
                  ? `카카오톡 ID (${KAKAO_ID})가 복사되었습니다! 카톡에서 친구추가 해주세요.`
                  : `대표 전화번호 (${COMPANY_PHONE})가 복사되었습니다!`}
              </span>
            </div>
          )}

          {/* Quick Copy Options */}
          <div className="space-y-3">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              빠른 친구 추가 방법
            </div>

            {/* Kakao ID Copy */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">카카오톡 ID Search</span>
                <span className="text-sm font-black text-slate-900 font-mono">{KAKAO_ID}</span>
              </div>
              <button
                onClick={() => handleCopy(KAKAO_ID, 'id')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  copiedType === 'id'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs'
                }`}
              >
                {copiedType === 'id' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'id' ? '복사완료' : 'ID 복사'}</span>
              </button>
            </div>

            {/* Phone Copy */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">대표 전화번호 Phone</span>
                <span className="text-sm font-black text-slate-900 font-mono">{COMPANY_PHONE}</span>
              </div>
              <button
                onClick={() => handleCopy(COMPANY_PHONE, 'phone')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  copiedType === 'phone'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                <span>{copiedType === 'phone' ? '복사완료' : '전화번호 복사'}</span>
              </button>
            </div>
          </div>

          {/* Direct Admin Link Setup Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowAdminEdit(!showAdminEdit)}
              className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
            >
              <span>⚙️ 운영자: 카카오톡 오픈채팅 주소 직접 수정/입력</span>
            </button>

            {showAdminEdit && (
              <div className="mt-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 animate-fadeIn">
                <p className="text-[11px] font-bold text-slate-700">
                  내 카카오톡 오픈채팅방 또는 채널 URL 등록:
                </p>
                <input
                  type="url"
                  value={kakaoUrl}
                  onChange={(e) => setKakaoUrl(e.target.value)}
                  placeholder="예: https://open.kakao.com/o/sXXXXXX"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveUrl}
                    className="flex-1 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    저장하기
                  </button>
                  {kakaoUrl && (
                    <button
                      onClick={() => window.open(kakaoUrl, '_blank')}
                      className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      테스트
                    </button>
                  )}
                </div>
                {isSavedToast && (
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 주소가 저장되었습니다! 모든 카톡 버튼이 이 주소로 연결됩니다.
                  </p>
                )}
                <p className="text-[10px] text-slate-500 leading-normal">
                  💡 카카오톡 앱 ➔ 오픈채팅방 ➔ 상단 메뉴 ➔ [오픈채팅방 링크 복사] 후 위 입력창에 붙여넣고 [저장하기]를 누르시면 됩니다.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
