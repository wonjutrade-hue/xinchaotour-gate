import React, { useState, useEffect, useRef } from 'react';
import { Product, Category, Region, City, ConsultationRequest } from './types';
import { Navbar, MainNavPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ConsultationModal } from './components/ConsultationModal';
import { AiTravelAssistantModal } from './components/AiTravelAssistantModal';
import { TravelQuiz } from './components/TravelQuiz';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { Footer } from './components/Footer';
import { ExchangeRateModal } from './components/ExchangeRateModal';
import { TravelInfoPage, TravelInfoTab } from './components/TravelInfoPage';
import { KakaoModal } from './components/KakaoModal';
import { AdminMode } from './components/AdminMode';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ReviewsPage } from './components/ReviewsPage';
import { CompanyPage } from './components/CompanyPage';
import { ReservationPage } from './components/ReservationPage';
import { INITIAL_PRODUCTS, SAMPLE_PRODUCTS } from './data/seedProducts';
import { getLiveExchangeRates, ExchangeRates, DEFAULT_RATES } from './lib/exchangeRate';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  SearchX, 
  Palmtree, 
  CheckCircle2, 
  ThumbsUp, 
  Clock, 
  Heart,
  Award
} from 'lucide-react';

import {
  saveProductsToIndexedDB,
  loadProductsFromIndexedDB,
  saveInquiriesToIndexedDB,
  loadInquiriesFromIndexedDB
} from './lib/indexedDb';

const PRODUCTS_CACHE_KEY = 'xinchao_products_cache_v11';
const DB_INITIALIZED_KEY = 'xinchao_db_initialized_v11';

function getStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed !== null && parsed !== undefined && Array.isArray(parsed) && parsed.length > 0) {
        return parsed as T;
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
    localStorage.setItem(DB_INITIALIZED_KEY, 'true');
  } catch (e) {
    console.warn(`LocalStorage quota warning:`, e);
  }
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = getStoredJson<Product[]>(PRODUCTS_CACHE_KEY, []);
    if (cached && cached.length > 0) return cached;
    return INITIAL_PRODUCTS;
  });
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Sync locks to avoid race conditions with polling
  const lastClientSaveTimestampRef = useRef<number>(0);
  const isSavingToServerRef = useRef<boolean>(false);

  // Active Main Navigation Page
  const [currentPage, setCurrentPage] = useState<MainNavPage>('home');

  // Sync products state to IndexedDB, localStorage, and server backend
  const persistProducts = async (updatedProducts: Product[]): Promise<boolean> => {
    lastClientSaveTimestampRef.current = Date.now();
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

    // 2. Persist to server backend and confirm
    try {
      const res = await fetch('/api/products/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
          await saveProductsToIndexedDB(data.products);
          setStoredJson(PRODUCTS_CACHE_KEY, data.products);
          return true;
        }
      }
    } catch (e) {
      console.warn('Backend sync warning (offline/local mode active):', e);
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

  // Modals & Navigation state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTargetProduct, setConsultationTargetProduct] = useState<Product | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTravelInfoPageOpen, setIsTravelInfoPageOpen] = useState(false);
  const [isTravelInfoOpen, setIsTravelInfoOpen] = useState(false);
  const [travelInfoTab, setTravelInfoTab] = useState<TravelInfoTab>('course');
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);
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

  // Synchronize Browser History with Product Selection & Navigation
  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setIsTravelInfoPageOpen(false);
    try {
      window.history.pushState({ productId: prod.id }, '', `#product-${prod.id}`);
    } catch (e) {
      console.warn('History pushState error:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTravelInfoPage = (tab?: TravelInfoTab) => {
    setSelectedProduct(null);
    setTravelInfoTab(tab || 'course');
    setIsTravelInfoPageOpen(true);
    setIsTravelInfoOpen(false);
    try {
      window.history.pushState({ view: 'travel-info', tab: tab || 'course' }, '', `#guide-${tab || 'course'}`);
    } catch (e) {
      console.warn('History pushState error:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    setIsTravelInfoPageOpen(false);
    try {
      if (window.location.hash.startsWith('#product-') || window.location.hash.startsWith('#guide')) {
        window.history.back();
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
    } catch (e) {
      console.warn('History back error:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: MainNavPage) => {
    setSelectedProduct(null);
    setIsTravelInfoPageOpen(false);
    setIsTravelInfoOpen(false);
    setCurrentPage(page);

    if (page === 'home') {
      setActiveCategory('전체');
    } else if (page === '자유여행') {
      setActiveCategory('자유여행');
    } else if (page === '풀빌라') {
      setActiveCategory('풀빌라');
    } else if (page === '골프여행') {
      setActiveCategory('골프투어');
    }

    try {
      if (page === 'home') {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState({ page }, '', `#${page}`);
      }
    } catch (e) {
      console.warn(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    handleNavigate('home');
    setActiveRegion('전체');
    setActiveCity('전체');
    setSubFilter('전체');
    setSearchTerm('');
    setIsConsultationOpen(false);
    setIsAiAssistantOpen(false);
    setIsQuizOpen(false);
    setIsRateModalOpen(false);
    setIsKakaoModalOpen(false);
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!e.state) {
        if (window.location.hash.startsWith('#guide')) {
          const tabPart = window.location.hash.replace('#guide-', '') as TravelInfoTab;
          setSelectedProduct(null);
          setIsTravelInfoPageOpen(true);
          if (['course', 'weather', 'exchange', 'visa', 'food', 'tips'].includes(tabPart)) {
            setTravelInfoTab(tabPart);
          }
        } else if (window.location.hash.startsWith('#product-')) {
          const pid = window.location.hash.replace('#product-', '');
          const found = products.find(p => p.id === pid);
          if (found) {
            setSelectedProduct(found);
            setIsTravelInfoPageOpen(false);
          }
        } else {
          setSelectedProduct(null);
          setIsTravelInfoPageOpen(false);
        }
      } else if (e.state.productId) {
        const found = products.find(p => p.id === e.state.productId);
        if (found) {
          setSelectedProduct(found);
          setIsTravelInfoPageOpen(false);
        }
      } else if (e.state.view === 'travel-info') {
        setSelectedProduct(null);
        setIsTravelInfoPageOpen(true);
        if (e.state.tab) setTravelInfoTab(e.state.tab);
      } else if (e.state.page) {
        setCurrentPage(e.state.page);
        setSelectedProduct(null);
        setIsTravelInfoPageOpen(false);
      } else {
        setSelectedProduct(null);
        setIsTravelInfoPageOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

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

  // Sync Data with Server and Local DB
  const syncAllDataFromServer = async (showLoading: boolean = false) => {
    if (isSavingToServerRef.current || (Date.now() - lastClientSaveTimestampRef.current < 4000)) {
      return;
    }
    if (showLoading) setIsLoadingProducts(true);
    try {
      const res = await fetch('/api/sync');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (Array.isArray(data.products) && data.products.length > 0) {
            if (!isSavingToServerRef.current && (Date.now() - lastClientSaveTimestampRef.current >= 4000)) {
              setProducts(data.products);
              await saveProductsToIndexedDB(data.products);
              setStoredJson(PRODUCTS_CACHE_KEY, data.products);
            }
          }
          if (Array.isArray(data.inquiries)) {
            setInquiries(data.inquiries);
            await saveInquiriesToIndexedDB(data.inquiries);
          }
          return data;
        }
      }
    } catch (err) {
      console.warn('API sync fallback to individual endpoints:', err);
      await Promise.all([fetchProducts(), fetchInquiries()]);
    } finally {
      if (showLoading) setIsLoadingProducts(false);
    }
  };

  const fetchProducts = async () => {
    if (isSavingToServerRef.current || (Date.now() - lastClientSaveTimestampRef.current < 4000)) {
      return;
    }
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          if (!isSavingToServerRef.current && (Date.now() - lastClientSaveTimestampRef.current >= 4000)) {
            setProducts(data.products);
            await saveProductsToIndexedDB(data.products);
            setStoredJson(PRODUCTS_CACHE_KEY, data.products);
          }
          return;
        }
      }
    } catch (err) {
      console.warn('API fetch fallback to local storage:', err);
    } finally {
      setIsLoadingProducts(false);
    }

    try {
      const fromIndexed = await loadProductsFromIndexedDB();
      if (Array.isArray(fromIndexed) && fromIndexed.length > 0) {
        setProducts(fromIndexed);
        setStoredJson(PRODUCTS_CACHE_KEY, fromIndexed);
      }
    } catch (e) {
      console.warn('Local DB read error:', e);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
        await saveInquiriesToIndexedDB(data.inquiries);
        return;
      }
    } catch (err) {
      console.warn('Failed to fetch inquiries, checking local DB:', err);
    }
    const localInqs = await loadInquiriesFromIndexedDB();
    if (localInqs && localInqs.length > 0) {
      setInquiries(localInqs);
    }
  };

  useEffect(() => {
    loadRates();
    syncAllDataFromServer(true);

    const pollTimer = setInterval(() => {
      syncAllDataFromServer(false);
    }, 6000);

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
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.inquiry) {
        setInquiries(prev => [data.inquiry, ...prev]);
        return true;
      }
    } catch (err) {
      console.warn('Inquiry submit API fallback to local');
    }
    const localInq: ConsultationRequest = {
      ...payload,
      id: `inq-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setInquiries(prev => [localInq, ...prev]);
    saveInquiriesToIndexedDB([localInq, ...inquiries]);
    return true;
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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (cat === '자유여행') setCurrentPage('자유여행');
          else if (cat === '풀빌라') setCurrentPage('풀빌라');
          else if (cat === '골프투어') setCurrentPage('골프여행');
          else setCurrentPage('home');
        }}
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        exchangeRates={exchangeRates}
        onOpenRateCalculator={() => setIsRateModalOpen(true)}
      />

      {/* Main Content Router */}
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBackToList={handleBackToList}
          onOpenConsultation={(p) => {
            setConsultationTargetProduct(p || selectedProduct);
            setIsConsultationOpen(true);
          }}
          exchangeRates={exchangeRates}
          relatedProducts={products.filter(
            p => p.id !== selectedProduct.id && (p.city === selectedProduct.city || p.category === selectedProduct.category)
          )}
          onSelectProduct={handleSelectProduct}
        />
      ) : isTravelInfoPageOpen ? (
        <TravelInfoPage
          initialTab={travelInfoTab}
          rates={exchangeRates}
          onBackToList={handleBackToList}
          onOpenConsultation={() => {
            setConsultationTargetProduct(null);
            setIsConsultationOpen(true);
          }}
        />
      ) : currentPage === '여행후기' ? (
        <ReviewsPage
          onOpenConsultation={(prodTitle) => {
            const matched = products.find(p => p.title === prodTitle);
            setConsultationTargetProduct(matched || null);
            setIsConsultationOpen(true);
          }}
        />
      ) : currentPage === '회사소개' ? (
        <CompanyPage
          onOpenConsultation={() => {
            setConsultationTargetProduct(null);
            setIsConsultationOpen(true);
          }}
        />
      ) : currentPage === '예약문의' ? (
        <ReservationPage
          products={products}
          onSubmitInquiry={handleSubmitInquiry}
        />
      ) : (
        <>
          {/* Hero Carousel Section */}
          {currentPage === 'home' && (
            <Hero
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                if (cat === '자유여행') setCurrentPage('자유여행');
                else if (cat === '풀빌라') setCurrentPage('풀빌라');
                else if (cat === '골프투어') setCurrentPage('골프여행');
              }}
              onOpenQuiz={() => setIsQuizOpen(true)}
              products={products}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {/* Category Nav & Regional Filter */}
          <CategoryNav
            activeCategory={activeCategory}
            activeRegion={activeRegion}
            activeCity={activeCity}
            subFilter={subFilter}
            sortBy={sortBy}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              if (cat === '자유여행') setCurrentPage('자유여행');
              else if (cat === '풀빌라') setCurrentPage('풀빌라');
              else if (cat === '골프투어') setCurrentPage('골프여행');
              else if (cat === '전체') setCurrentPage('home');
            }}
            onSelectRegion={setActiveRegion}
            onSelectCity={setActiveCity}
            onSelectSubFilter={setSubFilter}
            onSortChange={setSortBy}
            totalProductsCount={filteredProducts.length}
          />

          {/* Products Grid */}
          <main id="products-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
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
                    setCurrentPage('home');
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl self-start sm:self-auto transition-colors cursor-pointer"
                >
                  🔄 전체 목록 보기
                </button>
              )}
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-4">
                <SearchX className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-extrabold text-slate-800">
                  해당 조건에 맞는 상품이 없습니다.
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  원하시는 지역이나 일정을 1:1 맞춤 상담을 통해 신청해주시면 최적의 견적을 안내해드립니다.
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

            {/* Trust & Unique Benefits Section */}
            <section className="bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-emerald-400 font-extrabold text-xs tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/30">
                  Why XinChaoTour
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  왜 한국 여행객들은 '신짜오투어'를 선택할까요?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  베트남 현지 직영 운영으로 거품 없는 가격과 24시간 안심 케어를 약속합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-200">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">100% 현지 직영 & 단독 VIP 차량</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    중개 수수료 제로! 다낭, 하노이, 호치민 현지 지사에서 전용 럭셔리 밴과 검증된 한국어 가이드를 직접 배정합니다.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                    <Clock className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">24시간 카카오톡 실시간 케어</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    여행 중 긴급 상황이나 식당 예약, 일정 변경도 카카오톡으로 실시간 신속하게 해결해드립니다.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
                    <ThumbsUp className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">NO 강요 쇼핑 · 최저가 보장</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    불필요한 의무 쇼핑센터 방문 없는 온전한 힐링! 고객 맞춤형 일정으로 감동을 드립니다.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </>
      )}

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={setActiveCategory}
        onSelectRegion={setActiveRegion}
        onGoHome={handleGoHome}
        onOpenAdmin={handleOpenAdmin}
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Floating Action Buttons */}
      <FloatingChatWidget
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Real-time Exchange Rate Modal */}
      <ExchangeRateModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        rates={exchangeRates}
        onRefresh={loadRates}
        isRefreshing={isRefreshingRates}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminMode(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Real-time Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        product={consultationTargetProduct}
        onClose={() => {
          setIsConsultationOpen(false);
          setConsultationTargetProduct(null);
        }}
        onSubmitInquiry={handleSubmitInquiry}
      />

      {/* Interactive Travel Quiz */}
      <TravelQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onCompleteQuiz={(cat, reg) => {
          setActiveCategory(cat);
          setActiveRegion(reg);
          setActiveCity('전체');
          if (cat === '자유여행') setCurrentPage('자유여행');
          else if (cat === '풀빌라') setCurrentPage('풀빌라');
          else if (cat === '골프투어') setCurrentPage('골프여행');
        }}
      />

      {/* KakaoTalk Direct Connect Modal */}
      <KakaoModal
        isOpen={isKakaoModalOpen}
        onClose={() => setIsKakaoModalOpen(false)}
      />
    </div>
  );
}
