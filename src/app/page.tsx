'use client';

import { useState, useEffect } from 'react';
import HomeHeader from '@/components/Home/Header';
import TabBar from '@/components/Home/TabBar';
import MainBanner from '@/components/Home/MainBanner';
import ProductSection from '@/components/Home/ProductSection';
import Footer from '@/components/Home/Footer';
import ProductsTab from '@/components/Home/ProductsTab';
import VisitTab from '@/components/Home/VisitTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('전체');

  useEffect(() => {
    // localStorage에서 activeTab 확인
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('activeTab');
      if (savedTab) {
        setActiveTab(savedTab);
        localStorage.removeItem('activeTab'); // 사용 후 삭제
      }
    }
  }, []);

  const foodProducts = [
    {
      id: 1,
      name: '닥터클로이드 뉴트리션 LK 1.5kg 유...',
      price: 25000,
      originalPrice: 30000,
      discount: 19,
      image: '/products/food1.jpg',
    },
    {
      id: 2,
      name: '로얄캐닌 아이보브절럴러처방식...',
      price: 23500,
      originalPrice: 28000,
      discount: 16,
      image: '/products/food2.jpg',
    },
    {
      id: 3,
      name: '힐스힐스 USF 1.5kg 유통기...',
      price: 26000,
      originalPrice: 32000,
      discount: 19,
      image: '/products/food3.jpg',
    },
    {
      id: 4,
      name: '시그니처라이어 다+에어(멀티...',
      price: 29000,
      originalPrice: 32000,
      discount: 9,
      image: '/products/food4.jpg',
    },
  ];

  const medicineProducts = [
    {
      id: 5,
      name: '넥스가드 스펙트라 츄어블...',
      price: 31500,
      originalPrice: 63000,
      discount: 50,
      image: '/products/medicine1.jpg',
    },
    {
      id: 6,
      name: '프론트라인 콤보',
      price: 0,
      originalPrice: 0,
      discount: 0,
      image: '/products/medicine2.jpg',
    },
    {
      id: 7,
      name: '제품명',
      price: 0,
      originalPrice: 0,
      discount: 0,
      image: '/products/medicine3.jpg',
    },
    {
      id: 8,
      name: '하트가드플러스',
      price: 0,
      originalPrice: 0,
      discount: 0,
      image: '/products/medicine4.jpg',
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white">
      <HomeHeader
        onHomeClick={() => setActiveTab('전체')}
        onCalendarClick={() => setActiveTab('출장 진료')}
      />

      <main className="pt-14">
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === '전체' && (
          <>
            <MainBanner />

            <div className="h-2 bg-gray-100"></div>

            <ProductSection title="사료" products={foodProducts} />

            <div className="h-2 bg-gray-100"></div>

            <ProductSection title="의약품" products={medicineProducts} />
          </>
        )}

        {activeTab === '상품' && (
          <ProductsTab />
        )}

        {activeTab === '출장 진료' && (
          <VisitTab />
        )}

        <Footer />
      </main>
    </div>
  );
}

