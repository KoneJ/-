'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';

export default function ProductApplyPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [productName, setProductName] = useState('');
    const [weight, setWeight] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const handleBackClick = () => {
        // 상품 탭으로 이동하기 위해 localStorage에 activeTab 설정
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeTab', '상품');
        }
        router.push('/');
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // 파일 크기 체크 (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('이미지 크기는 5MB 이하여야 합니다.');
                return;
            }

            // 이미지 파일 타입 체크
            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드 가능합니다.');
                return;
            }

            setImageFile(file);

            // 미리보기 생성
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!imageFile) {
            alert('상품 이미지를 등록해주세요.');
            return;
        }
        if (!productName.trim()) {
            alert('상품 이름을 입력해주세요.');
            return;
        }
        if (!weight.trim()) {
            alert('무게를 입력해주세요.');
            return;
        }
        if (!quantity.trim()) {
            alert('개수를 입력해주세요.');
            return;
        }

        // 신청 정보 저장
        if (typeof window !== 'undefined') {
            localStorage.setItem('productApply', JSON.stringify({
                productName,
                weight,
                quantity,
                description,
                imagePreview,
                timestamp: new Date().toISOString(),
            }));
        }

        alert('상품 신청이 완료되었습니다.');

        // 상품 탭으로 이동
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeTab', '상품');
        }
        router.push('/');
    };

    return (
        <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
            {/* 헤더 */}
            <div className="flex-shrink-0">
                <Header title="추가 상품 신청" showBackButton={true} showIcons={true} onBackClick={handleBackClick} />
            </div>

            {/* 메인 컨텐츠 - 스크롤 가능 */}
            <div className="flex-1 overflow-y-auto px-5 py-6 pt-20">
                {/* 상품 이미지 */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">상품 이미지</h3>

                    <button
                        onClick={handleImageClick}
                        className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden relative"
                    >
                        {imagePreview ? (
                            <Image
                                src={imagePreview}
                                alt="상품 이미지"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span className="text-gray-400 text-base">이미지 등록하기</span>
                        )}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                {/* 상품 이름 */}
                <div className="mb-6">
                    <label className="block mb-3">
                        <span className="text-xl font-bold text-gray-900">상품 이름</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="상품 이름 입력"
                        className="w-full px-0 py-3 border-b border-gray-300 text-base focus:outline-none focus:border-gray-900 placeholder:text-gray-400"
                    />
                </div>

                {/* 무게 */}
                <div className="mb-6">
                    <label className="block mb-3">
                        <span className="text-xl font-bold text-gray-900">무게</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="1.4"
                            className="w-full px-0 py-3 border-b border-gray-300 text-base focus:outline-none focus:border-gray-900 placeholder:text-gray-400 pr-8"
                        />
                        <span className="absolute right-0 bottom-3 text-base text-gray-900">kg</span>
                    </div>
                </div>

                {/* 개수 */}
                <div className="mb-6">
                    <label className="block mb-3">
                        <span className="text-xl font-bold text-gray-900">개수</span>
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="품종 입력"
                            className="w-full px-0 py-3 border-b border-gray-300 text-base focus:outline-none focus:border-gray-900 placeholder:text-gray-400 pr-8"
                        />
                        <span className="absolute right-0 bottom-3 text-base text-gray-900">개</span>
                    </div>
                </div>

                {/* 기타 내용 */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">기타 내용</h3>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="예) 기존에 구매했던 가격, 기존 구매처(쇼핑몰, 병원 등)"
                        className="w-full h-48 p-4 border border-gray-300 rounded-2xl text-base focus:outline-none focus:border-gray-900 placeholder:text-gray-400 resize-none"
                    />
                </div>
            </div>

            {/* 하단 신청하기 버튼 - 고정 */}
            <div className="flex-shrink-0 px-5 pb-6 pt-4 bg-white border-t border-gray-100">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white text-xl font-semibold py-4 rounded-2xl active:bg-gray-800 transition-colors"
                >
                    신청하기
                </button>
            </div>
        </div>
    );
}

