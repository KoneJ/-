'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직 구현
    console.log('로그인:', { email, password });
  };

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white flex flex-col justify-center px-5 py-8">
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col">
        {/* 텍스트 + 로고 이미지 */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold leading-tight mb-3">
              안녕하세요,
              <br />
              데카펫입니다.
            </h1>
            <p className="text-sm text-gray-500">
              회원 서비스 이용을 위해 로그인 해주세요.
            </p>
          </div>

          <div className="relative w-36 h-36 flex-shrink-0 -mt-2">
            <Image
              src="/authlogo.png"
              alt="데카펫 로고"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-4 mb-8">
          <div>
            <input
              type="email"
              placeholder="이메일*"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호*"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button className="text-sm text-gray-500">
              비밀번호 찾기 &gt;
            </button>
          </div>
        </div>

        {/* 로그인 버튼 + 회원가입 */}
        <div>
          <button
            onClick={handleLogin}
            className="w-full bg-gray-400 text-white text-lg font-medium py-4 rounded-xl active:bg-gray-500 transition-colors"
          >
            로그인
          </button>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-500">아직 회원이 아니신가요? </span>
          <button 
            onClick={() => router.push('/signup')}
            className="text-sm font-bold text-black"
          >
            회원가입 &gt;
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

