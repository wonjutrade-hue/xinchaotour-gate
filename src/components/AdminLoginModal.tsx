import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, X, ArrowRight, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passwords
    if (password === '1234' || password === 'admin' || password === 'wonju' || password === 'xinchao') {
      try {
        localStorage.setItem('xinchao_admin_auth', 'true');
      } catch (err) {}
      setErrorMsg('');
      setPassword('');
      onSuccess();
    } else {
      setErrorMsg('비밀번호가 올바르지 않습니다. (초기 비밀번호: 1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                신짜오투어 관리자 로그인
              </h3>
              <p className="text-xs text-slate-400">
                여행 상품 등록·수정 및 고객 상담 관리
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">
              관리자 접속 비밀번호
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="비밀번호 입력 (기본: 1234)"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-2xl pl-10 pr-4 py-3 text-sm font-bold text-white placeholder-slate-500 focus:outline-hidden"
              />
            </div>
            {errorMsg && (
              <p className="text-xs font-bold text-rose-400 pt-1">
                ⚠️ {errorMsg}
              </p>
            )}
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>관리자 모드 안내</span>
            </p>
            <p className="text-[11px] leading-relaxed">
              • 초기 기본 관리자 비밀번호는 <strong>1234</strong> 입니다.<br />
              • 로그인 후 상품 추가, 수정, 실시간 환율 연동, 고객 견적을 자유롭게 관리하실 수 있습니다.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>관리자 모드 진입</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
