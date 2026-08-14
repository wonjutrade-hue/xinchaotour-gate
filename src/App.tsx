import React, { useState, useEffect } from 'react';
import { Product, Category, Region, City, ConsultationRequest } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ConsultationModal } from './components/ConsultationModal';
import { AiTravelAssistantModal } from './components/AiTravelAssistantModal';
import { AdminPanel } from './components/AdminPanel';
import { TravelQuiz } from './components/TravelQuiz';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { Footer } from './components/Footer';
import { ExchangeRateModal } from './components/ExchangeRateModal';
import { TravelInfoModal, TravelInfoTab } from './components/TravelInfoModal';
import { KakaoModal } from './components/KakaoModal';
import { INITIAL_PRODUCTS } from './data/seedProducts';
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

const PRODUCTS_CACHE_KEY = 'xinchao_products_cache_v6';

function getStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed !== null && parsed !== undefined && Array.isArray(parsed) && parsed.length > 0) return parsed as T;
    }
  } catch (e) {
    console.warn(`Failed to parse localStorage key ${key}:`, e);
  }
  return fallback;
}

function setStoredJson(key: string, data: any) {
  try {
    // Only attempt localStorage if data string length is reasonable (< 2MB)
    const jsonStr = JSON.stringify(data);
    if (jsonStr.length < 2500000) {
      localStorage.setItem(key, jsonStr);
    }
  } catch (e) {
    console.warn(`LocalStorage quota exceeded, relying on IndexedDB:`, e);
  }
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    return getStoredJson<Product[]>(PRODUCTS_CACHE_KEY, INITIAL_PRODUCTS);
  });
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Sync products state to IndexedDB and localStorage
  useEffect(() => {
    if (products && products.length > 0) {
      saveProductsToIndexedDB(products);
      setStoredJson(PRODUCTS_CACHE_KEY, products);
    }
  }, [products]);

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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTravelInfoOpen, setIsTravelInfoOpen] = useState(false);
  const [travelInfoTab, setTravelInfoTab] = useState<TravelInfoTab>('course');
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);

  // Synchronize Browser History with Product Selection (Enables native top back arrow & in-app back buttons)
  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    try {
      window.history.pushState({ productId: prod.id }, '', `#product-${prod.id}`);
    } catch (e) {
      console.warn('History pushState error:', e);
    }
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    try {
      if (window.location.hash.startsWith('#product-')) {
        window.history.back();
      }
    } catch (e) {
      console.warn('History back error:', e);
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!e.state || !e.state.productId) {
        setSelectedProduct(null);
      } else if (e.state && e.state.productId) {
        const found = products.find(p => p.id === e.state.productId);
        if (found) {
          setSelectedProduct(found);
        } else {
          setSelectedProduct(null);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  useEffect(() => {
    const handleOpenKakaoModal = () => setIsKakaoModalOpen(true);
    window.addEventListener('open-kakao-modal', handleOpenKakaoModal);
    return () => window.removeEventListener('open-kakao-modal', handleOpenKakaoModal);
  }, []);

  // Fetch Exchange Rates
  const loadRates = async () => {
    setIsRefreshingRates(true);
    const rates = await getLiveExchangeRates();
    setExchangeRates(rates);
    setIsRefreshingRates(false);
  };

  // Fetch Products & Inquiries from Express backend + IndexedDB
  const fetchProducts = async () => {
    try {
      // First load from fast local IndexedDB
      const localDbProducts = await loadProductsFromIndexedDB();
      if (localDbProducts && Array.isArray(localDbProducts) && localDbProducts.length > 0) {
        setProducts(localDbProducts);
      }

      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        await saveProductsToIndexedDB(data.products);
        setStoredJson(PRODUCTS_CACHE_KEY, data.products);
      }
    } catch (err) {
      console.warn('API fetch failed, falling back to IndexedDB/cached products');
      const localDbProducts = await loadProductsFromIndexedDB();
      if (localDbProducts && Array.isArray(localDbProducts)) {
        setProducts(localDbProducts);
      } else {
        const cached = getStoredJson<Product[]>(PRODUCTS_CACHE_KEY, []);
        if (cached && Array.isArray(cached)) {
          setProducts(cached);
        }
      }
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const localInqs = await loadInquiriesFromIndexedDB();
      if (localInqs && localInqs.length > 0) {
        setInquiries(localInqs);
      }

      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
        await saveInquiriesToIndexedDB(data.inquiries);
      }
    } catch (err) {
      console.warn('Failed to fetch inquiries, using local DB');
      const localInqs = await loadInquiriesFromIndexedDB();
      if (localInqs && localInqs.length > 0) {
        setInquiries(localInqs);
      }
    }
  };

  useEffect(() => {
    loadRates();
    fetchProducts();
    fetchInquiries();
  }, []);

  // API Actions
  const handleAddProduct = async (newProd: Omit<Product, 'id'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(prev => {
          const updated = [data.product, ...prev.filter(p => p.id !== data.product.id)];
          saveProductsToIndexedDB(updated);
          setStoredJson(PRODUCTS_CACHE_KEY, updated);
          return updated;
        });
        return data.product;
      } else {
        throw new Error(data.error || '상품 추가에 실패했습니다.');
      }
    } catch (err: any) {
      console.error('API add product failed:', err);
      // Fallback: save to client state & IndexedDB even if network fails
      const fallbackProd: Product = {
        ...newProd,
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setProducts(prev => {
        const updated = [fallbackProd, ...prev];
        saveProductsToIndexedDB(updated);
        return updated;
      });
      return fallbackProd;
    }
  };

  const handleUpdateProduct = async (id: string, updated: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.success && data.product) {
        setProducts(prev => {
          const updatedList = prev.map(p => (p.id === id ? data.product : p));
          saveProductsToIndexedDB(updatedList);
          setStoredJson(PRODUCTS_CACHE_KEY, updatedList);
          return updatedList;
        });
        return data.product;
      } else {
        throw new Error(data.error || '상품 수정에 실패했습니다.');
      }
    } catch (err: any) {
      console.error('API update failed:', err);
      // Fallback: update in local state & IndexedDB
      setProducts(prev => {
        const updatedList = prev.map(p => (p.id === id ? { ...p, ...updated } : p));
        saveProductsToIndexedDB(updatedList);
        return updatedList;
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API delete failed:', err);
    }

    setProducts(prev => {
      const updatedList = prev.filter(p => p.id !== id);
      saveProductsToIndexedDB(updatedList);
      setStoredJson(PRODUCTS_CACHE_KEY, updatedList);
      return updatedList;
    });
  };

  const handleResetProducts = async () => {
    try {
      const res = await fetch('/api/products/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        await saveProductsToIndexedDB(data.products);
        setStoredJson(PRODUCTS_CACHE_KEY, data.products);
        return;
      }
    } catch (err) {
      console.warn('API reset failed');
    }
    setProducts([...INITIAL_PRODUCTS]);
    await saveProductsToIndexedDB([...INITIAL_PRODUCTS]);
    setStoredJson(PRODUCTS_CACHE_KEY, INITIAL_PRODUCTS);
  };

  const handleClearAllProducts = async () => {
    try {
      await fetch('/api/products/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [], replaceExisting: true })
      });
    } catch (e) {
      console.warn('Clear all API error:', e);
    }
    setProducts([]);
    await saveProductsToIndexedDB([]);
    setStoredJson(PRODUCTS_CACHE_KEY, []);
  };

  const handleImportProducts = async (items: any[], replace: boolean) => {
    try {
      const res = await fetch('/api/products/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, replaceExisting: replace })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        await saveProductsToIndexedDB(data.products);
        setStoredJson(PRODUCTS_CACHE_KEY, data.products);
        return;
      }
    } catch (err) {
      console.warn('API import failed');
    }

    const formattedItems: Product[] = items.map((it, idx) => ({
      ...it,
      id: it.id || `imp-${Date.now()}-${idx}`
    }));

    setProducts(prev => {
      const newList = replace ? formattedItems : [...formattedItems, ...prev];
      saveProductsToIndexedDB(newList);
      setStoredJson(PRODUCTS_CACHE_KEY, newList);
      return newList;
    });
  };

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
      console.warn('Inquiry submit API failed');
    }
    // Fallback local inquiry append
    const localInq = { ...payload, id: `inq-${Date.now()}`, status: 'pending', createdAt: new Date().toISOString() };
    setInquiries(prev => [localInq, ...prev]);
    return true;
  };

  const handleUpdateInquiryStatus = async (id: string, status: ConsultationRequest['status']) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.warn('API inquiry update failed');
    }
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    // Category match
    if (activeCategory !== '전체' && p.category !== activeCategory) {
      return false;
    }
    // Region match
    if (activeRegion !== '전체' && p.region !== activeRegion) {
      return false;
    }
    // City match
    if (activeCity !== '전체' && p.city !== activeCity) {
      return false;
    }
    // Sub-filter match
    if (subFilter !== '전체') {
      if (activeCategory === '자유여행') {
        if (subFilter === '1일투어' && !p.duration.includes('1일') && !p.duration.includes('당일')) return false;
        if (subFilter === '3박4일' && !p.duration.includes('3박')) return false;
        if (subFilter === '4박5일' && !p.duration.includes('4박')) return false;
      } else if (activeCategory === '골프투어') {
        if (subFilter === '18홀' && p.golfSpecs?.holes !== 18) return false;
        if (subFilter === '54홀' && p.golfSpecs?.holes !== 54) return false;
        if (subFilter === '72홀' && p.golfSpecs?.holes !== 72) return false;
      } else if (activeCategory === '풀빌라') {
        if (subFilter === '1_2bed' && (p.villaSpecs?.bedrooms || 0) > 2) return false;
        if (subFilter === '3_4bed' && (p.villaSpecs?.bedrooms || 0) < 3) return false;
        if (subFilter === 'ocean' && !p.villaSpecs?.oceanView) return false;
      }
    }
    // Search keyword match
    if (searchTerm.trim()) {
      const kw = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(kw);
      const matchSub = p.subTitle.toLowerCase().includes(kw);
      const matchCity = p.city.toLowerCase().includes(kw);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(kw));
      if (!matchTitle && !matchSub && !matchCity && !matchTags) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.priceKRW - b.priceKRW;
    if (sortBy === 'price_desc') return b.priceKRW - a.priceKRW;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Popularity default
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        activeRegion={activeRegion}
        activeCity={activeCity}
        onSelectCategory={setActiveCategory}
        onSelectRegion={setActiveRegion}
        onSelectCity={setActiveCity}
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        exchangeRates={exchangeRates}
        onOpenRateCalculator={() => setIsRateModalOpen(true)}
        onOpenTravelInfo={(tab) => {
          setTravelInfoTab(tab || 'course');
          setIsTravelInfoOpen(true);
        }}
        inquiriesCount={inquiries.filter(i => i.status === 'pending' || !i.status).length || inquiries.length}
      />

      {/* Conditional: Full Page Product Detail View OR Main Marketplace */}
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
          onEditProduct={() => setIsAdminOpen(true)}
          onDeleteProduct={handleDeleteProduct}
        />
      ) : (
        <>
          {/* Hero Carousel Section */}
          <Hero
            onSelectCategory={setActiveCategory}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />

          {/* Category Nav & Regional Breakdown Filter */}
          <CategoryNav
            activeCategory={activeCategory}
            activeRegion={activeRegion}
            activeCity={activeCity}
            subFilter={subFilter}
            sortBy={sortBy}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setSubFilter('전체');
            }}
            onSelectRegion={setActiveRegion}
            onSelectCity={setActiveCity}
            onSelectSubFilter={setSubFilter}
            onSortChange={setSortBy}
            totalProductsCount={filteredProducts.length}
          />

          {/* Main Content Product Display Grid */}
          <main id="products-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
            {/* Active Filter Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Palmtree className="w-6 h-6 text-teal-700" />
                  <span>
                    {activeCategory === '전체' ? '베트남 종합 맞춤 상품' : activeCategory}
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
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-xl self-start sm:self-auto transition-colors"
                >
                  🔄 전체 필터 초기화
                </button>
              )}
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-4">
                <SearchX className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-extrabold text-slate-800">
                  등록되어 있는 여행 상품이 없습니다.
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  사장님만의 멋진 사진과 상품 정보를 지금 바로 간편하게 올려보세요!
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl font-black text-xs shadow-md shadow-teal-700/20 cursor-pointer"
                  >
                    ✨ 관리자 센터에서 새 상품 등록하기
                  </button>
                  <button
                    onClick={handleResetProducts}
                    className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl font-bold text-xs cursor-pointer"
                  >
                    🔄 기본 샘플 불러오기
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
            <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-amber-400 font-extrabold text-xs tracking-wider uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  Why Xin Chao Tour
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  왜 한국 여행객들은 '신차오투어'를 선택할까요?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  베트남 현지 직접 운영으로 거품을 완전히 뺀 정직한 가격과 완벽한 안심 케어를 제공합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-200">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">100% 현지 직영 & 단독 차량</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    중개 수수료 제로! 하노이, 다낭, 호치민, 푸꾸옥 현지 지사에서 전용 럭셔리 차와 한국어 전문 가이드를 수시로 직영 배치합니다.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                    <Clock className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">24시간 카카오톡 실시간 케어</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    여행 중 어떤 돌발 상황도 즉각 해결! 한국어 소통이 원활한 24시간 비상 긴급 지원 센터를 현지에서 가동합니다.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
                    <ThumbsUp className="w-6 h-6 text-amber-300" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">NO 강요 쇼핑 / 최저가 보장</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    원치 않는 저급 쇼핑센터 방문 없는 100% 힐링 동선! 불만족 시 100% 책임 환불제를 실시합니다.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onSelectRegion={setActiveRegion}
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Inquiry Button */}
      <FloatingChatWidget
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* Real-time Exchange Rate & Calculator Modal */}
      <ExchangeRateModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        rates={exchangeRates}
        onRefresh={loadRates}
        isRefreshing={isRefreshingRates}
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

      {/* Admin Panel (Complete Master Admin Studio: Add, Edit, Delete, Photos, Inquiries, Settings) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        inquiries={inquiries}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onClearAllProducts={handleClearAllProducts}
        onResetProducts={handleResetProducts}
        onImportProducts={handleImportProducts}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        exchangeRates={exchangeRates}
      />

      {/* Interactive Travel Quiz */}
      <TravelQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onCompleteQuiz={(cat, reg) => {
          setActiveCategory(cat);
          setActiveRegion(reg);
          setActiveCity('전체');
        }}
      />

      {/* Vietnam Travel Information Modal */}
      <TravelInfoModal
        isOpen={isTravelInfoOpen}
        onClose={() => setIsTravelInfoOpen(false)}
        initialTab={travelInfoTab}
        rates={exchangeRates}
        onOpenConsultation={() => {
          setConsultationTargetProduct(null);
          setIsConsultationOpen(true);
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
