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
  Info
} from 'lucide-react';

interface AdminModeProps {
  products: Product[];
  inquiries: ConsultationRequest[];
  rates: ExchangeRates;
  onSaveProducts: (products: Product[]) => void;
  onSaveInquiries: (inquiries: ConsultationRequest[]) => void;
  onExitAdmin: () => void;
  onPreviewProduct: (product: Product) => void;
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

const PRESET_INCLUDED = [
  '전 일정 단독 전용 차량 및 유류비/톨게이트비 일체',
  '한국어 능통 현지 베테랑 전문 가이드 동행',
  '전 일정 엄선된 5성급 호텔/풀빌라 숙박',
  '일정표 내 명시된 관광지 입장료 및 케이블카 탑승권',
  '현지 대표 특식 및 전 일정 식사 포함',
  '1억원 상당 해외 여행자 보험'
];

const PRESET_EXCLUDED = [
  '왕복 국제선 항공권 (항공권 별도 발권 또는 대행 가능)',
  '가이드 및 전담 기사 매너팁',
  '개인 쇼핑 경비 및 음료/주류 비용',
  '일정표 외 선택 관광 및 개인 일정 경비'
];

const VILLA_AMENITIES = [
  '프라이빗 전용 수영장', '오션뷰 / 비치프론트', '풀 키친 (주방 조리시설)',
  '대형 냉장고 & 전자레인지', '야외 바비큐(BBQ) 시설', '세탁기 & 건조기',
  '초고속 무료 Wi-Fi', '스마트 TV (넷플릭스)', '무료 조식 룸서비스',
  '전용 버틀러 서비스', '24시간 리조트 보안', '욕조 & 자쿠지'
];

export const AdminMode: React.FC<AdminModeProps> = ({
  products,
  inquiries,
  rates,
  onSaveProducts,
  onSaveInquiries,
  onExitAdmin,
  onPreviewProduct,
}) => {
  // Navigation & Tabs
  const [adminTab, setAdminTab] = useState<'products' | 'inquiries'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('전체');
  const [filterRegion, setFilterRegion] = useState<string>('전체');
  
  // Product Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editorTab, setEditorTab] = useState<'basic' | 'pricing' | 'photos' | 'specs' | 'itinerary' | 'terms'>('basic');
  
  // Custom Tag Input inside Editor
  const [customTagInput, setCustomTagInput] = useState('');
  const [customPhotoUrlInput, setCustomPhotoUrlInput] = useState('');
  const [customIncludedInput, setCustomIncludedInput] = useState('');
  const [customExcludedInput, setCustomExcludedInput] = useState('');
  
  // Image Uploading
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  // Status Notification
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 3000);
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

  // Open Editor for Creating New Product
  const handleCreateNewProduct = (category: Category = '추천패키지') => {
    const newId = `prod-${Date.now()}`;
    const initialProd: Product = {
      id: newId,
      title: '',
      subTitle: '',
      category: category,
      region: '중부',
      city: '다낭',
      priceKRW: 690000,
      priceVND: Math.round(690000 * (rates.VND / rates.KRW)),
      duration: '3박 5일',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [],
      rating: 4.9,
      reviewCount: 38,
      isPopular: true,
      isHotDeal: false,
      discountPercent: 0,
      departureCities: ['인천', '부산', '대구', '청주'],
      tags: ['#가족여행', '#단독차량', '#한국어가이드'],
      description: '신짜오투어가 직접 기획하고 현지 직영 가이드가 전담 케어하는 베스트 맞춤 여행 상품입니다.',
      included: [...PRESET_INCLUDED],
      excluded: [...PRESET_EXCLUDED],
      itinerary: [
        {
          day: 1,
          title: '출발 및 현지 도착 ➔ 전담 가이드 미팅 ➔ 호텔 체크인',
          description: '공항 출국 수속 후 베트남 현지 공항 도착. 신짜오투어 전담 한국어 가이드 미팅 후 단독 전용 차량 탑승하여 호텔/풀빌라 이동 및 체크인.',
          meal: '조식: 기내식 | 중식: 현지식 | 석식: 웰컴 시푸드 만찬',
          hotel: '5성급 특급 호텔 또는 독채 풀빌라'
        },
        {
          day: 2,
          title: '핵심 랜드마크 관광 및 힐링 코스 투어',
          description: '호텔 조식 후 전용 차량으로 핵심 명소 탐방. 여유로운 단독 투어와 현지 최고급 레스토랑 미식 체험.',
          meal: '조식: 호텔식 | 중식: 현지 정통식 | 석식: 고급 분짜 & 스테이크',
          hotel: '5성급 특급 호텔 또는 독채 풀빌라'
        },
        {
          day: 3,
          title: '자유 힐링 휴양 또는 스파 마사지 ➔ 공항 샌딩',
          description: '체크아웃 후 90분 전통 프리미엄 스파 마사지 체험. 롯데마트 쇼핑 및 디너 후 공항 전용 차량 샌딩.',
          meal: '조식: 호텔식 | 중식: 자유식 | 석식: BBQ 만찬',
          hotel: '기내박 또는 귀국'
        }
      ],
      villaSpecs: category === '풀빌라' ? {
        villaName: '',
        structureDescription: '3베드룸 단독 독채 풀빌라 (거실 + 주방 + 전용 수영장)',
        bedrooms: 3,
        bathrooms: 3,
        beds: '킹베드 3개',
        maxOccupancy: 8,
        standardOccupancy: 6,
        privatePool: true,
        oceanView: true,
        areaSqm: 280,
        floors: 2,
        address: '베트남 다낭 미케비치 해안가 리조트 단지',
        googleMapUrl: '',
        airbnbUrl: '',
        amenities: ['프라이빗 전용 수영장', '오션뷰 / 비치프론트', '풀 키친 (주방 조리시설)', '초고속 무료 Wi-Fi', '24시간 리조트 보안'],
        checkInTime: '15:00',
        checkOutTime: '11:00',
        houseRules: ['실내 절대 금연 (발코니 흡연 가능)', '22시 이후 심야 정숙', '바비큐 이용 시 사전 문의']
      } : undefined,
      golfSpecs: category === '골프투어' ? {
        holes: 54,
        greenFeeIncluded: true,
        caddieFeeIncluded: true,
        cartIncluded: true,
        golfCourseNames: ['다낭 BRG 골프 리조트 (18홀)', '몽고메리 링크스 CC (18홀)', '바나힐스 골프클럽 (18홀)'],
        courseDetails: [
          {
            name: '다낭 BRG 골프 리조트',
            designer: '그렉 노먼 (Greg Norman)',
            holes: 18,
            description: '바닷바람을 맞으며 라운딩할 수 있는 해안 링크스 스타일의 베트남 1위 명문 코스',
            difficulty: '중상급'
          }
        ]
      } : undefined
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

  // Save Product Changes
  const handleSaveProductChanges = () => {
    if (!editingProduct) return;
    if (!editingProduct.title.trim()) {
      alert('상품명을 입력해 주세요.');
      setEditorTab('basic');
      return;
    }

    const exists = products.some(p => p.id === editingProduct.id);
    let updated: Product[];
    if (exists) {
      updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
    } else {
      updated = [editingProduct, ...products];
    }

    onSaveProducts(updated);
    setIsEditorOpen(false);
    setEditingProduct(null);
    showNotification(`💾 "${editingProduct.title}" 상품이 성공적으로 저장되었습니다!`);
  };

  // Multi Image Upload Handler
  const handleImageFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProduct) return;

    setIsUploadingImages(true);
    try {
      const base64Promises = (Array.from(files) as File[]).map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const base64List = await Promise.all(base64Promises);
      
      // Try uploading to server endpoint
      const res = await fetch('/api/upload-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: base64List })
      });
      const data = await res.json();
      
      const uploadedUrls: string[] = (data && data.urls && data.urls.length > 0) ? data.urls : base64List;

      setEditingProduct(prev => {
        if (!prev) return prev;
        const mainImg = prev.imageUrl || uploadedUrls[0];
        const restUrls = prev.imageUrl ? uploadedUrls : uploadedUrls.slice(1);
        const existingSubs = prev.additionalImages || [];
        return {
          ...prev,
          imageUrl: mainImg,
          additionalImages: Array.from(new Set([...existingSubs, ...restUrls]))
        };
      });

      showNotification(`📸 ${uploadedUrls.length}장의 사진이 성공적으로 등록되었습니다.`);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('이미지 업로드 중 오류가 발생했습니다. 이미지 URL을 직접 입력해 주세요.');
    } finally {
      setIsUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                  신짜오투어 관리자 모드
                </h1>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-400/30">
                  ADMIN CMS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                상품 추가·수정·삭제, 실시간 환율 연동, 카테고리별 특화 스펙 및 고객 예약 문의 통합 관리
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View live store button */}
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>손님 화면으로 이동</span>
            </button>
          </div>
        </div>

        {/* Tab switcher: Products vs Inquiries */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 border-t border-slate-800/80 pt-2 pb-2">
          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              adminTab === 'products'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>여행 상품 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
              adminTab === 'inquiries'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* =================================================================== */}
        {/* TAB 1: TRAVEL PRODUCTS MANAGEMENT                                   */}
        {/* =================================================================== */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            {/* Quick Action Top Bar */}
            <div className="bg-slate-800/90 border border-slate-700 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Category & Region Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="상품명, 도시, 태그 검색..."
                    className="bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-white placeholder-slate-500 focus:outline-hidden w-48 sm:w-56"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-hidden"
                >
                  <option value="전체">전체 카테고리</option>
                  <option value="풀빌라">🏰 풀빌라</option>
                  <option value="골프투어">⛳ 골프투어</option>
                  <option value="추천패키지">🎒 추천패키지</option>
                  <option value="자유여행">🏝️ 자유여행</option>
                </select>

                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-hidden"
                >
                  <option value="전체">전체 지역</option>
                  <option value="중부">중부 (다낭/호이안/나트랑)</option>
                  <option value="북부">북부 (하노이/하롱베이/사파)</option>
                  <option value="남부">남부 (푸꾸옥/달랏/호치민)</option>
                </select>
              </div>

              {/* Action Buttons: Add Product & Backup Tools */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Add New Product Dropdown / Primary Button */}
                <button
                  onClick={() => handleCreateNewProduct('추천패키지')}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>새 여행상품 등록</span>
                </button>

                {/* Specific Category Shortcut Add */}
                <button
                  onClick={() => handleCreateNewProduct('풀빌라')}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
                  title="풀빌라 전용 스펙 상품 등록"
                >
                  + 🏰 풀빌라
                </button>

                <button
                  onClick={() => handleCreateNewProduct('골프투어')}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
                  title="골프투어 전용 스펙 상품 등록"
                >
                  + ⛳ 골프
                </button>

                {/* Backup & Tools Menu */}
                <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                  <button
                    onClick={handleExportJSON}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="전체 상품 JSON 백업 다운로드"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <label 
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    title="JSON 백업 파일 복원"
                  >
                    <Upload className="w-4 h-4" />
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>

                  <button
                    onClick={handleResetToFactory}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-rose-900/60 text-slate-400 hover:text-rose-200 border border-slate-700 transition-colors"
                    title="초기 샘플 데이터로 리셋"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Banner Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 font-bold block">전체 등록 상품</span>
                <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
                  {products.length} <span className="text-xs font-normal text-slate-400">개</span>
                </span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-2xl">
                <span className="text-xs text-teal-400 font-bold block">🏰 독채 풀빌라</span>
                <span className="text-xl sm:text-2xl font-black text-teal-300 mt-1 block">
                  {products.filter(p => p.category === '풀빌라').length} <span className="text-xs font-normal text-slate-400">개</span>
                </span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-2xl">
                <span className="text-xs text-emerald-400 font-bold block">⛳ 골프투어</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-300 mt-1 block">
                  {products.filter(p => p.category === '골프투어').length} <span className="text-xs font-normal text-slate-400">개</span>
                </span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-2xl">
                <span className="text-xs text-amber-400 font-bold block">🎒 패키지 & 자유여행</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 mt-1 block">
                  {products.filter(p => p.category === '추천패키지' || p.category === '자유여행').length} <span className="text-xs font-normal text-slate-400">개</span>
                </span>
              </div>
            </div>

            {/* Products Table / Cards Grid */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <h3 className="font-black text-white text-base flex items-center gap-2">
                  <span>상품 목록 관리</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    {filteredProducts.length}개 표시 중
                  </span>
                </h3>
                <span className="text-xs text-slate-400">
                  수정, 복제, 삭제 또는 미리보기를 선택하세요
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-700 text-slate-400 mx-auto flex items-center justify-center">
                    <Search className="w-7 h-7" />
                  </div>
                  <p className="text-slate-300 font-bold text-base">검색된 여행 상품이 없습니다.</p>
                  <button
                    onClick={() => handleCreateNewProduct()}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs"
                  >
                    + 새 상품 바로 등록하기
                  </button>
                </div>
              ) : (
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
                                {prod.region} · {prod.city}
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
                        <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 border-slate-700/60 pt-3 md:pt-0">
                          {/* Preview Product */}
                          <button
                            onClick={() => onPreviewProduct(prod)}
                            className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="손님 화면에서 어떻게 보일지 미리보기"
                          >
                            <Eye className="w-3.5 h-3.5 text-teal-400" />
                            <span>미리보기</span>
                          </button>

                          {/* 1-Click Duplicate */}
                          <button
                            onClick={() => handleDuplicateProduct(prod)}
                            className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="동일한 스펙으로 상품 즉시 복제"
                          >
                            <Copy className="w-3.5 h-3.5 text-amber-400" />
                            <span>복제</span>
                          </button>

                          {/* Edit Product */}
                          <button
                            onClick={() => handleEditProduct(prod)}
                            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>수정</span>
                          </button>

                          {/* Delete Product */}
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.title)}
                            className="p-2 rounded-xl bg-slate-700/50 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="상품 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {editingProduct.title ? `[수정] ${editingProduct.title}` : '✨ 새 여행 상품 등록'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    카테고리별 특화 스펙과 실시간 환율을 설정하여 손님들이 한눈에 볼 수 있도록 구성하세요.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveProductChanges}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>저장 완료</span>
                </button>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editor Tab Navigation */}
            <div className="bg-slate-950/80 px-6 py-2.5 border-b border-slate-800 overflow-x-auto flex items-center gap-2 shrink-0">
              {[
                { id: 'basic', label: '1. 기본 정보', icon: <Info className="w-3.5 h-3.5" /> },
                { id: 'pricing', label: '2. 가격 & 실시간 환율', icon: <DollarSign className="w-3.5 h-3.5" /> },
                { id: 'photos', label: '3. 사진 & 갤러리', icon: <ImageIcon className="w-3.5 h-3.5" /> },
                { id: 'specs', label: `4. ${editingProduct.category === '풀빌라' ? '🏰 풀빌라 스펙' : editingProduct.category === '골프투어' ? '⛳ 골프 스펙' : '⭐ 상세 스펙'}`, icon: <Home className="w-3.5 h-3.5" /> },
                { id: 'itinerary', label: '5. 일자별 여행 일정표', icon: <Calendar className="w-3.5 h-3.5" /> },
                { id: 'terms', label: '6. 포함/불포함 & 소개글', icon: <FileText className="w-3.5 h-3.5" /> },
              ].map((tab) => {
                const isActive = editorTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setEditorTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
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
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">

              {/* ============================================================= */}
              {/* TAB 1: BASIC INFO                                             */}
              {/* ============================================================= */}
              {editorTab === 'basic' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300 block">상품 카테고리 *</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => {
                          const newCat = e.target.value as Category;
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
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-hidden focus:border-amber-400"
                      >
                        <option value="추천패키지">🎒 추천패키지</option>
                        <option value="풀빌라">🏰 풀빌라</option>
                        <option value="골프투어">⛳ 골프투어</option>
                        <option value="자유여행">🏝️ 자유여행</option>
                      </select>
                    </div>

                    {/* Region */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300 block">권역 (지역) *</label>
                      <select
                        value={editingProduct.region}
                        onChange={(e) => {
                          const newReg = e.target.value as Region;
                          setEditingProduct(prev => {
                            if (!prev) return prev;
                            let defCity: City = '다낭';
                            if (newReg === '북부') defCity = '하노이';
                            if (newReg === '남부') defCity = '푸꾸옥';
                            return { ...prev, region: newReg, city: defCity };
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-hidden focus:border-amber-400"
                      >
                        <option value="중부">중부 (다낭 · 호이안 · 나트랑 · 후에)</option>
                        <option value="북부">북부 (하노이 · 하롱베이 · 사파 · 닌빈)</option>
                        <option value="남부">남부 (푸꾸옥 · 달랏 · 호치민 · 붕따우)</option>
                      </select>
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300 block">대표 도시 *</label>
                      <select
                        value={editingProduct.city}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, city: e.target.value as City } : prev)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 font-bold text-white focus:outline-hidden focus:border-amber-400"
                      >
                        {editingProduct.region === '중부' && (
                          <>
                            <option value="다낭">다낭</option>
                            <option value="호이안">호이안</option>
                            <option value="나트랑">나트랑</option>
                            <option value="후에">후에</option>
                          </>
                        )}
                        {editingProduct.region === '북부' && (
                          <>
                            <option value="하노이">하노이</option>
                            <option value="하롱베이">하롱베이</option>
                            <option value="사파">사파</option>
                            <option value="닌빈">닌빈</option>
                          </>
                        )}
                        {editingProduct.region === '남부' && (
                          <>
                            <option value="푸꾸옥">푸꾸옥</option>
                            <option value="달랏">달랏</option>
                            <option value="호치민">호치민</option>
                            <option value="붕따우">붕따우</option>
                          </>
                        )}
                      </select>
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
                  {/* Upload & Direct Input Bar */}
                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-black text-white text-base">상품 대표 및 갤러리 사진 관리</h4>
                        <p className="text-xs text-slate-400">내 컴퓨터의 사진을 업로드하거나 고화질 베트남 프리셋 사진을 1초 만에 선택하세요.</p>
                      </div>

                      {/* File Upload Button */}
                      <label className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs flex items-center gap-2 cursor-pointer transition-colors shrink-0">
                        <Upload className="w-4 h-4" />
                        <span>{isUploadingImages ? '업로드 중...' : '내 컴퓨터 사진 업로드'}</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageFilesUpload}
                          className="hidden"
                          disabled={isUploadingImages}
                        />
                      </label>
                    </div>

                    {/* Main Thumbnail URL input */}
                    <div className="space-y-1.5 pt-2">
                      <label className="font-bold text-slate-300 block">대표 썸네일 이미지 URL (가장 메인)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingProduct.imageUrl}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, imageUrl: e.target.value } : prev)}
                          placeholder="https://..."
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Sub image URL add */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300 block">추가 갤러리 사진 URL 추가</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customPhotoUrlInput}
                          onChange={(e) => setCustomPhotoUrlInput(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (customPhotoUrlInput.trim()) {
                              setEditingProduct(prev => prev ? {
                                ...prev,
                                additionalImages: [...(prev.additionalImages || []), customPhotoUrlInput.trim()]
                              } : prev);
                              setCustomPhotoUrlInput('');
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                        >
                          추가
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click High Quality Presets */}
                  <div className="space-y-3">
                    <span className="font-bold text-slate-300 block">✨ 고화질 베트남 프리셋 사진 원클릭 추가</span>
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
                          className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all aspect-video"
                        >
                          <img src={item.url} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                            <span className="text-[10px] font-bold text-white leading-tight truncate">{item.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Registered Photos List */}
                  <div className="space-y-3 pt-2">
                    <span className="font-bold text-slate-300 block">
                      현재 등록된 사진 목록 (대표 사진 포함 총 {(editingProduct.additionalImages?.length || 0) + (editingProduct.imageUrl ? 1 : 0)}장)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                      {/* Main */}
                      {editingProduct.imageUrl && (
                        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-400 aspect-video group">
                          <img src={editingProduct.imageUrl} alt="대표 사진" className="w-full h-full object-cover" />
                          <span className="absolute top-1 left-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded">
                            👑 대표 사진
                          </span>
                        </div>
                      )}

                      {/* Sub images */}
                      {(editingProduct.additionalImages || []).map((url, sIdx) => (
                        <div key={sIdx} className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 aspect-video group">
                          <img src={url} alt={`갤러리 ${sIdx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                // Set as main
                                const oldMain = editingProduct.imageUrl;
                                setEditingProduct(prev => {
                                  if (!prev) return prev;
                                  const filtered = (prev.additionalImages || []).filter((_, i) => i !== sIdx);
                                  return {
                                    ...prev,
                                    imageUrl: url,
                                    additionalImages: [oldMain, ...filtered].filter(Boolean)
                                  };
                                });
                              }}
                              className="px-2 py-1 rounded bg-amber-400 text-slate-950 text-[10px] font-bold"
                            >
                              대표로 지정
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  additionalImages: (prev.additionalImages || []).filter((_, i) => i !== sIdx)
                                } : prev);
                              }}
                              className="p-1 rounded bg-rose-600 text-white"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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
                  {/* IF VILLA CATEGORY */}
                  {editingProduct.category === '풀빌라' && (
                    <div className="space-y-6">
                      <div className="bg-teal-950/40 border border-teal-700/60 p-5 rounded-3xl space-y-4">
                        <h4 className="font-black text-teal-300 text-base flex items-center gap-2">
                          <Home className="w-5 h-5" />
                          <span>독채 풀빌라 전용 상세 스펙 입력</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="font-bold text-slate-300 block mb-1">침실 수 (베드룸) *</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={editingProduct.villaSpecs?.bedrooms || 3}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { maxOccupancy: 8, privatePool: true, oceanView: true }), bedrooms: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-300 block mb-1">전용 욕실 수</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={editingProduct.villaSpecs?.bathrooms || 3}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true, oceanView: true }), bathrooms: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-300 block mb-1">최대 투숙 인원</label>
                            <input
                              type="number"
                              min="1"
                              max="30"
                              value={editingProduct.villaSpecs?.maxOccupancy || 8}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, privatePool: true, oceanView: true }), maxOccupancy: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>
                        </div>

                        {/* Villa Area & Structure */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-300 block mb-1">빌라 면적 (㎡)</label>
                            <input
                              type="number"
                              value={editingProduct.villaSpecs?.areaSqm || 280}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true, oceanView: true }), areaSqm: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-300 block mb-1">침대 구성 (예: 킹 3개)</label>
                            <input
                              type="text"
                              value={editingProduct.villaSpecs?.beds || '킹베드 3개'}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true, oceanView: true }), beds: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>
                        </div>

                        {/* Pool & Oceanview Toggles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <label className="flex items-center gap-2.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.villaSpecs?.privatePool ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, oceanView: true }), privatePool: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-teal-500"
                            />
                            <span className="font-bold text-white">🏊 프라이빗 전용 수영장 보유</span>
                          </label>

                          <label className="flex items-center gap-2.5 bg-slate-900 p-3.5 rounded-xl border border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.villaSpecs?.oceanView ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true }), oceanView: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-teal-500"
                            />
                            <span className="font-bold text-white">🌊 오션뷰 / 해변 인접 (Beachfront)</span>
                          </label>
                        </div>

                        {/* Address & Google Maps */}
                        <div className="space-y-3 pt-2">
                          <div>
                            <label className="font-bold text-slate-300 block mb-1">상세 현지 주소</label>
                            <input
                              type="text"
                              value={editingProduct.villaSpecs?.address || editingProduct.address || ''}
                              onChange={(e) => {
                                const v = e.target.value;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  address: v,
                                  villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true, oceanView: true }), address: v }
                                } : prev);
                              }}
                              placeholder="예: 베트남 다낭 미케비치 푸라마 리조트 단지"
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-bold text-slate-300 block mb-1">구글 지도 링크 URL</label>
                              <input
                                type="text"
                                value={editingProduct.villaSpecs?.googleMapUrl || editingProduct.googleMapUrl || ''}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    googleMapUrl: v,
                                    villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true, oceanView: true }), googleMapUrl: v }
                                  } : prev);
                                }}
                                placeholder="https://maps.google.com/..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                              />
                            </div>

                            <div>
                              <label className="font-bold text-slate-300 block mb-1">에어비앤비 / 외부 예약 링크 (선택)</label>
                              <input
                                type="text"
                                value={editingProduct.villaSpecs?.airbnbUrl || editingProduct.airbnbUrl || ''}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setEditingProduct(prev => prev ? {
                                    ...prev,
                                    airbnbUrl: v,
                                    villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true, oceanView: true }), airbnbUrl: v }
                                  } : prev);
                                }}
                                placeholder="https://airbnb.co.kr/rooms/..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Villa Amenities Selection */}
                        <div className="space-y-2 pt-2">
                          <span className="font-bold text-slate-300 block">풀빌라 주요 편의시설 (어메니티) 체크</span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {VILLA_AMENITIES.map((am) => {
                              const isChecked = (editingProduct.villaSpecs?.amenities || []).includes(am);
                              return (
                                <label key={am} className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const cur = editingProduct.villaSpecs?.amenities || [];
                                      const next = e.target.checked ? [...cur, am] : cur.filter(x => x !== am);
                                      setEditingProduct(prev => prev ? {
                                        ...prev,
                                        villaSpecs: { ...(prev.villaSpecs || { bedrooms: 3, maxOccupancy: 8, privatePool: true, oceanView: true }), amenities: next }
                                      } : prev);
                                    }}
                                    className="w-3.5 h-3.5 rounded text-teal-500"
                                  />
                                  <span className="text-xs text-slate-200">{am}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* IF GOLF CATEGORY */}
                  {editingProduct.category === '골프투어' && (
                    <div className="space-y-6">
                      <div className="bg-emerald-950/40 border border-emerald-700/60 p-5 rounded-3xl space-y-4">
                        <h4 className="font-black text-emerald-300 text-base flex items-center gap-2">
                          <span>⛳ 골프투어 전용 상세 스펙 입력</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="font-bold text-slate-300 block mb-1">총 라운딩 홀 수 (예: 54홀) *</label>
                            <input
                              type="number"
                              value={editingProduct.golfSpecs?.holes || 54}
                              onChange={(e) => {
                                const v = Number(e.target.value);
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { greenFeeIncluded: true, caddieFeeIncluded: true, golfCourseNames: [] }), holes: v }
                                } : prev);
                              }}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                            />
                          </div>

                          <label className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer self-end">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.golfSpecs?.greenFeeIncluded ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54, caddieFeeIncluded: true, golfCourseNames: [] }), greenFeeIncluded: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-emerald-500"
                            />
                            <span className="font-bold text-white">⛳ 그린피 100% 포함</span>
                          </label>

                          <label className="flex items-center gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer self-end">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.golfSpecs?.caddieFeeIncluded ?? true)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setEditingProduct(prev => prev ? {
                                  ...prev,
                                  golfSpecs: { ...(prev.golfSpecs || { holes: 54, greenFeeIncluded: true, golfCourseNames: [] }), caddieFeeIncluded: checked }
                                } : prev);
                              }}
                              className="w-4 h-4 rounded text-emerald-500"
                            />
                            <span className="font-bold text-white">🏌️ 캐디피 100% 포함</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COMMON SPECS INFO */}
                  {editingProduct.category !== '풀빌라' && editingProduct.category !== '골프투어' && (
                    <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center space-y-2">
                      <Compass className="w-8 h-8 text-amber-400 mx-auto" />
                      <h4 className="font-black text-white text-base">패키지 & 자유여행 맞춤 구성</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        패키지 및 자유여행 상품은 다음 탭인 <strong>'5. 일자별 여행 일정표'</strong>와 <strong>'6. 포함/불포함 & 소개글'</strong>에서 손님들에게 필요한 상세 내용을 편리하게 입력하실 수 있습니다.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 5: ITINERARY (DAY 1 ~ N)                                   */}
              {/* ============================================================= */}
              {editorTab === 'itinerary' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-white text-base">일자별 상세 여행 일정표</h4>
                      <p className="text-xs text-slate-400">1일차부터 마지막 날까지 손님들이 경험할 일정과 식사, 호텔을 입력하세요.</p>
                    </div>

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
                          hotel: '5성급 특급 호텔'
                        };
                        setEditingProduct(prev => prev ? { ...prev, itinerary: [...cur, newDay] } : prev);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ 다음 일차 추가</span>
                    </button>
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
                              // Re-index days
                              const reIndexed = filtered.map((item, i) => ({ ...item, day: i + 1 }));
                              setEditingProduct(prev => prev ? { ...prev, itinerary: reIndexed } : prev);
                            }}
                            className="text-rose-400 hover:text-rose-300 text-xs font-bold"
                          >
                            일정 삭제
                          </button>
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">일정 제목</label>
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
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs"
                          />
                        </div>

                        {/* Meal & Hotel */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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
                            <label className="text-[11px] font-bold text-slate-400">숙소 정보</label>
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
                              placeholder="5성급 빈펄 럭셔리 리조트"
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
                            className="text-slate-500 hover:text-rose-400 p-1"
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
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
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
                            className="text-slate-500 hover:text-rose-400 p-1"
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
                        className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
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
            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400">
                💡 저장을 누르면 손님 화면에 즉시 반영되며 서버와 브라우저에 영구 저장됩니다.
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveProductChanges}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>상품 저장 완료</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
