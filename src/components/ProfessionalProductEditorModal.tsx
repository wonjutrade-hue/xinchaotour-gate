import React, { useState, useEffect, useRef } from 'react';
import { Product, Category, Region, City, ItineraryDay, VillaSpecs, GolfSpecs } from '../types';
import { 
  X, 
  Upload, 
  Trash2, 
  Sparkles, 
  Check, 
  Image as ImageIcon, 
  DollarSign, 
  MapPin, 
  Tag, 
  Clock, 
  Plus,
  Layers,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Camera,
  ChevronRight,
  ChevronLeft,
  FileSpreadsheet,
  Info,
  Sliders,
  Maximize2
} from 'lucide-react';
import { ExchangeRates } from '../lib/exchangeRate';

interface ProfessionalProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (productData: Partial<Product>) => Promise<void>;
  product?: Product | null;
  exchangeRates?: ExchangeRates;
}

type TabType = 'basic' | 'photos' | 'itinerary' | 'details' | 'specs';

// Presets by Category
const CATEGORY_PRESETS: Record<Category, {
  defaultIncluded: string[];
  defaultExcluded: string[];
  defaultDuration: string;
  defaultSubtitle: string;
  sampleItinerary: ItineraryDay[];
}> = {
  '추천패키지': {
    defaultIncluded: [
      '전용 단독 차량 및 전담 기사 (유류비/통행료 포함)',
      '100% 한국어 능통 전담 현지 가이드',
      '일정표 상 명시된 전 일정 관광지 입장권 및 케이블카',
      '특식 및 현지식 식사 포함',
      '여행자 안심 보험 (현지 가입)'
    ],
    defaultExcluded: [
      '왕복 항공권 (개별 발권 또는 대행 요청 가능)',
      '가이드 & 기사 매너팁 (자율)',
      '개인 경비 및 개인 음료/주류'
    ],
    defaultDuration: '3박 5일',
    defaultSubtitle: '공항 픽업부터 단독 전용 차량과 한국어 가이드가 밀착 케어하는 노쇼핑/노옵션 명품 단독 패키지',
    sampleItinerary: [
      { day: 1, title: '공항 도착 & 전용차량 호텔 픽업', description: '공항 출국장에서 신짜오투어 전담 피켓 미팅 후 전용 차량으로 안전하게 호텔 체크인 및 휴식', meal: '석식: 현지 특식', hotel: '4성급 또는 5성급 호텔' },
      { day: 2, title: '핵심 명소 투어 & 케이블카 & 힐링 스파', description: '전용 차량으로 주요 랜드마크 관광 및 인생샷 촬영, 저녁 90분 전신 마사지 힐링', meal: '조식: 호텔식 / 중식: 분짜 특식 / 석식: 씨푸드 만찬', hotel: '호텔 투숙' },
      { day: 3, title: '자유 힐링 & 야경 투어 & 공항 샌딩', description: '체크아웃 후 로컬 마켓 쇼핑 및 야경 감상 후 공항으로 편안하게 샌딩', meal: '조식: 호텔식 / 중식: 현지식 / 석식: 삼겹살 또는 한식', hotel: '기내박' }
    ]
  },
  '자유여행': {
    defaultIncluded: [
      '최신형 전용 단독 렌터카 & 베테랑 기사 (1일 8시간/10시간)',
      '기사 식대, 유류비, 고속도로 톨게이트 비용 일체 포함',
      '카카오톡 실시간 한국어 상담원 케어'
    ],
    defaultExcluded: [
      '관광지 입장료 및 식사비용 (현장 결제)',
      '기사 매너팁 (자율)',
      '개인 쇼핑 및 여행자 보험'
    ],
    defaultDuration: '1일 단독 투어',
    defaultSubtitle: '내가 원하는 코스대로 자유롭게 이동하는 우리 일행 전용 차량 & 단독 맞춤 투어',
    sampleItinerary: [
      { day: 1, title: '호텔 로비 미팅 & 자유 일정 시작', description: '원하시는 시간에 호텔 로비에서 기사님과 미팅 후 고객님이 정한 코스로 자유롭게 투어 진행', meal: '개별 자유식', hotel: '개별 숙소' }
    ]
  },
  '풀빌라': {
    defaultIncluded: [
      '럭셔리 단독 독채 풀빌라 전용 사용 (프라이빗 수영장)',
      '매일 신선한 조식 서비스 (빌라 룸서비스 또는 리조트 뷔페)',
      '24시간 전담 한국어 지원 버틀러/매니저 케어',
      '초고속 무료 Wi-Fi 및 주방/조리기구 일체 완비'
    ],
    defaultExcluded: [
      '빌라 내 바비큐(BBQ) 숯/그릴 셋팅 및 출장 셰프 비용 (추가 선택 가능)',
      '개인 미니바 및 추가 룸서비스'
    ],
    defaultDuration: '1박 기준',
    defaultSubtitle: '대가족 및 프라이빗 휴양에 최적화된 최고급 단독 독채 풀빌라',
    sampleItinerary: [
      { day: 1, title: '프라이빗 체크인 & 풀파티 휴식', description: '빌라 매니저의 친절한 안내로 체크인 후 전용 프라이빗 풀장에서 여유로운 휴식', meal: '조식 포함', hotel: '단독 풀빌라 독채' }
    ]
  },
  '골프투어': {
    defaultIncluded: [
      '국제 규격 명문 골프장 그린피 (18홀/27홀/36홀)',
      '1인 1캐디 피 및 2인 1카트 (또는 1인 1카트)',
      '공항-호텔-골프장 왕복 전용 리무진 밴 차량',
      '생수 및 클럽하우스 락커룸 이용료'
    ],
    defaultExcluded: [
      '캐디 팁 (18홀 기준 현장 지급 약 40만~50만동)',
      '클럽하우스 중식 및 개인 골프용품/그늘집 비용'
    ],
    defaultDuration: '3박 4일 (54홀)',
    defaultSubtitle: 'PGA급 오션뷰 명문 코스에서 즐기는 VIP 황제 골프 & 전용 차량 풀패키지',
    sampleItinerary: [
      { day: 1, title: '공항 픽업 & 호텔 체크인 & 1차 18홀 라운딩', description: '전용 리무진으로 골프장 이동 후 18홀 티오프, 라운딩 후 호텔 체크인', meal: '석식: 현지 맛집', hotel: '골프 리조트' },
      { day: 2, title: '명문 코스 2차 18홀 라운딩', description: '조식 후 골프장 이동하여 쾌적한 오전 라운딩 및 오후 힐링 스파', meal: '조식: 호텔식 / 석식: 씨푸드', hotel: '골프 리조트' }
    ]
  }
};

export const ProfessionalProductEditorModal: React.FC<ProfessionalProductEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
  product,
  exchangeRates,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Form States
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState<Category>('추천패키지');
  const [region, setRegion] = useState<Region>('중부');
  const [city, setCity] = useState<City>('다낭');
  const [priceKRW, setPriceKRW] = useState<number>(350000);
  const [duration, setDuration] = useState('3박 5일');
  const [address, setAddress] = useState('');
  const [tags, setTags] = useState<string[]>(['단독투어', '노쇼핑', '한국인가이드']);
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');

  // Photos
  const [images, setImages] = useState<string[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Inclusions & Exclusions
  const [includedList, setIncludedList] = useState<string[]>([]);
  const [newIncludedItem, setNewIncludedItem] = useState('');
  const [excludedList, setExcludedList] = useState<string[]>([]);
  const [newExcludedItem, setNewExcludedItem] = useState('');

  // Itinerary
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

  // Villa Specs
  const [villaBedrooms, setVillaBedrooms] = useState<number>(3);
  const [villaMaxOccupancy, setVillaMaxOccupancy] = useState<number>(8);
  const [villaPrivatePool, setVillaPrivatePool] = useState<boolean>(true);
  const [villaOceanView, setVillaOceanView] = useState<boolean>(true);
  const [villaAreaSqm, setVillaAreaSqm] = useState<number>(350);

  // Golf Specs
  const [golfHoles, setGolfHoles] = useState<number>(18);
  const [golfGreenFeeIncluded, setGolfGreenFeeIncluded] = useState<boolean>(true);
  const [golfCaddieFeeIncluded, setGolfCaddieFeeIncluded] = useState<boolean>(true);
  const [golfCourseNames, setGolfCourseNames] = useState<string>('BRG 다낭 CC, 몽고메리 링크스, 바나힐스 GC');

  // Populate data when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (product) {
      // Editing existing product
      setTitle(product.title || '');
      setSubTitle(product.subTitle || '');
      setCategory(product.category || '추천패키지');
      setRegion(product.region || '중부');
      setCity(product.city || '다낭');
      setPriceKRW(product.priceKRW || 200000);
      setDuration(product.duration || '3박 5일');
      setAddress(product.address || '');
      setTags(product.tags || ['단독투어', '노쇼핑']);
      setDescription(product.description || '');

      const allPhotos = [product.imageUrl, ...(product.additionalImages || [])].filter(Boolean);
      setImages(allPhotos);

      setIncludedList(product.included?.length ? product.included : CATEGORY_PRESETS[product.category]?.defaultIncluded || []);
      setExcludedList(product.excluded?.length ? product.excluded : CATEGORY_PRESETS[product.category]?.defaultExcluded || []);
      setItinerary(product.itinerary?.length ? product.itinerary : CATEGORY_PRESETS[product.category]?.sampleItinerary || []);

      if (product.villaSpecs) {
        setVillaBedrooms(product.villaSpecs.bedrooms || 3);
        setVillaMaxOccupancy(product.villaSpecs.maxOccupancy || 8);
        setVillaPrivatePool(product.villaSpecs.privatePool ?? true);
        setVillaOceanView(product.villaSpecs.oceanView ?? true);
        setVillaAreaSqm(product.villaSpecs.areaSqm || 350);
      }
      if (product.golfSpecs) {
        setGolfHoles(product.golfSpecs.holes || 18);
        setGolfGreenFeeIncluded(product.golfSpecs.greenFeeIncluded ?? true);
        setGolfCaddieFeeIncluded(product.golfSpecs.caddieFeeIncluded ?? true);
        setGolfCourseNames(product.golfSpecs.golfCourseNames?.join(', ') || '');
      }
    } else {
      // Creating brand new product with smart preset
      const preset = CATEGORY_PRESETS['추천패키지'];
      setTitle('');
      setSubTitle(preset.defaultSubtitle);
      setCategory('추천패키지');
      setRegion('중부');
      setCity('다낭');
      setPriceKRW(350000);
      setDuration(preset.defaultDuration);
      setAddress('베트남 다낭 미케비치 및 시내 일대');
      setTags(['단독투어', '노쇼핑', '한국인가이드', '가족여행추천']);
      setDescription('신짜오투어 현지 직영 단독 프라이빗 투어 상품입니다.');
      setImages([]);
      setIncludedList(preset.defaultIncluded);
      setExcludedList(preset.defaultExcluded);
      setItinerary(preset.sampleItinerary);
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  // Change category helper with preset loader
  const handleCategoryChange = (newCat: Category) => {
    setCategory(newCat);
    const preset = CATEGORY_PRESETS[newCat];
    if (!product && preset) {
      setDuration(preset.defaultDuration);
      setSubTitle(preset.defaultSubtitle);
      setIncludedList(preset.defaultIncluded);
      setExcludedList(preset.defaultExcluded);
      setItinerary(preset.sampleItinerary);
    }
  };

  // Image compressor (Airbnb 1440px High Quality)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
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
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = () => reject(new Error('이미지 압축 실패'));
      };
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsSubmitting(true);
    setUploadStatus(`총 ${files.length}장의 사진을 에어비앤비 규격으로 변환 중...`);

    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadStatus(`사진 최적화 중 (${i + 1}/${files.length})...`);
        const base64 = await compressImage(files[i]);
        compressedList.push(base64);
      }

      // Upload to server disk
      setUploadStatus('서버 영구 디스크에 저장 중...');
      const res = await fetch('/api/upload-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: compressedList })
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.urls)) {
        setImages(prev => [...prev, ...data.urls]);
      } else {
        setImages(prev => [...prev, ...compressedList]);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      alert('사진 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
      setUploadStatus(null);
    }
  };

  const handleSetCoverPhoto = (index: number) => {
    if (index === 0) return;
    setImages(prev => {
      const copy = [...prev];
      const target = copy.splice(index, 1)[0];
      copy.unshift(target);
      return copy;
    });
  };

  const handleRemovePhoto = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Itinerary Day Helpers
  const handleAddItineraryDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary(prev => [
      ...prev,
      {
        day: nextDay,
        title: `${nextDay}일차 일정`,
        description: '오전 자유 일정 및 오후 전용차량 투어 진행',
        meal: '조식: 호텔식 / 중식: 현지식 / 석식: 특식',
        hotel: '특급 호텔'
      }
    ]);
  };

  const handleUpdateItineraryDay = (index: number, field: keyof ItineraryDay, value: string | number) => {
    setItinerary(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveItineraryDay = (index: number) => {
    setItinerary(prev => prev.filter((_, i) => i !== index).map((day, idx) => ({ ...day, day: idx + 1 })));
  };

  // Tags helper
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  };

  // Submit Final
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('상품 제목을 입력해 주세요.');
      setActiveTab('basic');
      return;
    }
    if (images.length === 0) {
      alert('최소 1장 이상의 사진을 등록해 주세요.');
      setActiveTab('photos');
      return;
    }

    setIsSubmitting(true);
    try {
      const mainImageUrl = images[0];
      const additionalImages = images.slice(1);

      const productPayload: Partial<Product> = {
        id: product?.id,
        title: title.trim(),
        subTitle: subTitle.trim() || `${city} 맞춤 투어`,
        category,
        region,
        city,
        priceKRW: Number(priceKRW) || 200000,
        priceVND: Math.round((Number(priceKRW) || 200000) * 18.817),
        duration: duration.trim() || '1일',
        address: address.trim() || `${region} ${city}`,
        imageUrl: mainImageUrl,
        additionalImages: additionalImages,
        tags: tags.length > 0 ? tags : [category, city, '단독투어'],
        description: description.trim() || `${title} - 신짜오투어 현지 직영 맞춤 상품입니다.`,
        included: includedList.filter(Boolean),
        excluded: excludedList.filter(Boolean),
        itinerary: itinerary.length > 0 ? itinerary : CATEGORY_PRESETS[category].sampleItinerary,
        rating: product?.rating || 5.0,
        reviewCount: product?.reviewCount || 12,
        isPopular: true,
        departureCities: product?.departureCities || ['인천', '부산', '대구', '현지조인']
      };

      if (category === '풀빌라') {
        productPayload.villaSpecs = {
          bedrooms: Number(villaBedrooms) || 3,
          maxOccupancy: Number(villaMaxOccupancy) || 8,
          privatePool: villaPrivatePool,
          oceanView: villaOceanView,
          areaSqm: Number(villaAreaSqm) || 350
        };
      }

      if (category === '골프투어') {
        productPayload.golfSpecs = {
          holes: Number(golfHoles) || 18,
          greenFeeIncluded: golfGreenFeeIncluded,
          caddieFeeIncluded: golfCaddieFeeIncluded,
          golfCourseNames: golfCourseNames.split(',').map(s => s.trim()).filter(Boolean)
        };
      }

      await onSaveProduct(productPayload);
      alert(product ? '✅ 상품이 성공적으로 수정되었습니다!' : '🎉 새로운 여행 상품이 완벽하게 등록되었습니다!');
      onClose();
    } catch (err: any) {
      console.error('Save error:', err);
      alert('저장 실패: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden my-4 flex flex-col max-h-[94vh]">
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-teal-800/40">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {product ? '💎 전문 여행 상품 수정' : '💎 신규 여행 상품 전문 등록'}
                </h2>
                <span className="text-[11px] font-black bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  전문가용 초간단 에디터
                </span>
              </div>
              <p className="text-xs text-teal-200 font-medium mt-0.5">
                복잡한 코딩 없이 [기본정보 · 사진 · 일정표 · 포함사항]을 에어비앤비/하나투어 스타일로 완벽하게 관리합니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-all cursor-pointer"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-2 overflow-x-auto py-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'basic'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/30 scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>1. 기본 정보 & 가격</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/30 scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>2. 사진 관리 ({images.length}장)</span>
            {images.length === 0 && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'itinerary'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/30 scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>3. 일자별 상세 일정 ({itinerary.length}일차)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'details'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/30 scale-102'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. 포함 & 불포함 사항</span>
          </button>

          {(category === '풀빌라' || category === '골프투어') && (
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-700/30 scale-102'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>5. {category === '풀빌라' ? '풀빌라 스펙' : '골프장 스펙'}</span>
            </button>
          )}
        </div>

        {/* TAB CONTENTS FORM */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Category & Region */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-black text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>분류 및 여행 지역 선택</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1.5">카테고리</label>
                    <select
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value as Category)}
                      className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    >
                      <option value="추천패키지">✨ 추천 패키지 (단독투어)</option>
                      <option value="자유여행">🏝️ 자유 여행 (차량/가이드)</option>
                      <option value="풀빌라">🏰 풀빌라 & 리조트</option>
                      <option value="골프투어">⛳ 명문 골프 투어</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1.5">권역</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as Region)}
                      className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    >
                      <option value="중부">중부 (다낭/나트랑/후에 등)</option>
                      <option value="남부">남부 (푸꾸옥/호치민/달랏 등)</option>
                      <option value="북부">북부 (하노이/하롱베이/사파 등)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1.5">대표 도시</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as City)}
                      className="w-full p-3.5 bg-white border border-slate-300 rounded-xl text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    >
                      <option value="다낭">다낭 (호이안)</option>
                      <option value="나트랑">나트랑 (달랏)</option>
                      <option value="푸꾸옥">푸꾸옥</option>
                      <option value="하노이">하노이 (하롱베이/사파)</option>
                      <option value="호치민">호치민 (무이네/붕따우)</option>
                      <option value="달랏">달랏</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1.5 flex items-center justify-between">
                    <span>상품 제목 (메인 노출) <span className="text-rose-500">*</span></span>
                    <span className="text-[11px] text-slate-400 font-medium">손님들이 가장 먼저 보는 메인 제목입니다</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: [다낭 3박5일] 바나힐 골든브릿지 & 호이안 야경 단독 힐링 투어"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-base font-black text-slate-900 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1.5">
                    한 줄 핵심 특징 (부제목 / 서브타이틀)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 노옵션·노쇼핑 보장, 단독 전용 차량 및 한국어 가이드 올케어"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Price & Duration & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1.5">
                    상품 가격 (한국 원화 기준) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="0"
                      step="10000"
                      value={priceKRW}
                      onChange={(e) => setPriceKRW(Number(e.target.value))}
                      className="w-full p-3.5 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
                    />
                    <span className="absolute right-4 top-3.5 text-xs font-black text-slate-400">원</span>
                  </div>
                  <p className="text-[11px] font-bold text-teal-700 mt-1">
                    👉 베트남 동 자동 계산: 약 {Math.round(priceKRW * 18.817).toLocaleString('ko-KR')} ₫
                  </p>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1.5">
                    여행 기간 / 기준 단위
                  </label>
                  <input
                    type="text"
                    placeholder="예: 3박 5일, 1박 기준, 1일 단독투어"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-800 block mb-1.5">
                    위치 / 출발 장소
                  </label>
                  <input
                    type="text"
                    placeholder="예: 베트남 다낭 미케비치 앞"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  포인트 태그 (뱃지)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="태그 입력 후 추가 (예: 한국인가이드, 단독차량, 미케비치)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-lg border border-teal-200"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-teal-600 hover:text-rose-600 font-black cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('photos')}
                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>다음: 사진 등록하기 (2단계)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PHOTOS (AIRBNB UPLOAD & MANAGER) */}
          {activeTab === 'photos' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-teal-700" />
                      <span>에어비앤비 규격 고화질 사진 등록 (1440px 자동 최적화)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      컴퓨터나 핸드폰의 원본 사진을 그대로 올리시면 가장 깨끗한 고화질로 자동 변환됩니다.
                    </p>
                  </div>
                  <span className="text-xs font-black bg-teal-100 text-teal-900 px-3 py-1 rounded-full shrink-0">
                    현재 총 {images.length}장 등록됨
                  </span>
                </div>

                {/* Big Upload Dropzone */}
                <div className="relative border-2 border-dashed border-teal-400 hover:border-teal-600 bg-white rounded-3xl p-8 text-center transition-all group shadow-xs">
                  <input
                    type="file"
                    id="pro-images-upload-input"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isSubmitting}
                    className="hidden"
                  />
                  <label
                    htmlFor="pro-images-upload-input"
                    className="cursor-pointer flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-700 group-hover:scale-110 transition-transform flex items-center justify-center shadow-inner">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-base font-black text-teal-950 block">
                        📁 내 컴퓨터에서 사진 여러 장 선택하여 올리기 (클릭)
                      </span>
                      <span className="text-xs text-slate-500 mt-1 block">
                        Ctrl 키나 마우스 드래그로 한 번에 수십 장의 사진을 선택하실 수 있습니다.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Progress message */}
                {uploadStatus && (
                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs font-bold text-teal-900 text-center animate-pulse">
                    ⏳ {uploadStatus}
                  </div>
                )}
              </div>

              {/* Photo Management Gallery Grid */}
              {images.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700">
                      📸 등록된 사진 갤러리 (★ 1번 사진이 메인 대표 커버가 됩니다)
                    </span>
                    <button
                      type="button"
                      onClick={() => setImages([])}
                      className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-xs text-rose-600 rounded-lg border border-rose-200 font-bold cursor-pointer transition-colors"
                    >
                      🗑️ 모든 사진 싹 비우기 (0장)
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                    {images.map((url, idx) => (
                      <div
                        key={idx}
                        className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all group bg-slate-200 ${
                          idx === 0 ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-300 hover:border-teal-500'
                        }`}
                      >
                        <img
                          src={url}
                          alt={`Product photo ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                          {idx === 0 ? (
                            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                              👑 1번 대표사진
                            </span>
                          ) : (
                            <span className="bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {idx + 1}
                            </span>
                          )}
                        </div>

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverPhoto(idx)}
                              className="w-full py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black rounded-lg shadow-sm cursor-pointer"
                            >
                              👑 대표로 지정
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-600">
                    아직 등록된 사진이 없습니다. 위 버튼을 눌러 사진을 올려주세요.
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>이전: 기본 정보</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('itinerary')}
                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>다음: 일정표 작성 (3단계)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ITINERARY BUILDER */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-teal-700" />
                    <span>일자별 여행 일정표 (1일차 ~ N일차)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    여행 상세페이지에 에어비앤비/하나투어처럼 깔끔한 타임라인으로 보여집니다.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddItineraryDay}
                  className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ 일정 일자 추가 ({itinerary.length + 1}일차)</span>
                </button>
              </div>

              {/* Itinerary List */}
              <div className="space-y-4">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-teal-700 text-white font-black text-xs flex items-center justify-center">
                          {day.day}일
                        </span>
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => handleUpdateItineraryDay(idx, 'title', e.target.value)}
                          placeholder="일정 제목 (예: 다낭 도착 & 미케비치 해변 힐링)"
                          className="p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-900 w-64 sm:w-96 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryDay(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="이 일차 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day description */}
                    <div>
                      <textarea
                        rows={3}
                        value={day.description}
                        onChange={(e) => handleUpdateItineraryDay(idx, 'description', e.target.value)}
                        placeholder="이 날 진행되는 투어 내용, 관광지, 이동 동선 등을 적어주세요."
                        className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden leading-relaxed"
                      />
                    </div>

                    {/* Meal & Hotel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">🍽️ 식사 정보</label>
                        <input
                          type="text"
                          value={day.meal || ''}
                          onChange={(e) => handleUpdateItineraryDay(idx, 'meal', e.target.value)}
                          placeholder="예: 조식: 호텔식 / 중식: 분짜 / 석식: 씨푸드"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">🏨 호텔/숙박 정보</label>
                        <input
                          type="text"
                          value={day.hotel || ''}
                          onChange={(e) => handleUpdateItineraryDay(idx, 'hotel', e.target.value)}
                          placeholder="예: 5성급 리조트 또는 단독 풀빌라"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('photos')}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>이전: 사진 관리</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>다음: 포함/불포함 사항 (4단계)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: INCLUSION & EXCLUSION DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included List */}
                <div className="bg-teal-50/50 p-5 rounded-2xl border border-teal-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-teal-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-700" />
                      <span>포함 사항 (투어에 포함된 항목)</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="항목 입력 후 추가 (예: 전용 단독 차량 및 유류비)"
                      value={newIncludedItem}
                      onChange={(e) => setNewIncludedItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newIncludedItem.trim()) {
                            setIncludedList(prev => [...prev, newIncludedItem.trim()]);
                            setNewIncludedItem('');
                          }
                        }
                      }}
                      className="flex-1 p-2.5 bg-white border border-teal-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newIncludedItem.trim()) {
                          setIncludedList(prev => [...prev, newIncludedItem.trim()]);
                          setNewIncludedItem('');
                        }
                      }}
                      className="px-3.5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-black shrink-0 cursor-pointer"
                    >
                      추가
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {includedList.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-teal-100 text-xs font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span>{item}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIncludedList(prev => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Excluded List */}
                <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-700" />
                      <span>불포함 사항 (고객 부담 항목)</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="항목 입력 후 추가 (예: 왕복 항공권, 가이드 팁)"
                      value={newExcludedItem}
                      onChange={(e) => setNewExcludedItem(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newExcludedItem.trim()) {
                            setExcludedList(prev => [...prev, newExcludedItem.trim()]);
                            setNewExcludedItem('');
                          }
                        }
                      }}
                      className="flex-1 p-2.5 bg-white border border-rose-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newExcludedItem.trim()) {
                          setExcludedList(prev => [...prev, newExcludedItem.trim()]);
                          setNewExcludedItem('');
                        }
                      }}
                      className="px-3.5 py-2.5 bg-rose-700 text-white rounded-xl text-xs font-black shrink-0 cursor-pointer"
                    >
                      추가
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {excludedList.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-rose-100 text-xs font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                          <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExcludedList(prev => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('itinerary')}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>이전: 일정표</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-black text-sm rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-700/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Check className="w-5 h-5" />
                  <span>{product ? '모든 수정 완료 및 저장' : '새 상품 등록 완료하기'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SPECS (VILLA OR GOLF) */}
          {activeTab === 'specs' && (
            <div className="space-y-6 animate-fadeIn">
              {category === '풀빌라' && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-black text-slate-900">🏰 풀빌라 전용 상세 스펙</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">침실 개수 (베드룸)</label>
                      <input
                        type="number"
                        value={villaBedrooms}
                        onChange={(e) => setVillaBedrooms(Number(e.target.value))}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">최대 수용 인원</label>
                      <input
                        type="number"
                        value={villaMaxOccupancy}
                        onChange={(e) => setVillaMaxOccupancy(Number(e.target.value))}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">빌라 면적 (m²)</label>
                      <input
                        type="number"
                        value={villaAreaSqm}
                        onChange={(e) => setVillaAreaSqm(Number(e.target.value))}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold"
                      />
                    </div>
                    <div className="flex items-center gap-6 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                        <input
                          type="checkbox"
                          checked={villaPrivatePool}
                          onChange={(e) => setVillaPrivatePool(e.target.checked)}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <span>전용 프라이빗 풀장 완비</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                        <input
                          type="checkbox"
                          checked={villaOceanView}
                          onChange={(e) => setVillaOceanView(e.target.checked)}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <span>오션뷰 (바다 조망)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {category === '골프투어' && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-black text-slate-900">⛳ 명문 골프장 전용 스펙</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">총 홀 수 (홀)</label>
                      <input
                        type="number"
                        value={golfHoles}
                        onChange={(e) => setGolfHoles(Number(e.target.value))}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">방문 골프장 명칭들 (쉼표 구분)</label>
                      <input
                        type="text"
                        value={golfCourseNames}
                        onChange={(e) => setGolfCourseNames(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold"
                      />
                    </div>
                    <div className="flex items-center gap-6 pt-4 col-span-full">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                        <input
                          type="checkbox"
                          checked={golfGreenFeeIncluded}
                          onChange={(e) => setGolfGreenFeeIncluded(e.target.checked)}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <span>그린피 포함</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                        <input
                          type="checkbox"
                          checked={golfCaddieFeeIncluded}
                          onChange={(e) => setGolfCaddieFeeIncluded(e.target.checked)}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <span>캐디피 & 카트 포함</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>이전: 포함/불포함 사항</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-black text-sm rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-700/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <Check className="w-5 h-5" />
                  <span>{product ? '모든 수정 완료 및 저장' : '새 상품 등록 완료하기'}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
