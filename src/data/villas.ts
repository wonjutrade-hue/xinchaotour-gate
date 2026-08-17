import { Product } from '../types';

export const VILLAS_DATA: Product[] = [
  {
    id: 'prod-villa-danang-01',
    title: '[다낭/독채풀빌라] 미케비치 오션뷰 4베드룸 프리미엄 독채 풀빌라 3박 5일',
    subTitle: '전용 대형 프라이빗 수영장 + 24시간 버틀러 + 매일 전신 마사지 90분 + 단독 차량 & 가이드 올포함',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 980000,
    priceVND: 18200000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 94,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '부산', '대구', '청주'],
    tags: ['#다낭풀빌라', '#독채풀빌라', '#오션뷰', '#가족여행', '#프라이빗수영장', '#바비큐파티'],
    description: '다낭 최고급 미케비치 해변가에 위치한 4베드룸 럭셔리 단독 풀빌라입니다. 다른 투숙객 없이 오직 우리 가족과 일행만을 위한 넓은 정원, 프라이빗 인피니티 풀, 풀사이드 바베큐 파티를 누려보세요.',
    included: [
      '미케비치 4베드룸 럭셔리 독채 풀빌라 3박 (단독 사용)',
      '단독 VIP 리무진 밴 & 한국어 가이드 전 일정 상시 대기',
      '매일 풀빌라 홈메이드 조식 서비스 + 1회 풀사이드 해산물 BBQ 파티',
      '투숙객 전원 90분 아로마 전신 마사지 1회 무료',
      '호이안 올드타운 & 바나힐 투어 전용 차량 지원'
    ],
    excluded: [
      '개인 경비 및 매너 팁',
      '국제선 항공권 (원하시는 시간대로 맞춤 발권 가능)'
    ],
    villaSpecs: {
      villaName: '다낭 미케비치 시그니처 4베드룸 럭셔리 빌라',
      structureDescription: '마스터룸 2실 + 패밀리룸 1실 + 트윈룸 1실 (총 4객실 / 독립 욕실 4개 + 대형 거실 + 키친)',
      bedrooms: 4,
      bathrooms: 4,
      beds: '킹베드 3개 + 싱글베드 2개 (엑스트라 베드 추가 가능)',
      maxOccupancy: 10,
      standardOccupancy: 8,
      privatePool: true,
      oceanView: true,
      areaSqm: 420,
      floors: 2,
      address: 'Vo Nguyen Giap, Son Tra, Da Nang, Vietnam',
      googleMapUrl: 'https://maps.google.com',
      airbnbUrl: '',
      amenities: [
        '프라이빗 수영장',
        '넓은 거실 & 소파',
        '풀옵션 주방 & 다이닝 룸',
        '프라이빗 잔디 정원',
        '야외 바비큐(BBQ) 그릴 시설',
        '스마트 TV & 넷플릭스 / 유튜브',
        '24시간 전담 버틀러 & 보안 요원',
        '초고속 Wi-Fi & 각 방 에어컨 완비'
      ],
      checkInTime: '15:00',
      checkOutTime: '11:00',
      houseRules: [
        '실내 전체 금연 (야외 테라스/정원 흡연 구역 완비)',
        '야간 23시 이후 인근 휴식을 위한 고성방가 자제',
        '어린이 수영장 이용 시 보호자 동반 필수'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ 전용 VIP 밴 영접 ➔ 풀빌라 체크인 & 웰컴 드링크',
        description: '다낭 공항 도착 후 전담 기사와 가이드가 영접. 단독 풀빌라 체크인 후 전용 수영장에서 프라이빗 휴식.',
        meal: '조식: 불포함 | 중식: 불포함 | 석식: 베트남 궁중 요리 디너',
        hotel: '다낭 미케비치 4베드룸 럭셔리 풀빌라'
      },
      {
        day: 2,
        title: '호이안 고대도시 올드타운 & 투본강 소원배 ➔ 야시장 투어',
        description: '유네스코 세계문화유산 호이안 올드타운 관광. 야경 등불 띄우기 소원배 탑승 및 야시장 체험.',
        meal: '조식: 풀빌라 조식 | 중식: 미스리 호이안식 | 석식: 풀사이드 시푸드 BBQ',
        hotel: '다낭 미케비치 4베드룸 럭셔리 풀빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 힐링 휴양 또는 바나힐 테마파크 자유 선택',
        description: '프라이빗 풀에서 여유로운 수영과 휴식. 희망 시 바나힐 골든브릿지 투어 무료 차량 지원.',
        meal: '조식: 풀빌라 조식 | 중식: 자유식 | 석식: 다낭 람비엔 레스토랑',
        hotel: '다낭 미케비치 4베드룸 럭셔리 풀빌라'
      },
      {
        day: 4,
        title: '레이트 체크아웃 ➔ 90분 스파 마사지 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '여유롭게 짐 정리 후 최고급 스파에서 90분 마사지. 롯데마트 쇼핑 후 공항 샌딩.',
        meal: '조식: 풀빌라 조식 | 중식: 현지식 | 석식: 한정식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-villa-danang-02',
    title: '[다낭/대저택] 오션프론트 6베드룸 초대형 프리미엄 풀빌라 3박 5일',
    subTitle: '마스터룸 2실 + 패밀리룸 2실 + 트윈룸 2실 (총 6객실 / 최대 16인) + 엘리베이터 + 노래방 + 자쿠지',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 1350000,
    priceVND: 25000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 48,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#6베드룸', '#대저택풀빌라', '#최대16인', '#노래방', '#자쿠지', '#엘리베이터'],
    description: '동호회, 기업 워크숍, 3대 대가족 여행에 최적화된 다낭 최고의 6베드룸 대저택 풀빌라입니다. 최신식 엘리베이터, 음향 완비 노래방 룸, 자쿠지 스파, 초대형 인피니티 풀을 갖추고 있습니다.',
    included: [
      '6베드룸 오션프론트 단독 대저택 풀빌라 3박',
      '전용 16인승 리무진 밴 & 전담 한국어 가이드',
      '매일 프라이빗 쉐프 조식 및 통돼지/해산물 BBQ 파티 1회',
      '고급 와인 4병 & 웰컴 과일 바구니 제공'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '다낭 그랜드 오션 6베드룸 맨션',
      structureDescription: '마스터룸 2실 + 패밀리룸 2실 + 트윈룸 2실 (총 6객실 / 전 객실 개별 욕실 + 전용 엘리베이터)',
      bedrooms: 6,
      bathrooms: 7,
      beds: '킹베드 4개 + 퀸베드 2개 + 싱글 2개',
      maxOccupancy: 16,
      standardOccupancy: 12,
      privatePool: true,
      oceanView: true,
      areaSqm: 680,
      floors: 3,
      address: 'Truong Sa Street, Ngu Hanh Son, Da Nang, Vietnam',
      googleMapUrl: 'https://maps.google.com',
      amenities: [
        '초대형 프라이빗 수영장 (15m)',
        '실내 전용 엘리베이터',
        '프라이빗 노래방 & 사운드 시스템',
        '야외 루프탑 자쿠지 스파',
        '풀옵션 대형 아일랜드 주방',
        '야외 정원 및 대형 바비큐 그릴',
        '24시간 전담 상주 버틀러',
        '초고속 Wi-Fi & 넷플릭스'
      ],
      checkInTime: '15:00',
      checkOutTime: '11:00',
      houseRules: [
        '실내 절대 금연',
        '실내 노래방 이용 시 밤 12시 이후 방음문 닫기',
        '수영장 안전 수칙 준수'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ 16인승 VIP 리무진 ➔ 6베드룸 체크인 & 환영 만찬',
        description: '공항 도착 후 대가족 전용 차량으로 이동하여 체크인. 풀사이드 환영 칵테일 및 휴식.',
        meal: '조식: 불포함 | 중식: 불포함 | 석식: 풀빌라 쉐프 특식',
        hotel: '다낭 그랜드 오션 6베드룸 맨션'
      },
      {
        day: 2,
        title: '호이안 올드타운 & 쿠킹 클래스 ➔ 풀사이드 통돼지 BBQ 파티',
        description: '호이안 유적지 탐방 후 저녁에는 풀빌라 잔디 정원에서 프라이빗 바비큐 파티.',
        meal: '조식: 풀빌라 조식 | 중식: 호이안 미식 | 석식: 프리미엄 BBQ 파티',
        hotel: '다낭 그랜드 오션 6베드룸 맨션'
      },
      {
        day: 3,
        title: '자유 힐링 또는 바나힐 테마파크 ➔ 실내 노래방 & 자쿠지 휴식',
        description: '원하는 일정대로 전용 차량을 타고 다낭 시내 및 명소 관광 후 풀빌라 파티.',
        meal: '조식: 풀빌라 조식 | 중식: 자유식 | 석식: 고급 해산물',
        hotel: '다낭 그랜드 오션 6베드룸 맨션'
      },
      {
        day: 4,
        title: '레이트 체크아웃 ➔ 90분 전신 마사지 ➔ 롯데마트 ➔ 공항 샌딩',
        description: '전원 90분 마사지 후 기념품 쇼핑 및 공항 샌딩.',
        meal: '조식: 풀빌라 조식 | 중식: 한정식 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-villa-nhatrang-01',
    title: '[나트랑/빈펄] 나트랑 오션뷰 3베드룸 프라이빗 독채 풀빌라 3박 5일',
    subTitle: '에메랄드빛 나트랑 베이 전망 + 프라이빗 비치 & 전용 풀장 + 빈원더스 무제한 이용권 포함',
    category: '풀빌라',
    region: '남부',
    city: '나트랑',
    priceKRW: 920000,
    priceVND: 17100000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 52,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#나트랑풀빌라', '#빈펄풀빌라', '#오션뷰', '#빈원더스', '#가족휴양'],
    description: '베트남 최고의 휴양지 나트랑 해변가에 자리잡은 3베드룸 단독 풀빌라입니다. 아름다운 바다 전망과 전용 수영장에서 완벽한 프라이빗 휴가를 즐기실 수 있습니다.',
    included: [
      '나트랑 베이 3베드룸 오션뷰 풀빌라 3박',
      '공항 왕복 단독 차량 픽업 & 샌딩',
      '매일 조식 뷔페 및 빈원더스 테마파크 자유이용권',
      '투숙객 전원 스파 마사지 1회'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '나트랑 베이 3베드룸 럭셔리 풀빌라',
      structureDescription: '마스터룸 1실 + 패밀리룸 1실 + 트윈룸 1실 (총 3객실 / 욕실 3개 + 거실 + 주방)',
      bedrooms: 3,
      bathrooms: 3,
      beds: '킹베드 2개 + 싱글베드 2개',
      maxOccupancy: 8,
      standardOccupancy: 6,
      privatePool: true,
      oceanView: true,
      areaSqm: 350,
      floors: 2,
      address: 'Hon Tre Island, Nha Trang, Khanh Hoa, Vietnam',
      amenities: [
        '프라이빗 인피니티 풀',
        '파노라마 오션뷰 테라스',
        '풀 키친 & 다이닝 공간',
        '전용 잔디 가든',
        '바비큐 그릴 완비',
        '24시간 버틀러 및 룸서비스'
      ],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '나트랑 깜란 공항 도착 ➔ 가이드 미팅 ➔ 풀빌라 체크인 & 휴식',
        description: '나트랑 도착 후 전용 밴으로 이동. 풀빌라 체크인 후 전용 비치 휴식.',
        meal: '조식: 불포함 | 중식: 불포함 | 석식: 나트랑 해산물 디너',
        hotel: '나트랑 베이 3베드룸 럭셔리 풀빌라'
      },
      {
        day: 2,
        title: '빈원더스 테마파크 & 워터파크 & 아쿠아리움 종일 자유이용',
        description: '스피드보트를 타고 빈원더스 테마파크와 케이블카, 워터파크 만끽.',
        meal: '조식: 리조트식 | 중식: 테마파크식 | 석식: 풀사이드 BBQ',
        hotel: '나트랑 베이 3베드룸 럭셔리 풀빌라'
      },
      {
        day: 3,
        title: '나트랑 호핑투어 & 스노클링 또는 풀빌라 프라이빗 힐링',
        description: '산호섬 스노클링 체험 및 머드온천 스파 힐링.',
        meal: '조식: 리조트식 | 중식: 해상 레스토랑 | 석식: 시내 유명 맛집',
        hotel: '나트랑 베이 3베드룸 럭셔리 풀빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 포나가르 사원 & 롯데마트 쇼핑 ➔ 공항 샌딩',
        description: '나트랑 명소 관광 및 쇼핑 후 공항 샌딩.',
        meal: '조식: 리조트식 | 중식: 베트남 정식 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  }
];
