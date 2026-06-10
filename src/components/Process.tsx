/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquareText, Search, Compass, Paintbrush, ArrowUpRight, HelpCircle, PackageCheck } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '①',
      title: '상담 및 견적 조율',
      desc: '의뢰 목적, 업종 가치, 타겟 군, 타임라인 정보를 세밀하게 상담하여 적정한 가격 패키지 가이드를 제시합니다.',
      icon: MessageSquareText,
      color: 'bg-white border border-gray-200 text-[#E5A300] rounded-none',
    },
    {
      num: '②',
      title: '브랜드 가치 분석',
      desc: '동종 업계의 우수 인플루언서 및 경쟁사 피드를 철저히 크롤링 분석하여 독자적 틈새 차별점과 브랜딩 키워드를 정초합니다.',
      icon: Search,
      color: 'bg-white border border-gray-200 text-[#E5A300] rounded-none',
    },
    {
      num: '③',
      title: '디자인 방향 설정',
      desc: '무드보드, 적용 예정 서체 세트, 실시간 배색 팔레트 초안을 우선 제작하여 클라이언트와 전체적 톤앤매너 싱크를 맞춥니다.',
      icon: Compass,
      color: 'bg-white border border-gray-200 text-[#E5A300] rounded-none',
    },
    {
      num: '④',
      title: '정밀 시안 제작',
      desc: '수립된 가이드를 준수하여 실제 모바일 화면 뷰포트에 맞춘 하이퀄리티 SNS 카드뉴스 및 릴스 썸네일 본 시안을 제작 완료합니다.',
      icon: Paintbrush,
      color: 'bg-white border border-gray-200 text-[#E5A300] rounded-none',
    },
    {
      num: '⑤',
      title: '신속 정밀 수정',
      desc: '제공된 시안을 바탕으로 고안된 브랜드 피드백 2회를 면밀히 커밋하여 최종 완성도의 연마와 오타수정 단계를 수행합니다.',
      icon: ArrowUpRight,
      color: 'bg-white border border-gray-200 text-[#E5A300] rounded-none',
    },
    {
      num: '⑥',
      title: '최종 안전 납품',
      desc: '고해상도 다용도 확장자(PNG, JPG) 및 사전 협의된 편집 규격 원본 파일을 압축 패킹하여 약속된 구글 드라이브나 메일로 인도합니다.',
      icon: PackageCheck,
      color: 'bg-white border border-gray-200 text-[#E5A300] rounded-none',
    },
  ];

  return (
    <section id="process" className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-[#E5A300] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-none">
            WORK FLOW
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-black mt-6 tracking-tight leading-tight">
            체계적이고 투명한 <br className="hidden sm:block" />
            6단계 디자인 프로세스
          </h2>
          <p className="text-gray-550 font-sans text-[15px] sm:text-[16px] mt-4 leading-relaxed">
            클라이언트의 시간과 에너지를 철저히 지켜드리기 위해<br />
            모든 여정은 직관적이고 표준 프로세스에 입각하여 명증하게 진행됩니다.
          </p>
        </div>

        {/* Horizontal Timeline Connector (Desktop-only) */}
        <div className="relative mt-8">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-150 -translate-y-1/2 hidden xl:block z-0"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="bg-gray-50 border border-gray-150 hover:border-[#E5A300] hover:bg-white rounded-none p-6 shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                  id={`process-step-${idx}`}
                >
                  <div>
                    {/* Top Circle Line */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[9px] font-extrabold text-[#E5A300] bg-white border border-gray-200 px-2.5 py-1 rounded-none uppercase tracking-widest">
                        STEP {idx + 1}
                      </span>
                      <div className={`w-8 h-8 flex items-center justify-center ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-sans font-bold text-base text-black mb-2 leading-tight tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-550 text-xs leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                  {/* Step counter layout decoration in corner */}
                  <div className="mt-4 pt-4 border-t border-gray-150 flex justify-end">
                    <span className="font-mono text-xl font-extrabold text-gray-200 italic select-none">
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Guarantee Badge */}
        <div className="mt-12 max-w-xl mx-auto p-4 bg-amber-50/50 border border-amber-100 rounded-none flex items-center gap-3.5 shadow-xl text-left">
          <div className="w-10 h-10 rounded-none bg-white border border-amber-200 flex items-center justify-center text-[#E5A300] shrink-0">
            <HelpCircle className="w-5 h-5 animate-pulse" />
          </div>
          <p className="text-xs text-gray-600 font-medium font-sans">
            <strong className="text-black">프로세스 꿀팁:</strong> 상세 기획서나 참고하고 싶은 벤치마킹 레퍼런스 인스타그램 계정 링크를 상담 이전에 미리 준비해 주시면, 분석 속도가 약 2배 더 가속됩니다!
          </p>
        </div>
      </div>
    </section>
  );
}
