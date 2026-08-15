import React, { useState, useEffect } from 'react';
import {
  Product,
  Category,
  Region,
  City,
  ConsultationRequest,
  ItineraryDay,
  VillaSpecs,
  GolfSpecs
} from '../types';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Save,
  RotateCcw,
  Download,
  Upload,
  Layers,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Camera,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Search,
  Home,
  Check,
  Building,
  Maximize2,
  Clock,
  FileText,
  HelpCircle,
  X,
  PhoneCall,
  UserCheck,
  ShieldCheck,
  Compass,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { sampleImages } from '../data/sampleImages';

interface AdminPanelProps {
  products: Product[];
  inquiries: ConsultationRequest[];
  onAddProduct: (product: Omit<Product, 'id'>) => Promise<any>;
  onUpdateProduct: (id: string, product: Partial<Product>) => Promise<any>;
  onDeleteProduct: (id: string) => Promise<any>;
  onResetProducts: () => Promise<any>;
  onUpdateInquiryStatus?: (id: string, status: ConsultationRequest['status']) => Promise<any>;
  onClearAllProducts?: () => Promise<any>;
  onClearAllPhotos?: () => Promise<any>;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

const REGIONS: Region[] = ['전체', '북부', '중부', '남부'];
const CITIES: Record<Region, City[]> = {
  전체: ['전체', '하노이', '사파', '하롱베이', '닌빈', '다낭', '호이안', '후에', '나트랑', '호치민', '푸꾸옥', '달랏', '붕따우'],
  북부: ['하노이', '사파', '하롱베이', '닌빈'],
  중부: ['다낭', '호이안', '후에', '나트랑'],
  남부: ['호치민', '푸꾸옥', '달랏', '붕따우']
};

const CATEGORIES: Category[] = ['풀빌라', '골프투어', '자유여행', '추천패키지'];

// 12 Popular Amenities for Villas
const POPULAR_VILLA_AMENITIES = [
  '단독 프라이빗 수영장',
  '바베큐(BBQ) 그릴 시설',
  '풀옵션 주방 & 조리도구',
  '초고속 무료 와이파이',
  '넷플릭스 & 스마트 TV',
  '세탁기 & 건조기 완비',
  '전용 비치 도보 3분',
  '공항 단독 픽업/샌딩',
  '조식 딜리버리 서비스',
  '24시간 보안 & 전용 주차',
  '전 객실 킹사이즈 침대',
  '매일 객실 클리닝 서비스'
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  inquiries,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onUpdateInquiryStatus,
  onClearAllProducts,
  onClearAllPhotos,
  onClose,
  onSelectProduct
}) => {
  // Tabs: 'list' | 'editor' | 'inquiries' | 'settings'
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'inquiries' | 'settings'>('list');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<Category | '전체'>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Currently Editing or Creating
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Core Product Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    subTitle: '',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 850000,
    priceVND: 16000000,
    duration: '1박 기준 (일정 조율 가능)',
    imageUrl: '',
    additionalImages: [],
    rating: 5.0,
    reviewCount: 48,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 0,
    departureCities: ['인천', '김해', '대구'],
    tags: ['#다낭풀빌라', '#독채빌라', '#프라이빗수영장'],
    description: '',
    address: '',
    googleMapUrl: '',
    airbnbUrl: '',
    included: [],
    excluded: [],
    itinerary: []
  });

  // Images state
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [manualImageUrl, setManualImageUrl] = useState('');

  // Villa-specific State
  const [villaName, setVillaName] = useState('');
  const [villaStructureDesc, setVillaStructureDesc] = useState('');
  const [villaBedrooms, setVillaBedrooms] = useState(3);
  const [villaBathrooms, setVillaBathrooms] = useState(3);
  const [villaBeds, setVillaBeds] = useState('킹베드 3개');
  const [villaStandardOccupancy, setVillaStandardOccupancy] = useState(6);
  const [villaMaxOccupancy, setVillaMaxOccupancy] = useState(8);
  const [villaFloors, setVillaFloors] = useState(2);
  const [villaAreaSqm, setVillaAreaSqm] = useState(350);
  const [villaPrivatePool, setVillaPrivatePool] = useState(true);
  const [villaOceanView, setVillaOceanView] = useState(true);
  const [villaAddress, setVillaAddress] = useState('');
  const [villaGoogleMapUrl, setVillaGoogleMapUrl] = useState('');
  const [villaAirbnbUrl, setVillaAirbnbUrl] = useState('');
  const [villaAmenities, setVillaAmenities] = useState<string[]>(POPULAR_VILLA_AMENITIES.slice(0, 8));
  const [villaCheckInTime, setVillaCheckInTime] = useState('15:00');
  const [villaCheckOutTime, setVillaCheckOutTime] = useState('11:00');
  const [villaHouseRulesText, setVillaHouseRulesText] = useState('실내 절대 금연 (야외 테라스 이용)\n반려동물 입실 불가\n22:00 이후 심야 정숙\n바베큐 그릴 무료 이용 가능');

  // Golf-specific State
  const [golfHoles, setGolfHoles] = useState(54);
  const [greenFeeIncluded, setGreenFeeIncluded] = useState(true);
  const [caddieFeeIncluded, setCaddieFeeIncluded] = useState(true);
  const [cartIncluded, setCartIncluded] = useState(true);
  const [golfCourseNamesText, setGolfCourseNamesText] = useState('다낭 CC\n몽고메리 링스\n바나힐스 GC');

  // Tour / Free Travel State
  const [includedText, setIncludedText] = useState('');
  const [excludedText, setExcludedText] = useState('');
  const [departureCitiesText, setDepartureCitiesText] = useState('인천\n김해\n대구\n청주');
  const [tagsText, setTagsText] = useState('');
  const [itineraryList, setItineraryList] = useState<ItineraryDay[]>([]);

  // Open Creator with specific category template
  const handleOpenCreator = (category: Category) => {
    setEditingId(null);
    const presetCity: City = category === '풀빌라' ? '다낭' : category === '골프투어' ? '다낭' : category === '자유여행' ? '나트랑' : '다낭';
    const region: Region = '중부';

    if (category === '풀빌라') {
      setFormData({
        title: `[${presetCity}] 럭셔리 프라이빗 독채 풀빌라 3베드룸`,
        subTitle: '전용 인피니티 풀 & 오션뷰 테라스, 3개 킹베드 침실, 바베큐 완비',
        category: '풀빌라',
        region,
        city: presetCity,
        priceKRW: 850000,
        priceVND: 16000000,
        duration: '1박 기준 (일정 조율 가능)',
        imageUrl: '',
        additionalImages: [],
        rating: 5.0,
        reviewCount: 48,
        isPopular: true,
        isHotDeal: false,
        discountPercent: 0,
        departureCities: [],
        tags: [`#${presetCity}풀빌라`, '#독채빌라', '#프라이빗수영장', '#가족휴양'],
        description: `${presetCity} 해변 인근의 최고급 독채 풀빌라로, 전용 프라이빗 풀과 최고급 인테리어, 넓은 거실 및 풀옵션 주방을 갖추어 가족 및 단체 여행에 최고의 프라이빗 힐링을 선사합니다.`,
        address: `${presetCity} 해변로 리조트 단지 (Premier Village Area)`,
        googleMapUrl: '',
        airbnbUrl: '',
        included: [],
        excluded: [],
        itinerary: []
      });

      setVillaName(`[${presetCity}] 럭셔리 독채 풀빌라`);
      setVillaStructureDesc('1층: 탁 트인 넓은 거실, 다이닝 룸, 풀옵션 주방, 테라스 및 전용 인피니티 수영장\n2층: 킹사이즈 침실 2개 (각 방 전용 욕실 및 테라스 완비)\n3층: 마스터 오션뷰 킹사이즈 침실 1개, 대형 욕조, 프라이빗 루프탑 테라스');
      setVillaBedrooms(3);
      setVillaBathrooms(3);
      setVillaBeds('킹베드 3개');
      setVillaStandardOccupancy(6);
      setVillaMaxOccupancy(8);
      setVillaFloors(3);
      setVillaAreaSqm(380);
      setVillaPrivatePool(true);
      setVillaOceanView(true);
      setVillaAddress(`${presetCity} 해변로 리조트 단지`);
      setVillaGoogleMapUrl('');
      setVillaAirbnbUrl('');
      setVillaAmenities(POPULAR_VILLA_AMENITIES.slice(0, 8));
      setVillaCheckInTime('15:00');
      setVillaCheckOutTime('11:00');
      setVillaHouseRulesText('실내 절대 금연 (야외 테라스 이용)\n반려동물 입실 불가\n22:00 이후 심야 정숙\n바베큐 그릴 무료 이용 가능');
    } else if (category === '골프투어') {
      setFormData({
        title: `[${presetCity}/골프] 3박 5일 명문 CC 54홀 단독 골프투어`,
        subTitle: '그린피+캐디피+카트비 전액 포함, 5성급 호텔 숙박 및 단독 리무진 전용차량',
        category: '골프투어',
        region,
        city: presetCity,
        priceKRW: 950000,
        priceVND: 18000000,
        duration: '3박 5일',
        imageUrl: '',
        additionalImages: [],
        rating: 5.0,
        reviewCount: 32,
        isPopular: true,
        isHotDeal: false,
        discountPercent: 0,
        departureCities: ['인천', '김해', '대구', '청주'],
        tags: [`#${presetCity}골프`, '#그린피포함', '#54홀라운딩', '#단독차량'],
        description: `${presetCity} 최고 명문 골프장에서 즐기는 프리미엄 54홀 라운딩 투어로, 전 일정 그린피/캐디피/카트비와 5성급 호텔 숙박, 단독 전용 차량이 제공됩니다.`,
        address: '',
        googleMapUrl: '',
        airbnbUrl: '',
        included: ['전 일정 그린피 (54홀)', '1인 1캐디피 & 2인 1전동카트비', '5성급 호텔 숙박 & 조식', '전 일정 단독 전용차량 & 기사', '한국어 전문 가이드 동행', '여행자 보험'],
        excluded: ['왕복 항공권', '캐디 매너팁 ($15~20 / 18홀)', '클럽하우스 중식 및 개인 경비'],
        itinerary: [
          { day: 1, title: '공항 도착 및 가이드 미팅 후 호텔 체크인', description: '단독 전용차량으로 5성급 호텔 이동 후 휴식 및 자유시간', meal: '석식: 현지 특식', hotel: '5성급 호텔' },
          { day: 2, title: '1차 18홀 명품 라운딩 & 힐링 스파', description: '클럽하우스 이동 후 1차 18홀 라운딩, 마사지 90분 체험 및 특식 만찬', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 해산물 특식', hotel: '5성급 호텔' },
          { day: 3, title: '2차 18홀 라운딩 & 야경 투어', description: '2차 명문 코스 18홀 라운딩 후 시티 명소 및 야경 감상', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 특식', hotel: '5성급 호텔' },
          { day: 4, title: '3차 18홀 라운딩 후 공항 샌딩 & 귀국', description: '마지막 18홀 라운딩 후 체크아웃 및 공항 단독 배웅', meal: '조: 호텔식 / 중: 클럽하우스', hotel: '기내박' }
        ]
      });

      setGolfHoles(54);
      setGreenFeeIncluded(true);
      setCaddieFeeIncluded(true);
      setCartIncluded(true);
      setGolfCourseNamesText(`${presetCity} CC\n몽고메리 링스\n바나힐스 GC`);
      setIncludedText('전 일정 그린피 (54홀)\n1인 1캐디피 & 2인 1전동카트비\n5성급 호텔 숙박 & 조식\n전 일정 단독 전용차량 & 기사\n한국어 전문 가이드 동행\n여행자 보험');
      setExcludedText('왕복 항공권\n캐디 매너팁 ($15~20 / 18홀)\n클럽하우스 중식 및 개인 경비');
      setDepartureCitiesText('인천\n김해\n대구\n청주');
      setTagsText(`#${presetCity}골프\n#그린피포함\n#54홀라운딩\n#단독차량`);
      setItineraryList([
        { day: 1, title: '공항 도착 및 가이드 미팅 후 호텔 체크인', description: '단독 전용차량으로 5성급 호텔 이동 후 휴식 및 자유시간', meal: '석식: 현지 특식', hotel: '5성급 호텔' },
        { day: 2, title: '1차 18홀 명품 라운딩 & 힐링 스파', description: '클럽하우스 이동 후 1차 18홀 라운딩, 마사지 90분 체험 및 특식 만찬', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 해산물 특식', hotel: '5성급 호텔' },
        { day: 3, title: '2차 18홀 라운딩 & 야경 투어', description: '2차 명문 코스 18홀 라운딩 후 시티 명소 및 야경 감상', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 특식', hotel: '5성급 호텔' },
        { day: 4, title: '3차 18홀 라운딩 후 공항 샌딩 & 귀국', description: '마지막 18홀 라운딩 후 체크아웃 및 공항 단독 배웅', meal: '조: 호텔식 / 중: 클럽하우스', hotel: '기내박' }
      ]);
    } else if (category === '자유여행') {
      setFormData({
        title: `[${presetCity}/자유여행] 핵심 명소 & 단독 차량 1일 데이투어`,
        subTitle: '단독 전용차량 & 한국어 가이드 동행, 내가 원하는 코스로 자유롭게 힐링',
        category: '자유여행',
        region,
        city: presetCity,
        priceKRW: 120000,
        priceVND: 2200000,
        duration: '1일 (데이투어)',
        imageUrl: '',
        additionalImages: [],
        rating: 5.0,
        reviewCount: 29,
        isPopular: true,
        isHotDeal: false,
        discountPercent: 0,
        departureCities: ['현지 호텔 픽업'],
        tags: [`#${presetCity}자유여행`, '#1일투어', '#단독차량', '#자유일정'],
        description: `${presetCity}의 주요 관광지와 숨은 명소를 단독 차량과 전문 가이드와 함께 여유롭게 둘러보는 맞춤 1일 자유 데이투어입니다.`,
        address: '',
        googleMapUrl: '',
        airbnbUrl: '',
        included: ['단독 전용차량 및 기사 (8시간)', '한국어 전문 가이드 동행', '주요 명소 입장권', '생수 및 물티슈'],
        excluded: ['가이드/기사 매너팁', '개인 식음료 및 쇼핑 경비'],
        itinerary: [
          { day: 1, title: '호텔 픽업 -> 핵심 명소 투어 -> 로컬 맛집 -> 힐링 스파 -> 호텔 복귀', description: '09:00 전용차량 호텔 픽업 -> 랜드마크 관광 -> 현지 맛집 점심 -> 카페 및 스파 체험 -> 18:00 호텔 안전 귀환', meal: '중식: 로컬 특식', hotel: '숙소 미포함 (자유)' }
        ]
      });

      setIncludedText('단독 전용차량 및 기사 (8시간)\n한국어 전문 가이드 동행\n주요 명소 입장권\n생수 및 물티슈');
      setExcludedText('가이드/기사 매너팁\n개인 식음료 및 쇼핑 경비');
      setDepartureCitiesText('현지 호텔 픽업');
      setTagsText(`#${presetCity}자유여행\n#1일투어\n#단독차량\n#자유일정`);
      setItineraryList([
        { day: 1, title: '호텔 픽업 -> 핵심 명소 투어 -> 로컬 맛집 -> 힐링 스파 -> 호텔 복귀', description: '09:00 전용차량 호텔 픽업 -> 랜드마크 관광 -> 현지 맛집 점심 -> 카페 및 스파 체험 -> 18:00 호텔 안전 귀환', meal: '중식: 로컬 특식', hotel: '숙소 미포함 (자유)' }
      ]);
    } else {
      // 추천패키지
      setFormData({
        title: `[${presetCity}/패키지] 3박 5일 명품 단독 프라이빗 힐링 패키지`,
        subTitle: '전 일정 단독 전용차량 & 100% 한국인 전담 가이드 동행 5성급 힐링 여행',
        category: '추천패키지',
        region,
        city: presetCity,
        priceKRW: 690000,
        priceVND: 13000000,
        duration: '3박 5일',
        imageUrl: '',
        additionalImages: [],
        rating: 5.0,
        reviewCount: 56,
        isPopular: true,
        isHotDeal: false,
        discountPercent: 0,
        departureCities: ['인천', '김해', '대구', '청주'],
        tags: [`#${presetCity}여행`, '#추천패키지', '#단독차량', '#노쇼핑'],
        description: '고객 맞춤형 1:1 단독 프라이빗 여행 상품입니다. 노쇼핑, 노옵션으로 여유롭고 편안한 베트남 힐링을 보장합니다.',
        address: '',
        googleMapUrl: '',
        airbnbUrl: '',
        included: ['전 일정 단독 전용차량 & 기사', '한국어 전문 가이드 동행', '최고급 숙박 및 조식', '공항 단독 픽업/샌딩', '여행자 보험'],
        excluded: ['왕복 항공권 (선택 발권 가능)', '가이드/기사 매너팁', '개인 경비'],
        itinerary: [
          { day: 1, title: '공항 도착 및 가이드 미팅 & 체크인', description: '단독 차량으로 숙소 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 호텔/풀빌라' },
          { day: 2, title: '시티 주요 명소 투어 & 힐링 스파', description: '인기 관광지 관람 및 특식 다이닝, 90분 마사지', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 호텔/풀빌라' },
          { day: 3, title: '자유 일정 & 기념품 쇼핑 후 공항 배웅', description: '체크아웃 후 인기 카페 방문 및 공항 단독 샌딩', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
        ]
      });

      setIncludedText('전 일정 단독 전용차량 & 기사\n한국어 전문 가이드 동행\n최고급 숙박 및 조식\n공항 단독 픽업/샌딩\n여행자 보험');
      setExcludedText('왕복 항공권 (선택 발권 가능)\n가이드/기사 매너팁\n개인 경비');
      setDepartureCitiesText('인천\n김해\n대구\n청주');
      setTagsText(`#${presetCity}여행\n#추천패키지\n#단독차량\n#노쇼핑`);
      setItineraryList([
        { day: 1, title: '공항 도착 및 가이드 미팅 & 체크인', description: '단독 차량으로 숙소 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 호텔/풀빌라' },
        { day: 2, title: '시티 주요 명소 투어 & 힐링 스파', description: '인기 관광지 관람 및 특식 다이닝, 90분 마사지', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 호텔/풀빌라' },
        { day: 3, title: '자유 일정 & 기념품 쇼핑 후 공항 배웅', description: '체크아웃 후 인기 카페 방문 및 공항 단독 샌딩', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
      ]);
    }

    setGalleryImages([]);
    setActiveTab('editor');
  };

  // Open Edit for an existing product
  const handleOpenEdit = (prod: Product) => {
    setEditingId(prod.id);
    setFormData({ ...prod });

    const imgs: string[] = [];
    if (prod.imageUrl) imgs.push(prod.imageUrl);
    if (Array.isArray(prod.additionalImages)) {
      prod.additionalImages.forEach(img => {
        if (img && !imgs.includes(img)) imgs.push(img);
      });
    }
    setGalleryImages(imgs);

    setTagsText((prod.tags || []).join('\n'));
    setIncludedText((prod.included || []).join('\n'));
    setExcludedText((prod.excluded || []).join('\n'));
    setDepartureCitiesText((prod.departureCities || []).join('\n'));
    setItineraryList(prod.itinerary || []);

    if (prod.villaSpecs) {
      setVillaName(prod.villaSpecs.villaName || prod.title);
      setVillaStructureDesc(prod.villaSpecs.structureDescription || prod.description || '');
      setVillaBedrooms(prod.villaSpecs.bedrooms || 3);
      setVillaBathrooms(prod.villaSpecs.bathrooms || 3);
      setVillaBeds(prod.villaSpecs.beds || '킹베드 3개');
      setVillaStandardOccupancy(prod.villaSpecs.standardOccupancy || 6);
      setVillaMaxOccupancy(prod.villaSpecs.maxOccupancy || 8);
      setVillaFloors(prod.villaSpecs.floors || 2);
      setVillaAreaSqm(prod.villaSpecs.areaSqm || 300);
      setVillaPrivatePool(prod.villaSpecs.privatePool ?? true);
      setVillaOceanView(prod.villaSpecs.oceanView ?? true);
      setVillaAddress(prod.villaSpecs.address || prod.address || '');
      setVillaGoogleMapUrl(prod.villaSpecs.googleMapUrl || prod.googleMapUrl || '');
      setVillaAirbnbUrl(prod.villaSpecs.airbnbUrl || prod.airbnbUrl || '');
      setVillaAmenities(prod.villaSpecs.amenities || POPULAR_VILLA_AMENITIES.slice(0, 8));
      setVillaCheckInTime(prod.villaSpecs.checkInTime || '15:00');
      setVillaCheckOutTime(prod.villaSpecs.checkOutTime || '11:00');
      setVillaHouseRulesText((prod.villaSpecs.houseRules || []).join('\n') || '실내 절대 금연\n반려동물 입실 불가\n22:00 이후 심야 정숙');
    } else {
      setVillaName(prod.title);
      setVillaStructureDesc(prod.description || '');
      setVillaAddress(prod.address || '');
      setVillaGoogleMapUrl(prod.googleMapUrl || '');
      setVillaAirbnbUrl(prod.airbnbUrl || '');
      setVillaAmenities(POPULAR_VILLA_AMENITIES.slice(0, 8));
    }

    if (prod.golfSpecs) {
      setGolfHoles(prod.golfSpecs.holes || 54);
      setGreenFeeIncluded(prod.golfSpecs.greenFeeIncluded ?? true);
      setCaddieFeeIncluded(prod.golfSpecs.caddieFeeIncluded ?? true);
      setCartIncluded(prod.golfSpecs.cartIncluded ?? true);
      setGolfCourseNamesText((prod.golfSpecs.golfCourseNames || []).join('\n'));
    }

    setActiveTab('editor');
  };

  // Image Upload Handling (supports multiple files + Base64 reading)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target?.result as string;
        if (base64) {
          setGalleryImages(prev => [...prev, base64]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // Add sample photos for quick demo
  const handleAddSamplePhotos = (category: Category) => {
    let pool: string[] = [];
    if (category === '풀빌라') pool = sampleImages.villas;
    else if (category === '골프투어') pool = sampleImages.golf;
    else if (category === '자유여행') pool = sampleImages.dayTours;
    else pool = sampleImages.packages;

    setGalleryImages(prev => {
      const merged = [...prev];
      pool.forEach(url => {
        if (!merged.includes(url)) merged.push(url);
      });
      return merged;
    });
  };

  // Save (Add or Update) Handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    try {
      const splitText = (t: string) => t.split('\n').map(s => s.trim()).filter(Boolean);
      const mainImg = galleryImages.length > 0 ? galleryImages[0] : '';
      const isVilla = formData.category === '풀빌라';

      const payload: Partial<Product> = {
        ...formData,
        imageUrl: mainImg,
        additionalImages: galleryImages,
        tags: splitText(tagsText),
        address: isVilla ? (villaAddress || formData.address) : formData.address,
        googleMapUrl: isVilla ? (villaGoogleMapUrl || formData.googleMapUrl) : formData.googleMapUrl,
        airbnbUrl: isVilla ? (villaAirbnbUrl || formData.airbnbUrl) : formData.airbnbUrl
      };

      if (isVilla) {
        payload.description = villaStructureDesc || formData.description || '';
        payload.villaSpecs = {
          villaName: villaName || formData.title,
          structureDescription: villaStructureDesc,
          bedrooms: villaBedrooms,
          bathrooms: villaBathrooms,
          beds: villaBeds,
          standardOccupancy: villaStandardOccupancy,
          maxOccupancy: villaMaxOccupancy,
          floors: villaFloors,
          areaSqm: villaAreaSqm,
          privatePool: villaPrivatePool,
          oceanView: villaOceanView,
          address: villaAddress,
          googleMapUrl: villaGoogleMapUrl,
          airbnbUrl: villaAirbnbUrl,
          amenities: villaAmenities,
          checkInTime: villaCheckInTime,
          checkOutTime: villaCheckOutTime,
          houseRules: splitText(villaHouseRulesText)
        };
        payload.itinerary = [];
        payload.included = [];
        payload.excluded = [];
        payload.departureCities = [];
      } else if (formData.category === '골프투어') {
        payload.golfSpecs = {
          holes: golfHoles,
          greenFeeIncluded,
          caddieFeeIncluded,
          cartIncluded,
          golfCourseNames: splitText(golfCourseNamesText)
        };
        payload.included = splitText(includedText);
        payload.excluded = splitText(excludedText);
        payload.departureCities = splitText(departureCitiesText);
        payload.itinerary = itineraryList;
      } else {
        payload.included = splitText(includedText);
        payload.excluded = splitText(excludedText);
        payload.departureCities = splitText(departureCitiesText);
        payload.itinerary = itineraryList;
      }

      if (editingId) {
        await onUpdateProduct(editingId, payload);
        setSaveSuccessMsg(`✅ "${payload.title}" 상품이 안전하게 저장되었습니다!`);
      } else {
        await onAddProduct(payload as any);
        setSaveSuccessMsg(`🎉 새 상품 "${payload.title}"이(가) 성공적으로 등록 및 보존되었습니다!`);
      }

      setTimeout(() => {
        setSaveSuccessMsg(null);
        setActiveTab('list');
      }, 1500);
    } catch (err) {
      console.error('Save error:', err);
      alert('저장 중 문제가 발생했습니다: ' + err);
    } finally {
      setIsSaving(false);
    }
  };

  // Export & Import Backup JSON
  const handleExportBackup = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xinchao_products_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          if (window.confirm(`백업 파일에서 ${parsed.length}개의 상품을 불러와 복원하시겠습니까?`)) {
            for (const prod of parsed) {
              await onAddProduct(prod);
            }
            alert(`✅ ${parsed.length}개 상품이 성공적으로 복원되었습니다!`);
          }
        }
      } catch (err) {
        alert('올바른 JSON 백업 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategoryFilter === '전체' || p.category === selectedCategoryFilter;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.city.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col text-slate-100 font-sans overflow-hidden">
      {/* ================= TOP LUXURY ADMIN HEADER ================= */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                신짜오 투어 통합 관리자 매니지먼트
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                영구 저장 & 실시간 동기화 활성
              </span>
            </div>
            <p className="text-xs text-slate-400">
              풀빌라 · 골프투어 · 자유여행 · 추천패키지 전용 폼 & 예약 통합 콘솔
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-105"
            title="손님 화면으로 나가서 변경사항 확인"
          >
            <Eye className="w-4 h-4" />
            <span>손님용 화면 보기</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
            title="관리자 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ================= SECONDARY NAVIGATION & HERO ACTIONS ================= */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>등록 상품 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>상담/예약 문의 ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>데이터 백업 & 복원</span>
          </button>
        </div>

        {/* 4 Category Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 mr-1 hidden lg:inline">새 상품 등록:</span>
          
          <button
            onClick={() => handleOpenCreator('풀빌라')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-transform active:scale-95"
          >
            <Home className="w-3.5 h-3.5" />
            <span>+ 🏊 풀빌라 숙소 (에어비앤비형)</span>
          </button>

          <button
            onClick={() => handleOpenCreator('골프투어')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-transform active:scale-95"
          >
            <span>+ ⛳ 골프 투어 (54홀/그린피)</span>
          </button>

          <button
            onClick={() => handleOpenCreator('자유여행')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-transform active:scale-95"
          >
            <span>+ 🌴 자유여행 (1일/코스)</span>
          </button>

          <button
            onClick={() => handleOpenCreator('추천패키지')}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-transform active:scale-95"
          >
            <span>+ ✨ 추천 패키지 (단독)</span>
          </button>
        </div>
      </div>

      {/* ================= SAVE SUCCESS TOAST ================= */}
      {saveSuccessMsg && (
        <div className="bg-emerald-500 text-slate-950 px-4 py-2.5 text-center font-black text-sm flex items-center justify-center gap-2 animate-bounce shrink-0 shadow-lg">
          <CheckCircle className="w-5 h-5" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* ================= MAIN CONTENT BODY ================= */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

        {/* ================= TAB 1: PRODUCT LIST VIEW ================= */}
        {activeTab === 'list' && (
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400">카테고리:</span>
                {(['전체', '풀빌라', '골프투어', '자유여행', '추천패키지'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategoryFilter === cat
                        ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat === '풀빌라' && '🏊 '}
                    {cat === '골프투어' && '⛳ '}
                    {cat === '자유여행' && '🌴 '}
                    {cat === '추천패키지' && '✨ '}
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input & View Mode */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="상품명, 도시 검색..."
                    className="bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-44 sm:w-60"
                  />
                </div>

                <div className="flex items-center bg-slate-950 rounded-xl p-0.5 border border-slate-800">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs cursor-pointer ${viewMode === 'grid' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'}`}
                    title="카드 그리드 뷰"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs cursor-pointer ${viewMode === 'table' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'}`}
                    title="목록 테이블 뷰"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-14 text-center space-y-6">
                <div className="w-16 h-16 bg-amber-400/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-400/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-lg font-black text-white">등록된 상품이 비워진 상태입니다 (0개)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    이제 사장님의 진짜 상품을 원하는 카테고리별 맞춤 폼으로 바로 등록해보세요.<br />
                    등록하신 데이터는 브라우저와 서버에 <strong>영구적으로 안전 보존</strong>됩니다.
                  </p>
                </div>

                {/* 4 Launch Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
                  <button
                    onClick={() => handleOpenCreator('풀빌라')}
                    className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 hover:border-teal-400 hover:bg-teal-950/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-teal-400 font-black text-sm">
                      <Home className="w-4 h-4" />
                      <span>🏊 풀빌라 숙소 렌트</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      침실, 욕실, 침대, 기준/최대인원, 프라이빗 풀, 어메니티 및 하우스 룰 등록
                    </p>
                    <span className="inline-block mt-3 text-xs font-bold text-teal-300 group-hover:translate-x-1 transition-transform">
                      등록하기 &rarr;
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('골프투어')}
                    className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-950/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-emerald-400 font-black text-sm">
                      <span>⛳ 골프 투어 패키지</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      총 홀수(54홀), 그린피/캐디피/카트비 포함, 연계 명문 CC 및 라운딩 일정표 등록
                    </p>
                    <span className="inline-block mt-3 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
                      등록하기 &rarr;
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('자유여행')}
                    className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-950/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-cyan-400 font-black text-sm">
                      <span>🌴 자유여행 1일 투어</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      단독 전용차량/가이드, 맞춤 1일 자유 코스 및 핫플 투어 일정표 등록
                    </p>
                    <span className="inline-block mt-3 text-xs font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                      등록하기 &rarr;
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('추천패키지')}
                    className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-950/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-amber-400 font-black text-sm">
                      <span>✨ 추천 단독 패키지</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      전 일정 단독차량, 5성급 호텔, 일자별 상세 투어 코스 및 특식 일정 등록
                    </p>
                    <span className="inline-block mt-3 text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                      등록하기 &rarr;
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Grid View */}
            {filteredProducts.length > 0 && viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((prod, idx) => {
                  const isVilla = prod.category === '풀빌라';
                  const isGolf = prod.category === '골프투어';
                  const isFree = prod.category === '자유여행';

                  const badgeColor = isVilla
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                    : isGolf
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : isFree
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30';

                  const imgCount = 1 + (prod.additionalImages?.length || 0);

                  return (
                    <div
                      key={prod.id}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all"
                    >
                      <div>
                        {/* Image Preview & Badges */}
                        <div className="relative aspect-video bg-slate-950 overflow-hidden">
                          {prod.imageUrl ? (
                            <img
                              src={prod.imageUrl}
                              alt={prod.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-1">
                              <Camera className="w-8 h-8 opacity-50" />
                              <span className="text-[11px]">사진 미등록 (수정에서 등록)</span>
                            </div>
                          )}

                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-white font-mono text-[11px] font-bold">
                              #{idx + 1}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-black border backdrop-blur-xs ${badgeColor}`}>
                              {prod.category}
                            </span>
                          </div>

                          <div className="absolute top-2.5 right-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300 text-[10px] font-bold flex items-center gap-1">
                              <Camera className="w-3 h-3 text-amber-400" />
                              <span>{imgCount}장</span>
                            </span>
                          </div>

                          <div className="absolute bottom-2.5 left-2.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-amber-300 text-[11px] font-bold">
                              📍 {prod.region} · {prod.city}
                            </span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-4 space-y-2.5">
                          <h4 className="font-bold text-white text-sm line-clamp-1">
                            {prod.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {prod.subTitle || prod.description}
                          </p>

                          {/* Specific Specs Badges */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {isVilla && prod.villaSpecs && (
                              <>
                                <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800/40 px-2 py-0.5 rounded font-medium">
                                  🛏️ 침실 {prod.villaSpecs.bedrooms}개
                                </span>
                                <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800/40 px-2 py-0.5 rounded font-medium">
                                  👥 최대 {prod.villaSpecs.maxOccupancy}인
                                </span>
                                {prod.villaSpecs.privatePool && (
                                  <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800/40 px-2 py-0.5 rounded font-medium">
                                    🏊 전용풀
                                  </span>
                                )}
                              </>
                            )}

                            {isGolf && (
                              <>
                                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded font-medium">
                                  ⛳ {prod.golfSpecs?.holes || 54}홀
                                </span>
                                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded font-medium">
                                  🏌️ 그린피 포함
                                </span>
                              </>
                            )}

                            {isFree && (
                              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/40 px-2 py-0.5 rounded font-medium">
                                🚗 단독 전용차량 포함
                              </span>
                            )}

                            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                              ⏱️ {prod.duration}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-slate-800/60 flex items-baseline justify-between">
                            <span className="text-xs text-slate-400">판매 요금</span>
                            <div className="text-right">
                              <span className="text-base font-black text-amber-400">
                                {prod.priceKRW?.toLocaleString()}원
                              </span>
                              {prod.priceVND && (
                                <span className="text-[11px] text-slate-400 block font-mono">
                                  ≈ {prod.priceVND.toLocaleString()} VND
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>수정</span>
                          </button>

                          <button
                            onClick={async () => {
                              const dup: Omit<Product, 'id'> = {
                                ...prod,
                                title: `${prod.title} (복사본)`,
                                createdAt: new Date().toISOString()
                              };
                              await onAddProduct(dup);
                              alert(`📋 "${prod.title}" 복제본이 등록되었습니다.`);
                            }}
                            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                            title="상품 복제"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {onSelectProduct && (
                            <button
                              onClick={() => {
                                onSelectProduct(prod);
                                onClose();
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                              title="손님 화면에서 이 상품 상세 보기"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>미리보기</span>
                            </button>
                          )}
                        </div>

                        <button
                          onClick={async () => {
                            if (window.confirm(`"${prod.title}" 상품을 정말로 삭제하시겠습니까?`)) {
                              await onDeleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Table View */}
            {filteredProducts.length > 0 && viewMode === 'table' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3 w-12 text-center">#</th>
                      <th className="p-3">상품 정보</th>
                      <th className="p-3">유형/지역</th>
                      <th className="p-3">요금</th>
                      <th className="p-3">기간</th>
                      <th className="p-3 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredProducts.map((prod, idx) => (
                      <tr key={prod.id} className="hover:bg-slate-850">
                        <td className="p-3 text-center text-slate-500 font-mono">#{idx + 1}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.imageUrl || sampleImages.villas[0]}
                              alt=""
                              className="w-12 h-9 rounded-lg object-cover bg-slate-950 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1">{prod.title}</div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">{prod.subTitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-amber-300">{prod.category}</span>
                          <div className="text-[11px] text-slate-400">{prod.region} · {prod.city}</div>
                        </td>
                        <td className="p-3 font-bold text-white">
                          {prod.priceKRW?.toLocaleString()}원
                        </td>
                        <td className="p-3 text-slate-400">{prod.duration}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(prod)}
                              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-black text-xs cursor-pointer"
                            >
                              수정
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm(`"${prod.title}" 상품을 삭제하시겠습니까?`)) {
                                  await onDeleteProduct(prod.id);
                                }
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: SPECIALIZED PRODUCT EDITOR ================= */}
        {activeTab === 'editor' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Editor Header Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    formData.category === '풀빌라' ? 'bg-teal-500/20 text-teal-300' :
                    formData.category === '골프투어' ? 'bg-emerald-500/20 text-emerald-300' :
                    formData.category === '자유여행' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {formData.category} 전용 폼
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {editingId ? '기존 상품 상세 수정 모드' : '새 상품 신규 등록 모드'}
                  </span>
                </div>
                <h2 className="text-lg font-black text-white mt-1">
                  {formData.title || '새 여행/숙소 상품 등록'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer border border-slate-700"
                >
                  목록으로 돌아가기
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-6">
              {/* Category Selector Pill */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-black text-slate-300">상품 카테고리 전환:</span>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, category: cat });
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        formData.category === cat
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat === '풀빌라' && '🏊 '}
                      {cat === '골프투어' && '⛳ '}
                      {cat === '자유여행' && '🌴 '}
                      {cat === '추천패키지' && '✨ '}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Basic Info Section */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-lg">
                <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <span className="w-5 h-5 rounded bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">1</span>
                  <span>기본 정보 & 판매 요금</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-black text-slate-300">상품명 (손님에게 가장 크게 노출)</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="예: [다낭] 럭셔리 프라이빗 독채 풀빌라 3베드룸"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-black text-slate-300">한줄 소개 (서브 타이틀)</label>
                    <input
                      type="text"
                      value={formData.subTitle || ''}
                      onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                      placeholder="예: 전용 인피니티 풀 & 오션뷰 테라스, 3개 킹베드 침실, 바베큐 완비"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">권역 (지역 구분)</label>
                    <select
                      value={formData.region || '중부'}
                      onChange={(e) => {
                        const reg = e.target.value as Region;
                        setFormData({ ...formData, region: reg, city: CITIES[reg][0] });
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="중부">중부 (다낭/나트랑/호이안/후에)</option>
                      <option value="남부">남부 (푸꾸옥/호치민/달랏/붕따우)</option>
                      <option value="북부">북부 (하노이/하롱베이/사파/닌빈)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">도시</label>
                    <select
                      value={formData.city || '다낭'}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value as City })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      {(CITIES[formData.region || '중부'] || []).map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">판매 요금 (원화 KRW)</label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        value={formData.priceKRW || 0}
                        onChange={(e) => {
                          const krw = Number(e.target.value);
                          setFormData({
                            ...formData,
                            priceKRW: krw,
                            priceVND: Math.round(krw * 18.8)
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">원</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">베트남 동화 (VND 실시간 환산)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.priceVND || 0}
                        onChange={(e) => setFormData({ ...formData, priceVND: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">VND</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">기준 기간 / 숙박 단위</label>
                    <input
                      type="text"
                      value={formData.duration || '1박 기준'}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="예: 1박 기준, 3박 5일, 1일 (데이투어)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">평점 (1.0 ~ 5.0)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating || 5.0}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Photo Gallery Section */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">2</span>
                    <span>사진 갤러리 관리 ({galleryImages.length}장 등록됨)</span>
                  </h3>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddSamplePhotos(formData.category || '풀빌라')}
                      className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 font-bold text-xs cursor-pointer transition-colors border border-amber-400/30"
                    >
                      + 샘플 고화질 사진 자동 추가
                    </button>
                    {galleryImages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setGalleryImages([])}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs cursor-pointer transition-colors"
                      >
                        사진 모두 비우기
                      </button>
                    )}
                  </div>
                </div>

                {/* Upload Action Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Upload Button */}
                  <label className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 hover:border-amber-400 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
                    <Camera className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white">내 컴퓨터/스마트폰 사진 다중 업로드</span>
                    <span className="text-[11px] text-slate-500">JPG, PNG 파일 다중 선택 가능</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Manual URL Input */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-300">이미지 웹 URL 직접 추가</span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={manualImageUrl}
                        onChange={(e) => setManualImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (manualImageUrl) {
                            setGalleryImages([...galleryImages, manualImageUrl]);
                            setManualImageUrl('');
                          }
                        }}
                        className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                      >
                        추가
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gallery Preview Thumbnails */}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px]">
                            대표사진
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 p-1 rounded-md bg-slate-950/80 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="삭제"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ================= SPECIALIZED FORM: VILLA AIRBNB ================= */}
              {formData.category === '풀빌라' && (
                <div className="bg-slate-900 border border-teal-500/40 p-6 rounded-3xl space-y-5 shadow-lg">
                  <h3 className="text-sm font-black text-teal-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Home className="w-4 h-4 text-teal-400" />
                    <span>3. 🏊 풀빌라 전용 스펙 & 에어비앤비 호스팅 옵션</span>
                  </h3>

                  {/* Villa Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">침실 수 (Bedrooms)</label>
                      <input
                        type="number"
                        value={villaBedrooms}
                        onChange={(e) => setVillaBedrooms(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">욕실 수 (Baths)</label>
                      <input
                        type="number"
                        value={villaBathrooms}
                        onChange={(e) => setVillaBathrooms(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">침대 구성</label>
                      <input
                        type="text"
                        value={villaBeds}
                        onChange={(e) => setVillaBeds(e.target.value)}
                        placeholder="예: 킹베드 3개"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">최대 수용 인원</label>
                      <input
                        type="number"
                        value={villaMaxOccupancy}
                        onChange={(e) => setVillaMaxOccupancy(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">건물 층수 (Floors)</label>
                      <input
                        type="number"
                        value={villaFloors}
                        onChange={(e) => setVillaFloors(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">전용 면적 (㎡)</label>
                      <input
                        type="number"
                        value={villaAreaSqm}
                        onChange={(e) => setVillaAreaSqm(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-teal-300">
                        <input
                          type="checkbox"
                          checked={villaPrivatePool}
                          onChange={(e) => setVillaPrivatePool(e.target.checked)}
                          className="w-4 h-4 rounded text-teal-500"
                        />
                        <span>🏊 전용 단독 수영장</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-teal-300">
                        <input
                          type="checkbox"
                          checked={villaOceanView}
                          onChange={(e) => setVillaOceanView(e.target.checked)}
                          className="w-4 h-4 rounded text-teal-500"
                        />
                        <span>🌊 바다 전망 (오션뷰)</span>
                      </label>
                    </div>
                  </div>

                  {/* Structure Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">층별 공간 구조 & 객실 설명</label>
                    <textarea
                      rows={3}
                      value={villaStructureDesc}
                      onChange={(e) => setVillaStructureDesc(e.target.value)}
                      placeholder="1층: 넓은 거실, 주방, 전용 수영장 및 바베큐장&#10;2층: 킹사이즈 침실 2개 (전용 욕실 포함)&#10;3층: 마스터 오션뷰 룸 및 루프탑 테라스"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed"
                    />
                  </div>

                  {/* Amenities Chips Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-300">어메니티 & 편의시설 (원클릭 선택)</label>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_VILLA_AMENITIES.map(amenity => {
                        const isSelected = villaAmenities.includes(amenity);
                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => {
                              if (isSelected) setVillaAmenities(villaAmenities.filter(a => a !== amenity));
                              else setVillaAmenities([...villaAmenities, amenity]);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-teal-500 text-slate-950 shadow-sm'
                                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {amenity}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* House Rules & Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">체크인 시간</label>
                      <input
                        type="text"
                        value={villaCheckInTime}
                        onChange={(e) => setVillaCheckInTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">체크아웃 시간</label>
                      <input
                        type="text"
                        value={villaCheckOutTime}
                        onChange={(e) => setVillaCheckOutTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">숙소 주소</label>
                      <input
                        type="text"
                        value={villaAddress}
                        onChange={(e) => setVillaAddress(e.target.value)}
                        placeholder="예: 다낭 해변로 리조트 단지"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ================= SPECIALIZED FORM: GOLF TOUR ================= */}
              {formData.category === '골프투어' && (
                <div className="bg-slate-900 border border-emerald-500/40 p-6 rounded-3xl space-y-4 shadow-lg">
                  <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span>⛳ 3. 골프 투어 전용 스펙 & 라운딩 옵션</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">총 라운딩 홀 수</label>
                      <input
                        type="number"
                        value={golfHoles}
                        onChange={(e) => setGolfHoles(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-300">
                        <input
                          type="checkbox"
                          checked={greenFeeIncluded}
                          onChange={(e) => setGreenFeeIncluded(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500"
                        />
                        <span>그린피 전액 포함</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-300">
                        <input
                          type="checkbox"
                          checked={caddieFeeIncluded}
                          onChange={(e) => setCaddieFeeIncluded(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500"
                        />
                        <span>1인 1캐디피 포함</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-300">
                        <input
                          type="checkbox"
                          checked={cartIncluded}
                          onChange={(e) => setCartIncluded(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500"
                        />
                        <span>2인 1전동카트비 포함</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">연계 명문 골프장 목록 (CC명 줄바꿈 구분)</label>
                    <textarea
                      rows={2}
                      value={golfCourseNamesText}
                      onChange={(e) => setGolfCourseNamesText(e.target.value)}
                      placeholder="다낭 CC&#10;몽고메리 링스&#10;바나힐스 GC"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* ================= SPECIALIZED FORM: FREE TOUR / DAY TOUR ================= */}
              {formData.category === '자유여행' && (
                <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-3xl space-y-4 shadow-lg">
                  <h3 className="text-sm font-black text-cyan-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span>🌴 3. 자유여행 / 데이투어 특화 옵션</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-cyan-300">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 rounded text-cyan-500"
                        />
                        <span>🚗 단독 전용 차량 및 현지 기사 포함 (자유 일정)</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-cyan-300">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 rounded text-cyan-500"
                        />
                        <span>🗣️ 100% 한국어 전문 가이드 단독 동행</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TOUR ITINERARY & INCLUSIONS (NON-VILLA) ================= */}
              {formData.category !== '풀빌라' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-lg">
                  <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="w-5 h-5 rounded bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">4</span>
                    <span>포함/불포함 및 일자별 코스 일정표</span>
                  </h3>

                  {/* Included / Excluded */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-emerald-400">포함 사항 (줄바꿈 구분)</label>
                      <textarea
                        rows={3}
                        value={includedText}
                        onChange={(e) => setIncludedText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-rose-400">불포함 사항 (줄바꿈 구분)</label>
                      <textarea
                        rows={3}
                        value={excludedText}
                        onChange={(e) => setExcludedText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Itinerary List */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-slate-300">
                        {formData.category === '자유여행' ? '코스별 상세 동선' : '일차별 투어 일정표'} ({itineraryList.length}개)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const next = itineraryList.length + 1;
                          setItineraryList([
                            ...itineraryList,
                            {
                              day: next,
                              title: `${next}일차 일정`,
                              description: '상세 일정 내용을 입력하세요.',
                              meal: '조: 호텔식 / 중: 특식 / 석: 자유식',
                              hotel: '5성급 호텔'
                            }
                          ]);
                        }}
                        className="px-3 py-1 rounded-xl bg-amber-400/20 text-amber-300 font-bold text-xs cursor-pointer hover:bg-amber-400/30"
                      >
                        + 추가
                      </button>
                    </div>

                    {itineraryList.map((dayItem, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-400">#{idx + 1} {formData.category === '자유여행' ? '코스' : '일차'}</span>
                          <button
                            type="button"
                            onClick={() => setItineraryList(itineraryList.filter((_, i) => i !== idx))}
                            className="text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer"
                          >
                            삭제
                          </button>
                        </div>
                        <input
                          type="text"
                          value={dayItem.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItineraryList(prev => prev.map((d, i) => i === idx ? { ...d, title: val } : d));
                          }}
                          placeholder="일정/코스 제목"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                        <textarea
                          rows={2}
                          value={dayItem.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setItineraryList(prev => prev.map((d, i) => i === idx ? { ...d, description: val } : d));
                          }}
                          placeholder="상세 일정 내용"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div className="sticky bottom-0 z-10 bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-2xl">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>손님 화면으로 나가기</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold text-xs cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 cursor-pointer flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? '안전 저장 중...' : '💾 최종 저장하기 (영구 보존)'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 3: INQUIRIES ================= */}
        {activeTab === 'inquiries' && (
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">실시간 고객 예약 및 견적 문의 ({inquiries.length}건)</h3>
                <p className="text-xs text-slate-400">카카오톡 상담 및 예약 요청이 들어오면 실시간으로 접수됩니다.</p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-xs">
                접수된 상담 문의가 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiries.map(inq => (
                  <div key={inq.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{inq.userName} 고객님</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inq.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                        inq.status === 'in_progress' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {inq.status === 'completed' ? '완료' : inq.status === 'in_progress' ? '상담진행중' : '대기중'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div>📞 연락처: <span className="font-bold text-white">{inq.userPhone}</span></div>
                      {inq.kakaoId && <div>💬 카카오톡 ID: <span className="font-bold text-amber-300">{inq.kakaoId}</span></div>}
                      <div>📅 희망일정: {inq.startDate || '미정'} / 인원: 성인 {inq.travelerCount.adult}명, 아동 {inq.travelerCount.child}명</div>
                      {inq.productTitle && <div className="text-amber-400 font-bold">📦 문의 상품: {inq.productTitle}</div>}
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 border border-slate-800">
                      "{inq.message}"
                    </div>

                    {onUpdateInquiryStatus && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => onUpdateInquiryStatus(inq.id, 'in_progress')}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-cyan-300 cursor-pointer"
                        >
                          상담 중
                        </button>
                        <button
                          onClick={() => onUpdateInquiryStatus(inq.id, 'completed')}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-emerald-300 cursor-pointer"
                        >
                          완료 처리
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: BACKUP & SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <span>데이터 백업 다운로드 및 복원 센터</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                등록하신 모든 풀빌라, 골프투어, 자유여행, 패키지 상품 데이터는 <strong>IndexedDB 및 서버 파일</strong>에 실시간 보존되고 있습니다. 필요할 때 언제든 JSON 파일로 다운로드하여 백업해두실 수 있습니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleExportBackup}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                    <Download className="w-4 h-4" />
                    <span>JSON 백업 파일 다운로드</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    현재 등록된 {products.length}개 상품 전체를 파일로 저장합니다.
                  </p>
                </button>

                <label className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-left transition-all cursor-pointer group block">
                  <div className="flex items-center gap-2 text-teal-400 font-black text-sm">
                    <Upload className="w-4 h-4" />
                    <span>백업 파일 불러와서 복원</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    저장해둔 JSON 백업 파일을 선택하여 상품을 복원합니다.
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Danger Zone */}
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-rose-400">데이터 초기화 (주의)</h4>
                <div className="flex flex-wrap gap-2">
                  {onClearAllPhotos && (
                    <button
                      onClick={async () => {
                        if (window.confirm('모든 상품의 사진을 0장으로 비우시겠습니까?')) {
                          await onClearAllPhotos();
                          alert('모든 사진이 비워졌습니다.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-400/20 text-amber-300 text-xs font-bold cursor-pointer"
                    >
                      🧹 모든 상품 사진 일괄 비우기
                    </button>
                  )}

                  {onClearAllProducts && (
                    <button
                      onClick={async () => {
                        if (window.confirm('정말로 모든 상품을 삭제하고 0개로 비우시겠습니까?')) {
                          await onClearAllProducts();
                          alert('모든 상품이 삭제되었습니다.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold cursor-pointer"
                    >
                      🗑️ 모든 상품 삭제 (0개로 비우기)
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      if (window.confirm('초기 샘플 데이터로 복원하시겠습니까?')) {
                        await onResetProducts();
                        alert('기본 샘플 상품이 복원되었습니다.');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 inline mr-1" />
                    기본 샘플 복원
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminPanel;
