/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReviewItem } from '../types';
import { Star, MessageSquareCode, Heart, CheckCheck, Smile } from 'lucide-react';

interface ReviewsProps {
  reviews: ReviewItem[];
  homeConfig?: {
    reviewsTitle: string;
    reviewsDesc: string;
  };
}

export default function Reviews({ reviews, homeConfig }: ReviewsProps) {
  const reviewsTitle = homeConfig?.reviewsTitle ?? '대표님들의 목소리';
  const reviewsDesc = homeConfig?.reviewsDesc ?? '협업을 마친 파트너사 대표님들이 자발적으로 남겨주신 100% 생생한 실제 피드백입니다.\n오직 성과와 높은 완성도 만족도로 보답합니다.';

  return (
    <section id="reviews" className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-[#E5A300] tracking-widest uppercase bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-none">
            SATISFIED CLIENTS
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-black mt-6 tracking-tight whitespace-pre-line">
            {reviewsTitle}
          </h2>
          <p className="text-gray-550 font-sans text-[15px] sm:text-[16px] mt-4 leading-relaxed whitespace-pre-line">
            {reviewsDesc}
          </p>
        </div>

        {/* Reviews Horizontal / Responsive Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id}
              className="bg-gray-50 border border-gray-150 hover:border-[#E5A300] hover:bg-white shadow-sm hover:shadow-2xl rounded-none p-6 transition-all duration-300 flex flex-col justify-between"
              id={`rev-card-${rev.id}`}
            >
              <div>
                {/* Rating stars row */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                  ))}
                </div>

                {/* Content quotation */}
                <p className="text-gray-700 text-[14.5px] leading-relaxed italic font-sans mb-6">
                  "{rev.content}"
                </p>
              </div>

              {/* Author Info & Date */}
              <div className="pt-4 border-t border-gray-150 flex items-center justify-between text-xs font-sans">
                <div>
                  <h4 className="font-bold text-black font-sans">{rev.author}</h4>
                  <p className="text-[10px] text-gray-400 font-medium font-sans uppercase tracking-wider">{rev.role}</p>
                </div>
                {rev.date && (
                  <span className="text-[10px] font-mono text-gray-400">{rev.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
