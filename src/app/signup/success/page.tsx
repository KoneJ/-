'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupSuccessPage() {
    const router = useRouter();

    const handleGoHome = () => {
        // localStorage 정리
        localStorage.removeItem('registeredPets');
        router.push('/');
    };

    return (
        <div className="min-h-screen w-full max-w-mobile mx-auto bg-white flex flex-col items-center justify-center px-5">
            {/* 로고 이미지 */}
            <div className="relative w-64 h-64 mb-12">
                <Image
                    src="/authlogo.png"
                    alt="데카펫 로고"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* 완료 메시지 */}
            <h1 className="text-2xl font-bold text-center mb-16">
                회원가입이 완료되었습니다!
            </h1>

            {/* 홈으로 버튼 */}
            <div className="w-full max-w-sm">
                <button
                    onClick={handleGoHome}
                    className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
                >
                    홈으로
                </button>
            </div>
        </div>
    );
}

