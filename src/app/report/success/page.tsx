'use client';

import { useRouter } from 'next/navigation';

export default function ReportSuccessPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 - 고정 */}
      <div className="flex-shrink-0 px-5 py-4 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold ml-2">제보 게시판</h1>
      </div>

      {/* 메인 컨텐츠 - 중앙 정렬 */}
      <div className="flex-1 flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-lg text-gray-600">
            제보가 완료되었습니다.
          </p>
        </div>
      </div>

      {/* 하단 홈으로 버튼 */}
      <div className="flex-shrink-0 px-5 pb-8 pt-4">
        <button
          onClick={handleGoHome}
          className="w-full bg-black text-white py-4 rounded-full text-base font-medium"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}

