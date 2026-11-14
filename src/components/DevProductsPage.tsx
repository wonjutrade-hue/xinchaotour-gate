import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Star, 
  Users, 
  CheckCircle2, 
  Compass,
  ArrowRight,
  DollarSign,
  PhoneCall,
  Search,
  Filter
} from 'lucide-react';
import { Product, Category, City, Region } from '../types';
import { ExchangeRates } from '../lib/exchangeRate';
import { DEFAULT_KAKAO_LINK, COMPANY_PHONE, COMPANY_PHONE_TEL, handleOpenKakaoTalkDirect } from '../constants';
import { BrandLogoLockup } from './BrandLogoLockup';

interface DevProductsPageProps {
  onSelectProduct?: (product: Product) => void;
  onOpenConsultation: (targetProduct?: Product | null) => void;
  onNavigateHome: () => void;
  exchangeRates: ExchangeRates;
}

export interface VitracoTourItem {
  id: string;
  title: string;
  subTitle: string; // Vietnamese original title from Vitraco
  region: '북부' | '중부' | '남부';
  subRegion: string; // From Vitraco sub-menu (e.g. '베트남 북서부 관광', '하노이 관광', '다낭 관광', '베트남 서부 관광' etc.)
  city: City;
  category: Category;
  priceVND: number; // Exact Vitraco official price in VND
  duration: string;
  departure: string;
  imageUrl: string;
  highlights: string[];
  included: string[];
  description: string;
  rating: number;
  reviewCount: number;
}

// 24 Authentic Vitraco Tour packages directly copied from vitracotour.com
export const VITRACO_PRODUCTS_LIST: VitracoTourItem[] = [
  // ===================== 베트남 북부 관광 =====================
  {
    id: 'vitraco-north-taybac-4d3n',
    title: '[VITRACO] 베트남 서북부 비경 투어 4박 3일 (손라 – 디엔비엔 – 목쩌우 – 백룡 유리다리)',
    subTitle: 'Tour du lịch Tây Bắc (Sơn La – Điện Biên – Mộc Châu – Cầu Kính Bạch Long)',
    region: '북부',
    subRegion: '베트남 북서부 관광',
    city: '사파',
    category: '자유여행',
    priceVND: 7299000,
    duration: '4박 3일 (4N3Đ)',
    departure: '출발: 매주 정기 출발 (다낭/하노이 출발)',
    imageUrl: '/images/sapa_fansipan.jpg',
    highlights: [
      '세계 최장 백룡(Bạch Long) 기네스 유리다리 횡단 체험',
      '목쩌우 1,000m 고원 녹차밭 & 다이옘(Dải Yếm) 폭포',
      '디엔비엔푸 역사 박물관 & A1 언덕 유적지 답사',
      '소수민족 전통 춤 공연 및 특산 흑돼지 구이 석식'
    ],
    included: [
      'VITRACO 직영 최신형 에어컨 리무진 전 일정 단독 배차',
      '3~4성급 호텔 3박 및 전 일정 조식/중식/석식 일체',
      '백룡 유리다리 및 명소 전 구역 입장권 포함',
      '전문 한국어 가이드 및 1억원 여행자 보험'
    ],
    description: '베트남 북서부 웅장한 산악 지대인 손라, 디엔비엔, 목쩌우를 관통하며 기네스북 백룡 유리다리와 고원 녹차밭 비경을 만끽하는 VITRACO 공식 인기 투어입니다.',
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'vitraco-north-hanoi-5d4n',
    title: '[VITRACO] 하노이 – 닌빈 – 하롱베이 – 사파 판시판 5박 4일 골든 루프',
    subTitle: 'Tour du lịch Hà Nội – Ninh Bình – Hạ Long – Sapa (Khởi hành từ Đà Nẵng)',
    region: '북부',
    subRegion: '하노이 관광',
    city: '하노이',
    category: '자유여행',
    priceVND: 5310000,
    duration: '5박 4일 (5N4Đ)',
    departure: '출발: 다낭 출발 (매주 수·토 정기 출발)',
    imageUrl: '/images/halong_cruise.jpg',
    highlights: [
      '유네스코 세계자연유산 하롱베이 전용 크루즈 및 석회암 동굴 탐험',
      '하노이 호안끼엠 호수 & 바딘 광장 호치민 묘소 탐방',
      '닌빈 짱안 삼판 나룻배 & 석회암 절벽 비경',
      '인도차이나 최고봉 판시판(3,143m) 케이블카 탑승'
    ],
    included: [
      '전 일정 VIP 리무진 차량 & 한국어 전문 가이드',
      '호텔 4박 (하노이/사파/하롱베이) 및 조식 포함',
      '하롱베이 크루즈 승선권 및 선상 신선 해산물 중식',
      '짱안 보트 탑승권 & 전 일정 주요 식사 일체'
    ],
    description: '베트남 북부의 핵심인 수도 하노이, 세계자연유산 하롱베이, 육지의 하롱베이 닌빈, 운해의 고원 사파를 한 번에 완벽 정복하는 VITRACO 대표 패키지입니다.',
    rating: 5.0,
    reviewCount: 64
  },
  {
    id: 'vitraco-north-caobang-5d4n',
    title: '[VITRACO] 동북부 대자연: 하장 – 동반 – 까오방 반족 폭포 5박 4일',
    subTitle: 'Du lịch Đông Bắc: Hà Giang – Đồng Văn – Cao Bằng – Thác Bản Giốc (Khởi hành từ Đà Nẵng)',
    region: '북부',
    subRegion: '까오방 관광',
    city: '까오방',
    category: '자유여행',
    priceVND: 8590000,
    duration: '5박 4일 (5N4Đ)',
    departure: '출발: 다낭 출발 (매월 2회 정기 투어)',
    imageUrl: '/images/bangioc.jpg',
    highlights: [
      '아시아 최대이자 세계 4대 국경 폭포인 까오방 반족(Bản Giốc) 폭포',
      '응우옴응아오(Ngườm Ngao) 웅장한 천연 종유석 동굴',
      '하장 동반 카르스트 고원 유네스코 지질공원 조망',
      '호치민 주석 혁명 근거지 팍보(Pác Bó) 동굴 & 레닌천 탐방'
    ],
    included: [
      '다낭 출발 전용 VIP 대형 리무진 버스 왕복',
      '지역 최고급 호텔 4박 및 전 일정 전통 특식 식사',
      '반족 폭포 보트 탑승권 및 동북부 명소 입장권 전액',
      '외국인 전용 북부 허가증 발급 대행 및 여행자 보험'
    ],
    description: '베트남의 숨겨진 보석 동북부! 장엄한 반족 폭포의 거대한 물줄기와 맑은 에메랄드빛 레닌천, 신비로운 산악 비경을 편안한 리무진으로 만나는 투어입니다.',
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'vitraco-north-ninhbinh-2d1n',
    title: '[VITRACO] 닌빈 유네스코 생태: 호아루 – 땀꼭 – 항무아 – 바이딘 – 짱안 2박 1일',
    subTitle: 'Tour Hoa Lư – Tam Cốc – Hang Múa – Bái Đính – Tràng An (2N1Đ)',
    region: '북부',
    subRegion: '닌빈 관광',
    city: '닌빈',
    category: '자유여행',
    priceVND: 2050000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 하노이 / 다낭 출발 (매일 출발)',
    imageUrl: '/images/ninhbinh_trangan.jpg',
    highlights: [
      '항무아(Hang Múa) 500계단 정상 용 조각 파노라마 뷰',
      '유네스코 짱안 생태 보트 투어 & 신비의 수중 동굴',
      '동남아 최대 불교 사원 바이딘(Bái Đính) 사탑 관람',
      '천년 고도 호아루 딘·레 왕조 사당 답사'
    ],
    included: [
      '하노이/다낭 픽업 왕복 리무진 차량 배차',
      '닌빈 최고급 리조트 1박 및 조식/특식 3회',
      '짱안 삼판 나룻배 탑승권 & 항무아 입장료 일체',
      '한국어 전문 해설 가이드 동행'
    ],
    description: '육지의 하롱베이라 불리는 닌빈의 웅장한 카르스트 암봉과 잔잔한 강줄기, 항무아 정상의 압도적 뷰를 즐기는 가성비 최고의 힐링 생태 투어입니다.',
    rating: 4.8,
    reviewCount: 51
  },
  {
    id: 'vitraco-north-hagiang-4d3n',
    title: '[VITRACO] 하장 카르스트 고원: 꽌바 – 옌민 – 룽꾸 국기봉 – 동반 – 뇨꿰강 4박 3일',
    subTitle: 'Tour Hà Nội – Quản Bạ – Yên Minh – Cột Cờ Lũng Cú – Phố Cổ Đồng Văn – Sông Nho Quế (4N3Đ)',
    region: '북부',
    subRegion: '하장 관광',
    city: '하장',
    category: '자유여행',
    priceVND: 7990000,
    duration: '4박 3일 (4N3Đ)',
    departure: '출발: 하노이 / 다낭 출발 (매주 목·금 출발)',
    imageUrl: '/images/hagiang.jpg',
    highlights: [
      '에메랄드빛 뇨꿰강(Sông Nho Quế) 협곡 전용 모터보트 프라이빗 투어',
      '베트남 최북단 룽꾸(Lũng Cú) 국기봉 정상 등정',
      '아시아에서 가장 험준하고 아름다운 마피렝 고개 파노라마',
      '동반 100년 고택 거리 야경 및 흐몽족 몽왕 궁전 탐방'
    ],
    included: [
      '산악 전문 안전 기사 및 VIP 전용 차량',
      '동반 & 메오박 최고급 부티크 호텔 3박',
      '뇨꿰강 전용 보트권 및 전 일정 식사/입장료',
      '한국어 전문 안전 가이드 밀착 동행'
    ],
    description: '베트남 여행자들의 버킷리스트 1위 하장 루프! 웅장한 카르스트 협곡과 뇨꿰강의 비경을 안전한 전용 차량과 숙련된 가이드로 편안하게 즐기실 수 있습니다.',
    rating: 5.0,
    reviewCount: 79
  },
  {
    id: 'vitraco-north-thainguyen-2d1n',
    title: '[VITRACO] 타이응우옌 떤끄엉 녹차마을 & 호누이꼭 생태 힐링 2박 1일',
    subTitle: 'Tour Du Lịch Sinh Thái Thái Nguyên – Đồi Chè Tân Cương – Hồ Núi Cốc (2N1Đ)',
    region: '북부',
    subRegion: '타이 응우옌 관광',
    city: '하노이',
    category: '자유여행',
    priceVND: 1850000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 하노이 / 다낭 출발 (매주 주말)',
    imageUrl: '/images/dalat_flower_garden.jpg',
    highlights: [
      '베트남 최고의 명차 타이응우옌 떤끄엉(Tân Cương) 녹차 언덕 산책',
      '전통 다도 체험 및 햇차 시음 & 티 마스터 강습',
      '호누이꼭(Hồ Núi Cốc) 전용 유람선 호수 크루즈',
      '베트남 소수민족 문화 박물관 관람'
    ],
    included: [
      '전용 리무진 왕복 교통편',
      '호수 뷰 4성급 호텔 1박 및 조식/중식/석식',
      '녹차 체험비 및 호수 유람선 탑승권',
      '한국어 전문 인솔 가이드'
    ],
    description: '끝없이 펼쳐지는 초록빛 차밭의 청량함과 호누이꼭 호수의 평온한 물결 속에서 지친 심신을 치유하는 타이응우옌 생태 웰니스 프로그램입니다.',
    rating: 4.7,
    reviewCount: 23
  },
  {
    id: 'vitraco-north-tuyenquang-2d1n',
    title: '[VITRACO] 투옌꽝 나항 수력발전호수 & 람빈 원시 비경 2박 1일',
    subTitle: 'Tour Khám Phá Vẻ Đẹp Thần Tiên Na Hang – Lâm Bình Tuyên Quang (2N1Đ)',
    region: '북부',
    subRegion: '투옌꽝 관광',
    city: '하노이',
    category: '자유여행',
    priceVND: 1950000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 하노이 / 다낭 출발 (매주 토요일)',
    imageUrl: '/images/cao_bang_bangioc_1787098400108.jpg',
    highlights: [
      '북부의 숨겨진 하롱베이 나항(Na Hang) 에메랄드 호수 보트 유람',
      '호수 한가운데 우뚝 솟은 칵포(Cọc Vài) 신비의 기암괴석',
      '람빈(Lâm Bình) 소수민족 전통 목조 가옥 체험',
      '쿠오이니(Khuổi Nhi) 천연 숲 폭포 닥터피시 발 마사지'
    ],
    included: [
      '전용 리무진 버스 왕복 배차',
      '나항 에코 롯지 1박 및 전통 산채 정식 식사',
      '나항 호수 전용 선박 탑승권 & 폭포 입장권',
      '현지 안내 가이드 및 여행자 보험'
    ],
    description: '관광객의 발길이 닿지 않은 태고의 자연을 간직한 투옌꽝 나항 호수에서 맑은 공기와 웅장한 산수화 같은 풍경을 만끽하는 프라이빗 탐방 코스입니다.',
    rating: 4.8,
    reviewCount: 19
  },

  // ===================== 베트남 중부 관광 =====================
  {
    id: 'vitraco-central-danang-bana-1d',
    title: '[VITRACO HOT] 다낭 – 바나힐스 1일 투어 (골든브릿지 & 케이블카 올포함)',
    subTitle: 'Tour Đà Nẵng – Bà Nà 1 Ngày (TOUR HOT nhất Vitraco)',
    region: '중부',
    subRegion: '다낭 관광',
    city: '다낭',
    category: '자유여행',
    priceVND: 1200000,
    duration: '1일 (당일 투어)',
    departure: '출발: 다낭 시내 전 호텔 픽업 (매일 출발)',
    imageUrl: '/images/danang_golden_bridge.jpg',
    highlights: [
      '거대한 신의 손이 받치고 있는 해발 1,487m 골든브릿지 인생샷',
      '세계 기네스 4개 부문 기록의 최장 케이블카 왕복 탑승',
      '유럽 중세풍 프랑스 빌리지 & 판타지파크 실내 테마파크 자유이용',
      '꽃들의 정원 르 자르뎅 다무르 & 와인 셀러 관람'
    ],
    included: [
      '다낭 시내 호텔 전용 픽업 및 샌딩 차량',
      '바나힐스 케이블카 왕복 승선권 및 테마파크 입장료 일체',
      '한국어 전문 가이드 동행 안내',
      '생수 및 여행자 보험'
    ],
    description: 'VITRACO TOUR 단일 상품 최다 판매 기록! 다낭 여행의 필수 코스 바나힐스를 거품 없는 현지 직영 정가로 가장 편안하고 안전하게 즐기실 수 있습니다.',
    rating: 5.0,
    reviewCount: 284
  },
  {
    id: 'vitraco-central-hue-heritage-5d4n',
    title: '[VITRACO] 중부 유산 대장정: 다낭 – 미선 – 호이안 – 바나힐 – 후에 – 라방 – 퐁냐 5박 4일',
    subTitle: 'Tour Đà Nẵng – Mỹ Sơn – Hội An – Bà Nà – Huế – La Vang – Động Phong Nha (5N4Đ)',
    region: '중부',
    subRegion: '후에 관광',
    city: '후에',
    category: '자유여행',
    priceVND: 3990000,
    duration: '5박 4일 (5N4Đ)',
    departure: '출발: 다낭 출발 (매일 출발 가능)',
    imageUrl: '/images/hue_imperial_citadel.jpg',
    highlights: [
      '유네스코 세계문화유산 후에 대남 황궁 & 카이딘 왕릉 탐방',
      '호이안 구시가지 야경 및 투본강 프라이빗 소원배',
      '신비의 퐁냐케방 국립공원 천연 종유석 동굴 보트 유람',
      '신비로운 참파 왕국의 성지 미선 유적지 관람'
    ],
    included: [
      'VITRACO VIP 리무진 5일 전 일정 단독 배차',
      '3성급 우수 호텔 4박 (다낭 2박 / 후에 2박) 및 전 일정 조식',
      '퐁냐 동굴 보트 승선권 및 유적지 입장권 일체 포함',
      '한국어 전문 문화유산 해설 가이드'
    ],
    description: '베트남 중부의 세계유산 4대 명소(후에, 호이안, 미선, 퐁냐)를 합리적인 가격과 단독 VIP 수송으로 알차게 엮어낸 VITRACO 대표 스테디셀러입니다.',
    rating: 4.9,
    reviewCount: 142
  },
  {
    id: 'vitraco-central-hue-thanhtan-2d1n',
    title: '[VITRACO 힐링] 알바 리조트 탄탄 온천 & 스파 디톡스 2박 1일',
    subTitle: 'Chương Trình Du Lịch Tái Tạo Năng Lượng – Alba Hot Springs Resort Thanh Tân (2N1Đ)',
    region: '중부',
    subRegion: '후에 관광',
    city: '후에',
    category: '자유여행',
    priceVND: 2590000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 다낭 / 후에 출발 (매일 출발)',
    imageUrl: '/images/vietnam_city_villa.jpg',
    highlights: [
      '해발 1,000m 천연 광천 온천수 온천욕 & 미네랄 풀 무제한 이용',
      '베트남 최장 560m 집라인 & 고공 와이어 로프 코스',
      '대나무 숲 산책로 명상 & 유기농 팜투테이블 웰빙 뷔페',
      '전통 허브 스파 및 족욕 디톡스 프로그램'
    ],
    included: [
      '다낭/후에 왕복 리무진 차량 배차',
      '알바 웰니스 리조트 디럭스룸 1박 및 조식',
      '온천 파크 자유입장권 & 액티비티 1회 포함',
      '웰빙 특식 2회 및 여행자 보험'
    ],
    description: '몸과 마음의 피로를 완벽하게 씻어내는 후에 최고의 프리미엄 온천 휴양 코스! VITRACO 특별 제휴 인하가(정가 3,090,000동 → 2,590,000동)로 제공합니다.',
    rating: 4.9,
    reviewCount: 37
  },
  {
    id: 'vitraco-central-nghean-3d2n',
    title: '[VITRACO] 응에안 킴리엔 센 마을 (호치민 주석 생가) & 끄어로 비치 3박 2일',
    subTitle: 'Tour Du Lịch Nghệ An – Quê Bác Làng Sen – Biển Cửa Lò (3N2Đ)',
    region: '중부',
    subRegion: '응에안 관광',
    city: '다낭',
    category: '자유여행',
    priceVND: 2890000,
    duration: '3박 2일 (3N2Đ)',
    departure: '출발: 다낭 / 빈(Vinh) 출발 (매주 금요일)',
    imageUrl: '/images/mykhe_beach.jpg',
    highlights: [
      '호치민 주석의 유년 시절 초가 생가 및 기념관 탐방',
      '중부의 대표 청정 휴양지 끄어로(Cửa Lò) 백사장 해변',
      '응에안 꽝쭝 황제 사당 & 람비엔 산 파노라마 조망',
      '끄어로 수산시장 싱싱한 해산물 바비큐 디너'
    ],
    included: [
      '전 일정 에어컨 전용 리무진 버스',
      '끄어로 해변 3성급 호텔 2박 및 조식/석식',
      '킴리엔 유적지 입장료 및 전문 문화해설사',
      '전 일정 차량 음료 및 보험'
    ],
    description: '베트남 건국의 아버지 호치민 주석의 고향 센 마을과 시원한 끄어로 해변을 함께 돌아보며 역사와 휴양을 동시에 누리는 의미 있는 여행입니다.',
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'vitraco-central-quangtri-dmz-1d',
    title: '[VITRACO 역사] 꽝찌 DMZ 비엔하이강 – 빈목 지하터널 – 라방 성지 역사 투어 1일',
    subTitle: 'Tour Di Tích Lịch Sử Quảng Trị: Cầu Hiền Lương – Sông Bến Hải – Địa Đạo Vịnh Mốc (1 Ngày)',
    region: '중부',
    subRegion: '꽝찌 관광',
    city: '후에',
    category: '자유여행',
    priceVND: 1190000,
    duration: '1일 (당일 투어)',
    departure: '출발: 다낭 / 후에 출발 (매일 출발 가능)',
    imageUrl: '/images/danang_city_dragon.jpg',
    highlights: [
      '베트남 남북 분단의 상징 17도선 히엔르엉 다리 & 비엔하이강',
      '포격 속에서도 주민 600명이 삶을 영위한 2km 빈목 지하터널 관람',
      '베트남 최대 가톨릭 성모 발현지 라방(La Vang) 대성당',
      '꽝찌 고대 성벽 전투 격전지 유적 답사'
    ],
    included: [
      '다낭/후에 픽업 및 전용 차량 배차',
      '빈목 터널 및 전 유적지 입장료 일체',
      '현지 전통 중식 정식 1회',
      '전문 한국어 역사 가이드 및 보험'
    ],
    description: '베트남 전쟁의 가장 치열했던 분단 역사와 평화의 소중함을 생생히 느낄 수 있는 당일 역사 교육 테마 투어입니다.',
    rating: 4.8,
    reviewCount: 44
  },
  {
    id: 'vitraco-central-quangngai-hamya-2d1n',
    title: '[VITRACO] 꽝응아이 하미아 리조트 온천 & 리선 화산섬 비경 2박 1일',
    subTitle: 'Tour Hamya Quảng Ngãi – Đảo Thiên Đường Lý Sơn (2N1Đ)',
    region: '중부',
    subRegion: '꽝응아이 관광',
    city: '다낭',
    category: '자유여행',
    priceVND: 1790000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 다낭 출발 (고속도로 직영 배차, 매주 주말)',
    imageUrl: '/images/phanrang_desert_jeep.jpg',
    highlights: [
      '천만 년 전 화산 폭발이 만든 에메랄드 섬 리선(Lý Sơn) 고속선 투어',
      '용암이 굳어 형성된 토보 게이트(Cổng Tò Vò) 절경',
      '하미아(Hamya) 온천 워터파크 & 천연 진흙 미네랄 풀',
      '화산토에서 재배한 명품 리선 외톨이 마늘밭 파노라마'
    ],
    included: [
      '다낭-꽝응아이 왕복 전용 리무진',
      '사끼 항구 ↔ 리선섬 고속선 왕복 티켓',
      '리조트 1박 숙박 및 현지 특식 3회',
      '전 구역 입장료 및 인솔 가이드'
    ],
    description: '다낭에서 고속도로로 빠르게 이동하여 천혜의 화산섬 리선의 에메랄드빛 바다와 하미아 천연 온천을 함께 누리는 가성비 최고 코스입니다.',
    rating: 5.0,
    reviewCount: 31
  },
  {
    id: 'vitraco-central-gialai-pleiku-3d2n',
    title: '[VITRACO 고원] 중부 고원 지아라이 쁠레이꾸 – 비엔호(T\'Nưng) – 맹덴 3박 2일',
    subTitle: 'Tour Khám Phá Tây Nguyên: Gia Lai – Biển Hồ T\'Nưng – Măng Đen – Kon Tum (3N2Đ)',
    region: '중부',
    subRegion: '지아라이 관광',
    city: '다낭',
    category: '자유여행',
    priceVND: 3290000,
    duration: '3박 2일 (3N2Đ)',
    departure: '출발: 다낭 / 쁠레이꾸 출발 (매주 금요일)',
    imageUrl: '/images/dalat.jpg',
    highlights: [
      '사화산 분화구에 형성된 에메랄드 호수 쁠레이꾸의 눈 비엔호(T\'Nưng)',
      '동남아풍 웅장한 건축미의 민탄(Minh Thành) 사찰',
      '제2의 달랏이라 불리는 맹덴(Măng Đen) 소나무 원시림',
      '꼰뚬 110년 전통 목조 성당 & 바나족 롱하우스 방문'
    ],
    included: [
      '고원 지대 전용 안락 리무진 수송',
      '호텔 2박 및 고원 특산 산나물/구이 식사 일체',
      '전 일정 관광지 입장권',
      '전문 가이드 및 여행자 보험'
    ],
    description: '푸른 원시 소나무 숲과 신비로운 분화구 호수, 소수민족의 순수한 문화가 살아 숨 쉬는 베트남 중부 고원(떠이응우옌) 힐링 로드입니다.',
    rating: 4.9,
    reviewCount: 27
  },
  {
    id: 'vitraco-central-nhatrang-doclet-4d3n',
    title: '[VITRACO 럭셔리] 칸화 나트랑 – 독렛 비치 – 옌마이신 제비집 마을 – 빈원더스 4박 3일',
    subTitle: 'Tour Du Lịch Nha Trang – Dốc Lết – Làng Yến Mai Sinh – VinWonders (4N3Đ)',
    region: '중부',
    subRegion: '칸화 관광',
    city: '나트랑',
    category: '자유여행',
    priceVND: 10000000,
    duration: '4박 3일 (4N3Đ)',
    departure: '출발: 다낭 / 나트랑 출발 (매일 출발)',
    imageUrl: '/images/nhatrang_bay.jpg',
    highlights: [
      '하얀 설탕 모래와 얕은 수심의 환상적인 독렛(Dốc Lết) 비치',
      '칸화성 특산 명품 제비집 생산지 옌마이신(Yến Mai Sinh) 견학 & 시음',
      '나트랑 바다 위를 가로지르는 해상 케이블카 & 빈원더스 올데이 패스',
      '참파 왕국의 유산 포나가르 첨탑 & 머드 온천 스파'
    ],
    included: [
      '나트랑 4~5성급 오션뷰 호텔 3박 및 전 일정 최고급 식사',
      '빈원더스 올인클루시브 자유이용권 & 케이블카',
      '아이리조트 천연 미네랄 머드 온천 스파권',
      '전 일정 단독 VIP 수송 리무진 및 가이드'
    ],
    description: '베트남 최고의 해양 휴양지 나트랑과 에메랄드 독렛 비치, 빈원더스 테마파크를 최고급 풀옵션으로 즐기는 프리미엄 럭셔리 패키지입니다.',
    rating: 5.0,
    reviewCount: 68
  },

  // ===================== 베트남 남부 관광 =====================
  {
    id: 'vitraco-south-mientay-mekong-4d3n',
    title: '[VITRACO 대표] 다낭 출발 메콩 델타 투어 (미토 – 벤째 – 껀터 – 수상시장) 4박 3일',
    subTitle: 'Tour Miền Tây sông nước miệt vườn: Mỹ Tho – Bến Tre – Cần Thơ (Khởi hành từ Đà Nẵng)',
    region: '남부',
    subRegion: '베트남 서부 관광',
    city: '호치민',
    category: '자유여행',
    priceVND: 8299000,
    duration: '4박 3일 (4N3Đ)',
    departure: '출발: 다낭 출발 (매일 출발 가능)',
    imageUrl: '/images/mekong_river_boat.jpg',
    highlights: [
      '메콩강 지류를 가로지르는 전통 삼판 나룻배 & 야자수 정글 뱃놀이',
      '벤째(Bến Tre) 코코넛 수제 사탕 공방 & 열대 과수원 시식',
      '서부 최대 껀터 까이랑(Cái Răng) 새벽 수상시장 탐방',
      '남부 전통 악기 연주 던까따이뜨 감상 및 메콩 메기 특식'
    ],
    included: [
      '다낭-호치민 항공편 연결 및 서부 전용 최신형 리무진 배차',
      '호치민 & 껀터 4성급 호텔 3박 및 조식 포함',
      '메콩강 대형 선박 및 소형 삼판선 탑승료 일체',
      '전 일정 현지 전통 특식 7회 및 여행자 보험 1억원'
    ],
    description: 'Vitraco 공식 웹사이트 메인 화면에 등록된 대표 남부 투어! 광활한 메콩강의 물줄기를 따라 남부 사람들의 정겨운 수상 삶과 과수원을 경험하는 정통 코스입니다.',
    rating: 5.0,
    reviewCount: 112
  },
  {
    id: 'vitraco-south-hochiminh-city-3d2n',
    title: '[VITRACO] 호치민 헤리티지: 통일궁 – 중앙우체국 – 구찌터널 – 사이공강 크루즈 3박 2일',
    subTitle: 'Tour Khám Phá TP. Hồ Chí Minh – Dinh Độc Lập – Địa Đạo Củ Chi (3N2Đ)',
    region: '남부',
    subRegion: '호치민시 관광',
    city: '호치민',
    category: '자유여행',
    priceVND: 3490000,
    duration: '3박 2일 (3N2Đ)',
    departure: '출발: 호치민 출발 (매일 출발)',
    imageUrl: '/images/danang_city_dragon_1788400718422.jpg',
    highlights: [
      '프랑스 식민지 시절 건축미를 간직한 사이공 중앙우체국 & 노트르담 대성당',
      '베트남 현대사의 중심 통일궁(독립궁) & 전쟁박물관 관람',
      '지하 3층 200km 길이의 미로 구찌터널 체험',
      '로맨틱한 사이공강 디너 크루즈 선상 뷔페 & 야경'
    ],
    included: [
      '호치민 시내 전용 리무진 3일 배차',
      '시내 4성급 호텔 2박 및 조식',
      '사이공 디너 크루즈 승선권 & 식사',
      '구찌터널 입장권 및 전담 한국어 가이드'
    ],
    description: '베트남 최대의 경제 수도 호치민의 역동적인 매력과 유서 깊은 프랑스풍 건축, 지하 구찌터널의 신비, 화려한 밤 야경을 모두 담았습니다.',
    rating: 4.8,
    reviewCount: 56
  },
  {
    id: 'vitraco-south-vinhlong-anbinh-2d1n',
    title: '[VITRACO] 빈롱 안빈섬 과수원 홈스테이 & 전통 남부 민속가요 2박 1일',
    subTitle: 'Tour Vĩnh Long Miệt Vườn: Cù Lao An Bình – Đờn Ca Tài Tử (2N1Đ)',
    region: '남부',
    subRegion: '빈롱 관광',
    city: '호치민',
    category: '자유여행',
    priceVND: 2190000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 호치민 출발 (매일 출발)',
    imageUrl: '/images/mekong_river_boat_1788400683530.jpg',
    highlights: [
      '메콩강 삼각주에 떠 있는 거대한 과수원 안빈(An Bình) 섬 자전거 투어',
      '제철 람부탄, 롱간, 두리안 과수원 직수확 시식',
      '유네스코 무형문화유산 남부 전통 민속가요 던까따이뜨 감상',
      '황토 가마에서 구워내는 전통 벽돌 공방 견학'
    ],
    included: [
      '호치민 픽업 전용 차량 왕복',
      '안빈섬 전통 가옥 홈스테이 1박 및 조식/석식',
      '과수원 과일 시식비 및 삼판 보트 승선료',
      '가이드 및 여행자 보험'
    ],
    description: '메콩 델타의 풍요로운 과수원 속에서 현지 농부들의 따뜻한 정과 소박한 전통 삶을 체험하는 힐링 홈스테이 투어입니다.',
    rating: 4.7,
    reviewCount: 31
  },
  {
    id: 'vitraco-south-cantho-cairang-2d1n',
    title: '[VITRACO] 껀터 서부의 수도: 까이랑 수상시장 & 닌끼우 선착장 야경 2박 1일',
    subTitle: 'Tour Cần Thơ: Chợ Nổi Cái Răng – Bến Ninh Kiều – Nhà Cổ Bình Thủy (2N1Đ)',
    region: '남부',
    subRegion: '껀터 관광',
    city: '호치민',
    category: '자유여행',
    priceVND: 2390000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 호치민 / 다낭 출발 (매일 출발)',
    imageUrl: '/images/mekong_river_boat.jpg',
    highlights: [
      '동틀 녘 수백 척의 상선이 모이는 까이랑(Cái Răng) 수상시장 활력 체험',
      '배 위에서 맛보는 뜨끈한 현지 쌀국수와 파인애플 간식',
      '영화 \'연인(L\'Amant)\' 촬영지 150년 전통 빈투이(Bình Thủy) 프랑스식 고택',
      '빛나는 닌끼우 선착장 보행교 야경 산책'
    ],
    included: [
      '전용 안락 리무진 버스',
      '껀터 시내 4성급 호텔 1박 및 조식',
      '새벽 전용 선박 탑승료 및 유적지 입장권',
      '전 일정 식사 및 전문 가이드'
    ],
    description: '서부 메콩 델타의 중심 도시 껀터에서 활기찬 아침 수상시장의 풍경과 우아한 19세기 프랑스풍 고택의 역사를 만나는 대표 코스입니다.',
    rating: 4.9,
    reviewCount: 48
  },
  {
    id: 'vitraco-south-angiang-tra-su-2d1n',
    title: '[VITRACO] 안장 쩌우독: 바쭈어쑤 영험 사당 & 짜스 맹그로브 생태림 2박 1일',
    subTitle: 'Tour An Giang – Miếu Bà Chúa Xứ Núi Sam – Rừng Tràm Trà Sư (2N1Đ)',
    region: '남부',
    subRegion: '안장 관광',
    city: '호치민',
    category: '자유여행',
    priceVND: 2290000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 호치민 출발 (매주 주말)',
    imageUrl: '/images/dalat_spring_lake_1787099173538.jpg',
    highlights: [
      '녹색 부평초 융단 위를 조용히 가로지르는 짜스(Trà Sư) 맹그로브 숲 보트',
      '남부 베트남 최대의 기도 영험지 샘산 바쭈어쑤(Bà Chúa Xứ) 사원',
      '국경 도시 쩌우독의 독특한 수상 가옥 마을 및 이슬람 모스크',
      '서부 특산 똠보(Bò Bảy Núi) 쇠고기 요리 석식'
    ],
    included: [
      '호치민 왕복 VIP 리무진 차량',
      '쩌우독 3~4성급 호텔 1박 및 식사 3회',
      '짜스 숲 모터보트 & 노 젓는 나룻배 승선료 일체',
      '인솔 가이드 및 여행자 보험'
    ],
    description: '초록빛 융단이 깔린 수중 맹그로브 숲의 신비로운 정경과 남부인들의 정신적 지주인 바쭈어쑤 사당을 참배하는 영성·생태 여행입니다.',
    rating: 4.8,
    reviewCount: 35
  },
  {
    id: 'vitraco-south-camau-cape-3d2n',
    title: '[VITRACO 종착지] 베트남 국토 최남단 까마우 곶 (Mũi Cà Mau) & 우민하 국립공원 3박 2일',
    subTitle: 'Tour Chinh Phục Cột Mốc Tọa Độ Mũi Cà Mau – Rừng U Minh Hạ (3N2Đ)',
    region: '남부',
    subRegion: '까마우 관광',
    city: '호치민',
    category: '자유여행',
    priceVND: 3690000,
    duration: '3박 2일 (3N2Đ)',
    departure: '출발: 호치민 / 다낭 출발 (매주 금요일)',
    imageUrl: '/images/phuquoc_sunset.jpg',
    highlights: [
      '동해와 서해가 만나는 국토 최남단 좌표 기념비(Mốc Tọa Độ GPS 0001)',
      '우민하(U Minh Hạ) 람사르 습지 야생 맹그로브 카누 탐험',
      '야생 꿀 채취 시연 및 맹그로브 숲 전망대 조망',
      '베트남 1위 맛을 자랑하는 까마우 명품 참게(Cua Cà Mau) 정식'
    ],
    included: [
      '전 일정 VIP 리무진 장거리 차량 배차',
      '까마우 시내 우수 호텔 2박 및 전 식사',
      '까마우 곶 쾌속선 탑승권 & 국립공원 입장료',
      '전문 인솔 가이드 및 1억원 보험'
    ],
    description: '베트남 국토의 땅끝 까마우 곶에 서서 광활한 바다와 거대한 맹그로브 습지를 정복하고, 최고급 까마우 게 요리를 맛보는 특별한 여정입니다.',
    rating: 5.0,
    reviewCount: 41
  },
  {
    id: 'vitraco-south-dongthap-sadec-2d1n',
    title: '[VITRACO] 동탑 연꽃의 땅: 트람침 철새 국립공원 & 사덱 꽃마을 2박 1일',
    subTitle: 'Tour Đồng Tháp Sen Hồng – Vườn Quốc Gia Tràm Chim – Làng Hoa Sa Đéc (2N1Đ)',
    region: '남부',
    subRegion: '동탑 관광',
    city: '호치민',
    category: '자유여행',
    priceVND: 2150000,
    duration: '2박 1일 (2N1Đ)',
    departure: '출발: 호치민 출발 (매주 토요일)',
    imageUrl: '/images/dalat_flower_garden_1788400752600.jpg',
    highlights: [
      '사계절 꽃이 만발하는 100년 전통 사덱(Sa Đéc) 꽃마을 산책',
      '붉은 정수리 두루미 서식지 트람침(Tràm Chim) 람사르 습지 보트 투어',
      '소설 \'연인\'의 실제 주인공 후인투이레(Huỳnh Thủy Lê) 고택',
      '연잎 밥, 연꽃 씨앗 탕 등 동탑 전통 연 요리 만찬'
    ],
    included: [
      '호치민 출발 전용 리무진 버스',
      '동탑 시내 호텔 1박 및 전 일정 식사',
      '트람침 국립공원 전용 보트 및 고택 입장료',
      '가이드 및 여행자 보험'
    ],
    description: '물길 위에 떠 있는 아름다운 꽃의 도시 사덱과 천연 습지 트람침의 평화로운 자연을 둘러보며 남부의 순수한 향기를 만끽하는 코스입니다.',
    rating: 4.8,
    reviewCount: 26
  },
  {
    id: 'vitraco-south-phuquoc-flight-4d4n',
    title: '[VITRACO 대표] 다낭 출발 푸꾸옥 섬 투어 4박 4일 (에메랄드 비치 & 그랜드월드)',
    subTitle: 'Du lịch Phú Quốc 4 ngày 4 đêm (Khởi hành từ Đà Nẵng)',
    region: '남부',
    subRegion: '푸꾸옥 관광',
    city: '푸꾸옥',
    category: '자유여행',
    priceVND: 5990000,
    duration: '4박 4일 (4N4Đ)',
    departure: '출발: 다낭 출발 (매일 출발)',
    imageUrl: '/images/phuquoc_sunset_cablecar_1787098424693.jpg',
    highlights: [
      '베트남 최고의 백사장 사오비치(Bãi Sao) 에메랄드 해변 자유 수영',
      '기네스 기록 최장 해상 케이블카 탑승 & 혼똠 워터파크',
      '잠들지 않는 도시 그랜드월드(Grand World) 베니스 수상 분수 레이저쇼',
      '푸꾸옥 야시장 싱싱한 성게, 왕새우, 랍스터 해산물 투어'
    ],
    included: [
      '다낭 출발 전 일정 교통 및 현지 전용 리무진 배차',
      '푸꾸옥 4성급 리조트 3박 및 조식 포함',
      '혼똠 케이블카 왕복 탑승권 & 워터파크 입장권',
      '한국어 전문 가이드 및 전 일정 주요 식사'
    ],
    description: 'Vitraco 공식 웹사이트 메인 화면에 등록된 대표 푸꾸옥 패키지! 다낭에서 출발하여 에메랄드빛 바다와 화려한 그랜드월드를 합리적인 가격에 누립니다.',
    rating: 5.0,
    reviewCount: 178
  },
  {
    id: 'vitraco-south-phuquoc-resort-3d2n',
    title: '[VITRACO 힐링] 푸꾸옥 진주섬 호캉스 & 4개 섬 스피드보트 호핑 3박 2일',
    subTitle: 'Tour Phú Quốc Thiên Đường Đảo Ngọc: 4 Đảo Canô – Lặn Ngắm San Hô (3N2Đ)',
    region: '남부',
    subRegion: '푸꾸옥 관광',
    city: '푸꾸옥',
    category: '자유여행',
    priceVND: 5490000,
    duration: '3박 2일 (3N2Đ)',
    departure: '출발: 푸꾸옥 공항 픽업 (매일 출발)',
    imageUrl: '/images/phuquoc_sunset.jpg',
    highlights: [
      '전용 쾌속 카누로 떠나는 메이룻·감기·감핀 4대 섬 호핑 투어',
      '천연 산호초 스노클링 및 SUP 패들보드 인생샷 촬영',
      '선셋사나토(Sunset Sanato) 해변 조형물 석양 포토존',
      '푸꾸옥 명품 후추 농장 & 천연 진주 양식장 견학'
    ],
    included: [
      '공항 픽업/샌딩 전용 리무진',
      '푸꾸옥 비치프런트 리조트 2박 및 조식',
      '카누 4개 섬 호핑 투어 및 스노클링 장비/촬영 일체',
      '해산물 특식 및 여행자 보험'
    ],
    description: '짧은 일정으로도 푸꾸옥의 에메랄드빛 청정 바다와 호핑 투어, 리조트 호캉스를 알차게 즐길 수 있는 알짜배기 힐링 프로그램입니다.',
    rating: 4.9,
    reviewCount: 92
  }
];

// Vitraco official sub-menus grouped by Northern, Central, Southern Vietnam
export const VITRACO_MENU_STRUCTURE = {
  북부: [
    '베트남 북서부 관광',
    '하노이 관광',
    '까오방 관광',
    '닌빈 관광',
    '하장 관광',
    '타이 응우옌 관광',
    '투옌꽝 관광'
  ],
  중부: [
    '다낭 관광',
    '후에 관광',
    '응에안 관광',
    '꽝찌 관광',
    '꽝응아이 관광',
    '지아라이 관광',
    '칸화 관광'
  ],
  남부: [
    '베트남 서부 관광',
    '호치민시 관광',
    '빈롱 관광',
    '껀터 관광',
    '안장 관광',
    '까마우 관광',
    '동탑 관광',
    '푸꾸옥 관광'
  ]
};

export interface VitracoTourCatalogProps {
  onOpenConsultation: (targetProduct?: Product | null) => void;
  exchangeRates: ExchangeRates;
  isHomeSection?: boolean;
}

export const VitracoTourCatalog: React.FC<VitracoTourCatalogProps> = ({
  onOpenConsultation,
  exchangeRates,
  isHomeSection = false
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'전체' | '북부' | '중부' | '남부'>('전체');
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cashBuyRate100 = exchangeRates.cashBuyRateKRWPer100VND || 5.85;

  const filteredItems = VITRACO_PRODUCTS_LIST.filter(item => {
    if (selectedRegion !== '전체' && item.region !== selectedRegion) return false;
    if (selectedSubRegion !== '전체' && item.subRegion !== selectedSubRegion) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subTitle.toLowerCase().includes(q);
      const matchRegion = item.subRegion.toLowerCase().includes(q);
      if (!matchTitle && !matchSub && !matchRegion) return false;
    }
    return true;
  });

  const handleConsultItem = (item: VitracoTourItem) => {
    const approxKRW = Math.round((item.priceVND / 100) * cashBuyRate100);
    const targetProd: Product = {
      id: item.id,
      title: item.title,
      subTitle: `${item.subTitle} (Vitraco 공식 정가: ${item.priceVND.toLocaleString()} VND / 약 ${approxKRW.toLocaleString()}원)`,
      category: item.category,
      region: item.region,
      city: item.city,
      priceKRW: approxKRW,
      priceVND: item.priceVND,
      duration: item.duration,
      imageUrl: item.imageUrl,
      description: item.description,
      included: item.included,
      excluded: ['개인 경비', '국제선 항공권'],
      departureCities: ['다낭', '하노이', '호치민', '인천', '부산'],
      tags: ['VITRACO직영', item.subRegion, `${item.priceVND.toLocaleString()}VND`],
      rating: item.rating,
      reviewCount: item.reviewCount,
      highlights: item.highlights
    };
    onOpenConsultation(targetProd);
  };

  return (
    <div className={isHomeSection ? 'py-8' : ''}>
      {/* Hero Header: Vitraco Official Domestic -> Vietnam Tours Partnership */}
      <div className={`relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 ${isHomeSection ? 'pt-8 pb-8 rounded-3xl border border-amber-500/30 mx-4 sm:mx-6 lg:mx-8 mb-8' : 'pt-10 pb-10 sm:pt-14 sm:pb-14 border-b border-slate-800'}`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-emerald-500/20 border border-amber-400/40 text-amber-300 text-xs font-black shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>VITRACO TOUR 공식 협력사 국내 관광 → 베트남 관광 상품 라인업</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            베트남 관광 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">(VITRACO 직영 상품)</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            협력사인 <strong className="text-amber-400 font-extrabold">VITRACO TOUR(비트락코 여행사)</strong>의 공식 베트남 국내 관광 상품과 베트남 현지 가격(VND)을 그대로 복사하여 제공합니다.
            <br className="hidden sm:inline" />
            원하시는 상품을 선택해 주시면 <strong className="text-emerald-300 font-bold">신짜오투어와 Vitraco 여행사 간에 가격과 일정을 1:1로 직접 맞춤 조정</strong>해 드립니다.
          </p>

          {/* Partner Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Vitraco 베트남 정가 (VND) 그대로 복사</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>신짜오 ✕ Vitraco 1:1 일정·가격 조정 지원</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>북부 · 중부 · 남부 전 지역 직영 차량 배차</span>
            </div>
          </div>
        </div>
      </div>


      {/* Vitraco Style 3-Column Mega Menu Navigation (Mirroring user's screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-950/80 rounded-2xl border border-amber-500/30 p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇻🇳</span>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <span>VITRACO 투어 필터</span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30">
                    베트남 북부 · 중부 · 남부 메뉴
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  아래 메뉴에서 원하는 지역을 누르시면 해당 Vitraco 관광 상품만 모아 보실 수 있습니다.
                </p>
              </div>
            </div>

            {/* Reset Filter Button */}
            <button
              onClick={() => {
                setSelectedRegion('전체');
                setSelectedSubRegion('전체');
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                selectedRegion === '전체' && selectedSubRegion === '전체'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              전체 상품 보기 ({VITRACO_PRODUCTS_LIST.length}개)
            </button>
          </div>

          {/* 3 Columns Grid Matching Screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-1">
            {/* Column 1: 베트남 북부 관광 */}
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => {
                    setSelectedRegion('북부');
                    setSelectedSubRegion('전체');
                  }}
                  className={`text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 ${
                    selectedRegion === '북부' && selectedSubRegion === '전체'
                      ? 'text-amber-400'
                      : 'text-white hover:text-amber-300'
                  }`}
                >
                  <span>🏛️</span>
                  <span>베트남 북부 관광</span>
                </button>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  7개 지역
                </span>
              </div>
              <ul className="space-y-1 text-xs">
                {VITRACO_MENU_STRUCTURE.북부.map(sub => {
                  const isSelected = selectedRegion === '북부' && selectedSubRegion === sub;
                  return (
                    <li key={sub}>
                      <button
                        onClick={() => {
                          setSelectedRegion('북부');
                          setSelectedSubRegion(sub);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition font-bold flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <span>• {sub}</span>
                        {isSelected && <span className="text-[10px]">✔</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 2: 베트남 중부 관광 */}
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => {
                    setSelectedRegion('중부');
                    setSelectedSubRegion('전체');
                  }}
                  className={`text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 ${
                    selectedRegion === '중부' && selectedSubRegion === '전체'
                      ? 'text-amber-400'
                      : 'text-white hover:text-amber-300'
                  }`}
                >
                  <span>🌊</span>
                  <span>베트남 중부 관광</span>
                </button>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  8개 지역
                </span>
              </div>
              <ul className="space-y-1 text-xs">
                {VITRACO_MENU_STRUCTURE.중부.map(sub => {
                  const isSelected = selectedRegion === '중부' && selectedSubRegion === sub;
                  return (
                    <li key={sub}>
                      <button
                        onClick={() => {
                          setSelectedRegion('중부');
                          setSelectedSubRegion(sub);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition font-bold flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <span>• {sub}</span>
                        {isSelected && <span className="text-[10px]">✔</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: 베트남 남부 관광 */}
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <button
                  onClick={() => {
                    setSelectedRegion('남부');
                    setSelectedSubRegion('전체');
                  }}
                  className={`text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 ${
                    selectedRegion === '남부' && selectedSubRegion === '전체'
                      ? 'text-amber-400'
                      : 'text-white hover:text-amber-300'
                  }`}
                >
                  <span>🌴</span>
                  <span>베트남 남부 관광</span>
                </button>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  9개 지역
                </span>
              </div>
              <ul className="space-y-1 text-xs">
                {VITRACO_MENU_STRUCTURE.남부.map(sub => {
                  const isSelected = selectedRegion === '남부' && selectedSubRegion === sub;
                  return (
                    <li key={sub}>
                      <button
                        onClick={() => {
                          setSelectedRegion('남부');
                          setSelectedSubRegion(sub);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition font-bold flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <span>• {sub}</span>
                        {isSelected && <span className="text-[10px]">✔</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Current Filter State & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-800/70 p-3 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="text-slate-400 font-bold">현재 선택된 분류:</span>
            <span className="bg-amber-500/20 text-amber-300 font-black px-2.5 py-1 rounded-md border border-amber-500/30">
              {selectedRegion === '전체' ? '베트남 전역' : `베트남 ${selectedRegion}부`}
            </span>
            {selectedSubRegion !== '전체' && (
              <span className="bg-emerald-500/20 text-emerald-300 font-black px-2.5 py-1 rounded-md border border-emerald-500/30">
                {selectedSubRegion}
              </span>
            )}
            <span className="text-slate-400">
              (총 <strong className="text-white font-extrabold">{filteredItems.length}</strong>개 상품)
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="상품명, 도시 검색 (예: 메콩 델타, 푸꾸옥)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-white placeholder-slate-400 focus:outline-hidden focus:border-amber-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 rounded-3xl border border-slate-700/50 space-y-4">
            <span className="text-4xl block">🔍</span>
            <h3 className="text-lg font-bold text-white">해당 카테고리의 상품이 없습니다.</h3>
            <p className="text-xs text-slate-400">다른 지역을 선택하거나 전체보기를 눌러주세요.</p>
            <button
              onClick={() => {
                setSelectedRegion('전체');
                setSelectedSubRegion('전체');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
            >
              전체 상품 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const approxKRW = Math.round((item.priceVND / 100) * cashBuyRate100);

              return (
                <div
                  key={item.id}
                  className="bg-slate-800/90 rounded-2xl border border-slate-700/80 hover:border-amber-400/60 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                    {/* Vitraco MOU direct badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                        VITRACO 직영
                      </span>
                      <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                        {item.subRegion}
                      </span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs text-amber-300 border border-amber-400/40 text-[11px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration}</span>
                    </div>

                    {/* Departure info on image bottom */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                      <span className="truncate">{item.departure}</span>
                      <span className="text-amber-400 font-bold shrink-0 flex items-center gap-1">
                        ★ {item.rating.toFixed(1)} ({item.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-black text-white text-base leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      
                      {/* Vietnamese reference title */}
                      <p className="text-[11px] text-slate-400 italic line-clamp-1 border-l-2 border-amber-400/50 pl-2">
                        {item.subTitle}
                      </p>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                        {item.description}
                      </p>

                      {/* Highlights Bullet */}
                      <div className="pt-2 border-t border-slate-700/60 space-y-1">
                        {item.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Box & Action Buttons */}
                    <div className="pt-3 border-t border-slate-700/80 space-y-3">
                      {/* Exact Vitraco Price in VND */}
                      <div className="bg-slate-950/70 p-2.5 rounded-xl border border-amber-500/30 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Vitraco 공식 베트남 가격:</span>
                          <span className="text-lg sm:text-xl font-black text-amber-400 tracking-tight">
                            {item.priceVND.toLocaleString()} <span className="text-xs font-bold text-amber-300">VND</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">원화 환산 기준:</span>
                          <span className="text-xs font-black text-emerald-300">
                            약 {approxKRW.toLocaleString()}원
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 text-center">
                        ※ 신짜오투어 ✕ Vitraco와 1:1 상담 시 일정 및 단독 견적 협의 가능
                      </p>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => handleConsultItem(item)}
                          className="w-full py-2.5 px-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer shadow-md"
                        >
                          <span>1:1 일정·가격 협의</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenKakaoTalkDirect()}
                          className="w-full py-2.5 px-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                          <span>카톡 1:1 문의</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Partnership Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-slate-950 via-teal-950/60 to-slate-950 border border-teal-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
            🤝 신짜오투어 ✕ VITRACO TOUR 공식 업무협약(MOU)
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Vitraco 투어와의 긴밀한 협의를 통해 최상의 일정과 가격을 만들어 드립니다
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
            원하시는 관광지가 있거나 여러 지역을 묶어 단독 VIP 리무진 코스를 구성하고 싶으신가요?
            <br />
            한국 총괄 대표(김동완)와 베트남 Vitraco 본사 전담팀이 실시간으로 가격과 일정을 조정해 드립니다.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenConsultation(null)}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <span>맞춤 견적 & 일정 상담 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleOpenKakaoTalkDirect()}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>카카오톡 실시간 상담</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DevProductsPage: React.FC<DevProductsPageProps> = ({
  onSelectProduct,
  onOpenConsultation,
  onNavigateHome,
  exchangeRates
}) => {
  const cashBuyRate100 = exchangeRates.cashBuyRateKRWPer100VND || 5.85;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>← 신짜오투어 메인으로 돌아가기</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-400/30 font-bold">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>환율 기준: 100동당 {cashBuyRate100.toFixed(2)}원</span>
            </span>
            <a
              href={COMPANY_PHONE_TEL}
              className="hidden md:inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white font-extrabold"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{COMPANY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      <VitracoTourCatalog
        onOpenConsultation={onOpenConsultation}
        exchangeRates={exchangeRates}
        isHomeSection={false}
      />
    </div>
  );
};
