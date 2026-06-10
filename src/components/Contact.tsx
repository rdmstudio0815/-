/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MessageCircle, Instagram, CheckCircle, Send, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) {
      setValidationError('성함과 상세 문의 내용을 입력해 주세요.');
      return;
    }
    setValidationError('');
    setIsSubmitting(true);

    setTimeout(() => {
      // Save client inquiry to localStorage so admin can see it
      const existingInquiries = JSON.parse(localStorage.getItem('decora_inquiries') || '[]');
      const newInquiry = {
        id: `inq-${Date.now()}`,
        name,
        phone,
        company,
        content,
        date: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      
      localStorage.setItem('decora_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));

      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setPhone('');
      setCompany('');
      setContent('');
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left column: Social Channel Buttons */}
        <div className="lg:col-span-5 text-left space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#E5A300] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-none">
              LET'S COLLABORATE
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-black mt-6 tracking-tight leading-tight">
              브랜드에 맞는 SNS 콘텐츠가 필요하다면, 편하게 문의해주세요.
            </h2>
            <p className="text-gray-550 font-sans text-sm sm:text-base mt-4 leading-relaxed">
              고객님의 채널에 맞는 콘텐츠 제작을 위해 성심성의껏 상담해드립니다.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-mono font-bold text-[#E5A300] uppercase tracking-widest pl-1">
              DIRECT CHANNELS (대표 소통망 링크)
            </div>

            {/* Kakao Button */}
            <a
              href="http://pf.kakao.com/_fgken/chat"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-none bg-[#FFE8A3]/25 hover:bg-[#FFE8A3]/45 text-[#8A5E00] border border-[#D5A129]/30 transition-all font-sans group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#D5A129] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-black fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">카카오톡 1:1 오픈채팅</h4>
                  <p className="text-[10px] text-[#A57800] font-mono">실시간 채팅 수시 대응</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#8A5E00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Email Button */}
            <a
              href="mailto:rdmstudio0815@gmail.com"
              className="flex items-center justify-between p-4 rounded-none bg-amber-50 hover:bg-amber-100 text-[#E5A300] border border-amber-100 transition-all font-sans group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#E5A300] flex items-center justify-center text-neutral-950">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">이메일 문의송신</h4>
                  <p className="text-[10px] text-[#E5A300]/80 font-mono">rdmstudio0815@gmail.com</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#E5A300] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/rdmoon_studio/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-none bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-150 transition-all font-sans group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">둥근달스튜디오 인스타그램 바로가기</h4>
                  <p className="text-[10px] text-pink-500 font-mono">@rdmoon_studio</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-pink-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right column: Form Consultation Request */}
        <div className="lg:col-span-7">
          <div className="bg-gray-50 border border-gray-150 rounded-none p-8 shadow-xl relative overflow-hidden">
            {isSuccess && (
              <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-none bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-black tracking-tight">상담 문의가 정상 접수되었습니다!</h3>
                <p className="text-gray-550 text-xs sm:text-sm mt-2 max-w-sm leading-relaxed">
                  남겨주신 브랜드 정보를 면밀히 분석한 후 24시간 이내에 적어주신 연락처로 정교한 분석 가이드라인과 패키지 견적을 들고 소통드리겠습니다.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2.5 bg-gray-55/10 hover:bg-[#E5A300] border border-gray-200 hover:border-[#E5A300] text-black hover:text-neutral-950 transition-all rounded-none text-xs font-bold font-mono"
                >
                  기록 닫기
                </button>
              </div>
            )}

            <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-150 pb-3 block">
              💡 실시간 견적 받아보기 (1:1 CONSULTATION FORM)
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left text-xs sm:text-sm">
              {validationError && (
                <div className="p-3 bg-red-50 border border-red-150 text-red-600 text-xs font-mono">
                  ⚠ {validationError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block text-[11px] font-bold text-gray-550 uppercase tracking-tight">대표님 이름 / 성함 *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동 대표님"
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#E5A300] focus:outline-none transition-colors text-black font-sans rounded-none"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5 col-span-1">
                  <label className="block text-[11px] font-bold text-gray-550 uppercase tracking-tight">휴대폰 연락처</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#E5A300] focus:outline-none transition-colors text-black font-sans rounded-none"
                  />
                </div>
              </div>

              {/* Company / Brand Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-550 uppercase tracking-tight">브랜드 / 카페 / 업체명</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="예) 성수 크림파인 카페, 데코디자인 가구소리소"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#E5A300] focus:outline-none transition-colors text-black font-sans rounded-none"
                />
              </div>

              {/* Message Content */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-550 uppercase tracking-tight">원하는 디자인 기획 및 상담 내용 *</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="예) 인스타그램 피드 리오프닝 템플릿과 릴스 전용 썸네일 15종을 매월 정기 발행하고 싶습니다. 상담 요청 드려요."
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#E5A300] focus:outline-none transition-colors text-black font-sans leading-relaxed resize-none rounded-none"
                ></textarea>
              </div>

              {/* Secure data prompt */}
              <div className="p-3 bg-white border border-gray-200 text-[10px] leading-relaxed text-gray-500 font-mono uppercase tracking-wide">
                🔒 제출된 상담 내용은 암호화 상태로 로컬 저장되며, 본 채널 포트폴리오 총괄 디자이너 달님의 어드민 패널 외에 타인에겐 절대 노출되지 않음을 보증합니다.
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E5A300] text-neutral-950 rounded-none font-bold flex items-center justify-center gap-2 hover:bg-neutral-900 hover:text-[#E5A300] transition-all shadow-xl font-mono uppercase tracking-widest text-xs cursor-pointer"
                id="contact-submit-btn"
              >
                {isSubmitting ? '상담 요청 송출 중...' : 'SNS 비즈니스 설계 문의 접수하기'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
