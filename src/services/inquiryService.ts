import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ConsultationRequest } from '../types';
import { DbInquiryRow } from '../types/database';

const LOCAL_STORAGE_KEY = 'xinchaotour_inquiries_cache';

function getLocalInquiries(): ConsultationRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return [];
}

function saveLocalInquiries(inqs: ConsultationRequest[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inqs));
  } catch (e) {
    // ignore
  }
}

export const inquiryService = {
  async getInquiries(): Promise<ConsultationRequest[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const list: ConsultationRequest[] = data.map((row: DbInquiryRow) => ({
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
          saveLocalInquiries(list);
          return list;
        }
      } catch (err) {
        // Fall back gracefully
      }
    }

    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.inquiries)) {
          saveLocalInquiries(json.inquiries);
          return json.inquiries;
        }
      }
    } catch (e) {
      // Safe fallback when running statically or offline
    }

    return getLocalInquiries();
  },

  async createInquiry(req: Omit<ConsultationRequest, 'id' | 'createdAt'>): Promise<ConsultationRequest> {
    const newInquiry: ConsultationRequest = {
      ...req,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    // 1. Local Cache Update
    const current = getLocalInquiries();
    saveLocalInquiries([newInquiry, ...current]);

    // 2. Supabase Insert
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
        // ignore
      }
    }

    // 3. Server API fallback sync
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry)
      });
    } catch (e) {
      // ignore
    }

    return newInquiry;
  },

  async updateStatus(id: string, status: string): Promise<boolean> {
    const list = getLocalInquiries();
    const updated = list.map(item => item.id === id ? { ...item, status: status as any } : item);
    saveLocalInquiries(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('inquiries').update({ status }).eq('id', id);
      } catch (e) {
        // ignore
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
      return true;
    }
  },

  async deleteInquiry(id: string): Promise<boolean> {
    const list = getLocalInquiries();
    saveLocalInquiries(list.filter(item => item.id !== id));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
      } catch (e) {
        // ignore
      }
    }

    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    } catch (e) {
      // ignore
    }

    return true;
  }
};
