'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

export default function OrdersPage() {
  const router = useRouter();

  // 임시 주문 내역 데이터
  const orders = [
    {
      id: 1,
      date: '2025.11.1',
      items: [
        {
          id: 1,
          name: '닥터힐메디스 UK 1.5kg 유통기한 26년 12월',
          price: 75000,
          quantity: 3,
          status: '배송 준비 중',
          statusDetail: '배송 조회',
          image: '/authlogo.png',
        },
      ],
    },
    {
      id: 2,
      date: '2025.10.26',
      items: [
        {
          id: 2,
          name: '시그니처바이디 디-에이 알파 유통기한 27년 4월',
          price: 58000,
          quantity: 2,
          status: '배송 중',
          statusDetail: '배송 조회',
          image: '/authlogo.png',
        },
        {
          id: 3,
          name: '시그니처바이디 디-에이 알파 유통기한 27년 4월',
          price: 58000,
          quantity: 2,
          status: '배송 중',
          statusDetail: '배송 조회',
          image: '/authlogo.png',
        },
      ],
    },
    {
      id: 3,
      date: '2025.9.21',
      items: [
        {
          id: 4,
          name: '로얄캐닌 하이포알러제닉 스몰독 유통기한 27년 이후',
          price: 70500,
          quantity: 3,
          status: '배송 중',
          statusDetail: '배송 조회',
          image: '/authlogo.png',
        },
      ],
    },
    {
      id: 4,
      date: '2025.8.7',
      items: [
        {
          id: 5,
          name: '벨칸서 USF 1.5kg 유통기한 27년 1월',
          price: 26000,
          quantity: 1,
          status: '배송 중',
          statusDetail: '배송 조회',
          image: '/authlogo.png',
        },
      ],
    },
  ];

  const handleTrackingClick = () => {
    alert('배송 조회 기능 연동 후 오픈 예정입니다');
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex-shrink-0">
        <Header title="주문 내역" showBackButton={true} showIcons={true} />
      </div>

      {/* 메인 컨텐츠 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pt-14">
        {orders.map((order) => (
          <div key={order.id} className="mb-2">
            {/* 날짜 헤더 */}
            <div className="px-5 py-3 bg-white">
              <h2 className="text-base font-bold text-gray-900">{order.date}</h2>
            </div>

            {/* 주문 상품 목록 */}
            <div className="bg-white">
              {order.items.map((item, index) => (
                <div
                  key={item.id}
                  className={`px-5 py-4 ${
                    index !== order.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    {/* 상품 이미지 */}
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.price.toLocaleString()}원 · {item.quantity}개
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{item.status}</span>
                        <span className="text-gray-300">·</span>
                        <button
                          onClick={handleTrackingClick}
                          className="text-sm text-blue-600 font-medium"
                        >
                          [ {item.statusDetail} ]
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 하단 안내 메시지 */}
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">주문조회를 완료했습니다.</p>
        </div>
      </div>
    </div>
  );
}

