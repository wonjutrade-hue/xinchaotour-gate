import { Product } from '../types';

export const COMPREHENSIVE_CATALOG: Product[] = [
  // =========================================================================
  // 1. 다낭 (DA NANG)
  // =========================================================================
  {
    id: 'prod-danang-hanatour-benchmark-vip-3n5d',
    title: '[다낭/VIP 단독 품격] 5성급 오션뷰 & 바나힐·호이안 올인원 3박 5일 (NO쇼핑/NO옵션)',
    subTitle: '하나투어 AVP 다낭 패키지 완벽 업그레이드! 단독 16인승 밴 + 전담 한국어가이드 + 바나힐 골든브릿지 + 호이안 소원배·바구니배 + 랍스터 씨푸드 + 90분 VIP 스파',
    category: '추천패키지',
    region: '중부',
    city: '다낭',
    priceKRW: 750000,
    priceVND: 13900000,
    duration: '3박 5일',
    imageUrl: "/images/danang_golden_bridge.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 384,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 18,
    departureCities: ['인천', '부산', '대구', '청주', '무안'],
    tags: [
      '#다낭3박5일',
      '#바나힐골든브릿지',
      '#호이안올드타운',
      '#소원배바구니배',
      '#미케비치5성급',
      '#NO쇼핑NO옵션',
      '#VIP단독투어',
      '#해산물BBQ'
    ],
    description: '대형 패키지 여행사의 20~30인 단체 합승 버스와 3~4회 강제 쇼핑센터 방문의 불편함을 완벽히 해결했습니다. 신짜오투어는 오직 우리 일행만을 위한 최신형 16인승 전용 차량과 한국어 가이드가 동행하며, 바나힐·호이안·미케비치 핵심 명소와 프리미엄 미식, 90분 VIP 스파까지 전 일정 올포함으로 케어해 드립니다.',
    included: [
      '다낭 미케비치 5성급 인터내셔널 오션뷰 호텔 3박 (2인 1실, 조식 포함)',
      '우리 일행만을 위한 16인승 단독 전용 차량 및 베테랑 전담 기사 (전 일정)',
      '신짜오투어 현지 베트남 공인 한국어 1급 전담 가이드 풀케어',
      '바나힐 썬월드 국립공원 케이블카 왕복 + 골든브릿지 + 프랑스마을 테마파크 + 정상 뷔페 중식',
      '호이안 유네스코 올드타운 입장권 + 투본강 소원배(야간 유등 포함) + 깜딴 코코넛 바구니배 체험',
      '오행산(마블마운틴) 동굴 & 손짜반도 영흥사(해수관음상) 입장료',
      '4대 프리미엄 특식: ① 미케비치 랍스터/크랩 씨푸드 BBQ, ② 호이안 전통 반쎄오&화이트로즈, ③ 미슐랭 분짜&스프링롤, ④ 프리미엄 한정식',
      '여행의 피로를 풀어주는 90분 VIP 천연 허브 핫스톤 스파 전원 포함 (1회)',
      '기사/가이드 팁, 차량 유류비, 도로비, 주차비 일체 포함'
    ],
    excluded: [
      '국제선 왕복 항공권 (최저가 실시간 발권 지원)',
      '개인 쇼핑 경비 및 주류/음료',
      '호텔 1인실 싱글룸 사용 시 싱글 차지'
    ],
    itinerary: [
      {
        day: 1,
        title: '인천/지방공항 출발 ➔ 다낭 국제공항 도착 ➔ VIP 전담 피켓 미팅 ➔ 5성급 호텔 체크인',
        description: '다낭 공항 도착 후 입국장을 나오시면 신짜오투어 전담 가이드가 고객님 성함 피켓으로 반갑게 맞이합니다. 우리 일행 전용 리무진 밴에 탑승하여 5성급 오션뷰 호텔로 안전하게 이동 후 체크인 및 환영 야식(전통 쌀국수) 제공.',
        meal: '조식: 기내식 | 중식: 자유식 | 석식: 다낭 전통 쌀국수 특식',
        hotel: '포포인츠 바이 쉐라톤 다낭 / 신라 모노그램 (또는 동급 5성급 오션뷰)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['다낭 국제공항', '미케비치 해안도로', '5성급 호텔 체크인']
      },
      {
        day: 2,
        title: '오행산(마블마운틴) 탐방 ➔ 호이안 코코넛 바구니배 ➔ 유네스코 호이안 올드타운 & 투본강 소원배 야경',
        description: '대리석과 동굴의 비경을 간직한 오행산(암푸동굴)을 관람한 후, 깜딴 야자수 숲에서 신나는 코코넛 바구니배 체험을 즐깁니다. 오후에는 유네스코 세계문화유산 호이안 올드타운(내원교, 쩐가사당)을 여유롭게 산책하고, 해질녘 투본강에서 소원등을 띄우며 낭만적인 야경을 만끽합니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 호이안 전통 명물식 (반쎄오, 화이트로즈, 까오라우) | 석식: 호이안 강변 프리미엄 로컬 만찬',
        hotel: '다낭 5성급 오션뷰 호텔',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['오행산 마블마운틴', '깜딴 코코넛 바구니배', '호이안 올드타운', '투본강 소원배 야경']
      },
      {
        day: 3,
        title: '구름 위의 테마파크 [바나힐 썬월드] & 골든브릿지 ➔ 90분 VIP 핫스톤 스파 ➔ 미케비치 씨푸드 BBQ 만찬',
        description: '해발 1,487m 고원에 위치한 프랑스풍 테마파크 바나힐로 이동하여 기네스북 등재 케이블카와 신의 손 골든브릿지에서 인생 사진을 남깁니다. 정상 인터내셔널 뷔페 중식 후 판타지 파크를 즐기고, 다낭 시내로 귀환하여 90분 VIP 천연 핫스톤 마사지로 피로를 싹 풀어드립니다. 저녁에는 미케비치 바다를 바라보며 싱싱한 랍스터/크랩 해산물 BBQ 만찬을 즐깁니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 바나힐 정상 아라팡 인터내셔널 뷔페 | 석식: 미케비치 프리미엄 랍스터 & 씨푸드 BBQ',
        hotel: '다낭 5성급 오션뷰 호텔',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['바나힐 케이블카', '골든브릿지(신의 손)', '프랑스마을', '90분 VIP 스파', '미케비치']
      },
      {
        day: 4,
        title: '손짜반도 영흥사(비밀의 사원) ➔ 다낭 핑크성당 & 한시장 쇼핑 ➔ 롯데마트 ➔ 레이트 체크아웃 & 공항 샌딩',
        description: '67m 거대 해수관음상이 바다를 내려다보는 영흥사와 프랑스 식민지 시절의 건축미를 간직한 핑크성당을 관람합니다. 이어 다낭의 명물 한시장과 롯데마트에서 가족/지인 선물을 알뜰하게 쇼핑하고, 맛있는 저녁 식사 후 공항으로 여유롭게 이동합니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 미슐랭 분짜 & 모닝글로리 특식 | 석식: 다낭 프리미엄 한정식 특식',
        hotel: '기내박 (귀국편)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['손짜 영흥사(해수관음상)', '다낭 대성당(핑크성당)', '한시장', '용다리', '롯데마트']
      },
      {
        day: 5,
        title: '인천/지방 국제공항 도착 ➔ 개별 해산 및 소중한 추억 간직',
        description: '다낭을 출발하여 한국 국제공항에 안전하게 도착. 모든 일정을 마치고 편안한 귀가.',
        meal: '조식: 기내식',
        hotel: '귀국',
        vehicle: '개별 귀가'
      }
    ],
    highlights: [
      '하나투어 AVP 다낭/바나힐/호이안 3박5일 정통 코스를 100% 프라이빗 VIP 단독 투어로 업그레이드',
      'NO 쇼핑 / NO 옵션 강요 / NO 팁 강요 (3대 안심 보장제)',
      '다낭 미케비치 5성급 특급 오션뷰 호텔 3박 숙박',
      '기네스북 케이블카 & 골든브릿지 바나힐 썬월드 + 정상 뷔페 올포함',
      '유네스코 호이안 올드타운 + 투본강 야간 소원배 + 코코넛 바구니배 풀코스',
      '미케비치 랍스터 씨푸드 BBQ 포함 4대 미식 특식 제공',
      '여행의 피로를 말끔히 씻어주는 90분 VIP 천연 핫스톤 스파 전원 포함'
    ],
    vehicleInfo: '우리 일행 단독 최신형 16인승 리무진 밴 (베테랑 전담 기사)',
    guideInfo: '신짜오투어 베트남 현지 공인 한국어 1급 전담 가이드 풀케어',
    travelTheme: '가족/부모님/연인/친구를 위한 NO쇼핑 VIP 단독 힐링 품격 패키지'
  },
  {
    id: 'prod-danang-pkg-01',
    title: '[다낭/VIP 단독] 다낭·바나힐·호이안 올드타운 명품 힐링 패키지 3박 5일',
    subTitle: '5성급 오션뷰 호텔 + 바나힐 골든브릿지 + 호이안 유네스코 올드타운 소원배 + 90분 VIP 스파 (NO쇼핑/NO옵션)',
    category: '추천패키지',
    region: '중부',
    city: '다낭',
    priceKRW: 690000,
    priceVND: 12800000,
    duration: '3박 5일',
    imageUrl: "/images/danang_city_dragon.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 312,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '부산', '대구', '청주', '무안'],
    tags: ['#다낭3박5일', '#바나힐골든브릿지', '#호이안올드타운', '#소원배', '#NO쇼핑', '#한국어가이드'],
    description: '타인과의 합승 없이 오직 우리 일행만을 위한 16인승 전용 차량과 한국어 가이드가 동행하는 신짜오투어 대표 베스트셀러 상품입니다.',
    included: [
      '다낭 5성급 오션뷰 호텔 3박 (2인 1실, 조식 포함)',
      '16인승 최신형 단독 전용 차량 및 베테랑 전담 기사',
      '신짜오투어 공인 한국어 전담 전문 가이드 풀케어',
      '바나힐 왕복 케이블카 + 골든브릿지 + 정상 뷔페 중식',
      '호이안 올드타운 입장권 + 투본강 소원배(유등 포함)',
      '90분 VIP 전신 힐링 마사지 1회'
    ],
    excluded: [
      '국제선 왕복 항공권 (최저가 실시간 발권 지원)',
      '개인 쇼핑 경비 및 주류/음료',
      '가이드/기사 자율 매너팁'
    ],
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ 가이드 미팅 ➔ 5성급 호텔 체크인 & 미케비치 힐링',
        description: '공항 도착 후 전담 가이드 미팅. 전용 차량 탑승 후 호텔 체크인 및 미케비치 산책과 환영 쌀국수 만찬.',
        meal: '조식: 기내식 | 중식: 자유식 | 석식: 전통 쌀국수 특식',
        hotel: '포포인츠 바이 쉐라톤 다낭 (또는 동급 5성급)',
        vehicle: '16인승 단독 전용 차량'
      },
      {
        day: 2,
        title: '구름 위의 테마파크 [바나힐] & 골든브릿지 ➔ 90분 VIP 스파',
        description: '세계 최장 케이블카 탑승, 골든브릿지 관람 및 프랑스마을 테마파크 자유관광. 90분 전신 마사지.',
        meal: '조식: 호텔식 | 중식: 바나힐 인터내셔널 뷔페 | 석식: 미케비치 해산물 BBQ',
        hotel: '포포인츠 바이 쉐라톤 다낭',
        vehicle: '16인승 단독 전용 차량'
      },
      {
        day: 3,
        title: '오행산 동굴 탐방 ➔ 유네스코 호이안 올드타운 & 투본강 소원배',
        description: '마블마운틴 오행산 관람 후 유네스코 고도 호이안 올드타운 도보 투어 및 야간 소원배 탑승.',
        meal: '조식: 호텔식 | 중식: 현지 정식 | 석식: 호이안 명물 특식 (화이트로즈/반쎄오)',
        hotel: '포포인츠 바이 쉐라톤 다낭',
        vehicle: '16인승 단독 전용 차량'
      },
      {
        day: 4,
        title: '다낭 핑크성당 & 한시장 쇼핑 ➔ 롯데마트 ➔ 공항 샌딩',
        description: '다낭 대성당, 영응사 관람 후 한시장/롯데마트 기념품 쇼핑 및 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 미슐랭 분짜 | 석식: 삼겹살 한정식',
        hotel: '기내박 또는 귀국',
        vehicle: '16인승 단독 전용 차량'
      }
    ]
  },
  {
    id: 'prod-danang-pkg-02',
    title: '[다낭·후에/역사힐링] 다낭 5성급 리조트 & 베트남 마지막 왕조 후에 황궁 4박 5일',
    subTitle: '후에 황궁 전동카 투어 + 카이딘 왕릉 + 하이반 패스 절경 + 다낭 호이안 핵심 올포함',
    category: '추천패키지',
    region: '중부',
    city: '다낭',
    priceKRW: 780000,
    priceVND: 14500000,
    duration: '4박 5일',
    imageUrl: "/images/hoian_lantern.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 128,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭', '#후에황궁', '#하이반고개', '#역사투어', '#가족여행'],
    description: '베트남의 찬란한 응우옌 왕조 유적도시 후에와 다낭/호이안의 힐링 명소를 결합한 프리미엄 품격 여행입니다.',
    included: [
      '5성급 리조트 4박 (조식 포함)',
      '단독 전용 차량 및 한국어 전문 가이드',
      '후에 황궁 입장료 및 전동카 탑승권',
      '하이반 패스 전망대 티켓 & 후에 궁중 요리 특식'
    ],
    excluded: ['국제선 항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '다낭 도착 ➔ 가이드 미팅 ➔ 5성급 리조트 체크인',
        description: '공항 영접 후 호텔 체크인 및 미케비치 휴식.',
        meal: '조식: 불포함 | 중식: 불포함 | 석식: 베트남 현지식',
        hotel: '다낭 5성급 리조트'
      },
      {
        day: 2,
        title: '하이반 패스 절경 ➔ 후에 이동 ➔ 후에 황궁 & 카이딘 왕릉',
        description: '내셔널 지오그래픽 선정 명소 하이반 고개를 넘어 후에 황궁과 서구 양식의 카이딘 왕릉 탐방.',
        meal: '조식: 호텔식 | 중식: 후에 궁중 정식 | 석식: 전통 로컬 요리',
        hotel: '후에 5성급 호텔'
      },
      {
        day: 3,
        title: '티엔무 사원 ➔ 다낭 귀환 ➔ 호이안 올드타운 야경 투어',
        description: '향강을 마주한 티엔무 사원 관람 후 다낭 귀환, 저녁 호이안 투본강 소원배 탑승.',
        meal: '조식: 호텔식 | 중식: 분보후에 | 석식: 호이안 전통식',
        hotel: '다낭 5성급 리조트'
      },
      {
        day: 4,
        title: '바나힐 골든브릿지 ➔ 롯데마트 쇼핑 ➔ 공항 샌딩',
        description: '바나힐 케이블카 및 골든브릿지 관람 후 기념품 쇼핑 및 공항 이동.',
        meal: '조식: 호텔식 | 중식: 바나힐 뷔페 | 석식: 해산물 만찬',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-danang-golf-01',
    title: '[다낭/골프 54홀] BRG 다낭 & 바나힐스 & 몽고메리 3색 명문 골프 3박 5일',
    subTitle: '1인 1캐디 + 2인 1카트 + 그린피/캐디피/카트비 올포함! 5성급 호텔 & 전용 골프 리무진',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 1190000,
    priceVND: 22000000,
    duration: '3박 5일',
    imageUrl: "/images/vietnam_golf_resort.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 154,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭골프', '#54홀라운딩', '#BRG다낭', '#바나힐CC', '#몽고메리'],
    description: '선호도 1위 다낭 대표 3대 명문 코스에서 매일 18홀씩 총 54홀을 즐기는 베스트셀러 골프 패키지입니다.',
    included: [
      '5성급 호텔 3박 (2인 1실, 조식 포함)',
      '54홀 그린피 + 전동카트 + 1인 1캐디피 올포함',
      '공항-골프장-호텔 전 일정 골프백 전용 단독 리무진',
      '클럽하우스 중식 쿠폰 3회 + 90분 골프 마사지 1회'
    ],
    excluded: ['캐디팁 ($15~$20/18홀 현장 지불)', '개인 경비 및 석식', '항공권'],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['BRG 다낭 골프 리조트 (18홀)', '몽고메리 링크스 (18홀)', '바나힐스 골프클럽 (18홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ 전용 리무진 픽업 ➔ 호텔 체크인 및 휴식',
        description: '공항 도착 후 전용 밴으로 호텔 이동 및 컨디션 조절.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 2,
        title: '1일차 라운딩 : BRG 다낭 골프 리조트 18홀',
        description: '그렉 노먼 설계의 정통 해변 듄스 링크스 코스에서 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 해산물 맛집',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 3,
        title: '2일차 라운딩 : 몽고메리 링크스 CC 18홀 ➔ 호이안 관광',
        description: '콜린 몽고메리 명작 코스 18홀 라운딩 후 호이안 올드타운 투어.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 호이안 야시장 미식',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 4,
        title: '3일차 라운딩 : 바나힐스 골프클럽 18홀 ➔ 스파 ➔ 공항 샌딩',
        description: '산악 챔피언십 코스 18홀 라운딩 후 샤워 및 90분 골프 마사지, 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한정식 갈비살',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-danang-golf-02',
    title: '[다낭·호이안/골프 90홀] 호이아나 쇼어스 & 남호이안 빈펄 5색 90홀 대장정 4박 6일',
    subTitle: '세계 100대 코스 호이아나 쇼어스 + 빈펄 + BRG + 바나힐스 + 몽고메리 풀코스 완주',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 1590000,
    priceVND: 29500000,
    duration: '4박 6일',
    imageUrl: "/images/my_khe_beach_1786255505556.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 86,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭골프', '#90홀패키지', '#호이아나쇼어스', '#VIP골프', '#1인1캐디'],
    description: '베트남 중부의 세계적인 5대 챔피언십 코스에서 5일간 매일 18홀씩 총 90홀을 완주하는 프리미엄 골프 패키지입니다.',
    included: [
      '5성급 럭셔리 호텔 4박 (2인 1실, 조식 포함)',
      '5일간 총 90홀 그린피 + 2인 1카트 + 1인 1캐디피 올포함',
      '공항/골프장 전 일정 골프백 전용 VIP 리무진 밴 & 전담 기사',
      '클럽하우스 중식 쿠폰 5회 + 90분 골프 마사지 2회'
    ],
    excluded: ['캐디팁 ($15~$20/18홀)', '개인 경비 및 석식', '항공권'],
    golfSpecs: {
      holes: 90,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['호이아나 쇼어스', '남호이안 빈펄', 'BRG 다낭', '몽고메리 링크스', '바나힐스']
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ VIP 골프 리무진 ➔ 5성급 호텔 체크인',
        description: '공항 도착 후 전용 밴으로 이동하여 휴식.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '포포인츠 바이 쉐라톤 다낭'
      },
      {
        day: 2,
        title: '1일차: BRG Da Nang Golf Resort 18홀',
        description: '그렉 노먼 듄스 코스 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 해산물 미식',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 3,
        title: '2일차: Montgomerie Links 18홀',
        description: '몽고메리 링크스 18홀 라운딩 후 호이안 야간 관광.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 호이안 특식',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 4,
        title: '3일차: Ba Na Hills Golf Club 18홀',
        description: '바나힐스 산악 코스 18홀 라운딩 후 90분 마사지.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 바베큐 파티',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 5,
        title: '4일차: Hoiana Shores Golf Club 18홀',
        description: '세계 100대 명문 후보 호이아나 쇼어스 링크스 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한정식',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 6,
        title: '5일차: Vinpearl Golf Nam Hoi An 18홀 ➔ 공항 샌딩',
        description: '남호이안 빈펄 18홀 라운딩 후 샤워 및 롯데마트 쇼핑, 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
{
    "id": "prod-danang-villa-cysea-5bed",
    "title": "[다낭/독채풀빌라] Cy'sea(사이시) 프라이빗 비치 5베드룸 단독 풀빌라",
    "subTitle": "리엔찌에우 에메랄드 해변 인근 · 침실 5개/침대 8개/욕실 5.5개 · 전용 단독 수영장 · 바비큐 시설",
    "category": "풀빌라",
    "region": "중부",
    "city": "다낭",
    "priceKRW": 380000,
    "priceVND": 7150000,
    "duration": "1박 기준 (연박 가능)",
    "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/d39f92f1-316d-4fd4-9014-21899e528396.jpeg",
    "additionalImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/ef2a1b6a-1e84-4928-8407-490c890f911f.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/960a9d8a-c27b-4523-a71f-28d480bd0dc8.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/4ffa1995-d443-49f5-814f-d22f70f11f30.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/5d8692e9-4627-4fd5-ade8-f945da23afbf.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/25cf6fa2-5a19-4792-9be5-37f3f365e5db.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/f3af1348-15be-4cc5-a7ed-54b57d1f0b27.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/2c972791-eddc-40ea-bbb6-0db200d03b6f.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/55176adf-d338-472b-8ef8-bba954c1c636.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/d39f92f1-316d-4fd4-9014-21899e528396.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/bd6a622f-e5b8-4c45-a062-eb56ea313507.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/a1f5e58c-03ad-4cb4-a651-898788ba8759.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/93b31322-fc3e-4dda-910e-47b775817004.jpeg"
    ],
    "galleryImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/ef2a1b6a-1e84-4928-8407-490c890f911f.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/960a9d8a-c27b-4523-a71f-28d480bd0dc8.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/4ffa1995-d443-49f5-814f-d22f70f11f30.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/5d8692e9-4627-4fd5-ade8-f945da23afbf.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/25cf6fa2-5a19-4792-9be5-37f3f365e5db.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/f3af1348-15be-4cc5-a7ed-54b57d1f0b27.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/2c972791-eddc-40ea-bbb6-0db200d03b6f.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/55176adf-d338-472b-8ef8-bba954c1c636.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/d39f92f1-316d-4fd4-9014-21899e528396.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/bd6a622f-e5b8-4c45-a062-eb56ea313507.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/a1f5e58c-03ad-4cb4-a651-898788ba8759.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1234407839831467877/original/93b31322-fc3e-4dda-910e-47b775817004.jpeg"
    ],
    "rating": 5.0,
    "reviewCount": 24,
    "isPopular": true,
    "isHotDeal": true,
    "discountPercent": 10,
    "departureCities": [
        "다낭 현지 체크인",
        "인천",
        "부산",
        "대구"
    ],
    "tags": [
        "#다낭직영풀빌라",
        "#Cysea빌라",
        "#5베드룸",
        "#전용수영장",
        "#오션피스",
        "#가족모임"
    ],
    "description": "다낭 리엔찌에우의 고요하고 아름다운 해변가에 자리잡은 Cy'sea(사이시) 5베드룸 단독 풀빌라입니다. 침실 5개, 침대 8개, 욕실 5.5개를 완비하여 가족 및 친구들과 함께 다른 투숙객 없이 우리 일행만의 완벽한 프라이빗 휴식을 누릴 수 있습니다. 맑은 전용 수영장과 야외 잔디 테라스, 바비큐 그릴 시설이 준비되어 있습니다.",
    "included": [
        "Cy'sea 5베드룸 단독 풀빌라 전체 독채 사용",
        "프라이빗 단독 수영장 및 야외 선베드",
        "풀옵션 주방 (대형 냉장고, 전자레인지, 조리도구 일체)",
        "야외 바비큐(BBQ) 그릴 시설",
        "초고속 무료 Wi-Fi & 스마트 TV",
        "호스트 24시간 실시간 한국어 케어 및 응대"
    ],
    "excluded": [
        "개인 경비 및 식사비 (주방에서 직접 취사 가능)",
        "항공권 (요청 시 단독 렌터카 및 픽업 연결 가능)"
    ],
    "villaSpecs": {
        "villaName": "다낭 Cy'sea 빌라 (해변의 평화)",
        "structureDescription": "침실 5개 + 침대 8개 + 욕실 5.5개 + 대형 거실 + 키친 + 단독 프라이빗 수영장",
        "bedrooms": 5,
        "bathrooms": 6,
        "beds": "침대 8개 (더블 3개, 싱글 5개)",
        "maxOccupancy": 12,
        "standardOccupancy": 10,
        "privatePool": true,
        "oceanView": true,
        "areaSqm": 450,
        "floors": 3,
        "address": "Liên Chiểu, Đà Nẵng, 베트남",
        "googleMapUrl": "https://maps.google.com/?q=Lien+Chieu+Da+Nang",
        "airbnbUrl": "https://www.airbnb.co.kr/rooms/1234407839831467877",
        "amenities": [
            "프라이빗 전용 수영장",
            "야외 바비큐(BBQ) 그릴",
            "풀옵션 주방 & 다이닝 공간",
            "초고속 와이파이 & 스마트 TV",
            "세탁기 & 건조 공간",
            "야외 샤워 시설 & 테라스",
            "에어컨 전 구역 완비",
            "호스트 실시간 케어"
        ],
        "checkInTime": "14:00",
        "checkOutTime": "11:00",
        "breakfastIncluded": false,
        "hostLanguage": "한국어 / 베트남어 / 영어 (24시간 카카오톡 실시간 상담)"
    },
    "airbnbUrl": "https://www.airbnb.co.kr/rooms/1234407839831467877",
    "googleMapUrl": "https://maps.google.com/?q=Lien+Chieu+Da+Nang",
    "address": "Liên Chiểu, Đà Nẵng, 베트남"
},
{
    "id": "prod-danang-villa-marble-6bed",
    "title": "[다낭/독채풀빌라] 마루블 가든(Marble Garden) 6베드룸 프라이빗 풀빌라",
    "subTitle": "응우하인선 미케비치 인근 · 침실 6개/침대 6개/욕실 5개 · 단독 정원 & 전용 수영장",
    "category": "풀빌라",
    "region": "중부",
    "city": "다낭",
    "priceKRW": 315000,
    "priceVND": 5930000,
    "duration": "1박 기준 (연박 가능)",
    "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/446c4cf5-db2f-4473-898b-e81124186cbc.jpeg",
    "additionalImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/fae8687e-3550-49fd-8a42-1d881d3d6b93.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/1113fc18-b815-4f95-ae77-a4862b3b43b8.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/7009d16d-8476-4446-8efc-491617985a34.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/1cb390b8-0012-405f-8045-a2583d211fe2.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/00e41da5-dc35-44da-b437-35cad7e13092.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/2fd45edd-456b-4702-b8d5-e5eb4fa00c79.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/6920b1f8-b057-43c2-a2ab-1013058b4684.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/ebacf5ee-29aa-4aea-bdda-fdc3f42d12f4.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/2cf99bf8-abea-43bd-b9bb-c2884cea1009.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/c2e8df07-de5a-4851-b3a4-1abc9ed62421.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/523fbe89-3d00-4022-a195-46fae3c84088.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/8c06afd7-4d31-449f-bb3d-baaaf81b5e20.jpeg"
    ],
    "galleryImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/fae8687e-3550-49fd-8a42-1d881d3d6b93.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/1113fc18-b815-4f95-ae77-a4862b3b43b8.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/7009d16d-8476-4446-8efc-491617985a34.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/1cb390b8-0012-405f-8045-a2583d211fe2.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/00e41da5-dc35-44da-b437-35cad7e13092.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/2fd45edd-456b-4702-b8d5-e5eb4fa00c79.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/6920b1f8-b057-43c2-a2ab-1013058b4684.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/ebacf5ee-29aa-4aea-bdda-fdc3f42d12f4.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/2cf99bf8-abea-43bd-b9bb-c2884cea1009.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/c2e8df07-de5a-4851-b3a4-1abc9ed62421.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/523fbe89-3d00-4022-a195-46fae3c84088.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1596807485988738548/original/8c06afd7-4d31-449f-bb3d-baaaf81b5e20.jpeg"
    ],
    "rating": 5.0,
    "reviewCount": 38,
    "isPopular": true,
    "isHotDeal": true,
    "discountPercent": 15,
    "departureCities": [
        "다낭 현지 체크인",
        "인천",
        "부산",
        "대구"
    ],
    "tags": [
        "#다낭직영풀빌라",
        "#마루블가든",
        "#6베드룸",
        "#미케비치풀빌라",
        "#오순도순힐링"
    ],
    "description": "다낭 응우하인선군 미케비치 번화가와 인접한 중심부에 위치한 마루블 가든(Marble Garden) 6베드룸 프라이빗 독채 풀빌라입니다. 침실 6개와 욕실 5개, 넓은 전용 거실과 수영장, 감성 가득한 정원을 갖추어 가족 모임이나 친목 여행에 최적화된 편안함을 선사합니다.",
    "included": [
        "마루블 가든 6베드룸 독채 풀빌라 전체 단독 사용",
        "프라이빗 전용 수영장 & 가든 테라스",
        "풀옵션 주방 및 바비큐(BBQ) 시설",
        "스마트 TV (넷플릭스) & 초고속 와이파이",
        "세탁기, 냉장고, 전자레인지 등 생활가전 완비",
        "호스트 24시간 실시간 케어"
    ],
    "excluded": [
        "개인 경비 및 식사비",
        "항공권"
    ],
    "villaSpecs": {
        "villaName": "다낭 마루블 가든 빌라 (Marble Garden Villa)",
        "structureDescription": "침실 6개 + 침대 6개 + 욕실 5개 + 넓은 정원 + 프라이빗 단독 수영장",
        "bedrooms": 6,
        "bathrooms": 5,
        "beds": "더블베드 6개",
        "maxOccupancy": 14,
        "standardOccupancy": 10,
        "privatePool": true,
        "oceanView": false,
        "areaSqm": 460,
        "floors": 3,
        "address": "23 Chế Lan Viên, Ngũ Hành Sơn, Đà Nẵng 550000 베트남",
        "googleMapUrl": "https://maps.google.com/?q=23+Che+Lan+Vien+Ngu+Hanh+Son+Da+Nang",
        "airbnbUrl": "https://www.airbnb.co.kr/rooms/1596807485988738548",
        "amenities": [
            "프라이빗 전용 수영장",
            "아늑한 잔디 정원 & 야외 식사 공간",
            "바비큐(BBQ) 그릴",
            "풀옵션 주방 & 다이닝 공간",
            "세탁기 및 건조 시설",
            "스마트 TV & 와이파이",
            "전 구역 에어컨",
            "셀프 체크인 & 호스트 케어"
        ],
        "checkInTime": "14:00",
        "checkOutTime": "11:00",
        "breakfastIncluded": false,
        "hostLanguage": "한국어 / 베트남어 (24시간 카카오톡 실시간 상담)"
    },
    "airbnbUrl": "https://www.airbnb.co.kr/rooms/1596807485988738548",
    "googleMapUrl": "https://maps.google.com/?q=23+Che+Lan+Vien+Ngu+Hanh+Son+Da+Nang",
    "address": "23 Chế Lan Viên, Ngũ Hành Sơn, Đà Nẵng 550000 베트남"
},
{
    "id": "prod-danang-villa-pearl-10bed",
    "title": "[다낭/대저택풀빌라] 펄 리트리트(Pearl Retreat) 미케비치 10베드룸 웅장한 빌라",
    "subTitle": "선짜군 미케비치 도보 1분 · 침실 10개/침대 11개/욕실 10개 · 전용 사우나 & 인피니티 풀",
    "category": "풀빌라",
    "region": "중부",
    "city": "다낭",
    "priceKRW": 650000,
    "priceVND": 12200000,
    "duration": "1박 기준 (연박 가능)",
    "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/ef25966e-087b-45bb-95ff-a510b9267b3b.jpeg",
    "additionalImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/49f70ab8-cb13-452e-b2c0-8abada9cf148.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/2e0b187b-b39f-4814-97ec-d1190f69e3c3.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/0755c7bb-8106-40bb-a904-e01f1a89d1e9.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/1c063d3c-551e-416a-be9f-38ff5ce059e1.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/e71561ce-aa87-4f04-a7f1-2cbd1c795cd9.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/a7c06c2c-a71a-44c9-a6c4-84c4ab46518c.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/05b8ab1c-809b-4835-8683-ddb5aea069e2.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/c710d67b-ecf6-493e-8f74-b9b2d89fdc17.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/2c8cd258-83bb-46a6-9157-bed170bf166c.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/58d77ad9-3d60-4d54-a465-e7c637e7ada4.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/53cdb625-0b90-4917-bf25-e108e1a64144.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/42713ce0-561f-4e81-8e37-c9a3f3f4c08f.jpeg"
    ],
    "galleryImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/49f70ab8-cb13-452e-b2c0-8abada9cf148.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/2e0b187b-b39f-4814-97ec-d1190f69e3c3.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/0755c7bb-8106-40bb-a904-e01f1a89d1e9.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/1c063d3c-551e-416a-be9f-38ff5ce059e1.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/e71561ce-aa87-4f04-a7f1-2cbd1c795cd9.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/a7c06c2c-a71a-44c9-a6c4-84c4ab46518c.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/05b8ab1c-809b-4835-8683-ddb5aea069e2.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/c710d67b-ecf6-493e-8f74-b9b2d89fdc17.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/2c8cd258-83bb-46a6-9157-bed170bf166c.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/58d77ad9-3d60-4d54-a465-e7c637e7ada4.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/53cdb625-0b90-4917-bf25-e108e1a64144.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1470661871888779964/original/42713ce0-561f-4e81-8e37-c9a3f3f4c08f.jpeg"
    ],
    "rating": 4.98,
    "reviewCount": 47,
    "isPopular": true,
    "isHotDeal": true,
    "discountPercent": 10,
    "departureCities": [
        "다낭 현지 체크인",
        "인천",
        "부산",
        "대구"
    ],
    "tags": [
        "#다낭직영풀빌라",
        "#펄리트리트",
        "#10베드룸",
        "#대저택풀빌라",
        "#사우나완비",
        "#기업워크샵",
        "#대가족모임"
    ],
    "description": "미케 해변에서 도보 단 1분 거리에 위치한 다낭 최고 규모의 10베드룸 럭셔리 대저택 펄 리트리트(Pearl Retreat)입니다. 전 객실 개별 욕실을 갖춘 10개의 침실과 11개의 침대, 전용 사우나, 초대형 수영장, 카약 등을 완비하여 대가족, 기업 워크숍, 골프 동호회 등 대규모 단체 여행객에게 비교할 수 없는 감동을 선사합니다.",
    "included": [
        "펄 리트리트 10베드룸 초대형 독채 대저택 전체 단독 사용",
        "대형 프라이빗 수영장 & 전용 사우나 시설",
        "카약 및 해변 액티비티 장비",
        "초대형 다이닝 룸 & 풀옵션 대형 주방",
        "스마트 도어록 & 보안 시스템",
        "호스트 24시간 실시간 케어 및 가이드 연계"
    ],
    "excluded": [
        "개인 경비 및 식사비",
        "항공권"
    ],
    "villaSpecs": {
        "villaName": "다낭 펄 리트리트 (Pearl Retreat Luxury Villa)",
        "structureDescription": "침실 10개 + 침대 11개 + 욕실 10개 + 전용 사우나 + 대형 인피니티 풀 + 초대형 거실",
        "bedrooms": 10,
        "bathrooms": 10,
        "beds": "침대 11개 (킹/더블 침대)",
        "maxOccupancy": 24,
        "standardOccupancy": 16,
        "privatePool": true,
        "oceanView": true,
        "areaSqm": 750,
        "floors": 4,
        "address": "Sơn Trà, Đà Nẵng, 베트남 (미케비치 도보 1분)",
        "googleMapUrl": "https://maps.google.com/?q=Son+Tra+Da+Nang",
        "airbnbUrl": "https://www.airbnb.co.kr/rooms/1470661871888779964",
        "amenities": [
            "초대형 프라이빗 수영장",
            "전용 프라이빗 사우나",
            "미케비치 도보 1분 해변 접근성",
            "카약 및 레저 장비",
            "풀옵션 대형 주방 & 단체 다이닝 룸",
            "각 방별 독립 욕실 10개 완비",
            "스마트 도어록 & 셀프 체크인",
            "초고속 Wi-Fi & 스마트 TV"
        ],
        "checkInTime": "15:00",
        "checkOutTime": "11:00",
        "breakfastIncluded": false,
        "hostLanguage": "한국어 / 베트남어 / 영어 (24시간 카카오톡 실시간 상담)"
    },
    "airbnbUrl": "https://www.airbnb.co.kr/rooms/1470661871888779964",
    "googleMapUrl": "https://maps.google.com/?q=Son+Tra+Da+Nang",
    "address": "Sơn Trà, Đà Nẵng, 베트남 (미케비치 도보 1분)"
},
{
    "id": "prod-danang-villa-napoli-12bed",
    "title": "[다낭/슈퍼캐슬풀빌라] 나폴리 캐슬(Napoli Castle) 12베드룸 초대형 슈퍼 빌라",
    "subTitle": "만타이 해변 오션뷰 파노라마 · 침실 12개/침대 16개/욕실 13개 · 다낭 최대 규모 슈퍼 럭셔리",
    "category": "풀빌라",
    "region": "중부",
    "city": "다낭",
    "priceKRW": 850000,
    "priceVND": 15980000,
    "duration": "1박 기준 (연박 가능)",
    "imageUrl": "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/baf84951-c9a1-44e8-8ff4-759f41e41414.jpeg",
    "additionalImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/e5f3aabc-433d-49ed-a677-b7ce082fab1f.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/b9d2541c-1a37-47c9-a056-1acdb11f9597.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/0f2fa835-02c5-4b57-b8ce-76fe2e06ee35.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/b23ca873-612c-45ac-8f62-dbc2bb7a9741.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/05315fb8-b5f5-4c3d-8db7-75b8bc464635.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/6ff7c5f9-ee7e-4474-beb5-9255b85e584a.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/378c407b-3b1b-4f0b-9ebc-4993835aae17.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/ff89c760-8f57-476e-97a7-644accd3444b.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/dbb99f0f-8aa7-423a-80cd-075d3fbd5ca0.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/a2100a18-30e0-4ad0-88bc-b3c97d8c33d6.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/4d7133b3-4220-4eef-84d0-6ed60f2bdd98.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/17a31513-4788-4ad5-8181-1a61027736b3.jpeg"
    ],
    "galleryImages": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/e5f3aabc-433d-49ed-a677-b7ce082fab1f.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/b9d2541c-1a37-47c9-a056-1acdb11f9597.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/0f2fa835-02c5-4b57-b8ce-76fe2e06ee35.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/b23ca873-612c-45ac-8f62-dbc2bb7a9741.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/05315fb8-b5f5-4c3d-8db7-75b8bc464635.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/6ff7c5f9-ee7e-4474-beb5-9255b85e584a.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/378c407b-3b1b-4f0b-9ebc-4993835aae17.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/ff89c760-8f57-476e-97a7-644accd3444b.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/dbb99f0f-8aa7-423a-80cd-075d3fbd5ca0.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/a2100a18-30e0-4ad0-88bc-b3c97d8c33d6.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/4d7133b3-4220-4eef-84d0-6ed60f2bdd98.jpeg",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1622142057449951853/original/17a31513-4788-4ad5-8181-1a61027736b3.jpeg"
    ],
    "rating": 4.94,
    "reviewCount": 18,
    "isPopular": true,
    "isHotDeal": true,
    "discountPercent": 10,
    "departureCities": [
        "다낭 현지 체크인",
        "인천",
        "부산",
        "대구"
    ],
    "tags": [
        "#다낭직영풀빌라",
        "#나폴리캐슬",
        "#12베드룸",
        "#다낭최대규모",
        "#슈퍼빌라",
        "#초대형파티",
        "#골프단체"
    ],
    "description": "다낭 해안의 환상적인 바다 전망을 품은 다낭 최대 규모의 최고급 슈퍼 빌라 나폴리 캐슬(Napoli Castle)입니다. 아침에 창문을 열면 미케와 만타이 해변의 황홀한 일출과 시원한 바닷바람이 펼쳐집니다. 12개의 럭셔리 침실과 16개의 침대, 13개의 욕실, 초대형 프라이빗 수영장, 야외 다이닝과 바비큐 공간까지 모두 갖추어 다낭 그 어느 곳에서도 경험할 수 없는 압도적인 웅장함과 힐링을 선사합니다.",
    "included": [
        "나폴리 캐슬 12베드룸 최고급 대저택 독채 전체 단독 사용",
        "초대형 프라이빗 인피니티 수영장",
        "만타이 & 미케비치 파노라마 오션뷰 조망",
        "13개 전용 욕실 & 16개 편안한 침대",
        "대규모 그룹을 위한 최고급 주방 & 야외 BBQ 다이닝 공간",
        "호스트 24시간 실시간 케어 및 전담 상담 지원"
    ],
    "excluded": [
        "개인 경비 및 식사비",
        "항공권"
    ],
    "villaSpecs": {
        "villaName": "다낭 나폴리 캐슬 (Napoli Castle Super Villa)",
        "structureDescription": "침실 12개 + 침대 16개 + 욕실 13개 + 초대형 오션뷰 수영장 + 웅장한 대연회장 거실",
        "bedrooms": 12,
        "bathrooms": 13,
        "beds": "침대 16개 (킹/퀸/더블)",
        "maxOccupancy": 30,
        "standardOccupancy": 20,
        "privatePool": true,
        "oceanView": true,
        "areaSqm": 950,
        "floors": 4,
        "address": "Mân Thái, Sơn Trà, Đà Nẵng, 베트남 (만타이 해안)",
        "googleMapUrl": "https://maps.google.com/?q=Man+Thai+Son+Tra+Da+Nang",
        "airbnbUrl": "https://www.airbnb.co.kr/rooms/1622142057449951853",
        "amenities": [
            "다낭 최대 규모 초대형 수영장",
            "파노라마 오션뷰 테라스 & 선베드",
            "야외 대형 바비큐(BBQ) 공간",
            "독립 욕실 13개 완비",
            "대형 키친 및 풀옵션 조리시설",
            "스마트 TV & 초고속 와이파이",
            "전 구역 에어컨 완비",
            "호스트 실시간 한국어 케어"
        ],
        "checkInTime": "15:00",
        "checkOutTime": "11:00",
        "breakfastIncluded": false,
        "hostLanguage": "한국어 / 베트남어 / 영어 (24시간 카카오톡 실시간 상담)"
    },
    "airbnbUrl": "https://www.airbnb.co.kr/rooms/1622142057449951853",
    "googleMapUrl": "https://maps.google.com/?q=Man+Thai+Son+Tra+Da+Nang",
    "address": "Mân Thái, Sơn Trà, Đà Nẵng, 베트남 (만타이 해안)"
},
    {
    id: 'prod-danang-free-01',
    title: '[다낭 자유/1일 렌터카] 다낭 시내 & 바나힐 & 호이안 1일 단독 VIP 맞춤 투어',
    subTitle: '16인승 최신형 리무진 + 전담 한국어 기사 1일 10시간 단독 배차 (유류비/톨비 일체 포함)',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 190000,
    priceVND: 3500000,
    duration: '당일 투어',
    imageUrl: "/images/danang_golden_bridge_1786255489649.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 420,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['다낭 현지 호텔 픽업'],
    tags: ['#다낭렌트카', '#단독기사', '#맞춤자유일정', '#바나힐', '#호이안'],
    description: '정해진 패키지 일정 없이 내가 원하는 시간, 내가 가고 싶은 명소와 맛집만 골라서 다니는 100% 프라이빗 1일 자유 투어입니다.',
    included: [
      '16인승 전용 차량 1일 10시간 단독 대절',
      '전담 베테랑 현지 기사 및 유류비, 톨게이트비, 주차비 일체 포함',
      '호텔 로비 픽업 및 투어 후 원하는 장소 드롭'
    ],
    excluded: ['관광지 입장료', '개인 식사비', '기사 매너팁 (1팀당 약 $10 권장)'],
    itinerary: [
      {
        day: 1,
        title: '호텔 로비 미팅 ➔ 바나힐 or 호이안 자유 일정 ➔ 야시장 ➔ 숙소 드롭',
        description: '원하시는 시간에 맞춰 출발하여 바나힐 케이블카, 호이안 올드타운, 안방비치 카페, 마사지샵 등을 자유롭게 이용.',
        meal: '자유식',
        hotel: '고객 개별 숙소'
      }
    ]
  },
  {
    id: 'prod-danang-free-02',
    title: '[호이안 자유/반나절] 호이안 올드타운 야경 & 투본강 소원배 & 바구니배 VIP 투어',
    subTitle: '코코넛 숲 바구니배 틴퉁 + 유네스코 고도 호이안 도보 투어 + 투본강 소원초 유등 띄우기',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 65000,
    priceVND: 1200000,
    duration: '반나절 (약 6시간)',
    imageUrl: "/images/hoian_lantern_night_1787097792559.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 280,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 20,
    departureCities: ['다낭/호이안 호텔 픽업'],
    tags: ['#호이안야경', '#소원배', '#바구니배', '#반나절투어', '#가족추천'],
    description: '호이안의 정취를 만끽할 수 있는 오후 출발 시그니처 투어! 코코넛 숲 바구니배 탑승부터 황홀한 야경과 소원배 유등까지 완벽하게 즐깁니다.',
    included: [
      '왕복 전용 차량 및 전문 가이드',
      '코코넛 숲 바구니배 탑승료 & 팁',
      '호이안 올드타운 입장권',
      '투본강 소원배 탑승권 & 소원초 유등'
    ],
    excluded: ['개인 쇼핑비', '석식 (호이안 야시장 자유식)'],
    itinerary: [
      {
        day: 1,
        title: '14:30 픽업 ➔ 코코넛 바구니배 ➔ 호이안 올드타운 도보 투어 ➔ 투본강 소원배 ➔ 호텔 귀환',
        description: '신나는 음악과 함께하는 바구니배 탑승 후 호이안의 운치 있는 거리 산책과 소원배 체험.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  },

  // =========================================================================
  // 2. 나트랑 & 달랏 (NHA TRANG & DA LAT)
  // =========================================================================
  {
    id: 'prod-nhatrang-dalat-vip-3n5d',
    title: '[나짱·달랏/VIP 단독 품격] 에메랄드 해변 & 영원한 봄의 고원도시 3박 5일 올인원 (NO쇼핑/NO옵션)',
    subTitle: '나트랑 5성급 오션뷰 2박 + 달랏 5성급 리조트 1박 + 전 일정 단독 16인승 밴 & 전담 한국어가이드 + 다딴라 루지 & 랑비앙산 지프 + 아이리조트 머드온천 + 랍스터 씨푸드 + 90분 VIP 스파',
    category: '추천패키지',
    region: '남부',
    city: '나트랑',
    priceKRW: 790000,
    priceVND: 14800000,
    duration: '3박 5일',
    imageUrl: "/images/nhatrang_bay.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 296,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 17,
    departureCities: ['인천', '부산', '대구', '청주', '무안'],
    tags: [
      '나트랑',
      '달랏',
      '나트랑달랏',
      '자유여행',
      '단독자유',
      '단독투어',
      '추천패키지',
      '#나트랑달랏3박5일',
      '#바다와고원콤보',
      '#다딴라알파인루지',
      '#랑비앙산지프',
      '#아이리조트머드스파',
      '#5성급호텔올인원',
      '#NO쇼핑NO옵션',
      '#랍스터씨푸드'
    ],
    description: '300일 내내 온화한 햇살과 에메랄드빛 바다가 펼쳐지는 나트랑(동양의 나폴리)과 해발 1,500m 연중 18~24도의 쾌적한 꽃과 소나무의 고원도시 달랏을 묶은 베스트셀러 VIP 단독 패키지입니다. 단체 합승 없이 오직 우리 일행만을 위한 최신형 16인승 밴과 전담 한국어 가이드가 밀착 케어하며, 다딴라 루지, 랑비앙산 사륜 지프, 프라이빗 머드온천, 랍스터 특식까지 전 일정 추가 비용 없이 완벽하게 포함되어 있습니다.',
    included: [
      '나트랑 5성급 오션뷰 호텔 2박 + 달랏 5성급 리조트 1박 (2인 1실, 조식 포함)',
      '전 일정 우리 일행 전용 단독 16인승 리무진 밴 & 베테랑 전담 기사 (유류비/도로비/주차비 일체 포함)',
      '신짜오투어 현지 베트남 공인 한국어 1급 전담 가이드 풀케어',
      '아이리조트(I-Resort) 프라이빗 미네랄 머드스파 & 온천 워터파크 입장권',
      '달랏 다딴라 폭포 아시아 최장 알파인 루지 코스터 탑승권',
      '달랏 랑비앙산(해발 2,167m) 4WD 사륜구동 지프차 정상 투어',
      '달랏 기차역 + 크레이지 하우스 + 린푸억 사원 + 포나가르 참탑 사원 입장료',
      '4대 프리미엄 특식: ① 나트랑 랍스터/크랩 씨푸드 BBQ, ② 달랏 전통 항아리 소고기 핫팟(Lau Bo), ③ 넴느엉 닌호아 & 분짜 특식, ④ 프리미엄 숯불갈비 한정식',
      '여행의 피로를 풀어주는 90분 VIP 천연 핫스톤 아로마 스파 전원 포함 (1회)',
      '달랏 낭만 야시장 투어 & 신선한 로컬 간식 제공'
    ],
    excluded: [
      '국제선 왕복 항공권 (최저가 실시간 발권 지원)',
      '개인 쇼핑 경비 및 주류/음료',
      '호텔 1인실 싱글룸 사용 시 싱글 차지'
    ],
    itinerary: [
      {
        day: 1,
        title: '인천/지방공항 출발 ➔ 나트랑 깜란 국제공항 도착 ➔ VIP 전담 피켓 미팅 ➔ 5성급 호텔 체크인',
        description: '나트랑 깜란 공항 도착 후 입국장에서 신짜오투어 전담 가이드의 환영 피켓 영접. 우리 일행 전용 리무진 밴에 탑승하여 5성급 오션뷰 호텔로 편안하게 이동 후 체크인 및 환영 야식(전통 쌀국수) 제공.',
        meal: '조식: 기내식 | 중식: 자유식 | 석식: 나트랑 전통 쌀국수 특식',
        hotel: '인터컨티넨탈 나트랑 / 쉐라톤 나트랑 (또는 동급 5성급 오션뷰)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['깜란 국제공항', '나트랑 해안도로', '5성급 호텔 체크인']
      },
      {
        day: 2,
        title: '포나가르 참탑 사원 ➔ 아이리조트 프라이빗 머드온천 ➔ 랍스터 씨푸드 BBQ ➔ 야시장 산책',
        description: '천년의 역사를 지닌 고대 참파 왕국의 포나가르 사원을 관람한 후, 피로 회복과 피부 미용에 탁월한 아이리조트 프리미엄 미네랄 머드스파와 온천 수영을 즐깁니다. 저녁에는 나트랑 바다를 바라보며 싱싱한 랍스터와 해산물 바비큐 만찬을 만끽하고 활기찬 야시장을 둘러봅니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 나트랑 명물 넴느엉 닌호아 & 반쎄오 | 석식: 프리미엄 랍스터 & 씨푸드 BBQ 만찬',
        hotel: '나트랑 5성급 오션뷰 호텔',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['포나가르 참탑 사원', '아이리조트 머드스파', '나트랑 해변', '나트랑 야시장']
      },
      {
        day: 3,
        title: '나트랑 출발 ➔ 칸레 패스 비경 ➔ 고원도시 달랏 도착 ➔ 다딴라 폭포 알파인 루지 ➔ 크레이지하우스 ➔ 달랏 야시장',
        description: '나트랑을 출발하여 해발 1,500m 고원으로 향하는 환상적인 산악 도로 칸레 패스를 드라이브합니다. 달랏 도착 후 숲속을 짜릿하게 질주하는 다딴라 폭포 알파인 루지를 체험하고, 가우디 건축을 닮은 기상천외한 크레이지 하우스와 클래식한 달랏 기차역을 방문합니다. 저녁에는 달랏 야시장에서 반짱느엉(베트남 피자)과 따뜻한 두유를 맛보며 낭만을 즐깁니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 달랏 로컬 산채 정식 | 석식: 달랏 명물 항아리 소고기 핫팟(Lau Bo)',
        hotel: '달랏 팰리스 헤리티지 / 아나만다라 빌라스 달랏 (또는 동급 5성급)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['칸레 패스 산악도로', '다딴라 폭포 루지', '크레이지 하우스', '달랏 기차역', '달랏 야시장']
      },
      {
        day: 4,
        title: '랑비앙산 4WD 지프 정상 등정 ➔ 린푸억 모자이크 사원 ➔ 나트랑 귀환 ➔ 90분 VIP 스파 ➔ 롯데마트 ➔ 공항 샌딩',
        description: '달랏의 지붕이라 불리는 랑비앙산(2,167m) 정상까지 전용 사륜 지프를 타고 올라가 고원의 파노라마 절경을 감상합니다. 깨진 도자기와 유리병으로 정교하게 지어진 린푸억 사원을 관람한 후 나트랑으로 쾌적하게 귀환합니다. 여행의 피로를 싹 씻어주는 90분 VIP 천연 핫스톤 스파를 받고, 롯데마트에서 기념품 쇼핑 후 공항으로 이동합니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 미슐랭 추천 분짜 특식 | 석식: 프리미엄 숯불갈비 한정식',
        hotel: '기내박 (귀국편)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['랑비앙산 지프 사륜투어', '린푸억 사원', '90분 VIP 스파', '롯데마트', '깜란 국제공항']
      },
      {
        day: 5,
        title: '인천/지방 국제공항 도착 ➔ 개별 해산 및 소중한 추억 간직',
        description: '이른 아침 한국에 안전하게 도착하여 모든 일정을 마무리합니다.',
        meal: '조식: 기내식',
        hotel: '귀국',
        vehicle: '개별 귀가'
      }
    ],
    highlights: [
      '나트랑 에메랄드 해변 휴양(2박)과 달랏 영원한 봄의 고원 힐링(1박)을 결합한 3박 5일 정통 올인원 코스',
      'NO 쇼핑 / NO 옵션 강요 / NO 팁 강요 (3대 안심 보장제)',
      '나트랑 5성급 오션뷰 2박 + 달랏 5성급 럭셔리 리조트 1박 품격 숙박',
      '아이리조트 프라이빗 천연 미네랄 머드온천 & 워터파크 올포함',
      '달랏 다딴라 폭포 아시아 최장 알파인 루지 + 랑비앙산 4WD 지프 정상 투어 올포함',
      '나트랑 랍스터 씨푸드 BBQ & 달랏 소고기 핫팟 등 4대 미식 특식 제공',
      '여행의 피로를 풀어주는 90분 VIP 천연 핫스톤 아로마 스파 전원 포함'
    ],
    vehicleInfo: '우리 일행 단독 최신형 16인승 리무진 밴 (베테랑 전담 기사)',
    guideInfo: '신짜오투어 현지 베트남 공인 한국어 1급 전담 가이드 풀케어',
    travelTheme: '바다 휴양과 시원한 숲속 힐링을 한 번에 즐기는 NO쇼핑 VIP 단독 품격 콤보 패키지'
  },
  {
    id: 'prod-nhatrang-dalat-vip-4n6d',
    title: '[나짱·달랏/VIP 프리미엄 여유] 에메랄드 비치 호핑 & 숲속 감성 힐링 4박 6일 올인원 (NO쇼핑/NO옵션)',
    subTitle: '나트랑 5성급 오션뷰 2박 + 달랏 5성급 프렌치 리조트 2박! 단독 스피드보트 산호섬 스노클링 호핑 + 머드온천 + 랑비앙 지프 + 다딴라 루지 + 90분 스파 2회 + 랍스터 BBQ & 달랏 와인 만찬',
    category: '추천패키지',
    region: '남부',
    city: '나트랑',
    priceKRW: 950000,
    priceVND: 17700000,
    duration: '4박 6일',
    imageUrl: "/images/dalat.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 312,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 19,
    departureCities: ['인천', '부산', '대구', '청주', '무안'],
    tags: [
      '나트랑',
      '달랏',
      '나트랑달랏',
      '자유여행',
      '단독자유',
      '단독투어',
      '추천패키지',
      '#나트랑달랏4박6일',
      '#단독스피드보트호핑',
      '#스노클링산호섬',
      '#달랏2박완전정복',
      '#로빈힐케이블카',
      '#스파90분2회포함',
      '#NO쇼핑NO옵션',
      '#달랏와인만찬'
    ],
    description: '3박 5일의 아쉬움을 완벽히 채워주는 4박 6일 최고급 여유 패키지! 나트랑의 청정 해변 산호섬에서 단독 스피드보트로 즐기는 프리미엄 스노클링 호핑투어와 아이리조트 머드스파, 그리고 프랑스풍 고원도시 달랏에서 2박을 머물며 랑비앙산 지프, 다딴라 루지, 로빈힐 케이블카, 죽림선원, 숲속 힐링 카페까지 여유롭게 만끽합니다. 전 일정 90분 VIP 스파가 2회 포함되어 피로 없는 완벽한 휴식을 선사합니다.',
    included: [
      '나트랑 5성급 오션뷰 호텔 2박 + 달랏 5성급 프렌치 리조트 2박 (2인 1실, 조식 포함)',
      '전 일정 우리 일행 전용 단독 16인승 리무진 밴 & 베테랑 전담 기사 (유류비/도로비/주차비 일체 포함)',
      '신짜오투어 현지 베트남 공인 한국어 1급 전담 가이드 풀케어',
      '나트랑 전용 단독 스피드보트 산호초 스노클링 호핑투어 (장비 일체 대여 + 해상 활어 중식)',
      '아이리조트(I-Resort) 프라이빗 미네랄 머드스파 & 온천 수영장 입장권',
      '달랏 랑비앙산(2,167m) 4WD 사륜구동 지프차 정상 투어',
      '달랏 다딴라 폭포 아시아 최장 알파인 루지 코스터 탑승권',
      '달랏 로빈힐 ➔ 죽림선원 파노라마 케이블카 탑승권',
      '달랏 기차역 + 크레이지 하우스 + 린푸억 사원 + 포나가르 사원 입장료',
      '5대 프리미엄 특식: ① 나트랑 랍스터/크랩 씨푸드 BBQ, ② 선상 해상 활어 해산물식, ③ 달랏 소고기 핫팟 & 달랏 와인, ④ 미슐랭 분짜 & 넴느엉, ⑤ 고급 한정식 만찬',
      '총 2회 90분 VIP 천연 핫스톤/아로마 스파 전원 포함',
      '달랏 숲속 전망 감성 카페 음료 1회 제공 & 달랏 야시장 투어'
    ],
    excluded: [
      '국제선 왕복 항공권 (최저가 실시간 발권 지원)',
      '개인 쇼핑 경비 및 주류/음료',
      '호텔 1인실 싱글룸 사용 시 싱글 차지'
    ],
    itinerary: [
      {
        day: 1,
        title: '인천/지방공항 출발 ➔ 나트랑 깜란 국제공항 도착 ➔ VIP 전담 피켓 미팅 ➔ 5성급 호텔 체크인',
        description: '나트랑 깜란 공항 도착 후 입국장에서 전담 가이드의 환영 피켓 미팅. 전용 16인승 밴으로 5성급 오션뷰 호텔로 편안하게 이동 후 체크인 및 휴식.',
        meal: '조식: 기내식 | 중식: 자유식 | 석식: 나트랑 전통 쌀국수 야식',
        hotel: '인터컨티넨탈 나트랑 / 쉐라톤 나트랑 (또는 동급 5성급 오션뷰)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['깜란 국제공항', '나트랑 해안도로', '5성급 호텔 체크인']
      },
      {
        day: 2,
        title: '단독 스피드보트 산호섬 스노클링 호핑 ➔ 해상 씨푸드 중식 ➔ 아이리조트 머드스파 ➔ 90분 VIP 스파 ➔ 랍스터 BBQ 디너',
        description: '전용 스피드보트를 타고 나트랑의 청정 산호섬(문섬/미니비치)으로 이동하여 알록달록한 열대어와 함께 스노클링을 즐깁니다. 해상 레스토랑에서 신선한 해산물 중식을 맛본 후, 아이리조트에서 따뜻한 미네랄 머드스파를 체험합니다. 이어 1차 90분 VIP 핫스톤 스파를 받고, 저녁에는 싱싱한 랍스터와 해산물 바비큐 만찬을 즐깁니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 선상 해상 활어 해산물 특식 | 석식: 프리미엄 랍스터 & 씨푸드 BBQ',
        hotel: '나트랑 5성급 오션뷰 호텔',
        vehicle: '16인승 최신형 단독 전용 밴 & 전용 스피드보트',
        attractions: ['단독 스피드보트 호핑투어', '산호섬 스노클링', '아이리조트 머드온천', '90분 VIP 스파']
      },
      {
        day: 3,
        title: '포나가르 참탑 ➔ 칸레 고원 드라이브 ➔ 달랏 5성급 리조트 체크인 ➔ 크레이지하우스 & 달랏 기차역 ➔ 달랏 와인 만찬',
        description: '천년 역사의 포나가르 사원을 둘러본 후, 구름을 가르는 칸레 산악 도로를 지나 해발 1,500m 꽃의 도시 달랏으로 이동합니다. 프랑스 감성의 5성급 리조트에 체크인하고, 크레이지 하우스와 빈티지 달랏 기차역을 방문합니다. 저녁에는 쑤언흐엉 호수변의 노을을 감상하며 달랏 전통 소고기 핫팟과 프리미엄 달랏 와인을 즐깁니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 나트랑 넴느엉 & 반쎄오 특식 | 석식: 달랏 전통 소고기 핫팟(Lau Bo) & 달랏 와인',
        hotel: '달랏 팰리스 헤리티지 / 아나만다라 빌라스 달랏 (또는 동급 5성급)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['포나가르 참탑', '칸레 고원도로', '크레이지 하우스', '달랏 기차역', '쑤언흐엉 호수']
      },
      {
        day: 4,
        title: '랑비앙산 4WD 사륜 지프 등정 ➔ 다딴라 폭포 알파인 루지 ➔ 로빈힐 케이블카 & 죽림선원 ➔ 숲속 카페 ➔ 달랏 야시장',
        description: '지프차를 타고 랑비앙산 정상에 올라 고원의 비경을 한눈에 담고, 아시아 최장 다딴라 폭포 루지 코스터를 타고 숲속을 활강합니다. 로빈힐에서 죽림선원까지 파노라마 케이블카를 탑승하고, 소나무 숲이 내려다보이는 감성 카페에서 여유로운 티타임을 즐깁니다. 저녁에는 활기찬 달랏 야시장에서 자유로운 미식 투어를 진행합니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 달랏 로컬 산채 정식 | 석식: 달랏 숯불 바비큐 로컬 만찬',
        hotel: '달랏 5성급 럭셔리 리조트',
        vehicle: '16인승 최신형 단독 전용 밴 & 랑비앙 지프차',
        attractions: ['랑비앙산 지프 투어', '다딴라 폭포 루지', '로빈힐 케이블카', '죽림선원', '달랏 야시장']
      },
      {
        day: 5,
        title: '린푸억 모자이크 사원 ➔ 나트랑 귀환 ➔ 2차 90분 VIP 스파 ➔ 담시장 & 롯데마트 쇼핑 ➔ 한정식 석식 ➔ 공항 샌딩',
        description: '화려한 도자기 모자이크 예술의 극치를 보여주는 린푸억 사원을 관람한 후 나트랑으로 쾌적하게 복귀합니다. 미슐랭 분짜 특식으로 점심을 먹고 담시장과 롯데마트에서 알뜰 쇼핑을 즐긴 후, 귀국 전 2차 90분 VIP 핫스톤 스파로 모든 피로를 말끔히 풀어드립니다. 숯불갈비 한정식 만찬 후 깜란 공항으로 이동합니다.',
        meal: '조식: 호텔 뷔페식 | 중식: 미슐랭 분짜 & 모닝글로리 | 석식: 프리미엄 숯불갈비 한정식',
        hotel: '기내박 (귀국편)',
        vehicle: '16인승 최신형 단독 전용 밴',
        attractions: ['린푸억 사원', '담시장', '롯데마트', '2차 90분 VIP 스파', '깜란 국제공항']
      },
      {
        day: 6,
        title: '인천/지방 국제공항 도착 ➔ 개별 해산 및 소중한 추억 간직',
        description: '이른 아침 한국에 안전하게 도착하여 모든 여행 일정을 마칩니다.',
        meal: '조식: 기내식',
        hotel: '귀국',
        vehicle: '개별 귀가'
      }
    ],
    highlights: [
      '나트랑 5성급 오션뷰 2박 + 달랏 5성급 프렌치 리조트 2박의 완벽한 4박 6일 럭셔리 일정',
      'NO 쇼핑 / NO 옵션 강요 / NO 팁 강요 (3대 안심 보장제)',
      '나트랑 단독 스피드보트 산호섬 스노클링 호핑투어 올포함',
      '아이리조트 프라이빗 미네랄 머드스파 & 온천 워터파크 포함',
      '달랏 랑비앙산 4WD 지프 + 다딴라 폭포 루지 + 로빈힐 케이블카 올포함',
      '랍스터 씨푸드 BBQ, 선상 활어회, 달랏 소고기 핫팟 & 와인 등 5대 미식 특식',
      '여행 중 피로를 완벽하게 없애주는 총 2회(180분) VIP 천연 스파 포함',
      '달랏 숲속 감성 뷰 카페 음료 제공 & 달랏 낭만 야시장 투어'
    ],
    vehicleInfo: '우리 일행 단독 최신형 16인승 리무진 밴 (베테랑 전담 기사)',
    guideInfo: '신짜오투어 현지 베트남 공인 한국어 1급 전담 가이드 풀케어',
    travelTheme: '바다 호핑 레저와 고원 숲속 감성을 여유롭게 모두 정복하는 NO쇼핑 프리미엄 힐링 패키지'
  },
  {
    id: 'prod-nhatrang-pkg-01',
    title: '[나트랑/휴양힐링] 나트랑 5성급 리조트 & 빈원더스 테마파크 + 머드온천 VIP 3박 5일',
    subTitle: '인터컨티넨탈/쉐라톤 5성급 호텔 + 빈원더스 무제한 자유이용권 + 아이리조트 프라이빗 머드 스파 (NO쇼핑)',
    category: '추천패키지',
    region: '남부',
    city: '나트랑',
    priceKRW: 690000,
    priceVND: 12800000,
    duration: '3박 5일',
    imageUrl: "/images/nhatrang_ocean_bay_1787097818318.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 215,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '부산', '대구', '청주'],
    tags: ['#나트랑3박5일', '#빈원더스', '#머드온천', '#5성급호텔', '#NO쇼핑', '#가족휴양'],
    description: '동양의 나폴리 나트랑의 에메랄드빛 해변에서 즐기는 최고급 힐링 패키지! 빈원더스 테마파크와 천연 머드온천까지 완벽 포함되어 있습니다.',
    included: [
      '나트랑 시내 5성급 호텔 3박 (오션뷰, 조식 포함)',
      '단독 전용 차량 및 한국어 전문 가이드',
      '빈원더스 테마파크/워터파크/케이블카 무제한 이용권',
      '아이리조트 프라이빗 머드온천 VIP 입장권',
      '90분 힐링 아로마 전신 마사지 1회'
    ],
    excluded: ['국제선 항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '깜란 공항 도착 ➔ 가이드 미팅 ➔ 5성급 호텔 체크인 & 해변 휴식',
        description: '공항 도착 후 전용 밴으로 이동. 호텔 체크인 후 나트랑 해변 산책.',
        meal: '조식: 기내식 | 중식: - | 석식: 나트랑 락깐 숯불 소고기',
        hotel: '나트랑 5성급 호텔'
      },
      {
        day: 2,
        title: '혼트레섬 빈원더스 테마파크 & 워터파크 & 타타쇼 관람',
        description: '케이블카/스피드보트 탑승 후 빈원더스 어트랙션, 사파리, 초대형 워터파크 및 야간 타타쇼 관람.',
        meal: '조식: 호텔식 | 중식: 테마파크식 | 석식: 시푸드 뷔페',
        hotel: '나트랑 5성급 호텔'
      },
      {
        day: 3,
        title: '포나가르 참탑 사원 ➔ 아이리조트 천연 머드온천 스파 ➔ 야시장',
        description: '천년 고대 유적 포나가르 사원 관람 후 프라이빗 천연 머드온천에서 피로 회복. 저녁 야시장 투어.',
        meal: '조식: 호텔식 | 중식: 넴느엉 전통식 | 석식: 갈랑가 베트남 퀴진',
        hotel: '나트랑 5성급 호텔'
      },
      {
        day: 4,
        title: '나트랑 대성당 & 롱선사 ➔ 롯데마트 쇼핑 ➔ 공항 샌딩',
        description: '체크아웃 후 시내 랜드마크 관광 및 쇼핑, 90분 스파 마사지 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 한정식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-nhatrang-pkg-02',
    title: '[나트랑·판랑/사막어드벤처] 나트랑 5성급 휴양 & 판랑 샌듄 사막 지프 투어 4박 5일',
    subTitle: '나트랑 오션뷰 리조트 + 판랑 탄안 사막 지프 질주 + 양떼목장 + 혼문섬 스노클링',
    category: '추천패키지',
    region: '남부',
    city: '나트랑',
    priceKRW: 750000,
    priceVND: 13900000,
    duration: '4박 5일',
    imageUrl: "/images/muine_sand.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 168,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#나트랑', '#판랑사막', '#사막지프', '#혼문섬', '#스노클링'],
    description: '나트랑의 푸른 바다와 이국적인 판랑 붉은 사막의 오아시스를 한 번에 정복하는 최고의 액티비티 인생샷 코스입니다.',
    included: [
      '5성급 리조트 4박 (조식 포함)',
      '단독 전용 차량 및 한국어 가이드',
      '판랑 사막 오픈탑 전용 지프차 탑승권',
      '혼문섬 스노클링 전용 스피드보트 & 장비 일체'
    ],
    excluded: ['항공권', '개인 경비', '매너팁'],
    itinerary: [
      {
        day: 1,
        title: '나트랑 도착 ➔ 가이드 미팅 ➔ 리조트 체크인',
        description: '호텔 체크인 후 해변 휴식.',
        meal: '조식: - | 중식: - | 석식: 로컬 미식',
        hotel: '나트랑 5성급 리조트'
      },
      {
        day: 2,
        title: '판랑 사막 데이투어 (탄안 사막 지프 ➔ 포클롱가라이 사원 ➔ 양떼목장)',
        description: '오픈 지프를 타고 샌듄 모래언덕 질주 및 인생샷 촬영.',
        meal: '조식: 호텔식 | 중식: 판랑 향토식 | 석식: 시내 맛집',
        hotel: '나트랑 5성급 리조트'
      },
      {
        day: 3,
        title: '혼문섬 해양국립공원 스노클링 ➔ 미니비치 힐링',
        description: '산호초 스노클링 및 에메랄드빛 해변 휴양.',
        meal: '조식: 호텔식 | 중식: 선상 해산물식 | 석식: 바베큐',
        hotel: '나트랑 5성급 리조트'
      },
      {
        day: 4,
        title: '아이리조트 머드온천 ➔ 마사지 ➔ 롯데마트 ➔ 공항 샌딩',
        description: '머드스파와 90분 마사지 후 공항 샌딩.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 삼겹살',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-nhatrang-golf-01',
    title: '[나트랑/골프 36홀] 빈펄 골프 나트랑 & 다이아몬드베이 명문 36홀 3박 5일',
    subTitle: '1인 1캐디 + 2인 1카트 + 그린피/캐디피/카트비 올포함! 5성급 빈펄 리조트 숙박',
    category: '골프투어',
    region: '남부',
    city: '나트랑',
    priceKRW: 1080000,
    priceVND: 20000000,
    duration: '3박 5일',
    imageUrl: "/images/vietnam_beach_villa_1787099211528.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 98,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#나트랑골프', '#빈펄골프', '#다이아몬드베이', '#오션뷰라운딩'],
    description: '베트남 최고의 해변 코스 빈펄 CC와 자연 친화적 다이아몬드베이 CC에서 만끽하는 럭셔리 라운딩 패키지입니다.',
    included: [
      '5성급 리조트 3박 (2인 1실, 조식 포함)',
      '36홀 그린피 + 2인 1카트 + 1인 1캐디피 올포함',
      '전 일정 골프 전용 리무진 밴 & 픽업/샌딩',
      '클럽하우스 중식 쿠폰 2회'
    ],
    excluded: ['캐디팁 ($15~$20/18홀)', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 36,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['빈펄 골프 클럽 나트랑 (18홀)', '다이아몬드 베이 골프 코스 (18홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '깜란 공항 도착 ➔ 전용 리무진 ➔ 5성급 리조트 체크인',
        description: '공항 영접 후 호텔 체크인 및 휴식.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '나트랑 5성급 리조트'
      },
      {
        day: 2,
        title: '1일차: Vinpearl Golf Nha Trang 18홀 라운딩',
        description: '바다를 마주하는 IMG 설계 명문 빈펄 CC 18홀 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 해산물 디너',
        hotel: '나트랑 5성급 리조트'
      },
      {
        day: 3,
        title: '2일차: Diamond Bay Golf Course 18홀 라운딩',
        description: '자연 맹그로브 숲과 모래언덕이 어우러진 18홀 라운딩 후 마사지.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 시내 맛집',
        hotel: '나트랑 5성급 리조트'
      },
      {
        day: 4,
        title: '시내 관광 & 스파 ➔ 공항 샌딩',
        description: '체크아웃 후 기념품 쇼핑 및 공항 이동.',
        meal: '조식: 호텔식 | 중식: 쌀국수 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-nhatrang-golf-02',
    title: '[나트랑/골프 54홀] KN 골프 링크스 깜란 & 빈펄 CC 프리미엄 54홀 4박 5일',
    subTitle: '그렉 노먼의 걸작 KN 골프 링크스 36홀 + 빈펄 CC 18홀 + 깜란 5성급 오션 리조트',
    category: '골프투어',
    region: '남부',
    city: '나트랑',
    priceKRW: 1350000,
    priceVND: 25000000,
    duration: '4박 5일',
    imageUrl: "/images/vietnam_golf_resort_1787099191979.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 72,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산'],
    tags: ['#KN링크스', '#그렉노먼코스', '#54홀라운딩', '#깜란리조트'],
    description: '베트남 아시아 베스트 골프 코스로 꼽히는 KN 링크스 깜란의 환상적인 모래언덕 링크스 코스를 경험하세요.',
    included: [
      '깜란 5성급 해변 리조트 4박 (조식 포함)',
      '54홀 그린피 + 2인 1카트 + 1인 1캐디피 올포함',
      '전 일정 골프백 전용 VIP 리무진 밴 & 기사',
      '클럽하우스 중식 쿠폰 3회 + 90분 스파'
    ],
    excluded: ['캐디팁 ($15~$20/18홀)', '개인 경비', '항공권'],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      golfCourseNames: ['KN 골프 링크스 깜란 (The Links 18홀)', 'KN 골프 링크스 깜란 (The Oasis 18홀)', '빈펄 CC 나트랑 (18홀)']
    },
    itinerary: [
      {
        day: 1,
        title: '깜란 공항 도착 ➔ 리조트 체크인',
        description: '공항에서 10분 거리 깜란 리조트 체크인 및 휴식.',
        meal: '조식: - | 중식: - | 석식: 자유식',
        hotel: '깜란 5성급 리조트'
      },
      {
        day: 2,
        title: '1일차: KN Golf Links (The Links Course) 18홀',
        description: '그렉 노먼 설계 정통 모래언덕 링크스 코스 라운딩.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 시푸드 만찬',
        hotel: '깜란 5성급 리조트'
      },
      {
        day: 3,
        title: '2일차: KN Golf Links (The Oasis Course) 18홀',
        description: '정원과 워터 해저드가 조화를 이루는 오아시스 코스 18홀.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 바베큐',
        hotel: '깜란 5성급 리조트'
      },
      {
        day: 4,
        title: '3일차: Vinpearl Golf Nha Trang 18홀',
        description: '빈펄 CC 18홀 라운딩 후 90분 피로회복 마사지.',
        meal: '조식: 호텔식 | 중식: 클럽하우스 | 석식: 한정식',
        hotel: '깜란 5성급 리조트'
      },
      {
        day: 5,
        title: '체크아웃 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '공항 샌딩 및 안전 귀국.',
        meal: '조식: 호텔식 | 중식: 현지식 | 석식: 기내식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-nhatrang-villa-01',
    title: '[나트랑/독채풀빌라] 나트랑 베이 3베드룸 오션뷰 럭셔리 프라이빗 풀빌라 3박 5일',
    subTitle: '전용 인피니티 풀 + 빈원더스 무제한 이용권 + 전담 버틀러 + 단독 차량 & 가이드 올포함',
    category: '풀빌라',
    region: '남부',
    city: '나트랑',
    priceKRW: 920000,
    priceVND: 17100000,
    duration: '3박 5일',
    imageUrl: "/images/villa_nhatrang_bay.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
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
      amenities: ['프라이빗 인피니티 풀', '파노라마 오션뷰 테라스', '풀 키친 & 다이닝', '바비큐 그릴'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '깜란 공항 도착 ➔ 가이드 미팅 ➔ 풀빌라 체크인 & 휴식',
        description: '풀빌라 체크인 후 전용 비치 휴식.',
        meal: '조식: - | 중식: - | 석식: 해산물 디너',
        hotel: '나트랑 베이 3베드룸 럭셔리 풀빌라'
      },
      {
        day: 2,
        title: '빈원더스 테마파크 & 워터파크 종일 자유이용',
        description: '스피드보트 탑승 후 빈원더스 테마파크와 워터파크 만끽.',
        meal: '조식: 리조트식 | 중식: 테마파크식 | 석식: 풀사이드 BBQ',
        hotel: '나트랑 베이 3베드룸 럭셔리 풀빌라'
      },
      {
        day: 3,
        title: '나트랑 호핑투어 & 스노클링 또는 풀빌라 프라이빗 힐링',
        description: '산호섬 스노클링 체험 및 머드온천 스파.',
        meal: '조식: 리조트식 | 중식: 해상식 | 석식: 시내 맛집',
        hotel: '나트랑 베이 3베드룸 럭셔리 풀빌라'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 포나가르 사원 & 쇼핑 ➔ 공항 샌딩',
        description: '명소 관광 후 공항 샌딩.',
        meal: '조식: 리조트식 | 중식: 쌀국수 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-nhatrang-villa-02',
    title: '[나트랑/대저택] 깜란 오션프론트 5베드룸 초대형 프라이빗 대저택 풀빌라 3박 5일',
    subTitle: '최대 14인 수용 + 20m 초대형 전용 수영장 + 프라이빗 비치 직결 + 잔디 정원 BBQ',
    category: '풀빌라',
    region: '남부',
    city: '나트랑',
    priceKRW: 1250000,
    priceVND: 23200000,
    duration: '3박 5일',
    imageUrl: "/images/villa_camranh_ocean.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 38,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '부산'],
    tags: ['#5베드룸', '#대저택풀빌라', '#깜란해변', '#대가족여행', '#바비큐파티'],
    description: '깜란의 청정 백사장 바로 앞에 자리잡은 5베드룸 초대형 풀빌라입니다. 대가족 및 친목 단체 모임에 최적화되어 있습니다.',
    included: [
      '5베드룸 오션프론트 독채 대저택 3박',
      '16인승 전용 차량 & 전담 기사 상시대기',
      '매일 프라이빗 쉐프 조식 + 1회 바비큐 파티',
      '투숙객 전원 90분 마사지'
    ],
    excluded: ['개인 경비', '항공권'],
    villaSpecs: {
      villaName: '깜란 오션프론트 5베드룸 맨션',
      structureDescription: '마스터룸 2실 + 게스트룸 3실 (총 5객실 / 개별 욕실 5개 + 대형 거실 + 주방)',
      bedrooms: 5,
      bathrooms: 6,
      beds: '킹베드 3개 + 퀸베드 2개 + 싱글 2개',
      maxOccupancy: 14,
      standardOccupancy: 10,
      privatePool: true,
      oceanView: true,
      areaSqm: 550,
      floors: 2,
      amenities: ['20m 전용 수영장', '프라이빗 비치 직결', '풀옵션 아일랜드 주방', '노래방 설비', 'BBQ 그릴'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '공항 영접 ➔ 풀빌라 체크인 & 환영 파티',
        description: '풀빌라 체크인 후 전용 수영장에서 휴식.',
        meal: '조식: - | 중식: - | 석식: 풀빌라 쉐프 만찬',
        hotel: '깜란 오션프론트 5베드룸 맨션'
      },
      {
        day: 2,
        title: '판랑 사막 지프 투어 & 풀사이드 BBQ',
        description: '판랑 사막 지프 투어 후 저녁 잔디 정원 바비큐 파티.',
        meal: '조식: 빌라 조식 | 중식: 현지 미식 | 석식: 통돼지 BBQ',
        hotel: '깜란 오션프론트 5베드룸 맨션'
      },
      {
        day: 3,
        title: '전일 프라이빗 비치 휴양 & 스파 마사지',
        description: '전용 비치에서 카약 및 패들보드 체험, 90분 스파.',
        meal: '조식: 빌라 조식 | 중식: 자유식 | 석식: 해산물 핫팟',
        hotel: '깜란 오션프론트 5베드룸 맨션'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '롯데마트 쇼핑 후 공항 샌딩.',
        meal: '조식: 빌라 조식 | 중식: 한정식 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-nhatrang-free-01',
    title: '[나트랑 자유/단독 요트] 나트랑 베이 럭셔리 선셋 카타마란 요트 투어 (와인/BBQ/스노클링)',
    subTitle: '우리 일행 단독 전용 세일링 요트 대절 + 와인 & 과일 플래터 + 선셋 디너 바비큐 + 스노클링',
    category: '자유여행',
    region: '남부',
    city: '나트랑',
    priceKRW: 150000,
    priceVND: 2800000,
    duration: '반나절 (약 4시간)',
    imageUrl: "/images/phuquoc_sunset.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 190,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['나트랑 시내 호텔 픽업'],
    tags: ['#나트랑요트', '#단독요트투어', '#선셋투어', '#와인바베큐', '#스노클링'],
    description: '나트랑의 노을 지는 붉은 석양을 배경으로 세일링 요트에서 즐기는 로맨틱 럭셔리 투어입니다.',
    included: [
      '단독 전용 요트 탑승 및 승무원 서비스',
      '와인, 맥주, 소프트드링크 무제한 제공',
      '선상 해산물 바비큐 디너',
      '스노클링 장비 & 바다낚시 도구 대여'
    ],
    excluded: ['개인 경비'],
    itinerary: [
      {
        day: 1,
        title: '15:30 호텔 픽업 ➔ 요트 선착장 출항 ➔ 스노클링 & 낚시 ➔ 선셋 와인 BBQ ➔ 귀환',
        description: '바다 위에서 선셋을 감상하며 즐기는 파티.',
        meal: '석식: 선상 BBQ',
        hotel: '개별 숙소'
      }
    ]
  },
  {
    id: 'prod-nhatrang-free-02',
    title: '[나트랑 자유/1일 투어] 나트랑 출발 판랑 사막 샌듄 지프 & 양떼목장 1일 단독 투어',
    subTitle: '전용 차량 왕복 픽업 + 오픈탑 사막 지프차 + 샌드보딩 썰매 + 포클롱가라이 참파 사원',
    category: '자유여행',
    region: '남부',
    city: '나트랑',
    priceKRW: 85000,
    priceVND: 1580000,
    duration: '1일 데이투어',
    imageUrl: "/images/phanrang_desert_jeep_1788400701381.jpg",
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 340,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['나트랑 호텔 픽업'],
    tags: ['#판랑사막', '#사막지프', '#양떼목장', '#인생샷투어', '#단독차량'],
    description: '나트랑 여행의 필수 코스! 웅장한 판랑 사막에서 오픈카 지프를 타고 모래언덕을 질주하는 환상적인 1일 투어입니다.',
    included: [
      '왕복 전용 차량 및 한국어 안내 기사',
      '판랑 탄안 사막 지프차 탑승료 및 샌드보딩',
      '양떼목장 & 참파 사원 입장료',
      '생수 및 물티슈 제공'
    ],
    excluded: ['중식 (현지 맛집 안내)', '기사 매너팁'],
    itinerary: [
      {
        day: 1,
        title: '08:00 호텔 픽업 ➔ 양떼목장 ➔ 판랑 사막 지프 투어 ➔ 참파 사원 ➔ 나트랑 복귀',
        description: '사막 지프 질주 및 인생샷 촬영.',
        meal: '자유식',
        hotel: '개별 숙소'
      }
    ]
  }
];
