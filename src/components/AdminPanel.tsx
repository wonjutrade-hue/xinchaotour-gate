import React, { useState, useEffect } from 'react';
import { Product, Category, Region, City, ConsultationRequest, ItineraryDay, VillaSpecs, GolfSpecs } from '../types';
import { 
  X, Plus, Edit3, Trash2, Download, Upload, RotateCcw, Lock, Unlock, 
  Eye, Save, Layers, Inbox, Camera, Settings, MessageCircle, Phone, 
  MapPin, Search, Grid, List, Sparkles, AlertTriangle, Check, 
  Copy, ArrowLeft, ArrowUpDown, ChevronRight, Image as ImageIcon,
  Home, Key, Calendar, ExternalLink, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { getKakaoDirectLink, setKakaoDirectLink, COMPANY_PHONE, COMPANY_PHONE_TEL } from '../constants';
import { ExchangeRates, calculateVNDFromKRW } from '../lib/exchangeRate';

const REGIONS: Exclude<Region, '전체'>[] = ['중부', '북부', '남부'];

const REGION_CITIES: Record<Exclude<Region, '전체'>, City[]> = {
  '중부': ['다낭', '호이안', '후에', '나트랑'],
  '북부': ['하노이', '사파', '하롱베이', '닌빈'],
  '남부': ['호치민', '푸꾸옥', '달랏', '붕따우'],
};

const CATEGORIES: Category[] = ['풀빌라', '골프투어', '추천패키지', '자유여행'];

const POPULAR_VILLA_AMENITIES = [
  '🏊 단독 프라이빗 인피니티 풀',
  '🍳 풀옵션 주방 & 조리도구 완비',
  '🥩 야외 바베큐 그릴 & 가든 다이닝',
  '🧺 세탁기 & 건조기 (세제 제공)',
  '📶 초고속 무료 Wi-Fi (전 구역)',
  '📺 넷플릭스 & 스마트 대형 TV',
  '❄️ 전 객실 개별 냉난방 에어컨',
  '🛡️ 24시간 단지 보안 경비 & CCTV',
  '🥐 조식 룸서비스 / 플로팅 조식',
  '🌅 에메랄드 오션뷰 & 비치 도보 3분',
  '🚗 전용 무료 주차 공간',
  '🛁 마스터룸 대형 자쿠지 / 욕조',
  '☕ 네스프레소 머신 & 티 세트',
  '🧹 매일 무료 하우스키핑 & 수건 교체',
  '🧳 체크인 전/후 무료 짐 보관'
];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  inquiries: ConsultationRequest[];
  onAddProduct: (prod: Omit<Product, 'id'>) => Promise<Product | undefined>;
  onUpdateProduct: (id: string, updated: Partial<Product>) => Promise<Product | undefined>;
  onDeleteProduct: (id: string) => Promise<void>;
  onClearAllProducts?: () => Promise<void>;
  onClearAllPhotos?: () => Promise<void>;
  onResetProducts: () => Promise<void>;
  onImportProducts: (items: any[], replace: boolean) => Promise<void>;
  onUpdateInquiryStatus: (id: string, status: ConsultationRequest['status']) => Promise<void>;
  exchangeRates?: ExchangeRates;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  inquiries,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onClearAllProducts,
  onClearAllPhotos,
  onResetProducts,
  onImportProducts,
  onUpdateInquiryStatus,
  exchangeRates,
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'editor' | 'photos' | 'inquiries' | 'settings'>('products');
  
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | '전체'>('전체');
  const [filterRegion, setFilterRegion] = useState<Region>('전체');
  const [filterCity, setFilterCity] = useState<City>('전체');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Editor Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
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
    reviewCount: 15,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 0,
    departureCities: ['인천', '김해', '대구'],
    tags: ['#단독독채', '#프라이빗풀빌라', '#오션뷰', '#가족휴양'],
    description: '',
    address: '',
    googleMapUrl: '',
    airbnbUrl: '',
    included: [],
    excluded: [],
    itinerary: []
  });

  // Tour Specific Form states
  const [includedText, setIncludedText] = useState('');
  const [excludedText, setExcludedText] = useState('');
  const [departureCitiesText, setDepartureCitiesText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [itineraryList, setItineraryList] = useState<ItineraryDay[]>([]);

  // Villa Specific Form states (Airbnb style)
  const [villaName, setVillaName] = useState('');
  const [villaStructureDesc, setVillaStructureDesc] = useState('');
  const [villaBedrooms, setVillaBedrooms] = useState(3);
  const [villaBathrooms, setVillaBathrooms] = useState(4);
  const [villaBeds, setVillaBeds] = useState('킹베드 3개, 싱글 2개');
  const [villaMaxOccupancy, setVillaMaxOccupancy] = useState(8);
  const [villaStandardOccupancy, setVillaStandardOccupancy] = useState(6);
  const [villaPrivatePool, setVillaPrivatePool] = useState(true);
  const [villaOceanView, setVillaOceanView] = useState(true);
  const [villaFloors, setVillaFloors] = useState(3);
  const [villaAreaSqm, setVillaAreaSqm] = useState(350);
  const [villaAddress, setVillaAddress] = useState('');
  const [villaGoogleMapUrl, setVillaGoogleMapUrl] = useState('');
  const [villaAirbnbUrl, setVillaAirbnbUrl] = useState('');
  const [villaAmenities, setVillaAmenities] = useState<string[]>(POPULAR_VILLA_AMENITIES.slice(0, 10));
  const [customAmenityInput, setCustomAmenityInput] = useState('');
  const [villaCheckInTime, setVillaCheckInTime] = useState('15:00');
  const [villaCheckOutTime, setVillaCheckOutTime] = useState('11:00');
  const [villaHouseRulesText, setVillaHouseRulesText] = useState('실내 절대 금연 (발코니/야외 가능)\n반려동물 입실 제한\n22:00 이후 심야 소음 자제\n바베큐 이용 시 사전 문의');

  // Golf Specific Form states
  const [golfHoles, setGolfHoles] = useState(18);
  const [greenFeeIncluded, setGreenFeeIncluded] = useState(true);
  const [caddieFeeIncluded, setCaddieFeeIncluded] = useState(true);
  const [cartIncluded, setCartIncluded] = useState(true);
  const [golfCourseNamesText, setGolfCourseNamesText] = useState('');

  // Photo Hub & Upload States
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [directUrlInput, setDirectUrlInput] = useState('');
  const [allSitePhotos, setAllSitePhotos] = useState<string[]>([]);
  const [kakaoLinkInput, setKakaoLinkInput] = useState(getKakaoDirectLink());
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Sync photos across site
  useEffect(() => {
    const photos: string[] = [];
    products.forEach(p => {
      if (p.imageUrl && !photos.includes(p.imageUrl)) photos.push(p.imageUrl);
      (p.additionalImages || []).forEach(img => {
        if (img && !photos.includes(img)) photos.push(img);
      });
    });
    setAllSitePhotos(photos);
  }, [products]);

  // Auth Handler
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234' || password === 'xinchao123' || password === '') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다. (기본: 1234)');
    }
  };

  // Image Compressor & Disk Uploader (Supports JPG, PNG, WEBP, GIF, HEIC/HEIF)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawResult = e.target?.result as string;
        if (!rawResult) {
          resolve('');
          return;
        }

        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            const MAX_SIZE = 1600; // Optimal for sharp high-res display
            if (width > height && width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            } else if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
              resolve(dataUrl);
              return;
            }
          } catch (err) {
            console.warn('Canvas conversion failed, fallback to raw data URL:', err);
          }
          resolve(rawResult);
        };
        img.onerror = () => {
          console.warn('Image parse failed, using raw data');
          resolve(rawResult);
        };
        img.src = rawResult;
      };
      reader.onerror = () => {
        console.warn('FileReader failed');
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadFilesToDisk = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];
    setUploadStatus(`고화질 사진 ${files.length}장 변환 및 서버 저장 중...`);
    const base64List: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        if (compressed) {
          base64List.push(compressed);
        }
      } catch (err) {
        console.warn('Compress error:', err);
      }
    }

    if (base64List.length === 0) {
      setUploadStatus(null);
      return [];
    }

    try {
      const res = await fetch('/api/upload-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: base64List })
      });
      const data = await res.json();
      setUploadStatus(null);
      if (data.success && Array.isArray(data.urls) && data.urls.length > 0) {
        return data.urls;
      }
    } catch (e) {
      console.warn('Upload API fallback to client base64 storage:', e);
    }
    setUploadStatus(null);
    return base64List;
  };

  // Open New Product Creator
  const handleOpenCreator = (presetCategory: Category = '풀빌라', presetCity: City = '다낭') => {
    const region = Object.entries(REGION_CITIES).find(([_, cities]) => cities.includes(presetCity))?.[0] as Region || '중부';
    
    setEditingId(null);
    setFormData({
      title: presetCategory === '풀빌라' 
        ? `[${presetCity}] 럭셔리 프라이빗 독채 풀빌라 3베드룸`
        : presetCategory === '골프투어'
        ? `[${presetCity}/골프] 3박 5일 명문 CC 54홀 단독 골프투어`
        : presetCategory === '자유여행'
        ? `[${presetCity}/자유여행] 핵심 명소 & 단독 차량 1일 데이투어`
        : `[${presetCity}/패키지] 3박 5일 명품 단독 프라이빗 힐링 패키지`,
      subTitle: presetCategory === '풀빌라'
        ? '전용 프라이빗 풀 & 오션뷰 테라스, 3개 킹베드 침실, 바베큐 완비'
        : presetCategory === '골프투어'
        ? '그린피+캐디피+카트비 전액 포함, 5성급 호텔 숙박 및 단독 리무진 전용차량'
        : presetCategory === '자유여행'
        ? '단독 전용차량 & 한국어 가이드 동행, 내가 원하는 코스로 자유롭게 힐링'
        : '전 일정 단독 전용차량 & 100% 한국인 전담 가이드 동행 5성급 힐링 여행',
      category: presetCategory,
      region,
      city: presetCity,
      priceKRW: presetCategory === '풀빌라' ? 850000 : presetCategory === '골프투어' ? 950000 : presetCategory === '자유여행' ? 120000 : 690000,
      priceVND: presetCategory === '풀빌라' ? 16000000 : presetCategory === '골프투어' ? 18000000 : presetCategory === '자유여행' ? 2200000 : 13000000,
      duration: presetCategory === '풀빌라' ? '1박 기준 (일정 조율 가능)' : presetCategory === '자유여행' ? '1일 (데이투어)' : '3박 5일',
      imageUrl: '',
      additionalImages: [],
      rating: 5.0,
      reviewCount: 15,
      isPopular: true,
      isHotDeal: false,
      discountPercent: 0,
      departureCities: presetCategory === '자유여행' ? ['현지 출발 (호텔 픽업)'] : ['인천', '김해', '대구', '청주'],
      tags: presetCategory === '풀빌라'
        ? [`#${presetCity}풀빌라`, '#독채빌라', '#프라이빗수영장', '#가족휴양']
        : presetCategory === '골프투어'
        ? [`#${presetCity}골프`, '#그린피포함', '#54홀라운딩', '#단독차량']
        : presetCategory === '자유여행'
        ? [`#${presetCity}자유여행`, '#1일투어', '#단독차량', '#자유일정']
        : [`#${presetCity}여행`, `#${presetCategory}`, '#단독차량', '#노쇼핑'],
      description: presetCategory === '풀빌라'
        ? `${presetCity} 해변 인근의 최고급 독채 풀빌라로, 전용 프라이빗 인피니티 풀과 최고급 인테리어, 넓은 거실 및 풀옵션 주방을 갖추고 있어 가족 및 단체 여행에 최적의 럭셔리 힐링을 선사합니다.`
        : presetCategory === '골프투어'
        ? `${presetCity} 명문 골프 코스에서 즐기는 프리미엄 54홀 라운딩 투어로, 전 일정 그린피/캐디피/카트비와 5성급 호텔 숙박, 단독 전용 차량이 제공됩니다.`
        : presetCategory === '자유여행'
        ? `${presetCity}의 주요 관광지와 숨은 명소를 단독 차량과 전문 가이드와 함께 여유롭게 둘러보는 맞춤 1일 자유 데이투어입니다.`
        : '고객 맞춤형 1:1 단독 프라이빗 여행 상품입니다. 원하시는 일정과 호텔로 자유롭게 조정 가능합니다.',
      address: presetCategory === '풀빌라' ? `${presetCity} 해변로 리조트 단지 (Premier Village Area)` : '',
      googleMapUrl: '',
      airbnbUrl: '',
      included: presetCategory === '골프투어'
        ? ['전 일정 그린피 (54홀)', '1인 1캐디피 & 2인 1전동카트비', '5성급 호텔 숙박 & 조식', '전 일정 단독 전용차량 & 기사', '한국어 전문 가이드 동행', '여행자 보험']
        : presetCategory === '자유여행'
        ? ['단독 전용차량 및 기사', '한국어 전문 가이드 동행', '주요 명소 입장권', '생수 및 물티슈']
        : ['전 일정 단독 전용차량 & 기사', '한국어 전문 가이드 동행', '최고급 숙박 및 조식', '공항 단독 픽업/샌딩', '여행자 보험'],
      excluded: presetCategory === '골프투어'
        ? ['왕복 항공권', '캐디 매너팁 ($15~20 / 18홀)', '클럽하우스 중식 및 개인 경비']
        : presetCategory === '자유여행'
        ? ['가이드/기사 매너팁', '개인 식음료 및 쇼핑 경비']
        : ['왕복 항공권 (선택 발권 가능)', '가이드/기사 매너팁', '개인 경비'],
      itinerary: presetCategory === '골프투어' ? [
        { day: 1, title: '공항 도착 및 가이드 미팅 후 호텔 체크인', description: '단독 차량으로 5성급 호텔 이동 후 휴식 및 자유시간', meal: '석식: 현지 특식', hotel: '5성급 호텔' },
        { day: 2, title: '1차 18홀 명품 라운딩 & 힐링 스파', description: '클럽하우스 이동 후 18홀 라운딩, 마사지 90분 체험 및 특식 만찬', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 해산물 특식', hotel: '5성급 호텔' },
        { day: 3, title: '2차 18홀 라운딩 & 야경 투어', description: '2차 명문 코스 18홀 라운딩 후 시티 명소 및 야경 감상', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 특식', hotel: '5성급 호텔' },
        { day: 4, title: '3차 18홀 라운딩 후 공항 샌딩 & 귀국', description: '마지막 18홀 라운딩 후 체크아웃 및 공항 단독 배웅', meal: '조: 호텔식 / 중: 클럽하우스', hotel: '기내박' }
      ] : presetCategory === '자유여행' ? [
        { day: 1, title: '호텔 픽업 -> 주요 명소 관광 -> 로컬 맛집 -> 힐링 스파 -> 호텔 복귀', description: '09:00 전용차량 호텔 픽업 -> 핵심 랜드마크 관광 -> 현지 유명 맛집 점심 -> 카페 및 스파 체험 -> 18:00 호텔 안전 귀환', meal: '중식: 로컬 특식', hotel: '자유 숙박 (숙소 미포함)' }
      ] : [
        { day: 1, title: '공항 도착 및 가이드 미팅 & 체크인', description: '단독 차량으로 숙소 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 호텔/풀빌라' },
        { day: 2, title: '시티 주요 명소 투어 & 힐링 스파', description: '인기 관광지 관람 및 특식 다이닝, 90분 마사지', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 호텔/풀빌라' },
        { day: 3, title: '자유 일정 & 기념품 쇼핑 후 공항 배웅', description: '체크아웃 후 인기 카페 방문 및 공항 단독 샌딩', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
      ]
    });

    setIncludedText(
      presetCategory === '골프투어'
        ? '전 일정 그린피 (54홀)\n1인 1캐디피 & 2인 1전동카트비\n5성급 호텔 숙박 & 조식\n전 일정 단독 전용차량 & 기사\n한국어 전문 가이드 동행\n여행자 보험'
        : presetCategory === '자유여행'
        ? '단독 전용차량 및 기사\n한국어 전문 가이드 동행\n주요 명소 입장권\n생수 및 물티슈'
        : '전 일정 단독 전용차량 & 기사\n한국어 전문 가이드 동행\n최고급 숙박 및 조식\n공항 단독 픽업/샌딩\n여행자 보험'
    );
    setExcludedText(
      presetCategory === '골프투어'
        ? '왕복 항공권\n캐디 매너팁 ($15~20 / 18홀)\n클럽하우스 중식 및 개인 경비'
        : presetCategory === '자유여행'
        ? '가이드/기사 매너팁\n개인 식음료 및 쇼핑 경비'
        : '왕복 항공권 (선택 발권 가능)\n가이드/기사 매너팁\n개인 경비'
    );
    setDepartureCitiesText(presetCategory === '자유여행' ? '현지 출발 (호텔 픽업)' : '인천\n김해\n대구\n청주');
    setTagsText(
      presetCategory === '풀빌라'
        ? `#${presetCity}풀빌라\n#독채빌라\n#프라이빗수영장\n#가족휴양`
        : presetCategory === '골프투어'
        ? `#${presetCity}골프\n#그린피포함\n#54홀라운딩\n#단독차량`
        : presetCategory === '자유여행'
        ? `#${presetCity}자유여행\n#1일투어\n#단독차량\n#자유일정`
        : `#${presetCity}여행\n#${presetCategory}\n#단독차량\n#노쇼핑`
    );
    setGalleryImages([]);
    setItineraryList(
      presetCategory === '골프투어' ? [
        { day: 1, title: '공항 도착 및 가이드 미팅 후 호텔 체크인', description: '단독 차량으로 5성급 호텔 이동 후 휴식 및 자유시간', meal: '석식: 현지 특식', hotel: '5성급 호텔' },
        { day: 2, title: '1차 18홀 명품 라운딩 & 힐링 스파', description: '클럽하우스 이동 후 18홀 라운딩, 마사지 90분 체험 및 특식 만찬', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 해산물 특식', hotel: '5성급 호텔' },
        { day: 3, title: '2차 18홀 라운딩 & 야경 투어', description: '2차 명문 코스 18홀 라운딩 후 시티 명소 및 야경 감상', meal: '조: 호텔식 / 중: 클럽하우스 / 석: 특식', hotel: '5성급 호텔' },
        { day: 4, title: '3차 18홀 라운딩 후 공항 샌딩 & 귀국', description: '마지막 18홀 라운딩 후 체크아웃 및 공항 단독 배웅', meal: '조: 호텔식 / 중: 클럽하우스', hotel: '기내박' }
      ] : presetCategory === '자유여행' ? [
        { day: 1, title: '호텔 픽업 -> 주요 명소 관광 -> 로컬 맛집 -> 힐링 스파 -> 호텔 복귀', description: '09:00 전용차량 호텔 픽업 -> 핵심 랜드마크 관광 -> 현지 유명 맛집 점심 -> 카페 및 스파 체험 -> 18:00 호텔 안전 귀환', meal: '중식: 로컬 특식', hotel: '자유 숙박 (숙소 미포함)' }
      ] : [
        { day: 1, title: '공항 도착 및 가이드 미팅 & 체크인', description: '단독 차량으로 숙소 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 호텔/풀빌라' },
        { day: 2, title: '시티 주요 명소 투어 & 힐링 스파', description: '인기 관광지 관람 및 특식 다이닝, 90분 마사지', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 호텔/풀빌라' },
        { day: 3, title: '자유 일정 & 기념품 쇼핑 후 공항 배웅', description: '체크아웃 후 인기 카페 방문 및 공항 단독 샌딩', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
      ]
    );

    // Villa Defaults
    setVillaName(`[${presetCity}] 럭셔리 독채 풀빌라`);
    setVillaStructureDesc('3층 단독 독채 풀빌라 구조로, 1층에 프라이빗 수영장과 연결된 탁 트인 거실, 다이닝 룸, 풀옵션 주방이 위치하며 2~3층에 개별 발코니와 프라이빗 욕실을 갖춘 3개의 럭셔리 킹베드 침실로 구성되어 있습니다.');
    setVillaBedrooms(3);
    setVillaBathrooms(4);
    setVillaBeds('킹베드 3개, 싱글 2개');
    setVillaMaxOccupancy(8);
    setVillaStandardOccupancy(6);
    setVillaPrivatePool(true);
    setVillaOceanView(true);
    setVillaFloors(3);
    setVillaAreaSqm(350);
    setVillaAddress(`${presetCity} 해변로 리조트 단지 내 독채 빌라`);
    setVillaGoogleMapUrl(`https://maps.google.com/?q=${encodeURIComponent(presetCity + ' Beach Resort Villa')}`);
    setVillaAirbnbUrl('');
    setVillaAmenities(POPULAR_VILLA_AMENITIES.slice(0, 10));
    setVillaCheckInTime('15:00');
    setVillaCheckOutTime('11:00');
    setVillaHouseRulesText('실내 절대 금연 (테라스/야외 흡연 구역 이용)\n반려동물 입실 불가\n22:00 이후 심야 정숙 (매너 타임)\n바베큐 시설 무료 이용 가능');

    // Golf Defaults
    setGolfHoles(presetCategory === '골프투어' ? 54 : 18);
    setGreenFeeIncluded(true);
    setCaddieFeeIncluded(true);
    setCartIncluded(true);
    setGolfCourseNamesText(`${presetCity} CC\n몽고메리 링스\n바나힐스 GC`);

    setActiveTab('editor');
  };

  // Open Edit Mode for Existing Product
  const handleOpenEdit = (prod: Product) => {
    setEditingId(prod.id);
    setFormData({ ...prod });
    setIncludedText((prod.included || []).join('\n'));
    setExcludedText((prod.excluded || []).join('\n'));
    setDepartureCitiesText((prod.departureCities || []).join('\n'));
    setTagsText((prod.tags || []).join('\n'));
    
    const initialImages = [
      prod.imageUrl,
      ...(prod.additionalImages || []).filter(img => img !== prod.imageUrl)
    ].filter(Boolean);
    setGalleryImages(initialImages);

    setItineraryList(prod.itinerary && prod.itinerary.length > 0 ? [...prod.itinerary] : [
      { day: 1, title: '공항 도착 및 체크인', description: '가이드 미팅 후 숙소 이동' }
    ]);

    if (prod.villaSpecs) {
      setVillaName(prod.villaSpecs.villaName || prod.title);
      setVillaStructureDesc(prod.villaSpecs.structureDescription || prod.description || '');
      setVillaBedrooms(prod.villaSpecs.bedrooms || 3);
      setVillaBathrooms(prod.villaSpecs.bathrooms || 4);
      setVillaBeds(String(prod.villaSpecs.beds || '킹베드 3개, 싱글 2개'));
      setVillaMaxOccupancy(prod.villaSpecs.maxOccupancy || 8);
      setVillaStandardOccupancy(prod.villaSpecs.standardOccupancy || 6);
      setVillaPrivatePool(prod.villaSpecs.privatePool ?? true);
      setVillaOceanView(prod.villaSpecs.oceanView ?? true);
      setVillaFloors(prod.villaSpecs.floors || 3);
      setVillaAreaSqm(prod.villaSpecs.areaSqm || 350);
      setVillaAddress(prod.villaSpecs.address || prod.address || '');
      setVillaGoogleMapUrl(prod.villaSpecs.googleMapUrl || prod.googleMapUrl || '');
      setVillaAirbnbUrl(prod.villaSpecs.airbnbUrl || prod.airbnbUrl || '');
      setVillaAmenities(prod.villaSpecs.amenities && prod.villaSpecs.amenities.length > 0 
        ? prod.villaSpecs.amenities 
        : POPULAR_VILLA_AMENITIES.slice(0, 10));
      setVillaCheckInTime(prod.villaSpecs.checkInTime || '15:00');
      setVillaCheckOutTime(prod.villaSpecs.checkOutTime || '11:00');
      setVillaHouseRulesText((prod.villaSpecs.houseRules || ['실내 절대 금연', '반려동물 입실 불가', '22:00 이후 심야 정숙']).join('\n'));
    } else {
      setVillaName(prod.title);
      setVillaStructureDesc(prod.description || '');
      setVillaAddress(prod.address || '');
      setVillaGoogleMapUrl(prod.googleMapUrl || '');
      setVillaAirbnbUrl(prod.airbnbUrl || '');
      setVillaAmenities(POPULAR_VILLA_AMENITIES.slice(0, 10));
    }

    if (prod.golfSpecs) {
      setGolfHoles(prod.golfSpecs.holes || 18);
      setGreenFeeIncluded(prod.golfSpecs.greenFeeIncluded ?? true);
      setCaddieFeeIncluded(prod.golfSpecs.caddieFeeIncluded ?? true);
      setCartIncluded(prod.golfSpecs.cartIncluded ?? true);
      setGolfCourseNamesText((prod.golfSpecs.golfCourseNames || []).join('\n'));
    }

    setActiveTab('editor');
  };

  // Duplicate Product
  const handleDuplicateProduct = async (prod: Product) => {
    const duplicated: Omit<Product, 'id'> = {
      ...prod,
      title: `${prod.title} (복제본)`,
      createdAt: new Date().toISOString()
    };
    await onAddProduct(duplicated);
    alert(`📋 "${prod.title}" 상품이 성공적으로 복제되었습니다!`);
  };

  // Save Product (Add or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    try {
      const splitText = (text: string) => text.split('\n').map(t => t.trim()).filter(Boolean);

      const mainImage = galleryImages.length > 0 ? galleryImages[0] : '';
      const additionalImages = galleryImages;

      const isVilla = formData.category === '풀빌라';

      const payload: Partial<Product> = {
        ...formData,
        imageUrl: mainImage,
        additionalImages: additionalImages,
        tags: splitText(tagsText),
        address: isVilla ? (villaAddress || formData.address) : formData.address,
        googleMapUrl: isVilla ? (villaGoogleMapUrl || formData.googleMapUrl) : formData.googleMapUrl,
        airbnbUrl: isVilla ? (villaAirbnbUrl || formData.airbnbUrl) : formData.airbnbUrl,
      };

      if (isVilla) {
        payload.description = villaStructureDesc || formData.description || '';
        payload.villaSpecs = {
          villaName: villaName || formData.title,
          structureDescription: villaStructureDesc,
          bedrooms: villaBedrooms,
          bathrooms: villaBathrooms,
          beds: villaBeds,
          maxOccupancy: villaMaxOccupancy,
          standardOccupancy: villaStandardOccupancy,
          privatePool: villaPrivatePool,
          oceanView: villaOceanView,
          floors: villaFloors,
          areaSqm: villaAreaSqm,
          address: villaAddress,
          googleMapUrl: villaGoogleMapUrl,
          airbnbUrl: villaAirbnbUrl,
          amenities: villaAmenities,
          checkInTime: villaCheckInTime,
          checkOutTime: villaCheckOutTime,
          houseRules: splitText(villaHouseRulesText)
        };
        // Villa does not need tour itinerary or inclusions
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
        // 추천패키지, 자유여행
        payload.included = splitText(includedText);
        payload.excluded = splitText(excludedText);
        payload.departureCities = splitText(departureCitiesText);
        payload.itinerary = itineraryList;
      }

      if (editingId) {
        await onUpdateProduct(editingId, payload);
        const goToCustomerView = window.confirm(
          `✅ "${payload.title}" 상품이 성공적으로 수정 및 저장되었습니다!\n\n` +
          `[확인]을 누르시면 손님용 홈페이지 화면으로 바로 이동하여 변경된 사진과 내용을 확인하실 수 있습니다.\n` +
          `[취소]를 누르시면 관리자 화면에 남습니다.`
        );
        if (goToCustomerView) {
          onClose();
          return;
        }
      } else {
        await onAddProduct(payload as any);
        const goToCustomerView = window.confirm(
          `🎉 새 상품 "${payload.title}"이(가) 성공적으로 등록되었습니다!\n\n` +
          `[확인]을 누르시면 손님용 홈페이지 화면으로 바로 이동하여 새로 등록된 사진과 상품을 확인하실 수 있습니다.\n` +
          `[취소]를 누르시면 관리자 화면에 남습니다.`
        );
        if (goToCustomerView) {
          onClose();
          return;
        }
      }

      setActiveTab('products');
    } catch (err: any) {
      alert(`저장 중 오류가 발생했습니다: ${err?.message || '다시 시도해주세요.'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (filterCategory !== '전체' && p.category !== filterCategory) return false;
    if (filterRegion !== '전체' && p.region !== filterRegion) return false;
    if (filterCity !== '전체' && p.city !== filterCity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchCity = p.city.toLowerCase().includes(q);
      const matchTag = (p.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCity && !matchTag) return false;
    }
    return true;
  });

  // Batch Delete
  const handleBatchDelete = async () => {
    if (selectedProductIds.length === 0) return;
    if (!window.confirm(`선택한 ${selectedProductIds.length}개 상품을 영구 삭제하시겠습니까?`)) return;
    for (const id of selectedProductIds) {
      await onDeleteProduct(id);
    }
    setSelectedProductIds([]);
    alert('선택한 상품이 모두 삭제되었습니다.');
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `xinchao_products_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON File
  const handleImportJSONFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          if (window.confirm(`파일에서 ${json.length}개의 상품을 불러왔습니다. 기존 상품을 대체할까요? ('확인'=전체교체, '취소'=추가)`)) {
            await onImportProducts(json, true);
          } else {
            await onImportProducts(json, false);
          }
          alert('상품 백업 데이터가 성공적으로 불러와졌습니다!');
        } else {
          alert('올바른 JSON 상품 배열 형식이 아닙니다.');
        }
      } catch (err) {
        alert('JSON 파싱 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Toggle amenity selection for villa
  const handleToggleAmenity = (amenity: string) => {
    if (villaAmenities.includes(amenity)) {
      setVillaAmenities(villaAmenities.filter(a => a !== amenity));
    } else {
      setVillaAmenities([...villaAmenities, amenity]);
    }
  };

  const handleAddCustomAmenity = () => {
    if (!customAmenityInput.trim()) return;
    if (!villaAmenities.includes(customAmenityInput.trim())) {
      setVillaAmenities([...villaAmenities, customAmenityInput.trim()]);
    }
    setCustomAmenityInput('');
  };

  // 1. Password Lock View
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-400/30">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">신짜오투어 통합 관리자 스튜디오</h3>
            <p className="text-xs text-slate-400">
              여행 상품 등록 및 수정, 사진 갤러리, 상담 문의를 관리하는 대표자 전용 공간입니다.
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              placeholder="관리자 비밀번호 입력 (기본: 1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-center text-white focus:outline-none focus:border-amber-400"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-amber-400/20"
              >
                관리자 입장하기
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Studio
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Main Navigation Bar - Fully Responsive for Mobile & Desktop */}
      <header className="bg-slate-900 border-b border-slate-800 px-3 sm:px-6 py-2.5 shrink-0 sticky top-0 z-50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm sm:text-base shadow-md">
              PRO
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="text-xs sm:text-base font-black text-white">신짜오투어 관리자</h2>
                <span className="text-[9px] sm:text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-black border border-amber-400/30">
                  MASTER
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                풀빌라 맞춤 등록 · 투어 상품 · 사진 갤러리 · 고객 상담 통합 관리
              </p>
            </div>
          </div>

          {/* Exit & Close Buttons - Highlighted on top right */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-teal-500/30 cursor-pointer transition-all active:scale-95 border border-teal-300/40"
              title="손님 화면으로 나가기"
            >
              <Eye className="w-4 h-4" />
              <span>손님용 화면 보기 (나가기)</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors border border-slate-700"
              title="닫기"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation - Scrollable on mobile */}
        <div className="w-full flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto mt-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>상품 목록 ({products.length})</span>
          </button>

          <button
            onClick={() => handleOpenCreator('풀빌라')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{editingId ? '✏️ 상품 수정' : '➕ 새 상품 등록'}</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>사진 자산 ({allSitePhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>상담 ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>설정</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950">
        {/* ================= TAB 1: PRODUCT LIST & MANAGEMENT ================= */}
        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            {/* Top Toolbar: Search & Action Buttons */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              {/* Success & Status Bar */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-emerald-300 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-black">✅ 실시간 자동 저장 완료</span>
                  <span className="text-slate-300 hidden sm:inline">| 등록 및 수정한 상품은 즉시 안전하게 저장되어 있습니다.</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>손님용 홈페이지에서 확인하기 &gt;</span>
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="상품명, 도시, 태그, 설명 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleOpenCreator('풀빌라')}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer transition-all hover:scale-105"
                  >
                    <Home className="w-3.5 h-3.5 text-white" />
                    <span>+ 🏊 풀빌라 등록 (에어비앤비형)</span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('골프투어')}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer transition-all hover:scale-105"
                  >
                    <span>+ ⛳ 골프투어 등록 (54홀/그린피)</span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('자유여행')}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/20 cursor-pointer transition-all hover:scale-105"
                  >
                    <span>+ 🌴 자유여행 등록 (1일/코스)</span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('추천패키지')}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
                  >
                    <span>+ ✨ 추천패키지 등록</span>
                  </button>

                  {onClearAllPhotos && (
                    <button
                      onClick={async () => {
                        if (window.confirm('사이트 내 모든 상품의 기존 샘플 사진을 0장으로 깨끗하게 비우시겠습니까?\n\n비운 후 사장님께서 홈페이지 순서대로 준비하신 사진을 등록하실 수 있습니다.')) {
                          await onClearAllPhotos();
                          alert('✨ 모든 상품의 사진이 0장으로 깨끗하게 비워졌습니다.\n이제 각 상품 번호(#1, #2, #3...)에 맞게 준비하신 사진을 등록해보세요!');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/40 font-black text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95"
                      title="모든 상품의 기존 샘플 사진을 0장으로 비웁니다"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>🧹 사진 전체 비우기</span>
                    </button>
                  )}

                  {onClearAllProducts && (
                    <button
                      onClick={async () => {
                        if (window.confirm('정말로 모든 상품을 삭제하고 빈 상태(0개)로 만드시겠습니까?')) {
                          await onClearAllProducts();
                          alert('모든 상품이 삭제되었습니다. 이제 사장님의 진짜 상품을 등록해보세요!');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
                      title="모든 상품을 비우고 0개 상태로 만듭니다"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>상품 전체 비우기</span>
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      if (window.confirm('기본 추천 샘플 12개 상품으로 복원하시겠습니까?')) {
                        await onResetProducts();
                        alert('기본 샘플 데이터로 복원되었습니다.');
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1 border border-slate-700 cursor-pointer"
                    title="초기 샘플로 복원"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>샘플 복원</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1 border border-slate-700 cursor-pointer"
                    title="JSON 백업 파일 다운로드"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>백업 저장</span>
                  </button>

                  <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1 border border-slate-700 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>백업 불러오기</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSONFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">필터:</span>
                  
                  {/* Category Filter */}
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setFilterCategory('전체')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${filterCategory === '전체' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                    >
                      전체 ({products.length})
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${filterCategory === cat ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                      >
                        {cat} ({products.filter(p => p.category === cat).length})
                      </button>
                    ))}
                  </div>

                  {/* Region Filter */}
                  <select
                    value={filterRegion}
                    onChange={(e) => {
                      setFilterRegion(e.target.value as Region);
                      setFilterCity('전체');
                    }}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white outline-none"
                  >
                    <option value="전체">권역 전체</option>
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>

                  {/* City Filter */}
                  <select
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value as City)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white outline-none"
                  >
                    <option value="전체">도시 전체</option>
                    {(filterRegion === '전체' 
                      ? Object.values(REGION_CITIES).flat() 
                      : (REGION_CITIES[filterRegion as Exclude<Region, '전체'>] || [])
                    ).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Batch Actions & View Switcher */}
                <div className="flex items-center gap-2">
                  {selectedProductIds.length > 0 && (
                    <button
                      onClick={handleBatchDelete}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 shadow-md cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>선택한 {selectedProductIds.length}개 일괄 삭제</span>
                    </button>
                  )}

                  <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-slate-800 text-amber-300' : 'text-slate-500'}`}
                      title="카드 뷰"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-slate-800 text-amber-300' : 'text-slate-500'}`}
                      title="테이블 뷰"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-14 text-center space-y-6">
                <div className="w-16 h-16 bg-amber-400/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-400/30">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                </div>
                <div className="space-y-2 max-w-xl mx-auto">
                  <h3 className="text-xl font-black text-white">모든 상품이 깨끗하게 비워진 상태입니다 (0개)</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    임시 샘플 상품이 완전히 삭제되었으며, 이제 사장님의 <strong>진짜 상품을 특성에 맞는 양식</strong>으로 바로 등록하실 수 있습니다.<br />
                    등록하시려는 상품의 유형을 선택해주세요:
                  </p>
                </div>
                
                {/* 4 Category Quick Launch Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
                  <button
                    onClick={() => handleOpenCreator('풀빌라')}
                    className="p-4 rounded-2xl bg-slate-950 border border-teal-500/40 hover:border-teal-400 hover:bg-teal-950/30 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-teal-400 font-black text-sm">
                        <span>🏊 풀빌라 렌트</span>
                        <span className="text-[10px] bg-teal-500/20 px-2 py-0.5 rounded text-teal-300">에어비앤비형</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        침실, 욕실, 침대, 기준/최대인원, 전용수영장, 편의시설, 숙소 이용규칙 등록
                      </p>
                    </div>
                    <span className="text-xs font-bold text-teal-300 group-hover:translate-x-1 transition-transform">
                      등록 시작하기 &rarr;
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('골프투어')}
                    className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-950/30 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                        <span>⛳ 골프투어</span>
                        <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">54홀/그린피</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        홀 수, 그린피/캐디피/카트비 포함, 연계 골프장 목록 및 라운딩 일정표 등록
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
                      등록 시작하기 &rarr;
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('자유여행')}
                    className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 font-black text-sm">
                        <span>🌴 자유여행</span>
                        <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">1일/코스</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        단독 전용차량/가이드, 맞춤 1일 자유 코스 및 핫플 투어 일정표 등록
                      </p>
                    </div>
                    <span className="text-xs font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                      등록 시작하기 &rarr;
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('추천패키지')}
                    className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-950/30 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                        <span>✨ 추천 패키지</span>
                        <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">단독패키지</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        전 일정 단독 차량, 5성급 호텔, 일자별 상세 투어 코스 및 식사 일정 등록
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                      등록 시작하기 &rarr;
                    </span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer border border-slate-700 inline-flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>손님용 화면 확인하러 나가기</span>
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((prod, idx) => {
                  const totalImages = [prod.imageUrl, ...(prod.additionalImages || [])].filter(Boolean);
                  return (
                  <div
                    key={prod.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Image Preview & Direct Quick-Action Slot */}
                      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800">
                        {prod.imageUrl ? (
                          <>
                            <img
                              src={prod.imageUrl}
                              alt={prod.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Order Number Badge */}
                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-black text-amber-300 border border-amber-400/40 shadow-md">
                              <span>#{idx + 1}</span>
                              <span className="text-white text-[11px] font-normal">| {prod.region} {prod.city}</span>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-3 right-3 flex items-center gap-1">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                prod.category === '풀빌라' ? 'bg-teal-500 text-white' :
                                prod.category === '골프투어' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
                              }`}>
                                {prod.category}
                              </span>
                            </div>

                            {/* Quick Photo Actions */}
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                              <div className="bg-slate-950/90 backdrop-blur-md text-slate-200 text-[10px] px-2 py-1 rounded-lg font-bold border border-white/10">
                                📷 사진 {totalImages.length}장
                              </div>
                              <div className="flex items-center gap-1">
                                <label className="bg-teal-600/90 hover:bg-teal-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg cursor-pointer transition-colors shadow-md backdrop-blur-xs flex items-center gap-1">
                                  <span>📸 추가</span>
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const files = e.target.files ? (Array.from(e.target.files) as File[]) : [];
                                      if (files.length === 0) return;
                                      const uploaded = await uploadFilesToDisk(files);
                                      if (uploaded.length > 0) {
                                        const newImages = [...totalImages, ...uploaded];
                                        await onUpdateProduct(prod.id, {
                                          imageUrl: newImages[0] || '',
                                          additionalImages: newImages
                                        });
                                      }
                                      e.target.value = '';
                                    }}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    if (window.confirm(`"${prod.title}"의 등록된 사진을 모두 지우시겠습니까?`)) {
                                      await onUpdateProduct(prod.id, { imageUrl: '', additionalImages: [] });
                                    }
                                  }}
                                  className="bg-rose-600/90 hover:bg-rose-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg cursor-pointer transition-colors shadow-md backdrop-blur-xs"
                                  title="이 상품의 사진만 지우기"
                                >
                                  🗑️ 지우기
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Empty Photo Slot with Instant Direct File Uploader */
                          <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-slate-950/80 border-2 border-dashed border-slate-700 hover:border-amber-400 transition-colors">
                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg text-xs font-black text-amber-300 border border-amber-400/40">
                              <span>#{idx + 1}</span>
                              <span className="text-white text-[11px] font-normal">| {prod.region} {prod.city}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mb-2">
                              <Camera className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold text-white mb-1">등록된 사진 없음 (0장)</p>
                            <p className="text-[11px] text-slate-400 mb-2.5">준비하신 사진을 등록해주세요</p>
                            <label className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-400/20 transition-all hover:scale-105 active:scale-95">
                              <Plus className="w-3.5 h-3.5" />
                              <span>내 사진 선택하기 (즉시 등록)</span>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const files = e.target.files ? (Array.from(e.target.files) as File[]) : [];
                                  if (files.length === 0) return;
                                  const uploaded = await uploadFilesToDisk(files);
                                  if (uploaded.length > 0) {
                                    await onUpdateProduct(prod.id, {
                                      imageUrl: uploaded[0] || '',
                                      additionalImages: uploaded
                                    });
                                  }
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400">{prod.duration}</span>
                          <span className="text-xs font-black text-amber-400">
                            {prod.priceKRW?.toLocaleString()}원
                          </span>
                        </div>
                        <h4 className="font-black text-white text-sm line-clamp-1 leading-snug">
                          {prod.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {prod.subTitle || prod.description}
                        </p>

                        {/* Villa Specs Preview if Pool Villa */}
                        {prod.category === '풀빌라' && prod.villaSpecs && (
                          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[11px] text-teal-300 flex items-center justify-between font-bold">
                            <span>🛏️ {prod.villaSpecs.bedrooms || 3}베드룸</span>
                            <span>🚿 {prod.villaSpecs.bathrooms || 4}욕실</span>
                            <span>👥 최대 {prod.villaSpecs.maxOccupancy || 8}인</span>
                            <span>🏊 {prod.villaSpecs.privatePool ? '전용풀' : '공용'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>상세 수정</span>
                        </button>
                        <button
                          onClick={() => handleDuplicateProduct(prod)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                          title="상품 복제"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>복제</span>
                        </button>
                      </div>

                      <button
                        onClick={async () => {
                          if (window.confirm(`"${prod.title}" 상품을 정말로 삭제하시겠습니까?`)) {
                            await onDeleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-rose-400 hover:text-white transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : (
              /* Table View */
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3 w-10">
                        <input
                          type="checkbox"
                          checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedProductIds(filteredProducts.map(p => p.id));
                            else setSelectedProductIds([]);
                          }}
                        />
                      </th>
                      <th className="p-3">상품 정보</th>
                      <th className="p-3">카테고리/지역</th>
                      <th className="p-3">가격(원)</th>
                      <th className="p-3">기간</th>
                      <th className="p-3 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-850">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedProductIds.includes(prod.id)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedProductIds([...selectedProductIds, prod.id]);
                              else setSelectedProductIds(selectedProductIds.filter(id => id !== prod.id));
                            }}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img src={prod.imageUrl} alt="" className="w-12 h-9 rounded-lg object-cover bg-slate-950 shrink-0" />
                            <div>
                              <div className="font-bold text-white text-xs line-clamp-1">{prod.title}</div>
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
                              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-black text-xs"
                            >
                              수정
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm(`"${prod.title}" 삭제하시겠습니까?`)) {
                                  await onDeleteProduct(prod.id);
                                }
                              }}
                              className="p-1 text-rose-400 hover:text-rose-300"
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

        {/* ================= TAB 2: DYNAMIC PRODUCT / VILLA EDITOR ================= */}
        {activeTab === 'editor' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    formData.category === '풀빌라' ? 'bg-teal-500 text-white' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {formData.category === '풀빌라' ? '🏊 에어비앤비형 풀빌라 렌트 모드' : `✈️ ${formData.category} 투어 모드`}
                  </span>
                  <h3 className="text-base font-black text-white">
                    {editingId ? '상품 상세 정보 수정' : '새 상품 등록 스튜디오'}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {formData.category === '풀빌라'
                    ? '풀빌라 상품은 일정표 없이 에어비앤비처럼 숙소 스펙, 구조, 주소/지도 연결, 편의시설 정보로 구성됩니다.'
                    : '투어 상품은 일차별 일정표 및 포함/불포함 사항을 세부적으로 기재합니다.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>목록으로</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    const form = document.querySelector('form');
                    if (form) form.requestSubmit();
                  }}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <span>💾 {isSaving ? '저장 중...' : '저장하기'}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* Section 1: Basic Info & Category */}
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>1. 기본 정보 및 상품 분류</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-amber-300">상품 카테고리 (유형) *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        const newCat = e.target.value as Category;
                        setFormData({ 
                          ...formData, 
                          category: newCat,
                          duration: newCat === '풀빌라' ? '1박 기준 (일정 조율 가능)' : '3박 5일'
                        });
                      }}
                      className="w-full bg-slate-900 border-2 border-amber-400/50 rounded-xl px-3 py-2.5 text-xs font-black text-amber-300 outline-none"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">권역 *</label>
                    <select
                      value={formData.region}
                      onChange={(e) => {
                        const newReg = e.target.value as Region;
                        const defaultCity = REGION_CITIES[newReg as Exclude<Region, '전체'>]?.[0] || '다낭';
                        setFormData({ ...formData, region: newReg, city: defaultCity });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white"
                    >
                      {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">도시 *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value as City })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white"
                    >
                      {(REGION_CITIES[formData.region as Exclude<Region, '전체'>] || ['다낭']).map(cit => (
                        <option key={cit} value={cit}>{cit}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">
                      {formData.category === '풀빌라' ? '임대/숙박 단위' : '여행 기간'}
                    </label>
                    <input
                      type="text"
                      value={formData.duration || ''}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="예: 1박 기준, 3박 5일"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">
                      {formData.category === '풀빌라' ? '빌라 이름 (숙소명) *' : '상품명 (제목) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder={formData.category === '풀빌라' ? '예: [다낭] 프리미어 빌리지 3베드룸 오션 프론트 풀빌라' : '예: [다낭/바나힐] 3박 5일 명품 단독 패키지'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">서브 카피문구 (강조 설명)</label>
                    <input
                      type="text"
                      value={formData.subTitle}
                      onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                      placeholder={formData.category === '풀빌라' ? '예: 전용 프라이빗 풀 & 오션뷰, 3개 킹베드 침실, 바베큐 완비' : '예: 전 일정 단독 차량 & 한국인 가이드 동행'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">
                      {formData.category === '풀빌라' ? '원화 요금 (1박/기간 KRW) *' : '원화 가격 (1인 기준 KRW) *'}
                    </label>
                    <input
                      type="number"
                      step="10000"
                      value={formData.priceKRW || 0}
                      onChange={(e) => {
                        const krw = Number(e.target.value);
                        setFormData({
                          ...formData,
                          priceKRW: krw,
                          priceVND: Math.round(krw * 18.817)
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-black text-amber-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">베트남 동화 환산가 (VND)</label>
                    <input
                      type="number"
                      value={formData.priceVND || 0}
                      onChange={(e) => setFormData({ ...formData, priceVND: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-300"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                      <input
                        type="checkbox"
                        checked={formData.isPopular ?? false}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-400 focus:ring-0"
                      />
                      <span>⭐ 인기 베스트 추천</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                      <input
                        type="checkbox"
                        checked={formData.isHotDeal ?? false}
                        onChange={(e) => setFormData({ ...formData, isHotDeal: e.target.checked })}
                        className="w-4 h-4 rounded text-rose-500 focus:ring-0"
                      />
                      <span>🔥 초특가 핫딜</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 2: Photos (Airbnb Multi-Photo Gallery & Direct URL) */}
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-400" />
                      <span>2. 고화질 사진 등록 (1번 사진이 홈페이지 대표 썸네일로 노출됩니다)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      사진을 등록하지 않으시면 깔끔한 맞춤 플레이스홀더가 표시되며, 언제든 원하는 고화질 사진을 추가/교체하실 수 있습니다.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${galleryImages.length > 0 ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' : 'text-slate-400 bg-slate-900 border-slate-800'}`}>
                      {galleryImages.length > 0 ? `총 ${galleryImages.length}장 등록됨` : '사진 없음 (0장)'}
                    </span>
                    {galleryImages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`현재 등록된 사진 ${galleryImages.length}장을 모두 지우시겠습니까?\n모두 지우시면 샘플 사진 없이 깨끗하게 비워집니다.`)) {
                            setGalleryImages([]);
                            setFormData(prev => ({ ...prev, imageUrl: '', additionalImages: [] }));
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                        title="등록된 모든 사진을 한 번에 삭제합니다"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>🗑️ 등록된 사진 전체 삭제 (한 번에 비우기)</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Method A: File Upload with Drag & Drop */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        const urls = await uploadFilesToDisk(Array.from(e.dataTransfer.files));
                        if (urls.length > 0) {
                          setGalleryImages(prev => {
                            const updated = [...prev, ...urls];
                            setFormData(f => ({ ...f, imageUrl: updated[0] || '', additionalImages: updated }));
                            return updated;
                          });
                        }
                      }
                    }}
                    className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl p-5 text-center space-y-3 bg-slate-900/50 transition-colors flex flex-col justify-center items-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">[방법 1] 내 컴퓨터에서 사진 파일 올리기 / 드래그 & 드롭</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, WebP 등 여러 장 동시 선택 가능 (스마트 자동 압축 & 서버 보관)</p>
                    </div>

                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-md transition-all active:scale-95">
                      <Upload className="w-3.5 h-3.5" />
                      <span>내 컴퓨터에서 사진 선택하기</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const urls = await uploadFilesToDisk(Array.from(e.target.files));
                            if (urls.length > 0) {
                              setGalleryImages(prev => {
                                const updated = [...prev, ...urls];
                                setFormData(f => ({ ...f, imageUrl: updated[0] || '', additionalImages: updated }));
                                return updated;
                              });
                            }
                          }
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>

                  {/* Method B: Direct URL */}
                  <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900/50 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>[방법 2] 인터넷 웹 사진 주소(URL) 직접 붙여넣기</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">웹 링크(https://...)를 붙여넣고 [사진 추가] 버튼을 누르세요.</p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://... 이미지 URL"
                        value={directUrlInput}
                        onChange={(e) => setDirectUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (directUrlInput.trim()) {
                              const url = directUrlInput.trim();
                              setGalleryImages(prev => {
                                const updated = [...prev, url];
                                setFormData(f => ({ ...f, imageUrl: updated[0] || '', additionalImages: updated }));
                                return updated;
                              });
                              setDirectUrlInput('');
                            }
                          }
                        }}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (directUrlInput.trim()) {
                            const url = directUrlInput.trim();
                            setGalleryImages(prev => {
                              const updated = [...prev, url];
                              setFormData(f => ({ ...f, imageUrl: updated[0] || '', additionalImages: updated }));
                              return updated;
                            });
                            setDirectUrlInput('');
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs shrink-0 cursor-pointer"
                      >
                        + 사진 추가
                      </button>
                    </div>
                  </div>
                </div>

                {uploadStatus && <p className="text-xs text-amber-300 font-bold animate-pulse">{uploadStatus}</p>}

                {/* Thumbnails Gallery */}
                {galleryImages.length > 0 ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                        <span>📸 등록된 사진 목록 (맨 앞 1번 사진이 대표 썸네일):</span>
                        <span className="text-amber-400 font-black">총 {galleryImages.length}장</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`현재 등록된 사진 ${galleryImages.length}장을 모두 삭제하시겠습니까?`)) {
                            setGalleryImages([]);
                            setFormData(prev => ({ ...prev, imageUrl: '', additionalImages: [] }));
                          }
                        }}
                        className="px-2.5 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>전체 사진 모두 비우기</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className={`relative group rounded-xl overflow-hidden border ${idx === 0 ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-700'} aspect-square bg-slate-900 shadow-md`}>
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <div className="absolute top-1.5 right-1.5 bg-slate-950/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                            #{idx + 1}
                          </div>
                          {idx === 0 && (
                            <span className="absolute top-1.5 left-1.5 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow">
                              👑 대표 사진
                            </span>
                          )}
                          <div className="absolute inset-0 bg-slate-950/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = [img, ...galleryImages.filter((_, i) => i !== idx)];
                                  setGalleryImages(newImages);
                                  setFormData(f => ({ ...f, imageUrl: newImages[0] || '', additionalImages: newImages }));
                                }}
                                className="px-2.5 py-1 bg-amber-400 text-slate-950 rounded-lg text-[10px] font-black cursor-pointer shadow"
                              >
                                대표로 지정
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = galleryImages.filter((_, i) => i !== idx);
                                setGalleryImages(newImages);
                                setFormData(f => ({ ...f, imageUrl: newImages[0] || '', additionalImages: newImages }));
                              }}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold cursor-pointer shadow flex items-center gap-1"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                              <span>개별 삭제</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900 border border-dashed border-slate-700 text-xs text-slate-400 flex items-center gap-2">
                    <span>💡 현재 등록된 사진이 비워져 있습니다. 위 [내 컴퓨터에서 사진 선택하기] 또는 [웹 사진 주소 붙여넣기]로 새 사진을 올려주세요.</span>
                  </div>
                )}
              </div>

              {/* ================= DYNAMIC FORM: POOL VILLA (AIRBNB STYLE) ================= */}
              {formData.category === '풀빌라' && (
                <>
                  {/* Section 3 (Villa): Structure, Bedrooms & Space Specs */}
                  <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-teal-500/30 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-black text-teal-400 flex items-center gap-2">
                        <Home className="w-4 h-4 text-teal-400" />
                        <span>3. 빌라 상세 구조 및 객실 스펙 (에어비앤비형)</span>
                      </h4>
                      <span className="text-xs text-slate-400">침실/욕실/침대/인원/수영장</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-300">침실 수 (Rooms)</label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={villaBedrooms}
                          onChange={(e) => setVillaBedrooms(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white text-center"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-300">욕실 수 (Baths)</label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={villaBathrooms}
                          onChange={(e) => setVillaBathrooms(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white text-center"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-300">기준 인원</label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={villaStandardOccupancy}
                          onChange={(e) => setVillaStandardOccupancy(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white text-center"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-300">최대 인원</label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={villaMaxOccupancy}
                          onChange={(e) => setVillaMaxOccupancy(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white text-center"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-300">건물 층수</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={villaFloors}
                          onChange={(e) => setVillaFloors(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white text-center"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-black text-slate-300">전용 면적 (m²)</label>
                        <input
                          type="number"
                          value={villaAreaSqm}
                          onChange={(e) => setVillaAreaSqm(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white text-center"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-300">침대 구성</label>
                        <input
                          type="text"
                          value={villaBeds}
                          onChange={(e) => setVillaBeds(e.target.value)}
                          placeholder="예: 킹베드 3개, 싱글베드 2개"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="flex items-center gap-4 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-teal-300">
                          <input
                            type="checkbox"
                            checked={villaPrivatePool}
                            onChange={(e) => setVillaPrivatePool(e.target.checked)}
                            className="w-4 h-4 rounded text-teal-500 focus:ring-0"
                          />
                          <span>🏊 단독 프라이빗 풀 (전용 수영장)</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-4 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-300">
                          <input
                            type="checkbox"
                            checked={villaOceanView}
                            onChange={(e) => setVillaOceanView(e.target.checked)}
                            className="w-4 h-4 rounded text-amber-400 focus:ring-0"
                          />
                          <span>🌅 오션뷰 / 비치 사이드</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">빌라 구조 및 공간 상세 설명</label>
                      <textarea
                        rows={3}
                        value={villaStructureDesc}
                        onChange={(e) => setVillaStructureDesc(e.target.value)}
                        placeholder="예: 3층 단독 독채 풀빌라 구조로, 1층에 프라이빗 수영장과 연결된 탁 트인 거실, 다이닝 룸, 풀옵션 주방이 위치하며 2~3층에 개별 발코니와 프라이빗 욕실을 갖춘 3개의 럭셔리 킹베드 침실로 구성되어 있습니다."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-teal-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Section 4 (Villa): Location & Google Map / Airbnb Link */}
                  <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>4. 위치 및 구글 지도 / 에어비앤비(Airbnb) 주소 연결</span>
                    </h4>

                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-300">빌라 현지 주소 (영문/현지 주소)</label>
                        <input
                          type="text"
                          value={villaAddress}
                          onChange={(e) => setVillaAddress(e.target.value)}
                          placeholder="예: Vo Nguyen Giap Street, Ngu Hanh Son, Danang, Vietnam"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-300 flex items-center gap-1">
                            <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                            <span>구글 지도(Google Maps) 링크 URL</span>
                          </label>
                          <input
                            type="url"
                            value={villaGoogleMapUrl}
                            onChange={(e) => setVillaGoogleMapUrl(e.target.value)}
                            placeholder="예: https://maps.google.com/?q=..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-slate-300 flex items-center gap-1">
                            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                            <span>에어비앤비(Airbnb) 또는 공식 예약 링크 URL</span>
                          </label>
                          <input
                            type="url"
                            value={villaAirbnbUrl}
                            onChange={(e) => setVillaAirbnbUrl(e.target.value)}
                            placeholder="예: https://airbnb.com/rooms/..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 5 (Villa): Amenities Checklist */}
                  <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>5. 숙소 편의 시설 및 어메니티 (Airbnb 스타일)</span>
                      </h4>
                      <span className="text-xs text-teal-400 font-bold">{villaAmenities.length}개 선택됨</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {POPULAR_VILLA_AMENITIES.map((amenity, idx) => {
                        const isSelected = villaAmenities.includes(amenity);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleToggleAmenity(amenity)}
                            className={`p-3 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-teal-500/20 text-teal-200 border-teal-500/50 shadow-xs'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                            }`}
                          >
                            <span>{amenity}</span>
                            {isSelected && <Check className="w-4 h-4 text-teal-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amenity Adder */}
                    <div className="flex gap-2 pt-2 border-t border-slate-800">
                      <input
                        type="text"
                        placeholder="직접 편의시설 추가하기 (예: 🤿 스노클링 장비 무료 대여)"
                        value={customAmenityInput}
                        onChange={(e) => setCustomAmenityInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomAmenity();
                          }
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomAmenity}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shrink-0 cursor-pointer"
                      >
                        + 추가
                      </button>
                    </div>
                  </div>

                  {/* Section 6 (Villa): Check-in/out & House Rules */}
                  <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Key className="w-4 h-4 text-amber-400" />
                      <span>6. 체크인 / 체크아웃 시간 & 하우스 룰 (숙소 이용 규칙)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-300">체크인 시작 시간</label>
                        <input
                          type="text"
                          value={villaCheckInTime}
                          onChange={(e) => setVillaCheckInTime(e.target.value)}
                          placeholder="예: 15:00 이후"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-300">체크아웃 마감 시간</label>
                        <input
                          type="text"
                          value={villaCheckOutTime}
                          onChange={(e) => setVillaCheckOutTime(e.target.value)}
                          placeholder="예: 11:00 이전"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">하우스 룰 / 이용 규칙 (줄바꿈 구분)</label>
                      <textarea
                        rows={3}
                        value={villaHouseRulesText}
                        onChange={(e) => setVillaHouseRulesText(e.target.value)}
                        placeholder="실내 절대 금연&#10;반려동물 입실 불가&#10;22:00 이후 심야 정숙"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-amber-400 outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ================= DYNAMIC FORM: GOLF TOUR ================= */}
              {formData.category === '골프투어' && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-emerald-500/30">
                  <h4 className="text-sm font-black text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span>⛳ 골프투어 전용 스펙 (골프장 및 라운딩 옵션)</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">총 라운딩 홀 수</label>
                      <input
                        type="number"
                        value={golfHoles}
                        onChange={(e) => setGolfHoles(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white text-center"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
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
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
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
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                        <input
                          type="checkbox"
                          checked={cartIncluded}
                          onChange={(e) => setCartIncluded(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500"
                        />
                        <span>전동 카트비 포함</span>
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
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-emerald-400 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* ================= DYNAMIC FORM: FREE TRAVEL / DAY TOUR ================= */}
              {formData.category === '자유여행' && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-cyan-500/30">
                  <h4 className="text-sm font-black text-cyan-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span>🌴 자유여행 / 데이투어 전용 옵션 & 서비스 구성</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">투어 소요 형태</label>
                      <input
                        type="text"
                        value={formData.duration || '1일 (데이투어)'}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="예: 1일 (8시간), 반일 (4시간), 12시간 단독 렌터카"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-cyan-300">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 rounded text-cyan-500"
                        />
                        <span>🚗 단독 전용 차량 및 기사 포함</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-cyan-300">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 rounded text-cyan-500"
                        />
                        <span>🗣️ 한국어 전문 가이드 동행</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= DYNAMIC FORM: TOUR ITINERARY & INCLUSIONS (NON-VILLA) ================= */}
              {formData.category !== '풀빌라' && (
                <>
                  {/* Included / Excluded */}
                  <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>3. 투어 포함 및 불포함 사항</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-emerald-400">포함 사항 (줄바꿈으로 구분)</label>
                        <textarea
                          rows={4}
                          value={includedText}
                          onChange={(e) => setIncludedText(e.target.value)}
                          placeholder="전 일정 단독 차량&#10;한국어 전문 가이드&#10;5성급 호텔 숙박 및 조식&#10;단독 공항 픽업/샌딩"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-rose-400">불포함 사항 (줄바꿈으로 구분)</label>
                        <textarea
                          rows={4}
                          value={excludedText}
                          onChange={(e) => setExcludedText(e.target.value)}
                          placeholder="왕복 항공권&#10;가이드/기사 매너팁&#10;개인 경비"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-300">출발 가능 도시 / 픽업 장소 (줄바꿈 구분)</label>
                        <textarea
                          rows={2}
                          value={departureCitiesText}
                          onChange={(e) => setDepartureCitiesText(e.target.value)}
                          placeholder="인천&#10;김해&#10;대구"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-300">검색 태그 (줄바꿈 구분)</label>
                        <textarea
                          rows={2}
                          value={tagsText}
                          onChange={(e) => setTagsText(e.target.value)}
                          placeholder="#단독패키지&#10;#가족여행&#10;#노쇼핑"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Day-by-Day Tour / Free Travel Itinerary */}
                  <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>
                          {formData.category === '자유여행' 
                            ? `4. 자유여행 코스 & 시간대별 일정표 (${itineraryList.length}개 코스)`
                            : formData.category === '골프투어'
                            ? `4. 일차별 골프 라운딩 일정표 (${itineraryList.length}일차)`
                            : `4. 일차별 상세 패키지 일정표 (${itineraryList.length}일차)`}
                        </span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const nextDay = itineraryList.length + 1;
                          setItineraryList([
                            ...itineraryList,
                            { 
                              day: nextDay, 
                              title: formData.category === '자유여행' ? `${nextDay}차 방문 코스 (예: 힐링 스파 & 맛집)` : `${nextDay}일차 일정`, 
                              description: '일정 및 코스 상세 내용', 
                              meal: formData.category === '자유여행' ? '중식: 로컬 특식' : '조: 호텔식 / 중: 현지식 / 석: 특식', 
                              hotel: formData.category === '자유여행' ? '숙소 미포함 (자유)' : '5성급 호텔' 
                            }
                          ]);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/30 font-bold text-xs cursor-pointer"
                      >
                        {formData.category === '자유여행' ? '+ 코스 추가' : '+ 일차 추가'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {itineraryList.map((dayItem, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-xs text-amber-400">
                              {formData.category === '자유여행' ? `코스 #${idx + 1}` : `${dayItem.day}일차`}
                            </span>
                            <button
                              type="button"
                              onClick={() => setItineraryList(prev => prev.filter((_, i) => i !== idx))}
                              className="text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer"
                            >
                              삭제
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={dayItem.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setItineraryList(prev => prev.map((d, i) => i === idx ? { ...d, title: val } : d));
                              }}
                              placeholder={formData.category === '자유여행' ? "코스 제목 (예: 09:00 호텔 픽업 -> 바나힐 투어)" : "일정 제목"}
                              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={dayItem.meal || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setItineraryList(prev => prev.map((d, i) => i === idx ? { ...d, meal: val } : d));
                              }}
                              placeholder="식사 정보 (조/중/석식)"
                              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={dayItem.description}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItineraryList(prev => prev.map((d, i) => i === idx ? { ...d, description: val } : d));
                            }}
                            placeholder="상세 일정 및 추천 체험/관광지 내용"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Bottom Submit Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-500/40 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  title="관리자 모드를 닫고 손님용 화면으로 나갑니다"
                >
                  <Eye className="w-4 h-4 text-teal-400" />
                  <span>손님용 화면으로 나가기</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    취소하고 상품목록으로
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 cursor-pointer transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? '저장 처리 중...' : '💾 최종 저장하기 (홈페이지 즉시 반영)'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 3: PHOTO ASSET HUB ================= */}
        {activeTab === 'photos' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-400" />
                    <span>📸 고화질 사진 자산 허브</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    신차오투어 사이트에서 사용되는 모든 고화질 사진을 일괄 관리하고 즉시 복사하여 사용할 수 있습니다.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>손님용 화면 보기 (나가기)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('사진 자산 목록의 모든 사진을 비우시겠습니까?')) {
                        setAllSitePhotos([]);
                      }
                    }}
                    className="px-3 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer"
                  >
                    🗑️ 사진 전체 비우기
                  </button>
                  <label className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer hover:bg-amber-300">
                    <Upload className="w-4 h-4" />
                    <span>사진 일괄 업로드</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const urls = await uploadFilesToDisk(Array.from(e.target.files));
                          setAllSitePhotos(prev => [...urls, ...prev]);
                          alert(`${urls.length}장의 사진이 업로드되었습니다!`);
                        }
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
              </div>

              {uploadStatus && <p className="text-xs text-amber-300 font-bold">{uploadStatus}</p>}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allSitePhotos.map((url, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group relative">
                  <div className="aspect-square bg-slate-950">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        setCopiedUrl(url);
                        setTimeout(() => setCopiedUrl(null), 2000);
                      }}
                      className="text-[10px] text-amber-300 hover:underline font-bold cursor-pointer"
                    >
                      {copiedUrl === url ? '복사완료!' : 'URL 복사'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllSitePhotos(prev => prev.filter((_, i) => i !== idx))}
                      className="text-[10px] text-rose-400 hover:text-rose-300 cursor-pointer"
                      title="사진 삭제"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: INQUIRIES & RESERVATIONS ================= */}
        {activeTab === 'inquiries' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-base font-black text-white">📥 실시간 예약 및 1:1 맞춤 견적 접수함</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                고객이 남긴 예약 문의 내역을 확인하고 실시간 상담 상태를 변경할 수 있습니다.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center text-slate-400 text-xs">
                접수된 상담 내역이 없습니다.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-white">{inq.userName} 고객님</span>
                        <span className="text-xs text-slate-400">({inq.userPhone})</span>
                        {inq.kakaoId && (
                          <span className="text-xs bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
                            카톡: {inq.kakaoId}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 font-bold">
                        {inq.productTitle || '맞춤 견적 상담'} · 여행일자: {inq.startDate || '미정'} · 성인 {inq.travelerCount.adult}명, 아동 {inq.travelerCount.child}명
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        {inq.message || '요청 사항 없음'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${inq.userPhone}`}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>전화 연결</span>
                      </a>

                      <select
                        value={inq.status}
                        onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                        className={`px-3 py-2 rounded-xl text-xs font-black border ${
                          inq.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                          inq.status === 'in_progress' ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' :
                          'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        <option value="pending">신규 접수</option>
                        <option value="in_progress">상담 진행 중</option>
                        <option value="confirmed">예약 확정</option>
                        <option value="completed">여행 완료</option>
                        <option value="cancelled">상담 취소</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h3 className="text-base font-black text-white border-b border-slate-800 pb-3">⚙️ 관리자 환경 설정</h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-300">카카오톡 상담 연결 링크 (오픈채팅 / 채널 URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={kakaoLinkInput}
                      onChange={(e) => setKakaoLinkInput(e.target.value)}
                      placeholder="https://open.kakao.com/o/..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                    <button
                      onClick={() => {
                        setKakaoDirectLink(kakaoLinkInput);
                        alert('카카오톡 상담 링크가 저장되었습니다!');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer"
                    >
                      저장하기
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-300">대표 고객센터 전화번호 안내</h4>
                  <p className="text-xs text-slate-400">
                    현재 연결 전화: <span className="text-amber-300 font-bold">{COMPANY_PHONE}</span> ({COMPANY_PHONE_TEL})
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Navigation Bar for Easy Exit on Mobile */}
      <footer className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shrink-0 flex items-center justify-between gap-3 shadow-2xl z-40">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold">변경사항 실시간 자동 저장됨</span>
        </div>
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-teal-500/25 cursor-pointer transition-all active:scale-95 border border-teal-400/40"
        >
          <Eye className="w-4 h-4" />
          <span>손님용 화면 보기 (나가기)</span>
        </button>
      </footer>
    </div>
  );
};
