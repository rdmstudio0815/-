/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar, FolderHeart, Lock, RefreshCw, Menu, X } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ onAdminClick, isAdminLoggedIn, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: '가치 제안', href: '#why-me' },
    { name: '운영 경험', href: '#projects' },
    { name: '작업 프로세스', href: '#process' },
    { name: '리뷰', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-[#E5A300] flex items-center justify-center text-white font-sans font-black text-base shadow-sm group-hover:bg-black transition-colors">
            둥
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-base tracking-tight text-black flex items-center gap-1">
              둥근달스튜디오
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-[#E5A300] uppercase font-bold">SNS Content Designer</p>
          </div>
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold uppercase tracking-wider text-gray-600 hover:text-[#E5A300] transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTAS / ADMIN */}
        <div className="hidden md:flex items-center gap-4">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono bg-amber-50 text-[#E5A300] px-3 py-1.5 rounded-md border border-amber-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A300] animate-pulse"></span>
                관리자 모드
              </span>
              <button
                onClick={onLogout}
                className="text-[12px] font-bold text-gray-500 hover:text-black transition-colors"
                id="btn-logout"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-md transition-all title-admin"
              title="관리자 모드"
              id="btn-admin-trigger"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          <a
            href="#contact"
            className="text-[12px] font-bold uppercase tracking-wider bg-black text-white px-6 py-3 rounded-md hover:bg-[#E5A300] transition-all shadow-sm"
            id="nav-contact-btn"
          >
            디자인 의뢰하기
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex md:hidden items-center gap-2">
          {isAdminLoggedIn && (
            <span className="text-[10px] bg-amber-50 text-[#E5A300] px-2 py-1 rounded-md border border-amber-100 flex items-center gap-1">
              관리자
            </span>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV OVERLAY */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-white/98 border-b border-gray-200 shadow-xl z-50 py-6 px-8 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[15px] font-bold uppercase tracking-wider text-gray-800 hover:text-[#E5A300] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="h-px bg-gray-100 my-1"></div>
            <div className="flex flex-col gap-4">
              {isAdminLoggedIn ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-amber-50 text-[#E5A300] px-3 py-1.5 rounded-md border border-amber-100">
                    관리자 로그인 됨
                  </span>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="text-xs text-red-500 font-bold py-2"
                    id="btn-mobile-logout"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onAdminClick();
                    setIsOpen(false);
                  }}
                  className="text-left text-xs text-gray-500 hover:text-black font-bold py-2 flex items-center gap-1.5"
                  id="btn-mobile-admin"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E5A300]" /> 관리자 로그인
                </button>
              )}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-xs font-bold uppercase tracking-wider bg-black text-white py-3.5 rounded-md hover:bg-[#E5A300] transition-all"
                id="mobile-contact-btn"
              >
                디자인 의뢰하기
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
