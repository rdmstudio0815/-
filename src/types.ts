/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: string; // Instagram Feed | Reels Thumbnail | Promotion Design | Cafe Marketing | Furniture Brand | Church Contents | Book Curation | etc
  clientName: string;
  beforeImgUrl: string; // 혹은 Before 디자인에 대한 설명/색상/컨텐츠
  afterImgUrl: string; // After 디자인 정보
  beforeDescription: string;
  afterDescription: string;
  designIntent: string;
  achievements: string[]; // 성과를 리스트 형태로
  isMockup?: boolean; // SVG/CSS mockup을 실시간으로 렌더링할지 여부
  accentColor?: string; // 브랜드 포인트 컬러
  imageUrl?: string; // 대표 썸네일로 쓸 이미지 (없으면 목업 자동생성)
  images?: string[]; // 추가 이미지 리스트 (여러 장 첨부 지원)
}

export interface ProjectExperience {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  scope: string[]; // 콘텐츠 기획, 디자인, 광고 관리 등
  description: string;
  stats?: { label: string; value: string }[]; // 프로젝트별 고유 성과 지표
}

export interface ReviewItem {
  id: string;
  rating: number;
  content: string;
  author: string;
  role: string;
  date?: string;
  source?: 'dm' | 'kakaotalk' | 'review'; // 리뷰 출처별 목업을 위해
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
