import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Monitor, 
  QrCode, 
  MessageCircle, 
  PhoneCall, 
  Copy, 
  Check, 
  Share2, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Download,
  Send
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { COMPANY_PHONE, COMPANY_PHONE_TEL, getKakaoDirectLink, DEFAULT_KAKAO_LINK, handleOpenKakaoTalkDirect } from '../constants';
import { COMPANY_INFO } from '../data/companyInfo';
import { Product } from '../types';

interface DeviceSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
  currentProduct?: Product | null;
  onApplySyncData?: (data: any) => void;
}

export type SyncTab = 'qr_page' | 'kakao' | 'call' | 'sync_code' | 'pwa_guide';

export const DeviceSyncModal: React.FC<DeviceSyncModalProps> = ({
  isOpen,
  onClose,
  currentPage = 'home',
  currentProduct = null,
  onApplySyncData
}) => {
  const [activeTab, setActiveTab] = useState<SyncTab>('qr_page');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [copied, setCopied] = useState<string | null>(null);
  
  // Sync Code feature
  const [syncCode, setSyncCode] = useState<string>('');
  const [inputCode, setInputCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string>('');
  const [syncErrorMsg, setSyncErrorMsg] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [isOpen, currentPage, currentProduct]);

  useEffect(() => {
    if (isOpen && !syncCode) {
      handleGenerateCode();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const kakaoUrl = getKakaoDirectLink() || DEFAULT_KAKAO_LINK;
  const telUrl = COMPANY_PHONE_TEL;

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleShareNative = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: '신짜오투어 베트남 맞춤여행',
          text: '베트남 단독 맞춤여행, 풀빌라, 골프투어 전문 신짜오투어입니다.',
          url: currentUrl,
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      handleCopyText(currentUrl, 'url');
    }
  };

  // Generate 6-digit Sync Code and send current state to server
  const handleGenerateCode = async () => {
    setIsGenerating(true);
    setSyncErrorMsg('');
    try {
      const payloadData = {
        page: currentPage,
        productId: currentProduct?.id || null,
        productTitle: currentProduct?.title || null,
        timestamp: Date.now(),
        deviceInfo: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
      };

      const res = await fetch('/api/sync/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payloadData })
      });
      const data = await res.json();
      if (data.success && data.code) {
        setSyncCode(data.code);
      } else {
        // Fallback random 6-digit
        setSyncCode(Math.floor(100000 + Math.random() * 900000).toString());
      }
    } catch (e) {
      setSyncCode(Math.floor(100000 + Math.random() * 900000).toString());
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply Sync Code from another device
  const handleConnectByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode || inputCode.trim().length < 4) {
      setSyncErrorMsg('연동 코드를 정확히 입력해주세요.');
      return;
    }
    setIsSyncing(true);
    setSyncErrorMsg('');
    setSyncSuccessMsg('');

    try {
      const res = await fetch(`/api/sync/session/${inputCode.trim()}`);
      const result = await res.json();
      if (result.success && result.data) {
        setSyncSuccessMsg('기기 간 연동이 완료되었습니다! 화면이 동기화됩니다.');
        if (onApplySyncData) {
          onApplySyncData(result.data);
        }
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setSyncErrorMsg(result.error || '유효하지 않은 연동 코드이거나 만료되었습니다.');
      }
    } catch (err: any) {
      setSyncErrorMsg('연동 서버 연결에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight text-white">
                  PC ⇄ 핸드폰 실시간 연동
                </h3>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  실시간 지원
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                스마트폰 카메라로 비추면 앱 설치 없이 즉시 연결됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="p-2 bg-slate-100 border-b border-slate-200 grid grid-cols-5 gap-1 text-center shrink-0">
          <button
            onClick={() => setActiveTab('qr_page')}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'qr_page'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span className="truncate w-full text-[11px]">화면 QR</span>
          </button>

          <button
            onClick={() => setActiveTab('kakao')}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'kakao'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="truncate w-full text-[11px]">카톡 연결</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'call'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span className="truncate w-full text-[11px]">전화 연결</span>
          </button>

          <button
            onClick={() => setActiveTab('sync_code')}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'sync_code'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="truncate w-full text-[11px]">코드 동기화</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa_guide')}
            className={`py-2 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'pwa_guide'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Download className="w-4 h-4" />
            <span className="truncate w-full text-[11px]">홈화면 추가</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* TAB 1: 현재 웹사이트 / 상품 QR코드 */}
          {activeTab === 'qr_page' && (
            <div className="space-y-5 text-center">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  스마트폰 기본 카메라로 비추세요
                </span>
                <h4 className="text-base font-black text-slate-900 pt-1">
                  스마트폰에서 현재 페이지 바로 열기
                </h4>
                <p className="text-xs text-slate-500">
                  별도 앱 설치 없이 스마트폰 카메라로 QR코드를 비추면 즉시 동일한 화면이 열립니다.
                </p>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center p-5 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner max-w-xs mx-auto">
                <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-100">
                  <QRCodeSVG
                    value={currentUrl || 'https://xincaotour.com'}
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-bold">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>아이폰 · 갤럭시 카메라 앱 실행 후 스캔</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleCopyText(currentUrl, 'url')}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  {copied === 'url' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied === 'url' ? '주소 복사됨!' : '웹사이트 링크 복사'}</span>
                </button>
                <button
                  onClick={handleShareNative}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span>스마트폰으로 공유</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 카카오톡 1:1 상담 QR */}
          {activeTab === 'kakao' && (
            <div className="space-y-5 text-center">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                  <MessageCircle className="w-3.5 h-3.5 fill-amber-900" />
                  카카오톡 오픈채팅 스마트폰 즉시 실행
                </span>
                <h4 className="text-base font-black text-slate-900 pt-1">
                  스마트폰 카톡으로 1:1 상담실 바로 입장
                </h4>
                <p className="text-xs text-slate-500">
                  QR을 스캔하면 스마트폰의 카카오톡 앱이 열리고 신짜오투어 전담 상담원과 바로 연결됩니다.
                </p>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center p-5 bg-amber-50/50 rounded-3xl border border-amber-200 max-w-xs mx-auto">
                <div className="p-3 bg-white rounded-2xl shadow-md border border-amber-100">
                  <QRCodeSVG
                    value={kakaoUrl}
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="mt-3 text-xs font-extrabold text-amber-900">
                  카카오톡 ID: <span className="underline">{COMPANY_INFO.kakaoId}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCopyText(kakaoUrl, 'kakao_link')}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  {copied === 'kakao_link' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied === 'kakao_link' ? '카톡 링크 복사됨!' : '카톡 링크 복사'}</span>
                </button>
                <button
                  onClick={(e) => handleOpenKakaoTalkDirect(e)}
                  className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>PC에서 바로 열기</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: 전화 통화 연결 QR */}
          {activeTab === 'call' && (
            <div className="space-y-5 text-center">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black border border-emerald-300">
                  <PhoneCall className="w-3.5 h-3.5" />
                  스마트폰 원터치 전화 걸기
                </span>
                <h4 className="text-base font-black text-slate-900 pt-1">
                  스마트폰으로 {COMPANY_PHONE} 바로 전화 연결
                </h4>
                <p className="text-xs text-slate-500">
                  PC 화면에서 QR을 스캔하면 스마트폰 통화 화면에 전화번호가 즉시 입력됩니다.
                </p>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center p-5 bg-emerald-50/50 rounded-3xl border border-emerald-200 max-w-xs mx-auto">
                <div className="p-3 bg-white rounded-2xl shadow-md border border-emerald-100">
                  <QRCodeSVG
                    value={telUrl}
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-base font-black text-emerald-800">{COMPANY_PHONE}</p>
                  <p className="text-[11px] text-emerald-700">365일 실시간 상담 가능</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleCopyText(COMPANY_PHONE, 'phone')}
                  className="w-full flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  {copied === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied === 'phone' ? '전화번호 복사됨!' : '전화번호 복사'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: 6자리 실시간 동기화 코드 */}
          {activeTab === 'sync_code' && (
            <div className="space-y-5">
              <div className="space-y-1 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-black">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  클라우드 6자리 연동
                </span>
                <h4 className="text-base font-black text-slate-900 pt-1">
                  기기 간 1초 동기화 (PC ↔ 스마트폰)
                </h4>
                <p className="text-xs text-slate-500">
                  PC에서 보던 상품이나 작성 중이던 맞춤 견적서를 스마트폰에서 그대로 이어받을 수 있습니다.
                </p>
              </div>

              {/* Current Device Code Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-center">
                <span className="text-xs text-slate-500 font-bold block">내 기기 연동 코드</span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl font-black text-emerald-600 tracking-widest bg-white px-5 py-2.5 rounded-xl border border-slate-300 shadow-inner">
                    {syncCode || '------'}
                  </span>
                  <button
                    onClick={handleGenerateCode}
                    disabled={isGenerating}
                    className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition cursor-pointer"
                    title="새 코드 생성"
                  >
                    <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  상대방 기기(스마트폰 또는 PC)에 위 6자리 코드를 입력하면 즉시 연결됩니다.
                </p>
              </div>

              {/* Input Code from other device Form */}
              <form onSubmit={handleConnectByCode} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  다른 기기의 6자리 코드 입력하기
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="예: 739201"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-center text-lg font-black tracking-widest focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    <span>연동하기</span>
                  </button>
                </div>

                {syncSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{syncSuccessMsg}</span>
                  </div>
                )}

                {syncErrorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-800">
                    {syncErrorMsg}
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 5: 스마트폰 홈화면에 앱처럼 추가하기 (PWA 가이드) */}
          {activeTab === 'pwa_guide' && (
            <div className="space-y-4">
              <div className="space-y-1 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black border border-sky-300">
                  <Download className="w-3.5 h-3.5" />
                  스마트폰 앱처럼 1초 만에 실행
                </span>
                <h4 className="text-base font-black text-slate-900 pt-1">
                  스마트폰 홈 화면에 바로가기 추가
                </h4>
                <p className="text-xs text-slate-500">
                  홈 화면에 추가해두시면 앱스토어 설치 없이 실제 앱처럼 빠르게 접속하실 수 있습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* iPhone Safari */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                      🍎
                    </div>
                    <h5 className="font-black text-xs text-slate-900">아이폰 (Safari)</h5>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>사파리로 사이트 접속</li>
                    <li>화면 하단 중앙 <strong>[공유]</strong> 아이콘 터치</li>
                    <li>메뉴에서 <strong>[홈 화면에 추가]</strong> 터치</li>
                    <li>우측 상단 <strong>[추가]</strong> 완료!</li>
                  </ol>
                </div>

                {/* Android Chrome */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                      🤖
                    </div>
                    <h5 className="font-black text-xs text-slate-900">갤럭시 / 안드로이드 (Chrome)</h5>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>크롬 브라우저로 사이트 접속</li>
                    <li>우측 상단 <strong>[메뉴(점 3개)]</strong> 터치</li>
                    <li><strong>[앱 설치]</strong> 또는 <strong>[홈 화면에 추가]</strong></li>
                    <li>바탕화면에 신짜오투어 앱 생성 완료!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            PC / 모바일 실시간 자동 연동 시스템 가동 중
          </span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 transition cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
