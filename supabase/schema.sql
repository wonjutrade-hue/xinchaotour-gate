-- ==========================================================
-- XinChaoTour Production Database Schema for Supabase
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY DEFAULT ('prod-' || substr(md5(random()::text), 1, 10)),
  category TEXT NOT NULL CHECK (category IN ('free_travel', 'pool_villa', 'golf', 'package', '자유여행', '풀빌라', '골프투어', '추천패키지')),
  region TEXT NOT NULL CHECK (region IN ('north', 'central', 'south', '북부', '중부', '남부', '전체')),
  city TEXT DEFAULT '전체',
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  duration TEXT DEFAULT '3박 5일',
  price NUMERIC(12, 0) NOT NULL DEFAULT 0,
  price_vnd NUMERIC(15, 0) DEFAULT 0,
  currency TEXT DEFAULT 'KRW',
  thumbnail_url TEXT DEFAULT '',
  schedule JSONB DEFAULT '[]'::jsonb,
  included JSONB DEFAULT '[]'::jsonb,
  excluded JSONB DEFAULT '[]'::jsonb,
  room_info JSONB DEFAULT '{}'::jsonb,
  facilities JSONB DEFAULT '[]'::jsonb,
  location TEXT DEFAULT '',
  max_people INTEGER DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  sort_order INTEGER DEFAULT 0,
  is_popular BOOLEAN DEFAULT false,
  is_hot_deal BOOLEAN DEFAULT false,
  discount_percent INTEGER DEFAULT 0,
  departure_cities JSONB DEFAULT '["인천", "부산", "대구"]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  villa_specs JSONB DEFAULT '{}'::jsonb,
  golf_specs JSONB DEFAULT '{}'::jsonb,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  address TEXT DEFAULT '',
  google_map_url TEXT DEFAULT '',
  airbnb_url TEXT DEFAULT '',
  external_booking_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for speedy queries
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_region ON public.products(region);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON public.products(sort_order);

-- 3. Product Images (Gallery) Table
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_thumbnail BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_images_prod_id ON public.product_images(product_id);

-- 4. Customer Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY DEFAULT ('rev-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL,
  user_photo TEXT DEFAULT '',
  region TEXT DEFAULT '중부 다낭',
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT DEFAULT '',
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT DEFAULT '',
  photos JSONB DEFAULT '[]'::jsonb,
  likes INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Inquiries / Bookings Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY DEFAULT ('inq-' || substr(md5(random()::text), 1, 8)),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  kakao_id TEXT DEFAULT '',
  travel_date TEXT DEFAULT '',
  people INTEGER DEFAULT 2,
  adult_count INTEGER DEFAULT 2,
  child_count INTEGER DEFAULT 0,
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT DEFAULT '',
  region_preference TEXT DEFAULT '',
  category_preference TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main_settings',
  company_name TEXT NOT NULL DEFAULT '신짜오투어',
  brand_name TEXT NOT NULL DEFAULT 'XinChaoTour',
  domain TEXT DEFAULT 'xinchaotour.com',
  slogan TEXT DEFAULT '베트남의 아름다운 순간을 한국인의 편안함으로 여행하세요',
  sub_slogan TEXT DEFAULT '자유여행 · 풀빌라 · 골프여행 XinChaoTour와 함께하세요.',
  intro TEXT DEFAULT '베트남 현지에서 한국 고객에게 편안하고 안전한 여행을 제공하는 베트남 전문 여행 플랫폼입니다.',
  phone TEXT DEFAULT '010-5365-6019',
  phone_tel TEXT DEFAULT 'tel:010-5365-6019',
  email TEXT DEFAULT 'wonjutrade@hanmail.net',
  kakao_id TEXT DEFAULT 'wonjutrade',
  kakao_link TEXT DEFAULT 'https://open.kakao.com/o/sxeekUBi',
  kakao_channel TEXT DEFAULT 'https://pf.kakao.com/_xincaotour',
  address TEXT DEFAULT '강원도 원주시 / 베트남 다낭시 손짜구 현지 직영 라운지',
  vietnam_office TEXT DEFAULT 'Da Nang, Son Tra / Hanoi, Hoan Kiem Local Branch',
  business_number TEXT DEFAULT '224-81-00000 (사업자등록 완료)',
  tour_license TEXT DEFAULT '관광사업등록 및 기획여행보증보험 1억원 가입',
  working_hours TEXT DEFAULT '연중무휴 24시간 한국어 카카오톡 & 전화 긴급 지원',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site settings if not present
INSERT INTO public.site_settings (id) 
VALUES ('main_settings')
ON CONFLICT (id) DO NOTHING;

-- 7. Supabase Storage Bucket Configuration
-- Create storage bucket for product images if it does not exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Row Level Security (RLS) Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Products RLS
CREATE POLICY "Public can view published products" 
  ON public.products FOR SELECT 
  USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users or service role have full access to products" 
  ON public.products FOR ALL 
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role' OR auth.role() = 'anon');

-- Product Images RLS
CREATE POLICY "Public can view product images" 
  ON public.product_images FOR SELECT 
  USING (true);

CREATE POLICY "Full access to product images for app" 
  ON public.product_images FOR ALL 
  USING (true);

-- Reviews RLS
CREATE POLICY "Public can view published reviews" 
  ON public.reviews FOR SELECT 
  USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Public can create review and admin can manage" 
  ON public.reviews FOR ALL 
  USING (true);

-- Inquiries RLS
CREATE POLICY "Public can submit inquiries" 
  ON public.inquiries FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow reading and updating inquiries" 
  ON public.inquiries FOR ALL 
  USING (true);

-- Site Settings RLS
CREATE POLICY "Public can view site settings" 
  ON public.site_settings FOR SELECT 
  USING (true);

CREATE POLICY "Allow editing site settings" 
  ON public.site_settings FOR ALL 
  USING (true);

-- Storage bucket RLS policies for 'product-images'
CREATE POLICY "Public access to view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Allow insert images to bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow update/delete images in bucket"
  ON storage.objects FOR ALL
  USING (bucket_id = 'product-images');
