import { Product } from '../types';

export const COMPREHENSIVE_CATALOG_PART3: Product[] = [
  // =========================================================================
  // 5. 달랏 (DA LAT)
  // =========================================================================
  {
    id: 'prod-dalat-pkg-01',
    title: '[달랏/영원한봄의도시] 달랏 5성급 아나만다라 & 랑비앙산 · 쑤언흐엉 호수 힐링 3박 5일',
    subTitle: '프랑스 고택 5성급 빌라 리조트 + 랑비앙산 지프 + 다딴라 폭포 루지 + 달랏 야시장 & 감성 카페 (NO쇼핑)',
    category: '추천패키지',
    region: '남부',
    city: '달랏',
    priceKRW: 750000,
    priceVND: 13900000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 165,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#달랏3박5일', '#아나만다라', '#다딴라루지', '#랑비앙산', '#달랏카페', '#NO쇼핑'],
    description: '해발 1,500m 고원의 서늘하고 쾌적한 날씨, 소나무 숲과 꽃들의 향연! 베트남의 작은 프랑스 달랏에서 누리는 감성 힐링 여행입니다.',
    included: [
      '아나만다라 달랏 5성급 프렌치 빌라 리조트 3박 (조식 포함)',
      '단독 전용 차량 및 한국어 전문 가이드',
      '다딴라 폭포 알파인 코스터(루지) 왕복 티켓',
      '랑비앙산 정상 오프로드 지프차 탑승권',
      '달랏 명물 감성 숲속 카페 음료권 & 90분 아로마 스파'
    ],
    excluded: ['국제선 항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '달랏 리엔크엉 공항 도착 ➔ 가이드 미팅 ➔ 아나만다라 체크인 & 쑤언흐엉 호수',
        description: '공항 도착 후 호텔 체크인 및 쑤언흐엉 호수 산책.',
        meal: '조식: - | 중식: - | 석식: 달랏 닭고기 핫팟 (러우가라에)',
        hotel: '아나만다라 빌라스 달랏 리조트 & 스파 5성급'
      },
      {
        day: 2,
        title: '랑비앙산 지프 탑승 ➔ 클레이터널(진흙마을) ➔ 다딴라 폭포 루지 체험',
        description: '랑비앙산 정상 조망 및 신나는 알파인 루지 체험.',
        meal: '조식: 호텔식 | 중식: 현지 바베큐 | 석식: 달랏 유명 양식 코스',
        hotel: '아나만다라 빌라스 달랏 리조트'
      },
      {
        day: 3,
        title: '린푸억 사원 ➔ 달랏 기차역 ➔ 숲속 감성 카페 ➔ 달랏 야시장 미식 투어',
        description: '도자기 사원 관람 및 야시장에서 반짱느엉(달랏 피자) 맛보기.',
        meal: '조식: 호텔식 | 중식: 분짜/반쎄오 | 석식: 야시장 자유식',
        hotel: '아나만다라 빌라스 달랏 리조트'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 90분 스파 ➔ 달랏 와인 & 커피 쇼핑 ➔ 공항 샌딩',
        description: '스파 마사지 및 달랏 특산품 쇼핑 후 공항 이동.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-dalat-pkg-02',
    title: '[나트랑·달랏 콤보] 나트랑 오션 힐링 & 달랏 고원 감성 4박 5일 2개 도시 정복',
    subTitle: '나트랑 5성급 비치 호텔 2박 + 달랏 5성급 호텔 2박 + 핵심 명소 올포함',
    category: '추천패키지',
    region: '남부',
    city: '달랏',
    priceKRW: 820000,
    priceVND: 15200000,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 110,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#나트랑달랏', '#2개도시', '#콤보패키지', '#바다와고원'],
    description: '나트랑의 푸른 바다와 달랏의 시원한 고원 감성을 4박 5일 동안 여유롭게 둘러보는 실속 만점 결합 상품입니다.',
    included: [
      '나트랑 5성급 2박 + 달랏 5성급 2박 (조식 포함)',
      '도시 간 이동 및 전 일정 단독 전용 차량 & 가이드',
      '나트랑 머드온천 + 달랏 루지/랑비앙산 입장권'
    ],
    excluded: ['항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '나트랑 도착 ➔ 호텔 체크인 & 해변 휴식',
        description: '호텔 체크인 및 휴식.',
        meal: '석식: 해산물',
        hotel: '나트랑 5성급 호텔'
      },
      {
        day: 2,
        title: '나트랑 머드온천 ➔ 달랏 이동 ➔ 달랏 야시장',
        description: '머드스파 후 아름다운 산악 도로를 지나 달랏 도착.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 달랏 러우',
        hotel: '달랏 5성급 호텔'
      },
      {
        day: 3,
        title: '달랏 랑비앙산 & 다딴라 루지 & 감성 카페',
        description: '달랏 핵심 명소 투어.',
        meal: '조식: 호텔식 | 중식: 바베큐 | 석식: 이탈리안',
        hotel: '달랏 5성급 호텔'
      },
      {
        day: 4,
        title: '달랏 관광 ➔ 깜란 공항 이동 ➔ 공항 샌딩',
        description: '기념품 쇼핑 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-dalat-golf-01',
    title: '[달랏/골프 54홀] 달랏 팰리스 GC & SAM 투옌람 CC 명품 54홀 3박 5일',
    subTitle: '100년 역사의 황실 코스 달랏 팰리스 + 숲과 호수가 어우러진 SAM 투옌람 54홀 + 1인 1캐디',
    category: '골프투어',
    region: '남부',
    city: '달랏',
    priceKRW: 1190000,
    priceVND: 22000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 95,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#달랏골프', '#달랏팰리스', '#SAM투옌람', '#54홀라운딩', '#황실골프'],
    description: '연중 18~23도의 쾌적하고 서늘한 날씨 속에서 즐기는 황제 골프! 베트남 최고(最古)의 달랏 팰리스 코스를 경험하세요.',
    included: [
      '달랏 5성급 호텔 3박 (조식 포함)',
      '54홀 그린피 + 카트 + 1인 1캐디피',
      '전 일정 골프 전용 리무진 밴 & 기사',
      '클럽하우스 중식 3회 + 90분 마사지'
    ],
    excluded: ['캐디팁 ($15~$20/18홀)', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['달랏 팰리스 골프클럽 (18홀)', 'SAM 투옌람 골프클럽 (18홀 × 2회)']
    },
    itinerary: [
      {
        day: 1,
        title: '달랏 도착 ➔ 5성급 호텔 체크인',
        description: '공항 픽업 후 호텔 체크인.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '달랏 팰리스 헤리티지 5성급'
      },
      {
        day: 2,
        title: '1일차: Dalat Palace Golf Club 18홀',
        description: '1922년 바오다이 황제가 만든 유서 깊은 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 달랏 닭구이',
        hotel: '달랏 5성급 호텔'
      },
      {
        day: 3,
        title: '2일차: SAM Tuyen Lam Golf Club 18홀',
        description: '투옌람 호수를 감싼 산악 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 바베큐',
        hotel: '달랏 5성급 호텔'
      },
      {
        day: 4,
        title: '3일차: SAM Tuyen Lam 18홀 ➔ 공항 샌딩',
        description: '18홀 라운딩 후 마사지 및 공항 이동.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-dalat-golf-02',
    title: '[달랏/골프 36홀] 1200 컨트리클럽 & SAM 투옌람 36홀 3박 4일',
    subTitle: 'KLPGA 투어 개최 코스 더 달랏 1200 CC + 럭셔리 골프텔 숙박',
    category: '골프투어',
    region: '남부',
    city: '달랏',
    priceKRW: 1050000,
    priceVND: 19500000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 62,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#달랏1200', '#KLPGA코스', '#36홀골프', '#산악골프'],
    description: '해발 1,200m에 위치하여 환상적인 바람과 시원함을 자랑하는 명문 더 달랏 1200 컨트리클럽 패키지입니다.',
    included: [
      '5성급 리조트 3박 (조식 포함)',
      '36홀 그린피 + 카트 + 캐디피',
      '전용 리무진 차량 및 기사',
      '클럽하우스 중식 2회'
    ],
    excluded: ['캐디팁', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 36,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['더 달랏 1200 CC (18홀)', 'SAM 투옌람 CC (18홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '달랏 도착 ➔ 리조트 체크인',
        description: '공항 픽업 후 휴식.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '달랏 5성급 리조트'
      },
      {
        day: 2,
        title: '1일차: The Dalat at 1200 CC 18홀',
        description: '챔피언십 토너먼트 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 스테이크',
        hotel: '달랏 5성급 리조트'
      },
      {
        day: 3,
        title: '2일차: SAM 투옌람 CC 18홀',
        description: '18홀 라운딩 및 야시장 관광.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 로컬식',
        hotel: '달랏 5성급 리조트'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-dalat-villa-01',
    title: '[달랏/독채풀빌라] 투옌람 호수 3베드룸 레이크뷰 프라이빗 온수풀빌라 3박 4일',
    subTitle: '호수 파노라마 전망 + 실내 온수 프라이빗 풀 + 소나무 숲속 단독 잔디 정원 & BBQ',
    category: '풀빌라',
    region: '남부',
    city: '달랏',
    priceKRW: 850000,
    priceVND: 15700000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 35,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#달랏풀빌라', '#온수풀빌라', '#투옌람호수', '#독채빌라', '#힐링가든'],
    description: '청정한 투옌람 호수변 소나무 숲에 위치한 3베드룸 단독 풀빌라입니다. 사계절 따뜻한 전용 온수풀과 벽난로가 구비되어 있습니다.',
    included: [
      '3베드룸 레이크뷰 독채 온수 풀빌라 3박',
      '전용 차량 및 전담 기사',
      '매일 빌라 홈메이드 조식 + 1회 숯불 바비큐 파티',
      '장작 벽난로 땔감 무제한 제공'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '투옌람 레이크 3베드룸 온수 풀빌라',
      bedrooms: 3,
      bathrooms: 3,
      beds: '킹베드 3개',
      maxOccupancy: 8,
      standardOccupancy: 6,
      privatePool: true,
      oceanView: false,
      areaSqm: 380,
      amenities: ['사계절 온수 수영장', '호수 전망 테라스', '실내 벽난로', '야외 바비큐 그릴'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '달랏 도착 ➔ 온수 풀빌라 체크인 & 환영 티타임',
        description: '체크인 후 호수 전망 온수풀 수영.',
        meal: '조식: - | 중식: - | 석식: 달랏 와인 & 디너',
        hotel: '투옌람 레이크 3베드룸 풀빌라'
      },
      {
        day: 2,
        title: '다딴라 폭포 루지 ➔ 정원 숯불 바비큐 파티',
        description: '루지 체험 후 빌라 잔디밭 바베큐.',
        meal: '조식: 빌라 조식 | 중식: 현지식 | 석식: 숯불 BBQ',
        hotel: '투옌람 레이크 3베드룸 풀빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 휴식 & 벽난로 힐링',
        description: '온수 수영 및 휴식.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 전통 전골',
        hotel: '투옌람 레이크 3베드룸 풀빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-dalat-villa-02',
    title: '[달랏/대저택] 숲속의 궁전 5베드룸 초대형 프렌치 클래식 대저택 빌라 3박 4일',
    subTitle: '최대 14인 투숙 가능 + 5개 침실 + 대형 잔디 가든 + 노래방 & 영화관 룸 완비',
    category: '풀빌라',
    region: '남부',
    city: '달랏',
    priceKRW: 1100000,
    priceVND: 20400000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 28,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#5베드룸', '#달랏대저택', '#프렌치빌라', '#노래방', '#영화관'],
    description: '고급 프렌치 양식으로 지어진 달랏 최고의 5베드룸 대저택입니다. 영화관 룸, 노래방 시설, 초대형 잔디 정원을 보유하고 있습니다.',
    included: [
      '5베드룸 프렌치 대저택 독채 3박',
      '전용 16인승 리무진 차량 & 기사',
      '매일 조식 + 1회 통돼지 바베큐 파티',
      '프라이빗 홈시어터 룸 이용권'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '달랏 몽마르뜨 5베드룸 맨션',
      bedrooms: 5,
      bathrooms: 6,
      beds: '킹베드 4개 + 트윈 2개',
      maxOccupancy: 14,
      standardOccupancy: 10,
      privatePool: true,
      oceanView: false,
      areaSqm: 520,
      amenities: ['실내 온수풀', '프라이빗 영화관', '노래방 설비', '500평 잔디 가든', 'BBQ 시설'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '달랏 도착 ➔ 맨션 체크인 & 웰컴 디너',
        description: '체크인 후 휴식.',
        meal: '조식: - | 중식: - | 석식: 쉐프 특식',
        hotel: '달랏 몽마르뜨 5베드룸 맨션'
      },
      {
        day: 2,
        title: '랑비앙산 투어 ➔ 정원 통돼지 바비큐 파티',
        description: '관광 후 저녁 대형 바베큐 파티.',
        meal: '조식: 빌라 조식 | 중식: 로컬식 | 석식: 통돼지 BBQ',
        hotel: '달랏 몽마르뜨 5베드룸 맨션'
      },
      {
        day: 3,
        title: '전일 대저택 휴양 & 홈시어터 영화 감상',
        description: '온수 수영 및 노래방 이용.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 이탈리안',
        hotel: '달랏 몽마르뜨 5베드룸 맨션'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 공항 샌딩',
        description: '공항 이동.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-dalat-free-01',
    title: '[달랏 자유/당일 투어] 달랏 인생샷 인스타그램 명소 & 감성 카페 1일 단독 맞춤 투어',
    subTitle: '전용 차량 단독 대절 + 다딴라 루지 + 린푸억 도자기 사원 + 천국의 계단 뷰 카페',
    category: '자유여행',
    region: '남부',
    city: '달랏',
    priceKRW: 79000,
    priceVND: 1470000,
    duration: '1일 데이투어',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 240,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['달랏 시내 호텔 픽업'],
    tags: ['#달랏인생샷', '#감성카페', '#다딴라루지', '#단독차량', '#자유일정'],
    description: '달랏의 가장 핫한 감성 카페와 인생샷 랜드마크만을 쏙쏙 골라 방문하는 1일 프라이빗 투어입니다.',
    included: [
      '1일 전용 차량 및 현지 기사',
      '다딴라 루지 왕복 탑승권',
      '인기 뷰 카페 시그니처 음료 1잔 포함'
    ],
    excluded: ['중식/석식', '기사 팁'],
    itinerary: [
      {
        day: 1,
        title: '09:00 호텔 픽업 ➔ 다딴라 루지 ➔ 린푸억 사원 ➔ 천국의 계단 카페 ➔ 야시장 드롭',
        description: '자유로운 인생샷 촬영.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  },
  {
    id: 'prod-dalat-free-02',
    title: '[달랏 자유/1일 렌터카] 달랏 시내 및 랑비앙산 1일 10시간 전용 차량 단독 대절',
    subTitle: '16인승 최신형 리무진 + 친절한 전담 기사 (유류비/주차비 일체 포함)',
    category: '자유여행',
    region: '남부',
    city: '달랏',
    priceKRW: 160000,
    priceVND: 2980000,
    duration: '1일 (10시간)',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 180,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['달랏 호텔 픽업'],
    tags: ['#달랏렌트카', '#단독차량', '#자유여행', '#가족맞춤'],
    description: '원하는 시간, 원하는 장소 어디든 편안하게 이동하는 달랏 1일 맞춤 차량 대절 서비스입니다.',
    included: [
      '전용 차량 1일 10시간 단독 대절',
      '기사, 유류비, 주차료 일체 포함'
    ],
    excluded: ['입장료', '식사비', '기사 팁'],
    itinerary: [
      {
        day: 1,
        title: '호텔 로비 미팅 ➔ 고객 맞춤 일정 ➔ 숙소 드롭',
        description: '원하는 일정 진행.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  },

  // =========================================================================
  // 6. 사파 (SA PA)
  // =========================================================================
  {
    id: 'prod-sapa-pkg-01',
    title: '[사파/인도차이나의지붕] 5성급 실크패스 & 판시판 케이블카 3,143m · 깟깟마을 힐링 3박 5일',
    subTitle: '5성급 마운틴뷰 리조트 + 인도차이나 최고봉 판시판 왕복 케이블카 & 모노레일 + 깟깟마을 소수민족 트레킹 (NO쇼핑)',
    category: '추천패키지',
    region: '북부',
    city: '사파',
    priceKRW: 820000,
    priceVND: 15200000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 142,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '부산'],
    tags: ['#사파3박5일', '#판시판', '#깟깟마을', '#실크패스', '#계단식논', '#NO쇼핑'],
    description: '구름 위의 세계 사파! 해발 3,143m 판시판 정상 정복과 신비로운 계단식 논, 소수민족의 순수한 문화를 만나는 감동의 여행입니다.',
    included: [
      '사파 5성급 실크패스 그랜드 리조트 3박 (마운틴뷰, 조식 포함)',
      '하노이-사파 왕복 VIP 리무진 및 사파 단독 전용 차량',
      '한국어 전문 가이드 풀케어',
      '판시판 썬월드 왕복 케이블카 + 정상 모노레일 티켓',
      '깟깟마을 전통의상 체험 및 90분 허브 스파 1회'
    ],
    excluded: ['국제선 항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 사파 전용 리무진 이동 ➔ 실크패스 체크인',
        description: '공항 픽업 후 고속도로로 사파 이동, 리조트 체크인.',
        meal: '조식: - | 중식: 쌀국수 | 석식: 사파 연어/철갑상어 핫팟',
        hotel: '실크패스 그랜드 사파 리조트 & 스파 5성급'
      },
      {
        day: 2,
        title: '인도차이나 최고봉 [판시판 3,143m] 케이블카 & 정상 정복 ➔ 모안나 사파',
        description: '구름을 뚫고 오르는 케이블카 탑승 후 정상 기념비 촬영 및 천국의 문 카페.',
        meal: '조식: 호텔식 | 중식: 판시판 뷔페 | 석식: 흑돼지 구이 특식',
        hotel: '실크패스 그랜드 사파 리조트'
      },
      {
        day: 3,
        title: '흐몽족의 삶 [깟깟마을] 트레킹 ➔ 전통 허브 온천 스파 ➔ 사파 야시장',
        description: '계단식 논과 폭포를 지나는 깟깟마을 힐링 산책 후 레드자오족 천연 약초 스파.',
        meal: '조식: 호텔식 | 중식: 로컬 전통식 | 석식: 서양식 코스 디너',
        hotel: '실크패스 그랜드 사파 리조트'
      },
      {
        day: 4,
        title: '함롱산 전망대 ➔ 하노이 복귀 ➔ 롯데마트 쇼핑 ➔ 공항 샌딩',
        description: '함롱산 조망 후 하노이 이동, 기념품 쇼핑 및 공항 이동.',
        meal: '조식: 호텔식 | 중식: 분짜 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-sapa-pkg-02',
    title: '[하노이·사파 콤보] 하노이 5성급 & 사파 계단식 논 힐링 트레킹 4박 5일',
    subTitle: '하노이 2박 + 사파 2박 + 판시판 케이블카 + 타반/라오차이 계곡 트레킹',
    category: '추천패키지',
    region: '북부',
    city: '사파',
    priceKRW: 790000,
    priceVND: 14700000,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 98,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#하노이사파', '#트레킹', '#판시판', '#타반마을', '#북부콤보'],
    description: '하노이의 도시 감성과 사파의 웅장한 대자연 트레킹을 결합한 완벽한 4박 5일 코스입니다.',
    included: [
      '하노이 5성급 2박 + 사파 5성급 2박 (조식 포함)',
      '왕복 VIP 리무진 & 단독 전용 차량 및 가이드',
      '판시판 케이블카 및 타반 트레킹 입장권'
    ],
    excluded: ['항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 호텔 체크인',
        description: '공항 픽업 후 휴식.',
        meal: '석식: 쌀국수',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 2,
        title: '사파 이동 ➔ 판시판 케이블카 정복',
        description: '사파 이동 후 판시판 정상 관람.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 연어 핫팟',
        hotel: '사파 5성급 호텔'
      },
      {
        day: 3,
        title: '타반/라오차이 계곡 트레킹 ➔ 사파 야시장',
        description: '에메랄드 계단식 논 트레킹.',
        meal: '조식: 호텔식 | 중식: 전통식 | 석식: 흑돼지 BBQ',
        hotel: '사파 5성급 호텔'
      },
      {
        day: 4,
        title: '사파 체크아웃 ➔ 하노이 귀환 ➔ 쇼핑 & 공항 샌딩',
        description: '하노이 이동 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 분짜 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-sapa-golf-01',
    title: '[사파·라오까이/골프 36홀] 국경 라오까이 사파 CC 36홀 & 5성급 리조트 3박 4일',
    subTitle: '중국 국경과 홍강을 바라보는 18홀 챔피언십 코스 2회 라운딩 + 실크패스 리조트',
    category: '골프투어',
    region: '북부',
    city: '사파',
    priceKRW: 1080000,
    priceVND: 20000000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 45,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#사파골프', '#라오까이CC', '#산악골프', '#실크패스'],
    description: '베트남 북부 고원지대의 청량한 공기와 홍강의 장관 속에서 즐기는 이색 36홀 골프 패키지입니다.',
    included: [
      '사파 5성급 리조트 3박 (조식 포함)',
      '36홀 그린피 + 카트 + 캐디피',
      '하노이-사파-골프장 전용 VIP 리무진',
      '클럽하우스 중식 2회'
    ],
    excluded: ['캐디팁', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 36,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['라오까이 사파 골프클럽 (18홀 × 2회)']
    },
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 사파 이동 ➔ 리조트 체크인',
        description: '사파 이동 후 휴식.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '실크패스 그랜드 사파 리조트'
      },
      {
        day: 2,
        title: '1일차: 라오까이 골프클럽 18홀',
        description: '산악 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 연어 핫팟',
        hotel: '실크패스 그랜드 사파 리조트'
      },
      {
        day: 3,
        title: '2일차: 라오까이 골프클럽 18홀 ➔ 사파 시내',
        description: '18홀 라운딩 후 허브 스파.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 바베큐',
        hotel: '실크패스 그랜드 사파 리조트'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 하노이 복귀 ➔ 공항 샌딩',
        description: '공항 이동.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-sapa-golf-02',
    title: '[사파·하노이/골프 54홀] 사파 CC & 하노이 롱비엔 CC 54홀 콤보 4박 5일',
    subTitle: '고원지대 사파 18홀 + 도심형 롱비엔 36홀 골프 콤보',
    category: '골프투어',
    region: '북부',
    city: '사파',
    priceKRW: 1290000,
    priceVND: 24000000,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 38,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#사파하노이골프', '#54홀골프', '#롱비엔CC', '#VIP골프'],
    description: '사파의 고원 골프와 하노이의 도심형 챔피언십 골프를 한 번에 즐기는 특별한 라운딩 상품입니다.',
    included: [
      '사파 2박 + 하노이 2박 (5성급, 조식 포함)',
      '54홀 그린피 + 카트 + 캐디피',
      '전 일정 전용 리무진 밴'
    ],
    excluded: ['캐디팁', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['라오까이 사파 CC (18홀)', '하노이 롱비엔 CC (36홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 사파 이동 ➔ 체크인',
        description: '사파 이동.',
        meal: '석식: 자유식',
        hotel: '사파 5성급 리조트'
      },
      {
        day: 2,
        title: '1일차: 라오까이 사파 CC 18홀',
        description: '18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 특식',
        hotel: '사파 5성급 리조트'
      },
      {
        day: 3,
        title: '하노이 이동 ➔ 2일차: 롱비엔 CC 18홀',
        description: '하노이 복귀 후 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 하노이 미식',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 4,
        title: '3일차: 롱비엔 CC 18홀 ➔ 마사지',
        description: '18홀 라운딩 및 스파.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 삼겹살',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 5,
        title: '체크아웃 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-sapa-villa-01',
    title: '[사파/독채롯지] 토파스 에코롯지 2베드룸 파노라마 마운틴 독채 풀빌라 3박 4일',
    subTitle: '내셔널 지오그래픽 선정 세계 최고 에코 롯지 + 벼랑 끝 온수 인피니티 풀 + 계단식 논 파노라마 뷰',
    category: '풀빌라',
    region: '북부',
    city: '사파',
    priceKRW: 950000,
    priceVND: 17600000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 82,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#토파스에코롯지', '#사파풀빌라', '#온수인피니티풀', '#내셔널지오그래픽', '#힐링끝판왕'],
    description: '세계적인 찬사를 받는 사파 토파스 에코롯지의 프라이빗 독채 빌라입니다. 구름 위 산봉우리와 계단식 논을 바라보며 온수풀에서 최고의 휴식을 취하세요.',
    included: [
      '토파스 에코롯지 프라이빗 독채 빌라 3박',
      '하노이-사파 전용 VIP 리무진',
      '매일 조식 뷔페 및 에코롯지 온수 인피니티 풀 무제한 이용',
      '소수민족 마을 가이드 워킹 투어'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '토파스 에코롯지 파노라마 2베드룸 빌라',
      bedrooms: 2,
      bathrooms: 2,
      beds: '킹베드 2개',
      maxOccupancy: 6,
      standardOccupancy: 4,
      privatePool: true,
      oceanView: false,
      areaSqm: 260,
      amenities: ['파노라마 마운틴뷰 발코니', '온수 수영장 이용', '친환경 원목 인테리어', '자연주의 레스토랑'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '하노이 도착 ➔ 토파스 에코롯지 체크인 & 온수풀 수영',
        description: '에코롯지 체크인 후 구름 위 인피니티 풀 수영.',
        meal: '조식: - | 중식: 쌀국수 | 석식: 에코롯지 유기농 디너',
        hotel: '토파스 에코롯지 사파'
      },
      {
        day: 2,
        title: '판시판 케이블카 ➔ 롯지 발코니 힐링 티타임',
        description: '판시판 정상 관람 후 롯지 휴식.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 전통 바베큐',
        hotel: '토파스 에코롯지 사파'
      },
      {
        day: 3,
        title: '소수민족 계곡 트레킹 & 레드자오 허브 온천',
        description: '힐링 트레킹 및 약초 스파.',
        meal: '조식: 호텔식 | 중식: 로컬식 | 석식: 이탈리안',
        hotel: '토파스 에코롯지 사파'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 하노이 복귀 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 분짜 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-sapa-villa-02',
    title: '[사파/대저택] 사파 제이드 힐 4베드룸 마운틴뷰 독채 샬레 빌라 3박 4일',
    subTitle: '최대 10인 수용 + 사파 시내 인근 숲속 단독 대형 샬레 + 벽난로 & 전용 테라스 바비큐',
    category: '풀빌라',
    region: '북부',
    city: '사파',
    priceKRW: 880000,
    priceVND: 16400000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 36,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#사파제이드힐', '#4베드룸', '#샬레빌라', '#벽난로', '#가족여행'],
    description: '유럽 알프스 산장을 연상시키는 4베드룸 목조 샬레 독채 빌라입니다. 가족 단위 여행객에게 안락함을 선사합니다.',
    included: [
      '사파 제이드 힐 4베드룸 독채 샬레 3박',
      '전용 리무진 차량 & 기사',
      '매일 조식 + 1회 숯불 바베큐'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '사파 제이드 힐 4베드룸 샬레',
      bedrooms: 4,
      bathrooms: 4,
      beds: '킹베드 4개',
      maxOccupancy: 10,
      standardOccupancy: 8,
      privatePool: true,
      oceanView: false,
      areaSqm: 350,
      amenities: ['벽난로', '마운틴뷰 테라스', '주방 시설', 'BBQ 시설'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '사파 도착 ➔ 샬레 체크인',
        description: '체크인 후 벽난로 휴식.',
        meal: '석식: 향토 특식',
        hotel: '사파 제이드 힐 4베드룸 샬레'
      },
      {
        day: 2,
        title: '판시판 투어 ➔ 샬레 BBQ 파티',
        description: '판시판 관광 후 저녁 바베큐.',
        meal: '조식: 빌라 조식 | 중식: 현지식 | 석식: BBQ',
        hotel: '사파 제이드 힐 4베드룸 샬레'
      },
      {
        day: 3,
        title: '깟깟마을 투어 ➔ 야시장',
        description: '마을 산책 및 야시장 관광.',
        meal: '조식: 빌라 조식 | 중식: 로컬식 | 석식: 피자',
        hotel: '사파 제이드 힐 4베드룸 샬레'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 하노이 공항 이동',
        description: '공항 샌딩.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-sapa-free-01',
    title: '[사파 자유/판시판 투어] 판시판 케이블카 & 정상 모노레일 VIP 티켓 + 왕복 픽업 투어',
    subTitle: '호텔 왕복 전용 차량 픽업 + 썬월드 케이블카 왕복권 + 정상 모노레일 올포함',
    category: '자유여행',
    region: '북부',
    city: '사파',
    priceKRW: 68000,
    priceVND: 1260000,
    duration: '반나절 (약 5시간)',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 410,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['사파 호텔 픽업'],
    tags: ['#판시판케이블카', '#사파필수코스', '#인생샷', '#정상모노레일'],
    description: '사파 여행의 1순위 판시판 정상을 줄 서지 않고 가장 빠르고 쾌적하게 정복하는 VIP 투어 패키지입니다.',
    included: [
      '사파 호텔 왕복 전용 차량',
      '판시판 케이블카 왕복 탑승권',
      '정상 모노레일 탑승권'
    ],
    excluded: ['개인 경비'],
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 판시판 케이블카 탑승 ➔ 3,143m 정상 정복 ➔ 숙소 복귀',
        description: '판시판 정상 등정.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  },
  {
    id: 'prod-sapa-free-02',
    title: '[사파 자유/1일 렌터카] 사파 시내 & 깟깟마을 · 모안나 사파 1일 맞춤 프라이빗 차량',
    subTitle: '전용 차량 1일 단독 배차 (원하는 명소와 카페 자유 일정 이동)',
    category: '자유여행',
    region: '북부',
    city: '사파',
    priceKRW: 140000,
    priceVND: 2600000,
    duration: '1일 (8시간)',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 160,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['사파 호텔 픽업'],
    tags: ['#사파렌트카', '#단독기사', '#자유여행'],
    description: '사파의 가파른 산길을 걱정 없이 전용 차량과 기사로 편안하게 둘러보세요.',
    included: ['전용 차량 1일 대절', '기사, 유류비 일체'],
    excluded: ['입장료', '식사비'],
    itinerary: [
      {
        day: 1,
        title: '호텔 로비 미팅 ➔ 고객 희망 맞춤 일정 ➔ 숙소 드롭',
        description: '자유 일정 진행.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  },

  // =========================================================================
  // 7. 호치민 / 무이네 (HO CHI MINH / MUI NE)
  // =========================================================================
  {
    id: 'prod-saigon-pkg-01',
    title: '[호치민·무이네/사막과도시] 호치민 5성급 & 무이네 화이트샌듄 사막 지프 3박 5일',
    subTitle: '호치민 5성급 호텔 + 무이네 해변 리조트 + 화이트샌듄 일출/일몰 지프 + 요정의 샘 & 메콩델타 (NO쇼핑)',
    category: '추천패키지',
    region: '남부',
    city: '호치민',
    priceKRW: 720000,
    priceVND: 13400000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 198,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '부산', '대구', '청주'],
    tags: ['#호치민무이네', '#화이트샌듄', '#사막지프', '#요정의샘', '#메콩강', '#NO쇼핑'],
    description: '베트남 경제 수도 호치민의 활기찬 도시 문화와 무이네의 광활한 사막 모래언덕을 만끽하는 베스트셀러 투어입니다.',
    included: [
      '호치민 5성급 호텔 2박 + 무이네 4성급 리조트 1박 (조식 포함)',
      '단독 VIP 리무진 차량 및 한국어 전문 가이드',
      '무이네 화이트샌듄 전용 오픈 지프차 탑승권',
      '요정의 샘 & 피싱빌리지 투어 입장료',
      '90분 전신 스파 1회'
    ],
    excluded: ['국제선 항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '호치민 떤선녓 공항 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 사이공 야경',
        description: '공항 도착 후 호텔 체크인 및 부이비엔 워킹스트리트 산책.',
        meal: '조식: - | 중식: - | 석식: 호치민 전통 쌀국수',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 2,
        title: '무이네 이동 ➔ 화이트샌듄 사막 지프 투어 ➔ 요정의 샘 ➔ 해변 리조트',
        description: '고속도로로 무이네 이동, 사막 지프 질주 및 요정의 샘 맨발 트레킹.',
        meal: '조식: 호텔식 | 중식: 무이네 해산물 특식 | 석식: 리조트식 BBQ',
        hotel: '무이네 해변 4~5성급 리조트'
      },
      {
        day: 3,
        title: '레드샌듄 ➔ 피싱빌리지 ➔ 호치민 귀환 ➔ 벤탄 야시장 투어',
        description: '어촌 마을 피싱빌리지 관람 후 호치민 복귀, 벤탄 시장 투어.',
        meal: '조식: 호텔식 | 중식: 베트남 퀴진 | 석식: 사이공 강 선상 디너',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 4,
        title: '노트르담 대성당 & 중앙우체국 ➔ 90분 스파 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '프랑스풍 건축물 관광 및 쇼핑 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 분짜 특식 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-saigon-pkg-02',
    title: '[호치민·메콩델타] 호치민 역사 랜드마크 & 신비로운 메콩강 나룻배 탐방 4박 5일',
    subTitle: '호치민 5성급 연박 + 구찌터널 지하 요새 + 메콩델타 나룻배 & 코코넛 정글',
    category: '추천패키지',
    region: '남부',
    city: '호치민',
    priceKRW: 690000,
    priceVND: 12800000,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 115,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#호치민', '#구찌터널', '#메콩델타', '#역사체험', '#가족여행'],
    description: '베트남의 역사를 체험하는 구찌터널과 남부의 젖줄 메콩강 정글 나룻배 탐험을 여유롭게 즐기는 코스입니다.',
    included: [
      '호치민 5성급 호텔 4박 (조식 포함)',
      '단독 전용 차량 및 한국어 가이드',
      '구찌터널 입장권 & 사격 체험장 안내',
      '메콩델타 전통 나룻배 및 유람선 탑승권'
    ],
    excluded: ['항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '호치민 도착 ➔ 호텔 체크인',
        description: '공항 픽업 및 휴식.',
        meal: '석식: 현지식',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 2,
        title: '구찌터널 지하 요새 탐방 ➔ 통일궁 & 전쟁기념관',
        description: '베트남전의 역사 현장 탐방.',
        meal: '조식: 호텔식 | 중식: 구찌 특식 | 석식: 전통 로컬식',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 3,
        title: '메콩델타 미토 정글 나룻배 투어',
        description: '나룻배 탑승 및 코코넛 사탕 마을 방문.',
        meal: '조식: 호텔식 | 중식: 메콩 민물생선 튀김 정식 | 석식: 바베큐',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 4,
        title: '시내 쇼핑 & 스파 ➔ 공항 샌딩',
        description: '쇼핑 및 공항 이동.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 한정식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-saigon-golf-01',
    title: '[호치민/골프 54홀] 탄손넛 CC & 투득 CC 명문 54홀 3박 5일',
    subTitle: '도심 속 36홀 명문 탄손넛 CC + 베트남 전통의 투득 CC 54홀 라운딩 + 5성급 호텔',
    category: '골프투어',
    region: '남부',
    city: '호치민',
    priceKRW: 1190000,
    priceVND: 22000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 112,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#호치민골프', '#탄손넛CC', '#투득CC', '#54홀라운딩', '#야간골프가능'],
    description: '이동 시간 20~30분 이내! 호치민 도심 최상급 인프라를 자랑하는 명문 탄손넛 CC와 투득 CC에서 즐기는 럭셔리 골프 패키지입니다.',
    included: [
      '호치민 5성급 호텔 3박 (2인 1실, 조식 포함)',
      '54홀 그린피 + 카트 + 1인 1캐디피 올포함',
      '전 일정 골프백 전용 VIP 리무진 밴 & 기사',
      '클럽하우스 중식 3회 + 90분 골프 마사지'
    ],
    excluded: ['캐디팁 ($15~$20/18홀)', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['탄손넛 골프코스 (18홀 × 2회)', '베트남 골프 & 컨트리클럽 (투득 18홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '호치민 도착 ➔ 호텔 체크인 및 휴식',
        description: '공항 픽업 후 호텔 체크인.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 2,
        title: '1일차: Tan Son Nhat Golf Course 18홀',
        description: '호치민 최고 인기 탄손넛 CC 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 해산물 맛집',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 3,
        title: '2일차: Vietnam Golf & CC (Thu Duc) 18홀',
        description: '투득 CC 18홀 라운딩 후 마사지.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한정식 갈비살',
        hotel: '호치민 5성급 호텔'
      },
      {
        day: 4,
        title: '3일차: Tan Son Nhat GC 18홀 ➔ 공항 샌딩',
        description: '18홀 라운딩 및 샤워 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-saigon-golf-02',
    title: '[무이네/골프 36홀] PGA 노바월드 무이네 36홀 & 오션 리조트 3박 4일',
    subTitle: 'PGA 공인 그렉 노먼 설계 PGA 오션 & 가든 코스 36홀 + 5성급 해변 리조트',
    category: '골프투어',
    region: '남부',
    city: '호치민',
    priceKRW: 1150000,
    priceVND: 21300000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 58,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#무이네골프', '#PGA노바월드', '#그렉노먼', '#오션뷰골프'],
    description: '베트남 최초 PGA 공인 36홀 코스로 지어진 PGA 노바월드 무이네에서 만끽하는 꿈의 라운딩!',
    included: [
      '무이네 5성급 리조트 3박 (조식 포함)',
      '36홀 그린피 + 카트 + 캐디피',
      '호치민-무이네 왕복 리무진 차량',
      '클럽하우스 중식 쿠폰 2회'
    ],
    excluded: ['캐디팁', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 36,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['PGA 노바월드 오션 코스 (18홀)', 'PGA 노바월드 가든 코스 (18홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '호치민 도착 ➔ 무이네 이동 ➔ 리조트 체크인',
        description: '무이네 이동 후 휴식.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '무이네 5성급 리조트'
      },
      {
        day: 2,
        title: '1일차: PGA Ocean Course 18홀',
        description: '오션 코스 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 해산물',
        hotel: '무이네 5성급 리조트'
      },
      {
        day: 3,
        title: '2일차: PGA Garden Course 18홀',
        description: '가든 코스 18홀 라운딩 후 사막 투어.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 바베큐',
        hotel: '무이네 5성급 리조트'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 호치민 복귀 ➔ 공항 샌딩',
        description: '공항 이동.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-saigon-villa-01',
    title: '[사이공근교/독채풀빌라] 사이공 리버뷰 3베드룸 프라이빗 독채 풀빌라 3박 4일',
    subTitle: '사이공 강변 전용 보트 선착장 + 프라이빗 인피니티 풀 + 도심 속 럭셔리 정원 & 바비큐',
    category: '풀빌라',
    region: '남부',
    city: '호치민',
    priceKRW: 890000,
    priceVND: 16500000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 44,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#호치민풀빌라', '#리버뷰', '#독채빌라', '#사이공강', '#바비큐파티'],
    description: '호치민 2군 안푸 강변에 자리잡은 최고급 3베드룸 단독 풀빌라입니다. 도심의 편리함과 프라이빗 힐링을 동시에 누려보세요.',
    included: [
      '3베드룸 리버뷰 독채 풀빌라 3박',
      '전용 16인승 리무진 차량 & 기사',
      '매일 조식 + 1회 바비큐 파티',
      '사이공강 선셋 스피드보트 1회 탑승'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '사이공 리버사이드 3베드룸 빌라',
      bedrooms: 3,
      bathrooms: 3,
      beds: '킹베드 3개',
      maxOccupancy: 8,
      standardOccupancy: 6,
      privatePool: true,
      oceanView: false,
      areaSqm: 380,
      amenities: ['전용 수영장', '사이공 강 전망 테라스', '주방 완비', 'BBQ 시설'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '호치민 도착 ➔ 풀빌라 체크인 & 웰컴 드링크',
        description: '풀빌라 체크인 후 강변 수영.',
        meal: '조식: - | 중식: - | 석식: 전통 만찬',
        hotel: '사이공 리버사이드 3베드룸 빌라'
      },
      {
        day: 2,
        title: '사이공강 선셋 보트 ➔ 정원 바비큐 파티',
        description: '보트 투어 후 저녁 바베큐.',
        meal: '조식: 빌라 조식 | 중식: 로컬식 | 석식: BBQ 파티',
        hotel: '사이공 리버사이드 3베드룸 빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 휴양 또는 시내 쇼핑',
        description: '휴식 및 쇼핑.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 해산물',
        hotel: '사이공 리버사이드 3베드룸 빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 90분 스파 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-saigon-villa-02',
    title: '[무이네/독채풀빌라] 무이네 4베드룸 비치프론트 독채 인피니티 풀빌라 3박 4일',
    subTitle: '백사장 바로 앞 전용 인피니티 풀 + 4개 침실 (최대 10인) + 사막 지프 투어 포함',
    category: '풀빌라',
    region: '남부',
    city: '호치민',
    priceKRW: 980000,
    priceVND: 18200000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 39,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '부산'],
    tags: ['#무이네풀빌라', '#비치프론트', '#독채풀빌라', '#사막투어', '#가족휴양'],
    description: '무이네 에메랄드 해변 바로 앞에 위치한 4베드룸 최고급 단독 풀빌라입니다.',
    included: [
      '4베드룸 비치프론트 독채 빌라 3박',
      '호치민 왕복 전용 차량 및 기사',
      '매일 조식 + 1회 해산물 BBQ 파티',
      '무이네 화이트샌듄 사막 지프차 무료 탑승권'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '무이네 팜비치 4베드룸 빌라',
      bedrooms: 4,
      bathrooms: 4,
      beds: '킹베드 4개',
      maxOccupancy: 10,
      standardOccupancy: 8,
      privatePool: true,
      oceanView: true,
      areaSqm: 450,
      amenities: ['비치 직결 인피니티 풀', '오션뷰 테라스', '주방 조리시설', 'BBQ 시설'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '호치민 도착 ➔ 무이네 풀빌라 체크인',
        description: '체크인 후 해변 수영.',
        meal: '조식: - | 중식: - | 석식: 해산물 만찬',
        hotel: '무이네 팜비치 4베드룸 빌라'
      },
      {
        day: 2,
        title: '화이트샌듄 사막 지프 투어 ➔ 풀사이드 BBQ',
        description: '사막 지프 투어 후 저녁 바베큐.',
        meal: '조식: 빌라 조식 | 중식: 현지식 | 석식: BBQ 파티',
        hotel: '무이네 팜비치 4베드룸 빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 힐링 휴양',
        description: '프라이빗 풀 수영.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 이탈리안',
        hotel: '무이네 팜비치 4베드룸 빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 호치민 이동 ➔ 공항 샌딩',
        description: '공항 샌딩.',
        meal: '조식: 빌라 조식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-saigon-free-01',
    title: '[호치민 자유/당일 투어] 메콩델타 정글 나룻배 & 코코넛 사탕 마을 1일 단독 투어',
    subTitle: '전용 차량 왕복 + 메콩강 모터보트 & 수로 나룻배 + 코코넛 농장 체험 + 민물생선 특식',
    category: '자유여행',
    region: '남부',
    city: '호치민',
    priceKRW: 65000,
    priceVND: 1200000,
    duration: '1일 데이투어',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 350,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['호치민 1군/3군 호텔 픽업'],
    tags: ['#메콩델타', '#나룻배체험', '#호치민당일투어', '#가족추천'],
    description: '남부의 젖줄 메콩강 수로를 누비는 정글 나룻배 체험과 열대과일 시식까지 풍성한 1일 투어입니다.',
    included: [
      '왕복 전용 차량 및 가이드',
      '메콩강 보트 & 나룻배 탑승권',
      '현지 특식 중식 포함'
    ],
    excluded: ['개인 쇼핑비', '기사/가이드 팁'],
    itinerary: [
      {
        day: 1,
        title: '08:00 호텔 픽업 ➔ 메콩강 나룻배 체험 ➔ 열대과일 시식 & 특식 중식 ➔ 호치민 복귀',
        description: '메콩델타 탐방.',
        meal: '중식: 현지 특식',
        hotel: '개별 숙소'
      }
    ]
  },
  {
    id: 'prod-saigon-free-02',
    title: '[무이네 자유/일출 지프] 무이네 화이트샌듄 일출 & 요정의 샘 선라이즈 지프 투어',
    subTitle: '오픈탑 4륜 사막 지프차 + 화이트샌듄 일출 감상 + 레드샌듄 & 요정의 샘',
    category: '자유여행',
    region: '남부',
    city: '호치민',
    priceKRW: 45000,
    priceVND: 840000,
    duration: '반나절 (새벽 04:30~09:00)',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 490,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['무이네 리조트 픽업'],
    tags: ['#무이네사막지프', '#화이트샌듄일출', '#인생샷', '#요정의샘'],
    description: '무이네의 붉게 타오르는 사막 일출을 배경으로 인생샷을 남기는 필수 선라이즈 지프 투어입니다.',
    included: [
      '호텔 왕복 전용 지프차 픽업',
      '화이트샌듄, 레드샌듄, 요정의 샘, 피싱빌리지 코스'
    ],
    excluded: ['사막 ATV 탑승료 (개별 선택)', '기사 팁'],
    itinerary: [
      {
        day: 1,
        title: '04:30 리조트 픽업 ➔ 화이트샌듄 일출 ➔ 레드샌듄 ➔ 피싱빌리지 ➔ 요정의 샘 ➔ 복귀',
        description: '사막 일출 및 사진 촬영.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  }
];
