import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    title: '[북부/하롱베이] 하노이 & 하롱베이 5성급 럭셔리 크루즈 3박 5일',
    subTitle: '유네스코 세계자연유산 하롱베이 1박 2일 크루즈 숙박 + 하노이 시티투어 & 닌빈 짱안',
    category: '추천패키지',
    region: '북부',
    city: '하롱베이',
    priceKRW: 790000,
    priceVND: 14600000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509030450996-93f2e3d84074?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 142,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '김해', '대구'],
    tags: ['5성급크루즈', '하롱베이1박', 'NO쇼핑', '한국인가이드', '전일정식사포함'],
    description: '베트남 북부 최고의 비경! 유네스코 세계유산 하롱베이의 최고급 5성 럭셔리 크루즈에서 보내는 수평선 위 특별한 하룻밤. 하노이 36거리 마사지 체험과 닌빈 짱안 나룻배 투어가 모두 포함된 베스트 패키지입니다.',
    included: [
      '왕복 항공권 및 공항 이용료',
      '전일정 5성급 호텔 & 럭셔리 하롱베이 크루즈 1박',
      '한국인 전문 가이드 & 전용 차량',
      '전일정 식사 (하롱베이 선상 뷔페, 하노이 분짜/쌀국수 특식)',
      '발마사지 90분 포함 (팁 별도)',
      '여행자 보험 최고 1억원'
    ],
    excluded: [
      '가이드/기사 경비 ($50/인)',
      '개인 매너팁 및 개인 경비',
      '독실 사용료 (필요시)'
    ],
    itinerary: [
      {
        day: 1,
        title: '인천/지방 공항 출발 -> 하노이 노이바이 국제공항 도착',
        description: '하노이 노이바이 공항 도착 후 전담 가이드 미팅. 전용 차량으로 호텔 이동 후 휴식 및 자유시간.',
        meal: '석식: 현지 특식 쌀국수',
        hotel: '하노이 5성급 그리랜드 호텔 또는 동급'
      },
      {
        day: 2,
        title: '하노이 출발 -> 하롱베이 이동 & 럭셔리 크루즈 승선',
        description: '조식 후 하롱베이 이동. 선착장 도착 후 럭셔리 크루즈 승선. 선상 런치 뷔페 Enjoy! 카약 체험 및 티톱섬 전망대 방문.',
        meal: '조식: 호텔식 / 중식: 크루즈 선상 뷔페 / 석식: 코스 요리',
        hotel: '하롱베이 5성급 럭셔리 크루즈 (오션뷰 발코니 객실)'
      },
      {
        day: 3,
        title: '크루즈 일출 태극권 -> 승솟 동굴 탐험 -> 닌빈 짱안 이동',
        description: '선상 일출 태극권 클래스 및 조식. 세계 최대 석회암 동굴 승솟 동굴 관람. 하선 후 영화 아바타 촬영지 닌빈 짱안 삼판배 투어.',
        meal: '조식: 크루즈식 / 중식: 현지 염소고기 특식 / 석식: 삼겹살 파티',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 4,
        title: '하노이 시티투어 (바딘 광장, 성요셉 성당, 스트리트카) -> 공항 이동',
        description: '하노이 바딘 광장, 호치민 생가, 성요셉 성당 탐방. 36거리 스트리트카 체험 및 전신 마사지 90분. 석식 후 공항 이동.',
        meal: '조식: 호텔식 / 중식: 하노이 전통 분짜 / 석식: 분짜 & 분보남보',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '한국 도착',
        description: '인천/지방 공항 도착 후 안녕히 가십시오.',
        meal: '조식: 기내식'
      }
    ]
  },
  {
    id: 'prod-102',
    title: '[중부/다낭] 다낭 & 호이안 힐링 올인클루시브 3박 5일',
    subTitle: '바나힐 골든브릿지 케이블카 + 호이안 올드타운 투본강 소망등 + 프리미엄 힐링 마사지',
    category: '추천패키지',
    region: '중부',
    city: '다낭',
    priceKRW: 650000,
    priceVND: 12000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.95,
    reviewCount: 230,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '김해', '대구', '청주'],
    tags: ['바나힐국립공원', '호이안야경', '투본강소망등', 'NO옵션', '가족여행강추'],
    description: '베트남 대표 휴양지 다낭! 바나힐 국립공원의 거대한 손 모양 골든브릿지 케이블카, UNESCO 세계유산 호이안 올드타운 야경과 등불 배 체험, 마사지 2회 포함으로 가족 및 연인에게 강력 추천합니다.',
    included: [
      '왕복 항공권 및 공항세',
      '다낭 미케비치 앞 5성급 리조트 3박',
      '전일정 관광지 입장료 및 바나힐 케이블카',
      '호이안 투본강 소망등 배 체험',
      '전신 아로마 마사지 2회 (각 90분)',
      '전문 한국어 가이드 & 단독/프리미엄 차량'
    ],
    excluded: [
      '가이드/기사 매너팁 ($40/인)',
      '개인 지출 비용'
    ],
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 도착 -> 호텔 체크인 & 미케비치 야경',
        description: '다낭 공항 미팅 후 호텔 체크인. 세계 6대 해변 미케비치 산책 및 자유시간.',
        meal: '석식: 다낭 해산물 특식',
        hotel: '다낭 5성급 노보텔 또는 동급 리조트'
      },
      {
        day: 2,
        title: '세계 최장 바나힐 케이블카 & 골든브릿지 -> 프랑스 마을',
        description: '구름 위의 테마파크 바나힐 국립공원 방문. 골든브릿지 촬영 및 루지 탑승, 뷔페 중식 후 다낭 시내 이동.',
        meal: '조식: 호텔식 / 중식: 바나힐 100가지 뷔페 / 석식: 반세오 & 월남쌈 특식',
        hotel: '다낭 5성급 리조트'
      },
      {
        day: 3,
        title: '손짜반도 영응사 -> 호이안 올드타운 & 투본강 야경 등불 배',
        description: '해수관음상이 서있는 영응사 방문. 호이안 구시가지 야경 투어 및 투본강 소망등 띄우기 체험.',
        meal: '조식: 호텔식 / 중식: 현지 퓨전 일식 / 석식: 호이안 미꽝 & 모닝글로리',
        hotel: '다낭 5성급 리조트'
      },
      {
        day: 4,
        title: '다낭 대성당, 한시장 쇼핑 -> 스파 마사지 -> 공항 이동',
        description: '핑크성당이라 불리는 다낭 대성당 및 한시장 쇼핑. 90분 럭셔리 아로마 스파 후 공항 이동.',
        meal: '조식: 호텔식 / 중식: 마담란 베트남 가정식 / 석식: 한식 소불고기',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '한국 공항 안착',
        description: '한국 도착 후 귀가.',
        meal: '조식: 기내식'
      }
    ]
  },
  {
    id: 'prod-103',
    title: '[남부/푸꾸옥] 푸꾸옥 에메랄드 베이 럭셔리 프라이빗 휴양 4박 6일',
    subTitle: '빈원더스 테마파크 + 사파리 + 혼똠섬 세계최장 케이블카 + 메디터레이니언 타운',
    category: '추천패키지',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 890000,
    priceVND: 16500000,
    duration: '4박 6일',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.98,
    reviewCount: 98,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '김해'],
    tags: ['베트남몰디브', '빈원더스', '사파리', '케이블카', '올인클루시브'],
    description: '베트남의 숨겨진 보석, 베트남의 몰디브라 불리는 푸꾸옥! 에메랄드빛 전용 해변 리조트, 세계 최대 규모의 빈원더스 사파리 및 혼똠섬 해상 케이블카를 완벽히 즐기는 휴양 패키지입니다.',
    included: [
      '왕복 항공권 및 제세공과금',
      '푸꾸옥 5성급 인터컨티넨탈/멜리아 4박',
      '빈원더스 & 사파리 올데이 자유이용권',
      '혼똠섬 해상 케이블카 탑승권',
      '선셋 타운 레이저 분수 쇼 감상',
      '전일정 전용차량 & 한국어 가이드'
    ],
    excluded: [
      '가이드 매너팁 ($50/인)',
      '개인 매너팁'
    ],
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 국제공항 도착 -> 리조트 체크인 & 수영장 휴식',
        description: '공항 도착 후 전용 차량으로 리조트 이동. 체크인 후 푸꾸옥의 투명한 바다와 인피니티 풀에서 여유로운 휴식.',
        meal: '석식: 리조트 오션뷰 뷔페',
        hotel: '푸꾸옥 5성급 럭셔리 리조트'
      },
      {
        day: 2,
        title: '빈원더스 테마파크 & 빈펄 사파리 오프로드 체험',
        description: '아시아 최대규모 야생 사파리 투어 및 빈원더스 놀이공원, 대형 아쿠아리움 체험.',
        meal: '조식: 리조트식 / 중식: 테마파크 내부 식당 / 석식: 푸꾸옥 씨푸드',
        hotel: '푸꾸옥 5성급 럭셔리 리조트'
      },
      {
        day: 3,
        title: '혼똠섬 해상 케이블카 탑승 -> 워터파크 & 스노클링',
        description: '바다 위를 가로지르는 7.9km 세계 최장 케이블카 타고 혼똠섬 이동. 썬월드 워터파크 및 스노클링.',
        meal: '조식: 리조트식 / 중식: 혼똠섬 뷔페 / 석식: 선셋 스파게티 & 스테이크',
        hotel: '푸꾸옥 5성급 럭셔리 리조트'
      },
      {
        day: 4,
        title: '전일정 자유시간 & 스파 마사지 120분',
        description: '온전한 휴식을 위한 100% 자유시간. 오전에 마사지 120분 포함. 푸꾸옥 즈엉동 야시장 투어.',
        meal: '조식: 리조트식 / 중식: 자유식 / 석식: 야시장 현지 특식',
        hotel: '푸꾸옥 5성급 럭셔리 리조트'
      },
      {
        day: 5,
        title: '선셋 타운 관광 -> 코코넛 감옥 & 딘까우 사원 -> 공항 이동',
        description: '지중해 분위기 선셋타운 산책 및 딘까우 사원 방문. 석식 후 공항 이동.',
        meal: '조식: 리조트식 / 중식: 베트남 샌드위치 반미 & 연유커피 / 석식: 한식',
        hotel: '기내박'
      },
      {
        day: 6,
        title: '한국 도착',
        description: '한국 도착 후 일정 종료.',
        meal: '조식: 기내식'
      }
    ]
  },
  {
    id: 'prod-104',
    title: '[골프투어/중부] 다낭 BRG & 바나힐 명문 CC 럭셔리 골프 3박 5일 (54홀)',
    subTitle: '잭 니클라우스 설계 BRG 다낭 CC + 바나힐 Golf Club 무제한 라운딩 + 5성급 골프리조트',
    category: '골프투어',
    region: '중부',
    city: '다낭',
    priceKRW: 1190000,
    priceVND: 22000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.96,
    reviewCount: 76,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '김해', '대구'],
    tags: ['다낭골프', '54홀라운딩', '그린피포함', '1인1캐디', '전용송영차량'],
    description: '세계적인 골프 거장 잭 니클라우스와 룩 도널드가 디자인한 다낭 최고의 챔피언십 코스! BRG 다낭 Golf Resort, 바나힐 GC, 몽고메리 링크스에서 펼쳐지는 황홀한 54홀 프리미엄 골프 라운딩 패키지입니다.',
    included: [
      '왕복 항공권 및 공항세',
      '다낭 5성급 쉐라톤 Grand Resort 또는 동급 3박',
      '54홀 그린피 + 전동카트(2인1카트) + 캐디피',
      '전일정 골프장 왕복 단독 전용차량',
      '조식 및 석식 포함 (클럽하우스 중식 제외)',
      '골프 여행자 보험'
    ],
    excluded: [
      '캐디팁 ($15~$20 / 18홀 / 1인)',
      '클럽하우스 중식 및 개인 음료',
      '개인 골프채 클럽 렌탈비'
    ],
    golfSpecs: {
      holes: 54,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['BRG Da Nang Golf Resort', 'Ba Na Hills Golf Club', 'Montgomery Links']
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 도착 후 호텔 이동 및 체크인',
        description: '다낭 국제공항 미팅 후 골프 리조트 이동. 내일 라운딩을 위한 편안한 휴식.',
        meal: '석식: 클럽 웰컴 석식',
        hotel: '다낭 쉐라톤 그랜드 리조트 5성급'
      },
      {
        day: 2,
        title: '1차 라운딩 : BRG 다낭 Golf Resort (18홀)',
        description: '잭 니클라우스 코스에서 18홀 신나는 라운딩! 오션뷰 샌드 듄 코스. 라운딩 후 다낭 시내 전신 마사지.',
        meal: '조식: 호텔식 / 중식: 클럽하우스(자유식) / 석식: 다낭 다이닝 고급 한식',
        hotel: '다낭 쉐라톤 그랜드 리조트 5성급'
      },
      {
        day: 3,
        title: '2차 라운딩 : 바나힐 Golf Club (18홀 야간 조명 포함 가능)',
        description: '세계 골프 어워드 베스트 코스 선정! 산악 지형의 드라마틱한 바나힐 CC 18홀 라운딩.',
        meal: '조식: 호텔식 / 중식: 클럽하우스 / 석식: 호이안 올드타운 강변 다이닝',
        hotel: '다낭 쉐라톤 그랜드 리조트 5성급'
      },
      {
        day: 4,
        title: '3차 라운딩 : 몽고메리 링크스 (18홀) -> 공항 이동',
        description: '콜린 몽고메리가 설계한 베트남 최초의 명문 링크스 코스 18홀. 샤워 및 짐정리 후 공항 이동.',
        meal: '조식: 호텔식 / 중식: 클럽하우스 / 석식: 해산물 BBQ',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '한국 도착',
        description: '이른 아침 한국 공항 안착.',
        meal: '조식: 기내식'
      }
    ]
  },
  {
    id: 'prod-105',
    title: '[풀빌라/중부] 다낭 하얏트 리젠시 오션뷰 프라이빗 3베드룸 독채 풀빌라 3박 5일',
    subTitle: '전용 인피니티 풀 + 미케비치 도보 1분 + 프리미엄 픽업 & 24시간 한국어 컨시어지 서비스',
    category: '풀빌라',
    region: '중부',
    city: '다낭',
    priceKRW: 1350000,
    priceVND: 25000000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.99,
    reviewCount: 64,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 15,
    departureCities: ['인천', '김해', '대구', '무안'],
    tags: ['독채풀빌라', '3베드룸', '개별수영장', '가족대가족강추', '전용기사'],
    description: '3가족 또는 대가족 여행을 위한 극상의 프리미엄! 다낭 하얏트 리젠시의 오션뷰 독채 3베드룸 풀빌라에서 프라이빗 수영장과 바다를 독점하세요. 전용 가이드 & 전용 차량 서비스 포함.',
    included: [
      '왕복 항공권 (프리미엄 좌석 지원 선택)',
      '다낭 하얏트 리젠시 독채 3베드룸 풀빌라 3박',
      '매일 빌라 내 프라이빗 조식 / 리조트 뷔페 조식 선택',
      '공항-빌라 단독 샌딩/픽업 차량 서비스',
      '풀빌라 내 BB﻿Q 파티 1회 제공 (쉐프 방문 쿠킹)',
      '풀니스 럭셔리 스파 120분 포함'
    ],
    excluded: [
      '기사/가이드 매너팁',
      '빌라 미니바 및 개인 지출'
    ],
    villaSpecs: {
      bedrooms: 3,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 8
    },
    itinerary: [
      {
        day: 1,
        title: '다낭 공항 전용 픽업 -> 하얏트 럭셔리 풀빌라 체크인',
        description: '공항 VIP 피켓 미팅 후 전용 리무진으로 하얏트 풀빌라 이동. 웰컴 드링크 및 체크인.',
        meal: '석식: 풀빌라 인룸 다이닝',
        hotel: '하얏트 리젠시 다낭 3베드룸 오션 풀빌라'
      },
      {
        day: 2,
        title: '풀빌라 프라이빗 수영 & 오후 시티 자유투어',
        description: '개별 수영장에서 여유로운 물놀이 후, 오후에 원하는 장소로 전용 차로 이동하는 자유 관광.',
        meal: '조식: 리조트식 / 중식: 자유식 / 석식: 빌라 전용 야외 BBQ 쉐프 파티',
        hotel: '하얏트 리젠시 다낭 3베드룸 오션 풀빌라'
      },
      {
        day: 3,
        title: '호이안 등불 올드타운 단독 차량 관광 & 스파 120분',
        description: '원하는 시간에 전용 기사와 함께 호이안 이동. 호이안 올드타운 감상 후 프리미엄 스파 120분.',
        meal: '조식: 리조트식 / 중식: 마담란 베트남 특식 / 석식: 호이안 리버사이드 고급 특식',
        hotel: '하얏트 리젠시 다낭 3베드룸 오션 풀빌라'
      },
      {
        day: 4,
        title: '레이트 체크아웃(18:00) -> 쇼핑 & 공항 샌딩',
        description: '여유로운 18시 레이트 체크아웃 후 롯데마트 쇼핑 및 공항 이동.',
        meal: '조식: 리조트식 / 중식: 자유식 / 석식: 다낭 최고급 해산물',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '한국 도착',
        description: '한국 도착.',
        meal: '조식: 기내식'
      }
    ]
  },
  {
    id: 'prod-106',
    title: '[자유여행/중부] 나트랑 공항 픽업 + 시티투어 & 호핑투어 자유 패키지',
    subTitle: '알짜배기 필수 동선만 결합된 베스트 자유여행 패키지 (호텔은 내가 원하는 곳으로!)',
    category: '자유여행',
    region: '중부',
    city: '나트랑',
    priceKRW: 320000,
    priceVND: 5900000,
    duration: '자유일정 (3박~5박)',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.88,
    reviewCount: 185,
    isPopular: false,
    isHotDeal: true,
    discountPercent: 20,
    departureCities: ['인천', '김해'],
    tags: ['공항픽업샌딩', '스피드보트호핑', '머드스파', '시티투어', '100%자유선택'],
    description: '호텔과 항공은 내 마음대로! 나트랑 첫날 공항 픽업부터 스피드보트 호핑투어, 롱선사/포나가르 탑 시티투어, 럭셔리 탑바 머드스파까지 귀찮은 이동과 투어만 스마트하게 해결하는 최강 가성비 패키지입니다.',
    included: [
      '깜란 공항 <-> 호텔 단독 픽업 & 샌딩 차량',
      '나트랑 스피드보트 스노클링 호핑투어 (점심 뷔페 포함)',
      '탑바 머드 온천 스파 입장권 & 단독 이동차량',
      '나트랑 시티투어 (포나가르 사원, 롱선사, 나트랑 대성당)',
      '현지 카카오톡 24시간 긴급 한국어 지원'
    ],
    excluded: [
      '항공권 및 호텔 숙박권 (원할 시 신차오투어 할인 예약 가능)',
      '식사 중 포함 사항 외 지출',
      '개인 매너팁'
    ],
    itinerary: [
      {
        day: 1,
        title: '나트랑 깜란 공항 단독 피켓 미팅 -> 호텔 픽업',
        description: '공항 출국장 앞에서 한국어 가이드 또는 기사 미팅 후 고객 지정 호텔로 안전하게 단독 이동.',
        meal: '자유식',
        hotel: '고객 개별 예약 호텔'
      },
      {
        day: 2,
        title: '나트랑 스피드보트 아일랜드 호핑투어 (08:30 ~ 15:00)',
        description: '에메랄드빛 혼문섬에서 스노클링 및 해양 스포츠, 선상 해산물 중식 뷔페.',
        meal: '중식: 씨푸드 선상 뷔페',
        hotel: '고객 개별 예약 호텔'
      },
      {
        day: 3,
        title: '탑바 머드온천 스파 & 나트랑 시티 주요 명소 투어',
        description: '천연 머드 온천 스파에서 힐링 후, 1200년 역사의 포나가르 참탑과 롱선사 관람.',
        meal: '자유식',
        hotel: '고객 개별 예약 호텔'
      },
      {
        day: 4,
        title: '자유일정 후 공항 샌딩 서비스',
        description: '체크아웃 후 지정된 시간에 전용차량이 호텔 앞 대기하여 공항까지 이동.',
        meal: '자유식',
        hotel: '기내박 / 귀국'
      }
    ]
  },
  {
    id: 'prod-107',
    title: '[자유여행/북부] 하노이 출발 사파 판시판 산악열차 & 소모의 마을 프리패키지 2박 3일',
    subTitle: '인도차이나의 지붕 판시판 정상(3,143m) 케이블카 + 캣캣 계단식 논 마을 트레킹',
    category: '자유여행',
    region: '북부',
    city: '사파',
    priceKRW: 480000,
    priceVND: 8900000,
    duration: '2박 3일',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509030450996-93f2e3d84074?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.93,
    reviewCount: 110,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['하노이출발', '인천', '김해'],
    tags: ['사파트레킹', '판시판케이블카', '모노레일', '소수민족마을', '사파럭셔리리조트'],
    description: '구름 위의 도시 사파! 하노이에서 최고급 캐빈 슬리핑 버스로 사파까지 편안히 이동하여 판시판 정상 모노레일 및 캣캣 소수민족 마을을 경험하는 몽환적인 자유 결합 상품입니다.',
    included: [
      '하노이 <-> 사파 왕복 리무진 버스 (전용 침대석)',
      '사파 4성/5성급 오션뷰 리조트 2박',
      '판시판 케이블카 및 모노레일 왕복 티켓',
      '캣캣 소수민족 마을 가이드 트레킹',
      '전일정 조식 및 사파 고원 특식 2회'
    ],
    excluded: [
      '하노이 왕복 항공권 (별도 문의)',
      '개인 음료 및 매너팁'
    ],
    itinerary: [
      {
        day: 1,
        title: '하노이 출발 -> 사파 고원 도착 & 캣캣 마을 탐방',
        description: '하노이 호텔 미팅 후 사파 이동. 사파 도착 후 체크인 및 몽족의 고유 문화를 간직한 캣캣 마을 트레킹.',
        meal: '중식: 사파 철판구이 / 석식: 연어 핫팟 특식',
        hotel: '사파 4성급 럭셔리 뷰 리조트'
      },
      {
        day: 2,
        title: '인도차이나 최고봉 판시판(3,143m) 등정 & 사파 광장 야경',
        description: '모노레일과 케이블카를 타고 판시판 정상 구름 위 산책. 오후 사파 노트르담 성당 및 사파 야시장 자유시간.',
        meal: '조식: 호텔식 / 중식: 판시판 뷔페 / 석식: 자유식',
        hotel: '사파 4성급 럭셔리 뷰 리조트'
      },
      {
        day: 3,
        title: '함롱산 전망대 산책 -> 하노이 복귀',
        description: '사파 전경이 한눈에 들어오는 함롱산 조망 후 하노이행 고급 리무진 탑승하여 복귀.',
        meal: '조식: 호텔식 / 중식: 사파 현지식',
        hotel: '하노이 도착 및 일정 종료'
      }
    ]
  },
  {
    id: 'prod-108',
    title: '[풀빌라/남부] 푸꾸옥 리젠트 오션 프런트 럭셔리 독채 풀빌라 4박 6일',
    subTitle: 'IHG 최상위 6성급 울트라 럭셔리 풀빌라 + 버틀러 전담 서비스 + 하루 3식 미식 스페셜',
    category: '풀빌라',
    region: '남부',
    city: '푸꾸옥',
    priceKRW: 2450000,
    priceVND: 45000000,
    duration: '4박 6일',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 5.0,
    reviewCount: 42,
    isPopular: true,
    isHotDeal: false,
    departureCities: ['인천', '김해'],
    tags: ['6성급풀빌라', '오션프런트', '버틀러서비스', '하늘위의휴양', '허니문추천'],
    description: '단 한 번뿐인 상위 1% VVIP 휴양! 베트남 푸꾸옥 최고의 리젠트(Regent Phu Quoc) 오션 프런트 풀빌라에서 전담 버틀러의 맞춤 수발과 프라이빗 인피니티 풀의 하모니를 누리세요.',
    included: [
      '왕복 국적기 비즈니스/일반석 지원 선택',
      '푸꾸옥 리젠트 6성급 오션프런트 독채 풀빌라 4박',
      '24시간 버틀러 컨시어지 서비스',
      '전일정 미쉐린 가이드 스타일 오션 다이닝 3식',
      '공항 럭셔리 벤 전용 피켓 송영 서비스',
      '리젠트 스파 90분 트리트먼트 매일 1회'
    ],
    excluded: [
      '개인 지출 비용'
    ],
    villaSpecs: {
      bedrooms: 2,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 5
    },
    itinerary: [
      {
        day: 1,
        title: '푸꾸옥 VIP 입국 -> 리젠트 독채 풀빌라 승선',
        description: '공항 픽업 후 리젠트 푸꾸옥 입성. 버틀러 안내에 따른 풀빌라 인룸 체크인.',
        meal: '석식: 웰컴 랍스터 다이닝',
        hotel: '리젠트 푸꾸옥 6성급 독채 오션 풀빌라'
      },
      {
        day: 2,
        title: '온전한 전용 풀빌라 휴식 & 매일 스파 90분',
        description: '프라이빗 풀에서 온종일 요가, 수영, 미니바 무제한 이용 및 오션뷰 스파.',
        meal: '조식: 인룸 플로팅 브런치 / 중식: 리젠트 클럽 다이닝 / 석식: 파인다이닝',
        hotel: '리젠트 푸꾸옥 6성급 독채 오션 풀빌라'
      },
      {
        day: 3,
        title: '프라이빗 요트 해상 투어 (선셋 와인 파티)',
        description: '단독 프라이빗 요트를 타며 푸꾸옥 붉은 노을 아래 와인과 핑거푸드 파티.',
        meal: '조식: 리조트 뷔페 / 중식: 선상 타파스 / 석식: 프라이빗 오션 다이닝',
        hotel: '리젠트 푸꾸옥 6성급 독채 오션 풀빌라'
      },
      {
        day: 4,
        title: '리조트 자유시간 & 럭셔리 레이트 체크아웃',
        description: '마지막 날 늦은 밤 레이트 체크아웃 지원으로 마지막까지 완벽한 휴식.',
        meal: '조식: 리조트식 / 중식: 리젠트 고메 / 석식: 한식 코스',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '한국 안착',
        description: '귀국 후 일정 종료.',
        meal: '기내식'
      }
    ]
  },
  {
    id: 'prod-109',
    title: '[골프투어/남부] 호치민 & 달랏 고원 명문 클럽 럭셔리 골프 4박 6일 (72홀)',
    subTitle: '연중 20도의 시원한 달랏 고원 골프(Dalat 1200) + 탄손누트 CC 72홀 명품 라운딩',
    category: '골프투어',
    region: '남부',
    city: '달랏',
    priceKRW: 1490000,
    priceVND: 27500000,
    duration: '4박 6일',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.97,
    reviewCount: 51,
    isPopular: false,
    isHotDeal: true,
    discountPercent: 8,
    departureCities: ['인천', '김해'],
    tags: ['달랏골프', '시원한고원골프', '72홀', '탄손누트CC', '명문클럽'],
    description: '더위를 잊은 베트남 최고의 골프 낙원! 해발 1,500m 봄의 도시 달랏의 서늘한 기후 속에서 펼쳐지는 더 다랏 1200 Country Club 및 호치민 탄손누트 CC의 72홀 초대형 VIP 라운딩.',
    included: [
      '왕복 항공권 및 국제선/국내선 항공',
      '달랏 5성급 리조트 2박 + 호치민 5성급 호텔 2박',
      '72홀 그린피 + 카트비 + 캐디피 전액 포함',
      '전일정 전용 차량 및 골프 전담 한국어 가이드',
      '전일정 조식/석식 (클럽하우스 중식 제외)'
    ],
    excluded: [
      '캐디팁 ($15~$20 / 18홀 / 1인)',
      '클럽하우스 중식'
    ],
    golfSpecs: {
      holes: 72,
      greenFeeIncluded: true,
      caddieFeeIncluded: true,
      golfCourseNames: ['The Dalat 1200 Country Club', 'SAM Tuyen Lam Golf Club', 'Tan Son Nhat Golf Course']
    },
    itinerary: [
      {
        day: 1,
        title: '호치민 경유 -> 달랏 고원 공항 도착 및 체크인',
        description: '달랏 공항도착 후 전용 리무진으로 5성급 골프 리조트 이동.',
        meal: '석식: 달랏 와인 & 철판 스테이크',
        hotel: '달랏 5성급 럭셔리 골프 리조트'
      },
      {
        day: 2,
        title: '1차 & 2차 라운딩 : The Dalat 1200 CC (36홀)',
        description: '소나무 숲과 호수가 어우러진 연중 20도 시원한 36홀 대자연 라운딩.',
        meal: '조식: 호텔식 / 중식: 클럽하우스 / 석식: 달랏 현지BBQ',
        hotel: '달랏 5성급 럭셔리 골프 리조트'
      },
      {
        day: 3,
        title: '3차 라운딩 : SAM Tuyen Lam Golf Club (18홀) -> 호치민 이동',
        description: '투옌람 호수 전경의 명문 18홀 라운딩 후 국내선 탑승하여 호치민 이동.',
        meal: '조식: 호텔식 / 중식: 클럽하우스 / 석식: 호치민 선상 디너 크루즈',
        hotel: '호치민 5성급 쉐라톤 호텔'
      },
      {
        day: 4,
        title: '4차 라운딩 : Tan Son Nhat Golf Course (18홀)',
        description: '호치민 최고의 야간 조명을 자랑하는 탄손누트 CC 18홀 및 전신 마사지.',
        meal: '조식: 호텔식 / 중식: 클럽하우스 / 석식: 호치민 최고급 한식',
        hotel: '호치민 5성급 쉐라톤 호텔'
      },
      {
        day: 5,
        title: '호치민 시티 명소 투어 -> 공항 이동',
        description: '노트르담 성당, 중앙우체국, 통일궁 관람 후 쇼핑 및 공항 이동.',
        meal: '조식: 호텔식 / 중식: 베트남 쌀국수 특식 / 석식: 반미 & 분짜',
        hotel: '기내박'
      },
      {
        day: 6,
        title: '한국 공항 안착',
        description: '귀국 후 라운딩 종료.',
        meal: '기내식'
      }
    ]
  },
  {
    id: 'prod-110',
    title: '[자유여행/남부] 호치민 활력 시티 & 메콩강 델타 투어 프리패스',
    subTitle: '경제 수도 호치민 시티투어 + 메콩강 정글 나룻배 체험 + 야경 루프탑 바 VIP 패스',
    category: '자유여행',
    region: '남부',
    city: '호치민',
    priceKRW: 350000,
    priceVND: 6500000,
    duration: '자유일정 (3박~4박)',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.89,
    reviewCount: 134,
    isPopular: false,
    isHotDeal: true,
    discountPercent: 10,
    departureCities: ['인천', '김해', '대구'],
    tags: ['호치민시티투어', '메콩강나룻배', '쿠찌터널', '루프탑바', '공항픽업'],
    description: '베트남 남부의 거대하고 활기찬 도시 호치민! 프랑스 식민지 시절 건축물 관광, 메콩강 정글 통룻배 체험, 구찌터널 입장권 및 공항 단독 송영이 망라된 일등 자유여행 패키지입니다.',
    included: [
      '호치민 공항 <-> 호텔 단독 전용 차량 픽업 & 샌딩',
      '메콩강 미토 델타 정글 나룻배 원데이 투어 (점심 포함)',
      '쿠찌터널 및 호치민 역사 박물관 입장권',
      '호치민 시티 랜드마크81 전망대 패스 ticket',
      '24시간 현지 한국어 지원 케어'
    ],
    excluded: [
      '항공 및 호텔 (원할 시 추가 가능)',
      '개인 소비 비용'
    ],
    itinerary: [
      {
        day: 1,
        title: '호치민 떤선넛 공항 미팅 -> 호텔 체크인',
        description: '공항 출국장에서 단독 기사 미팅 후 호텔로 안전 이동.',
        meal: '자유식',
        hotel: '고객 개별 선택 호텔'
      },
      {
        day: 2,
        title: '메콩강 미토 델타 정글 원데이 탐험',
        description: '야자수 울창한 메콩강 정글 속을 나룻배를 타고 누비는 열대 탐험.',
        meal: '중식: 메콩강 코끼리귀고기 특식',
        hotel: '고객 개별 선택 호텔'
      },
      {
        day: 3,
        title: '쿠찌터널 역사 현장 & 호치민 랜드마크 81 전망대',
        description: '지하 비밀 터널 쿠찌터널 체증 후, 동남아 최고층 빌딩 랜드마크 81 초고층 야경 관람.',
        meal: '자유식',
        hotel: '고객 개별 선택 호텔'
      },
      {
        day: 4,
        title: '벤탄 시장 쇼핑 & 공항 샌딩',
        description: '벤탄 시장에서 베트남 커피와 아오자이 쇼핑 후 공항 샌딩.',
        meal: '자유식',
        hotel: '기내박 / 귀국'
      }
    ]
  },
  {
    id: 'prod-111',
    title: '[추천패키지/북부] 하노이 & 닌빈 짱안 삼판배 감성 힐링 3박 4일',
    subTitle: '영화 아바타 촬영지 닌빈 짱안 보트투어 + 항무아 정상 360도 뷰 + 하노이 연유커피',
    category: '추천패키지',
    region: '북부',
    city: '닌빈',
    priceKRW: 590000,
    priceVND: 11000000,
    duration: '3박 4일',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509030450996-93f2e3d84074?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.91,
    reviewCount: 88,
    isPopular: false,
    isHotDeal: false,
    departureCities: ['인천', '김해', '대구'],
    tags: ['닌빈짱안', '육지의하롱베이', '항무아전망대', '하노이카페', '힐링패키지'],
    description: '‘육지의 하롱베이’라 불리는 닌빈! 기암괴석과 잔잔한 강물이 어우러진 짱안 삼판배를 타고 신비로운 동굴을 지나며 항무아 정상에 올라 탁 트인 닌빈의 장관을 감상하세요.',
    included: [
      '왕복 항공권 및 공항 이용료',
      '하노이 5성급 호텔 3박',
      '닌빈 짱안 삼판배 및 항무아 입장권',
      '하노이 36거리 스트리트카 & 마사지 90분',
      '한국인 가이드 & 전용 차량'
    ],
    excluded: [
      '가이드 매너팁 ($40/인)'
    ],
    itinerary: [
      {
        day: 1,
        title: '하노이 노이바이 공항 도착 -> 호텔 체크인',
        description: '공항 도착 후 가이드 미팅 및 호텔 이동.',
        meal: '석식: 하노이 소고기 쌀국수',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 2,
        title: '닌빈 짱안 삼판배 보트 투어 & 바이딘 사원',
        description: '유네스코 복합유산 짱안 삼판배 2시간 탑승 및 동남아 최대 규모 바이딘 사원 탐방.',
        meal: '조식: 호텔식 / 중식: 닌빈 염소고기 고메 / 석식: 베트남 가정식',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 3,
        title: '항무아 500계단 등반 360도 뷰관람 & 하노이 하이랜드 커피',
        description: '용의 동상이 있는 항무아 정상 관람 후 하노이 대표 에그커피/연유커피 시음.',
        meal: '조식: 호텔식 / 중식: 하노이 분따 / 석식: 분보남보',
        hotel: '하노이 5성급 호텔'
      },
      {
        day: 4,
        title: '하노이 서호 사원 산책 후 공항 귀국',
        description: '하노이 서호 쩐꾸옥 사원 둘러본 뒤 공항 이동하여 귀국.',
        meal: '조식: 호텔식 / 중식: 반미 샌드위치',
        hotel: '귀국'
      }
    ]
  },
  {
    id: 'prod-112',
    title: '[풀빌라/중부] 나트랑 아미아나 리조트 프라이빗 2베드룸 머드온천 풀빌라 3박 5일',
    subTitle: '리조트 전용 해수풀장 + 천연 해수 머드온천 스파 + 오션 라이브 스노클링',
    category: '풀빌라',
    region: '중부',
    city: '나트랑',
    priceKRW: 1120000,
    priceVND: 20800000,
    duration: '3박 5일',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.96,
    reviewCount: 104,
    isPopular: true,
    isHotDeal: true,
    discountPercent: 12,
    departureCities: ['인천', '김해', '대구'],
    tags: ['아미아나', '머드스파', '프라이빗비치', '2베드룸풀빌라', '태교여행강추'],
    description: '나트랑 최고 인기 리조트 아미아나! 투명한 프라이빗 라군 비치에서 열대어와 스노클링을 즐기고, 빌라 내 천연 해수 머드 온천탕에서 진정한 휴식을 맛보세요.',
    included: [
      '왕복 항공권 및 세금',
      '아미아나 리조트 2베드룸 독채 풀빌라 3박',
      '아미아나 프라이빗 머드온천 스파 1회 무료',
      '매일 고급 리조트 조식 뷔페',
      '공항 <-> 아미아나 단독 픽업샌딩 차량',
      '나트랑 시내 셔틀버스 이용'
    ],
    excluded: [
      '개인 매너팁 및 추가 식사'
    ],
    villaSpecs: {
      bedrooms: 2,
      privatePool: true,
      oceanView: true,
      maxOccupancy: 6
    },
    itinerary: [
      {
        day: 1,
        title: '나트랑 깜란 공항도착 -> 아미아나 풀빌라 체크인',
        description: '단독 차량으로 아미아나 도착 후 프라이빗 풀빌라 체크인.',
        meal: '석식: 아미아나 오션뷰 파인다이닝',
        hotel: '나트랑 아미아나 리조트 2베드룸 풀빌라'
      },
      {
        day: 2,
        title: '프라이빗 라군 비치 스노클링 & 해수 머드온천 스파',
        description: '리조트 앞 바다에서 물고기와 어우러지는 스노클링 및 천연 머드 온천욕.',
        meal: '조식: 리조트식 / 중식: 자유식 / 석식: 아미아나 씨푸드',
        hotel: '나트랑 아미아나 리조트 2베드룸 풀빌라'
      },
      {
        day: 3,
        title: '나트랑 시내 마사지 & 담시장 산책',
        description: '무료 셔틀을 이용하거나 전용차량으로 시내 나가서 유명 맛집 탐방.',
        meal: '조식: 리조트식 / 중식: 마담프엉 월남쌈 / 석식: 갈랑가 베트남 요리',
        hotel: '나트랑 아미아나 리조트 2베드룸 풀빌라'
      },
      {
        day: 4,
        title: '체크아웃 후 세일링 클럽 노을 감상 -> 공항 이동',
        description: '나트랑 세일링클럽에서 해변 노을 감상 및 공항 이동.',
        meal: '조식: 리조트식 / 중식: 자유식 / 석식: 한식',
        hotel: '기내박'
      },
      {
        day: 5,
        title: '한국 도착',
        description: '한국 도착.',
        meal: '기내식'
      }
    ]
  }
];
