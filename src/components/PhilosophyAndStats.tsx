/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote, Sparkles, Target, Star, Eye } from 'lucide-react';

export default function PhilosophyAndStats({ homeConfig }: { homeConfig?: any }) {
  const badge = homeConfig?.philBadge ?? 'My Design Philosophy';
  const title = homeConfig?.philTitle ?? '예쁜 디자인보다, / 브랜드를 기억하게 만드는 디자인을 추구합니다.';
  const desc1 = homeConfig?.philDesc1 ?? '단순히 화려한 효과와 유행하는 요소만 얹은 시안은 시간이 지나면 공허하게 잊혀질 뿐입니다. 브랜드가 빛을 발하기 위해선, 그 채널이 가진 고유의 스토리와 목적성이 단 한 장의 콘텐츠에도 직관적으로 담겨야 합니다.';
  const desc2 = homeConfig?.philDesc2 ?? '콘텐츠 하나에도 잠재 고객의 심리를 자극하고 다음 행동을 부르는 정성스러운 기획과 브랜드만의 고유 분위기를 담아 설계합니다. 이것이 둥근달스튜디오가 수많은 대표님들께 신뢰와 만족을 받는 고유의 철학이자 가치입니다.';
  const role = homeConfig?.philRole ?? '마케팅 전문 SNS 디자이너';
  const creator = homeConfig?.philCreator ?? '둥근달스튜디오 디렉터';

  const stats = [
    {
      num: homeConfig?.stat1Num ?? '7+',
      label: homeConfig?.stat1Label ?? '운영 채널',
      sub: homeConfig?.stat1Sub ?? '종합 채널 전략 운영 및 디렉팅',
    },
    {
      num: homeConfig?.stat2Num ?? '500+',
      label: homeConfig?.stat2Label ?? '콘텐츠 제작',
      sub: homeConfig?.stat2Sub ?? '카드뉴스, 피드 배너, 상세 광고 시안',
    },
    {
      num: homeConfig?.stat3Num ?? '200+',
      label: homeConfig?.stat3Label ?? '릴스 제작 및 썸네일',
      sub: homeConfig?.stat3Sub ?? '숏폼 영상 기획, 컷 편집 및 유입 설계',
    },
    {
      num: homeConfig?.stat4Num ?? '420%',
      label: homeConfig?.stat4Label ?? '최고 ROAS',
      sub: homeConfig?.stat4Sub ?? '메타 및 타겟 최적화 광고 효율 기록',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E5A300]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Design Philosophy card */}
        <div className="lg:col-span-6 flex flex-col items-start text-left relative">
          <Quote className="w-12 h-12 text-gray-100 absolute -top-6 -left-4 -z-10" />

          <span className="text-[10px] font-mono font-bold text-[#E5A300] tracking-widest uppercase mb-4 flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-none">
            <Sparkles className="w-3 text-[#E5A300]" />
            {badge}
          </span>

          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-black tracking-tight leading-snug mb-6 whitespace-pre-line">
            {title.includes('/') ? (
              title.split('/').map((part, index) => (
                index === 1 ? (
                  <span key={index} className="block text-[#E5A300]">
                    {part.trim()}
                  </span>
                ) : (
                  <span key={index} className="block">
                    {part.trim()}
                  </span>
                )
              ))
            ) : (
              title
            )}
          </h2>

          <div className="space-y-4 text-gray-600 font-sans text-[15px] sm:text-[16px] leading-relaxed whitespace-pre-line">
            {desc1 && <p>{desc1}</p>}
            {desc2 && <p>{desc2}</p>}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-[#E5A300] flex items-center justify-center text-white">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-black tracking-tight">{role}</p>
              <p className="text-[10px] text-gray-500 font-mono uppercase">{creator}</p>
            </div>
          </div>
        </div>

        {/* Right: Stats Grid */}
        <div className="lg:col-span-6">
          <div className="max-w-lg mx-auto lg:mr-0 bg-gray-50 border border-gray-150 rounded-none p-8 shadow-sm">
            <div className="text-[10px] font-mono font-bold text-gray-550 uppercase tracking-widest mb-6 border-b border-gray-200 pb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#E5A300]" />
              <span>EXPERIENCE IN NUMBERS (숫자로 보는 신뢰)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="bg-white border border-gray-200 rounded-none p-5 hover:border-[#E5A300] hover:shadow-lg transition-all duration-300"
                  id={`stat-box-${idx}`}
                >
                  <p className="font-mono text-3xl sm:text-4xl font-extrabold text-[#E5A300] leading-none mb-2">
                    {stat.num}
                  </p>
                  <h4 className="font-sans font-bold text-[14px] text-black tracking-tight mb-1">
                    {stat.label}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-550 leading-snug font-sans">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 font-mono uppercase tracking-wider">
              <span>● 누적 실제 계정 운영 지표 기준</span>
              <span className="flex items-center gap-1 hover:text-[#E5A300] transition-colors">
                <Eye className="w-3.5 h-3.5" />
                성공사례 인터랙티브 전면 배포 중
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
