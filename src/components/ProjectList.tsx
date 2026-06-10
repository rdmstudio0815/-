/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectExperience } from '../types';
import { Calendar, Briefcase, ChevronRight, TrendingUp, Compass, Settings } from 'lucide-react';

interface ProjectListProps {
  projects: ProjectExperience[];
  homeConfig?: {
    projectsTitle: string;
    projectsDesc: string;
  };
}

export default function ProjectList({ projects, homeConfig }: ProjectListProps) {
  const projectsTitle = homeConfig?.projectsTitle ?? '단순 작업물이 아닌, 실제 계정 운영 경험을 증명합니다.';
  const projectsDesc = homeConfig?.projectsDesc ?? '디자이너의 실력은 일회성 시안이 아니라 장기적이고 유기적인 채널 운영 성과에서 나타납니다.\n기획부터 디자인, 업로드, 유입 전환까지 전 실무 영역을 포괄합니다.';

  return (
    <section id="projects" className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono font-bold text-[#E5A300] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-none">
            OPERATION EXPERIENCE
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-black mt-6 tracking-tight leading-tight whitespace-pre-line">
            {projectsTitle.includes('/') ? (
              projectsTitle.split('/').map((part, index) => (
                <span key={index} className="block">
                  {part.trim()}
                </span>
              ))
            ) : (
              projectsTitle
            )}
          </h2>
          <p className="text-gray-550 font-sans text-[15px] sm:text-[16px] mt-4 leading-relaxed whitespace-pre-line">
            {projectsDesc}
          </p>
        </div>

        {/* Project Experience Cards list */}
        <div className="space-y-10">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-gray-50 hover:bg-white border border-gray-150 hover:border-[#E5A300] rounded-none p-8 transition-all duration-300 shadow-sm hover:shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              id={`proj-card-${proj.id}`}
            >
              {/* Left Column: Title, Subtitle, and simplified inline stats summary */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#E5A300] bg-white border border-gray-200 px-3 py-1.5 rounded-none">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{proj.period}</span>
                </div>
                <h3 className="font-sans font-extrabold text-2xl text-black tracking-tight leading-snug">
                  {proj.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium font-sans">
                  {proj.subtitle}
                </p>

                {/* Simplified inline stats */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider mb-2">핵심 성과 요약</div>
                  <div className="flex flex-wrap gap-2">
                    {proj.stats?.map((stat, stIdx) => (
                      <div key={stIdx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50/70 border border-amber-100 text-[#E5A300] font-sans text-xs">
                        <span className="font-medium text-gray-600">{stat.label}</span>
                        <span className="font-extrabold font-mono text-black">{stat.value}</span>
                        <span className="text-[9px] text-emerald-600 font-bold">▲</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subheading tag */}
                <div className="pt-2">
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">Client Type / Role</div>
                  <div className="text-sm font-bold text-gray-800 mt-1 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#E5A300]" />
                    <span>채널 총괄 리더 & 마케팅 파트너</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Core Task Scope (실무 운영 내역) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span>CORE TASKS SCOPE (실무 수행 범위)</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {proj.scope.map((task, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-bold font-mono bg-white text-gray-700 border border-gray-200 px-3.5 py-1.5 rounded-none flex items-center gap-2 shadow-sm uppercase tracking-tight hover:border-[#E5A300] hover:text-[#E5A300] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-none bg-[#E5A300]"></span>
                      {task}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <p className="text-gray-600 text-[13.5px] leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
