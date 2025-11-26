'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPetPage() {
  const router = useRouter();

  const handleAddPet = () => {
    // 반려동물 추가 페이지로 이동
    router.push('/signup/pet/add');
  };

  const handleComplete = () => {
    // 반려동물 등록 없이 완료
    const existingPets = localStorage.getItem('registeredPets');
    if (existingPets) {
      // 등록된 반려동물이 있으면 완료 페이지로
      router.push('/signup/pet/complete');
    } else {
      // 없으면 바로 메인으로
      console.log('회원가입 완료');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <header className="px-5 py-4">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {/* 프로그레스 바 */}
      <div className="h-1 bg-gray-100">
        <div className="h-full w-full bg-black"></div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-5 py-8 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">
          반려동물 정보를 등록해주세요
        </h1>

        {/* 반려동물 추가 카드 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm bg-gray-50 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[500px]">
            <button
              onClick={handleAddPet}
              className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 active:bg-gray-400 transition-colors"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 12v24M12 24h24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </button>
            <p className="text-gray-500 text-base">반려동물 추가</p>
          </div>
        </div>

        {/* 페이지 인디케이터 */}
        <div className="flex justify-center gap-2 my-6">
          <div className="w-2 h-2 rounded-full bg-black"></div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-5 pb-8">
        <button
          onClick={handleComplete}
          className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          나중에 등록하기
        </button>
      </div>
    </div>
  );
}

