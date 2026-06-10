/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MousePointerClick, BookmarkCheck, Palette, Compass, ShieldCheck } from 'lucide-react';

interface WhyChooseMeProps {
  homeConfig?: {
    whyMeTitle: string;
    whyMeDesc: string;
  };
}

export default function WhyChooseMe({ homeConfig }: WhyChooseMeProps) {
  const whyMeTitle = homeConfig?.whyMeTitle ?? '단순히 "예쁘게 디자인하는 것"은 우리의 비즈니스 목표가 아닙니다.';
  const whyMeDesc = homeConfig?.whyMeDesc ?? 'SNS 콘텐츠는 예술 작품이 아니라 매출과 반응을 만들어내는 마케팅 도구입니다. 성과 중심의 비즈니스 포트폴리오를 설계합니다.';

  const reasons = [
    {
      title: '클릭되는 썸네일',
      description: '단순 장식이 아닙니다. 빠른 스크롤 속에서 손끝을 멈추게 하는 인간 행동 심리 및 시선 고정 구조 기반의 확실한 비주얼 안전구역과 초정밀 헤드 카피 위치 설계를 준수합니다.',
      benefit: '릴스 / 유튜브 숏츠 클릭률 및 알고리즘 유입률 증대 보장',
      icon: MousePointerClick,
      color: 'bg-white border-gray-200 text-[#E5A300]',
    },
    {
      title: '저장되는 카드뉴스',
      description: '유저가 자발적으로 북마크하고 DM으로 공유하도록 유도하는 지식 구조화 기술을 사용합니다. 스와이프를 이끄는 티징 표지와, 저장 후 언제든 다시 보고 싶은 핵심 가치를 정합합니다.',
      benefit: '가장 높은 지표인 SNS 저장 및 리그램(리로드) 횟수 폭진',
      icon: BookmarkCheck,
      color: 'bg-white border-gray-200 text-[#E5A300]',
    },
    {
      title: '브랜드 톤앤매너 유지',
      description: '업종의 가치를 고양하는 고유의 브랜드 컬러휠, 전용 타이포 가이드, 시그니처 프레임을 구축합니다. 피드 그리드를 방문한 유저가 1초 만에 프리미엄 브랜드의 신뢰를 인식하게 만듭니다.',
      benefit: '저가 경쟁 탈피, 프리미엄 계약 및 신뢰성 높은 단주 계약 기동',
      icon: Palette,
      color: 'bg-white border-gray-200 text-[#E5A300]',
    },
    {
      title: 'SNS 운영을 고려한 콘텐츠 제작',
      description: '단순 드로잉 디자이너가 아닌 마케팅 기획자입니다. 채널의 정체성, 메인 프로필 워딩, 타겟 정밀 광고 세팅, 해시태그 배치 및 릴스 제작까지 토탈 세그먼트를 완전히 파악하여 대응합니다.',
      benefit: '디렉션 최소화! 기획부터 업로드까지 알아서 굴러가는 자동 채널',
      icon: Compass,
      color: 'bg-white border-gray-200 text-[#E5A300]',
    },
  ];

  return (
    <section id="why-me" className="py-24 bg-white border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-[#E5A300] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-none">
            THE VALUE PROPOSITION
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-black mt-6 tracking-tight leading-tight whitespace-pre-line">
            {whyMeTitle.includes('/') ? (
              whyMeTitle.split('/').map((part, index) => (
                <span key={index} className="block">
                  {part.trim()}
                </span>
              ))
            ) : (
              whyMeTitle
            )}
          </h2>
          <p className="text-gray-550 font-sans text-[15px] sm:text-[16px] mt-4 leading-relaxed whitespace-pre-line">
            {whyMeDesc}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {reasons.map((reason, idx) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={reason.title}
                className="group relative bg-gray-50 hover:bg-white border border-gray-150 hover:border-[#E5A300] hover:shadow-xl transition-all duration-300 rounded-none p-8 flex flex-col justify-between"
                id={`why-card-${idx}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-none flex items-center justify-center border ${reason.color} mb-6 transition-transform group-hover:scale-105 duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-black group-hover:text-[#E5A300] transition-colors tracking-tight mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-655 text-[14px] leading-relaxed mb-6 font-sans">
                    {reason.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 flex items-center gap-2 text-xs font-bold text-gray-700 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{reason.benefit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
