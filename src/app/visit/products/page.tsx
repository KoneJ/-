'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

export default function VisitProductsPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('기생충');
    const [reservationInfo, setReservationInfo] = useState({
        date: '',
        time: '',
        location: '',
    });

    useEffect(() => {
        // localStorage에서 예약 정보 가져오기
        if (typeof window !== 'undefined') {
            const visitReservation = localStorage.getItem('visitReservation');
            if (visitReservation) {
                const info = JSON.parse(visitReservation);
                setReservationInfo(info);
            }
        }
    }, []);

    // 카테고리 버튼
    const categories = ['기생충', '피부', '인지기능'];

    // 의약품 데이터 (카테고리별)
    const allMedicines = [
        // 기생충
        {
            id: 1,
            name: '넥스가드 스펙트라 츄어블 초소형견용 xs 사이즈',
            price: 31500,
            originalPrice: 63000,
            discount: 50,
            image: '/authlogo.png',
            category: '기생충',
        },
        {
            id: 2,
            name: '브라벡토 츄어블 소형견용 250mg',
            price: 28000,
            originalPrice: 56000,
            discount: 50,
            image: '/authlogo.png',
            category: '기생충',
        },
        {
            id: 3,
            name: '심파리카 트리오 츄어블 5.6-11kg',
            price: 35000,
            originalPrice: 70000,
            discount: 50,
            image: '/authlogo.png',
            category: '기생충',
        },
        {
            id: 4,
            name: '크레델리오 플러스 츄어블 2.8-5.5kg',
            price: 29500,
            originalPrice: 59000,
            discount: 50,
            image: '/authlogo.png',
            category: '기생충',
        },
        {
            id: 5,
            name: '넥스가드 스펙트라 츄어블 소형견용',
            price: 33000,
            originalPrice: 66000,
            discount: 50,
            image: '/authlogo.png',
            category: '기생충',
        },
        {
            id: 6,
            name: '브라벡토 츄어블 중형견용 500mg',
            price: 32000,
            originalPrice: 64000,
            discount: 50,
            image: '/authlogo.png',
            category: '기생충',
        },
        // 피부
        {
            id: 7,
            name: '아포켈 5.4mg 100정',
            price: 85000,
            originalPrice: 120000,
            discount: 29,
            image: '/authlogo.png',
            category: '피부',
        },
        {
            id: 8,
            name: '사이토포인트 20mg 주사',
            price: 45000,
            originalPrice: 60000,
            discount: 25,
            image: '/authlogo.png',
            category: '피부',
        },
        {
            id: 9,
            name: '아포켈 3.6mg 100정',
            price: 75000,
            originalPrice: 100000,
            discount: 25,
            image: '/authlogo.png',
            category: '피부',
        },
        {
            id: 10,
            name: '덱사메타손 0.5mg 100정',
            price: 18000,
            originalPrice: 25000,
            discount: 28,
            image: '/authlogo.png',
            category: '피부',
        },
        {
            id: 11,
            name: '프레드니솔론 5mg 100정',
            price: 22000,
            originalPrice: 30000,
            discount: 27,
            image: '/authlogo.png',
            category: '피부',
        },
        {
            id: 12,
            name: '세파렉신 250mg 100정',
            price: 35000,
            originalPrice: 48000,
            discount: 27,
            image: '/authlogo.png',
            category: '피부',
        },
        // 인지기능
        {
            id: 13,
            name: '액티베이트 캡슐 60정',
            price: 65000,
            originalPrice: 85000,
            discount: 24,
            image: '/authlogo.png',
            category: '인지기능',
        },
        {
            id: 14,
            name: '세니어 브레인 서포트 90정',
            price: 58000,
            originalPrice: 75000,
            discount: 23,
            image: '/authlogo.png',
            category: '인지기능',
        },
        {
            id: 15,
            name: '뉴로액티브 캡슐 60정',
            price: 72000,
            originalPrice: 95000,
            discount: 24,
            image: '/authlogo.png',
            category: '인지기능',
        },
        {
            id: 16,
            name: '코그니티브 서포트 츄어블 90정',
            price: 55000,
            originalPrice: 70000,
            discount: 21,
            image: '/authlogo.png',
            category: '인지기능',
        },
        {
            id: 17,
            name: '브레인 부스터 캡슐 120정',
            price: 68000,
            originalPrice: 88000,
            discount: 23,
            image: '/authlogo.png',
            category: '인지기능',
        },
        {
            id: 18,
            name: '시니어 마인드 서포트 60정',
            price: 62000,
            originalPrice: 80000,
            discount: 23,
            image: '/authlogo.png',
            category: '인지기능',
        },
    ];

    // 선택된 카테고리에 따라 필터링
    const filteredMedicines = allMedicines.filter(
        (medicine) => medicine.category === selectedCategory
    );

    return (
        <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
            {/* 헤더 */}
            <div className="flex-shrink-0">
                <Header showBackButton={true} showIcons={true} />
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 overflow-y-auto bg-white pt-14">
                {/* 예약 정보 헤더 */}
                <div className="px-4 py-4">
                    <h1 className="text-xl font-bold text-gray-900">
                        {reservationInfo.date} {reservationInfo.time} {reservationInfo.location}
                    </h1>
                </div>

                {/* 카테고리 버튼 */}
                <div className="px-4 py-3 bg-white overflow-hidden">
                    <div className="flex items-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap
                    ${selectedCategory === category
                                        ? 'bg-[#2D2D2D] text-white'
                                        : 'bg-[#E5E5E5] text-gray-500'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}

                        {/* 처방신청 버튼 */}
                        <button
                            onClick={() => router.push('/visit/prescription')}
                            className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-black whitespace-nowrap"
                        >
                            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold">처방신청</span>
                        </button>
                    </div>
                </div>

                {/* 의약품 그리드 */}
                <div className="px-4 py-4">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                        {filteredMedicines.map((medicine) => (
                            <div
                                key={medicine.id}
                                className="cursor-pointer"
                                onClick={() => router.push(`/medicine/${medicine.id}`)}
                            >
                                {/* 의약품 이미지 */}
                                <div className="relative w-full aspect-square bg-gray-200 rounded-2xl overflow-hidden mb-2">
                                    <Image
                                        src={medicine.image}
                                        alt={medicine.name}
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>

                                {/* 의약품 정보 */}
                                <div className="px-1">
                                    <h3 className="text-sm text-gray-900 line-clamp-2 leading-tight mb-1">
                                        {medicine.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-base font-bold text-gray-900">
                                            {medicine.price.toLocaleString()}원
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-gray-400 line-through">
                                            {medicine.originalPrice.toLocaleString()}원
                                        </span>
                                        <span className="text-xs font-semibold text-blue-600">
                                            {medicine.discount}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

