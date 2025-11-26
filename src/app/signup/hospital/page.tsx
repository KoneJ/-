'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SelectHospitalPage() {
    const router = useRouter();
    const [selectedHospital, setSelectedHospital] = useState('동편동물병원검센터(서초)');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const hospitals = [
        '동편동물병원검센터(서초)',
        '(향후 추가될 예정입니다.)',
    ];

    const handleNext = () => {
        if (selectedHospital && selectedHospital !== '(향후 추가될 예정입니다.)') {
            router.push('/signup/info');
        }
    };

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen w-full max-w-mobile mx-auto bg-white flex flex-col">
            {/* 헤더 */}
            <header className="px-5 py-4">
                <button onClick={() => router.back()} className="p-2 -ml-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </header>

            {/* 프로그레스 바 */}
            <div className="h-1 bg-gray-100">
                <div className="h-full w-2/3 bg-black transition-all duration-300"></div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 px-5 py-8">
                <h1 className="text-2xl font-bold mb-12">
                    제휴 동물병원을 선택해주세요
                </h1>

                {/* 동물병원 선택 */}
                <div>
                    <label className="block mb-3">
                        <span className="text-base font-medium">
                            동물병원 선택<span className="text-red-500">*</span>
                        </span>
                    </label>

                    <div className="relative" ref={dropdownRef}>
                        {/* 드롭다운 버튼 */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl text-base text-left flex items-center justify-between focus:outline-none focus:border-black transition-colors"
                        >
                            <span className="text-black">{selectedHospital}</span>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            >
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* 드롭다운 메뉴 */}
                        {isOpen && (
                            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden">
                                {hospitals.map((hospital, index) => {
                                    const isDisabled = index === 1;
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => {
                                                if (!isDisabled) {
                                                    setSelectedHospital(hospital);
                                                    setIsOpen(false);
                                                }
                                            }}
                                            disabled={isDisabled}
                                            className={`w-full px-5 py-4 text-left text-base transition-colors ${selectedHospital === hospital
                                                ? 'bg-gray-50 font-medium'
                                                : !isDisabled && 'hover:bg-gray-50'
                                                } ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-black cursor-pointer'}`}
                                        >
                                            {hospital}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="px-5 pb-8">
                <button
                    onClick={handleNext}
                    className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
                >
                    다음
                </button>
            </div>
        </div>
    );
}

