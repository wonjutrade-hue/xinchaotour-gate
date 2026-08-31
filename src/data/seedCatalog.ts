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
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
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
    id: 'prod-danang-villa-01',
    title: '[다낭/독채풀빌라] 미케비치 오션뷰 4베드룸 프리미엄 독채 풀빌라 3박 5일',
    subTitle: '전용 대형 프라이빗 수영장 + 24시간 버틀러 + 매일 전신 마사지 90분 + 단독 차량 & 가이드 올포함',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 980000,
    priceVND: 18200000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
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
    excluded: ['개인 경비 및 매너팁', '항공권'],
    villaSpecs: {
      villaName: '다낭 미케비치 시그니처 4베드룸 럭셔리 빌라',
      structureDescription: '마스터룸 2실 + 패밀리룸 1실 + 트윈룸 1실 (총 4객실 / 독립 욕실 4개 + 대형 거실 + 키친)',
      bedrooms: 4,
      bathrooms: 4,
      beds: '킹베드 3개 + 싱글베드 2개',
      maxOccupancy: 10,
      standardOccupancy: 8,
      privatePool: true,
      oceanView: true,
      areaSqm: 420,
      floors: 2,
      address: 'Vo Nguyen Giap, Son Tra, Da Nang, Vietnam',
      googleMapUrl: 'https://maps.google.com/?q=My+Khe+Beach+Da+Nang',
      amenities: [
        '프라이빗 수영장', '넓은 거실 & 소파', '풀옵션 주방 & 다이닝 룸',
        '프라이빗 잔디 정원', '야외 바비큐(BBQ) 그릴 시설', '스마트 TV & 넷플릭스',
        '24시간 전담 버틀러', '초고속 Wi-Fi'
      ],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ 전용 VIP 밴 ➔ 풀빌라 체크인 & 웰컴 드링크',
        description: '공항 도착 후 풀빌라 체크인 및 전용 수영장 힐링 휴식.',
        meal: '조식: - | 중식: - | 석식: 베트남 궁중 요리 디너',
        hotel: '다낭 미케비치 4베드룸 럭셔리 풀빌라'
      },
      {
        day: 2,
        title: '호이안 고대도시 올드타운 ➔ 풀사이드 해산물 BBQ 파티',
        description: '호이안 올드타운 투어 후 풀빌라 잔디 정원에서 프라이빗 바비큐 파티.',
        meal: '조식: 풀빌라 조식 | 중식: 호이안 미식 | 석식: 풀사이드 BBQ',
        hotel: '다낭 미케비치 4베드룸 럭셔리 풀빌라'
      },
      {
        day: 3,
        title: '전일 풀빌라 힐링 휴양 또는 바나힐 테마파크 자유 선택',
        description: '프라이빗 풀에서 여유로운 수영과 휴식. 희망 시 바나힐 무료 차량 지원.',
        meal: '조식: 풀빌라 조식 | 중식: 자유식 | 석식: 다낭 유명 레스토랑',
        hotel: '다낭 미케비치 4베드룸 럭셔리 풀빌라'
      },
      {
        day: 4,
        title: '레이트 체크아웃 ➔ 90분 스파 마사지 ➔ 쇼핑 ➔ 공항 샌딩',
        description: '스파 90분 마사지 및 롯데마트 쇼핑 후 공항 샌딩.',
        meal: '조식: 풀빌라 조식 | 중식: 현지식 | 석식: 한정식',
        hotel: '기내박'
      }
    ]
  },
  {
    id: 'prod-danang-villa-02',
    title: '[다낭/대저택] 오션프론트 6베드룸 초대형 프리미엄 풀빌라 3박 5일',
    subTitle: '총 6객실 (최대 16인) + 실내 엘리베이터 + 최신 노래방 + 자쿠지 스파 + 15m 대형 인피니티 풀',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 1350000,
    priceVND: 25000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
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
      amenities: [
        '초대형 프라이빗 수영장 (15m)', '실내 전용 엘리베이터', '프라이빗 노래방 & 사운드 시스템',
        '야외 루프탑 자쿠지 스파', '풀옵션 대형 주방', '야외 정원 및 대형 BBQ 그릴',
        '24시간 전담 상주 버틀러'
      ],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 ➔ 16인승 VIP 리무진 ➔ 6베드룸 체크인 & 환영 만찬',
        description: '공항 도착 후 풀빌라 체크인 및 환영 만찬.',
        meal: '조식: - | 중식: - | 석식: 풀빌라 쉐프 특식',
        hotel: '다낭 그랜드 오션 6베드룸 맨션'
      },
      {
        day: 2,
        title: '호이안 올드타운 ➔ 풀사이드 통돼지 BBQ 파티',
        description: '호이안 관광 후 정원에서 프라이빗 바비큐 파티.',
        meal: '조식: 풀빌라 조식 | 중식: 호이안 미식 | 석식: 프리미엄 BBQ 파티',
        hotel: '다낭 그랜드 오션 6베드룸 맨션'
      },
      {
        day: 3,
        title: '자유 힐링 또는 바나힐 ➔ 실내 노래방 & 자쿠지 휴식',
        description: '원하는 일정대로 전용 차량 관광 후 풀빌라 노래방 파티.',
        meal: '조식: 풀빌라 조식 | 중식: 자유식 | 석식: 고급 해산물',
        hotel: '다낭 그랜드 오션 6베드룸 맨션'
      },
      {
        day: 4,
        title: '레이트 체크아웃 ➔ 90분 마사지 ➔ 롯데마트 ➔ 공항 샌딩',
        description: '전원 마사지 및 기념품 쇼핑 후 공항 샌딩.',
        meal: '조식: 풀빌라 조식 | 중식: 한정식 | 석식: 공항식',
        hotel: '기내박'
      }
    ]
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
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
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
  // 2. 나트랑 (NHA TRANG)
  // =========================================================================
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
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
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
