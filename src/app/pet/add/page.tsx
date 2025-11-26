'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

interface Hospital {
  id: number;
  name: string;
  ownerName: string;
  relationship: 'owner' | 'guardian' | 'unknown';
}

export default function AddNewPetPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    image: '',
    species: '',
    name: '',
    breed: '',
    gender: '',
    neutered: false,
    birthDate: '',
    weight: '',
  });
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [breedSearch, setBreedSearch] = useState('');

  const breeds = [
    '품종을 모르겠습니다',
    '골든 리트리버',
    '그레이트 데인',
    '그레이트 피레니즈',
    '그레이하운드',
    '꼬똥 드 툴레아',
    '닥스훈트',
    '달마시안',
    '도베르만',
    '라브라도 리트리버',
    '말티즈',
    '푸들',
    '시바견',
  ];

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(breedSearch.toLowerCase())
  );

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBreedSelect = (breed: string) => {
    setFormData(prev => ({ ...prev, breed }));
    setShowBreedModal(false);
    setBreedSearch('');
  };

  const handleAddHospital = () => {
    const newHospital: Hospital = {
      id: Date.now(),
      name: '',
      ownerName: '',
      relationship: 'guardian',
    };
    setHospitals([...hospitals, newHospital]);
  };

  const handleRemoveHospital = (id: number) => {
    setHospitals(hospitals.filter(h => h.id !== id));
  };

  const handleHospitalChange = (id: number, field: keyof Hospital, value: string) => {
    setHospitals(hospitals.map(h => 
      h.id === id ? { ...h, [field]: value } : h
    ));
  };

  const handleSubmit = () => {
    // 필수 필드 검증
    if (!formData.species || !formData.name || !formData.breed || !formData.gender || !formData.birthDate || !formData.weight) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 나이 계산
    const calculateAge = (birthDate: string) => {
      const birth = new Date(birthDate);
      const today = new Date();
      const years = today.getFullYear() - birth.getFullYear();
      const months = today.getMonth() - birth.getMonth();
      
      if (years > 0) return `${years}세`;
      if (months > 0) return `${months}개월`;
      return '1개월 미만';
    };

    // 날짜 포맷 변환
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const formatRegistrationDate = () => {
      const now = new Date();
      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getTime()}`;
    };

    // localStorage에서 기존 데이터 가져오기
    const storedPets = localStorage.getItem('pets');
    const pets = storedPets ? JSON.parse(storedPets) : [];

    // 새 반려동물 데이터 생성
    const newPet = {
      id: Date.now(),
      name: formData.name,
      image: formData.image || '/authlogo.png',
      birthDate: formatDate(formData.birthDate),
      age: calculateAge(formData.birthDate),
      weight: `${formData.weight}kg`,
      gender: formData.gender,
      neutered: formData.neutered,
      breed: formData.breed,
      species: formData.species,
      registrationDate: formatRegistrationDate(),
      hospitals: hospitals,
    };

    // 배열에 추가
    pets.push(newPet);

    // localStorage에 저장
    localStorage.setItem('pets', JSON.stringify(pets));

    alert('반려동물이 등록되었습니다.');
    router.push('/pet/manage');
  };

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white flex flex-col relative">
      {/* 헤더 */}
      <Header title="추가 반려동물 등록" showBackButton={true} showIcons={true} />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-5 py-8 overflow-y-auto pb-32">
        <div className="space-y-8">
          {/* 반려동물 이미지 */}
          <div>
            <label className="block mb-3 text-base font-medium">
              반려동물 이미지
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm overflow-hidden relative"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="반려동물 이미지"
                  fill
                  className="object-cover"
                />
              ) : (
                <span>이미지 등록하기</span>
              )}
            </button>
          </div>

          {/* 반려동물 종류 */}
          <div>
            <label className="block mb-3">
              <span className="text-base font-medium">
                반려동물 종류<span className="text-red-500">*</span>
              </span>
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => handleChange('species', '강아지')}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-colors text-sm ${
                  formData.species === '강아지'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                강아지
              </button>
              <button
                onClick={() => handleChange('species', '고양이')}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-colors text-sm ${
                  formData.species === '고양이'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                고양이
              </button>
              <button
                onClick={() => handleChange('species', '그 외 동물')}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-colors text-sm ${
                  formData.species === '그 외 동물'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                그 외 동물
              </button>
            </div>
          </div>

          {/* 반려동물 이름 */}
          <div>
            <label className="block mb-3">
              <span className="text-base font-medium">
                반려동물 이름<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="반려동물 이름 입력*"
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* 품종 */}
          <div>
            <label className="block mb-3">
              <span className="text-base font-medium">
                품종<span className="text-red-500">*</span>
              </span>
            </label>
            <button
              onClick={() => setShowBreedModal(true)}
              className="w-full border-b border-gray-300 py-3 text-base text-left flex items-center justify-between"
            >
              <span className={formData.breed ? 'text-black' : 'text-gray-400'}>
                {formData.breed || '품종 입력'}
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* 성별 */}
          <div>
            <label className="block mb-3">
              <span className="text-base font-medium">
                성별<span className="text-red-500">*</span>
              </span>
            </label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={() => handleChange('gender', '남아')}
                  className={`flex-1 py-3 px-6 rounded-full border-2 transition-colors ${
                    formData.gender === '남아'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  남아
                </button>
                <button
                  onClick={() => handleChange('gender', '여아')}
                  className={`flex-1 py-3 px-6 rounded-full border-2 transition-colors ${
                    formData.gender === '여아'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  여아
                </button>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.neutered}
                  onChange={(e) => handleChange('neutered', e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-gray-300"
                />
                <span className="text-base text-gray-600">중성화</span>
              </label>
            </div>
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block mb-3">
              <span className="text-base font-medium">
                생년월일<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* 몸무게 */}
          <div>
            <label className="block mb-3">
              <span className="text-base font-medium">
                몸무게<span className="text-red-500">*</span>
              </span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="설정일 기준 1개월 후 수정 가능합니다."
                className="flex-1 border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
              />
              <span className="text-gray-600">kg</span>
            </div>
          </div>

          {/* 병원정보 목록 */}
          {hospitals.map((hospital, index) => (
            <div key={hospital.id} className="bg-white space-y-6 pt-4">
              {/* 병원 정보 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">병원 정보 {index + 1}</h3>
                <button
                  onClick={() => handleRemoveHospital(hospital.id)}
                  className="p-1"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* 다니는 동물병원 */}
              <div>
                <label className="block mb-3">
                  <span className="text-base font-medium">
                    다니는 동물병원<span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={hospital.name}
                  onChange={(e) => handleHospitalChange(hospital.id, 'name', e.target.value)}
                  placeholder="다니고 계신 병원 입력"
                  className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
                />
              </div>

              {/* 주치의 이름 */}
              <div>
                <label className="block mb-3">
                  <span className="text-base font-medium">
                    주치의 이름<span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={hospital.ownerName}
                    onChange={(e) => handleHospitalChange(hospital.id, 'ownerName', e.target.value)}
                    placeholder="해당 병원의 주치의 이름 입력"
                    className="w-full border-b border-gray-300 py-3 pr-20 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
                  />
                  <button className="absolute right-0 bottom-3 text-sm text-gray-600 whitespace-nowrap">
                    모르겠음
                  </button>
                </div>
              </div>

              {/* 주치의 직책 */}
              <div>
                <label className="block mb-4">
                  <span className="text-base font-medium">주치의 직책</span>
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name={`relationship-${hospital.id}`}
                        checked={hospital.relationship === 'owner'}
                        onChange={() => handleHospitalChange(hospital.id, 'relationship', 'owner')}
                        className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:border-black checked:bg-white"
                      />
                      {hospital.relationship === 'owner' && (
                        <svg 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 14 14" 
                          fill="none"
                        >
                          <path d="M2 7l3 3 7-7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-base text-gray-700">원장</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name={`relationship-${hospital.id}`}
                        checked={hospital.relationship === 'guardian'}
                        onChange={() => handleHospitalChange(hospital.id, 'relationship', 'guardian')}
                        className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:border-black checked:bg-white"
                      />
                      {hospital.relationship === 'guardian' && (
                        <svg 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 14 14" 
                          fill="none"
                        >
                          <path d="M2 7l3 3 7-7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-base text-gray-700">진료 수의사</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name={`relationship-${hospital.id}`}
                        checked={hospital.relationship === 'unknown'}
                        onChange={() => handleHospitalChange(hospital.id, 'relationship', 'unknown')}
                        className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:border-black checked:bg-white"
                      />
                      {hospital.relationship === 'unknown' && (
                        <svg 
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 14 14" 
                          fill="none"
                        >
                          <path d="M2 7l3 3 7-7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-base text-gray-700">모르겠음</span>
                  </label>
                </div>
              </div>

              {/* 구분선 (마지막 병원 제외) */}
              {index < hospitals.length - 1 && (
                <div className="h-2 bg-gray-100 -mx-5 mt-8"></div>
              )}
            </div>
          ))}

          {/* 병원정보 등록하기 */}
          <button 
            onClick={handleAddHospital}
            className="w-full py-4 text-base font-medium text-gray-700 flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>병원정보 등록하기</span>
          </button>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-5 pb-8 pt-4 max-w-mobile mx-auto">
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          등록
        </button>
      </div>

      {/* 품종 검색 모달 */}
      {showBreedModal && (
        <>
          {/* 딤드 배경 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowBreedModal(false)}
          ></div>

          {/* 모달 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-w-mobile mx-auto" style={{ maxHeight: '70vh' }}>
            <div className="p-5">
              {/* 검색 입력 */}
              <div className="relative mb-4">
                <input
                  type="text"
                  value={breedSearch}
                  onChange={(e) => setBreedSearch(e.target.value)}
                  placeholder="품종 입력"
                  className="w-full border-b border-gray-300 py-3 pr-10 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
                  autoFocus
                />
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12.5 12.5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              {/* 품종 리스트 */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 100px)' }}>
                {filteredBreeds.map((breed, index) => (
                  <button
                    key={index}
                    onClick={() => handleBreedSelect(breed)}
                    className="w-full py-4 px-4 text-left text-base hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    {breed}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

