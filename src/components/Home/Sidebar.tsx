'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Pet {
  id: number;
  name: string;
  image: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const [showPetModal, setShowPetModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(1);

  const pets: Pet[] = [
    { id: 1, name: '약콩이', image: '/authlogo.png' },
    { id: 2, name: '겨울이', image: '/authlogo.png' },
    { id: 3, name: '감콩이', image: '/authlogo.png' },
  ];

  const selectedPet = pets.find(pet => pet.id === selectedPetId) || pets[0];
  const otherPets = pets.filter(pet => pet.id !== selectedPetId);
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="relative w-full max-w-mobile h-full">
        {/* 딤드 배경 */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* 사이드바 - 왼쪽 여백 조정 */}
        <div className="absolute top-0 right-0 h-full w-[calc(100%-80px)] bg-white shadow-2xl overflow-y-auto">
          {/* X 버튼 - 최상단 우측 */}
          <div className="flex justify-end p-4">
            <button onClick={onClose} className="p-1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* 반려동물 프로필 섹션 */}
          <div className="px-4 pb-6">
            {/* 반려동물 이미지 리스트 - 가로 배치 */}
            <div className="flex items-center justify-between mb-5">
              {/* 왼쪽: 선택된 프로필 */}
              <button className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 border-3 border-blue-400">
                  <Image
                    src={selectedPet.image}
                    alt={selectedPet.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </button>

              {/* 오른쪽: 비선택 프로필들 + 더보기 버튼 */}
              <div className="flex items-center gap-2">
                {otherPets.slice(0, 2).map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => setSelectedPetId(pet.id)}
                    className="flex-shrink-0"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 border-2 border-gray-300">
                      <Image
                        src={pet.image}
                        alt={pet.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}

                {/* 더보기 버튼 */}
                <button
                  onClick={() => {
                    onClose();
                    router.push('/pet/manage');
                  }}
                  className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="6" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <circle cx="18" cy="12" r="2" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 반려동물 정보 */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{selectedPet.name}</h3>
              <div className="text-base text-gray-700 space-y-1">
                <p>7세 (2019.05.07)</p>
                <p>중성화O 남아 25kg</p>
              </div>
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-200 mb-6"></div>
          </div>

          {/* 메뉴 리스트 */}
          <nav className="px-5 space-y-1">
            <button
              onClick={() => {
                onClose();
                router.push('/profile/manage');
              }}
              className="w-full py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded-lg"
            >
              내 정보 관리
            </button>
            <button
              onClick={() => {
                onClose();
                router.push('/orders');
              }}
              className="w-full py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded-lg"
            >
              상품 주문 내역
            </button>
            <button
              onClick={() => {
                onClose();
                router.push('/visit/history');
              }}
              className="w-full py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded-lg"
            >
              출장 진료 내역
            </button>
            <button className="w-full py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded-lg">
              알림 (1)
            </button>
            <button
              onClick={() => {
                onClose();
                router.push('/report');
              }}
              className="w-full py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded-lg"
            >
              제보 게시판
            </button>
          </nav>

          {/* 하단 로그아웃 */}
          <div className="px-5 mt-8 mb-8">
            <button className="w-full py-4 text-left text-base text-gray-500 hover:bg-gray-50 transition-colors rounded-lg">
              로그아웃
            </button>
          </div>
        </div>

        {/* 반려동물 프로필 모달 */}
        {showPetModal && (
          <>
            {/* 모달 딤드 배경 */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setShowPetModal(false)}
            />

            {/* 모달 */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-20 max-h-[70vh] overflow-hidden">
              <div className="p-6">
                {/* 모달 제목 */}
                <h3 className="text-xl font-bold text-center mb-6">반려동물 프로필</h3>

                {/* 반려동물 리스트 */}
                <div className="space-y-4 mb-6">
                  {pets.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => {
                        setSelectedPetId(pet.id);
                        setShowPetModal(false);
                      }}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          <Image
                            src={pet.image}
                            alt={pet.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-lg font-medium">{pet.name}</span>
                      </div>
                      {selectedPetId === pet.id && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {/* 새로운 프로필 만들기 */}
                <button
                  onClick={() => {
                    setShowPetModal(false);
                    router.push('/pet/manage');
                  }}
                  className="w-full py-3 text-gray-500 text-base flex items-center justify-center gap-2"
                >
                  <span className="text-xl">+</span>
                  <span>새로운 프로필 만들기</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
