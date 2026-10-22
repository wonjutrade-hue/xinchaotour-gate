import fs from 'fs';
import path from 'path';

export const PHUQUOC_TOURS = [
  {
    id: "prod-south-vntravel-phuquoc-grandworld-4islands-3d2n",
    title: "[푸꾸옥/그랜드월드&4대섬] 잠들지 않는 도시 그랜드월드 · 베니스 곤돌라 & 남부 4대 섬 호핑투어 스노클링 3일 (2박 3일)",
    subTitle: "VNTravel 직영 푸꾸옥 대표 베스트셀러! 그랜드월드 분수 레이저쇼 · 스피드 카누 4대 섬 호핑 & 산호 스노클링 · 드론 무료 촬영 & 선셋 사나토",
    category: "자유여행",
    region: "남부",
    city: "푸꾸옥",
    priceKRW: 198000,
    priceVND: 2690000,
    duration: "2박 3일",
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
    reviewCount: 42,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ["푸꾸옥 국제공항", "즈엉동 시내 호텔", "인천", "부산"],
    tags: ["#푸꾸옥여행", "#그랜드월드", "#베니스쇼", "#4대섬호핑투어", "#산호스노클링", "#선셋사나토", "#분콰이", "#자유여행", "#추천패키지"],
    description: "VNTravel의 간판 푸꾸옥 명작 투어로, 베트남의 지상낙원 푸꾸옥의 낮과 밤을 가장 완벽하게 즐기는 일정입니다. 낮에는 안터이 항구에서 최신 스피드 카누를 타고 혼머이룻, 혼감기, 혼몽따이 등 4대 청정 섬을 순회하며 에메랄드빛 바다 스노클링과 해양 스포츠를 즐깁니다. 전문 포토그래퍼가 드론(Flycam) 항공 영상과 패들보드 인생샷을 무료로 촬영해 드리며, 저녁에는 24시간 잠들지 않는 도시 그랜드월드에서 수상 곤돌라 유람과 환상적인 초대형 레이저 분수쇼 '베니스의 색채'를 감상합니다.",
    highlights: [
      "24시간 잠들지 않는 도시 '그랜드 월드(Grand World)' 베니스 운하, 대나무 전설 건축물, 어반 파크",
      "매일 밤 21:30 펼쳐지는 웅장한 수상 음악 분수 & 레이저 쇼 '베니스의 색채(Sắc màu Venice)'",
      "안터이(An Thới) 항구 전용 고속 스피드 카누 탑승 & 세계 최장 해상 케이블카 조망",
      "남부 4대 섬 호핑투어: 혼머이룻(Mây Rút), 혼감기(산호의 왕국), 혼몽따이(Móng Tay), 산호공원",
      "전문 포토그래퍼의 드론(Flycam) 무료 항공 촬영 & SUP 패들보드 인생샷 서비스",
      "바다 위 환상적인 거대 조형물과 낭만 노을이 펼쳐지는 선셋 사나토(Sunset Sanato)",
      "푸꾸옥 전통 진주 양식장 체험 & 푸꾸옥 대표 명물 어묵 쌀국수 '분콰이(Bún Quậy)' 석식"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 & 최신 고속 스피드 카누",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "그랜드월드 나이트 쇼 & 남부 4대 섬 스노클링",
    included: [
      "즈엉동 시내 호텔 및 공항 픽업/샌딩 전용 차량",
      "최신 안전장비 완비 고속 카누, 낚싯대, 스노클링 마스크, 오리발, 구명조끼 일체",
      "일정표 내 명시된 푸꾸옥 4성급 리조트/호텔 2박 (2인 1실, 조식 포함)",
      "일정표 내 식사: 1일차 푸꾸옥 명물 '분콰이' 석식 + 2일차 섬 특산 해산물 정식(220,000 VND 상당)",
      "드론(Flycam) 무료 항공 촬영 및 SUP 패들보드 인생샷 촬영",
      "입장료 및 항만 이용료, 생수 제공",
      "신짜오투어 전담 가이드 및 24시간 실시간 한국어 케어",
      "베트남 현지 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 매너팁",
      "국내선/국제선 항공권 (요청 시 최저가 발권 대행 가능)",
      "그랜드월드 베니스 곤돌라 보트 탑승권(약 300,000 VND) 및 테디베어 뮤지엄 입장권",
      "씨워커(Sea Walker) 바다 밑 산책 및 스쿠버다이빙 선택 체험(약 1,350,000 VND)",
      "선셋 사나토 입장료(약 100,000 VND) 및 수상 레저(제트스키, 바나나보트 등)",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "푸꾸옥 공항 도착 · 호텔 체크인 · 그랜드월드 투어 & '베니스의 색채' 분수쇼",
        description: "푸꾸옥 국제공항 도착 후 신짜오투어 전용 차량 및 가이드 미팅. 호텔로 이동하여 체크인 후 잠시 휴식을 취합니다. 16:00 전용 차량으로 푸꾸옥 북부의 초대형 복합 엔터테인먼트 시티 '그랜드 월드(Grand World)'로 이동하여 거대한 대나무 건축물(Bamboo Legend), 어반 파크 조각공원, 베니스 운하 마을, 상하이 등불 거리를 둘러봅니다. 저녁으로 푸꾸옥 최고의 명물 음식인 갓 뽑은 생면 어묵 쌀국수 '분콰이(Bún Quậy)'를 맛본 후 21:30 호수 위에서 펼쳐지는 화려한 레이저 음악 분수쇼 '베니스의 색채'를 관람하고 호텔로 귀환합니다.",
        "meal": "석식: 푸꾸옥 명물 생면 분콰이(Bún Quậy) 특식",
        "hotel": "푸꾸옥 4성급 비치 리조트 (2인 1실)"
      },
      {
        day: 2,
        title: "푸꾸옥 전통 진주 양식장 · 안터이 항구 카누 탑승 · 남부 4대 섬 호핑투어 & 선셋 사나토",
        description: "호텔 조식 후 08:30 가이드와 함께 푸꾸옥 전통 진주 양식장을 방문하여 진주 채취 과정을 견학합니다. 이어 안터이(An Thới) 항구로 이동하여 최신 스피드 카누에 탑승합니다. 기네스북 등재 혼텀 해상 케이블카를 바라보며 첫 번째 섬인 혼머이룻(Hòn Mây Rút)의 고운 백사장에서 힐링 휴식을 취합니다. 두 번째로 산호의 왕국 혼감기(Hòn Gầm Ghì)에서 투명한 바닷속 다채로운 산호초와 열대어를 스노클링으로 만끽합니다. 세 번째로 남부의 보석 혼몽따이(Hòn Móng Tay)로 이동하여 푸짐한 섬 해산물 중식을 즐기고 SUP 패들보드와 드론(Flycam) 무료 항공 촬영으로 평생 남을 인생 사진을 남깁니다. 15:00 안터이 항구로 귀환 후 바다 위 거대 조형물과 포토존으로 유명한 '선셋 사나토(Sunset Sanato)'에서 눈부신 황금빛 일몰을 감상하며 하루를 마무리합니다.",
        "meal": "조식: 호텔식 / 중식: 혼몽따이 섬 해산물 8품 정식 / 석식: 즈엉동 해변 자유식",
        "hotel": "푸꾸옥 4성급 비치 리조트 (2인 1실)"
      },
      {
        day: 3,
        title: "리조트 해변 자유 휴식 · 즈엉동 로컬 기념품 쇼핑 · 공항 샌딩",
        description: "호텔 조식 후 에메랄드빛 리조트 프라이빗 비치와 수영장에서 여유로운 오전 자유 시간을 보냅니다. 체크아웃 후 푸꾸옥 특산물인 명품 후추 농장과 전통 생선 액젓(느억맘) 공장을 방문하여 쇼핑을 즐긴 후 푸꾸옥 국제공항으로 이동하여 모든 일정을 안전하게 마무리합니다.",
        "meal": "조식: 호텔식 / 중식: 현지 특식",
        "hotel": "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T05:00:00.000Z"
  },
  {
    id: "prod-south-vntravel-phuquoc-grandworld-honthom-safari-4d3n",
    title: "[푸꾸옥/완전정복 4일] 그랜드월드 & 빈원더스 · 혼텀섬 해상 케이블카 · 4대 섬 스노클링 & 사파리 4일 (3박 4일)",
    subTitle: "푸꾸옥 올인원 마스터 패키지! 아시아 최대 빈펄 사파리 · 기네스 세계 최장 7,899m 해상 케이블카 & 아쿠아토피아 · 남부 4대 섬 호핑투어",
    category: "자유여행",
    region: "남부",
    city: "푸꾸옥",
    priceKRW: 285000,
    priceVND: 3890000,
    duration: "3박 4일",
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
    reviewCount: 36,
    isPopular: true,
    isHotDeal: false,
    discountPercent: 8,
    departureCities: ["푸꾸옥 국제공항", "인천", "부산", "대구"],
    tags: ["#푸꾸옥완전정복", "#빈펄사파리", "#혼텀케이블카", "#아쿠아토피아", "#4대섬호핑", "#그랜드월드", "#자유여행"],
    description: "푸꾸옥의 북부 테마파크와 남부 에메랄드 섬들을 총망라한 3박 4일 종합 일주 패키지입니다. 아시아 최대 야생 동물원 빈펄 사파리에서 사파리 버스를 타고 호랑이와 사자를 눈앞에서 관찰하고 기린에게 직접 먹이를 주는 특별한 체험을 합니다. 기네스북 공인 세계 최장 7,899m 혼텀섬 해상 케이블카를 타고 아쿠아토피아 워터파크를 만끽하며, 남부 4대 섬 스피드 카누 호핑투어와 드론 촬영까지 빈틈없이 제공합니다.",
    highlights: [
      "아시아 최대 야생 동물원 빈펄 사파리(Vinpearl Safari) 사파리 버스 투어 & 기린 레스토랑",
      "기네스 세계 최장 7,899m 혼텀섬(Hòn Thơm) 해상 케이블카 탑승 & 아쿠아토피아 워터파크",
      "그랜드월드 베니스 운하 곤돌라 & 수상 분수 레이저쇼 '베니스의 색채'",
      "남부 4대 청정 섬(혼머이룻, 혼감기, 혼몽따이, 산호공원) 고속 카누 호핑 & 스노클링",
      "전문 파일럿의 무료 드론(Flycam) 항공 촬영 & SUP 패들보드",
      "선셋 사나토 바다 위 포토존 & 즈엉동 야시장 씨푸드 투어"
    ],
    vehicleInfo: "최신형 전용 에어컨 리무진 & 고속 카누",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "사파리 & 혼텀 케이블카 & 4대 섬 호핑 올인원",
    included: [
      "전용 차량 및 전담 기사",
      "푸꾸옥 4성급 비치 리조트 3박 (2인 1실, 조식 포함)",
      "전 일정 식사 (호텔 조식, 섬 해산물식, 빈펄 뷔페, 분콰이 특식 등)",
      "빈펄 사파리 입장권 및 전용 사파리 버스",
      "혼텀 케이블카 왕복권 & 아쿠아토피아 워터파크 입장권",
      "4대 섬 카누 호핑투어 & 스노클링 장비 일체",
      "드론 무료 항공 촬영 서비스",
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
        title: "푸꾸옥 도착 · 호텔 체크인 · 그랜드월드 나이트 투어 & 베니스 레이저쇼",
        description: "공항 도착 후 가이드 미팅. 리조트 체크인 후 그랜드월드로 이동하여 베니스 곤돌라 유람과 상하이 야경을 감상하고, 맛있는 분콰이 석식 후 21:30 수상 분수쇼를 관람합니다.",
        "meal": "석식: 푸꾸옥 명물 생면 분콰이 특식",
        "hotel": "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 2,
        title: "빈펄 사파리 야생동물 탐험 · 기린 레스토랑 · 딘꺼우 사원 & 즈엉동 야시장",
        description: "조식 후 아시아 최대 빈펄 사파리로 이동하여 전용 사파리 버스를 타고 맹수들을 근접 관찰합니다. 기린 레스토랑에서 기린에게 당근을 주며 이색 중식을 즐긴 후, 바다 사원 딘꺼우를 방문하고 저녁에는 활기찬 즈엉동 야시장에서 랍스터와 해산물 디너를 즐깁니다.",
        "meal": "조식: 호텔식 / 중식: 기린 레스토랑 특식 / 석식: 즈엉동 야시장 해산물 바비큐",
        "hotel": "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 3,
        title: "세계 최장 혼텀 해상 케이블카 · 남부 4대 섬 카누 호핑 스노클링 & 드론 촬영",
        description: "조식 후 7,899m 해상 케이블카를 타고 혼텀섬으로 이동하여 아쿠아토피아 워터파크와 해변을 즐깁니다. 오후에는 스피드 카누로 혼감기 산호 왕국과 혼몽따이 섬을 호핑하며 스노클링과 드론 항공 촬영을 진행합니다. 선셋 사나토에서 노을을 감상합니다.",
        "meal": "조식: 호텔식 / 중식: 섬 해산물 정식 / 석식: 로컬 특식",
        "hotel": "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 4,
        title: "리조트 해변 휴식 · 후추 농장 & 진주 양식장 쇼핑 · 공항 샌딩",
        "description": "조식 후 리조트 수영장에서 여유롭게 휴식하고 체크아웃합니다. 푸꾸옥 명품 후추 농장과 진주 양식장, 전통 생선액젓 공장을 들러 특산품을 쇼핑한 후 공항으로 이동하여 투어를 마칩니다.",
        "meal": "조식: 호텔식 / 중식: 현지 쌀국수 특식",
        "hotel": "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T05:00:00.000Z"
  },
  {
    id: "prod-south-vntravel-phuquoc-sunset-sanato-healing-3d2n",
    title: "[푸꾸옥/선셋&호핑 3일] 선셋 사나토 비치클럽 · 낭만 선셋 요트투어 & 핑거네일 에메랄드 비치 3일 (2박 3일)",
    subTitle: "푸꾸옥의 황금빛 노을에 빠져드는 로맨틱 힐링 여행! 선셋 사나토 천국의 문 인생샷 · 럭셔리 카누 세일링 & 옥빛 바다 해수욕",
    category: "자유여행",
    region: "남부",
    city: "푸꾸옥",
    priceKRW: 179000,
    priceVND: 2450000,
    duration: "2박 3일",
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
    reviewCount: 28,
    isPopular: false,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ["푸꾸옥 국제공항", "인천", "부산"],
    tags: ["#푸꾸옥선셋", "#선셋사나토", "#핑거네일섬", "#호핑투어", "#자유여행", "#힐링"],
    description: "푸꾸옥의 숨막히는 일몰과 청정 해변 휴식에 초점을 맞춘 감성 힐링 코스입니다. SNS 인생 사진의 성지인 선셋 사나토 비치클럽에서 바다 위 긴 다리 코끼리와 천국의 문 포토존을 즐기며 칵테일 한잔과 함께 노을을 감상합니다. 투명한 핑거네일 섬(혼몽따이)에서 여유로운 스노클링과 바다 수영을 즐기고, 푸꾸옥 현지 해산물 요리와 야시장의 활기를 만끽할 수 있습니다.",
    highlights: [
      "푸꾸옥 최고의 인생샷 명소 '선셋 사나토(Sunset Sanato)' 비치클럽",
      "에메랄드빛 혼몽따이(핑거네일 섬) 스피드 카누 & 산호 스노클링",
      "드론(Flycam) 무료 항공 촬영 서비스",
      "바다 위 절벽 사원 딘꺼우(Dinh Cậu) 일몰 산책",
      "푸꾸옥 명물 분콰이 및 섬 신선 해산물 식사 제공"
    ],
    vehicleInfo: "전용 에어컨 차량 & 스피드 카누",
    guideInfo: "신짜오투어 전담 현지 가이드 (한국어 안내 지원)",
    travelTheme: "선셋 사나토 낭만 노을 & 에메랄드 섬 힐링",
    included: [
      "전용 차량 및 가이드",
      "푸꾸옥 4성급 리조트 2박 (조식 포함)",
      "전 일정 식사 (호텔 조식, 섬 해산물 점심, 분콰이 석식)",
      "스피드 카누 탑승 및 스노클링 장비",
      "드론 무료 촬영",
      "생수 및 여행자 보험"
    ],
    excluded: [
      "개인 경비 및 팁",
      "항공권",
      "부가세(VAT)"
    ],
    itinerary: [
      {
        day: 1,
        title: "푸꾸옥 도착 · 리조트 체크인 · 선셋 사나토 비치클럽 & 석양 칵테일",
        description: "공항 도착 후 가이드 미팅. 리조트 체크인 후 오후에 선셋 사나토로 이동하여 바다 위 코끼리 조각상과 천국의 문에서 인생샷을 남기고 낭만적인 일몰을 감상합니다.",
        "meal": "석식: 해변 씨푸드 디너",
        "hotel": "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 2,
        title: "혼몽따이 에메랄드 비치 카누 호핑 & 산호 스노클링 · 드론 촬영 · 즈엉동 야시장",
        description: "조식 후 스피드 카누로 남부 청정 섬으로 출항하여 혼몽따이와 혼감기에서 스노클링과 해수욕을 즐깁니다. 드론 촬영 후 즈엉동 야시장에서 활기찬 밤을 보냅니다.",
        "meal": "조식: 호텔식 / 중식: 섬 해산물 바비큐 / 석식: 분콰이 특미",
        "hotel": "푸꾸옥 4성급 리조트 (2인 1실)"
      },
      {
        day: 3,
        title: "바다 사원 딘꺼우 · 후추 농장 쇼핑 · 공항 샌딩",
        description: "조식 후 체크아웃. 바위 위 바다 사원 딘꺼우를 산책하고 특산품 쇼핑 후 공항으로 이동하여 귀국합니다.",
        "meal": "조식: 호텔식 / 중식: 현지 쌀국수",
        "hotel": "투어 종료 (공항 샌딩)"
      }
    ],
    updatedAt: "2026-10-22T05:00:00.000Z"
  }
];

function updateStores() {
  const jsonFiles = [
    path.resolve('stored_products.json'),
    path.resolve('src/data/stored_products.json'),
    path.resolve('stored_products.backup.json')
  ];

  for (const file of jsonFiles) {
    if (fs.existsSync(file)) {
      const existing = JSON.parse(fs.readFileSync(file, 'utf8'));
      const existingIds = new Set(existing.map((p) => p.id));
      const toAdd = PHUQUOC_TOURS.filter((pt) => !existingIds.has(pt.id));
      const updated = [...existing, ...toAdd];
      fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
      console.log(`Updated ${file}: now has ${updated.length} products (added ${toAdd.length} Phu Quoc tours)`);
    }
  }

  // Also append to src/data/seedProducts.ts
  const seedPath = path.resolve('src/data/seedProducts.ts');
  if (fs.existsSync(seedPath)) {
    let seedContent = fs.readFileSync(seedPath, 'utf8');
    if (!seedContent.includes('prod-south-vntravel-phuquoc-grandworld-4islands-3d2n')) {
      const lastClosing = seedContent.lastIndexOf('];');
      if (lastClosing !== -1) {
        const phuQuocStr = JSON.stringify(PHUQUOC_TOURS, null, 2);
        const inner = phuQuocStr.trim().slice(1, -1).trim();
        const newSeed = seedContent.slice(0, lastClosing) + ',\n' + inner + '\n' + seedContent.slice(lastClosing);
        fs.writeFileSync(seedPath, newSeed, 'utf8');
        console.log('Appended Phu Quoc tours to src/data/seedProducts.ts!');
      }
    }
  }
}

updateStores();
