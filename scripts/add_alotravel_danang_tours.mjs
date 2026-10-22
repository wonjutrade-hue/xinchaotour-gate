import fs from 'fs';
import path from 'path';

export const ALOTRAVEL_DANANG_TOURS = [
  {
    id: "prod-central-alotravel-01-danang-bana-hoian-3n5d",
    title: "[다낭/호이안/바나힐 3박5일] 한국인 맞춤 야간비행 플랜 · 바나힐 골든브릿지 · 호이안 유네스코 고도시 & 미케비치 힐링 (ALO-01)",
    subTitle: "✈️ 늦은 밤 다낭 도착 & 마지막 날 늦은 밤 출발 안심 케어! 바나힐 신의 손 골든브릿지 · 호이안 풍등 야경 & 투본강 소원배 · 체크아웃 스파 쇼핑 투어",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 239000,
    priceVND: 3350000,
    duration: "3박 5일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 54,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO01", "#다낭베스트셀러", "#바나힐골든브릿지", "#호이안올드타운", "#미케비치", "#한국인야간비행패턴", "#3박5일", "#자유여행"],
    description: "Alo Travel의 가장 사랑받는 다낭·호이안 정통 베스트셀러 투어(ALO-01)를 한국인 밤 비행기 일정에 맞춰 완성한 3박 5일 코스입니다. 첫날 늦은 밤 다낭 공항에 도착하면 전담 가이드가 편안하게 호텔로 모셔 푹 쉴 수 있도록 케어해 드립니다. 해발 1,487m 바나힐 정상에서 신비로운 골든브릿지와 프랑스 고성 마을을 만끽하고, 유네스코 호이안 올드타운의 따뜻한 오색 풍등과 투본강 소원배를 즐깁니다. 마지막 날은 12시 체크아웃 투어로 핑크성당, 한시장/롯데마트 쇼핑, 90분 VIP 스파 마사지, 다낭 해산물 만찬을 즐긴 후 늦은 밤 공항으로 여유롭게 이동합니다.",
    highlights: [
      "한국인 최선호 야간 비행 스케줄 100% 최적화 (첫날 심야 픽업 + 마지막 날 심야 샌딩)",
      "바나힐(Bà Nà Hills) 세계 최장 케이블카 & 신의 손 '골든브릿지' 인생 사진 촬영",
      "유네스코 세계문화유산 호이안(Hội An) 고도시 구시가지, 내원교, 투본강 소원초 띄우기",
      "손짜반도 린응사 67m 동양 최대 해수관음상 & 오행산(마블마운틴) 동굴사원 탐방",
      "마지막 날 12:00 체크아웃 투어 + 한시장/롯데마트 쇼핑 + 90분 VIP 전신 힐링 스파 마사지(샤워 완비)",
      "다낭 용다리(Cầu Rồng) 및 한강변 사랑의 부두 로맨틱 야경 감상",
      "다낭 미케비치 신선 해산물 만찬 & 호이안 전통 반쎄오/화이트로즈 특식"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "다낭 & 호이안 낭만 힐링 베스트셀러 (ALO-01)",
    included: [
      "한국인 맞춤 전 일정 전용 차량 (첫날 늦은 밤 픽업 + 투어 + 마지막 날 늦은 밤 샌딩)",
      "다낭 시내/비치 4성급 호텔 3박 (2인 1실, 매일 조식 포함)",
      "일정표 내 명시된 식사 (호텔 조식 3회, 바나힐 뷔페식, 호이안 특미, 다낭 해산물 만찬 등)",
      "바나힐 케이블카 왕복 이용권 및 국립공원 입장료",
      "호이안 고도시 통합 입장권 및 투본강 소원배 탑승권",
      "마지막 날 90분 VIP 전신 아로마 힐링 마사지 (개별 샤워 가능)",
      "매일 생수(1인 1병) 및 물티슈, 현지 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "왕복 항공권 (요청 시 최저가 항공권 발권 대행 가능)",
      "바나힐 밀랍인형 박물관 등 일부 선택 유료 시설",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤(심야) 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "인천 또는 부산 국제공항에서 저녁 비행기로 출발하여, 다낭 국제공항에 늦은 밤(심야 21:00~00:30)에 도착합니다. 입국장 밖에서 신짜오투어 전용 피켓을 든 전담 한국어 가이드 및 전용 기사와 반갑게 미팅합니다. 전용 에어컨 리무진 차량으로 호텔로 이동하여 신속하게 체크인을 마치고 첫날 밤 편안한 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 특급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "호텔 조식 ➔ 바나힐 케이블카 & 골든브릿지 신의 손 ➔ 프랑스 마을 & 루지 ➔ 미케비치 & 한강 용다리 야경",
        description: "호텔 조식 후 바나힐로 이동하여 기네스북 등재 세계 최장 케이블카에 탑승합니다. 구름 위 거대한 두 손이 다리를 받치고 있는 경이로운 골든 브릿지에서 인생샷을 남기고 프랑스 중세 고성 마을과 지하 판타지 파크, 알파인 코스터 루지를 자유롭게 만끽합니다. 오후에는 미케비치로 내려와 시원한 파도를 바라보며 커피 한잔의 여유를 즐기고, 저녁에는 용다리와 사랑의 부두 야경을 감상합니다.",
        meal: "조식: 호텔 뷔페식 / 중식: 바나힐 인터내셔널 뷔페 / 석식: 다낭 마담란 베트남 정식",
        hotel: "다낭 4성급 특급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "손짜반도 린응사(해수관음상) ➔ 오행산(마블마운틴) 동굴사원 ➔ 호이안 유네스코 올드타운 풍등거리 & 소원배",
        description: "호텔 조식 후 손짜반도 영응사(린응사)에 올라 67m 해수관음상과 다낭 미케비치 전경을 감상합니다. 대리석으로 이루어진 신비로운 오행산의 현공동굴과 전망대를 관람한 후 호이안으로 이동합니다. 유네스코 고도시 호이안 올드타운에서 일본다리(내원교), 풍흥고가를 둘러보고, 해 질 녘 수천 개의 풍등이 빛나는 투본강에서 촛불 소원배를 띄웁니다.",
        meal: "조식: 호텔 뷔페식 / 중식: 다낭 로컬식 / 석식: 호이안 화이트로즈 & 모닝글로리 전통식",
        hotel: "다낭 4성급 특급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "체크아웃 투어 ➔ 핑크성당 ➔ 한시장 & 롯데마트 쇼핑 ➔ 90분 VIP 힐링 스파 ➔ 해산물 만찬 ➔ 늦은 밤 공항 출발",
        description: "여유로운 조식 후 12:00 체크아웃합니다. 짐은 전용 투어 차량에 안전하게 싣고 체크아웃 투어를 시작합니다. 프랑스풍 분홍빛 다낭 대성당(핑크성당)을 관람하고, 한시장과 롯데마트에서 아오자이, 건망고, 베트남 커피, 라탄백 등을 쇼핑합니다. 여행의 피로를 풀어주는 90분 VIP 힐링 전신 아로마 마사지(개별 샤워 가능)를 받은 후, 푸짐한 다낭 해산물 만찬을 즐깁니다. 21:30~22:30 다낭 공항으로 이동하여 가이드 인솔 하에 안심 출국 수속을 마치고 늦은 밤 비행기에 탑승합니다.",
        meal: "조식: 호텔 뷔페식 / 중식: 냐벱 반쎄오 맛집 / 석식: 다낭 씨푸드 해산물 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 5,
        title: "새벽/이른 아침 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "밤새 기내에서 편안히 숙면을 취한 후, 이른 아침(06:00~08:30) 인천 또는 부산 국제공항에 도착합니다. 입국 수속 및 수하물 수령 후 행복하고 소중한 추억을 가득 안고 따뜻한 집으로 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  },
  {
    id: "prod-central-alotravel-02-danang-cu-lao-cham-3n5d",
    title: "[다낭/참섬스노클링&바나힐 3박5일] 한국인 맞춤 야간비행 플랜 · 에메랄드 참섬 스노클링 · 바나힐 신의손 & 호이안 풍등 (ALO-02)",
    subTitle: "✈️ 야간 비행기 맞춤 3박 5일 풀코스! 청정 참섬(Cù Lao Chàm) 스피드보트 & 산호초 호핑 · 바나힐 골든브릿지 · 호이안 소원배 · 체크아웃 스파 샌딩",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 249000,
    priceVND: 3450000,
    duration: "3박 5일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 46,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 8,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO02", "#참섬스노클링", "#쿠라오참", "#바나힐", "#호이안소원배", "#3박5일", "#한국인야간비행패턴", "#자유여행"],
    description: "유네스코 세계생물권보전지역인 청정 산호섬 '참섬(Cù Lao Chàm)'의 투명한 바다 스노클링과 바나힐 골든브릿지, 호이안 고도시를 함께 묶은 Alo Travel의 ALO-02 정품 투어입니다. 늦은 밤 다낭 공항 도착부터 마지막 날 늦은 밤 공항 샌딩까지 한국인 비행 패턴에 맞춰 완벽하게 진행됩니다. 쾌속 스피드보트로 참섬에 도착하여 열대어와 산호초를 감상하고 섬 특산 해산물 점심을 즐긴 뒤 호이안 야간 풍등거리와 바나힐 케이블카를 누립니다.",
    highlights: [
      "유네스코 세계생물권보전지역 참섬(Cù Lao Chàm) 스피드보트 & 산호초 스노클링",
      "바나힐(Bà Nà Hills) 해발 1,487m 국립공원 케이블카 & 신의 손 골든브릿지",
      "유네스코 호이안 올드타운 풍등거리 야경 & 투본강 나룻배 소원초 띄우기",
      "손짜반도 린응사 67m 해수관음상 & 오행산 마블마운틴 동굴",
      "마지막 날 12시 체크아웃 투어 + 한시장 쇼핑 + 90분 VIP 스파 마사지 + 공항 샌딩"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 & 고속 스피드보트",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "참섬 에메랄드 스노클링 & 바나힐 호이안 힐링 (ALO-02)",
    included: [
      "한국인 맞춤 전 일정 전용 차량 (첫날 심야 픽업 + 투어 + 마지막 날 심야 샌딩)",
      "참섬 왕복 고속 스피드보트 및 스노클링 장비 일체(마스크, 구명조끼, 오리발)",
      "다낭 4성급 호텔 3박 (조식 포함)",
      "바나힐 케이블카 왕복권 및 입장료, 호이안 통합권 및 소원배",
      "전 일정 식사 (호텔 조식 3회, 참섬 해산물 BBQ, 바나힐 뷔페 등)",
      "마지막 날 90분 VIP 힐링 전신 마사지",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "왕복 항공권",
      "씨워커(Sea Walker) 선택 체험",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 다낭 공항에 도착합니다. 가이드 미팅 후 전용 리무진으로 호텔로 이동하여 체크인 후 편안히 숙면합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "끄다이 항구 출발 ➔ 참섬(Cù Lao Chàm) 스피드보트 ➔ 산호초 스노클링 & 해산물 중식 ➔ 호이안 올드타운 풍등 야경",
        description: "호텔 조식 후 끄다이 항구로 이동하여 스피드보트를 타고 청정 참섬으로 출항합니다. 산호초가 화려한 포인트에서 스노클링을 즐기고 신선한 섬 해산물 바비큐 점심을 맛봅니다. 오후에 호이안으로 이동하여 고도시를 산책하고 해 질 녘 투본강에서 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 참섬 해산물 BBQ 특식 / 석식: 호이안 전통 정식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "바나힐 국립공원 케이블카 ➔ 골든브릿지 신의 손 ➔ 프랑스 마을 판타지 파크 ➔ 미케비치 산책",
        description: "조식 후 바나힐로 이동하여 케이블카에 탑승합니다. 골든브릿지와 프랑스 고성 마을, 꽃정원, 루지를 자유롭게 즐기고 다낭으로 돌아와 미케비치를 산책합니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 다낭 마담란 베트남식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "체크아웃 투어 ➔ 손짜반도 린응사 ➔ 오행산 ➔ 한시장 쇼핑 ➔ 90분 VIP 스파 ➔ 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 12:00 체크아웃. 짐을 전용 차량에 싣고 손짜반도 해수관음상과 오행산을 관람합니다. 한시장에서 특산품을 쇼핑하고 90분 VIP 전신 마사지로 피로를 푼 뒤 해산물 만찬을 즐기고 늦은 밤 다낭 공항으로 이동하여 출국 비행기에 탑승합니다.",
        meal: "조식: 호텔식 / 중식: 현지 쌀국수 / 석식: 다낭 해산물 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 5,
        title: "새벽 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "기내 숙면 후 이른 아침 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  },
  {
    id: "prod-central-alotravel-03-danang-hoian-hue-3n5d",
    title: "[다낭/호이안/고도 후에 3박5일] 한국인 맞춤 야간비행 플랜 · 고도 후에 황궁 & 바나힐 · 호이안 유네스코 문화유산 답사 (ALO-03)",
    subTitle: "✈️ 야간 비행기 맞춤 3박 5일 헤리티지! 베트남 마지막 응우옌 왕조 황궁 대내 · 바나힐 골든브릿지 · 호이안 풍등거리 & 체크아웃 스파",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 285000,
    priceVND: 4000000,
    duration: "3박 5일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 41,
    isPopular: false,
    isHotDeal: false,
    discountPercent: 7,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO03", "#후에황궁", "#바나힐", "#호이안올드타운", "#티엔무사원", "#카이딘릉", "#3박5일", "#자유여행"],
    description: "베트남 중부의 2대 유네스코 세계문화유산인 고도 후에 황궁과 호이안 올드타운, 그리고 현대적인 바나힐 골든브릿지를 3박 5일로 압축 정복하는 Alo Travel의 ALO-03 정품 투어입니다. 늦은 밤 다낭 공항 도착 시 단독 픽업으로 편안하게 휴식하고, 다음 날 웅장한 바나힐과 호이안을 거쳐 하이반 고개를 넘어 고도 후에로 향합니다. 응우옌 왕조의 황궁 대내와 카이딘 왕릉을 깊이 있게 답사하고 마지막 날 체크아웃 스파 쇼핑 후 늦은 밤 공항으로 샌딩됩니다.",
    highlights: [
      "한국인 맞춤 야간비행 3박 5일 안심 케어 (심야 픽업 + 심야 샌딩)",
      "유네스코 세계문화유산 후에 대내(Đại Nội) 황궁 & 카이딘 황제릉 답사",
      "흐엉강 강변 7층 팔각탑 티엔무 사원(Chùa Thiên Mụ) 관람",
      "바나힐 케이블카 & 신의 손 골든브릿지 파노라마",
      "호이안 고도시 투본강 소원배 & 오색 풍등거리 야간 투어",
      "마지막 날 12시 체크아웃 투어 + 90분 VIP 스파 마사지 + 디너 만찬"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "다낭 & 호이안 & 고도 후에 헤리티지 일주 (ALO-03)",
    included: [
      "전 일정 전용 차량 (첫날 심야 픽업 + 투어 + 마지막 날 심야 샌딩)",
      "4성급 호텔 3박 (다낭 2박 + 후에 1박, 조식 포함)",
      "전 일정 식사 (호텔 조식 3회, 바나힐 뷔페, 후에 궁중요리 등)",
      "후에 황궁 대내, 카이딘 릉, 티엔무 사원, 바나힐 케이블카, 호이안 통합권",
      "마지막 날 90분 VIP 힐링 전신 마사지",
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
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 다낭 공항에 도착합니다. 가이드 미팅 후 전용 리무진으로 호텔로 이동하여 체크인 후 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "바나힐 골든브릿지 & 케이블카 ➔ 호이안 유네스코 올드타운 & 투본강 소원배 야경",
        description: "조식 후 바나힐로 이동하여 케이블카를 타고 골든브릿지와 프랑스 마을을 관람합니다. 오후에는 호이안으로 이동하여 일본다리와 구시가지를 둘러보고 저녁에 투본강에서 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 호이안 전통식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "하이반 고개 드라이브 ➔ 고도 후에 이동 ➔ 유네스코 후에 대내 황궁 ➔ 티엔무 사원 & 카이딘 릉",
        description: "조식 후 하이반 고개를 넘어 고도 후에로 이동합니다. 13대 황제가 다스렸던 후에 대내 황궁과 흐엉강변의 티엔무 사원, 동서양 양식이 융합된 카이딘 황제릉을 둘러본 뒤 후에 시내 호텔에 체크인합니다.",
        meal: "조식: 호텔식 / 중식: 후에 전통 궁중요리 / 석식: 후에 분보후에 특식",
        hotel: "후에 4성급 헤리티지 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "체크아웃 투어 ➔ 다낭 귀환 ➔ 핑크성당 ➔ 한시장 쇼핑 ➔ 90분 VIP 스파 ➔ 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 체크아웃. 하이반 터널을 지나 다낭으로 복귀하여 핑크성당과 한시장에서 기념품을 쇼핑합니다. 90분 VIP 전신 마사지로 피로를 풀고 다낭 해산물 만찬을 즐긴 뒤 늦은 밤 공항으로 이동합니다.",
        meal: "조식: 호텔식 / 중식: 랑코 해변식 / 석식: 다낭 씨푸드 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 5,
        title: "새벽 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "기내 숙면 후 이른 아침 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  },
  {
    id: "prod-central-alotravel-04-danang-nui-than-tai-3n5d",
    title: "[다낭/누이탄타이 온천/바나힐 3박5일] 한국인 맞춤 야간비행 플랜 · 누이탄타이 천연온천 워터파크 & 바나힐 · 호이안 힐링 (ALO-04)",
    subTitle: "✈️ 야간 비행기 최적화 3박 5일 웰니스 힐링! 누이탄타이(Núi Thần Tài) 온천 국립공원 미네랄 온천욕 & 머드온천 · 바나힐 골든브릿지 · 체크아웃 스파",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 295000,
    priceVND: 4190000,
    duration: "3박 5일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 38,
    isPopular: false,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO04", "#누이탄타이", "#천연온천", "#바나힐", "#호이안풍등", "#온천워터파크", "#3박5일", "#자유여행"],
    description: "바나산 국립공원 자락에 위치한 다낭 최고의 천연 온천 테마파크 '누이탄타이(Núi Thần Tài)'에서 천연 미네랄 온천욕과 일본식 온천달걀, 머드 스파, 워터파크를 즐기고 바나힐 골든브릿지와 호이안 올드타운을 엮은 Alo Travel의 ALO-04 웰니스 힐링 투어입니다. 늦은 밤 다낭 공항 도착부터 마지막 날 늦은 밤 샌딩까지 완벽하게 전담 가이드가 풀케어합니다.",
    highlights: [
      "누이탄타이(Núi Thần Tài) 천연 미네랄 유황 온천욕 & 자연 속 워터파크",
      "온천수로 삶은 일본식 온천 달걀 체험 & 롱띠엔 동굴 관람",
      "바나힐(Bà Nà Hills) 골든브릿지 신의 손 & 프랑스 테마파크",
      "호이안 고도시 투본강 소원배 & 낭만 풍등 야간 투어",
      "마지막 날 12시 체크아웃 투어 + 한시장 쇼핑 + 90분 VIP 스파 마사지 + 공항 샌딩"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "누이탄타이 온천 웰니스 & 바나힐 호이안 힐링 (ALO-04)",
    included: [
      "한국인 맞춤 전 일정 전용 차량 (첫날 심야 픽업 + 투어 + 마지막 날 심야 샌딩)",
      "다낭 4성급 호텔 3박 (조식 포함)",
      "누이탄타이 온천 테마파크 통합 입장권 및 온천욕",
      "바나힐 케이블카 왕복권 및 호이안 통합권/소원배",
      "전 일정 식사 (호텔 조식 3회, 온천 뷔페, 바나힐 뷔페, 해산물 만찬 등)",
      "마지막 날 90분 VIP 힐링 전신 마사지",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "항공권",
      "누이탄타이 프리미엄 머드탕/우유탕 선택 이용료",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 다낭 공항에 도착합니다. 가이드 미팅 후 전용 리무진으로 호텔로 이동하여 체크인 후 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "누이탄타이(Núi Thần Tài) 온천 국립공원 ➔ 천연 미네랄 온천욕 & 워터파크 ➔ 온천달걀 체험 ➔ 호이안 올드타운 풍등 야경",
        description: "조식 후 누이탄타이 온천 테마파크로 이동합니다. 피로를 풀어주는 천연 미네랄 온천욕과 유황 노천탕, 파도풀 워터파크를 즐기고 온천수로 삶은 달걀을 맛봅니다. 오후에 호이안으로 이동하여 고도시 풍등 거리를 산책하고 투본강에서 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 누이탄타이 뷔페식 / 석식: 호이안 전통 정식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "바나힐 국립공원 케이블카 ➔ 골든브릿지 신의 손 ➔ 프랑스 마을 판타지 파크 ➔ 미케비치",
        description: "조식 후 바나힐로 이동하여 케이블카를 타고 골든브릿지와 프랑스 마을, 루지를 즐깁니다. 미케비치 해변 카페에서 휴식을 취합니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 다낭 마담란 베트남 정식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "체크아웃 투어 ➔ 핑크성당 ➔ 한시장 쇼핑 ➔ 90분 VIP 스파 ➔ 해산물 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 12:00 체크아웃. 짐을 싣고 핑크성당과 한시장 쇼핑 후 90분 VIP 전신 마사지로 피로를 풉니다. 해산물 만찬을 즐긴 뒤 늦은 밤 공항으로 이동하여 출국합니다.",
        meal: "조식: 호텔식 / 중식: 현지 쌀국수 / 석식: 다낭 씨푸드 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 5,
        title: "새벽 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "기내 숙면 후 이른 아침 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  },
  {
    id: "prod-central-alotravel-05-danang-cu-lao-cham-4n6d",
    title: "[다낭/호이안/바나힐/참섬 4박6일] 한국인 맞춤 야간비행 플랜 · 청정 참섬 스노클링 · 바나힐 골든브릿지 & 호이안 여유일주 (ALO-05)",
    subTitle: "✈️ 야간 비행기 맞춤 4박 6일 여유 일주! 유네스코 참섬 스노클링 & 깜탄 코코넛 바구니배 · 바나힐 골든브릿지 · 체크아웃 스파 쇼핑",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 305000,
    priceVND: 4290000,
    duration: "4박 6일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 49,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 8,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO05", "#4박6일", "#참섬스노클링", "#깜탄바구니배", "#바나힐", "#호이안올드타운", "#한국인야간비행패턴", "#자유여행"],
    description: "Alo Travel의 인기 4일 코스(ALO-05)를 한국인 밤 비행 스케줄에 맞춰 여유로운 4박 6일로 확장한 프리미엄 패키지입니다. 참섬의 아름다운 산호초 스노클링뿐 아니라 울창한 깜탄 코코넛 숲에서 흥겨운 바구니배(Thuyền Thúng) 체험까지 모두 포함되어 있습니다. 바나힐 골든브릿지와 호이안 올드타운 풍등 야경, 미케비치 자유 시간까지 알차게 즐긴 후 늦은 밤 출국합니다.",
    highlights: [
      "한국인 최선호 야간 비행 스케줄 100% 최적화 (첫날 심야 픽업 + 마지막 날 심야 샌딩)",
      "유네스코 참섬(Cù Lao Chàm) 스피드보트 & 산호초 스노클링",
      "깜탄 코코넛숲 전통 원형 바구니배 탑승 & 어부 그물 던지기 체험",
      "바나힐 국립공원 케이블카 & 신의 손 골든브릿지",
      "유네스코 호이안 올드타운 풍등거리 & 투본강 소원배",
      "마지막 날 12:00 체크아웃 투어 + 90분 VIP 스파 마사지 + 해산물 만찬"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 & 고속 스피드보트",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "참섬 스노클링 & 바구니배 & 바나힐 여유 일주 (ALO-05)",
    included: [
      "전 일정 전용 차량 (첫날 심야 픽업 + 투어 + 마지막 날 심야 샌딩)",
      "참섬 왕복 스피드보트 및 스노클링 장비 일체, 코코넛 바구니배 탑승권",
      "다낭 4성급 호텔 4박 (조식 포함)",
      "바나힐 케이블카 왕복권 및 호이안 통합권/소원배",
      "전 일정 식사 (호텔 조식 4회, 참섬 해산물 BBQ, 바나힐 뷔페 등)",
      "마지막 날 90분 VIP 전신 힐링 마사지",
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
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 다낭 공항에 도착합니다. 가이드 미팅 후 전용 리무진으로 호텔로 이동하여 체크인 후 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "끄다이 항구 출발 ➔ 참섬(Cù Lao Chàm) 스피드보트 ➔ 산호초 스노클링 & 해산물 중식 ➔ 미케비치 휴식",
        description: "조식 후 끄다이 항구로 이동하여 스피드보트를 타고 참섬으로 향합니다. 알록달록한 산호초 스노클링을 즐기고 신선한 해산물 바비큐 점심을 즐긴 뒤 다낭으로 돌아와 미케비치에서 휴식합니다.",
        meal: "조식: 호텔식 / 중식: 참섬 해산물 BBQ / 석식: 다낭 로컬 특식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "깜탄 코코넛숲 전통 바구니배 체험 ➔ 유네스코 호이안 올드타운 & 투본강 소원배 야경",
        description: "조식 후 깜탄 코코넛 숲으로 이동하여 전통 바구니배를 타고 스릴 넘치는 스핀 쇼와 전통 그물 던지기를 체험합니다. 오후에는 호이안 올드타운으로 이동하여 구시가지를 산책하고 저녁에 투본강에서 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 호이안 로컬식 / 석식: 호이안 모닝글로리 전통식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "바나힐 국립공원 케이블카 ➔ 골든브릿지 신의 손 ➔ 프랑스 마을 판타지 파크 ➔ 한강 용다리 야경",
        description: "조식 후 바나힐로 이동하여 케이블카를 타고 골든브릿지와 프랑스 고성 마을, 루지를 즐깁니다. 저녁에는 다낭 한강변 사랑의 부두와 용다리 야경을 감상합니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 다낭 마담란 베트남 정식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 5,
        title: "체크아웃 투어 ➔ 손짜반도 린응사 ➔ 오행산 ➔ 한시장 쇼핑 ➔ 90분 VIP 스파 ➔ 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 12:00 체크아웃. 짐을 싣고 손짜반도 해수관음상과 오행산 동굴사원을 둘러봅니다. 한시장에서 특산품을 쇼핑하고 90분 VIP 마사지로 피로를 푼 뒤 해산물 만찬을 즐기고 늦은 밤 공항으로 이동하여 출국합니다.",
        meal: "조식: 호텔식 / 중식: 현지 쌀국수 / 석식: 다낭 씨푸드 해산물 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 6,
        title: "새벽 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "기내 숙면 후 이른 아침 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  },
  {
    id: "prod-central-alotravel-06-danang-hoian-hue-4n6d",
    title: "[다낭/호이안/고도 후에 4박6일] 한국인 맞춤 야간비행 플랜 · 응우옌 황궁 대내 & 바나힐 · 호이안 유네스코 그랜드 (ALO-06)",
    subTitle: "✈️ 야간 비행기 최적화 4박 6일 그랜드 헤리티지! 베트남 천년 고도 후에 황궁 & 카이딘 왕릉 · 바나힐 골든브릿지 · 호이안 풍등거리 & 체크아웃 스파",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 319000,
    priceVND: 4480000,
    duration: "4박 6일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 52,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO06", "#4박6일", "#후에황궁", "#바나힐골든브릿지", "#호이안올드타운", "#한국인야간비행패턴", "#헤리티지일주", "#자유여행"],
    description: "Alo Travel의 대표 헤리티지 투어(ALO-06)를 한국인 밤 비행 일정에 맞춘 4박 6일 풀코스입니다. 베트남 마지막 왕조의 수도 후에 대내(황궁), 카이딘 왕릉, 티엔무 사원을 여유롭게 둘러보고 바나힐 골든브릿지와 호이안 올드타운의 오색 풍등 야경까지 중부의 핵심 명소를 완벽히 답사합니다. 첫날 늦은 밤 다낭 공항 도착부터 마지막 날 체크아웃 스파 쇼핑 후 늦은 밤 샌딩까지 안전하게 모십니다.",
    highlights: [
      "한국인 맞춤 야간비행 4박 6일 안심 케어 (심야 픽업 + 심야 샌딩)",
      "유네스코 후에 황궁(대내) 오문, 태화전, 자금성 집중 답사",
      "서양 바로크와 동양미의 결합 카이딘 황제릉 & 티엔무 사원",
      "바나힐 케이블카 & 신의 손 골든브릿지",
      "호이안 고도시 투본강 소원배 & 낭만 풍등 야간 투어",
      "마지막 날 12시 체크아웃 투어 + 한시장 쇼핑 + 90분 VIP 스파 마사지 + 만찬"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "다낭 & 호이안 & 고도 후에 황궁 그랜드 일주 (ALO-06)",
    included: [
      "전 일정 전용 차량 (첫날 심야 픽업 + 투어 + 마지막 날 심야 샌딩)",
      "4성급 호텔 4박 (다낭 3박 + 후에 1박, 조식 포함)",
      "후에 황궁 대내, 카이딘 릉, 티엔무 사원, 바나힐 케이블카, 호이안 통합권/소원배",
      "전 일정 식사 (호텔 조식 4회, 바나힐 뷔페, 후에 황실 궁중요리 등)",
      "마지막 날 90분 VIP 힐링 전신 마사지",
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
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 다낭 공항에 도착합니다. 가이드 미팅 후 전용 리무진으로 호텔로 이동하여 체크인 후 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "손짜반도 린응사 ➔ 오행산(마블마운틴) ➔ 호이안 유네스코 올드타운 & 투본강 소원배 야경",
        description: "조식 후 손짜반도 해수관음상과 오행산을 둘러봅니다. 오후에 호이안으로 이동하여 구시가지의 고택들을 관람하고 밤에는 투본강에서 촛불 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 다낭 로컬식 / 석식: 호이안 화이트로즈 & 반쎄오",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "바나힐 국립공원 케이블카 ➔ 골든브릿지 신의 손 ➔ 프랑스 마을 판타지 파크 ➔ 한강 용다리 야경",
        description: "조식 후 바나힐로 이동하여 케이블카를 타고 골든브릿지와 프랑스 고성 마을, 루지를 즐깁니다. 저녁에는 다낭 한강변 사랑의 부두와 용다리 야경을 감상합니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 다낭 마담란 베트남식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "하이반 고개 드라이브 ➔ 고도 후에 이동 ➔ 후에 황궁 대내 ➔ 티엔무 사원 & 카이딘 릉",
        description: "조식 후 하이반 고개를 넘어 고도 후에로 이동합니다. 웅장한 후에 대내 황궁과 티엔무 사원, 카이딘 황제릉을 집중 답사하고 후에 호텔에 투숙합니다.",
        meal: "조식: 호텔식 / 중식: 후에 전통 궁중요리 / 석식: 후에 분보후에 특식",
        hotel: "후에 4성급 헤리티지 호텔 (2인 1실)"
      },
      {
        day: 5,
        title: "체크아웃 투어 ➔ 다낭 복귀 ➔ 핑크성당 ➔ 한시장 쇼핑 ➔ 90분 VIP 스파 ➔ 해산물 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 체크아웃. 다낭으로 돌아와 핑크성당과 한시장에서 쇼핑을 즐깁니다. 90분 VIP 전신 마사지로 피로를 푼 뒤 해산물 만찬을 즐기고 늦은 밤 공항으로 이동하여 출국합니다.",
        meal: "조식: 호텔식 / 중식: 랑코 해변식 / 석식: 다낭 씨푸드 해산물 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 6,
        title: "새벽 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "기내 숙면 후 이른 아침 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  },
  {
    id: "prod-central-alotravel-07-danang-nui-than-tai-4n6d",
    title: "[다낭/누이탄타이 온천/바나힐 4박6일] 한국인 맞춤 야간비행 플랜 · 누이탄타이 천연온천 & 바나힐 · 호이안 프리미엄 힐링 (ALO-07)",
    subTitle: "✈️ 야간 비행기 최적화 4박 6일 힐링 웰니스! 누이탄타이 천연 온천 테마파크 워터파크 & 머드욕 · 바나힐 골든브릿지 · 호이안 풍등 & 체크아웃 스파",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 325000,
    priceVND: 4580000,
    duration: "4박 6일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 36,
    isPopular: false,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO07", "#4박6일", "#누이탄타이", "#천연온천", "#바나힐", "#호이안올드타운", "#한국인야간비행패턴", "#웰니스힐링"],
    description: "다낭 천연 온천 테마파크 '누이탄타이(Núi Thần Tài)'에서의 힐링 온천욕과 바나힐 골든브릿지, 유네스코 호이안 올드타운을 여유롭게 누리는 4박 6일 프리미엄 힐링 패키지(ALO-07)입니다. 첫날 늦은 밤 다낭 공항 도착 시 단독 픽업으로 편안하게 휴식하고, 온천과 테마파크, 문화 유적을 균형 있게 탐방한 뒤 마지막 날 12시 체크아웃 투어와 90분 VIP 스파 후 늦은 밤 공항에 안전하게 탑승합니다.",
    highlights: [
      "한국인 맞춤 야간비행 4박 6일 안심 케어 (심야 픽업 + 심야 샌딩)",
      "누이탄타이 천연 미네랄 온천욕 & 워터파크 & 온천달걀 체험",
      "바나힐 케이블카 & 신의 손 골든브릿지 & 프랑스 마을 루지",
      "호이안 올드타운 풍등거리 야경 & 투본강 소원배",
      "손짜반도 린응사 67m 해수관음상 & 오행산 동굴사원",
      "마지막 날 12시 체크아웃 투어 + 한시장 쇼핑 + 90분 VIP 스파 마사지 + 해산물 만찬"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "누이탄타이 온천 웰니스 & 바나힐 호이안 4박 6일 (ALO-07)",
    included: [
      "전 일정 전용 차량 (첫날 심야 픽업 + 투어 + 마지막 날 심야 샌딩)",
      "다낭 4성급 호텔 4박 (조식 포함)",
      "누이탄타이 온천 테마파크 통합 입장권 및 온천욕",
      "바나힐 케이블카 왕복권 및 호이안 통합권/소원배",
      "전 일정 식사 (호텔 조식 4회, 온천 뷔페, 바나힐 뷔페, 해산물 만찬 등)",
      "마지막 날 90분 VIP 힐링 전신 마사지",
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
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 다낭 공항에 도착합니다. 가이드 미팅 후 전용 리무진으로 호텔로 이동하여 체크인 후 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "누이탄타이(Núi Thần Tài) 온천 테마파크 ➔ 천연 유황 온천욕 & 워터파크 ➔ 온천달걀 체험 ➔ 미케비치 야경",
        description: "조식 후 누이탄타이 온천 테마파크로 이동하여 천연 미네랄 온천욕과 워터파크, 온천 달걀을 즐깁니다. 다낭으로 돌아와 미케비치 해안 야경을 감상합니다.",
        meal: "조식: 호텔식 / 중식: 누이탄타이 뷔페식 / 석식: 다낭 마담란 베트남식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "바나힐 국립공원 케이블카 ➔ 골든브릿지 신의 손 ➔ 프랑스 고성 마을 ➔ 한강 용다리 야경",
        description: "조식 후 바나힐로 이동하여 케이블카를 타고 골든브릿지와 프랑스 마을, 루지를 즐깁니다. 저녁에는 다낭 한강변 사랑의 부두와 용다리 야경을 감상합니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 다낭 로컬 특식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "손짜반도 린응사 ➔ 오행산(마블마운틴) ➔ 유네스코 호이안 올드타운 & 투본강 소원배 야경",
        description: "조식 후 손짜반도 해수관음상과 오행산 동굴사원을 둘러봅니다. 오후에 호이안으로 이동하여 구시가지를 산책하고 밤에는 투본강에서 촛불 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 다낭 현지식 / 석식: 호이안 모닝글로리 전통식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 5,
        title: "체크아웃 투어 ➔ 핑크성당 ➔ 한시장 쇼핑 ➔ 90분 VIP 스파 ➔ 해산물 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 12:00 체크아웃. 짐을 싣고 핑크성당과 한시장에서 기념품을 쇼핑합니다. 90분 VIP 전신 마사지로 피로를 푼 뒤 해산물 만찬을 즐기고 늦은 밤 공항으로 이동하여 출국합니다.",
        meal: "조식: 호텔식 / 중식: 현지 쌀국수 / 석식: 다낭 씨푸드 해산물 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 6,
        title: "새벽 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "기내 숙면 후 이른 아침 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  },
  {
    id: "prod-central-alotravel-08-danang-hue-phongnha-4n6d",
    title: "[다낭/후에/광빈 퐁냐 4박6일] 한국인 맞춤 야간비행 플랜 · 퐁냐케방 세계자연유산 & 고도 후에 황궁 · 바나힐 그랜드일주 (ALO-08)",
    subTitle: "✈️ 야간 비행기 최적화 4박 6일 중부 대종주! 세계 최대 카르스트 퐁냐 동굴 지하강 유람 · 고도 후에 황궁 · 바나힐 골든브릿지 · 체크아웃 스파 샌딩",
    category: "자유여행",
    region: "중부",
    city: "다낭",
    priceKRW: 335000,
    priceVND: 4650000,
    duration: "4박 6일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 44,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 8,
    departureCities: ["인천", "부산", "대구", "다낭 국제공항"],
    tags: ["#ALO08", "#4박6일", "#퐁냐케방국립공원", "#퐁냐동굴", "#후에황궁", "#바나힐", "#한국인야간비행패턴", "#자유여행"],
    description: "유네스코 세계자연유산인 광빈 퐁냐-케방 국립공원의 지하강 동굴과 고도 후에 황궁, 바나힐 골든브릿지, 호이안 고도시까지 중부의 3대 세계유산을 총망라한 Alo Travel의 최고봉 투어(ALO-08)입니다. 늦은 밤 다낭 공항 도착 픽업으로 편안히 휴식하고, 손강 모터보트를 타고 거대한 퐁냐 동굴 내부를 탐험하며 후에 왕조의 화려한 궁궐을 답사합니다. 마지막 날 체크아웃 투어와 90분 VIP 스파 후 늦은 밤 공항에 안전하게 탑승합니다.",
    highlights: [
      "한국인 맞춤 야간비행 4박 6일 안심 케어 (심야 픽업 + 심야 샌딩)",
      "유네스코 세계자연유산 퐁냐-케방(Phong Nha - Kẻ Bàng) 국립공원 지하강 동굴 보트 탐험",
      "광찌 라방(La Vang) 가톨릭 대성지 순례",
      "유네스코 후에 황궁(대내) 및 카이딘 황제릉 답사",
      "바나힐 케이블카 & 신의 손 골든브릿지 파노라마",
      "호이안 올드타운 풍등거리 야경 & 투본강 소원배",
      "마지막 날 12시 체크아웃 투어 + 한시장 쇼핑 + 90분 VIP 스파 마사지 + 해산물 만찬"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 / 전용 투어 차량",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "퐁냐케방 국립공원 & 고도 후에 황궁 대종주 (ALO-08)",
    included: [
      "전 일정 전용 차량 (첫날 심야 픽업 + 투어 + 마지막 날 심야 샌딩)",
      "4성급 호텔 4박 (다낭 2박 + 후에 2박, 조식 포함)",
      "퐁냐 동굴 모터보트 승선권 및 국립공원 입장료",
      "후에 황궁 대내, 카이딘 릉, 바나힐 케이블카, 호이안 통합권/소원배",
      "전 일정 식사 (호텔 조식 4회, 퐁냐 토종닭 특식, 후에 궁중요리, 바나힐 뷔페 등)",
      "마지막 날 90분 VIP 힐링 전신 마사지",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "항공권",
      "천국의 동굴(Thiên Đường) 전동차 선택 이용",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "인천/부산 저녁 출발 ➔ 다낭 늦은 밤 도착 ➔ 가이드 미팅 ➔ 호텔 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 다낭 공항에 도착합니다. 가이드 미팅 후 전용 리무진으로 호텔로 이동하여 체크인 후 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 2,
        title: "바나힐 국립공원 케이블카 ➔ 골든브릿지 신의 손 ➔ 호이안 유네스코 올드타운 & 투본강 소원배 야경",
        description: "조식 후 바나힐로 이동하여 케이블카를 타고 골든브릿지와 프랑스 고성 마을을 즐깁니다. 오후에 호이안으로 이동하여 구시가지를 산책하고 밤에는 투본강에서 촛불 소원배를 띄웁니다.",
        meal: "조식: 호텔식 / 중식: 바나힐 뷔페식 / 석식: 호이안 전통식",
        hotel: "다낭 4성급 호텔 (2인 1실)"
      },
      {
        day: 3,
        title: "하이반 고개 드라이브 ➔ 고도 후에 이동 ➔ 후에 황궁 대내 & 카이딘 황제릉 ➔ 티엔무 사원",
        description: "조식 후 하이반 고개를 넘어 고도 후에로 이동합니다. 응우옌 왕조의 황궁 대내와 카이딘 황제릉, 티엔무 사원을 관람하고 후에 호텔에 체크인합니다.",
        meal: "조식: 호텔식 / 중식: 후에 전통 궁중요리 / 석식: 후에 로컬 특미",
        hotel: "후에 4성급 헤리티지 호텔 (2인 1실)"
      },
      {
        day: 4,
        title: "후에 출발 ➔ 꽝찌 라방 성지 ➔ 유네스코 퐁냐케방 국립공원 천연동굴 지하강 보트 탐험 ➔ 후에 복귀",
        description: "이른 아침 조식 후 라방 성모 성지를 거쳐 퐁냐케방 국립공원으로 이동합니다. 손강 모터보트를 타고 세계 최대 카르스트 퐁냐 동굴 내부로 들어가 화려한 종유석과 석순을 탐험한 후 후에로 복귀합니다.",
        meal: "조식: 호텔식 / 중식: 퐁냐 토종닭 구이 특식 / 석식: 후에 분보후에 특미",
        hotel: "후에 4성급 헤리티지 호텔 (2인 1실)"
      },
      {
        day: 5,
        title: "체크아웃 투어 ➔ 다낭 복귀 ➔ 핑크성당 ➔ 한시장 쇼핑 ➔ 90분 VIP 스파 ➔ 해산물 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 체크아웃. 다낭으로 돌아와 핑크성당과 한시장에서 쇼핑을 즐깁니다. 90분 VIP 전신 마사지로 피로를 푼 뒤 해산물 만찬을 즐기고 늦은 밤 공항으로 이동하여 출국합니다.",
        meal: "조식: 호텔식 / 중식: 랑코 해변식 / 석식: 다낭 씨푸드 해산물 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 6,
        title: "새벽 인천/부산 국제공항 도착 & 안락한 귀가",
        description: "기내 숙면 후 이른 아침 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T08:00:00.000Z"
  }
];

function updateStoresWithAloTours() {
  const jsonFiles = [
    path.resolve('stored_products.json'),
    path.resolve('src/data/stored_products.json'),
    path.resolve('stored_products.backup.json')
  ];

  for (const file of jsonFiles) {
    if (fs.existsSync(file)) {
      const existing = JSON.parse(fs.readFileSync(file, 'utf8'));
      const map = new Map();
      existing.forEach((p) => map.set(p.id, p));
      ALOTRAVEL_DANANG_TOURS.forEach((at) => {
        map.set(at.id, at);
      });
      const updatedList = Array.from(map.values());
      fs.writeFileSync(file, JSON.stringify(updatedList, null, 2), 'utf8');
      console.log(`Updated ${file}: total ${updatedList.length} products (added/updated ${ALOTRAVEL_DANANG_TOURS.length} ALO tours)`);
    }
  }

  // Update src/data/seedProducts.ts
  const seedPath = path.resolve('src/data/seedProducts.ts');
  if (fs.existsSync(seedPath)) {
    const fileList = JSON.parse(fs.readFileSync('stored_products.json', 'utf8'));
    const newSeedContent = `import { Product } from '../types';\n\nexport const ALL_COMPREHENSIVE_PRODUCTS: Product[] = ${JSON.stringify(fileList, null, 2)};\n\nexport const INITIAL_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;\nexport const SAMPLE_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;\n`;
    fs.writeFileSync(seedPath, newSeedContent, 'utf8');
    console.log(`Updated ${seedPath} with ${fileList.length} products!`);
  }
}

updateStoresWithAloTours();
