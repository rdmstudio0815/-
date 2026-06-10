/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, ProjectExperience, ReviewItem, FaqItem } from '../types';

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: '자이언트가구 복원소 SNS 리디자인 및 브랜딩',
    category: 'Furniture Brand',
    clientName: '자이언트 가구 리폼 전문소',
    beforeImgUrl: 'f1',
    afterImgUrl: 'f2',
    beforeDescription: '포커싱 없는 날것 그대로의 가구 수리 전 사진을 평범하게 나열. 브랜드 가치나 전문성이 드러나지 않아 저단가 의뢰만 들어오는 상태였습니다.',
    afterDescription: '중후하고 따뜻한 우드 브라운과 모던 베이지 톤앤매너 확립. "낡은 도큐먼트를 감성적 갤러리로"라는 모티브 아래 피드 카드형 Before & After 실감형 레이아웃 구축.',
    designIntent: '제품의 가치와 전문 장인의 수작업 프로세스를 시각적으로 강조했습니다. 명확한 가독성의 센리프 타이포그래피를 적용하여 신뢰와 고급스러움을 배가시켰습니다.',
    achievements: [
      '피드 분위기 리뉴얼 후 인스타그램 공식 채널 일치감 지수 극대화',
      '기획형 릴스 썸네일 적용 후 단일 릴스 최고 조회수 13.5만회 돌파',
      '리뉴얼 30일 이내 프로필을 통한 다이렉트 DM 문의율 240% 이상 폭발적 증가',
      '100만원 이상의 프리미엄 복구 서비스 계약 전환율 1.8배 상승'
    ],
    accentColor: '#8B5A2B',
    isMockup: false,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'port-2',
    title: '성수 감성 디저트 카페 "Creampine" 매거진형 브랜딩',
    category: 'Cafe Marketing',
    clientName: 'Creampine 성수지점',
    beforeImgUrl: 'c1',
    afterImgUrl: 'c2',
    beforeDescription: '다소 어두운 실내 필터와 통일되지 않은 피드 구성, 그리고 메뉴명 위주의 상투적인 플레이스홀더 텍스트로 트렌디한 성수동 카페 경쟁에서 매력 어필 부족.',
    afterDescription: '크림 옐로우와 슬레이트 네이비의 비비드하면서도 따뜻한 배색 도입. 매거진의 한 페이지처럼 스토리가 흐르는 3열 퍼즐 피드를 설계하여 비주얼 정복.',
    designIntent: '카페 신메뉴 론칭 메시지를 타겟팅하여 인스타그램에서 누르고 싶게 만드는 고급 크림 질감의 프레임을 세련된 디스플레이 폰트와 매칭했습니다.',
    achievements: [
      '인스타그램 비주얼 리뉴얼 후 네이버 플레이스 스마트콜 클릭수 42% 증가',
      '신메뉴 "크림파인 라떼" 태그 스토리가 매주 150건 이상 생성되는 바이럴 달성',
      '브랜딩 기반의 커스텀 포스터와 컵홀더 굿즈 출시 3일 만에 전량 완판'
    ],
    accentColor: '#EAB308',
    isMockup: false,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'port-3',
    title: '마케팅 교육 플랫폼 "그로우업" 지식형 스와이프 카드뉴스',
    category: 'Instagram Feed',
    clientName: '그로우업 에듀',
    beforeImgUrl: 'e1',
    afterImgUrl: 'e2',
    beforeDescription: '빽빽한 설명 중심의 줄글, 구식 파워포인트 스타일의 템플릿 사용으로 유저 이탈률이 매우 높았으며 북마크(저장) 전환이 전무했습니다.',
    afterDescription: '이탈률을 즉각 방지하는 3초 룰 호기심 헤드라인 배치. 딥 바이올렛과 피치 브라이트 그린 색의 트렌디 색상 매칭과 가독성 최적화 세리프 그리드 시스템 도입.',
    designIntent: '지식을 단순히 나열하는 게 아니라, "저장해서 퇴근할 때 몰래 보는 실무 템플릿"이라는 심리적 목적성을 유도한 자이언트 레이아웃 설계입니다.',
    achievements: [
      '게시물 1건당 평균 "저장하기" 수치 2,800회 달성 (바이럴 지표 최고치 경신)',
      '콘텐츠 자발적 공유 효과로 광고 집행 없이 유기적 팔로워 3,400명 급성장',
      '카드뉴스 최하단 이메일 뉴스레터 신청 링크 클릭률(CTR) 15.6% 기록'
    ],
    accentColor: '#4F46E5',
    isMockup: false,
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'port-4',
    title: '비즈니스 지식 유튜버 "머니체인져" 숏폼 썸네일 디자인',
    category: 'Reels Thumbnail',
    clientName: 'Money Changer 채널',
    beforeImgUrl: 'm1',
    afterImgUrl: 'm2',
    beforeDescription: '화면 일부가 잘리거나 정보가 전혀 와닿지 않는 유튜브용 중복 썸네일 사용으로, 모바일 환경의 빠른 알고리즘 스크롤러들을 완전히 놓치는 중이었습니다.',
    afterDescription: '휴대폰 가독 비율 9:16 최적화 및 인스타그램 프로필 정방형(1:1) 영역 모두 완벽하게 보장하는 안전지대 하이브리드 가이드 준수. 볼드 타이포 중심 구성.',
    designIntent: '다크 테마 위에 압도적인 옐로우 악센트와 신비감 있는 고화질 일러스트의 조화로, 피드를 쓱 내리던 중에도 호기심에 손가락을 멈추게 유인했습니다.',
    achievements: [
      '릴스 전체 평균 조회수 이전 시즌 대비 200% 이상 증대',
      '출시된 핵심 자본주의 팩트 릴스 최고 조회수 89만회 기록 기여',
      '채널 리디자인 이후 기업 광고 협찬 및 강연 의뢰 3배 급상승'
    ],
    accentColor: '#3B82F6',
    isMockup: false,
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'port-5',
    title: '친환경 세제 패키지 "프레쉬워시" 6종 메가 기획전 광고',
    category: 'Promotion Design',
    clientName: '(주)에코라이프랩',
    beforeImgUrl: 'a1',
    afterImgUrl: 'a2',
    beforeDescription: '홈쇼핑 카탈로그처럼 빼곡한 장점 글자들로 인해 모바일 광고 화면에서 핵심 키워드가 누락되고 난잡해 가독성이 현저히 떨어지는 흐름이었습니다.',
    afterDescription: '제품 사진을 중심으로 미니멀 아웃라인을 생성, 전후 비주얼 대비 효과 활용. 오트 화이트와 딥 에코 포레스트 그린 매치로 자연과 과학성 함축.',
    designIntent: '잠재 소비자의 시선 동선을 "후킹 질문 -> 직관적 전후 비교 -> 압도적 혜택 버튼" 순으로 자연스럽게 안내하도록 아이스모닉 구조로 정교화했습니다.',
    achievements: [
      '광고 크리에이티브 교체 후 자사몰 구매 전환 비용(CPA) 기존 대비 35% 감축',
      '테스트 광고 소재 매출 성과 지표인 ROAS 420% 신기록 달성',
      '신규 런칭 기간 자사몰 회원가입 및 첫 구매 고속 전환수 200% 돌파'
    ],
    accentColor: '#059669',
    isMockup: false,
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'port-6',
    title: '도서 추천 전용 매거진 "어반리더스" 북 큐레이션 가이드',
    category: 'Book Curation',
    clientName: '어반 컬쳐 네트워크',
    beforeImgUrl: 'b1',
    afterImgUrl: 'b2',
    beforeDescription: '책 표지 사진에 기본 평서체 텍스트만 얹혀 독자들의 예술적 호기심을 끌지 못했고, 일반 광고성 계정처럼 전락하고 있는 상태였습니다.',
    afterDescription: '책의 에센셜 한 문장과 분위기를 차분하게 묶어주는 미니멀 모노 오가닉 톤으로 레이아웃 전면 리디자인. 북아트 감성을 연출하는 들여쓰기 타이포 그래픽 적용.',
    designIntent: '도서가 품고 있는 사색적이고 문학적인 매력을 담기 위해 따뜻한 웜그레이와 크림 무드, 클래식한 세리프 활자 간격을 유려하게 배치했습니다.',
    achievements: [
      '독자들의 자발적인 리스토리 및 리그램 스크랩 누적 수 5,000건 초과 기록',
      '단 일주일 만에 도서 큐레이터 뉴스레터 신청 구독자 수 18.2% 증액',
      '대형 출판사들로부터 월정기 프로모션 협업 의뢰가 선제적으로 12건 성사'
    ],
    accentColor: '#6B7280',
    isMockup: false,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'port-7',
    title: '빛과소금 청년공동체 "빌드업 라이프 쇼츠" 썸네일 패키지',
    category: 'Church Contents',
    clientName: '빛과소금 프렌즈 청년회',
    beforeImgUrl: 'ch1',
    afterImgUrl: 'ch2',
    beforeDescription: '저화질의 대형 예배 영상 스크린샷 and 투박하고 단조로운 명조체 텍스트를 사용하여 청년들의 관심과 참여를 모으기에 시각적 장벽이 높았습니다.',
    afterDescription: '선명한 형광 민트와 라임, 미드나잇 블랙 투톤의 세련된 팝 비주얼 매치. 50초 컷 청년 맞춤 자막 가이드라인 및 고품격 마스코트 아이콘 적극 기용.',
    designIntent: '엄숙하기만 한 이미지에서 탈피하여 청춘의 활력과 역동성을 느낄 수 있도록 하이퍼 트렌디 컬러 악센트와 볼드한 슬랩 세리프 폰트를 정방 매치했습니다.',
    achievements: [
      '청년부 유튜브 쇼츠 및 릴스 누적 시청 조회수 40만회 고속 돌파',
      '매년 오프라인 청년캠프 사전 조기 모집 등록률이 역사상 최초로 100% 매진 기록',
      '모던한 비주얼 템플릿의 자발적 유포로 타 단체 청년층들의 롤모델 계정으로 등극'
    ],
    accentColor: '#10B981',
    isMockup: false,
    imageUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_PROJECT_EXPERIENCES: ProjectExperience[] = [
  {
    id: 'proj-1',
    title: '가구수리 복원 전문 브랜드 SNS 토탈 운영 대행',
    subtitle: '기획부터 고객 유치까지 완벽한 마케팅 깔때기 설계',
    period: '2024.11 - 2025.04 (6개월)',
    scope: ['콘텐츠 전 영역 기획', '비주얼 인스타그램 테마 디자인', '타겟 맞춤 메가 메타 광고 설정 및 관리', '네이버 공식 블로그 연계 기획', '실제 작업 릴스 영상 제작'],
    description: '단순 보정 작업이 아닌 "럭셔리 가구 가치의 재생"이라는 명확한 브랜딩 메시지를 통해 고유의 잠재 고객에게 접근했습니다. 세련된 비주얼 템플릿과 실제 기술 공정 릴스로 타겟 도달을 도왔습니다.',
    stats: [
      { label: '전체 채널 노출 수', value: '250만+' },
      { label: '리브랜딩 후 전환율', value: '+320%' },
      { label: '신규 고가 의뢰액', value: '5.2천만원+' }
    ]
  },
  {
    id: 'proj-2',
    title: '동네 독립서점 겸 도서 큐레이션 계정 연간 종합 빌드업',
    subtitle: '스토리가 녹아나서 매니아를 모으는 문학 브랜딩 소통망',
    period: '2025.05 - 현재 진행 중',
    scope: ['북 매거진 콘텐츠 컨셉 기획', '미니멀 감성 카드뉴스 및 스토리 디자인', '정기 업로드 일정 최적화 자동화', '서점 브랜드 인지도 구축 및 오프라인 모임 연계'],
    description: '책의 명문장을 단순 인용하는 것에서 벗어나 인포그래픽 카드와 감성 필터를 입혀 문학 마니아층의 팬덤 형성을 도왔습니다. 매월 고정 콜라보 제안을 타겟했습니다.',
    stats: [
      { label: '정기 구독자 증가수', value: '1.2만명' },
      { label: '게시물 누적 저장 수', value: '38,000+' },
      { label: '오프라인 참여율', value: '98% 완료' }
    ]
  },
  {
    id: 'proj-3',
    title: '빛과소금 청년 중심 미디어 채널 숏폼 프로젝트',
    subtitle: '젊은 세대의 시선을 사로잡는 모던 크리스천 라이프스타일',
    period: '2025.01 - 2025.03 (3개월)',
    scope: ['숏츠/릴스 하이라이트 영상 편집', '고대비 후킹 썸네일 시리즈 디자인', '알고리즘 릴스 맞춤 음원 셀렉트 및 업로드 전략'],
    description: '기존의 투박함을 버리고 인스타 감성을 적극 주입하여 10~20대 청년들에게 친화적으로 소통하는 썸네일 정방형 가이드와 패키지 디자인 세트를 전격 제작 납품했습니다.',
    stats: [
      { label: '채널 누적 조회수', value: '42만회+' },
      { label: '팔로워 순증률', value: '185% 증가' },
      { label: '콘텐츠 공유 지수', value: '8.4천회' }
    ]
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    rating: 5,
    content: '피드 올릴 때마다 조회수가 정체되어 있었는데 디자이너님과 작업하고 분위기가 완전히 달라졌어요. 고객분들이 인스타 이뻐졌다고 매장에서 먼저 말씀하시더라구요!',
    author: '성수동 DD카페',
    role: '브랜드 대표님',
    date: '2025.05.14',
    source: 'dm'
  },
  {
    id: 'rev-2',
    rating: 5,
    content: '디자인만 하시는 게 아니라 기획이랑 카피까지 다듬어주시니까 의뢰하는 입장에서 손이 진짜 덜 갑니다. 브랜드가 확실히 고급스러워져서 매출 단가를 드디어 올렸습니다.',
    author: '자이언트 가구수리소',
    role: '대표 운영자',
    date: '2025.03.22',
    source: 'review'
  },
  {
    id: 'rev-3',
    rating: 5,
    content: '급하게 진행해야 하는 대형 기획전이었는데 마감 날짜 완벽하게 지켜주시고 피드백 반영도 엄청나게 빠릅니다. 감각 있고 비즈니스 이해력 갖춘 디자이너 드디어 만났네요.',
    author: '에코라이프랩',
    role: '마케팅 총괄 팀장',
    date: '2025.04.05',
    source: 'kakaotalk'
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '기본 수정은 몇 회까지 가능한가요?',
    answer: '기본적으로 모든 상품 유형에서 시안이 확정된 후 2회 무료 수정을 기본으로 보장해 드립니다. 텍스트 수정 및 간단한 레이아웃 보정이 포함되며, 최초의 기획 컨셉 범주 자체를 완전히 뒤엎는 수준의 전면 재작업은 추가 비용(협의)이 발생할 수 있으므로 시안 검수 시 신중한 분석을 함께 진행합니다.'
  },
  {
    id: 'faq-2',
    question: '작업 기간은 평균 얼마나 소요되나요?',
    answer: '피드 단장 카드뉴스나 광고 단독 배너 6종 세트의 경우 기획 자료 취합 완료 후 근무일 기준 3~5일 이내 완성 처리가 제공됩니다. 장기 SNS 토탈 채널 운영 대행 내지는 대규모 브랜드 톤앤매너 구축 패키지는 약 1.5주 내외의 전략 기간과 정밀 분석 시간을 소요합니다. 신속한 진행이 필요하신 경우 우선 상담 시 일정을 함께 조율합니다.'
  },
  {
    id: 'faq-3',
    question: '포토샵/일러스트 원본 파일(PSD, AI, Canva 등)도 제공되나요?',
    answer: '최종 완성된 고화질 이미지 결과물(PNG/JPG)은 계약의 기본 제공사항입니다. 수정이 가능한 원본 파일(고도로 정리된 PSD 또는 레이어 분할 AI 폴더, 또는 직접 편집 가능한 캔바 양식)은 제작 원가의 30%가 추가되며, 저작권 가이드라인 합의 하에 정성스레 패킹하여 온전한 권리와 함께 인도해 드립니다.'
  },
  {
    id: 'faq-5',
    question: '릴스나 숏츠 등 숏폼 영상 편집 및 썸네일도 올패스로 가능한가요?',
    answer: '물론입니다. 스마트폰으로 대충 직찍 촬영해주신 기본 수리 과정이나 매장 내부 영상 소스를 편집점에 맞춰 역동적으로 트랙 점프컷 편집하고 텍스트 하이라이트 자국, 저작권 없는 트렌디 BGM 및 가우시안 썸네일 타이포 가랜드를 원스톱으로 디자인하여 바로 업로드할 수 있는 패키지 형태로 제작해 드립니다.'
  }
];
