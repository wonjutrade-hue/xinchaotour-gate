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
  Sparkles,
  Camera,
  AlertTriangle,
  Check,
  CheckSquare,
  Square,
  ArrowLeft
} from 'lucide-react';
import { getKakaoDirectLink, setKakaoDirectLink, COMPANY_PHONE } from '../constants';

const REGION_LIST: Exclude<Region, '전체'>[] = ['중부', '북부', '남부'];

const REGION_CITIES_MAP: Record<Exclude<Region, '전체'>, City[]> = {
  '중부': ['다낭', '호이안', '후에', '나트랑'],
  '북부': ['하노이', '사파', '하롱베이', '닌빈'],
  '남부': ['호치민', '푸꾸옥', '달랏', '붕따우'],
};

const CATEGORIES: Category[] = ['풀빌라', '자유여행', '골프투어', '추천패키지'];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  inquiries: ConsultationRequest[];
  onAddProduct: (prod: Omit<Product, 'id'>) => Promise<void>;
  onUpdateProduct: (id: string, updated: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onClearAllProducts?: () => Promise<void>;
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
  onClearAllProducts,
  onResetProducts,
  onImportProducts,
  onUpdateInquiryStatus,
}) => {
  if (!isOpen) return null;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'photos' | 'inquiries' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // In-app confirmation dialog state (replaces broken window.confirm)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    confirmAction: () => Promise<void> | void;
    isDestructive?: boolean;
  }>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: '확인',
    confirmAction: () => {},
    isDestructive: false
  });

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
  
  // Sub Images List State (Visual management for Airbnb-level photo gallery)
  const [subImagesList, setSubImagesList] = useState<string[]>([]);
  const [newSubImageUrlInput, setNewSubImageUrlInput] = useState<string>('');
  const [uploadProgressStatus, setUploadProgressStatus] = useState<string | null>(null);
  const [uploadProgressPercent, setUploadProgressPercent] = useState<number>(0);
  const [isSavingProduct, setIsSavingProduct] = useState<boolean>(false);
  const [selectedPhotoIndexes, setSelectedPhotoIndexes] = useState<number[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Dedicated Photo Hub state (for photos tab)
  const [photoHubList, setPhotoHubList] = useState<string[]>([]);
  const [selectedHubPhotoIndexes, setSelectedHubPhotoIndexes] = useState<number[]>([]);

  useEffect(() => {
    // Populate Photo Hub with all images currently across products
    const collected: string[] = [];
    products.forEach(p => {
      if (p.imageUrl && !collected.includes(p.imageUrl)) collected.push(p.imageUrl);
      (p.additionalImages || []).forEach(img => {
        if (img && !collected.includes(img)) collected.push(img);
      });
    });
    setPhotoHubList(collected);
  }, [products]);

  const handleAddSubImageUrl = () => {
    if (!newSubImageUrlInput.trim()) return;
    const rawUrls = newSubImageUrlInput
      .split(/[\n,]+/)
      .map(u => u.trim())
      .filter(u => u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:image/') || u.startsWith('/uploads/'));

    if (rawUrls.length === 0) {
      alert('유효한 이미지 URL(http://, https://)을 입력해주세요.');
      return;
    }

    setSubImagesList(prev => [...prev, ...rawUrls]);
    setNewSubImageUrlInput('');
  };

  const handleRemoveSubImage = (index: number) => {
    setSubImagesList(prev => {
      const filtered = prev.filter((_, i) => i !== index);
      setFormData(f => ({ ...f, imageUrl: filtered[0] || '' }));
      return filtered;
    });
    setSelectedPhotoIndexes(prev => prev.filter(i => i !== index).map(i => (i > index ? i - 1 : i)));
  };

  const handleSetAsCoverPhoto = (index: number) => {
    if (index < 0 || index >= subImagesList.length) return;
    const targetUrl = subImagesList[index];
    const remaining = subImagesList.filter((_, i) => i !== index);
    const newList = [targetUrl, ...remaining];
    setSubImagesList(newList);
    setFormData(prev => ({ ...prev, imageUrl: targetUrl }));
  };

  const handleMoveSubImage = (index: number, direction: 'up' | 'down' | 'first' | 'last') => {
    setSubImagesList(prev => {
      const copy = [...prev];
      if (direction === 'first') {
        const item = copy.splice(index, 1)[0];
        copy.unshift(item);
        return copy;
      }
      if (direction === 'last') {
        const item = copy.splice(index, 1)[0];
        copy.push(item);
        return copy;
      }
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return copy;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleToggleSelectPhoto = (index: number) => {
    setSelectedPhotoIndexes(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSelectAllPhotos = () => {
    if (selectedPhotoIndexes.length === subImagesList.length) {
      setSelectedPhotoIndexes([]);
    } else {
      setSelectedPhotoIndexes(subImagesList.map((_, i) => i));
    }
  };

  const handleDeleteSelectedPhotos = () => {
    if (selectedPhotoIndexes.length === 0) return;
    const indexSet = new Set(selectedPhotoIndexes);
    setSubImagesList(prev => {
      const filtered = prev.filter((_, i) => !indexSet.has(i));
      setFormData(f => ({ ...f, imageUrl: filtered[0] || '' }));
      return filtered;
    });
    setSelectedPhotoIndexes([]);
  };

  const handleClearAllPhotos = () => {
    setSubImagesList([]);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setSelectedPhotoIndexes([]);
  };

  // Helper function to compress user uploaded image file with Airbnb standards (1440px max, 0.82 high quality)
  const compressAndConvertImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1440;

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

  // Batch processor for multiple files
  const processBatchFiles = async (fileList: File[], target: 'editor' | 'hub' = 'editor') => {
    if (fileList.length === 0) return;
    const total = fileList.length;
    const rawDataUrls: string[] = [];

    const batchSize = 4;
    for (let i = 0; i < total; i += batchSize) {
      const currentBatch = fileList.slice(i, i + batchSize);
      const percent = Math.round(((i + currentBatch.length) / total) * 100);
      setUploadProgressPercent(percent);
      setUploadProgressStatus(`📸 [고화질 최적화] ${total}장 중 ${Math.min(i + currentBatch.length, total)}번째 사진 압축 완료 (${percent}%)`);

      const batchResults = await Promise.all(
        currentBatch.map(file => compressAndConvertImage(file).catch(err => {
          console.warn('Failed to compress image:', file.name, err);
          return null;
        }))
      );

      for (const res of batchResults) {
        if (res) rawDataUrls.push(res);
      }
    }

    setUploadProgressStatus(`💾 [서버 영구 보관] ${rawDataUrls.length}장의 사진을 서버 디스크로 영구 저장 중...`);
    let finalUrls = rawDataUrls;
    try {
      const uploadRes = await fetch('/api/upload-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: rawDataUrls })
      });
      const uploadData = await uploadRes.json();
      if (uploadData.success && Array.isArray(uploadData.urls) && uploadData.urls.length > 0) {
        finalUrls = uploadData.urls;
      }
    } catch (uErr) {
      console.warn('Server disk image upload fallback to client data URL:', uErr);
    }

    if (target === 'editor') {
      setSubImagesList(prev => {
        const combined = [...prev, ...finalUrls];
        if (combined.length > 0) {
          setFormData(f => ({ ...f, imageUrl: combined[0] }));
        }
        return combined;
      });
    } else {
      setPhotoHubList(prev => [...finalUrls, ...prev]);
    }

    setUploadProgressStatus(null);
    setUploadProgressPercent(0);
  };

  const handleSubImagesFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const fileList = Array.from(files) as File[];
      await processBatchFiles(fileList, 'editor');
    } catch (err) {
      setUploadProgressStatus(null);
      alert('사진 일괄 업로드 중 오류가 발생했습니다.');
    }
    e.target.value = '';
  };

  const handlePhotoHubUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const fileList = Array.from(files) as File[];
      await processBatchFiles(fileList, 'hub');
    } catch (err) {
      setUploadProgressStatus(null);
      alert('사진 일괄 업로드 중 오류가 발생했습니다.');
    }
    e.target.value = '';
  };

  const handleDropPhotos = async (e: React.DragEvent<HTMLDivElement>, target: 'editor' | 'hub' = 'editor') => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const allFiles = Array.from(e.dataTransfer.files) as File[];
      const imageFiles = allFiles.filter(f => f.type && f.type.startsWith('image/'));
      if (imageFiles.length === 0) {
        alert('이미지 파일(JPG, PNG, WebP 등)만 드롭해주세요.');
        return;
      }
      await processBatchFiles(imageFiles, target);
    }
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
    category: '풀빌라',
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

  // Villa Sample Preset Auto-Fill Helper
  const applyVillaPreset = (city: City = (formData.city as City) || '다낭') => {
    setFormData(prev => ({
      ...prev,
      title: prev.title && !prev.title.includes('신규 여행 상품') ? prev.title : `[${city}/풀빌라] 럭셔리 단독 프라이빗 독채 풀빌라`,
      subTitle: '대형 프라이빗 수영장 & 단독 독채 빌라에서 즐기는 최고급 럭셔리 휴양',
      category: '풀빌라',
      priceKRW: prev.priceKRW && prev.priceKRW > 0 ? prev.priceKRW : 850000,
      priceVND: prev.priceVND && prev.priceVND > 0 ? prev.priceVND : 16000000,
      duration: '3박 5일',
      description: '단독 수영장과 독채 공간을 갖춘 프리미엄 럭셔리 풀빌라 패키지입니다. 전 일정 단독 전용차량과 한국어 가이드가 동행하여 더욱 편안하고 안전한 단독 여행을 보장합니다.',
    }));

    setIncludedText([
      '단독 프라이빗 독채 풀빌라 숙박',
      '전 일정 단독 전용차량 & 전담 기사',
      '한국어 전문 가이드 전 일정 동행',
      '빌라 조식 뷔페 및 무제한 미니바',
      '단독 공항 픽업 & 샌딩 서비스'
    ].join('\n'));

    setExcludedText([
      '왕복 항공권',
      '가이드/기사 매너팁',
      '개인 선택옵션 및 기타 개인 경비'
    ].join('\n'));

    setDepartureCitiesText(['인천', '김해', '대구', '청주'].join('\n'));
    setTagsText(['#프라이빗풀빌라', '#단독독채', '#럭셔리휴양', `#${city}풀빌라`].join('\n'));

    setItineraryList([
      { 
        day: 1, 
        title: '공항 도착 후 가이드 미팅 & 풀빌라 체크인', 
        description: '단독 전용차량 이동 후 프라이빗 풀빌라 체크인, 미니바 및 전용 수영장 이용 안내', 
        meal: '석식: 현지 특식', 
        hotel: '프라이빗 럭셔리 독채 풀빌라' 
      },
      { 
        day: 2, 
        title: '프라이빗 수영장 물놀이 & 시티 명소 가이드 투어', 
        description: '빌라 내 전용 수영장 자유 물놀이 및 한국어 가이드 동행 시티 명소 관람, 씨푸드 다이닝', 
        meal: '조: 빌라 조식 / 중: 현지 특식 / 석: 씨푸드', 
        hotel: '프라이빗 럭셔리 독채 풀빌라' 
      },
      { 
        day: 3, 
        title: '여유로운 레이트 체크아웃, 쇼핑 & 공항 배웅', 
        description: '여유로운 레이트 체크아웃 후 시내 인기 카페/기념품 명소 방문 및 단독 차량 공항 샌딩', 
        meal: '조: 빌라 조식 / 중: 자유식', 
        hotel: '기내박' 
      }
    ]);

    setVillaBedrooms(3);
    setVillaPrivatePool(true);
    setVillaOceanView(false);
    setVillaMaxOccupancy(6);
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

    const cat: Category = targetCategory || (selectedCategoryFilter !== '전체' ? selectedCategoryFilter : '풀빌라');

    if (cat === '풀빌라') {
      setFormData({
        title: `[${cit}/풀빌라] 럭셔리 단독 프라이빗 독채 풀빌라`,
        subTitle: '대형 프라이빗 수영장 & 단독 독채 빌라에서 즐기는 최고급 럭셔리 휴양',
        category: '풀빌라',
        region: reg,
        city: cit,
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
        departureCities: ['인천', '김해', '대구', '청주'],
        tags: ['#프라이빗풀빌라', '#단독독채', '#럭셔리휴양', `#${cit}풀빌라`],
        address: '',
        externalBookingUrl: '',
        description: '단독 수영장과 독채 공간을 갖춘 프리미엄 럭셔리 풀빌라 패키지입니다. 전 일정 단독 전용차량과 한국어 가이드가 동행하여 더욱 편안하고 안전한 단독 여행을 보장합니다.',
        included: ['단독 프라이빗 독채 풀빌라 숙박', '전 일정 단독 전용차량 & 전담 기사', '한국어 전문 가이드 전 일정 동행', '빌라 조식 뷔페 및 무제한 미니바', '단독 공항 픽업 & 샌딩 서비스'],
        excluded: ['왕복 항공권', '가이드/기사 매너팁', '개인 선택옵션 및 기타 개인 경비'],
        itinerary: [
          { day: 1, title: '공항 도착 후 가이드 미팅 & 풀빌라 체크인', description: '단독 전용차량 이동 후 프라이빗 풀빌라 체크인, 미니바 및 전용 수영장 이용 안내', meal: '석식: 현지 특식', hotel: '프라이빗 럭셔리 독채 풀빌라' },
          { day: 2, title: '프라이빗 수영장 물놀이 & 시티 명소 가이드 투어', description: '빌라 내 전용 수영장 자유 물놀이 및 한국어 가이드 동행 시티 명소 관람, 씨푸드 다이닝', meal: '조: 빌라 조식 / 중: 현지 특식 / 석: 씨푸드', hotel: '프라이빗 럭셔리 독채 풀빌라' },
          { day: 3, title: '여유로운 레이트 체크아웃, 쇼핑 & 공항 배웅', description: '여유로운 레이트 체크아웃 후 시내 인기 카페/기념품 명소 방문 및 단독 차량 공항 샌딩', meal: '조: 빌라 조식 / 중: 자유식', hotel: '기내박' }
        ]
      });

      setIncludedText('단독 프라이빗 독채 풀빌라 숙박\n전 일정 단독 전용차량 & 전담 기사\n한국어 전문 가이드 전 일정 동행\n빌라 조식 뷔페 및 무제한 미니바\n단독 공항 픽업 & 샌딩 서비스');
      setExcludedText('왕복 항공권\n가이드/기사 매너팁\n개인 선택옵션 및 기타 개인 경비');
      setDepartureCitiesText('인천\n김해\n대구\n청주');
      setTagsText(`#프라이빗풀빌라\n#단독독채\n#럭셔리휴양\n#${cit}풀빌라`);
      setSubImagesList([]);
      setItineraryList([
        { day: 1, title: '공항 도착 후 가이드 미팅 & 풀빌라 체크인', description: '단독 전용차량 이동 후 프라이빗 풀빌라 체크인, 미니바 및 전용 수영장 이용 안내', meal: '석식: 현지 특식', hotel: '프라이빗 럭셔리 독채 풀빌라' },
        { day: 2, title: '프라이빗 수영장 물놀이 & 시티 명소 가이드 투어', description: '빌라 내 전용 수영장 자유 물놀이 및 한국어 가이드 동행 시티 명소 관람, 씨푸드 다이닝', meal: '조: 빌라 조식 / 중: 현지 특식 / 석: 씨푸드', hotel: '프라이빗 럭셔리 독채 풀빌라' },
        { day: 3, title: '여유로운 레이트 체크아웃, 쇼핑 & 공항 배웅', description: '여유로운 레이트 체크아웃 후 시내 인기 카페/기념품 명소 방문 및 단독 차량 공항 샌딩', meal: '조: 빌라 조식 / 중: 자유식', hotel: '기내박' }
      ]);

      setVillaBedrooms(3);
      setVillaPrivatePool(true);
      setVillaOceanView(false);
      setVillaMaxOccupancy(6);
    } else {
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
        tags: ['#신규상품', `#${cit}`, `#${cat}`],
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
      setTagsText(`#신규상품\n#${cit}\n#${cat}`);
      setSubImagesList([]);
      setItineraryList([
        { day: 1, title: '공항 도착 및 현지 가이드 미팅', description: '전용 차량으로 호텔 이동 후 체크인 및 자유 휴식', meal: '석식: 현지 특식', hotel: '5성급 리조트/호텔' },
        { day: 2, title: '주요 관광지 가이드 투어 및 특식', description: '단독 차량과 가이드로 여유로운 코스 진행', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 리조트/호텔' },
        { day: 3, title: '자유 일정 및 공항 배웅', description: '체크아웃 후 기념품 샵 방문 및 공항 이동', meal: '조: 호텔식 / 중: 자유식', hotel: '기내박' }
      ]);
    }

    setGolfCourseNamesText(`${cit} CC\n몽고메리 링스`);
    setGolfHoles(18);
    setGreenFeeIncluded(true);
    setCaddieFeeIncluded(true);
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsCreating(false);
    setFormData({ ...prod });

    setIncludedText((prod.included || []).join('\n'));
    setExcludedText((prod.excluded || []).join('\n'));
    setDepartureCitiesText((prod.departureCities || []).join('\n'));
    setTagsText((prod.tags || []).join('\n'));
    const existingSubImages = prod.additionalImages || (prod as any).galleryImages || (prod as any).images || [];
    const allInitial = prod.imageUrl 
      ? [prod.imageUrl, ...existingSubImages.filter((u: string) => u !== prod.imageUrl)]
      : existingSubImages;
    setSubImagesList(Array.isArray(allInitial) ? [...allInitial] : []);
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
    if (isSavingProduct) return;
    setIsSavingProduct(true);
    try {
      const splitLines = (str: string) => str.split('\n').map(s => s.trim()).filter(Boolean);

      let cleanSubImages = subImagesList.filter(Boolean);
      let mainImageUrl = cleanSubImages[0] || formData.imageUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80';

      const base64List = [mainImageUrl, ...cleanSubImages].filter(u => u && u.startsWith('data:image/'));
      if (base64List.length > 0) {
        try {
          const uploadRes = await fetch('/api/upload-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images: base64List })
          });
          const uploadData = await uploadRes.json();
          if (uploadData.success && Array.isArray(uploadData.urls)) {
            let urlIdx = 0;
            if (mainImageUrl.startsWith('data:image/')) {
              mainImageUrl = uploadData.urls[urlIdx++] || mainImageUrl;
            }
            cleanSubImages = cleanSubImages.map(img => {
              if (img.startsWith('data:image/')) {
                return uploadData.urls[urlIdx++] || img;
              }
              return img;
            });
          }
        } catch (uErr) {
          console.warn('Batch upload on save fallback:', uErr);
        }
      }

      const finalData: Partial<Product> = {
        ...formData,
        imageUrl: mainImageUrl,
        included: splitLines(includedText),
        excluded: splitLines(excludedText),
        departureCities: splitLines(departureCitiesText),
        tags: splitLines(tagsText),
        additionalImages: cleanSubImages,
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
        alert(`✅ [저장 완료] "${finalData.title}" 상품이 안전하게 등록되었습니다.`);
      } else if (editingProduct) {
        await onUpdateProduct(editingProduct.id, finalData);
        alert(`✅ [수정 완료] "${finalData.title}" 상품 정보가 안전하게 수정되었습니다.`);
      }
      setEditingProduct(null);
      setIsCreating(false);
    } catch (err: any) {
      console.error('Save product error:', err);
      alert(`⚠️ 저장 중 오류가 발생했습니다: ${err.message || '다시 시도해주세요.'}`);
    } finally {
      setIsSavingProduct(false);
    }
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

  // Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">신짜오투어 관리자 로그인</h3>
            <p className="text-xs text-slate-400 mt-1">
              관리자 암호를 입력하시면 전체 화면 관리자 센터가 열립니다.
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="관리자 비밀번호 입력 (기본: 1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3.5 text-center text-sm font-bold text-white tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-400"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex-2 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>관리자 센터 입장</span>
              </button>
            </div>
          </form>
          <p className="text-[11px] text-slate-500">
            * 기본 패스워드는 <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded">1234</code> 또는 <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded">xinchao123</code> 입니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col w-full h-full overflow-hidden animate-fadeIn">
      {/* 1. TOP HEADER BAR (Full Width Workspace Header) */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
            ⚙️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-base sm:text-lg text-white tracking-tight">
                신짜오투어 통합 관리자 센터
              </h2>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/30">
                전체 화면 모드
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              여행 상품 등록·수정·전체삭제 | 고화질 사진 일괄 관리 | 실시간 예약 접수
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
            <span>손님용 홈페이지로 돌아가기</span>
          </button>
        </div>
      </header>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-2 flex items-center justify-between shrink-0 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('products');
              setIsCreating(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>🛍️ 상품 관리 (추가·수정·전체삭제)</span>
            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
              activeTab === 'products' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {products.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>📸 고화질 사진 일괄 관리기</span>
            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
              activeTab === 'photos' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {photoHubList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>📥 실시간 예약/상담 접수</span>
            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
              activeTab === 'inquiries' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
            }`}>
              {inquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>⚙️ 도메인 & 카카오톡 설정</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-8">
        
        {/* ================= TAB 1: PRODUCT LIST & EDITOR ================= */}
        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            {isCreating || editingProduct ? (
              /* COMPREHENSIVE PRODUCT EDITOR FORM */
              <form onSubmit={handleSaveProduct} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-black text-white text-lg sm:text-xl flex items-center gap-2">
                      <span>{isCreating ? '➕ 신규 여행 상품 등록' : '✏️ 상품 상세 정보 수정'}</span>
                      {editingProduct && (
                        <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
                          ID: {editingProduct.id}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      상품 기본 정보, 고화질 사진, 포함/불포함 사항 및 일차별 상세 일정표를 작성합니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    닫기/목록으로
                  </button>
                </div>

                {/* Section 1: 기본 정보 & 카테고리 */}
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-800">
                    <h4 className="font-black text-sm text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>1. 기본 정보 및 카테고리 분류</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => applyVillaPreset(formData.city as City)}
                      className="px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-purple-300 border border-purple-500/40 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                      <span>✨ 풀빌라 추천 양식 자동 채우기</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">상품 제목 <span className="text-rose-400">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="예: [다낭/골프투어] 3색 명문 골프 3박 5일 패키지"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs font-bold text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">서브 타이틀 / 한 줄 강조 카피</label>
                      <input
                        type="text"
                        value={formData.subTitle}
                        onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                        placeholder="예: 다낭 3대 챔피언십 코스 그린피 포함 & 5성급 호이안 리조트 숙박"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">카테고리</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-extrabold text-amber-300"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">권역</label>
                      <select
                        value={formData.region}
                        onChange={(e) => {
                          const newReg = e.target.value as Region;
                          const availableCities = REGION_CITIES_MAP[newReg as Exclude<Region, '전체'>] || ['다낭'];
                          setFormData({ ...formData, region: newReg, city: availableCities[0] });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-extrabold text-white"
                      >
                        {REGION_LIST.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">도시</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value as City })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-extrabold text-white"
                      >
                        {(REGION_CITIES_MAP[formData.region as Exclude<Region, '전체'>] || ['다낭']).map(cit => (
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
                        placeholder="예: 3박 5일, 1박 기준"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">상품 가격 (원화 KRW)</label>
                      <input
                        type="number"
                        min="0"
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
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-black text-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-300">위치 / 주소</label>
                      <input
                        type="text"
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="예: 베트남 다낭 미케비치 앞"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: 고화질 사진 관리 (드롭존 & 일괄삭제) */}
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-800">
                    <h4 className="font-black text-sm text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-teal-400" />
                      <span>2. 상품 사진 갤러리 관리 ({subImagesList.length}장 등록됨)</span>
                    </h4>
                    <span className="text-xs text-amber-300 font-bold">
                      ★ 1번 사진이 손님용 대표 메인 커버가 됩니다.
                    </span>
                  </div>

                  {/* Drag & Drop Photo Area */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                    onDragLeave={() => setIsDraggingOver(false)}
                    onDrop={(e) => handleDropPhotos(e, 'editor')}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                      isDraggingOver
                        ? 'border-amber-400 bg-amber-400/10'
                        : 'border-slate-700 bg-slate-900/60 hover:border-slate-500'
                    }`}
                  >
                    <input
                      type="file"
                      id="admin-form-photo-upload"
                      multiple
                      accept="image/*"
                      onChange={handleSubImagesFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="admin-form-photo-upload"
                      className="cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-black text-white block">
                        📁 내 컴퓨터에서 사진 여러 장 선택하기 (클릭 또는 사진 드래그)
                      </span>
                      <span className="text-xs text-slate-400">
                        10장, 20장, 50장 한꺼번에 선택 가능 (에어비앤비 1440px 규격 자동 최적화)
                      </span>
                    </label>
                  </div>

                  {uploadProgressStatus && (
                    <div className="p-3 bg-teal-900/40 border border-teal-500/40 rounded-xl text-xs font-bold text-teal-300 text-center animate-pulse">
                      ⏳ {uploadProgressStatus}
                    </div>
                  )}

                  {/* Photo Actions Bar */}
                  {subImagesList.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleSelectAllPhotos}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          {selectedPhotoIndexes.length === subImagesList.length ? <CheckSquare className="w-3.5 h-3.5 text-amber-300" /> : <Square className="w-3.5 h-3.5" />}
                          <span>전체 사진 선택 ({selectedPhotoIndexes.length}/{subImagesList.length})</span>
                        </button>

                        {selectedPhotoIndexes.length > 0 && (
                          <button
                            type="button"
                            onClick={handleDeleteSelectedPhotos}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>선택한 {selectedPhotoIndexes.length}장 즉시 삭제</span>
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleClearAllPhotos}
                        className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-600/40 text-rose-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>🗑️ 등록된 사진 전체 싹 비우기 (0장으로)</span>
                      </button>
                    </div>
                  )}

                  {/* Photo Thumbnails Grid */}
                  {subImagesList.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-2 bg-slate-900/50 rounded-xl border border-slate-800">
                      {subImagesList.map((url, idx) => (
                        <div
                          key={idx}
                          className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all group bg-slate-900 ${
                            idx === 0 ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <img
                            src={url}
                            alt={`Photo ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleToggleSelectPhoto(idx)}
                              className="w-5 h-5 rounded bg-black/70 text-white flex items-center justify-center cursor-pointer"
                            >
                              {selectedPhotoIndexes.includes(idx) ? <CheckSquare className="w-3.5 h-3.5 text-amber-300" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                            </button>
                            {idx === 0 && (
                              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs">
                                👑 대표
                              </span>
                            )}
                          </div>

                          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => handleRemoveSubImage(idx)}
                                className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-110"
                                title="이 사진 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetAsCoverPhoto(idx)}
                                className="w-full py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black rounded cursor-pointer"
                              >
                                👑 1번 대표로 지정
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                      📷 아직 등록된 사진이 없습니다. 상단 드롭존을 클릭하여 사진을 추가해주세요.
                    </div>
                  )}
                </div>

                {/* Section 3: 상세 소개글 & 포함/불포함 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <label className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                      <span>✅ 포함 사항 (한 줄에 1개씩)</span>
                    </label>
                    <textarea
                      rows={5}
                      value={includedText}
                      onChange={(e) => setIncludedText(e.target.value)}
                      placeholder={'전 일정 단독 전용차량\n한국어 가이드\n5성급 호텔 숙박\n조식 및 특식'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <label className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                      <span>❎ 불포함 사항 (한 줄에 1개씩)</span>
                    </label>
                    <textarea
                      rows={5}
                      value={excludedText}
                      onChange={(e) => setExcludedText(e.target.value)}
                      placeholder={'가이드 & 기사 매너팁\n개인 경비 및 쇼핑'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Section 4: 일정표 */}
                <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-800">
                    <h4 className="font-black text-sm text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>3. 일차별 상세 여행 일정표 ({itineraryList.length}일차)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const nextDay = itineraryList.length + 1;
                        setItineraryList([
                          ...itineraryList,
                          { day: nextDay, title: `${nextDay}일차 대표 일정`, description: '상세 일정을 작성하세요.', meal: '조: 호텔식 / 중: 특식 / 석: 씨푸드', hotel: '5성급 호텔' }
                        ]);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ 일정 일차 추가</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {itineraryList.map((item, idx) => (
                      <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-md">
                            DAY {item.day || idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => setItineraryList(itineraryList.filter((_, i) => i !== idx))}
                            className="text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer"
                          >
                            이 일차 삭제
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const copy = [...itineraryList];
                              copy[idx].title = e.target.value;
                              setItineraryList(copy);
                            }}
                            placeholder="일차 제목"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-bold text-white"
                          />
                          <input
                            type="text"
                            value={item.meal || ''}
                            onChange={(e) => {
                              const copy = [...itineraryList];
                              copy[idx].meal = e.target.value;
                              setItineraryList(copy);
                            }}
                            placeholder="식사 정보 (조/중/석)"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={item.hotel || ''}
                            onChange={(e) => {
                              const copy = [...itineraryList];
                              copy[idx].hotel = e.target.value;
                              setItineraryList(copy);
                            }}
                            placeholder="숙소 정보 (호텔/리조트)"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const copy = [...itineraryList];
                            copy[idx].description = e.target.value;
                            setItineraryList(copy);
                          }}
                          placeholder="일정 상세 설명"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    disabled={isSavingProduct || Boolean(uploadProgressStatus)}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isSavingProduct ? '💾 서버에 저장하는 중...' : isCreating ? '신규 상품 등록 완료하기' : '수정 사항 저장 완료하기'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProduct(null);
                    }}
                    className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              /* PRODUCT LIST & TOOLBAR */
              <>
                {/* Top Action Toolbar with Bulk Clear & Restore */}
                <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Search Bar */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="상품명, 도시, 키워드 검색..."
                        value={adminSearchQuery}
                        onChange={(e) => setAdminSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleStartCreate(selectedRegionFilter, selectedCityFilter)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-400/20 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-slate-950" />
                        <span>➕ 신규 상품 추가</span>
                      </button>

                      {/* Prominent Bulk Clear Button */}
                      <button
                        onClick={() => {
                          setConfirmModal({
                            isOpen: true,
                            title: '⚠️ 등록된 모든 여행 상품을 전체 삭제하시겠습니까?',
                            description: '현재 등록된 모든 상품 데이터가 삭제되어 0개가 됩니다. (언제든지 [초기 샘플 복원] 버튼으로 되돌릴 수 있습니다)',
                            confirmText: '네, 모든 상품 싹 비우기',
                            confirmAction: async () => {
                              if (onClearAllProducts) {
                                await onClearAllProducts();
                              }
                              setConfirmModal(prev => ({ ...prev, isOpen: false }));
                            },
                            isDestructive: true
                          });
                        }}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>🗑️ 전체 상품 싹 비우기 (0개)</span>
                      </button>

                      {/* Restore Default Seed Products Button */}
                      <button
                        onClick={() => {
                          setConfirmModal({
                            isOpen: true,
                            title: '🔄 초기 기본 샘플 상품(12개)을 복원하시겠습니까?',
                            description: '풀빌라, 골프투어, 자유여행 등 신짜오투어의 기본 샘플 상품 12개가 새로 로드됩니다.',
                            confirmText: '샘플 상품 복원하기',
                            confirmAction: async () => {
                              await onResetProducts();
                              setConfirmModal(prev => ({ ...prev, isOpen: false }));
                            },
                            isDestructive: false
                          });
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                        <span>🔄 원본 샘플 복원</span>
                      </button>

                      {/* JSON Backup & Restore */}
                      <button
                        onClick={handleExportJson}
                        className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1 border border-slate-700 cursor-pointer"
                        title="JSON 백업 다운로드"
                      >
                        <Download className="w-3.5 h-3.5 text-teal-400" />
                        <span>백업</span>
                      </button>

                      <label className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1 border border-slate-700 cursor-pointer">
                        <Upload className="w-3.5 h-3.5 text-teal-400" />
                        <span>복원</span>
                        <input type="file" accept=".json" onChange={handleFileUploadJson} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Filters: Category & Region */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 mr-1">테마:</span>
                      {(['전체', '풀빌라', '자유여행', '골프투어', '추천패키지'] as const).map(cat => {
                        const count = products.filter(p => cat === '전체' || p.category === cat).length;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategoryFilter(cat as Category | '전체')}
                            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                              selectedCategoryFilter === cat
                                ? 'bg-amber-400 text-slate-950 shadow-xs'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {cat} ({count})
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        onClick={() => setViewMode('grouped')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                          viewMode === 'grouped' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Grid className="w-3.5 h-3.5" />
                        <span>지역별 묶음</span>
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                          viewMode === 'list' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <List className="w-3.5 h-3.5" />
                        <span>전체 목록</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products List Grid */}
                {products.length === 0 ? (
                  <div className="text-center py-20 bg-slate-900 rounded-3xl border border-dashed border-slate-800 space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-2xl">
                      🛍️
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-black text-white">등록된 여행 상품이 0개입니다.</p>
                      <p className="text-xs text-slate-400">
                        상단의 <strong className="text-amber-300">[➕ 신규 상품 추가]</strong> 버튼을 눌러 새 상품을 등록하시거나,<br/>
                        <strong className="text-slate-300">[🔄 원본 샘플 복원]</strong> 버튼을 누르시면 기본 12개 상품을 다시 불러올 수 있습니다.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products
                      .filter(p => {
                        const matchCat = selectedCategoryFilter === '전체' || p.category === selectedCategoryFilter;
                        const matchQuery = !adminSearchQuery || 
                          p.title.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                          p.city.toLowerCase().includes(adminSearchQuery.toLowerCase());
                        return matchCat && matchQuery;
                      })
                      .map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between p-4 space-y-3 shadow-lg group"
                        >
                          <div className="space-y-3">
                            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-950">
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                                <span className="bg-slate-950/80 text-amber-300 font-black text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs border border-amber-400/30">
                                  {prod.category}
                                </span>
                                <span className="bg-slate-950/80 text-white font-bold text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs">
                                  {prod.city}
                                </span>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-extrabold text-white text-sm line-clamp-1">
                                {prod.title}
                              </h4>
                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                {prod.subTitle || prod.duration}
                              </p>
                              <p className="text-sm font-black text-amber-400 mt-1">
                                {prod.priceKRW.toLocaleString()}원
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(prod)}
                              className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5 text-amber-300" />
                              <span>수정하기</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setConfirmModal({
                                  isOpen: true,
                                  title: `🗑️ '${prod.title}' 상품을 삭제하시겠습니까?`,
                                  description: '삭제된 상품은 복구되지 않으며 홈페이지에서 즉시 사라집니다.',
                                  confirmText: '삭제하기',
                                  confirmAction: async () => {
                                    await onDeleteProduct(prod.id);
                                    setConfirmModal(prev => ({ ...prev, isOpen: false }));
                                  },
                                  isDestructive: true
                                });
                              }}
                              className="px-3 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/80 border border-rose-600/40 text-rose-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
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

        {/* ================= TAB 2: DEDICATED PHOTO HUB ================= */}
        {activeTab === 'photos' && (
          <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <Camera className="w-6 h-6 text-amber-400" />
                    <span>고화질 사진 일괄 관리기 (드롭존 & 일괄삭제)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    수십 장의 고화질 여행 사진을 한꺼번에 등록하거나 일괄 선택하여 삭제하실 수 있습니다.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-xl">
                    총 {photoHubList.length}장 보관 중
                  </span>
                </div>
              </div>

              {/* Big Dropzone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={(e) => handleDropPhotos(e, 'hub')}
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                  isDraggingOver
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-slate-700 bg-slate-950/60 hover:border-slate-500'
                }`}
              >
                <input
                  type="file"
                  id="photo-hub-file-upload"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoHubUpload}
                  className="hidden"
                />
                <label
                  htmlFor="photo-hub-file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-16 h-16 rounded-3xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                    <Upload className="w-8 h-8" />
                  </div>
                  <span className="text-base font-black text-white block">
                    📁 내 컴퓨터에서 사진 수십 장 일괄 올리기 (클릭 또는 파일 드래그)
                  </span>
                  <span className="text-xs text-slate-400">
                    스마트폰 카메라, DSLR 원본 사진 지원 (자동 1440px 고화질 변환 및 서버 영구 보관)
                  </span>
                </label>
              </div>

              {/* Photo Hub Actions Bar */}
              {photoHubList.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedHubPhotoIndexes.length === photoHubList.length) {
                          setSelectedHubPhotoIndexes([]);
                        } else {
                          setSelectedHubPhotoIndexes(photoHubList.map((_, i) => i));
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      {selectedHubPhotoIndexes.length === photoHubList.length ? <CheckSquare className="w-4 h-4 text-amber-300" /> : <Square className="w-4 h-4" />}
                      <span>전체 사진 선택 ({selectedHubPhotoIndexes.length}/{photoHubList.length})</span>
                    </button>

                    {selectedHubPhotoIndexes.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const indexSet = new Set(selectedHubPhotoIndexes);
                          setPhotoHubList(prev => prev.filter((_, i) => !indexSet.has(i)));
                          setSelectedHubPhotoIndexes([]);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>선택한 {selectedHubPhotoIndexes.length}장 삭제</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPhotoHubList([]);
                      setSelectedHubPhotoIndexes([]);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-600/40 text-rose-300 text-xs font-black flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>모든 사진 싹 비우기 (0장)</span>
                  </button>
                </div>
              )}

              {/* Photo Hub Grid */}
              {photoHubList.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[550px] overflow-y-auto p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {photoHubList.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 group bg-slate-900"
                    >
                      <img
                        src={url}
                        alt={`Photo ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedHubPhotoIndexes(prev => 
                            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                          );
                        }}
                        className="absolute top-2 left-2 w-6 h-6 rounded bg-black/70 text-white flex items-center justify-center cursor-pointer"
                      >
                        {selectedHubPhotoIndexes.includes(idx) ? <CheckSquare className="w-4 h-4 text-amber-300" /> : <Square className="w-4 h-4 text-slate-400" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPhotoHubList(prev => prev.filter((_, i) => i !== idx));
                          setSelectedHubPhotoIndexes(prev => prev.filter(i => i !== idx).map(i => (i > idx ? i - 1 : i)));
                        }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-xs text-slate-500 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
                  📷 보관된 사진이 없습니다. 상단 드롭존을 클릭하여 사진을 추가해주세요.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: INQUIRIES ================= */}
        {activeTab === 'inquiries' && (
          <div className="max-w-7xl mx-auto space-y-4 animate-fadeIn">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>실시간 예약 및 1:1 견적 상담 접수함</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    손님들이 웹사이트에서 접수한 예약 및 맞춤 견적 신청 내역입니다.
                  </p>
                </div>
                <span className="text-xs font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-xl">
                  총 {inquiries.length}건
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-16 text-xs text-slate-500 bg-slate-950 rounded-2xl border border-dashed border-slate-800">
                  📬 현재 접수된 예약 문의 내역이 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-black text-white text-base">
                            👤 {inq.userName} 고객님
                          </span>
                          <a
                            href={`tel:${inq.userPhone}`}
                            className="text-xs text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 font-bold flex items-center gap-1"
                          >
                            📞 {inq.userPhone}
                          </a>
                          {inq.kakaoId && (
                            <span className="text-xs text-amber-400 font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                              💬 카톡: {inq.kakaoId}
                            </span>
                          )}
                        </div>

                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-slate-900 border border-slate-700 text-xs font-black px-3 py-1.5 rounded-xl text-amber-300"
                        >
                          <option value="pending">⏳ 상담 대기</option>
                          <option value="in_progress">📞 상담 진행중</option>
                          <option value="confirmed">✅ 예약 확정</option>
                          <option value="completed">🎉 완료</option>
                          <option value="cancelled">❌ 취소</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900/60 p-3 rounded-xl text-xs text-slate-300">
                        <div><span className="text-slate-500">문의 상품:</span> <strong className="text-white">{inq.productTitle || '맞춤 견적'}</strong></div>
                        <div><span className="text-slate-500">출발 희망일:</span> <strong className="text-amber-300">{inq.startDate || '협의'}</strong></div>
                        <div><span className="text-slate-500">인원:</span> <strong className="text-white">성인 {inq.travelerCount.adult}명</strong></div>
                      </div>

                      {inq.message && (
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap">
                          {inq.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <h4 className="font-black text-white text-base">카카오톡 상담 연결 URL 설정</h4>
                  <p className="text-xs text-slate-400">
                    홈페이지의 [카카오톡 실시간 상담] 버튼을 눌렀을 때 열릴 카카오톡 채널 또는 오픈채팅방 링크입니다.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={kakaoUrlInput}
                    onChange={(e) => setKakaoUrlInput(e.target.value)}
                    placeholder="예: https://open.kakao.com/o/sXincaoTour"
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    onClick={handleSaveKakaoLink}
                    className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    저장하기
                  </button>
                  <button
                    onClick={() => window.open(kakaoUrlInput, '_blank')}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>테스트</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Domain Guide */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center font-black">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-white text-base">xinchaotour.com 도메인 연결 안내</h4>
                  <p className="text-xs text-slate-400">
                    보유하고 계신 도메인을 언제든지 연결하여 실시간 수정하실 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                <p className="font-bold text-amber-300">
                  💡 xinchaotour.com 도메인에 홈페이지를 연결하신 후에도 지금처럼 관리자 센터에서 언제든지 상품을 추가, 수정, 전체삭제 하실 수 있습니다.
                </p>
                <p className="text-slate-400">
                  대표 고객센터 전화: <strong className="text-white">{COMPANY_PHONE}</strong> | 대표 이메일: <strong className="text-white">wonjutrade@hanmail.net</strong>
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* IN-APP CONFIRMATION MODAL (Replaces broken browser alerts/confirms) */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-center animate-fadeIn">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
              confirmModal.isDestructive ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
            }`}>
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-black text-white">{confirmModal.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{confirmModal.description}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirmModal.confirmAction}
                className={`flex-1 py-3 rounded-xl font-black text-xs cursor-pointer shadow-lg ${
                  confirmModal.isDestructive
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20'
                }`}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
