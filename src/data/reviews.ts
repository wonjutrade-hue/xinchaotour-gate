export interface ReviewItem {
  id: string;
  userName: string;
  userPhoto?: string;
  region: string;
  productTitle: string;
  rating: number;
  date: string;
  content: string;
  photos?: string[];
  likes?: number;
  verified?: boolean;
}

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    userName: '김*진 님 (가족 여행)',
    userPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    region: '중부 다낭/호이안',
    productTitle: '[다낭/독채풀빌라] 미케비치 오션뷰 4베드룸 프리미엄 풀빌라 3박 5일',
    rating: 5,
    date: '2026-07-28',
    content: '부모님 칠순 기념으로 대가족 8명이서 다녀왔습니다. 미케비치 바로 앞 단독 풀빌라였는데 개인 수영장도 정말 크고, 매일 아침 조식 룸서비스와 풀사이드 바베큐 파티까지 완벽했습니다. 한국어 가이드님이 어르신들 일정 배려를 너무 잘해주셔서 감동이었습니다!',
    photos: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    ],
    likes: 42,
    verified: true
  },
  {
    id: 'rev-02',
    userName: '박*수 님 (골프 동호회)',
    userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    region: '중부 다낭',
    productTitle: '[다낭/골프] BRG 다낭 & 바나힐 & 몽고메리 3색 54홀 명품 골프 3박 5일',
    rating: 5,
    date: '2026-07-15',
    content: '동호회 멤버 4명이서 54홀 라운딩 패키지 이용했습니다. BRG와 바나힐스 코스 상태가 최고였고, 1인 1캐디 서비스도 아주 능숙했습니다. 골프백 전용 VIP 리무진 밴으로 매일 이동해서 전혀 피로하지 않았고 야간 마사지 연계까지 신짜오투어 대표님이 직접 챙겨주셔서 감사했습니다.',
    photos: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80'
    ],
    likes: 38,
    verified: true
  },
  {
    id: 'rev-03',
    userName: '이*정 님 (커플 여행)',
    userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    region: '북부 하노이/하롱베이',
    productTitle: '[북부/하롱베이] 하노이 & 하롱베이 5성급 럭셔리 크루즈 3박 5일',
    rating: 5,
    date: '2026-06-30',
    content: '하롱베이 5성급 앰배서더 크루즈에서의 1박은 인생 최고의 경험이었습니다. 발코니 캐빈에서 보는 기암괴석 일출과 선상 뷔페가 환상적이었어요. 하노이 36거리와 호안끼엠 미슐랭 분짜 맛집까지 완벽한 동선이었습니다. 카톡 상담도 즉각 친절히 답해주셨어요!',
    photos: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80'
    ],
    likes: 29,
    verified: true
  },
  {
    id: 'rev-04',
    userName: '정*훈 님 (친구 모임)',
    userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    region: '남부 푸꾸옥',
    productTitle: '[남부/휴양] 푸꾸옥 5성급 리조트 & 혼똔섬 해상 케이블카 3박 5일',
    rating: 5,
    date: '2026-06-12',
    content: '친구 4명과 함께 푸꾸옥 다녀왔는데, 세계 최장 해상 케이블카와 사파리 투어 정말 알찼습니다. 5성급 풀만 리조트 비치도 너무 아름다웠고 신짜오투어의 단독 차량 지원 덕분에 킹콩마트 쇼핑과 야시장까지 편하게 다녔습니다. 다음 골프 여행 때도 무조건 신짜오투어로 갈게요!',
    likes: 31,
    verified: true
  },
  {
    id: 'rev-05',
    userName: '최*민 님 (북부 어드벤처)',
    userPhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    region: '북부 하장/동반/까오방',
    productTitle: '[북부/대자연] 하장 루프 & 동반 고원 마피렝 협곡 & 반지옥 폭포 4박 6일',
    rating: 5,
    date: '2026-05-20',
    content: '베트남의 숨겨진 비경 하장과 마피렝 협곡, 반지옥 폭포를 단독 리무진과 한국어 가이드님과 함께 편안하게 다녀왔습니다. 풍경이 웅장하고 일반 패키지에서는 절대 갈 수 없는 낭만 가득한 코스였어요!',
    likes: 56,
    verified: true
  }
];
