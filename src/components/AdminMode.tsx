import React, { useState, useEffect, useRef } from 'react';
import { 
  Product, 
  Category, 
  Region, 
  City, 
  ItineraryDay, 
  VillaSpecs, 
  GolfSpecs, 
  GolfCourseDetail, 
  ConsultationRequest 
} from '../types';
import { ExchangeRates, calculateVNDFromKRW, calculateKRWFromVND, formatVND } from '../lib/exchangeRate';
import { COMPANY_PHONE, COMPANY_PHONE_TEL } from '../constants';
import { optimizeImageFile, uploadImagesToServer } from '../lib/imageUtils';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Search,
  Filter,
  ArrowLeft,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  Layers,
  Home,
  Check,
  XCircle,
  ExternalLink,
  Download,
  RotateCcw,
  MessageSquare,
  Phone,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Tag,
  Star,
  Users,
  Compass,
  FileText,
  Key,
  Smartphone,
  Info,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Loader2,
  FolderOpen
} from 'lucide-react';

interface AdminModeProps {
  products: Product[];
  inquiries: ConsultationRequest[];
  rates: ExchangeRates;
  onSaveProducts: (products: Product[]) => void;
  onSaveInquiries: (inquiries: ConsultationRequest[]) => void;
  onExitAdmin: () => void;
  onPreviewProduct: (product: Product) => void;
  onForceSync?: () => Promise<void> | void;
  isSyncing?: boolean;
}

// Preset high quality Vietnam travel photos for 1-click selection
const PRESET_PHOTOS = [
  { label: '다낭 미케비치 & 풀빌라', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', category: '풀빌라' },
  { label: '럭셔리 오션뷰 인피니티풀', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', category: '풀빌라' },
  { label: '모던 프라이빗 풀빌라 야경', url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80', category: '풀빌라' },
  { label: '하롱베이 5성 럭셔리 크루즈', url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', category: '추천패키지' },
  { label: '하노이 올드쿼터 & 호안끼엠', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', category: '추천패키지' },
  { label: '호이안 올드타운 유등 야경', url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', category: '추천패키지' },
  { label: '다낭 바나힐 골든브릿지 손동상', url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80', category: '추천패키지' },
  { label: '다낭 BRG / 바나힐 명문 골프코스', url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80', category: '골프투어' },
  { label: '푸꾸옥 빈펄 골프 리조트', url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80', category: '골프투어' },
  { label: '나트랑 다이아몬드베이 골프클럽', url: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80', category: '골프투어' },
  { label: '푸꾸옥 에메랄드 해변 휴양', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', category: '자유여행' },
  { label: '달랏 고원 낭만 커피농장', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', category: '자유여행' },
];

const POPULAR_TAGS = [
  '#가족여행', '#효도여행', '#노쇼핑', '#노옵션', '#단독차량', '#한국어가이드',
  '#전용풀빌라', '#오션뷰', '#명문골프', '#5성급호텔', '#미식투어', '#전일정식사포함',
  '#공항픽업샌딩', '#스파마사지포함', '#바나힐입장권포함', '#하롱베이크루즈'
];

// 여행사 스타일 자유여행/패키지 포함 & 불포함 프리셋
const FREE_TOUR_INCLUDED = [
  '전 일정 단독 전용 차량 (유류비, 기사, 톨게이트비 일체 포함)',
  '한국어 능통 베테랑 전담 가이드 풀케어 동행',
  '전 일정 엄선된 5성급 호텔/리조트 숙박 (조식 포함)',
  '일정표 내 명시된 핵심 관광지 입장료 및 케이블카 탑승권',
  '현지 대표 특식 및 전 일정 식사 포함',
  '1억원 상당 해외 여행자 보험',
  '신짜오투어 24시간 실시간 한국어 안심 케어 서비스'
];

const FREE_TOUR_EXCLUDED = [
  '왕복 국제선 항공권 (항공권 별도 발권 또는 대행 가능)',
  '가이드 및 전담 기사 매너팁 (자율 지불)',
  '개인 쇼핑 경비 및 음료/주류 비용',
  '일정표 외 선택 관광 및 개인 자유 일정 경비'
];

// 골프투어 Stay & Play 전용 포함 & 불포함 프리셋
const GOLF_INCLUDED = [
  '3박 전 일정 5성급 특급 호텔/골프 리조트 숙박 (2인 1실, 조식 포함)',
  '명문 골프장 3회 54홀 그린피 100% 전액 포함',
  '전 일정 전동 카트비 (2인 1카트 기준)',
  '전 일정 1인 1캐디피 포함',
  '공항 ↔ 호텔 ↔ 골프장 전 일정 단독 전용 차량 & 전담 기사',
  '1억원 상당 해외 여행자 보험',
  '매일 라운딩용 시원한 생수 & 쿨타월 제공'
];

const GOLF_EXCLUDED = [
  '왕복 국제선 항공권 (대행 발권 가능)',
  '캐디 팁 (18홀 1인 기준 약 $15~$20 / 30~40만동 현장 지불)',
  '클럽하우스 중식 및 개인 음료/주류 비용',
  '클럽 렌탈 및 골프화 대여비 (사전 요청 시 대여 가능)',
  '기타 개인 경비 및 매너팁'
];

// 에어비앤비 스타일 풀빌라 임대 전용 포함 & 불포함 프리셋
const VILLA_INCLUDED = [
  '럭셔리 프라이빗 독채 풀빌라 전박 숙박',
  '전용 프라이빗 인피니티 풀 무제한 단독 이용',
  '매일 호텔식 하우스키핑 & 룸 클리닝 서비스',
  '풀 키친 (주방 인덕션, 대형냉장고, 전자레인지, 조리도구 일체)',
  '초고속 무료 Wi-Fi 및 스마트 TV (넷플릭스/유튜브)',
  '웰컴 생수 & 열대과일 바구니 제공',
  '24시간 리조트 전문 보안 및 방범 관리'
];

const VILLA_EXCLUDED = [
  '개인 식자재 및 장보기 비용',
  '야외 바비큐(BBQ) 숯/그릴 세팅비 (사전 요청 시 세팅 제공)',
  '공항 픽업/샌딩 전용 차량 (옵션 추가 가능)',
  '개인 기호식품 및 룸서비스 추가 비용',
  '체크인 보증금 (체크아웃 시 파손 없을 시 100% 전액 반환)'
];

const PRESET_INCLUDED = FREE_TOUR_INCLUDED;
const PRESET_EXCLUDED = FREE_TOUR_EXCLUDED;

// 에어비앤비 스타일 풀빌라 편의시설 (Amenities)
const VILLA_AMENITIES = [
  '프라이빗 전용 수영장', '오션뷰 / 비치프론트', '풀 키친 (주방 조리시설)',
  '대형 냉장고 & 전자레인지', '야외 바비큐(BBQ) 시설', '세탁기 & 건조기',
  '초고속 무료 Wi-Fi', '스마트 TV (넷플릭스)', '최신 가라오케/노래방',
  '전용 사우나 / 자쿠지 욕조', '무료 조식 룸서비스', '전용 버틀러 서비스',
  '24시간 리조트 보안', '프라이빗 정원 & 테라스'
];

// 골프장 부대시설 프리셋
const GOLF_FACILITIES_PRESETS = [
  '18홀 챔피언십 코스', '36홀 코스', '54홀 코스', '드라이빙 레인지 (연습장)',
  '클럽하우스 락커룸 & 샤워실', '프로샵 (용품점)', '클럽하우스 VIP 레스토랑',
  'VIP 사우나 & 자쿠지', '카트 페어웨이 진입 가능', '그늘집 스낵바'
];

export const AdminMode: React.FC<AdminModeProps> = ({
  products,
  inquiries,
  rates,
  onSaveProducts,
  onSaveInquiries,
  onExitAdmin,
  onPreviewProduct,
  onForceSync,
  isSyncing = false,
}) => {
  // Navigation & Tabs
  const [adminTab, setAdminTab] = useState<'products' | 'inquiries'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('전체');
  const [filterRegion, setFilterRegion] = useState<string>('전체');
  const [viewMode, setViewMode] = useState<'category' | 'region' | 'all'>('category');
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  
  // Product Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editorTab, setEditorTab] = useState<'basic' | 'pricing' | 'photos' | 'specs' | 'itinerary' | 'terms'>('basic');
  
  // Custom Tag Input inside Editor
  const [customTagInput, setCustomTagInput] = useState('');
  const [customPhotoUrlInput, setCustomPhotoUrlInput] = useState('');
  const [customIncludedInput, setCustomIncludedInput] = useState('');
  const [customExcludedInput, setCustomExcludedInput] = useState('');
  
  // Image Uploading & Drag/Drop
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const galleryImageInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);
  const [isPhotoDragOver, setIsPhotoDragOver] = useState(false);

  // Status Notification
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 3500);
  };

  const handleManualSync = async () => {
    setIsManualSyncing(true);
    try {
      if (onForceSync) {
        await onForceSync();
      }
      showNotification('⚡ 최신 데이터가 성공적으로 새로고침되었습니다!');
    } catch (err) {
      showNotification('⚠️ 새로고침 중 오류가 발생했습니다.');
    } finally {
      setIsManualSyncing(false);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((prod) => {
    const matchCat = filterCategory === '전체' || prod.category === filterCategory;
    const matchReg = filterRegion === '전체' || prod.region === filterRegion;
    const matchSearch = 
      !searchTerm ||
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchReg && matchSearch;
  });

  // Check if an image URL is a default sample placeholder
  const isSampleUrl = (url: string | undefined): boolean => {
    if (!url) return true;
    return url.includes('images.unsplash.com') || url === 'VILLA_PHOTO_DATA' || url === 'TEST_IMG';
  };

  // Open Editor for Creating New Product
  const handleCreateNewProduct = (category: Category = '추천패키지') => {
    const newId = `prod-${Date.now()}`;
    
    // Default values by category
    let defaultPriceKRW = 690000;
    let defaultDuration = '3박 5일';
    let defaultTags = ['#단독차량', '#한국어가이드'];
    let defaultIncluded = [...FREE_TOUR_INCLUDED];
    let defaultExcluded = [...FREE_TOUR_EXCLUDED];
    let defaultItinerary: ItineraryDay[] = [];
    let defaultVillaSpecs: VillaSpecs | undefined = undefined;
    let defaultGolfSpecs: GolfSpecs | undefined = undefined;
    let defaultHighlights: string[] = [];
    let defaultVehicleInfo = '16인승 최신형 리무진 단독 배차 (전 일정 유류비, 기사비, 톨비 일체 포함)';
    let defaultGuideInfo = '베트남 관광청 공인 라이선스 보유 한국어 전담 베테랑 가이드 풀케어';
    let defaultTheme = '가족 힐링 여행';

    if (category === '자유여행') {
      defaultPriceKRW = 490000;
      defaultDuration = '3박 4일';
      defaultTags = ['#자유여행', '#단독차량렌트', '#한국어기사', '#맞춤일정', '#가족자유여행'];
      defaultIncluded = [...FREE_TOUR_INCLUDED];
      defaultExcluded = [...FREE_TOUR_EXCLUDED];
      defaultHighlights = ['다낭 미케비치', '호이안 올드타운 야경', '바나힐 골든브릿지', '링응사 영응사'];
      defaultVehicleInfo = '16인승 최신형 리무진 단독 배차 (1일 10시간 전담 기사 & 유류비 일체 포함)';
      defaultGuideInfo = '베트남 관광청 라이선스 보유 한국어 전담 가이드 동행 (자유 일정 맞춤 안내)';
      defaultTheme = '가족 힐링 자유여행';
      defaultItinerary = [
        {
          day: 1,
          title: '다낭 공항 도착 ➔ 전용차량 미팅 ➔ 호텔 체크인 & 미케비치 산책',
          description: '공항 도착 후 전담 기사 미팅. 전용 차량으로 숙소 이동 및 자유 휴식 후 미케비치 카페거리 탐방.',
          meal: '조식: 기내식 | 중식: 현지 쌀국수 | 석식: 자유식',
          hotel: '5성급 쉐라톤 다낭 또는 동급',
          vehicle: '16인승 단독 전용 차량',
          attractions: ['다낭 공항', '미케비치', '호텔 체크인']
        },
        {
          day: 2,
          title: '바나힐 국립공원 케이블카 & 골든브릿지 손동상 ➔ 야시장',
          description: '세계 최장 케이블카 탑승 후 테마파크 자유 관광 및 프랑스 마을 산책, 저녁 선짜 야시장 미식 탐방.',
          meal: '조식: 호텔식 | 중식: 바나힐 뷔페 | 석식: 칠리크랩 씨푸드',
          hotel: '5성급 쉐라톤 다낭',
          vehicle: '16인승 단독 전용 차량',
          attractions: ['바나힐', '골든브릿지', '선짜 야시장']
        },
        {
          day: 3,
          title: '호이안 유네스코 올드타운 ➔ 투본강 소원배 유등 띄우기',
          description: '유서 깊은 고도 호이안 탐방. 풍등이 가득한 전통 거리 산책 및 야간 소원배 탑승, 야시장 쇼핑.',
          meal: '조식: 호텔식 | 중식: 호이안 전통 반미/화이트로즈 | 석식: 특식 모닝글로리',
          hotel: '5성급 쉐라톤 다낭',
          vehicle: '16인승 단독 전용 차량',
          attractions: ['호이안 올드타운', '투본강 소원배', '풍등 거리']
        },
        {
          day: 4,
          title: '오행산 마블마운틴 ➔ 롯데마트 쇼핑 & 힐링 스파 ➔ 공항 샌딩',
          description: '체크아웃 후 오행산 동굴 탐방, 롯데마트 기념품 쇼핑 및 90분 VIP 아로마 스파 마사지 후 공항 샌딩.',
          meal: '조식: 호텔식 | 중식: 현지 미식 | 석식: 공항식',
          hotel: '기내박 또는 귀국',
          vehicle: '16인승 단독 전용 차량',
          attractions: ['오행산', '롯데마트', '프리미엄 스파']
        }
      ];
    } else if (category === '골프투어') {
      defaultPriceKRW = 890000;
      defaultDuration = '3박 4일';
      defaultTags = ['#골프투어', '#54홀라운딩', '#StayAndPlay', '#다낭명문골프', '#그린피포함', '#1인1캐디'];
      defaultIncluded = [...GOLF_INCLUDED];
      defaultExcluded = [...GOLF_EXCLUDED];
      defaultVehicleInfo = '공항 ↔ 호텔 ↔ 골프장 전 일정 VIP 단독 전용 리무진 & 전담 기사';
      defaultGuideInfo = '골프 전문 한국어 가이드 (티오프 체크인 및 라운딩 스케줄 전담 케어)';
      defaultTheme = '3박 4일 54홀 VIP Stay & Play';
      defaultGolfSpecs = {
        holes: 54,
        totalRounds: 3,
        stayAndPlayHotel: '5성급 쉐라톤 그랜드 다낭 리조트 (또는 빈펄 골프 리조트)',
        hotelRoomType: '디럭스 골프/오션뷰 룸 (2인 1실, 조식 포함)',
        distanceInfo: '호텔 ↔ 골프장 간 단독 전용차량 15~25분 소요',
        greenFeeIncluded: true,
        caddieFeeIncluded: true,
        cartIncluded: true,
        caddieTipInfo: '18홀 1인 기준 약 $15~$20 (30만~40만동 현장 지불)',
        golfCourseNames: ['다낭 BRG 골프 리조트 (18홀)', '몽고메리 링크스 CC (18홀)', '바나힐스 골프클럽 (18홀)'],
        courseDetails: [
          {
            name: '다낭 BRG 골프 리조트 (BRG Da Nang Golf)',
            designer: '그렉 노먼 (Greg Norman)',
            holes: 18,
            difficulty: '상급',
            grassType: '버뮤다 그래스 (Bermuda Grass)',
            facilities: ['18홀 챔피언십 코스', '드라이빙 레인지 (연습장)', '클럽하우스 락커룸 & 샤워실', '프로샵 (용품점)', '클럽하우스 VIP 레스토랑', 'VIP 사우나 & 자쿠지'],
            description: '세계적인 골퍼 그렉 노먼이 설계한 해변 링크스 코스로, 바닷바람과 듄스 모래언덕이 어우러진 베트남 최고 명문 골프장입니다.'
          },
          {
            name: '몽고메리 링크스 CC (Montgomerie Links)',
            designer: '콜린 몽고메리 (Colin Montgomerie)',
            holes: 18,
            difficulty: '중상급',
            grassType: '패스팰럼 잔디 (Paspalum)',
            facilities: ['18홀 챔피언십 코스', '드라이빙 레인지 (연습장)', '클럽하우스 락커룸 & 샤워실', '클럽하우스 VIP 레스토랑'],
            description: '유러피언 투어의 전설 콜린 몽고메리가 설계한 스코틀랜드 정통 링크스 스타일 코스로 마블 마운틴을 배경으로 환상적인 뷰를 선사합니다.'
          },
          {
            name: '바나힐스 골프클럽 (Ba Na Hills Golf Club)',
            designer: '루크 도널드 (Luke Donald)',
            holes: 18,
            difficulty: '상급',
            grassType: '벤트그래스 & 버뮤다',
            facilities: ['18홀 챔피언십 코스', '야간 라이트 조명 시설', '드라이빙 레인지 (연습장)', 'VIP 사우나 & 자쿠지'],
            description: '바나산 기슭에 위치하여 시원한 산바람과 전 홀 나이트 라이트 시설을 갖춘 아시아 최고급 산악형 명문 챔피언십 코스입니다.'
          }
        ]
      };
      defaultItinerary = [
        {
          day: 1,
          title: '다낭 공항 도착 ➔ VIP 전용차량 미팅 ➔ 5성 골프 리조트 체크인 & 휴식',
          description: '공항 도착 후 전담 기사 미팅. 전용 VIP 차량 탑승 후 골프 리조트 이동, 웰컴 드링크 및 체크인 후 클럽하우스 만찬.',
          meal: '조식: 기내식 | 중식: 현지식 | 석식: 리조트 특식 만찬',
          hotel: '5성급 쉐라톤 그랜드 다낭 리조트',
          vehicle: 'VIP 단독 전용 리무진',
          attractions: ['다낭 공항', '리조트 체크인', '환영 만찬']
        },
        {
          day: 2,
          title: '1차전: 다낭 BRG 골프클럽 18홀 라운딩 ➔ VIP 전신 마사지',
          description: '리조트 조식 후 골프장 이동. 오전 18홀 티오프 라운딩. 클럽하우스 중식 후 90분 피로회복 VIP 전신 마사지 및 해산물 디너.',
          meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 특식 해산물 BBQ',
          hotel: '5성급 쉐라톤 그랜드 다낭 리조트',
          vehicle: 'VIP 단독 전용 리무진',
          attractions: ['BRG 골프클럽 (18홀)', 'VIP 전신 스파', '미케비치 씨푸드']
        },
        {
          day: 3,
          title: '2차전: 몽고메리 링크스 CC 18홀 라운딩 ➔ 호이안 야간 투어',
          description: '조식 후 몽고메리 링크스 18홀 라운딩. 라운딩 후 유네스코 고도 호이안 올드타운 이동하여 야경 감상 및 디너.',
          meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 호이안 고급 베트남식',
          hotel: '5성급 쉐라톤 그랜드 다낭 리조트',
          vehicle: 'VIP 단독 전용 리무진',
          attractions: ['몽고메리 링크스 (18홀)', '호이안 올드타운', '소원배 유등']
        },
        {
          day: 4,
          title: '3차전: 바나힐스 GC 18홀 파이널 라운딩 ➔ 체크아웃 & 공항 샌딩',
          description: '체크아웃 후 바나힐스 18홀 마무리 라운딩. 샤워 및 환복 후 롯데마트 쇼핑 후 공항 샌딩.',
          meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한식 특식',
          hotel: '귀국 (기내박)',
          vehicle: 'VIP 단독 전용 리무진',
          attractions: ['바나힐스 GC (18홀)', '롯데마트 쇼핑', '공항 샌딩']
        }
      ];
    } else if (category === '풀빌라') {
      defaultPriceKRW = 590000;
      defaultDuration = '1박 기준 (2박부터 연박 가능)';
      defaultTags = ['#독채풀빌라', '#에어비앤비스타일', '#프라이빗인피니티풀', '#오션뷰', '#가족풀빌라', '#바비큐시설'];
      defaultIncluded = [...VILLA_INCLUDED];
      defaultExcluded = [...VILLA_EXCLUDED];
      defaultTheme = '럭셔리 프라이빗 풀빌라 힐링 휴양';
      defaultVillaSpecs = {
        villaName: '다낭 미케비치 4베드룸 럭셔리 프라이빗 비치프론트 풀빌라',
        structureDescription: '지상 2층 독채 전체 + 전용 인피니티풀 + 넓은 거실 & 풀키친 다이닝룸',
        bedrooms: 4,
        bathrooms: 4,
        beds: '킹베드 3개 + 퀸베드 1개 + 싱글베드 2개',
        maxOccupancy: 12,
        standardOccupancy: 8,
        privatePool: true,
        oceanView: true,
        areaSqm: 380,
        areaPyeong: 115,
        floors: 2,
        address: '베트남 다낭시 응우한선구 보응우옌잡 해안도로 프라이빗 리조트 단지',
        googleMapUrl: 'https://maps.google.com/?q=My+Khe+Beach+Da+Nang',
        airbnbUrl: '',
        amenities: [
          '프라이빗 전용 수영장', '오션뷰 / 비치프론트', '풀 키친 (주방 조리시설)',
          '대형 냉장고 & 전자레인지', '야외 바비큐(BBQ) 시설', '세탁기 & 건조기',
          '초고속 무료 Wi-Fi', '스마트 TV (넷플릭스)', '최신 가라오케/노래방',
          '전용 사우나 / 자쿠지 욕조', '무료 조식 룸서비스', '24시간 리조트 보안', '프라이빗 정원 & 테라스'
        ],
        checkInTime: '15:00',
        checkOutTime: '11:00',
        houseRules: [
          '실내 절대 금연 (야외 테라스 및 정원에서 흡연 가능)',
          '심야 정숙 시간 (매너타임 22:00 ~ 08:00 준수)',
          '파티 및 대규모 모임 시 사전 협의 필요',
          '반려동물 동반 불가'
        ],
        securityDeposit: '체크인 시 2,000,000₫ (약 10만원) 또는 $100 예치 (체크아웃 시 시설 확인 후 전액 반환)',
        cleaningFeeIncluded: true,
        breakfastIncluded: true,
        hostLanguage: '한국어, 영어, 베트남어 지원 (24시간 카카오톡 실시간 상담)'
      };
      defaultItinerary = [
        {
          day: 1,
          title: '풀빌라 프라이빗 체크인 ➔ 웰컴 티 & 프라이빗 풀 수영 ➔ 야외 바비큐 파티',
          description: '체크인 후 전용 인피니티 풀에서 여유로운 수영 및 힐링. 저녁에는 야외 가든 테라스에서 가족/지인들과 프라이빗 BBQ 파티.',
          meal: '조식: - | 중식: 웰컴 과일 | 석식: 풀사이드 BBQ',
          hotel: '독채 프라이빗 풀빌라',
          vehicle: '전용 이동 차량',
          attractions: ['풀빌라 체크인', '인피니티 풀', '프라이빗 BBQ']
        },
        {
          day: 2,
          title: '플로팅 조식 ➔ 미케비치 해변 산책 ➔ 노래방 & 자쿠지 스파 힐링',
          description: '물 위에서 즐기는 인스타 감성 플로팅 조식. 해변 산책 후 빌라 내 노래방 음향 시설 및 자쿠지 사우나 힐링.',
          meal: '조식: 플로팅 조식 룸서비스 | 중식: 자유식 | 석식: 해산물 만찬',
          hotel: '독채 프라이빗 풀빌라',
          vehicle: '전용 이동 차량',
          attractions: ['플로팅 조식', '미케비치 해변', '전용 노래방 & 자쿠지']
        },
        {
          day: 3,
          title: '여유로운 모닝 커피 ➔ 체크아웃 ➔ 전용 차량 이동',
          description: '모닝 수영 및 커피 타임 후 11:00 체크아웃. 공항 또는 다음 여행지로 편안하게 이동.',
          meal: '조식: 빌라 조식 | 중식: 현지 미식 | 석식: -',
          hotel: '체크아웃',
          vehicle: '전용 이동 차량',
          attractions: ['모닝 수영', '체크아웃', '공항 이동']
        }
      ];
    } else {
      // 추천패키지
      defaultPriceKRW = 690000;
      defaultDuration = '3박 5일';
      defaultTags = ['#추천패키지', '#가족여행', '#효도여행', '#노쇼핑', '#단독차량', '#한국어가이드'];
      defaultIncluded = [...FREE_TOUR_INCLUDED];
      defaultExcluded = [...FREE_TOUR_EXCLUDED];
      defaultHighlights = ['다낭 바나힐 골든브릿지', '호이안 올드타운 유등', '미케비치', '5성급 호텔'];
      defaultItinerary = [
        {
          day: 1,
          title: '출발 및 현지 도착 ➔ 전담 가이드 미팅 ➔ 5성급 호텔 체크인',
          description: '공항 출국 수속 후 베트남 현지 공항 도착. 신짜오투어 전담 한국어 가이드 미팅 후 단독 전용 차량 탑승하여 호텔 이동 및 체크인.',
          meal: '조식: 기내식 | 중식: 현지식 | 석식: 웰컴 시푸드 만찬',
          hotel: '5성급 특급 호텔',
          vehicle: '16인승 단독 전용 리무진',
          attractions: ['공항 미팅', '호텔 체크인']
        },
        {
          day: 2,
          title: '바나힐 테마파크 & 골든브릿지 손동상 ➔ 마사지 힐링',
          description: '호텔 조식 후 바나힐 케이블카 탑승. 골든브릿지 관람 및 테마파크 자유 관광 후 90분 피로회복 스파 마사지.',
          meal: '조식: 호텔식 | 중식: 바나힐 뷔페 | 석식: 고급 분짜 & 스테이크',
          hotel: '5성급 특급 호텔',
          vehicle: '16인승 단독 전용 리무진',
          attractions: ['바나힐', '골든브릿지', '힐링 마사지']
        },
        {
          day: 3,
          title: '유네스코 고도 호이안 올드타운 ➔ 투본강 소원배 유등 체험',
          description: '호이안 고도 탐방, 전통 가옥 및 내원교 관람, 야간 투본강 소원배 탑승 및 야시장 자유 쇼핑.',
          meal: '조식: 호텔식 | 중식: 호이안 전통식 | 석식: 특식 모닝글로리',
          hotel: '5성급 특급 호텔',
          vehicle: '16인승 단독 전용 리무진',
          attractions: ['호이안 올드타운', '내원교', '소원배 유등']
        },
        {
          day: 4,
          title: '다낭 시내 관광 (대성당/영응사) ➔ 롯데마트 쇼핑 ➔ 공항 샌딩',
          description: '체크아웃 후 핑크 대성당, 영응사 해수관음상 관람 및 롯데마트 쇼핑 후 공항 샌딩.',
          meal: '조식: 호텔식 | 중식: 현지 쌀국수 | 석식: 해산물 BBQ',
          hotel: '귀국 (기내박)',
          vehicle: '16인승 단독 전용 리무진',
          attractions: ['다낭 대성당', '영응사', '롯데마트']
        }
      ];
    }

    const initialProd: Product = {
      id: newId,
      title: '',
      subTitle: '',
      category: category,
      region: '중부',
      city: '다낭',
      priceKRW: defaultPriceKRW,
      priceVND: Math.round(defaultPriceKRW * (rates.VND / rates.KRW)),
      duration: defaultDuration,
      imageUrl: '',
      additionalImages: [],
      rating: 5.0,
      reviewCount: 1,
      isPopular: true,
      isHotDeal: false,
      discountPercent: 0,
      departureCities: ['인천', '부산', '대구', '청주'],
      tags: defaultTags,
      description: '신짜오투어가 직접 기획하고 현지 직영 가이드가 전담 케어하는 베스트 맞춤 여행 상품입니다.',
      included: defaultIncluded,
      excluded: defaultExcluded,
      itinerary: defaultItinerary,
      villaSpecs: defaultVillaSpecs,
      golfSpecs: defaultGolfSpecs,
      highlights: defaultHighlights,
      vehicleInfo: defaultVehicleInfo,
      guideInfo: defaultGuideInfo,
      travelTheme: defaultTheme
    };

    setEditingProduct(initialProd);
    setEditorTab('basic');
    setIsEditorOpen(true);
  };

  // Open Editor to Edit Existing Product
  const handleEditProduct = (product: Product) => {
    // Deep clone to prevent direct state mutation before saving
    setEditingProduct(JSON.parse(JSON.stringify(product)));
    setEditorTab('basic');
    setIsEditorOpen(true);
  };

  // 1-Click Duplicate Product
  const handleDuplicateProduct = (product: Product) => {
    const cloned: Product = JSON.parse(JSON.stringify(product));
    cloned.id = `prod-${Date.now()}`;
    cloned.title = `[복사본] ${cloned.title}`;
    cloned.createdAt = new Date().toISOString();
    
    const updated = [cloned, ...products];
    onSaveProducts(updated);
    showNotification(`✨ "${cloned.title}" 상품이 성공적으로 복제되었습니다!`);
  };

  // Delete Product
  const handleDeleteProduct = (productId: string, productTitle: string) => {
    if (window.confirm(`정말로 "${productTitle}" 상품을 삭제하시겠습니까?\n삭제 후 복구하려면 백업 데이터를 불러와야 합니다.`)) {
      const updated = products.filter(p => p.id !== productId);
      onSaveProducts(updated);
      showNotification(`🗑️ 상품이 삭제되었습니다.`);
    }
  };

  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Save Product Changes
  const handleSaveProductChanges = async () => {
    if (!editingProduct) return;
    if (!editingProduct.title.trim()) {
      alert('상품명을 입력해 주세요.');
      setEditorTab('basic');
      return;
    }

    setIsSavingProduct(true);
    try {
      const exists = products.some(p => p.id === editingProduct.id);
      let updated: Product[];
      if (exists) {
        updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
      } else {
        updated = [editingProduct, ...products];
      }

      await onSaveProducts(updated);
      setIsEditorOpen(false);
      const savedTitle = editingProduct.title;
      setEditingProduct(null);
      showNotification(`💾 "${savedTitle}" 상품과 사진이 성공적으로 저장되었습니다!`);
    } catch (err) {
      console.error('Save error:', err);
      showNotification('⚠️ 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Process and upload files helper
  const processAndUploadFiles = async (
    files: File[],
    targetType: 'main' | 'gallery' = 'gallery'
  ) => {
    if (!files || files.length === 0 || !editingProduct) return;

    setIsUploadingImages(true);
    setUploadProgressText(`⚡ 사진 ${files.length}장 고화질 압축 및 최적화 중...`);

    try {
      // 1. Client-side parallel compression & optimization
      const imageFiles = files.filter(f => f.type.startsWith('image/'));
      if (imageFiles.length === 0) {
        showNotification('⚠️ 이미지 파일(JPG, PNG, WebP)만 선택해주세요.');
        return;
      }

      const optimizedResults = [];
      for (let i = 0; i < imageFiles.length; i++) {
        setUploadProgressText(`⚡ 이미지 최적화 중 (${i + 1}/${imageFiles.length})...`);
        const opt = await optimizeImageFile(imageFiles[i], 1920, 1440, 0.85);
        optimizedResults.push(opt);
      }

      setUploadProgressText('💾 이미지 저장 및 등록 중...');
      
      // 2. Upload to server or fallback smoothly to compressed data URL
      const finalUrls = await uploadImagesToServer(optimizedResults);

      if (finalUrls.length > 0) {
        setEditingProduct(prev => {
          if (!prev) return prev;
          
          const currentMain = prev.imageUrl || '';
          const hasSampleMain = isSampleUrl(currentMain);

          if (targetType === 'main') {
            // User explicitly clicked representative/main photo button
            const remaining = finalUrls.slice(1);
            return {
              ...prev,
              imageUrl: finalUrls[0],
              additionalImages: remaining.length > 0
                ? Array.from(new Set([...(prev.additionalImages || []), ...remaining]))
                : prev.additionalImages
            };
          } else {
            // Target is gallery or bulk upload
            const currentSubs = prev.additionalImages || [];
            
            // If current main image is empty OR is a sample photo, make the 1st uploaded photo the real main image!
            if (hasSampleMain && finalUrls.length > 0) {
              const newMain = finalUrls[0];
              const newSubs = finalUrls.slice(1);
              // Clean out old sample photos from additional images if any
              const cleanCurrentSubs = currentSubs.filter(u => !isSampleUrl(u));
              return {
                ...prev,
                imageUrl: newMain,
                additionalImages: Array.from(new Set([...cleanCurrentSubs, ...newSubs]))
              };
            }

            return {
              ...prev,
              additionalImages: Array.from(new Set([...currentSubs, ...finalUrls]))
            };
          }
        });

        showNotification(`📸 ${finalUrls.length}장의 사진이 성공적으로 등록되었습니다!`);
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      showNotification('⚠️ 이미지 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploadingImages(false);
      setUploadProgressText(null);
      if (mainImageInputRef.current) mainImageInputRef.current.value = '';
      if (galleryImageInputRef.current) galleryImageInputRef.current.value = '';
    }
  };

  // Main Image (Single) Upload
  const handleMainImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processAndUploadFiles(Array.from(files), 'main');
  };

  // Multi Image Gallery Upload
  const handleGalleryImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processAndUploadFiles(Array.from(files), 'gallery');
  };

  // Drag & Drop Handler
  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsPhotoDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processAndUploadFiles(Array.from(files), 'gallery');
    }
  };

  // Reorder Gallery Image
  const handleMoveGalleryImage = (index: number, direction: 'left' | 'right') => {
    setEditingProduct(prev => {
      if (!prev || !prev.additionalImages) return prev;
      const list = [...prev.additionalImages];
      const targetIndex = direction === 'left' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      
      return { ...prev, additionalImages: list };
    });
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xinchao_tour_products_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('📦 전체 상품 데이터가 JSON 파일로 다운로드되었습니다.');
  };

  // Import JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (window.confirm(`총 ${parsed.length}개의 상품 데이터를 가져오시겠습니까? 기존 상품 목록이 교체됩니다.`)) {
            onSaveProducts(parsed);
            showNotification(`🎉 ${parsed.length}개의 상품 데이터를 성공적으로 복원했습니다!`);
          }
        } else {
          alert('올바른 상품 JSON 파일이 아닙니다.');
        }
      } catch (err) {
        alert('JSON 파일 해석에 실패했습니다.');
      }
    };
    reader.readAsText(file as Blob);
    e.target.value = '';
  };

  // Clean all sample/demo photos across all products
  const handleCleanAllSamplePhotos = async () => {
    if (window.confirm('모든 상품에서 외부 데모 샘플 사진을 일괄 삭제하시겠습니까?\n\n직접 업로드하거나 등록하신 사진과 상품 정보(가격, 일정, 스펙)는 100% 안전하게 유지됩니다.')) {
      try {
        const res = await fetch('/api/products/clean-sample-photos', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (data.products) {
            await onSaveProducts(data.products);
            showNotification('🧹 전체 상품의 데모 샘플 사진이 일괄 삭제되었습니다! (내 사진만 유지)');
            return;
          }
        }
      } catch (err) {
        console.warn('API clean failed, falling back to local:', err);
      }
      
      const cleaned = products.map(p => {
        const isMainSample = isSampleUrl(p.imageUrl);
        const cleanSubs = (p.additionalImages || []).filter(u => Boolean(u) && !isSampleUrl(u));
        let newMain = p.imageUrl || '';
        if (isMainSample) {
          newMain = cleanSubs.length > 0 ? cleanSubs[0] : '';
        }
        return {
          ...p,
          imageUrl: newMain,
          additionalImages: isMainSample && cleanSubs.length > 0 ? cleanSubs.slice(1) : cleanSubs
        };
      });
      await onSaveProducts(cleaned);
      showNotification('🧹 전체 상품의 데모 샘플 사진이 일괄 삭제되었습니다! (내 사진만 유지)');
    }
  };

  // Reset to Factory Default Seed Products
  const handleResetToFactory = () => {
    if (window.confirm('정말로 모든 상품을 초기 공장 출고 샘플 데이터로 복구하시겠습니까?\n현재 작업 중인 내용은 덮어씌워집니다.')) {
      fetch('/api/products/reset', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.products) {
            onSaveProducts(data.products);
            showNotification('🔄 초기 샘플 데이터로 복구되었습니다.');
          }
        })
        .catch(() => {
          alert('초기화 요청 중 오류가 발생했습니다.');
        });
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = (inqId: string, newStatus: ConsultationRequest['status']) => {
    const updated = inquiries.map(i => i.id === inqId ? { ...i, status: newStatus } : i);
    onSaveInquiries(updated);
    // Sync to server
    fetch(`/api/inquiries/${inqId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(e => console.warn('Inquiry sync error:', e));
    showNotification('상담 처리 상태가 업데이트되었습니다.');
  };

  // Delete Inquiry
  const handleDeleteInquiry = (inqId: string) => {
    if (window.confirm('이 상담 문의 내역을 삭제하시겠습니까?')) {
      const updated = inquiries.filter(i => i.id !== inqId);
      onSaveInquiries(updated);
      showNotification('상담 문의 내역이 삭제되었습니다.');
    }
  };

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'pending' || !i.status).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      {/* Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/50 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-sm font-black">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Admin Top Sticky Navigation Bar */}
      <header className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-lg font-black text-white tracking-tight truncate">
                  신짜오투어 관리자
                </h1>
                <span className="bg-amber-400/20 text-amber-300 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md border border-amber-400/30 shrink-0">
                  CMS
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 hidden sm:block">
                상품 추가·수정·삭제, 실시간 환율 연동, 카테고리별 특화 스펙 및 고객 예약 문의 통합 관리
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Refresh Data button */}
            <button
              onClick={handleManualSync}
              disabled={isManualSyncing || isSyncing}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-amber-300 font-bold text-xs sm:text-xs border border-amber-400/30 transition-all cursor-pointer disabled:opacity-50"
              title="최신 상품 데이터 즉시 새로고침"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isManualSyncing || isSyncing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isManualSyncing || isSyncing ? '새로고침 중...' : '데이터 새로고침'}</span>
            </button>

            {/* View live store button */}
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span>손님 화면</span>
            </button>
          </div>
        </div>

        {/* Tab switcher: Products vs Inquiries */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-3 border-t border-slate-800/80 pt-1.5 pb-1.5 sm:pt-2 sm:pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setAdminTab('products')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all cursor-pointer ${
              adminTab === 'products'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>여행 상품 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all cursor-pointer ${
              adminTab === 'inquiries'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>고객 맞춤 상담/견적 ({inquiries.length})</span>
            {pendingInquiriesCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                {pendingInquiriesCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-4 sm:space-y-6">

        {/* =================================================================== */}
        {/* TAB 1: TRAVEL PRODUCTS MANAGEMENT                                   */}
        {/* =================================================================== */}
        {adminTab === 'products' && (
          <div className="space-y-5 sm:space-y-6">
            
            {/* Top Control Panel: Search, Category & Region Filter Tabs, View Modes */}
            <div className="bg-slate-800/90 border border-slate-700 p-4 sm:p-5 rounded-3xl shadow-xl space-y-4">
              
              {/* Row 1: Search & Quick Add & Backup Tools */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="상품명, 도시, 태그로 검색..."
                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-white placeholder-slate-500 focus:outline-hidden"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCreateNewProduct('추천패키지')}
                    className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>+ 새 여행상품 등록</span>
                  </button>

                  <button
                    onClick={handleCleanAllSamplePhotos}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm"
                    title="모든 상품에서 외부 Unsplash 샘플(데모) 사진을 일괄 삭제하고 내 사진만 유지합니다."
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>🧹 샘플 사진 일괄 삭제</span>
                  </button>

                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 p-1 rounded-xl">
                    <button
                      onClick={handleExportJSON}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="전체 상품 JSON 백업 다운로드"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <label 
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="JSON 백업 파일 복원"
                    >
                      <Upload className="w-4 h-4" />
                      <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                    </label>
                    <button
                      onClick={handleResetToFactory}
                      className="p-1.5 rounded-lg hover:bg-rose-900/60 text-slate-400 hover:text-rose-200 transition-colors"
                      title="초기 샘플 데이터로 리셋"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Category Filter Tabs (종류별 필터) */}
              <div className="space-y-1.5 pt-1 border-t border-slate-700/60">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-300 flex items-center gap-1">
                    <span>🏷️ 종류(카테고리)별 구분:</span>
                  </span>
                  <span className="text-[10px] text-slate-400">클릭하여 특정 종류만 필터링</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: '전체', label: '전체 종류', count: products.length, icon: '🌟' },
                    { id: '자유여행', label: '자유여행', count: products.filter(p => p.category === '자유여행').length, icon: '🏝️' },
                    { id: '풀빌라', label: '독채 풀빌라', count: products.filter(p => p.category === '풀빌라').length, icon: '🏰' },
                    { id: '골프투어', label: '골프투어', count: products.filter(p => p.category === '골프투어').length, icon: '⛳' },
                    { id: '추천패키지', label: '추천패키지', count: products.filter(p => p.category === '추천패키지').length, icon: '🎒' },
                  ].map(cat => {
                    const isSelected = filterCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFilterCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 shadow-md scale-102'
                            : 'bg-slate-900 hover:bg-slate-750 text-slate-300 border border-slate-700/80'
                        }`}
                      >
                        <span>{cat.icon} {cat.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-300'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Region Filter Tabs (지역별 필터) */}
              <div className="space-y-1.5 pt-1 border-t border-slate-700/60">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-teal-300 flex items-center gap-1">
                    <span>🗺️ 지역(권역)별 구분:</span>
                  </span>
                  <span className="text-[10px] text-slate-400">클릭하여 특정 지역만 필터링</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: '전체', label: '전체 지역', count: products.length, desc: '베트남 전역' },
                    { id: '북부', label: '🏔️ 북부', count: products.filter(p => p.region === '북부').length, desc: '하노이·사파·하롱베이·하장' },
                    { id: '중부', label: '🌊 중부', count: products.filter(p => p.region === '중부').length, desc: '다낭·호이안·나트랑·후에' },
                    { id: '남부', label: '🌴 남부', count: products.filter(p => p.region === '남부').length, desc: '푸꾸옥·달랏·호치민·붕따우' },
                  ].map(reg => {
                    const isSelected = filterRegion === reg.id;
                    return (
                      <button
                        key={reg.id}
                        onClick={() => setFilterRegion(reg.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-500 text-white shadow-md scale-102'
                            : 'bg-slate-900 hover:bg-slate-750 text-slate-300 border border-slate-700/80'
                        }`}
                        title={reg.desc}
                      >
                        <span>{reg.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-black/25 text-white' : 'bg-slate-800 text-teal-300'
                        }`}>
                          {reg.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: View Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-700/60">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                  <span>보기 방식 선택:</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode('category')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'category'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🗂️ 종류별 묶어보기</span>
                  </button>
                  <button
                    onClick={() => setViewMode('region')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'region'
                        ? 'bg-teal-500 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🗺️ 지역별 묶어보기</span>
                  </button>
                  <button
                    onClick={() => setViewMode('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'all'
                        ? 'bg-slate-700 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>📋 전체 목록</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Render Products based on View Mode */}
            {filteredProducts.length === 0 ? (
              <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-700 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-7 h-7" />
                </div>
                <p className="text-slate-300 font-bold text-base">선택한 조건에 맞는 여행 상품이 없습니다.</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setFilterCategory('전체');
                      setFilterRegion('전체');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs cursor-pointer"
                  >
                    필터 전체 초기화
                  </button>
                  <button
                    onClick={() => handleCreateNewProduct(filterCategory !== '전체' ? filterCategory as Category : '추천패키지')}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer"
                  >
                    + 이 카테고리로 새 상품 등록
                  </button>
                </div>
              </div>
            ) : viewMode === 'category' ? (
              /* ============================================================= */
              /* VIEW MODE 1: CATEGORY GROUPED                                */
              /* ============================================================= */
              <div className="space-y-6">
                {(['자유여행', '풀빌라', '골프투어', '추천패키지'] as Category[]).map((cat) => {
                  const catProducts = filteredProducts.filter(p => p.category === cat);
                  if (filterCategory !== '전체' && filterCategory !== cat) return null;
                  if (catProducts.length === 0 && filterCategory === '전체' && !searchTerm) return null;

                  const catIcons: Record<Category, string> = {
                    '자유여행': '🏝️',
                    '풀빌라': '🏰',
                    '골프투어': '⛳',
                    '추천패키지': '🎒'
                  };

                  const catSubtitles: Record<Category, string> = {
                    '자유여행': '개별 맞춤 자유일정, 단독차량 & 프라이빗 데이투어',
                    '풀빌라': '독채 프라이빗 풀빌라, 가족 & 단체 단독 휴양',
                    '골프투어': '명문 54홀/36홀 골프장, VIP 전용 골프패키지',
                    '추천패키지': '전담 가이드 & 단독 차량 포함 프리미엄 맞춤 패키지'
                  };

                  return (
                    <div key={cat} className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
                      {/* Category Group Header */}
                      <div className="px-5 py-4 bg-slate-850 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{catIcons[cat]}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-black text-white">
                                {cat} 상품
                              </h3>
                              <span className="text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                                {catProducts.length}개 상품
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">
                              {catSubtitles[cat]}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCreateNewProduct(cat)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>+ {cat} 상품 추가</span>
                        </button>
                      </div>

                      {/* Products inside this category */}
                      {catProducts.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs font-medium">
                          해당 조건에 맞는 {cat} 상품이 없습니다.
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-700/60">
                          {catProducts.map((prod) => {
                            const subPhotosCount = (prod.additionalImages?.length || 0) + (prod.imageUrl ? 1 : 0);
                            const liveVND = calculateVNDFromKRW(prod.priceKRW || 0, rates);

                            return (
                              <div
                                key={prod.id}
                                className="p-4 sm:p-5 hover:bg-slate-750/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                              >
                                {/* Left: Thumbnail & Info */}
                                <div className="flex items-start gap-4 min-w-0 flex-1">
                                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 overflow-hidden shrink-0 border border-slate-700 relative group">
                                    <img
                                      src={prod.imageUrl || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80'}
                                      alt={prod.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute bottom-1 right-1 bg-slate-950/80 text-[10px] text-white font-bold px-1.5 py-0.2 rounded-md backdrop-blur-xs">
                                      📸 {subPhotosCount}
                                    </span>
                                  </div>

                                  <div className="space-y-1.5 min-w-0 flex-1">
                                    {/* Badges */}
                                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                                      <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                        📍 {prod.region} · {prod.city}
                                      </span>

                                      <span className="bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                        ⏱️ {prod.duration}
                                      </span>

                                      {prod.isPopular && (
                                        <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black text-[10px]">
                                          👑 인기
                                        </span>
                                      )}
                                      {prod.isHotDeal && (
                                        <span className="bg-rose-500 text-white px-1.5 py-0.2 rounded font-black text-[10px]">
                                          🔥 특가
                                        </span>
                                      )}
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-black text-white text-sm sm:text-base truncate leading-snug">
                                      {prod.title}
                                    </h4>

                                    {/* Subtitle */}
                                    <p className="text-xs text-slate-400 truncate">
                                      {prod.subTitle || prod.description}
                                    </p>

                                    {/* Price & Specs */}
                                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                                      <span className="font-black text-amber-400 font-mono text-sm">
                                        ₩{(prod.priceKRW || 0).toLocaleString()}원
                                      </span>
                                      <span className="text-slate-400 text-[11px]">
                                        (약 {formatVND(liveVND)})
                                      </span>
                                      <span className="text-amber-400 flex items-center gap-0.5 text-[11px]">
                                        ★ {prod.rating || 4.9} ({prod.reviewCount || 0})
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right: Quick Action Buttons */}
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0 border-t md:border-t-0 border-slate-700/60 pt-3 md:pt-0 justify-end">
                                  <button
                                    onClick={() => onPreviewProduct(prod)}
                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                                    title="손님 화면에서 미리보기"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-teal-400" />
                                    <span>미리보기</span>
                                  </button>

                                  <button
                                    onClick={() => handleDuplicateProduct(prod)}
                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                                    title="상품 즉시 복제"
                                  >
                                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                                    <span>복제</span>
                                  </button>

                                  <button
                                    onClick={() => handleEditProduct(prod)}
                                    className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1 sm:gap-1.5 shadow-md transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>수정</span>
                                  </button>

                                  <button
                                    onClick={() => handleDeleteProduct(prod.id, prod.title)}
                                    className="p-1.5 sm:p-2 rounded-xl bg-slate-700/50 hover:bg-rose-600 active:scale-95 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                    title="상품 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : viewMode === 'region' ? (
              /* ============================================================= */
              /* VIEW MODE 2: REGION GROUPED                                  */
              /* ============================================================= */
              <div className="space-y-6">
                {(['북부', '중부', '남부'] as Region[]).map((reg) => {
                  const regProducts = filteredProducts.filter(p => p.region === reg);
                  if (filterRegion !== '전체' && filterRegion !== reg) return null;
                  if (regProducts.length === 0 && filterRegion === '전체' && !searchTerm) return null;

                  const regIcons: Record<string, string> = {
                    '전체': '🌟',
                    '북부': '🏔️',
                    '중부': '🌊',
                    '남부': '🌴'
                  };

                  const regCities: Record<string, string[]> = {
                    '전체': ['다낭', '하노이', '푸꾸옥', '나트랑'],
                    '북부': ['하노이', '사파', '하롱베이', '하장', '닌빈'],
                    '중부': ['다낭', '호이안', '나트랑', '후에'],
                    '남부': ['푸꾸옥', '달랏', '호치민', '붕따우']
                  };

                  return (
                    <div key={reg} className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
                      {/* Region Group Header */}
                      <div className="px-5 py-4 bg-slate-850 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{regIcons[reg]}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-black text-white">
                                {reg} 권역 상품
                              </h3>
                              <span className="text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                                {regProducts.length}개 상품
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {regCities[reg].map(city => (
                                <span key={city} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
                                  {city}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const newProd = handleCreateNewProduct('추천패키지');
                            // Region defaults to this region
                            setEditingProduct(prev => prev ? { ...prev, region: reg, city: regCities[reg][0] as City } : prev);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>+ {reg} 상품 추가</span>
                        </button>
                      </div>

                      {/* Products inside this region */}
                      {regProducts.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs font-medium">
                          해당 조건에 맞는 {reg} 상품이 없습니다.
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-700/60">
                          {regProducts.map((prod) => {
                            const subPhotosCount = (prod.additionalImages?.length || 0) + (prod.imageUrl ? 1 : 0);
                            const liveVND = calculateVNDFromKRW(prod.priceKRW || 0, rates);

                            return (
                              <div
                                key={prod.id}
                                className="p-4 sm:p-5 hover:bg-slate-750/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                              >
                                {/* Left: Thumbnail & Info */}
                                <div className="flex items-start gap-4 min-w-0 flex-1">
                                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 overflow-hidden shrink-0 border border-slate-700 relative group">
                                    <img
                                      src={prod.imageUrl || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80'}
                                      alt={prod.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute bottom-1 right-1 bg-slate-950/80 text-[10px] text-white font-bold px-1.5 py-0.2 rounded-md backdrop-blur-xs">
                                      📸 {subPhotosCount}
                                    </span>
                                  </div>

                                  <div className="space-y-1.5 min-w-0 flex-1">
                                    {/* Badges */}
                                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                                      <span className={`px-2 py-0.5 rounded-md font-black text-[11px] ${
                                        prod.category === '풀빌라' 
                                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                                          : prod.category === '골프투어'
                                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                      }`}>
                                        {prod.category}
                                      </span>

                                      <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                        🏙️ {prod.city}
                                      </span>

                                      <span className="bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                        ⏱️ {prod.duration}
                                      </span>

                                      {prod.isPopular && (
                                        <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black text-[10px]">
                                          👑 인기
                                        </span>
                                      )}
                                      {prod.isHotDeal && (
                                        <span className="bg-rose-500 text-white px-1.5 py-0.2 rounded font-black text-[10px]">
                                          🔥 특가
                                        </span>
                                      )}
                                    </div>

                                    {/* Title */}
                                    <h4 className="font-black text-white text-sm sm:text-base truncate leading-snug">
                                      {prod.title}
                                    </h4>

                                    {/* Subtitle */}
                                    <p className="text-xs text-slate-400 truncate">
                                      {prod.subTitle || prod.description}
                                    </p>

                                    {/* Price & Specs */}
                                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                                      <span className="font-black text-amber-400 font-mono text-sm">
                                        ₩{(prod.priceKRW || 0).toLocaleString()}원
                                      </span>
                                      <span className="text-slate-400 text-[11px]">
                                        (약 {formatVND(liveVND)})
                                      </span>
                                      <span className="text-amber-400 flex items-center gap-0.5 text-[11px]">
                                        ★ {prod.rating || 4.9} ({prod.reviewCount || 0})
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right: Quick Action Buttons */}
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0 border-t md:border-t-0 border-slate-700/60 pt-3 md:pt-0 justify-end">
                                  <button
                                    onClick={() => onPreviewProduct(prod)}
                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                                    title="손님 화면에서 미리보기"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-teal-400" />
                                    <span>미리보기</span>
                                  </button>

                                  <button
                                    onClick={() => handleDuplicateProduct(prod)}
                                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                                    title="상품 즉시 복제"
                                  >
                                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                                    <span>복제</span>
                                  </button>

                                  <button
                                    onClick={() => handleEditProduct(prod)}
                                    className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1 sm:gap-1.5 shadow-md transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    <span>수정</span>
                                  </button>

                                  <button
                                    onClick={() => handleDeleteProduct(prod.id, prod.title)}
                                    className="p-1.5 sm:p-2 rounded-xl bg-slate-700/50 hover:bg-rose-600 active:scale-95 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                    title="상품 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ============================================================= */
              /* VIEW MODE 3: ALL PRODUCTS FLAT LIST                          */
              /* ============================================================= */
              <div className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                  <h3 className="font-black text-white text-base flex items-center gap-2">
                    <span>전체 상품 목록</span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      {filteredProducts.length}개 표시 중
                    </span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    수정, 복제, 삭제 또는 미리보기를 선택하세요
                  </span>
                </div>

                <div className="divide-y divide-slate-700/60">
                  {filteredProducts.map((prod) => {
                    const subPhotosCount = (prod.additionalImages?.length || 0) + (prod.imageUrl ? 1 : 0);
                    const liveVND = calculateVNDFromKRW(prod.priceKRW || 0, rates);

                    return (
                      <div
                        key={prod.id}
                        className="p-4 sm:p-5 hover:bg-slate-750/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Left: Thumbnail & Info */}
                        <div className="flex items-start gap-4 min-w-0 flex-1">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 overflow-hidden shrink-0 border border-slate-700 relative group flex items-center justify-center">
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-850 flex flex-col items-center justify-center text-slate-500 gap-1 p-2 text-center">
                                <ImageIcon className="w-5 h-5 text-slate-600" />
                                <span className="text-[10px] font-bold">사진 없음</span>
                              </div>
                            )}
                            <span className="absolute bottom-1 right-1 bg-slate-950/80 text-[10px] text-white font-bold px-1.5 py-0.2 rounded-md backdrop-blur-xs">
                              📸 {subPhotosCount}
                            </span>
                          </div>

                          <div className="space-y-1.5 min-w-0 flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-1.5 text-xs">
                              <span className={`px-2 py-0.5 rounded-md font-black text-[11px] ${
                                prod.category === '풀빌라' 
                                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                                  : prod.category === '골프투어'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}>
                                {prod.category}
                              </span>

                              <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                {prod.region} · {prod.city}
                              </span>

                              <span className="bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                ⏱️ {prod.duration}
                              </span>

                              {isSampleUrl(prod.imageUrl) ? (
                                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-bold text-[10px]">
                                  ⚠️ 데모 샘플 사진
                                </span>
                              ) : prod.imageUrl ? (
                                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold text-[10px]">
                                  ✅ 등록 사진 ({subPhotosCount}장)
                                </span>
                              ) : (
                                <span className="bg-slate-700 text-slate-400 px-1.5 py-0.2 rounded font-medium text-[10px]">
                                  📷 사진 미등록
                                </span>
                              )}

                              {prod.isPopular && (
                                <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black text-[10px]">
                                  👑 인기
                                </span>
                              )}
                              {prod.isHotDeal && (
                                <span className="bg-rose-500 text-white px-1.5 py-0.2 rounded font-black text-[10px]">
                                  🔥 특가
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h4 className="font-black text-white text-sm sm:text-base truncate leading-snug">
                              {prod.title}
                            </h4>

                            {/* Subtitle */}
                            <p className="text-xs text-slate-400 truncate">
                              {prod.subTitle || prod.description}
                            </p>

                            {/* Price & Specs */}
                            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                              <span className="font-black text-amber-400 font-mono text-sm">
                                ₩{(prod.priceKRW || 0).toLocaleString()}원
                              </span>
                              <span className="text-slate-400 text-[11px]">
                                (약 {formatVND(liveVND)})
                              </span>
                              <span className="text-amber-400 flex items-center gap-0.5 text-[11px]">
                                ★ {prod.rating || 4.9} ({prod.reviewCount || 0})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Quick Action Buttons */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0 border-t md:border-t-0 border-slate-700/60 pt-3 md:pt-0 justify-end">
                          <button
                            onClick={() => onPreviewProduct(prod)}
                            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                            title="손님 화면에서 미리보기"
                          >
                            <Eye className="w-3.5 h-3.5 text-teal-400" />
                            <span>미리보기</span>
                          </button>

                          <button
                            onClick={() => handleDuplicateProduct(prod)}
                            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-bold text-xs flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                            title="상품 즉시 복제"
                          >
                            <Copy className="w-3.5 h-3.5 text-amber-400" />
                            <span>복제</span>
                          </button>

                          <button
                            onClick={() => handleEditProduct(prod)}
                            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1 sm:gap-1.5 shadow-md transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>수정</span>
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.title)}
                            className="p-1.5 sm:p-2 rounded-xl bg-slate-700/50 hover:bg-rose-600 active:scale-95 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="상품 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: INQUIRIES & CONSULTATIONS (CRM)                              */}
        {/* =================================================================== */}
        {adminTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-black text-lg text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <span>고객 맞춤 상담 및 견적 신청 접수 내역</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  고객들이 남긴 상담 요청을 실시간으로 확인하고 진행 상태(대기/상담중/확정/완료)를 관리하세요.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={COMPANY_PHONE_TEL}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>고객 센터 {COMPANY_PHONE}</span>
                </a>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-slate-800/60 border border-slate-700 p-12 text-center rounded-3xl space-y-3">
                <CheckCircle2 className="w-12 h-12 text-slate-500 mx-auto" />
                <h4 className="text-slate-300 font-bold text-base">접수된 상담 문의가 없습니다.</h4>
                <p className="text-xs text-slate-500">손님들이 견적 신청을 남기면 이곳에 자동으로 실시간 등록됩니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {inquiries.map((inq) => {
                  const statusColors = {
                    pending: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                    in_progress: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
                    confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                    completed: 'bg-slate-600 text-slate-200 border-slate-500',
                    cancelled: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
                  };

                  const statusLabels = {
                    pending: '⏳ 접수 대기',
                    in_progress: '📞 상담 진행중',
                    confirmed: '✅ 예약 확정',
                    completed: '🎉 여행 완료',
                    cancelled: '❌ 취소됨',
                  };

                  return (
                    <div
                      key={inq.id}
                      className="bg-slate-800 border border-slate-700 p-5 rounded-3xl shadow-lg space-y-4 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-white text-base">
                            {inq.userName} 님
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${statusColors[inq.status || 'pending']}`}>
                            {statusLabels[inq.status || 'pending']}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(inq.createdAt).toLocaleString('ko-KR')}
                          </span>
                        </div>

                        {/* Status Change Selector */}
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-400 font-bold">상태 변경:</label>
                          <select
                            value={inq.status || 'pending'}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-slate-900 border border-slate-600 text-xs font-bold text-white rounded-xl px-2.5 py-1.5 focus:outline-hidden"
                          >
                            <option value="pending">⏳ 접수 대기</option>
                            <option value="in_progress">📞 상담 진행중</option>
                            <option value="confirmed">✅ 예약 확정</option>
                            <option value="completed">🎉 여행 완료</option>
                            <option value="cancelled">❌ 취소</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                            title="문의 내역 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Contact Info & Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60">
                        <div>
                          <span className="text-slate-400 block font-medium">연락처</span>
                          <a href={`tel:${inq.userPhone}`} className="text-amber-300 font-black hover:underline text-sm flex items-center gap-1 mt-0.5">
                            <Phone className="w-3.5 h-3.5" />
                            {inq.userPhone}
                          </a>
                        </div>

                        <div>
                          <span className="text-slate-400 block font-medium">카카오톡 ID</span>
                          <span className="text-white font-bold block mt-0.5">
                            {inq.kakaoId || '미입력'}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 block font-medium">여행 희망 일정 / 인원</span>
                          <span className="text-white font-bold block mt-0.5">
                            📅 {inq.startDate || '미정'} | 👥 성인 {inq.travelerCount?.adult || 2}명 / 아동 {inq.travelerCount?.child || 0}명
                          </span>
                        </div>
                      </div>

                      {/* Product or Preferences */}
                      {(inq.productTitle || inq.regionPreference || inq.categoryPreference) && (
                        <div className="text-xs text-slate-300 bg-slate-750 px-4 py-2.5 rounded-xl border border-slate-700">
                          <strong className="text-teal-400">관심 여행 상품/지역: </strong>
                          {inq.productTitle || `${inq.regionPreference || ''} ${inq.categoryPreference || ''}`}
                        </div>
                      )}

                      {/* User Message */}
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-slate-400">고객 요청 사항:</span>
                        <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                          {inq.message || '상담 요청 사항이 없습니다.'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =================================================================== */}
      {/* FULL PRODUCT EDITOR MODAL / DRAWER                                 */}
      {/* =================================================================== */}
      {isEditorOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-slate-900 border-t sm:border border-slate-700 rounded-t-3xl sm:rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col h-[96vh] sm:h-auto sm:max-h-[94vh] animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-slate-950 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-lg font-black text-white truncate">
                    {editingProduct.title ? `[수정] ${editingProduct.title}` : '✨ 새 여행 상품 등록'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 hidden sm:block">
                    카테고리별 특화 스펙과 실시간 환율을 설정하여 손님들이 한눈에 볼 수 있도록 구성하세요.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={handleSaveProductChanges}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>저장</span>
                </button>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editor Tab Navigation */}
            <div className="bg-slate-950/90 px-3 sm:px-6 py-2 border-b border-slate-800 overflow-x-auto scrollbar-none flex items-center gap-1.5 sm:gap-2 shrink-0">
              {[
                { id: 'basic', label: '1. 기본정보', icon: <Info className="w-3.5 h-3.5" /> },
                { id: 'pricing', label: '2. 가격&환율', icon: <DollarSign className="w-3.5 h-3.5" /> },
                { id: 'photos', label: '3. 사진&갤러리', icon: <ImageIcon className="w-3.5 h-3.5" /> },
                { 
                  id: 'specs', 
                  label: editingProduct.category === '풀빌라' 
                    ? '4. 🏰 에어비앤비 풀빌라스펙' 
                    : editingProduct.category === '골프투어' 
                    ? '4. ⛳ Stay&Play 골프스펙' 
                    : '4. 🧭 여행사 맞춤구성 (관광/차량/가이드)', 
                  icon: <Home className="w-3.5 h-3.5" /> 
                },
                { id: 'itinerary', label: '5. 여행일정표', icon: <Calendar className="w-3.5 h-3.5" /> },
                { id: 'terms', label: '6. 포함/불포함', icon: <FileText className="w-3.5 h-3.5" /> },
              ].map((tab) => {
                const isActive = editorTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setEditorTab(tab.id as any)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-black flex items-center gap-1 sm:gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 text-xs sm:text-sm">

              {/* ============================================================= */}
              {/* TAB 1: BASIC INFO                                             */}
              {/* ============================================================= */}
              {editorTab === 'basic' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Visual Category Selector */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-200 block text-xs sm:text-sm">
                      🏷️ 1. 상품 종류 (카테고리) 선택 *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: '자유여행', label: '자유여행', icon: '🏝️', desc: '단독차량 & 자유일정' },
                        { id: '풀빌라', label: '독채 풀빌라', icon: '🏰', desc: '프라이빗 풀 & 휴양' },
                        { id: '골프투어', label: '골프투어', icon: '⛳', desc: '54홀 명문 코스 & 라운딩' },
                        { id: '추천패키지', label: '추천패키지', icon: '🎒', desc: '전담가이드 풀케어' },
                      ].map(cat => {
                        const isSelected = editingProduct.category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              const newCat = cat.id as Category;
                              setEditingProduct(prev => {
                                if (!prev) return prev;
                                const updated = { ...prev, category: newCat };
                                if (newCat === '풀빌라' && !updated.villaSpecs) {
                                  updated.villaSpecs = {
                                    bedrooms: 3,
                                    bathrooms: 3,
                                    maxOccupancy: 8,
                                    standardOccupancy: 6,
                                    privatePool: true,
                                    oceanView: true,
                                    areaSqm: 280,
                                    amenities: ['프라이빗 전용 수영장', '오션뷰 / 비치프론트', '풀 키친']
                                  };
                                } else if (newCat === '골프투어' && !updated.golfSpecs) {
                                  updated.golfSpecs = {
                                    holes: 54,
                                    greenFeeIncluded: true,
                                    caddieFeeIncluded: true,
                                    cartIncluded: true,
                                    golfCourseNames: ['다낭 BRG 골프클럽']
                                  };
                                }
                                return updated;
                              });
                            }}
                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-amber-400/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/40'
                                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xl">{cat.icon}</span>
                              {isSelected && <span className="text-xs bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">선택됨</span>}
                            </div>
                            <div>
                              <span className="font-black block text-xs sm:text-sm text-white">{cat.label}</span>
                              <span className="text-[11px] text-slate-400 line-clamp-1">{cat.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visual Region & City Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    {/* Region */}
                    <div className="space-y-2">
                      <label className="font-bold text-teal-300 block text-xs">
                        🗺️ 2. 여행 권역 (지역) 선택 *
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: '북부', label: '🏔️ 북부', desc: '하노이/사파' },
                          { id: '중부', label: '🌊 중부', desc: '다낭/호이안' },
                          { id: '남부', label: '🌴 남부', desc: '푸꾸옥/달랏' },
                        ].map(reg => {
                          const isSelected = editingProduct.region === reg.id;
                          return (
                            <button
                              key={reg.id}
                              type="button"
                              onClick={() => {
                                const newReg = reg.id as Region;
                                let defCity: City = '다낭';
                                if (newReg === '북부') defCity = '하노이';
                                if (newReg === '남부') defCity = '푸꾸옥';
                                setEditingProduct(prev => prev ? { ...prev, region: newReg, city: defCity } : prev);
                              }}
                              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-teal-500/20 border-teal-400 text-teal-200 ring-1 ring-teal-400'
                                  : 'bg-slate-900 border-slate-750 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <span className="font-black block text-xs text-white">{reg.label}</span>
                              <span className="text-[10px] text-slate-400 block">{reg.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label className="font-bold text-teal-300 block text-xs">
                        🏙️ 3. 대표 도시 선택 *
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {(editingProduct.region === '중부' ? ['다낭', '호이안', '나트랑', '후에'] :
                          editingProduct.region === '북부' ? ['하노이', '하롱베이', '사파', '닌빈'] :
                          ['푸꾸옥', '달랏', '호치민', '붕따우']
                        ).map((cityName) => {
                          const isSelected = editingProduct.city === cityName;
                          return (
                            <button
                              key={cityName}
                              type="button"
                              onClick={() => setEditingProduct(prev => prev ? { ...prev, city: cityName as City } : prev)}
                              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-750'
                              }`}
                            >
                              {cityName}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                    {/* Duration */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300 block">여행 기간 (예: 3박 5일) *</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingProduct.duration}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, duration: e.target.value } : prev)}
                          placeholder="3박 5일"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-hidden focus:border-amber-400"
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['3박 5일', '4박 6일', '3박 4일', '4박 5일', '당일 투어'].map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setEditingProduct(prev => prev ? { ...prev, duration: dur } : prev)}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                          >
                            {dur}
                          </button>
                        ))}
                      </div>
                    </div>

                  {/* Product Title */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">
                      상품명 (고객에게 가장 크게 노출되는 타이틀) *
                    </label>
                    <input
                      type="text"
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, title: e.target.value } : prev)}
                      placeholder="예: [다낭/호이안] 바나힐 골든브릿지 & 미케비치 럭셔리 힐링 3박 5일"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 font-black text-white text-base focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">
                      부제목 / 한 줄 핵심 요약
                    </label>
                    <input
                      type="text"
                      value={editingProduct.subTitle}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, subTitle: e.target.value } : prev)}
                      placeholder="예: 5성급 오션뷰 리조트 숙박 + 단독 전용차량 + 한국어 가이드 올인클루시브"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 font-medium text-slate-200 focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  {/* Badges & Rating */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <span className="font-bold text-slate-300 block">노출 배지 및 평점 설정</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <label className="flex items-center gap-2.5 cursor-pointer bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <input
                          type="checkbox"
                          checked={Boolean(editingProduct.isPopular)}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, isPopular: e.target.checked } : prev)}
                          className="w-4 h-4 rounded text-amber-400 focus:ring-0"
                        />
                        <span className="font-bold text-white">👑 베스트 인기 상품</span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <input
                          type="checkbox"
                          checked={Boolean(editingProduct.isHotDeal)}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, isHotDeal: e.target.checked } : prev)}
                          className="w-4 h-4 rounded text-rose-500 focus:ring-0"
                        />
                        <span className="font-bold text-white">🔥 초특가 핫딜 상품</span>
                      </label>

                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="font-bold text-slate-300">할인율 (%):</span>
                        <input
                          type="number"
                          min="0"
                          max="80"
                          value={editingProduct.discountPercent || 0}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, discountPercent: Number(e.target.value) } : prev)}
                          className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-slate-400 block mb-1">고객 평점 (★)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={editingProduct.rating || 4.9}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, rating: Number(e.target.value) } : prev)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 block mb-1">누적 리뷰 수</label>
                        <input
                          type="number"
                          value={editingProduct.reviewCount || 0}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, reviewCount: Number(e.target.value) } : prev)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-300 block">해시태그 설정</label>
                    <div className="flex flex-wrap gap-1.5 pb-2">
                      {(editingProduct.tags || []).map((t, idx) => (
                        <span key={idx} className="bg-teal-900/60 text-teal-300 border border-teal-700 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
                          <span>{t}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prev => prev ? {
                                ...prev,
                                tags: prev.tags.filter((_, i) => i !== idx)
                              } : prev);
                            }}
                            className="hover:text-rose-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customTagInput}
                        onChange={(e) => setCustomTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (customTagInput.trim()) {
                              const tag = customTagInput.startsWith('#') ? customTagInput.trim() : `#${customTagInput.trim()}`;
                              setEditingProduct(prev => prev ? { ...prev, tags: [...prev.tags, tag] } : prev);
                              setCustomTagInput('');
                            }
                          }
                        }}
                        placeholder="태그 직접 입력 후 Enter..."
                        className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden w-64"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      <span className="text-[11px] text-slate-500 font-bold self-center">추천 태그 클릭 추가:</span>
                      {POPULAR_TAGS.map((pt) => (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => {
                            if (!editingProduct.tags.includes(pt)) {
                              setEditingProduct(prev => prev ? { ...prev, tags: [...prev.tags, pt] } : prev);
                            }
                          }}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                        >
                          +{pt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 2: PRICING & EXCHANGE RATE                                */}
              {/* ============================================================= */}
              {editorTab === 'pricing' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-black text-white text-base">실시간 환율 연동 상품 가격 책정</h4>
                        <p className="text-xs text-slate-400">한국 원화(KRW)를 입력하면 실시간 환율로 베트남 동(VND)이 자동 계산됩니다.</p>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                        1,000원 ≒ 약 {Math.round((1000 / (rates.KRW || 1350)) * (rates.VND || 25200)).toLocaleString()} ₫
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-bold text-slate-300 block">
                          기본 상품 가격 (한국 원화 KRW) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="10000"
                            value={editingProduct.priceKRW || 0}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              const autoVND = calculateVNDFromKRW(val, rates);
                              setEditingProduct(prev => prev ? { ...prev, priceKRW: val, priceVND: autoVND } : prev);
                            }}
                            className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3.5 text-lg font-black text-white focus:outline-hidden pr-12"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            원
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {[390000, 590000, 790000, 990000, 1290000, 1590000].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => {
                                const autoVND = calculateVNDFromKRW(p, rates);
                                setEditingProduct(prev => prev ? { ...prev, priceKRW: p, priceVND: autoVND } : prev);
                              }}
                              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            >
                              ₩{(p / 10000).toLocaleString()}만원
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-bold text-slate-300 block">
                          환산된 베트남 동 가격 (VND)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="100000"
                            value={editingProduct.priceVND || calculateVNDFromKRW(editingProduct.priceKRW || 0, rates)}
                            onChange={(e) => {
                              const vVal = Number(e.target.value);
                              const autoKRW = calculateKRWFromVND(vVal, rates);
                              setEditingProduct(prev => prev ? { ...prev, priceVND: vVal, priceKRW: autoKRW } : prev);
                            }}
                            className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3.5 text-lg font-black text-amber-400 focus:outline-hidden pr-12 font-mono"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            ₫ (동)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          표시 가격: 약 {formatVND(editingProduct.priceVND || calculateVNDFromKRW(editingProduct.priceKRW || 0, rates))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 3: PHOTOS & GALLERY                                       */}
              {/* ============================================================= */}
              {editorTab === 'photos' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Hidden File Inputs */}
                  <input
                    ref={galleryImageInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleGalleryImagesUpload}
                    className="hidden"
                    disabled={isUploadingImages}
                  />
                  <input
                    ref={mainImageInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleMainImageFileUpload}
                    className="hidden"
                    disabled={isUploadingImages}
                  />

                  {/* 1. Main Representative Thumbnail Preview Banner */}
                  <div className="bg-slate-950 p-5 sm:p-6 rounded-3xl border-2 border-amber-400/80 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          <h3 className="text-sm sm:text-base font-black text-white">
                            👑 상품 대표 메인 썸네일 (메인 화면 & 카드에 노출되는 사진)
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          고객이 메인 화면 및 검색 결과에서 가장 먼저 보게 되는 대표 사진입니다.
                        </p>
                      </div>

                      {editingProduct.imageUrl && isSampleUrl(editingProduct.imageUrl) ? (
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-black inline-flex items-center gap-1.5 w-fit">
                          <span>⚠️ 샘플 사진 적용됨 (내 사진으로 교체 권장)</span>
                        </span>
                      ) : editingProduct.imageUrl ? (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-black inline-flex items-center gap-1.5 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>내 사진 등록 완료</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full text-xs font-black inline-flex items-center gap-1.5 w-fit">
                          <span>❗ 대표 사진 미등록</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      {/* Main Image Box */}
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 md:col-span-1 shadow-inner group">
                        {editingProduct.imageUrl ? (
                          <>
                            <img
                              src={editingProduct.imageUrl}
                              alt="대표 사진"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                              <button
                                type="button"
                                onClick={() => mainImageInputRef.current?.click()}
                                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1 cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>대표 사진 교체</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2 p-4 text-center">
                            <ImageIcon className="w-8 h-8 text-slate-600" />
                            <span className="text-xs font-bold">대표 사진 없음</span>
                          </div>
                        )}
                      </div>

                      {/* Main Image Actions & Cleaners */}
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => mainImageInputRef.current?.click()}
                            disabled={isUploadingImages}
                            className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs shadow-lg shadow-amber-900/30 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                          >
                            <Star className="w-4 h-4 fill-slate-950" />
                            <span>📸 내 기기에서 대표 사진 등록/교체</span>
                          </button>

                          {/* Clean Sample Photos Button */}
                          {(isSampleUrl(editingProduct.imageUrl) || (editingProduct.additionalImages || []).some(u => isSampleUrl(u))) && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct(prev => {
                                  if (!prev) return prev;
                                  const realSubs = (prev.additionalImages || []).filter(u => !isSampleUrl(u));
                                  let newMain = prev.imageUrl;
                                  if (isSampleUrl(newMain)) {
                                    newMain = realSubs.length > 0 ? realSubs[0] : '';
                                  }
                                  const finalSubs = isSampleUrl(prev.imageUrl) && realSubs.length > 0
                                    ? realSubs.slice(1)
                                    : realSubs;
                                  return {
                                    ...prev,
                                    imageUrl: newMain,
                                    additionalImages: finalSubs
                                  };
                                });
                                showNotification('🧹 샘플 사진이 모두 정리되었습니다!');
                              }}
                              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                              <span>기존 샘플 사진 모두 지우기</span>
                            </button>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          💡 <strong>꿀팁:</strong> 아래 사진 목록에서 원하는 사진의 <strong className="text-amber-300">[⭐ 대표로 지정]</strong> 버튼을 누르면 언제든지 대표 메인 썸네일로 즉시 변경됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Drag & Drop & Upload Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsPhotoDragOver(true);
                    }}
                    onDragLeave={() => setIsPhotoDragOver(false)}
                    onDrop={handlePhotoDrop}
                    className={`relative rounded-3xl border-2 border-dashed p-6 sm:p-8 text-center transition-all ${
                      isPhotoDragOver
                        ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                        : 'border-slate-700 bg-slate-950/90 hover:border-teal-500/80 hover:bg-slate-950'
                    }`}
                  >
                    <div className="max-w-xl mx-auto space-y-4">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                        {isUploadingImages ? (
                          <Loader2 className="w-7 h-7 animate-spin text-amber-400" />
                        ) : (
                          <Upload className="w-7 h-7" />
                        )}
                      </div>

                      <div>
                        <h4 className="text-base font-black text-white">
                          내 컴퓨터 및 스마트폰 사진 업로드
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          기기에 있는 사진을 <strong>선택하거나 끌어다 놓으세요.</strong><br />
                          <span className="text-teal-400 font-bold text-[11px]">✨ 자동 고화질 압축 및 최적화가 적용되어 초고속으로 등록 및 저장됩니다. (JPG, PNG, WebP 지원)</span>
                        </p>
                      </div>

                      {/* Upload Action Buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => galleryImageInputRef.current?.click()}
                          disabled={isUploadingImages}
                          className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-900/30 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                        >
                          <FolderOpen className="w-4 h-4" />
                          <span>📁 갤러리 & 사진 추가 (여러 장 한꺼번에 선택 가능)</span>
                        </button>
                      </div>

                      {/* Loading Progress Feedback */}
                      {isUploadingImages && uploadProgressText && (
                        <div className="mt-4 p-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center gap-2.5 animate-pulse">
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                          <span className="text-xs font-bold text-amber-300">
                            {uploadProgressText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Registered Photos List & Gallery Arrangement */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
                        <span>현재 등록된 사진 목록</span>
                        <span className="text-xs bg-slate-800 text-amber-400 px-2.5 py-0.5 rounded-full font-black border border-slate-700">
                          총 {(editingProduct.additionalImages?.length || 0) + (editingProduct.imageUrl ? 1 : 0)}장
                        </span>
                      </span>
                      <span className="text-[11px] text-slate-500 hidden sm:inline">
                        마우스 오버 시 대표 사진 지정, 순서 이동, 삭제가 가능합니다.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                      {/* Main Thumbnail Card */}
                      {editingProduct.imageUrl && (
                        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-400 aspect-video group shadow-lg">
                          <img 
                            src={editingProduct.imageUrl} 
                            alt="대표 메인 사진" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                          <div className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                            <Star className="w-3 h-3 fill-slate-950" />
                            <span>대표 메인</span>
                          </div>
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                            <button
                              type="button"
                              onClick={() => mainImageInputRef.current?.click()}
                              className="px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black flex items-center gap-1 cursor-pointer"
                              title="대표 사진 변경"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>사진 교체</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct(prev => {
                                  if (!prev) return prev;
                                  const subs = prev.additionalImages || [];
                                  const newMain = subs.length > 0 ? subs[0] : '';
                                  return {
                                    ...prev,
                                    imageUrl: newMain,
                                    additionalImages: subs.slice(1)
                                  };
                                });
                              }}
                              className="p-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                              title="대표 사진 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Additional Gallery Photos */}
                      {(editingProduct.additionalImages || []).map((url, sIdx) => (
                        <div key={sIdx} className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 hover:border-slate-500 aspect-video group shadow-md">
                          <img 
                            src={url} 
                            alt={`갤러리 사진 ${sIdx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                          <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            #{sIdx + 1}
                          </span>

                          <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                            {/* Top action row */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                {sIdx > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => handleMoveGalleryImage(sIdx, 'left')}
                                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                                    title="앞으로 이동"
                                  >
                                    <ArrowLeft className="w-3 h-3" />
                                  </button>
                                )}
                                {sIdx < (editingProduct.additionalImages?.length || 0) - 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleMoveGalleryImage(sIdx, 'right')}
                                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                                    title="뒤로 이동"
                                  >
                                    <ArrowLeft className="w-3 h-3 rotate-180" />
                                  </button>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    additionalImages: (prev.additionalImages || []).filter((_, i) => i !== sIdx)
                                  } : prev);
                                }}
                                className="p-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                                title="사진 삭제"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Bottom action: Promote to Main */}
                            <button
                              type="button"
                              onClick={() => {
                                const oldMain = editingProduct.imageUrl;
                                setEditingProduct(prev => {
                                  if (!prev) return prev;
                                  const filtered = (prev.additionalImages || []).filter((_, i) => i !== sIdx);
                                  const newSubs = oldMain && !isSampleUrl(oldMain)
                                    ? [oldMain, ...filtered]
                                    : filtered;
                                  return {
                                    ...prev,
                                    imageUrl: url,
                                    additionalImages: newSubs.filter(Boolean)
                                  };
                                });
                                showNotification('👑 대표 메인 사진으로 지정되었습니다.');
                              }}
                              className="w-full py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            >
                              <Star className="w-3 h-3 fill-slate-950" />
                              <span>대표로 지정</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Quick Add Card at the end */}
                      <button
                        type="button"
                        onClick={() => galleryImageInputRef.current?.click()}
                        className="rounded-2xl border border-dashed border-slate-700 hover:border-teal-400 bg-slate-950/60 hover:bg-teal-950/30 aspect-video flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-teal-300 transition-all cursor-pointer group"
                      >
                        <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold">+ 사진 추가</span>
                      </button>
                    </div>
                  </div>

                  {/* 4. 1-Click High Quality Presets */}
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <span className="font-bold text-slate-300 block text-xs">
                      ✨ 고화질 베트남 프리셋 사진 원클릭 추가
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
                      {PRESET_PHOTOS.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setEditingProduct(prev => {
                              if (!prev) return prev;
                              if (!prev.imageUrl) return { ...prev, imageUrl: item.url };
                              const subs = prev.additionalImages || [];
                              if (!subs.includes(item.url)) {
                                return { ...prev, additionalImages: [...subs, item.url] };
                              }
                              return prev;
                            });
                            showNotification(`📸 "${item.label}" 사진이 추가되었습니다.`);
                          }}
                          className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all aspect-video shadow-sm"
                        >
                          <img src={item.url} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-bold text-white leading-tight truncate">{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 4: CATEGORY-SPECIFIC SPECS (VILLA / GOLF / GENERAL)       */}
              {/* ============================================================= */}
              {editorTab === 'specs' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* ========================================================= */}
                  {/* 4-A: IF VILLA CATEGORY (AIRBNB STYLE)                     */}
                  {/* ========================================================= */}
                  {editingProduct.category === '풀빌라' && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-teal-950/60 to-slate-950 border-2 border-teal-500/50 p-5 sm:p-6 rounded-3xl space-y-6 shadow-xl">
                        
                        {/* Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-800/60 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🏰</span>
                              <h4 className="font-black text-teal-300 text-lg">
                                에어비앤비(Airbnb) 스타일 프리미엄 풀빌라 스펙
                              </h4>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">
                              객실 구조, 침실/욕실/침대 구성, 전용 면적 및 에어비앤비 하우스 룰을 상세히 기재하세요.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prev => prev ? {
                                ...prev,
                                duration: '1박 기준 (2박부터 연박 가능)',
                                villaSpecs: {
                                  villaName: prev.title || '다낭 미케비치 4베드룸 럭셔리 프라이빗 비치프론트 풀빌라',
                                  structureDescription: '지상 2층 독채 전체 + 전용 인피니티풀 + 넓은 거실 & 풀키친 다이닝룸',
                                  bedrooms: 4,
                                  bathrooms: 4,
                                  beds: '킹베드 3개 + 퀸베드 1개 + 싱글베드 2개',
                                  maxOccupancy: 12,
                                  standardOccupancy: 8,
                                  privatePool: true,
                                  oceanView: true,
                                  areaSqm: 380,
                                  areaPyeong: 115,
                                  floors: 2,
                                  address: '베트남 다낭시 응우한선구 보응우옌잡 해안도로 프라이빗 리조트 단지',
                                  googleMapUrl: 'https://maps.google.com/?q=My+Khe+Beach+Da+Nang',
                                  airbnbUrl: '',
                                  amenities: [
                                    '프라이빗 전용 수영장', '오션뷰 / 비치프론트', '풀 키친 (주방 조리시설)',
                                    '대형 냉장고 & 전자레인지', '야외 바비큐(BBQ) 시설', '세탁기 & 건조기',
                                    '초고속 무료 Wi-Fi', '스마트 TV (넷플릭스)', '최신 가라오케/노래방',
                                    '전용 사우나 / 자쿠지 욕조', '무료 조식 룸서비스', '24시간 리조트 보안', '프라이빗 정원 & 테라스'
                                  ],
                                  checkInTime: '15:00',
                                  checkOutTime: '11:00',
                                  houseRules: [
                                    '실내 절대 금연 (야외 테라스 및 정원에서 흡연 가능)',
                                    '심야 정숙 시간 (매너타임 22:00 ~ 08:00 준수)',
                                    '파티 및 대규모 모임 시 사전 협의 필요',
                                    '반려동물 동반 불가'
                                  ],
                                  securityDeposit: '체크인 시 2,000,000₫ (약 10만원) 또는 $100 예치 (체크아웃 시 시설 확인 후 전액 반환)',
                                  cleaningFeeIncluded: true,
                                  breakfastIncluded: true,
                                  hostLanguage: '한국어, 영어, 베트남어 지원 (24시간 카카오톡 실시간 상담)'
                                }
                              } : prev);
                              showNotification('✨ 에어비앤비 풀빌라 표준 스펙이 자동 입력되었습니다.');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>풀빌라 표준양식 자동완성</span>
                          </button>
                        </div>

                        {/* Villa Name & Structure */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-200 block mb-1">
                              빌라 정식 명칭 (Villa Name)
                            </label>
                            <input
                              type="text"
                              value={editingProduct.villaSpecs?.villaName || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true }), villaName: v }
                                } : prev);
                              }}
                              placeholder="예: 다낭 미케비치 4베드룸 비치프론트 독채 풀빌라"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-200 block mb-1">
                              빌라 독채 구조 요약
                            </label>
                            <input
                              type="text"
                              value={editingProduct.villaSpecs?.structureDescription || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true }), structureDescription: v }
                                } : prev);
                              }}
                              placeholder="예: 2층 단독 독채 + 인피니티풀 + 거실 + 풀키친 다이닝"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                            />
                          </div>
                        </div>

                        {/* Rooms & Occupancy Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                            <label className="text-xs font-bold text-teal-300 block mb-1">침실 수 (Bedrooms)</label>
                            <input
                              type="number"
                              min="1"
                              max="15"
                              value={editingProduct.villaSpecs?.bedrooms || 3}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { maxOccupancy: 8, privatePool: true }), bedrooms: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-black text-center"
                            />
                          </div>

                          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                            <label className="text-xs font-bold text-teal-300 block mb-1">전용 욕실 수 (Baths)</label>
                            <input
                              type="number"
                              min="1"
                              max="15"
                              value={editingProduct.villaSpecs?.bathrooms || 3}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, privatePool: true }), bathrooms: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-black text-center"
                            />
                          </div>

                          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                            <label className="text-xs font-bold text-teal-300 block mb-1">최대 투숙 인원</label>
                            <input
                              type="number"
                              min="1"
                              max="30"
                              value={editingProduct.villaSpecs?.maxOccupancy || 8}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, privatePool: true }), maxOccupancy: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-black text-center"
                            />
                          </div>

                          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                            <label className="text-xs font-bold text-teal-300 block mb-1">기준 투숙 인원</label>
                            <input
                              type="number"
                              min="1"
                              max="30"
                              value={editingProduct.villaSpecs?.standardOccupancy || 6}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, privatePool: true }), standardOccupancy: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-black text-center"
                            />
                          </div>
                        </div>

                        {/* Area, Floors, Bed details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="font-bold text-slate-300 block mb-1">
                              빌라 전용 면적 (㎡) ➔ 평수 자동환산
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={editingProduct.villaSpecs?.areaSqm || 280}
                                onChange={(e) => {
                                  const sqm = Number(e.target.value);
                                  const pyeong = Math.round(sqm * 0.3025);
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    villaSpecs: { 
                                      ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true }), 
                                      areaSqm: sqm,
                                      areaPyeong: pyeong 
                                    }
                                  } : prev);
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold pr-16"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-400">
                                ≒ {editingProduct.villaSpecs?.areaPyeong || Math.round((editingProduct.villaSpecs?.areaSqm || 280) * 0.3025)}평
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="font-bold text-slate-300 block mb-1">건물 층수 (Floors)</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={editingProduct.villaSpecs?.floors || 2}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true }), floors: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-300 block mb-1">침대 상세 구성</label>
                            <input
                              type="text"
                              value={editingProduct.villaSpecs?.beds || '킹베드 3개 + 퀸베드 1개'}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true }), beds: v }
                                } : prev);
                              }}
                              placeholder="예: 킹 3개 + 퀸 1개 + 싱글 2개"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold"
                            />
                          </div>
                        </div>

                        {/* Pool & Oceanview & Breakfast Toggles */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <label className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.villaSpecs?.privatePool ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), privatePool: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-teal-500"
                            />
                            <span className="font-bold text-white text-xs">🏊 프라이빗 전용 수영장</span>
                          </label>

                          <label className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.villaSpecs?.oceanView ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), oceanView: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-teal-500"
                            />
                            <span className="font-bold text-white text-xs">🌊 오션뷰 / 해변 인접</span>
                          </label>

                          <label className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.villaSpecs?.breakfastIncluded ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), breakfastIncluded: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-teal-500"
                            />
                            <span className="font-bold text-white text-xs">🍳 무료 조식 룸서비스</span>
                          </label>
                        </div>

                        {/* Location & External Links */}
                        <div className="space-y-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                          <h5 className="font-black text-slate-200 text-xs">📍 풀빌라 현지 위치 및 지도 링크</h5>
                          
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 block mb-1">상세 현지 주소</label>
                            <input
                              type="text"
                              value={editingProduct.villaSpecs?.address || editingProduct.address || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  address: v,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), address: v }
                                } : prev);
                              }}
                              placeholder="예: 베트남 다낭시 응우한선구 보응우옌잡 해안도로 프라이빗 리조트 단지"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-400 block mb-1">구글 지도 (Google Maps) URL</label>
                              <input
                                type="text"
                                value={editingProduct.villaSpecs?.googleMapUrl || editingProduct.googleMapUrl || ''}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    googleMapUrl: v,
                                    villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), googleMapUrl: v }
                                  } : prev);
                                }}
                                placeholder="https://maps.google.com/..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-400 block mb-1">에어비앤비 (Airbnb) 참고 링크</label>
                              <input
                                type="text"
                                value={editingProduct.villaSpecs?.airbnbUrl || editingProduct.airbnbUrl || ''}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    airbnbUrl: v,
                                    villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), airbnbUrl: v }
                                  } : prev);
                                }}
                                placeholder="https://airbnb.co.kr/rooms/..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Airbnb Amenities Selection */}
                        <div className="space-y-2.5">
                          <span className="font-bold text-slate-200 block text-xs">
                            🛋️ 에어비앤비 시그니처 편의시설 (Amenities) 체크
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {VILLA_AMENITIES.map((am) => {
                              const isChecked = (editingProduct.villaSpecs?.amenities || []).includes(am);
                              return (
                                <label key={am} className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                                  isChecked ? 'bg-teal-950/60 border-teal-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const cur = editingProduct.villaSpecs?.amenities || [];
                                      const next = e.target.checked ? [...cur, am] : cur.filter(x => x !== am);
                                      setEditingProduct(prev => prev ? {
                                        ...prev,
                                        villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), amenities: next }
                                      } : prev);
                                    }}
                                    className="w-3.5 h-3.5 rounded text-teal-500"
                                  />
                                  <span className="text-[11px] font-bold">{am}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Airbnb House Rules & Check-in Details */}
                        <div className="space-y-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                          <h5 className="font-black text-slate-200 text-xs">📋 에어비앤비 하우스 룰 & 숙박 규정</h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-400 block mb-1">체크인 / 체크아웃 시간</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editingProduct.villaSpecs?.checkInTime || '15:00'}
                                  onChange={(e) => {
                                    const v = e.target.value;
                                    setEditingProduct(prev => prev ? {
                                      ...prev,
                                      villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), checkInTime: v }
                                    } : prev);
                                  }}
                                  placeholder="체크인: 15:00"
                                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-bold text-center"
                                />
                                <span className="text-slate-500 font-bold">~</span>
                                <input
                                  type="text"
                                  value={editingProduct.villaSpecs?.checkOutTime || '11:00'}
                                  onChange={(e) => {
                                    const v = e.target.value;
                                    setEditingProduct(prev => prev ? {
                                      ...prev,
                                      villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), checkOutTime: v }
                                    } : prev);
                                  }}
                                  placeholder="체크아웃: 11:00"
                                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-bold text-center"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-400 block mb-1">보증금 (Deposit) 규정</label>
                              <input
                                type="text"
                                value={editingProduct.villaSpecs?.securityDeposit || '체크인 시 2,000,000₫ 또는 $100 예치 (퇴실 시 반환)'}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), securityDeposit: v }
                                  } : prev);
                                }}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-400 block mb-1">호스트 지원 언어 & 실시간 케어</label>
                            <input
                              type="text"
                              value={editingProduct.villaSpecs?.hostLanguage || '한국어, 영어, 베트남어 지원 (24시간 카카오톡 실시간 응대)'}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8 }), hostLanguage: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* 4-B: IF GOLF CATEGORY (STAY & PLAY + COURSE CARDS)        */}
                  {/* ========================================================= */}
                  {editingProduct.category === '골프투어' && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-emerald-950/60 to-slate-950 border-2 border-emerald-500/50 p-5 sm:p-6 rounded-3xl space-y-6 shadow-xl">
                        
                        {/* Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/60 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">⛳</span>
                              <h4 className="font-black text-emerald-300 text-lg">
                                3박 4일 Stay & Play 골프투어 스펙 및 명문 코스 정보
                              </h4>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">
                              Stay & Play 연계 호텔, 총 라운딩 홀 수, 그린피/캐디/카트 포함 여부 및 도시별 골프장 상세 카드를 설정하세요.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prev => prev ? {
                                ...prev,
                                duration: '3박 4일',
                                golfSpecs: {
                                  holes: 54,
                                  totalRounds: 3,
                                  stayAndPlayHotel: '5성급 쉐라톤 그랜드 다낭 리조트 (또는 빈펄 골프 리조트)',
                                  hotelRoomType: '디럭스 골프/오션뷰 룸 (2인 1실, 조식 포함)',
                                  distanceInfo: '호텔 ↔ 골프장 간 단독 전용차량 15~25분 소요',
                                  greenFeeIncluded: true,
                                  caddieFeeIncluded: true,
                                  cartIncluded: true,
                                  caddieTipInfo: '18홀 1인 기준 약 $15~$20 (30만~40만동 현장 지불)',
                                  golfCourseNames: ['다낭 BRG 골프 리조트 (18홀)', '몽고메리 링크스 CC (18홀)', '바나힐스 골프클럽 (18홀)'],
                                  courseDetails: [
                                    {
                                      name: '다낭 BRG 골프 리조트 (BRG Da Nang Golf)',
                                      designer: '그렉 노먼 (Greg Norman)',
                                      holes: 18,
                                      difficulty: '상급',
                                      grassType: '버뮤다 그래스 (Bermuda Grass)',
                                      facilities: ['18홀 챔피언십 코스', '드라이빙 레인지 (연습장)', '클럽하우스 락커룸 & 샤워실', '프로샵 (용품점)', '클럽하우스 VIP 레스토랑', 'VIP 사우나 & 자쿠지'],
                                      description: '세계적인 골퍼 그렉 노먼이 설계한 해변 링크스 코스로, 바닷바람과 듄스 모래언덕이 어우러진 베트남 최고 명문 골프장입니다.'
                                    },
                                    {
                                      name: '몽고메리 링크스 CC (Montgomerie Links)',
                                      designer: '콜린 몽고메리 (Colin Montgomerie)',
                                      holes: 18,
                                      difficulty: '중상급',
                                      grassType: '패스팰럼 잔디 (Paspalum)',
                                      facilities: ['18홀 챔피언십 코스', '드라이빙 레인지 (연습장)', '클럽하우스 락커룸 & 샤워실', '클럽하우스 VIP 레스토랑'],
                                      description: '유러피언 투어의 전설 콜린 몽고메리가 설계한 스코틀랜드 정통 링크스 스타일 코스로 마블 마운틴을 배경으로 환상적인 뷰를 선사합니다.'
                                    },
                                    {
                                      name: '바나힐스 골프클럽 (Ba Na Hills Golf Club)',
                                      designer: '루크 도널드 (Luke Donald)',
                                      holes: 18,
                                      difficulty: '상급',
                                      grassType: '벤트그래스 & 버뮤다',
                                      facilities: ['18홀 챔피언십 코스', '야간 라이트 조명 시설', '드라이빙 레인지 (연습장)', 'VIP 사우나 & 자쿠지'],
                                      description: '바나산 기슭에 위치하여 시원한 산바람과 전 홀 나이트 라이트 시설을 갖춘 아시아 최고급 산악형 명문 챔피언십 코스입니다.'
                                    }
                                  ]
                                }
                              } : prev);
                              showNotification('⛳ 3박 4일 54홀 Stay & Play 표준 스펙이 자동 입력되었습니다.');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Stay & Play 표준양식 자동완성</span>
                          </button>
                        </div>

                        {/* Stay & Play Hotel Details */}
                        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-4">
                          <h5 className="font-black text-emerald-300 text-xs flex items-center gap-1.5">
                            <Home className="w-4 h-4" />
                            <span>Stay & Play 연계 호텔 / 골프 리조트 정보</span>
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                                숙박 호텔 / 리조트 명 *
                              </label>
                              <input
                                type="text"
                                value={editingProduct.golfSpecs?.stayAndPlayHotel || ''}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    golfSpecs: { ...(prev.golfSpecs || { holes: 54, greenFeeIncluded: true }), stayAndPlayHotel: v }
                                  } : prev);
                                }}
                                placeholder="예: 5성급 쉐라톤 그랜드 다낭 리조트 (또는 빈펄 골프 리조트)"
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-bold"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                                객실 타입 및 조식 포함 여부
                              </label>
                              <input
                                type="text"
                                value={editingProduct.golfSpecs?.hotelRoomType || ''}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    golfSpecs: { ...(prev.golfSpecs || { holes: 54, greenFeeIncluded: true }), hotelRoomType: v }
                                  } : prev);
                                }}
                                placeholder="예: 디럭스 골프/오션뷰 룸 (2인 1실, 조식 뷔페 포함)"
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-300 block mb-1">
                              호텔 ↔ 골프장 간 이동 거리 및 소요 시간
                            </label>
                            <input
                              type="text"
                              value={editingProduct.golfSpecs?.distanceInfo || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54, greenFeeIncluded: true }), distanceInfo: v }
                                } : prev);
                              }}
                              placeholder="예: 호텔에서 골프장까지 단독 전용 차량으로 15~20분 소요 (전 일정 전담 기사 대기)"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                            />
                          </div>
                        </div>

                        {/* Rounding & Fees Specs */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                            <label className="text-xs font-bold text-emerald-300 block mb-1">총 라운딩 홀 수</label>
                            <input
                              type="number"
                              step="18"
                              value={editingProduct.golfSpecs?.holes || 54}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { greenFeeIncluded: true }), holes: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-black text-center"
                            />
                          </div>

                          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                            <label className="text-xs font-bold text-emerald-300 block mb-1">총 라운딩 일수 (회)</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={editingProduct.golfSpecs?.totalRounds || 3}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54, greenFeeIncluded: true }), totalRounds: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-black text-center"
                            />
                          </div>

                          <label className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.golfSpecs?.greenFeeIncluded ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), greenFeeIncluded: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-emerald-500"
                            />
                            <span className="font-bold text-white text-xs">⛳ 그린피 100% 포함</span>
                          </label>

                          <label className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.golfSpecs?.caddieFeeIncluded ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), caddieFeeIncluded: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-emerald-500"
                            />
                            <span className="font-bold text-white text-xs">🏌️ 1인 1캐디피 포함</span>
                          </label>
                        </div>

                        {/* Caddie Tip & Cart info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.golfSpecs?.cartIncluded ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), cartIncluded: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-emerald-500"
                            />
                            <span className="font-bold text-white text-xs">🚗 전동 카트비 (2인 1카트) 포함</span>
                          </label>

                          <div>
                            <input
                              type="text"
                              value={editingProduct.golfSpecs?.caddieTipInfo || '18홀 1인 기준 약 $15~$20 (30만~40만동 현장 지불)'}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), caddieTipInfo: v }
                                } : prev);
                              }}
                              placeholder="캐디팁 안내: 18홀 $15~$20"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                            />
                          </div>
                        </div>

                        {/* Golf Courses Details List (Cards) */}
                        <div className="space-y-4 bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-slate-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-black text-emerald-300 text-sm">
                                🏌️‍♂️ 방문 명문 골프장 상세 코스 정보 등록 ({editingProduct.golfSpecs?.courseDetails?.length || 0}개)
                              </h5>
                              <p className="text-xs text-slate-400">
                                각 골프장의 디자이너, 코스 난이도, 잔디 종류 및 상세 설명을 기재하세요.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const cur = editingProduct.golfSpecs?.courseDetails || [];
                                const newCourse: GolfCourseDetail = {
                                  name: `${editingProduct.city} 신규 명문 골프클럽`,
                                  designer: '유명 코스 디자이너',
                                  holes: 18,
                                  difficulty: '중상급',
                                  grassType: '버뮤다 그래스',
                                  facilities: ['18홀 챔피언십 코스', '드라이빙 레인지 (연습장)', '클럽하우스 락커룸 & 샤워실', '프로샵 (용품점)'],
                                  description: '국제 규격의 프리미엄 챔피언십 골프 코스입니다.'
                                };
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: {
                                    ...(prev.golfSpecs || { holes: 54, greenFeeIncluded: true }),
                                    courseDetails: [...cur, newCourse],
                                    golfCourseNames: [...(prev.golfSpecs?.golfCourseNames || []), newCourse.name]
                                  }
                                } : prev);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>+ 골프장 추가</span>
                            </button>
                          </div>

                          {/* Courses Cards */}
                          <div className="space-y-4">
                            {(editingProduct.golfSpecs?.courseDetails || []).map((course, cIdx) => (
                              <div key={cIdx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                  <span className="font-black text-emerald-400 text-xs">
                                    ⛳ 골프장 #{cIdx + 1}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const filtered = (editingProduct.golfSpecs?.courseDetails || []).filter((_, i) => i !== cIdx);
                                      setEditingProduct(prev => prev ? {
                                        ...prev,
                                        golfSpecs: {
                                          ...(prev.golfSpecs || { holes: 54 }),
                                          courseDetails: filtered,
                                          golfCourseNames: filtered.map(c => c.name)
                                        }
                                      } : prev);
                                    }}
                                    className="text-rose-400 hover:text-rose-300 text-xs font-bold"
                                  >
                                    골프장 삭제
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div className="sm:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">골프장 명칭</label>
                                    <input
                                      type="text"
                                      value={course.name}
                                      onChange={(e) => {
                                        const v = e.target.value;
                                        setEditingProduct(prev => {
                                          if (!prev) return prev;
                                          const list = [...(prev.golfSpecs?.courseDetails || [])];
                                          list[cIdx] = { ...list[cIdx], name: v };
                                          return {
                                            ...prev,
                                            golfSpecs: {
                                              ...(prev.golfSpecs || { holes: 54 }),
                                              courseDetails: list,
                                              golfCourseNames: list.map(c => c.name)
                                            }
                                          };
                                        });
                                      }}
                                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-bold text-xs"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">코스 설계자 (Designer)</label>
                                    <input
                                      type="text"
                                      value={course.designer || ''}
                                      onChange={(e) => {
                                        const v = e.target.value;
                                        setEditingProduct(prev => {
                                          if (!prev) return prev;
                                          const list = [...(prev.golfSpecs?.courseDetails || [])];
                                          list[cIdx] = { ...list[cIdx], designer: v };
                                          return { ...prev, golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), courseDetails: list } };
                                        });
                                      }}
                                      placeholder="예: 그렉 노먼"
                                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">홀 수 (Holes)</label>
                                    <input
                                      type="number"
                                      value={course.holes || 18}
                                      onChange={(e) => {
                                        const v = Number(e.target.value);
                                        setEditingProduct(prev => {
                                          if (!prev) return prev;
                                          const list = [...(prev.golfSpecs?.courseDetails || [])];
                                          list[cIdx] = { ...list[cIdx], holes: v };
                                          return { ...prev, golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), courseDetails: list } };
                                        });
                                      }}
                                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">코스 난이도</label>
                                    <select
                                      value={course.difficulty || '중상급'}
                                      onChange={(e) => {
                                        const v = e.target.value;
                                        setEditingProduct(prev => {
                                          if (!prev) return prev;
                                          const list = [...(prev.golfSpecs?.courseDetails || [])];
                                          list[cIdx] = { ...list[cIdx], difficulty: v };
                                          return { ...prev, golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), courseDetails: list } };
                                        });
                                      }}
                                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                                    >
                                      <option value="최상급">최상급 (토너먼트 코스)</option>
                                      <option value="상급">상급</option>
                                      <option value="중상급">중상급</option>
                                      <option value="중급">중급</option>
                                      <option value="초중급">초중급</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5">잔디 종류</label>
                                    <input
                                      type="text"
                                      value={course.grassType || ''}
                                      onChange={(e) => {
                                        const v = e.target.value;
                                        setEditingProduct(prev => {
                                          if (!prev) return prev;
                                          const list = [...(prev.golfSpecs?.courseDetails || [])];
                                          list[cIdx] = { ...list[cIdx], grassType: v };
                                          return { ...prev, golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), courseDetails: list } };
                                        });
                                      }}
                                      placeholder="버뮤다 / 패스팰럼"
                                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">골프장 특징 및 코스 소개</label>
                                  <textarea
                                    rows={2}
                                    value={course.description || ''}
                                    onChange={(e) => {
                                      const v = e.target.value;
                                      setEditingProduct(prev => {
                                        if (!prev) return prev;
                                        const list = [...(prev.golfSpecs?.courseDetails || [])];
                                        list[cIdx] = { ...list[cIdx], description: v };
                                        return { ...prev, golfSpecs: { ...(prev.golfSpecs || { holes: 54 }), courseDetails: list } };
                                      });
                                    }}
                                    placeholder="해안가 링크스 코스로 듄스 모래언덕과 바닷바람이 어우러진 코스..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-xs"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* 4-C: IF FREE TRAVEL / PACKAGE (AGENCY TAILORED SPECS)     */}
                  {/* ========================================================= */}
                  {editingProduct.category !== '풀빌라' && editingProduct.category !== '골프투어' && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/40 p-5 sm:p-6 rounded-3xl space-y-6 shadow-xl">
                        
                        {/* Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/40 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">🧭</span>
                              <h4 className="font-black text-amber-300 text-lg">
                                {editingProduct.category} 여행사 맞춤 기획 스펙
                              </h4>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">
                              여행 테마, 단독 전용 차량 스펙, 한국어 전담 가이드 및 핵심 관광지 하이라이트를 기재하세요.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prev => prev ? {
                                ...prev,
                                travelTheme: '가족 힐링 & 노쇼핑 단독 투어',
                                vehicleInfo: '16인승 최신형 리무진 단독 배차 (전 일정 유류비, 기사비, 톨비 일체 포함)',
                                guideInfo: '베트남 관광청 라이선스 보유 한국어 전담 베테랑 가이드 풀케어',
                                highlights: ['다낭 바나힐 골든브릿지 손동상', '호이안 올드타운 유등 소원배', '미케비치 해안가 카페거리', '5성급 특급 호텔 숙박']
                              } : prev);
                              showNotification('✨ 여행사 맞춤 표준 스펙이 자동 입력되었습니다.');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>여행사 표준양식 자동완성</span>
                          </button>
                        </div>

                        {/* Theme & Vehicle Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-200 block mb-1">
                              🎯 여행 테마 (Theme)
                            </label>
                            <input
                              type="text"
                              value={editingProduct.travelTheme || ''}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, travelTheme: e.target.value } : prev)}
                              placeholder="예: 3대 가족 힐링 여행 / 노쇼핑·노옵션 / 럭셔리 효도 관광"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-200 block mb-1">
                              🚐 단독 전용 차량 스펙
                            </label>
                            <input
                              type="text"
                              value={editingProduct.vehicleInfo || ''}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, vehicleInfo: e.target.value } : prev)}
                              placeholder="예: 16인승 최신형 리무진 단독 배차 (유류비, 기사비 일체 포함)"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                            />
                          </div>
                        </div>

                        {/* Guide & Departure */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-200 block mb-1">
                              🎙️ 한국어 전문 가이드 안내
                            </label>
                            <input
                              type="text"
                              value={editingProduct.guideInfo || ''}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, guideInfo: e.target.value } : prev)}
                              placeholder="예: 베트남 관광청 라이선스 한국어 전담 가이드 전 일정 풀케어"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-200 block mb-1">
                              ✈️ 출발 가능 공항
                            </label>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {['인천', '부산', '대구', '청주', '무안'].map(city => {
                                const hasCity = (editingProduct.departureCities || []).includes(city);
                                return (
                                  <button
                                    key={city}
                                    type="button"
                                    onClick={() => {
                                      const cur = editingProduct.departureCities || [];
                                      const next = hasCity ? cur.filter(c => c !== city) : [...cur, city];
                                      setEditingProduct(prev => prev ? { ...prev, departureCities: next } : prev);
                                    }}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                      hasCity ? 'bg-amber-400 text-slate-950 border-amber-400 font-black' : 'bg-slate-900 text-slate-400 border-slate-750'
                                    }`}
                                  >
                                    {city} 출발 {hasCity && '✓'}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Highlights List */}
                        <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                          <label className="font-bold text-amber-300 block text-xs">
                            🌟 핵심 랜드마크 & 관광지 하이라이트
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {(editingProduct.highlights || []).map((hl, hIdx) => (
                              <span key={hIdx} className="bg-slate-900 border border-slate-750 text-slate-200 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
                                <span>📍 {hl}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingProduct(prev => prev ? {
                                      ...prev,
                                      highlights: (prev.highlights || []).filter((_, i) => i !== hIdx)
                                    } : prev);
                                  }}
                                  className="text-slate-500 hover:text-rose-400 cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <input
                              type="text"
                              id="custom-highlight-input"
                              placeholder="관광지 이름 입력 (예: 바나힐 골든브릿지, 호이안 올드타운)..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const target = e.currentTarget;
                                  if (target.value.trim()) {
                                    setEditingProduct(prev => prev ? {
                                      ...prev,
                                      highlights: [...(prev.highlights || []), target.value.trim()]
                                    } : prev);
                                    target.value = '';
                                  }
                                }
                              }}
                              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 5: ITINERARY (DAY 1 ~ N)                                   */}
              {/* ============================================================= */}
              {editorTab === 'itinerary' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Top Bar with Category Fast Presets */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <h4 className="font-black text-white text-base">일자별 상세 여행 일정표</h4>
                      <p className="text-xs text-slate-400">1일차부터 마지막 날까지 손님들이 경험할 일정과 식사, 호텔을 입력하세요.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {editingProduct.category === '골프투어' && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(prev => prev ? {
                              ...prev,
                              duration: '3박 4일',
                              itinerary: [
                                {
                                  day: 1,
                                  title: '다낭 공항 도착 ➔ VIP 전용차량 미팅 ➔ 5성 골프 리조트 체크인 & 휴식',
                                  description: '공항 도착 후 전담 기사 미팅. 전용 VIP 차량 탑승 후 골프 리조트 이동, 웰컴 드링크 및 체크인 후 클럽하우스 만찬.',
                                  meal: '조식: 기내식 | 중식: 현지식 | 석식: 리조트 특식 만찬',
                                  hotel: '5성급 쉐라톤 그랜드 다낭 리조트',
                                  vehicle: 'VIP 단독 전용 리무진',
                                  attractions: ['다낭 공항', '리조트 체크인', '환영 만찬']
                                },
                                {
                                  day: 2,
                                  title: '1차전: 다낭 BRG 골프클럽 18홀 라운딩 ➔ VIP 전신 마사지',
                                  description: '리조트 조식 후 골프장 이동. 오전 18홀 티오프 라운딩. 클럽하우스 중식 후 90분 피로회복 VIP 전신 마사지 및 해산물 디너.',
                                  meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 특식 해산물 BBQ',
                                  hotel: '5성급 쉐라톤 그랜드 다낭 리조트',
                                  vehicle: 'VIP 단독 전용 리무진',
                                  attractions: ['BRG 골프클럽 (18홀)', 'VIP 전신 스파', '미케비치 씨푸드']
                                },
                                {
                                  day: 3,
                                  title: '2차전: 몽고메리 링크스 CC 18홀 라운딩 ➔ 호이안 야간 투어',
                                  description: '조식 후 몽고메리 링크스 18홀 라운딩. 라운딩 후 유네스코 고도 호이안 올드타운 이동하여 야경 감상 및 디너.',
                                  meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 호이안 고급 베트남식',
                                  hotel: '5성급 쉐라톤 그랜드 다낭 리조트',
                                  vehicle: 'VIP 단독 전용 리무진',
                                  attractions: ['몽고메리 링크스 (18홀)', '호이안 올드타운', '소원배 유등']
                                },
                                {
                                  day: 4,
                                  title: '3차전: 바나힐스 GC 18홀 파이널 라운딩 ➔ 체크아웃 & 공항 샌딩',
                                  description: '체크아웃 후 바나힐스 18홀 마무리 라운딩. 샤워 및 환복 후 롯데마트 쇼핑 후 공항 샌딩.',
                                  meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한식 특식',
                                  hotel: '귀국 (기내박)',
                                  vehicle: 'VIP 단독 전용 리무진',
                                  attractions: ['바나힐스 GC (18홀)', '롯데마트 쇼핑', '공항 샌딩']
                                }
                              ]
                            } : prev);
                            showNotification('⛳ 골프 Stay & Play 3박 4일 54홀 일정이 불러와졌습니다.');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>3박 4일 54홀 골프일정 채우기</span>
                        </button>
                      )}

                      {editingProduct.category === '풀빌라' && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(prev => prev ? {
                              ...prev,
                              itinerary: [
                                {
                                  day: 1,
                                  title: '풀빌라 프라이빗 체크인 ➔ 웰컴 티 & 프라이빗 풀 수영 ➔ 야외 바비큐 파티',
                                  description: '체크인 후 전용 인피니티 풀에서 여유로운 수영 및 힐링. 저녁에는 야외 가든 테라스에서 가족/지인들과 프라이빗 BBQ 파티.',
                                  meal: '조식: - | 중식: 웰컴 과일 | 석식: 풀사이드 BBQ',
                                  hotel: '독채 프라이빗 풀빌라',
                                  vehicle: '전용 이동 차량',
                                  attractions: ['풀빌라 체크인', '인피니티 풀', '프라이빗 BBQ']
                                },
                                {
                                  day: 2,
                                  title: '플로팅 조식 ➔ 미케비치 해변 산책 ➔ 노래방 & 자쿠지 스파 힐링',
                                  description: '물 위에서 즐기는 인스타 감성 플로팅 조식. 해변 산책 후 빌라 내 노래방 음향 시설 및 자쿠지 사우나 힐링.',
                                  meal: '조식: 플로팅 조식 룸서비스 | 중식: 자유식 | 석식: 해산물 만찬',
                                  hotel: '독채 프라이빗 풀빌라',
                                  vehicle: '전용 이동 차량',
                                  attractions: ['플로팅 조식', '미케비치 해변', '전용 노래방 & 자쿠지']
                                },
                                {
                                  day: 3,
                                  title: '여유로운 모닝 커피 ➔ 체크아웃 ➔ 전용 차량 이동',
                                  description: '모닝 수영 및 커피 타임 후 11:00 체크아웃. 공항 또는 다음 여행지로 편안하게 이동.',
                                  meal: '조식: 빌라 조식 | 중식: 현지 미식 | 석식: -',
                                  hotel: '체크아웃',
                                  vehicle: '전용 이동 차량',
                                  attractions: ['모닝 수영', '체크아웃', '공항 이동']
                                }
                              ]
                            } : prev);
                            showNotification('🏰 풀빌라 힐링 휴양 일정이 불러와졌습니다.');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-teal-700/80 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>풀빌라 힐링일정 채우기</span>
                        </button>
                      )}

                      {editingProduct.category !== '풀빌라' && editingProduct.category !== '골프투어' && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(prev => prev ? {
                              ...prev,
                              itinerary: [
                                {
                                  day: 1,
                                  title: '다낭 공항 도착 ➔ 전용차량 미팅 ➔ 호텔 체크인 & 미케비치 산책',
                                  description: '공항 도착 후 전담 기사 미팅. 전용 차량으로 숙소 이동 및 자유 휴식 후 미케비치 카페거리 탐방.',
                                  meal: '조식: 기내식 | 중식: 현지 쌀국수 | 석식: 자유식',
                                  hotel: '5성급 쉐라톤 다낭 또는 동급',
                                  vehicle: '16인승 단독 전용 차량',
                                  attractions: ['다낭 공항', '미케비치', '호텔 체크인']
                                },
                                {
                                  day: 2,
                                  title: '바나힐 국립공원 케이블카 & 골든브릿지 손동상 ➔ 야시장',
                                  description: '세계 최장 케이블카 탑승 후 테마파크 자유 관광 및 프랑스 마을 산책, 저녁 선짜 야시장 미식 탐방.',
                                  meal: '조식: 호텔식 | 중식: 바나힐 뷔페 | 석식: 칠리크랩 씨푸드',
                                  hotel: '5성급 쉐라톤 다낭',
                                  vehicle: '16인승 단독 전용 차량',
                                  attractions: ['바나힐', '골든브릿지', '선짜 야시장']
                                },
                                {
                                  day: 3,
                                  title: '호이안 유네스코 올드타운 ➔ 투본강 소원배 유등 띄우기',
                                  description: '유서 깊은 고도 호이안 탐방. 풍등이 가득한 전통 거리 산책 및 야간 소원배 탑승, 야시장 쇼핑.',
                                  meal: '조식: 호텔식 | 중식: 호이안 전통 반미/화이트로즈 | 석식: 특식 모닝글로리',
                                  hotel: '5성급 쉐라톤 다낭',
                                  vehicle: '16인승 단독 전용 차량',
                                  attractions: ['호이안 올드타운', '투본강 소원배', '풍등 거리']
                                },
                                {
                                  day: 4,
                                  title: '오행산 마블마운틴 ➔ 롯데마트 쇼핑 & 힐링 스파 ➔ 공항 샌딩',
                                  description: '체크아웃 후 오행산 동굴 탐방, 롯데마트 기념품 쇼핑 및 90분 VIP 아로마 스파 마사지 후 공항 샌딩.',
                                  meal: '조식: 호텔식 | 중식: 현지 미식 | 석식: 공항식',
                                  hotel: '기내박 또는 귀국',
                                  vehicle: '16인승 단독 전용 차량',
                                  attractions: ['오행산', '롯데마트', '프리미엄 스파']
                                }
                              ]
                            } : prev);
                            showNotification('🏝️ 자유여행 대표 일정이 불러와졌습니다.');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>추천 대표일정 채우기</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const cur = editingProduct.itinerary || [];
                          const nextDay = cur.length + 1;
                          const newDay: ItineraryDay = {
                            day: nextDay,
                            title: `${nextDay}일차 대표 일정 타이틀`,
                            description: '상세 관광 일정 및 활동 내용을 입력하세요.',
                            meal: '조식: 호텔식 | 중식: 현지식 | 석식: 특식',
                            hotel: '5성급 특급 호텔',
                            vehicle: '단독 전용 차량'
                          };
                          setEditingProduct(prev => prev ? { ...prev, itinerary: [...cur, newDay] } : prev);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ 다음 일차 추가</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {(editingProduct.itinerary || []).map((dayItem, dIdx) => (
                      <div key={dIdx} className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-xl text-xs border border-amber-400/20">
                            {dayItem.day}일차 일정
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              const filtered = (editingProduct.itinerary || []).filter((_, i) => i !== dIdx);
                              const reIndexed = filtered.map((item, i) => ({ ...item, day: i + 1 }));
                              setEditingProduct(prev => prev ? { ...prev, itinerary: reIndexed } : prev);
                            }}
                            className="text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer"
                          >
                            일정 삭제
                          </button>
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">일정 제목 (동선 요약)</label>
                          <input
                            type="text"
                            value={dayItem.title}
                            onChange={(e) => {
                              const v = e.target.value;
                              setEditingProduct(prev => {
                                if (!prev) return prev;
                                const updated = [...(prev.itinerary || [])];
                                updated[dIdx] = { ...updated[dIdx], title: v };
                                return { ...prev, itinerary: updated };
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-xs"
                          />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">상세 동선 및 활동 설명</label>
                          <textarea
                            rows={3}
                            value={dayItem.description}
                            onChange={(e) => {
                              const v = e.target.value;
                              setEditingProduct(prev => {
                                if (!prev) return prev;
                                const updated = [...(prev.itinerary || [])];
                                updated[dIdx] = { ...updated[dIdx], description: v };
                                return { ...prev, itinerary: updated };
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs leading-relaxed"
                          />
                        </div>

                        {/* Meal, Hotel & Vehicle */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          <div>
                            <label className="text-[11px] font-bold text-slate-400">식사 정보 (조/중/석식)</label>
                            <input
                              type="text"
                              value={dayItem.meal || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => {
                                  if (!prev) return prev;
                                  const updated = [...(prev.itinerary || [])];
                                  updated[dIdx] = { ...updated[dIdx], meal: v };
                                  return { ...prev, itinerary: updated };
                                });
                              }}
                              placeholder="조식: 호텔식 | 중식: 현지식 | 석식: 특식"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-400">숙소 호텔/풀빌라 명</label>
                            <input
                              type="text"
                              value={dayItem.hotel || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => {
                                  if (!prev) return prev;
                                  const updated = [...(prev.itinerary || [])];
                                  updated[dIdx] = { ...updated[dIdx], hotel: v };
                                  return { ...prev, itinerary: updated };
                                });
                              }}
                              placeholder="5성급 쉐라톤 다낭 리조트"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-400">이동 차량 수단</label>
                            <input
                              type="text"
                              value={dayItem.vehicle || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => {
                                  if (!prev) return prev;
                                  const updated = [...(prev.itinerary || [])];
                                  updated[dIdx] = { ...updated[dIdx], vehicle: v };
                                  return { ...prev, itinerary: updated };
                                });
                              }}
                              placeholder="16인승 단독 전용 리무진"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 6: INCLUDED / EXCLUDED & DESCRIPTION                      */}
              {/* ============================================================= */}
              {editorTab === 'terms' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Category-Specific Included / Excluded Fast Loader */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-black text-white text-xs">✨ 표준 포함 / 불포함 1클릭 불러오기</h4>
                      <p className="text-[11px] text-slate-400">현재 상품 종류에 최적화된 포함/불포함 항목을 자동으로 채웁니다.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(prev => prev ? {
                            ...prev,
                            included: [...FREE_TOUR_INCLUDED],
                            excluded: [...FREE_TOUR_EXCLUDED]
                          } : prev);
                          showNotification('🏝️ 자유여행/패키지 표준 포함·불포함 항목이 적용되었습니다.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black hover:bg-amber-500 hover:text-slate-950 cursor-pointer"
                      >
                        🏝️ 자유여행 표준 불러오기
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(prev => prev ? {
                            ...prev,
                            included: [...GOLF_INCLUDED],
                            excluded: [...GOLF_EXCLUDED]
                          } : prev);
                          showNotification('⛳ 골프투어 Stay & Play 표준 포함·불포함 항목이 적용되었습니다.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black hover:bg-emerald-500 hover:text-white cursor-pointer"
                      >
                        ⛳ 골프투어 표준 불러오기
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(prev => prev ? {
                            ...prev,
                            included: [...VILLA_INCLUDED],
                            excluded: [...VILLA_EXCLUDED]
                          } : prev);
                          showNotification('🏰 풀빌라 에어비앤비 표준 포함·불포함 항목이 적용되었습니다.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-black hover:bg-teal-500 hover:text-white cursor-pointer"
                      >
                        🏰 풀빌라 표준 불러오기
                      </button>
                    </div>
                  </div>

                  {/* Included Items */}
                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-emerald-400 text-sm flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>포함 사항 (Included)</span>
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {(editingProduct.included || []).map((inc, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <input
                            type="text"
                            value={inc}
                            onChange={(e) => {
                              const v = e.target.value;
                              setEditingProduct(prev => {
                                if (!prev) return prev;
                                const updated = [...(prev.included || [])];
                                updated[iIdx] = v;
                                return { ...prev, included: updated };
                              });
                            }}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prev => prev ? {
                                ...prev,
                                included: (prev.included || []).filter((_, i) => i !== iIdx)
                              } : prev);
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={customIncludedInput}
                        onChange={(e) => setCustomIncludedInput(e.target.value)}
                        placeholder="포함 항목 직접 추가..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customIncludedInput.trim()) {
                            setEditingProduct(prev => prev ? {
                              ...prev,
                              included: [...(prev.included || []), customIncludedInput.trim()]
                            } : prev);
                            setCustomIncludedInput('');
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                      >
                        추가
                      </button>
                    </div>
                  </div>

                  {/* Excluded Items */}
                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-rose-400 text-sm flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" />
                        <span>불포함 사항 (Excluded)</span>
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {(editingProduct.excluded || []).map((exc, eIdx) => (
                        <div key={eIdx} className="flex items-center gap-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <input
                            type="text"
                            value={exc}
                            onChange={(e) => {
                              const v = e.target.value;
                              setEditingProduct(prev => {
                                if (!prev) return prev;
                                const updated = [...(prev.excluded || [])];
                                updated[eIdx] = v;
                                return { ...prev, excluded: updated };
                              });
                            }}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(prev => prev ? {
                                ...prev,
                                excluded: (prev.excluded || []).filter((_, i) => i !== eIdx)
                              } : prev);
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={customExcludedInput}
                        onChange={(e) => setCustomExcludedInput(e.target.value)}
                        placeholder="불포함 항목 직접 추가..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customExcludedInput.trim()) {
                            setEditingProduct(prev => prev ? {
                              ...prev,
                              excluded: [...(prev.excluded || []), customExcludedInput.trim()]
                            } : prev);
                            setCustomExcludedInput('');
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
                      >
                        추가
                      </button>
                    </div>
                  </div>

                  {/* Full Description */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300 block">
                      상품 상세 소개 및 스토리텔링
                    </label>
                    <textarea
                      rows={5}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct(prev => prev ? { ...prev, description: e.target.value } : prev)}
                      placeholder="상품의 특별한 매력과 장점을 자유롭게 작성하세요..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white text-xs sm:text-sm leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Footer */}
            <div className="bg-slate-950 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] sm:text-xs text-slate-400 hidden sm:inline">
                💡 저장을 누르면 손님 화면에 즉시 반영되며 서버와 브라우저에 영구 저장됩니다.
              </span>

              <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveProductChanges}
                  disabled={isSavingProduct || isUploadingImages}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isSavingProduct ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>저장 중...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>상품 저장 완료</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
