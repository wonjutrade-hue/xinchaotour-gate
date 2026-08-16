import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ReviewItem, INITIAL_REVIEWS } from '../data/reviews';
import { DbReviewRow } from '../types/database';

export const reviewService = {
  async getReviews(): Promise<ReviewItem[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((row: DbReviewRow) => ({
            id: row.id,
            userName: row.name,
            userPhoto: row.user_photo || undefined,
            region: row.region,
            productTitle: row.product_title || '',
            rating: row.rating,
            date: row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            content: row.content,
            photos: Array.isArray(row.photos) ? row.photos : [],
            likes: row.likes || 0,
            verified: row.verified ?? true
          }));
        }
      } catch (err) {
        console.warn('[ReviewService] Supabase reviews fetch error:', err);
      }
    }

    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.reviews) && json.reviews.length > 0) {
          return json.reviews;
        }
      }
    } catch (e) {
      // ignore
    }

    return INITIAL_REVIEWS;
  },

  async createReview(review: Omit<ReviewItem, 'id'>): Promise<ReviewItem> {
    const newRev: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const row: Partial<DbReviewRow> = {
          id: newRev.id,
          name: newRev.userName,
          user_photo: newRev.userPhoto || '',
          region: newRev.region,
          product_title: newRev.productTitle,
          content: newRev.content,
          rating: newRev.rating,
          photos: newRev.photos || [],
          likes: newRev.likes || 0,
          verified: newRev.verified ?? true,
          status: 'published'
        };
        await supabase.from('reviews').insert(row);
      } catch (err) {
        console.warn('[ReviewService] Supabase review insert error:', err);
      }
    }

    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRev)
      });
    } catch (e) {
      console.warn('[ReviewService] Server review insert error:', e);
    }

    return newRev;
  },

  async deleteReview(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('reviews').delete().eq('id', id);
      } catch (e) {
        console.warn('[ReviewService] Supabase review delete error:', e);
      }
    }

    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    } catch (e) {
      // ignore
    }
    return true;
  }
};
