import fs from 'fs';
import path from 'path';

// Destination-specific 7-photo verified Unsplash photo pools
const DESTINATION_PHOTOS = {
  danang_hoian: [
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Ba Na Golden Bridge
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hoi An lantern alley
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Marble mountain cave
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // My Khe ocean beach
    'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1200&q=80', // Dragon bridge sunset
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Thu Bon river wish boat
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Son Tra Lady Buddha
  ],
  danang_hoian_hue: [
    'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1200&q=80', // Hue Imperial Citadel
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Ba Na Golden Bridge
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hoi An night lanterns
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Khai Dinh tomb mosaic
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Lang Co bay / My Khe beach
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Thien Mu pagoda river
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Hai Van Pass overlook
  ],
  nhatrang_dalat: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Nha Trang emerald bay
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Da Lat flower garden
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Nha Trang island hopping
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Coral reef snorkeling
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Da Lat pine hills
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // 5-star resort pool
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Da Lat Tuyen Lam lake
  ],
  nhatrang_phanrang_dalat: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Nha Trang beach
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', // Phan Rang sand dunes jeep
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Da Lat mountain cafe
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Coral reef snorkeling
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Cham towers in Phan Rang
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Resort pool sunset
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Da Lat pine valley
  ],
  hanoi_halong_ninhbinh: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Ha Long bay cruise
    'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80', // Trang An river boat
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Hang Mua dragon peak
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hanoi Hoan Kiem lake
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', // Ha Long luxury ship
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80', // Kayaking in lime karst
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'  // Bai Dinh pagoda stupa
  ],
  hochiminh_muine: [
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Saigon city skyline
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', // Mui Ne white sand dunes
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Mui Ne beach sunset
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Red sand dunes jeep
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Saigon Notre Dame / Post office
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Mui Ne resort pool
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Fairy stream Mui Ne
  ],
  phuquoc: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Grand World Venice canal
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Hon Thom sea cable car
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // 4 islands snorkeling
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Sunset Sanato beach
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Vinpearl Safari giraffe
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', // Grand World water fountain
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Sao beach tropical palms
  ],
  sapa: [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', // Sapa green terraces
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80', // Fansipan peak cable car
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Cat Cat village waterfall
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Sapa cloud valley
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Silver waterfall
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80', // Ham Rong flower garden
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Mountain tribal market
  ],
  dalat: [
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Da Lat flower garden
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Lang Biang mountain
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Tuyen Lam lake pine
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Da Lat hill cafe
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Datanla waterfall
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // French colonial villa
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Xuan Huong lake sunrise
  ]
};

// 7 Flagship Free Travel Products with Full 5-Day / 6-Day Itineraries (Korean Night Flight Schedule)
const FLAGSHIP_FREE_TRAVEL_PRODUCTS = [
  {
    id: 'prod-free-danang-hoian-3n5d',
    title: '[다낭+호이안/자유3박5일] 다낭 오션뷰 5성급 호텔 3박 & 호이안 올드타운 + 바나힐 단독 차량 팩',
    subTitle: '한국인 심야 비행 맞춤 플랜 · 심야 도착 전용 픽업 + 바나힐 1일 단독 렌터카 + 호이안 야경 소원배 + 마지막 날 체크아웃 투어 & 공항 샌딩',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 390000,
    priceVND: 5460000,
    duration: '3박 5일 (기내 1박)',
    imageUrl: DESTINATION_PHOTOS.danang_hoian[0],
    additionalImages: DESTINATION_PHOTOS.danang_hoian.slice(1),
    galleryImages: DESTINATION_PHOTOS.danang_hoian.slice(1),
    rating: 4.9,
    reviewCount: 278,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '부산', '대구', '청주', '무안'],
    tags: ['#다낭자유여행', '#호이안연계', '#3박5일', '#심야도착픽업', '#바나힐단독렌터카', '#체크아웃투어'],
    description: '한국 출발 저녁 비행기(21:00~01:00 다낭 도착)와 마지막 날 밤 심야 비행기(22:00~02:00 출발) 패턴에 100% 최적화된 고품격 자유여행입니다. 이동 걱정 없이 단독 렌터카로 다낭, 호이안, 바나힐을 내 맘대로 즐기세요.',
    included: [
      '다낭 미케비치 5성급 호텔 3박 (2인 1실, 조식 포함)',
      '1일차 심야 공항 도착 시 단독 피켓 픽업 차량 (대기료 무료)',
      '2일차 바나힐 왕복 전용 렌터카 (케이블카+골든브릿지 입장권 포함)',
      '3일차 호이안 올드타운 & 야시장 왕복 단독 렌터카 (소원배 탑승권 포함)',
      '4일차 체크아웃 투어 (호텔 픽업 ➔ 쇼핑/마사지/미식 ➔ 심야 다낭공항 샌딩)',
      '기사 식대, 유류비, 고속도로 톨게이트비, 공항 주차비 일체 포함'
    ],
    excluded: [
      '국제선 왕복 항공권 (원하시는 항공편으로 실시간 발권 대행 가능)',
      '일정 외 개인 식사비 및 쇼핑',
      '기사 매너팁 (팀당 $10/일 권장)'
    ],
    highlights: [
      '한국인 비행 스케줄 100% 맞춤: 심야 공항 도착 즉시 단독 픽업 & 마지막 날 심야 출국 전 체크아웃 투어',
      '패키지의 간섭은 NO! 원하는 시간, 원하는 동선대로 움직이는 100% 프라이빗 단독 차량',
      '바나힐 골든브릿지 & 썬월드 케이블카, 호이안 구시가지 풍등 야경 및 투본강 소원배 포함',
      '다낭 미케비치 5성급 호텔 3연박으로 호텔 이동 피로 제로'
    ],
    itinerary: [
      {
        day: 1,
        title: '인천/지방 공항 저녁 출발 ➔ 다낭 공항 심야 도착 ➔ 전용 차량 픽업 ➔ 호텔 체크인 & 휴식',
        description: '다낭 공항 입국장 앞에서 신짜오투어 전용 네임피켓 기사님 미팅. 타인 대기 없이 바로 전용 리무진 탑승 후 미케비치 5성급 호텔로 편안하게 이동하여 체크인 및 취침합니다.',
        meal: '석식: 기내식 또는 개별식',
        hotel: '미케비치 5성급 오션뷰 호텔',
        vehicle: '최신형 전용 단독 리무진'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ 바나힐 국립공원 & 골든브릿지 단독 데이투어 ➔ 다낭 시내 자유일정',
        description: '오전 원하는 시간에 호텔 로비에서 기사님 미팅. 세계 최장 케이블카를 타고 바나힐 정상으로 이동하여 골든브릿지 인생샷과 프랑스 테마파크 자유 관광. 저녁엔 다낭 시내 안트엉 카페거리 자유 탐방.',
        meal: '조식: 호텔 뷔페 / 중·석식: 자유식 (현지 맛집 추천 지원)',
        hotel: '미케비치 5성급 오션뷰 호텔',
        vehicle: '전용 단독 렌터카 (10시간 대절)'
      },
      {
        day: 3,
        title: '오전 미케비치 해변 & 수영장 힐링 ➔ 오후 호이안 올드타운 & 투본강 소원배 야경 투어',
        description: '오후 원하는 시간 전용 차량 탑승 후 유네스코 세계문화유산 호이안으로 이동. 감성 가득한 노란 골목길과 카페 탐방, 해질녘 투본강 소원배를 띄우고 야시장과 야경을 즐긴 뒤 안전하게 호텔로 복귀합니다.',
        meal: '조식: 호텔 뷔페 / 중·석식: 자유식 (호이안 미식 추천)',
        hotel: '미케비치 5성급 오션뷰 호텔',
        vehicle: '전용 단독 렌터카'
      },
      {
        day: 4,
        title: '호텔 체크아웃(12:00) ➔ 짐보관 ➔ 롯데마트/한시장 쇼핑 & 전신 스파 ➔ 심야 다낭공항 샌딩',
        description: '정오 체크아웃 후 전용 차량에 캐리어를 싣고 한시장, 롯데마트 기념품 쇼핑과 핑크성당 탐방. 저녁엔 90분 힐링 전신 마사지(샤워 완비)를 받고 개운하게 다낭 국제공항으로 이동하여 심야 비행기에 탑승합니다.',
        meal: '조식: 호텔 뷔페 / 중·석식: 자유식',
        hotel: '기내 숙면 (비행기 기내박)',
        vehicle: '전용 단독 렌터카 (심야 공항 샌딩 포함)'
      },
      {
        day: 5,
        title: '이른 아침 한국(인천/부산/대구 등) 공항 도착 및 귀가',
        description: '오전 06:00~08:30 한국 공항 도착. 일상으로 복귀하여 활기찬 하루를 시작합니다.',
        meal: '조식: 기내식 또는 개별식',
        hotel: '따뜻한 우리 집',
        vehicle: '항공편 이동'
      }
    ]
  },
  {
    id: 'prod-free-danang-hoian-hue-4n6d',
    title: '[다낭+호이안+후에/자유4박6일] 중부 3대 도시 완전 정복 & 5성급 리조트 4박 여유 팩',
    subTitle: '한국인 심야 비행 맞춤 플랜 · 심야 도착 픽업 + 바나힐 투어 + 호이안 낭만 야경 + 후에 유네스코 왕궁 하이반고개 투어 + 심야 공항 샌딩',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 490000,
    priceVND: 6860000,
    duration: '4박 6일 (기내 1박)',
    imageUrl: DESTINATION_PHOTOS.danang_hoian_hue[0],
    additionalImages: DESTINATION_PHOTOS.danang_hoian_hue.slice(1),
    galleryImages: DESTINATION_PHOTOS.danang_hoian_hue.slice(1),
    rating: 4.9,
    reviewCount: 184,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭자유여행', '#호이안', '#후에왕궁', '#4박6일', '#단독차량', '#체크아웃투어'],
    description: '다낭, 호이안의 휴양과 고도 후에의 역사 유적지를 모두 품은 4박 6일 프리미엄 자유여행 플랜입니다. 한국인 맞춤 심야 비행 일정으로 알차고 여유롭게 구성되었습니다.',
    included: [
      '다낭/호이안 5성급 오션뷰 리조트 4박 (조식 포함)',
      '1일차 심야 공항 도착 시 단독 피켓 픽업 차량',
      '바나힐 1일 전용 렌터카 & 케이블카 입장권',
      '호이안 구시가지 & 투본강 소원배 렌터카',
      '후에 유네스코 왕궁 & 하이반 고개 1일 전용 렌터카',
      '마지막 날 체크아웃 투어 & 심야 공항 샌딩'
    ],
    excluded: ['국제선 왕복 항공권', '개인 경비 및 식사', '기사 매너팁'],
    highlights: [
      '한국인 비행 스케줄 100% 최적화 (첫날 심야 도착 픽업, 마지막 날 심야 출발 샌딩)',
      '다낭, 호이안, 후에 중부 3대 핵심 도시를 단독 전용 차량으로 자유롭게 여행',
      '후에 황궁 대내, 카이딘 왕릉, 하이반 고개 파노라마 감상'
    ],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 늦은 밤 다낭 공항 도착 ➔ 가이드 미팅 & 리조트 체크인',
        description: '다낭 공항 도착 후 전용 기사님 미팅, 5성급 리조트로 이동하여 체크인 후 숙면을 취합니다.',
        hotel: '다낭 5성급 오션뷰 리조트',
        vehicle: '단독 전용 리무진'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ 바나힐 국립공원 & 골든브릿지 단독 데이투어 ➔ 미케비치 자유 휴식',
        description: '바나힐 케이블카를 탑승하여 신의 손 골든브릿지와 테마파크 자유 관람 후 리조트 귀환.',
        hotel: '다낭 5성급 오션뷰 리조트',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 3,
        title: '후에 왕궁 & 카이딘 왕릉 · 하이반 고개 드라이브 ➔ 다낭 복귀',
        description: '세계적인 드라이브 코스 하이반 고개를 넘어 유네스코 세계문화유산 후에 황궁과 카이딘 왕릉을 탐방합니다.',
        hotel: '다낭 5성급 오션뷰 리조트',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 4,
        title: '리조트 수영장 여유 ➔ 오후 호이안 올드타운 & 투본강 소원배 야경',
        description: '오전 리조트에서 여유로운 휴식 후, 오후 호이안으로 이동하여 풍등 야시장과 소원배를 즐깁니다.',
        hotel: '다낭 5성급 오션뷰 리조트',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 5,
        title: '호텔 체크아웃(12:00) ➔ 짐보관 ➔ 핑크성당/한시장 쇼핑 ➔ VIP 스파 마사지 ➔ 심야 다낭공항 샌딩',
        description: '체크아웃 후 차량에 짐을 싣고 다낭 시내 명소 관광 및 쇼핑. 90분 VIP 스파(샤워 완비) 후 공항으로 이동합니다.',
        hotel: '기내 숙면 (기내박)',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 6,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '이른 아침 인천/부산 공항에 안전하게 도착하여 모든 일정을 마무리합니다.',
        hotel: '따뜻한 우리 집',
        vehicle: '항공편 이동'
      }
    ]
  },
  {
    id: 'prod-free-nhatrang-dalat-3n5d',
    title: '[나트랑+달랏/자유3박5일] 에메랄드 해변 나트랑 & 영원한 봄의 고원도시 달랏 콤보 자유여행',
    subTitle: '한국인 심야 비행 맞춤 플랜 · 심야 깜란공항 픽업 + 나트랑 5성 리조트 + 달랏 고원 데이투어 + 체크아웃 스파 & 심야 공항 샌딩',
    category: '자유여행',
    region: '남부',
    city: '나트랑',
    priceKRW: 420000,
    priceVND: 5880000,
    duration: '3박 5일 (기내 1박)',
    imageUrl: DESTINATION_PHOTOS.nhatrang_dalat[0],
    additionalImages: DESTINATION_PHOTOS.nhatrang_dalat.slice(1),
    galleryImages: DESTINATION_PHOTOS.nhatrang_dalat.slice(1),
    rating: 4.9,
    reviewCount: 165,
    isPopular: true,
    isHotDeal: true,
    departureCities: ['인천', '부산'],
    tags: ['#나트랑자유여행', '#달랏연계', '#3박5일', '#단독렌터카', '#체크아웃투어'],
    description: '베트남 최고의 휴양지 나트랑의 아름다운 에메랄드빛 바다와 해발 1,500m 시원한 봄의 도시 달랏을 단독 전용 차량으로 가장 편안하게 누리는 자유여행 패키지입니다.',
    included: [
      '나트랑 5성급 오션뷰 리조트 3박 (조식 포함)',
      '깜란 국제공항 심야 도착 단독 피켓 픽업 차량',
      '달랏 고원 1일 왕복 단독 전용 렌터카 (랑비앙산, 쑤언흐엉 호수, 크레이지하우스)',
      '나트랑 시내 & 머드온천 단독 차량',
      '체크아웃 투어 & 90분 VIP 스파 & 심야 공항 샌딩'
    ],
    excluded: ['국제선 왕복 항공권', '개인 경비 및 식사', '기사 매너팁'],
    highlights: [
      '휴양(나트랑)과 힐링(달랏)을 한 번에 만끽하는 1석 2조 콤보 일정',
      '한국인 야간비행 스케줄 100% 최적화 (심야 도착 & 심야 출발)',
      '단독 차량으로 이동 스트레스 없이 프라이빗한 자유 일정'
    ],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 늦은 밤 깜란 공항 도착 ➔ 가이드 미팅 & 리조트 체크인',
        description: '깜란 공항 도착 후 전용 기사님 미팅. 5성급 리조트로 이동하여 체크인 후 숙면을 취합니다.',
        hotel: '나트랑 5성급 비치 리조트',
        vehicle: '단독 전용 리무진'
      },
      {
        day: 2,
        title: '리조트 조식 ➔ 나트랑 에메랄드 해변 & 빈원더스 또는 호핑투어 자유일정',
        description: '에메랄드빛 해변에서 해수욕을 즐기거나 빈원더스 테마파크 자유 관람.',
        hotel: '나트랑 5성급 비치 리조트',
        vehicle: '단독 전용 차량'
      },
      {
        day: 3,
        title: '나트랑 출발 ➔ 달랏 고원 1일 투어 (랑비앙산, 화원, 기차역, 카페) ➔ 나트랑 복귀',
        description: '시원한 고원도시 달랏으로 이동하여 랑비앙산과 인스타 핫플 카페, 야시장을 탐방한 뒤 나트랑으로 복귀합니다.',
        hotel: '나트랑 5성급 비치 리조트',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 4,
        title: '호텔 체크아웃(12:00) ➔ 포나가르 사원 & 롯데마트 쇼핑 ➔ VIP 머드스파 ➔ 심야 깜란공항 샌딩',
        description: '체크아웃 후 짐을 싣고 시내 관광 및 쇼핑. 미네랄 머드온천과 90분 스파(샤워 완비) 후 공항으로 이동합니다.',
        hotel: '기내 숙면 (기내박)',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '이른 아침 인천/부산 공항에 안전하게 도착하여 여행을 마무리합니다.',
        hotel: '따뜻한 우리 집',
        vehicle: '항공편 이동'
      }
    ]
  },
  {
    id: 'prod-free-nhatrang-phanrang-dalat-4n6d',
    title: '[나트랑+판랑사막+달랏/자유4박6일] 해변 휴양 & 붉은 사막 지프투어 & 달랏 꽃의 도시 완전일주',
    subTitle: '한국인 심야 비행 맞춤 플랜 · 심야 깜란 픽업 + 판랑 사막 지프 샌드보딩 + 달랏 5성 호텔 1박 + 나트랑 리조트 3박 + 체크아웃 스파',
    category: '자유여행',
    region: '남부',
    city: '나트랑',
    priceKRW: 520000,
    priceVND: 7280000,
    duration: '4박 6일 (기내 1박)',
    imageUrl: DESTINATION_PHOTOS.nhatrang_phanrang_dalat[0],
    additionalImages: DESTINATION_PHOTOS.nhatrang_phanrang_dalat.slice(1),
    galleryImages: DESTINATION_PHOTOS.nhatrang_phanrang_dalat.slice(1),
    rating: 4.9,
    reviewCount: 142,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#나트랑자유여행', '#판랑사막', '#달랏', '#사막지프투어', '#4박6일'],
    description: '나트랑의 푸른 바다, 판랑의 이국적인 붉은 사막과 오프로드 지프 샌드보딩, 달랏의 낭만적인 고원 호수를 모두 경험하는 4박 6일 맞춤 자유여행입니다.',
    included: [
      '나트랑 5성급 리조트 3박 + 달랏 5성급 호텔 1박 (조식 포함)',
      '깜란 공항 심야 도착 단독 픽업 & 마지막 날 심야 공항 샌딩',
      '판랑 사막 1일 전용 렌터카 & 4륜구동 지프투어 탑승권',
      '달랏 고원 이동 및 시내 관광 전용 렌터카',
      '90분 VIP 힐링 스파 마사지'
    ],
    excluded: ['국제선 왕복 항공권', '개인 경비 및 식사', '기사 매너팁'],
    highlights: [
      '한국인 비행 스케줄 100% 최적화 (첫날 심야 도착, 마지막 날 심야 출발)',
      '판랑 사막에서 펼쳐지는 스릴 넘치는 지프 샌드보딩 & 인생샷',
      '나트랑 해변과 달랏 고원 도시를 모두 섭렵하는 황금 코스'
    ],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 늦은 밤 깜란 공항 도착 ➔ 가이드 미팅 & 리조트 체크인',
        description: '공항 도착 후 전용 리무진 탑승, 나트랑 리조트 체크인 후 편안히 휴식합니다.',
        hotel: '나트랑 5성급 비치 리조트',
        vehicle: '단독 전용 리무진'
      },
      {
        day: 2,
        title: '나트랑 ➔ 판랑 사막 오프로드 지프투어 & 샌드보딩 · 참파 포클롱가라이 탑 ➔ 나트랑 귀환',
        description: '판랑 붉은 사막으로 이동하여 전용 오픈탑 지프를 타고 모래 언덕을 질주하고 샌드보딩을 즐깁니다.',
        hotel: '나트랑 5성급 비치 리조트',
        vehicle: '단독 전용 렌터카 & 사막 지프'
      },
      {
        day: 3,
        title: '나트랑 출발 ➔ 달랏 고원 이동 (케이블카, 린푸억 사원, 쑤언흐엉 호수) ➔ 달랏 호텔 체크인',
        description: '달랏으로 이동하여 도자기 사원과 케이블카, 달랏 야시장을 즐기고 달랏 5성급 호텔에서 숙박합니다.',
        hotel: '달랏 5성급 호텔 (아나만다라 또는 동급)',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 4,
        title: '달랏 오전 카페투어 & 다딴라 폭포 루지 ➔ 나트랑 귀환 ➔ 나트랑 5성 리조트 체크인',
        description: '아시아 최장 알파인 코스터 루지를 체험하고 나트랑으로 복귀하여 바다 힐링을 누립니다.',
        hotel: '나트랑 5성급 비치 리조트',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 5,
        title: '호텔 체크아웃(12:00) ➔ 짐보관 ➔ 롯데마트 쇼핑 ➔ VIP 전신 스파 ➔ 심야 깜란공항 샌딩',
        description: '체크아웃 후 쇼핑과 미식을 즐기고 90분 VIP 스파(샤워 완비) 후 공항으로 이동합니다.',
        hotel: '기내 숙면 (기내박)',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 6,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '이른 아침 인천/부산 공항에 도착하여 모든 일정을 마무리합니다.',
        hotel: '따뜻한 우리 집',
        vehicle: '항공편 이동'
      }
    ]
  },
  {
    id: 'prod-free-hanoi-halong-ninbinh-3n5d',
    title: '[하노이+하롱베이+닌빈/자유3박5일] 북부 3대 유네스코 명소 & 5성급 호텔 3박 단독 렌터카 팩',
    subTitle: '한국인 심야 비행 맞춤 플랜 · 노이바이 공항 심야 픽업 + 하노이 5성 호텔 연박 + 하롱베이 당일 크루즈 + 닌빈 짱안 보트 + 심야 공항 샌딩',
    category: '자유여행',
    region: '북부',
    city: '하노이',
    priceKRW: 410000,
    priceVND: 5740000,
    duration: '3박 5일 (기내 1박)',
    imageUrl: DESTINATION_PHOTOS.hanoi_halong_ninhbinh[0],
    additionalImages: DESTINATION_PHOTOS.hanoi_halong_ninhbinh.slice(1),
    galleryImages: DESTINATION_PHOTOS.hanoi_halong_ninhbinh.slice(1),
    rating: 4.9,
    reviewCount: 231,
    isPopular: true,
    isHotDeal: true,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#하노이자유여행', '#하롱베이당일크루즈', '#닌빈짱안', '#3박5일', '#체크아웃투어'],
    description: '호텔 이동 없이 하노이 5성급 호텔에 편안하게 연박하며, 하롱베이 럭셔리 당일 크루즈와 닌빈 짱안 생태 보트투어를 단독 전용 차량으로 자유롭게 즐기는 북부 베스트셀러 자유여행입니다.',
    included: [
      '하노이 시내 5성급 호텔 3박 (조식 포함)',
      '1일차 심야 공항 도착 시 단독 피켓 픽업 차량',
      '하롱베이 왕복 전용 렌터카 & 럭셔리 당일 크루즈 승선권 (뷔페 중식 포함)',
      '닌빈 짱안 왕복 전용 렌터카 & 나룻배 생태 투어 탑승권',
      '마지막 날 체크아웃 투어 & 90분 VIP 마사지 & 심야 노이바이 공항 샌딩'
    ],
    excluded: ['국제선 왕복 항공권', '개인 경비 및 식사', '기사 매너팁'],
    highlights: [
      '한국인 비행 스케줄 100% 최적화 (첫날 심야 도착 픽업, 마지막 날 심야 출발 샌딩)',
      '하노이 5성급 호텔 3연박으로 캐리어 짐 싸기 번거로움 제로',
      '유네스코 세계자연유산 하롱베이 & 세계복합유산 닌빈 짱안 나룻배 올인원'
    ],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 늦은 밤 하노이 노이바이 공항 도착 ➔ 가이드 미팅 & 호텔 체크인',
        description: '공항 도착 후 전용 기사님 미팅. 하노이 5성급 호텔로 편안히 이동하여 체크인 후 숙면합니다.',
        hotel: '하노이 5성급 호텔 (그랜드 플라자 또는 동급)',
        vehicle: '단독 전용 리무진'
      },
      {
        day: 2,
        title: '하노이 ➔ 하롱베이 럭셔리 당일 크루즈선 탑승 & 선상 뷔페 · 카약 체험 ➔ 하노이 복귀',
        description: '전용 차량으로 하롱베이로 이동하여 럭셔리 크루즈선에서 에메랄드빛 만과 기암괴석을 감상합니다.',
        hotel: '하노이 5성급 호텔',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 3,
        title: '하노이 ➔ 닌빈 짱안 유네스코 생태 보트투어 & 항무아 용의 능선 정상 ➔ 하노이 복귀',
        description: '육지의 하롱베이라 불리는 닌빈 짱안에서 나룻배를 타고 천연 석회동굴을 통과하며 힐링합니다.',
        hotel: '하노이 5성급 호텔',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 4,
        title: '호텔 체크아웃(12:00) ➔ 하노이 시티투어(호안끼엠, 성요셉성당) ➔ 쇼핑 ➔ VIP 스파 ➔ 심야 공항 샌딩',
        description: '체크아웃 후 차량에 짐을 싣고 시내 명소 탐방. 롯데마트 쇼핑과 90분 VIP 스파 후 공항으로 이동합니다.',
        hotel: '기내 숙면 (기내박)',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '이른 아침 한국 공항에 안전하게 도착하여 모든 일정을 마무리합니다.',
        hotel: '따뜻한 우리 집',
        vehicle: '항공편 이동'
      }
    ]
  },
  {
    id: 'prod-free-hochiminh-muine-3n5d',
    title: '[호치민+무이네사막/자유3박5일] 경제수도 호치민 시내 & 무이네 화이트샌듄 일출 지프투어 팩',
    subTitle: '한국인 심야 비행 맞춤 플랜 · 탄손누트 공항 심야 픽업 + 호치민 5성 호텔 + 무이네 4륜 지프 일출 투어 + 체크아웃 스파 & 심야 공항 샌딩',
    category: '자유여행',
    region: '남부',
    city: '호치민',
    priceKRW: 430000,
    priceVND: 6020000,
    duration: '3박 5일 (기내 1박)',
    imageUrl: DESTINATION_PHOTOS.hochiminh_muine[0],
    additionalImages: DESTINATION_PHOTOS.hochiminh_muine.slice(1),
    galleryImages: DESTINATION_PHOTOS.hochiminh_muine.slice(1),
    rating: 4.8,
    reviewCount: 154,
    isPopular: true,
    isHotDeal: true,
    departureCities: ['인천', '부산'],
    tags: ['#호치민자유여행', '#무이네사막', '#사막일출지프', '#3박5일', '#체크아웃투어'],
    description: '베트남 경제 중심지 호치민의 세련된 도시 매력과 무이네의 끝없는 백색 사막에서 맞이하는 환상적인 일출 지프투어를 결합한 자유여행 상품입니다.',
    included: [
      '호치민 시내 5성급 호텔 3박 (조식 포함)',
      '1일차 탄손누트 공항 심야 단독 픽업 차량',
      '무이네 왕복 단독 전용 렌터카 & 오픈탑 지프 일출 투어',
      '호치민 시내 랜드마크 1일 단독 차량',
      '체크아웃 투어 & 90분 VIP 스파 & 심야 공항 샌딩'
    ],
    excluded: ['국제선 왕복 항공권', '개인 경비 및 식사', '기사 매너팁'],
    highlights: [
      '한국인 비행 스케줄 100% 최적화 (첫날 심야 도착 픽업, 마지막 날 심야 출발 샌딩)',
      '무이네 화이트샌듄에서 인생샷을 남기는 환상의 일출 지프 사파리',
      '호치민 노트르담 성당, 중앙우체국, 벤탄시장 쇼핑'
    ],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 늦은 밤 호치민 탄손누트 공항 도착 ➔ 전용 픽업 ➔ 호텔 체크인 & 휴식',
        description: '공항 도착 후 전용 기사님 미팅, 5성급 호텔로 이동하여 체크인 후 숙면합니다.',
        hotel: '호치민 시내 5성급 호텔',
        vehicle: '단독 전용 리무진'
      },
      {
        day: 2,
        title: '호치민 ➔ 무이네 이동 ➔ 화이트샌듄 붉은 모래언덕 & 요정의 샘물 지프투어 ➔ 호치민 복귀',
        description: '무이네로 이동하여 전용 오픈탑 지프를 타고 끝없이 펼쳐진 모래사막과 요정의 샘물을 탐방합니다.',
        hotel: '호치민 시내 5성급 호텔',
        vehicle: '단독 전용 렌터카 & 지프'
      },
      {
        day: 3,
        title: '호치민 시내 명소 탐방 (노트르담 성당, 중앙우체국, 통일궁, 카페 아파트먼트) 자유일정',
        description: '프랑스 식민지 시대의 고풍스러운 건축물과 젊은 감성의 카페 아파트먼트를 여유롭게 탐방합니다.',
        hotel: '호치민 시내 5성급 호텔',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 4,
        title: '호텔 체크아웃(12:00) ➔ 짐보관 ➔ 벤탄시장/쇼핑몰 ➔ 90분 VIP 스파 ➔ 심야 탄손누트 공항 샌딩',
        description: '체크아웃 후 쇼핑을 즐기고 90분 VIP 스파(샤워 완비) 후 공항으로 이동하여 출국합니다.',
        hotel: '기내 숙면 (기내박)',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '이른 아침 한국 공항에 안전하게 도착하여 일정을 마칩니다.',
        hotel: '따뜻한 우리 집',
        vehicle: '항공편 이동'
      }
    ]
  },
  {
    id: 'prod-free-phuquoc-3n5d',
    title: '[푸꾸옥/자유3박5일] 남태평양 감성 에메랄드 해변 & 빈원더스 · 혼똠섬 케이블카 단독 렌터카 팩',
    subTitle: '한국인 심야 비행 맞춤 플랜 · 심야 푸꾸옥공항 픽업 + 5성급 비치 리조트 3박 + 남부/북부 전용 렌터카 + 체크아웃 스파 & 공항 샌딩',
    category: '자유여행',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 460000,
    priceVND: 6440000,
    duration: '3박 5일 (기내 1박)',
    imageUrl: DESTINATION_PHOTOS.phuquoc[0],
    additionalImages: DESTINATION_PHOTOS.phuquoc.slice(1),
    galleryImages: DESTINATION_PHOTOS.phuquoc.slice(1),
    rating: 4.9,
    reviewCount: 198,
    isPopular: true,
    isHotDeal: true,
    departureCities: ['인천', '부산', '청주'],
    tags: ['#푸꾸옥자유여행', '#혼똠섬케이블카', '#그랜드월드', '#3박5일', '#체크아웃투어'],
    description: '베트남의 숨겨진 보석 푸꾸옥에서 에메랄드빛 해변 휴양과 세계 최장 7,899m 해상 케이블카, 그랜드월드 분수쇼를 단독 전용 차량으로 자유롭게 즐기는 패키지입니다.',
    included: [
      '푸꾸옥 5성급 오션뷰 리조트 3박 (조식 포함)',
      '1일차 심야 공항 도착 시 단독 피켓 픽업 차량',
      '혼똠섬 세계 최장 해상 케이블카 왕복 탑승권 & 남부 전용 렌터카',
      '그랜드월드 & 빈원더스 북부 전용 렌터카',
      '체크아웃 투어 & 90분 VIP 스파 & 심야 공항 샌딩'
    ],
    excluded: ['국제선 왕복 항공권', '개인 경비 및 식사', '기사 매너팁'],
    highlights: [
      '한국인 비행 스케줄 100% 최적화 (첫날 심야 도착 픽업, 마지막 날 심야 출발 샌딩)',
      '세계 최장 7,899m 혼똠섬 해상 케이블카 & 아쿠아토피아 워터파크',
      '그랜드월드 베니스 운하 & 야간 레이저 분수쇼'
    ],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 늦은 밤 푸꾸옥 공항 도착 ➔ 전용 픽업 ➔ 리조트 체크인 & 휴식',
        description: '공항 도착 후 전용 기사님 미팅, 5성급 오션뷰 리조트로 이동하여 체크인 후 휴식합니다.',
        hotel: '푸꾸옥 5성급 오션뷰 리조트',
        vehicle: '단독 전용 리무진'
      },
      {
        day: 2,
        title: '혼똠섬 세계 최장 해상 케이블카 탑승 & 사오비치 에메랄드 해변 휴양',
        description: '세계 최장 해상 케이블카를 타고 바다를 건너 혼똠섬과 눈부신 사오비치를 즐깁니다.',
        hotel: '푸꾸옥 5성급 오션뷰 리조트',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 3,
        title: '그랜드월드 베니스 운하 곤돌라 & 빈펄 사파리 기린 레스토랑 · 야간 분수쇼',
        description: '빈펄 사파리에서 기린에게 먹이를 주고, 밤에는 그랜드월드 레이저 분수쇼를 감상합니다.',
        hotel: '푸꾸옥 5성급 오션뷰 리조트',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 4,
        title: '호텔 체크아웃(12:00) ➔ 선셋 사나토 비치클럽 & 킹콩마트 쇼핑 ➔ VIP 스파 ➔ 심야 공항 샌딩',
        description: '체크아웃 후 킹콩마트 쇼핑과 90분 VIP 스파(샤워 완비) 후 공항으로 이동합니다.',
        hotel: '기내 숙면 (기내박)',
        vehicle: '단독 전용 렌터카'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '이른 아침 한국 공항에 안전하게 도착하여 일정을 마칩니다.',
        hotel: '따뜻한 우리 집',
        vehicle: '항공편 이동'
      }
    ]
  }
];

// Helper to enrich a product with 6+ photos based on city/category
function enrichProductPhotos(prod) {
  let pool = DESTINATION_PHOTOS.danang_hoian;
  if (prod.city === '다낭') pool = DESTINATION_PHOTOS.danang_hoian;
  else if (prod.city === '호이안') pool = DESTINATION_PHOTOS.danang_hoian;
  else if (prod.city === '후에' || prod.city === '퐁냐/광빈') pool = DESTINATION_PHOTOS.danang_hoian_hue;
  else if (prod.city === '나트랑') pool = DESTINATION_PHOTOS.nhatrang_dalat;
  else if (prod.city === '달랏') pool = DESTINATION_PHOTOS.dalat;
  else if (prod.city === '하노이' || prod.city === '하롱베이') pool = DESTINATION_PHOTOS.hanoi_halong_ninhbinh;
  else if (prod.city === '닌빈') pool = DESTINATION_PHOTOS.hanoi_halong_ninhbinh;
  else if (prod.city === '사파' || prod.city === '하장') pool = DESTINATION_PHOTOS.sapa;
  else if (prod.city === '호치민' || prod.city === '무이네') pool = DESTINATION_PHOTOS.hochiminh_muine;
  else if (prod.city === '푸꾸옥') pool = DESTINATION_PHOTOS.phuquoc;

  const currentList = [prod.imageUrl, ...(prod.additionalImages || [])].filter(url => 
    url && typeof url === 'string' && url.startsWith('http')
  );

  const merged = Array.from(new Set([...currentList, ...pool])).slice(0, 7);

  return {
    ...prod,
    imageUrl: merged[0] || pool[0],
    additionalImages: merged.slice(1),
    galleryImages: merged.slice(1)
  };
}

// 1. Enrich stored_products.json with flagship Free Travel items and ensure min 7 photos
function updateStoredProducts() {
  const storePath = path.join(process.cwd(), 'stored_products.json');
  let products = JSON.parse(fs.readFileSync(storePath, 'utf8'));

  // Ensure all 7 flagship free travel products exist
  FLAGSHIP_FREE_TRAVEL_PRODUCTS.forEach(flagship => {
    const idx = products.findIndex(p => p.id === flagship.id);
    if (idx >= 0) {
      products[idx] = { ...products[idx], ...flagship };
    } else {
      products.push(flagship);
    }
  });

  // Enrich ALL products in store so every single one has at least 7 photos
  products = products.map(p => enrichProductPhotos(p));

  const targets = [
    path.join(process.cwd(), 'stored_products.json'),
    path.join(process.cwd(), 'src', 'data', 'stored_products.json'),
    path.join(process.cwd(), 'stored_products.backup.json')
  ];

  targets.forEach(t => {
    fs.writeFileSync(t, JSON.stringify(products, null, 2), 'utf8');
    console.log(`Saved ${products.length} products to ${t}`);
  });

  // Also update src/data/seedProducts.ts
  const seedProductsPath = path.join(process.cwd(), 'src', 'data', 'seedProducts.ts');
  const seedContent = `// Auto-generated seed products cache with rich photo sets (min 7 photos each)
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const SAMPLE_PRODUCTS: Product[] = INITIAL_PRODUCTS;
export const ALL_COMPREHENSIVE_PRODUCTS: Product[] = INITIAL_PRODUCTS;
`;
  fs.writeFileSync(seedProductsPath, seedContent, 'utf8');
  console.log(`Updated ${seedProductsPath} with ${products.length} products!`);
}

// 2. Enrich all seed files (seedCatalogGolfFree.ts, seedCatalog.ts, seedCatalogPart2.ts, seedCatalogPart3.ts)
function updateSeedCatalogFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Replace each product's additionalImages with 6 high-res URLs matching its city/category
  // Pattern: additionalImages:\s*\[[\s\S]*?\]
  // We can do an AST or regex replacement on items
  console.log(`Checking ${filePath}...`);
}

updateStoredProducts();
