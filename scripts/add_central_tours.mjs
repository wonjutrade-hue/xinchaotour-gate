import fs from 'fs';
import path from 'path';

export const CENTRAL_VIETNAM_TOURS = [
  {
    id: "prod-central-vntravel-danang-bana-hoian-4d3n",
    title: "[다낭/호이안/바나힐 4일] 다낭 영응사 · 바나힐 골든브릿지 · 호이안 고도시 & 투본강 바구니배 4일 (3박 4일)",
    subTitle: "바나힐 1,487m 국립공원 케이블카 & 신의 손 골든브릿지 · 유네스코 호이안 구시가지 야경 · 투본강 바구니배 코코넛숲 & 손짜반도 힐링",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 199000,
    priceVND: 2690000,
    duration: "3박 4일",
    imageUrl: "https://dulichvntravel.com/files/product/da-nang-son-tra-cu-lao-cham-rung-dua-bay-mau-hoi-an-lskswlq8.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/da-nang-son-tra-cu-lao-cham-rung-dua-bay-mau-hoi-an-lskswlq8.jpg"
    ],
    galleryImages: [
      "https://dulichvntravel.com/files/product/da-nang-son-tra-cu-lao-cham-rung-dua-bay-mau-hoi-an-lskswlq8.jpg",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 48,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ["다낭 국제공항", "다낭 시내 호텔", "인천", "부산", "대구"],
    tags: ["#다낭여행", "#바나힐골든브릿지", "#호이안올드타운", "#투본강바구니배", "#손짜반도", "#자유여행", "#추천패키지"],
    description: "베트남 중부의 핵심 명소를 가장 편안하고 알차게 만끽할 수 있는 베스트셀러 투어입니다. 해발 1,487m 바나힐 정상에서 신비로운 신의 손 골든브릿지를 거닐고, 유네스코 세계문화유산 호이안 구시가지에서 수천 개의 오색 풍등이 밝히는 환상적인 야경과 투본강 소원배를 즐깁니다. 울창한 깜탄 코코넛 숲에서 신나는 전통 바구니배와 손짜반도 린응사의 웅장한 67m 해수관음상까지 알찬 일정으로 구성되어 있습니다.",
    highlights: [
      "손짜반도(Bán đảo Sơn Trà) 영응사 67m 동양 최대 해수관음상 및 다낭 비치 파노라마",
      "바나힐(Bà Nà Hills) 해발 1,487m 세계 최장 케이블카 & 신의 손 골든 브릿지(Golden Bridge)",
      "유네스코 세계문화유산 호이안(Hội An) 고도시 구시가지, 내원교, 풍흥 고가, 야간 풍등거리",
      "깜탄 코코넛 바구니배(Thuyền Thúng) 수상 액티비티 & 어부 전통 그물 던지기 체험",
      "다낭 용다리(Cầu Rồng) 및 사랑의 부두(Cầu Tình Yêu) 야경 투어"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "다낭 & 호이안 낭만 힐링 베스트셀러",
    included: [
      "전용 에어컨 리무진 / 최신형 전용 차량 및 전문 베테랑 기사",
      "일정표 내 명시된 다낭/호이안 호텔 (2인 1실 기준)",
      "일정표에 포함된 전 일정 식사 (호텔 조식, 다낭 해산물 특식, 호이안 전통 반쎄오/화이트로즈 등)",
      "일정 내 모든 관광지 입장료 (바나힐 케이블카 왕복, 호이안 구시가지 통합입장권, 코코넛 바구니배 탑승료 등)",
      "생수(1일 1인 500ml) 및 물티슈 제공",
      "신짜오투어 전담 한국어 가이드 및 24시간 실시간 케어",
      "베트남 현지 여행자 보험"
    ],
    excluded: [
      "개인 경비 (음료, 주류, 개인 기호품 등)",
      "국제선 왕복 항공권 (희망 시 발권 대행 가능)",
      "가이드 & 기사 매너팁",
      "바나힐 밀랍인형 박물관 등 일부 선택 유료 시설",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "다낭 국제공항 도착 · 손짜반도 린응사 · 사랑의 부두 & 용다리 야경",
        description: "다낭 국제공항 도착 후 신짜오투어 전용 피켓을 든 전담 가이드 미팅. 전용 차량으로 이동하여 손짜반도 영응사(린응사)에 올라 67m 해수관음상과 다낭 미케비치 전경을 감상합니다. 다낭 한강변 사랑의 부두와 주말 저녁 불꽃 쇼로 유명한 용다리 야경을 감상하고 호텔 체크인합니다.",
        meal: "중식: 현지 쌀국수 특식 / 석식: 다낭 마담란 베트남 정식",
        hotel: "다낭 4성급 비치 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "바나힐 국립공원 케이블카 · 골든브릿지 신의 손 · 프랑스 마을 판타지 파크",
        description: "호텔 조식 후 바나힐로 이동하여 기네스북 등재 세계 최장 케이블카에 탑승합니다. 구름 위 거대한 두 손이 다리를 받치고 있는 경이로운 골든 브릿지에서 인생샷을 남기고 프랑스 중세 고성 마을과 지하 판타지 파크, 알파인 코스터 루지를 자유롭게 만끽합니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 다낭 해산물 BBQ 특식",
        hotel: "다낭 4성급 비치 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "깜탄 코코넛숲 바구니배 체험 · 호이안 유네스코 올드타운 & 투본강 소원배 야경",
        description: "호텔 조식 후 울창한 깜탄 코코넛 수로로 이동하여 베트남 전통 원형 대나무 바구니배를 타고 스릴 넘치는 스핀 쇼와 전통 그물 던지기를 체험합니다. 오후에는 유네스코 세계유산 호이안 고도시로 이동해 내원교, 쩐가사당 등을 둘러보고, 해 질 녘 수천 개의 풍등이 빛나는 투본강에서 촛불 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 호이안 화이트로즈 & 까오러우 특식 / 석식: 모닝글로리 전통식",
        hotel: "호이안 리조트 또는 다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "다낭 대성당(핑크성당) · 한시장 로컬 쇼핑 & 기념품 · 공항 샌딩",
        description: "여유로운 조식 후 체크아웃. 프랑스 식민지 시절 건축된 로맨틱한 분홍빛 다낭 대성당(수탉성당)을 관람하고, 활기찬 한시장(Chợ Hàn)에서 아오자이, 건망고, 베트남 커피, 라탄백 등을 쇼핑합니다. 고급 스파 마사지(선택) 후 다낭 공항으로 이동하여 안락하게 일정을 마무리합니다.",
        meal: "조식: 호텔식 / 중식: 냐벱 반쎄오 맛집 특식",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  },
  {
    id: "prod-central-vntravel-danang-hue-phongnha-4d3n",
    title: "[다낭/후에/퐁냐 4일] 바나힐 골든브릿지 · 유네스코 고도 후에 황궁 · 퐁냐케방 국립공원 천연동굴 4일 (3박 4일)",
    subTitle: "세계 최대 카르스트 퐁냐 동굴 지하강 유람 · 응우옌 왕조 마지막 황궁 후에 대내 · 바나힐 국립공원 & 라방 성지",
    category: "자유여행",
    region: "중부",
    city: "후에",
    priceKRW: 235000,
    priceVND: 3290000,
    duration: "3박 4일",
    imageUrl: "https://dulichvntravel.com/files/product/da-nang-ba-na-hue-dong-phong-nha-thien-duong-ykquuzvo.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/da-nang-ba-na-hue-dong-phong-nha-thien-duong-ykquuzvo.jpg"
    ],
    galleryImages: [
      "https://dulichvntravel.com/files/product/da-nang-ba-na-hue-dong-phong-nha-thien-duong-ykquuzvo.jpg",
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 39,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 8,
    departureCities: ["다낭 국제공항", "후에 푸바이 공항", "인천", "부산"],
    tags: ["#후에황궁", "#퐁냐케방국립공원", "#퐁냐동굴", "#바나힐", "#라방성지", "#유네스코헤리티지", "#자유여행"],
    description: "베트남 중부의 역사와 대자연의 정수를 한 번에 만나는 특별한 여정입니다. 기네스북과 유네스코가 인정한 세계 최대 카르스트 퐁냐-케방 국립공원에서 지하강을 가로지르는 나룻배를 타고 억겁의 세월이 빚어낸 종유석의 신비를 감상합니다. 이어 베트남 마지막 봉건 왕조 응우옌 왕조의 황궁인 후에 대내와 카이딘 왕릉, 바나힐 골든브릿지까지 완벽하게 이어집니다.",
    highlights: [
      "유네스코 세계자연유산 퐁냐-케방(Phong Nha - Kẻ Bàng) 국립공원 지하강 동굴 배 유람 & 기암괴석 탐험",
      "베트남 마지막 봉건 왕조 응우옌 왕조의 황궁 후에 대내(Đại Nội - Hoàng Thành Huế)",
      "흐엉강(Sông Hương) 강변의 유서 깊은 7층 팔각탑 티엔무 사원(Chùa Thiên Mụ)",
      "웅장한 프랑스-베트남 융합 바로크 양식 카이딘 황제릉(Lăng Khải Định)",
      "바나힐 골든브릿지 및 하이반 패스(Đèo Hải Vân) 해안 절경 드라이브"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "유네스코 고도 후에 & 퐁냐케방 자연유산 탐험",
    included: [
      "전용 에어컨 리무진 / 최신형 투어 전용 차량 및 기사",
      "일정표 내 명시된 후에/다낭 4성급 호텔 (2인 1실 기준)",
      "전 일정 식사 (호텔 조식, 후에 황실 궁중요리, 퐁냐 현지식 특식 등)",
      "일정 내 모든 관광지 입장료 (후에 황궁 대내, 티엔무 사원, 카이딘 릉, 퐁냐 동굴 보트 승선권 등)",
      "바나힐 케이블카 왕복 이용권",
      "생수 및 물티슈 제공, 현지 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "국제선 항공권",
      "천국의 동굴(Thiên Đường) 전동차 선택 이용",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "다낭 도착 · 하이반 패스 드라이브 · 고도 후에 도착 & 흐엉강 야경",
        description: "다낭 공항 도착 후 가이드 미팅. 세계적인 해안 드라이브 코스인 하이반 고개를 넘어 랑코 해변을 조망하며 베트남 마지막 왕조의 수도 후에로 이동합니다. 호텔 체크인 후 흐엉강(향강) 야경을 감상하며 후에 전통 로컬 디너를 즐깁니다.",
        meal: "중식: 랑코 해변 해산물식 / 석식: 후에 전통 궁중요리",
        hotel: "후에 4성급 헤리티지 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "후에 출발 · 꽝찌 라방 성지 순례 · 퐁냐케방 국립공원 보트 탐험 · 후에 복귀",
        description: "이른 아침 조식 후 꽝찌성을 지나 베트남 가톨릭의 최대 성지 라방(La Vang) 바실리카에 들러 순례를 합니다. 이어 유네스코 세계자연유산 퐁냐-케방 국립공원에 도착, 전통 모터보트를 타고 손강(Sông Son)을 거슬러 올라 지하강 동굴 내부로 진입합니다. 수만 년의 세월이 만든 화려한 종유석과 석순을 관람 후 후에로 귀환합니다.",
        meal: "조식: 호텔식 / 중식: 퐁냐 토종닭 구이 특식 / 석식: 후에 분보후에 & 반베오",
        hotel: "후에 4성급 헤리티지 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "후에 대내 황궁 탐방 · 티엔무 사원 · 카이딘 황제릉 · 다낭 이동",
        description: "호텔 조식 후 13대 황제가 다스렸던 후에 대내(황궁)의 오문, 태화전, 자금성을 집중 답사합니다. 흐엉강변의 티엔무 사원과 동서양 건축미가 화려하게 결합된 카이딘 황제릉을 둘러본 뒤 하이반 터널을 지나 다낭으로 이동하여 호텔 투숙합니다.",
        meal: "조식: 호텔식 / 중식: 후에 전통 정식 / 석식: 다낭 한강변 디너",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "바나힐 골든브릿지 케이블카 관광 · 다낭 시내 쇼핑 & 공항 샌딩",
        description: "호텔 조식 후 바나힐로 이동하여 구름 위 골든브릿지 산책 및 프랑스 마을을 관광합니다. 다낭 시내로 내려와 롯데마트/한시장에서 특산품을 쇼핑한 후 공항으로 이동하여 일정을 마무리합니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  },
  {
    id: "prod-central-vntravel-danang-marblemountain-bana-hoian-phongnha-4d3n",
    title: "[중부핵심 4대명소 4일] 다낭 오행산 · 바나힐 · 호이안 유네스코 구시가지 · 후에 & 퐁냐 동굴 4일 (3박 4일)",
    subTitle: "대리석 산 오행산 동굴사원 · 바나힐 케이블카 & 골든브릿지 · 호이안 풍등 야경 · 유네스코 퐁냐케방 국립공원",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 259000,
    priceVND: 3690000,
    duration: "3박 4일",
    imageUrl: "https://dulichvntravel.com/files/product/da-nang-ngu-hanh-son-hoi-an-ba-na-hue-dong-phong-nha-thien-duong-rdiy8tuc.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/da-nang-ngu-hanh-son-hoi-an-ba-na-hue-dong-phong-nha-thien-duong-rdiy8tuc.jpg"
    ],
    galleryImages: [
      "https://dulichvntravel.com/files/product/da-nang-ngu-hanh-son-hoi-an-ba-na-hue-dong-phong-nha-thien-duong-rdiy8tuc.jpg",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 35,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 7,
    departureCities: ["다낭 국제공항", "인천", "부산", "대구"],
    tags: ["#오행산", "#마블마운틴", "#바나힐", "#호이안풍등", "#후에황궁", "#퐁냐케방", "#자유여행"],
    description: "다낭의 신비로운 대리석 봉우리 오행산과 호이안의 로맨틱한 풍등 야경, 바나힐 정상의 골든브릿지, 유네스코 세계유산 퐁냐케방 국립공원까지 중부 여행의 백미만을 엄선한 최적의 코스입니다. 알찬 동선과 전용 차량, 전문 가이드의 세심한 인솔로 부모님, 가족, 연인 누구와 함께해도 만족스러운 감동 여행을 선사합니다.",
    highlights: [
      "5개의 음양오행 봉우리 오행산(마블마운틴) 현공동굴 & 수산 전망대",
      "호이안 투본강 야간 나룻배 소원초 띄우기 & 낭만 등불 거리",
      "구름 위 프랑스 테마파크 바나힐 골든브릿지 & 루지 레일바이크",
      "유네스코 세계자연유산 퐁냐케방 지하강 동굴 탐험",
      "한국어 지원 전담 가이드 & 전용 리무진 케어"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "중부 4대 명소 압축 일주 & 자연 문화 힐링",
    included: [
      "전용 에어컨 리무진 / 최신 차량 및 기사",
      "일정표 내 명시된 다낭/후에 4성급 호텔 (2인 1실)",
      "전 일정 식사 및 현지 특식 (호이안 전통식, 후에 궁중식 등)",
      "모든 관광지 입장료 (바나힐, 호이안, 오행산 엘리베이터, 퐁냐 동굴 보트)",
      "생수 및 물티슈, 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "항공권",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "다낭 도착 · 대리석 오행산(마블마운틴) 탐방 · 호이안 고도시 야경 투어",
        description: "다낭 공항 도착 후 가이드 미팅. 화·수·목·금·토의 음양오행을 상징하는 오행산(Marble Mountain)에 올라 신비한 현공동굴 사원과 망해대를 조망합니다. 오후에는 호이안으로 이동하여 유네스코 고도시의 목조 가옥들을 둘러보고, 밤이 되면 오색 등불이 켜진 투본강에서 소원등을 띄웁니다.",
        meal: "중식: 다낭 현지식 / 석식: 호이안 반쎄오 & 분짜",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "바나힐 케이블카 & 골든브릿지 · 하이반 고개 · 유서 깊은 고도 후에 도착",
        description: "호텔 조식 후 바나힐로 이동하여 케이블카 탑승. 안개 속을 걷는 듯한 골든브릿지와 프랑스 마을, 정원을 관람합니다. 오후에는 하이반 고개를 넘어 고도 후에에 도착, 흐엉강변의 야경을 즐깁니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 후에 황실 약선요리",
        hotel: "후에 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "후에 · 라방 성지 경유 · 유네스코 퐁냐케방 천연동굴 보트 탐험 · 후에 복귀",
        description: "조식 후 출발하여 라방 성모 성지를 방문하고 퐁냐케방 국립공원으로 이동합니다. 모터보트를 타고 에메랄드빛 강을 건너 신비한 퐁냐 동굴 지하강으로 들어가 장대한 종유석들을 탐험합니다. 관람 후 후에로 돌아와 맛있는 저녁 식사를 합니다.",
        meal: "조식: 호텔식 / 중식: 퐁냐 현지식 / 석식: 후에 특식",
        hotel: "후에 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "후에 황궁 대내 관람 · 동바 시장 기념품 쇼핑 · 다낭 공항 샌딩",
        description: "호텔 조식 후 유네스코 세계문화유산인 후에 황궁(대내)을 관람합니다. 황제의 권위가 깃든 태화전과 자금성을 둘러본 뒤, 후에 최대 전통시장인 동바시장에서 기념품을 구입하고 다낭 공항으로 이동하여 귀국 일정을 마칩니다.",
        meal: "조식: 호텔식 / 중식: 로컬 쌀국수 특식",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  },
  {
    id: "prod-central-vntravel-central-grand-tour-5d4n",
    title: "[중부그랜드완전정복 5일] 다낭 · 손짜반도 · 오행산 · 바나힐 · 호이안 · 후에 황궁 · 퐁냐케방 5일 (4박 5일)",
    subTitle: "베트남 중부 3대 유네스코 세계유산 완전정복! 문화·역사·대자연의 완벽한 하모니 · 전 일정 특식 & 4성급 호텔",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 289000,
    priceVND: 4090000,
    duration: "4박 5일",
    imageUrl: "https://dulichvntravel.com/files/product/da-nang-son-tra-ngu-hanh-son-hoi-an-ba-na-hue-dong-phong-nha-thien-duong-jw8sgq0s.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://dulichvntravel.com/files/product/da-nang-son-tra-ngu-hanh-son-hoi-an-ba-na-hue-dong-phong-nha-thien-duong-jw8sgq0s.jpg",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 52,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ["다낭 국제공항", "인천", "부산", "대구"],
    tags: ["#중부대종주", "#다낭", "#호이안올드타운", "#바나힐", "#후에황궁", "#퐁냐케방", "#완전정복", "#자유여행"],
    description: "베트남 중부의 3대 유네스코 세계유산인 호이안 구시가지, 후에 황궁, 퐁냐케방 국립공원을 모두 섭렵하는 궁극의 그랜드 마스터 투어입니다. 손짜반도의 해수관음상과 대리석 오행산, 바나힐 골든브릿지, 후에 황실 연회와 흐엉강 보트, 퐁냐케방 지하동굴 탐험까지! 베트남 중부의 역사, 문화, 대자연을 가장 품격 있게 완성합니다.",
    highlights: [
      "중부 3대 유네스코 세계유산(호이안 구시가지, 고도 후에 황궁, 퐁냐케방 국립공원) 그랜드 슬램 일주",
      "손짜반도 영응사 67m 해수관음상 & 오행산 마블마운틴 동굴사원",
      "구름 위 프랑스 휴양지 바나힐 골든브릿지 & 판타지 파크",
      "호이안 투본강 나룻배 소원등 띄우기 & 낭만 풍등 야경",
      "후에 황궁 대내 및 카이딘 황제릉 · 퐁냐 지하동굴 종유석 탐험"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "베트남 중부 3대 세계유산 그랜드 일주",
    included: [
      "전용 에어컨 리무진 / 최신형 투어 전용 차량 및 전문 기사",
      "일정표 내 명시된 다낭/후에 4성급 호텔 4박 (2인 1실)",
      "전 일정 식사 (호텔 조식, 다낭 해산물 특식, 호이안 특미, 후에 황실 만찬 등)",
      "일정 내 모든 입장료 (바나힐 케이블카 왕복, 호이안 통합권, 후에 황궁, 카이딘 릉, 퐁냐 동굴 보트 승선권 등)",
      "생수 및 물티슈, 현지 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 기사/가이드 팁",
      "국제선 왕복 항공권",
      "선택 관광 및 주류/음료",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "다낭 도착 · 손짜반도 린응사 관음상 조망 · 미케비치 산책 & 석식",
        description: "다낭 공항 도착 후 가이드 미팅. 손짜반도 영응사(린응사)에 올라 67m 동양 최대 해수관음상을 참배하고 아름다운 미케비치를 내려다봅니다. 사랑의 부두와 용다리 야경을 감상한 후 호텔에 체크인합니다.",
        meal: "중식: 쌀국수 & 짜조 특식 / 석식: 다낭 씨푸드 만찬",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "오행산(마블마운틴) · 호이안 고도시 투본강 나룻배 & 야간 풍등거리",
        description: "조식 후 대리석으로 이루어진 오행산의 현공동굴과 전망대를 관람합니다. 오후에는 유네스코 호이안 올드타운으로 이동해 일본다리(내원교), 풍흥고가, 광동회관을 탐방하고, 저녁에는 투본강에서 촛불 소원배를 띄우며 오색 풍등 거리를 산책합니다.",
        meal: "조식: 호텔식 / 중식: 다낭 로컬식 / 석식: 호이안 화이트로즈 & 프라이드완탄",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "바나힐 케이블카 & 골든브릿지 · 하이반 패스 터널 · 고도 후에 이동",
        description: "호텔 조식 후 바나힐로 이동하여 케이블카에 탑승합니다. 골든브릿지의 신비로운 자태와 프랑스 고성 마을, 꽃정원, 루지를 즐긴 후 후에로 이동합니다. 흐엉강변 호텔에 체크인하고 후에 궁중 특식을 맛봅니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 후에 전통 궁중요리",
        hotel: "후에 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "후에 출발 · 꽝찌 라방 성지 · 퐁냐케방 국립공원 지하강 보트 탐험 · 후에 복귀",
        description: "조식 후 꽝찌성을 지나 라방 바실리카 성지를 참배하고 퐁냐케방 국립공원으로 이동합니다. 손강 모터보트에 승선하여 세계 최대의 카르스트 퐁냐 동굴 내부로 들어가 수억 년에 걸쳐 형성된 종유석 숲을 탐험합니다. 탐방 후 후에로 귀환합니다.",
        meal: "조식: 호텔식 / 중식: 퐁냐 로컬 닭구이 / 석식: 후에 분보후에 특식",
        hotel: "후에 4성급 호텔 (2인 1실)"
      },
      {
        day: 5,
        title: "후에 황궁 대내 · 티엔무 사원 · 카이딘 황제릉 · 다낭 공항 이동 샌딩",
        description: "조식 후 응우옌 왕조의 황궁인 후에 대내(오문, 태화전, 자금성)를 둘러보고, 흐엉강 티엔무 사원과 카이딘 황제릉을 관람합니다. 하이반 터널을 통해 다낭으로 이동, 공항 샌딩으로 5일간의 찬란한 여정을 마무리합니다.",
        meal: "조식: 호텔식 / 중식: 후에 전통 한상차림",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  },
  {
    id: "prod-central-vntravel-quynhon-phuyen-4d3n",
    title: "[꾸이년/푸옌 에메랄드 4일] 끼꼬 몰디브 해변 · 에오조 해안절벽 · 간다디아 주상절리 · 바이셉 4일 (3박 4일)",
    subTitle: "베트남의 숨은 보석 몰디브 끼꼬 스노클링 · 한국 제주도를 닮은 육각 주상절리 간다디아 · 영화 촬영지 푸른 초원 바이셉",
    category: "자유여행",
    region: "중부",
    city: "꾸이년",
    priceKRW: 315000,
    priceVND: 4490000,
    duration: "3박 4일",
    imageUrl: "https://dulichvntravel.com/files/product/quy-nhon-phu-yen-ntyfg2ue.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/quy-nhon-phu-yen-ntyfg2ue.jpg"
    ],
    galleryImages: [
      "https://dulichvntravel.com/files/product/quy-nhon-phu-yen-ntyfg2ue.jpg",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 29,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 5,
    departureCities: ["꾸이년 푸깟 공항", "호치민/하노이 경유", "인천", "부산"],
    tags: ["#꾸이년", "#푸옌", "#끼꼬해변", "#에오조", "#간다디아주상절리", "#바이셉", "#에메랄드바다", "#자유여행"],
    description: "베트남 현지인들이 가장 사랑하는 최고의 숨은 청정 휴양지 꾸이년(Quy Nhơn)과 푸옌(Phú Yên)을 여행합니다. 베트남의 몰디브라 불리는 투명한 에메랄드빛 끼꼬 해변에서 스피드보트와 산호초 스노클링을 즐기고, 바람의 언덕 에오조 절벽 산책로를 걷습니다. 화산이 빚어낸 세계적 천연기념물 간다디아 육각 주상절리와 영화 노란 꽃이 피는 들판의 촬영지 바이셉까지 감성 넘치는 풍경이 가득합니다.",
    highlights: [
      "베트남의 숨겨진 에메랄드 낙원 끼꼬(Kỳ Co) 스피드보트 & 산호초 스노클링",
      "한국의 섭지코지를 닮은 바람이 머무는 낭만의 해안 산책로 에오조(Eo Gió)",
      "화산암이 식어 형성된 신비로운 세계적 천연기념물 간다디아(Gành Đá Đĩa) 육각 주상절리",
      "영화 노란 꽃이 피는 들판 배경 바이셉(Bãi Xép)의 푸른 바다와 언덕",
      "오로안 늪(Đầm Ô Loan)의 신선한 붉은 피조개 및 특산 해산물 만찬"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "꾸이년 푸옌 청정 에메랄드 감성 힐링",
    included: [
      "전용 에어컨 리무진 / 전용 투어 차량 및 기사",
      "일정표 내 명시된 꾸이년 4성급 오션뷰 호텔 (2인 1실)",
      "전 일정 식사 (호텔 조식, 오로안 늪 피조개 해산물식, 끼꼬 해변식 등)",
      "끼꼬 스피드보트 탑승료 & 스노클링 장비 일체",
      "일정 내 모든 관광지 입장료 (에오조, 간다디아, 바이셉, 망랑 성당 등)",
      "생수 및 물티슈, 현지 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 가이드/기사 매너팁",
      "국내선/국제선 항공권",
      "해양 스포츠(제트스키, 패러세일링 등) 선택 이용",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "꾸이년 푸깟 공항 도착 · 티엔흥 사원 · 천년 참파 탑도이 · 겐랑 띠엔사항 해변",
        description: "꾸이년 푸깟 공항 도착 후 가이드 미팅. 아름다운 동양 건축의 티엔흥 사원을 둘러보고 12세기 참파 왕국의 유산인 쌍둥이 탑 '탑도이(Tháp Đôi)'를 관람합니다. 겐랑 띠엔사 해변에서 천연 조약돌 해변과 시인 한묵뜨 묘를 산책하고 호텔에 체크인합니다.",
        meal: "중식: 꾸이년 쌀국수 & 반호이 특식 / 석식: 해변 레스토랑 디너",
        hotel: "꾸이년 4성급 오션뷰 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "푸옌 이동 · 망랑 성당 · 간다디아 주상절리 · 오로안 늪 해산물식 · 바이셉 언덕",
        description: "호텔 조식 후 푸옌으로 이동. 베트남 최초의 국어 성경이 보관된 130년 고딕 양식의 망랑 성당을 방문합니다. 이어 수천 개의 육각 돌기둥이 바다로 뻗어 있는 세계적 기암괴석 간다디아 주상절리를 관람하고, 오로안 늪에서 명물 붉은 피조개 해산물 만찬을 즐깁니다. 오후에는 바이셉 언덕에서 탁 트인 바다를 조망합니다.",
        meal: "조식: 호텔식 / 중식: 오로안 늪 신선 해산물 만찬 / 석식: 꾸이년 로컬 바비큐",
        hotel: "꾸이년 4성급 오션뷰 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "끼꼬 에메랄드 비치 스피드보트 · 산호초 스노클링 · 에오조 해안 절벽 둘레길",
        description: "조식 후 스피드보트를 타고 몰디브를 연상시키는 에메랄드빛 끼꼬(Kỳ Co) 해변으로 향합니다. 투명한 바다에서 알록달록한 산호초 스노클링을 즐긴 후 신선한 해산물 런치를 즐깁니다. 오후에는 절벽을 따라 바다를 끼고 걷는 에오조(Eo Gió) 해안 산책로와 푸엉마이 거대 사구를 둘러봅니다.",
        meal: "조식: 호텔식 / 중식: 끼꼬 비치 8품 해산물 정식 / 석식: 꾸이년 전통 해산물 핫팟",
        hotel: "꾸이년 4성급 오션뷰 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "꾸이년 로컬 재래시장 특산품 쇼핑 · 푸깟 공항 샌딩",
        description: "호텔 조식 후 여유로운 체크아웃. 꾸이년 로컬 재래시장에서 유명한 반잇라가이(Bánh ít lá gai), 마른오징어, 견과류 등 특산품을 쇼핑하고 푸깟 공항으로 이동하여 일정을 마무리합니다.",
        meal: "조식: 호텔식 / 중식: 현지 특식",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  },
  {
    id: "prod-central-vntravel-quynhon-martial-3d2n",
    title: "[꾸이년 무술&헤리티지 3일] 전설의 무술 고향 · 꽝쭝 황제 박물관 · 끼꼬 비치 & 함호 원시림 계곡 3일 (2박 3일)",
    subTitle: "떠이선 왕조의 기상 베트남 전통 무예 시연 · 함호 계곡 보트 트레킹 · 끼꼬 해변과 옥호아 정사 쌍불상",
    category: "자유여행",
    region: "중부",
    city: "꾸이년",
    priceKRW: 269000,
    priceVND: 3890000,
    duration: "2박 3일",
    imageUrl: "https://dulichvntravel.com/files/product/huyen-thoai-mien-dat-vo-quy-nhon-zuimwxqn.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/huyen-thoai-mien-dat-vo-quy-nhon-zuimwxqn.jpg"
    ],
    galleryImages: [
      "https://dulichvntravel.com/files/product/huyen-thoai-mien-dat-vo-quy-nhon-zuimwxqn.jpg",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 26,
    isPopular: false,
    isHotDeal: false,
    discountPercent: 5,
    departureCities: ["꾸이년 푸깟 공항", "호치민/하노이 경유", "인천"],
    tags: ["#무술의고향", "#꽝쭝박물관", "#함호생태국립공원", "#끼꼬해변", "#참파탑도이", "#자유여행"],
    description: "베트남 역사의 영웅 꽝쭝 황제와 떠이선 전통 무예의 본고장 꾸이년의 깊이 있는 역사와 때묻지 않은 자연을 만나는 테마 투어입니다. 웅장한 북소리와 함께 펼쳐지는 전통 무술 시연을 관람하고, 거대한 기암괴석과 원시림 사이를 흐르는 함호(Hầm Hô) 계곡에서 나룻배를 탑니다. 아름다운 끼꼬 해변과 옥호아 정사의 황금 쌍불상까지 알차게 즐깁니다.",
    highlights: [
      "베트남 전통 무술의 발상지 떠이선 꽝쭝(Quang Trung) 황제 박물관 및 무술 시연",
      "신비한 원시림과 에메랄드빛 계곡 함호(Hầm Hô) 대나무 보트 유람",
      "끼꼬 해변 스피드보트 & 에오조 절벽길 산책",
      "천년의 세월을 간직한 참파 왕국의 탑도이(Tháp Đôi) 유적",
      "티엔흥(Thiên Hưng) 사원의 아름다운 동양 건축과 정원"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "떠이선 무술 헤리티지 & 함호 원시림 계곡 탐방",
    included: [
      "전용 차량 및 전문 기사",
      "꾸이년 시내 4성급 호텔 (2인 1실)",
      "전 일정 식사 및 전통 특식",
      "관광지 입장료 및 무술 시연 관람료, 함호 보트 승선권",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "항공권",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "꾸이년 도착 · 티엔흥 사원 · 참파 왕국 쌍탑(탑도이) · 겐랑 띠엔사 해변",
        description: "푸깟 공항 도착 후 가이드 미팅. 고즈넉한 티엔흥 사원을 둘러보고 참파 왕국 쌍탑 탑도이와 겐랑 띠엔사 해변의 황란 여왕 비치를 산책합니다. 시내 호텔에 체크인합니다.",
        meal: "중식: 현지 쌀국수 / 석식: 꾸이년 해변식",
        hotel: "꾸이년 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "끼꼬 해변 스피드보트 & 스노클링 · 에오조 해안 절벽로 · 옥호아 정사 초대형 쌍불상",
        description: "조식 후 스피드보트로 끼꼬 해변으로 이동하여 산호초 스노클링을 즐깁니다. 해산물 런치 후 절벽 해안길 에오조를 걷고 바다를 굽어보는 높이 30m의 옥호아 정사 황금 쌍불상을 참배합니다.",
        meal: "조식: 호텔식 / 중식: 끼꼬 해산물식 / 석식: 로컬 특식",
        hotel: "꾸이년 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "떠이선 꽝쭝 황제 박물관 & 전통 무예 관람 · 함호 생태지구 계곡 숲길 트레킹 · 공항 샌딩",
        description: "조식 후 체크아웃. 떠이선으로 이동해 꽝쭝 박물관에서 300년 된 타마린드 나무와 고대 우물을 둘러보고, 웅장한 전통 북 공연과 베트남 고유 무예 시연을 관람합니다. 이어 울창한 원시림 함호 생태지구에서 나룻배를 타고 계곡 숲길을 산책한 후 공항으로 이동합니다.",
        meal: "조식: 호텔식 / 중식: 함호 계곡 민물 생선 & 토종닭 특식",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  },
  {
    id: "prod-central-vntravel-danang-cu-lao-cham-3d2n",
    title: "[다낭/참섬스노클링 3일] 유네스코 생물권보전지역 참섬(Cu Lao Cham) 호핑투어 & 호이안 낭만 야경 3일 (2박 3일)",
    subTitle: "청정 에메랄드 바다 참섬 스피드보트 & 산호 스노클링 · 신선한 해산물 런치 · 호이안 고도시 투본강 소원배",
    category: "자유여행",
    region: "중부",
    city: "호이안",
    priceKRW: 189000,
    priceVND: 2590000,
    duration: "2박 3일",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://dulichvntravel.com/files/product/da-nang-son-tra-cu-lao-cham-rung-dua-bay-mau-hoi-an-lskswlq8.jpg",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/da-nang-son-tra-cu-lao-cham-rung-dua-bay-mau-hoi-an-lskswlq8.jpg",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 38,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 8,
    departureCities: ["다낭 국제공항", "다낭/호이안 호텔", "인천", "부산"],
    tags: ["#참섬", "#쿠라오참", "#호핑투어", "#스노클링", "#호이안소원배", "#미케비치", "#자유여행"],
    description: "유네스코 세계생물권보전지역으로 지정된 다낭-호이안 앞바다의 청정 산호섬 참섬(Cù Lao Chàm)에서 환상적인 스노클링과 해양 레저를 즐기는 힐링 코스입니다. 쾌속 스피드보트로 섬에 도착하여 바이총 해변에서 형형색색의 산호초와 열대어를 만나고, 신선한 해산물 바비큐 점심을 즐깁니다. 저녁에는 유네스코 호이안 올드타운의 따뜻한 등불 야경과 소원배를 체험합니다.",
    highlights: [
      "유네스코 세계생물권보전지역 끄라오참(참섬) 스피드보트 & 바다 스노클링",
      "참섬 해양보호구역 산호초 관찰 및 해변 해먹 휴식",
      "해산물 로컬 바비큐 런치 제공",
      "호이안 올드타운 풍등 거리 & 투본강 소원초 나룻배",
      "다낭 마블마운틴(오행산) 절경 조망"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 & 고속 스피드보트",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "참섬 에메랄드 스노클링 & 호이안 낭만 야경",
    included: [
      "전용 차량 및 참섬 왕복 고속 스피드보트",
      "다낭 또는 호이안 4성급 호텔 (2인 1실)",
      "전 일정 식사 (호텔 조식, 참섬 해산물 BBQ 등)",
      "스노클링 장비 (구명조끼, 수경, 스노클) 및 해양보존구역 환경세",
      "호이안 구시가지 입장료 및 소원배 탑승권",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "항공권",
      "스쿠버 다이빙 / 씨워커 선택 이용료",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "다낭 도착 · 호텔 체크인 & 미케비치 자유 휴식 · 한강 크루즈 야경",
        description: "다낭 공항 도착 후 가이드 미팅. 호텔 체크인 후 세계 6대 해변으로 꼽히는 미케비치에서 여유롭게 휴식하고, 저녁에는 한강 유람선에 탑승해 다낭의 화려한 교량 야경을 감상합니다.",
        meal: "중식: 현지 쌀국수 / 석식: 다낭 씨푸드 레스토랑",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "끄다이 항구 출발 · 참섬(Cù Lao Chàm) 스피드보트 · 산호초 스노클링 & 해산물 중식 · 호이안 올드타운 풍등 야경",
        description: "호텔 조식 후 끄다이 항구로 이동하여 스피드보트에 승선합니다. 참섬에 도착하여 바이랑 어촌마을과 해양보호구역 전시관을 둘러본 뒤, 바이총 해변 앞바다에서 신나는 산호초 스노클링을 즐깁니다. 해산물 런치 후 호이안으로 이동하여 밤하늘을 수놓는 풍등 거리와 투본강 소원배를 즐깁니다.",
        meal: "조식: 호텔식 / 중식: 참섬 해산물 정식 / 석식: 호이안 모닝글로리 전통식",
        hotel: "호이안 4성급 리조트 또는 다낭 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "오행산(마블마운틴) 동굴사원 · 다낭 대성당 · 한시장 쇼핑 · 공항 샌딩",
        description: "조식 후 체크아웃. 오행산에 들러 천연 동굴사원을 둘러보고 핑크빛 다낭 대성당과 한시장에서 망고젤리, 베트남 커피, 견과류 등을 쇼핑한 후 공항으로 이동하여 귀국합니다.",
        meal: "조식: 호텔식 / 중식: 다낭 반쎄오 맛집",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  },
  {
    id: "prod-central-vntravel-hue-heritage-royal-3d2n",
    title: "[후에/황실헤리티지 3일] 유네스코 세계문화유산 후에 황궁 · 카이딘 왕릉 · 티엔무 사원 & 흐엉강 선상 디너 3일 (2박 3일)",
    subTitle: "베트남 마지막 황제들의 숨결 · 후에 궁중 의복 체험 & 흐엉강 드래곤보트 · 왕실 약선요리 특식",
    category: "자유여행",
    region: "중부",
    city: "후에",
    priceKRW: 215000,
    priceVND: 2990000,
    duration: "2박 3일",
    imageUrl: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/da-nang-ba-na-hue-dong-phong-nha-thien-duong-ykquuzvo.jpg",
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/da-nang-ba-na-hue-dong-phong-nha-thien-duong-ykquuzvo.jpg"
    ],
    rating: 4.9,
    reviewCount: 31,
    isPopular: false,
    isHotDeal: false,
    discountPercent: 5,
    departureCities: ["후에 푸바이 공항", "다낭 국제공항", "인천", "부산"],
    tags: ["#후에황궁", "#티엔무사원", "#카이딘릉", "#뜨득릉", "#흐엉강선상디너", "#황실요리", "#자유여행"],
    description: "베트남의 천년 역사와 찬란한 황실 문화가 살아 숨 쉬는 고도(古都) 후에를 가장 깊이 있게 만나는 헤리티지 투어입니다. 유네스코 세계문화유산인 후에 황궁(대내)의 웅장한 궁궐 건축을 탐방하고, 아름다운 흐엉강에서 드래곤 보트를 타며 선상 디너와 전통 궁중 음악을 감상합니다. 예술적 극치를 보여주는 카이딘 황제릉과 알록달록한 투이쑤언 향마을까지 품격 있는 여정을 제공합니다.",
    highlights: [
      "응우옌 왕조의 웅장한 수도 후에 대내(황궁) 정문 오문, 태화전, 자금성",
      "서양 바로크와 동양 건축이 어우러진 걸작 카이딘 황제릉",
      "흐엉강 강변 7층 팔각탑 티엔무 사원",
      "흐엉강 용선(Dragon Boat) 승선 & 후에 궁중음악 냐냑 감상",
      "정통 후에 황실 만찬 코스요리"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "유네스코 고도 후에 황실 헤리티지 완벽 답사",
    included: [
      "전용 차량 및 전담 기사",
      "후에 4성급 헤리티지 호텔 (2인 1실)",
      "전 일정 식사 (호텔 조식, 후에 황실 궁중 만찬, 흐엉강 선상식 등)",
      "모든 유적지 입장료 (황궁, 티엔무 사원, 카이딘 릉, 뜨득 릉)",
      "흐엉강 용선 보트 탑승료",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "항공권",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "다낭 또는 후에 공항 도착 · 후에 시내 호텔 체크인 · 흐엉강 용선 유람 & 선상 디너",
        description: "공항 도착 후 가이드 미팅. 고도 후에 호텔 체크인 후 해 질 녘 흐엉강에서 화려한 베트남 전통 용선(Dragon Boat)에 올라 티엔무 사원을 바라보며 낭만적인 선상 디너와 전통 궁중 음악을 감상합니다.",
        meal: "중식: 후에 현지식 / 석식: 흐엉강 선상 궁중 디너",
        hotel: "후에 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "유네스코 후에 황궁(대내) 집중 탐방 · 티엔무 사원 · 카이딘 황제릉 · 뜨득 황제릉",
        description: "호텔 조식 후 응우옌 왕조의 중심인 후에 대내(오문, 태화전, 현림각, 자금성)를 전문 가이드의 해설과 함께 집중 답사합니다. 오후에는 7층 팔각탑 티엔무 사원과 정교한 유리 도자기 모자이크로 장식된 카이딘 황제릉, 시적이고 고즈넉한 연못을 품은 뜨득 황제릉을 차례로 둘러봅니다.",
        meal: "조식: 호텔식 / 중식: 후에 전통 궁중요리 한상 / 석식: 분보후에 특미",
        hotel: "후에 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "동바 전통시장 특산품 쇼핑 · 투이쑤언 향마을 사진 촬영 · 공항 샌딩",
        description: "조식 후 체크아웃. 활기찬 동바 전통시장에서 후에 특산 연꽃씨, 차, 전통 자수를 쇼핑하고, 무지갯빛 향다발이 늘어선 감성 명소 투이쑤언(Thủy Xuân) 향마을에서 예쁜 인생 사진을 남긴 뒤 공항으로 이동하여 일정을 마칩니다.",
        meal: "조식: 호텔식 / 중식: 로컬 특식",
        hotel: "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T04:00:00.000Z"
  }
];

function updateJsonFiles() {
  const jsonFiles = [
    path.resolve('stored_products.json'),
    path.resolve('src/data/stored_products.json'),
    path.resolve('stored_products.backup.json')
  ];

  for (const file of jsonFiles) {
    if (fs.existsSync(file)) {
      const existing = JSON.parse(fs.readFileSync(file, 'utf8'));
      const existingIds = new Set(existing.map((p) => p.id));
      const toAdd = CENTRAL_VIETNAM_TOURS.filter((ct) => !existingIds.has(ct.id));
      const updated = [...existing, ...toAdd];
      fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
      console.log(`Updated ${file}: now has ${updated.length} products (added ${toAdd.length} central tours)`);
    }
  }
}

updateJsonFiles();
