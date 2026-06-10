/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDownRight, Instagram, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onPortfolioView: () => void;
  onContactView: () => void;
  homeConfig?: any;
}

export default function Hero({ onPortfolioView, onContactView, homeConfig }: HeroProps) {
  const subTitle = homeConfig?.heroSub ?? '브랜드가 기억되는 SNS 콘텐츠를 디자인합니다.';
  const mainLine1 = homeConfig?.heroMainLine1 ?? '디자인과 마케팅을 함께 생각하는';
  const mainLine2 = homeConfig?.heroMainLine2 ?? '디자인 스튜디오';
  const highlight = homeConfig?.heroMainHighlight ?? '둥근달스튜디오입니다.';
  const tags = homeConfig?.heroTags ?? [
    '인스타그램 콘텐츠 디자인',
    '릴스 썸네일',
    '카드뉴스',
    '광고 디자인',
    'SNS 운영 디자인',
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-black border-b border-neutral-900">
      {/* Background radial subtle ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#E5A300]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
        {/* Accent Label */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-[#E5A300] text-[10px] font-mono tracking-widest uppercase mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Design & Marketing Synergy</span>
        </div>

        {/* Heading */}
        <h1 className="font-sans tracking-tight leading-none mb-8 text-center">
          <span className="block text-[#E5A300] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 font-mono">
            {subTitle}
          </span>
          <span className="block text-neutral-400 text-lg sm:text-xl md:text-2xl font-medium tracking-normal leading-relaxed mb-4 max-w-2xl mx-auto">
            {mainLine1} {mainLine2}
          </span>
          <span className="block text-white text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mt-2 text-[#E5A300]">
            {highlight}
          </span>
        </h1>

        {/* Tags (Horizontal sequence with minimal bullets) */}
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-4 mb-10 w-full max-w-xl text-xs sm:text-[13px] text-neutral-400 font-mono">
          {tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span className="font-medium text-neutral-200 hover:text-[#E5A300] transition-colors">
                {tag}
              </span>
              {i < tags.length - 1 && (
                <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full"></span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Buttons CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
             onClick={onPortfolioView}
             className="px-8 py-4 rounded-md bg-[#E5A300] hover:bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group shadow-lg cursor-pointer"
             id="hero-portfolio-btn"
          >
            대표 Portfolio 보기
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
             onClick={onContactView}
             className="px-8 py-4 rounded-md bg-transparent border border-white text-white font-bold text-xs uppercase tracking-wider hover:bg-[#E5A300] hover:text-neutral-950 hover:border-[#E5A300] flex items-center justify-center gap-2 transition-all cursor-pointer"
             id="hero-contact-btn"
          >
            1:1 빠른 문의하기
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12 text-neutral-400 text-xs font-mono border-t border-neutral-800 pt-6 w-full max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-[#E5A300] font-black text-xl">{homeConfig?.stat1Num ?? '7+'}</span>
            <span>{homeConfig?.stat1Label ?? '운영 채널'}</span>
          </div>
          <div className="w-px h-4 bg-neutral-800"></div>
          <div className="flex items-center gap-2">
            <span className="text-[#E5A300] font-black text-xl">{homeConfig?.stat2Num ?? '500+'}</span>
            <span>{homeConfig?.stat2Label ?? '콘텐츠 제작'}</span>
          </div>
          <div className="w-px h-4 bg-neutral-800"></div>
          <div className="flex items-center gap-2">
            <span className="text-[#E5A300] font-black text-xl">{homeConfig?.stat4Num ?? '420%'}</span>
            <span>{homeConfig?.stat4Label ?? '최고 ROAS'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
