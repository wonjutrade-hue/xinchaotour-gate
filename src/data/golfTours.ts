import { Product, GolfCourseDetail } from '../types';

export const MAJOR_GOLF_COURSES: GolfCourseDetail[] = [
  {
    name: 'BRG Da Nang Golf Resort',
    designer: 'Greg Norman (듄스 코스) & Jack Nicklaus (니클라우스 코스)',
    holes: 36,
    description: '베트남 최고 수준의 듄스(Dunes) 링크스 코스로 아시아 10대 명문 골프장으로 선정된 대표 코스입니다.',
    difficulty: '중상급',
    location: '다낭 해안가 (공항에서 약 20분)'
  },
  {
    name: 'Montgomerie Links Vietnam',
    designer: 'Colin Montgomerie',
    holes: 18,
    description: '모래 언덕과 울창한 소나무 숲이 어우러진 유러피언 감성의 클래식 링크스 코스입니다.',
    difficulty: '중급',
    location: '다낭-호이안 경계 (다낭 시내에서 약 20분)'
  },
  {
    name: 'Ba Na Hills Golf Club',
    designer: 'Luke Donald (설계) / IMG (운영)',
    holes: 18,
    description: '해발 높은 산악 지형의 드라마틱한 고저차와 야간 라이트 시설을 완비한 월드 골프 어워드 수상 명문 클럽입니다.',
    difficulty: '상급',
    location: '다낭 바나힐스 산기슭 (시내에서 약 35분)'
  },
  {
    name: 'Hoiana Shores Golf Club',
    designer: 'Robert Trent Jones Jr.',
    holes: 18,
    description: '남중국해를 직접 마주하는 정통 챔피언십 오션프론트 링크스 코스로 세계 100대 골프장 후보 코스입니다.',
    difficulty: '중상급',
    location: '호이안 남부 호이아나 리조트 내'
  },
  {
    name: 'Vinpearl Golf Nam Hoi An',
    designer: 'IMG Design',
    holes: 18,
    description: '자연 그대로의 백사장 언덕과 넓은 페어웨이가 펼쳐진 리조트형 프리미엄 코스입니다.',
    difficulty: '중급',
    location: '남호이안 빈펄 리조트 단지'
  }
];

export const GOLF_TOURS_DATA: Product[] = [
  {
    id: 'prod-golf-danang-5d90h',
    title: '[다낭·호이안/90홀] 다낭·호이안 명문 5대 코스 5일 (18홀 × 5회 = 총 90홀)',
    subTitle: 'BRG + 몽고메리 + 바나힐스 + 호이아나쇼어스 + 남호이안 빈펄 | 1인1캐디 + 2인1카트 + VIP 리무진 올포함',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 1590000,
    priceVND: 29500000,
    duration: '4박 6일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 65,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭골프', '#90홀패키지', '#호이아나쇼어스', '#바나힐CC', '#1인1캐디', '#골프리무진'],
    description: '베트남 중부의 세계적인 5대 챔피언십 코스(BRG, 몽고메리, 바나힐스, 호이아나쇼어스, 빈펄남호이안)에서 5일간 매일 18홀씩 총 90홀을 완주하는 프리미엄 골프 패키지입니다.',
    included: [
      '5성급 럭셔리 호텔 4박 (2인 1실, 조식 포함)',
      '5일간 총 90홀 그린피 + 전동카트(2인 1카트) + 1인 1캐디피 올포함',
      '공항 ➔ 호텔 ➔ 매일 골프장 단독 골프백 전용 VIP 리무진 밴 & 기사',
      '클럽하우스 중식 쿠폰 5회 제공',
      '라운딩 후 90분 피로회복 골프 마사지 2회 무료 제공'
    ],
    excluded: [
      '캐디 팁 (18홀 기준 약 $15~$20 현장 지불)',
      '개인 경비 및 석식',
      '항공권 (원하시는 일정으로 발권 지원)'
    ],
    golfSpecs: {
      holes: 90,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: [
        'BRG Da Nang Golf Resort (18홀)',
        'Montgomerie Links Vietnam (18홀)',
        'Ba Na Hills Golf Club (18홀)',
        'Hoiana Shores Golf Club (18홀)',
        'Vinpearl Golf Nam Hoi An (18홀)'
      ],
      courseDetails: MAJOR_GOLF_COURSES
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ VIP 골프 리무진 ➔ 5성급 호텔 체크인 및 휴식',
        description: '공항 도착 후 골프백 전담 기사 영접. 호텔 체크인 후 컨디션 조절.',
        meal: '조식: 불포함 | 중식: 불포함 | 석식: 자유식',
        hotel: '포포인츠 바이 쉐라톤 다낭 또는 동급 5성급'
      },
      {
        day: 2,
        title: '1일차 라운딩 : BRG Da Nang Golf Resort 18홀',
        description: '그렉 노먼 설계의 정통 듄스 링크스 코스에서 첫 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 다낭 유명 해산물 미식',
        hotel: '포포인츠 바이 쉐라톤 다낭'
      },
      {
        day: 3,
        title: '2일차 라운딩 : Montgomerie Links 18홀 ➔ 호이안 야간 관광',
        description: '콜린 몽고메리 명품 코스 18홀 라운딩 후 유네스코 호이안 올드타운 투어.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 호이안 정통 특식',
        hotel: '포포인츠 바이 쉐라톤 다낭'
      },
      {
        day: 4,
        title: '3일차 라운딩 : Ba Na Hills Golf Club 18홀 ➔ 골프 마사지',
        description: '산악 지형 바나힐스 18홀 라운딩 후 90분 피로회복 마사지.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 베트남 숯불 BBQ',
        hotel: '포포인츠 바이 쉐라톤 다낭'
      },
      {
        day: 5,
        title: '4일차 라운딩 : Hoiana Shores Golf Club 18홀',
        description: '바다를 마주하는 세계 100대 명문 후보 코스에서 감동의 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한정식 갈비살',
        hotel: '포포인츠 바이 쉐라톤 다낭'
      },
      {
        day: 6,
        title: '5일차 라운딩 : Vinpearl Golf Nam Hoi An 18홀 ➔ 샌딩',
        description: '마지막 18홀 라운딩 후 샤워, 롯데마트 쇼핑 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-golf-danang-3d54h',
    title: '[다낭/골프] BRG 다낭 & 바나힐 & 몽고메리 3색 54홀 명품 골프 3박 5일',
    subTitle: '1인 1캐디 + 2인 1카트 + 그린피/캐디피/카트비 올포함! 5성급 호텔 & 전용 리무진 샌딩',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 1190000,
    priceVND: 22000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 76,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭골프', '#54홀라운딩', '#BRG다낭', '#바나힐CC', '#몽고메리', '#골프패키지'],
    description: '가장 선호도가 높은 다낭 대표 3대 명문 코스에서 3일간 54홀을 쾌적하게 라운딩하는 베스트셀러 상품입니다.',
    included: [
      '5성급 골프 리조트/호텔 3박 (2인 1실)',
      '54홀 그린피 + 전동카트(2인 1카트) + 1인 1캐디피',
      '공항-골프장-호텔 전 일정 단독 전용 리무진',
      '매일 조식 + 특급 클럽하우스 중식 쿠폰 3회',
      '90분 골프 마사지 1회 무료'
    ],
    excluded: [
      '캐디 팁 (18홀 당 약 $15~20 현장 지불)',
      '개인 경비 및 석식',
      '항공권'
    ],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: [
        'BRG 다낭 골프 리조트 (18홀)',
        '바나힐스 골프 클럽 (18홀)',
        '몽고메리 링크스 (18홀)'
      ],
      courseDetails: MAJOR_GOLF_COURSES.slice(0, 3)
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ 리무진 미팅 ➔ 5성급 호텔 체크인 및 휴식',
        description: '다낭 도착 후 골프백 전용 밴으로 호텔 이동 후 자유 일정 및 컨디션 조절.',
        meal: '조식: 불포함 | 중식: 불포함 | 석식: 자유식',
        hotel: '포포인츠 바이 쉐라톤 다낭 또는 동급 5성급'
      },
      {
        day: 2,
        title: '1일차 라운딩 : BRG 다낭 골프 리조트 18홀',
        description: '조식 후 골프장 이동, 오전 18홀 라운딩. 라운딩 후 마사지 및 미식 탐방.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 유명 해산물 식당',
        hotel: '포포인츠 바이 쉐라톤 다낭'
      },
      {
        day: 3,
        title: '2일차 라운딩 : 몽고메리 링크스 CC 18홀',
        description: '아름다운 링크스 코스에서 18홀 라운딩. 호이안 올드타운 관광 및 자유 석식.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 호이안 야시장 미식',
        hotel: '포포인츠 바이 쉐라톤 다낭'
      },
      {
        day: 4,
        title: '3일차 라운딩 : 바나힐스 골프클럽 18홀 ➔ 스파 ➔ 공항 샌딩',
        description: '산악 힐링 바나힐스 18홀 라운딩 후 샤워 & 90분 골프 마사지. 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한정식 삼겹살',
        hotel: '기내박'
      }
    ]
  }
];
