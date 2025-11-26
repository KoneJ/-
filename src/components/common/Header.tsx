'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Home/Sidebar';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showIcons?: boolean;
  onBackClick?: () => void;
  onHomeClick?: () => void;
  onCalendarClick?: () => void;
}

export default function Header({
  title = '데카펫',
  showBackButton = false,
  showIcons = true,
  onBackClick,
  onHomeClick,
  onCalendarClick
}: HeaderProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <>
      <header className="mobile-fixed-top px-4 py-3 flex items-center justify-between border-b border-gray-200 bg-white z-30">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {showBackButton && (
            <button onClick={handleBackClick} className="p-1 flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <h1
            onClick={() => {
              if (onHomeClick) {
                onHomeClick();
              } else {
                router.push('/');
              }
            }}
            className={`font-bold truncate cursor-pointer ${showBackButton ? 'text-base' : 'text-2xl'}`}
          >
            {title}
          </h1>
        </div>

        {showIcons && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => {
                if (onHomeClick) {
                  onHomeClick();
                } else {
                  router.push('/');
                }
              }}
              className="p-1.5"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (onCalendarClick) {
                  onCalendarClick();
                } else {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('activeTab', '출장 진료');
                  }
                  router.push('/');
                }
              }}
              className="p-1.5"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => router.push('/cart')}
              className="p-1.5 relative"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 rounded-full bg-gray-300"></div>
              </div>
            </button>
          </div>
        )}
      </header>

      {/* 사이드바 */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

