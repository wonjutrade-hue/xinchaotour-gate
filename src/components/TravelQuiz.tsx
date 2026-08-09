import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, X, Compass, Users, MapPin, Heart } from 'lucide-react';
import { Category, Region } from '../types';

interface TravelQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteQuiz: (category: Category | '전체', region: Region | '전체') => void;
}

export const TravelQuiz: React.FC<TravelQuizProps> = ({
  isOpen,
  onClose,
  onCompleteQuiz,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [companion, setCompanion] = useState('');
  const [category, setCategory] = useState<Category | '전체'>('전체');
  const [region, setRegion] = useState<Region | '전체'>('전체');

  const handleFinish = () => {
    onCompleteQuiz(category, region);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-6 relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-xs">
            {step}/3
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              나에게 딱 맞는 베트남 여행 찾기
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              간단한 질문에 답하시면 최적의 추천 상품을 보여드립니다.
            </p>
          </div>
        </div>

        {/* Step 1: Companion */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              Q1. 누구와 함께 여행하시나요?
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: '👨‍👩‍👧‍👦 가족 / 대가족', val: '가족' },
                { label: '👩‍❤️‍👨 연인 / 커플 / 허니문', val: '커플' },
                { label: '⛳ 동호회 / 골프 모임', val: '골프모임' },
                { label: '👯‍♀️ 친구 / 자유 여행자', val: '친구' },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => {
                    setCompanion(item.val);
                    setStep(2);
                  }}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                    companion === item.val
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Travel Style */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" />
              Q2. 어떤 여행 타입을 선호하시나요?
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: '🎒 올인클루시브 추천 패키지', val: '추천패키지' as Category },
                { label: '🛫 자유로운 시티 & 투어 패스', val: '자유여행' as Category },
                { label: '⛳ 명문 코스 VIP 골프 라운딩', val: '골프투어' as Category },
                { label: '🏰 프라이빗 독채 풀빌라 휴양', val: '풀빌라' as Category },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => {
                    setCategory(item.val);
                    setStep(3);
                  }}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                    category === item.val
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Region Preference */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              Q3. 선호하시는 베트남 지역은 어디인가요?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { label: '⛰️ 북부 (하노이/하롱베이/사파)', val: '북부' as Region },
                { label: '🏖️ 중부 (다낭/호이안/나트랑)', val: '중부' as Region },
                { label: '🌴 남부 (푸꾸옥/달랏/호치민)', val: '남부' as Region },
                { label: '🌏 모두 좋아! (베트남 전역)', val: '전체' as Region },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => {
                    setRegion(item.val);
                    handleFinish();
                  }}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                    region === item.val
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
