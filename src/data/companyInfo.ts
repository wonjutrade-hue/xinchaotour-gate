export interface CompanyInfo {
  name: string;
  brandName: string;
  representative: string;
  domain: string;
  slogan: string;
  subSlogan: string;
  intro: string;
  phone: string;
  phoneTel: string;
  email: string;
  kakaoId: string;
  kakaoLink: string;
  kakaoChannel: string;
  officeAddress: string;
  address?: string;
  vietnamOffice: string;
  businessNumber?: string;
  tourLicense: string;
  workingHours: string;
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const COMPANY_INFO: CompanyInfo = {
  name: '신짜오투어',
  brandName: 'XinChaoTour',
  representative: '김동완',
  domain: 'xinchaotour.com',
  slogan: '베트남의 아름다운 순간을 한국인의 편안함으로 여행하세요',
  subSlogan: '자유여행 · 풀빌라 · 골프여행 XinChaoTour와 함께하세요.',
  intro: '베트남 현지에서 한국 고객에게 편안하고 안전한 여행을 제공하는 베트남 전문 여행 플랫폼입니다.',
  phone: '010-5365-6019',
  phoneTel: 'tel:010-5365-6019',
  email: 'wonjutrade@hanmail.net',
  kakaoId: 'wonjutrade',
  kakaoLink: 'https://open.kakao.com/o/s7OOoshf',
  kakaoChannel: 'https://pf.kakao.com/_xincaotour',
  officeAddress: '394B Điện Biên Phủ, Phường Thanh Khê, Thành phố Đà Nẵng, Việt Nam',
  address: '394B Điện Biên Phủ, Phường Thanh Khê, Thành phố Đà Nẵng, Việt Nam',
  vietnamOffice: '394B Điện Biên Phủ, Phường Thanh Khê, Thành phố Đà Nẵng, Việt Nam (현지 사무실)',
  tourLicense: '관광사업등록 및 기획여행보증보험 1억원 가입',
  workingHours: '연중무휴 24시간 한국어 카카오톡 & 전화 긴급 지원',
  services: [
    {
      title: '자유여행',
      description: '하노이·하장·하롱베이·다낭·나트랑·푸꾸옥 등 엄선된 단독 맞춤 자유여행',
      icon: '🛫'
    },
    {
      title: '프리미엄 풀빌라',
      description: '미케비치 오션뷰, 프라이빗 단독 수영장, 버틀러 서비스가 포함된 럭셔리 독채 빌라',
      icon: '🏰'
    },
    {
      title: '명문 골프여행',
      description: 'BRG 다낭, 몽고메리, 바나힐스 등 1인1캐디 + 2인1카트 올포함 54~90홀 라운딩',
      icon: '⛳'
    },
    {
      title: '공항 VIP 픽업 & 샌딩',
      description: '공항 도착 즉시 대기 없는 단독 VIP 리무진 밴으로 편안한 이동',
      icon: '🚐'
    },
    {
      title: '단독 전용 차량 & 기사',
      description: '일정 내내 다른 팀과 섞이지 않는 우리 가족/일행만을 위한 쾌적한 최신형 차량',
      icon: '✨'
    },
    {
      title: '100% 한국어 전문 가이드',
      description: '현지 역사와 문화를 깊이 있고 친절하게 안내하는 검증된 전문 한국어 가이드',
      icon: '👨‍💼'
    },
    {
      title: '1:1 맞춤 여행 컨설팅',
      description: '항공권 연계, 숙소 변경, 현지 맛집/마사지 예약까지 맞춤 플래닝',
      icon: '💬'
    }
  ]
};

export interface PartnerCompanyInfo {
  nameKo: string;
  nameVn: string;
  nameEn: string;
  shortName: string;
  domain: string;
  websiteUrl: string;
  slogan: string;
  sloganVn: string;
  headquarters: string;
  headquartersVn: string;
  hanoiOffice: string;
  hanoiOfficeShort: string;
  hcmOffice: string;
  hcmOfficeShort: string;
  phone: string;
  hotline: string;
  email: string;
  bookingEmail: string;
  taxCode: string;
  license: string;
  mouTitle: string;
  mouDescription: string;
  establishedYear: number;
  partnershipHighlights: string[];
  services: string[];
}

export const PARTNER_COMPANY_INFO: PartnerCompanyInfo = {
  nameKo: '비트라코 투어 (VITRACO Tour & Transport)',
  nameVn: 'CÔNG TY TNHH LIÊN HỢP VẬN TẢI VÀ DU LỊCH VI.TRA.CO',
  nameEn: 'VITRACO Transport & Tourism Joint Venture Co., Ltd.',
  shortName: 'VITRACO TOUR',
  domain: 'vitracotour.com',
  websiteUrl: 'https://vitracotour.com/',
  slogan: 'Nâng Tầm Cao Mới (새로운 차원으로의 도약)',
  sloganVn: 'Nâng Tầm Cao Mới',
  headquarters: '394B Điện Biên Phủ, Phường Thanh Khê, Thành phố Đà Nẵng, Việt Nam',
  headquartersVn: '394B Điện Biên Phủ, Phường Thanh Khê, Thành phố Đà Nẵng, Việt Nam',
  hanoiOffice: 'Số 8/26/113 Đường Ngọc Thụy, P. Ngọc Thụy, Q. Long Biên, TP. Hà Nội (Hotline: 0914.020.726)',
  hanoiOfficeShort: '하노이 사무실: Số 8/26/113 Đường Ngọc Thụy, Q. Long Biên, TP. Hà Nội (0914.020.726)',
  hcmOffice: 'Số 183/14/17 Hoàng Hoa Thám, P. 6, Q. Bình Thạnh, TP. Hồ Chí Minh (Hotline: 0983.975.797)',
  hcmOfficeShort: '호치민 사무실: Số 183/14/17 Hoàng Hoa Thám, Q. Bình Thạnh, TP. Hồ Chí Minh (0983.975.797)',
  phone: '0236 3 738 738',
  hotline: '0909 119 119 / 0915 705 705',
  email: 'vitraco@vitraco.vip',
  bookingEmail: 'booking@vitracotour.com / info@vitracotour.com',
  taxCode: '0400452391',
  license: '베트남 국토교통부 국제운송 및 베트남 관광총국(VNAT) 국제여행업 공식 정식 인가',
  mouTitle: '신짜오투어 × VITRACO TOUR 공식 전략적 업무협약(MOU)',
  mouDescription: '다낭 본사의 베트남 대표 종합 운송·관광 그룹 VITRACO와의 공식 업무협약(MOU)을 통해 최신형 단독 VIP 리무진 차량 전용 배차, 다낭·호이안·후에·바나힐 현지 직영 투어망, 공인 한국어 가이드 및 24시간 안전 케어망을 독점 협력 운영합니다.',
  establishedYear: 2003,
  partnershipHighlights: [
    '베트남 중부 최대 16~45인승 최신형 VIP 리무진 단독 전용 차량 직영 배차',
    '다낭 본사 및 하노이·호치민 지사를 잇는 베트남 전역 인프라 제휴',
    '현지 정식 공인 한국어 전문 가이드 풀케어 및 차량 안전 보험 100% 가입',
    '24시간 현지 신속 대응팀 및 한국 고객 전담 VIP 라운지 연계'
  ],
  services: [
    'VIP DCar 리무진 & 단독 투어 차량 렌탈 (7/16/29/35/45인승)',
    '다낭·호이안·후에·바나힐 맞춤 데이투어 & 프라이빗 패키지',
    '바나힐, 빈원더스 등 주요 관광지 공식 티켓팅 및 VIP 패스트트랙',
    '골프장 VIP 송영 및 국제 행사 전용 의전 서비스'
  ]
};
