import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ConsultationRequest } from '../types';
import { DbInquiryRow } from '../types/database';

export const inquiryService = {
  async getInquiries(): Promise<ConsultationRequest[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((row: DbInquiryRow) => ({
            id: row.id,
            userName: row.name,
            userPhone: row.phone,
            kakaoId: row.kakao_id || undefined,
            productId: row.product_id || undefined,
            productTitle: row.product_title || undefined,
            regionPreference: row.region_preference || undefined,
            categoryPreference: row.category_preference || undefined,
            startDate: row.travel_date || undefined,
            travelerCount: {
              adult: row.adult_count || row.people || 2,
              child: row.child_count || 0
            },
            message: row.message || '',
            status: (row.status as any) || 'pending',
            createdAt: row.created_at || new Date().toISOString()
          }));
        }
      } catch (err) {
        console.warn('[InquiryService] Supabase get error, falling back:', err);
      }
    }

    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        return json.inquiries || [];
      }
    } catch (e) {
      console.error('[InquiryService] Server fetch error:', e);
    }
    return [];
  },

  async createInquiry(req: Omit<ConsultationRequest, 'id' | 'createdAt'>): Promise<ConsultationRequest> {
    const newInquiry: ConsultationRequest = {
      ...req,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const row: Partial<DbInquiryRow> = {
          id: newInquiry.id,
          name: newInquiry.userName,
          phone: newInquiry.userPhone,
          kakao_id: newInquiry.kakaoId || null,
          product_id: newInquiry.productId || null,
          product_title: newInquiry.productTitle || '',
          region_preference: newInquiry.regionPreference || null,
          category_preference: newInquiry.categoryPreference || null,
          travel_date: newInquiry.startDate || null,
          people: (newInquiry.travelerCount.adult || 0) + (newInquiry.travelerCount.child || 0),
          adult_count: newInquiry.travelerCount.adult || 2,
          child_count: newInquiry.travelerCount.child || 0,
          message: newInquiry.message || '',
          status: newInquiry.status || 'pending',
          created_at: newInquiry.createdAt
        };
        await supabase.from('inquiries').insert(row);
      } catch (err) {
        console.warn('[InquiryService] Supabase insert error:', err);
      }
    }

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry)
      });
    } catch (e) {
      console.warn('[InquiryService] Server insert error:', e);
    }

    return newInquiry;
  },

  async updateStatus(id: string, status: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('inquiries').update({ status }).eq('id', id);
      } catch (e) {
        console.warn('[InquiryService] Supabase update status error:', e);
      }
    }

    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  async deleteInquiry(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
      } catch (e) {
        console.warn('[InquiryService] Supabase delete error:', e);
      }
    }
    return true;
  }
};
