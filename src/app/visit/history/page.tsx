'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';

export default function VisitHistoryPage() {
  const [activeTab, setActiveTab] = useState<'출장' | '처방 신청'>('출장');

  // 임시 출장 진료 내역 데이터
  const visitHistory = [
    {
      id: 1,
      date: '2025.11.1',
      items: [
        {
          id: 1,
          name: '넥스가드 스펙트라 츄어블정 초소형견용 xs 사이즈 1.35~3.5kg',
          price: 94500,
          quantity: 3,
          status: '미승인',
          statusColor: 'text-gray-600',
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
          name: '제다큐어 10mg 1.5~3kg 소형견 유통기한 27년 이후',
          price: 80000,
          quantity: 2,
          status: '승인',
          statusColor: 'text-blue-600',
          image: '/authlogo.png',
        },
        {
          id: 3,
          name: '아포펠 3.6mg 100정',
          price: 180000,
          quantity: 2,
          status: '거절',
          statusColor: 'text-red-600',
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
          name: '넥스가드 스펙트라 츄어블정 초소형견용 xs 사이즈 1.35~3.5kg',
          price: 94500,
          quantity: 3,
          status: '승인',
          statusColor: 'text-blue-600',
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
          name: '넥스가드 스펙트라 츄어블정 초소형건용 xs 사이즈 1.35~3.5kg',
          price: 94500,
          quantity: 3,
          status: '승인',
          statusColor: 'text-blue-600',
          image: '/authlogo.png',
        },
      ],
    },
  ];

  const prescriptionHistory = [
    {
      id: 1,
      date: '2025.11.1',
      items: [
        {
          id: 1,
          petName: '결막염',
          disease: '병명 : 결막염',
          files: 2,
          status: '미승인',
          statusColor: 'text-gray-600',
        },
      ],
    },
    {
      id: 2,
      date: '2025.10.26',
      items: [
        {
          id: 2,
          petName: '천식',
          disease: '병명 : 천식',
          files: 1,
          status: '승인',
          statusColor: 'text-blue-600',
        },
        {
          id: 3,
          petName: '백내장',
          disease: '병명 : 백내장',
          files: 1,
          status: '거절',
          statusColor: 'text-red-600',
        },
      ],
    },
    {
      id: 3,
      date: '2025.9.21',
      items: [
        {
          id: 4,
          petName: '결석',
          disease: '병명 : 결석',
          files: 2,
          status: '승인',
          statusColor: 'text-blue-600',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <div className="flex-shrink-0">
        <Header title="출장 진료 내역" showBackButton={true} showIcons={true} />
      </div>

      {/* 탭 바 */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 mt-14">
        <div className="flex">
          <button
            onClick={() => setActiveTab('출장')}
            className={`flex-1 py-4 text-base font-semibold transition-colors relative ${
              activeTab === '출장'
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
          >
            출장
            {activeTab === '출장' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('처방 신청')}
            className={`flex-1 py-4 text-base font-semibold transition-colors relative ${
              activeTab === '처방 신청'
                ? 'text-gray-900'
                : 'text-gray-400'
            }`}
          >
            처방 신청
            {activeTab === '처방 신청' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
            )}
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === '출장' ? (
          // 출장 탭
          <div>
            {visitHistory.map((order) => (
              <div key={order.id} className="mb-4 bg-white">
                <div className="px-5 py-4 bg-gray-50">
                  <h2 className="text-base font-bold text-gray-900">{order.date}</h2>
                </div>
                <div className="border-t border-gray-100">
                  {order.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`px-5 py-4 ${
                        index !== order.items.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.price.toLocaleString()}원 · {item.quantity}개
                          </p>
                          <p className={`text-sm font-medium ${item.statusColor}`}>
                            {item.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 처방 신청 탭
          <div>
            {prescriptionHistory.map((order) => (
              <div key={order.id} className="mb-6">
                <div className="px-5 py-3 bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-900">{order.date}</h2>
                </div>
                <div className="px-5 py-4 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4"
                    >
                      {/* PDF 아이콘 */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="2" fill="#DC2626"/>
                          <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PDF</text>
                        </svg>
                      </div>

                      {/* 정보 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {item.disease}
                        </h3>
                        <p className="text-sm text-gray-600">
                          첨부 파일 {item.files}개
                        </p>
                      </div>

                      {/* 상태 */}
                      <div className="flex-shrink-0">
                        <span className={`text-base font-semibold ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

