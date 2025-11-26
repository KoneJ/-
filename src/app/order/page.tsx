'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

export default function OrderPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState({
    recipient: '데카펫',
    phone: '010-1234-5678',
    address: '[06693] 서울 서초구 동작대로 203층(방배...',
  });

  const [cartCheckoutData, setCartCheckoutData] = useState<any>(null);

  // localStorage에서 배송지 정보 및 장바구니 결제 정보 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 배송지 정보
      const deliveryInfo = localStorage.getItem('deliveryInfo');
      if (deliveryInfo) {
        const info = JSON.parse(deliveryInfo);
        setOrderData({
          recipient: info.recipient || '데카펫',
          phone: info.deliveryPhone || '010-1234-5678',
          address: info.address || '[06693] 서울 서초구 동작대로 203층(방배...',
        });
      }

      // 장바구니에서 넘어온 데이터 확인
      const cartData = localStorage.getItem('cartCheckout');
      if (cartData) {
        setCartCheckoutData(JSON.parse(cartData));
        // 사용 후 삭제
        localStorage.removeItem('cartCheckout');
      } else {
        // 단일 상품 주문 데이터 확인
        const singleOrderData = localStorage.getItem('orderItem');
        if (singleOrderData) {
          const item = JSON.parse(singleOrderData);
          // 단일 상품을 장바구니 형식으로 변환
          setCartCheckoutData({
            items: [item],
            totalProductPrice: item.price * item.quantity,
            totalDiscount: 0,
            shippingFee: item.shippingFee || 4000,
            totalPrice: (item.price * item.quantity) + (item.shippingFee || 4000),
          });
        }
      }
    }
  }, []);

  // 기본 데이터 (장바구니나 단일 상품 데이터가 없을 때)
  const defaultOrderItem = {
    id: 1,
    name: '닥터힐메디스 UK 1.5kg 유통기한 26년 12월',
    quantity: 3,
    price: 25000,
    shippingFee: 4000,
    image: '/authlogo.png',
  };

  const orderItems = cartCheckoutData?.items || [defaultOrderItem];
  const totalProductPrice = cartCheckoutData?.totalProductPrice || (defaultOrderItem.price * defaultOrderItem.quantity);
  const discount = cartCheckoutData?.totalDiscount || 15000;
  const shippingFee = cartCheckoutData?.shippingFee || defaultOrderItem.shippingFee;
  const totalPrice = cartCheckoutData?.totalPrice || (totalProductPrice - discount + shippingFee);

  const handlePayment = () => {
    alert('결제 연동시 오픈 예정입니다.');
  };

  const handleDeliveryManage = () => {
    router.push('/profile/delivery');
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex-shrink-0">
        <Header title="주문/결제" showBackButton={true} showIcons={true} />
      </div>

      {/* 메인 컨텐츠 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* 배송지 섹션 */}
        <div className="px-5 py-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">배송지</h2>
            <button
              onClick={handleDeliveryManage}
              className="text-sm text-gray-500 flex items-center gap-1"
            >
              배송지 관리
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-sm text-gray-600 w-16 flex-shrink-0">수령인</span>
              <span className="text-sm text-gray-900">{orderData.recipient}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-sm text-gray-600 w-16 flex-shrink-0">연락처</span>
              <span className="text-sm text-gray-900">{orderData.phone}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-sm text-gray-600 w-16 flex-shrink-0">주소</span>
              <span className="text-sm text-gray-900 flex-1">{orderData.address}</span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-2 bg-gray-100"></div>

        {/* 주문 상품 */}
        <div className="px-5 py-6 bg-white">
          {orderItems.map((item: any, index: number) => (
            <div key={item.id || index} className={`flex gap-4 ${index > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
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
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.quantity}개
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div className="h-2 bg-gray-100"></div>

        {/* 결제 금액 */}
        <div className="px-5 py-6 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700">총 상품 가격</span>
              <span className="text-base text-gray-900">{totalProductPrice.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700">할인 금액</span>
              <span className="text-base text-red-500">-{discount.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-700">배송비</span>
              <span className="text-base text-gray-900">{shippingFee.toLocaleString()}원</span>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">총 결제 금액</span>
                <span className="text-2xl font-bold text-gray-900">{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 여백 */}
        <div className="h-20"></div>
      </div>

      {/* 하단 결제하기 버튼 - 고정 */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-gray-200">
        <button
          onClick={handlePayment}
          className="w-full bg-black text-white text-base font-semibold py-4 rounded-lg active:bg-gray-800 transition-colors"
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

