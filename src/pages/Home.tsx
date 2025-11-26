'use client';

import MainBanner from '@/components/Home/MainBanner';
import HomeHeader from '@/components/Home/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto">
      <HomeHeader />
      <MainBanner />
      <main className="px-4 py-6">
        <div className="flex flex-col gap-4">
          {/* 컨텐츠 추가 */}
        </div>
      </main>
    </div>
  );
}

