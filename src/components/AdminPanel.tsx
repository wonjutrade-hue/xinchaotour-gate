import React, { useState, useEffect } from 'react';
import { Product, Category, Region, City, ConsultationRequest } from '../types';
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
  const [activeTab, setActiveTab] = useState<'products' | 'import_export' | 'inquiries' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Regional & City Filtering State for Product Management
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<Region>('전체');
  const [selectedCityFilter, setSelectedCityFilter] = useState<City>('전체');
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
    rating: 4.9,
    reviewCount: 10,
    departureCities: ['인천', '김해'],
    tags: ['인기패키지', 'NO쇼핑'],
    description: '베트남 맞춤형 프리미엄 패키지입니다.',
    included: ['왕복 항공권', '5성급 호텔 숙박', '한국어 가이드'],
    excluded: ['가이드 매너팁'],
    itinerary: [
      { day: 1, title: '공항 도착 및 호텔 체크인', description: '가이드 미팅 후 전용 차량 이동' },
      { day: 2, title: '시티 주요 관광지 투어', description: '관광지 관람 및 특식 다이닝' }
    ]
  });

  const [jsonInputText, setJsonInputText] = useState('');
  const [importReplace, setImportReplace] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'xinchao123' || password === '1234' || password === '') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 일치하지 않습니다. (기본 암호: xinchao123 또는 1234)');
    }
  };

  // Smart product creation with region and city prefilled
  const handleStartCreate = (targetRegion?: Region, targetCity?: City) => {
    setEditingProduct(null);
    setIsCreating(true);

    const reg: Region = (targetRegion && targetRegion !== '전체')
      ? targetRegion
      : (selectedRegionFilter !== '전체' ? selectedRegionFilter : '중부');

    const availableCities = REGION_CITIES_MAP[reg as Exclude<Region, '전체'>] || ['다낭'];
    const cit: City = (targetCity && targetCity !== '전체')
      ? targetCity
      : (selectedCityFilter !== '전체' && availableCities.includes(selectedCityFilter) ? selectedCityFilter : availableCities[0]);

    setFormData({
      title: `[${cit}] 신규 여행 상품`,
      subTitle: '상품에 대한 매력적인 한 줄 설명을 적어주세요.',
      category: '추천패키지',
      region: reg,
      city: cit,
      priceKRW: 0,
      priceVND: 0,
      duration: '3박 5일',
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
      rating: 5.0,
      reviewCount: 1,
      departureCities: ['인천', '김해'],
      tags: ['신규상품', cit],
      description: '새로운 맞춤형 상품 정보입니다.',
      included: ['왕복 항공권', '호텔 숙박'],
      excluded: ['매너팁'],
      itinerary: [
        { day: 1, title: '도착 및 체크인', description: '체크인 후 휴식' }
      ]
    });
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreating(false);
    setFormData({ ...prod });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      await onAddProduct(formData as any);
      alert('새 상품이 성공적으로 등록되었습니다.');
    } else if (editingProduct) {
      await onUpdateProduct(editingProduct.id, formData);
      alert('상품 정보가 수정되었습니다.');
    }
    setEditingProduct(null);
    setIsCreating(false);
  };

  // Export as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `xinchao_products_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export as CSV
  const handleExportCSV = () => {
    const headers = ["id", "title", "category", "region", "city", "priceKRW", "duration", "rating", "imageUrl", "tags"];
    const rows = products.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      p.category,
      p.region,
      p.city,
      p.priceKRW,
      `"${p.duration}"`,
      p.rating,
      `"${p.imageUrl}"`,
      `"${p.tags.join(',')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `xinchao_products_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text = evt.target?.result as string;
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          await onImportProducts(parsed, importReplace);
          alert(`${parsed.length}개 상품이 성공적으로 업로드되었습니다!`);
        } else {
          alert('올바른 JSON 배열 형식의 파일이 아닙니다.');
        }
      } catch (err: any) {
        alert('파일 파싱 중 오류가 발생했습니다: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  // Import JSON Text
  const handleTextImport = async () => {
    try {
      const parsed = JSON.parse(jsonInputText);
      if (Array.isArray(parsed)) {
        await onImportProducts(parsed, importReplace);
        alert('JSON 텍스트 업로드가 완료되었습니다.');
        setJsonInputText('');
      } else {
        alert('JSON 배열 형식이어야 합니다.');
      }
    } catch (err: any) {
      alert('유효하지 않은 JSON 형식을 입력하셨습니다.');
    }
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
            onClick={() => setActiveTab('import_export')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
              activeTab === 'import_export' ? 'bg-white text-teal-800 border-t-2 border-teal-700' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>업로드 / 다운로드 (CSV · JSON)</span>
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
                /* CREATE / EDIT FORM */
                <form onSubmit={handleSaveProduct} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {isCreating ? '➕ 신규 상품 등록하기' : `✏️ 상품 정보 수정 (${editingProduct?.title})`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingProduct(null);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                    >
                      취소
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">상품 제목</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">서브 카피 / 한줄 설명</label>
                      <input
                        type="text"
                        value={formData.subTitle}
                        onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">카테고리</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold"
                      >
                        <option value="추천패키지">추천패키지</option>
                        <option value="자유여행">자유여행</option>
                        <option value="골프투어">골프투어</option>
                        <option value="풀빌라">풀빌라</option>
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold"
                      >
                        {(REGION_CITIES_MAP[formData.region as Exclude<Region, '전체'>] || ['다낭']).map(cit => (
                          <option key={cit} value={cit}>{cit}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">가격 (KRW)</label>
                      <input
                        type="number"
                        value={formData.priceKRW}
                        onChange={(e) => setFormData({ ...formData, priceKRW: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                        대표 사진 Image URL (인터넷 저작권 무료 사진 지원)
                      </label>
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">여행 기간</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                        placeholder="예: 3박 5일"
                      />
                    </div>
                  </div>

                  {/* Image Preview Box */}
                  {formData.imageUrl && (
                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <img src={formData.imageUrl} alt="preview" className="w-20 h-14 object-cover rounded-lg" />
                      <span className="text-[11px] text-slate-500 font-medium">사진 미리보기 확인</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">상세 소개글</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>저장 완료</span>
                  </button>
                </form>
              ) : (
                /* PRODUCT LIST TABLE & REGION/CITY FILTERING */
                <>
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
                  </div>

                  {/* PRODUCTS DISPLAY MODE */}
                  {viewMode === 'grouped' ? (
                    /* GROUPED BY REGION & CITY */
                    <div className="space-y-6">
                      {REGION_LIST
                        .filter(r => selectedRegionFilter === '전체' || selectedRegionFilter === r)
                        .map((reg) => {
                          const citiesInRegion = REGION_CITIES_MAP[reg].filter(
                            c => selectedCityFilter === '전체' || selectedCityFilter === c
                          );

                          // Region Header Icon & Color
                          const regIcon = reg === '북부' ? '🏛️' : reg === '중부' ? '🏖️' : '🌴';

                          return (
                            <div key={reg} className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{regIcon}</span>
                                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                                    {reg} 지역 여행 상품
                                  </h3>
                                  <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full text-xs font-extrabold border border-teal-100">
                                    총 {products.filter(p => p.region === reg).length}개
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleStartCreate(reg, citiesInRegion[0] || '다낭')}
                                  className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>{reg} 상품 추가</span>
                                </button>
                              </div>

                              <div className="space-y-5">
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
                                    <div key={city} className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60 space-y-3">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Building2 className="w-4 h-4 text-teal-700" />
                                          <span className="font-extrabold text-slate-800 text-xs sm:text-sm">
                                            {city}
                                          </span>
                                          <span className="text-[11px] font-bold text-slate-500">
                                            ({cityProducts.length}개 상품)
                                          </span>
                                        </div>

                                        <button
                                          onClick={() => handleStartCreate(reg, city)}
                                          className="text-[11px] font-extrabold text-teal-800 hover:text-teal-900 flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200 hover:border-teal-300 shadow-2xs"
                                        >
                                          <Plus className="w-3 h-3 text-teal-600" />
                                          <span>+{city} 상품등록</span>
                                        </button>
                                      </div>

                                      {cityProducts.length === 0 ? (
                                        <div className="text-center py-4 text-xs text-slate-400 font-bold bg-white/50 rounded-lg border border-dashed border-slate-200">
                                          등록된 {city} 상품이 없습니다. 상단버튼을 눌러 추가하세요.
                                        </div>
                                      ) : (
                                        <div className="grid grid-cols-1 gap-2">
                                          {cityProducts.map((prod) => (
                                            <div
                                              key={prod.id}
                                              className="bg-white p-3 rounded-xl border border-slate-200 hover:border-teal-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                                            >
                                              <div className="flex items-center gap-3 min-w-0">
                                                <img
                                                  src={prod.imageUrl}
                                                  alt={prod.title}
                                                  className="w-16 h-12 rounded-lg object-cover shrink-0 border border-slate-100"
                                                />
                                                <div className="min-w-0">
                                                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                                                    <span className="bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded border border-teal-100">
                                                      {prod.category}
                                                    </span>
                                                    <span className="text-slate-500">
                                                      {prod.duration}
                                                    </span>
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
                  ) : (
                    /* FLAT LIST VIEW */
                    <div className="space-y-2">
                      {products
                        .filter(p => {
                          const matchReg = selectedRegionFilter === '전체' || p.region === selectedRegionFilter;
                          const matchCity = selectedCityFilter === '전체' || p.city === selectedCityFilter;
                          const matchQuery = !adminSearchQuery || 
                            p.title.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                            p.city.toLowerCase().includes(adminSearchQuery.toLowerCase());
                          return matchReg && matchCity && matchQuery;
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

          {/* TAB 2: BULK EXPORT / IMPORT */}
          {activeTab === 'import_export' && (
            <div className="space-y-6">
              {/* Export Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-amber-600" />
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    1. 데이터 다운로드 (Export)
                  </h4>
                </div>
                <p className="text-xs text-slate-600">
                  현재 등록되어 있는 상품 전체({products.length}개)를 엑셀 편집용 CSV 또는 백업용 JSON 파일로 한 번에 다운로드합니다.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>CSV 파일 다운로드</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xs"
                  >
                    <FileJson className="w-4 h-4" />
                    <span>JSON 백업 파일 다운로드</span>
                  </button>
                </div>
              </div>

              {/* Import Box */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-teal-600" />
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    2. 데이터 업로드 (Import)
                  </h4>
                </div>
                <p className="text-xs text-slate-600">
                  수정되거나 추가된 JSON/CSV 파일을 선택하여 상품 목록을 수시로 갱신합니다.
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="replaceCheck"
                    checked={importReplace}
                    onChange={(e) => setImportReplace(e.target.checked)}
                    className="rounded text-teal-600"
                  />
                  <label htmlFor="replaceCheck" className="cursor-pointer">
                    기존 상품 전체 덮어쓰기 (체크 해제 시 기존 상품 뒤에 추가됨)
                  </label>
                </div>

                {/* File input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">
                    📁 JSON 파일 직접 파일 선택:
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>

                {/* Text Paste */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-800 block">
                    📝 JSON 텍스트 직접 붙여넣기:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="[{ &quot;title&quot;: &quot;다낭 골프 3박5일&quot;, &quot;priceKRW&quot;: 700000, ... }]"
                    value={jsonInputText}
                    onChange={(e) => setJsonInputText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono"
                  />
                  <button
                    onClick={handleTextImport}
                    disabled={!jsonInputText.trim()}
                    className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white font-bold text-xs"
                  >
                    텍스트 데이터 업로드 적용
                  </button>
                </div>
              </div>

              {/* Reset Box */}
              <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-900 font-extrabold text-xs">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>초기 데모 데이터 복원</span>
                </div>
                <p className="text-xs text-rose-800">
                  모든 상품을 기본 신차오투어 12개 초기 상품 세트로 초기화합니다.
                </p>
                <button
                  onClick={async () => {
                    if (confirm('초기 데모 데이터로 복원하시겠습니까?')) {
                      await onResetProducts();
                      alert('초기 상품 데이터로 복원되었습니다.');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                >
                  기본 데모 상품 복원하기
                </button>
              </div>
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
