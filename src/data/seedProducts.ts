import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // [1] 자유여행 (FREE TRAVEL) - 1일투어, 3박4일, 4박5일
  // ==========================================

  // --- 다낭 (Da Nang) ---
  {
    id: 'free-dn-01',
    title: '[자유여행/중부] 다낭 바나힐 국립공원 & 골든브릿지 VIP 1일 투어',
    subTitle: '세계 최장 케이블카 + 골든브릿지 + 프랑스 마을 & 케이블카 패스트트랙 + 점심 뷔페 포함',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewCount: 320,
    isPopular: true,
    departureCities: ['현지출발 (다낭 숙소 왕복픽업)'],
    tags: ['바나힐', '골든브릿지', '1일투어', '단독차량', '점심뷔페포함'],
    description: '다낭 여행의 필수 코스! 해발 1,487m 위 거대한 손이 받치고 있는 골든브릿지와 유러피안 테마파크 프랑스 마을을 하루만에 즐기는 알찬 일일 투어입니다. 단독 차량으로 호텔 픽업부터 샌딩까지 안전하게 모십니다.',
    included: ['호텔 왕복 전용 차량', '바나힐 왕복 케이블카 탑승권', '바나힐 내 뷔페 점심 식사', '전문 현지 가이드', '루프탑 테마파크 입장권'],
    excluded: ['가이드 매너팁 ($5/인)', '개인 음료 및 매너팁'],
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 -> 바나힐 이동 및 골든브릿지 관광 -> 호텔 귀환',
        description: '08:00 호텔 로비 미팅 -> 바나힐 이동 (약 45분) -> 케이블카 탑승 및 골든브릿지 산책 -> 프랑스 마을 및 판타지 파크 자유시간 -> 12:30 프리미엄 뷔페 점심 -> 15:30 하산 후 다낭 호텔 귀환',
        meal: '중식: 바나힐 럭셔리 뷔페',
        hotel: '자유여행 (숙소 미포함)'
      }
    ]
  },
  {
    id: 'free-dn-02',
    title: '[자유여행/중부] 호이안 올드타운 야경 & 투본강 등불 배 1일 투어',
    subTitle: '유네스코 올드타운 + 야시장 투어 + 소원 등불 배 탑승 & 바구니배 체험',
    category: '자유여행',
    region: '중부',
    city: '호이안',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (반일/야경투어)',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 215,
    isPopular: true,
    departureCities: ['현지출발 (다낭/호이안 숙소)'],
    tags: ['호이안', '등불배', '야시장', '바구니배', '반일투어'],
    description: '노을이 지는 호이안의 낭만! 스릴 넘치는 코코넛 바구니배 쿠킹 클래스/체험 후 밤이 되면 찬란한 등불로 물드는 호이안 올드타운과 투본강 소원배를 체험하는 베스트 야경 투어입니다.',
    included: ['전용 차량 왕복 픽업', '바구니배 탑승권', '호이안 입장권', '투본강 소원 등불 배', '호이안 현지 특식 (화이트로즈/가오라)'],
    excluded: ['개인 경비 및 음료'],
    itinerary: [
      {
        day: 1,
        title: '다낭 출발 -> 코코넛 바구니배 -> 호이안 올드타운 야경',
        description: '14:30 다낭 호텔 출발 -> 행코코넛 마을 바구니배 체험 -> 호이안 올드타운 가이드 투어 -> 현지 특식 저녁 -> 투본강 소원배 및 등불 띄우기 -> 호이안 야시장 자율 탐방 -> 20:30 호텔 귀환',
        meal: '석식: 호이안 3대 특식 (화이트로즈, 프라이드완탕, 까오라우)',
        hotel: '자유여행 (숙소 미포함)'
      }
    ]
  },
  {
    id: 'free-dn-03',
    title: '[자유여행/중부] 다낭 & 호이안 알짜 자유여행 3박 4일',
    subTitle: '공항 단독 픽업/샌딩 + 바나힐 1일 투어 + 호이안 야경 투어 + 전일정 4성급 해변 호텔',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 95000,
    priceVND: 0,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 180,
    isPopular: true,
    departureCities: ['인천', '김해', '대구', '청주'],
    tags: ['다낭자유여행', '3박4일', '바나힐포함', '공항단독픽업', '호텔포함'],
    description: '패키지의 답답함은 빼고, 자유여행의 번거로움은 줄였다! 공항 픽업부터 핵심 2대 일일투어(바나힐, 호이안)는 단독 차량으로 모시고 나머지 시간은 온전히 나의 자유시간으로 즐기는 스마트 3박 4일!',
    included: ['다낭 미케비치 4성급 호텔 3박 (조식 포함)', '공항 <-> 호텔 단독 전용차량 픽업/샌딩', '바나힐 1일 투어 (입장권/뷔페/차량)', '호이안 야경 & 바구니배 1일 투어', '여행자 보험'],
    excluded: ['왕복 항공권', '자유시간 중 개인 비용'],
    itinerary: [
      { day: 1, title: '다낭 입국 -> 단독 차량 공항 픽업 -> 호텔 체크인 & 미케비치 자유시간', description: '공항에서 고객님 피켓을 든 전담 기사 미팅 후 호텔로 이동. 체크인 후 자유 일정.', meal: '자유식', hotel: '다낭 미케비치 4성급 샌디비치/벨메종 호텔' },
      { day: 2, title: '바나힐 국립공원 & 골든브릿지 단독 1일 투어', description: '09:00 호텔 픽업 후 바나힐 이동. 케이블카, 골든브릿지, 프랑스마을 관람 및 점심 뷔페. 오후 다낭 귀환 후 자유시간.', meal: '조식: 호텔식, 중식: 바나힐 뷔페', hotel: '다낭 미케비치 4성급 호텔' },
      { day: 3, title: '오전 자유시간 -> 오후 호이안 올드타운 & 소원배 야경 투어', description: '오전 미케비치 수영 및 마사지 자유시간. 14:30 호이안 이동, 코코넛 바구니배 및 올드타운 등불 야경 탐방.', meal: '조식: 호텔식, 석식: 호이안 특식', hotel: '다낭 미케비치 4성급 호텔' },
      { day: 4, title: '다낭 시티 쇼핑 & 한시장 탐방 -> 공항 단독 샌딩', description: '체크아웃 후 한시장, 핑크성당 자율 쇼핑 후 전용 차량으로 다낭 공항 이동 및 출국.', meal: '조식: 호텔식', hotel: '기내박' }
    ]
  },
  {
    id: 'free-dn-04',
    title: '[자유여행/중부] 다낭 & 호이안 힐링 자유여행 4박 5일',
    subTitle: '5성급 리조트 4박 + 공항 픽샌딩 + 바나힐/호이안/마사지 90분 포함 Premium 자유',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 680000,
    priceVND: 0,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 140,
    departureCities: ['인천', '김해', '대구'],
    tags: ['5성급리조트', '4박5일', '마사지포함', '힐링자유', '다낭풀빌라대체가능'],
    description: '여유로운 4박 5일 다낭 여행! 5성급 럭셔리 해변 리조트에서 전일정 휴식을 즐기며, 원하는 날짜에 맞춰 바나힐과 호이안 데이투어, 전신 마사지 90분 혜택까지 제공됩니다.',
    included: ['다낭 5성급 풀만/나만리트리트 리조트 4박', '공항 단독 왕복 픽업 및 샌딩', '바나힐 1일 투어 (케이블카/뷔페 포함)', '호이안 등불 야경 투어', '전신 아로마 마사지 90분 1회권'],
    excluded: ['왕복 항공권', '자유일정 개인 경비'],
    itinerary: [
      { day: 1, title: '다낭 도착 -> VIP 단독 픽업 -> 5성급 리조트 체크인', description: '다낭 공항 도착 후 기사 미팅. 리조트 이동 후 프라이빗 비치 휴식.', meal: '자유식', hotel: '다낭 5성급 해변 리조트' },
      { day: 2, title: '바나힐 골든브릿지 1일 투어 & 전신 스파 90분', description: '바나힐 관람 후 리조트 귀환. 저녁 전신 아로마 마사지 90분으로 피로 해소.', meal: '조식: 리조트뷔페, 중식: 바나힐 뷔페', hotel: '다낭 5성급 해변 리조트' },
      { day: 3, title: '전일정 리조트 수영장 & 미케비치 힐링 자유시간', description: '하루 종일 리조트 인피니티 풀에서 수영 및 서핑, 해변 산책 자유 일정.', meal: '조식: 리조트뷔페', hotel: '다낭 5성급 해변 리조트' },
      { day: 4, title: '오후 호이안 올드타운 & 투본강 소원배 낭만 투어', description: '오후 3시 호이안 이동, 올드타운 산책, 카페 투어 및 야시장 등불 배 체험.', meal: '조식: 리조트뷔페, 석식: 호이안 럭셔리 가든 식당', hotel: '다낭 5성급 해변 리조트' },
      { day: 5, title: '체크아웃 -> 한시장 & 핑크성당 자유 쇼핑 -> 공항 샌딩', description: '리조트 체크아웃 후 시내 롯데마트/한시장 쇼핑 후 공항으로 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' }
    ]
  },

  // --- 나트랑 (Nha Trang) ---
  {
    id: 'free-nt-01',
    title: '[자유여행/중부] 나트랑 스피드보트 에메랄드 호핑 & 포나가르 1일 투어',
    subTitle: '스피드보트 스노클링 + 해상 스쿠버다이빙 체험 + 포나가르 사원 & 롱선사 시티',
    category: '자유여행',
    region: '중부',
    city: '나트랑',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 260,
    isPopular: true,
    departureCities: ['현지출발 (나트랑 시내 숙소)'],
    tags: ['나트랑', '호핑투어', '스노클링', '스피드보트', '포나가르'],
    description: '동양의 나폴리 나트랑의 맑은 바다! 최신형 스피드보트를 타고 은빛 백사장과 알록달록 해양 생태계를 스노클링으로 즐기고, 나트랑 대표 명소 포나가르 참탑 사원을 둘러봅니다.',
    included: ['호텔 왕복 전용 차량', '스피드보트 탑승 및 스노클링 장비', '해산물 점심 특식', '포나가르 참탑 입장료', '전문 가이드'],
    excluded: ['씨워커/해양스포츠 개인 옵션', '가이드 팁'],
    itinerary: [
      { day: 1, title: '호텔 픽업 -> 선착장 이동 -> 에메랄드 호핑 스노클링 -> 시티투어', description: '08:30 호텔 픽업 -> 선착장 이동 -> 혼문/혼똠 섬 스노클링 및 해양 레저 -> 섬 내 해산물 점심 -> 14:00 나트랑 시내 이동 -> 포나가르 참탑 사원 & 롱선사 관람 -> 17:00 호텔 귀환', meal: '중식: 현지 해산물 정식', hotel: '자유여행 (숙소 미포함)' }
    ]
  },
  {
    id: 'free-nt-02',
    title: '[자유여행/중부] 나트랑 오션 힐링 자유여행 3박 4일',
    subTitle: '시내 4성급 오션뷰 호텔 3박 + 공항 단독 픽샌딩 + 호핑투어 + 머드스파 체험',
    category: '자유여행',
    region: '중부',
    city: '나트랑',
    priceKRW: 680000,
    priceVND: 0,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 155,
    departureCities: ['인천', '김해'],
    tags: ['나트랑자유', '3박4일', '호핑투어포함', '머드스파', '오션뷰호텔'],
    description: '에메랄드빛 바다와 따뜻한 천연 머드 온천! 필수 액티비티인 호핑투어와 탑바 머드스파가 포함된 나트랑 알짜 3박 4일 자유여행 패키지.',
    included: ['나트랑 시내 4성급 오션뷰 호텔 3박', '공항 단독 픽업/샌딩 차량', '나트랑 스피드보트 호핑투어', '100% 천연 머드 온천 스파 이용권', '여행자 보험'],
    excluded: ['왕복 항공권', '자유식 식사비'],
    itinerary: [
      { day: 1, title: '나트랑 캄란 공항 도착 -> 단독 픽업 -> 시내 호텔 체크인', description: '공항 피켓 미팅 후 시내 호텔 이동. 나트랑 해변 산책 및 야시장 자유시간.', meal: '자유식', hotel: '나트랑 시내 4성급 노보텔/버고 호텔' },
      { day: 2, title: '나트랑 에메랄드 섬 스노클링 호핑투어', description: '08:30 스피드보트 호핑투어 출발. 스노클링, 선상 해산물 점심 식사 후 15:00 귀환.', meal: '조식: 호텔식, 중식: 해산물특식', hotel: '나트랑 시내 4성급 호텔' },
      { day: 3, title: '천연 탑바 머드 온천 스파 & 나트랑 시티 자유 일정', description: '오전 탑바 머드 온천 스파에서 머드 목욕 및 온천 수영. 오후 담시장 및 카페 투어.', meal: '조식: 호텔식', hotel: '나트랑 시내 4성급 호텔' },
      { day: 4, title: '체크아웃 -> 롯데마트 쇼핑 -> 캄란 공항 샌딩', description: '체크아웃 후 쇼핑몰 자율 관람 및 전용 차량으로 캄란 공항 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ]
  },
  {
    id: 'free-nt-03',
    title: '[자유여행/중부] 나트랑 빈원더스 올인클루시브 4박 5일',
    subTitle: '빈펄 섬 5성급 리조트 4박 + 빈원더스 테마파크/워터파크/사파리 무제한 + 공항 픽샌딩',
    category: '자유여행',
    region: '중부',
    city: '나트랑',
    priceKRW: 680000,
    priceVND: 0,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 190,
    isPopular: true,
    departureCities: ['인천', '김해', '대구'],
    tags: ['빈펄리조트', '빈원더스', '4박5일', '올인클루시브', '가족여행강추'],
    description: '아이와 부모님 모두 만족하는 환상의 섬 빈펄! 섬 전체가 테마파크와 워터파크, 사파리로 가득 찬 나트랑 빈펄 리조트에서 스피드보트를 타고 입장하는 초대형 4박 5일 자유 휴양!',
    included: ['나트랑 빈펄 리조트 & 스파 4박 (조식 포함)', '빈원더스 무제한 자유이용권 (케이블카/워터파크/사파리)', '공항 <-> 빈펄 선착장 VIP 단독 전용 차량 픽샌딩', '여행자 보험'],
    excluded: ['왕복 항공권', '자유 중식/석식'],
    itinerary: [
      { day: 1, title: '나트랑 도착 -> 전용차량 이동 -> 빈펄 섬 스피드보트 입도 & 체크인', description: '공항 미팅 후 빈펄 선착장 이동. 스피드보트로 빈펄 섬 입도 후 리조트 체크인.', meal: '자유식', hotel: '빈펄 리조트 & 스파 나트랑' },
      { day: 2, title: '빈원더스 워터파크 & 해상 케이블카 하루종일 즐기기', description: '아시아 최대급 워터파크, 해상 루지, 관람차, 분수쇼 관람.', meal: '조식: 리조트 뷔페', hotel: '빈펄 리조트 & 스파 나트랑' },
      { day: 3, title: '빈원더스 사파리 & 분수쇼 & 프라이빗 비치 휴식', description: '야생 동물원 사파리 탐방 및 리조트 내 프라이빗 비치 해양 스포츠.', meal: '조식: 리조트 뷔페', hotel: '빈펄 리조트 & 스파 나트랑' },
      { day: 4, title: '빈펄 섬 메인 수영장 힐링 & 시내 맛집 자유 나들이', description: '스피드보트로 시내 나와 맛집 및 발마사지 탐방 후 섬 복귀.', meal: '조식: 리조트 뷔페', hotel: '빈펄 리조트 & 스파 나트랑' },
      { day: 5, title: '체크아웃 -> 시내 쇼핑 -> 캄란 공항 단독 샌딩', description: '섬 출도 후 시내 롯데마트 쇼핑 후 공항 이동.', meal: '조식: 리조트 뷔페', hotel: '기내박' }
    ]
  },

  // --- 푸꾸옥 (Phu Quoc) ---
  {
    id: 'free-pq-01',
    title: '[자유여행/남부] 푸꾸옥 혼똠섬 해상 케이블카 & 썬월드 워터파크 1일 투어',
    subTitle: '세계 기네스북 등재 7.9km 해상 케이블카 + 아쿠아토피아 워터파크 + 픽업 차량',
    category: '자유여행',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 210,
    isPopular: true,
    departureCities: ['현지출발 (푸꾸옥 호텔)'],
    tags: ['푸꾸옥', '혼똠섬', '케이블카', '워터파크', '1일투어'],
    description: '푸꾸옥 최고의 하이라이트! 바다 위를 가로지르는 7.9km 세계 최장 해상 케이블카를 타고 혼똠섬 아쿠아토피아 워터파크와 썬월드 테마파크를 하루에 만끽하는 일일 투어입니다.',
    included: ['호텔 왕복 전용 차량', '혼똠섬 왕복 해상 케이블카 탑승권', '아쿠아토피아 워터파크 입장권', '점심 뷔페 식사권', '전문 가이드'],
    excluded: ['개인 매너팁 및 소지품 라커 대여료'],
    itinerary: [
      { day: 1, title: '호텔 픽업 -> 썬셋타운 케이블카 승강장 -> 혼똠섬 워터파크 -> 호텔 귀환', description: '09:00 호텔 픽업 -> 앙코르와트 양식의 썬셋타운 관람 -> 7.9km 케이블카 타고 혼똠섬 이동 -> 워터파크 및 롤러코스터 이용 -> 점심 뷔페 -> 16:00 케이블카 하산 후 호텔 귀환', meal: '중식: 혼똠섬 뷔페', hotel: '자유여행 (숙소 미포함)' }
    ]
  },
  {
    id: 'free-pq-02',
    title: '[자유여행/남부] 푸꾸옥 에메랄드 자유여행 3박 4일',
    subTitle: '4성급 노보텔/솔바이멜리아 3박 + 공항 픽샌딩 + 혼똠섬 케이블카 + 야시장 투어',
    category: '자유여행',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 680000,
    priceVND: 0,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 130,
    departureCities: ['인천', '김해'],
    tags: ['푸꾸옥자유', '3박4일', '케이블카포함', '공항픽샌딩', '해변리조트'],
    description: '베트남의 숨겨진 보석 푸꾸옥! 깨끗한 에메랄드 빛 바다와 아름다운 일몰, 츠엉비치 리조트에서 편안히 쉬며 핵심 투어만 쏙쏙 골라 만든 알짜 자유여행.',
    included: ['푸꾸옥 4성급 노보텔/솔바이멜리아 리조트 3박', '공항 <-> 리조트 단독 전용 차량 픽업/샌딩', '혼똠섬 해상 케이블카 & 워터파크 1일 투어', '츠엉비치 야시장 샌딩 1회', '여행자 보험'],
    excluded: ['왕복 항공권', '자유일정 개인 비용'],
    itinerary: [
      { day: 1, title: '푸꾸옥 국제공항 도착 -> 단독 전용차량 피켓 미팅 -> 리조트 체크인', description: '공항 도착 후 기사 미팅. 리조트 체크인 후 석양 감상.', meal: '자유식', hotel: '푸꾸옥 4성급 노보텔 리조트' },
      { day: 2, title: '혼똠섬 해상 케이블카 & 아쿠아토피아 워터파크 투어', description: '09:00 혼똠섬 이동. 케이블카 탑승, 워터파크 및 뷔페 점심 식사.', meal: '조식: 리조트뷔페, 중식: 혼똠섬 뷔페', hotel: '푸꾸옥 4성급 노보텔 리조트' },
      { day: 3, title: '사파리 & 그랜드월드 자유 탐방 or 리조트 프라이빗 비치 휴식', description: '자유일정. 빈펄 사파리 탐방 및 츠엉비치 즈엉동 야시장 나들이.', meal: '조식: 리조트뷔페', hotel: '푸꾸옥 4성급 노보텔 리조트' },
      { day: 4, title: '체크아웃 -> 킹콩마트 쇼핑 -> 푸꾸옥 공항 단독 샌딩', description: '체크아웃 후 킹콩마트 쇼핑 후 전용차량으로 공항 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' }
    ]
  },
  {
    id: 'free-pq-03',
    title: '[자유여행/남부] 푸꾸옥 힐링 파라다이스 럭셔리 자유여행 4박 5일',
    subTitle: '5성급 프리미어 빌리지/리젠트 4박 + 공항 VIP 픽샌딩 + 빈펄사파리 & 그랜드월드 포함',
    category: '자유여행',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 680000,
    priceVND: 0,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 165,
    isPopular: true,
    departureCities: ['인천', '김해'],
    tags: ['5성급럭셔리', '푸꾸옥4박5일', '사파리포함', '그랜드월드', '완벽자유'],
    description: '최상급 5성 리조트에서 맛보는 천국의 휴식! 푸꾸옥 북부 빈펄 사파리와 이탈리아 베네치아를 닮은 그랜드월드 운하 투어, 그리고 여유로운 4박의 프리미엄 자유시간.',
    included: ['푸꾸옥 5성급 프리미어빌리지 / 리젠트 4박', '공항 VIP 단독 픽업 및 샌딩 서비스', '빈펄 사파리 단독 입장권 & 셔틀', '그랜드월드 수상 곤돌라 체험권', '전신 마사지 90분 1회권'],
    excluded: ['왕복 항공권', '자유식 식사'],
    itinerary: [
      { day: 1, title: '푸꾸옥 도착 -> VIP 피켓 미팅 -> 5성급 리조트 체크인', description: '공항 도착 후 전용 리무진 차량 탑승. 리조트 체크인 후 석양 웰컴 드링크.', meal: '자유식', hotel: '푸꾸옥 5성급 리젠트/프리미어빌리지' },
      { day: 2, title: '아시아 최대 야생 빈펄 사파리 & 그랜드월드 분수쇼', description: '빈펄 사파리 버스 탐방 후 그랜드월드 이동. 곤돌라 체험 및 야간 분수 레이저쇼 관람.', meal: '조식: 리조트뷔페', hotel: '푸꾸옥 5성급 리젠트 리조트' },
      { day: 3, title: '전일정 프라이빗 풀 & 해변 휴식 & 스파 90분', description: '리조트 인피니티 풀 수영 및 고급 전신 아로마 마사지 90분 케어.', meal: '조식: 리조트뷔페', hotel: '푸꾸옥 5성급 리젠트 리조트' },
      { day: 4, title: '남부 썬셋타운 키스오브더씨 쇼 & 즈엉동 야시장', description: '오후 썬셋타운 이동. 키스 브릿지 산책 및 야간 멀티미디어 불꽃쇼 관람.', meal: '조식: 리조트뷔페', hotel: '푸꾸옥 5성급 리젠트 리조트' },
      { day: 5, title: '리조트 힐링 체크아웃 -> 기념품 쇼핑 -> 공항 VIP 샌딩', description: '체크아웃 후 진주 농장 & 특산품 쇼핑 후 공항 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' }
    ]
  },

  // --- 하노이 / 북부 (Hanoi / Halong / Ninh Binh / Sapa) ---
  {
    id: 'free-hn-01',
    title: '[자유여행/북부] 하롱베이 럭셔리 당일 선상 크루즈 1일 투어',
    subTitle: '하노이 호텔 왕복 픽업 + 5성급 당일 크루즈 + 선상 뷔페 + 티톱섬 & 승솟동굴',
    category: '자유여행',
    region: '북부',
    city: '하롱베이',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 310,
    isPopular: true,
    departureCities: ['현지출발 (하노이 호안끼엠 숙소)'],
    tags: ['하롱베이', '당일크루즈', '선상뷔페', '티톱섬', '하노이출발'],
    description: '하노이에서 출발하는 하롱베이 최고의 일일 투어! 리무진 버스로 편안하게 이동하여 최고급 당일 럭셔리 크루즈에 승선, 승솟 동굴과 티톱섬 정상 전망, 카약 체험을 하루만에 즐깁니다.',
    included: ['하노이 호안끼엠 구역 호텔 왕복 리무진 버스', '5성급 당일 크루즈 승선권', '선상 해산물 럭셔리 뷔페 점심', '티톱섬, 승솟동굴 입장료', '카약 또는 밤부보트 탑승료', '영어/한국어 가이드'],
    excluded: ['음료 비용 및 매너팁 ($5)'],
    itinerary: [
      { day: 1, title: '하노이 출발 -> 하롱베이 선착장 -> 5성 크루즈 탑승 -> 하노이 복귀', description: '08:00 하노이 호텔 리무진 픽업 -> 고속도로 이동 (약 2.5시간) -> 하롱베이 승선 -> 해산물 선상 뷔페 -> 승솟 동굴 탐험 -> 티톱섬 정상 등반 및 수영 -> 카약 체험 -> 20:30 하노이 호텔 도착', meal: '중식: 크루즈 선상 해산물 뷔페', hotel: '자유여행 (숙소 미포함)' }
    ]
  },
  {
    id: 'free-hn-02',
    title: '[자유여행/북부] 닌빈 짱안 삼판배 보트 & 항무아 전망대 1일 투어',
    subTitle: '유네스코 육지의 하롱베이 짱안 동굴 보트 + 항무아 용 동상 정상 전망대',
    category: '자유여행',
    region: '북부',
    city: '닌빈',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: 'https://images.unsplash.com/photo-1509030450996-93f2e3d84074?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 195,
    departureCities: ['현지출발 (하노이 시내)'],
    tags: ['닌빈', '짱안', '항무아', '육지의하롱베이', '보트투어'],
    description: '영화 인디아나존스와 킹콩의 촬영지! 웅장한 기암괴석 사이 동굴을 사공이 저어주는 삼판배 보트로 통과하고 항무아 500계단을 올라 신비로운 닌빈의 파노라마 전경을 감상합니다.',
    included: ['하노이 왕복 리무진 전용차량', '짱안 유네스코 나룻배 보트 탑승권', '항무아 입장료', '현지 염소고기/특식 점심', '전문 가이드'],
    excluded: ['개인 음료 및 매너팁'],
    itinerary: [
      { day: 1, title: '하노이 픽업 -> 닌빈 이동 -> 짱안 동굴 보트 -> 항무아 정상 -> 하노이 귀환', description: '08:00 하노이 출발 -> 닌빈 이동 -> 짱안 2시간 동굴 보트 투어 -> 현지 점심 식사 -> 항무아 500계단 등반 및 정상 용 동상 사진 촬영 -> 19:00 하노이 호텔 귀환', meal: '중식: 닌빈 현지 특식', hotel: '자유여행 (숙소 미포함)' }
    ]
  },
  {
    id: 'free-hn-03',
    title: '[자유여행/북부] 하노이 & 하롱베이 클래식 자유여행 3박 4일',
    subTitle: '하노이 4성급 호텔 2박 + 하롱베이 5성 크루즈 1박 + 공항 단독 픽샌딩',
    category: '자유여행',
    region: '북부',
    city: '하노이',
    priceKRW: 680000,
    priceVND: 0,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 175,
    departureCities: ['인천', '김해', '대구'],
    tags: ['하노이자유', '3박4일', '크루즈1박', '공항픽샌딩', '북부베스트'],
    description: '하노이의 고풍스러운 36거리 문화와 하롱베이 수평선 위 5성 크루즈에서 보내는 환상적인 1박 2일! 이동 걱정 없는 전용차량 결합 자유 패키지.',
    included: ['하노이 4성급 시내 호텔 2박', '하롱베이 5성급 럭셔리 크루즈 1박 (전일정 식사 포함)', '공항 단독 픽업 및 샌딩', '하노이 <-> 하롱베이 전용 리무진 이동', '여행자 보험'],
    excluded: ['왕복 항공권', '자유시간 개인 경비'],
    itinerary: [
      { day: 1, title: '하노이 노이바이 공항 도착 -> 단독 전용차량 미팅 -> 호텔 체크인', description: '공항 피켓 미팅 후 하노이 시내 호텔 이동. 호안끼엠 호수 및 맥주거리 자유 탐방.', meal: '자유식', hotel: '하노이 시내 4성급 호텔' },
      { day: 2, title: '하노이 출발 -> 하롱베이 승선 -> 5성 크루즈 1박 2일 시작', description: '오전 전용 리무진 타고 하롱베이 이동. 12:00 크루즈 승선, 선상 뷔페, 동굴 탐험 및 선상 태극권.', meal: '조식: 호텔식, 중식: 선상뷔페, 석식: 선상코스요리', hotel: '하롱베이 5성급 럭셔리 크루즈 (선상 1박)' },
      { day: 3, title: '하롱베이 일출 및 카약 -> 하노이 복귀 -> 성요셉성당 & 마사지 자유', description: '크루즈 일출 관람 후 카약 체험. 하선 후 하노이 복귀. 마사지 및 성요셉 성당 야경 자유시간.', meal: '조식: 선상식, 중식: 선상브런치', hotel: '하노이 시내 4성급 호텔' },
      { day: 4, title: '하노이 바딘광장 & 분짜 맛집 탐방 -> 공항 단독 샌딩', description: '체크아웃 후 바딘광장 및 유명 분짜 맛집 탐방 후 노이바이 공항으로 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ]
  },
  {
    id: 'free-hn-04',
    title: '[자유여행/북부] 하노이, 하롱베이 & 닌빈 3대 명소 자유여행 4박 5일',
    subTitle: '하노이 3박 + 하롱베이 당일 크루즈 + 닌빈 짱안 보트 + 단독 차량 포함',
    category: '자유여행',
    region: '북부',
    city: '하노이',
    priceKRW: 680000,
    priceVND: 0,
    duration: '4박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1509030450996-93f2e3d84074?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 140,
    departureCities: ['인천', '김해'],
    tags: ['하노이4박5일', '하롱베이당일', '닌빈짱안', '공항픽샌딩', '북부완전정복'],
    description: '베트남 북부 핵심 3대 명소(하노이 시티, 하롱베이, 닌빈 짱안)를 단독 전용 차량으로 가장 쾌적하게 여행하는 4박 5일 프리미엄 자유여행!',
    included: ['하노이 4성급/5성급 호텔 4박', '공항 단독 왕복 픽샌딩 차량', '하롱베이 럭셔리 당일 크루즈 투어 (선상뷔페)', '닌빈 짱안 보트 & 항무아 1일 투어', '여행자 보험'],
    excluded: ['왕복 항공권', '자유시간 개인 비용'],
    itinerary: [
      { day: 1, title: '하노이 도착 -> 단독 픽업 -> 호텔 체크인 & 호안끼엠 야시장', description: '하노이 공항 도착 후 기사 미팅. 호텔 체크인 후 36거리 및 호안끼엠 야시장 자율 탐방.', meal: '자유식', hotel: '하노이 4성급/5성급 호텔' },
      { day: 2, title: '유네스코 세계유산 하롱베이 럭셔리 당일 크루즈 투어', description: '08:00 리무진 차량 탑승, 하롱베이 이동. 5성 당일 크루즈 탑승 및 선상 뷔페, 승솟동굴 관람.', meal: '조식: 호텔식, 중식: 크루즈 뷔페', hotel: '하노이 4성급/5성급 호텔' },
      { day: 3, title: '육지의 하롱베이 닌빈 짱안 보트 & 항무아 1일 투어', description: '닌빈 이동 후 짱안 삼판배 동굴 탐험 및 항무아 전망대 500계단 등반.', meal: '조식: 호텔식, 중식: 닌빈 특식', hotel: '하노이 4성급/5성급 호텔' },
      { day: 4, title: '하노이 시티 스트릿푸드 & 힐링 스파 자유일정', description: '하노이 문묘, 바딘광장, 기찻길 마을 카페 탐방 및 전신 스파 자유시간.', meal: '조식: 호텔식', hotel: '하노이 4성급/5성급 호텔' },
      { day: 5, title: '체크아웃 -> 롯데센터 전망대 & 한인타운 쇼핑 -> 공항 샌딩', description: '체크아웃 후 롯데센터 전망대 및 기념품 쇼핑 후 공항 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ]
  },

  // --- 호치민 (Ho Chi Minh) ---
  {
    id: 'free-hcm-01',
    title: '[자유여행/남부] 호치민 시티 명소 & 메콩강 정글 나룻배 1일 투어',
    subTitle: '통일궁/노트르담 성당 + 메콩강 유람선 & 코코넛 정글 나룻배 + 통돼지 구이 점심',
    category: '자유여행',
    region: '남부',
    city: '호치민',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 185,
    departureCities: ['현지출발 (호치민 1군 호텔)'],
    tags: ['호치민', '메콩강', '정글나룻배', '시티투어', '1일투어'],
    description: '베트남 경제의 중심 호치민 시티 명소와 어머니의 강 메콩강 정글을 사공이 저어주는 정글 나룻배로 탐험하는 남부 최고의 베스트 일일 투어입니다.',
    included: ['호치민 1군 호텔 왕복 전용 차량', '메콩강 유람선 및 정글 나룻배 탑승권', '메콩 현지 특식 점심 (코끼리귀고기/열대과일)', '전문 가이드'],
    excluded: ['개인 매너팁 및 음료'],
    itinerary: [
      { day: 1, title: '호치민 출발 -> 메콩강 미토 이동 -> 정글 보트 탐험 -> 호치민 귀환', description: '08:00 호텔 픽업 -> 미토 이동 (약 1.5시간) -> 유람선 탑승 및 코코넛 섬 탐방 -> 사공이 젓는 정글 나룻배 탑승 -> 현지 특식 점심 -> 호치민 귀환 후 통일궁 & 중앙우체국 관람 -> 17:30 호텔 귀환', meal: '중식: 메콩 코끼리귀고기 현지 특식', hotel: '자유여행 (숙소 미포함)' }
    ]
  },
  {
    id: 'free-hcm-02',
    title: '[자유여행/남부] 호치민 & 메콩강 활력 자유여행 3박 4일',
    subTitle: '1군 중심 4성급 호텔 3박 + 공항 단독 픽샌딩 + 메콩강 1일 투어 + 벤탄야시장',
    category: '자유여행',
    region: '남부',
    city: '호치민',
    priceKRW: 95000,
    priceVND: 0,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 120,
    departureCities: ['인천', '김해'],
    tags: ['호치민자유', '3박4일', '메콩강투어', '공항픽샌딩', '벤탄야시장'],
    description: '화려한 루프탑 바와 맛있는 먹거리가 넘치는 호치민! 공항 픽샌딩 및 메콩강 데이투어가 포함된 활력 넘치는 자유여행 패키지.',
    included: ['호치민 1군 중심 4성급 호텔 3박', '공항 단독 전용 차량 픽업/샌딩', '메콩강 정글 보트 1일 투어', '여행자 보험'],
    excluded: ['왕복 항공권', '자유시간 개인 경비'],
    itinerary: [
      { day: 1, title: '호치민 딴손누트 공항 도착 -> 단독 픽업 -> 1군 호텔 체크인', description: '공항 피켓 미팅 후 1군 호텔 이동. 체크인 후 벤탄 야시장 및 부이비엔 여행자거리 탐방.', meal: '자유식', hotel: '호치민 1군 4성급 호텔' },
      { day: 2, title: '메콩강 정글 나룻배 & 코코넛 농장 1일 투어', description: '08:00 미토 메콩강 이동. 정글 나룻배, 열대과일 시식 및 민속 공연 관람.', meal: '조식: 호텔식, 중식: 메콩 특식', hotel: '호치민 1군 4성급 호텔' },
      { day: 3, title: '호치민 시티 명소 & 카페 아파트먼트 & 루프탑바 자유시간', description: '노트르담 성당, 중앙우체국, 응우옌후에 거리 카페 아파트먼트 및 루프탑바 탐방.', meal: '조식: 호텔식', hotel: '호치민 1군 4성급 호텔' },
      { day: 4, title: '체크아웃 -> 사이공 센터 쇼핑 -> 공항 단독 샌딩', description: '체크아웃 후 사이공센터 쇼핑몰 관람 후 공항 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ]
  },

  // --- 달랏 (Da Lat) ---
  {
    id: 'free-dl-01',
    title: '[자유여행/남부] 달랏 로맨틱 꽃의 도시 & 랑비앙산 1일 투어',
    subTitle: '랑비앙산 지프차 정상 등반 + 바오다이 황제 궁전 + 다딴라 폭포 루지 체험',
    category: '자유여행',
    region: '남부',
    city: '달랏',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 200,
    isPopular: true,
    departureCities: ['현지출발 (달랏 시내 숙소)'],
    tags: ['달랏', '랑비앙산', '다딴라폭포', '루지체험', '1일투어'],
    description: '베트남의 영원한 봄의 도시 달랏! 시원한 고원 지대 랑비앙산 지프차 정상 탑승과 다딴라 폭포 알파인 루지 체험, 크레이지 하우스를 하루에 만나는 로맨틱 투어입니다.',
    included: ['달랏 시내 호텔 왕복 전용 차량', '랑비앙산 정상 지프차 탑승권', '다딴라 폭포 왕복 루지 탑승권', '크레이지하우스 입장료', '전문 가이드'],
    excluded: ['개인 매너팁 및 소지품 라커료'],
    itinerary: [
      { day: 1, title: '달랏 호텔 픽업 -> 랑비앙산 지프차 -> 다딴라 폭포 루지 -> 달랏 야시장', description: '08:30 호텔 픽업 -> 랑비앙산 지프차 타고 정상 등반 -> 다딴라 폭포 알파인 루지 체험 -> 현지 점심 -> 크레이지 하우스 관람 -> 17:00 달랏 야시장 해산 및 호텔 귀환', meal: '중식: 달랏 현지 수압 특식', hotel: '자유여행 (숙소 미포함)' }
    ]
  },
  {
    id: 'free-dl-02',
    title: '[자유여행/남부] 달랏 힐링 고원 자유여행 3박 4일',
    subTitle: '4성급 고풍 호텔 3박 + 공항 단독 픽샌딩 + 랑비앙산/루지 1일 투어 + 쑤언흐엉 호수',
    category: '자유여행',
    region: '남부',
    city: '달랏',
    priceKRW: 95000,
    priceVND: 0,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 160,
    departureCities: ['인천', '김해'],
    tags: ['달랏자유', '3박4일', '시원한고원', '루지포함', '공항픽샌딩'],
    description: '해발 1,500m 상쾌한 공기와 고풍스러운 프랑스풍 기차역, 예쁜 예쁜 예쁜 예쁜 감성 카페가 가득한 달랏 힐링 3박 4일 자유여행!',
    included: ['달랏 시내 4성급 호텔 3박', '달랏 공항 <-> 호텔 단독 전용차량 픽샌딩', '달랏 랑비앙산 & 다딴라 폭포 루지 1일 투어', '여행자 보험'],
    excluded: ['왕복 항공권', '자유 식사비'],
    itinerary: [
      { day: 1, title: '달랏 공항 도착 -> 단독 픽업 -> 호텔 체크인 & 쑤언흐엉 호수 산책', description: '달랏 공항 도착 후 피켓 기사 미팅. 호텔 체크인 후 쑤언흐엉 호수 자전거 및 야시장 관람.', meal: '자유식', hotel: '달랏 시내 4성급 호텔' },
      { day: 2, title: '랑비앙산 지프차 & 다딴라 폭포 알파인 루지 1일 투어', description: '08:30 랑비앙산 정상 지프차 등반, 다딴라 폭포 루지 탑승 및 크레이지 하우스 관람.', meal: '조식: 호텔식, 중식: 달랏 특식', hotel: '달랏 시내 4성급 호텔' },
      { day: 3, title: '달랏 구기차역 & 죽림선원 & 감성 카페거리 자유시간', description: '빈티지 달랏 기차역 산책 및 수국 언덕, 숲속 감성 카페 자율 탐방.', meal: '조식: 호텔식', hotel: '달랏 시내 4성급 호텔' },
      { day: 4, title: '체크아웃 -> 달랏 야시장 특산품 쇼핑 -> 공항 샌딩', description: '체크아웃 후 달랏 아티초크 차 및 와인 쇼핑 후 공항 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ]
  },

  // --- 사파 (Sapa) ---
  {
    id: 'free-sp-01',
    title: '[자유여행/북부] 사파 판시판 모노레일 & 캣캣 소수민족 마을 1일 투어',
    subTitle: '인도차이나 지붕 해발 3,143m 판시판 케이블카 + 캣캣 소수민족 마을 트레킹',
    category: '자유여행',
    region: '북부',
    city: '사파',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (데이투어)',
    imageUrl: '/src/assets/images/sapa_fansipan_terraces_1786458401102.jpg',
    rating: 4.9,
    reviewCount: 220,
    isPopular: true,
    departureCities: ['현지출발 (사파 시내 숙소)'],
    tags: ['사파', '판시판', '캣캣마을', '소수민족', '1일투어'],
    description: '구름 위의 도시 사파! 해발 3,143m 인도차이나 최고봉 판시판 산을 케이블카와 모노레일로 정복하고, 흐몽족이 거주하는 유화 같은 캣캣 마을을 거니는 환상의 일일 투어.',
    included: ['사파 시내 호텔 왕복 차량', '판시판 왕복 케이블카 & 산악 모노레일 탑승권', '캣캣마을 입장료', '현지 특식 점심', '전문 가이드'],
    excluded: ['개인 매너팁'],
    itinerary: [
      { day: 1, title: '사파 픽업 -> 판시판 케이블카 & 모노레일 -> 캣캣마을 트레킹 -> 사파 귀환', description: '08:30 사파 시내 픽업 -> 판시판 케이블카 탑승 및 3,143m 정상 관람 -> 점심 식사 -> 캣캣 소수민족 마을 산책 및 은하수 폭포 감상 -> 17:00 호텔 귀환', meal: '중식: 사파 현지 연어/철송어 특식', hotel: '자유여행 (숙소 미포함)' }
    ]
  },
  {
    id: 'free-sp-02',
    title: '[자유여행/북부] 사파 구름위의 힐링 자유여행 3박 4일',
    subTitle: '하노이 출발 VIP 캐빈 침대버스 + 사파 4성급 뷰 호텔 2박 + 판시판 & 캣캣마을 포함',
    category: '자유여행',
    region: '북부',
    city: '사파',
    priceKRW: 680000,
    priceVND: 0,
    duration: '3박 4일',
    imageUrl: '/src/assets/images/sapa_fansipan_terraces_1786458401102.jpg',
    rating: 4.9,
    reviewCount: 150,
    departureCities: ['하노이출발 / 인천'],
    tags: ['사파자유', '3박4일', '판시판포함', '침대버스', '구름위의휴양'],
    description: '하노이에서 편안하게 최고급 럭셔리 캐빈 버스를 타고 이동하여 신비로운 안개 도시 사파의 계단식 논과 판시판 산을 여유롭게 감상하는 3박 4일 자유여행!',
    included: ['하노이 <-> 사파 왕복 VIP 럭셔리 캐빈 버스', '사파 4성급 마운틴뷰 호텔 2박 (하노이 1박 또는 야간버스)', '판시판 케이블카 & 모노레일 탑승권', '캣캣마을 1일 투어', '여행자 보험'],
    excluded: ['왕복 항공권', '개인 비용'],
    itinerary: [
      { day: 1, title: '하노이 출발 -> VIP 캐빈 침대버스 탑승 -> 사파 도착 & 호텔 체크인', description: '하노이 승차장에서 캐빈 버스 탑승 (약 5.5시간). 사파 도착 후 호텔 체크인 및 사파 성당 야경.', meal: '자유식', hotel: '사파 4성급 마운틴뷰 호텔' },
      { day: 2, title: '판시판 3,143m 정상 케이블카 & 캣캣 소수민족 마을 투어', description: '판시판 케이블카 탑승 후 정상 구름 바다 감상. 오후 캣캣 마을 트레킹.', meal: '조식: 호텔식, 중식: 사파 특식', hotel: '사파 4성급 마운틴뷰 호텔' },
      { day: 3, title: '함롱산 전망대 & 사파 감성 카페 자율 탐방 -> 하노이 복귀', description: '오전 함롱산 꽃정원 및 사파 호수 산책. 오후 VIP 캐빈 버스 타고 하노이 복귀.', meal: '조식: 호텔식', hotel: '하노이 4성급 호텔' },
      { day: 4, title: '하노이 공항 이동 및 출국', description: '하노이 시내 쇼핑 후 노이바이 공항으로 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ]
  },


  // ==========================================
  // [2] 골프 투어 (GOLF TOUR) - 18홀 1일, 54홀 3박4일, 72홀 4박5일
  // ==========================================

  // --- 다낭 (Da Nang Golf) ---
  {
    id: 'golf-dn-18',
    title: '[골프투어/중부] 다낭 BRG Golf Resort 18홀 데일리 라운딩 (단독 픽업 포함)',
    subTitle: '잭 니클라우스 & 노먼 코스 18홀 + 그린피, 카트, 캐디피 전액 포함 + 단독 픽업/샌딩',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (18홀 라운딩)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 180,
    isPopular: true,
    departureCities: ['현지출발 (다낭/호이안 호텔)'],
    tags: ['BRG골프', '18홀', '그린피포함', '캐디피포함', '단독픽업'],
    description: '세계적인 골프 거장 잭 니클라우스와 그렉 노먼이 설계한 베트남 최고 명문 코스! 그린피, 전동카트(2인1카트), 캐디피가 모두 포함된 깔끔한 1일 데일리 18홀 라운딩.',
    included: ['BRG 다낭 Golf Resort 18홀 그린피', '전동카트비 (2인 1카트)', '1인 1캐디피', '호텔 <-> 골프장 단독 전용차량 왕복 픽업'],
    excluded: ['캐디 매너팁 (18홀당 approx $15/인)', '클럽하우스 개인 중식/음료'],
    itinerary: [
      { day: 1, title: '호텔 단독 픽업 -> BRG 다낭 CC 18홀 라운딩 -> 호텔 귀환', description: '원하시는 티타임 1시간 전 호텔 단독 전용차량 픽업 -> BRG 다낭 CC 도착 및 티업 -> 18홀 라운딩 후 클럽하우스 샤워 -> 호텔 귀환', meal: '자유식', hotel: '자유여행 (숙소 미포함)' }
    ],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['BRG Da Nang Golf Resort'],
      courseDetails: [
        { name: 'BRG Da Nang Golf Resort', designer: 'Jack Nicklaus & Greg Norman', holes: 18, description: '아시아 최초의 듀얼 아키텍트 해안 링크스 코스로 모래 언덕과 넓은 페어웨이가 매력적인 명문 CC.', difficulty: '상' }
      ]
    }
  },
  {
    id: 'golf-dn-54',
    title: '[골프투어/중부] 다낭 BRG & 바나힐 명문 CC 럭셔리 골프 3박 4일 (54홀 Stay & Play)',
    subTitle: 'BRG + 바나힐 + 몽고메리 3대 명문 코스 54홀 + 5성급 해변 리조트 3박 + VIP 차량',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 890000,
    priceVND: 0,
    duration: '3박 4일 (54홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 210,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '김해', '대구'],
    tags: ['54홀골프', '다낭명문CC', '5성급리조트', 'BRG', '바나힐CC', '몽고메리'],
    description: '다낭 최고 인기 54홀 콤보! 매일 서로 다른 최고급 명문 골프장(BRG, 바나힐, 몽고메리)에서 펼쳐지는 챔피언십 라운딩과 5성 리조트에서의 달콤한 휴식.',
    included: ['다낭 5성급 풀만/나만리트리트 리조트 3박 (2인1실/조식)', '전일정 54홀 그린피 + 카트비 + 캐디피', '공항 및 전일정 골프장 전용 차량 이동', '전일정 전문 한국어 가이드 지원', '여행자 보험'],
    excluded: ['왕복 항공권', '캐디팁 ($15/18홀/인)', '클럽하우스 중식'],
    itinerary: [
      { day: 1, title: '다낭 입국 -> 공항 미팅 -> BRG 다낭 CC 18홀 라운딩 -> 리조트 체크인', description: '오전 공항 미팅 후 BRG CC로 이동, 18홀 라운딩. 종료 후 리조트 체크인 및 씨푸드 저녁 식사.', meal: '석식: 다낭 프리미엄 씨푸드 특식', hotel: '다낭 5성급 해변 리조트' },
      { day: 2, title: '바나힐 CC (루크 도널드 설계) 18홀 야간/주간 라운딩', description: '산세와 계곡이 아우러진 아시아 베스트 바나힐 CC 18홀 라운딩 후 마사지 90분 케어.', meal: '조식: 리조트뷔페, 석식: 현지 삼겹살/한식 특식', hotel: '다낭 5성급 해변 리조트' },
      { day: 3, title: '몽고메리 링크스 CC 18홀 라운딩 & 호이안 야경', description: '콜린 몽고메리가 설계한 해안가 링크스 몽고메리 18홀 라운딩. 오후 호이안 올드타운 야경 관람.', meal: '조식: 리조트뷔페, 석식: 호이안 가든 정식', hotel: '다낭 5성급 해변 리조트' },
      { day: 4, title: '리조트 체크아웃 -> 한시장/롯데마트 쇼핑 -> 공항 샌딩', description: '체크아웃 후 쇼핑 및 마사지 이용 후 다낭 공항으로 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' }
    ],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['BRG Da Nang Golf Resort', 'Ba Na Hills Golf Club', 'Montgomerie Links'],
      courseDetails: [
        { name: 'BRG Da Nang Golf Resort', designer: 'Jack Nicklaus', holes: 18, description: '바다 향기와 모래 언덕이 공존하는 다낭의 대표 명문 코스.', difficulty: '상' },
        { name: 'Ba Na Hills Golf Club', designer: 'Luke Donald', holes: 18, description: '세계 베스트 골프 코스로 선정된 웅장한 야간 조명 보유 코스.', difficulty: '최상' },
        { name: 'Montgomerie Links', designer: 'Colin Montgomerie', holes: 18, description: '전통 라이더컵 영웅이 설계한 유럽풍 스코틀랜드 링크스 스타일.', difficulty: '중상' }
      ]
    }
  },
  {
    id: 'golf-dn-72',
    title: '[골프투어/중부] 다낭 4대 명문 코스 VIP 골프 4박 5일 (72홀 Stay & Play)',
    subTitle: 'BRG + 바나힐 + 몽고메리 + 빈펄 남호이안 72홀 + 5성 풀빌라/리조트 + 리무진 전용차',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 890000,
    priceVND: 0,
    duration: '4박 5일 (72홀)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 120,
    departureCities: ['인천', '김해'],
    tags: ['72홀골프', '다낭4대명문', 'VIP리무진', '남호이안빈펄', '황제골프'],
    description: '골프 마니아를 위한 완벽한 황제 골프! 다낭과 호이안의 4대 챔피언십 코스(BRG, 바나힐, 몽고메리, 빈펄 남호이안)를 총 72홀 도는 최상급 투어.',
    included: ['5성급 럭셔리 리조트/풀빌라 4박 (2인1실/조식)', '전일정 72홀 그린피 + 전동카트 + 캐디피', '전일정 VIP 리무진 차량 및 가이드', '전신 마사지 90분 2회 제공', '여행자 보험'],
    excluded: ['왕복 항공권', '캐디팁 ($15/18홀/인)'],
    itinerary: [
      { day: 1, title: '다낭 도착 -> BRG 다낭 CC 18홀 라운딩 -> 5성 리조트 체크인', description: '공항 도착 후 이동, 첫날 BRG 18홀 라운딩. 저녁 최고급 씨푸드 특식.', meal: '석식: 프리미엄 해산물 뷔페', hotel: '다낭 5성급 럭셔리 리조트' },
      { day: 2, title: '바나힐 CC 18홀 라운딩 & 마사지 90분', description: '아시아 넘버원 바나힐 CC 18홀 라운딩. 저녁 전신 마사지 케어.', meal: '조식: 리조트뷔페', hotel: '다낭 5성급 럭셔리 리조트' },
      { day: 3, title: '몽고메리 링크스 18홀 라운딩 & 호이안 등불 올드타운', description: '몽고메리 링크스 18홀 라운딩 후 호이안 올드타운 및 투본강 야경 탐방.', meal: '조식: 리조트뷔페', hotel: '다낭 5성급 럭셔리 리조트' },
      { day: 4, title: '빈펄 남호이안 CC 18홀 라운딩 & 고급 마사지', description: '아름다운 야생 자연 속 빈펄 남호이안 CC 18홀 라운딩.', meal: '조식: 리조트뷔페', hotel: '다낭 5성급 럭셔리 리조트' },
      { day: 5, title: '리조트 힐링 체크아웃 -> 쇼핑 -> 공항 VIP 샌딩', description: '체크아웃 후 롯데마트/한시장 쇼핑 후 공항으로 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' }
    ],
    golfSpecs: {
      holes: 72,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['BRG Da Nang Golf Resort', 'Ba Na Hills Golf Club', 'Montgomerie Links', 'Vinpearl Golf Nam Hoi An'],
      courseDetails: [
        { name: 'BRG Da Nang Golf Resort', designer: 'Jack Nicklaus', holes: 18, description: '다낭 대표 명문 코스', difficulty: '상' },
        { name: 'Ba Na Hills Golf Club', designer: 'Luke Donald', holes: 18, description: '계곡과 언듈레이션이 조화로운 챔피언십 코스', difficulty: '최상' },
        { name: 'Montgomerie Links', designer: 'Colin Montgomerie', holes: 18, description: '유럽 스타일 해안 링크스 코스', difficulty: '중상' },
        { name: 'Vinpearl Golf Nam Hoi An', designer: 'IMG Design', holes: 18, description: '남호이안의 거대한 모래 언덕과 백사장이 어우러진 명문 코스', difficulty: '상' }
      ]
    }
  },

  // --- 하노이 / 북부 (Hanoi Golf) ---
  {
    id: 'golf-hn-18',
    title: '[골프투어/북부] 하노이 롱비엔 CC 18홀 데일리 라운딩 (시내 20분 접근성)',
    subTitle: '하노이 시내 최고의 27홀 도심형 골프장 + 그린피, 카트, 캐디피 전액 포함',
    category: '골프투어',
    region: '북부',
    city: '하노이',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (18홀 라운딩)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 140,
    departureCities: ['현지출발 (하노이 시내 호텔)'],
    tags: ['하노이골프', '롱비엔CC', '18홀', '도심형코스', '단독차량'],
    description: '하노이 시내에서 차로 불과 20분! 최상의 클럽하우스 시설과 야간 조명 시설을 갖춘 롱비엔 CC에서 즐기는 18홀 프리미엄 데일리 라운딩.',
    included: ['롱비엔 CC 18홀 그린피', '전동카트비 (2인 1카트)', '1인 1캐디피', '하노이 호텔 <-> 골프장 단독 차량 왕복'],
    excluded: ['캐디 매너팁 ($15/18홀/인)', '클럽하우스 개인 비용'],
    itinerary: [
      { day: 1, title: '하노이 호텔 픽업 -> 롱비엔 CC 18홀 라운딩 -> 호텔 귀환', description: '티타임 맞춰 하노이 시내 호텔 단독 차량 픽업 -> 롱비엔 CC 도착 후 18홀 라운딩 -> 샤워 후 호텔 복귀', meal: '자유식', hotel: '자유여행 (숙소 미포함)' }
    ],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['Long Bien Golf Course'],
      courseDetails: [
        { name: 'Long Bien Golf Course', designer: 'Nelson & Haworth', holes: 18, description: '하노이 시내에서 가장 접근성이 좋은 27홀 규모의 명문 도심형 골프장.', difficulty: '중' }
      ]
    }
  },
  {
    id: 'golf-hn-54',
    title: '[골프투어/북부] 하노이 & 하롱베이 FLC / 스카이레이크 3박 4일 (54홀 Stay & Play)',
    subTitle: '하노이 스카이레이크 + 하롱베이 FLC 54홀 + 5성급 호텔 3박 + VIP 단독 차량',
    category: '골프투어',
    region: '북부',
    city: '하노이',
    priceKRW: 890000,
    priceVND: 0,
    duration: '3박 4일 (54홀)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 160,
    departureCities: ['인천', '김해'],
    tags: ['하노이54홀', '스카이레이크', 'FLC하롱베이', '5성급호텔', '챔피언십'],
    description: '유네스코 하롱베이의 수평선을 바라보며 치는 FLC 하롱베이 CC와 하노이 최난도 스카이레이크 CC에서 즐기는 54홀 프리미엄 골프 패키지.',
    included: ['하노이/하롱베이 5성급 호텔 3박 (2인1실/조식)', '전일정 54홀 그린피 + 카트비 + 캐디피', '공항 및 골프장 VIP 전용 차량', '한국어 전담 가이드', '여행자 보험'],
    excluded: ['왕복 항공권', '캐디팁 ($15/18홀/인)'],
    itinerary: [
      { day: 1, title: '하노이 공항 도착 -> 스카이레이크 CC 18홀 라운딩 -> 하노이 5성 호텔', description: '공항 피켓 미팅 후 이동. 스카이레이크 CC 18홀 라운딩 후 하노이 시내 5성 호텔 체크인.', meal: '석식: 하노이 특선 한식 정식', hotel: '하노이 5성급 롯데/그랜드플라자 호텔' },
      { day: 2, title: '하롱베이 이동 & FLC 하롱베이 CC 18홀 오션뷰 라운딩', description: '하롱베이 이동 후 바다 전경이 내려다보이는 FLC 하롱베이 CC 18홀 라운딩.', meal: '조식: 호텔식, 석식: 하롱베이 씨푸드 정식', hotel: '하롱베이 FLC 5성급 리조트' },
      { day: 3, title: '하롱베이 FLC 18홀 라운딩 & 하노이 복귀', description: 'FLC 하롱베이 18홀 2차 라운딩 후 하노이 복귀, 전신 마사지 90분.', meal: '조식: 호텔식', hotel: '하노이 5성급 호텔' },
      { day: 4, title: '하노이 시티 쇼핑 -> 노이바이 공항 샌딩', description: '체크아웃 후 한인타운 미딩 쇼핑 후 공항으로 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['Sky Lake Resort & Golf Club', 'FLC Halong Bay Golf Club'],
      courseDetails: [
        { name: 'Sky Lake Resort & Golf Club', designer: 'AIMG', holes: 18, description: '베트남 베스트 코스로 선정된 호수와 산으로 둘러싸인 최고 난이도 코스.', difficulty: '최상' },
        { name: 'FLC Halong Bay Golf Club', designer: 'Schmidt-Curley', holes: 36, description: '하롱베이 바다가 파노라마로 내려다보이는 신비로운 명문 골프장.', difficulty: '상' }
      ]
    }
  },

  // --- 나트랑 (Nha Trang Golf) ---
  {
    id: 'golf-nt-18',
    title: '[골프투어/중부] 나트랑 KN 골프링크스 18홀 데일리 라운딩',
    subTitle: '그렉 노먼 설계 아시아 베스트 링크스 코스 + 그린피, 카트, 캐디피 전액 포함',
    category: '골프투어',
    region: '중부',
    city: '나트랑',
    priceKRW: 95000,
    priceVND: 0,
    duration: '1일 (18홀 라운딩)',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 165,
    departureCities: ['현지출발 (나트랑 호텔)'],
    tags: ['나트랑골프', 'KN골프링크스', '18홀', '그렉노먼', '단독차량'],
    description: '그렉 노먼이 디자인한 베트남 최고 명작 링크스 코스! 캄란 해안의 거대한 모래 언덕과 파도 소리를 들으며 펼쳐지는 18홀 환상의 라운딩.',
    included: ['KN Golf Links 18홀 그린피', '전동카트비', '캐디피', '나트랑 호텔 <-> KN 골프링크스 단독 차량'],
    excluded: ['캐디팁 ($15/18홀/인)', '개인 식음료'],
    itinerary: [
      { day: 1, title: '호텔 단독 픽업 -> KN 골프링크스 18홀 라운딩 -> 호텔 귀환', description: '티타임 맞춰 전용 차량 픽업 -> KN 골프링크스 도착 및 라운딩 -> 클럽하우스 샤워 후 호텔 복귀', meal: '자유식', hotel: '자유여행 (숙소 미포함)' }
    ],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['KN Golf Links Cam Ranh'],
      courseDetails: [
        { name: 'KN Golf Links Cam Ranh', designer: 'Greg Norman', holes: 18, description: '바다 해안선을 따라 펼쳐지는 참신하고 우아한 세계적 모던 링크스 코스.', difficulty: '상' }
      ]
    }
  },
  {
    id: 'golf-nt-54',
    title: '[골프투어/중부] 나트랑 빈펄 CC & KN 링크스 럭셔리 3박 4일 (54홀 Stay & Play)',
    subTitle: '빈펄 CC + KN 골프링크스 54홀 + 5성 해변 리조트 3박 + VIP 차량',
    category: '골프투어',
    region: '중부',
    city: '나트랑',
    priceKRW: 890000,
    priceVND: 0,
    duration: '3박 4일 (54홀)',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 140,
    departureCities: ['인천', '김해'],
    tags: ['나트랑54홀', '빈펄CC', 'KN링크스', '5성급리조트', '오션뷰라운딩'],
    description: '섬 전체가 골프장인 빈펄 CC와 그렉 노먼의 명작 KN 골프링크스를 모두 정복하는 나트랑 최고의 54홀 콤보 투어.',
    included: ['나트랑 5성급 아미아나/인터컨티넨탈 리조트 3박 (2인1실/조식)', '전일정 54홀 그린피 + 카트비 + 캐디피', '공항 및 골프장 단독 전용 차량', '전담 한국어 가이드', '여행자 보험'],
    excluded: ['왕복 항공권', '캐디팁 ($15/18홀/인)'],
    itinerary: [
      { day: 1, title: '나트랑 도착 -> KN 골프링크스 18홀 라운딩 -> 5성 리조트 체크인', description: '캄란 공항 도착 후 KN 골프링크스 이동, 18홀 라운딩 후 리조트 체크인.', meal: '석식: 나트랑 씨푸드 특식', hotel: '나트랑 5성급 리조트' },
      { day: 2, title: '빈펄 CC (섬 해상 코스) 18홀 라운딩 & 마사지 90분', description: '스피드보트 타고 빈펄 섬 이동, 빈펄 CC 18홀 라운딩 후 시내 스파 케어.', meal: '조식: 리조트뷔페', hotel: '나트랑 5성급 리조트' },
      { day: 3, title: 'KN 골프링크스 18홀 2차 챔피언십 라운딩', description: '세계 베스트 링크스 KN 18홀 재도전 라운딩 후 머드 온천 스파.', meal: '조식: 리조트뷔페', hotel: '나트랑 5성급 리조트' },
      { day: 4, title: '체크아웃 -> 롯데마트 쇼핑 -> 공항 샌딩', description: '체크아웃 후 시내 자유 쇼핑 후 캄란 공항으로 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' }
    ],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['Vinpearl Golf Nha Trang', 'KN Golf Links Cam Ranh'],
      courseDetails: [
        { name: 'Vinpearl Golf Nha Trang', designer: 'IMG Design', holes: 18, description: '아름다운 혼똠 섬 바다로 둘러싸인 환상의 오션뷰 코스.', difficulty: '중상' },
        { name: 'KN Golf Links Cam Ranh', designer: 'Greg Norman', holes: 36, description: '세계적인 거장 그렉 노먼 설계 명문 챔피언십 코스.', difficulty: '상' }
      ]
    }
  },

  // --- 푸꾸옥 (Phu Quoc Golf) ---
  {
    id: 'golf-pq-54',
    title: '[골프투어/남부] 푸꾸옥 빈펄 CC & 에스피노사 3박 4일 (54홀 Stay & Play)',
    subTitle: '원시림 & 에메랄드 바다 속 빈펄 CC 54홀 + 5성급 리조트 3박 + 단독 차량',
    category: '골프투어',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 890000,
    priceVND: 0,
    duration: '3박 4일 (54홀)',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 110,
    departureCities: ['인천', '김해'],
    tags: ['푸꾸옥골프', '빈펄CC', '54홀', '5성급리조트', '열대정원코스'],
    description: '유네스코 생물권 보전지역 푸꾸옥의 거대한 원시림과 바다가 조화로운 빈펄 CC에서 즐기는 54홀 열대 힐링 골프!',
    included: ['푸꾸옥 5성급 빈펄/노보텔 리조트 3박 (2인1실/조식)', '전일정 54홀 그린피 + 전동카트 + 캐디피', '공항 및 골프장 단독 전용 차량', '한국어 가이드 지원', '여행자 보험'],
    excluded: ['왕복 항공권', '캐디팁 ($15/18홀/인)'],
    itinerary: [
      { day: 1, title: '푸꾸옥 도착 -> 공항 피켓 미팅 -> 빈펄 CC 18홀 라운딩', description: '공항 도착 후 이동, 푸꾸옥 빈펄 CC 18홀 라운딩 후 리조트 체크인.', meal: '석식: 푸꾸옥 해산물 BBQ', hotel: '푸꾸옥 5성급 리조트' },
      { day: 2, title: '빈펄 CC 18홀 라운딩 & 사파리/그랜드월드 투어', description: '오전 빈펄 CC 18홀 라운딩. 오후 그랜드월드 야경 및 곤돌라 체험.', meal: '조식: 리조트뷔페', hotel: '푸꾸옥 5성급 리조트' },
      { day: 3, title: '빈펄 CC 18홀 3차 라운딩 & 스파 90분', description: '원시림 속 18홀 라운딩 후 고급 마사지 90분.', meal: '조식: 리조트뷔페', hotel: '푸꾸옥 5성급 리조트' },
      { day: 4, title: '체크아웃 -> 킹콩마트 쇼핑 -> 푸꾸옥 공항 샌딩', description: '체크아웃 후 특산품 진주/후추 쇼핑 후 공항 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' }
    ],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['Vinpearl Golf Phu Quoc'],
      courseDetails: [
        { name: 'Vinpearl Golf Phu Quoc', designer: 'IMG Design', holes: 27, description: '푸꾸옥의 태고적 국립공원 숲과 에메랄드 해변 사이에 자리잡은 열대 명문 코스.', difficulty: '상' }
      ]
    }
  },

  // --- 달랏 (Da Lat Golf) ---
  {
    id: 'golf-dl-54',
    title: '[골프투어/남부] 달랏 더 다랏 1200 & SAM 3박 4일 (54홀 시원한 고원 골프)',
    subTitle: '해발 1,200m 에어컨 바람 달랏 1200 CC + SAM 뚜엔람 54홀 + 4성/5성 고풍 호텔',
    category: '골프투어',
    region: '남부',
    city: '달랏',
    priceKRW: 890000,
    priceVND: 0,
    duration: '3박 4일 (54홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 130,
    departureCities: ['인천', '김해'],
    tags: ['달랏골프', '더다랏1200', 'SAM뚜엔람', '54홀', '시원한고원'],
    description: '베트남에서 가장 시원한 해발 1,200m 고원! 18도 안팎의 쾌적한 날씨 속에서 펼쳐지는 더 다랏 1200 CC와 뚜엔람 호수 코스 54홀 라운딩.',
    included: ['달랏 4성/5성급 호텔 3박 (2인1실/조식)', '전일정 54홀 그린피 + 카트비 + 캐디피', '공항 및 골프장 단독 전용 차량', '한국어 가이드', '여행자 보험'],
    excluded: ['왕복 항공권', '캐디팁 ($15/18홀/인)'],
    itinerary: [
      { day: 1, title: '달랏 공항 도착 -> 더 다랏 1200 CC 18홀 라운딩 -> 호텔 체크인', description: '공항 미팅 후 이동, 더 다랏 1200 CC 18홀 라운딩. 달랏 야시장 관람.', meal: '석식: 달랏 수압 특식', hotel: '달랏 시내 4성/5성 호텔' },
      { day: 2, title: 'SAM 뚜엔람 CC 18홀 라운딩 & 루지 체험', description: '뚜엔람 호수를 둘러싼 SAM CC 18홀 라운딩. 다딴라 폭포 루지 체험.', meal: '조식: 호텔식', hotel: '달랏 시내 4성/5성 호텔' },
      { day: 3, title: '더 다랏 1200 CC 18홀 라운딩 & 마사지 90분', description: 'KLPGA 대회 개최지 더 다랏 1200 CC 18홀 라운딩 후 전신 마사지.', meal: '조식: 호텔식', hotel: '달랏 시내 4성/5성 호텔' },
      { day: 4, title: '체크아웃 -> 달랏 기차역 & 감성 카페 -> 공항 샌딩', description: '체크아웃 후 시내 감성 카페 투어 후 공항 이동.', meal: '조식: 호텔식', hotel: '기내박' }
    ],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['The Dalat 1200 Country Club', 'SAM Tuyen Lam Golf Club'],
      courseDetails: [
        { name: 'The Dalat 1200 Country Club', designer: 'Kyi Hla Han', holes: 18, description: '해발 1,200m 상쾌한 기온과 호수/소나무 숲이 아우러진 KLPGA 코스.', difficulty: '최상' },
        { name: 'SAM Tuyen Lam Golf Club', designer: 'Ekistics Design', holes: 18, description: '뚜엔람 호수의 정기와 숲속 그늘이 매력적인 우아한 코스.', difficulty: '중상' }
      ]
    }
  },


  // ==========================================
  // [3] 풀빌라 & 리조트 (POOL VILLA & RESORT)
  // ==========================================

  // --- 다낭 (Da Nang Villa) ---
  {
    id: 'villa-dn-airbnb-1596807485',
    title: '[풀빌라/중부] 다낭 미케비치 럭셔리 에어비앤비 4베드룸 독채 풀빌라 (성인 8인 기준)',
    subTitle: '대형 프라이빗 수영장 + 4베드룸 독채 + 미케비치 도보 5분 & 에어비앤비 직영 호스트 스테이',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 580000,
    priceVND: 0,
    duration: '1박 기준 (연박/단체 가능)',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.98,
    reviewCount: 142,
    isPopular: true,
    isHotDeal: true,
    departureCities: ['자율일정/단독차량연계'],
    tags: ['에어비앤비', '다낭풀빌라', '8인추천', '4베드룸', '독채풀빌라', '미케비치', '프라이빗수영장'],
    description: '신짜오투어(xinchaotour.com) 추천! 다낭 미케비치 및 안트엉 관광거리 도보 5분 거리의 럭셔리 에어비앤비 프라이빗 독채 풀빌라입니다. 성인 8명(최대 10인) 그룹 투숙에 최적화된 4개 독립 베드룸과 개별 와이드 야외 수영장, 야외 바비큐 테라스, 세련된 거실/주방 시설을 독채로 이용하실 수 있습니다.',
    included: [
      '에어비앤비 공식 4베드룸 독채 풀빌라 1박 (성인 8인 기준)',
      '프라이빗 개별 대형 수영장 무제한 이용',
      '다낭 국제공항 <-> 빌라 단독 픽업 & 샌딩 전용 차량',
      '야외 바비큐(BBQ) 그릴 및 테라스 이용',
      '웰컴 드링크 및 무료 고속 와이파이',
      '1일 1회 하우스키핑 청소 서비스'
    ],
    excluded: [
      '개인 식음료 및 추가 바비큐 재료비',
      '가이드/기사 매너팁'
    ],
    externalBookingUrl: 'https://www.airbnb.co.kr/rooms/1596807485988738548?adults=8&search_mode=regular_search&source_impression_id=p3_1773058617_P3xK6pEU9aoIJDMS&previous_page_section_name=1000&federated_search_id=a2420d66-c7ca-4754-98c4-1f72afdd15e6&guests=1&check_in=2026-08-04&check_out=2026-08-05',
    address: 'An Thương 26, Phường Mỹ An, Quận Ngũ Hành Sơn, Đà Nẵng (미케비치 안트엉 거리)',
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 단독 픽업 -> 에어비앤비 독채 풀빌라 입실 -> 프라이빗 수영 & 테라스 BBQ',
        description: '공항 도착 후 피켓을 든 전용 기사 미팅 (약 20분 이동). 15:00 빌라 익스프레스 체크인 후 개별 전용 수영장 수영 및 야외 테라스 BBQ 파티.',
        meal: '자유식 (빌라 내 BBQ 세팅 가능)',
        hotel: '다낭 미케비치 에어비앤비 4베드룸 럭셔리 독채 풀빌라'
      }
    ],
    villaSpecs: {
      bedrooms: 4,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 10,
      features: ['에어비앤비 슈퍼호스트 독채', '개별 야외 수영장', '성인 8인 최적화 4베드룸', '미케비치 도보 5분', '야외 BBQ 테라스', '공항 단독 픽샌딩 차량 포함'],
      areaSqm: 320
    }
  },
  {
    id: 'villa-dn-01',
    title: '[풀빌라/중부] 다낭 하얏트 리젠시 오션뷰 프라이빗 3베드룸 독채 풀빌라',
    subTitle: '독채 프라이빗 풀 + 파노라마 오션뷰 + 대가족 최적화 (성인 6인+아동 3인)',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준 (패키지 가능)',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 5.0,
    reviewCount: 190,
    isPopular: true,
    departureCities: ['자율일정/단독차량연계'],
    tags: ['다낭풀빌라', '3베드룸', '하얏트리젠시', '프라이빗수영장', '오션뷰독채'],
    description: '다낭 미케비치 최고 입지의 5성 하얏트 리젠시 3베드룸 오션프런트 독채 풀빌라! 거대한 프라이빗 전용 수영장과 넓은 거실, 파노라마 바다 전경을 자랑하는 프리미엄 대가족 풀빌라.',
    included: ['하얏트 3베드룸 독채 풀빌라 1박', '전 투숙객 프라이빗 뷔페 조식', '공항 <-> 하얏트 리젠시 단독 차량 픽샌딩 1회', '풀빌라 내 무제한 와이파이 & 웰컴 과일 바스켓'],
    excluded: ['개인 미니바 및 추가 주류'],
    address: '5 indisputable beachside address, Trường Sa, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng (하얏트 리젠시 다낭 리조트)',
    itinerary: [
      { day: 1, title: '하얏트 리젠시 프라이빗 3베드룸 체크인 -> 전용 풀 수영 -> 석양 감상', description: '15:00 전용 익스프레스 체크인 후 빌라 입실. 대형 개별 수영장에서 수영 및 바비큐 자유시간.', meal: '조식: 조식 뷔페', hotel: '다낭 하얏트 리젠시 3베드룸 독채 풀빌라' }
    ],
    villaSpecs: {
      bedrooms: 3,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 8,
      features: ['전용 대형 야외 수영장', '파노라마 오션뷰', '독채 가든 테라스', '24시간 룸서비스', '프라이빗 BBQ 가능'],
      areaSqm: 307
    }
  },
  {
    id: 'villa-dn-02',
    title: '[풀빌라/중부] 다낭 나만 리트리트 프라이빗 2베드룸 오션 풀빌라',
    subTitle: '울창한 대나무 건축미 + 개인 프라이빗 딥풀 + 일일 무료 마사지 포함',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 145,
    departureCities: ['자율일정/단독차량연계'],
    tags: ['나만리트리트', '2베드룸풀빌라', '무료마사지', '프라이빗풀', '감성인테리어'],
    description: '베트남 대표 친환경 대나무 건축 명작! 나만 리트리트 2베드룸 풀빌라. 개별 온수/냉수 프라이빗 풀과 투숙객 매일 전신 마사지 무료 혜택이 포함된 감성 힐링 빌라.',
    included: ['나만리트리트 2베드룸 독채 풀빌라 1박', '전 투숙객 메인 레스토랑 조식', '투숙객 전원 1일 1회 무료 스파 마사지 (50분)', '공항 왕복 전용 차량 픽샌딩'],
    excluded: ['스파 추가 옵션'],
    address: 'Trường Sa, Đường Trường Sa, Ngũ Hành Sơn, Đà Nẵng (나만 리트리트 다낭 리조트)',
    itinerary: [
      { day: 1, title: '나만리트리트 입실 -> 무료 마사지 50분 -> 프라이빗 풀 휴식', description: '15:00 입실 후 무료 웰컴 마사지 이용. 빌라 내 개별 수영장에서 휴식.', meal: '조식: 조식 뷔페', hotel: '다낭 나만 리트리트 2베드룸 풀빌라' }
    ],
    villaSpecs: {
      bedrooms: 2,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 5,
      features: ['개별 딥 프라이빗 풀', '매일 전신 마사지 무료', '대나무 감성 리조트', '프라이빗 비치 도보 1분'],
      areaSqm: 150
    }
  },
  {
    id: 'villa-dn-nguhanhson-garden',
    title: '[풀빌라/중부] 응우한손에 위치한 정원과 개인 수영장을 갖춘 빌라',
    subTitle: '🏡 다낭 응우한손 프라이빗 독채 가든 빌라 & 대형 개별 수영장 (성인 10인 기준)',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 680000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 5.0,
    reviewCount: 168,
    isPopular: true,
    departureCities: ['자율일정/단독차량연계'],
    tags: ['응우한손풀빌라', '정원빌라', '개인수영장', '다낭독채', '5베드룸'],
    description: '다낭 응우한손 중심에 위치한 넓은 단독 푸른 정원과 프라이빗 대형 개인 수영장을 완비한 럭셔리 독채 빌라입니다. 가족 및 대그룹 단체 여행객에게 최상의 휴양 공간을 제공합니다.',
    included: [
      '응우한손 독채 가든 풀빌라 1박',
      '프라이빗 대형 개인 수영장 무제한 이용',
      '단독 푸른 잔디 정원 & 야외 BBQ 그릴 이용',
      '다낭 공항 <-> 빌라 단독 왕복 픽샌딩 차량',
      '무료 와이파이 & 일일 청소 서비스'
    ],
    excluded: [
      '개인 미니바 및 추가 바비큐 식재료비'
    ],
    address: 'Khu B2-21, Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng (응우한손 프라이빗 가든 빌라 단지)',
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 단독 픽업 -> 응우한손 가든 풀빌라 입실 -> 정원 BBQ & 야간 프라이빗 수영',
        description: '공항 피켓 미팅 후 전용 차량으로 빌라 이동 (약 15분). 입실 후 아름다운 단독 정원과 프라이빗 개별 수영장에서 자유로운 휴식 및 가든 바비큐.',
        meal: '자유식 (가든 BBQ 세팅 가능)',
        hotel: '다낭 응우한손 가든 프라이빗 독채 풀빌라'
      }
    ],
    villaSpecs: {
      bedrooms: 5,
      privatePool: true,
      oceanView: false,
      maxOccupancy: 12,
      features: ['독채 단독 잔디 정원', '대형 개인 프라이빗 수영장', '야외 가든 BBQ 테라스', '5개 전용 침실', '공항 단독 왕복 픽샌딩 차량 포함'],
      areaSqm: 380
    }
  },
  {
    id: 'villa-dn-luxury-5bed',
    title: '[풀빌라/중부] 🏡 다낭의 럭셔리 5베드룸 빌라 ✅✅',
    subTitle: '최대 12인 투숙 5베드룸 초특가 + 초대형 인피니티 프라이빗 풀 + 24시간 피켓 버틀러',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 780000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 5.0,
    reviewCount: 215,
    isPopular: true,
    departureCities: ['자율일정/단독차량연계'],
    tags: ['다낭5베드룸', '럭셔리풀빌라', '인피니티풀', '미케비치', '대가족추천'],
    description: '다낭 최고의 럭셔리 5베드룸 프라이빗 독채 빌라! 넉넉한 5개의 침실과 각 방 전용 욕실, 초대형 개별 인피니티 수영장, 풀사이드 테라스를 갖춘 프라이미엄 독채 휴양지입니다.',
    included: [
      '다낭 럭셔리 5베드룸 독채 풀빌라 1박',
      '전 투숙객 조식 뷔페 서비스',
      '초대형 개별 인피니티 수영장 무제한 이용',
      '공항 <-> 빌라 VIP 단독 픽업 & 샌딩 전용 차량',
      '웰컴 과일 바스켓 및 24시간 보안'
    ],
    excluded: [
      '개인 주류 및 팁'
    ],
    address: 'Võ Nguyên Giáp, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng (다낭 해변 산책로 럭셔리 빌라 단지)',
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 단독 픽업 -> 5베드룸 럭셔리 빌라 체크인 -> 풀사이드 바비큐 & 물놀이',
        description: '공항 픽업 후 빌라 전용 차량 이동. 익스프레스 체크인 후 5베드룸 독채와 대형 수영장에서 프라이빗 수영 및 파티.',
        meal: '조식: 조식 제공',
        hotel: '다낭 럭셔리 5베드룸 독채 풀빌라'
      }
    ],
    villaSpecs: {
      bedrooms: 5,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 12,
      features: ['5개 럭셔리 독립 침실', '초대형 프라이빗 인피니티 풀', '미케비치 도보 3분', '풀사이드 BBQ 파티 존', 'VIP 단독 차량 연계'],
      areaSqm: 420
    }
  },

  // --- 나트랑 (Nha Trang Villa) ---
  {
    id: 'villa-nt-01',
    title: '[풀빌라/중부] 나트랑 아미아나 리조트 2베드룸 머드온천 독채 풀빌라',
    subTitle: '천연 해수 수영장 & 머드 온천 욕조 + 파노라마 해안절벽 뷰',
    category: '풀빌라',
    region: '중부',
    city: '나트랑',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 230,
    isPopular: true,
    departureCities: ['자율일정'],
    tags: ['아미아나', '머드스파', '2베드룸풀빌라', '해수수영장', '나트랑베스트'],
    description: '나트랑 최고 인기 5성 아미아나 리조트! 에메랄드 프라이빗 비치와 빌라 내 개별 머드 온천탕, 개인 수영장을 동시에 보유한 최고의 휴양독채 풀빌라.',
    included: ['아미아나 2베드룸 독채 풀빌라 1박', '전 투숙객 인터내셔널 조식 뷔페', '빌라 내 프라이빗 천연 머드스파 1회', '공항 왕복 픽샌딩 차량'],
    excluded: ['개인 주류 비용'],
    itinerary: [
      { day: 1, title: '아미아나 체크인 -> 해수 수영장 수영 -> 빌라 내 머드 온천', description: '체크인 후 거대한 자연 해수 수영장에서 스노클링 후 프라이빗 빌라 머드욕조 케어.', meal: '조식: 조식 뷔페', hotel: '나트랑 아미아나 2베드룸 풀빌라' }
    ],
    villaSpecs: {
      bedrooms: 2,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 6,
      features: ['빌라 내 프라이빗 머드온천탕', '개별 인피니티 풀', '자연 해수 수영장 무료 이용', '프라이빗 스노클링 비치'],
      areaSqm: 220
    }
  },
  {
    id: 'villa-nt-02',
    title: '[풀빌라/중부] 나트랑 럭셔리 식스센스 닌반베이 독채 오션 3베드룸 풀빌라',
    subTitle: '초호화 6성급 하이엔드 + 전용 젬마 버틀러 집사 케어 + 해안 암석 프라이빗 풀',
    category: '풀빌라',
    region: '중부',
    city: '나트랑',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 85,
    departureCities: ['자율일정'],
    tags: ['식스센스', '닌반베이', '6성급풀빌라', '전담버틀러', '하이엔드'],
    description: '세상의 끝에 있는 듯한 완벽한 프라이버시! 오직 스피드보트로만 접근 가능한 닌반베이 해안 암석 위 6성급 식스센스 3베드룸 인피니티 풀빌라.',
    included: ['식스센스 닌반베이 3베드룸 오션 풀빌라 1박', '24시간 전담 젬마 버틀러 (개인 집사) 서비스', '전 투숙객 럭셔리 뷔페 조식', '나트랑 공항 <-> 닌반베이 선착장 VIP 차량 & 스피드보트 송영'],
    excluded: ['개인 헬리콥터 송영 옵션'],
    itinerary: [
      { day: 1, title: '스피드보트 입도 -> 식스센스 버틀러 미팅 -> 암석 인피니티 풀 휴식', description: '닌반베이 입도 후 개인 집사 안내로 입실. 암석 위 인피니티 풀에서 프라이빗 힐링.', meal: '조식: 조식 뷔페', hotel: '식스센스 닌반베이 3베드룸 오션 풀빌라' }
    ],
    villaSpecs: {
      bedrooms: 3,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 8,
      features: ['24시간 개인 버틀러 집사', '자연 암석 조각 인피니티 풀', '보트 전용 프라이빗 베이', '유기농 스파 & 야외 영화관'],
      areaSqm: 380
    }
  },

  // --- 푸꾸옥 (Phu Quoc Villa) ---
  {
    id: 'villa-pq-01',
    title: '[풀빌라/남부] 푸꾸옥 리젠트 6성급 오션프런트 3베드룸 독채 풀빌라',
    subTitle: 'IHG 최상위 6성 럭셔리 + 프라이빗 오션 인피니티 풀 + 무료 미니바 & 세탁 서비스',
    category: '풀빌라',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 170,
    isPopular: true,
    departureCities: ['자율일정/단독차량'],
    tags: ['리젠트푸꾸옥', '6성급풀빌라', '무료미니바', '오션프런트', '인피니티풀'],
    description: '베트남 푸꾸옥 최고의 하이엔드 6성 리젠트! 에메랄드 석양이 펼쳐지는 오션프런트 독채 3베드룸 풀빌라. 매일 리필되는 무료 고급 미니바 및 무료 세탁 서비스 포함.',
    included: ['리젠트 푸꾸옥 3베드룸 오션프런트 풀빌라 1박', '전 투숙객 아라카르트 주문형 뷔페 조식', '매일 와인/스낵 포함 프리미엄 미니바 무제한 무료', '무료 일일 세탁 서비스 (4벌/일)', '공항 VIP 단독 리무진 픽샌딩'],
    excluded: ['룸서비스 추가 주문'],
    itinerary: [
      { day: 1, title: '리젠트 VIP 체크인 -> 빌라 인피니티 풀 수영 -> 미니바 와인 파티', description: '리젠트 입실 후 전용 오션프런트 수영장에서 수영 및 무료 와인/스낵 테라스 파티.', meal: '조식: 최고급 고메 조식', hotel: '푸꾸옥 리젠트 6성급 3베드룸 풀빌라' }
    ],
    villaSpecs: {
      bedrooms: 3,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 8,
      features: ['파노라마 오션프런트 인피니티 풀', '매일 리필 무료 와인 미니바', '일일 무료 세탁 서비스', '개별 썬베드 및 가든'],
      areaSqm: 310
    }
  },
  {
    id: 'villa-pq-02',
    title: '[풀빌라/남부] 푸꾸옥 빈펄 디스커버리 4베드룸 대가족 독채 풀빌라',
    subTitle: '최대 10인 투숙 가성비 최강 + 전용 대형 인피니티 풀 + 사파리/빈원더스 패스 연계',
    category: '풀빌라',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviewCount: 210,
    departureCities: ['자율일정'],
    tags: ['빈펄디스커버리', '4베드룸', '10인투숙', '대가족추천', '가성비풀빌라'],
    description: '3대 가족여행 및 단체 여행의 정답! 최대 10인까지 넉넉하게 투숙 가능한 빈펄 디스커버리 4베드룸 독채 풀빌라. 바로 앞 빈원더스와 사파리 접근성 최고.',
    included: ['빈펄 디스커버리 4베드룸 독채 풀빌라 1박', '성인 8인 + 아동 4인 조식 뷔페', '공항 <-> 리조트 셔틀 버스', '개별 프라이빗 수영장 이용'],
    excluded: ['빈원더스/사파리 티켓 (추가 선택 가능)'],
    itinerary: [
      { day: 1, title: '빈펄 디스커버리 체크인 -> 4베드룸 빌라 수영장 온가족 물놀이', description: '체크인 후 대가족 프라이빗 빌라 수영장에서 물놀이 및 야간 툭툭이 타고 그랜드월드 탐방.', meal: '조식: 조식 뷔페', hotel: '푸꾸옥 빈펄 디스커버리 4베드룸 풀빌라' }
    ],
    villaSpecs: {
      bedrooms: 4,
      privatePool: true,
      oceanView: false,
      maxOccupancy: 10,
      features: ['4개 독립 욕실 침실', '대형 야외 개별 수영장', '호수/가든 뷰', '사파리/빈원더스 툭툭이 무료 셔틀'],
      areaSqm: 360
    }
  },

  // --- 호이안 / 사파 / 달랏 (Villa) ---
  {
    id: 'villa-ha-01',
    title: '[풀빌라/중부] 호이안 포시즌스 남하이 럭셔리 오션뷰 2베드룸 풀빌라',
    subTitle: '포브스 5스타 최상급 럭셔리 + 프라이빗 비치 프런트 + 럭셔리 조식 포함',
    category: '풀빌라',
    region: '중부',
    city: '호이안',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviewCount: 95,
    departureCities: ['자율일정'],
    tags: ['포시즌스', '남하이', '호이안풀빌라', '5스타럭셔리', '오션뷰'],
    description: '베트남 최고 명성의 포시즌스 남하이! 하얀 모래사장 오션프런트에 위치한 2베드룸 인피니티 풀빌라에서 꿈같은 VIP 휴양을 만끽하세요.',
    included: ['포시즌스 남하이 2베드룸 풀빌라 1박', '전 투숙객 프리미엄 조식', '공항 <-> 포시즌스 단독 픽샌딩', '웰컴 와인 및 과일'],
    excluded: ['개인 스파 서비스'],
    itinerary: [
      { day: 1, title: '포시즌스 입실 -> 프라이빗 수영장 및 메인 3단 인피니티 풀 휴식', description: '포시즌스 입실 후 빌라 및 해변 산책. 밤 올드타운 무료 셔틀 이용.', meal: '조식: 조식 뷔페', hotel: '호이안 포시즌스 남하이 2베드룸 풀빌라' }
    ],
    villaSpecs: {
      bedrooms: 2,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 5,
      features: ['프라이빗 오션뷰 온수 풀', '3단 대형 메인 인피니티 풀', '호이안 올드타운 셔틀 버스', '전용 버틀러 케어'],
      areaSqm: 250
    }
  },
  {
    id: 'villa-sp-01',
    title: '[풀빌라/북부] 사파 토파스 에코롯지 프리미엄 마운틴뷰 독채 방갈로',
    subTitle: '내셔널 지오그래픽 선정 세계 베스트 롯지 + 구름 위 온수 인피니티 풀',
    category: '풀빌라',
    region: '북부',
    city: '사파',
    priceKRW: 750000,
    priceVND: 0,
    duration: '1박 기준',
    imageUrl: '/src/assets/images/sapa_fansipan_terraces_1786458401102.jpg',
    rating: 4.9,
    reviewCount: 160,
    departureCities: ['자율일정'],
    tags: ['토파스에코롯지', '마운틴뷰', '사파롯지', '온수인피니티풀', '내셔널지오그래픽'],
    description: '구름이 등선 아래로 펼쳐지는 신비의 토파스 에코롯지! 사파의 웅장한 계단식 논과 산맥을 파노라마로 감상하는 구름 위 온수 인피니티 풀.',
    included: ['토파스 에코롯지 프리미엄 방갈로 1박', '유기농 조식 뷔페', '구름 위 온수 인피니티 풀 이용', '사파 시내 <-> 토파스 셔틀버스'],
    excluded: ['하노이 왕복 이동 차량'],
    itinerary: [
      { day: 1, title: '토파스 에코롯지 체크인 -> 사파 산맥 파노라마 온수풀 수영', description: '롯지 입실 후 3,000m 산맥을 바라보는 사계절 온수 인피니티 풀에서 인생사진 촬영.', meal: '조식: 조식 뷔페', hotel: '사파 토파스 에코롯지 방갈로' }
    ],
    villaSpecs: {
      bedrooms: 1,
      privatePool: true,
      oceanView: false,
      maxOccupancy: 3,
      features: ['사계절 마운틴뷰 온수 인피니티 풀', '발코니 파노라마 뷰', '친환경 유기농 롯지 레스토랑'],
      areaSqm: 65
    }
  },


  // ==========================================
  // [4] 추천패키지 (RECOMMENDED PACKAGES)
  // ==========================================
  {
    id: 'prod-102',
    title: '[중부/다낭] 다낭 & 호이안 & 바나힐 럭셔리 3박 5일 베스트셀러',
    subTitle: '5성급 해변 리조트 3박 + 바나힐 골든브릿지 + 호이안 등불 야경 & 바구니배',
    category: '추천패키지',
    region: '중부',
    city: '다낭',
    priceKRW: 680000,
    priceVND: 0,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewCount: 380,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '김해', '대구', '청주', '무안'],
    tags: ['다낭5성급', '바나힐골든브릿지', '호이안야경', '100%한국인가이드', 'NO쇼핑'],
    description: '대한민국 여행객 만족도 1위! 다낭의 명물 바나힐 골든브릿지 케이블카와 호이안 올드타운 투본강 등불배, 전신 마사지 90분이 포함된 풀옵션 최고 인기 패키지입니다.',
    included: [
      '왕복 항공권 및 공항세',
      '전일정 5성급 해변 리조트 3박 (2인 1실)',
      '한국인 전문 가이드 및 단독 전용 차량',
      '바나힐 케이블카 & 테마파크 입장권',
      '호이안 바구니배 및 투본강 소원배 탑승',
      '전신 아로마 마사지 90분 (팁 별도)'
    ],
    excluded: [
      '가이드/기사 경비 ($50/인)',
      '매너팁 및 기타 개인 비용'
    ],
    itinerary: [
      { day: 1, title: '인천/지방 출발 -> 다낭 국제공항 도착', description: '다낭 공항 도착 후 가이드 미팅. 전용 차량으로 5성급 리조트 이동 후 휴식.', meal: '석식: 현지 쌀국수 특식', hotel: '다낭 5성급 해변 리조트' },
      { day: 2, title: '다낭 시티 투어 & 바나힐 국립공원 골든브릿지', description: '바나힐 케이블카 타고 골든브릿지 관람 후 선상 뷔페 식사. 오후 다낭 핑크성당 탐방.', meal: '조식: 리조트뷔페, 중식: 바나힐 뷔페', hotel: '다낭 5성급 해변 리조트' },
      { day: 3, title: '코코넛 바구니배 & 호이안 올드타운 등불 야경', description: '바구니배 체험 후 호이안 올드타운 산책 및 투본강 등불 배 탑승.', meal: '조식: 리조트뷔페, 석식: 호이안 가든 특식', hotel: '다낭 5성급 해변 리조트' },
      { day: 4, title: '미케비치 자유시간 & 마사지 90분 -> 다낭 공항 이동', description: '리조트 자유시간 및 마사지 90분. 한시장 자율 쇼핑 후 공항 이동.', meal: '조식: 리조트뷔페, 중식: 다낭 씨푸드', hotel: '기내박' },
      { day: 5, title: '한국 공항 안심 도착', description: '인천/지방 공항 도착 후 안심 귀가.', meal: '기내식', hotel: '귀가' }
    ]
  },
  {
    id: 'prod-103',
    title: '[남부/푸꾸옥] 푸꾸옥 빈펄 사파리 & 혼똠섬 케이블카 힐링 3박 5일',
    subTitle: '5성급 빈펄 리조트 3박 + 아시아 최대 사파리 + 세계 최장 케이블카 + 썬셋타운',
    category: '추천패키지',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 680000,
    priceVND: 0,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviewCount: 220,
    isPopular: true,
    departureCities: ['인천', '김해'],
    tags: ['푸꾸옥5성급', '빈펄사파리', '혼똠섬케이블카', '가족여행베스트', '한국인가이드'],
    description: '베트남의 숨겨진 청정 낙원 푸꾸옥! 야생 동물들을 가까이 만나는 빈펄 사파리와 7.9km 바다 위를 가로지르는 혼똠섬 케이블카가 포함된 프리미엄 가족 패키지.',
    included: [
      '왕복 항공권 및 공항세',
      '푸꾸옥 5성급 빈펄 리조트 3박',
      '한국인 가이드 & 단독 차량',
      '빈펄 사파리 및 혼똠섬 케이블카 입장권',
      '전일정 특식 (씨푸드 BBQ, 현지 유명 맛집)',
      '여행자 보험'
    ],
    excluded: [
      '가이드/기사 경비 ($50/인)',
      '개인 매너팁'
    ],
    itinerary: [
      { day: 1, title: '한국 출발 -> 푸꾸옥 국제공항 도착 후 리조트 체크인', description: '푸꾸옥 공항 도착 후 가이드 피켓 미팅. 5성급 리조트 이동 후 휴식.', meal: '석식: 현지 정식', hotel: '푸꾸옥 5성급 빈펄 리조트' },
      { day: 2, title: '아시아 최대 빈펄 사파리 & 그랜드월드 분수 레이저 쇼', description: '사파리 버스 탑승 탐방 후 이탈리아 스타일 그랜드월드 수상 곤돌라 체험.', meal: '조식: 리조트뷔페, 중식: 해산물특식', hotel: '푸꾸옥 5성급 빈펄 리조트' },
      { day: 3, title: '혼똠섬 7.9km 해상 케이블카 & 워터파크 & 썬셋타운', description: '기네스북 해상 케이블카 탑승 후 워터파크 즐기기. 저녁 키스오브더씨 불꽃쇼.', meal: '조식: 리조트뷔페, 석식: 썬셋타운 식당', hotel: '푸꾸옥 5성급 빈펄 리조트' },
      { day: 4, title: '즈엉동 야시장 & 킹콩마트 쇼핑 -> 공항 이동', description: '리조트 수영 및 야시장 쇼핑 후 공항으로 이동.', meal: '조식: 리조트뷔페', hotel: '기내박' },
      { day: 5, title: '한국 공항 안심 도착', description: '인천/지방 공항 도착.', meal: '기내식', hotel: '귀가' }
    ]
  }
];
