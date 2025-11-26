import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 모바일 기준 390px 너비
      screens: {
        mobile: '390px',
      },
      maxWidth: {
        mobile: '390px',
      },
      spacing: {
        // 모바일 최적화 간격
        safe: 'env(safe-area-inset-bottom)',
      },
      fontSize: {
        // 모바일 최적화 폰트 크기
        'mobile-xs': ['12px', '16px'],
        'mobile-sm': ['14px', '20px'],
        'mobile-base': ['16px', '24px'],
        'mobile-lg': ['18px', '28px'],
        'mobile-xl': ['20px', '28px'],
        'mobile-2xl': ['24px', '32px'],
      },
    },
  },
  plugins: [],
};

export default config;

