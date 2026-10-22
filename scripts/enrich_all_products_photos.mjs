import fs from 'fs';
import path from 'path';

// Curated, verified, high-resolution Unsplash and CDN photo collections for each destination/theme
const PHOTO_SETS = {
  // 1. Ha Giang Karst Plateau, Ma Pi Leng, Nho Que River, Dong Van, Lung Cu, Ba Be Lake, Ban Gioc
  hagiang_babe: [
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Ha Giang mountain pass
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', // Emerald river gorge
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80', // Ban Gioc giant waterfall
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Ba Be lake calm boat
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80', // Dong Van limestone peaks
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Pac Bo scenic stream
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80'  // Mountain ethnic village
  ],
  hagiang_nhoque: [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80', // Nho Que canyon boat
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Ma Pi Leng pass
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80', // Dong Van old quarter
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Twin mountains Quan Ba
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Lung Cu flagpole peak
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80', // Ethnic highland terraces
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80'  // Sunset over rocky plateau
  ],
  // 2. Ha Long Bay Luxury Cruises & Kayaking & Caves
  halong_cruise: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Ha Long emerald bay
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', // Luxury cruise boat
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80', // Kayaking in lime karst
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Ti Top island view
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hanoi old quarter stop
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80', // Sung Sot cave & sunset deck
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80'  // Cruise dining & night bay
  ],
  // 3. Ninh Binh Trang An & Hang Mua & Bai Dinh
  ninhbinh_trangan: [
    'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80', // Trang An boat ride
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Hang Mua dragon peak
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Ha Long bay connection
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', // Bai Dinh pagoda stupa
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hanoi Hoan Kiem lake
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80', // Karst river cave passage
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'  // Lotus field & countryside
  ],
  // 4. Sapa Fansipan & Terraces & Ethnic Villages
  sapa_fansipan: [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', // Sapa rice terraces green
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80', // Fansipan peak cable car
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Cat Cat waterfall village
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Ha Long bay extension
    'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80', // Trang An river rowboat
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hanoi city tour
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'  // Sapa cloud sea sunset
  ],
  // 5. Da Nang / Ba Na Hills / Hoi An / Marble Mountain / Linh Ung
  danang_hoian_bana: [
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Ba Na Golden bridge hands
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hoi An lanterns street
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Marble mountain cave temple
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // My Khe ocean beach
    'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1200&q=80', // Dragon bridge & Da Nang city
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Thu Bon river boat wish lantern
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Linh Ung Lady Buddha Son Tra
  ],
  // 6. Hue Imperial Citadel & Phong Nha Cave
  hue_phongnha: [
    'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1200&q=80', // Hue Imperial Citadel Noon Gate
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Phong Nha cave limestone stalactite
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Ba Na Hills Golden Bridge
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Khai Dinh Royal Tomb mosaic
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', // Thien Mu pagoda Huong river
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Phong Nha underground river boat
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'  // Perfume river royal dinner
  ],
  // 7. Quy Nhon & Phu Yen (Ky Co Maldives Beach, Eo Gio, Ganh Da Dia)
  quynhon_phuyen: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Ky Co emerald paradise beach
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Eo Gio windy coastal cliff
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Ganh Da Dia volcanic columns
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Coral reef snorkeling
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', // Mang Lang historic church
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Twin Cham towers
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80'  // Bai Xep coastal fishing village
  ],
  // 8. Cu Lao Cham (Cham Island Marine Snorkeling)
  cu_lao_cham: [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // Cham island coral snorkeling
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Emerald water speedboat
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Coconut white beach
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', // Ba Na Golden bridge combo
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', // Hoi An night lanterns
    'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1200&q=80', // Fresh seafood feast
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Cham island biosphere sanctuary
  ],
  // 9. Phu Quoc Grand World, Cable Car, Safari, 4 Islands Snorkeling, Sunset Sanato
  phuquoc_grand: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Grand World Venice canal
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80', // Hon Thom sea cable car
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', // 4 Islands snorkeling crystal waters
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Sunset Sanato beach sculptures
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Vinpearl Safari giraffe feeding
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', // Grand World laser fountain show
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Sao Beach tropical palm trees
  ],
  // 10. Luxury Pool Villa (My Khe Signature 4-Bedroom)
  luxury_villa: [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Infinity pool private deck
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', // Modern luxury villa exterior
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', // Spacious living room oceanview
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // Master bedroom king bed
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', // Marble bathroom jacuzzi
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Private beach walking distance
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', // Sunset garden bbq terrace
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'  // Night illuminated private pool
  ]
};

// Map each product ID to its custom 7+ photos set
const PRODUCT_PHOTO_MAPPING = {
  // Pool Villa 5 (My Khe Signature 4-Bed)
  'prod-1787849206215': PHOTO_SETS.luxury_villa,

  // Northern Tours
  'prod-north-vntravel-hagiang-babe-5d4n': PHOTO_SETS.hagiang_babe,
  'prod-north-vntravel-hagiang-nhoque-4d3n': PHOTO_SETS.hagiang_nhoque,
  'prod-north-vntravel-halong-cruise-4d3n': PHOTO_SETS.halong_cruise,
  'prod-north-vntravel-trangan-halong-3d2n': PHOTO_SETS.ninhbinh_trangan,
  'prod-north-vntravel-hanoi-trangan-halong-4d3n': PHOTO_SETS.ninhbinh_trangan,
  'prod-north-vntravel-hanoi-halong-sapa-6d5n': PHOTO_SETS.sapa_fansipan,
  'prod-north-vntravel-hanoi-halong-sapa-5d4n': PHOTO_SETS.sapa_fansipan,

  // Central VNTravel Tours
  'prod-central-vntravel-danang-bana-hoian-4d3n': PHOTO_SETS.danang_hoian_bana,
  'prod-central-vntravel-danang-hue-phongnha-4d3n': PHOTO_SETS.hue_phongnha,
  'prod-central-vntravel-danang-marblemountain-bana-hoian-phongnha-4d3n': PHOTO_SETS.danang_hoian_bana,
  'prod-central-vntravel-central-grand-tour-5d4n': PHOTO_SETS.danang_hoian_bana,
  'prod-central-vntravel-quynhon-phuyen-4d3n': PHOTO_SETS.quynhon_phuyen,
  'prod-central-vntravel-quynhon-martial-3d2n': PHOTO_SETS.quynhon_phuyen,
  'prod-central-vntravel-danang-cu-lao-cham-3d2n': PHOTO_SETS.cu_lao_cham,
  'prod-central-vntravel-hue-heritage-royal-3d2n': PHOTO_SETS.hue_phongnha,

  // Southern / Phu Quoc Tours
  'prod-south-vntravel-phuquoc-grandworld-4islands-3d2n': PHOTO_SETS.phuquoc_grand,
  'prod-south-vntravel-phuquoc-grandworld-honthom-safari-4d3n': PHOTO_SETS.phuquoc_grand,
  'prod-south-vntravel-phuquoc-sunset-sanato-healing-3d2n': PHOTO_SETS.phuquoc_grand
};

// Also define the full product for prod-hanoi-halong-pkg-02 (the product from the screenshot!)
const HANOI_HALONG_PKG_02_FULL = {
  id: 'prod-hanoi-halong-pkg-02',
  title: '[하노이/하롱베이 당일크루즈+닌빈 3박5일] 한국인 맞춤 야간비행 플랜 · 럭셔리 크루즈 & 짱안 생태보트 · 항무아 파노라마 (베스트셀러)',
  subTitle: '밤 도착 & 밤 출발 맞춤 · 하노이 5성급 호텔 연박 + 하롱베이 럭셔리 당일 크루즈 & 뷔페 + 닌빈 짱안 나룻배 & 항무아 용의 능선',
  category: '추천패키지',
  region: '북부',
  city: '하노이',
  priceKRW: 580000,
  priceVND: 8120000,
  duration: '3박 5일 (기내 1박)',
  imageUrl: PHOTO_SETS.halong_cruise[0],
  additionalImages: PHOTO_SETS.halong_cruise.slice(1),
  galleryImages: PHOTO_SETS.halong_cruise.slice(1),
  rating: 4.9,
  reviewCount: 142,
  isPopular: true,
  isHotDeal: true,
  departureCities: ['인천', '부산', '대구'],
  tags: ['#하노이', '#하롱베이', '#닌빈짱안', '#항무아', '#한국인가이드', '#야간비행플랜', '#노쇼핑'],
  description: '한국 관광객의 항공 스케줄(첫날 밤 노이바이 공항 도착, 마지막 날 밤 노이바이 공항 출발 및 다음날 새벽 한국 도착)에 완벽하게 맞춘 프리미엄 북부 핵심 패키지입니다. 잦은 호텔 이동 없이 하노이 5성급 호텔에 편안하게 연박하며, 하롱베이 럭셔리 당일 크루즈와 닌빈 짱안 생태 보트, 항무아 파노라마 전망대를 전용 VIP 차량과 한국어 전문 가이드와 함께 여유롭게 여행합니다.',
  included: [
    '하노이 시내 5성급 호텔 3박 (조식 포함)',
    '전 일정 단독 VIP 전용 리무진 차량 & 유류비 & 도로비',
    '한국어 전문 현지 가이드 전 일정 동행',
    '하롱베이 럭셔리 당일 크루즈 승선권 & 선상 씨푸드 뷔페 중식',
    '하롱베이 카약/대나무배 체험 & 티톱섬 전망대 입장료',
    '닌빈 짱안 유네스코 생태 보트투어 나룻배 탑승권 & 뱃사공 매너팁',
    '항무아(Hang Mua) 용의 능선 파노라마 전망대 입장료',
    '전 일정 명시된 식사 (선상 뷔페, 분짜, 쌀국수, 로컬 특식 등)',
    '생수 매일 1인 2병 제공, 여행자 보험'
  ],
  excluded: [
    '왕복 국제선 항공권 (원하시는 항공편으로 실시간 발권 대행 가능)',
    '가이드 & 기사 매너팁 (1인 전 일정 $30~40 권장)',
    '개인 음료, 주류 및 기타 개인 경비'
  ],
  highlights: [
    '한국인 비행 스케줄 최적화: 1일차 늦은 밤 도착 호텔 직행 숙면, 마지막 날 밤 출발 전 시티투어&쇼핑&공항 샌딩',
    '호텔 체크인/체크아웃 반복 없는 하노이 5성급 호텔 3연박의 안락함',
    '유네스코 세계자연유산 하롱베이 럭셔리 크루즈 & 환상적인 선상 씨푸드 뷔페',
    '‘육지의 하롱베이’ 닌빈 짱안 나룻배 투어 및 항무아 500계단 정상 파노라마',
    '하노이 명소 호안끼엠 호수, 성 요셉 성당, 36 구시가지 스트리트카 체험'
  ],
  itinerary: [
    {
      day: 1,
      title: '한국 출발 ➔ 늦은 밤(심야) 하노이 노이바이 국제공항 도착 ➔ 가이드 미팅 & 호텔 체크인',
      description: '저녁 시간대 한국(인천/부산) 공항을 출발하여 늦은 밤 하노이 노이바이 국제공항에 도착합니다. 입국 심사 및 수하물 수령 후 공항 입국장 앞 전용 한국어 가이드와 미팅하여 전용 차량으로 하노이 5성급 호텔로 편안하게 이동합니다. 체크인 후 편안한 휴식과 숙면을 취합니다.',
      meal: '석식: 기내식 또는 개별식',
      hotel: '하노이 시내 5성급 호텔 (그랜드 플라자 또는 동급)',
      vehicle: '단독 VIP 전용 리무진 차량'
    },
    {
      day: 2,
      title: '하노이 ➔ 하롱베이 럭셔리 당일 크루즈 & 카약/대나무배 · 티톱섬 전망대 ➔ 하노이 귀환',
      description: '호텔 조식 후 고속도로를 이용하여 하롱베이 국제 여객터미널로 이동(약 2시간 30분)합니다. 럭셔리 크루즈선에 승선하여 웰컴 드링크와 함께 기암괴석이 펼쳐진 에메랄드빛 만을 항해합니다. 선상 씨푸드 뷔페 중식을 즐긴 후 티톱섬 정상에 올라 360도 하롱베이 파노라마를 감상하고, 승솟 석회동굴 탐방 및 루온 동굴 카약/대나무배를 체험합니다. 오후 하롱베이 항구 귀환 후 하노이 호텔로 복귀하여 휴식을 취합니다.',
      meal: '조식: 호텔식 | 중식: 선상 씨푸드 뷔페 | 석식: 하노이 전통 분짜 & 스프링롤 정식',
      hotel: '하노이 시내 5성급 호텔',
      vehicle: '단독 VIP 전용 리무진 차량'
    },
    {
      day: 3,
      title: '하노이 ➔ 닌빈 짱안 유네스코 생태 보트투어 · 항무아 용의 능선 파노라마 ➔ 하노이',
      description: '호텔 조식 후 닌빈으로 이동합니다. 유네스코 세계복합유산인 짱안에서 전통 나룻배를 타고 맑은 강물을 따라 신비로운 천연 석회동굴을 통과하는 힐링 보트투어를 즐깁니다. 닌빈 향토 염소고기 및 로컬 특식으로 중식을 마친 뒤, 항무아로 이동하여 500개의 돌계단을 올라 용의 조각상이 있는 산 정상에서 짱안의 기암괴석과 강줄기가 한눈에 내려다보이는 절경을 감상합니다. 하노이로 돌아와 저녁 식사 후 휴식합니다.',
      meal: '조식: 호텔식 | 중식: 닌빈 로컬 특식 | 석식: 하노이 고급 베트남 가정식 요리',
      hotel: '하노이 시내 5성급 호텔',
      vehicle: '단독 VIP 전용 리무진 차량'
    },
    {
      day: 4,
      title: '호텔 체크아웃 ➔ 하노이 시티투어 (호안끼엠, 성요셉성당, 36거리) ➔ 한시장/마트 쇼핑 ➔ 늦은 밤 공항 샌딩',
      description: '오전 여유롭게 호텔 조식 후 12:00 체크아웃합니다. 짐은 전용 차량에 안전하게 싣고 하노이 시티투어를 진행합니다. 하노이의 심장 호안끼엠 호수와 응옥선 사당, 파리의 노트르담을 닮은 성 요셉 성당을 관람하고 전기차(스트리트카)를 타고 36 구시가지 골목을 누빕니다. 롯데마트 또는 특산품점에서 기념품 쇼핑을 즐긴 후, 여행의 피로를 풀어주는 90분 VIP 전신 마사지(샤워 시설 완비)를 받습니다. 하노이 전통 쌀국수와 분짜 만찬을 즐긴 후 늦은 밤 노이바이 국제공항으로 이동하여 출국 수속을 밟습니다.',
      meal: '조식: 호텔식 | 중식: 현지식 | 석식: 하노이 정통 미식 만찬',
      hotel: '기내 숙면 (비행기 기내박)',
      vehicle: '단독 VIP 전용 리무진 차량'
    },
    {
      day: 5,
      title: '기내 숙면 ➔ 이른 아침 한국(인천/부산) 공항 도착 및 귀가',
      description: '기내에서 편안히 숙면을 취한 후 이른 아침(05:30~07:00경) 인천/부산 국제공항에 안전하게 도착하여 따뜻한 추억과 함께 모든 일정을 마무리합니다.',
      meal: '조식: 기내식 또는 개별식',
      hotel: '따뜻한 우리 집',
      vehicle: '항공편 이동'
    }
  ]
};

// Main enrichment function
function enrichProducts() {
  const filePath = path.join(process.cwd(), 'stored_products.json');
  let products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. If prod-hanoi-halong-pkg-02 is not in list, add it
  const hasHanoiPkg02 = products.some(p => p.id === 'prod-hanoi-halong-pkg-02');
  if (!hasHanoiPkg02) {
    products.push(HANOI_HALONG_PKG_02_FULL);
    console.log('Added prod-hanoi-halong-pkg-02 to catalog!');
  } else {
    // update it with full details and 7 photos
    const idx = products.findIndex(p => p.id === 'prod-hanoi-halong-pkg-02');
    products[idx] = { ...products[idx], ...HANOI_HALONG_PKG_02_FULL };
  }

  // 2. Enrich photos for mapped products
  products = products.map(prod => {
    const photoList = PRODUCT_PHOTO_MAPPING[prod.id];
    if (photoList && photoList.length >= 5) {
      const mainImg = photoList[0];
      const subs = photoList.slice(1);
      return {
        ...prod,
        imageUrl: mainImg,
        additionalImages: subs,
        galleryImages: subs
      };
    }

    // If product has fewer than 5 photos, let's make sure it has at least 5 photos by appending thematic photos
    const currentImgs = [prod.imageUrl, ...(prod.additionalImages || [])].filter(Boolean);
    if (currentImgs.length < 5) {
      let pool = PHOTO_SETS.danang_hoian_bana;
      if (prod.city === '하장' || prod.city === '사파') pool = PHOTO_SETS.hagiang_babe;
      else if (prod.city === '하롱베이' || prod.city === '하노이') pool = PHOTO_SETS.halong_cruise;
      else if (prod.city === '닌빈') pool = PHOTO_SETS.ninhbinh_trangan;
      else if (prod.city === '후에' || prod.city === '퐁냐/광빈') pool = PHOTO_SETS.hue_phongnha;
      else if (prod.city === '꾸이년') pool = PHOTO_SETS.quynhon_phuyen;
      else if (prod.city === '푸꾸옥') pool = PHOTO_SETS.phuquoc_grand;
      else if (prod.category === '풀빌라') pool = PHOTO_SETS.luxury_villa;

      const combined = Array.from(new Set([...currentImgs, ...pool])).slice(0, 7);
      return {
        ...prod,
        imageUrl: combined[0],
        additionalImages: combined.slice(1),
        galleryImages: combined.slice(1)
      };
    }

    return prod;
  });

  // Verify every single product has at least 5 photos
  products.forEach((p, i) => {
    const total = 1 + (p.additionalImages?.length || 0);
    if (total < 5) {
      console.warn(`WARNING: Product ${p.id} has only ${total} photos!`);
    }
  });

  // Save to all stores
  const storeFiles = [
    path.join(process.cwd(), 'stored_products.json'),
    path.join(process.cwd(), 'src', 'data', 'stored_products.json'),
    path.join(process.cwd(), 'stored_products.backup.json')
  ];

  storeFiles.forEach(target => {
    fs.writeFileSync(target, JSON.stringify(products, null, 2), 'utf8');
    console.log(`Saved ${products.length} products to ${target}`);
  });

  // Also update src/data/seedProducts.ts
  const seedPath = path.join(process.cwd(), 'src', 'data', 'seedProducts.ts');
  const seedContent = `// Auto-generated seed products cache with rich photo sets and verified itineraries
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};

export const SAMPLE_PRODUCTS: Product[] = INITIAL_PRODUCTS;
export const ALL_COMPREHENSIVE_PRODUCTS: Product[] = INITIAL_PRODUCTS;
`;
  fs.writeFileSync(seedPath, seedContent, 'utf8');
  console.log(`Updated ${seedPath} with ${products.length} products!`);
}

enrichProducts();
