import React, { useState, useEffect, useRef } from 'react';
import { Product, Category, Region, City, ConsultationRequest } from './types';
import { Navbar, NavPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ConsultationModal } from './components/ConsultationModal';
import { AiTravelAssistantModal } from './components/AiTravelAssistantModal';
import { TravelQuiz } from './components/TravelQuiz';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { Footer } from './components/Footer';
import { ExchangeRateModal } from './components/ExchangeRateModal';
import { TravelInfoModal, TravelInfoTab } from './components/TravelInfoModal';
import { AdminMode } from './components/AdminMode';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ReservationPage } from './components/ReservationPage';
import { TravelInfoPage } from './components/TravelInfoPage';
import { ReviewsPage } from './components/ReviewsPage';
import { CompanyPage } from './components/CompanyPage';
import { getLiveExchangeRates, ExchangeRates, DEFAULT_RATES } from './lib/exchangeRate';
import { productService } from './services/productService';
import { inquiryService } from './services/inquiryService';
import { 
  SearchX, 
  Palmtree, 
  ShieldCheck, 
  Clock, 
  ThumbsUp, 
  Sun,
  Compass,
  DollarSign,
  FileText,
  Utensils,
  Lightbulb,
  ArrowRight,
  Loader2,
  PackagePlus
} from 'lucide-react';

import {
  saveProductsToIndexedDB,
  loadProductsFromIndexedDB,
  saveInquiriesToIndexedDB,
  loadInquiriesFromIndexedDB
} from './lib/indexedDb';
import { INITIAL_PRODUCTS } from './data/seedProducts';
import { getDisplayProductImage } from './lib/imageFallback';
import { trackVisitorEvent } from './lib/analytics';

const PRODUCTS_CACHE_KEY = 'xinchao_products_cache_master';

function cleanPlaceholderUrls(prodList: Product[]): Product[] {
  if (!Array.isArray(prodList)) return [];
  return prodList.map(p => {
    const cleanSubs = (p.additionalImages || []).filter(u => u && u !== 'VILLA_PHOTO_DATA' && u !== 'TEST_IMG');
    let mainImg = p.imageUrl || '';
    if (mainImg === 'VILLA_PHOTO_DATA' || mainImg === 'TEST_IMG') {
      mainImg = cleanSubs.length > 0 ? cleanSubs[0] : '';
    }
    return {
      ...p,
      imageUrl: mainImg,
      additionalImages: cleanSubs
    };
  });
}

function getStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed !== null && parsed !== undefined && Array.isArray(parsed)) {
        return cleanPlaceholderUrls(parsed) as unknown as T;
      }
    }
  } catch (e) {
    console.warn(`Failed to parse localStorage key ${key}:`, e);
  }
  return fallback;
}

function setStoredJson(key: string, data: any) {
  try {
    const jsonStr = JSON.stringify(data);
    if (jsonStr.length < 5000000) {
      localStorage.setItem(key, jsonStr);
    }
  } catch (e) {
    console.warn(`LocalStorage quota warning:`, e);
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = getStoredJson<Product[]>(PRODUCTS_CACHE_KEY, []);
    if (cached && cached.length > 0) return cached;
    return [];
  });
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Sync locks to avoid race conditions with polling
  const lastClientSaveTimestampRef = useRef<number>(0);
  const isSavingToServerRef = useRef<boolean>(false);

  // Sync products state to IndexedDB, localStorage, Supabase and server backend
  const persistProducts = async (updatedProducts: Product[]): Promise<boolean> => {
    const saveTime = Date.now();
    lastClientSaveTimestampRef.current = saveTime;
    try {
      localStorage.setItem('xinchao_products_last_saved', String(saveTime));
    } catch (e) {}
    isSavingToServerRef.current = true;

    // 1. Instantly update React state & client local stores
    setProducts(updatedProducts);
    await saveProductsToIndexedDB(updatedProducts);
    setStoredJson(PRODUCTS_CACHE_KEY, updatedProducts);

    // If currently viewing a product that was modified, update selectedProduct
    setSelectedProduct(prev => {
      if (!prev) return null;
      const updatedMatch = updatedProducts.find(p => p.id === prev.id);
      return updatedMatch || prev;
    });

    // 2. Persist to Supabase Database & Server backend
    try {
      await productService.syncAllProducts(updatedProducts);
    } catch (e) {
      console.warn('Backend sync warning:', e);
    } finally {
      isSavingToServerRef.current = false;
    }
    return true;
  };

  // Exchange Rates state
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(DEFAULT_RATES);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isRefreshingRates, setIsRefreshingRates] = useState(false);

  // Filters
  const [activeCategory, setActiveCategory] = useState<Category | '전체'>('전체');
  const [activeRegion, setActiveRegion] = useState<Region>('전체');
  const [activeCity, setActiveCity] = useState<City>('전체');
  const [subFilter, setSubFilter] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTargetProduct, setConsultationTargetProduct] = useState<Product | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTravelInfoModalOpen, setIsTravelInfoModalOpen] = useState(false);
  const [travelInfoTab, setTravelInfoTab] = useState<TravelInfoTab>('course');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const handleOpenAdmin = () => {
    try {
      const isAuth = localStorage.getItem('xinchao_admin_auth') === 'true';
      if (isAuth) {
        setIsAdminMode(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setIsAdminLoginOpen(true);
      }
    } catch (e) {
      setIsAdminLoginOpen(true);
    }
  };

  const handleSaveInquiries = (updatedInquiries: ConsultationRequest[]) => {
    setInquiries(updatedInquiries);
    saveInquiriesToIndexedDB(updatedInquiries);
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    trackVisitorEvent('product_view', `[상품상세] ${prod.title}`, { productId: prod.id, productTitle: prod.title });
  };

  const handleOpenTravelInfo = (tab: TravelInfoTab = 'course') => {
    setTravelInfoTab(tab);
    setIsTravelInfoModalOpen(true);
    trackVisitorEvent('page_view', `여행정보 모달: ${tab}`);
  };

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    const navTitles: Record<NavPage, string> = {
      home: '홈 메인',
      free_travel: '단독 자유여행',
      villa: '독채 풀빌라',
      golf: '골프투어',
      travel_info: '베트남 여행정보 꿀팁',
      reservation: '빠른 견적/예약 신청'
    };
    trackVisitorEvent('page_view', navTitles[page] || page);

    if (page === 'home') {
      setActiveCategory('전체');
      setActiveRegion('전체');
      setActiveCity('전체');
    } else if (page === 'free_travel') {
      setActiveCategory('자유여행');
      setActiveRegion('전체');
      setActiveCity('전체');
    } else if (page === 'villa') {
      setActiveCategory('풀빌라');
      setActiveRegion('전체');
      setActiveCity('전체');
    } else if (page === 'golf') {
      setActiveCategory('골프투어');
      setActiveRegion('전체');
      setActiveCity('전체');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load exchange rate
  const loadRates = async () => {
    setIsRefreshingRates(true);
    try {
      const live = await getLiveExchangeRates();
      setExchangeRates(live);
    } catch (err) {
      console.warn('Live exchange fetch error, keeping current/fallback rates');
    } finally {
      setIsRefreshingRates(false);
    }
  };

  // Sync Data with Database (Supabase / Server)
  const syncAllDataFromServer = async (showLoading: boolean = false) => {
    // If saving right now or recently saved within 15 seconds, skip polling fetch
    if (isSavingToServerRef.current || (Date.now() - lastClientSaveTimestampRef.current < 15000)) {
      return;
    }
    // If admin is currently managing in AdminMode, prevent background polling from overriding active screen
    if (isAdminMode) {
      return;
    }

    if (showLoading && products.length === 0) setIsLoadingProducts(true);
    try {
      const [fetchedProducts, fetchedInquiries] = await Promise.all([
        productService.getProducts({ status: 'published' }),
        inquiryService.getInquiries()
      ]);

      const lastLocalSave = Number(localStorage.getItem('xinchao_products_last_saved') || 0);
      const isLocalModified = lastLocalSave > 0;

      if (Array.isArray(fetchedProducts)) {
        if (!isSavingToServerRef.current && (Date.now() - lastClientSaveTimestampRef.current >= 15000)) {
          if (fetchedProducts.length > 0) {
            if (isLocalModified && products.length > 0) {
              // Local has user-managed products. Ensure server is in sync with latest local products
              productService.syncAllProducts(products).catch(console.warn);
            } else {
              setProducts(fetchedProducts);
              await saveProductsToIndexedDB(fetchedProducts);
              setStoredJson(PRODUCTS_CACHE_KEY, fetchedProducts);
            }
          } else {
            // Server returned 0 items.
            const idbProducts = await loadProductsFromIndexedDB();
            const fallbackLocal = (idbProducts && idbProducts.length > 0)
              ? idbProducts
              : (products.length > 0 ? products : INITIAL_PRODUCTS);

            setProducts(fallbackLocal);
            await saveProductsToIndexedDB(fallbackLocal);
            setStoredJson(PRODUCTS_CACHE_KEY, fallbackLocal);
            productService.syncAllProducts(fallbackLocal).catch(console.warn);
          }
        }
      }

      if (Array.isArray(fetchedInquiries)) {
        if (fetchedInquiries.length > 0) {
          setInquiries(fetchedInquiries);
          await saveInquiriesToIndexedDB(fetchedInquiries);
        } else {
          const localInq = await loadInquiriesFromIndexedDB();
          if (localInq && localInq.length > 0) {
            setInquiries(localInq);
          }
        }
      }
    } catch (err) {
      console.warn('Data sync fallback to local cache:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    // 1. Initial local load from IndexedDB if current state is empty
    const initLocalData = async () => {
      try {
        const idbProducts = await loadProductsFromIndexedDB();
        if (idbProducts && idbProducts.length > 0) {
          setProducts(idbProducts);
          setStoredJson(PRODUCTS_CACHE_KEY, idbProducts);
        }
        const idbInq = await loadInquiriesFromIndexedDB();
        if (idbInq && idbInq.length > 0) {
          setInquiries(idbInq);
        }
      } catch (e) {
        console.warn('IndexedDB initial load error:', e);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    initLocalData();
    trackVisitorEvent('page_view', '신짜오투어 홈페이지 메인');

    loadRates();
    syncAllDataFromServer(false);

    const pollTimer = setInterval(() => {
      syncAllDataFromServer(false);
    }, 20000);

    const handleReSync = () => {
      syncAllDataFromServer(false);
      loadRates();
    };

    window.addEventListener('focus', handleReSync);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        handleReSync();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(pollTimer);
      window.removeEventListener('focus', handleReSync);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const handleSubmitInquiry = async (payload: any): Promise<boolean> => {
    try {
      const created = await inquiryService.createInquiry(payload);
      setInquiries(prev => [created, ...prev]);
      await saveInquiriesToIndexedDB([created, ...inquiries]);
      return true;
    } catch (err) {
      console.warn('Inquiry submit API fallback');
      return false;
    }
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    if (activeCategory !== '전체' && p.category !== activeCategory) {
      return false;
    }
    if (activeRegion !== '전체' && p.region !== activeRegion) {
      return false;
    }
    if (activeCity !== '전체' && p.city !== activeCity) {
      return false;
    }
    if (searchTerm.trim()) {
      const kw = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(kw);
      const matchSub = (p.subTitle || '').toLowerCase().includes(kw);
      const matchCity = p.city.toLowerCase().includes(kw);
      const matchTags = (p.tags || []).some(t => t.toLowerCase().includes(kw));
      if (!matchTitle && !matchSub && !matchCity && !matchTags) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.priceKRW - b.priceKRW;
    if (sortBy === 'price_desc') return b.priceKRW - a.priceKRW;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });

  if (isAdminMode) {
    return (
      <AdminMode
        products={products}
        inquiries={inquiries}
        rates={exchangeRates}
        onSaveProducts={persistProducts}
        onSaveInquiries={handleSaveInquiries}
        onExitAdmin={() => setIsAdminMode(false)}
        onForceSync={() => syncAllDataFromServer(true)}
        isSyncing={isLoadingProducts}
        onPreviewProduct={(prod) => {
          setIsAdminMode(false);
          handleSelectProduct(prod);
        }}
      />
    );
  }

  const renderPageContent = () => {
    if (currentPage === 'travel_info') {
      return (
        <TravelInfoPage
          initialTab={travelInfoTab}
          rates={exchangeRates}
          onOpenConsultation={() => {
            setConsultationTargetProduct(null);
            setIsConsultationOpen(true);
          }}
        />
      );
    }

    if (currentPage === 'reviews') {
      return (
        <ReviewsPage
          onOpenConsultation={(target) => {
            setConsultationTargetProduct(target || null);
            setIsConsultationOpen(true);
          }}
        />
      );
    }

    if (currentPage === 'company') {
      return (
        <CompanyPage
          onOpenConsultation={() => {
            setConsultationTargetProduct(null);
            setIsConsultationOpen(true);
          }}
        />
      );
    }

    if (currentPage === 'reservation') {
      return (
        <ReservationPage
          products={products}
          onSubmitInquiry={handleSubmitInquiry}
        />
      );
    }

    return (
      <div className="flex-1 flex flex-col">
        {/* Hero Carousel (Shown on HOME) */}
        {currentPage === 'home' && (
          <Hero
            onNavigate={handleNavigate}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            onOpenTravelInfo={handleOpenTravelInfo}
          />
        )}

        {/* Category Nav & Regional Filter */}
        <CategoryNav
          activeCategory={activeCategory}
          activeRegion={activeRegion}
          activeCity={activeCity}
          subFilter={subFilter}
          sortBy={sortBy}
          onSelectCategory={setActiveCategory}
          onSelectRegion={setActiveRegion}
          onSelectCity={setActiveCity}
          onSelectSubFilter={setSubFilter}
          onSortChange={setSortBy}
          totalProductsCount={filteredProducts.length}
        />

        {/* Products Grid */}
        <main id="products-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
          {/* Header / Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Palmtree className="w-6 h-6 text-emerald-700" />
                <span>
                  {activeCategory === '전체' ? '베트남 종합 추천 상품' : activeCategory}
                  {activeRegion !== '전체' && ` (${activeRegion} 권역)`}
                  {activeCity !== '전체' && ` - ${activeCity}`}
                </span>
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                엄선된 베트남 단독 전용 차량 및 100% 한국인 전문 가이드 결합 상품
              </p>
            </div>

            {(activeCategory !== '전체' || activeRegion !== '전체' || activeCity !== '전체' || searchTerm) && (
              <button
                onClick={() => {
                  setActiveCategory('전체');
                  setActiveRegion('전체');
                  setActiveCity('전체');
                  setSearchTerm('');
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl self-start sm:self-auto transition-colors cursor-pointer"
              >
                🔄 전체 목록 보기
              </button>
            )}
          </div>

          {/* Loading Indicator */}
          {isLoadingProducts && products.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-600">상품 정보를 불러오는 중입니다...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-4">
              <SearchX className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-extrabold text-slate-800">
                등록된 여행상품이 없습니다.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                관리자 페이지에서 상품을 등록하시거나 1:1 맞춤 상담을 통해 신청해주시면 최적의 견적을 안내해드립니다.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setConsultationTargetProduct(null);
                    setIsConsultationOpen(true);
                  }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs cursor-pointer shadow-sm"
                >
                  💬 1:1 맞춤 여행 견적 문의하기
                </button>
                <button
                  onClick={handleOpenAdmin}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold text-xs cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <PackagePlus className="w-4 h-4" />
                  <span>관리자 상품 등록하기</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={handleSelectProduct}
                  onQuickInquire={(p) => {
                    setConsultationTargetProduct(p);
                    setIsConsultationOpen(true);
                  }}
                  exchangeRates={exchangeRates}
                />
              ))}
            </div>
          )}

          {/* Vietnam Essential Travel Guides Section */}
          <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider">Travel Guide</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>베트남 여행 필수 정보 백과사전</span>
                </h3>
              </div>
              <button
                onClick={() => handleNavigate('travel_info')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>전체 가이드 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { tab: 'course' as TravelInfoTab, label: '지역별 코스', icon: <Compass className="w-5 h-5 text-emerald-600" />, desc: '다낭/하노이/나트랑 추천 동선' },
                { tab: 'weather' as TravelInfoTab, label: '베트남 날씨', icon: <Sun className="w-5 h-5 text-amber-500" />, desc: '도시별 건·우기 & 옷차림' },
                { tab: 'exchange' as TravelInfoTab, label: '실시간 환율', icon: <DollarSign className="w-5 h-5 text-emerald-600" />, desc: '동(VND) 계산법 & 환전 팁' },
                { tab: 'visa' as TravelInfoTab, label: '비자 & 입국', icon: <FileText className="w-5 h-5 text-sky-600" />, desc: '45일 무비자 & 여권 유효기간' },
                { tab: 'food' as TravelInfoTab, label: '대표 먹거리', icon: <Utensils className="w-5 h-5 text-rose-500" />, desc: '쌀국수, 반미, 분짜, 로컬 맛집' },
                { tab: 'tips' as TravelInfoTab, label: '여행 꿀팁', icon: <Lightbulb className="w-5 h-5 text-amber-500" />, desc: '그랩(Grab), 유심, 팁 문화' },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    setTravelInfoTab(item.tab);
                    handleNavigate('travel_info');
                  }}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group cursor-pointer"
                >
                  <div className="mb-2 p-2 rounded-xl bg-slate-50 w-fit group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{item.label}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Trust & Unique Benefits Section */}
          <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="max-w-xl space-y-2">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-full inline-block border border-emerald-500/30">
                  Why XinChaoTour?
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  왜 한국 여행객들은 신짜오투어를 선택할까요?
                </h3>
                <p className="text-xs text-slate-300">
                  거품 없는 현지 직영 시스템으로 가장 안전하고 완벽한 베트남 여행을 약속합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs space-y-2">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  <h4 className="font-black text-sm text-white">100% 단독 전용 차량</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    다른 팀과 합승하지 않는 우리 가족/일행 전용 리무진 밴으로 안락하게 이동합니다.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs space-y-2">
                  <ThumbsUp className="w-7 h-7 text-amber-400" />
                  <h4 className="font-black text-sm text-white">베테랑 한국어 가이드</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    불필요한 쇼핑/옵션 강요 없이 현지 역사와 문화를 친절하고 전문적으로 안내합니다.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs space-y-2">
                  <Clock className="w-7 h-7 text-sky-400" />
                  <h4 className="font-black text-sm text-white">24시간 현지 긴급 지원</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    다낭/하노이 현지 지사에서 여행 중 발생하는 모든 상황에 실시간 한국어로 대응합니다.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs space-y-2">
                  <Palmtree className="w-7 h-7 text-rose-400" />
                  <h4 className="font-black text-sm text-white">엄선된 풀빌라 & 명문 골프</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    직접 답사하여 검증된 프라이빗 독채 풀빌라와 베트남 최고 명문 CC를 보증합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenExchangeModal={() => setIsRateModalOpen(true)}
        onOpenConsultationModal={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
        exchangeRates={exchangeRates}
        totalProductsCount={products.length}
      />

      {/* Main Page Body */}
      {renderPageContent()}

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating Speed Dial Widgets */}
      <FloatingChatWidget
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBookNow={(prod) => {
            setConsultationTargetProduct(prod);
            setIsConsultationOpen(true);
          }}
          exchangeRates={exchangeRates}
        />
      )}

      {isConsultationOpen && (
        <ConsultationModal
          isOpen={isConsultationOpen}
          targetProduct={consultationTargetProduct}
          onClose={() => {
            setIsConsultationOpen(false);
            setConsultationTargetProduct(null);
          }}
          onSubmitSuccess={() => {
            syncAllDataFromServer(false);
          }}
        />
      )}

      {isAiAssistantOpen && (
        <AiTravelAssistantModal
          isOpen={isAiAssistantOpen}
          onClose={() => setIsAiAssistantOpen(false)}
          onSelectProduct={handleSelectProduct}
          products={products}
          rates={exchangeRates}
        />
      )}

      {isQuizOpen && (
        <TravelQuiz
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          products={products}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {isTravelInfoModalOpen && (
        <TravelInfoModal
          isOpen={isTravelInfoModalOpen}
          initialTab={travelInfoTab}
          onClose={() => setIsTravelInfoModalOpen(false)}
          rates={exchangeRates}
        />
      )}

      {isRateModalOpen && (
        <ExchangeRateModal
          isOpen={isRateModalOpen}
          onClose={() => setIsRateModalOpen(false)}
          rates={exchangeRates}
          onRefreshRates={loadRates}
          isRefreshing={isRefreshingRates}
        />
      )}

      {isAdminLoginOpen && (
        <AdminLoginModal
          isOpen={isAdminLoginOpen}
          onClose={() => setIsAdminLoginOpen(false)}
          onSuccess={() => {
            setIsAdminLoginOpen(false);
            setIsAdminMode(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}
