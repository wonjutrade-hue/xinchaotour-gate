import React, { useState, useEffect } from 'react';
import { Product, Category, Region, City, ConsultationRequest, ItineraryDay } from '../types';
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  CheckCircle, 
  Lock, 
  Unlock, 
  Eye, 
  Save, 
  FileSpreadsheet, 
  FileJson,
  FileText,
  Calendar,
  Layers,
  Inbox,
  Image as ImageIcon,
  Settings,
  MessageCircle,
  Globe,
  ExternalLink,
  Phone,
  MapPin,
  Search,
  Grid,
  List,
  Filter,
  Building2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getKakaoDirectLink, setKakaoDirectLink, COMPANY_PHONE } from '../constants';

const REGION_LIST: Exclude<Region, '전체'>[] = ['북부', '중부', '남부'];

const REGION_CITIES_MAP: Record<Exclude<Region, '전체'>, City[]> = {
  '북부': ['하노이', '사파', '하롱베이', '닌빈'],
  '중부': ['다낭', '호이안', '후에', '나트랑'],
  '남부': ['호치민', '푸꾸옥', '달랏', '붕따우'],
};

const CATEGORIES: Category[] = ['자유여행', '골프투어', '풀빌라', '추천패키지'];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  inquiries: ConsultationRequest[];
  onAddProduct: (prod: Omit<Product, 'id'>) => Promise<void>;
  onUpdateProduct: (id: string, updated: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onResetProducts: () => Promise<void>;
  onImportProducts: (items: any[], replace: boolean) => Promise<void>;
  onUpdateInquiryStatus: (id: string, status: ConsultationRequest['status']) => Promise<void>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  inquiries,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onImportProducts,
  onUpdateInquiryStatus,
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Regional, City & Category Filtering State for Product Management
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<Region>('전체');
  const [selectedCityFilter, setSelectedCityFilter] = useState<City>('전체');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<Category | '전체'>('전체');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');

  // Settings State
  const [kakaoUrlInput, setKakaoUrlInput] = useState('');

  useEffect(() => {
    setKakaoUrlInput(getKakaoDirectLink());
  }, [isOpen]);

  const handleSaveKakaoLink = () => {
    setKakaoDirectLink(kakaoUrlInput);
    alert('카카오톡 상담 링크가 성공적으로 저장되었습니다! 홈페이지의 모든 카톡 상담 버튼에 적용됩니다.');
  };

  // Helper Form States for Multiline Text & Complex Specs
  const [includedText, setIncludedText] = useState('');
  const [excludedText, setExcludedText] = useState('');
  const [departureCitiesText, setDepartureCitiesText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [additionalImagesText, setAdditionalImagesText] = useState('');

  // Helper function to process and compress user uploaded image file
  const compressAndConvertImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('이미지 로드 실패'));
        img.src = evt.target?.result as string;
      };
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
      reader.readAsDataURL(file);
    });
  };

  const handleMainImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressAndConvertImage(file);
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      alert('대표 메인 사진이 PC 파일에서 성공적으로 등록되었습니다!');
    } catch (err) {
      alert('이미지 파일 업로드 중 오류가 발생했습니다.');
    }
    e.target.value = '';
  };

  const handleSubImagesFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const dataUrl = await compressAndConvertImage(files[i]);
        urls.push(dataUrl);
      }
      const existing = additionalImagesText.trim();
      const newCombined = existing ? `${existing}\n${urls.join('\n')}` : urls.join('\n');
      setAdditionalImagesText(newCombined);
      alert(`${files.length}개의 추가 서브 사진이 PC 파일에서 성공적으로 등록되었습니다!`);
    } catch (err) {
      alert('서브 이미지 파일 업로드 중 오류가 발생했습니다.');
    }
    e.target.value = '';
  };

  // Helper for Itinerary
  const [itineraryList, setItineraryList] = useState<ItineraryDay[]>([]);

  // Helper for Golf Specs
  const [golfCourseNamesText, setGolfCourseNamesText] = useState('');
  const [golfHoles, setGolfHoles] = useState<number>(18);
  const [greenFeeIncluded, setGreenFeeIncluded] = useState<boolean>(true);
  const [caddieFeeIncluded, setCaddieFeeIncluded] = useState<boolean>(true);

  // Helper for Villa Specs
  const [villaBedrooms, setVillaBedrooms] = useState<number>(3);
  const [villaPrivatePool, setVillaPrivatePool] = useState<boolean>(true);
  const [villaOceanView, setVillaOceanView] = useState<boolean>(false);
  const [villaMaxOccupancy, setVillaMaxOccupancy] = useState<number>(6);

  // Form State for Create/Edit
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    subTitle: '',
    category: '추천패키지',
    region: '중부',
    city: '다낭',
    priceKRW: 0,
    priceVND: 0,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [],
    rating: 4.9,
    reviewCount: 10,
    isPopular: false,
    isHotDeal: false,
    discountPercent: 0,
    departureCities: ['인천', '김해'],
    tags: ['인기패키지', 'NO쇼핑'],
    description: '베트남 맞춤형 프리미엄 패키지입니다.',
    included: ['왕복 항공권', '5성급 호텔 숙박', '한국어 가이드'],
    excluded: ['가이드 매너팁'],
    itinerary: [
      { day: 1, title: '공항 도착 및 호텔 체크인', description: '가이드 미팅 후 전용 차량 이동', meal: '석식: 현지식', hotel: '5성급 호텔' },
      { day: 2, title: '시티 주요 관광지 투어', description: '관광지 관람 및 특식 다이닝', meal: '조: 호텔식 / 중: 특식', hotel: '5성급 호텔' }
    ]
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'xinchao123' || password === '1234' || password === '') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 일치하지 않습니다. (기본 암호: xinchao123 또는 1234)');
    }
  };

  // Smart product creation with region, city, and category prefilled
  const handleStartCreate = (targetRegion?: Region, targetCity?: City, targetCategory?: Category) => {
    setEditingProduct(null);
    setIsCreating(true);

    const reg: Region = (targetRegion && targetRegion !== '전체')
      ? targetRegion
      : (selectedRegionFilter !== '전체' ? selectedRegionFilter : '중부');

    const availableCities = REGION_CITIES_MAP[reg as Exclude<Region, '전체'>] || ['다낭'];
    const cit: City = (targetCity && targetCity !== '전체')
      ? targetCity
      : (selectedCityFilter !== '전체' && availableCities.includes(selectedCityFilter) ? selectedCityFilter : availableCities[0]);

    const cat: Category = targetCategory || (selectedCategoryFilter !== '전체' ? selectedCategoryFilter : '자유여행');

    setFormData({
      title: `[${cit}/${cat}] 신규 여행 상품`,
      subTitle: '상품에 대한 매력적인 한 줄 설명을 적어주세요.',
      category: cat,
      region: reg,
      city: cit,
      priceKRW: 650000,
      priceVND: 12000000,
      duration: '3박 5일',
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
      additionalImages: [],
      rating: 5.0,
      reviewCount: 1,
      isPopular: false,
      isHotDeal: false,
      discountPercent: 0,
      departureCities: ['인천', '김해', '대구'],
      tags: ['신규상품', cit, cat],
      address: '',
      externalBookingUrl: '',
      description: '새로운 베트남 맞춤형 여행 상품 정보입니다.',
      included: ['전 일정 전용차량', '한국어 가이드', '5성급 호텔 숙박', '조식 및 주요 특식'],
      excluded: ['왕복 항공권', '가이드/기사 매너팁', '개인 경비'],
      itinerary: [
        { day: 1, title: '공항 도착 및 현지 가이드 미팅', description: '전용 차량으로 호텔 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 리조트/호텔' },
        { day: 2, title: '주요 관광지 가이드 투어 및 특식', description: '단독 차량과 가이드로 여유로운 코스 진행', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 리조트/호텔' },
        { day: 3, title: '자유 일정 및 공항 배웅', description: '체크아웃 후 기념품 샵 방문 및 공항 이동', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
      ]
    });

    setIncludedText('전 일정 전용차량\n한국어 가이드\n5성급 호텔 숙박\n조식 및 주요 특식');
    setExcludedText('왕복 항공권\n가이드/기사 매너팁\n개인 경비');
    setDepartureCitiesText('인천\n김해\n대구');
    setTagsText(`신규상품\n${cit}\n${cat}`);
    setAdditionalImagesText('');
    setItineraryList([
      { day: 1, title: '공항 도착 및 현지 가이드 미팅', description: '전용 차량으로 호텔 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 리조트/호텔' },
      { day: 2, title: '주요 관광지 가이드 투어 및 특식', description: '단독 차량과 가이드로 여유로운 코스 진행', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 리조트/호텔' },
      { day: 3, title: '자유 일정 및 공항 배웅', description: '체크아웃 후 기념품 샵 방문 및 공항 이동', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
    ]);

    setGolfCourseNamesText(`${cit} CC\n몽고메리 링스`);
    setGolfHoles(18);
    setGreenFeeIncluded(true);
    setCaddieFeeIncluded(true);

    setVillaBedrooms(3);
    setVillaPrivatePool(true);
    setVillaOceanView(false);
    setVillaMaxOccupancy(6);
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreating(false);
    setFormData({ ...prod });

    setIncludedText((prod.included || []).join('\n'));
    setExcludedText((prod.excluded || []).join('\n'));
    setDepartureCitiesText((prod.departureCities || []).join('\n'));
    setTagsText((prod.tags || []).join('\n'));
    setAdditionalImagesText((prod.additionalImages || []).join('\n'));
    setItineraryList(prod.itinerary && prod.itinerary.length > 0 ? [...prod.itinerary] : [
      { day: 1, title: '공항 도착 및 가이드 미팅', description: '체크인 후 휴식' }
    ]);

    if (prod.golfSpecs) {
      setGolfHoles(prod.golfSpecs.holes || 18);
      setGreenFeeIncluded(prod.golfSpecs.greenFeeIncluded ?? true);
      setCaddieFeeIncluded(prod.golfSpecs.caddieFeeIncluded ?? true);
      setGolfCourseNamesText((prod.golfSpecs.golfCourseNames || []).join('\n'));
    } else {
      setGolfCourseNamesText(`${prod.city} CC`);
      setGolfHoles(18);
      setGreenFeeIncluded(true);
      setCaddieFeeIncluded(true);
    }

    if (prod.villaSpecs) {
      setVillaBedrooms(prod.villaSpecs.bedrooms || 3);
      setVillaPrivatePool(prod.villaSpecs.privatePool ?? true);
      setVillaOceanView(prod.villaSpecs.oceanView ?? false);
      setVillaMaxOccupancy(prod.villaSpecs.maxOccupancy || 6);
    } else {
      setVillaBedrooms(3);
      setVillaPrivatePool(true);
      setVillaOceanView(false);
      setVillaMaxOccupancy(6);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const splitLines = (str: string) => str.split('\n').map(s => s.trim()).filter(Boolean);

    const finalData: Partial<Product> = {
      ...formData,
      included: splitLines(includedText),
      excluded: splitLines(excludedText),
      departureCities: splitLines(departureCitiesText),
      tags: splitLines(tagsText),
      additionalImages: splitLines(additionalImagesText),
      itinerary: itineraryList,
    };

    if (formData.category === '골프투어') {
      finalData.golfSpecs = {
        holes: golfHoles,
        greenFeeIncluded,
        caddieFeeIncluded,
        golfCourseNames: splitLines(golfCourseNamesText),
      };
    }

    if (formData.category === '풀빌라') {
      finalData.villaSpecs = {
        bedrooms: villaBedrooms,
        privatePool: villaPrivatePool,
        oceanView: villaOceanView,
        maxOccupancy: villaMaxOccupancy,
      };
    }

    if (isCreating) {
      await onAddProduct(finalData as any);
      alert('새 상품이 성공적으로 등록되었습니다.');
    } else if (editingProduct) {
      await onUpdateProduct(editingProduct.id, finalData);
      alert('상품 정보가 성공적으로 수정되었습니다.');
    }
    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleExportJson = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `xinchaotour_products_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      alert('현재 등록된 모든 상품 데이터가 JSON 백업 파일로 다운로드되었습니다!');
    } catch (err) {
      alert('백업 파일 다운로드 중 오류가 발생했습니다.');
    }
  };

  const handleFileUploadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (Array.isArray(parsed)) {
          await onImportProducts(parsed, false);
          alert(`${parsed.length}개의 상품 데이터가 성공적으로 복원/업로드되었습니다.`);
        } else {
          alert('올바른 JSON 데이터 배열 형식의 파일이 아닙니다.');
        }
      } catch (err) {
        alert('JSON 백업 파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-slate-900 text-base">신차오투어 관리자 로그인</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-600">
            여행 상품 수정, 삭제, 신규 등록 및 CSV/JSON 데이터 업로드/다운로드를 위한 전용 관리자 모드입니다.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <input
              type="password"
              placeholder="관리자 암호 (기본: xinchao123 또는 바로 로그인)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors shadow-sm"
            >
              관리자 모드 접속
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              ⚙️
            </div>
            <div>
              <h3 className="font-black text-base text-white">신차오투어 통합 관리자 패널</h3>
              <p className="text-[11px] text-slate-400">상품 수정 / 파일 업로드·다운로드 / 예약 문의 현황</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-4 pt-3 flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('products');
              setIsCreating(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
              activeTab === 'products' ? 'bg-white text-teal-800 border-t-2 border-teal-700' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>상품 목록 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
              activeTab === 'inquiries' ? 'bg-white text-teal-800 border-t-2 border-teal-700' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Inbox className="w-4 h-4 text-emerald-600" />
            <span>실시간 예약/상담 접수 ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
              activeTab === 'settings' ? 'bg-white text-teal-800 border-t-2 border-teal-700' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-700" />
            <span>기본 설정 & 도메인 연결</span>
          </button>
        </div>

        {/* Main Panel Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {/* TAB 1: PRODUCT LIST & EDITOR */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {isCreating || editingProduct ? (
                /* COMPREHENSIVE PRODUCT EDITOR FORM */
                <form onSubmit={handleSaveProduct} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                        <span>{isCreating ? '➕ 신규 여행 상품 등록' : '✏️ 상품 상세 정보 수정'}</span>
                        {editingProduct && (
                          <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-bold">
                            ID: {editingProduct.id}
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        여행 상품의 모든 기본 정보, 카테고리, 대표 사진, 포함/불포함 사항 및 일차별 일정표를 쉽게 편집합니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingProduct(null);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs"
                    >
                      닫기/취소
                    </button>
                  </div>

                  {/* Section 1: 기본 정보 & 카테고리 */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h5 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5 border-b pb-2 border-slate-200">
                      <Layers className="w-4 h-4 text-teal-700" />
                      <span>1. 기본 정보 및 카테고리 분류</span>
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">상품 제목 <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="예: [다낭/골프투어] 3색 명문 골프 3박 5일 패키지"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">서브 타이틀 / 한 줄 강조 카피</label>
                        <input
                          type="text"
                          value={formData.subTitle}
                          onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                          placeholder="예: 다낭 3대 챔피언십 코스 그린피 포함 & 5성급 호이안 리조트 숙박"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>상세 주소 (위치 / 구글 지도 주소)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.address || ''}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="예: An Thương 26, Phường Mỹ An, Quận Ngũ Hành Sơn, Đà Nẵng"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                          <ExternalLink className="w-3.5 h-3.5 text-rose-600" />
                          <span>외부 예약 링크 (에어비앤비 / 원본 상세 URL)</span>
                        </label>
                        <input
                          type="url"
                          value={formData.externalBookingUrl || ''}
                          onChange={(e) => setFormData({ ...formData, externalBookingUrl: e.target.value })}
                          placeholder="예: https://www.airbnb.co.kr/rooms/1596807485..."
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">카테고리 테마</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-teal-800"
                        >
                          <option value="추천패키지">📦 추천패키지</option>
                          <option value="자유여행">✈️ 자유여행</option>
                          <option value="골프투어">⛳ 골프투어</option>
                          <option value="풀빌라">🏡 풀빌라</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">지역 권역</label>
                        <select
                          value={formData.region}
                          onChange={(e) => {
                            const newReg = e.target.value as Region;
                            const availableCities = REGION_CITIES_MAP[newReg as Exclude<Region, '전체'>] || ['다낭'];
                            setFormData({ 
                              ...formData, 
                              region: newReg,
                              city: availableCities.includes(formData.city as City) ? formData.city : availableCities[0]
                            });
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800"
                        >
                          <option value="북부">북부 (하노이/사파/하롱베이/닌빈)</option>
                          <option value="중부">중부 (다낭/호이안/후에/나트랑)</option>
                          <option value="남부">남부 (호치민/푸꾸옥/달랏/붕따우)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">주요 도시</label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value as City })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-amber-800"
                        >
                          {(REGION_CITIES_MAP[formData.region as Exclude<Region, '전체'>] || ['다낭']).map(cit => (
                            <option key={cit} value={cit}>{cit}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">여행 기간</label>
                        <input
                          type="text"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="예: 3박 5일"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">상품 가격 (KRW 원화)</label>
                        <input
                          type="number"
                          value={formData.priceKRW || 0}
                          onChange={(e) => setFormData({ ...formData, priceKRW: Number(e.target.value) })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-teal-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">상품 가격 (VND 동화)</label>
                        <input
                          type="number"
                          value={formData.priceVND || 0}
                          onChange={(e) => setFormData({ ...formData, priceVND: Number(e.target.value) })}
                          placeholder="예: 12000000"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">고객 평점 (1.0~5.0)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="1.0"
                          max="5.0"
                          value={formData.rating || 5.0}
                          onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">리뷰 개수</label>
                        <input
                          type="number"
                          value={formData.reviewCount || 10}
                          onChange={(e) => setFormData({ ...formData, reviewCount: Number(e.target.value) })}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200/80">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isPopular || false}
                          onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                          className="rounded text-teal-600 w-4 h-4"
                        />
                        <span>🔥 인기 추천 상품 표시</span>
                      </label>

                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isHotDeal || false}
                          onChange={(e) => setFormData({ ...formData, isHotDeal: e.target.checked })}
                          className="rounded text-rose-600 w-4 h-4"
                        />
                        <span>⚡ HOT 딜 특가 상품 표시</span>
                      </label>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <span>할인율 (%):</span>
                        <input
                          type="number"
                          min="0"
                          max="90"
                          value={formData.discountPercent || 0}
                          onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                          className="w-16 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-center font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: 대표 및 추가 사진 등록 (내 컴퓨터 파일 선택 & URL 입력 지원) */}
                  <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                    <h5 className="font-extrabold text-xs text-slate-800 flex items-center justify-between border-b pb-2 border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-teal-700" />
                        <span>2. 상품 사진 등록 (컴퓨터 파일 선택 / 이미지 URL)</span>
                      </div>
                      <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 font-bold">
                        📁 내 컴퓨터 사진 직접 등록 가능
                      </span>
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 1. 대표 메인 사진 */}
                      <div className="space-y-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
                        <label className="text-xs font-extrabold text-slate-900 block">
                          📸 대표 메인 사진
                        </label>

                        {/* File Upload Button */}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            id="main-image-file-input"
                            className="hidden"
                            onChange={handleMainImageFileUpload}
                          />
                          <label
                            htmlFor="main-image-file-input"
                            className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                          >
                            <Upload className="w-4 h-4" />
                            <span>💻 내 컴퓨터에서 메인 사진 파일 선택</span>
                          </label>
                        </div>

                        <div className="relative flex items-center justify-center my-1">
                          <span className="bg-white px-2 text-[10px] text-slate-400 font-bold z-10">또는</span>
                          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                        </div>

                        {/* URL Input */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">웹 이미지 URL 직접 입력:</label>
                          <input
                            type="url"
                            value={formData.imageUrl || ''}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs"
                          />
                        </div>

                        {/* Preview */}
                        {formData.imageUrl ? (
                          <div className="pt-2 flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={formData.imageUrl} alt="preview" className="w-16 h-12 object-cover rounded-lg border border-slate-200 shrink-0" />
                              <span className="text-[11px] text-slate-600 font-bold truncate">메인 사진 등록 완료</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, imageUrl: '' })}
                              className="text-[10px] text-rose-600 font-bold hover:underline shrink-0"
                            >
                              삭제
                            </button>
                          </div>
                        ) : (
                          <div className="text-center py-3 text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-xl">
                            등록된 메인 사진이 없습니다.
                          </div>
                        )}
                      </div>

                      {/* 2. 추가 서브 사진 */}
                      <div className="space-y-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
                        <label className="text-xs font-extrabold text-slate-900 block">
                          🖼️ 추가 서브 사진 (다중 선택 가능)
                        </label>

                        {/* File Upload Button Multiple */}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            id="sub-images-file-input"
                            className="hidden"
                            onChange={handleSubImagesFileUpload}
                          />
                          <label
                            htmlFor="sub-images-file-input"
                            className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                          >
                            <Upload className="w-4 h-4" />
                            <span>💻 내 컴퓨터에서 서브 사진 동시 선택 (다중)</span>
                          </label>
                        </div>

                        <div className="relative flex items-center justify-center my-1">
                          <span className="bg-white px-2 text-[10px] text-slate-400 font-bold z-10">또는</span>
                          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                        </div>

                        {/* URL List Textarea */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 block">웹 서브 사진 URL 목록 (한 줄에 1개씩):</label>
                          <textarea
                            rows={3}
                            value={additionalImagesText}
                            onChange={(e) => setAdditionalImagesText(e.target.value)}
                            placeholder={'https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2...'}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
                          />
                        </div>

                        {/* Sub Images Preview Gallery */}
                        {additionalImagesText.trim() && (
                          <div className="pt-1">
                            <div className="text-[10px] font-bold text-slate-500 mb-1">등록된 서브 사진 미리보기:</div>
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                              {additionalImagesText.split('\n').filter(Boolean).map((url, i) => (
                                <img key={`sub-img-${i}-${url.slice(0, 15)}`} src={url.trim()} alt={`sub-${i}`} className="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0" />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: 상세 소개글 */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h5 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5 border-b pb-2 border-slate-200">
                      <FileText className="w-4 h-4 text-teal-700" />
                      <span>3. 상품 상세 소개문 작성</span>
                    </h5>
                    <textarea
                      rows={4}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="상품에 대한 구체적인 매력 및 일정 스케줄에 대한 요약 상세 소개글을 입력하세요."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs leading-relaxed"
                    />
                  </div>

                  {/* Section 4: 포함 & 불포함 사항 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-xs text-emerald-800 flex items-center gap-1">
                        <span>✅ 포함 사항 (한 줄에 1개씩)</span>
                      </h5>
                      <textarea
                        rows={4}
                        value={includedText}
                        onChange={(e) => setIncludedText(e.target.value)}
                        placeholder={'왕복 항공권\n5성급 호텔 숙박\n전 일정 전용차량\n한국어 가이드\n조식 및 특식'}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-extrabold text-xs text-rose-800 flex items-center gap-1">
                        <span>❎ 불포함 사항 (한 줄에 1개씩)</span>
                      </h5>
                      <textarea
                        rows={4}
                        value={excludedText}
                        onChange={(e) => setExcludedText(e.target.value)}
                        placeholder={'가이드 및 기사 매너팁\n개인 경비\n기타 개인 선택옵션'}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Section 5: 출발 가능 도시 & 키워드 태그 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="space-y-2">
                      <h5 className="font-extrabold text-xs text-slate-800">
                        ✈️ 출발 가능 도시 (한 줄에 1개씩)
                      </h5>
                      <textarea
                        rows={3}
                        value={departureCitiesText}
                        onChange={(e) => setDepartureCitiesText(e.target.value)}
                        placeholder={'인천\n김해\n대구\n청주'}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-extrabold text-xs text-slate-800">
                        🏷️ 상품 검색 태그 (한 줄에 1개씩)
                      </h5>
                      <textarea
                        rows={3}
                        value={tagsText}
                        onChange={(e) => setTagsText(e.target.value)}
                        placeholder={'#다낭골프\n#단독가이드\n#5성급호텔\n#NO쇼핑'}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold"
                      />
                    </div>
                  </div>

                  {/* Section 6: 일차별 일정표 (Itinerary) */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                      <h5 className="font-extrabold text-xs text-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-teal-700" />
                        <span>6. 일차별 상세 여행 일정표 ({itineraryList.length}일차)</span>
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          const nextDay = itineraryList.length + 1;
                          setItineraryList([
                            ...itineraryList,
                            { day: nextDay, title: `${nextDay}일차 대표 일정`, description: '상세 일정 스케줄을 작성하세요.', meal: '조: 호텔식 / 중: 특식', hotel: '5성급 호텔' }
                          ]);
                        }}
                        className="px-3 py-1 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ 일정 일차 추가</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {itineraryList.map((item, idx) => (
                        <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="bg-teal-100 text-teal-800 text-[11px] font-black px-2.5 py-0.5 rounded-md">
                              DAY {item.day || idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setItineraryList(itineraryList.filter((_, i) => i !== idx));
                              }}
                              className="text-rose-600 hover:text-rose-800 text-[11px] font-bold"
                            >
                              삭제
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500">일차 제목</label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => {
                                  const updated = [...itineraryList];
                                  updated[idx].title = e.target.value;
                                  setItineraryList(updated);
                                }}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500">식사 정보 (조/중/석)</label>
                              <input
                                type="text"
                                value={item.meal || ''}
                                onChange={(e) => {
                                  const updated = [...itineraryList];
                                  updated[idx].meal = e.target.value;
                                  setItineraryList(updated);
                                }}
                                placeholder="예: 조: 호텔식 / 중: 현지식 / 석: 씨푸드"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500">숙소 정보</label>
                              <input
                                type="text"
                                value={item.hotel || ''}
                                onChange={(e) => {
                                  const updated = [...itineraryList];
                                  updated[idx].hotel = e.target.value;
                                  setItineraryList(updated);
                                }}
                                placeholder="예: 5성급 메리엇 리조트"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">일정 상세 설명</label>
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={(e) => {
                                const updated = [...itineraryList];
                                updated[idx].description = e.target.value;
                                setItineraryList(updated);
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 7: 골프투어 전용 상세 사양 */}
                  {formData.category === '골프투어' && (
                    <div className="space-y-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                      <h5 className="font-extrabold text-xs text-emerald-900 flex items-center gap-1.5">
                        <span>⛳ 골프투어 전용 상세 정보</span>
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-emerald-800">홀 수 (Holes)</label>
                          <input
                            type="number"
                            value={golfHoles}
                            onChange={(e) => setGolfHoles(Number(e.target.value))}
                            className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs font-bold"
                          />
                        </div>

                        <label className="flex items-center gap-2 text-xs font-bold text-emerald-900 pt-5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={greenFeeIncluded}
                            onChange={(e) => setGreenFeeIncluded(e.target.checked)}
                            className="rounded text-emerald-600 w-4 h-4"
                          />
                          <span>그린피 포함</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs font-bold text-emerald-900 pt-5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={caddieFeeIncluded}
                            onChange={(e) => setCaddieFeeIncluded(e.target.checked)}
                            className="rounded text-emerald-600 w-4 h-4"
                          />
                          <span>캐디피/카트피 포함</span>
                        </label>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-emerald-800">이용 골프장 목록 (한 줄에 1개씩)</label>
                        <textarea
                          rows={3}
                          value={golfCourseNamesText}
                          onChange={(e) => setGolfCourseNamesText(e.target.value)}
                          placeholder={'다낭 CC\n몽고메리 링스\n바나힐 GC'}
                          className="w-full bg-white border border-emerald-200 rounded-xl p-2.5 text-xs font-bold"
                        />
                      </div>
                    </div>
                  )}

                  {/* Section 8: 풀빌라 전용 상세 사양 */}
                  {formData.category === '풀빌라' && (
                    <div className="space-y-3 bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
                      <h5 className="font-extrabold text-xs text-purple-900 flex items-center gap-1.5">
                        <span>🏡 풀빌라 전용 상세 정보</span>
                      </h5>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-purple-800">침실 개수 (Bedrooms)</label>
                          <input
                            type="number"
                            value={villaBedrooms}
                            onChange={(e) => setVillaBedrooms(Number(e.target.value))}
                            className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-purple-800">최대 투숙 인원</label>
                          <input
                            type="number"
                            value={villaMaxOccupancy}
                            onChange={(e) => setVillaMaxOccupancy(Number(e.target.value))}
                            className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-bold"
                          />
                        </div>

                        <label className="flex items-center gap-2 text-xs font-bold text-purple-900 pt-5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={villaPrivatePool}
                            onChange={(e) => setVillaPrivatePool(e.target.checked)}
                            className="rounded text-purple-600 w-4 h-4"
                          />
                          <span>전용 개인 수영장</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs font-bold text-purple-900 pt-5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={villaOceanView}
                            onChange={(e) => setVillaOceanView(e.target.checked)}
                            className="rounded text-purple-600 w-4 h-4"
                          />
                          <span>오션뷰 조망</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>{isCreating ? '신규 상품 등록 완료하기' : '수정 사항 저장 완료하기'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingProduct(null);
                      }}
                      className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                /* PRODUCT LIST TABLE & REGION/CITY FILTERING */
                <>
                  {/* Data Persistence Safety Notice & Backup Toolbar */}
                  <div className="bg-teal-900/90 text-white p-3 sm:p-4 rounded-2xl border border-teal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-teal-800 text-amber-300 shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="text-xs space-y-0.5">
                        <p className="font-extrabold text-amber-300">
                          🛡️ [데이터 이중 영구 보존 적용 중]
                        </p>
                        <p className="text-[11px] text-teal-100">
                          등록 및 수정하신 상품은 서버 데이터베이스와 브라우저 로컬 저장소에 이중 자동 저장됩니다. (재접속시 자동 유지)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={handleExportJson}
                        className="px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-teal-700 transition-colors"
                        title="현재 등록된 모든 상품 데이터를 JSON 파일로 다운로드합니다."
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>전체 백업 (JSON)</span>
                      </button>

                      <label className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>JSON 복원/업로드</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleFileUploadJson}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Top Bar: Search, View Mode, and Add Button */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="상품명, 도시, 키워드 검색..."
                          value={adminSearchQuery}
                          onChange={(e) => setAdminSearchQuery(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        {/* View Mode Toggle */}
                        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
                          <button
                            onClick={() => setViewMode('grouped')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                              viewMode === 'grouped'
                                ? 'bg-white text-teal-800 shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <Grid className="w-3.5 h-3.5 text-teal-600" />
                            <span>지역/도시별</span>
                          </button>
                          <button
                            onClick={() => setViewMode('list')}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                              viewMode === 'list'
                                ? 'bg-white text-teal-800 shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <List className="w-3.5 h-3.5 text-teal-600" />
                            <span>전체목록</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleStartCreate(selectedRegionFilter, selectedCityFilter)}
                          className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm shrink-0"
                        >
                          <Plus className="w-4 h-4 text-amber-300" />
                          <span>신규 상품 추가</span>
                        </button>
                      </div>
                    </div>

                    {/* Region Filter Tabs */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-extrabold text-slate-500 flex items-center gap-1 mr-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        지역 권역:
                      </span>
                      {(['전체', '북부', '중부', '남부'] as Region[]).map((reg) => {
                        const count = reg === '전체' 
                          ? products.length 
                          : products.filter(p => p.region === reg).length;
                        return (
                          <button
                            key={reg}
                            onClick={() => {
                              setSelectedRegionFilter(reg);
                              setSelectedCityFilter('전체');
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                              selectedRegionFilter === reg
                                ? 'bg-teal-700 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {reg} ({count})
                          </button>
                        );
                      })}
                    </div>

                    {/* Sub City Filter Pills */}
                    {selectedRegionFilter !== '전체' && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 pl-1 text-xs">
                        <span className="text-[10px] font-bold text-slate-400">도시:</span>
                        <button
                          onClick={() => setSelectedCityFilter('전체')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            selectedCityFilter === '전체'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          전체 도시
                        </button>
                        {(REGION_CITIES_MAP[selectedRegionFilter as Exclude<Region, '전체'>] || []).map((cit) => {
                          const count = products.filter(p => p.region === selectedRegionFilter && p.city === cit).length;
                          return (
                            <button
                              key={cit}
                              onClick={() => setSelectedCityFilter(cit)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                                selectedCityFilter === cit
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {cit} ({count})
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 pl-1 text-xs border-t border-dashed border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Filter className="w-3 h-3 text-teal-600" /> 테마 구분:
                      </span>
                      {(['전체', '자유여행', '골프투어', '풀빌라', '추천패키지'] as const).map((cat) => {
                        const count = products.filter(p => {
                          const matchReg = selectedRegionFilter === '전체' || p.region === selectedRegionFilter;
                          const matchCity = selectedCityFilter === '전체' || p.city === selectedCityFilter;
                          const matchCat = cat === '전체' || p.category === cat;
                          return matchReg && matchCity && matchCat;
                        }).length;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategoryFilter(cat as Category | '전체')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                              selectedCategoryFilter === cat
                                ? 'bg-teal-800 text-white shadow-2xs'
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {cat} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* PRODUCTS DISPLAY MODE */}
                  {viewMode === 'grouped' ? (
                    /* GROUPED BY REGION, CITY & CATEGORY */
                    <div className="space-y-6">
                      {REGION_LIST
                        .filter(r => selectedRegionFilter === '전체' || selectedRegionFilter === r)
                        .map((reg) => {
                          const citiesInRegion = REGION_CITIES_MAP[reg].filter(
                            c => selectedCityFilter === '전체' || selectedCityFilter === c
                          );

                          // Region Header Icon
                          const regIcon = reg === '북부' ? '🏛️' : reg === '중부' ? '🏖️' : '🌴';
                          const regTotal = products.filter(p => p.region === reg).length;

                          return (
                            <div key={reg} className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{regIcon}</span>
                                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                                    {reg} 권역 여행 상품
                                  </h3>
                                  <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-xs font-extrabold border border-teal-100">
                                    총 {regTotal}개
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleStartCreate(reg, citiesInRegion[0] || '다낭', '자유여행')}
                                    className="text-[11px] text-sky-800 hover:text-sky-900 font-extrabold flex items-center gap-1 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200"
                                  >
                                    <Plus className="w-3.5 h-3.5 text-sky-600" />
                                    <span>+{reg} 자유여행</span>
                                  </button>
                                  <button
                                    onClick={() => handleStartCreate(reg, citiesInRegion[0] || '다낭', '골프투어')}
                                    className="text-[11px] text-emerald-800 hover:text-emerald-900 font-extrabold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                                  >
                                    <Plus className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>+{reg} 골프</span>
                                  </button>
                                  <button
                                    onClick={() => handleStartCreate(reg, citiesInRegion[0] || '다낭', '풀빌라')}
                                    className="text-[11px] text-purple-800 hover:text-purple-900 font-extrabold flex items-center gap-1 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200"
                                  >
                                    <Plus className="w-3.5 h-3.5 text-purple-600" />
                                    <span>+{reg} 풀빌라</span>
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-6">
                                {citiesInRegion.map((city) => {
                                  const cityProducts = products.filter(p => {
                                    const matchReg = p.region === reg;
                                    const matchCity = p.city === city;
                                    const matchQuery = !adminSearchQuery || 
                                      p.title.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                                      p.city.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                                      p.tags.some(t => t.toLowerCase().includes(adminSearchQuery.toLowerCase()));
                                    return matchReg && matchCity && matchQuery;
                                  });

                                  return (
                                    <div key={city} className="bg-slate-50/80 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 space-y-3">
                                      {/* City Header */}
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                                        <div className="flex items-center gap-2">
                                          <Building2 className="w-4 h-4 text-teal-700" />
                                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                                            {city}
                                          </span>
                                          <span className="text-[11px] font-bold text-slate-500">
                                            (총 {cityProducts.length}개)
                                          </span>
                                        </div>

                                        {/* City-level Quick Category Registration Buttons */}
                                        <div className="flex items-center gap-1 flex-wrap">
                                          <button
                                            onClick={() => handleStartCreate(reg, city, '자유여행')}
                                            className="text-[10px] font-extrabold text-sky-800 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded-md border border-sky-200 flex items-center gap-0.5"
                                          >
                                            <Plus className="w-3 h-3 text-sky-600" />
                                            <span>+ 자유여행</span>
                                          </button>
                                          <button
                                            onClick={() => handleStartCreate(reg, city, '골프투어')}
                                            className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-0.5"
                                          >
                                            <Plus className="w-3 h-3 text-emerald-600" />
                                            <span>+ 골프투어</span>
                                          </button>
                                          <button
                                            onClick={() => handleStartCreate(reg, city, '풀빌라')}
                                            className="text-[10px] font-extrabold text-purple-800 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-md border border-purple-200 flex items-center gap-0.5"
                                          >
                                            <Plus className="w-3 h-3 text-purple-600" />
                                            <span>+ 풀빌라</span>
                                          </button>
                                          <button
                                            onClick={() => handleStartCreate(reg, city, '추천패키지')}
                                            className="text-[10px] font-extrabold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded-md border border-amber-200 flex items-center gap-0.5"
                                          >
                                            <Plus className="w-3 h-3 text-amber-600" />
                                            <span>+ 패키지</span>
                                          </button>
                                        </div>
                                      </div>

                                      {/* Sub-categorized Products by Category under City */}
                                      <div className="grid grid-cols-1 gap-3">
                                        {CATEGORIES.filter(cat => selectedCategoryFilter === '전체' || selectedCategoryFilter === cat).map((cat) => {
                                          const catProducts = cityProducts.filter(p => p.category === cat);
                                          
                                          // If filtering by specific category and no products, don't show empty block unless '전체' selected
                                          if (selectedCategoryFilter !== '전체' && catProducts.length === 0) return null;

                                          const catBadgeStyle = cat === '자유여행' 
                                            ? 'bg-sky-100 text-sky-900 border-sky-200' 
                                            : cat === '골프투어' 
                                            ? 'bg-emerald-100 text-emerald-900 border-emerald-200' 
                                            : cat === '풀빌라' 
                                            ? 'bg-purple-100 text-purple-900 border-purple-200' 
                                            : 'bg-amber-100 text-amber-900 border-amber-200';

                                          const catIcon = cat === '자유여행' ? '✈️' : cat === '골프투어' ? '⛳' : cat === '풀빌라' ? '🏡' : '📦';

                                          return (
                                            <div key={cat} className="space-y-2 bg-white/90 p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                                              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                                <div className="flex items-center gap-1.5">
                                                  <span className="text-xs">{catIcon}</span>
                                                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold border ${catBadgeStyle}`}>
                                                    {cat}
                                                  </span>
                                                  <span className="text-[10px] font-bold text-slate-400">
                                                    ({catProducts.length}개 상품)
                                                  </span>
                                                </div>

                                                <button
                                                  onClick={() => handleStartCreate(reg, city, cat)}
                                                  className="text-[10px] font-bold text-teal-800 hover:text-teal-900 flex items-center gap-0.5 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200"
                                                >
                                                  <Plus className="w-2.5 h-2.5 text-teal-600" />
                                                  <span>{cat} 상품 추가</span>
                                                </button>
                                              </div>

                                              {catProducts.length === 0 ? (
                                                <div className="text-center py-2.5 text-[11px] text-slate-400 font-bold bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                                                  등록된 [{city} / {cat}] 상품이 없습니다. 오른쪽 버튼을 누르면 즉시 등록됩니다.
                                                </div>
                                              ) : (
                                                <div className="grid grid-cols-1 gap-2">
                                                  {catProducts.map((prod) => (
                                                    <div
                                                      key={prod.id}
                                                      className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-teal-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all"
                                                    >
                                                      <div className="flex items-center gap-3 min-w-0">
                                                        <img
                                                          src={prod.imageUrl}
                                                          alt={prod.title}
                                                          className="w-14 h-11 rounded-lg object-cover shrink-0 border border-slate-100"
                                                        />
                                                        <div className="min-w-0">
                                                          <div className="flex items-center gap-1.5 text-[10px] font-bold">
                                                            <span className="text-slate-500">
                                                              {prod.duration}
                                                            </span>
                                                            {prod.isHotDeal && (
                                                              <span className="bg-rose-100 text-rose-700 px-1 py-0.2 rounded text-[9px]">HOT</span>
                                                            )}
                                                          </div>
                                                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate mt-0.5">
                                                            {prod.title}
                                                          </h4>
                                                          <p className="text-[11px] text-teal-700 font-extrabold">
                                                            {prod.priceKRW.toLocaleString()}원
                                                          </p>
                                                        </div>
                                                      </div>

                                                      <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                                                        <button
                                                          onClick={() => handleStartEdit(prod)}
                                                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
                                                        >
                                                          <Edit className="w-3.5 h-3.5 text-teal-700" />
                                                          <span>수정</span>
                                                        </button>

                                                        <button
                                                          onClick={async () => {
                                                            if (confirm(`'${prod.title}' 상품을 정말 삭제하시겠습니까?`)) {
                                                              await onDeleteProduct(prod.id);
                                                            }
                                                          }}
                                                          className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1"
                                                        >
                                                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                                          <span>삭제</span>
                                                        </button>
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    /* FLAT LIST VIEW */
                    <div className="space-y-2">
                      {products
                        .filter(p => {
                          const matchReg = selectedRegionFilter === '전체' || p.region === selectedRegionFilter;
                          const matchCity = selectedCityFilter === '전체' || p.city === selectedCityFilter;
                          const matchCat = selectedCategoryFilter === '전체' || p.category === selectedCategoryFilter;
                          const matchQuery = !adminSearchQuery || 
                            p.title.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                            p.city.toLowerCase().includes(adminSearchQuery.toLowerCase());
                          return matchReg && matchCity && matchCat && matchQuery;
                        })
                        .map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 hover:border-teal-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                className="w-16 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold">
                                  <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                    {prod.category}
                                  </span>
                                  <span className="text-teal-700 font-extrabold">
                                    {prod.region} · {prod.city}
                                  </span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate mt-0.5">
                                  {prod.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-bold">
                                  {prod.priceKRW.toLocaleString()}원 ({prod.duration})
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                              <button
                                onClick={() => handleStartEdit(prod)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
                              >
                                <Edit className="w-3.5 h-3.5 text-teal-700" />
                                <span>수정</span>
                              </button>

                              <button
                                onClick={async () => {
                                  if (confirm(`'${prod.title}' 상품을 정말 삭제하시겠습니까?`)) {
                                    await onDeleteProduct(prod.id);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                <span>삭제</span>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TAB 3: INQUIRIES MANAGEMENT */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-xs">
                  접수된 실시간 예약 및 견적 상담 문의 ({inquiries.length}건)
                </h4>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-bold bg-white rounded-2xl border border-slate-200">
                  접수된 상담 문의 내역이 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-2 border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm">
                            {inq.userName} 고객님
                          </span>
                          <span className="text-xs text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                            {inq.userPhone}
                          </span>
                          {inq.kakaoId && (
                            <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded">
                              카톡: {inq.kakaoId}
                            </span>
                          )}
                        </div>

                        {/* Status selector */}
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50"
                        >
                          <option value="pending">⏳ 상담 대기</option>
                          <option value="in_progress">📞 상담 진행중</option>
                          <option value="confirmed">✅ 예약 확정</option>
                          <option value="completed">🎉 완료</option>
                          <option value="cancelled">❌ 취소</option>
                        </select>
                      </div>

                      <div className="text-xs text-slate-700 space-y-1">
                        <p className="font-bold text-slate-900">
                          문의 상품: {inq.productTitle}
                        </p>
                        <p className="text-slate-500">
                          희망 출발일: {inq.startDate || '미정'} · 인원: 성인 {inq.travelerCount.adult}명 / 아동 {inq.travelerCount.child}명
                        </p>
                        <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-800">
                          "{inq.message || '상세 메시지 없음'}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: 기본 설정 & 도메인 연결 */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* KakaoTalk Link Settings */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    <MessageCircle className="w-5 h-5 fill-slate-950" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">카카오톡 상담 연결 URL 설정</h4>
                    <p className="text-xs text-slate-500">
                      고객이 카카오톡 상담 버튼 클릭 시 연결될 오픈채팅방 또는 카카오톡 채널 주소를 설정합니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      카카오톡 오픈채팅방 또는 플러스친구 URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={kakaoUrlInput}
                        onChange={(e) => setKakaoUrlInput(e.target.value)}
                        placeholder="예: https://open.kakao.com/o/sXincaoTour 또는 http://pf.kakao.com/_xxxx"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <button
                        onClick={handleSaveKakaoLink}
                        className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
                      >
                        저장하기
                      </button>
                      <button
                        onClick={() => window.open(kakaoUrlInput, '_blank')}
                        className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        테스트
                      </button>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
                    <p className="font-bold">💡 카카오톡 채널 및 오픈채팅방 연결 팁:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
                      <li>카카오톡 플러스친구/채널이 있으신 경우: <code className="bg-amber-100 px-1 rounded">http://pf.kakao.com/_채널ID</code> 형식의 주소를 입력해주세요.</li>
                      <li>개인 오픈채팅방을 이용하실 경우: 카카오톡 앱 ➔ 오픈채팅방 ➔ [링크 복사] 후 위 입력창에 붙여넣고 [저장하기]를 누르시면 즉시 모든 카톡 버튼이 변경됩니다.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Company Info Guide */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">고객센터 대표 연락처</h4>
                    <p className="text-xs text-slate-500">현재 홈페이지 상단 및 하단에 표시되는 고객센터 번호입니다.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">대표 전화번호</span>
                    <strong className="text-slate-900 font-bold text-sm">{COMPANY_PHONE}</strong>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">대표 이메일 / 대표자</span>
                    <strong className="text-slate-900 font-bold text-sm">wonjutrade@hanmail.net (원주트레이드)</strong>
                  </div>
                </div>
              </div>

              {/* Domain Setup Guide Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">내 도메인(xinchaotour.com) 연결 안내</h4>
                    <p className="text-xs text-slate-400">
                      현재 홈페이지를 구입하신 보유 도메인에 연결하는 가이드입니다.
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p className="font-bold text-amber-300">
                    네! xinchaotour.com 도메인에 홈페이지를 연결하신 후에도 지금처럼 AI Studio에서 원하시는 대로 언제든지 수정하실 수 있습니다.
                  </p>

                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                    <h5 className="font-bold text-white text-xs">📌 도메인 연결 3단계 절차:</h5>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                      <li>
                        <strong>호스팅 및 배포 플랫폼 설정:</strong> Vercel, Netlify, Cloud Run 또는 GitHub Pages 등 선호하시는 호스팅에 이 소스코드를 배포합니다.
                      </li>
                      <li>
                        <strong>DNS CNAME / A 레코드 등록:</strong> 도메인 구매 사이트(가비아, 카페24, 후이즈 등)에서 DNS 설정에 들어가 <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded">xinchaotour.com</code> 도메인의 CNAME/A 레코드를 서버 IP주소 또는 지정 CNAME으로 지정합니다.
                      </li>
                      <li>
                        <strong>실시간 지속 업데이트:</strong> 배포 후에도 AI Studio나 GitHub에서 코드를 수정하여 업로드하시면 도메인에 실시간으로 수정 사항이 반영됩니다!
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
