import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CompanyInfo, COMPANY_INFO } from '../data/companyInfo';
import { DbSiteSettingsRow } from '../types/database';

export const settingsService = {
  async getSettings(): Promise<CompanyInfo> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'main_settings')
          .single();

        if (!error && data) {
          const row = data as DbSiteSettingsRow;
          return {
            ...COMPANY_INFO,
            name: row.company_name || COMPANY_INFO.name,
            brandName: row.brand_name || COMPANY_INFO.brandName,
            domain: row.domain || COMPANY_INFO.domain,
            slogan: row.slogan || COMPANY_INFO.slogan,
            subSlogan: row.sub_slogan || COMPANY_INFO.subSlogan,
            intro: row.intro || COMPANY_INFO.intro,
            phone: row.phone || COMPANY_INFO.phone,
            phoneTel: row.phone_tel || COMPANY_INFO.phoneTel,
            email: row.email || COMPANY_INFO.email,
            kakaoId: row.kakao_id || COMPANY_INFO.kakaoId,
            kakaoLink: row.kakao_link || COMPANY_INFO.kakaoLink,
            kakaoChannel: row.kakao_channel || COMPANY_INFO.kakaoChannel,
            address: row.address || COMPANY_INFO.address,
            vietnamOffice: row.vietnam_office || COMPANY_INFO.vietnamOffice,
            businessNumber: row.business_number || COMPANY_INFO.businessNumber,
            tourLicense: row.tour_license || COMPANY_INFO.tourLicense,
            workingHours: row.working_hours || COMPANY_INFO.workingHours,
          };
        }
      } catch (err) {
        console.warn('[SettingsService] Supabase get settings error:', err);
      }
    }

    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const json = await res.json();
        if (json.settings) {
          return json.settings;
        }
      }
    } catch (e) {
      // ignore
    }

    return COMPANY_INFO;
  },

  async updateSettings(info: CompanyInfo): Promise<CompanyInfo> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const row: Partial<DbSiteSettingsRow> = {
          id: 'main_settings',
          company_name: info.name,
          brand_name: info.brandName,
          domain: info.domain,
          slogan: info.slogan,
          sub_slogan: info.subSlogan,
          intro: info.intro,
          phone: info.phone,
          phone_tel: info.phoneTel,
          email: info.email,
          kakao_id: info.kakaoId,
          kakao_link: info.kakaoLink,
          kakao_channel: info.kakaoChannel,
          address: info.address,
          vietnam_office: info.vietnamOffice,
          business_number: info.businessNumber,
          tour_license: info.tourLicense,
          working_hours: info.workingHours,
          updated_at: new Date().toISOString()
        };
        await supabase.from('site_settings').upsert(row);
      } catch (err) {
        console.warn('[SettingsService] Supabase update settings error:', err);
      }
    }

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: info })
      });
    } catch (e) {
      // ignore
    }

    return info;
  }
};
