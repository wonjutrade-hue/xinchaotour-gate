import { Product } from '../types';

export const GOLF_AND_FREE_CATALOG: Product[] = [
  // =========================================================================
  // [PART 1] 인근 도시 연계 자유여행 (3박 5일 & 4박 6일) - 한국인 심야도착/심야출발 맞춤
  // =========================================================================

  // 1. 다낭 + 호이안 + 바나힐 (3박 5일)
  {
    id: 'prod-free-danang-hoian-3n5d',
    title: '[다낭+호이안/자유3박5일] 다낭 오션뷰 호텔 3박 & 호이안 올드타운 + 바나힐 단독 차량 팩',
    subTitle: '심야 도착 전용 픽업 + 바나힐 1일 렌터카 + 호이안 야경 소원배 렌터카 + 마지막 날 체크아웃 후 공항 샌딩 올인원',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 390000,
    priceVND: 7200000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 278,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '부산', '대구', '청주', '무안'],
    tags: ['#다낭자유여행', '#호이안연계', '#3박5일', '#심야도착픽업', '#바나힐단독렌터카', '#체크아웃투어'],
    description: '한국 출발 저녁 비행기(21:00~01:00 다낭 도착)와 마지막 날 밤 심야 비행기(22:00~02:00 출발) 패턴에 100% 최적화된 상품입니다. 이동 걱정 없이 단독 렌터카로 다낭, 호이안, 바나힐을 내 맘대로 즐기세요.',
    included: [
      '다낭 미케비치 5성급 호텔 3박 (2인 1실, 조식 포함)',
      '1일차 심야 공항 도착 시 단독 피켓 픽업 차량 (대기료 무료)',
      '2일차 바나힐 왕복 전용 렌터카 (케이블카+골든브릿지 입장권 포함)',
      '3일차 호이안 올드타운 & 야시장 왕복 단독 렌터카 (소원배 탑승권 포함)',
      '4일차 체크아웃 투어 (호텔 픽업 ➔ 쇼핑/마사지/미식 ➔ 심야 다낭공항 샌딩)',
      '기사 식대, 유류비, 고속도로 톨게이트비, 공항 주차비 일체 포함'
    ],
    excluded: [
      '국제선 왕복 항공권',
      '일정 외 개인 식사비 및 쇼핑',
      '기사 매너팁 (팀당 $10/일 권장)'
    ],
    itinerary: [
      {
        day: 1,
        title: '인천/지방 공항 저녁 출발 ➔ 다낭 공항 심야 도착 ➔ 전용 차량 픽업 ➔ 호텔 체크인 & 휴식',
        description: '다낭 공항 입국장 앞에서 신짜오투어 전용 네임피켓 기사님 미팅. 타인 대기 없이 바로 전용 리무진 탑승 후 미케비치 5성급 호텔로 편안하게 이동하여 체크인 및 취침합니다.',
        hotel: '미케비치 5성급 오션뷰 호텔',
        vehicle: '최신형 16인승 전용 단독 리무진'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ 바나힐 국립공원 & 골든브릿지 단독 데이투어 ➔ 다낭 시내 핫플 자유일정',
        description: '오전 원하는 시간에 호텔 로비에서 기사님 미팅. 세계 최장 케이블카를 타고 바나힐 정상으로 이동하여 골든브릿지 인생샷과 프랑스 테마파크 자유 관광. 저녁엔 다낭 시내 안트엉 카페거리 자유 탐방.',
        meal: '조식: 호텔 뷔페 / 중·석식: 자유식 (현지 맛집 추천 지원)',
        hotel: '미케비치 5성급 오션뷰 호텔',
        vehicle: '전용 단독 렌터카 (10시간 대절)'
      },
      {
        day: 3,
        title: '오전 미케비치 해변 & 수영장 힐링 ➔ 오후 호이안 올드타운 & 투본강 소원배 야경 투어',
        description: '오후 2시경 전용 차량 탑승 후 유네스코 세계문화유산 호이안으로 이동. 감성 가득한 노란 골목길과 카페 탐방, 해질녘 투본강 소원배를 띄우고 야시장과 야경을 즐긴 뒤 안전하게 호텔로 복귀합니다.',
        meal: '조식: 호텔 뷔페 / 중·석식: 자유식 (호이안 미식 추천)',
        hotel: '미케비치 5성급 오션뷰 호텔',
        vehicle: '전용 단독 렌터카'
      },
      {
        day: 4,
        title: '호텔 체크아웃(12:00) ➔ 짐보관 ➔ 롯데마트/한시장 쇼핑 & 전신 스파 ➔ 심야 다낭공항 샌딩',
        description: '정오 체크아웃 후 전용 차량에 캐리어를 싣고 한시장, 롯데마트 기념품 쇼핑과 핑크성당 탐방. 저녁엔 90분 힐링 전신 마사지를 받고 개운하게 다낭 국제공항으로 이동하여 심야 비행기에 탑승합니다.',
        meal: '조식: 호텔 뷔페 / 중·석식: 자유식',
        hotel: '기내박 (체크아웃 투어)',
        vehicle: '전용 단독 렌터카 (심야 공항 샌딩 포함)'
      },
      {
        day: 5,
        title: '이른 아침 한국(인천/부산/대구 등) 공항 도착 및 귀가',
        description: '오전 06:00~08:30 한국 공항 도착. 일상으로 복귀하여 활기찬 하루를 시작합니다.',
        meal: '기내식'
      }
    ]
  },

  // 2. 다낭 + 호이안 + 후에 (4박 6일)
  {
    id: 'prod-free-danang-hoian-hue-4n6d',
    title: '[다낭+호이안+후에/자유4박6일] 중부 3대 도시 완전 정복 & 5성급 리조트 4박 여유 팩',
    subTitle: '심야 도착 픽업 + 바나힐 투어 + 호이안 낭만 야경 + 후에 유네스코 왕궁 하이반고개 투어 + 심야 공항 샌딩',
    category: '자유여행',
    region: '중부',
    city: '다낭',
    priceKRW: 490000,
    priceVND: 9100000,
    duration: '4박 6일',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 142,
    isPopular: true,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭자유여행', '#후에왕궁', '#호이안', '#4박6일', '#하이반고개', '#단독렌터카'],
    description: '다낭과 호이안뿐 아니라 베트남 마지막 왕조의 수도인 고도 후에(Hue)까지 전용 차량으로 여유롭고 안전하게 다녀오는 4박 6일 프리미엄 자유여행 코스입니다.',
    included: [
      '다낭 5성급 오션뷰 리조트 4박 (2인 1실, 조식 포함)',
      '1일차 심야 공항 단독 픽업 & 5일차 심야 공항 샌딩',
      '하이반 고개 드라이브 & 후에 왕궁 1일 단독 렌터카 대절',
      '바나힐 국립공원 & 골든브릿지 단독 차량 지원',
      '호이안 올드타운 & 야시장 단독 차량 지원'
    ],
    excluded: ['국제선 항공권', '개인 식비 및 입장료', '기사 매너팁'],
    itinerary: [
      {
        day: 1,
        title: '한국 출발 ➔ 다낭 공항 심야 도착 ➔ 전용 차량 픽업 ➔ 리조트 체크인 & 휴식',
        description: '다낭 공항 도착 후 전담 기사 미팅 및 5성급 리조트로 편안하게 이동하여 체크인.',
        hotel: '다낭 5성급 럭셔리 리조트',
        vehicle: '단독 전용 리무진'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ 바나힐 골든브릿지 & 프렌치빌리지 단독 투어 ➔ 미케비치 해변 석양',
        description: '원하는 시간에 출발하여 바나힐을 여유롭게 둘러보고 해질녘 미케비치 해변 펍에서 자유 시간.',
        hotel: '다낭 5성급 럭셔리 리조트'
      },
      {
        day: 3,
        title: '내셔널지오그래픽 선정 세계 최고 드라이브 코스 하이반 고개 ➔ 후에 고도 왕궁 탐방',
        description: '하이반 고개의 절경을 감상하며 후에로 이동. 유네스코 세계유산 후에 왕궁과 카이딘 황제릉을 둘러본 뒤 다낭으로 복귀.',
        hotel: '다낭 5성급 럭셔리 리조트',
        vehicle: '후에 전일 단독 렌터카 (12시간)'
      },
      {
        day: 4,
        title: '오전 리조트 호캉스 & 수영 ➔ 오후 호이안 올드타운 감성 골목 & 소원배 야경 투어',
        description: '호이안 구시가지에서 베트남 전통 커피와 맛집을 즐기고 황홀한 등불 야경 감상.',
        hotel: '다낭 5성급 럭셔리 리조트'
      },
      {
        day: 5,
        title: '호텔 체크아웃 ➔ 롯데마트/한시장 쇼핑 ➔ VIP 스파 마사지 ➔ 심야 다낭공항 샌딩',
        description: '짐을 차량에 보관하고 마지막 다낭 시내 쇼핑과 마사지 후 심야 항공편 탑승.',
        hotel: '기내박',
        vehicle: '단독 체크아웃 렌터카'
      },
      {
        day: 6,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착 후 안전하게 귀가합니다.'
      }
    ]
  },

  // 3. 나트랑 + 달랏 (3박 5일)
  {
    id: 'prod-free-nhatrang-dalat-3n5d',
    title: '[나트랑+달랏/자유3박5일] 에메랄드 해변 나트랑 & 영원한 봄의 고원 달랏 콤보 자유팩',
    subTitle: '심야 깜란공항 픽업 + 나트랑 호핑/머드온천 + 달랏 숲속 카페 & 루지 전용 렌터카 + 마지막 날 심야 공항 샌딩',
    category: '자유여행',
    region: '남부',
    city: '나트랑',
    priceKRW: 420000,
    priceVND: 7800000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 198,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#나트랑자유여행', '#달랏연계', '#3박5일', '#에메랄드비치', '#달랏루지', '#단독차량'],
    description: '베트남 최고의 청정 해변 휴양지 나트랑과 해발 1,500m 서늘한 꽃의 도시 달랏을 단독 차량으로 쾌적하게 묶어 여행하는 3박 5일 콤보 자유여행입니다.',
    included: [
      '나트랑 깜란 5성급 오션뷰 리조트 3박 (조식 포함)',
      '1일차 깜란공항 심야 도착 시 단독 피켓 픽업',
      '나트랑 ➔ 달랏 ➔ 나트랑 1일 단독 렌터카 왕복 (다딴라 루지 + 랑비앙산 코스)',
      '나트랑 시내 아이리조트 머드온천 & 포나가르 사원 차량 지원',
      '4일차 체크아웃 후 시내 자유일정 & 심야 깜란공항 샌딩'
    ],
    excluded: ['항공권', '개인 식비 및 입장료', '기사 매너팁'],
    itinerary: [
      {
        day: 1,
        title: '한국 출발 ➔ 나트랑 깜란공항 심야 도착 ➔ 전용 차량 픽업 ➔ 리조트 체크인',
        description: '공항 도착 후 전용 기사님 미팅하여 깜란 럭셔리 리조트로 바로 이동.',
        hotel: '나트랑 깜란 5성급 오션 리조트',
        vehicle: '단독 리무진 픽업'
      },
      {
        day: 2,
        title: '나트랑 에메랄드 해변 휴양 ➔ 아이리조트 프라이빗 머드온천 & 포나가르 사원',
        description: '오전 해변과 수영장에서 여유를 만끽하고 오후 천연 머드온천에서 힐링 스파.',
        hotel: '나트랑 깜란 5성급 오션 리조트'
      },
      {
        day: 3,
        title: '해발 1,500m 고원 도시 달랏 단독 투어 (다딴라 폭포 루지 + 감성 숲속 카페 + 야시장)',
        description: '전용 차량으로 달랏으로 이동하여 스릴 넘치는 루지와 감성 카페, 달랏 야시장 탐방 후 복귀.',
        hotel: '나트랑 깜란 5성급 오션 리조트',
        vehicle: '달랏 전용 단독 렌터카'
      },
      {
        day: 4,
        title: '리조트 체크아웃 ➔ 나트랑 시내 롯데마트 쇼핑 ➔ 90분 스파 ➔ 심야 깜란공항 샌딩',
        description: '체크아웃 후 짐을 싣고 시내 미식과 쇼핑을 즐긴 후 마사지를 받고 심야 공항 이동.',
        hotel: '기내박',
        vehicle: '단독 샌딩 렌터카'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '인천/지방 공항 도착.'
      }
    ]
  },

  // 4. 나트랑 + 판랑 사막 + 달랏 (4박 6일)
  {
    id: 'prod-free-nhatrang-phanrang-dalat-4n6d',
    title: '[나트랑+판랑사막+달랏/자유4박6일] 해변 휴양 & 붉은 사막 지프 & 고원 힐링 3색 완전정복 팩',
    subTitle: '심야 공항 픽업/샌딩 + 판랑 붉은 사막 샌듄 지프 투어 + 달랏 1박2일 감성 연계 + 5성급 리조트',
    category: '자유여행',
    region: '남부',
    city: '나트랑',
    priceKRW: 550000,
    priceVND: 10200000,
    duration: '4박 6일',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 165,
    isPopular: true,
    departureCities: ['인천', '부산'],
    tags: ['#나트랑자유여행', '#판랑사막지프', '#달랏연계', '#4박6일', '#인생샷', '#단독렌터카'],
    description: '나트랑의 푸른 바다, 판랑의 거대한 붉은 사막 지프 샌듄, 달랏의 로맨틱한 소나무 숲까지 한 번에 즐기는 4박 6일 베스트셀러 자유여행입니다.',
    included: [
      '나트랑 5성급 리조트 3박 + 달랏 감성 5성급 빌라 1박 (조식 포함)',
      '깜란공항 심야 픽업 & 심야 샌딩 단독 차량',
      '판랑 붉은 사막 전용 오프로드 지프차 대여 및 인생샷 촬영',
      '나트랑 ➔ 판랑 ➔ 달랏 ➔ 나트랑 전 구간 단독 렌터카 & 전담 기사'
    ],
    excluded: ['항공권', '개인 식비', '기사 매너팁'],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 나트랑 깜란공항 심야 도착 ➔ 전용 차량 픽업 ➔ 리조트 체크인',
        description: '심야 도착 후 대기 없이 리조트로 이동하여 휴식.',
        hotel: '나트랑 깜란 5성급 리조트'
      },
      {
        day: 2,
        title: '나트랑 빈원더스 테마파크 & 에메랄드 해변 휴양 자유일정',
        description: '하루 종일 나트랑의 아름다운 바다와 테마파크를 자유롭게 즐기기.',
        hotel: '나트랑 깜란 5성급 리조트'
      },
      {
        day: 3,
        title: '판랑 붉은 사막 샌듄 지프 투어 (인생샷) ➔ 고원 도시 달랏으로 이동 & 체크인',
        description: '오프로드 지프차를 타고 사막 질주 후 달랏으로 이동하여 감성 빌라 체크인 및 야시장 탐방.',
        hotel: '달랏 아나만다라 5성급 프렌치 빌라',
        vehicle: '판랑 & 달랏 전용 단독 차량'
      },
      {
        day: 4,
        title: '달랏 다딴라 루지 & 쑤언흐엉 호수 산책 ➔ 나트랑으로 복귀 & 리조트 체크인',
        description: '달랏의 맑은 공기와 루지를 즐긴 후 나트랑으로 쾌적하게 복귀.',
        hotel: '나트랑 깜란 5성급 리조트'
      },
      {
        day: 5,
        title: '체크아웃 ➔ 나트랑 시내 핫플 & 쇼핑 ➔ VIP 전신 스파 ➔ 심야 깜란공항 샌딩',
        description: '충분한 휴식과 쇼핑 후 피로를 풀어주는 스파를 받고 심야 항공편 탑승.',
        hotel: '기내박'
      },
      {
        day: 6,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착 후 안전 귀가.'
      }
    ]
  },

  // 5. 하노이 + 하롱베이 + 닌빈 (3박 5일)
  {
    id: 'prod-free-hanoi-halong-ninbinh-3n5d',
    title: '[하노이+하롱베이+닌빈/자유3박5일] 북부 3대 유네스코 명소 & 5성급 호텔 단독 자유팩',
    subTitle: '심야 노이바이공항 픽업 + 하롱베이 럭셔리 당일 크루즈 + 닌빈 짱안 나룻배 + 심야 공항 샌딩 올인원',
    category: '자유여행',
    region: '북부',
    city: '하노이',
    priceKRW: 450000,
    priceVND: 8300000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 210,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '부산', '대구', '청주'],
    tags: ['#하노이자유여행', '#하롱베이크루즈', '#닌빈짱안', '#3박5일', '#심야픽업', '#단독렌터카'],
    description: '베트남 천년 고도 하노이의 올드쿼터 미식과 유네스코 세계자연유산 하롱베이, 육지의 하롱베이라 불리는 닌빈 짱안을 단독 렌터카로 안전하게 누비는 3박 5일 자유여행입니다.',
    included: [
      '하노이 시내 5성급 럭셔리 호텔 3박 (조식 포함)',
      '1일차 심야 노이바이공항 단독 픽업 & 4일차 심야 샌딩',
      '하롱베이 럭셔리 크루즈 투어 (선상 뷔페 중식 포함)',
      '닌빈 짱안 유네스코 나룻배 & 항무아 전망대 단독 차량 지원'
    ],
    excluded: ['국제선 항공권', '개인 식비', '기사 매너팁'],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 하노이 노이바이공항 심야 도착 ➔ 단독 픽업 ➔ 호텔 체크인',
        description: '공항 도착 후 전용 기사 미팅하여 하노이 시내 5성급 호텔로 이동.',
        hotel: '하노이 인터컨티넨탈 또는 동급 5성급'
      },
      {
        day: 2,
        title: '유네스코 세계자연유산 하롱베이 럭셔리 크루즈 데이투어 (승솟동굴 & 티톱섬)',
        description: '고속도로 전용 차량으로 하롱베이 이동 후 크루즈 탑승, 기암괴석과 동굴 탐방.',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 3,
        title: '육지의 하롱베이 닌빈 짱안 나룻배 투어 & 항무아 파노라마 절경',
        description: '신선들이 노닐던 짱안 동굴 나룻배를 타고 항무아 정상에서 절경 감상.',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 4,
        title: '호텔 체크아웃 ➔ 하노이 올드쿼터 & 호안끼엠 호수 미식 탐방 ➔ 심야 공항 샌딩',
        description: '하노이 분짜, 반미, 에그커피 맛집 투어와 마사지 후 심야 노이바이공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착 및 귀가',
        description: '한국 도착.'
      }
    ]
  },

  // 6. 호치민 + 무이네 사막 (3박 5일)
  {
    id: 'prod-free-hochiminh-muine-3n5d',
    title: '[호치민+무이네사막/자유3박5일] 경제수도 호치민 시내 & 무이네 화이트샌듄 일출 지프 자유팩',
    subTitle: '심야 탄손넛공항 픽업 + 무이네 사막 오프로드 지프 & 요정의 샘 + 호치민 5성급 호텔 + 심야 공항 샌딩',
    category: '자유여행',
    region: '남부',
    city: '호치민',
    priceKRW: 410000,
    priceVND: 7600000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 184,
    isPopular: true,
    departureCities: ['인천', '부산'],
    tags: ['#호치민자유여행', '#무이네사막', '#화이트샌듄', '#3박5일', '#사막일출', '#단독렌터카'],
    description: '베트남 최대 도시 호치민의 역동적인 도심 문화와 이국적인 무이네 사막 지프 투어를 결합한 3박 5일 감성 자유여행입니다.',
    included: [
      '호치민 1군 5성급 호텔 3박 (조식 포함)',
      '1일차 심야 탄손넛공항 픽업 & 4일차 심야 샌딩',
      '호치민 ➔ 무이네 사막 왕복 단독 고속도로 렌터카',
      '무이네 화이트샌듄 & 레드샌듄 전용 지프 투어'
    ],
    excluded: ['항공권', '식사비', '기사 매너팁'],
    itinerary: [
      {
        day: 1,
        title: '한국 출발 ➔ 호치민 탄손넛공항 심야 도착 ➔ 전용 차량 픽업 ➔ 5성급 호텔 체크인',
        description: '공항 도착 후 픽업 차량으로 호텔 이동 및 휴식.',
        hotel: '호치민 1군 5성급 호텔'
      },
      {
        day: 2,
        title: '호치민 시내 핫플 (노트르담 대성당, 중앙우체국, 카페아파트먼트, 벤탄시장) 자유일정',
        description: '도심 명소와 루프탑 바에서 호치민의 야경을 만끽.',
        hotel: '호치민 1군 5성급 호텔'
      },
      {
        day: 3,
        title: '무이네 화이트샌듄 사막 지프 투어 & 요정의 샘 & 피싱빌리지 단독 투어',
        description: '전용 차량으로 무이네 이동 후 신비로운 사막과 바다를 배경으로 인생샷 촬영.',
        hotel: '호치민 1군 5성급 호텔'
      },
      {
        day: 4,
        title: '체크아웃 ➔ 쇼핑 & 사이공강 디너 크루즈 ➔ 전신 스파 ➔ 심야 탄손넛공항 샌딩',
        description: '기념품 쇼핑과 스파 후 심야 항공편 탑승.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  },

  // 7. 푸꾸옥 남부 + 북부 완전일주 (3박 5일)
  {
    id: 'prod-free-phuquoc-3n5d',
    title: '[푸꾸옥/자유3박5일] 남태평양 감성 에메랄드 해변 & 빈원더스 · 혼똔섬 케이블카 단독 자유팩',
    subTitle: '심야 푸꾸옥공항 픽업 + 북부 빈펄 사파리/그랜드월드 + 남부 혼똔섬 케이블카 렌터카 + 심야 공항 샌딩',
    category: '자유여행',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 460000,
    priceVND: 8500000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 230,
    isPopular: true,
    departureCities: ['인천', '부산', '청주'],
    tags: ['#푸꾸옥자유여행', '#혼똔섬케이블카', '#빈펄사파리', '#3박5일', '#심야도착픽업', '#선셋타운'],
    description: '베트남의 숨은 진주 푸꾸옥의 북부(사파리, 그랜드월드)와 남부(세계 최장 해상 케이블카, 선셋타운)를 단독 렌터카로 자유롭게 누비는 3박 5일 힐링 팩입니다.',
    included: [
      '푸꾸옥 5성급 비치 프론트 리조트 3박 (조식 포함)',
      '1일차 심야 공항 픽업 & 4일차 심야 샌딩',
      '북부 1일 단독 렌터카 (사파리/그랜드월드)',
      '남부 1일 단독 렌터카 (혼똔섬/선셋타운)'
    ],
    excluded: ['항공권', '입장권', '개인 경비'],
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 푸꾸옥 공항 심야 도착 ➔ 전용 차량 픽업 ➔ 리조트 체크인',
        description: '공항 도착 후 대기 없이 전용 리조트로 이동.',
        hotel: '푸꾸옥 5성급 해변 리조트'
      },
      {
        day: 2,
        title: '푸꾸옥 북부 투어: 빈펄 사파리 ➔ 그랜드월드 베니스 운하 & 야경 분수쇼',
        description: '아시아 최대 야생 사파리와 화려한 그랜드월드 분수쇼 관람.',
        hotel: '푸꾸옥 5성급 해변 리조트'
      },
      {
        day: 3,
        title: '푸꾸옥 남부 투어: 혼똔섬 7.9km 해상 케이블카 & 선셋타운 & 야시장',
        description: '기네스북 등재 최장 케이블카와 남태평양 감성 선셋타운.',
        hotel: '푸꾸옥 5성급 해변 리조트'
      },
      {
        day: 4,
        title: '리조트 체크아웃 ➔ 즈엉동 야시장 & 킹콩마트 쇼핑 ➔ 90분 스파 ➔ 심야 공항 샌딩',
        description: '후추/진주 쇼핑과 마사지 후 심야 공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  },

  // =========================================================================
  // [PART 2] 다낭 & 호이안 모든 골프장 1일 18홀 단독 데이투어
  // =========================================================================

  // 1) BRG 다낭 골프 리조트 18홀
  {
    id: 'prod-golf-18h-brg-danang',
    title: '[다낭 1일 18홀] BRG 다낭 골프 리조트 (BRG Da Nang Golf Resort) 단독 18홀 라운딩',
    subTitle: '그렉 노먼 & 잭 니클라우스 36홀 명문 링크스 | 그린피 + 2인1카트 + 1인1캐디 + 호텔 왕복 전용차량 올포함',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 240000,
    priceVND: 4500000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 320,
    isPopular: true,
    isHotDeal: true,
    departureCities: ['현지 출발 (다낭/호이안 호텔 픽업)'],
    tags: ['#BRG다낭', '#1일18홀', '#그렉노먼코스', '#니클라우스코스', '#다낭골프', '#카트캐디포함'],
    description: '아시아 10대 골프장에 선정된 BRG 다낭 골프 리조트는 잭 니클라우스의 벌크헤드 코스와 그렉 노먼의 모래 언덕 듄스 코스 36홀을 갖춘 다낭 최고의 명문 골프장입니다.',
    included: [
      'BRG 다낭 골프 리조트 18홀 그린피 100% 포함',
      '전동 카트비 (2인 1카트 기준) 포함',
      '1인 1캐디피 포함',
      '다낭/호이안 숙소 ➔ BRG 다낭 왕복 단독 전용 차량 & 전담 기사'
    ],
    excluded: [
      '캐디팁 ($15~$20 / 18홀 기준 현장 지불)',
      '클럽하우스 중식 및 개인 음료/주류'
    ],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀 기준 현장 지불',
      golfCourseNames: ['BRG 다낭 골프 리조트 (BRG Da Nang Golf Resort)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 로비 전용차량 픽업 ➔ BRG 다낭 CC 도착 ➔ 18홀 라운딩 ➔ 호텔 샌딩',
        description: '티오프 1시간 전 호텔 로비에서 전용 리무진 탑승 후 BRG 다낭으로 이동. 락커 배정 후 18홀 명품 라운딩 진행. 라운딩 및 샤워 후 숙소로 편안하게 복귀합니다.',
        vehicle: '왕복 단독 전용 차량'
      }
    ]
  },

  // 2) 몽고메리 링크스 18홀
  {
    id: 'prod-golf-18h-montgomerie-danang',
    title: '[다낭 1일 18홀] 몽고메리 링크스 (Montgomerie Links Da Nang) 단독 18홀 라운딩',
    subTitle: '콜린 몽고메리 설계 유러피언 감성 정통 링크스 | 그린피 + 2인1카트 + 1인1캐디 + 왕복 전용차량',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 235000,
    priceVND: 4400000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 285,
    isPopular: true,
    departureCities: ['현지 출발 (다낭/호이안 호텔 픽업)'],
    tags: ['#몽고메리링크스', '#1일18홀', '#정통링크스', '#다낭골프', '#콜린몽고메리'],
    description: '라이더컵 유럽팀 주장 콜린 몽고메리가 설계한 링크스 코스로, 자연 해변 벙커와 페어웨이 굴곡이 환상적인 코스입니다.',
    included: [
      '몽고메리 링크스 18홀 그린피',
      '전동 카트 (2인 1카트)',
      '1인 1캐디피',
      '호텔 왕복 단독 차량 & 기사'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['몽고메리 링크스 (Montgomerie Links Da Nang)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 몽고메리 링크스 18홀 라운딩 ➔ 호텔 복귀',
        description: '티오프 시간에 맞춰 단독 차량으로 이동 후 18홀 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 3) 바나힐스 골프클럽 18홀 (나이트골프 지원)
  {
    id: 'prod-golf-18h-banahills',
    title: '[다낭 1일 18홀] 바나힐스 골프클럽 (Ba Na Hills Golf Club) 산악 파노라마 18홀',
    subTitle: '루크 도널드 설계 | 전 홀 야간 라이트 조명 완비 | 그린피 + 카트 + 캐디 + 왕복 단독차량',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 250000,
    priceVND: 4650000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 310,
    isPopular: true,
    departureCities: ['현지 출발 (다낭 호텔 픽업)'],
    tags: ['#바나힐스GC', '#1일18홀', '#나이트골프', '#루크도널드', '#산악코스'],
    description: '바나힐 산기슭의 시원한 기후와 드라마틱한 고저차를 자랑하는 세계적 수준의 마운틴 코스입니다.',
    included: [
      '바나힐스 GC 18홀 그린피 (주간 또는 야간 라이트 라운딩 선택)',
      '2인 1카트 + 1인 1캐디피',
      '호텔 왕복 단독 전용 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['바나힐스 골프클럽 (Ba Na Hills Golf Club)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 바나힐스 골프클럽 18홀 라운딩 ➔ 호텔 샌딩',
        description: '바나힐 산맥의 상쾌한 바람 속에서 즐기는 18홀 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 4) 호이아나 쇼어스 골프클럽 18홀
  {
    id: 'prod-golf-18h-hoiana-shores',
    title: '[호이안 1일 18홀] 호이아나 쇼어스 골프클럽 (Hoiana Shores Golf Club) 세계 100대 링크스',
    subTitle: '로버트 트렌트 존스 주니어 설계 | 남중국해 오션뷰 순수 링크스 | 그린피 + 카트 + 캐디 + 단독차량',
    category: '골프투어',
    region: '중부',
    city: '호이안',
    priceKRW: 270000,
    priceVND: 5000000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 260,
    isPopular: true,
    departureCities: ['현지 출발 (다낭/호이안 호텔 픽업)'],
    tags: ['#호이아나쇼어스', '#세계100대코스', '#1일18홀', '#오션뷰링크스', '#RTJ2'],
    description: '골프 다이제스트 세계 100대 코스에 빛나는 최고급 해변 링크스로, 황홀한 바다 조망과 최고급 클럽하우스를 자랑합니다.',
    included: [
      '호이아나 쇼어스 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '다낭/호이안 숙소 왕복 단독 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['호이아나 쇼어스 골프클럽 (Hoiana Shores Golf Club)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 호이아나 쇼어스 18홀 라운딩 ➔ 호텔 샌딩',
        description: '환상적인 해변 듄스 링크스에서 인생 최고의 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 5) 빈펄 골프 남호이안 18홀
  {
    id: 'prod-golf-18h-vinpearl-namhoian',
    title: '[호이안 1일 18홀] 빈펄 골프 남호이안 (Vinpearl Golf Nam Hoi An) 챔피언십 18홀',
    subTitle: '백사장 벙커와 거대한 워터 해저드의 조화 | 그린피 + 2인1카트 + 1인1캐디 + 왕복 단독차량',
    category: '골프투어',
    region: '중부',
    city: '호이안',
    priceKRW: 220000,
    priceVND: 4100000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 215,
    departureCities: ['현지 출발 (다낭/호이안 호텔 픽업)'],
    tags: ['#빈펄남호이안', '#1일18홀', '#호이안골프', '#워터해저드'],
    description: '평탄하지만 전략적인 벙커와 호수로 설계되어 초보부터 싱글 골퍼까지 모두가 즐길 수 있는 챔피언십 코스입니다.',
    included: [
      '빈펄 남호이안 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '왕복 단독 전용 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['빈펄 골프 남호이안 (Vinpearl Golf Nam Hoi An)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 빈펄 남호이안 18홀 라운딩 ➔ 호텔 복귀',
        description: '아름다운 남호이안 리조트 단지 내 코스에서 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 6) 라구나 랑코 골프클럽 18홀 (닉 팔도 코스)
  {
    id: 'prod-golf-18h-laguna-langco',
    title: '[다낭/후에 1일 18홀] 라구나 랑코 골프클럽 (Laguna Golf Lang Co) 닉 팔도 시그니처 18홀',
    subTitle: '산과 바다, 계곡을 넘나드는 닉 팔도 걸작 코스 | 그린피 + 2인1카트 + 1인1캐디 + 왕복 단독차량',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 245000,
    priceVND: 4550000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 190,
    departureCities: ['현지 출발 (다낭/후에 호텔 픽업)'],
    tags: ['#라구나랑코', '#닉팔도', '#1일18홀', '#다낭골프', '#후에골프'],
    description: '메이저 6회 우승자 닉 팔도가 자연 그대로의 지형을 살려 설계한 다이나믹하고 경이로운 골프장입니다.',
    included: [
      '라구나 랑코 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '다낭/호이안/후에 왕복 단독 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['라구나 랑코 골프클럽 (Laguna Golf Lang Co)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 라구나 랑코 CC 18홀 라운딩 ➔ 호텔 샌딩',
        description: '천혜의 자연 속에서 도전적인 18홀 플레이.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 7) [나트랑 1일 18홀] KN 골프링크스 깜란
  {
    id: 'prod-golf-18h-kn-links-nhatrang',
    title: '[나트랑 1일 18홀] KN 골프링크스 깜란 (KN Golf Links Cam Ranh) 그렉 노먼 18홀',
    subTitle: '베트남 최고 골프장 연속 수상 | 에메랄드 해변 오션 코스 | 그린피 + 카트 + 캐디 + 왕복 단독차량',
    category: '골프투어',
    region: '남부',
    city: '나트랑',
    priceKRW: 245000,
    priceVND: 4550000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 275,
    isPopular: true,
    departureCities: ['현지 출발 (나트랑/깜란 호텔 픽업)'],
    tags: ['#KN링크스', '#나트랑골프', '#1일18홀', '#그렉노먼', '#오션뷰코스'],
    description: '그렉 노먼의 시그니처 27홀(18홀 오션 링크스 + 9홀 오아시스) 코스로, 아시아 최고 수준의 관리 상태를 자랑합니다.',
    included: [
      'KN 골프링크스 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '나트랑 시내 및 깜란 리조트 왕복 단독 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['KN 골프링크스 깜란 (KN Golf Links Cam Ranh)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ KN 골프링크스 깜란 18홀 라운딩 ➔ 호텔 복귀',
        description: '환상적인 해변 듄스 코스에서 플레이.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 8) [하노이 1일 18홀] 스카이레이크 리조트 & CC
  {
    id: 'prod-golf-18h-skylake-hanoi',
    title: '[하노이 1일 18홀] 스카이레이크 리조트 & 골프클럽 (Sky Lake Resort & Golf Club)',
    subTitle: '베트남 1위 명문 코스 (레이크 & 스카이 36홀) | 그린피 + 카트 + 캐디 + 왕복 단독차량',
    category: '골프투어',
    region: '북부',
    city: '하노이',
    priceKRW: 240000,
    priceVND: 4500000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 290,
    isPopular: true,
    departureCities: ['현지 출발 (하노이 호텔 픽업)'],
    tags: ['#스카이레이크', '#하노이골프', '#1일18홀', '#베트남1위코스', '#단독차량'],
    description: '천혜의 자연 호수와 암석이 어우러진 36홀 명문 코스로, 한국 골퍼들이 가장 극찬하는 하노이 최고의 골프장입니다.',
    included: [
      '스카이레이크 CC 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '하노이 시내 왕복 전용 단독 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['스카이레이크 리조트 & CC (Sky Lake Resort & Golf Club)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 스카이레이크 CC 18홀 라운딩 ➔ 호텔 복귀',
        description: '천혜의 호수를 낀 명문 코스 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 9) [호치민 1일 18홀] 탄손넛 골프코스
  {
    id: 'prod-golf-18h-tansonnhat-hochiminh',
    title: '[호치민 1일 18홀] 탄손넛 골프코스 (Tan Son Nhat Golf Course) 도심형 36홀 챔피언십',
    subTitle: '넬슨 & 하워스 설계 | 공항 및 도심 최고 접근성 | 그린피 + 카트 + 캐디 + 왕복 단독차량',
    category: '골프투어',
    region: '남부',
    city: '호치민',
    priceKRW: 230000,
    priceVND: 4300000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 240,
    departureCities: ['현지 출발 (호치민 호텔 픽업)'],
    tags: ['#탄손넛CC', '#호치민골프', '#1일18홀', '#넬슨하워스', '#36홀'],
    description: '호치민 도심과 공항 인근에 위치하여 이동이 매우 편리하며, 야간 라이트 시설과 최고급 시설을 갖춘 36홀 코스입니다.',
    included: [
      '탄손넛 CC 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '호치민 호텔 왕복 단독 전용 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['탄손넛 골프코스 (Tan Son Nhat Golf Course)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 탄손넛 CC 18홀 라운딩 ➔ 호텔 샌딩',
        description: '도심 속 럭셔리 36홀 코스 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 10) [달랏 1일 18홀] 달랏 팰리스 골프클럽
  {
    id: 'prod-golf-18h-dalat-palace',
    title: '[달랏 1일 18홀] 달랏 팰리스 골프클럽 (Dalat Palace Golf Club) 100년 황실 18홀',
    subTitle: '1922년 개장 100년 역사 황실 골프장 | 벤트그라스 잔디 & 쑤언흐엉 호수 조망 | 그린피 + 카트 + 캐디 + 차량',
    category: '골프투어',
    region: '남부',
    city: '달랏',
    priceKRW: 235000,
    priceVND: 4400000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 220,
    isPopular: true,
    departureCities: ['현지 출발 (달랏 호텔 픽업)'],
    tags: ['#달랏팰리스', '#달랏골프', '#1일18홀', '#황실골프장', '#벤트그라스'],
    description: '베트남 마지막 황제 바오다이가 사랑했던 100년 전통의 골프장으로, 해발 1,500m의 시원한 기후와 벤트그라스 그린을 만끽할 수 있습니다.',
    included: [
      '달랏 팰리스 GC 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '달랏 호텔 왕복 단독 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['달랏 팰리스 골프클럽 (Dalat Palace Golf Club)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 달랏 팰리스 18홀 라운딩 ➔ 호텔 샌딩',
        description: '100년 역사의 유서 깊은 황실 코스에서 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // 11) [푸꾸옥 1일 18홀] 빈펄 골프 푸꾸옥
  {
    id: 'prod-golf-18h-vinpearl-phuquoc',
    title: '[푸꾸옥 1일 18홀] 빈펄 골프 푸꾸옥 (Vinpearl Golf Phu Quoc) 원시림 & 오션뷰 18홀',
    subTitle: 'IMG 설계 원시림 보존 18홀 챔피언십 | 그린피 + 2인1카트 + 1인1캐디 + 왕복 단독차량',
    category: '골프투어',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 240000,
    priceVND: 4500000,
    duration: '1일 (18홀)',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 205,
    departureCities: ['현지 출발 (푸꾸옥 호텔 픽업)'],
    tags: ['#빈펄푸꾸옥', '#푸꾸옥골프', '#1일18홀', '#IMG설계', '#원시림코스'],
    description: '푸꾸옥 국립공원 원시림과 에메랄드 바다가 맞닿아 있는 감동의 18홀 아일랜드 챔피언십 코스입니다.',
    included: [
      '빈펄 푸꾸옥 18홀 그린피',
      '2인 1카트 + 1인 1캐디피',
      '푸꾸옥 호텔 왕복 단독 차량'
    ],
    excluded: ['캐디팁 ($15~$20)', '개인 경비'],
    golfSpecs: {
      holes: 18,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: ['빈펄 골프 푸꾸옥 (Vinpearl Golf Phu Quoc)']
    },
    itinerary: [
      {
        day: 1,
        title: '호텔 픽업 ➔ 빈펄 골프 푸꾸옥 18홀 라운딩 ➔ 호텔 복귀',
        description: '울창한 열대 원시림 속에서 펼쳐지는 상쾌한 라운딩.',
        vehicle: '왕복 단독 차량'
      }
    ]
  },

  // =========================================================================
  // [PART 3] 가까운 3개 골프장 연계 54홀 3박 5일 풀패키지 (한국인 심야 항공 스케줄)
  // =========================================================================

  // 1) 다낭/호이안 3대 명문 54홀 3박 5일 (BRG 다낭 + 몽고메리 + 호이아나 쇼어스)
  {
    id: 'prod-golf-54h-danang-3n5d',
    title: '[다낭 3대명문 54홀/3박5일] BRG 다낭 + 몽고메리 + 호이아나 쇼어스 54홀 VIP 풀패키지',
    subTitle: '5성급 호텔 3박 + 54홀 그린피/카트/캐디 100% 포함 + 단독 리무진 골프밴 + 마지막 날 라운딩 후 심야 공항 샌딩',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 990000,
    priceVND: 18400000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewCount: 380,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '부산', '대구', '청주', '무안'],
    tags: ['#다낭54홀', '#BRG다낭', '#몽고메리', '#호이아나쇼어스', '#3박5일골프', '#올포함'],
    description: '다낭과 호이안의 가장 가까운 3대 명문 코스를 매일 18홀씩 총 54홀 라운딩하는 베스트셀러 골프투어입니다. 한국 출발 저녁 항공편 및 마지막 날 체크아웃 라운딩 후 심야 귀국 스케줄에 맞추어 전 일정 단독 골프밴이 풀케어합니다.',
    included: [
      '다낭 5성급 오션뷰 호텔 3박 (2인 1실, 조식 포함)',
      '18홀 × 3일 = 총 54홀 그린피 100% 포함',
      '전 일정 전동 카트비 (2인 1카트 기준) 포함',
      '전 일정 1인 1캐디피 포함',
      '1일차 심야 공항 픽업부터 4일차 심야 샌딩까지 전용 단독 리무진 골프밴 & 기사',
      '4일차 마지막 라운딩 후 90분 피로회복 VIP 스파 마사지 1회'
    ],
    excluded: [
      '국제선 왕복 항공권 (최저가 실시간 발권 지원)',
      '캐디팁 ($15~$20 / 18홀당 / 1인 기준 현장 지불)',
      '클럽하우스 중식 및 개인 석식'
    ],
    golfSpecs: {
      holes: 54,
      totalRounds: 3,
      stayAndPlayHotel: '다낭 미케비치 5성급 호텔 (그랜드투란, 래디슨 또는 동급)',
      hotelRoomType: '디럭스 오션뷰 (2인 1실)',
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀 1인 기준',
      golfCourseNames: [
        'BRG 다낭 골프 리조트 (18홀)',
        '몽고메리 링크스 다낭 (18홀)',
        '호이아나 쇼어스 골프클럽 (18홀)'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '인천/지방 공항 저녁 출발 ➔ 다낭 공항 심야 도착 ➔ 전용 골프밴 미팅 ➔ 호텔 체크인 & 휴식',
        description: '다낭 공항 도착 후 입국장에서 신짜오투어 전용 기사님 미팅. 골프백과 캐리어를 전용 리무진 밴에 싣고 호텔로 편안하게 이동하여 체크인 후 숙면을 취합니다.',
        hotel: '다낭 5성급 미케비치 호텔',
        vehicle: '골프백 수납 전용 단독 리무진'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ [1차전] BRG 다낭 골프 리조트 18홀 라운딩 ➔ 미케비치 해산물 석식',
        description: '호텔 조식 후 15분 거리의 BRG 다낭으로 이동. 닉클라우스 or 그렉 노먼 18홀 라운딩. 라운딩 후 숙소 복귀 및 미케비치 해산물 거리 자유 석식.',
        meal: '조식: 호텔 뷔페 / 중식: 클럽하우스 / 석식: 자유식 (맛집 안내)',
        hotel: '다낭 5성급 미케비치 호텔',
        vehicle: '전용 단독 골프밴'
      },
      {
        day: 3,
        title: '호텔 조식 ➔ [2차전] 몽고메리 링크스 18홀 라운딩 ➔ 호이안 올드타운 야경 & 소원배',
        description: '유러피언 감성의 몽고메리 링크스에서 18홀 라운딩. 오후엔 호이안 구시가지로 이동하여 감성적인 등불 야경과 미식을 즐깁니다.',
        meal: '조식: 호텔 뷔페 / 중식: 클럽하우스 / 석식: 자유식',
        hotel: '다낭 5성급 미케비치 호텔',
        vehicle: '전용 단독 골프밴'
      },
      {
        day: 4,
        title: '호텔 체크아웃 ➔ [3차전] 호이아나 쇼어스 18홀 라운딩 ➔ 90분 VIP 스파 ➔ 심야 다낭공항 샌딩',
        description: '체크아웃 후 세계 100대 코스 호이아나 쇼어스로 이동하여 파이널 18홀 라운딩. 클럽하우스 샤워 후 다낭 시내로 이동하여 90분 전신 마사지를 받고 개운하게 심야 공항으로 이동합니다.',
        meal: '조식: 호텔 뷔페 / 중식: 클럽하우스 / 석식: 자유식',
        hotel: '기내박',
        vehicle: '전용 단독 골프밴 (체크아웃 투어 & 심야 공항 샌딩)'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '오전 한국 공항 도착 후 귀가.'
      }
    ]
  },

  // 2) 다낭/호이안 프리미엄 54홀 3박 5일 (바나힐스 + 빈펄 남호이안 + 몽고메리)
  {
    id: 'prod-golf-54h-danang-banahills-3n5d',
    title: '[다낭/호이안 54홀/3박5일] 바나힐스 마운틴 + 빈펄 남호이안 + 몽고메리 54홀 프리미엄 팩',
    subTitle: '루크 도널드 바나힐스 + 해변 듄스 빈펄 + 몽고메리 | 5성급 호텔 + 그린피/카트/캐디 올포함 + 단독밴',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 970000,
    priceVND: 18000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 245,
    isPopular: true,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#다낭골프54홀', '#바나힐스GC', '#빈펄남호이안', '#몽고메리', '#3박5일', '#카트캐디포함'],
    description: '산악형 바나힐스와 해변형 빈펄 남호이안, 정통 링크스 몽고메리를 모두 경험할 수 있는 다채로운 54홀 골프 패키지입니다.',
    included: [
      '다낭 5성급 호텔 3박 (조식 포함)',
      '54홀 그린피 + 2인1카트 + 1인1캐디피 올포함',
      '전 일정 단독 골프밴 차량 & 기사',
      '심야 공항 픽업 및 심야 공항 샌딩'
    ],
    excluded: ['항공권', '캐디팁 ($15~$20/18홀)', '개인 식비'],
    golfSpecs: {
      holes: 54,
      totalRounds: 3,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: [
        '바나힐스 골프클럽 (18홀)',
        '빈펄 골프 남호이안 (18홀)',
        '몽고메리 링크스 다낭 (18홀)'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '한국 출발 ➔ 다낭 공항 심야 도착 ➔ 전용 차량 픽업 ➔ 호텔 체크인',
        description: '공항 도착 후 전용 골프밴 미팅하여 호텔 이동 및 휴식.',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ [1차전] 바나힐스 GC 18홀 라운딩 ➔ 다낭 시내 미식',
        description: '상쾌한 산악 코스 바나힐스에서 18홀 라운딩.',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 3,
        title: '호텔 조식 ➔ [2차전] 빈펄 골프 남호이안 18홀 라운딩 ➔ 호이안 올드타운',
        description: '빈펄 남호이안 챔피언십 18홀 라운딩 후 호이안 야경 관광.',
        hotel: '다낭 5성급 호텔'
      },
      {
        day: 4,
        title: '호텔 체크아웃 ➔ [3차전] 몽고메리 링크스 18홀 ➔ 90분 스파 ➔ 심야 다낭공항 샌딩',
        description: '몽고메리 파이널 라운딩 후 스파 마사지를 받고 심야 공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  },

  // 3) 나트랑/깜란 3대 코스 54홀 3박 5일 (KN 링크스 + 빈펄 나트랑 + 다이아몬드베이)
  {
    id: 'prod-golf-54h-nhatrang-3n5d',
    title: '[나트랑 3대코스 54홀/3박5일] KN 링크스 깜란 + 빈펄 나트랑 + 다이아몬드베이 54홀 팩',
    subTitle: '5성급 리조트 3박 + 54홀 그린피/카트/캐디 올포함 + 단독 골프밴 + 마지막 날 라운딩 후 심야 공항 샌딩',
    category: '골프투어',
    region: '남부',
    city: '나트랑',
    priceKRW: 980000,
    priceVND: 18200000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 260,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '부산', '대구'],
    tags: ['#나트랑54홀', '#KN링크스', '#빈펄나트랑', '#다이아몬드베이', '#3박5일골프', '#올포함'],
    description: '베트남 최고의 해변 휴양지 나트랑과 깜란에 위치한 3대 명문 코스를 섭렵하는 54홀 3박 5일 풀패키지입니다.',
    included: [
      '나트랑 깜란 5성급 오션 리조트 3박 (조식 포함)',
      'KN 링크스 + 빈펄 나트랑 + 다이아몬드베이 54홀 그린피/카트/캐디 포함',
      '전 일정 왕복 단독 골프밴 & 기사',
      '심야 깜란공항 픽업 및 심야 공항 샌딩'
    ],
    excluded: ['항공권', '캐디팁 ($15~$20/18홀)', '개인 경비'],
    golfSpecs: {
      holes: 54,
      totalRounds: 3,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: [
        'KN 골프링크스 깜란 (18홀)',
        '빈펄 골프클럽 나트랑 (18홀)',
        '다이아몬드베이 골프센터 (18홀)'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 나트랑 깜란공항 심야 도착 ➔ 전용 픽업 ➔ 리조트 체크인',
        description: '공항 도착 후 전용 골프밴 미팅 및 5성급 리조트 체크인.',
        hotel: '나트랑 깜란 5성급 리조트'
      },
      {
        day: 2,
        title: '리조트 조식 ➔ [1차전] KN 골프링크스 깜란 18홀 라운딩 ➔ 깜란 해변 휴양',
        description: '그렉 노먼 설계 아시아 최고 링크스 코스 라운딩.',
        hotel: '나트랑 깜란 5성급 리조트'
      },
      {
        day: 3,
        title: '리조트 조식 ➔ [2차전] 빈펄 골프클럽 나트랑 18홀 라운딩 ➔ 나트랑 시내 석식',
        description: '스피드보트를 타고 혼째섬으로 이동하여 아일랜드 18홀 라운딩.',
        hotel: '나트랑 깜란 5성급 리조트'
      },
      {
        day: 4,
        title: '리조트 체크아웃 ➔ [3차전] 다이아몬드베이 18홀 ➔ 90분 스파 ➔ 심야 공항 샌딩',
        description: '산과 바다를 낀 다이아몬드베이 라운딩 후 마사지를 받고 심야 깜란공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  },

  // 4) 하노이/북부 3대 명문 54홀 3박 5일 (스카이레이크 + 롱비엔 + 피닉스 CC)
  {
    id: 'prod-golf-54h-hanoi-3n5d',
    title: '[하노이 3대명문 54홀/3박5일] 스카이레이크 + 롱비엔 + 피닉스 CC 54홀 VIP 팩',
    subTitle: '하노이 5성급 호텔 3박 + 54홀 그린피/카트/캐디 올포함 + 단독 리무진 + 마지막 날 심야 공항 샌딩',
    category: '골프투어',
    region: '북부',
    city: '하노이',
    priceKRW: 990000,
    priceVND: 18400000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 230,
    isPopular: true,
    departureCities: ['인천', '부산', '대구', '청주'],
    tags: ['#하노이골프54홀', '#스카이레이크', '#롱비엔', '#피닉스CC', '#3박5일', '#카트캐디포함'],
    description: '베트남 1위 명문 스카이레이크와 도심형 롱비엔, 금강산 같은 비경의 피닉스 CC를 연계한 하노이 최고 권위의 54홀 골프 패키지입니다.',
    included: [
      '하노이 시내 5성급 호텔 3박 (조식 포함)',
      '스카이레이크 + 롱비엔 + 피닉스 54홀 그린피/카트/캐디 일체 포함',
      '전 일정 전용 단독 리무진 골프밴',
      '심야 노이바이공항 픽업 및 심야 공항 샌딩'
    ],
    excluded: ['항공권', '캐디팁 ($15~$20/18홀)', '식사비'],
    golfSpecs: {
      holes: 54,
      totalRounds: 3,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: [
        '스카이레이크 리조트 & CC (18홀)',
        '롱비엔 골프코스 (18홀)',
        '피닉스 골프 리조트 (용봉 CC) (18홀)'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '한국 저녁 출발 ➔ 하노이 노이바이공항 심야 도착 ➔ 전용 픽업 ➔ 호텔 체크인',
        description: '공항 도착 후 단독 골프밴 미팅하여 호텔 이동.',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ [1차전] 스카이레이크 CC 18홀 라운딩 ➔ 하노이 미식 석식',
        description: '베트남 최고의 명문 스카이레이크에서 감동의 18홀 플레이.',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 3,
        title: '호텔 조식 ➔ [2차전] 롱비엔 골프코스 18홀 라운딩 ➔ 하노이 올드쿼터 탐방',
        description: '접근성 최고 롱비엔 27홀 중 18홀 라운딩.',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 4,
        title: '호텔 체크아웃 ➔ [3차전] 피닉스 CC 18홀 ➔ 90분 스파 ➔ 심야 노이바이공항 샌딩',
        description: '기암괴석 풍경의 피닉스 CC 라운딩 후 마사지를 받고 심야 공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  },

  // 5) 호치민/남부 3대 챔피언십 54홀 3박 5일 (탄손넛 + 투득 + 트윈도브스)
  {
    id: 'prod-golf-54h-hochiminh-3n5d',
    title: '[호치민 3대코스 54홀/3박5일] 탄손넛 CC + 투득 CC + 트윈도브스 54홀 챔피언십 팩',
    subTitle: '호치민 1군 5성급 호텔 3박 + 54홀 그린피/카트/캐디 올포함 + 단독 골프밴 + 마지막 날 심야 공항 샌딩',
    category: '골프투어',
    region: '남부',
    city: '호치민',
    priceKRW: 960000,
    priceVND: 17800000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 210,
    isPopular: true,
    departureCities: ['인천', '부산'],
    tags: ['#호치민골프54홀', '#탄손넛CC', '#투득CC', '#트윈도브스', '#3박5일', '#카트캐디포함'],
    description: '호치민 인근 최고 권위의 3개 명문 골프장을 매일 18홀씩 쾌적하게 라운딩하는 3박 5일 완성형 골프투어입니다.',
    included: [
      '호치민 1군 5성급 호텔 3박 (조식 포함)',
      '탄손넛 + 투득 + 트윈도브스 54홀 그린피/카트/캐디 올포함',
      '전 일정 단독 골프밴 차량 & 기사',
      '심야 탄손넛공항 픽업 및 심야 공항 샌딩'
    ],
    excluded: ['항공권', '캐디팁 ($15~$20/18홀)', '식사비'],
    golfSpecs: {
      holes: 54,
      totalRounds: 3,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: [
        '탄손넛 골프코스 (18홀)',
        '베트남 골프 & CC (투득 CC) (18홀)',
        '트윈도브스 골프클럽 (18홀)'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '한국 출발 ➔ 호치민 탄손넛공항 심야 도착 ➔ 전용 픽업 ➔ 5성급 호텔 체크인',
        description: '공항 도착 후 단독 골프밴 미팅하여 호텔 이동.',
        hotel: '호치민 1군 5성급 호텔'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ [1차전] 탄손넛 CC 18홀 라운딩 ➔ 호치민 시내 핫플 석식',
        description: '도심 속 최고급 36홀 탄손넛 코스 라운딩.',
        hotel: '호치민 1군 5성급 호텔'
      },
      {
        day: 3,
        title: '호텔 조식 ➔ [2차전] 투득 CC 18홀 라운딩 ➔ 사이공강 루프탑 바',
        description: '베트남에서 가장 역사 깊은 36홀 명문 코스 라운딩.',
        hotel: '호치민 1군 5성급 호텔'
      },
      {
        day: 4,
        title: '호텔 체크아웃 ➔ [3차전] 트윈도브스 18홀 ➔ 90분 스파 ➔ 심야 탄손넛공항 샌딩',
        description: 'KLPGA 대회가 열렸던 명문 트윈도브스 라운딩 후 마사지 및 심야 공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  },

  // 6) 달랏 고원 피서 골프 54홀 3박 5일 (달랏 팰리스 + 삼투옌람 + 달랏 1200)
  {
    id: 'prod-golf-54h-dalat-3n5d',
    title: '[달랏 고원피서 54홀/3박5일] 달랏 팰리스 + 삼투옌람 + 달랏 1200 54홀 황실 힐링팩',
    subTitle: '해발 1,500m 서늘한 날씨! 100년 황실 달랏팰리스 + 5성급 호텔 + 그린피/카트/캐디 올포함',
    category: '골프투어',
    region: '남부',
    city: '달랏',
    priceKRW: 980000,
    priceVND: 18200000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 195,
    isPopular: true,
    departureCities: ['인천', '부산'],
    tags: ['#달랏골프54홀', '#달랏팰리스', '#삼투옌람', '#달랏1200', '#3박5일', '#피서골프'],
    description: '한여름에도 18~24도의 서늘하고 쾌적한 날씨를 자랑하는 달랏의 3대 명문 코스에서 땀 흘리지 않고 즐기는 피서 골프투어입니다.',
    included: [
      '달랏 5성급 호텔 3박 (조식 포함)',
      '달랏 팰리스 + 삼투옌람 + 달랏 1200 54홀 그린피/카트/캐디 포함',
      '전 일정 전용 단독 골프밴 & 기사',
      '심야 리엔크엉공항 픽업 및 심야 공항 샌딩'
    ],
    excluded: ['항공권', '캐디팁 ($15~$20/18홀)', '식사비'],
    golfSpecs: {
      holes: 54,
      totalRounds: 3,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: [
        '달랏 팰리스 골프클럽 (18홀)',
        '삼투옌람 골프클럽 (18홀)',
        '더 달랏 1200 컨트리클럽 (18홀)'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '한국 출발 ➔ 달랏 리엔크엉공항 심야 도착 ➔ 전용 픽업 ➔ 호텔 체크인',
        description: '공항 도착 후 전용 골프밴 미팅하여 호텔 이동.',
        hotel: '달랏 5성급 호텔'
      },
      {
        day: 2,
        title: '호텔 조식 ➔ [1차전] 100년 전통 달랏 팰리스 GC 18홀 ➔ 달랏 야시장',
        description: '100년 황실 벤트그라스 코스에서 상쾌한 라운딩.',
        hotel: '달랏 5성급 호텔'
      },
      {
        day: 3,
        title: '호텔 조식 ➔ [2차전] 삼투옌람 GC 18홀 ➔ 숲속 감성 카페',
        description: '투옌람 호수를 품은 청정 밸리 코스 라운딩.',
        hotel: '달랏 5성급 호텔'
      },
      {
        day: 4,
        title: '호텔 체크아웃 ➔ [3차전] 더 달랏 1200 18홀 ➔ 90분 스파 ➔ 심야 리엔크엉공항 샌딩',
        description: 'KLPGA 윈터 투어 개최지 달랏 1200 라운딩 후 마사지 및 심야 공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  },

  // 7) 푸꾸옥 오션뷰 54홀 3박 5일
  {
    id: 'prod-golf-54h-phuquoc-3n5d',
    title: '[푸꾸옥 오션뷰 54홀/3박5일] 빈펄 푸꾸옥 CC 54홀 & 5성급 비치프론트 리조트 VIP 팩',
    subTitle: '원시림 & 에메랄드 해변 54홀 챔피언십 | 5성급 해변 리조트 3박 + 그린피/카트/캐디 올포함 + 단독밴',
    category: '골프투어',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 990000,
    priceVND: 18400000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewCount: 180,
    isPopular: true,
    departureCities: ['인천', '부산', '청주'],
    tags: ['#푸꾸옥골프54홀', '#빈펄푸꾸옥', '#3박5일', '#아일랜드골프', '#카트캐디포함'],
    description: '푸꾸옥 섬의 청정 원시림과 에메랄드 바다를 배경으로 매일 18홀씩 54홀 라운딩과 최고급 비치 리조트 휴양을 동시에 즐기는 상품입니다.',
    included: [
      '푸꾸옥 5성급 해변 리조트 3박 (조식 포함)',
      '빈펄 푸꾸옥 54홀 그린피 + 2인1카트 + 1인1캐디피 올포함',
      '전 일정 전용 단독 리무진 골프밴',
      '심야 푸꾸옥공항 픽업 및 심야 공항 샌딩'
    ],
    excluded: ['항공권', '캐디팁 ($15~$20/18홀)', '식사비'],
    golfSpecs: {
      holes: 54,
      totalRounds: 3,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      cartIncluded: true,
      caddieTipInfo: '$15 ~ $20 / 18홀',
      golfCourseNames: [
        '빈펄 골프 푸꾸옥 (Day 2 - 18홀)',
        '빈펄 골프 푸꾸옥 (Day 3 - 18홀)',
        '빈펄 골프 푸꾸옥 (Day 4 - 18홀)'
      ]
    },
    itinerary: [
      {
        day: 1,
        title: '한국 출발 ➔ 푸꾸옥 공항 심야 도착 ➔ 전용 골프밴 미팅 ➔ 리조트 체크인',
        description: '공항 도착 후 전용 픽업 차량으로 리조트 이동.',
        hotel: '푸꾸옥 5성급 해변 리조트'
      },
      {
        day: 2,
        title: '리조트 조식 ➔ [1차전] 빈펄 푸꾸옥 18홀 ➔ 그랜드월드 야경',
        description: '원시림 속 18홀 첫 라운딩 후 그랜드월드 관광.',
        hotel: '푸꾸옥 5성급 해변 리조트'
      },
      {
        day: 3,
        title: '리조트 조식 ➔ [2차전] 빈펄 푸꾸옥 18홀 ➔ 선셋타운 & 야시장',
        description: '상쾌한 18홀 2차전 라운딩 후 선셋 감상.',
        hotel: '푸꾸옥 5성급 해변 리조트'
      },
      {
        day: 4,
        title: '리조트 체크아웃 ➔ [3차전] 빈펄 푸꾸옥 파이널 18홀 ➔ 90분 스파 ➔ 심야 공항 샌딩',
        description: '파이널 18홀 라운딩 후 마사지 및 심야 푸꾸옥공항 이동.',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '이른 아침 한국 공항 도착',
        description: '한국 도착.'
      }
    ]
  }
];
