'use client';

import Banner from '@/components/Home/Banner';
import TopBar from '@/components/TopBar';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto">
      <TopBar />
      <Banner />
      <main className="px-4 py-6">
        <div className="flex flex-col gap-4">
          {/* 컨텐츠 추가 */}
        </div>
      </main>
    </div>
  );
}

