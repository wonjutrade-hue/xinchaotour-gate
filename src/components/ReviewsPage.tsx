import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle, PlusCircle, X, ShieldCheck, Heart } from 'lucide-react';
import { INITIAL_REVIEWS, ReviewItem } from '../data/reviews';

interface ReviewsPageProps {
  onOpenConsultation?: (productTitle?: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onOpenConsultation }) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('xinchao_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_REVIEWS;
  });

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newRegion, setNewRegion] = useState('중부 다낭');
  const [newProduct, setNewProduct] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
    setReviews(prev =>
      prev.map(r => {
        if (r.id === id) {
          const currentLikes = r.likes || 0;
          return {
            ...r,
            likes: likedMap[id] ? Math.max(0, currentLikes - 1) : currentLikes + 1
          };
        }
        return r;
      })
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newContent.trim()) {
      alert('성함과 후기 내용을 입력해주세요.');
      return;
    }

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      userName: `${newUserName.trim()} 님`,
      region: newRegion,
      productTitle: newProduct.trim() || '신짜오투어 맞춤 여행',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      content: newContent.trim(),
      likes: 1,
      verified: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('xinchao_user_reviews', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }

    alert('소중한 여행후기가 성공적으로 등록되었습니다. 감사합니다!');
    setIsWriteModalOpen(false);
    setNewUserName('');
    setNewProduct('');
    setNewContent('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4 border border-emerald-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% 실제 다녀오신 고객님의 생생한 리얼 후기
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              신짜오투어와 함께한 <br />
              <span className="text-emerald-300">행복한 여행 이야기</span>
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
              자유여행, 프리미엄 풀빌라, 명문 골프까지! 한국인 고객님들의 진솔한 평가와 실제 후기를 확인해보세요.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition shadow-lg text-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                여행후기 작성하기
              </button>
              <div className="flex items-center gap-2 text-xs text-emerald-200 bg-black/20 px-3 py-2 rounded-lg backdrop-blur-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                평균 만족도 <strong className="text-white text-sm">4.9 / 5.0</strong> (1,280+건 누적)
              </div>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <MessageSquare className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* User & Rating header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {item.userPhoto ? (
                      <img
                        src={item.userPhoto}
                        alt={item.userName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/20 shadow-xs"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base">
                        {item.userName.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-base">{item.userName}</span>
                        {item.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            실제 예약 고객
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{item.region}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Tag */}
                <div className="mb-3 bg-slate-50 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-medium border border-slate-100 line-clamp-1">
                  🏷️ {item.productTitle}
                </div>

                {/* Content */}
                <p className="text-slate-700 text-sm leading-relaxed mb-4 whitespace-pre-line">
                  {item.content}
                </p>

                {/* Photos if any */}
                {item.photos && item.photos.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                    {item.photos.map((p, idx) => (
                      <img
                        key={idx}
                        src={p}
                        alt="후기 사진"
                        className="w-24 h-20 rounded-xl object-cover border border-slate-200 hover:opacity-90 transition shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <button
                  onClick={() => handleLike(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                    likedMap[item.id]
                      ? 'bg-rose-50 text-rose-600 border-rose-200 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedMap[item.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                  도움이 돼요 {item.likes || 0}
                </button>
                {onOpenConsultation && (
                  <button
                    onClick={() => onOpenConsultation(item.productTitle)}
                    className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
                  >
                    이 상품 문의하기 ➔
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Write Modal */}
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-slate-900 mb-1">✍️ 여행후기 작성</h2>
              <p className="text-xs text-slate-500 mb-5">
                신짜오투어와 함께한 생생한 여행 경험을 다른 여행자분들과 나눠주세요.
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">작성자 성함</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동 (가족여행)"
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">여행 지역</label>
                    <select
                      value={newRegion}
                      onChange={e => setNewRegion(e.target.value)}
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      <option value="북부 하노이/하롱베이">북부 하노이/하롱베이</option>
                      <option value="북부 하장/동반/까오방">북부 하장/동반/까오방</option>
                      <option value="중부 다낭/호이안">중부 다낭/호이안</option>
                      <option value="중부 후에/바나힐">중부 후에/바나힐</option>
                      <option value="남부 푸꾸옥">남부 푸꾸옥</option>
                      <option value="남부 나트랑/달랏">남부 나트랑/달랏</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">별점 평가</label>
                    <select
                      value={newRating}
                      onChange={e => setNewRating(Number(e.target.value))}
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ 5점 (최고)</option>
                      <option value={4}>⭐⭐⭐⭐ 4점 (만족)</option>
                      <option value={3}>⭐⭐⭐ 3점 (보통)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">이용하신 상품명</label>
                  <input
                    type="text"
                    placeholder="예: 다낭 4베드룸 풀빌라 3박 5일"
                    value={newProduct}
                    onChange={e => setNewProduct(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">상세 후기 내용</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="숙소 상태, 한국어 가이드 친절도, 전용 차량, 코스 만족도 등을 자유롭게 작성해주세요."
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition shadow-md text-sm cursor-pointer"
                  >
                    후기 등록 완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
