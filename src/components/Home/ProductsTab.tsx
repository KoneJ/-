'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductsTab() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('미승인');

  // 임시 상품 데이터 (상태 포함)
  const allProducts = [
    {
      id: 1,
      name: '벨칸서 USF 1.5kg 유통기한 27년 1월',
      price: 26000,
      image: '/authlogo.png',
      status: '신청 상품',
      statusColor: 'bg-[#81B78E]',
    },
    {
      id: 2,
      name: '로얄캐닌 하이포알러제닉 스몰독 유통기한 27년 이후',
      price: 23500,
      image: '/authlogo.png',
      status: '승인 대기 중',
      statusColor: 'bg-[#909090]',
    },
    {
      id: 3,
      name: '닥터힐메디스 UK 1.5kg 유통기한 26년 12월',
      price: 25000,
      image: '/authlogo.png',
      status: null,
      statusColor: null,
    },
    {
      id: 4,
      name: '로얄캐닌 하이포알러제닉 스몰독 유통기한 27년 이후',
      price: 23500,
      image: '/authlogo.png',
      status: '승인 거절',
      statusColor: 'bg-[#B68181]',
    },
    {
      id: 5,
      name: '시그니처바이디 디-에이 알파 유통기한 27년 4월',
      price: 29000,
      image: '/authlogo.png',
      status: null,
      statusColor: null,
    },
    {
      id: 6,
      name: '벨칸서 USF 1.5kg 유통기한 27년 1월',
      price: 26000,
      image: '/authlogo.png',
      status: '신청 상품',
      statusColor: 'bg-[#81B78E]',
    },
    {
      id: 7,
      name: '로얄캐닌 독 유통기한 27년 이후',
      price: 32000,
      image: '/authlogo.png',
      status: null,
      statusColor: null,
    },
    {
      id: 8,
      name: '닥터힐메디스 UK 1.5kg 유통기한 26년 12월',
      price: 25000,
      image: '/authlogo.png',
      status: '승인 대기 중',
      statusColor: 'bg-[#909090]',
    },
    {
      id: 9,
      name: '시그니처바이디 디-에이 알파 유통기한 27년 4월',
      price: 29000,
      image: '/authlogo.png',
      status: null,
      statusColor: null,
    },
    {
      id: 10,
      name: '벨칸서 USF 1.5kg 유통기한 27년 1월',
      price: 26000,
      image: '/authlogo.png',
      status: '승인 거절',
      statusColor: 'bg-[#B68181]',
    },
    {
      id: 11,
      name: '로얄캐닌 하이포알러제닉 스몰독 유통기한 27년 이후',
      price: 23500,
      image: '/authlogo.png',
      status: null,
      statusColor: null,
    },
    {
      id: 12,
      name: '닥터힐메디스 UK 1.5kg 유통기한 26년 12월',
      price: 25000,
      image: '/authlogo.png',
      status: '신청 상품',
      statusColor: 'bg-[#81B78E]',
    },
  ];

  const handleProductClick = (product: any) => {
    // 승인 대기 중이거나 승인 거절인 경우 클릭 불가
    if (product.status === '승인 대기 중' || product.status === '승인 거절') {
      return;
    }
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="bg-white">
      {/* 헤더 영역 */}
      <div className="px-5 py-5 flex items-center justify-between bg-white">
        <h2 className="text-xl font-bold text-gray-900">전체 상품</h2>
        <button 
          onClick={() => router.push('/product/apply')}
          className="flex items-center gap-2 px-5 py-2 rounded-2xl border border-gray-900 active:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-normal leading-none">+</span>
          <span className="text-base font-bold">상품신청</span>
        </button>
      </div>

      {/* 상품 그리드 */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {allProducts.map((product) => {
            const isDisabled = product.status === '승인 대기 중' || product.status === '승인 거절';
            
            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className={`${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {/* 상품 이미지 */}
                <div className={`relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-contain p-6 ${
                      product.status === '승인 거절' ? 'grayscale opacity-60' : ''
                    }`}
                  />
                  
                  {/* 상태 딱지 - 오른쪽 상단 (상태가 있을 때만 표시) */}
                  {product.status && (
                    <div className={`absolute top-2 right-2 ${product.statusColor} text-white text-xs font-medium px-4 py-1.5 rounded-2xl whitespace-nowrap shadow-md`}>
                      {product.status}
                    </div>
                  )}
                </div>

                {/* 상품 정보 */}
                <div>
                  <p className={`text-sm line-clamp-2 leading-snug mb-2 ${
                    isDisabled ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {product.name}
                  </p>
                  <p className={`text-lg font-bold ${
                    isDisabled ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

