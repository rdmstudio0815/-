/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PortfolioItem } from '../types';
import { ChevronRight, ChevronLeft, ArrowRight, Eye, RefreshCw, Sparkles, Filter, Award, BookOpen, Trash2, Edit } from 'lucide-react';

interface PortfolioProps {
  items: PortfolioItem[];
  isAdminLoggedIn: boolean;
  onEditItem?: (item: PortfolioItem) => void;
  onDeleteItem?: (id: string) => void;
}

export default function Portfolio({ items, isAdminLoggedIn, onEditItem, onDeleteItem }: PortfolioProps) {
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after'); // 모달 내 before/after 탭용
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 다중 이미지 슬라이드 인덱스
  
  // Custom delete inline trigger state to avoid standard browser confirm overlay in cross-origin iframe
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null);

  const handleOpenModal = (item: PortfolioItem) => {
    setActiveModalItem(item);
    setViewMode('after');
    setCurrentSlideIndex(0);
  };

  return (
    <section id="portfolio" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#E5A300] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-md">
              Representative Case Studies
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-black mt-6 tracking-tight">
              대표 포트폴리오
            </h2>
            <p className="text-gray-550 font-sans text-[15px] sm:text-[16px] mt-2">
              디자인과 마케팅의 성과 흐름을 직접 비교하여 확인해보세요.
            </p>
          </div>

          {isAdminLoggedIn && (
            <div className="px-4 py-2 bg-amber-50 text-[#E5A300] rounded-md text-xs font-semibold border border-amber-100 flex items-center gap-1.5 font-mono uppercase tracking-wider animate-pulse shrink-0">
              <span>💡 CLICK A CARD BELOW TO MANAGE PORTFOLIO ITEMS</span>
            </div>
          )}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            return (
              <div
                key={item.id}
                className="group bg-gray-50 rounded-xl border border-gray-150 hover:border-[#E5A300] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                id={`port-card-${item.id}`}
              >
                {/* Visual Area (Mockup/Image render) */}
                <div 
                  onClick={() => {
                    handleOpenModal(item);
                  }}
                  className="relative aspect-square w-full cursor-pointer overflow-hidden flex items-center justify-center p-6 bg-white border-b border-gray-150 select-none"
                >
                  {/* Subtle Background Accent */}
                  <div className="absolute inset-0 opacity-5 blur-xl group-hover:opacity-15 transition-opacity" style={{ backgroundColor: item.accentColor || '#E5A300' }}></div>

                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* SVG / CSS interactive design sheet mockup inside grid if no thumbnail is uploaded */
                    <div className="w-4/5 aspect-square max-w-[200px] border border-gray-150 rounded-lg bg-white shadow-md p-4 flex flex-col justify-between relative transform group-hover:scale-105 duration-300 tracking-tight">
                      <span className="text-[7.5px] font-mono font-bold px-2 py-0.5 rounded-md inline-block text-white uppercase tracking-wider" style={{ backgroundColor: item.accentColor || '#E5A300' }}>
                        {item.category}
                      </span>
                      <div className="my-auto space-y-1.5 py-1 text-center">
                        <p className="text-[11px] font-extrabold text-black line-clamp-2 leading-snug">{item.clientName}</p>
                        <div className="h-0.5 w-6 bg-gray-150 mx-auto"></div>
                        <p className="text-[8px] text-gray-450 font-bold font-mono uppercase tracking-wider">Case analysis</p>
                      </div>
                      
                      <div className="flex items-end justify-between pt-1.5 border-t border-gray-150 text-[8px] text-gray-450 font-mono font-medium">
                        <span>BEFORE / AFTER</span>
                        <span className="font-extrabold text-[#E5A300] animate-pulse">CLICK ➜</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Eye Overlay */}
                  <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#E5A300] flex items-center justify-center shadow-lg text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="text-black text-xs font-bold tracking-widest uppercase font-mono">Before / After 비교 보기</span>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 flex-1 flex flex-col justify-between content-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {item.category && (
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#E5A300] border border-amber-100 bg-amber-50 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      )}
                      {item.clientName && (
                        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-550 font-bold">{item.clientName}</span>
                      )}
                    </div>
                    <h3 className="font-sans font-bold text-lg text-black group-hover:text-[#E5A300] transition-colors tracking-tight line-clamp-2 mb-3">
                      {item.category ? `[${item.category}] ` : ''}{item.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
                    <button
                      onClick={() => {
                        handleOpenModal(item);
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-black hover:text-[#E5A300] flex items-center gap-1 group/btn font-mono"
                    >
                      상세 성과 모델
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Admin Actions */}
                    {isAdminLoggedIn && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onEditItem) onEditItem(item);
                          }}
                          className="p-1.5 bg-yellow-50 border border-yellow-200 hover:bg-yellow-105 text-yellow-600 rounded-md transition-colors"
                          title="수정하기"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setItemToDelete(item);
                          }}
                          className="p-1.5 bg-red-50 border border-red-200 hover:bg-red-105 text-red-650 rounded-md transition-colors"
                          title="삭제하기"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL VIEW MODAL PANEL (Before → After → 디자인 의도 → 성과) */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop */}
          <div 
            onClick={() => setActiveModalItem(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 text-left border border-gray-250 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-gray-150 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  {activeModalItem.category && (
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#E5A300] border border-amber-100 bg-amber-50 px-2.5 py-0.5 rounded-md">
                      {activeModalItem.category}
                    </span>
                  )}
                  {activeModalItem.clientName && (
                    <span className="text-xs text-gray-400 font-mono tracking-wider uppercase font-bold">{activeModalItem.clientName}</span>
                  )}
                </div>
                <h3 className="font-sans font-extrabold text-xl md:text-2xl text-black mt-2 tracking-tight col-span-12">
                  {activeModalItem.category ? `[${activeModalItem.category}] ` : ''}{activeModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-10 h-10 rounded-md bg-gray-50 hover:bg-[#E5A300] hover:text-neutral-950 border border-gray-200 text-gray-550 flex items-center justify-center font-bold text-lg select-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
              {/* PART 1 & 2: Before vs After Interactive Panel */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-gray-550 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                    <RefreshCw className="w-4 h-4 text-[#E5A300]" />
                    Before & After 비전 분석
                  </h4>

                  {/* Toggle Selector tabs */}
                  <div className="inline-flex rounded-lg bg-gray-100 p-1 border border-gray-200">
                    <button
                      onClick={() => setViewMode('after')}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold tracking-tight transition-all ${
                        viewMode === 'after'
                          ? 'bg-[#E5A300] text-neutral-950 shadow-sm'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      🏆 After (리디자인)
                    </button>
                    <button
                      onClick={() => setViewMode('before')}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold tracking-tight transition-all ${
                        viewMode === 'before'
                          ? 'bg-orange-650 text-white shadow-sm'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      ⚡ Before (기존)
                    </button>
                  </div>
                </div>

                {/* Beautiful Mockup Stage Display */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  <div className="md:col-span-5 bg-gray-150/45 rounded-xl border border-gray-150 p-6 flex items-center justify-center overflow-hidden min-h-[340px] relative">
                    {viewMode === 'after' ? (
                      /* AFTER DISPLAY */
                      <div className="w-full text-center space-y-4 flex flex-col items-center justify-center">
                        {activeModalItem.images && activeModalItem.images.length > 0 ? (
                          <div className="space-y-4 w-full flex flex-col items-center">
                            {/* Slideshow Frame */}
                            <div className="relative w-full max-w-[280px] aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white shadow-md group">
                              <img 
                                src={activeModalItem.images[Math.min(currentSlideIndex, activeModalItem.images.length - 1)] || activeModalItem.imageUrl} 
                                alt={`After View ${currentSlideIndex + 1}`} 
                                className="w-full h-full object-cover transition-all" 
                                referrerPolicy="no-referrer"
                              />
                              
                              {/* Sliding Controls with Highly Visible Icons */}
                              {activeModalItem.images.length > 1 && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : activeModalItem.images!.length - 1))}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-neutral-900/85 hover:bg-[#E5A300] hover:text-neutral-950 text-white flex items-center justify-center select-none shadow-lg transition-all focus:outline-none cursor-pointer z-10"
                                    title="이전 이미지"
                                  >
                                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setCurrentSlideIndex(prev => (prev < activeModalItem.images!.length - 1 ? prev + 1 : 0))}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-neutral-900/85 hover:bg-[#E5A300] hover:text-neutral-950 text-white flex items-center justify-center select-none shadow-lg transition-all focus:outline-none cursor-pointer z-10"
                                    title="다음 이미지"
                                  >
                                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Pager & Thumbnails indicator */}
                            {activeModalItem.images.length > 1 && (
                              <div className="space-y-2 w-full">
                                <div className="text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase">
                                  IMAGE SLIDE {currentSlideIndex + 1} OF {activeModalItem.images.length}
                                </div>
                                <div className="flex flex-wrap justify-center gap-1.5 px-2">
                                  {activeModalItem.images.map((slideUrl, sIdx) => (
                                    <button
                                      key={sIdx}
                                      onClick={() => setCurrentSlideIndex(sIdx)}
                                      className={`w-10 h-10 border overflow-hidden transition-all ${
                                        currentSlideIndex === sIdx
                                          ? 'border-[#E5A300] scale-105 ring-1 ring-[#E5A300]'
                                          : 'border-gray-200 opacity-60 hover:opacity-100'
                                      }`}
                                    >
                                      <img src={slideUrl} alt="slide thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : activeModalItem.imageUrl ? (
                          <div className="relative max-w-[200px] aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white shadow-md">
                            <img 
                              src={activeModalItem.imageUrl} 
                              alt="After Thumbnail" 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          <div className="mx-auto w-32 h-32 rounded-lg border-4 text-white font-extrabold flex items-center justify-center p-3 shadow-lg transform rotate-1 animate-pulse" style={{ backgroundColor: activeModalItem.accentColor || '#E5A300', borderColor: activeModalItem.accentColor || '#E5A300' }}>
                            <span className="text-xs font-mono tracking-widest uppercase leading-tight">{activeModalItem.category} Renewal</span>
                          </div>
                        )}
                        <p className="text-[10px] font-mono font-bold text-[#E5A300] bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-md inline-block uppercase tracking-widest">
                          ✨ 톤앤매너 완벽 규격 정립
                        </p>
                      </div>
                    ) : (
                      /* BEFORE DISPLAY */
                      <div className="w-full text-center space-y-4 opacity-50">
                        <div className="mx-auto w-32 h-32 rounded-lg border-4 bg-gray-100 border-dashed border-gray-300 text-gray-455 font-bold flex items-center justify-center p-3">
                          <span className="text-xs font-sans tracking-tight">수정 전 피드</span>
                        </div>
                        <p className="text-[10px] font-mono font-bold text-orange-650 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-md inline-block uppercase tracking-widest">
                          ⚠️ 비주얼 혼선 유발
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side textual analysis */}
                  <div className="md:col-span-7 flex flex-col justify-between py-2">
                    {/* Before Card */}
                    <div className={`p-5 rounded-lg border transition-all ${viewMode === 'before' ? 'bg-orange-50/70 border-orange-200' : 'bg-gray-50/50 border-gray-150 opacity-40'}`}>
                      <h5 className="text-xs font-bold text-orange-650 tracking-wider uppercase font-mono flex items-center gap-1.5 mb-2">
                        <span>●</span> Before 주요 원인 및 기존 이미지
                      </h5>
                      <p className="text-[13px] text-gray-700 leading-relaxed font-sans">
                        {activeModalItem.beforeDescription}
                      </p>
                    </div>

                    <div className="h-4"></div>

                    {/* After Card */}
                    <div className={`p-5 rounded-lg border transition-all ${viewMode === 'after' ? 'bg-amber-50/50 border-amber-200' : 'bg-gray-50/50 border-gray-150 opacity-40'}`}>
                      <h5 className="text-xs font-bold text-[#E5A300] tracking-wider uppercase font-mono flex items-center gap-1.5 mb-2">
                        <span>●</span> After 마케터 관점 리디자인 패키지
                      </h5>
                      <p className="text-[13px] text-gray-700 leading-relaxed font-sans">
                        {activeModalItem.afterDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PART 3: 디자인 의도 */}
              <div className="pt-6 border-t border-gray-150">
                <h4 className="text-xs font-bold text-gray-550 flex items-center gap-1.5 mb-3.5 font-mono uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-[#E5A300]" />
                  디자인 의도 (Design Intent)
                </h4>
                <div className="bg-gray-50 border border-gray-150 rounded-lg p-6 text-gray-750 font-sans">
                  <p className="text-[13px] leading-relaxed">
                    {activeModalItem.designIntent}
                  </p>
                </div>
              </div>

              {/* PART 4: 성과 (Achievements) */}
              <div className="pt-6 border-t border-gray-150">
                <h4 className="text-xs font-bold text-gray-550 flex items-center gap-1.5 mb-4 font-mono uppercase tracking-wider">
                  <Award className="w-4 h-4 text-emerald-600" />
                  비즈니스 및 마케팅 성과 (Success Metrics)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeModalItem.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex items-start gap-3 hover:bg-emerald-100/50 transition-colors"
                    >
                      <span className="w-5 h-5 bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center rounded shrink-0 mt-0.5 font-mono">
                        {index + 1}
                      </span>
                      <p className="text-[13px] text-emerald-950 font-medium font-sans leading-tight">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-150 bg-gray-50 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-400 font-mono">decora marketing design case studio</span>
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-6 py-2.5 bg-white hover:bg-black border border-gray-200 hover:text-white hover:border-black text-black rounded-md text-xs font-bold font-mono transition-all"
              >
                비교 모달 닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PORTFOLIO INLINE DELETE CONFIRM DIALOG OVERLAY */}
      {itemToDelete && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 shadow-2xl p-6 max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-150 text-left text-black rounded-lg">
            <h4 className="text-sm font-sans font-extrabold text-black border-b border-gray-100 pb-2">
              ⚠️ 포트폴리오 사례 제거
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
              정말로 <strong className="text-red-500 font-bold font-sans">"{itemToDelete.title}"</strong> 포트폴리오 사례를 완전히 영구 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 bg-gray-100 h-9 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-all rounded-md cursor-pointer text-center"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeleteItem) onDeleteItem(itemToDelete.id);
                  setItemToDelete(null);
                }}
                className="px-4 py-2 bg-red-500 h-9 hover:bg-black text-white font-bold text-xs transition-all rounded-md cursor-pointer text-center"
              >
                예, 삭제합니다
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
