/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseMe from './components/WhyChooseMe';
import Portfolio from './components/Portfolio';
import ProjectList from './components/ProjectList';
import Process from './components/Process';
import PhilosophyAndStats from './components/PhilosophyAndStats';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

import { 
  INITIAL_PORTFOLIO_ITEMS, 
  INITIAL_PROJECT_EXPERIENCES, 
  INITIAL_REVIEWS, 
  INITIAL_FAQS 
} from './data/initialData';

import { PortfolioItem, ProjectExperience, ReviewItem, FaqItem } from './types';
import { ArrowUp, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';

const DEFAULT_HOME_CONFIG = {
  heroSub: '브랜드가 기억되는 SNS 콘텐츠를 디자인합니다.',
  heroMainLine1: '디자인과 마케팅을 함께 생각하는',
  heroMainLine2: '디자인 스튜디오',
  heroMainHighlight: '둥근달스튜디오입니다.',
  heroTags: ['인스타그램 콘텐츠 디자인', '릴스 썸네일', '카드뉴스', '광고 디자인', 'SNS 운영 디자인'],
  whyMeTitle: '단순히 "예쁘게 디자인하는것"은 / 우리의 비즈니스 목표가 아닙니다',
  whyMeDesc: 'SNS 콘텐츠는 예술 작품이 아니라 매출과 반응을 만들어내는 마케팅 도구입니다. 성과 중심의 비즈니스 포트폴리오를 설계합니다.',
  projectsTitle: '단순한 작업물이 아닌 / 실제 계정 운영 경험을 증명합니다.',
  projectsDesc: '디자이너의 실력은 일회성 시안이 아니라 장기적이고 유기적인 채널 운영 성과에서 나타납니다. 기획부터 디자인, 업로드, 유입 전환까지 전 실무 영역을 포괄합니다.',
  reviewsTitle: '대표님들의 목소리',
  reviewsDesc: '협업을 마친 파트너사 대표님들이 자발적으로 남겨주신 100% 생생한 실제 피드백입니다. 오직 성과와 높은 완성도 만족도로 보답합니다.',
  faqTitle: '자주 묻는 질문',
  faqDesc: '디자인 프로세스 및 원본 전달, 대행 범위 등 가장 자주 들어오는 질문들을 투명하게 정리했습니다. 기타 개별적 특별 협의 사항도 언제든지 조율이 가능합니다.',
  philBadge: 'My Design Philosophy',
  philTitle: '예쁜 디자인보다, / 브랜드를 기억하게 만드는 디자인을 추구합니다.',
  philDesc1: '단순히 화려한 효과와 유행하는 요소만 얹은 시안은 시간이 지나면 공허하게 잊혀질 뿐입니다. 브랜드가 빛을 발하기 위해선, 그 채널이 가진 고유의 스토리와 목적성이 단 한 장의 콘텐츠에도 직관적으로 담겨야 합니다.',
  philDesc2: '콘텐츠 하나에도 잠재 고객의 심리를 자극하고 다음 행동을 부르는 정성스러운 기획과 브랜드만의 고유 분위기를 담아 설계합니다. 이것이 둥근달스튜디오가 수많은 대표님들께 신뢰와 만족을 받는 고유의 철학이자 가치입니다.',
  philRole: '마케팅 전문 SNS 디자이너',
  philCreator: '둥근달스튜디오 디렉터',
  stat1Num: '7+',
  stat1Label: '운영 채널',
  stat1Sub: '종합 채널 전략 운영 및 디렉팅',
  stat2Num: '500+',
  stat2Label: '콘텐츠 제작',
  stat2Sub: '카드뉴스, 피드 배너, 상세 광고 시안',
  stat3Num: '200+',
  stat3Label: '릴스 제작 및 썸네일',
  stat3Sub: '숏폼 영상 기획, 컷 편집 및 유입 설계',
  stat4Num: '420%',
  stat4Label: '최고 ROAS',
  stat4Sub: '메타 및 타겟 최적화 광고 효율 기록',
};

export default function App() {
  // Persistence states
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [projectExperiences, setProjectExperiences] = useState<ProjectExperience[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [homeConfig, setHomeConfig] = useState(DEFAULT_HOME_CONFIG);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  
  // Back to top fab style
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Email copy feedback
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Load datasets or read from localStorage
  useEffect(() => {
    // 1. Portfolio items
    const savedPortfolio = localStorage.getItem('decora_portfolio');
    if (savedPortfolio) {
      try {
        const parsed = JSON.parse(savedPortfolio) as PortfolioItem[];
        // Backfill image URLs if they are missing or still set to old structure
        const updated = parsed.map(item => {
          const defaultItem = INITIAL_PORTFOLIO_ITEMS.find(d => d.id === item.id);
          if (defaultItem && (!item.imageUrl || item.imageUrl.trim() === '')) {
            return { ...item, imageUrl: defaultItem.imageUrl, isMockup: false };
          }
          return item;
        });
        setPortfolioItems(updated);
        localStorage.setItem('decora_portfolio', JSON.stringify(updated));
      } catch (err) {
        setPortfolioItems(INITIAL_PORTFOLIO_ITEMS);
      }
    } else {
      setPortfolioItems(INITIAL_PORTFOLIO_ITEMS);
      localStorage.setItem('decora_portfolio', JSON.stringify(INITIAL_PORTFOLIO_ITEMS));
    }

    // 2. Project experiences
    const savedProjects = localStorage.getItem('decora_projects');
    if (savedProjects) {
      try {
        setProjectExperiences(JSON.parse(savedProjects));
      } catch (err) {
        setProjectExperiences(INITIAL_PROJECT_EXPERIENCES);
      }
    } else {
      setProjectExperiences(INITIAL_PROJECT_EXPERIENCES);
      localStorage.setItem('decora_projects', JSON.stringify(INITIAL_PROJECT_EXPERIENCES));
    }

    // 3. Reviews
    const savedReviews = localStorage.getItem('decora_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (err) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('decora_reviews', JSON.stringify(INITIAL_REVIEWS));
    }

    // 4. FAQs
    const savedFaqs = localStorage.getItem('decora_faqs');
    if (savedFaqs) {
      try {
        const parsed = JSON.parse(savedFaqs) as FaqItem[];
        const filtered = parsed.filter(item => item.id !== 'faq-4');
        setFaqs(filtered);
        localStorage.setItem('decora_faqs', JSON.stringify(filtered));
      } catch (err) {
        setFaqs(INITIAL_FAQS);
      }
    } else {
      setFaqs(INITIAL_FAQS);
      localStorage.setItem('decora_faqs', JSON.stringify(INITIAL_FAQS));
    }

    // 5. General Home Config
    const savedConfig = localStorage.getItem('decora_home_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Migrate old default main copy to the newly requested name
        if (parsed.heroMainLine1 === '디자인과 마케팅을' || parsed.heroMainHighlight === 'SNS 콘텐츠 디자이너') {
          parsed.heroMainLine1 = '디자인과 마케팅을 함께 생각하는';
          parsed.heroMainLine2 = '디자인 스튜디오';
          parsed.heroMainHighlight = '둥근달스튜디오입니다.';
        }
        if (!parsed.whyMeTitle || parsed.whyMeTitle === '단순히 "예쁘게 디자인하는 것"은 우리의 비즈니스 목표가 아닙니다.') {
          parsed.whyMeTitle = '단순히 "예쁘게 디자인하는것"은 / 우리의 비즈니스 목표가 아닙니다';
        }
        if (!parsed.projectsTitle || parsed.projectsTitle === '단순 작업물이 아닌, 실제 계정 운영 경험을 증명합니다.' || parsed.projectsTitle.includes('단순한 일은')) {
          parsed.projectsTitle = '단순한 작업물이 아닌 / 실제 계정 운영 경험을 증명합니다.';
        }
        const merged = { ...DEFAULT_HOME_CONFIG, ...parsed };
        localStorage.setItem('decora_home_config', JSON.stringify(merged));
        setHomeConfig(merged);
      } catch (err) {
        setHomeConfig(DEFAULT_HOME_CONFIG);
      }
    } else {
      setHomeConfig(DEFAULT_HOME_CONFIG);
      localStorage.setItem('decora_home_config', JSON.stringify(DEFAULT_HOME_CONFIG));
    }

    // Check admin session
    const adminSession = localStorage.getItem('decora_admin_logged');
    if (adminSession === 'true') {
      setIsAdminLoggedIn(true);
    }

    // Scroll listener for Top FAB
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state functions
  const savePortfolioToStorage = (updatedList: PortfolioItem[]) => {
    setPortfolioItems(updatedList);
    localStorage.setItem('decora_portfolio', JSON.stringify(updatedList));
  };

  const saveProjectsToStorage = (updatedList: ProjectExperience[]) => {
    setProjectExperiences(updatedList);
    localStorage.setItem('decora_projects', JSON.stringify(updatedList));
  };

  const saveReviewsToStorage = (updatedList: ReviewItem[]) => {
    setReviews(updatedList);
    localStorage.setItem('decora_reviews', JSON.stringify(updatedList));
  };

  const saveFaqsToStorage = (updatedList: FaqItem[]) => {
    setFaqs(updatedList);
    localStorage.setItem('decora_faqs', JSON.stringify(updatedList));
  };

  const saveHomeConfigToStorage = (newConfig: typeof homeConfig) => {
    setHomeConfig(newConfig);
    localStorage.setItem('decora_home_config', JSON.stringify(newConfig));
  };

  // Portfolio CRUD operations
  const handleAddPortfolio = (newItem: PortfolioItem) => {
    const updated = [newItem, ...portfolioItems];
    savePortfolioToStorage(updated);
  };

  const handleUpdatePortfolio = (updatedItem: PortfolioItem) => {
    const updated = portfolioItems.map(item => item.id === updatedItem.id ? updatedItem : item);
    savePortfolioToStorage(updated);
  };

  const handleDeletePortfolio = (id: string) => {
    const updated = portfolioItems.filter(item => item.id !== id);
    savePortfolioToStorage(updated);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('decora_admin_logged', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('decora_admin_logged');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rdmstudio0815@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Scroll views safely
  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-[#0055FF] selection:text-white antialiased text-black bg-white">
      {/* GLOBAL NAVBAR */}
      <Navbar 
        onAdminClick={() => setIsAdminPanelOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleAdminLogout}
      />

      {/* CORE SECTIONS STREAM */}
      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <Hero 
          onPortfolioView={() => scrollToSection('#portfolio')}
          onContactView={() => scrollToSection('#contact')}
          homeConfig={homeConfig}
        />

        {/* SECTION 2: WHY CHOOSE ME (Value proposal) */}
        <WhyChooseMe homeConfig={homeConfig} />

        {/* SECTION 3: CORE PORTFOLIO INTERACTION (Before-After + Grid + Categorized filter) */}
        <Portfolio 
          items={portfolioItems}
          isAdminLoggedIn={isAdminLoggedIn}
          onEditItem={(item) => {
            setIsAdminPanelOpen(true);
            // Dynamic delay to let the panel open, then trigger editing inside panel ref
            setTimeout(() => {
              const editBtn = document.querySelector(`button[title="편집"]`);
              if (editBtn) (editBtn as HTMLButtonElement).click();
            }, 100);
          }}
          onDeleteItem={handleDeletePortfolio}
        />

        {/* SECTION 4: PROJECT REAL OPERATIONAL EXPERIENCE (Real Channel growth metrics) */}
        <ProjectList projects={projectExperiences} homeConfig={homeConfig} />

        {/* SECTION 5: DESIGN PROCESS TIMELINE DIAGRAM (상담 -> 최종납품) */}
        <Process />

        {/* SECTION 6 & 7: PHILOSOPHY & NUMERICAL IMPACT (철학 & 팩트 지표) */}
        <PhilosophyAndStats homeConfig={homeConfig} />

        {/* SECTION 8: CHAT ROOM / DM GENUINE REVIEWS (리뷰 말풍선) */}
        <Reviews reviews={reviews} homeConfig={homeConfig} />

        {/* SECTION 9: ACCORDION FAQ (질문 조율함) */}
        <FAQ faqs={faqs} homeConfig={homeConfig} />

        {/* SECTION 10: BOTTOM OUTLET CTA AND SECURE INPUT FORM (빠른 문의접수) */}
        <Contact />
      </main>

      {/* DETAILED PROFESSIONAL FOOTER */}
      <footer className="bg-gray-50 text-gray-550 py-16 px-6 border-t border-gray-150 text-left text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-none bg-[#0055FF] text-white font-extrabold flex items-center justify-center font-sans text-xs animate-pulse">
                둥
              </div>
              <span className="font-sans font-bold text-black tracking-tight text-base">둥근달스튜디오</span>
            </div>
            <p className="text-gray-550 max-w-sm leading-relaxed font-sans text-xs">
              예쁜 디자인을 조립하는 공식을 넘어, 브랜드 고유의 방향성을 분석하고 정량적인 고객 유입 성과를 설계하는 신뢰 기반의 크리에이티브 파트너가 되어 드립니다.
            </p>
            <div className="pt-2 text-[11px] font-mono text-gray-400">
              © {new Date().getFullYear()} 둥근달스튜디오 Creative. All Rights Reserved.
            </div>
          </div>

          {/* Quick Channels Links Col */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-xs tracking-widest text-gray-400 uppercase">Quick Navigation</h4>
            <div className="flex flex-col gap-2 font-medium">
              <a href="#portfolio" className="hover:text-[#0055FF] transition-colors">Portfolio 목록</a>
              <a href="#why-me" className="hover:text-[#0055FF] transition-colors">나를 선택해야 하는 이유</a>
              <a href="#projects" className="hover:text-[#0055FF] transition-colors">실제 운영 성과</a>
              <a href="#process" className="hover:text-[#0055FF] transition-colors">6단계 디자인 가이드라인</a>
            </div>
          </div>

          {/* Business Hours & Email copy block */}
          <div className="md:col-span-6 lg:col-span-4 space-y-4">
            <h4 className="font-sans font-bold text-xs tracking-widest text-gray-400 uppercase">Business Contacts</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-[#0055FF]"></span>
                <span>이메일: rdmstudio0815@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 hover:bg-gray-200 text-gray-500 hover:text-black rounded-none transition-colors ml-1"
                  title="이메일 복사"
                  id="foot-email-copy"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-none bg-[#0055FF]"></span>
                <span>카카오 채널: @둥근달스튜디오</span>
              </p>
              <p className="text-gray-400 text-[11px] leading-relaxed pt-1.5">
                ⚡ 문의 접수 시 영업 시간 기준 최대 3시간 이내 담당 디자이너가 직접 전화 혹은 카톡 채널을 통해 친절 상담 가이드를 제공해 드립니다.
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOAT BACK TO TOP FAB */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-none bg-[#0055FF] hover:bg-black hover:text-white text-white shadow-xl transition-all flex items-center justify-center z-30 group"
          title="페이지 최상단으로"
          id="btn-back-to-top"
        >
          <ArrowUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
        </button>
      )}

      {/* SLIDE-OUT DRAWER FOR ADMIN MANAGEMENT */}
      <AdminPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
        isLoggedIn={isAdminLoggedIn}
        portfolioItems={portfolioItems}
        onAddPortfolio={handleAddPortfolio}
        onUpdatePortfolio={handleUpdatePortfolio}
        onDeletePortfolio={handleDeletePortfolio}
        
        projectExperiences={projectExperiences}
        onSaveProjects={saveProjectsToStorage}
        
        reviews={reviews}
        onSaveReviews={saveReviewsToStorage}
        
        faqs={faqs}
        onSaveFaqs={saveFaqsToStorage}
        
        homeConfig={homeConfig}
        onSaveHomeConfig={saveHomeConfigToStorage}
      />
    </div>
  );
}
