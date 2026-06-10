/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FaqItem } from '../types';
import { HelpCircle, ChevronRight, ChevronDown } from 'lucide-react';

interface FAQProps {
  faqs: FaqItem[];
  homeConfig?: {
    faqTitle: string;
    faqDesc: string;
  };
}

export default function FAQ({ faqs, homeConfig }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqTitle = homeConfig?.faqTitle ?? '자주 묻는 질문';
  const faqDesc = homeConfig?.faqDesc ?? '디자인 프로세스 및 원본 전달, 대행 범위 등 가장 자주 들어오는 질문들을 투명하게 정리했습니다.\n기타 개별적 특별 협의 사항도 언제든지 조율이 가능합니다.';

  return (
    <section id="faq" className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-[#E5A300] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-none">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-black mt-6 tracking-tight whitespace-pre-line">
            {faqTitle}
          </h2>
          <p className="text-gray-550 font-sans text-[15px] sm:text-[16px] mt-4 leading-relaxed whitespace-pre-line">
            {faqDesc}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-none transition-all duration-300 ${
                  isOpen
                    ? 'bg-gray-50 border-[#E5A300] shadow-lg'
                    : 'bg-white border-gray-200 hover:border-[#E5A300]'
                }`}
                id={`faq-item-${idx}`}
              >
                {/* Accordion Trigger Header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between font-sans text-left transition-colors select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[#E5A300] font-semibold text-lg mt-0.5 shrink-0 select-none">Q.</span>
                    <span className="font-bold text-black text-sm sm:text-base tracking-tight font-sans">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center border transition-all shrink-0 ${isOpen ? 'bg-[#E5A300] border-[#E5A300] text-neutral-950 rotate-180' : 'bg-gray-50 border-gray-200 text-[#E5A300]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 border-t border-gray-150' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-gray-750 text-[13.5px] sm:text-[14.5px] leading-relaxed font-sans bg-gray-50/50">
                    <p className="font-sans">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
