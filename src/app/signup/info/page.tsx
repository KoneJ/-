'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    phone: '',
    verificationCode: '',
    password: '',
    passwordConfirm: '',
    address: '',
    detailAddress: '',
    zipCode: '',
  });
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendVerification = () => {
    if (formData.phone) {
      setVerificationSent(true);
      // 인증번호 발송 로직
      console.log('인증번호 발송:', formData.phone);
    }
  };

  const handleVerify = () => {
    if (formData.verificationCode) {
      setIsVerified(true);
      // 인증 확인 로직
      console.log('인증 완료');
    }
  };

  const handleAddressSearch = () => {
    // 주소 검색 로직 (다음 주소 API 등)
    console.log('주소 검색');
  };

  const handleSubmit = () => {
    // 임시로 항상 다음 페이지로 이동
    router.push('/signup/pet');
  };

  const isFormValid = true; // 임시로 항상 활성화

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
        <div className="h-full w-full bg-black transition-all duration-300"></div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 px-5 py-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">
          개인 정보를 입력해주세요
        </h1>

        <div className="space-y-6">
          {/* 이메일 */}
          <div>
            <label className="block mb-2">
              <span className="text-base font-medium">
                이메일<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="이메일을 입력해주세요"
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* 본명 */}
          <div>
            <label className="block mb-2">
              <span className="text-base font-medium">
                본명<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
              placeholder="성함을 입력해주세요"
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block mb-2">
              <span className="text-base font-medium">
                전화번호<span className="text-red-500">*</span>
              </span>
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="010-0000-0000"
                  className="flex-1 border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
                />
                <button
                  onClick={handleSendVerification}
                  className="text-sm text-gray-600 whitespace-nowrap"
                >
                  인증 요청
                </button>
              </div>

              {verificationSent && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => handleChange('verificationCode', e.target.value)}
                    placeholder="335429"
                    className="flex-1 border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleVerify}
                    className="text-sm text-gray-600 whitespace-nowrap"
                  >
                    {isVerified ? '인증 완료' : '02:12 인증 완료'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block mb-2">
              <span className="text-base font-medium">
                비밀번호<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block mb-2">
              <span className="text-base font-medium">
                비밀번호 확인<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="password"
              value={formData.passwordConfirm}
              onChange={(e) => handleChange('passwordConfirm', e.target.value)}
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* 주소 */}
          <div>
            <label className="block mb-2">
              <span className="text-base font-medium">
                주소<span className="text-red-500">*</span>
              </span>
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  placeholder="우편 번호"
                  className="flex-1 border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
                  readOnly
                />
                <button
                  onClick={handleAddressSearch}
                  className="px-4 py-2 bg-gray-200 text-sm font-medium rounded-lg whitespace-nowrap"
                >
                  주소 검색
                </button>
              </div>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="기본 주소"
                className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
                readOnly
              />
              <input
                type="text"
                value={formData.detailAddress}
                onChange={(e) => handleChange('detailAddress', e.target.value)}
                placeholder="상세 주소"
                className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-5 pb-8">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full text-white text-lg font-medium py-4 rounded-xl transition-colors ${
            isFormValid
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

