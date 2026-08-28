export interface CompanyInfo {
  name: string;
  brandName: string;
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
  address: string;
  vietnamOffice: string;
  businessNumber: string;
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
  address: '강원도 원주시 / 베트남 다낭시 손짜구 현지 직영 라운지',
  vietnamOffice: 'Da Nang, Son Tra / Hanoi, Hoan Kiem Local Branch',
  businessNumber: '224-81-00000 (사업자등록 완료)',
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
