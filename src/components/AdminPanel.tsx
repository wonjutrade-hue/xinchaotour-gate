import React, { useState, useEffect, useRef } from 'react';
import { Product, Category, Region, City, ConsultationRequest, ItineraryDay } from '../types';
import { 
  X, Plus, Edit3, Trash2, Download, Upload, RotateCcw, Lock, Unlock, 
  Eye, Save, Layers, Inbox, Camera, Settings, MessageCircle, Phone, 
  MapPin, Search, Grid, List, Sparkles, AlertTriangle, Check, 
  Copy, ArrowLeft, ArrowUpDown, ChevronRight, Image as ImageIcon
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

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  inquiries: ConsultationRequest[];
  onAddProduct: (prod: Omit<Product, 'id'>) => Promise<Product | undefined>;
  onUpdateProduct: (id: string, updated: Partial<Product>) => Promise<Product | undefined>;
  onDeleteProduct: (id: string) => Promise<void>;
  onClearAllProducts?: () => Promise<void>;
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
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [],
    rating: 5.0,
    reviewCount: 12,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 0,
    departureCities: ['인천', '김해', '대구'],
    tags: ['#프라이빗풀빌라', '#단독독채', '#럭셔리휴양'],
    description: '',
    included: [],
    excluded: [],
    itinerary: []
  });

  const [includedText, setIncludedText] = useState('');
  const [excludedText, setExcludedText] = useState('');
  const [departureCitiesText, setDepartureCitiesText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [itineraryList, setItineraryList] = useState<ItineraryDay[]>([]);

  // Villa / Golf specs
  const [villaBedrooms, setVillaBedrooms] = useState(3);
  const [villaPrivatePool, setVillaPrivatePool] = useState(true);
  const [villaOceanView, setVillaOceanView] = useState(false);
  const [villaMaxOccupancy, setVillaMaxOccupancy] = useState(6);
  const [golfHoles, setGolfHoles] = useState(18);
  const [greenFeeIncluded, setGreenFeeIncluded] = useState(true);
  const [caddieFeeIncluded, setCaddieFeeIncluded] = useState(true);
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

  // Image Compressor & Disk Uploader
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const MAX_SIZE = 1440;
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
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = () => reject(new Error('이미지 변환 실패'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
      reader.readAsDataURL(file);
    });
  };

  const uploadFilesToDisk = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];
    setUploadStatus(`고화질 사진 ${files.length}장 처리 중...`);
    const base64List: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        base64List.push(compressed);
      } catch (err) {
        console.warn('Compress failed:', err);
      }
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
      console.warn('Upload API fallback to client base64');
    }
    setUploadStatus(null);
    return base64List;
  };

  // Open New Product Creator
  const handleOpenCreator = (presetCategory: Category = '풀빌라', presetCity: City = '다낭') => {
    const region = Object.entries(REGION_CITIES).find(([_, cities]) => cities.includes(presetCity))?.[0] as Region || '중부';
    
    setEditingId(null);
    setFormData({
      title: `[${presetCity}/${presetCategory}] 베트남 최고급 단독 ${presetCategory}`,
      subTitle: '전 일정 단독 전용차량 & 100% 한국인 전담 가이드 동행 힐링 여행',
      category: presetCategory,
      region,
      city: presetCity,
      priceKRW: presetCategory === '풀빌라' ? 850000 : presetCategory === '골프투어' ? 950000 : 650000,
      priceVND: presetCategory === '풀빌라' ? 16000000 : presetCategory === '골프투어' ? 18000000 : 12000000,
      duration: '3박 5일',
      imageUrl: presetCategory === '풀빌라' 
        ? 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
        : presetCategory === '골프투어'
        ? 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80'
        : 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
      additionalImages: [],
      rating: 5.0,
      reviewCount: 15,
      isPopular: true,
      isHotDeal: false,
      discountPercent: 0,
      departureCities: ['인천', '김해', '대구', '청주'],
      tags: [`#${presetCity}여행`, `#${presetCategory}`, '#단독차량', '#노쇼핑'],
      description: '고객 맞춤형 1:1 단독 프라이빗 여행 상품입니다. 원하시는 일정과 호텔로 자유롭게 조정 가능합니다.',
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
    setTagsText(`#${presetCity}여행\n#${presetCategory}\n#단독차량\n#노쇼핑`);
    setGalleryImages([]);
    setItineraryList([
      { day: 1, title: '공항 도착 및 가이드 미팅 & 체크인', description: '단독 차량으로 숙소 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 호텔/풀빌라' },
      { day: 2, title: '시티 주요 명소 투어 & 힐링 스파', description: '인기 관광지 관람 및 특식 다이닝, 90분 마사지', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 호텔/풀빌라' },
      { day: 3, title: '자유 일정 & 기념품 쇼핑 후 공항 배웅', description: '체크아웃 후 인기 카페 방문 및 공항 단독 샌딩', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
    ]);

    setVillaBedrooms(3);
    setVillaPrivatePool(true);
    setVillaOceanView(false);
    setVillaMaxOccupancy(6);
    setGolfHoles(18);
    setGreenFeeIncluded(true);
    setCaddieFeeIncluded(true);
    setGolfCourseNamesText(`${presetCity} CC\n몽고메리 링스`);

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
      setVillaBedrooms(prod.villaSpecs.bedrooms || 3);
      setVillaPrivatePool(prod.villaSpecs.privatePool ?? true);
      setVillaOceanView(prod.villaSpecs.oceanView ?? false);
      setVillaMaxOccupancy(prod.villaSpecs.maxOccupancy || 6);
    }
    if (prod.golfSpecs) {
      setGolfHoles(prod.golfSpecs.holes || 18);
      setGreenFeeIncluded(prod.golfSpecs.greenFeeIncluded ?? true);
      setCaddieFeeIncluded(prod.golfSpecs.caddieFeeIncluded ?? true);
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

      const mainImage = galleryImages[0] || formData.imageUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80';

      const payload: Partial<Product> = {
        ...formData,
        imageUrl: mainImage,
        additionalImages: galleryImages,
        included: splitText(includedText),
        excluded: splitText(excludedText),
        departureCities: splitText(departureCitiesText),
        tags: splitText(tagsText),
        itinerary: itineraryList
      };

      if (formData.category === '풀빌라') {
        payload.villaSpecs = {
          bedrooms: villaBedrooms,
          privatePool: villaPrivatePool,
          oceanView: villaOceanView,
          maxOccupancy: villaMaxOccupancy
        };
      } else if (formData.category === '골프투어') {
        payload.golfSpecs = {
          holes: golfHoles,
          greenFeeIncluded,
          caddieFeeIncluded,
          golfCourseNames: splitText(golfCourseNamesText)
        };
      }

      if (editingId) {
        await onUpdateProduct(editingId, payload);
        alert(`✅ "${payload.title}" 상품 정보가 성공적으로 수정되었습니다!`);
      } else {
        await onAddProduct(payload as any);
        alert(`🎉 새 여행 상품 "${payload.title}"이(가) 등록되었습니다!`);
      }

      setActiveTab('products');
      setEditingId(null);
    } catch (err: any) {
      alert(`⚠️ 저장 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Bulk Delete Selected
  const handleBatchDelete = async () => {
    if (selectedProductIds.length === 0) return;
    if (!confirm(`선택한 ${selectedProductIds.length}개 상품을 삭제하시겠습니까?`)) return;
    
    for (const id of selectedProductIds) {
      await onDeleteProduct(id);
    }
    setSelectedProductIds([]);
    alert('선택한 상품이 모두 삭제되었습니다.');
  };

  // Filtered Products List
  const displayProducts = products.filter(p => {
    if (filterCategory !== '전체' && p.category !== filterCategory) return false;
    if (filterRegion !== '전체' && p.region !== filterRegion) return false;
    if (filterCity !== '전체' && p.city !== filterCity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSub = (p.subTitle || '').toLowerCase().includes(q);
      const matchCity = p.city.toLowerCase().includes(q);
      const matchTag = (p.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSub && !matchCity && !matchTag) return false;
    }
    return true;
  });

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `xinchaotour_products_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (Array.isArray(parsed)) {
          await onImportProducts(parsed, false);
          alert(`${parsed.length}개 상품을 성공적으로 가져왔습니다.`);
        }
      } catch (err) {
        alert('올바른 JSON 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">신짜오투어 통합 관리자 센터</h3>
            <p className="text-xs text-slate-400 mt-1">
              관리자 암호를 입력하여 상품 추가·수정·삭제 및 예약 관리를 시작하세요.
            </p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              placeholder="관리자 암호 입력 (기본: 1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-center text-sm font-bold text-white tracking-widest focus:ring-2 focus:ring-amber-400 outline-none"
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
                className="flex-2 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>관리자 센터 입장</span>
              </button>
            </div>
          </form>
          <p className="text-[11px] text-slate-500">
            * 기본 패스워드는 <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded">1234</code> 입니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col w-full h-full overflow-hidden animate-fadeIn">
      {/* 1. TOP MASTER HEADER */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            💎
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-base sm:text-lg text-white tracking-tight">
                신짜오투어 통합 관리자 스튜디오
              </h2>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/30">
                PRO MASTER MODE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              실제 상품 추가·수정·삭제 | 에어비앤비급 고화질 사진 | 실시간 예약 접수함
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <span className="text-slate-400">등록 상품: <strong className="text-amber-300 font-extrabold">{products.length}개</strong></span>
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <span className="text-slate-400">예약 문의: <strong className="text-emerald-400 font-extrabold">{inquiries.length}건</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 border border-teal-600 shadow-md transition-all cursor-pointer hover:scale-102"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>손님용 홈페이지로 이동</span>
          </button>
        </div>
      </header>

      {/* 2. NAVIGATION TAB BAR */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-2 flex items-center justify-between shrink-0 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>🛍️ 전체 상품 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => handleOpenCreator('풀빌라', '다낭')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>➕ {editingId ? '상품 상세 수정 중' : '새 상품 등록 스튜디오'}</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>📸 고화질 사진 보관함 ({allSitePhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>📥 실시간 예약 문의함 ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>⚙️ 카카오톡 & 사이트 설정</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE CONTENT */}
      <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-8">
        
        {/* ================= TAB 1: ALL PRODUCTS STUDIO ================= */}
        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            {/* Action Toolbar */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleOpenCreator('풀빌라', '다낭')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>➕ 새 여행 상품 올리기</span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('골프투어', '다낭')}
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>⛳ 골프투어 양식 추가</span>
                  </button>

                  <button
                    onClick={() => handleOpenCreator('추천패키지', '하노이')}
                    className="px-3.5 py-2.5 rounded-xl bg-sky-900/50 hover:bg-sky-900/80 text-sky-300 border border-sky-500/30 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>🎒 추천패키지 양식 추가</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {onClearAllProducts && (
                    <button
                      onClick={async () => {
                        if (confirm('정말로 모든 상품을 삭제하여 0개로 비우시겠습니까?')) {
                          await onClearAllProducts();
                          alert('모든 상품이 삭제되었습니다.');
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      title="모든 상품을 한 번에 비웁니다"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>🗑️ 전체 비우기 (0개)</span>
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      if (confirm('기본 추천 12개 베트남 패키지 샘플 상품을 불러오시겠습니까?')) {
                        await onResetProducts();
                        alert('기본 샘플 상품이 성공적으로 복원되었습니다.');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>🔄 기본 샘플 복원</span>
                  </button>

                  <button
                    onClick={handleExportJson}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    title="전체 상품 JSON 백업"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>백업</span>
                  </button>

                  <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>복원</span>
                    <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
                <div className="relative sm:col-span-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="상품명, 도시, 태그 실시간 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                  />
                </div>

                <div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value as Category | '전체')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-amber-300"
                  >
                    <option value="전체">모든 카테고리 (전체)</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="flex gap-2">
                  <select
                    value={filterRegion}
                    onChange={(e) => {
                      setFilterRegion(e.target.value as Region);
                      setFilterCity('전체');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white"
                  >
                    <option value="전체">모든 권역</option>
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>

                  <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products List Count & Batch Actions */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <div>
                총 <strong className="text-white font-extrabold">{displayProducts.length}</strong>개의 상품이 조회되었습니다.
              </div>
              {selectedProductIds.length > 0 && (
                <button
                  onClick={handleBatchDelete}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>선택 {selectedProductIds.length}개 삭제</span>
                </button>
              )}
            </div>

            {/* Display Products (Grid or Table) */}
            {displayProducts.length === 0 ? (
              <div className="bg-slate-900 border border-dashed border-slate-800 rounded-3xl p-16 text-center space-y-4">
                <Layers className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-black text-white">등록된 상품이 없습니다</h4>
                <p className="text-xs text-slate-400">
                  '➕ 새 여행 상품 올리기' 버튼을 눌러 첫 상품을 등록하거나 '🔄 기본 샘플 복원'을 누르세요.
                </p>
                <button
                  onClick={() => handleOpenCreator('풀빌라', '다낭')}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                >
                  ➕ 지금 상품 등록하기
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-lg flex flex-col group transition-all"
                  >
                    {/* Thumbnail & Badges */}
                    <div className="relative h-48 bg-slate-950 overflow-hidden">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {prod.category}
                        </span>
                        <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                          {prod.region} · {prod.city}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                        사진 {(prod.additionalImages?.length || 0) + 1}장
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-slate-950/80 backdrop-blur-md p-2 rounded-xl text-white">
                        <span className="font-bold">{prod.duration}</span>
                        <span className="text-amber-300 font-black">{Number(prod.priceKRW || 0).toLocaleString()}원</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="font-black text-sm text-white line-clamp-1">{prod.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{prod.subTitle || prod.description}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="flex-1 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>상세 수정</span>
                        </button>

                        <button
                          onClick={() => handleDuplicateProduct(prod)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                          title="상품 복제"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {confirmDeleteId === prod.id ? (
                          <button
                            onClick={async () => {
                              await onDeleteProduct(prod.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs cursor-pointer animate-pulse"
                          >
                            정말 삭제?
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setConfirmDeleteId(prod.id);
                              setTimeout(() => setConfirmDeleteId(null), 4000);
                            }}
                            className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 text-rose-300 border border-rose-800/50 font-bold text-xs cursor-pointer transition-colors"
                            title="상품 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* TABLE VIEW */
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-black border-b border-slate-800">
                    <tr>
                      <th className="p-4">이미지/제목</th>
                      <th className="p-4">카테고리/지역</th>
                      <th className="p-4">가격 (KRW)</th>
                      <th className="p-4">일정</th>
                      <th className="p-4 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {displayProducts.map(prod => (
                      <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={prod.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-950 shrink-0" />
                          <div>
                            <div className="font-black text-white">{prod.title}</div>
                            <div className="text-slate-400 line-clamp-1">{prod.subTitle}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-amber-300">{prod.category}</span>
                          <div className="text-slate-400">{prod.region} · {prod.city}</div>
                        </td>
                        <td className="p-4 font-black text-white">
                          {Number(prod.priceKRW || 0).toLocaleString()}원
                        </td>
                        <td className="p-4 text-slate-300 font-bold">
                          {prod.duration}
                        </td>
                        <td className="p-4 text-right space-x-1.5">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="px-2.5 py-1.5 bg-amber-400 text-slate-950 rounded-lg font-black text-xs cursor-pointer"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDuplicateProduct(prod)}
                            className="px-2 py-1.5 bg-slate-800 text-slate-300 rounded-lg font-bold text-xs cursor-pointer"
                            title="복제"
                          >
                            복제
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`'${prod.title}' 상품을 삭제하시겠습니까?`)) {
                                await onDeleteProduct(prod.id);
                              }
                            }}
                            className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs cursor-pointer"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: PRODUCT CREATOR & EDITOR ================= */}
        {activeTab === 'editor' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
            <form onSubmit={handleSaveProduct} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
              
              {/* Header of Editor */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white">
                      {editingId ? '✏️ 여행 상품 정보 상세 수정' : '➕ 신규 베트남 여행 상품 등록'}
                    </h3>
                    <span className="text-xs bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold border border-amber-400/30">
                      {formData.category} · {formData.city}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    기본 정보, 에어비앤비급 고화질 사진, 일차별 상세 일정표 및 포함/불포함 사항을 한 화면에서 작성합니다.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    목록으로 돌아가기
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? '저장 중...' : '저장 완료 (홈페이지 즉시 반영)'}</span>
                  </button>
                </div>
              </div>

              {/* Section 1: Basic Information */}
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>1. 기본 정보 및 카테고리 분류</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">상품 제목 *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="예: [다낭/풀빌라] 5성급 나만 리트리트 프라이빗 독채 풀빌라 3박 5일"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs font-bold text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">서브 타이틀 (강조 카피문구)</label>
                    <input
                      type="text"
                      value={formData.subTitle}
                      onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                      placeholder="예: 단독 프라이빗 수영장 & 한국어 가이드 동행 힐링 휴양"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">카테고리</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-amber-300"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">권역</label>
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
                    <label className="text-xs font-black text-slate-300">도시</label>
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
                    <label className="text-xs font-black text-slate-300">여행 기간</label>
                    <input
                      type="text"
                      value={formData.duration || '3박 5일'}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="예: 3박 5일, 4박 6일"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">원화 가격 (KRW) *</label>
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
                    <label className="text-xs font-black text-slate-300">동화 환산가 (VND)</label>
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
                      <span>⭐ 인기 상품 추천</span>
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

              {/* Section 2: Photo Gallery (Multi Upload & Drag-and-Drop + Direct URL) */}
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>2. 고화질 사진 갤러리 (대표 1번 사진이 홈페이지 메인/카드에 즉시 노출됩니다)</span>
                  </h4>
                  <span className="text-xs text-amber-300 font-bold">총 {galleryImages.length}장 등록됨</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option A: Computer File Upload */}
                  <div className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl p-5 text-center space-y-3 bg-slate-900/50 transition-colors flex flex-col justify-center items-center">
                    <Camera className="w-7 h-7 text-amber-400" />
                    <div>
                      <p className="text-xs font-bold text-white">
                        [방법 1] 내 컴퓨터에서 사진 파일 올리기
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        JPG, PNG, WebP 여러 장을 한 번에 선택 가능 (자동 고화질 압축)
                      </p>
                    </div>

                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer hover:bg-amber-300 shadow-md">
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
                            setGalleryImages(prev => [...prev, ...urls]);
                          }
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>

                  {/* Option B: Direct Image URL Input */}
                  <div className="border border-slate-800 rounded-2xl p-5 bg-slate-900/50 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>[방법 2] 인터넷 웹 사진 주소(URL) 직접 입력</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        웹사이트나 클라우드의 이미지 주소(https://...)를 붙여넣어 바로 추가하세요.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://... 이미지 URL 붙여넣기"
                        value={directUrlInput}
                        onChange={(e) => setDirectUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (directUrlInput.trim()) {
                              setGalleryImages(prev => [...prev, directUrlInput.trim()]);
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
                            setGalleryImages(prev => [...prev, directUrlInput.trim()]);
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

                {/* Thumbnails list */}
                {galleryImages.length > 0 ? (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-300">
                      📸 등록된 사진 목록 (맨 앞 첫 번째 사진이 대표 썸네일입니다):
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className={`relative group rounded-xl overflow-hidden border ${idx === 0 ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-700'} aspect-square bg-slate-900 shadow-md`}>
                          <img src={img} alt="" className="w-full h-full object-cover" />
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
                                }}
                                className="px-2.5 py-1 bg-amber-400 text-slate-950 rounded-lg text-[10px] font-black cursor-pointer shadow"
                              >
                                대표로 지정
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-bold cursor-pointer shadow"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300 flex items-center gap-2">
                    <span>💡 등록된 사진이 없으면 기본 추천 테마 사진이 임시 적용됩니다. 꼭 대표 사진을 1장 이상 등록해 주세요!</span>
                  </div>
                )}
              </div>

              {/* Section 3: Included & Excluded Details */}
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>3. 포함 및 불포함 사항 안내</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-emerald-400">포함 사항 (줄바꿈으로 구분)</label>
                    <textarea
                      rows={5}
                      value={includedText}
                      onChange={(e) => setIncludedText(e.target.value)}
                      placeholder="전 일정 단독 차량&#10;한국어 전문 가이드&#10;5성급 호텔 숙박 및 조식&#10;단독 공항 픽업/샌딩"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-rose-400">불포함 사항 (줄바꿈으로 구분)</label>
                    <textarea
                      rows={5}
                      value={excludedText}
                      onChange={(e) => setExcludedText(e.target.value)}
                      placeholder="왕복 항공권&#10;가이드/기사 매너팁&#10;개인 경비"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">출발 가능 도시 (줄바꿈 구분)</label>
                    <textarea
                      rows={3}
                      value={departureCitiesText}
                      onChange={(e) => setDepartureCitiesText(e.target.value)}
                      placeholder="인천&#10;김해&#10;대구"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-300">검색 태그 (줄바꿈 구분)</label>
                    <textarea
                      rows={3}
                      value={tagsText}
                      onChange={(e) => setTagsText(e.target.value)}
                      placeholder="#단독풀빌라&#10;#가족휴양&#10;#노쇼핑"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Day-by-Day Itinerary */}
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>4. 일차별 상세 여행 일정표 ({itineraryList.length}일차)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const nextDay = itineraryList.length + 1;
                      setItineraryList([
                        ...itineraryList,
                        { day: nextDay, title: `${nextDay}일차 일정`, description: '일정 상세 내용', meal: '조: 호텔식 / 중: 현지식 / 석: 특식', hotel: '5성급 호텔' }
                      ]);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/30 font-bold text-xs cursor-pointer"
                  >
                    + 일차 추가
                  </button>
                </div>

                <div className="space-y-3">
                  {itineraryList.map((dayItem, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-amber-400">{dayItem.day}일차</span>
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
                          placeholder="일정 제목"
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
                        placeholder="상세 일정 내용"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Submit Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  취소하고 목록으로
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 cursor-pointer"
                >
                  {isSaving ? '저장 처리 중...' : '💾 최종 저장하기 (홈페이지 즉시 반영)'}
                </button>
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
                  <h3 className="text-base font-black text-white">📸 고화질 사진 자산 허브</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    신짜오투어 사이트에서 사용되는 모든 고화질 사진을 일괄 관리하고 즉시 복사하여 사용할 수 있습니다.
                  </p>
                </div>

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
                    <span className="text-[9px] text-slate-500">#{idx + 1}</span>
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

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-amber-300"
                      >
                        <option value="pending">신규 접수</option>
                        <option value="in_progress">상담 진행 중</option>
                        <option value="confirmed">예약 확정</option>
                        <option value="completed">여행 완료</option>
                        <option value="cancelled">취소</option>
                      </select>

                      <a
                        href={`tel:${inq.userPhone}`}
                        className="p-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>전화하기</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-base font-black text-white">⚙️ 카카오톡 상담 링크 및 도메인 설정</h3>
              
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-300">카카오톡 실시간 상담 오픈채팅 / 채널 URL</label>
                <input
                  type="text"
                  value={kakaoLinkInput}
                  onChange={(e) => setKakaoLinkInput(e.target.value)}
                  placeholder="https://open.kakao.com/o/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-amber-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setKakaoDirectLink(kakaoLinkInput);
                    alert('카카오톡 링크가 성공적으로 저장되었습니다!');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer hover:bg-amber-300"
                >
                  카카오톡 링크 저장하기
                </button>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                <h4 className="font-bold text-white">🌐 xinchaotour.com 도메인 연결 안내</h4>
                <p>구입하신 도메인의 DNS 설정에서 본 서버의 공인 IP를 CNAME/A 레코드로 연결하시면 즉시 연동됩니다.</p>
                <p>문의 대표전화: <strong className="text-amber-400">{COMPANY_PHONE}</strong></p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
