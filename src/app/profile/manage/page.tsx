'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';

export default function ProfileManagePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    nickname: '데카펫',
    phone: '010-1234-5678',
    password: '********',
    recipient: '데카펫',
    deliveryPhone: '010-1234-5678',
    address: '[06693] 서울 서초구 동작대로 20 3층(방배동)',
  });

  // localStorage에서 회원 정보 및 배송지 정보 로드
  useEffect(() => {
    // 회원 정보 로드
    const storedProfile = localStorage.getItem('profileInfo');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfileData(prev => ({
        ...prev,
        nickname: profile.nickname || prev.nickname,
        phone: profile.phone || prev.phone,
      }));
    }

    // 배송지 정보 로드
    const storedDelivery = localStorage.getItem('deliveryInfo');
    if (storedDelivery) {
      const delivery = JSON.parse(storedDelivery);
      setProfileData(prev => ({
        ...prev,
        recipient: delivery.recipient || prev.recipient,
        deliveryPhone: delivery.phone || prev.deliveryPhone,
        address: `[${delivery.zipCode}] ${delivery.address} ${delivery.detailAddress}`,
      }));
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white">
      {/* 헤더 */}
      <Header title="내 정보 관리" showBackButton={true} showIcons={true} />

      {/* 메인 컨텐츠 */}
      <div className="flex-1">
        {/* 회원정보 섹션 */}
        <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">회원정보</h2>
            <button 
              onClick={() => router.push('/profile/edit')}
              className="text-base text-gray-500 flex items-center gap-1"
            >
              회원정보 관리
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-base text-gray-500 w-24">고객명</span>
              <span className="text-base text-gray-900 font-medium">{profileData.nickname}</span>
            </div>
            <div className="flex items-center">
              <span className="text-base text-gray-500 w-24">연락처</span>
              <span className="text-base text-gray-900 font-medium">{profileData.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="text-base text-gray-500 w-24">비밀번호</span>
              <span className="text-base text-gray-900 font-medium">{profileData.password}</span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-2 bg-gray-100"></div>

        {/* 배송지 관리 섹션 */}
        <div className="px-5 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">배송지 관리</h2>
            <button 
              onClick={() => router.push('/profile/delivery')}
              className="text-base text-gray-500 flex items-center gap-1"
            >
              배송지 관리
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-base text-gray-500 w-24">수령인</span>
              <span className="text-base text-gray-900 font-medium">{profileData.recipient}</span>
            </div>
            <div className="flex items-center">
              <span className="text-base text-gray-500 w-24">연락처</span>
              <span className="text-base text-gray-900 font-medium">{profileData.deliveryPhone}</span>
            </div>
            <div className="flex items-start">
              <span className="text-base text-gray-500 w-24 flex-shrink-0">주소</span>
              <span className="text-base text-gray-900 font-medium flex-1">{profileData.address}</span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-2 bg-gray-100"></div>

        {/* 기타 메뉴 */}
        <div className="px-5 py-4">
          <button 
            onClick={() => router.push('/terms')}
            className="w-full py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded-lg flex items-center justify-between"
          >
            <span>이용약관</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={() => router.push('/privacy')}
            className="w-full py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded-lg flex items-center justify-between"
          >
            <span>개인정보 처리방침</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

