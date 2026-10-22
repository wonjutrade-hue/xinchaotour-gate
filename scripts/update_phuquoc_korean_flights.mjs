import fs from 'fs';
import path from 'path';

export const UPDATED_KOREAN_FLIGHT_PHUQUOC_TOURS = [
  {
    id: "prod-south-vntravel-phuquoc-grandworld-4islands-3d2n",
    title: "[푸꾸옥/그랜드월드&4대섬 3박5일] 한국인 맞춤 야간비행 플랜 · 잠들지 않는 도시 그랜드월드 & 4대 섬 카누 스노클링 · 선셋 사나토 (3박 5일)",
    subTitle: "✈️ 한국인 최선호 늦은 밤 도착 & 늦은 밤 출발 안심 일정! VNTravel 정품 투어 · 그랜드월드 분수 레이저쇼 · 스피드카누 4대섬 호핑 & 드론 무료 촬영 · 체크아웃 투어 & 공항 샌딩",
    category: "자유여행",
    region: "남부",
    city: "푸꾸옥",
    priceKRW: 198000,
    priceVND: 2690000,
    duration: "3박 5일 (기내 1박)",
    imageUrl: "https://dulichvntravel.com/files/product/phu-quoc-thanh-pho-khong-ngu-grand-world-tour-4-dao-ngam-san-ho-2wnojenb.jpg",
    additionalImages: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/phu-quoc-thanh-pho-khong-ngu-grand-world-tour-4-dao-ngam-san-ho-2wnojenb.jpg"
    ],
    galleryImages: [
      "https://dulichvntravel.com/files/product/phu-quoc-thanh-pho-khong-ngu-grand-world-tour-4-dao-ngam-san-ho-2wnojenb.jpg",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 48,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ["인천", "부산", "대구", "푸꾸옥 국제공항"],
    tags: ["#한국인야간비행패턴", "#3박5일", "#늦은밤도착", "#늦은밤출발", "#푸꾸옥여행", "#그랜드월드", "#베니스쇼", "#4대섬호핑", "#선셋사나토", "#자유여행"],
    description: "한국인 여행객의 실제 항공 패턴(저녁 한국 출발 ➔ 첫날 늦은 밤 푸꾸옥 공항 도착 / 마지막 날 늦은 밤 푸꾸옥 공항 출발 ➔ 새벽 인천 공항 도착)에 100% 맞춤 설계된 VNTravel 시그니처 3박 5일 정품 투어입니다. 심야 도착 시 전담 한국어 가이드의 안전한 공항 픽업과 호텔 체크인 지원, 남부 4대 섬 카누 호핑투어 및 산호 스노클링, 드론 무료 항공 촬영, 선셋 사나토의 환상적인 노을, 잠들지 않는 도시 그랜드월드의 초대형 수상 분수쇼, 마지막 날 체크아웃 투어(명소 탐방, 킹콩마트 쇼핑, 힐링 스파 마사지, 로컬 만찬) 후 늦은 밤 공항 샌딩까지 군더더기 없이 완벽하게 진행됩니다.",
    highlights: [
      "한국인 최선호 야간 비행 스케줄 100% 반영 (3박 5일 안심 케어)",
      "첫날 늦은 밤(심야) 푸꾸옥 공항 도착 시 단독 전용차량 & 가이드 픽업 ➔ 리조트 체크인",
      "마지막 날 12시 체크아웃 후 명소 투어 + 킹콩마트 쇼핑 + 스파 마사지 + 석식 후 늦은 밤 공항 샌딩",
      "24시간 잠들지 않는 도시 '그랜드 월드(Grand World)' & 21:30 수상 분수 레이저쇼 '베니스의 색채'",
      "안터이 항구 고속 카누 탑승 & 남부 4대 섬(혼머이룻, 혼감기, 혼몽따이, 산호공원) 호핑투어",
      "전문 파일럿의 무료 드론(Flycam) 항공 촬영 & SUP 패들보드 인생샷 제공",
      "바다 위 코끼리 조각상과 천국의 문으로 유명한 '선셋 사나토(Sunset Sanato)' 비치클럽",
      "푸꾸옥 3대 명물 생면 어묵 쌀국수 '분콰이(Bún Quậy)' & 신선한 섬 해산물 만찬"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 & 최신 고속 스피드 카누",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "한국인 야간비행 3박 5일 안심 풀코스 (그랜드월드 & 4대 섬 호핑)",
    included: [
      "한국인 맞춤 전 일정 전용 차량 (첫날 늦은 밤 공항 픽업 + 투어 + 마지막 날 늦은 밤 공항 샌딩)",
      "푸꾸옥 4성급 특급 비치 리조트 3박 (2인 1실, 매일 조식 뷔페 포함)",
      "최신 안전장비 완비 고속 카누, 낚싯대, 스노클링 마스크, 오리발, 구명조끼 일체",
      "일정표 내 식사: 리조트 조식 3회 + 2일차 혼몽따이 섬 해산물 8품 정식 + 3일차 푸꾸옥 명물 분콰이 석식 + 4일차 마지막 날 로컬 만찬",
      "드론(Flycam) 무료 항공 촬영 및 SUP 패들보드 인생샷 촬영",
      "마지막 날 90분 VIP 힐링 전신 마사지 (샤워 시설 완비)",
      "입장료 및 항만 이용료, 매일 생수 제공",
      "신짜오투어 전담 한국어 가이드 및 24시간 실시간 케어",
      "베트남 현지 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "왕복 항공권 (요청 시 최저가 항공권 발권 대행 가능)",
      "그랜드월드 베니스 곤돌라 보트 탑승권(약 300,000 VND) 및 테디베어 뮤지엄",
      "씨워커(Sea Walker) 바다 밑 산책 선택 체험(약 1,350,000 VND)",
      "선셋 사나토 입장료(약 100,000 VND) 및 수상 레저(제트스키 등)",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "인천/부산 저녁 출발 ➔ 푸꾸옥 늦은 밤(심야) 도착 ➔ 가이드 미팅 ➔ 리조트 체크인 & 숙면",
        description: "인천 또는 부산 국제공항에서 저녁 비행기로 출발하여, 푸꾸옥 국제공항에 늦은 밤(심야 21:30~00:30)에 도착합니다. 입국장 밖에서 신짜오투어 전용 피켓을 든 전담 한국어 가이드 및 전용 기사와 반갑게 미팅합니다. 전용 에어컨 리무진 차량으로 리조트로 안전하게 이동하여 신속하게 체크인을 마치고 첫날 밤 편안한 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "푸꾸옥 4성급 특급 비치 리조트 (2인 1실)"
      },
      {
        day: 2,
        title: "리조트 조식 ➔ 안터이 항구 스피드 카누 탑승 ➔ 남부 4대 섬 호핑투어 & 드론 촬영 ➔ 선셋 사나토 ➔ 즈엉동 야시장",
        description: "리조트 조식 후 08:30 출발하여 푸꾸옥 전통 진주 양식장을 둘러봅니다. 이어 안터이(An Thới) 항구로 이동하여 최신 스피드 카누에 탑승합니다. 세계 최장 혼텀 해상 케이블카를 바라보며 백사장이 고운 첫 번째 섬 '혼머이룻(Hòn Mây Rút)'에서 힐링 휴식을 취합니다. 두 번째 섬인 '산호의 왕국' 혼감기(Hòn Gầm Ghì)에서 투명한 바닷속 산호초와 열대어를 스노클링으로 관찰합니다. 세 번째 섬 혼몽따이(Hòn Móng Tay)에서 푸짐한 해산물 8품 정식 점심을 맛보고, 전문 파일럿의 드론(Flycam) 무료 항공 촬영과 패들보드로 인생 사진을 남깁니다. 안터이 항 귀환 후 바다 위 조형물과 낭만 노을이 아름다운 '선셋 사나토(Sunset Sanato)'에서 일몰을 감상하고 즈엉동 야시장에서 활기찬 저녁을 보냅니다.",
        meal: "조식: 호텔 뷔페식 / 중식: 혼몽따이 섬 해산물 8품 정식 / 석식: 즈엉동 해변 씨푸드",
        hotel: "푸꾸옥 4성급 특급 비치 리조트 (2인 1실)"
      },
      {
        day: 3,
        title: "오전 리조트 여유로운 호캉스 ➔ 오후 24시간 잠들지 않는 도시 '그랜드월드' ➔ 분콰이 석식 ➔ 21:30 분수 레이저쇼",
        description: "아침 조식 후 오전에는 리조트 전용 수영장과 프라이빗 비치에서 여유롭게 휴식과 수영을 즐깁니다. 오후 15:30 전용 차량으로 푸꾸옥 북부의 초대형 복합 엔터테인먼트 시티 '그랜드 월드(Grand World)'로 이동합니다. 42,000개 대나무로 지어진 초대형 건축물 'Bamboo Legend', 어반 파크 야외 조각공원, 이탈리아 베니스 운하 마을, 상하이 등불 거리를 자유롭게 거닙니다. 저녁으로 푸꾸옥 최고의 명물 즉석 생면 어묵 쌀국수 '분콰이(Bún Quậy)'를 즐기고, 21:30 호수 전체를 수놓는 웅장한 멀티미디어 분수 레이저 쇼 '베니스의 색채'를 관람한 후 호텔로 귀환합니다.",
        meal: "조식: 호텔 뷔페식 / 중식: 자유식 / 석식: 푸꾸옥 명물 생면 분콰이 특식",
        hotel: "푸꾸옥 4성급 특급 비치 리조트 (2인 1실)"
      },
      {
        day: 4,
        title: "체크아웃 투어 ➔ 딘꺼우 사원 ➔ 킹콩마트 쇼핑 ➔ 90분 VIP 힐링 스파 ➔ 만찬 ➔ 늦은 밤 푸꾸옥 공항 출발",
        description: "호텔 조식 후 오전 여유로운 시간을 즐기고 12:00에 체크아웃합니다. 짐은 전용 투어 차량에 안전하게 싣고 체크아웃 투어를 시작합니다. 어부들의 바다 사원인 딘꺼우(Dinh Cậu)를 산책하고, 푸꾸옥 특산품 후추 농장과 킹콩마트(King Kong Mart)에서 후추, 건망고, 캐슈넛, 베트남 커피 등을 알뜰하게 쇼핑합니다. 여행의 피로를 풀어주는 90분 VIP 힐링 전신 아로마 마사지(개별 샤워 가능)를 받은 후, 푸꾸옥에서의 마지막 만찬(베트남 전통 특식)을 즐깁니다. 21:30~22:30 푸꾸옥 국제공항으로 이동하여 가이드의 인솔로 출국 수속을 마치고 늦은 밤 비행기에 탑승합니다.",
        meal: "조식: 호텔 뷔페식 / 중식: 현지 쌀국수 맛집 / 석식: 푸꾸옥 마지막 만찬 특식",
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
    updatedAt: "2026-10-22T06:00:00.000Z"
  },
  {
    id: "prod-south-vntravel-phuquoc-grandworld-honthom-safari-4d3n",
    title: "[푸꾸옥/완전정복 4박6일] 한국인 맞춤 야간비행 플랜 · 빈펄 사파리 & 기네스 혼텀 케이블카 · 4대 섬 스노클링 & 그랜드월드 (4박 6일)",
    subTitle: "✈️ 늦은 밤 도착 & 늦은 밤 출발 안심 케어! 아시아 최대 빈펄 사파리 · 기네스 세계 최장 7,899m 해상 케이블카 & 아쿠아토피아 · 남부 4대 섬 호핑투어 & 체크아웃 샌딩",
    category: "자유여행",
    region: "남부",
    city: "푸꾸옥",
    priceKRW: 285000,
    priceVND: 3890000,
    duration: "4박 6일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://dulichvntravel.com/files/product/phu-quoc-thanh-pho-khong-ngu-grand-world-tour-4-dao-ngam-san-ho-2wnojenb.jpg",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/phu-quoc-thanh-pho-khong-ngu-grand-world-tour-4-dao-ngam-san-ho-2wnojenb.jpg",
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 39,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 8,
    departureCities: ["인천", "부산", "대구", "푸꾸옥 국제공항"],
    tags: ["#한국인야간비행패턴", "#4박6일", "#늦은밤도착", "#늦은밤출발", "#빈펄사파리", "#혼텀케이블카", "#아쿠아토피아", "#4대섬호핑", "#그랜드월드", "#자유여행"],
    description: "한국인 여행객의 밤 비행기 일정에 최적화된 4박 6일 풀코스 마스터 투어입니다. 첫날 늦은 밤 푸꾸옥 공항 도착 시 단독 픽업으로 리조트에 체크인하여 숙면하고, 사파리 버스를 타고 맹수를 가까이서 관찰하는 아시아 최대 빈펄 사파리와 기린 먹이주기 체험, 기네스 세계 최장 7,899m 혼텀 해상 케이블카 & 아쿠아토피아 워터파크, 남부 4대 섬 카누 호핑 스노클링 및 드론 촬영, 그랜드월드 분수쇼, 마지막 날 12시 체크아웃 후 명소 투어, 킹콩마트 쇼핑, 스파 마사지, 만찬을 즐긴 후 늦은 밤 공항에 안전하게 탑승합니다.",
    highlights: [
      "한국인 야간비행 패턴 100% 반영: 첫날 심야 도착 픽업 + 마지막 날 심야 출발 샌딩",
      "아시아 최대 야생 동물원 빈펄 사파리(Vinpearl Safari) 사파리 버스 투어 & 기린 레스토랑",
      "기네스 세계 최장 7,899m 혼텀섬(Hòn Thơm) 해상 케이블카 탑승 & 아쿠아토피아 워터파크",
      "그랜드월드 베니스 운하 곤돌라 & 수상 분수 레이저쇼 '베니스의 색채'",
      "남부 4대 청정 섬(혼머이룻, 혼감기, 혼몽따이, 산호공원) 고속 카누 호핑 & 스노클링",
      "전문 파일럿의 무료 드론(Flycam) 항공 촬영 & SUP 패들보드",
      "마지막 날 12시 체크아웃 투어 + 킹콩마트 쇼핑 + 90분 전신 스파 + 만찬 후 공항 샌딩"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 & 고속 카누",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "한국인 야간비행 4박 6일 완전정복 (사파리 & 혼텀 & 4대섬 & 그랜드월드)",
    included: [
      "한국인 맞춤 전 일정 전용 차량 (첫날 늦은 밤 픽업 + 전 일정 투어 + 마지막 날 늦은 밤 샌딩)",
      "푸꾸옥 4성급 비치 리조트 4박 (2인 1실, 매일 조식 포함)",
      "전 일정 식사 (호텔 조식 4회, 섬 해산물식, 기린 레스토랑 특식, 분콰이, 마지막 날 특식)",
      "빈펄 사파리 입장권 및 전용 사파리 버스",
      "혼텀 케이블카 왕복권 & 아쿠아토피아 워터파크 입장권",
      "4대 섬 카누 호핑투어 & 스노클링 장비 일체",
      "드론 무료 항공 촬영 서비스",
      "마지막 날 90분 VIP 전신 힐링 마사지",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "왕복 항공권",
      "씨워커 및 해양 스포츠 선택 이용료",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "인천/부산 저녁 출발 ➔ 푸꾸옥 늦은 밤 도착 ➔ 가이드 미팅 ➔ 리조트 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤(21:30~00:30) 푸꾸옥 국제공항에 도착합니다. 신짜오투어 전담 한국어 가이드와 미팅 후 전용 리무진으로 리조트로 이동하여 체크인 후 첫날 밤 편안히 숙면합니다.",
        meal: "기내식 또는 개별식",
        hotel: "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 2,
        title: "빈펄 사파리 야생동물 탐험 ➔ 기린 레스토랑 ➔ 그랜드월드 불야성 ➔ 베니스 분수 레이저쇼",
        description: "조식 후 빈펄 사파리로 이동하여 전용 사파리 버스로 맹수들을 근접 관찰하고 기린 레스토랑에서 기린에게 당근을 주며 이색 중식을 즐깁니다. 오후에는 그랜드월드로 이동하여 베니스 운하와 대나무 전설 건축물을 둘러보고 분콰이 석식 후 21:30 수상 분수쇼를 관람합니다.",
        meal: "조식: 호텔식 / 중식: 기린 레스토랑 특식 / 석식: 생면 분콰이 특식",
        hotel: "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 3,
        title: "세계 최장 혼텀 해상 케이블카 ➔ 아쿠아토피아 워터파크 ➔ 선셋 사나토 ➔ 즈엉동 야시장",
        description: "조식 후 7,899m 혼텀 해상 케이블카를 타고 혼텀섬으로 이동하여 아쿠아토피아 워터파크와 비치를 즐깁니다. 오후에는 선셋 사나토 비치클럽에서 환상적인 일몰을 배경으로 인생 사진을 남기고 즈엉동 야시장에서 랍스터와 해산물 디너를 즐깁니다.",
        meal: "조식: 호텔식 / 중식: 혼텀 뷔페식 / 석식: 즈엉동 야시장 씨푸드",
        hotel: "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 4,
        title: "남부 4대 섬 스피드 카누 호핑투어 & 산호 스노클링 & 드론 무료 항공 촬영",
        description: "조식 후 안터이 항구에서 스피드 카누를 타고 혼머이룻, 혼감기(산호의 왕국), 혼몽따이 섬을 호핑하며 스노클링과 해양 레저를 즐깁니다. 전문 파일럿의 드론(Flycam) 무료 항공 촬영과 패들보드로 인생샷을 남기고 섬 해산물 바비큐를 즐깁니다.",
        meal: "조식: 호텔식 / 중식: 섬 해산물 8품 정식 / 석식: 현지 특식",
        hotel: "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 5,
        title: "체크아웃 투어 ➔ 딘꺼우 사원 ➔ 킹콩마트 쇼핑 ➔ 90분 VIP 스파 ➔ 만찬 ➔ 늦은 밤 공항 출발",
        description: "조식 후 여유롭게 휴식하고 12:00 체크아웃. 짐을 전용 차량에 싣고 바다 사원 딘꺼우와 후추 농장, 킹콩마트에서 알뜰 쇼핑을 즐깁니다. 90분 VIP 전신 아로마 마사지로 여행의 피로를 풀고 푸꾸옥 마지막 만찬을 마친 뒤, 늦은 밤 푸꾸옥 공항으로 이동하여 안심 출국 수속을 진행합니다.",
        meal: "조식: 호텔식 / 중식: 현지 쌀국수 특식 / 석식: 푸꾸옥 마지막 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 6,
        title: "새벽/이른 아침 인천/부산 국제공항 도착 & 따뜻한 귀가",
        description: "밤샘 비행 후 이른 아침(06:00~08:30) 인천 또는 부산 국제공항에 도착하여 수하물 수령 후 안락하게 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T06:00:00.000Z"
  },
  {
    id: "prod-south-vntravel-phuquoc-sunset-sanato-healing-3d2n",
    title: "[푸꾸옥/선셋&힐링 3박5일] 한국인 맞춤 야간비행 플랜 · 선셋 사나토 비치클럽 & 핑거네일 에메랄드 비치 호핑 힐링 (3박 5일)",
    subTitle: "✈️ 늦은 밤 푸꾸옥 도착 & 마지막 날 늦은 밤 출발! 선셋 사나토 천국의 문 인생샷 · 럭셔리 카누 세일링 & 옥빛 바다 해수욕 & 체크아웃 스파 투어",
    category: "자유여행",
    region: "남부",
    city: "푸꾸옥",
    priceKRW: 179000,
    priceVND: 2450000,
    duration: "3박 5일 (기내 1박)",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    additionalImages: [
      "https://dulichvntravel.com/files/product/phu-quoc-thanh-pho-khong-ngu-grand-world-tour-4-dao-ngam-san-ho-2wnojenb.jpg",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://dulichvntravel.com/files/product/phu-quoc-thanh-pho-khong-ngu-grand-world-tour-4-dao-ngam-san-ho-2wnojenb.jpg",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 32,
    isPopular: false,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ["인천", "부산", "푸꾸옥 국제공항"],
    tags: ["#한국인야간비행패턴", "#3박5일", "#늦은밤도착", "#늦은밤출발", "#푸꾸옥선셋", "#선셋사나토", "#핑거네일섬", "#호핑투어", "#자유여행"],
    description: "한국인 여행객의 밤 비행 일정에 맞춘 푸꾸옥 일몰 & 에메랄드 해변 감성 힐링 3박 5일 투어입니다. 늦은 밤 도착 단독 픽업 및 리조트 체크인으로 첫날부터 편안하며, SNS 인생 사진의 성지인 선셋 사나토 비치클럽에서 바다 위 긴 다리 코끼리와 천국의 문 포토존을 즐깁니다. 투명한 핑거네일 섬(혼몽따이)에서 여유로운 스노클링과 바다 수영, 드론 무료 항공 촬영, 마지막 날 체크아웃 후 킹콩마트 쇼핑과 90분 전신 마사지, 만찬 후 늦은 밤 공항 샌딩으로 마무리됩니다.",
    highlights: [
      "한국인 야간비행 스케줄 최적화: 첫날 늦은 밤 공항 도착 픽업 + 마지막 날 늦은 밤 출발 샌딩",
      "푸꾸옥 최고의 인생샷 명소 '선셋 사나토(Sunset Sanato)' 비치클럽",
      "에메랄드빛 혼몽따이(핑거네일 섬) 스피드 카누 & 산호 스노클링",
      "전문 파일럿의 드론(Flycam) 무료 항공 촬영 서비스",
      "마지막 날 12시 체크아웃 투어 + 킹콩마트 쇼핑 + 90분 전신 스파 + 로컬 만찬"
    ],
    vehicleInfo: "전용 에어컨 리무진 차량 & 스피드 카누",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "한국인 야간비행 3박 5일 선셋 사나토 & 에메랄드 섬 힐링",
    included: [
      "전 일정 전용 차량 (첫날 늦은 밤 픽업 + 투어 + 마지막 날 늦은 밤 샌딩)",
      "푸꾸옥 4성급 리조트 3박 (매일 조식 포함)",
      "전 일정 식사 (호텔 조식 3회, 섬 해산물 점심, 분콰이 석식, 마지막 날 만찬)",
      "스피드 카누 탑승 및 스노클링 장비 일체",
      "드론 무료 항공 촬영",
      "마지막 날 90분 VIP 전신 힐링 마사지",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "왕복 항공권",
      "선셋 사나토 입장료(약 100,000 VND)",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "인천/부산 저녁 출발 ➔ 푸꾸옥 늦은 밤(심야) 도착 ➔ 가이드 미팅 ➔ 리조트 체크인 & 숙면",
        description: "한국에서 저녁 비행기로 출발하여 늦은 밤 푸꾸옥 공항에 도착합니다. 가이드 미팅 후 전용 차량으로 리조트로 이동하여 체크인 후 숙면을 취합니다.",
        meal: "기내식 또는 개별식",
        hotel: "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 2,
        title: "혼몽따이 에메랄드 비치 카누 호핑 & 산호 스노클링 · 드론 촬영 · 즈엉동 야시장",
        description: "조식 후 스피드 카누로 남부 청정 섬으로 출항하여 혼몽따이와 혼감기에서 스노클링과 해수욕을 즐깁니다. 드론 촬영 후 즈엉동 야시장에서 활기찬 밤을 보냅니다.",
        meal: "조식: 호텔식 / 중식: 섬 해산물 바비큐 / 석식: 분콰이 특미",
        hotel: "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 3,
        title: "오전 리조트 호캉스 ➔ 오후 선셋 사나토 비치클럽 & 석양 칵테일 ➔ 딘꺼우 사원",
        description: "조식 후 리조트 수영장에서 호캉스를 즐기고, 오후에 선셋 사나토로 이동하여 바다 위 코끼리 조각상과 천국의 문에서 인생샷을 남기고 낭만적인 일몰을 감상합니다.",
        meal: "조식: 호텔식 / 중식: 자유식 / 석식: 해변 씨푸드 디너",
        hotel: "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 4,
        title: "체크아웃 투어 ➔ 킹콩마트 쇼핑 ➔ 90분 VIP 스파 마사지 ➔ 만찬 ➔ 늦은 밤 푸꾸옥 공항 출발",
        description: "조식 후 12:00 체크아웃. 킹콩마트와 특산품 매장에서 쇼핑 후 90분 VIP 전신 마사지로 피로를 풀고 저녁 만찬을 즐긴 뒤 늦은 밤 푸꾸옥 공항으로 이동하여 출국 비행기에 탑승합니다.",
        meal: "조식: 호텔식 / 중식: 현지 쌀국수 / 석식: 푸꾸옥 마지막 만찬",
        hotel: "기내 1박 (기내 숙면)"
      },
      {
        day: 5,
        title: "새벽 인천/부산 국제공항 도착 & 귀가",
        description: "기내 숙면 후 이른 아침(06:00~08:30) 인천/부산 공항에 도착하여 수하물 수령 후 귀가합니다.",
        meal: "기내식 또는 개별식",
        hotel: "투어 종료 (인천/부산 도착)"
      }
    ],
    updatedAt: "2026-10-22T06:00:00.000Z"
  }
];

function updateAllStores() {
  const jsonFiles = [
    path.resolve('stored_products.json'),
    path.resolve('src/data/stored_products.json'),
    path.resolve('stored_products.backup.json')
  ];

  for (const file of jsonFiles) {
    if (fs.existsSync(file)) {
      const existing = JSON.parse(fs.readFileSync(file, 'utf8'));
      const updatedMap = new Map();
      existing.forEach((p) => updatedMap.set(p.id, p));
      UPDATED_KOREAN_FLIGHT_PHUQUOC_TOURS.forEach((up) => {
        updatedMap.set(up.id, up);
      });
      const updatedList = Array.from(updatedMap.values());
      fs.writeFileSync(file, JSON.stringify(updatedList, null, 2), 'utf8');
      console.log(`Updated ${file}: total ${updatedList.length} products`);
    }
  }

  // Update src/data/seedProducts.ts
  const seedPath = path.resolve('src/data/seedProducts.ts');
  if (fs.existsSync(seedPath)) {
    const seedContent = fs.readFileSync(seedPath, 'utf8');
    // Replace items if present, or write updated list
    const fileList = JSON.parse(fs.readFileSync('stored_products.json', 'utf8'));
    const newSeedContent = `import { Product } from '../types';\n\nexport const ALL_COMPREHENSIVE_PRODUCTS: Product[] = ${JSON.stringify(fileList, null, 2)};\n\nexport const INITIAL_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;\nexport const SAMPLE_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;\n`;
    fs.writeFileSync(seedPath, newSeedContent, 'utf8');
    console.log(`Updated ${seedPath} with ${fileList.length} products!`);
  }
}

updateAllStores();
