/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioItem, ProjectExperience, ReviewItem, FaqItem } from '../types';
import { Lock, CheckCircle2, ChevronRight, Plus, Trash2, X, Sparkles, Inbox, RefreshCw, Layers, MessageSquareCode, HelpCircle, LayoutGrid, FileText, Upload } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  isLoggedIn: boolean;
  portfolioItems: PortfolioItem[];
  onAddPortfolio: (item: PortfolioItem) => void;
  onUpdatePortfolio: (item: PortfolioItem) => void;
  onDeletePortfolio: (id: string) => void;

  projectExperiences: ProjectExperience[];
  onSaveProjects: (projects: ProjectExperience[]) => void;

  reviews: ReviewItem[];
  onSaveReviews: (reviews: ReviewItem[]) => void;

  faqs: FaqItem[];
  onSaveFaqs: (faqs: FaqItem[]) => void;

  homeConfig: any;
  onSaveHomeConfig: (config: any) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  onLoginSuccess,
  isLoggedIn,
  portfolioItems,
  onAddPortfolio,
  onUpdatePortfolio,
  onDeletePortfolio,
  projectExperiences,
  onSaveProjects,
  reviews,
  onSaveReviews,
  faqs,
  onSaveFaqs,
  homeConfig,
  onSaveHomeConfig,
}: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Custom dialogs & toast States to bypass browser confirm/alert within iframe blockages
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogBtnText, setDialogBtnText] = useState('확인');
  const [dialogIsDanger, setDialogIsDanger] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const requestConfirm = (title: string, msg: string, action: () => void, isDanger = true, btnText = '삭제') => {
    setDialogTitle(title);
    setDialogMessage(msg);
    setDialogAction(() => action);
    setDialogBtnText(btnText);
    setDialogIsDanger(isDanger);
    setDialogOpen(true);
  };
  
  // Tabs: 'portfolio' | 'projects' | 'reviews' | 'faq' | 'home' | 'inquiries'
  const [activeTab, setActiveTab] = useState<'portfolio' | 'projects' | 'reviews' | 'faq' | 'home' | 'inquiries'>('portfolio');

  // Form states for PortfolioItem fields
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState('');

  // Portfolio Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Instagram Feed');
  const [clientName, setClientName] = useState('');
  const [beforeDesc, setBeforeDesc] = useState('');
  const [afterDesc, setAfterDesc] = useState('');
  const [designIntent, setDesignIntent] = useState('');
  const [achievements, setAchievements] = useState<string[]>(['']);
  const [accentColor, setAccentColor] = useState('#0055FF');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageMethod, setImageMethod] = useState<'file' | 'url'>('file');

  // Project Experience Form Fields
  const [editingProject, setEditingProject] = useState<ProjectExperience | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [projTitle, setProjTitle] = useState('');
  const [projSubtitle, setProjSubtitle] = useState('');
  const [projPeriod, setProjPeriod] = useState('');
  const [projScope, setProjScope] = useState('');
  const [projDesc, setProjDesc] = useState('');

  // Review Form Fields
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revRole, setRevRole] = useState('');
  const [revContent, setRevContent] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revSource, setRevSource] = useState<'dm' | 'kakaotalk' | 'review'>('kakaotalk');

  // FAQ Form Fields
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isFaqFormOpen, setIsFaqFormOpen] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Home Config Fields (Initialized on mount or change tab)
  const [cfgHeroSub, setCfgHeroSub] = useState(homeConfig?.heroSub ?? '');
  const [cfgHeroLine1, setCfgHeroLine1] = useState(homeConfig?.heroMainLine1 ?? '');
  const [cfgHeroLine2, setCfgHeroLine2] = useState(homeConfig?.heroMainLine2 ?? '');
  const [cfgHeroHighlight, setCfgHeroHighlight] = useState(homeConfig?.heroMainHighlight ?? '');
  const [cfgHeroTags, setCfgHeroTags] = useState((homeConfig?.heroTags ?? []).join(', '));
  const [cfgWhyMeTitle, setCfgWhyMeTitle] = useState(homeConfig?.whyMeTitle ?? '');
  const [cfgWhyMeDesc, setCfgWhyMeDesc] = useState(homeConfig?.whyMeDesc ?? '');
  const [cfgProjectsTitle, setCfgProjectsTitle] = useState(homeConfig?.projectsTitle ?? '');
  const [cfgProjectsDesc, setCfgProjectsDesc] = useState(homeConfig?.projectsDesc ?? '');
  const [cfgReviewsTitle, setCfgReviewsTitle] = useState(homeConfig?.reviewsTitle ?? '');
  const [cfgReviewsDesc, setCfgReviewsDesc] = useState(homeConfig?.reviewsDesc ?? '');
  const [cfgFaqTitle, setCfgFaqTitle] = useState(homeConfig?.faqTitle ?? '');
  const [cfgFaqDesc, setCfgFaqDesc] = useState(homeConfig?.faqDesc ?? '');

  const [cfgPhilBadge, setCfgPhilBadge] = useState(homeConfig?.philBadge ?? '');
  const [cfgPhilTitle, setCfgPhilTitle] = useState(homeConfig?.philTitle ?? '');
  const [cfgPhilDesc1, setCfgPhilDesc1] = useState(homeConfig?.philDesc1 ?? '');
  const [cfgPhilDesc2, setCfgPhilDesc2] = useState(homeConfig?.philDesc2 ?? '');
  const [cfgPhilRole, setCfgPhilRole] = useState(homeConfig?.philRole ?? '');
  const [cfgPhilCreator, setCfgPhilCreator] = useState(homeConfig?.philCreator ?? '');

  const [cfgStat1Num, setCfgStat1Num] = useState(homeConfig?.stat1Num ?? '7+');
  const [cfgStat1Label, setCfgStat1Label] = useState(homeConfig?.stat1Label ?? '운영 채널');
  const [cfgStat1Sub, setCfgStat1Sub] = useState(homeConfig?.stat1Sub ?? '종합 채널 전략 운영 및 디렉팅');

  const [cfgStat2Num, setCfgStat2Num] = useState(homeConfig?.stat2Num ?? '500+');
  const [cfgStat2Label, setCfgStat2Label] = useState(homeConfig?.stat2Label ?? '콘텐츠 제작');
  const [cfgStat2Sub, setCfgStat2Sub] = useState(homeConfig?.stat2Sub ?? '카드뉴스, 피드 배너, 상세 광고 시안');

  const [cfgStat3Num, setCfgStat3Num] = useState(homeConfig?.stat3Num ?? '200+');
  const [cfgStat3Label, setCfgStat3Label] = useState(homeConfig?.stat3Label ?? '릴스 제작 및 썸네일');
  const [cfgStat3Sub, setCfgStat3Sub] = useState(homeConfig?.stat3Sub ?? '숏폼 영상 기획, 컷 편집 및 유입 설계');

  const [cfgStat4Num, setCfgStat4Num] = useState(homeConfig?.stat4Num ?? '420%');
  const [cfgStat4Label, setCfgStat4Label] = useState(homeConfig?.stat4Label ?? '최고 ROAS');
  const [cfgStat4Sub, setCfgStat4Sub] = useState(homeConfig?.stat4Sub ?? '메타 및 타겟 최적화 광고 효율 기록');

  useEffect(() => {
    if (homeConfig) {
      setCfgHeroSub(homeConfig.heroSub ?? '');
      setCfgHeroLine1(homeConfig.heroMainLine1 ?? '');
      setCfgHeroLine2(homeConfig.heroMainLine2 ?? '');
      setCfgHeroHighlight(homeConfig.heroMainHighlight ?? '');
      setCfgHeroTags((homeConfig.heroTags ?? []).join(', '));
      setCfgWhyMeTitle(homeConfig.whyMeTitle ?? '');
      setCfgWhyMeDesc(homeConfig.whyMeDesc ?? '');
      setCfgProjectsTitle(homeConfig.projectsTitle ?? '');
      setCfgProjectsDesc(homeConfig.projectsDesc ?? '');
      setCfgReviewsTitle(homeConfig.reviewsTitle ?? '');
      setCfgReviewsDesc(homeConfig.reviewsDesc ?? '');
      setCfgFaqTitle(homeConfig.faqTitle ?? '');
      setCfgFaqDesc(homeConfig.faqDesc ?? '');
      setCfgPhilBadge(homeConfig.philBadge ?? '');
      setCfgPhilTitle(homeConfig.philTitle ?? '');
      setCfgPhilDesc1(homeConfig.philDesc1 ?? '');
      setCfgPhilDesc2(homeConfig.philDesc2 ?? '');
      setCfgPhilRole(homeConfig.philRole ?? '');
      setCfgPhilCreator(homeConfig.philCreator ?? '');
      setCfgStat1Num(homeConfig.stat1Num ?? '7+');
      setCfgStat1Label(homeConfig.stat1Label ?? '운영 채널');
      setCfgStat1Sub(homeConfig.stat1Sub ?? '종합 채널 전략 운영 및 디렉팅');
      setCfgStat2Num(homeConfig.stat2Num ?? '500+');
      setCfgStat2Label(homeConfig.stat2Label ?? '콘텐츠 제작');
      setCfgStat2Sub(homeConfig.stat2Sub ?? '카드뉴스, 피드 배너, 상세 광고 시안');
      setCfgStat3Num(homeConfig.stat3Num ?? '200+');
      setCfgStat3Label(homeConfig.stat3Label ?? '릴스 제작 및 썸네일');
      setCfgStat3Sub(homeConfig.stat3Sub ?? '숏폼 영상 기획, 컷 편집 및 유입 설계');
      setCfgStat4Num(homeConfig.stat4Num ?? '420%');
      setCfgStat4Label(homeConfig.stat4Label ?? '최고 ROAS');
      setCfgStat4Sub(homeConfig.stat4Sub ?? '메타 및 타겟 최적화 광고 효율 기록');
    }
  }, [homeConfig]);

  // Load client inquiries from localStorage
  const inquiries = JSON.parse(localStorage.getItem('decora_inquiries') || '[]');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0815') {
      onLoginSuccess();
      setAuthError('');
      setPassword('');
    } else {
      setAuthError('❌ 비밀번호가 올바르지 않습니다. 다시 입력해 주세요.');
    }
  };

  // Portfolio actions
  const handleOpenNewForm = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Instagram Design');
    setClientName('');
    setBeforeDesc('');
    setAfterDesc('');
    setDesignIntent('');
    setAchievements(['']);
    setAccentColor('#0055FF');
    setImageUrl('');
    setImages([]);
    setImageMethod('file');
    setFormError('');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setClientName(item.clientName);
    setBeforeDesc(item.beforeDescription);
    setAfterDesc(item.afterDescription);
    setDesignIntent(item.designIntent);
    setAchievements(item.achievements.length > 0 ? [...item.achievements] : ['']);
    setAccentColor(item.accentColor || '#0055FF');
    setImageUrl(item.imageUrl || '');
    setImages(item.images || (item.imageUrl ? [item.imageUrl] : []));
    setImageMethod(item.imageUrl && item.imageUrl.startsWith('data:') ? 'file' : 'url');
    setFormError('');
    setIsFormOpen(true);
  };

  const handleAddAchievementField = () => {
    setAchievements([...achievements, '']);
  };

  const handleRemoveAchievementField = (index: number) => {
    const next = achievements.filter((_, i) => i !== index);
    setAchievements(next.length === 0 ? [''] : next);
  };

  const handleAchievementChange = (index: number, val: string) => {
    const next = [...achievements];
    next[index] = val;
    setAchievements(next);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientName) {
      setFormError('제목과 클라이언트 이름은 필수 항목입니다.');
      return;
    }

    const finalImages = images.filter(img => img.trim() !== '');
    const firstImage = finalImages.length > 0 ? finalImages[0] : imageUrl.trim();

    const itemPayload: PortfolioItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      title,
      category,
      clientName,
      beforeDescription: beforeDesc,
      afterDescription: afterDesc,
      designIntent,
      achievements: achievements.filter(x => x.trim() !== ''),
      beforeImgUrl: '',
      afterImgUrl: '',
      accentColor,
      isMockup: firstImage ? false : true,
      imageUrl: firstImage || undefined,
      images: finalImages.length > 0 ? finalImages : (firstImage ? [firstImage] : []),
    };

    if (editingItem) {
      onUpdatePortfolio(itemPayload);
      showToast('🎉 포트폴리오 데이터가 개정되었습니다!');
    } else {
      onAddPortfolio(itemPayload);
      showToast('🎉 새로운 포트폴리오 우수 사례가 등록되었습니다!');
    }
    setIsFormOpen(false);
  };

  // Projects actions
  const handleOpenProjectForm = (proj?: ProjectExperience) => {
    if (proj) {
      setEditingProject(proj);
      setProjTitle(proj.title);
      setProjSubtitle(proj.subtitle);
      setProjPeriod(proj.period);
      setProjScope(proj.scope.join(', '));
      setProjDesc(proj.description);
    } else {
      setEditingProject(null);
      setProjTitle('');
      setProjSubtitle('');
      setProjPeriod('');
      setProjScope('콘텐츠 제작, 채널 리드');
      setProjDesc('');
    }
    setIsProjectFormOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedScope = projScope.split(',').map(s => s.trim()).filter(s => s !== '');
    const payload: ProjectExperience = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      title: projTitle,
      subtitle: projSubtitle,
      period: projPeriod,
      scope: parsedScope,
      description: projDesc,
    };

    let nextProjects = [...projectExperiences];
    if (editingProject) {
      nextProjects = nextProjects.map(p => p.id === editingProject.id ? payload : p);
    } else {
      nextProjects.push(payload);
    }
    onSaveProjects(nextProjects);
    setIsProjectFormOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    requestConfirm(
      '운영 경험 삭제',
      '이 운영 채널 경험을 완전히 삭제하시겠습니까?',
      () => {
        onSaveProjects(projectExperiences.filter(p => p.id !== id));
        showToast('🎉 운영 경험 데이터가 완벽하게 삭제되었습니다!');
      }
    );
  };

  // Reviews actions
  const handleOpenReviewForm = (rev?: ReviewItem) => {
    if (rev) {
      setEditingReview(rev);
      setRevAuthor(rev.author);
      setRevRole(rev.role);
      setRevContent(rev.content);
      setRevRating(rev.rating);
      setRevSource(rev.source || 'kakaotalk');
    } else {
      setEditingReview(null);
      setRevAuthor('');
      setRevRole('');
      setRevContent('');
      setRevRating(5);
      setRevSource('kakaotalk');
    }
    setIsReviewFormOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ReviewItem = {
      id: editingReview ? editingReview.id : Date.now().toString(),
      author: revAuthor,
      role: revRole,
      content: revContent,
      rating: revRating,
      source: revSource,
    };

    let nextReviews = [...reviews];
    if (editingReview) {
      nextReviews = nextReviews.map(r => r.id === editingReview.id ? payload : r);
      showToast('🎉 후기 데이터가 정상 수렴 개정되었습니다!');
    } else {
      nextReviews.push(payload);
      showToast('🎉 새로운 후기 카드가 생성 등록되었습니다!');
    }
    onSaveReviews(nextReviews);
    setIsReviewFormOpen(false);
  };

  const handleDeleteReview = (id: string) => {
    requestConfirm(
      '파트너 추천 삭제',
      '이 후기를 삭제하시겠습니까?',
      () => {
        onSaveReviews(reviews.filter(r => r.id !== id));
        showToast('🎉 파트너 추천 후기가 완전히 제거되었습니다.');
      }
    );
  };

  // FAQ actions
  const handleOpenFaqForm = (faq?: FaqItem) => {
    if (faq) {
      setEditingFaq(faq);
      setFaqQuestion(faq.question);
      setFaqAnswer(faq.answer);
    } else {
      setEditingFaq(null);
      setFaqQuestion('');
      setFaqAnswer('');
    }
    setIsFaqFormOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: FaqItem = {
      id: editingFaq ? editingFaq.id : Date.now().toString(),
      question: faqQuestion,
      answer: faqAnswer,
    };

    let nextFaqs = [...faqs];
    if (editingFaq) {
      nextFaqs = nextFaqs.map(f => f.id === editingFaq.id ? payload : f);
      showToast('🎉 자주묻는 질문 문항이 업데이트되었습니다!');
    } else {
      nextFaqs.push(payload);
      showToast('🎉 자주묻는 질문 문항이 추가 생성되었습니다!');
    }
    onSaveFaqs(nextFaqs);
    setIsFaqFormOpen(false);
  };

  const handleDeleteFaq = (id: string) => {
    requestConfirm(
      'FAQ 고도화 질문 삭제',
      '이 질문 데이터를 삭제하시겠습니까?',
      () => {
        onSaveFaqs(faqs.filter(f => f.id !== id));
        showToast('🎉 해당 FAQ 사양이 완전히 소멸되었습니다.');
      }
    );
  };

  // Home configuration actions
  const handleSaveHomeText = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = cfgHeroTags.split(',').map(t => t.trim()).filter(t => t !== '');
     const updatedConfig = {
      heroSub: cfgHeroSub,
      heroMainLine1: cfgHeroLine1,
      heroMainLine2: cfgHeroLine2,
      heroMainHighlight: cfgHeroHighlight,
      heroTags: parsedTags,
      whyMeTitle: cfgWhyMeTitle,
      whyMeDesc: cfgWhyMeDesc,
      projectsTitle: cfgProjectsTitle,
      projectsDesc: cfgProjectsDesc,
      reviewsTitle: cfgReviewsTitle,
      reviewsDesc: cfgReviewsDesc,
      faqTitle: cfgFaqTitle,
      faqDesc: cfgFaqDesc,
      philBadge: cfgPhilBadge,
      philTitle: cfgPhilTitle,
      philDesc1: cfgPhilDesc1,
      philDesc2: cfgPhilDesc2,
      philRole: cfgPhilRole,
      philCreator: cfgPhilCreator,
      stat1Num: cfgStat1Num,
      stat1Label: cfgStat1Label,
      stat1Sub: cfgStat1Sub,
      stat2Num: cfgStat2Num,
      stat2Label: cfgStat2Label,
      stat2Sub: cfgStat2Sub,
      stat3Num: cfgStat3Num,
      stat3Label: cfgStat3Label,
      stat3Sub: cfgStat3Sub,
      stat4Num: cfgStat4Num,
      stat4Label: cfgStat4Label,
      stat4Sub: cfgStat4Sub,
    };
    onSaveHomeConfig(updatedConfig);
    showToast('🎉 홈페이지 문구가 성공적으로 수렴되어 적용되었습니다!');
  };

  const handleDeleteInquiry = (id: string) => {
    requestConfirm(
      '의뢰 상담 삭제',
      '해당 상담 문의 내역을 목록에서 완전 삭제(처리가 완료됨)하시겠습니까?',
      () => {
        const remaining = inquiries.filter((q: any) => q.id !== id);
        localStorage.setItem('decora_inquiries', JSON.stringify(remaining));
        window.dispatchEvent(new Event('storage'));
        showToast('🎉 상담 신청건 제거가 완료되었습니다.');
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col pointer-events-auto overflow-hidden animate-slide-in font-sans">
      {/* DRAWER CONTAINER TOP HEADER */}
      <div className="p-6 border-b border-gray-150 flex items-center justify-between shrink-0 bg-white">
        <div>
          <h3 className="font-sans font-extrabold text-[#0055FF] text-base md:text-lg flex items-center gap-1.5 leading-none">
            <Lock className="w-4.5 h-4.5" />
            Decora CMS 관리자 대시보드
          </h3>
          <p className="text-[10px] text-gray-450 font-mono tracking-widest uppercase mt-1 leading-none">All Control CMS Tool Terminal</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-md bg-gray-50 hover:bg-black hover:text-white border border-gray-200 text-black flex items-center justify-center font-bold text-xs select-none transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-white">
        {!isLoggedIn ? (
          /* NOT AUTHORIZED PANEL */
          <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
            <div className="w-16 h-16 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0055FF] mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-sans font-extrabold text-xl text-black mb-1">인증 암호가 필요합니다</h4>
            <p className="text-gray-500 text-xs text-center font-mono uppercase tracking-wider mb-6">Enter decora developer password credentials</p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">ADMIN PASSWORD</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-center text-lg font-mono tracking-widest text-black transition-colors"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-550 font-mono text-center mt-2 animate-pulse">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#0055FF] text-white hover:bg-black rounded-none text-xs font-bold font-mono uppercase tracking-widest flex items-center justify-center gap-1 transition-all cursor-pointer"
                id="btn-login-submit"
              >
                관리 권한으로 진입하기
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN SYSTEM DASHBOARD PANEL */
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Dashboard Sub Header Tabs - Responsive & Beautiful */}
            <div className="px-4 py-2 border-b border-gray-150 bg-gray-50 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none select-none">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-3 py-2 rounded-none text-xs font-bold transition-all font-sans shrink-0 ${
                  activeTab === 'portfolio' ? 'bg-[#0055FF] text-white' : 'text-gray-550 hover:text-black hover:bg-gray-100'
                }`}
              >
                📁 포트폴리오
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-2 rounded-none text-xs font-bold transition-all font-sans shrink-0 ${
                  activeTab === 'projects' ? 'bg-[#0055FF] text-white' : 'text-gray-550 hover:text-black hover:bg-gray-100'
                }`}
              >
                ⚡ 운영경험
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-2 rounded-none text-xs font-bold transition-all font-sans shrink-0 ${
                  activeTab === 'reviews' ? 'bg-[#0055FF] text-white' : 'text-gray-550 hover:text-black hover:bg-gray-100'
                }`}
              >
                💬 추천성사 후기
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-2 rounded-none text-xs font-bold transition-all font-sans shrink-0 ${
                  activeTab === 'faq' ? 'bg-[#0055FF] text-white' : 'text-gray-550 hover:text-black hover:bg-gray-100'
                }`}
              >
                ❓ 자주묻는 질문
              </button>
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-none text-xs font-bold transition-all font-sans shrink-0 ${
                  activeTab === 'home' ? 'bg-[#0055FF] text-white' : 'text-gray-550 hover:text-black hover:bg-gray-100'
                }`}
              >
                🏠 본문 텍스트
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-3 py-2 rounded-none text-xs font-bold transition-all font-sans shrink-0 relative ${
                  activeTab === 'inquiries' ? 'bg-[#0055FF] text-white' : 'text-gray-550 hover:text-black hover:bg-gray-100'
                }`}
              >
                📥 의뢰함 ({inquiries.length})
                {inquiries.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
                )}
              </button>
            </div>

            {/* TAB CONTENT: PORTFOLIO CRUD */}
            {activeTab === 'portfolio' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-white border-b border-gray-150 shrink-0 flex justify-between items-center bg-gray-50/50">
                  <span className="text-[10px] text-gray-400 font-semibold font-mono uppercase tracking-wider">포트폴리오 리브랜딩 카드 관리 ({portfolioItems.length})</span>
                  <button
                    onClick={handleOpenNewForm}
                    className="px-4 py-2 bg-[#0055FF] hover:bg-black text-white text-xs font-bold rounded-none shadow-sm flex items-center gap-1.5 transition-all font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    새 포트폴리오 추가
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
                  {portfolioItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-gray-150 rounded-none bg-gray-50 hover:bg-white hover:border-[#0055FF] flex items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] bg-white text-[#0055FF] border border-blue-100 px-2 py-0.5 rounded-none font-mono font-extrabold uppercase tracking-wider">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-550 truncate max-w-[150px] font-medium font-mono uppercase">{item.clientName}</span>
                        </div>
                        <h4 className="font-sans font-bold text-sm text-black truncate">{item.title}</h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditForm(item)}
                          className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-black rounded-none text-xs font-bold transition-all font-mono"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => {
                            requestConfirm(
                              '포트폴리오 삭제',
                              '이 포트폴리오 사례를 완전히 삭제하시겠습니까?',
                              () => {
                                onDeletePortfolio(item.id);
                                showToast('🎉 포트폴리오 카드가 삭제되었습니다!');
                              }
                            );
                          }}
                          className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 rounded-none transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {portfolioItems.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-xs font-sans">
                      등록된 포트폴리오가 없습니다. 상단의 새 포트폴리오 추가 버튼을 눌러보세요!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PROJECTS CRUD */}
            {activeTab === 'projects' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-white border-b border-gray-150 shrink-0 flex justify-between items-center bg-gray-50/50">
                  <span className="text-[10px] text-gray-400 font-semibold font-mono uppercase tracking-wider">유기적 채널 운영 성과 관리 ({projectExperiences.length})</span>
                  <button
                    onClick={() => handleOpenProjectForm()}
                    className="px-4 py-2 bg-[#0055FF] hover:bg-black text-white text-xs font-bold rounded-none shadow-sm flex items-center gap-1.5 transition-all font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    새 경험 추가
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
                  {projectExperiences.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 border border-gray-150 rounded-none bg-gray-50 hover:bg-white hover:border-[#0055FF] flex items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] bg-white text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-none font-mono font-extrabold uppercase tracking-wider">
                            {proj.period}
                          </span>
                        </div>
                        <h4 className="font-sans font-bold text-sm text-black truncate">{proj.title}</h4>
                        <p className="text-[11px] text-gray-500 font-sans truncate">{proj.subtitle}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenProjectForm(proj)}
                          className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-black rounded-none text-xs font-bold transition-all font-mono"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 rounded-none transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: REVIEWS CRUD */}
            {activeTab === 'reviews' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-white border-b border-gray-150 shrink-0 flex justify-between items-center bg-gray-50/50">
                  <span className="text-[10px] text-gray-400 font-semibold font-mono uppercase tracking-wider">파트너 대표님 추천 성사 후기 ({reviews.length})</span>
                  <button
                    onClick={() => handleOpenReviewForm()}
                    className="px-4 py-2 bg-[#0055FF] hover:bg-black text-white text-xs font-bold rounded-none shadow-sm flex items-center gap-1.5 transition-all font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    새 후기 추가
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 border border-gray-150 rounded-none bg-gray-50 hover:bg-white hover:border-[#0055FF] flex items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="font-sans font-bold text-sm text-black truncate">{rev.author} 대표 ({rev.role})</h4>
                        <p className="text-[11px] text-gray-500 font-mono italic truncate">"{rev.content}"</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenReviewForm(rev)}
                          className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-black rounded-none text-xs font-bold transition-all font-mono"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 rounded-none transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: FAQ CRUD */}
            {activeTab === 'faq' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 bg-white border-b border-gray-150 shrink-0 flex justify-between items-center bg-gray-50/50">
                  <span className="text-[10px] text-gray-400 font-semibold font-mono uppercase tracking-wider">대표 질문사항 고도화 ({faqs.length})</span>
                  <button
                    onClick={() => handleOpenFaqForm()}
                    className="px-4 py-2 bg-[#0055FF] hover:bg-black text-white text-xs font-bold rounded-none shadow-sm flex items-center gap-1.5 transition-all font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    새 질문 추가
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-4 border border-gray-150 rounded-none bg-gray-50 hover:bg-white hover:border-[#0055FF] flex items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="font-sans font-bold text-sm text-black truncate">Q. {faq.question}</h4>
                        <p className="text-[11px] text-gray-500 font-sans truncate">{faq.answer}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenFaqForm(faq)}
                          className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-black rounded-none text-xs font-bold transition-all font-mono"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 rounded-none transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: HOME MAIN TEXT CONFIGURATION */}
            {activeTab === 'home' && (
              <form onSubmit={handleSaveHomeText} className="flex-1 overflow-y-auto p-6 space-y-6 text-left bg-white text-black text-xs sm:text-sm">
                <div className="p-3 bg-blue-50/50 border border-blue-100 text-[#0055FF] text-[11px] leading-relaxed font-sans">
                  💡 <strong>실시간 비즈니스 카피라이팅 편집국:</strong> 아래 문구들을 수정 시 대표 프리뷰에 즉각 실시간 전환 매칭이 실행됩니다. (개화 라인 지원, 줄바꿈 자유롭게 작성 가능)
                </div>

                {/* HERO AREA */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <h4 className="font-sans font-extrabold text-[#0055FF] uppercase tracking-wider flex items-center gap-1">
                    <LayoutGrid className="w-4 h-4" />
                    메인 히어로 (Hero) 섹션
                  </h4>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">히어로 서브스트랩 타이틀 (Badge)</label>
                    <input
                      type="text"
                      value={cfgHeroSub}
                      onChange={(e) => setCfgHeroSub(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">메인 타이틀 라인 1</label>
                      <input
                        type="text"
                        value={cfgHeroLine1}
                        onChange={(e) => setCfgHeroLine1(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">메인 타이틀 라인 2</label>
                      <input
                        type="text"
                        value={cfgHeroLine2}
                        onChange={(e) => setCfgHeroLine2(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">포인트 컬러 핵심 강조 텍스트</label>
                    <input
                      type="text"
                      value={cfgHeroHighlight}
                      onChange={(e) => setCfgHeroHighlight(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black font-extrabold text-[#0055FF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">히어로 하단 스택 태그 가이드 (쉼표로 구분)</label>
                    <input
                      type="text"
                      value={cfgHeroTags}
                      onChange={(e) => setCfgHeroTags(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black font-mono text-xs"
                    />
                  </div>
                </div>

                {/* WHY CHOOSE ME AREA */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <h4 className="font-sans font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    가치 제안 (Why Choose Me) 섹션
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">제안 타이틀 (줄바꿈 지원)</label>
                    <textarea
                      rows={2}
                      value={cfgWhyMeTitle}
                      onChange={(e) => setCfgWhyMeTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black resize-none"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">상세 해설 및 서브 텍스트</label>
                    <textarea
                      rows={2}
                      value={cfgWhyMeDesc}
                      onChange={(e) => setCfgWhyMeDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* PROJECTS LIST AREA */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <h4 className="font-sans font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-4 h-4" />
                    운영 경험 (Operation Experience) 섹션
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">운영 섹션 타이틀</label>
                    <textarea
                      rows={2}
                      value={cfgProjectsTitle}
                      onChange={(e) => setCfgProjectsTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black resize-none"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">수치 소개 해설 문구</label>
                    <textarea
                      rows={2}
                      value={cfgProjectsDesc}
                      onChange={(e) => setCfgProjectsDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* REVIEWS AREA */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <h4 className="font-sans font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <MessageSquareCode className="w-4 h-4" />
                    파트너 추천 리뷰 섹션
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">리뷰 타이틀</label>
                    <input
                      type="text"
                      value={cfgReviewsTitle}
                      onChange={(e) => setCfgReviewsTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">리뷰 상세 서브 가이드</label>
                    <textarea
                      rows={2}
                      value={cfgReviewsDesc}
                      onChange={(e) => setCfgReviewsDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* FAQ AREA */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <h4 className="font-sans font-extrabold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    자주 묻는 질문 FAQ 섹션
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">질문 파트 타이틀</label>
                    <input
                      type="text"
                      value={cfgFaqTitle}
                      onChange={(e) => setCfgFaqTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">질문 설명 서브 타이포</label>
                    <textarea
                      rows={2}
                      value={cfgFaqDesc}
                      onChange={(e) => setCfgFaqDesc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* PHILOSOPHY AREA */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <h4 className="font-sans font-extrabold text-[#E5A300] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    디자인 철학 (My Design Philosophy) 섹션
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">철학 배지 레이블 (Badge)</label>
                    <input
                      type="text"
                      value={cfgPhilBadge}
                      onChange={(e) => setCfgPhilBadge(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">주요 철학 헤드라인 (슬래시 '/' 기준 우측 색상강조 지원)</label>
                    <textarea
                      rows={2}
                      value={cfgPhilTitle}
                      onChange={(e) => setCfgPhilTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black font-extrabold"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">철학 상세 설명 문단 1</label>
                    <textarea
                      rows={3}
                      value={cfgPhilDesc1}
                      onChange={(e) => setCfgPhilDesc1(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">철학 상세 설명 문단 2</label>
                    <textarea
                      rows={3}
                      value={cfgPhilDesc2}
                      onChange={(e) => setCfgPhilDesc2(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">시그니처 직함 (Role)</label>
                      <input
                        type="text"
                        value={cfgPhilRole}
                        onChange={(e) => setCfgPhilRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 tracking-wider">시그니처 사명/디렉터명 (Creator)</label>
                      <input
                        type="text"
                        value={cfgPhilCreator}
                        onChange={(e) => setCfgPhilCreator(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-[#0055FF] focus:outline-none rounded-none text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* STATISTICS INDICATORS AREA */}
                <div className="space-y-5 border-b border-gray-100 pb-6">
                  <h4 className="font-sans font-extrabold text-[#E5A300] uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-4 h-4" />
                    숫자 지표 & 수치 동기화 (Hero 배너 + Experience in Numbers 동시 반영)
                  </h4>

                  {/* STAT 1 */}
                  <div className="bg-neutral-50 p-4 border border-gray-200 space-y-3">
                    <span className="text-[10px] font-sans font-extrabold text-black uppercase tracking-wider block">
                      지표 1 (기본값: 운영 채널, 7+)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">수치 (Value)</label>
                        <input
                          type="text"
                          value={cfgStat1Num}
                          onChange={(e) => setCfgStat1Num(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">라벨명 (Label)</label>
                        <input
                          type="text"
                          value={cfgStat1Label}
                          onChange={(e) => setCfgStat1Label(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">부가 설명 (Sub)</label>
                        <input
                          type="text"
                          value={cfgStat1Sub}
                          onChange={(e) => setCfgStat1Sub(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STAT 2 */}
                  <div className="bg-neutral-50 p-4 border border-gray-200 space-y-3">
                    <span className="text-[10px] font-sans font-extrabold text-black uppercase tracking-wider block">
                      지표 2 (기본값: 콘텐츠 제작, 500+)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">수치 (Value)</label>
                        <input
                          type="text"
                          value={cfgStat2Num}
                          onChange={(e) => setCfgStat2Num(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">라벨명 (Label)</label>
                        <input
                          type="text"
                          value={cfgStat2Label}
                          onChange={(e) => setCfgStat2Label(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">부가 설명 (Sub)</label>
                        <input
                          type="text"
                          value={cfgStat2Sub}
                          onChange={(e) => setCfgStat2Sub(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STAT 3 */}
                  <div className="bg-neutral-50 p-4 border border-gray-200 space-y-3">
                    <span className="text-[10px] font-sans font-extrabold text-black uppercase tracking-wider block">
                      지표 3 (기본값: 릴스 제작 및 썸네일, 200+)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">수치 (Value)</label>
                        <input
                          type="text"
                          value={cfgStat3Num}
                          onChange={(e) => setCfgStat3Num(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">라벨명 (Label)</label>
                        <input
                          type="text"
                          value={cfgStat3Label}
                          onChange={(e) => setCfgStat3Label(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">부가 설명 (Sub)</label>
                        <input
                          type="text"
                          value={cfgStat3Sub}
                          onChange={(e) => setCfgStat3Sub(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STAT 4 */}
                  <div className="bg-neutral-50 p-4 border border-gray-200 space-y-3">
                    <span className="text-[10px] font-sans font-extrabold text-black uppercase tracking-wider block">
                      지표 4 (기본값: 최고 ROAS, 420%)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">수치 (Value)</label>
                        <input
                          type="text"
                          value={cfgStat4Num}
                          onChange={(e) => setCfgStat4Num(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">라벨명 (Label)</label>
                        <input
                          type="text"
                          value={cfgStat4Label}
                          onChange={(e) => setCfgStat4Label(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-gray-400">부가 설명 (Sub)</label>
                        <input
                          type="text"
                          value={cfgStat4Sub}
                          onChange={(e) => setCfgStat4Sub(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-200 focus:outline-none focus:border-[#0055FF] rounded-none text-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save block */}
                <div className="pt-4 border-t border-gray-150 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0055FF] hover:bg-black text-white text-xs font-bold font-mono tracking-widest uppercase rounded-none transition-colors cursor-pointer shadow-lg"
                  >
                    홈페이지 카피 일괄 저장 적용
                  </button>
                </div>
              </form>
            )}

            {/* TAB CONTENT: INQUIRIES CONTAINER */}
            {activeTab === 'inquiries' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
                <div className="flex items-center justify-between border-b border-gray-150 pb-2 text-left">
                  <span className="text-[10px] font-mono font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Inbox className="w-4 h-4 text-[#0055FF]" />
                    잠재클라이언트 문의수입함 ({inquiries.length})
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">마우스 오버 시 삭제가능</span>
                </div>

                {inquiries.map((inq: any) => (
                  <div
                    key={inq.id}
                    className="p-5 border border-dashed border-gray-200 rounded-none bg-gray-50 hover:bg-white relative group text-left"
                    id={`inq-view-${inq.id}`}
                  >
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-650 border border-red-150 hover:bg-red-500 hover:text-white rounded-none transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="삭제 처리"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-black">{inq.name} 대표님</span>
                          {inq.company && (
                            <span className="text-[10px] bg-blue-50 text-[#0055FF] px-2 py-0.5 rounded-none border border-blue-100 font-mono tracking-wider">
                              {inq.company}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">{inq.date}</span>
                      </div>

                      <div className="text-xs text-gray-750 leading-relaxed bg-white p-3 rounded-none border border-gray-200 whitespace-pre-line font-sans">
                        {inq.content}
                      </div>

                      {inq.phone && (
                        <div className="text-[11px] font-mono text-gray-500">
                          연락처 정보: <code className="bg-gray-50 border border-gray-200 px-2 py-0.5 text-gray-800 font-bold">{inq.phone}</code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {inquiries.length === 0 && (
                  <div className="text-center py-16 text-gray-400 font-sans text-xs">
                     접수된 신규 상담 신청 건이 아직 없습니다. Contact 섹션에서 양식을 제출하시면 이곳에 실시간 연동됩니다.
                  </div>
                )}
              </div>
            )}

            {/* PORTFOLIO FORM DIALOG POPUP MODAL */}
            {isFormOpen && (
              <div className="absolute inset-0 z-30 bg-white flex flex-col border border-gray-150">
                <div className="p-5 border-b border-gray-150 flex items-center justify-between bg-gray-50 shrink-0 text-black">
                  <h4 className="font-sans font-extrabold text-sm sm:text-base text-black flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#0055FF] animate-pulse" />
                    {editingItem ? '포트폴리오 사례 수정' : '새로운 우수 포트폴리오 생성'}
                  </h4>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="w-8 h-8 rounded-none bg-white border border-gray-200 text-black hover:bg-gray-100 flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-left bg-white text-black">
                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-150 text-red-650 text-xs font-mono">
                      ⚠ {formError}
                    </div>
                  )}

                  {/* Category & Accent Color */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">수행 카테고리 *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                      >
                        <option value="Instagram Feed">Instagram Feed</option>
                        <option value="Reels Thumbnail">Reels Thumbnail</option>
                        <option value="Promotion Design">Promotion Design</option>
                        <option value="Cafe Marketing">Cafe Marketing</option>
                        <option value="Furniture Brand">Furniture Brand</option>
                        <option value="Church Contents">Church Contents</option>
                        <option value="Book Curation">Book Curation</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">브랜드 식별 테마 색상 *</label>
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-full h-9 p-1 bg-white border border-gray-200 focus:outline-none cursor-pointer rounded-none"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">포트폴리오 타이틀 제목 *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="자이언트가구 복원소 SNS 리디자인"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                    />
                  </div>

                  {/* Client Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">클라이언트 / 기업 명칭 *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="자이언트 캐비닛 가구소리점"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                    />
                  </div>

                  {/* Portfolio Image Gallery Segment */}
                  <div className="space-y-3 p-4 bg-gray-50 border border-gray-200">
                    <div>
                      <h4 className="text-xs font-bold text-black flex items-center gap-1.5 font-sans">
                        <span>🖼️</span> 포트폴리오 이미지 라이브러리 (여러 장 지원)
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 font-sans leading-tight">
                        컴퓨터의 사진 파일들을 원하는 대로 추가해 보세요. 첫 번째 이미지가 대표 썸네일(Cover)로 자동 지정됩니다.
                      </p>
                    </div>

                    {/* Image Previews & Ordering */}
                    {images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                        {images.map((img, index) => (
                          <div key={index} className="relative group/thumb aspect-square bg-white border border-gray-200 p-1 flex flex-col justify-between overflow-hidden shadow-sm">
                            <div className="relative w-full h-[75%] overflow-hidden bg-gray-100 flex items-center justify-center">
                              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              {index === 0 && (
                                <span className="absolute top-1 left-1 bg-[#E5A300] text-neutral-950 text-[8px] font-mono font-extrabold px-1.5 py-0.5 uppercase tracking-wider shadow-md">
                                  대표 COVER
                                </span>
                              )}
                              <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[8px] font-mono px-1 py-0.5">
                                #{index + 1}
                              </span>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-1">
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => {
                                    const next = [...images];
                                    const temp = next[index];
                                    next[index] = next[index - 1];
                                    next[index - 1] = temp;
                                    setImages(next);
                                  }}
                                  className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30 text-[9px] font-bold"
                                  title="순서 앞으로"
                                >
                                  ◀
                                </button>
                                <button
                                  type="button"
                                  disabled={index === images.length - 1}
                                  onClick={() => {
                                    const next = [...images];
                                    const temp = next[index];
                                    next[index] = next[index + 1];
                                    next[index + 1] = temp;
                                    setImages(next);
                                  }}
                                  className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30 text-[9px] font-bold"
                                  title="순서 뒤로"
                                >
                                  ▶
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setImages(images.filter((_, i) => i !== index));
                                }}
                                className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-1 py-0.5 text-[9px] font-bold font-mono transition-colors"
                                title="이미지 삭제"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 border border-dashed border-gray-200 bg-white text-gray-400 text-xs font-medium">
                        등록된 이미지가 없습니다. 아래에서 이미지들을 추가해 주세요. (자동 목업 렌더링)
                      </div>
                    )}

                    {/* Add Image Section */}
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex border border-gray-200 p-0.5 bg-gray-50 rounded-none mb-3">
                        <button
                          type="button"
                          onClick={() => setImageMethod('file')}
                          className={`flex-1 py-1.5 text-center text-xs font-bold transition-all ${
                            imageMethod === 'file'
                              ? 'bg-[#E5A300] text-neutral-950 shadow-sm'
                              : 'text-gray-550 hover:text-black'
                          }`}
                        >
                          내 컴퓨터에서 이미지 순차 추가
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageMethod('url')}
                          className={`flex-1 py-1.5 text-center text-xs font-bold transition-all ${
                            imageMethod === 'url'
                              ? 'bg-[#E5A300] text-neutral-950 shadow-sm'
                              : 'text-gray-550 hover:text-black'
                          }`}
                        >
                          외부 이미지 주소(URL) 추가
                        </button>
                      </div>

                      {imageMethod === 'file' ? (
                        <div className="space-y-3">
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (e.dataTransfer.files) {
                                Array.from(e.dataTransfer.files).forEach((file: File) => {
                                  if (file.type.startsWith('image/')) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      setImages(prev => [...prev, reader.result as string]);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                });
                              }
                            }}
                            className="border-2 border-dashed border-gray-250 hover:border-[#E5A300] bg-white p-6 text-center select-none cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 group"
                          >
                            <input
                              type="file"
                              id="portfolio-file-upload-input"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                if (e.target.files) {
                                  Array.from(e.target.files).forEach((file: File) => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      setImages(prev => [...prev, reader.result as string]);
                                    };
                                    reader.readAsDataURL(file);
                                  });
                                }
                              }}
                              className="hidden"
                            />
                            <label
                              htmlFor="portfolio-file-upload-input"
                              className="w-full h-full cursor-pointer flex flex-col items-center justify-center gap-2"
                            >
                              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-450 group-hover:text-[#E5A300] group-hover:border-[#E5A300] transition-all">
                                <Upload className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs font-bold text-black font-sans">
                                  여기에 이미지들을 드래그앤드롭하거나 클릭하여 여러 장 선택
                                </p>
                                <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                                  여러 사진을 한 번에 다량 첨부할 수 있습니다.
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="portfolio-url-input"
                            placeholder="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format"
                            className="flex-1 px-3.5 py-2 bg-white border border-gray-200 focus:border-[#E5A300] focus:outline-none text-black rounded-none font-mono text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('portfolio-url-input') as HTMLInputElement;
                              if (input && input.value.trim() !== '') {
                                setImages(prev => [...prev, input.value.trim()]);
                                input.value = '';
                              }
                            }}
                            className="px-4 py-2 bg-[#E5A300] hover:bg-amber-600 transition-colors text-neutral-950 font-bold text-xs"
                          >
                            추가
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Before Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">수정 전 원인 및 문제 분석 (Before) *</label>
                    <textarea
                      rows={2}
                      value={beforeDesc}
                      onChange={(e) => setBeforeDesc(e.target.value)}
                      placeholder="예) 보정 없는 수리 사진들을 그대로 올려 감성 유저들의 시선을 잡지 못하고 방치됨."
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black leading-relaxed resize-none rounded-none"
                    ></textarea>
                  </div>

                  {/* After Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">리뉴얼 설계 및 톤앤매너 고도화 (After) *</label>
                    <textarea
                      rows={2}
                      value={afterDesc}
                      onChange={(e) => setAfterDesc(e.target.value)}
                      placeholder="예) 우드 브라운 색상 정립 및 Before/After 를 정사 배합 카드뉴스로 구성하여 가치를 보존함."
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black leading-relaxed resize-none rounded-none"
                    ></textarea>
                  </div>

                  {/* Design Intent */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">정밀 디자인 기획의도 (Design Intent)</label>
                    <textarea
                      rows={2}
                      value={designIntent}
                      onChange={(e) => setDesignIntent(e.target.value)}
                      placeholder="예) 가구 고유의 상처 회복 포트를 비주얼 최우선에 정렬하고, 문학적 문구 배치를 통해 신조를 배가함."
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black leading-relaxed resize-none rounded-none"
                    ></textarea>
                  </div>

                  {/* Achievements List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">달성 성과 지표 (Achievements)</label>
                      <button
                        type="button"
                        onClick={handleAddAchievementField}
                        className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-black text-[10px] font-bold rounded-none flex items-center gap-1 transition-all font-mono"
                      >
                        + 성과 행 추가
                      </button>
                    </div>

                    <div className="space-y-2">
                      {achievements.map((ach, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="font-mono text-xs text-gray-400 font-bold">{index + 1}</span>
                          <input
                            type="text"
                            value={ach}
                            onChange={(e) => handleAchievementChange(index, e.target.value)}
                            placeholder="예) 리브랜딩 단 30일 이내에 신규 계약 수주 240% 이상 폭진 기여"
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black font-sans rounded-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveAchievementField(index)}
                            className="p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 rounded-none transition-colors cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Frame */}
                  <div className="pt-4 border-t border-gray-150 flex items-center justify-end gap-2 shrink-0 bg-gray-50 pb-6 px-6 -mx-6 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2.5 bg-white border border-gray-200 text-gray-550 hover:bg-gray-100 rounded-none text-xs font-bold font-mono transition-all cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0055FF] hover:bg-black text-white rounded-none text-xs font-bold flex items-center gap-1.5 transition-all shadow-xl font-mono uppercase tracking-widest cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      포트폴리오 저장하기
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* PROJECT FORM POPUP MODAL */}
            {isProjectFormOpen && (
              <div className="absolute inset-0 z-30 bg-white flex flex-col border border-gray-150">
                <div className="p-5 border-b border-gray-150 flex items-center justify-between bg-gray-50 shrink-0 text-black">
                  <h4 className="font-sans font-extrabold text-sm sm:text-base text-black flex items-center gap-1.5">
                    📁 운영 채널 경험 데이터 관리
                  </h4>
                  <button
                    onClick={() => setIsProjectFormOpen(false)}
                    className="w-8 h-8 rounded-none bg-white border border-gray-200 text-black hover:bg-gray-100 flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-left bg-white text-black">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">채널/프로젝트 타이틀 *</label>
                    <input
                      type="text"
                      required
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      placeholder="에코스토리 화장품 공식 채널"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider font-sans">부제목 / 수행 파트 *</label>
                    <input
                      type="text"
                      required
                      value={projSubtitle}
                      onChange={(e) => setProjSubtitle(e.target.value)}
                      placeholder="피드 비주얼 구축 및 광고 연동 대행"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">운영 기간 *</label>
                      <input
                        type="text"
                        required
                        value={projPeriod}
                        onChange={(e) => setProjPeriod(e.target.value)}
                        placeholder="2023.10 ~ 현재"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">업무 영역 (쉼표 구분) *</label>
                      <input
                        type="text"
                        required
                        value={projScope}
                        onChange={(e) => setProjScope(e.target.value)}
                        placeholder="콘텐츠 디자인, 광고 세팅"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">핵심 상세 설명 / 성과 문단 *</label>
                    <textarea
                      rows={4}
                      required
                      value={projDesc}
                      onChange={(e) => setProjDesc(e.target.value)}
                      placeholder="매력 포지셔닝 설계 기반 화장품 무드 극대화..."
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-[#0055FF] focus:outline-none text-black leading-relaxed resize-none rounded-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex items-center justify-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsProjectFormOpen(false)}
                      className="px-4 py-2.5 bg-white border border-gray-200 text-gray-550 hover:bg-gray-100 rounded-none text-xs font-bold font-mono cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0055FF] hover:bg-black text-white rounded-none text-xs font-bold flex items-center gap-1.5 font-mono cursor-pointer"
                    >
                      채널 저장하기
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* REVIEW FORM POPUP MODAL */}
            {isReviewFormOpen && (
              <div className="absolute inset-0 z-30 bg-white flex flex-col border border-gray-150">
                <div className="p-5 border-b border-gray-150 flex items-center justify-between bg-gray-50 shrink-0 text-black">
                  <h4 className="font-sans font-extrabold text-sm sm:text-base text-black flex items-center gap-1.5">
                    💬 클라이언트 추천 후기 데이터 관리
                  </h4>
                  <button
                    onClick={() => setIsReviewFormOpen(false)}
                    className="w-8 h-8 rounded-none bg-white border border-gray-200 text-black hover:bg-gray-100 flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveReview} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-left bg-white text-black">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">작성 대표님명 *</label>
                      <input
                        type="text"
                        required
                        value={revAuthor}
                        onChange={(e) => setRevAuthor(e.target.value)}
                        placeholder="김은희 대표님"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-100 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">기업/소속 명칭 *</label>
                      <input
                        type="text"
                        required
                        value={revRole}
                        onChange={(e) => setRevRole(e.target.value)}
                        placeholder="에코스토리 화장품"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-100 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">별점 평점 (1~5) *</label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        required
                        value={revRating}
                        onChange={(e) => setRevRating(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-100 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">후기 수집 형태 출처 *</label>
                      <select
                        value={revSource}
                        onChange={(e: any) => setRevSource(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-100 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                      >
                        <option value="kakaotalk">카카오톡 대화방 수집</option>
                        <option value="dm">인스타그램 DM 수집</option>
                        <option value="review">서면 추천장 수집</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">리뷰 상세 피드백 원문 *</label>
                    <textarea
                      rows={5}
                      required
                      value={revContent}
                      onChange={(e) => setRevContent(e.target.value)}
                      placeholder="매출이 약 420% 수직 상승하는 대형 사고가 났네요..."
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-100 focus:border-[#0055FF] focus:outline-none text-black leading-relaxed resize-none rounded-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex items-center justify-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsReviewFormOpen(false)}
                      className="px-4 py-2.5 bg-white border border-gray-100 text-gray-550 hover:bg-gray-100 rounded-none text-xs font-bold font-mono cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0055FF] hover:bg-black text-white rounded-none text-xs font-bold flex items-center gap-1.5 font-mono cursor-pointer"
                    >
                      후기 저장하기
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* FAQ FORM POPUP MODAL */}
            {isFaqFormOpen && (
              <div className="absolute inset-0 z-30 bg-white flex flex-col border border-gray-150">
                <div className="p-5 border-b border-gray-150 flex items-center justify-between bg-gray-50 shrink-0 text-black">
                  <h4 className="font-sans font-extrabold text-sm sm:text-base text-black flex items-center gap-1.5">
                    ❓ 자주 묻는 질문 FAQ 데이터 개정
                  </h4>
                  <button
                    onClick={() => setIsFaqFormOpen(false)}
                    className="w-8 h-8 rounded-none bg-white border border-gray-200 text-black hover:bg-gray-100 flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveFaq} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-left bg-white text-black">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider font-sans">질문 문구 (Question Title) *</label>
                    <input
                      type="text"
                      required
                      value={faqQuestion}
                      onChange={(e) => setFaqQuestion(e.target.value)}
                      placeholder="디자인 기획 원본 소스 파일(PSD/Figma)도 일체 무상 제공되나요?"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-100 focus:border-[#0055FF] focus:outline-none text-black rounded-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider font-sans">답변 설명 데이터 (Answer Area) *</label>
                    <textarea
                      rows={6}
                      required
                      value={faqAnswer}
                      onChange={(e) => setFaqAnswer(e.target.value)}
                      placeholder="예) 네, 저희는 작업 완료 후 가공이 용이하게 레이어가 완전히 살아있는 정밀 원본을 기본 무상 양도 형태로 인계합니다."
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-100 focus:border-[#0055FF] focus:outline-none text-black leading-relaxed resize-none rounded-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex items-center justify-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsFaqFormOpen(false)}
                      className="px-4 py-2.5 bg-white border border-gray-100 text-gray-550 hover:bg-gray-100 rounded-none text-xs font-bold font-mono cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0055FF] hover:bg-black text-white rounded-none text-xs font-bold flex items-center gap-1.5 font-mono cursor-pointer"
                    >
                      질문 저장하기
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* INLINE CUSTOM ALERT / CONFIRM MODAL OVERLAY */}
            {dialogOpen && (
              <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white border border-gray-200 shadow-2xl rounded-none p-6 max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-150 text-left text-black">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="text-xs sm:text-sm font-sans font-extrabold text-black uppercase tracking-wide">
                      {dialogTitle || '알림'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-sans">
                    {dialogMessage}
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDialogOpen(false);
                        setDialogAction(null);
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-none transition-all cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (dialogAction) dialogAction();
                        setDialogOpen(false);
                        setDialogAction(null);
                      }}
                      className={`px-4 py-2 text-white font-bold text-xs rounded-none transition-all cursor-pointer ${
                        dialogIsDanger ? 'bg-red-500 hover:bg-black' : 'bg-[#0055FF] hover:bg-black'
                      }`}
                    >
                      {dialogBtnText}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* INLINE CUSTOM FLOATING SUCCESS TOAST */}
            {toastMessage && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-55 bg-black/95 text-white border border-neutral-800 shadow-2xl px-5 py-3 rounded-none flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
                <span className="text-xs font-sans font-bold flex items-center gap-1.5">
                  <span className="text-emerald-400">✔</span> {toastMessage}
                </span>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
