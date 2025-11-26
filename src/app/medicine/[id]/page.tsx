'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/Home/Footer';

export default function MedicineDetailPage() {
    const router = useRouter();
    const params = useParams();
    const medicineId = params?.id as string;
    const [showSurvey, setShowSurvey] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
    });
    const [quantity, setQuantity] = useState(3);
    const [accountHolder, setAccountHolder] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // 임시 의약품 데이터
    const medicine = {
        id: medicineId,
        name: '넥스가드 스펙트라 츄어블 3.5-7.5kg 3정',
        price: 31500,
        originalPrice: 63000,
        discount: 50,
        stock: 3000,
        image: '/authlogo.png',
        productCode: '00000000000',
        productType: '의약품',
        manufacturer: '베링거인겔하임',
        brand: '넥스가드',
        origin: '프랑스',
        description: '넥스가드 스펙트라는 개를 위한 구충제입니다. 벼룩, 진드기, 심장사상충, 회충, 구충 등을 예방합니다. 맛있는 소고기 맛 츄어블 형태로 간편하게 급여할 수 있습니다.',
    };

    const handlePrescription = () => {
        setShowSurvey(true);
    };

    const handleAnswer = (question: string, answer: string) => {
        const newAnswers = { ...answers, [question]: answer };
        setAnswers(newAnswers);

        // 모든 질문에 답변했는지 확인
        const allAnswered = Object.values(newAnswers).every(ans => ans !== '');

        // 모든 질문에 답변했으면 결제 페이지로 자동 스크롤
        if (allAnswered) {
            setTimeout(() => {
                setShowPayment(true);
                // 결제 섹션으로 스크롤
                setTimeout(() => {
                    const paymentSection = document.getElementById('payment-section');
                    if (paymentSection) {
                        paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }, 300);
        }
    };

    const isAllAnswered = () => {
        return Object.values(answers).every(answer => answer !== '');
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 99) {
            setQuantity(newQuantity);
        }
    };

    const totalPrice = medicine.price * quantity;
    const maxPurchase = 18;

    const handleSubmit = () => {
        if (!accountHolder.trim()) {
            alert('현금영수증 신청 입금자명을 입력해주세요.');
            return;
        }
        if (!phoneNumber.trim()) {
            alert('미신청 연락처를 입력해주세요.');
            return;
        }

        // 처방 및 예약 정보를 localStorage에 저장
        if (typeof window !== 'undefined') {
            localStorage.setItem('prescriptionItem', JSON.stringify({
                medicineId: medicineId,
                name: medicine.name,
                price: medicine.price,
                quantity: quantity,
                totalPrice: totalPrice,
                image: medicine.image,
                surveyAnswers: answers,
                accountHolder: accountHolder,
                phoneNumber: phoneNumber,
            }));
        }

        // 확인 페이지로 이동
        router.push('/medicine/confirm');
    };

    return (
        <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
            {/* 헤더 */}
            <div className="flex-shrink-0">
                <Header title="의약품 상세" showBackButton={true} showIcons={true} />
            </div>

            {/* 메인 컨텐츠 - 스크롤 가능 */}
            <div className="flex-1 overflow-y-auto bg-white pt-14">
                {/* 의약품 이미지 */}
                <div className="relative w-full bg-gradient-to-b from-gray-50 to-white px-6 pt-6 pb-8">
                    <div className="relative w-full aspect-square">
                        <Image
                            src={medicine.image}
                            alt={medicine.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* 의약품 기본 정보 */}
                <div className="px-5 pb-6">
                    {/* 의약품명 */}
                    <h1 className="text-base font-semibold text-gray-900 mb-3 leading-tight">
                        {medicine.name}
                    </h1>

                    {/* 가격 정보 */}
                    <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-gray-900">
                                {medicine.price.toLocaleString()}원
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-base text-gray-400 line-through">
                                {medicine.originalPrice.toLocaleString()}원
                            </span>
                            <span className="text-base font-semibold text-blue-600">
                                {medicine.discount}%
                            </span>
                        </div>
                    </div>

                    {/* 재고 */}
                    <div className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm text-gray-600">{medicine.stock.toLocaleString()}개</span>
                    </div>
                </div>

                {/* 구분선 */}
                <div className="h-2 bg-gray-100"></div>

                {/* 의약품 정보 */}
                <div className="px-5 py-6 bg-white">
                    <h2 className="text-lg font-bold text-gray-900 mb-5">의약품 정보</h2>

                    <div className="bg-white">
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                            <span className="text-sm text-gray-600">상품 번호</span>
                            <span className="text-sm text-gray-900 font-medium">{medicine.productCode}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                            <span className="text-sm text-gray-600">상품상태</span>
                            <span className="text-sm text-gray-900 font-medium">{medicine.productType}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                            <span className="text-sm text-gray-600">제조사</span>
                            <span className="text-sm text-gray-900 font-medium">{medicine.manufacturer}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                            <span className="text-sm text-gray-600">브랜드</span>
                            <span className="text-sm text-gray-900 font-medium">{medicine.brand}</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-200">
                            <span className="text-sm text-gray-600">원산지</span>
                            <span className="text-sm text-gray-900 font-medium">{medicine.origin}</span>
                        </div>
                    </div>

                    {/* 의약품 설명 */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {medicine.description}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>

            {/* 하단 처방 및 예약 버튼 - 고정 */}
            <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-gray-200">
                <button
                    onClick={handlePrescription}
                    className="w-full bg-black text-white text-base font-semibold py-4 rounded-lg active:bg-gray-800 transition-colors"
                >
                    처방 및 예약
                </button>
            </div>

            {/* 문진 Survey Overlay */}
            {showSurvey && (
                <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white z-50 flex flex-col">
                    {/* 헤더 */}
                    <div className="flex-shrink-0">
                        <Header title="처방 및 예약" showBackButton={true} showIcons={true} onBackClick={() => setShowSurvey(false)} />
                    </div>

                    {/* 메인 컨텐츠 - 스크롤 가능 */}
                    <div className="flex-1 overflow-y-auto px-5 py-6 pt-20">
                        {/* 안내 문구 */}
                        <div className="mb-6">
                            <p className="text-base text-gray-900 mb-3">
                                모든 문진에 "예" 라고 답변이 가능한 경우에만 출장 진료 예약이 가능합니다.
                            </p>
                            <div className="flex items-start gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-sm text-gray-600">
                                    모든 문진 내용을 확인했으며, 모두 "예"를 응답합니다.
                                </p>
                            </div>
                        </div>

                        {/* 질문 1 */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4">
                                1. 아이와 사람/개지 이동할 시 아이와의 스트레스로 인해 진료를 받기 어려운 질환이 신경질적이고, 공격적인 성격의 아이는 유안엠버드는 없었으며, 안스타 펫독 안내 사항을 모두 읽어보고 숙지하셨나요? (필요하시면 다시 보내드립니다.
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAnswer('q1', '아니오')}
                                    className={`flex-1 py-3 rounded-xl border-2 text-base font-semibold transition-colors ${answers.q1 === '아니오'
                                        ? 'border-gray-900 bg-white text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-500'
                                        }`}
                                >
                                    아니오
                                </button>
                                <button
                                    onClick={() => handleAnswer('q1', '예')}
                                    className={`flex-1 py-3 rounded-xl text-base font-semibold transition-colors ${answers.q1 === '예'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    예
                                </button>
                            </div>
                        </div>

                        {/* 질문 2 */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4">
                                2. 지난 3개월 동안 기생충 예방약(넥스가드)를 매달 한 번씩 복용하였나요?
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAnswer('q2', '아니오')}
                                    className={`flex-1 py-3 rounded-xl border-2 text-base font-semibold transition-colors ${answers.q2 === '아니오'
                                        ? 'border-gray-900 bg-white text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-500'
                                        }`}
                                >
                                    아니오
                                </button>
                                <button
                                    onClick={() => handleAnswer('q2', '예')}
                                    className={`flex-1 py-3 rounded-xl text-base font-semibold transition-colors ${answers.q2 === '예'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    예
                                </button>
                            </div>
                        </div>

                        {/* 질문 3 */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4">
                                3. 현재까지 기생충 예방약(넥스가드) 처치 후 부작용은 전혀 없었나요?
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAnswer('q3', '아니오')}
                                    className={`flex-1 py-3 rounded-xl border-2 text-base font-semibold transition-colors ${answers.q3 === '아니오'
                                        ? 'border-gray-900 bg-white text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-500'
                                        }`}
                                >
                                    아니오
                                </button>
                                <button
                                    onClick={() => handleAnswer('q3', '예')}
                                    className={`flex-1 py-3 rounded-xl text-base font-semibold transition-colors ${answers.q3 === '예'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    예
                                </button>
                            </div>
                        </div>

                        {/* 질문 4 */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4">
                                4. 지난 1년 동안 주기적으로 동물병원을 방문하여 아이가 매우 건강하다는 수의사의 진단을 받았나요?
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAnswer('q4', '아니오')}
                                    className={`flex-1 py-3 rounded-xl border-2 text-base font-semibold transition-colors ${answers.q4 === '아니오'
                                        ? 'border-gray-900 bg-white text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-500'
                                        }`}
                                >
                                    아니오
                                </button>
                                <button
                                    onClick={() => handleAnswer('q4', '예')}
                                    className={`flex-1 py-3 rounded-xl text-base font-semibold transition-colors ${answers.q4 === '예'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    예
                                </button>
                            </div>
                        </div>

                        {/* 질문 5 */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4">
                                5. 입금자 본인 신분증을 지참하고, 아이를 이동장에 넣어오셔야 한다는 사실 확인하셨나요?
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAnswer('q5', '아니오')}
                                    className={`flex-1 py-3 rounded-xl border-2 text-base font-semibold transition-colors ${answers.q5 === '아니오'
                                        ? 'border-gray-900 bg-white text-gray-900'
                                        : 'border-gray-200 bg-white text-gray-500'
                                        }`}
                                >
                                    아니오
                                </button>
                                <button
                                    onClick={() => handleAnswer('q5', '예')}
                                    className={`flex-1 py-3 rounded-xl text-base font-semibold transition-colors ${answers.q5 === '예'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-gray-500'
                                        }`}
                                >
                                    예
                                </button>
                            </div>
                        </div>

                        {/* 신청 및 입금 안내 섹션 - 모든 질문 답변 후 표시 */}
                        {showPayment && (
                            <div id="payment-section" className="mt-8 pt-6 border-t-8 border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">신청 및 입금 안내</h2>

                                {/* 상품 정보 */}
                                <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-200">
                                    <div className="flex gap-4">
                                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={medicine.image}
                                                alt={medicine.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {medicine.name}
                                            </h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-lg font-bold text-gray-900">
                                                    {medicine.price.toLocaleString()}원
                                                </span>
                                                <span className="text-sm text-gray-400 line-through">
                                                    {medicine.originalPrice.toLocaleString()}원
                                                </span>
                                                <span className="text-sm font-semibold text-blue-600">
                                                    {medicine.discount}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 수량 선택 */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between py-4">
                                        <span className="text-base text-gray-700">수량 선택</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleQuantityChange(-1)}
                                                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center active:bg-gray-100"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <span className="text-lg font-medium text-gray-900 min-w-[24px] text-center">{quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(1)}
                                                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center active:bg-gray-100"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                                        <span className="text-base text-gray-700">처방 개월 수</span>
                                        <span className="text-base font-medium text-gray-900">{maxPurchase}개월</span>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                                        <span className="text-base text-gray-700">총 수량 {quantity}개</span>
                                        <span className="text-base font-medium text-gray-900">{totalPrice.toLocaleString()}원</span>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-t-2 border-gray-900">
                                        <span className="text-lg font-bold text-gray-900">처방 금액</span>
                                        <span className="text-xl font-bold text-gray-900">{totalPrice.toLocaleString()}원</span>
                                    </div>
                                </div>

                                {/* 입금 계좌 */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-base font-semibold text-gray-900">입금 계좌</h3>
                                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 active:bg-gray-50">
                                            복사
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-base text-gray-900">
                                            <span className="font-medium">OO은행</span> 000-0000000000
                                        </p>
                                    </div>
                                </div>

                                {/* 현금영수증 신청 */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-base font-semibold text-gray-900">현금영수증 신청</h3>
                                        <span className="text-sm text-gray-500">미신청</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={accountHolder}
                                        onChange={(e) => setAccountHolder(e.target.value)}
                                        placeholder="010-0000-0000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-900"
                                    />
                                </div>

                                {/* 연락처 */}
                                <div className="mb-8">
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="010-0000-0000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-900"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 하단 제출 버튼 - 고정 */}
                    <div className="flex-shrink-0 px-5 pb-6 pt-4 bg-white border-t border-gray-100">
                        <button
                            onClick={handleSubmit}
                            disabled={!showPayment}
                            className={`w-full py-4 rounded-xl text-base font-semibold transition-colors ${showPayment
                                ? 'bg-black text-white active:bg-gray-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            처방 신청
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

