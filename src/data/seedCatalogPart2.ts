import { Product } from '../types';

export const COMPREHENSIVE_CATALOG_PART2: Product[] = [
  // =========================================================================
  // 3. 푸꾸옥 (PHU QUOC)
  // =========================================================================
  {
    id: 'prod-phuquoc-pkg-01',
    title: '[푸꾸옥/남태평양감성] 5성급 인터컨티넨탈 & 혼똔섬 해상 케이블카 · 빈원더스 사파리 3박 5일',
    subTitle: '5성급 비치 프론트 리조트 + 세계 최장 7.9km 해상 케이블카 + 빈펄 사파리 & 그랜드월드 분수쇼 (NO쇼핑)',
    category: '추천패키지',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 850000,
    priceVND: 15700000,
    duration: '3박 5일',
    imageUrl: "/images/phuquoc_sunset.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 185,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산', '청주'],
    tags: ['#푸꾸옥3박5일', '#사파리', '#혼똔섬케이블카', '#그랜드월드', '#5성급리조트', '#NO쇼핑'],
    description: '베트남의 숨겨진 에메랄드빛 진주 푸꾸옥에서 즐기는 가족/연인 최적화 힐링 휴양과 테마파크 어드벤처!',
    included: [
      '5성급 프리미엄 비치 리조트 3박 (오션뷰, 조식 포함)',
      '단독 전용 차량 및 한국어 전문 가이드',
      '혼똔섬 왕복 해상 케이블카 & 아쿠아토피아 워터파크 티켓',
      '빈원더스 & 빈펄 사파리 VIP 입장권',
      '90분 전신 힐링 아로마 스파 1회'
    ],
    excluded: ['국제선 항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 공항 도착 ➔ 가이드 미팅 ➔ 5성급 리조트 체크인 & 비치 힐링',
        description: '공항 도착 후 리조트 체크인 및 프라이빗 비치 휴식.',
        meal: '조식: - | 중식: - | 석식: 현지 해산물 만찬',
        hotel: '인터컨티넨탈 푸꾸옥 롱비치 리조트 5성급'
      },
      {
        day: 2,
        title: '혼똔섬 7.9km 해상 케이블카 ➔ 워터파크 ➔ 선셋타운 키스브릿지',
        description: '바다 위를 가로지르는 세계 최장 케이블카와 선셋타운 야경.',
        meal: '조식: 리조트식 | 중식: 뷔페 | 석식: 선셋 레스토랑',
        hotel: '인터컨티넨탈 푸꾸옥 리조트'
      },
      {
        day: 3,
        title: '빈펄 사파리 ➔ 빈원더스 테마파크 ➔ 그랜드월드 분수쇼',
        description: '야외 사파리 체험 및 그랜드월드 빛의 분수쇼 관람.',
        meal: '조식: 리조트식 | 중식: 테마파크식 | 석식: 분짜 특식',
        hotel: '인터컨티넨탈 푸꾸옥 리조트'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 킹콩마트 쇼핑 ➔ 90분 스파 ➔ 공항 샌딩',
        description: '킹콩마트 쇼핑 및 스파 마사지 후 공항 샌딩.',
        meal: '조식: 리조트식 | 중식: 쌀국수 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-phuquoc-pkg-02',
    title: '[푸꾸옥/남부호핑] 푸꾸옥 5성급 풀만 리조트 & 4개 섬 스노클링 보트 투어 4박 5일',
    subTitle: '풀만 비치 리조트 + 에메랄드 감기섬/메럿섬 스노클링 + 선셋타운 불꽃쇼',
    category: '추천패키지',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 890000,
    priceVND: 16500000,
    duration: '4박 5일',
    imageUrl: "/images/phuquoc_sunset.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 96,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#푸꾸옥', '#호핑투어', '#스노클링', '#선셋타운', '#풀만리조트'],
    description: '청정 푸꾸옥 남부 4개 섬의 산호초를 탐험하는 단독 스노클링 호핑과 럭셔리 리조트 휴양의 결합!',
    included: [
      '풀만 푸꾸옥 5성급 리조트 4박 (조식 포함)',
      '단독 전용 차량 및 가이드',
      '남부 4섬 호핑 전용 스피드보트 & 스노클링 장비',
      '선셋타운 키스 오브 더 씨 불꽃쇼 티켓'
    ],
    excluded: ['항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 도착 ➔ 리조트 체크인',
        description: '공항 픽업 후 리조트 체크인.',
        meal: '조식: - | 중식: - | 석식: 로컬 씨푸드',
        hotel: '풀만 푸꾸옥 리조트'
      },
      {
        day: 2,
        title: '남부 4섬 럭셔리 호핑 스피드보트 투어',
        description: '산호초 스노클링 및 선상 점심, 패들보드 인생샷.',
        meal: '조식: 호텔식 | 중식: 선상 해산물식 | 석식: 시내 맛집',
        hotel: '풀만 푸꾸옥 리조트'
      },
      {
        day: 3,
        title: '혼똔섬 케이블카 & 선셋타운 불꽃쇼',
        description: '워터파크 체험 및 밤하늘을 수놓는 초대형 불꽃쇼.',
        meal: '조식: 호텔식 | 중식: 뷔페 | 석식: 이탈리안 디너',
        hotel: '풀만 푸꾸옥 리조트'
      },
      {
        day: 4,
        title: '자유 힐링 & 스파 ➔ 공항 샌딩',
        description: '리조트 휴식 및 마사지 후 공항 이동.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 한정식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-phuquoc-golf-01',
    title: '[푸꾸옥/골프 36홀] 빈펄 골프 푸꾸옥 36홀 & 5성급 빈펄 리조트 3박 5일',
    subTitle: '원시림 열대우림 속 18홀 챔피언십 코스 2회 라운딩 + 1인 1캐디 + 5성급 리조트 숙박',
    category: '골프투어',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 1150000,
    priceVND: 21300000,
    duration: '3박 5일',
    imageUrl: "/images/vietnam_golf_resort.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 64,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#푸꾸옥골프', '#빈펄푸꾸옥', '#36홀라운딩', '#열대우림코스'],
    description: '유네스코 생물권 보전지역 푸꾸옥 북부 열대우림에 자리잡은 IMG 설계 빈펄 골프장에서 즐기는 청정 라운딩!',
    included: [
      '5성급 빈펄 리조트 3박 (조식 포함)',
      '36홀 그린피 + 2인 1카트 + 1인 1캐디피',
      '공항/골프장 전용 셔틀 & VIP 차량',
      '클럽하우스 중식 쿠폰 2회'
    ],
    excluded: ['캐디팁 ($15~$20/18홀)', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 36,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['빈펄 골프 푸꾸옥 (18홀 × 2회)']
    },
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 도착 ➔ 빈펄 리조트 체크인',
        description: '공항 픽업 후 리조트 체크인 및 휴식.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '빈펄 리조트 푸꾸옥 5성급'
      },
      {
        day: 2,
        title: '1일차: 빈펄 골프 푸꾸옥 18홀 라운딩',
        description: '울창한 원시림 코스 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 해산물 디너',
        hotel: '빈펄 리조트 푸꾸옥'
      },
      {
        day: 3,
        title: '2일차: 빈펄 골프 푸꾸옥 18홀 라운딩 ➔ 그랜드월드',
        description: '18홀 라운딩 후 그랜드월드 야경 투어.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 로컬 맛집',
        hotel: '빈펄 리조트 푸꾸옥'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 90분 스파 ➔ 공항 샌딩',
        description: '쇼핑 및 공항 이동.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-phuquoc-golf-02',
    title: '[푸꾸옥/골프 54홀] 에스츄어리 & 빈펄 골프 푸꾸옥 54홀 럭셔리 라운딩 4박 5일',
    subTitle: '푸꾸옥 최고급 골프 코스 3일간 54홀 완주 + 5성급 풀만 리조트 숙박',
    category: '골프투어',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 1450000,
    priceVND: 27000000,
    duration: '4박 5일',
    imageUrl: "/images/vietnam_golf_resort.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 42,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#푸꾸옥골프', '#54홀라운딩', '#풀만리조트', '#VIP골프'],
    description: '푸꾸옥의 에메랄드빛 바다와 열대 자연을 배경으로 54홀을 쾌적하게 즐기는 최고급 골프 패키지입니다.',
    included: [
      '5성급 리조트 4박 (조식 포함)',
      '54홀 그린피 + 카트 + 캐디피 올포함',
      '전 일정 골프 전용 리무진 밴',
      '클럽하우스 중식 쿠폰 3회 + 90분 스파 2회'
    ],
    excluded: ['캐디팁', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['빈펄 골프 푸꾸옥', '에스츄어리 골프 코스']
    },
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 도착 ➔ 리조트 체크인',
        description: '공항 픽업 후 리조트 체크인.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '풀만 푸꾸옥 리조트'
      },
      {
        day: 2,
        title: '1일차: 빈펄 골프 푸꾸옥 18홀',
        description: '18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 씨푸드',
        hotel: '풀만 푸꾸옥 리조트'
      },
      {
        day: 3,
        title: '2일차: 에스츄어리 골프 코스 18홀',
        description: '18홀 라운딩 후 마사지.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 바베큐',
        hotel: '풀만 푸꾸옥 리조트'
      },
      {
        day: 4,
        title: '3일차: 빈펄 골프 18홀',
        description: '18홀 라운딩 후 선셋타운 관광.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한정식',
        hotel: '풀만 푸꾸옥 리조트'
      },
      {
        day: 5,
        title: '체크아웃 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-phuquoc-villa-01',
    title: '[푸꾸옥/독채풀빌라] 사오비치 선셋 3베드룸 프라이빗 독채 풀빌라 3박 5일',
    subTitle: '전용 인피니티 풀 + 프라이빗 비치 직결 + 매일 플로팅 조식 + 단독 차량 & 가이드',
    category: '풀빌라',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 990000,
    priceVND: 18400000,
    duration: '3박 5일',
    imageUrl: "/images/vietnam_beach_villa.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 45,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '부산'],
    tags: ['#푸꾸옥풀빌라', '#독채풀빌라', '#사오비치', '#플로팅조식', '#오션뷰'],
    description: '푸꾸옥의 가장 아름다운 에메랄드 해변 사오비치 인근에 자리한 3베드룸 단독 풀빌라입니다.',
    included: [
      '3베드룸 오션뷰 독채 풀빌라 3박',
      '공항 왕복 전용 차량 및 가이드',
      '매일 플로팅 조식 룸서비스',
      '투숙객 전원 90분 스파'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '사오비치 선셋 3베드룸 풀빌라',
      bedrooms: 3,
      bathrooms: 3,
      beds: '킹베드 3개',
      maxOccupancy: 8,
      standardOccupancy: 6,
      privatePool: true,
      oceanView: true,
      areaSqm: 380,
      amenities: ['전용 인피니티 풀', '오션뷰 발코니', '주방 조리시설', 'BBQ 그릴', '24시간 버틀러'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 공항 도착 ➔ 풀빌라 체크인 & 웰컴 드링크',
        description: '풀빌라 체크인 후 전용 풀에서 힐링.',
        meal: '조식: - | 중식: - | 석식: 씨푸드 디너',
        hotel: '사오비치 선셋 3베드룸 풀빌라'
      },
      {
        day: 2,
        title: '플로팅 조식 ➔ 혼똔섬 케이블카 ➔ 풀사이드 BBQ',
        description: '플로팅 조식 후 케이블카 관광, 저녁 바베큐.',
        meal: '조식: 플로팅 조식 | 중식: 뷔페 | 석식: 풀사이드 BBQ',
        hotel: '사오비치 선셋 3베드룸 풀빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 휴양 또는 빈원더스 투어',
        description: '풀빌라 힐링 휴식 및 스파.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 로컬 맛집',
        hotel: '사오비치 선셋 3베드룸 풀빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '킹콩마트 쇼핑 후 공항 샌딩.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-phuquoc-villa-02',
    title: '[푸꾸옥/대저택] 롱비치 5성급 4베드룸 오션프론트 패밀리 풀빌라 3박 5일',
    subTitle: '최대 12인 수용 + 초대형 잔디 가든 + 프라이빗 비치 + 실내 주방 & 노래방 설비',
    category: '풀빌라',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 1200000,
    priceVND: 22300000,
    duration: '3박 5일',
    imageUrl: "/images/vietnam_beach_villa.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 39,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#4베드룸', '#패밀리풀빌라', '#롱비치', '#노래방', '#오션프론트'],
    description: '푸꾸옥 롱비치에 위치한 대가족 맞춤형 4베드룸 최고급 풀빌라입니다.',
    included: [
      '4베드룸 독채 풀빌라 3박',
      '전용 16인승 리무진 차량 & 기사',
      '매일 조식 + 1회 통돼지 바비큐 파티',
      '스파 마사지 1회'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '푸꾸옥 롱비치 4베드룸 맨션',
      bedrooms: 4,
      bathrooms: 5,
      beds: '킹베드 3개 + 트윈 2개',
      maxOccupancy: 12,
      standardOccupancy: 8,
      privatePool: true,
      oceanView: true,
      areaSqm: 480,
      amenities: ['15m 인피니티 풀', '프라이빗 정원', '노래방 음향설비', 'BBQ 시설'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 도착 ➔ 체크인 & 웰컴 파티',
        description: '체크인 후 휴식.',
        meal: '조식: - | 중식: - | 석식: 쉐프 특식',
        hotel: '푸꾸옥 롱비치 4베드룸 맨션'
      },
      {
        day: 2,
        title: '사파리 & 테마파크 ➔ 풀사이드 통돼지 BBQ',
        description: '사파리 투어 후 저녁 바베큐 파티.',
        meal: '조식: 빌라 조식 | 중식: 테마파크 | 석식: BBQ 파티',
        hotel: '푸꾸옥 롱비치 4베드룸 맨션'
      },
      {
        day: 3,
        title: '전일 풀빌라 휴양 & 노래방 파티',
        description: '프라이빗 수영 및 노래방 이용.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 해산물',
        hotel: '푸꾸옥 롱비치 4베드룸 맨션'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 빌라 조식 | 중식: 한정식 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-phuquoc-free-01',
    title: '[푸꾸옥 자유/단독 스피드보트] 푸꾸옥 남부 4개 섬 스노클링 & 바다낚시 프라이빗 투어',
    subTitle: '우리 일행 단독 스피드보트 대절 + 감기섬/메럿섬 산호초 스노클링 + 선상 낚시 & 해산물 점심',
    category: '자유여행',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 95000,
    priceVND: 1760000,
    duration: '1일 데이투어',
    imageUrl: "/images/phuquoc_sunset.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 310,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['푸꾸옥 호텔 픽업'],
    tags: ['#푸꾸옥호핑', '#단독스피드보트', '#스노클링', '#바다낚시', '#선셋타운'],
    description: '타인과 섞이지 않는 단독 쾌속 스피드보트를 타고 푸꾸옥 최고의 산호초 군락지 4개 섬을 완벽하게 즐깁니다.',
    included: [
      '호텔 왕복 픽업 전용 차량',
      '단독 전용 스피드보트 대절 및 선장/가이드',
      '스노클링 마스크, 구명조끼, 바다낚시 장비',
      '선상 해산물 런치 & 시원한 음료'
    ],
    excluded: ['개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '08:30 픽업 ➔ 안터이 항구 출항 ➔ 감기섬/메럿섬 스노클링 ➔ 선상 낚시 & 런치 ➔ 선셋타운 드롭',
        description: '에메랄드 바다 스노클링 및 인생샷 촬영.',
        meal: '중식: 선상 해산물식',
        hotel: '개별 숙소'
      }
    ]
  },
  {
    id: 'prod-phuquoc-free-02',
    title: '[푸꾸옥 자유/1일 렌터카] 푸꾸옥 북부/남부 핵심 코스 1일 맞춤 프라이빗 투어',
    subTitle: '16인승 전용 리무진 1일 10시간 단독 대절 (사파리, 그랜드월드, 혼똔섬, 킹콩마트 자유 선택)',
    category: '자유여행',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 180000,
    priceVND: 3350000,
    duration: '1일 (10시간)',
    imageUrl: "/images/phuquoc_sunset.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 220,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['푸꾸옥 전 지역 호텔 픽업'],
    tags: ['#푸꾸옥렌트카', '#단독기사', '#맞춤자유일정', '#가족자유여행'],
    description: '넓은 푸꾸옥 섬을 전용 기사와 함께 원하는 일정대로 편안하게 이동하는 100% 프라이빗 차량 대절 투어입니다.',
    included: [
      '16인승 전용 차량 1일 10시간 대절',
      '전담 기사, 유류비, 주차료, 톨비 일체 포함',
      '호텔 픽업 및 원하는 장소 드롭'
    ],
    excluded: ['입장료', '식사비', '기사 팁'],
    itinerary: [
      {
        day: 1,
        title: '호텔 로비 미팅 ➔ 고객 희망 맞춤 일정 (북부 사파리 or 남부 케이블카 등) ➔ 숙소 복귀',
        description: '원하는 시간과 장소를 자유롭게 지정.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  },

  // =========================================================================
  // 4. 하노이 / 하롱베이 (HANOI / HA LONG)
  // =========================================================================
  {
    id: 'prod-hanoi-halong-pkg-01',
    title: '[하노이·하롱베이/유네스코명품] 하노이 시내 & 하롱베이 6성급 럭셔리 크루즈 1박 3박 5일',
    subTitle: '하롱베이 6성급 앰배서더 크루즈 1박 (발코니 오션뷰 캐빈) + 닌빈 짱안 유람선 + 하노이 5성급 롯데호텔',
    category: '추천패키지',
    region: '북부',
    city: '하노이',
    priceKRW: 890000,
    priceVND: 16500000,
    duration: '3박 5일',
    imageUrl: "/images/halong_cruise.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 260,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '부산', '대구', '청주'],
    tags: ['#하노이', '#하롱베이크루즈', '#닌빈짱안', '#6성급크루즈', '#NO쇼핑', '#북부대표'],
    description: '세계 7대 자연경관 하롱베이에서 6성급 크루즈 1박을 하며 신비로운 기암괴석과 선상 갈라 디너를 즐기는 최고급 패키지입니다.',
    included: [
      '하노이 5성급 롯데호텔 2박 + 하롱베이 6성급 크루즈 1박',
      '단독 VIP 리무진 차량 & 공인 한국어 가이드',
      '하롱베이 선상 해산물 뷔페 및 갈라 디너',
      '닌빈 짱안 유네스코 나룻배 탑승권',
      '90분 VIP 스파 마사지 1회'
    ],
    excluded: ['국제선 항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '하노이 노이바이 공항 도착 ➔ 가이드 미팅 ➔ 5성급 호텔 체크인',
        description: '공항 도착 후 호텔 체크인 및 호안끼엠 호수 산책.',
        meal: '조식: - | 중식: - | 석식: 하노이 전통 쌀국수',
        hotel: '하노이 5성급 롯데호텔'
      },
      {
        day: 2,
        title: '하롱베이 6성급 크루즈 승선 ➔ 숭솟 동굴 ➔ 티톱섬 전망대 ➔ 선상 갈라디너',
        description: '크루즈 승선 후 선상 뷔페와 기암괴석 탐방, 카약 체험 및 일몰 파티.',
        meal: '조식: 호텔식 | 중식: 선상 뷔페 | 석식: 선상 갈라 디너',
        hotel: '하롱베이 6성급 앰배서더 크루즈 (발코니 룸)'
      },
      {
        day: 3,
        title: '일출 태극권 ➔ 하롱베이 하선 ➔ 닌빈 짱안 나룻배 생태 투어 ➔ 하노이 귀환',
        description: '육지의 하롱베이 닌빈 짱안 동굴 나룻배 투어 후 하노이 복귀.',
        meal: '조식: 선상식 | 중식: 닌빈 염소고기/전통식 | 석식: 미슐랭 분짜',
        hotel: '하노이 5성급 롯데호텔'
      },
      {
        day: 4,
        title: '하노이 바딘 광장 & 문묘 ➔ 90분 스파 ➔ 롯데마트 쇼핑 ➔ 공항 샌딩',
        description: '하노이 랜드마크 관광 및 90분 마사지 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 한정식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-hanoi-halong-pkg-02',
    title: '[북부완전정복] 하노이 & 하롱베이 당일 크루즈 + 닌빈 짱안 · 항무아 4박 5일',
    subTitle: '하노이 5성급 호텔 연박 + 럭셔리 하롱베이 당일 크루즈 + 항무아 파노라마 전망대',
    category: '추천패키지',
    region: '북부',
    city: '하노이',
    priceKRW: 720000,
    priceVND: 13400000,
    duration: '4박 5일',
    imageUrl: "/images/halong_cruise.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 140,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#하노이', '#하롱베이', '#항무아', '#닌빈', '#가족여행'],
    description: '호텔 이동 없이 하노이 5성급 호텔에 연박하며 하롱베이와 닌빈을 편안하게 탐방하는 알찬 패키지입니다.',
    included: [
      '하노이 5성급 호텔 4박 (조식 포함)',
      '단독 VIP 리무진 차량 & 전담 가이드',
      '하롱베이 당일 럭셔리 크루즈 & 뷔페 중식',
      '닌빈 짱안 나룻배 및 항무아 입장권'
    ],
    excluded: ['항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 호텔 체크인',
        description: '공항 픽업 및 휴식.',
        meal: '조식: - | 중식: - | 석식: 로컬 미식',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 2,
        title: '하롱베이 럭셔리 당일 크루즈 투어',
        description: '고속도로 이동 후 크루즈 탑승 및 숭솟 동굴, 티톱섬 관광.',
        meal: '조식: 호텔식 | 중식: 선상 뷔페 | 석식: 하노이 맛집',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 3,
        title: '닌빈 짱안 나룻배 & 항무아 전망대 투어',
        description: '짱안 동굴 보트 탑승 및 항무아 500계단 파노라마 조망.',
        meal: '조식: 호텔식 | 중식: 닌빈 향토식 | 석식: 바베큐',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 4,
        title: '하노이 시내 명소 & 스파 ➔ 공항 샌딩',
        description: '하노이 구시가지 관광 후 공항 이동.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 한정식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-hanoi-golf-01',
    title: '[하노이/골프 54홀] 스카이레이크 & 롱비엔 CC 명문 54홀 3박 5일',
    subTitle: '베트남 1위 회원제 코스 스카이레이크 36홀 + 롱비엔 CC 18홀 + 하노이 5성급 호텔',
    category: '골프투어',
    region: '북부',
    city: '하노이',
    priceKRW: 1250000,
    priceVND: 23200000,
    duration: '3박 5일',
    imageUrl: "/images/vietnam_golf_resort.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 88,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#하노이골프', '#스카이레이크', '#롱비엔CC', '#54홀라운딩'],
    description: '베트남 최고 난이도와 명성을 자랑하는 스카이레이크 CC와 도심형 명문 롱비엔 CC에서 즐기는 챔피언십 라운딩!',
    included: [
      '하노이 5성급 호텔 3박 (2인 1실, 조식 포함)',
      '54홀 그린피 + 카트 + 1인 1캐디피',
      '전 일정 골프 전용 리무진 밴',
      '클럽하우스 중식 쿠폰 3회 + 90분 골프 마사지'
    ],
    excluded: ['캐디팁 ($15~$20/18홀)', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['스카이레이크 CC (레이크 코스 18홀)', '스카이레이크 CC (스카이 코스 18홀)', '롱비엔 CC (18홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 호텔 체크인 및 휴식',
        description: '공항 픽업 후 호텔 체크인.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 2,
        title: '1일차: 스카이레이크 CC (Lake Course) 18홀',
        description: '베트남 최고 명문 레이크 코스 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 하노이 특식',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 3,
        title: '2일차: 스카이레이크 CC (Sky Course) 18홀',
        description: '스카이 코스 18홀 라운딩 후 마사지.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 바베큐',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 4,
        title: '3일차: 롱비엔 CC 18홀 ➔ 공항 샌딩',
        description: '롱비엔 18홀 라운딩 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-hanoi-golf-02',
    title: '[하롱베이/골프 36홀] FLC 하롱베이 골프클럽 36홀 & 오션뷰 리조트 3박 4일',
    subTitle: '하롱베이 절경을 내려다보는 오션 파노라마 코스 + 5성급 FLC 그랜드 호텔',
    category: '골프투어',
    region: '북부',
    city: '하노이',
    priceKRW: 1120000,
    priceVND: 20800000,
    duration: '3박 4일',
    imageUrl: "/images/vietnam_golf_resort.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 56,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#하롱베이골프', '#FLC하롱', '#36홀라운딩', '#오션뷰골프'],
    description: '유네스코 세계유산 하롱베이 바다와 기암괴석을 조망하며 샷을 날리는 세계에서 가장 아름다운 오션뷰 골프 패키지입니다.',
    included: [
      'FLC 하롱 그랜드 호텔 3박 (오션뷰, 조식 포함)',
      '36홀 그린피 + 카트 + 캐디피',
      '전 일정 전용 리무진 차량',
      '클럽하우스 중식 쿠폰 2회'
    ],
    excluded: ['캐디팁', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 36,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['FLC 하롱베이 골프클럽 (18홀 × 2회)']
    },
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ FLC 하롱 리조트 이동',
        description: '공항 픽업 후 하롱베이 이동.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: 'FLC 그랜드 호텔 하롱 5성급'
      },
      {
        day: 2,
        title: '1일차: FLC 하롱베이 골프클럽 18홀',
        description: '파노라마 오션뷰 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 해산물',
        hotel: 'FLC 그랜드 호텔 하롱'
      },
      {
        day: 3,
        title: '2일차: FLC 하롱베이 골프클럽 18홀 ➔ 마사지',
        description: '18홀 라운딩 및 스파.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 맛집',
        hotel: 'FLC 그랜드 호텔 하롱'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 하노이 이동 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-hanoi-villa-01',
    title: '[하노이근교/독채힐링] 바비 힐스 4베드룸 마운틴뷰 독채 힐링 풀빌라 3박 4일',
    subTitle: '바비 국립공원 청정 자연 속 프라이빗 대저택 + 전용 온수풀 + 야외 잔디 정원 바비큐',
    category: '풀빌라',
    region: '북부',
    city: '하노이',
    priceKRW: 780000,
    priceVND: 14500000,
    duration: '3박 4일',
    imageUrl: "/images/vietnam_city_villa.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 38,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#하노이풀빌라', '#바비힐스', '#온수풀', '#마운틴뷰', '#독채힐링'],
    description: '하노이 도심에서 1시간 거리, 바비 산맥의 맑은 공기와 웅장한 숲속에 위치한 프리미엄 4베드룸 힐링 풀빌라입니다.',
    included: [
      '4베드룸 마운틴뷰 독채 풀빌라 3박',
      '왕복 전용 차량 및 기사',
      '매일 홈메이드 조식 + 1회 바비큐 파티',
      '전용 사우나 및 온수풀'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '바비 힐스 마운틴 4베드룸 빌라',
      bedrooms: 4,
      bathrooms: 4,
      beds: '킹베드 4개',
      maxOccupancy: 10,
      standardOccupancy: 8,
      privatePool: true,
      oceanView: false,
      areaSqm: 400,
      amenities: ['프라이빗 온수풀', '전용 핀란드 사우나', '잔디 정원 BBQ', '스마트 TV'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 바비 힐스 풀빌라 체크인',
        description: '풀빌라 체크인 후 온수풀 수영.',
        meal: '조식: - | 중식: - | 석식: 향토 특식',
        hotel: '바비 힐스 4베드룸 빌라'
      },
      {
        day: 2,
        title: '바비 국립공원 산책 ➔ 풀사이드 바베큐 파티',
        description: '힐링 산책 후 정원 바베큐.',
        meal: '조식: 빌라 조식 | 중식: 현지식 | 석식: BBQ 파티',
        hotel: '바비 힐스 4베드룸 빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 사우나 & 수영 힐링',
        description: '휴식 및 사우나.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 전통식',
        hotel: '바비 힐스 4베드룸 빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 하노이 쇼핑 ➔ 공항 샌딩',
        description: '공항 이동.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-hanoi-villa-02',
    title: '[하롱베이/독채빌라] 플라밍고 하롱 3베드룸 베이뷰 독채 레지던스 풀빌라 3박 4일',
    subTitle: '하롱베이 에메랄드 바다 전망 + 전용 수영장 + 럭셔리 온천 스파 이용권 포함',
    category: '풀빌라',
    region: '북부',
    city: '하노이',
    priceKRW: 880000,
    priceVND: 16400000,
    duration: '3박 4일',
    imageUrl: "/images/vietnam_city_villa.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 41,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#하롱베이풀빌라', '#플라밍고하롱', '#베이뷰', '#독채빌라'],
    description: '하롱베이의 수려한 카르스트 바위섬을 감상할 수 있는 최고급 3베드룸 베이뷰 독채 레지던스입니다.',
    included: [
      '3베드룸 베이뷰 독채 빌라 3박',
      '하노이-하롱베이 왕복 전용 리무진',
      '조식 뷔페 및 일본식 천연 온천 스파권',
      '하롱베이 당일 크루즈 무료 탑승권'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '플라밍고 하롱 3베드룸 베이뷰 빌라',
      bedrooms: 3,
      bathrooms: 3,
      beds: '킹베드 3개',
      maxOccupancy: 8,
      standardOccupancy: 6,
      privatePool: true,
      oceanView: true,
      areaSqm: 360,
      amenities: ['전용 인피니티 풀', '베이뷰 테라스', '온천 스파 연계', '주방 시설'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 하롱베이 이동 ➔ 빌라 체크인',
        description: '체크인 후 베이뷰 감상.',
        meal: '조식: - | 중식: - | 석식: 해산물 만찬',
        hotel: '플라밍고 하롱 3베드룸 빌라'
      },
      {
        day: 2,
        title: '하롱베이 당일 크루즈 ➔ 빌라 온천 스파',
        description: '크루즈 투어 후 온천욕.',
        meal: '조식: 빌라 조식 | 중식: 선상식 | 석식: 바베큐',
        hotel: '플라밍고 하롱 3베드룸 빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 휴양 & 수영',
        description: '프라이빗 풀 휴식.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 로컬식',
        hotel: '플라밍고 하롱 3베드룸 빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 하노이 이동 ➔ 공항 샌딩',
        description: '공항 이동.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-hanoi-free-01',
    title: '[하노이 자유/당일 VIP] 하노이 출발 하롱베이 럭셔리 당일 크루즈 & 리무진 투어',
    subTitle: '최신형 고속도로 VIP 리무진 왕복 + 럭셔리 크루즈 탑승 + 숭솟동굴 + 티톱섬 + 카약 & 뷔페',
    category: '자유여행',
    region: '북부',
    city: '하노이',
    priceKRW: 99000,
    priceVND: 1840000,
    duration: '당일 투어 (약 10시간)',
    imageUrl: "/images/halong_cruise.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 520,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['하노이 구시가지 호텔 픽업'],
    tags: ['#하롱베이당일', '#럭셔리크루즈', '#숭솟동굴', '#티톱섬', '#카약체험'],
    description: '하노이에서 가장 빠르고 편안하게 하롱베이의 핵심 명소를 당일로 완전정복하는 베스트 투어입니다.',
    included: [
      '하노이 왕복 VIP 리무진 차량',
      '하롱베이 크루즈 탑승권 및 입장료',
      '선상 프리미엄 뷔페 중식',
      '카약 또는 밤부보트 탑승료',
      '전문 영어/한국어 가이드'
    ],
    excluded: ['음료 및 주류', '가이드 팁'],
    itinerary: [
      {
        day: 1,
        title: '07:30 호텔 픽업 ➔ 하롱베이 선착장 ➔ 크루즈 승선 & 뷔페 ➔ 숭솟동굴/티톱섬 ➔ 하노이 복귀',
        description: '하롱베이 당일 핵심 완주.',
        meal: '중식: 선상 뷔페',
        hotel: '개별 숙소'
      }
    ]
  },
  {
    id: 'prod-hanoi-free-02',
    title: '[닌빈 자유/당일 투어] 닌빈 짱안 유네스코 나룻배 & 항무아 드래곤 전망대 프라이빗 투어',
    subTitle: '단독 전용 차량 + 짱안 신비로운 동굴 나룻배 + 항무아 500계단 정상 파노라마 뷰',
    category: '자유여행',
    region: '북부',
    city: '하노이',
    priceKRW: 85000,
    priceVND: 1580000,
    duration: '당일 투어',
    imageUrl: "/images/ninhbinh_trangan.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 380,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['하노이 호텔 픽업'],
    tags: ['#닌빈짱안', '#항무아', '#나룻배투어', '#인생샷', '#단독차량'],
    description: '육지의 하롱베이 닌빈 짱안의 에메랄드 물길과 항무아 용 조각상 전망대를 탐방하는 감동의 당일 투어입니다.',
    included: [
      '왕복 전용 차량 및 기사',
      '짱안 보트 투어 티켓',
      '항무아 입장권',
      '생수 제공'
    ],
    excluded: ['중식 (현지 맛집 안내)', '기사 팁'],
    itinerary: [
      {
        day: 1,
        title: '08:00 호텔 픽업 ➔ 짱안 나룻배 동굴 투어 ➔ 닌빈 특식 런치 ➔ 항무아 전망대 ➔ 하노이 복귀',
        description: '나룻배 체험 및 항무아 정상 파노라마 조망.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  }
];
