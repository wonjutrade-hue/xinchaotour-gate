import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Copy, Check, ExternalLink, Phone, ShieldCheck, Sparkles, User, Calendar } from 'lucide-react';
import { COMPANY_PHONE, KAKAO_ID, DEFAULT_KAKAO_LINK, getKakaoDirectLink, setKakaoDirectLink, handleOpenKakaoTalkDirect } from '../constants';

interface KakaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KakaoModal: React.FC<KakaoModalProps> = ({ isOpen, onClose }) => {
  const [kakaoUrl, setKakaoUrl] = useState('');
  const [copiedType, setCopiedType] = useState<'url' | 'id' | 'phone' | null>(null);
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

  const currentLink = getKakaoDirectLink() || DEFAULT_KAKAO_LINK;

  const handleCopy = (text: string, type: 'url' | 'id' | 'phone') => {
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
    handleOpenKakaoTalkDirect();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#191b20] text-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-700/60 flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#23272f] border-b border-slate-700/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <h3 className="text-sm font-black tracking-wide text-amber-300">
              1:1 채팅방 (카카오톡 오픈채팅)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto custom-scrollbar">
          
          {/* Main Open Chat Card (Matching uploaded photo) */}
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-[#14161a] shadow-xl">
            {/* Background Image / Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-25 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#14161a] via-slate-900/90 to-slate-900/70"></div>

            <div className="relative p-5 space-y-4">
              
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-black">
                  <Sparkles className="w-3.5 h-3.5" />
                  신차오투어 베트남 전지역
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 실시간 연결 가능
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-black text-white leading-snug drop-shadow-md">
                  베트남 자유 여행, 골프 여행, 풀빌라 임대
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  다낭을 중심으로 베트남 자유여행, 골프여행, 풀빌라를 전문 안내해드리는 카톡방입니다. 여행객 및 동업종 분들의 빠른 실시간 소통이 가능합니다.
                </p>
              </div>

              {/* Tags Grid */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['가족 여행', '단체 여행', '프라이빗 휴양', '골프 여행', '교민·여행사 에이전트 협업 환영'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold text-amber-200/90 bg-amber-900/40 border border-amber-500/20 px-2 py-0.5 rounded">
                    ✓ {tag}
                  </span>
                ))}
              </div>

              {/* Contact Info Box */}
              <div className="p-3 rounded-xl bg-black/50 border border-slate-700/60 text-xs space-y-1.5 backdrop-blur-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-semibold text-slate-400">카카오톡 ID:</span>
                  <span className="font-mono font-bold text-amber-300">{KAKAO_ID}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-semibold text-slate-400">Zalo / 한국전화:</span>
                  <span className="font-mono font-bold text-slate-200">{COMPANY_PHONE} / 076 4373 271</span>
                </div>
              </div>

              {/* Big Yellow Kakao Button */}
              <button
                onClick={handleOpenLink}
                className="w-full py-3.5 px-4 rounded-full bg-[#FEE500] hover:bg-[#FADA00] active:scale-[0.99] text-[#191919] font-black text-sm sm:text-base shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-[#191919] text-[#191919]" />
                <span>1:1 카카오톡 채팅 바로 연결</span>
                <ExternalLink className="w-4 h-4 ml-0.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>
          </div>

          {/* Copy Link Section */}
          <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>오픈채팅 주소</span>
              {copiedType === 'url' && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 복사되었습니다!
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentLink}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-amber-300 focus:outline-none select-all"
              />
              <button
                onClick={() => handleCopy(currentLink, 'url')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  copiedType === 'url'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                }`}
              >
                {copiedType === 'url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>복사</span>
              </button>
            </div>
          </div>

          {/* Manager / Host Card (Matching photo avatar) */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-sm flex items-center justify-center shadow-md border-2 border-slate-700">
                <User className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">전주화</span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">운영자</span>
                </div>
                <p className="text-xs text-slate-400">안녕하세요.</p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
              <Calendar className="w-3 h-3" />
              <span>상담 가능</span>
            </div>
          </div>

          {/* Toast Notification */}
          {copiedType && copiedType !== 'url' && (
            <div className="bg-emerald-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-slate-950" />
              <span>
                {copiedType === 'id'
                  ? `카카오톡 ID (${KAKAO_ID})가 복사되었습니다! 카카오톡에서 친구추가 해주세요.`
                  : `대표 전화번호 (${COMPANY_PHONE})가 복사되었습니다!`}
              </span>
            </div>
          )}

          {/* Quick Copy Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCopy(KAKAO_ID, 'id')}
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] text-slate-400 block">카카오톡 ID</span>
                <span className="text-xs font-bold text-amber-300 font-mono">{KAKAO_ID}</span>
              </div>
              <Copy className="w-4 h-4 text-slate-400 group-hover:text-amber-300" />
            </button>

            <button
              onClick={() => handleCopy(COMPANY_PHONE, 'phone')}
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] text-slate-400 block">전화상담</span>
                <span className="text-xs font-bold text-slate-200 font-mono">{COMPANY_PHONE}</span>
              </div>
              <Phone className="w-4 h-4 text-slate-400 group-hover:text-amber-300" />
            </button>
          </div>

          {/* Admin Edit Link Toggle */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setShowAdminEdit(!showAdminEdit)}
              className="text-[11px] font-bold text-slate-500 hover:text-slate-300 underline flex items-center gap-1"
            >
              <span>⚙️ 운영자: 카카오톡 오픈채팅 주소 변경하기</span>
            </button>

            {showAdminEdit && (
              <div className="mt-2.5 p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-2 animate-fadeIn text-xs">
                <p className="font-bold text-slate-300">
                  내 카카오톡 오픈채팅방 URL:
                </p>
                <input
                  type="url"
                  value={kakaoUrl}
                  onChange={(e) => setKakaoUrl(e.target.value)}
                  placeholder="https://open.kakao.com/o/s7OOoshf"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg font-mono text-amber-300 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveUrl}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
                  >
                    저장하기
                  </button>
                </div>
                {isSavedToast && (
                  <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 저장되었습니다!
                  </p>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#23272f] border-t border-slate-700/50 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-400 text-[11px]">24시간 실시간 맞춤 상담</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
