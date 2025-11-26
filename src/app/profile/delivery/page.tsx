'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';

export default function DeliveryManagePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipient: '',
    phone: '',
    zipCode: '',
    address: '',
    detailAddress: '',
  });

  // localStorage에서 배송지 정보 로드
  useEffect(() => {
    const storedDelivery = localStorage.getItem('deliveryInfo');
    if (storedDelivery) {
      setFormData(JSON.parse(storedDelivery));
    } else {
      // 초기 데이터
      const initialData = {
        recipient: '데카펫',
        phone: '010-1234-5678',
        zipCode: '06693',
        address: '서울 서초구 동작대로 20',
        detailAddress: '3층 (방배동)',
      };
      localStorage.setItem('deliveryInfo', JSON.stringify(initialData));
      setFormData(initialData);
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSearch = () => {
    // 실제로는 다음 주소 API 연동
    console.log('주소 검색');
    alert('주소 검색 기능은 추후 구현 예정입니다.');
  };

  const handleSubmit = () => {
    // 필수 필드 검증
    if (!formData.recipient || !formData.phone || !formData.zipCode || !formData.address || !formData.detailAddress) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // localStorage에 저장
    localStorage.setItem('deliveryInfo', JSON.stringify(formData));
    
    console.log('배송지 정보 저장:', formData);
    alert('배송지 정보가 저장되었습니다.');
    router.back();
  };

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <Header title="배송지 관리" showBackButton={true} showIcons={true} />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-5 py-6">
        <div className="space-y-8">
          {/* 수령인 */}
          <div>
            <label className="block mb-3 text-base font-medium">
              수령인
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => handleChange('recipient', e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black"
            />
          </div>

          {/* 연락처 */}
          <div>
            <label className="block mb-3 text-base font-medium">
              연락처
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black"
            />
          </div>

          {/* 주소 */}
          <div>
            <label className="block mb-3 text-base font-medium">
              주소
            </label>
            <div className="space-y-4">
              {/* 우편번호 */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  className="flex-1 border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black"
                  readOnly
                />
                <button
                  onClick={handleAddressSearch}
                  className="px-6 py-2 bg-gray-200 text-gray-700 text-base font-medium rounded-lg whitespace-nowrap"
                >
                  주소 검색
                </button>
              </div>

              {/* 기본 주소 */}
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black"
                readOnly
              />

              {/* 상세 주소 */}
              <input
                type="text"
                value={formData.detailAddress}
                onChange={(e) => handleChange('detailAddress', e.target.value)}
                className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="px-5 pb-8 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          저장
        </button>
      </div>
    </div>
  );
}

