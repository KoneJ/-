'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * 모바일 최적화 버튼 컴포넌트
 * 최소 터치 영역 44px 보장
 */
export default function MobileButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}: MobileButtonProps) {
  const baseStyles = 'mobile-button rounded-lg font-medium transition-colors active:scale-95';

  const variantStyles = {
    primary: 'bg-gray-400 text-white active:bg-gray-500 disabled:bg-gray-300',
    secondary: 'bg-gray-200 text-gray-800 active:bg-gray-300 disabled:bg-gray-100',
    outline: 'border-2 border-gray-400 text-gray-400 active:bg-gray-50 disabled:border-gray-300 disabled:text-gray-300',
    text: 'text-gray-400 active:bg-gray-50 disabled:text-gray-300',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-mobile-sm',
    md: 'px-4 py-3 text-mobile-base',
    lg: 'px-6 py-4 text-mobile-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

