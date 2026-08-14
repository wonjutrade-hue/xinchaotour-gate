import React, { useState } from 'react';
import { Product, Category, Region, City } from '../types';
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
  HelpCircle,
  Plus
} from 'lucide-react';
import { ExchangeRates } from '../lib/exchangeRate';

interface QuickProductUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (newProduct: Partial<Product>) => Promise<void>;
  initialProduct?: Product | null;
  exchangeRates?: ExchangeRates;
}

export const QuickProductUploadModal: React.FC<QuickProductUploadModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
  initialProduct,
  exchangeRates,
}) => {
  const [title, setTitle] = useState(initialProduct?.title || '');
  const [subTitle, setSubTitle] = useState(initialProduct?.subTitle || '');
  const [category, setCategory] = useState<Category>(initialProduct?.category || '풀빌라');
  const [region, setRegion] = useState<Region>(initialProduct?.region || '중부');
  const [city, setCity] = useState<City>(initialProduct?.city || '다낭');
  const [priceKRW, setPriceKRW] = useState<number>(initialProduct?.priceKRW || 250000);
  const [duration, setDuration] = useState<string>(initialProduct?.duration || '1박 기준');
  const [address, setAddress] = useState<string>(initialProduct?.address || '');
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    initialProduct ? [initialProduct.imageUrl, ...(initialProduct.additionalImages || [])].filter(Boolean) : []
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  if (!isOpen) return null;

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
        img.onerror = () => reject(new Error('이미지 변환 실패'));
      };
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setUploadStatus(`총 ${files.length}장의 사진을 에어비앤비 규격으로 변환 중...`);

    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadStatus(`사진 압축 및 최적화 중 (${i + 1}/${files.length})...`);
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
        setUploadedImages(prev => [...prev, ...data.urls]);
      } else {
        setUploadedImages(prev => [...prev, ...compressedList]);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      alert('사진 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsProcessing(false);
      setUploadStatus(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('상품 제목을 입력해 주세요.');
      return;
    }
    if (uploadedImages.length === 0) {
      alert('최소 1장 이상의 사진을 올려주세요.');
      return;
    }

    setIsProcessing(true);
    try {
      const mainImage = uploadedImages[0];
      const additional = uploadedImages.slice(1);

      await onSaveProduct({
        id: initialProduct?.id,
        title: title.trim(),
        subTitle: subTitle.trim() || `${city} 프리미엄 맞춤 상품`,
        category,
        region,
        city,
        priceKRW: Number(priceKRW) || 200000,
        priceVND: Math.round((Number(priceKRW) || 200000) * 18.817),
        duration: duration.trim() || '1박 기준',
        address: address.trim() || `${region} ${city}`,
        imageUrl: mainImage,
        additionalImages: additional,
        galleryImages: additional,
        description: subTitle.trim() || `${title} - 신차오투어 현지 직영 상품입니다.`,
        rating: initialProduct?.rating || 5.0,
        reviewCount: initialProduct?.reviewCount || 15,
        isPopular: true,
        tags: [category, city, '단독투어', '현지직영']
      });

      alert(initialProduct ? '✅ 상품이 성공적으로 수정되었습니다!' : '🎉 새 상품이 성공적으로 등록되었습니다!');
      onClose();
    } catch (err: any) {
      console.error('Save failed:', err);
      alert('저장에 실패했습니다: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 flex items-center justify-center border border-teal-400/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">
                {initialProduct ? '⚡ 초간단 상품 수정' : '⚡ 10초 초간단 새 상품 올리기'}
              </h3>
              <p className="text-xs text-teal-200 font-medium mt-0.5">
                복잡한 설정 없이 [제목, 가격, 사진]만 넣으면 즉시 등록됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 1. Category & City Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-teal-700" />
                <span>카테고리</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                <option value="풀빌라">🏰 풀빌라 & 리조트</option>
                <option value="추천패키지">✨ 추천 패키지</option>
                <option value="자유여행">🏝️ 자유 여행 (차량/가이드)</option>
                <option value="골프투어">⛳ 골프 투어</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-slate-700 block mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span>권역</span>
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              >
                <option value="중부">중부 (다낭/나트랑 등)</option>
                <option value="남부">남부 (푸꾸옥/호치민 등)</option>
                <option value="북부">북부 (하노이/하롱베이 등)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-slate-700 block mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span>도시</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
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

          {/* 2. Product Title */}
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1.5">
              상품 제목 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="예: [다낭] 미케비치 앞 4베드룸 럭셔리 단독 풀빌라"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* 3. Subtitle / One line description */}
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1.5">
              한 줄 소개 (특징 요약)
            </label>
            <input
              type="text"
              placeholder="예: 전용 프라이빗 풀장 완비, 한국어 가능 매니저 상주, 24시간 보안"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* 4. Price & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-black text-slate-700 block mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-teal-700" />
                <span>가격 (한국 원화 기준)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  step="10000"
                  placeholder="250000"
                  value={priceKRW}
                  onChange={(e) => setPriceKRW(Number(e.target.value))}
                  className="w-full p-3.5 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-900 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
                />
                <span className="absolute right-4 top-3.5 text-xs font-extrabold text-slate-400">
                  원
                </span>
              </div>
              <p className="text-[11px] font-bold text-teal-700 mt-1">
                👉 베트남 동 자동 환산: 약 {Math.round(priceKRW * 18.817).toLocaleString('ko-KR')} ₫
              </p>
            </div>

            <div>
              <label className="text-xs font-black text-slate-700 block mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-700" />
                <span>기준 기간 / 단위</span>
              </label>
              <input
                type="text"
                placeholder="예: 1박 기준, 3박 5일, 1인 기준"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-teal-600 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* 5. PHOTOS SECTION (AIRBNB UPLOAD) */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-teal-700" />
                <span>사진 등록 (에어비앤비 1440px 고화질 자동 변환)</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-extrabold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded-md">
                현재 {uploadedImages.length}장 등록됨
              </span>
            </div>

            {/* File Upload Button & Dropzone */}
            <div className="relative border-2 border-dashed border-teal-300 hover:border-teal-600 bg-white rounded-2xl p-5 text-center transition-all group">
              <input
                type="file"
                id="quick-image-upload-input"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isProcessing}
                className="hidden"
              />
              <label
                htmlFor="quick-image-upload-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 group-hover:scale-110 transition-transform flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-black text-teal-900 block">
                    📁 내 컴퓨터에서 사진 여러 장 선택하기 (클릭)
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    스마트폰/디카로 찍은 사진들을 한꺼번에 선택하시면 됩니다. (1번 사진이 메인 커버가 됩니다)
                  </span>
                </div>
              </label>
            </div>

            {/* Processing Status */}
            {uploadStatus && (
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs font-bold text-teal-900 text-center animate-pulse">
                ⏳ {uploadStatus}
              </div>
            )}

            {/* Thumbnail Preview Grid */}
            {uploadedImages.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>등록된 사진 목록 (1번이 대표 사진):</span>
                  <button
                    type="button"
                    onClick={() => setUploadedImages([])}
                    className="text-rose-600 hover:underline font-bold"
                  >
                    전체 삭제
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                  {uploadedImages.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                      <img
                        src={url}
                        alt={`Photo ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs">
                          대표
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                        title="사진 삭제"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-sm shadow-lg shadow-teal-700/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{initialProduct ? '수정 완료 및 저장' : '새 상품 등록 완료'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
