'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Pet {
  id: number;
  image: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  neutered: boolean;
  birthDate: string;
  weight: string;
}

export default function PetCompletePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    // 실제로는 이전 페이지에서 전달받은 데이터를 사용
    // 임시 데모 데이터
    const demoData: Pet[] = [
      {
        id: 1,
        image: '/demo-pet.jpg',
        name: '약콩이',
        species: '강아지',
        breed: '래브라도 리트리버',
        gender: '남아',
        neutered: false,
        birthDate: '2019-07-24',
        weight: '9',
      },
    ];
    
    // localStorage나 state management에서 가져오기
    const savedPets = localStorage.getItem('registeredPets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    } else {
      setPets(demoData);
    }
  }, []);

  const handleComplete = () => {
    // 회원가입 완료 페이지로 이동
    router.push('/signup/success');
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    return `${years}세`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  if (pets.length === 0) {
    return null;
  }

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
      <div className="flex-1 px-5 py-8">
        <h1 className="text-2xl font-bold mb-8">
          반려동물 정보를 등록해주세요
        </h1>

        {/* 반려동물 카드 슬라이더 */}
        <div className="relative mb-8">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {pets.map((pet) => (
                <div key={pet.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    {/* 반려동물 이미지 */}
                    <div className="relative w-full aspect-square bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
                      {pet.image && pet.image !== '/demo-pet.jpg' ? (
                        <Image
                          src={pet.image}
                          alt={pet.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* 등록 날짜 */}
                      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs">
                        {new Date().toISOString().split('T')[0].replace(/-/g, '-')}
                      </div>

                      {/* 품종 */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {pet.breed}
                      </div>
                    </div>

                    {/* 반려동물 정보 */}
                    <div className="p-6 space-y-2">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold">{pet.name}</h3>
                        <span className="text-lg text-gray-600">{pet.gender}</span>
                      </div>
                      <p className="text-base text-gray-700">
                        생년월일 : {formatDate(pet.birthDate)} ({calculateAge(pet.birthDate)})
                      </p>
                      <p className="text-base text-gray-700">
                        몸무게 : {pet.weight}kg
                      </p>
                      <p className="text-base text-gray-700">
                        중성화 여부 : {pet.neutered ? 'O' : 'O'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 이전/다음 버튼 (2개 이상일 때만 표시) */}
          {pets.length > 1 && (
            <>
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
            </>
          )}
        </div>

        {/* 페이지 인디케이터 */}
        {pets.length > 1 && (
          <div className="flex justify-center gap-2 mb-8">
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
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="px-5 pb-8">
        <button
          onClick={handleComplete}
          className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          가입 및 반려동물 등록완료
        </button>
      </div>
    </div>
  );
}

