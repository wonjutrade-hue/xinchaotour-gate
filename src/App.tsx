import React, { useState, useEffect, useRef } from 'react';
import { Product, Category, Region, City, ConsultationRequest } from './types';
import { Navbar, NavPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav, REGION_CITIES } from './components/CategoryNav';
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
  PackagePlus,
  BookOpen
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
const CURRENT_CATALOG_REVISION = '2026_09_03_v12_restore_user_danang_villas';

function mergeProductsPreservingLocal(localList: Product[], incomingList: Product[]): { merged: Product[]; localWasNewer: boolean } {
  if (!incomingList || incomingList.length === 0) return { merged: localList || [], localWasNewer: false };
  if (!localList || localList.length === 0) return { merged: incomingList || [], localWasNewer: false };

  const localMap = new Map<string, Product>();
  localList.forEach(p => { if (p && p.id) localMap.set(p.id, p); });

  const mergedMap = new Map<string, Product>();
  let localWasNewer = false;

  const isDummyImage = (url: string | undefined) => !url || url === 'VILLA_PHOTO_DATA' || url === 'TEST_IMG';

  // Process incoming from server
  incomingList.forEach(serverProd => {
    if (!serverProd || !serverProd.id) return;
    const localProd = localMap.get(serverProd.id);
    if (!localProd) {
      mergedMap.set(serverProd.id, serverProd);
      return;
    }

    const serverTime = serverProd.updatedAt ? new Date(serverProd.updatedAt).getTime() : (serverProd.createdAt ? new Date(serverProd.createdAt).getTime() : 0);
    const localTime = localProd.updatedAt ? new Date(localProd.updatedAt).getTime() : (localProd.createdAt ? new Date(localProd.createdAt).getTime() : 0);

    // Detect user modifications
    const localHasDifferentImage = Boolean(localProd.imageUrl && localProd.imageUrl !== serverProd.imageUrl && !isDummyImage(localProd.imageUrl));
    const localHasCustomSubs = JSON.stringify(localProd.additionalImages || []) !== JSON.stringify(serverProd.additionalImages || []);
    const localHasCustomDesc = Boolean(localProd.description && localProd.description !== serverProd.description);
    const localHasCustomTitle = Boolean(localProd.title && localProd.title !== serverProd.title);
    const localHasCustomPrice = Boolean(localProd.priceKRW && localProd.priceKRW !== serverProd.priceKRW);
    const localHasCustomItinerary = JSON.stringify(localProd.itinerary || []) !== JSON.stringify(serverProd.itinerary || []);
    const localHasCustomIncluded = JSON.stringify(localProd.included || []) !== JSON.stringify(serverProd.included || []);
    const localHasCustomHighlights = JSON.stringify(localProd.highlights || []) !== JSON.stringify(serverProd.highlights || []);

    const hasLocalCustomizations = localHasDifferentImage || localHasCustomSubs || localHasCustomDesc || localHasCustomTitle || localHasCustomPrice || localHasCustomItinerary || localHasCustomIncluded || localHasCustomHighlights;

    if (localTime > serverTime || (localTime === serverTime && hasLocalCustomizations) || (hasLocalCustomizations && !isDummyImage(localProd.imageUrl))) {
      // Local user edits have higher priority!
      mergedMap.set(localProd.id, localProd);
      localWasNewer = true;
    } else {
      // Server is newer; but preserve user uploaded image if server somehow lacks it
      if (localHasDifferentImage && isDummyImage(serverProd.imageUrl)) {
        mergedMap.set(serverProd.id, {
          ...serverProd,
          imageUrl: localProd.imageUrl,
          additionalImages: localProd.additionalImages && localProd.additionalImages.length > 0 ? localProd.additionalImages : serverProd.additionalImages
        });
        localWasNewer = true;
      } else {
        mergedMap.set(serverProd.id, serverProd);
      }
    }
  });

  // Preserve any local custom products newly added in admin mode
  localList.forEach(localProd => {
    if (localProd && localProd.id && !mergedMap.has(localProd.id)) {
      mergedMap.set(localProd.id, localProd);
      localWasNewer = true;
    }
  });

  return { merged: Array.from(mergedMap.values()), localWasNewer };
}

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
    // If saving right now or recently saved within 30 seconds, skip polling fetch
    if (isSavingToServerRef.current || (Date.now() - lastClientSaveTimestampRef.current < 30000)) {
      return;
    }
    // If admin is actively editing in AdminMode, prevent background polling from overriding active form
    if (isAdminMode) {
      return;
    }

    if (showLoading && products.length === 0) setIsLoadingProducts(true);
    try {
      const [fetchedProducts, fetchedInquiries] = await Promise.all([
        productService.getProducts({ status: 'published' }),
        inquiryService.getInquiries()
      ]);

      if (Array.isArray(fetchedProducts)) {
        if (!isSavingToServerRef.current && (Date.now() - lastClientSaveTimestampRef.current >= 30000)) {
          if (fetchedProducts.length > 0) {
            setProducts(currentProducts => {
              const { merged, localWasNewer } = mergeProductsPreservingLocal(currentProducts, fetchedProducts);
              saveProductsToIndexedDB(merged).catch(console.warn);
              setStoredJson(PRODUCTS_CACHE_KEY, merged);
              if (localWasNewer) {
                // If local had newer edits or photos, sync them back to server immediately
                productService.syncAllProducts(merged).catch(console.warn);
              }
              return merged;
            });
          } else {
            // Server returned 0 items -> check local backup or seed
            const idbProducts = await loadProductsFromIndexedDB();
            const fallbackLocal = (idbProducts && idbProducts.length > 0)
              ? idbProducts
              : (products.length > 0 ? products : INITIAL_PRODUCTS);

            if (fallbackLocal.length > 0) {
              setProducts(fallbackLocal);
              await saveProductsToIndexedDB(fallbackLocal);
              setStoredJson(PRODUCTS_CACHE_KEY, fallbackLocal);
              productService.syncAllProducts(fallbackLocal).catch(console.warn);
            }
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
    // 1. Initial local load with Revision-based auto cache update
    const initLocalData = async () => {
      try {
        // Load both IndexedDB and localStorage cache
        const idbProducts = await loadProductsFromIndexedDB();
        const cachedProducts = getStoredJson<Product[]>(PRODUCTS_CACHE_KEY, []);
        
        let localMaster: Product[] = [];
        if (idbProducts && idbProducts.length > 0 && cachedProducts && cachedProducts.length > 0) {
          localMaster = mergeProductsPreservingLocal(cachedProducts, idbProducts).merged;
        } else if (idbProducts && idbProducts.length > 0) {
          localMaster = idbProducts;
        } else if (cachedProducts && cachedProducts.length > 0) {
          localMaster = cachedProducts;
        }

        if (localMaster.length > 0) {
          setProducts(localMaster);
          setStoredJson(PRODUCTS_CACHE_KEY, localMaster);
        }

        // Fetch server updates in background; merge preserving local without wiping
        await syncAllDataFromServer(localMaster.length === 0);
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

  // Safe Guard: If activeRegion is '중부' while activeCity is '나트랑' (which was moved to 남부), automatically switch region to '남부'
  useEffect(() => {
    if (activeRegion === '중부' && (activeCity === '나트랑' as any)) {
      setActiveRegion('남부');
    }
  }, [activeRegion, activeCity]);

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
    // 1. Category Filter
    if (activeCategory !== '전체') {
      if (activeCategory === '자유여행') {
        // 단독 자유여행 탭: 자유여행 상품뿐 아니라 단독/올인원/투어/콤보팩 및 나트랑·달랏 연계 투어도 모두 포함
        const isFree =
          p.category === '자유여행' ||
          p.category === '추천패키지' ||
          (p.tags && p.tags.some(t => t.includes('자유') || t.includes('단독') || t.includes('올인원') || t.includes('투어') || t.includes('콤보'))) ||
          p.title.includes('자유') || p.title.includes('단독') || p.title.includes('올인원') || p.title.includes('투어') || p.title.includes('콤보');
        if (!isFree) return false;
      } else if (activeCategory === '추천패키지') {
        const isPkg =
          p.category === '추천패키지' ||
          (p.tags && p.tags.some(t => t.includes('패키지') || t.includes('올인원') || t.includes('투어') || t.includes('3박') || t.includes('4박'))) ||
          p.title.includes('패키지') || p.title.includes('올인원') || p.title.includes('3박') || p.title.includes('4박');
        if (!isPkg) return false;
      } else if (p.category !== activeCategory) {
        return false;
      }
    }

    // 2. City Filter (Direct Match - cross-cutting for multi-city combo tours)
    if (activeCity !== '전체') {
      const isNhaTrang =
        activeCity === '나트랑' &&
        (p.city === '나트랑' ||
          p.title.includes('나트랑') ||
          p.title.includes('나짱') ||
          (p.subTitle && (p.subTitle.includes('나트랑') || p.subTitle.includes('나짱'))) ||
          (p.tags && p.tags.some(t => t.includes('나트랑') || t.includes('나짱'))));

      const isDalat =
        activeCity === '달랏' &&
        (p.city === '달랏' ||
          p.title.includes('달랏') ||
          (p.subTitle && p.subTitle.includes('달랏')) ||
          (p.tags && p.tags.some(t => t.includes('달랏'))));

      const isDaNang =
        activeCity === '다낭' &&
        (p.city === '다낭' ||
          p.title.includes('다낭') ||
          p.title.includes('호이안') ||
          (p.tags && p.tags.some(t => t.includes('다낭') || t.includes('호이안'))));

      const defaultCityMatch =
        p.city === activeCity ||
        p.title.includes(activeCity) ||
        (p.subTitle && p.subTitle.includes(activeCity)) ||
        (p.tags && p.tags.some(t => t.includes(activeCity)));

      if (!isNhaTrang && !isDalat && !isDaNang && !defaultCityMatch) {
        return false;
      }
    } else if (activeRegion !== '전체') {
      // 3. Region Filter (When specific city is '전체')
      const regionCities = REGION_CITIES[activeRegion] || [];
      const regionMatches =
        p.region === activeRegion ||
        regionCities.includes(p.city as City) ||
        (activeRegion === '중부' && (p.city === '다낭' || p.city === '호이안' || p.city === '후에' || p.title.includes('다낭') || p.title.includes('호이안') || p.title.includes('후에'))) ||
        (activeRegion === '남부' && (p.city === '나트랑' || p.city === '달랏' || p.city === '푸꾸옥' || p.city === '호치민' || p.city === '무이네' || p.title.includes('달랏') || p.title.includes('푸꾸옥') || p.title.includes('나트랑') || p.title.includes('나짱') || p.title.includes('호치민') || p.title.includes('무이네')));
      if (!regionMatches) return false;
    }

    // 4. Search Filter
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

        {/* Quick Tropical Theme Highlights (Shown on HOME) */}
        {currentPage === 'home' && activeCategory === '전체' && activeRegion === '전체' && !searchTerm && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-teal-600 font-extrabold text-xs uppercase tracking-wider">XinChao Curated Themes</span>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>🌴 시원하고 특별한 베트남 추천 테마</span>
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                취향에 맞는 테마를 선택해보세요
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Theme 1: Emerald Pool Villa */}
              <button
                onClick={() => {
                  setActiveCategory('풀빌라');
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-4 sm:p-5 text-white text-left shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-teal-300/30"
              >
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/15 rounded-full blur-sm group-hover:scale-125 transition-transform" />
                <span className="text-2xl sm:text-3xl mb-2 block">🏰</span>
                <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black text-teal-100 mb-1 backdrop-blur-xs">
                  오션뷰 · 프라이빗
                </span>
                <h4 className="font-black text-sm sm:text-base leading-tight text-white drop-shadow-xs">
                  독채 럭셔리 풀빌라
                </h4>
                <p className="text-[11px] text-teal-100 mt-1 line-clamp-1 font-medium">
                  다낭 · 나트랑 · 푸꾸옥 전용풀
                </p>
              </button>

              {/* Theme 2: 90Holes Championship Golf */}
              <button
                onClick={() => {
                  setActiveCategory('골프투어');
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 sm:p-5 text-white text-left shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-amber-300/30"
              >
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/15 rounded-full blur-sm group-hover:scale-125 transition-transform" />
                <span className="text-2xl sm:text-3xl mb-2 block">⛳</span>
                <span className="inline-block px-2 py-0.5 rounded-full bg-slate-950/30 text-[10px] font-black text-amber-200 mb-1 backdrop-blur-xs">
                  1인1캐디 · 명문CC
                </span>
                <h4 className="font-black text-sm sm:text-base leading-tight text-white drop-shadow-xs">
                  챔피언십 골프투어
                </h4>
                <p className="text-[11px] text-amber-100 mt-1 line-clamp-1 font-medium">
                  바나힐 · BRG · 호이아나 라운딩
                </p>
              </button>

              {/* Theme 3: 100% Private Free Travel */}
              <button
                onClick={() => {
                  setActiveCategory('자유여행');
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-4 sm:p-5 text-white text-left shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-sky-300/30"
              >
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/15 rounded-full blur-sm group-hover:scale-125 transition-transform" />
                <span className="text-2xl sm:text-3xl mb-2 block">🛫</span>
                <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black text-sky-100 mb-1 backdrop-blur-xs">
                  노쇼핑 · 단독 VIP
                </span>
                <h4 className="font-black text-sm sm:text-base leading-tight text-white drop-shadow-xs">
                  우리끼리 단독 자유여행
                </h4>
                <p className="text-[11px] text-sky-100 mt-1 line-clamp-1 font-medium">
                  전용차량 + 한국어 가이드 케어
                </p>
              </button>

              {/* Theme 4: Halong Bay & Central Heritage */}
              <button
                onClick={() => {
                  setActiveRegion('북부');
                  setActiveCategory('전체');
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-teal-600 to-emerald-500 p-4 sm:p-5 text-white text-left shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-teal-300/30"
              >
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/15 rounded-full blur-sm group-hover:scale-125 transition-transform" />
                <span className="text-2xl sm:text-3xl mb-2 block">🚢</span>
                <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black text-teal-100 mb-1 backdrop-blur-xs">
                  유네스코 5성 크루즈
                </span>
                <h4 className="font-black text-sm sm:text-base leading-tight text-white drop-shadow-xs">
                  하롱베이 & 자연 비경
                </h4>
                <p className="text-[11px] text-teal-100 mt-1 line-clamp-1 font-medium">
                  에메랄드빛 바다 & 카약 힐링
                </p>
              </button>
            </div>
          </section>
        )}

        {/* Vietnam Full Destination Encyclopedia Section (From Fansipan & Ban Gioc to Phu Quoc) */}
        {currentPage === 'home' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
            <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-teal-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs rounded-full inline-block border border-emerald-500/30">
                      🗺️ Vietnam All Destinations Guide
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1.5 tracking-tight">
                      베트남 전역 대표 관광지 도감 (판시판·하장·반족폭포 ~ 푸꾸옥)
                    </h3>
                    <p className="text-xs sm:text-sm text-teal-200/90 font-medium mt-1">
                      베트남 전문 여행가가 엄선한 북부 대자연부터 남부 청정 휴양섬까지 베트남 10대 핵심 명소
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavigate('travel_info')}
                      className="text-xs font-black bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      <span>여행 가이드 백과</span>
                    </button>
                  </div>
                </div>

                {/* 14 Representative Destination Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-3.5">
                  {[
                    {
                      name: '사파 (Sapa)',
                      spot: '판시판 3,143m',
                      zone: '북부',
                      zoneBg: 'bg-sky-500/30 text-sky-200 border-sky-400/40',
                      desc: '인도차이나의 지붕 & 깟깟마을 다랑이논',
                      tag: '🏔️ 구름바다',
                      filterRegion: '북부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '하장 (Ha Giang)',
                      spot: '마피렝 협곡',
                      zone: '북부',
                      zoneBg: 'bg-sky-500/30 text-sky-200 border-sky-400/40',
                      desc: '베트남 4대 고개 & 옥빛 뇨꿰강 보트투어',
                      tag: '🏞️ 대협곡',
                      filterRegion: '북부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '까오방 (Cao Bang)',
                      spot: '반족 폭포',
                      zone: '북부',
                      zoneBg: 'bg-sky-500/30 text-sky-200 border-sky-400/40',
                      desc: '아시아 최대 3단 웅장한 국경 폭포 뗏목',
                      tag: '🌊 국경폭포',
                      filterRegion: '북부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '닌빈 (Ninh Binh)',
                      spot: '짱안 & 땀꼭',
                      zone: '북부',
                      zoneBg: 'bg-sky-500/30 text-sky-200 border-sky-400/40',
                      desc: '육지의 하롱베이 유네스코 나룻배 비경',
                      tag: '🚣 동굴유람',
                      filterRegion: '북부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '하롱베이 (Ha Long)',
                      spot: '5성 럭셔리 크루즈',
                      zone: '북부',
                      zoneBg: 'bg-sky-500/30 text-sky-200 border-sky-400/40',
                      desc: '3천여 개 기암괴석 품은 세계자연유산',
                      tag: '🚢 5성크루즈',
                      filterRegion: '북부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '다낭 (Da Nang)',
                      spot: '바나힐 & 골든브릿지',
                      zone: '중부',
                      zoneBg: 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40',
                      desc: '해발 1,487m 천공의 손 & 미케비치 휴양',
                      tag: '✨ 자유1위',
                      filterRegion: '중부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '호이안 (Hoi An)',
                      spot: '유네스코 올드타운',
                      zone: '중부',
                      zoneBg: 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40',
                      desc: '오색 홍등 야경 & 투본강 소원배 힐링',
                      tag: '🏮 천년고도',
                      filterRegion: '중부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '달랏 (Da Lat)',
                      spot: '봄의 고원 & 호수',
                      zone: '남중부',
                      zoneBg: 'bg-teal-500/30 text-teal-200 border-teal-400/40',
                      desc: '쓰엉흐엉 호수 & 다딴라 알파인코스터',
                      tag: '🌸 봄의도시',
                      filterRegion: '남중부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '나트랑 (Nha Trang)',
                      spot: '에메랄드 비치 & 스파',
                      zone: '남중부',
                      zoneBg: 'bg-teal-500/30 text-teal-200 border-teal-400/40',
                      desc: '300일 햇살의 나폴리 & 머드온천 힐링',
                      tag: '🏖️ 청정호핑',
                      filterRegion: '남중부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '무이네 (Mui Ne)',
                      spot: '화이트 샌드듄 사막',
                      zone: '남부',
                      zoneBg: 'bg-amber-500/30 text-amber-200 border-amber-400/40',
                      desc: '황금빛 사막 일출 지프 사파리 & 요정샘',
                      tag: '🏜️ 사막지프',
                      filterRegion: '남부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '푸꾸옥 (Phu Quoc)',
                      spot: '해상케이블카 & 선셋',
                      zone: '남부',
                      zoneBg: 'bg-amber-500/30 text-amber-200 border-amber-400/40',
                      desc: '세계 최장 7,899m 케이블카 & 사오비치',
                      tag: '🌅 선셋휴양',
                      filterRegion: '남부' as Region,
                      filterCategory: '자유여행' as Category
                    },
                    {
                      name: '명문 골프 (Golf)',
                      spot: '챔피언십 90홀 라운딩',
                      zone: '골프',
                      zoneBg: 'bg-amber-500/30 text-amber-200 border-amber-400/40',
                      desc: '바나힐CC · 호이아나 · BRG 명문 코스',
                      tag: '⛳ 1인1캐디',
                      filterRegion: '전체' as Region,
                      filterCategory: '골프투어' as Category
                    },
                    {
                      name: '해변 풀빌라 (Beach)',
                      spot: '오션프론트 독채 수영장',
                      zone: '풀빌라',
                      zoneBg: 'bg-teal-500/30 text-teal-200 border-teal-400/40',
                      desc: '미케비치 바로 앞 인피니티 프라이빗 풀',
                      tag: '🌊 오션뷰',
                      filterRegion: '중부' as Region,
                      filterCategory: '풀빌라' as Category
                    },
                    {
                      name: '도심 풀빌라 (City)',
                      spot: '시크릿 가든 독채 힐링',
                      zone: '풀빌라',
                      zoneBg: 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40',
                      desc: '시내 중심가 위치 & 야간 조명 수영장',
                      tag: '🏰 프라이빗',
                      filterRegion: '중부' as Region,
                      filterCategory: '풀빌라' as Category
                    },
                  ].map((dest, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveRegion(dest.filterRegion);
                        setActiveCategory(dest.filterCategory);
                        const el = document.getElementById('products-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white/10 hover:bg-white/20 border border-white/15 hover:border-teal-400/60 p-3 rounded-2xl text-left transition-all group cursor-pointer backdrop-blur-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${dest.zoneBg}`}>
                            {dest.zone}
                          </span>
                          <span className="text-[10px] text-amber-300 font-extrabold">{dest.tag}</span>
                        </div>
                        <h4 className="font-black text-white text-xs group-hover:text-teal-300 transition-colors leading-tight">
                          {dest.name}
                        </h4>
                        <p className="text-[11px] font-bold text-amber-200 mt-0.5 leading-tight">
                          {dest.spot}
                        </p>
                        <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-snug">
                          {dest.desc}
                        </p>
                      </div>
                      <div className="mt-2.5 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-teal-300 font-black group-hover:translate-x-0.5 transition-transform">
                        <span>상품 보기</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <main id="products-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
          {/* Header / Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Palmtree className="w-6 h-6 text-teal-600" />
                <span>
                  {activeCategory === '전체' ? '베트남 종합 추천 상품' : activeCategory}
                  {activeRegion !== '전체' && ` (${activeRegion} 권역)`}
                  {activeCity !== '전체' && ` - ${activeCity}`}
                </span>
              </h2>
              <p className="text-xs font-bold text-teal-800 mt-0.5">
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
                className="text-xs font-black text-teal-800 hover:text-teal-950 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto transition-all cursor-pointer shadow-2xs"
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
          <section className="bg-gradient-to-br from-teal-50/70 via-sky-50/50 to-emerald-50/70 rounded-3xl p-6 sm:p-8 border border-teal-100/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-teal-700 font-extrabold text-xs uppercase tracking-wider">Vietnam Travel Guide</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>📖 베트남 여행 필수 정보 백과사전</span>
                </h3>
              </div>
              <button
                onClick={() => handleNavigate('travel_info')}
                className="text-xs font-black text-teal-700 hover:text-teal-900 flex items-center gap-1 self-start sm:self-auto cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-teal-200 shadow-2xs hover:shadow-xs transition-all"
              >
                <span>전체 가이드 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { tab: 'course' as TravelInfoTab, label: '지역별 코스', icon: <Compass className="w-5 h-5 text-teal-600" />, desc: '다낭/하노이/나트랑 추천 동선' },
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
                  className="bg-white p-4 rounded-2xl border border-teal-100 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10 transition-all text-left group cursor-pointer"
                >
                  <div className="mb-2 p-2.5 rounded-xl bg-teal-50 w-fit group-hover:scale-110 group-hover:bg-teal-100 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">{item.label}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Trust & Unique Benefits Section */}
          <section className="bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl border border-teal-500/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="max-w-xl space-y-2">
                <span className="px-3.5 py-1 bg-emerald-500/25 text-emerald-300 font-black text-xs rounded-full inline-block border border-emerald-400/40">
                  ✨ Why XinChaoTour?
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                  왜 한국 여행객들은 신짜오투어를 선택할까요?
                </h3>
                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
                  거품 없는 100% 현지 직영 시스템으로 가장 안전하고 완벽한 베트남 여행을 약속합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 border border-white/15 p-4 sm:p-5 rounded-2xl backdrop-blur-md space-y-2 hover:bg-white/15 transition-all">
                  <ShieldCheck className="w-8 h-8 text-emerald-300" />
                  <h4 className="font-black text-sm sm:text-base text-white">100% 단독 전용 차량</h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    다른 팀과 합승하지 않는 우리 가족/일행 전용 리무진 밴으로 안락하게 이동합니다.
                  </p>
                </div>

                <div className="bg-white/10 border border-white/15 p-4 sm:p-5 rounded-2xl backdrop-blur-md space-y-2 hover:bg-white/15 transition-all">
                  <ThumbsUp className="w-8 h-8 text-amber-300" />
                  <h4 className="font-black text-sm sm:text-base text-white">베테랑 한국어 가이드</h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    불필요한 쇼핑/옵션 강요 없이 현지 역사와 문화를 친절하고 전문적으로 안내합니다.
                  </p>
                </div>

                <div className="bg-white/10 border border-white/15 p-4 sm:p-5 rounded-2xl backdrop-blur-md space-y-2 hover:bg-white/15 transition-all">
                  <Clock className="w-8 h-8 text-sky-300" />
                  <h4 className="font-black text-sm sm:text-base text-white">24시간 현지 긴급 지원</h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    다낭/하노이 현지 지사에서 여행 중 발생하는 모든 상황에 실시간 한국어로 대응합니다.
                  </p>
                </div>

                <div className="bg-white/10 border border-white/15 p-4 sm:p-5 rounded-2xl backdrop-blur-md space-y-2 hover:bg-white/15 transition-all">
                  <Palmtree className="w-8 h-8 text-rose-300" />
                  <h4 className="font-black text-sm sm:text-base text-white">엄선된 풀빌라 & 명문 골프</h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
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
          product={products.find(p => p.id === selectedProduct.id) || selectedProduct}
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
