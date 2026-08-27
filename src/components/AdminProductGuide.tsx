import React, { useState } from 'react';
import { 
  Category, 
  City, 
  Region,
  Product 
} from '../types';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Home, 
  Compass, 
  Tag, 
  DollarSign, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowRight,
  Info,
  Calendar,
  Users,
  MapPin,
  Flame,
  Award,
  Zap,
  Download
} from 'lucide-react';

interface AdminProductGuideProps {
  onLoadTemplate: (category: Category, city?: City) => void;
  onSelectPresetPhoto?: (photoUrl: string) => void;
  onClose?: () => void;
}

// Curated copyright-free high quality Unsplash photos by city & theme
export const COPYRIGHT_FREE_PHOTO_LIBRARY = [
  {
    city: '다낭',
    theme: '풀빌라 & 5성급 리조트',
    title: '미케비치 럭셔리 인피니티 풀빌라',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    tags: ['#다낭풀빌라', '#인피니티풀', '#오션뷰']
  },
  {
    city: '다낭',
    theme: '랜드마크 & 명소',
    title: '바나힐 골든브릿지 손동상',
    url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    tags: ['#바나힐', '#골든브릿지', '#다낭패키지']
  },
  {
    city: '호이안',
    theme: '야경 & 고도 문화',
    title: '호이안 올드타운 투본강 소원배 유등',
    url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    tags: ['#호이안야경', '#소원배', '#올드타운']
  },
  {
    city: '다낭',
    theme: '골프투어',
    title: '다낭 BRG & 바나힐스 명문 골프코스',
    url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    tags: ['#다낭골프', '#54홀', '#명문골프장']
  },
  {
    city: '나트랑',
    theme: '에메랄드 해변 & 빈원더스',
    title: '나트랑 베이 청정 에메랄드 해변',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['#나트랑휴양', '#빈원더스', '#에메랄드비치']
  },
  {
    city: '나트랑',
    theme: '사막 액티비티',
    title: '판랑 붉은 사막 샌듄 지프 투어',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    tags: ['#판랑사막', '#사막지프', '#인생샷']
  },
  {
    city: '푸꾸옥',
    theme: '남태평양 감성 & 선셋',
    title: '푸꾸옥 롱비치 선셋 & 야자수 해변',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    tags: ['#푸꾸옥', '#선셋타운', '#롱비치']
  },
  {
    city: '하노이',
    theme: '유네스코 세계자연유산',
    title: '하롱베이 기암괴석 & 6성급 럭셔리 크루즈',
    url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    tags: ['#하롱베이크루즈', '#하노이', '#유네스코']
  },
  {
    city: '하노이',
    theme: '역사 & 문화',
    title: '하노이 올드쿼터 호안끼엠 호수',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    tags: ['#하노이시내', '#호안끼엠', '#미식투어']
  },
  {
    city: '달랏',
    theme: '영원한 봄의 고원',
    title: '달랏 소나무 숲속 감성 힐링 빌라',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    tags: ['#달랏', '#온수풀빌라', '#다딴라루지']
  },
  {
    city: '사파',
    theme: '인도차이나 최고봉',
    title: '사파 3,143m 판시판 & 황금빛 계단식 논',
    url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
    tags: ['#사파', '#판시판', '#토파스에코롯지']
  },
  {
    city: '호치민',
    theme: '골프투어 & 도시',
    title: '호치민 탄손넛 & 투득 명문 챔피언십 CC',
    url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    tags: ['#호치민골프', '#탄손넛CC', '#무이네']
  }
];

export const AdminProductGuide: React.FC<AdminProductGuideProps> = ({
  onLoadTemplate,
  onSelectPresetPhoto,
  onClose
}) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'categories' | 'steps' | 'cities' | 'photos'>('categories');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 text-slate-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-teal-500/20 to-indigo-500/20 border border-amber-400/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>새 상품 등록 완벽 가이드 & 원클릭 마법사</span>
              <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                초보자 필수 지침서
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            신짜오투어의 4대 핵심 상품(독채 풀빌라, 골프투어, 추천패키지, 자유여행)의 특성을 살려 손쉽게 신규 상품을 등록하는 방법입니다.
          </p>
        </div>

        {/* Quick Template Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onLoadTemplate('풀빌라')}
            className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <span>🏖️ 풀빌라 템플릿</span>
          </button>
          <button
            onClick={() => onLoadTemplate('골프투어')}
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <span>⛳ 골프투어 템플릿</span>
          </button>
          <button
            onClick={() => onLoadTemplate('추천패키지')}
            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <span>🎒 패키지 템플릿</span>
          </button>
          <button
            onClick={() => onLoadTemplate('자유여행')}
            className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <span>🏝️ 자유여행 템플릿</span>
          </button>
        </div>
      </div>

      {/* Guide Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveGuideTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
            activeGuideTab === 'categories'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. 상품 유형별 핵심 가이드</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('steps')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
            activeGuideTab === 'steps'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>2. 5단계 등록 순서</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('cities')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
            activeGuideTab === 'cities'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>3. 주요 7대 도시별 핵심 키워드</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('photos')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
            activeGuideTab === 'photos'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>4. 저작권 안심 고화질 사진관 ({COPYRIGHT_FREE_PHOTO_LIBRARY.length})</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: Category Guidelines                                            */}
      {/* ===================================================================== */}
      {activeGuideTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Villa */}
          <div className="bg-slate-800/90 border border-indigo-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold">
                  <Home className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-white text-base">🏖️ 독채 풀빌라 (Private Villa)</h3>
                  <p className="text-xs text-indigo-300">단독 인피니티 풀 & 프라이빗 힐링 대저택</p>
                </div>
              </div>
              <button
                onClick={() => onLoadTemplate('풀빌라')}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <span>템플릿 불러오기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-700/60 space-y-2 text-xs">
              <p className="font-bold text-amber-300">✅ 필수 입력 항목 (체크리스트):</p>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong className="text-white">객실 구조:</strong> 침실수 (2~6룸), 욕실수, 침대 구성 (킹/퀸/트윈)</li>
                <li><strong className="text-white">인원 규정:</strong> 기준 인원 (예: 6명), 최대 투숙 인원 (예: 10명)</li>
                <li><strong className="text-white">단독 수영장:</strong> 프라이빗 인피니티 풀 (크기/깊이), 온수풀 여부</li>
                <li><strong className="text-white">부대시설:</strong> 풀옵션 주방, 바비큐(BBQ) 그릴, 노래방 음향기기, 자쿠지, 엘리베이터</li>
                <li><strong className="text-white">체크인/아웃:</strong> 15:00 체크인 / 11:00 체크아웃 안내</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              💡 <strong>등록 팁:</strong> 가족 및 단체 여행객은 "단독 사용 여부"와 "전용 수영장 사진"을 가장 중요하게 봅니다. 침실별 사진과 주방/바비큐 공간을 상세히 등록하세요.
            </p>
          </div>

          {/* Card 2: Golf */}
          <div className="bg-slate-800/90 border border-emerald-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-white text-base">⛳ 골프투어 (Stay & Play)</h3>
                  <p className="text-xs text-emerald-300">명문 챔피언십 코스 36~90홀 라운딩</p>
                </div>
              </div>
              <button
                onClick={() => onLoadTemplate('골프투어')}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <span>템플릿 불러오기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-700/60 space-y-2 text-xs">
              <p className="font-bold text-amber-300">✅ 필수 입력 항목 & 추천 구성 (체크리스트):</p>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong className="text-white">1일 18홀 단독 투어:</strong> 다낭/호이안 모든 골프장(BRG, 몽고메리, 바나힐스, 호이아나 쇼어스, 빈펄 남호이안, 라구나 랑코) 및 나트랑/하노이/호치민/달랏/푸꾸옥 18홀 데이투어</li>
                <li><strong className="text-white">3개 골프장 연계 54홀 3박 5일:</strong> 1일차 심야 도착 ➔ 2일차 18홀 ➔ 3일차 18홀 ➔ 4일차 18홀+스파+심야 공항 샌딩 ➔ 5일차 아침 한국 귀국</li>
                <li><strong className="text-white">포함 내역:</strong> 그린피 + 2인 1카트 + 1인 1캐디피 100% 포함 여부 체크</li>
                <li><strong className="text-white">현장 지불팁:</strong> 캐디팁($15~$20/18홀 기준) 명확히 명시</li>
                <li><strong className="text-white">차량 지원:</strong> 골프백 수납 전용 단독 리무진 밴 지원</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              💡 <strong>등록 팁:</strong> 한국 골퍼들은 "심야 도착 후 3일 연속 18홀(총 54홀) 라운딩"과 "마지막 날 라운딩 후 샤워 및 마사지를 받고 심야 비행기를 타는 완벽 동선"을 가장 선호합니다.
            </p>
          </div>

          {/* Card 3: Package */}
          <div className="bg-slate-800/90 border border-amber-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 font-bold">
                  <Compass className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-white text-base">🎒 추천 패키지 (단독 프리미엄)</h3>
                  <p className="text-xs text-amber-300">5성급 호텔 + 단독 차량 & 한국어 가이드 풀케어</p>
                </div>
              </div>
              <button
                onClick={() => onLoadTemplate('추천패키지')}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
              >
                <span>템플릿 불러오기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-700/60 space-y-2 text-xs">
              <p className="font-bold text-amber-300">✅ 필수 입력 항목 (체크리스트):</p>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong className="text-white">호텔 등급:</strong> 5성급 오션뷰 호텔/리조트 2인 1실 조식 포함</li>
                <li><strong className="text-white">단독 배차:</strong> 타인 합승 없는 최신형 16인승 단독 전용 차량</li>
                <li><strong className="text-white">한국어 가이드:</strong> 베트남 관광청 라이선스 공인 전담 가이드 동행</li>
                <li><strong className="text-white">핵심 티켓:</strong> 바나힐 케이블카, 하롱베이 6성급 크루즈, 호이안 소원배, VIP 스파</li>
                <li><strong className="text-white">안심 정책:</strong> NO쇼핑 / NO의무옵션 / 1억원 보증보험</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              💡 <strong>등록 팁:</strong> 일자별 일정표에서 "어떤 식사가 제공되는지(바나힐 뷔페, 해산물 BBQ 등)"와 "스파 마사지 90분 포함"을 기재하면 예약 전환율이 급상승합니다.
            </p>
          </div>

          {/* Card 4: Free Tour */}
          <div className="bg-slate-800/90 border border-teal-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-teal-500/20 text-teal-300 font-bold">
                  <Zap className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-white text-base">🏝️ 자유여행 (인근 도시 연계 3박5일 & 4박6일)</h3>
                  <p className="text-xs text-teal-300">한국인 심야 항공 패턴 맞춤 + 인근 도시 묶음 단독 렌터카</p>
                </div>
              </div>
              <button
                onClick={() => onLoadTemplate('자유여행')}
                className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <span>템플릿 불러오기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-700/60 space-y-2 text-xs">
              <p className="font-bold text-amber-300">✅ 필수 입력 항목 (체크리스트):</p>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong className="text-white">인근 도시 연계:</strong> 다낭+호이안+후에, 나트랑+달랏+판랑, 하노이+하롱베이+닌빈, 호치민+무이네 등</li>
                <li><strong className="text-white">한국인 심야 항공 패턴:</strong> 1일차 늦은 밤(21~01시) 도착 픽업 + 마지막 날 체크아웃 투어 후 심야(22~02시) 공항 샌딩</li>
                <li><strong className="text-white">포함 경비:</strong> 5성급 숙소 + 전 일정 단독 렌터카 & 기사, 유류비, 톨게이트비, 주차비 일체 포함</li>
                <li><strong className="text-white">자유도:</strong> 명소, 맛집, 카페를 자유롭게 조율 가능한 프라이빗 맞춤 투어</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              💡 <strong>등록 팁:</strong> 한국 여행객의 90% 이상이 저녁 비행기로 출발하여 심야에 도착하고, 마지막 날 체크아웃 후 자정 무렵 비행기를 탑니다. "심야 픽업 + 체크아웃 후 샌딩"을 기본 포함으로 구성하면 만족도가 매우 높습니다.
            </p>
          </div>

        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: 5-Step Registration Process                                    */}
      {/* ===================================================================== */}
      {activeGuideTab === 'steps' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                step: 'STEP 1',
                title: '기본 정보 입력',
                desc: '상품명, 매력적인 한줄 소개, 카테고리, 권역(중부/남부/북부), 도시 선택',
                icon: '📝'
              },
              {
                step: 'STEP 2',
                title: '특화 스펙 설정',
                desc: '풀빌라 스펙(침실/수영장) 또는 골프투어 스펙(홀수/코스) 설정',
                icon: '⚙️'
              },
              {
                step: 'STEP 3',
                title: '가격 및 포함/불포함',
                desc: '원화(KRW) 입력 시 동(VND) 자동 계산, 투어 포함/불포함 내역 작성',
                icon: '💵'
              },
              {
                step: 'STEP 4',
                title: '일자별 일정표',
                desc: '1일차부터 마지막 날까지 이동, 식사, 호텔, 관광지 상세 기재',
                icon: '🗓️'
              },
              {
                step: 'STEP 5',
                title: '고화질 사진 등록',
                desc: '대표 사진 및 갤러리 서브 사진 2~5장 등록 후 최종 저장',
                icon: '📸'
              }
            ].map((st, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                    {st.step}
                  </span>
                  <span className="text-xl">{st.icon}</span>
                </div>
                <h4 className="font-black text-white text-sm">{st.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4.5 space-y-2">
            <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>사진 등록 시 저작권 안전 수칙:</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              1. 직접 스마트폰이나 카메라로 촬영한 호텔/풀빌라/투어 사진은 100% 안전하게 업로드 가능합니다.<br />
              2. 인터넷 검색 사진 대신 아래 <strong>'저작권 안심 고화질 사진관'</strong>의 Unsplash 상업용 무료 사진을 활용하시면 저작권 침해 걱정 없이 품격 있는 홈페이지를 구축할 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: City Overview & Keywords                                       */}
      {/* ===================================================================== */}
      {activeGuideTab === 'cities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            {
              city: '다낭 (Da Nang)',
              region: '중부',
              highlights: '미케비치 오션뷰 풀빌라, 바나힐 골든브릿지, 호이안 올드타운 유등, BRG/바나힐스 골프 54홀',
              tags: ['#다낭3박5일', '#미케비치', '#호이안올드타운', '#바나힐', '#BRG다낭']
            },
            {
              city: '나트랑 (Nha Trang)',
              region: '중부/남부',
              highlights: '빈원더스 테마파크, 아이리조트 천연 머드온천, 깜란 오션프론트 대저택 풀빌라, 판랑 사막 지프, KN링크스 깜란',
              tags: ['#나트랑풀빌라', '#빈원더스', '#머드온천', '#판랑사막', '#KN링크스']
            },
            {
              city: '푸꾸옥 (Phu Quoc)',
              region: '남부',
              highlights: '남태평양 청정 에메랄드 해변, 혼똔섬 7.9km 케이블카, 빈펄 사파리, 4섬 스노클링 호핑, 빈펄 푸꾸옥 골프',
              tags: ['#푸꾸옥리조트', '#사파리', '#호핑투어', '#선셋타운', '#푸꾸옥골프']
            },
            {
              city: '하노이 & 하롱베이',
              region: '북부',
              highlights: '하롱베이 6성급 럭셔리 크루즈 1박, 닌빈 짱안 유네스코 나룻배, 항무아 전망대, 스카이레이크 명문 골프',
              tags: ['#하롱베이크루즈', '#하노이시내', '#닌빈짱안', '#스카이레이크']
            },
            {
              city: '달랏 (Da Lat)',
              region: '남부 고원',
              highlights: '해발 1,500m 영원한 봄의 도시, 투옌람 호수 온수 풀빌라, 다딴라 폭포 루지, 랑비앙산 지프, 100년 황실 달랏팰리스 골프',
              tags: ['#달랏온수풀', '#다딴라루지', '#랑비앙산', '#달랏팰리스']
            },
            {
              city: '사파 (Sa Pa)',
              region: '북부 고원',
              highlights: '인도차이나 최고봉 판시판 3,143m 케이블카, 토파스 에코롯지 파노라마 빌라, 깟깟마을 계단식 논 트레킹',
              tags: ['#판시판', '#토파스에코롯지', '#사파트레킹', '#깟깟마을']
            },
            {
              city: '호치민 & 무이네',
              region: '남부',
              highlights: '베트남 경제수도 호치민 시내, 탄손넛/투득 도심 골프, 무이네 화이트샌듄 사막 일출 지프, 사이공강 리버뷰 풀빌라',
              tags: ['#호치민골프', '#탄손넛CC', '#무이네사막지프', '#사이공강']
            }
          ].map((c, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-white text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>{c.city}</span>
                </h4>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full">
                  {c.region}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{c.highlights}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {c.tags.map((t, tIdx) => (
                  <span key={tIdx} className="text-[10px] bg-slate-900/90 text-amber-300 font-bold px-1.5 py-0.5 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: Safe Copyright-free Photo Library                              */}
      {/* ===================================================================== */}
      {activeGuideTab === 'photos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">
              아래 사진들은 Unsplash 상업용 무료 라이선스로 저작권 침해 없이 안전하게 상품 메인 및 갤러리에 사용할 수 있습니다.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COPYRIGHT_FREE_PHOTO_LIBRARY.map((photo, pIdx) => (
              <div 
                key={pIdx}
                className="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col hover:border-amber-400/60 transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/30">
                      {photo.city}
                    </span>
                    <span className="bg-slate-950/80 backdrop-blur-xs text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-400/30">
                      {photo.theme}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="font-black text-white text-xs leading-snug">{photo.title}</h5>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {photo.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                    <button
                      onClick={() => handleCopy(photo.url)}
                      className="flex-1 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-750 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                      title="사진 URL 복사"
                    >
                      {copiedUrl === photo.url ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">복사완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>URL 복사</span>
                        </>
                      )}
                    </button>

                    {onSelectPresetPhoto && (
                      <button
                        onClick={() => onSelectPresetPhoto(photo.url)}
                        className="py-1.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                        title="이 사진으로 상품 등록 시작"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>선택</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
