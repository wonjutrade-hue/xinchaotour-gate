export type Region = '전체' | '북부' | '중부' | '남부';

export type City =
  | '전체'
  // 북부
  | '하노이'
  | '사파'
  | '하롱베이'
  | '닌빈'
  // 중부
  | '다낭'
  | '호이안'
  | '후에'
  | '나트랑'
  // 남부
  | '호치민'
  | '푸꾸옥'
  | '달랏'
  | '붕따우';

export type Category = '추천패키지' | '자유여행' | '골프투어' | '풀빌라';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meal?: string;
  hotel?: string;
}

export interface GolfCourseDetail {
  name: string;
  designer?: string;
  holes: number;
  description: string;
  difficulty?: string;
  location?: string;
}

export interface VillaSpecs {
  bedrooms: number;
  privatePool: boolean;
  oceanView: boolean;
  maxOccupancy: number;
  features?: string[];
  areaSqm?: number;
}

export interface GolfSpecs {
  holes: number;
  greenFeeIncluded: boolean;
  caddieFeeIncluded: boolean;
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
