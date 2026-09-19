import React, { useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  City 
} from '../types';
import { 
  getSimplePageProducts, 
  saveSimplePageProducts, 
  resetSimplePageToMainSync, 
  isSimplePageCustomized 
} from '../lib/simplePageStorage';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  ExternalLink, 
  Info, 
  Layers, 
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';
import { getDisplayProductImage } from '../lib/imageFallback';

interface SimplePageManagerTabProps {
  masterProducts: Product[];
  onNotify: (msg: string) => void;
  onPreviewProduct: (product: Product) => void;
}

export const SimplePageManagerTab: React.FC<SimplePageManagerTabProps> = ({
  masterProducts,
  onNotify,
  onPreviewProduct,
}) => {
  // Current working list of products on Simple Page
  const [simpleProducts, setSimpleProducts] = useState<Product[]>(() => getSimplePageProducts(masterProducts));
  const [isCustomized, setIsCustomized] = useState<boolean>(() => isSimplePageCustomized());
  const [activeFilterTheme, setActiveFilterTheme] = useState<'all' | 'free_travel' | 'villa' | 'golf'>('all');
  const [searchWord, setSearchWord] = useState('');

  // Quick Inline Edit state
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  // Sync with master changes if NOT customized
  useEffect(() => {
    if (!isSimplePageCustomized()) {
      setSimpleProducts(masterProducts);
      setIsCustomized(false);
    }
  }, [masterProducts]);

  // Persist locally for Simple Page without affecting master database or main page
  const handleSaveSimpleOnly = (newProductsList: Product[], notifyText?: string) => {
    saveSimplePageProducts(newProductsList);
    setSimpleProducts(newProductsList);
    setIsCustomized(true);
    onNotify(notifyText || '💾 심플페이지 전용 상품 변경사항이 독립적으로 안전하게 저장되었습니다! (메인페이지 미영향)');
  };

  // Reorder product item up/down
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= simpleProducts.length) return;

    const updated = [...simpleProducts];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    handleSaveSimpleOnly(updated, `✨ "${moved.title}" 순서가 심플페이지에 적용되었습니다.`);
  };

  // Remove product from simple page
  const handleDeleteFromSimple = (id: string, title: string) => {
    if (window.confirm(`[심플페이지 전용 삭제]\n\n"${title}" 상품을 심플페이지 진열 목록에서 제외하시겠습니까?\n\n※ 메인 홈페이지에는 아무런 영향 없이 그대로 유지됩니다.`)) {
      const updated = simpleProducts.filter(p => p.id !== id);
      handleSaveSimpleOnly(updated, `🗑️ "${title}" 상품이 심플페이지에서 제외되었습니다. (메인은 안전하게 유지됨)`);
    }
  };

  // Add a product from Master or Create New Simple-Exclusive product
  const handleAddNewProductToSimple = (baseCategory: Category = '자유여행') => {
    const newSimpleProd: Product = {
      id: `simple-exclusive-${Date.now()}`,
      title: `[심플전용] ${baseCategory} 맞춤 특가 투어`,
      subTitle: '100% 한국어 가이드 & 단독 차량 단독 특가',
      category: baseCategory,
      region: '중부',
      city: '다낭',
      priceKRW: baseCategory === '풀빌라' ? 590000 : baseCategory === '골프투어' ? 1290000 : 490000,
      duration: '3박 5일',
      imageUrl: baseCategory === '풀빌라' ? '/images/vietnam_beach_villa.jpg' : '/images/danang_golden_bridge.jpg',
      additionalImages: [],
      rating: 5.0,
      reviewCount: 1,
      departureCities: ['인천', '부산'],
      tags: ['#심플특가', '#단독차량', '#한국어가이드'],
      description: '심플페이지 고객 맞춤 전용 구성 상품입니다.',
      included: ['한국어 전담 가이드', '전용 단독 차량', '일정 내 식대 지원'],
      excluded: ['개인 경비', '매너팁'],
      itinerary: [],
      isPopular: true,
      updatedAt: new Date().toISOString()
    };

    const updated = [newSimpleProd, ...simpleProducts];
    handleSaveSimpleOnly(updated, `✨ 심플페이지 전용 새 상품이 등록되었습니다! (메인페이지는 변동 없음)`);
  };

  // Save Inline Edit
  const handleSaveInlineEdit = () => {
    if (!editingItem) return;
    const updated = simpleProducts.map(p => p.id === editingItem.id ? editingItem : p);
    handleSaveSimpleOnly(updated, `💾 "${editingItem.title}" 수정사항이 심플페이지에만 단독 반영되었습니다.`);
    setEditingItem(null);
  };

  // Reset to Main Master Sync
  const handleResetToMainSync = () => {
    if (window.confirm('심플페이지 단독 수정 내역을 초기화하고 메인 홈페이지 상품과 다시 100% 실시간 자동 연동하시겠습니까?')) {
      resetSimplePageToMainSync();
      setSimpleProducts(masterProducts);
      setIsCustomized(false);
      onNotify('🔄 메인 홈페이지 상품과 100% 자동 동기화로 복원되었습니다.');
    }
  };

  // Filter products
  const filtered = simpleProducts.filter(p => {
    if (activeFilterTheme === 'free_travel') {
      if (p.category !== '자유여행' && p.category !== '추천패키지') return false;
    } else if (activeFilterTheme === 'villa') {
      if (p.category !== '풀빌라') return false;
    } else if (activeFilterTheme === 'golf') {
      if (p.category !== '골프투어') return false;
    }

    if (searchWord) {
      const q = searchWord.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. STATUS & ARCHITECTURE NOTICE BANNER */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xl">📱</span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                심플페이지(?page=simple) 전용 독립 상품 관리
              </h2>
              {isCustomized ? (
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full shadow-xs">
                  ⭐ 심플페이지 독자 분리 운영 중
                </span>
              ) : (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-1 rounded-full">
                  🔗 메인 홈페이지와 실시간 자동 연동 상태
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              <strong className="text-amber-300">규칙 안내: </strong>
              메인 홈페이지에서 수정/추가/삭제된 내용은 심플페이지에 자동으로 전달되지만,
              <strong className="text-emerald-400"> 이곳 심플페이지에서 수정/추가/삭제한 내용은 메인 페이지에 아무런 영향을 주지 않고 안전하게 유지됩니다.</strong>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <a
              href="/?page=simple"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition"
              title="심플페이지 새창에서 확인"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
              <span>심플홈 새창 열기</span>
            </a>

            {isCustomized && (
              <button
                onClick={handleResetToMainSync}
                className="px-3.5 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/70 border border-rose-700/50 text-rose-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                title="심플 단독 수정사항을 삭제하고 메인 페이지 상품과 다시 동기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>메인 상품과 재동기화</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. TOOLBAR: SEARCH, THEMES & ADD BUTTON */}
      <div className="bg-slate-800/80 border border-slate-700 p-4 sm:p-5 rounded-3xl shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Theme Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: '전체 상품', icon: '🌟', count: simpleProducts.length },
            { id: 'free_travel', label: '자유여행/패키지', icon: '🏝️', count: simpleProducts.filter(p => p.category === '자유여행' || p.category === '추천패키지').length },
            { id: 'villa', label: '독채 풀빌라', icon: '🏰', count: simpleProducts.filter(p => p.category === '풀빌라').length },
            { id: 'golf', label: '골프투어', icon: '⛳', count: simpleProducts.filter(p => p.category === '골프투어').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilterTheme(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeFilterTheme === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{tab.icon} {tab.label}</span>
              <span className={`text-[10px] px-1.5 rounded-full font-bold ${
                activeFilterTheme === tab.id ? 'bg-black/20 text-slate-950' : 'bg-slate-800 text-amber-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Add New */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="상품명 검색..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden"
          />

          <button
            onClick={() => handleAddNewProductToSimple(activeFilterTheme === 'villa' ? '풀빌라' : activeFilterTheme === 'golf' ? '골프투어' : '자유여행')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ 심플전용 상품 추가</span>
          </button>
        </div>
      </div>

      {/* 3. PRODUCT LIST FOR SIMPLE PAGE */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 border-b border-slate-700 flex items-center justify-between text-xs">
          <div className="font-bold text-slate-300 flex items-center gap-2">
            <span>심플페이지 진열 순서 및 상품 목록</span>
            <span className="text-amber-400">({filtered.length}개)</span>
          </div>
          <span className="text-slate-400 text-[11px]">
            [위로/아래로] 버튼으로 심플페이지 첫 화면에 노출될 우선순위를 바꿀 수 있습니다
          </span>
        </div>

        <div className="divide-y divide-slate-700/60">
          {filtered.map((prod, idx) => {
            const displayImg = getDisplayProductImage(prod);
            const isEditingThis = editingItem?.id === prod.id;

            if (isEditingThis && editingItem) {
              return (
                <div key={prod.id} className="p-4 sm:p-5 bg-slate-900 space-y-4 border-2 border-amber-400/80 rounded-2xl m-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-black text-amber-300">✏️ 심플페이지 전용 내용 수정 (메인 미반영)</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveInlineEdit}
                        className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 shadow cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>저장</span>
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                      >
                        취소
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 font-bold mb-1">상품명</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">카테고리</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                      >
                        <option value="자유여행">자유여행</option>
                        <option value="풀빌라">독채 풀빌라</option>
                        <option value="골프투어">골프투어</option>
                        <option value="추천패키지">추천패키지</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">도시</label>
                      <input
                        type="text"
                        value={editingItem.city}
                        onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value as any })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">가격(KRW 원)</label>
                      <input
                        type="number"
                        value={editingItem.priceKRW}
                        onChange={(e) => setEditingItem({ ...editingItem, priceKRW: Number(e.target.value) || 0 })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-black"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">여행 기간</label>
                      <input
                        type="text"
                        value={editingItem.duration}
                        onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 font-bold mb-1">대표 사진 URL</label>
                      <input
                        type="text"
                        value={editingItem.imageUrl}
                        onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-slate-400 font-bold mb-1">간단 설명</label>
                      <textarea
                        rows={2}
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                      />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={prod.id}
                className="p-3.5 sm:p-4 hover:bg-slate-750/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Product thumbnail & Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-16 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-700 relative">
                    <img
                      src={displayImg}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-white font-extrabold text-[10px]">
                        {prod.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-700 text-slate-200 font-bold text-[10px]">
                        {prod.city}
                      </span>
                      {prod.id.startsWith('simple-exclusive-') && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px]">
                          ⭐ 심플 단독상품
                        </span>
                      )}
                    </div>
                    <h4 className="text-white font-bold text-xs sm:text-sm truncate mt-1">
                      {prod.title}
                    </h4>
                    <p className="text-slate-400 text-[11px] truncate">
                      {prod.priceKRW ? `${prod.priceKRW.toLocaleString()}원` : '견적 문의'} · {prod.duration}
                    </p>
                  </div>
                </div>

                {/* Actions: Reorder & Edit & Delete */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="심플페이지에서 1칸 위로"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === filtered.length - 1}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="심플페이지에서 1칸 아래로"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onPreviewProduct(prod)}
                    className="px-2 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="상세보기"
                  >
                    <Eye className="w-3 h-3 text-teal-400" />
                    <span className="hidden sm:inline">미리보기</span>
                  </button>

                  <button
                    onClick={() => setEditingItem(JSON.parse(JSON.stringify(prod)))}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1 shadow cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>수정</span>
                  </button>

                  <button
                    onClick={() => handleDeleteFromSimple(prod.id, prod.title)}
                    className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-rose-600 text-slate-400 hover:text-white transition cursor-pointer"
                    title="심플페이지에서만 삭제 (메인 유지)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              조건에 맞는 심플페이지 상품이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
