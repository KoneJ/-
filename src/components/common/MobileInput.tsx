'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface MobileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

/**
 * 모바일 최적화 입력 필드
 * iOS 자동 줌 방지를 위해 font-size 16px 사용
 */
const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && <label className="block text-mobile-sm text-gray-700 mb-1 font-medium">{label}</label>}

        <input
          ref={ref}
          className={`mobile-input w-full px-4 py-3 border rounded-lg text-mobile-base
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:text-gray-500
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}`}
          {...props}
        />

        {error && <p className="mt-1 text-mobile-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

MobileInput.displayName = 'MobileInput';

export default MobileInput;

