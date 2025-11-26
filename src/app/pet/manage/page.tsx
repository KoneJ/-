'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

interface Pet {
  id: number;
  name: string;
  image: string;
  birthDate: string;
  age: string;
  weight: string;
  gender: string;
  neutered: boolean;
  breed: string;
  species: string;
  registrationDate: string;
}

export default function PetManagePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pets, setPets] = useState<Pet[]>([]);

  // localStorage에서 반려동물 데이터 로드
  useEffect(() => {
    const storedPets = localStorage.getItem('pets');
    if (storedPets) {
      setPets(JSON.parse(storedPets));
    } else {
      // 초기 데이터 설정
      const initialPets: Pet[] = [
        {
          id: 1,
          name: '약콩이',
          image: '/authlogo.png',
          birthDate: '2019년 7월 24일',
          age: '7세',
          weight: '9kg',
          gender: '남아',
          neutered: true,
          breed: '래브라도 리트리버',
          species: '강아지',
          registrationDate: '2024-10-9-309104',
        },
        {
          id: 2,
          name: '겨울이',
          image: '/authlogo.png',
          birthDate: '2020년 3월 15일',
          age: '4세',
          weight: '7kg',
          gender: '여아',
          neutered: true,
          breed: '골든 리트리버',
          species: '강아지',
          registrationDate: '2024-10-10-123456',
        },
        {
          id: 3,
          name: '감콩이',
          image: '/authlogo.png',
          birthDate: '2021년 11월 8일',
          age: '3세',
          weight: '12kg',
          gender: '남아',
          neutered: false,
          breed: '시바견',
          species: '강아지',
          registrationDate: '2024-10-11-789012',
        },
      ];
      localStorage.setItem('pets', JSON.stringify(initialPets));
      setPets(initialPets);
    }
  }, []);

  const currentPet = pets[currentIndex];

  const handleAddPet = () => {
    router.push('/pet/add');
  };

  const handleEditPet = () => {
    router.push(`/pet/edit?id=${currentPet.id}`);
  };

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 */}
      <Header title="반려동물 정보 관리" showBackButton={true} />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col justify-center px-5 py-6">
        {/* 반려동물 카드 슬라이더 */}
        <div className="relative mb-6">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {pets.map((pet) => (
                <div key={pet.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                    {/* 반려동물 이미지 */}
                    <div className="relative w-full aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
                      <Image
                        src={pet.image}
                        alt={pet.name}
                        fill
                        className="object-cover"
                      />
                      
                      {/* 등록 날짜 */}
                      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
                        {pet.registrationDate}
                      </div>

                      {/* 품종 */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {pet.breed}
                      </div>
                    </div>

                    {/* 반려동물 정보 */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{pet.name}</h3>
                        <span className="text-base text-gray-600">{pet.gender}</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        생년월일 : {pet.birthDate} ({pet.age})
                      </p>
                      <p className="text-sm text-gray-700">
                        몸무게 : {pet.weight}
                      </p>
                      <p className="text-sm text-gray-700">
                        중성화 여부 : {pet.neutered ? 'O' : 'X'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 이전/다음 버튼 */}
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          {currentIndex < pets.length - 1 && (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* 페이지 인디케이터 */}
        <div className="flex justify-center gap-2 mb-6">
          {pets.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="bg-white px-5 py-4 grid grid-cols-2 gap-3 border-t border-gray-200">
        <button 
          onClick={handleAddPet}
          className="bg-black text-white text-base font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          추가 반려동물 등록
        </button>
        <button 
          onClick={handleEditPet}
          className="bg-black text-white text-base font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          정보 수정
        </button>
      </div>
    </div>
  );
}

