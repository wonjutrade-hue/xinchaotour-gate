import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, MessageCircle } from 'lucide-react';
import { DEFAULT_KAKAO_LINK, handleOpenKakaoTalkDirect } from '../constants';

interface AiTravelAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

const QUICK_PROMPTS = [
  '🌴 다낭 3박 5일 가족 여행 맞춤 코스 추천해줘',
  '⛳ 베트남 대표 명문 골프장 및 바나힐 CC 특징',
  '🏰 푸꾸옥 독채 풀빌라 추천과 가격대 알려줘',
  '🚢 하롱베이 5성급 럭셔리 크루즈 포함사항은?'
];

export const AiTravelAssistantModal: React.FC<AiTravelAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: '신차오! 👋 저는 **신차오투어 베트남 AI 전문 상담원**입니다.\n\n여행 일정, 베트남 지역(하노이/다낭/나트랑/푸꾸옥), 골프 라운딩, 풀빌라 추천 등 궁금하신 점을 편하게 물어보세요!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: 'user', text: promptText };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      const data = await res.json();

      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: '죄송합니다. 서비스 응답이 원활하지 않습니다. 실시간 상담원을 통해 1:1 안내를 받아보세요!' }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: '네트워크 연결 오류입니다. 실시간 카카오톡 상담을 이용해 주세요.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full h-[650px] max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-950/20 flex items-center justify-center text-slate-950">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-950">
                신차오 베트남 AI 여행 가이드
              </h3>
              <p className="text-[11px] font-bold text-slate-900">
                Gemini AI 기반 맞춤 베트남 일정 & 견적 어드바이저
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white'
                    : 'bg-amber-400 text-slate-950'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold p-2">
              <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
              <span>신차오 AI가 베트남 최적 일정을 분석하고 있습니다...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 shrink-0">
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="베트남 여행에 대해 궁금한 점을 물어보세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-bold p-2.5 rounded-xl transition-all shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
          <a
            href={DEFAULT_KAKAO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenKakaoTalkDirect}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3 py-2.5 rounded-xl flex items-center gap-1 shrink-0 cursor-pointer"
            title="2단계 없이 카카오톡 개인/직영 1:1 바로 연결"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
            <span className="hidden sm:inline">카톡 바로연결</span>
          </a>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-3 py-2.5 rounded-xl flex items-center gap-1 shrink-0"
            title="상세 맞춤 견적서 신청"
          >
            <span className="hidden sm:inline">견적신청</span>
          </button>
        </div>
      </div>
    </div>
  );
};
