'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/Home/Footer';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const [showPurchaseSheet, setShowPurchaseSheet] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // 임시 상품 데이터
  const product = {
    id: productId,
    name: '닥터힐메디스 UK 1.5kg 유통기한 26년 12월',
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    stock: 3000,
    image: '/authlogo.png',
    productCode: '00000000000',
    productType: '/////////////////////',
    manufacturer: '/////////////////////',
    brand: '///////',
    origin: '/////////////////////',
    description: '안녕하세요. 동물병원입니다. 동물병원 전용제품 우리에 안티돔 레비드입니다. 유명인이 광고하는 제품이네요. 유통기간 27년 8월 최신 제품입니다.',
  };

  const handlePurchase = () => {
    setShowPurchaseSheet(true);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    alert('장바구니에 추가되었습니다.');
    setShowPurchaseSheet(false);
  };

  const handleBuyNow = () => {
    // 주문 정보를 localStorage에 저장 (실제로는 상태 관리 라이브러리나 API 사용)
    if (typeof window !== 'undefined') {
      localStorage.setItem('orderItem', JSON.stringify({
        productId: productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      }));
    }
    router.push('/order');
  };

  const totalPrice = product.price * quantity;

  const handleBackClick = () => {
    // 상품 탭으로 이동하기 위해 localStorage에 activeTab 설정
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', '상품');
    }
    router.push('/');
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex-shrink-0">
        <Header title="상품 상세" showBackButton={true} showIcons={true} onBackClick={handleBackClick} />
      </div>

      {/* 메인 컨텐츠 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto bg-white pt-14">
        {/* 상품 이미지 */}
        <div className="relative w-full bg-gradient-to-b from-gray-50 to-white px-6 pt-6 pb-8">
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 상품 기본 정보 */}
        <div className="px-5 pb-6">
          {/* 상품명 */}
          <h1 className="text-base font-semibold text-gray-900 mb-3 leading-tight">
            {product.name}
          </h1>

          {/* 가격 정보 */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.toLocaleString()}원
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
              <span className="text-base font-semibold text-blue-600">
                {product.discount}%
              </span>
            </div>
          </div>

          {/* 재고 */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm text-gray-600">{product.stock.toLocaleString()}원</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-2 bg-gray-100"></div>

        {/* 상품정보 */}
        <div className="px-5 py-6 bg-white">
          <h2 className="text-lg font-bold text-gray-900 mb-5">상품정보</h2>
          
          <div className="bg-white">
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-sm text-gray-600">상품 번호</span>
              <span className="text-sm text-gray-900 font-medium">{product.productCode}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-sm text-gray-600">상품상태</span>
              <span className="text-sm text-gray-900 font-medium">{product.productType}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-sm text-gray-600">제조사</span>
              <span className="text-sm text-gray-900 font-medium">{product.manufacturer}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-sm text-gray-600">브랜드</span>
              <span className="text-sm text-gray-900 font-medium">{product.brand}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-sm text-gray-600">원산지</span>
              <span className="text-sm text-gray-900 font-medium">{product.origin}</span>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* 하단 구매하기 버튼 - 고정 */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-gray-200">
        <button
          onClick={handlePurchase}
          className="w-full bg-black text-white text-base font-semibold py-4 rounded-lg active:bg-gray-800 transition-colors"
        >
          구매하기
        </button>
      </div>

      {/* Bottom Sheet Overlay */}
      {showPurchaseSheet && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowPurchaseSheet(false)}
          ></div>

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 max-w-mobile mx-auto bg-white rounded-t-3xl z-50 animate-slide-up">
            {/* 핸들 바 */}
            <div className="flex justify-center pt-4 pb-5">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* 수량 선택 */}
            <div className="px-5 pb-4">
              <div className="flex items-center justify-between pb-5 border-b border-gray-200">
                <span className="text-base font-medium text-gray-900">수량 선택</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-9 h-9 rounded border border-gray-300 flex items-center justify-center active:bg-gray-100"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-lg font-medium text-gray-900 min-w-[24px] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-9 h-9 rounded border border-gray-300 flex items-center justify-center active:bg-gray-100"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* 총 수량 및 가격 */}
              <div className="flex items-center justify-between pt-5">
                <span className="text-base font-medium text-gray-900">총 수량 {quantity}개</span>
                <span className="text-2xl font-bold text-gray-900">{totalPrice.toLocaleString()}원</span>
              </div>
            </div>

            {/* 구분선 */}
            <div className="h-2 bg-gray-50"></div>

            {/* 구매 정보 */}
            <div className="px-5 py-4 space-y-2">
              <div className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 text-gray-700 font-medium">구매정보</span>
                <span className="text-gray-600">최대구매 5개 (1인)</span>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex gap-3 px-5 pb-6 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-gray-900 text-base font-semibold py-4 rounded-xl border-2 border-gray-900 active:bg-gray-50 transition-colors"
              >
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-black text-white text-base font-semibold py-4 rounded-xl active:bg-gray-800 transition-colors"
              >
                구매하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

