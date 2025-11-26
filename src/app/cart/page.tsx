'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

export default function CartPage() {
  const router = useRouter();

  // 장바구니 상품 데이터
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '닥터힐메디스 UK 1.5kg 유통기한 26년 12월',
      price: 75000,
      originalPrice: 90000,
      discount: 17,
      quantity: 3,
      image: '/authlogo.png',
      selected: true,
    },
    {
      id: 2,
      name: '시그니처바이디 디-에이 알파 유통기한 27년 4월',
      price: 58000,
      originalPrice: 64000,
      discount: 9,
      quantity: 2,
      image: '/authlogo.png',
      selected: true,
    },
  ]);

  const FREE_SHIPPING_THRESHOLD = 100000; // 10만원
  const BASE_SHIPPING_FEE = 4000;
  
  const selectedItems = cartItems.filter(item => item.selected);
  const totalProductPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = selectedItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shippingFee = totalProductPrice >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING_FEE;
  const totalPrice = totalProductPrice + shippingFee;
  const amountForFreeShipping = FREE_SHIPPING_THRESHOLD - totalProductPrice;

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          if (newQuantity >= 1 && newQuantity <= 99) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const handleToggleSelect = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('선택된 상품이 없습니다.');
      return;
    }
    
    // 선택된 상품 정보를 localStorage에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartCheckout', JSON.stringify({
        items: selectedItems,
        totalProductPrice,
        totalDiscount,
        shippingFee,
        totalPrice,
      }));
    }
    router.push('/order');
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex-shrink-0">
        <Header title="장바구니" showBackButton={true} showIcons={true} />
      </div>

      {/* 메인 컨텐츠 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto bg-white pt-14">
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">장바구니가 비어있습니다.</p>
          </div>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={`px-5 py-4 ${
                  index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* 체크박스 */}
                  <button
                    onClick={() => handleToggleSelect(item.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center ${
                        item.selected
                          ? 'bg-black'
                          : 'bg-white border-2 border-gray-300'
                      }`}
                    >
                      {item.selected && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* 상품 이미지 */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* 상품 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1 pr-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex-shrink-0 p-1"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M18 6L6 18M6 6l12 12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* 가격 정보 */}
                    <div className="mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-gray-900">
                          {item.price.toLocaleString()}원
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {item.originalPrice.toLocaleString()}원
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                          {item.discount}%
                        </span>
                      </div>
                    </div>

                    {/* 수량 조절 */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center active:bg-gray-100"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M5 12h14"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <span className="text-base font-medium text-gray-900 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center active:bg-gray-100"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* 하단 여백 */}
        <div className="h-48"></div>
      </div>

      {/* 하단 결제 정보 - 고정 */}
      {cartItems.length > 0 && (
        <div className="flex-shrink-0 bg-white border-t border-gray-200">
          {/* 가격 정보 */}
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700">총 상품 가격</span>
              <span className="text-base text-gray-900">
                {totalProductPrice.toLocaleString()}원
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700">할인 금액</span>
              <span className="text-base text-red-500">
                -{totalDiscount.toLocaleString()}원
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700">배송비</span>
              <span className={`text-base ${shippingFee === 0 ? 'text-blue-600 font-semibold' : 'text-gray-900'}`}>
                {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
              </span>
            </div>
            {/* 무료 배송 안내 */}
            {amountForFreeShipping > 0 ? (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{amountForFreeShipping.toLocaleString()}원 더 담으면 무료배송</span>
              </div>
            ) : shippingFee === 0 && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>무료배송 조건 달성!</span>
              </div>
            )}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  총 결제 금액
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 결제하기 버튼 */}
          <div className="px-4 pb-4">
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white text-base font-semibold py-4 rounded-lg active:bg-gray-800 transition-colors"
            >
              결제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

