export type Region = '전체' | '북부' | '중부' | '남부';

export type City =
  | '전체'
  // 북부
  | '하노이'
  | '사파'
  | '하롱베이'
  | '닌빈'
  | '하장'
  // 중부
  | '다낭'
  | '호이안'
  | '후에'
  | '나트랑'
  // 남부
  | '호치민'
  | '푸꾸옥'
  | '달랏'
  | '무이네'
  | '붕따우';

export type Category = '풀빌라' | '골프투어' | '추천패키지' | '자유여행';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meal?: string;
  hotel?: string;
  vehicle?: string;
  attractions?: string[];
}

export interface GolfCourseDetail {
  name: string;
  designer?: string;
  holes: number;
  description: string;
  difficulty?: string;
  location?: string;
  grassType?: string;
  facilities?: string[];
}

export interface VillaSpecs {
  villaName?: string;
  structureDescription?: string;
  bedrooms: number;
  bathrooms?: number;
  beds?: number | string;
  maxOccupancy: number;
  standardOccupancy?: number;
  privatePool: boolean;
  oceanView: boolean;
  areaSqm?: number;
  areaPyeong?: number;
  floors?: number;
  address?: string;
  googleMapUrl?: string;
  airbnbUrl?: string;
  amenities?: string[];
  features?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  houseRules?: string[];
  securityDeposit?: string;
  cleaningFeeIncluded?: boolean;
  breakfastIncluded?: boolean;
  hostLanguage?: string;
}

export interface GolfSpecs {
  holes: number;
  totalRounds?: number;
  stayAndPlayHotel?: string;
  hotelRoomType?: string;
  distanceInfo?: string;
  greenFeeIncluded: boolean;
  caddieFeeIncluded: boolean;
  cartIncluded?: boolean;
  caddieTipInfo?: string;
  golfCourseNames: string[];
  courseDetails?: GolfCourseDetail[];
}

export interface Product {
  id: string;
  title: string;
  subTitle: string;
  category: Category;
  region: Region;
  city: City;
  priceKRW: number;
  priceVND?: number;
  duration: string;
  imageUrl: string;
  additionalImages?: string[];
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isHotDeal?: boolean;
  discountPercent?: number;
  departureCities: string[];
  tags: string[];
  description: string;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  villaSpecs?: VillaSpecs;
  golfSpecs?: GolfSpecs;
  highlights?: string[];
  vehicleInfo?: string;
  guideInfo?: string;
  travelTheme?: string;
  address?: string;
  googleMapUrl?: string;
  airbnbUrl?: string;
  externalBookingUrl?: string;
  createdAt?: string;
}

export interface ConsultationRequest {
  id: string;
  userName: string;
  userPhone: string;
  kakaoId?: string;
  productId?: string;
  productTitle?: string;
  regionPreference?: string;
  categoryPreference?: string;
  startDate?: string;
  travelerCount: {
    adult: number;
    child: number;
  };
  message: string;
  status: 'pending' | 'in_progress' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface TravelQuizAnswers {
  companion: string;
  style: Category | '상관없음';
  region: Region | '상관없음';
  duration: string;
  budgetPerPerson: number;
}

export type VisitorAction = 'page_view' | 'kakao_click' | 'phone_click' | 'inquiry_submit' | 'product_view' | 'tab_change';

export interface VisitorLog {
  id: string;
  timestamp: string;
  date: string;
  hour: number;
  page: string;
  action: VisitorAction;
  productId?: string;
  productTitle?: string;
  device: 'mobile' | 'desktop' | 'tablet';
  browser: string;
  os: string;
  referrer: string;
  sessionId: string;
  ip?: string;
}

export interface DailyVisitorStat {
  date: string;
  uv: number;
  pv: number;
  kakaoClicks: number;
  phoneClicks: number;
  inquiries: number;
}

export interface AnalyticsSummary {
  todayUV: number;
  todayPV: number;
  yesterdayUV: number;
  yesterdayPV: number;
  thisMonthUV: number;
  totalUV: number;
  totalPV: number;
  totalKakaoClicks: number;
  totalPhoneClicks: number;
  totalInquiries: number;
  dailyStats: DailyVisitorStat[];
  hourlyDistribution: number[];
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  referrerBreakdown: Record<string, number>;
  popularPages: { page: string; views: number }[];
  popularProducts: { productId: string; title: string; views: number }[];
  recentLogs: VisitorLog[];
}
