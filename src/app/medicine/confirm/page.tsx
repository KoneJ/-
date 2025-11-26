'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

export default function MedicineConfirmPage() {
  const router = useRouter();
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('prescriptionItem');
      if (data) {
        setPrescriptionData(JSON.parse(data));
      } else {
        router.push('/');
      }
    }
  }, [router]);

  if (!prescriptionData) {
    return null;
  }

  const questions = [
    {
      id: 1,
      title: '아이와 사람/개지 이동할 시 아이와의 스트레스로 인해 진료를 받기 어려운 질환이 신경질적이고, 공격적인 성격의 아이는 유안엠버드는 없었으며, 안스타 펫독 안내 사항을 모두 읽어보고 숙지하셨나요? (필요하시면 다시 보내드립니다.',
    },
    {
      id: 2,
      title: '지난 3개월 동안 기생충 예방약(넥스가드)를 매달 한 번씩 복용하였나요?',
    },
    {
      id: 3,
      title: '현재까지 기생충 예방약(넥스가드) 처치 후 부작용은 전혀 없었나요?',
    },
    {
      id: 4,
      title: '지난 1년 동안 주기적으로 동물병원을 방문하여 아이가 매우 건강하다는 수의사의 진단을 받았나요?',
    },
    {
      id: 5,
      title: '입금자 본인 신분증을 지참하고, 아이를 이동장에 넣어오셔야 한다는 사실 확인하셨나요?',
    },
  ];

  const handleConfirm = () => {
    alert('처방 신청이 완료되었습니다.');
    localStorage.removeItem('prescriptionItem');
    router.push('/');
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex-shrink-0">
        <Header title="데카펫" showBackButton={false} showIcons={true} />
      </div>

      {/* 메인 컨텐츠 - 스크롤 가능 */}
      <div className="flex-1 overflow-y-auto px-5 py-6 pt-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">신청 완료</h1>

        {/* 상품 정보 */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              <Image
                src={prescriptionData.image}
                alt={prescriptionData.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {prescriptionData.name}
              </h3>
              <p className="text-sm text-gray-600">{prescriptionData.quantity}개</p>
            </div>
          </div>
        </div>

        {/* 금액 정보 */}
        <div className="mb-6">
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span className="text-base text-gray-700">처방 개월 수</span>
            <span className="text-base font-medium text-gray-900">18개월</span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span className="text-base text-gray-700">총 수량 {prescriptionData.quantity}개</span>
            <span className="text-base font-medium text-gray-900">
              {prescriptionData.totalPrice.toLocaleString()}원
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-b-2 border-gray-900">
            <span className="text-lg font-bold text-gray-900">처방 금액</span>
            <span className="text-xl font-bold text-gray-900">
              {prescriptionData.totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 현금영수증 신청 */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-900 mb-4">현금영수증 신청</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-base text-gray-900">{prescriptionData.phoneNumber}</p>
          </div>
        </div>

        {/* 문진 확인 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">문진 확인</h3>

          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-3">
                <button
                  onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                  className="w-full flex items-start justify-between gap-3 text-left"
                >
                  <span className="text-base text-gray-900 flex-1">
                    {index + 1}. {question.title}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`flex-shrink-0 transition-transform ${
                      expandedQuestion === question.id ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {expandedQuestion === question.id && (
                  <div className="mt-3 pl-4 text-sm text-gray-600">
                    답변: {prescriptionData.surveyAnswers[`q${question.id}`]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 확인 버튼 - 고정 */}
      <div className="flex-shrink-0 px-5 pb-6 pt-4 bg-white border-t border-gray-100">
        <button
          onClick={handleConfirm}
          className="w-full bg-black text-white text-base font-semibold py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}

