import { Product, ConsultationRequest, Category, Region, City } from '../types';
import { CompanyInfo } from '../data/companyInfo';
import { ReviewItem } from '../data/reviews';

export interface DbProductRow {
  id: string;
  category: string;
  region: string;
  city: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  duration: string | null;
  price: number;
  price_vnd: number | null;
  currency: string | null;
  thumbnail_url: string | null;
  schedule: any;
  included: any;
  excluded: any;
  room_info: any;
  facilities: any;
  location: string | null;
  max_people: number | null;
  status: 'published' | 'draft' | 'archived';
  sort_order: number;
  is_popular: boolean;
  is_hot_deal: boolean;
  discount_percent: number;
  departure_cities: any;
  tags: any;
  villa_specs: any;
  golf_specs: any;
  highlights?: any;
  vehicle_info?: string | null;
  guide_info?: string | null;
  travel_theme?: string | null;
  rating: number;
  review_count: number;
  address: string | null;
  google_map_url: string | null;
  airbnb_url: string | null;
  external_booking_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DbProductImageRow {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  is_thumbnail?: boolean;
  created_at?: string;
}

export interface DbReviewRow {
  id: string;
  name: string;
  user_photo: string | null;
  region: string;
  product_id: string | null;
  product_title: string;
  content: string;
  rating: number;
  image_url: string | null;
  photos: any;
  likes: number;
  verified: boolean;
  status: string;
  created_at?: string;
}

export interface DbInquiryRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  kakao_id: string | null;
  travel_date: string | null;
  people: number;
  adult_count: number;
  child_count: number;
  product_id: string | null;
  product_title: string;
  region_preference: string | null;
  category_preference: string | null;
  message: string;
  status: string;
  created_at?: string;
}

export interface DbSiteSettingsRow {
  id: string;
  company_name: string;
  brand_name: string;
  domain: string;
  slogan: string;
  sub_slogan: string;
  intro: string;
  phone: string;
  phone_tel: string;
  email: string;
  kakao_id: string;
  kakao_link: string;
  kakao_channel: string;
  address: string;
  vietnam_office: string;
  business_number: string;
  tour_license: string;
  working_hours: string;
  created_at?: string;
  updated_at?: string;
}

// Convert DB Product Row to Frontend Product
export function mapDbProductToProduct(row: DbProductRow, galleryImages: string[] = []): Product {
  const cat = mapDbCategoryToFrontend(row.category);
  const reg = mapDbRegionToFrontend(row.region);

  const fallbackGallery = Array.isArray(row.room_info?.additionalImages) 
    ? row.room_info.additionalImages 
    : (Array.isArray(row.villa_specs?.additionalImages) ? row.villa_specs.additionalImages : []);

  const highlights = Array.isArray(row.highlights)
    ? row.highlights
    : (Array.isArray(row.room_info?.highlights)
      ? row.room_info.highlights
      : (Array.isArray(row.villa_specs?.highlights) ? row.villa_specs.highlights : []));

  return {
    id: row.id,
    title: row.title || '',
    subTitle: row.subtitle || '',
    category: cat,
    region: reg,
    city: (row.city || '전체') as City,
    priceKRW: Number(row.price) || 0,
    priceVND: row.price_vnd ? Number(row.price_vnd) : 0,
    duration: row.duration || '3박 5일',
    imageUrl: row.thumbnail_url || '',
    additionalImages: galleryImages.length > 0 ? galleryImages : fallbackGallery,
    rating: Number(row.rating) || 5.0,
    reviewCount: Number(row.review_count) || 0,
    isPopular: Boolean(row.is_popular),
    isHotDeal: Boolean(row.is_hot_deal),
    discountPercent: Number(row.discount_percent) || 0,
    departureCities: Array.isArray(row.departure_cities) ? row.departure_cities : ['인천', '부산', '대구'],
    tags: Array.isArray(row.tags) ? row.tags : [],
    description: row.description || '',
    included: Array.isArray(row.included) ? row.included : [],
    excluded: Array.isArray(row.excluded) ? row.excluded : [],
    itinerary: Array.isArray(row.schedule) ? row.schedule : [],
    villaSpecs: row.villa_specs && Object.keys(row.villa_specs).length > 0 ? row.villa_specs : undefined,
    golfSpecs: row.golf_specs && Object.keys(row.golf_specs).length > 0 ? row.golf_specs : undefined,
    highlights: highlights.length > 0 ? highlights : undefined,
    vehicleInfo: row.vehicle_info || row.room_info?.vehicleInfo || undefined,
    guideInfo: row.guide_info || row.room_info?.guideInfo || undefined,
    travelTheme: row.travel_theme || row.room_info?.travelTheme || undefined,
    address: row.address || undefined,
    googleMapUrl: row.google_map_url || undefined,
    airbnbUrl: row.airbnb_url || undefined,
    externalBookingUrl: row.external_booking_url || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

// Convert Frontend Product to DB Product Row
export function mapProductToDbRow(p: Product, sortOrder: number = 0, status: 'published' | 'draft' = 'published'): Partial<DbProductRow> {
  const extraBackup = {
    additionalImages: p.additionalImages || [],
    highlights: p.highlights || [],
    vehicleInfo: p.vehicleInfo || '',
    guideInfo: p.guideInfo || '',
    travelTheme: p.travelTheme || ''
  };

  return {
    id: p.id,
    category: mapFrontendCategoryToDb(p.category),
    region: mapFrontendRegionToDb(p.region),
    city: p.city || '전체',
    title: p.title || '',
    subtitle: p.subTitle || '',
    description: p.description || '',
    duration: p.duration || '3박 5일',
    price: p.priceKRW || 0,
    price_vnd: p.priceVND || 0,
    currency: 'KRW',
    thumbnail_url: p.imageUrl || '',
    schedule: p.itinerary || [],
    included: p.included || [],
    excluded: p.excluded || [],
    facilities: p.villaSpecs?.amenities || [],
    location: p.address || p.city || '',
    max_people: p.villaSpecs?.maxOccupancy || 4,
    status: status,
    sort_order: sortOrder,
    is_popular: Boolean(p.isPopular),
    is_hot_deal: Boolean(p.isHotDeal),
    discount_percent: p.discountPercent || 0,
    departure_cities: p.departureCities || ['인천', '부산', '대구'],
    tags: p.tags || [],
    villa_specs: p.villaSpecs || {},
    golf_specs: p.golfSpecs || {},
    highlights: p.highlights || [],
    vehicle_info: p.vehicleInfo || '',
    guide_info: p.guideInfo || '',
    travel_theme: p.travelTheme || '',
    room_info: extraBackup,
    rating: p.rating || 5.0,
    review_count: p.reviewCount || 0,
    address: p.address || '',
    google_map_url: p.googleMapUrl || '',
    airbnb_url: p.airbnbUrl || '',
    external_booking_url: p.externalBookingUrl || '',
    updated_at: new Date().toISOString()
  };
}

function mapDbCategoryToFrontend(cat: string): Category {
  if (cat === 'free_travel' || cat === '자유여행') return '자유여행';
  if (cat === 'pool_villa' || cat === '풀빌라') return '풀빌라';
  if (cat === 'golf' || cat === '골프투어') return '골프투어';
  return '추천패키지';
}

function mapFrontendCategoryToDb(cat: Category): string {
  if (cat === '자유여행') return 'free_travel';
  if (cat === '풀빌라') return 'pool_villa';
  if (cat === '골프투어') return 'golf';
  return 'package';
}

function mapDbRegionToFrontend(reg: string): Region {
  if (reg === 'north' || reg === '북부') return '북부';
  if (reg === 'central' || reg === '중부') return '중부';
  if (reg === 'south' || reg === '남부') return '남부';
  return '전체';
}

function mapFrontendRegionToDb(reg: Region): string {
  if (reg === '북부') return 'north';
  if (reg === '중부') return 'central';
  if (reg === '남부') return 'south';
  return 'central';
}
