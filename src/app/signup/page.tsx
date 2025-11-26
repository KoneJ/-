'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [agreements, setAgreements] = useState({
        all: false,
        terms: false,
        privacy: false,
    });
    const [expanded, setExpanded] = useState({
        terms: false,
        privacy: false,
    });

    const handleAllCheck = () => {
        const newValue = !agreements.all;
        setAgreements({
            all: newValue,
            terms: newValue,
            privacy: newValue,
        });
    };

    const handleSingleCheck = (key: 'terms' | 'privacy') => {
        const newAgreements = {
            ...agreements,
            [key]: !agreements[key],
        };

        // 모든 개별 항목이 체크되면 전체 동의도 체크
        newAgreements.all = newAgreements.terms && newAgreements.privacy;

        setAgreements(newAgreements);
    };

    const toggleExpanded = (key: 'terms' | 'privacy') => {
        setExpanded(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const isAllChecked = agreements.terms && agreements.privacy;

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
                <div className="h-full w-1/3 bg-black"></div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 px-5 py-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-12">
                    데카펫 서비스 이용약관에
                    <br />
                    동의해주세요
                </h1>

                {/* 약관 체크박스 */}
                <div className="space-y-8">
                    {/* 전체 동의 */}
                    <button
                        onClick={handleAllCheck}
                        className="flex items-center gap-3 w-full text-left"
                    >
                        <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-colors ${agreements.all ? 'bg-black border-black' : 'border-gray-300'
                            }`}>
                            {agreements.all && (
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <span className="text-xl font-semibold">전체 동의</span>
                    </button>

                    {/* 이용약관 동의 (필수) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between w-full">
                            <button
                                onClick={() => handleSingleCheck('terms')}
                                className="flex items-center gap-3 flex-1"
                            >
                                <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-colors ${agreements.terms ? 'bg-black border-black' : 'border-gray-300'
                                    }`}>
                                    {agreements.terms && (
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-lg font-medium">이용약관 동의 (필수)</span>
                            </button>

                            <button
                                onClick={() => toggleExpanded('terms')}
                                className="p-2"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={`text-gray-800 transition-transform ${expanded.terms ? 'rotate-180' : ''}`}
                                >
                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* 약관 내용 */}
                        {expanded.terms && (
                            <div className="pt-2 pb-4 border-t border-gray-200">
                                <div className="max-h-48 overflow-y-auto text-sm text-gray-600 leading-relaxed pr-2">
                                    <p className="font-semibold mb-3">제1조(목적)</p>
                                    <p className="mb-4">
                                        이 약관은 주식회사 데카펫(전자상거래 사업자)가 운영하는 데카펫 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ※ 「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 개인정보 취급방침 동의 (필수) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between w-full">
                            <button
                                onClick={() => handleSingleCheck('privacy')}
                                className="flex items-center gap-3 flex-1"
                            >
                                <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-colors ${agreements.privacy ? 'bg-black border-black' : 'border-gray-300'
                                    }`}>
                                    {agreements.privacy && (
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-lg font-medium">개인정보 취급방침 동의 (필수)</span>
                            </button>

                            <button
                                onClick={() => toggleExpanded('privacy')}
                                className="p-2"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={`text-gray-800 transition-transform ${expanded.privacy ? 'rotate-180' : ''}`}
                                >
                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* 약관 내용 */}
                        {expanded.privacy && (
                            <div className="pt-2 pb-4 border-t border-gray-200">
                                <div className="max-h-48 overflow-y-auto text-sm text-gray-600 leading-relaxed pr-2">
                                    <p className="font-semibold mb-3">개인정보 취급방침 동의 (필수)</p>
                                    <p className="mb-4">
                                        카펫 사이버몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
                                    </p>
                                    <p className="mb-4">
                                        ② "몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="px-5 pb-8">
                <button
                    onClick={() => isAllChecked && router.push('/signup/hospital')}
                    disabled={!isAllChecked}
                    className={`w-full text-white text-lg font-medium py-4 rounded-xl transition-colors ${isAllChecked
                        ? 'bg-black active:bg-gray-800'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

