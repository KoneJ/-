'use client';

import { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * 모바일 레이아웃 컴포넌트
 * 390px 기준 모바일 뷰를 제공합니다.
 */
export default function MobileLayout({ children, header, footer, className = '' }: MobileLayoutProps) {
  return (
    <div className={`min-h-screen w-full max-w-mobile mx-auto bg-white ${className}`}>
      {header && <div className="mobile-fixed-top">{header}</div>}

      <main className={`${header ? 'pt-14' : ''} ${footer ? 'pb-20' : ''}`}>{children}</main>

      {footer && <div className="mobile-fixed-bottom">{footer}</div>}
    </div>
  );
}

