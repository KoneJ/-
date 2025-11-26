'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';

export default function ProfileEditPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // localStorage에서 회원 정보 로드
  useEffect(() => {
    const storedProfile = localStorage.getItem('profileInfo');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setFormData(prev => ({
        ...prev,
        nickname: profile.nickname,
        phone: profile.phone,
      }));
      setTempData({
        nickname: profile.nickname,
        phone: profile.phone,
      });
    } else {
      // 초기 데이터
      const initialData = {
        nickname: '데카펫',
        phone: '010-1234-5678',
      };
      localStorage.setItem('profileInfo', JSON.stringify(initialData));
      setFormData(prev => ({
        ...prev,
        ...initialData,
      }));
      setTempData(initialData);
    }
  }, []);
  
  const [editMode, setEditMode] = useState({
    nickname: false,
    phone: false,
  });

  const [tempData, setTempData] = useState({
    nickname: '데카펫',
    phone: '010-1234-5678',
  });

  const [verification, setVerification] = useState({
    code: '',
    sent: false,
    timer: 0,
    verified: false,
  });

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTempChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const startEditMode = (field: 'nickname' | 'phone') => {
    setEditMode(prev => ({ ...prev, [field]: true }));
    setTempData(prev => ({ ...prev, [field]: formData[field] }));
    
    // 연락처 편집 시 인증 상태 초기화
    if (field === 'phone') {
      setVerification({
        code: '',
        sent: false,
        timer: 0,
        verified: false,
      });
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    }
  };

  const cancelEdit = (field: 'nickname' | 'phone') => {
    setEditMode(prev => ({ ...prev, [field]: false }));
    setTempData(prev => ({ ...prev, [field]: formData[field] }));
    
    // 연락처 취소 시 인증 상태 초기화
    if (field === 'phone') {
      setVerification({
        code: '',
        sent: false,
        timer: 0,
        verified: false,
      });
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    }
  };

  const saveEdit = (field: 'nickname' | 'phone') => {
    // 고객명은 바로 저장
    if (field === 'nickname') {
      setFormData(prev => ({ ...prev, [field]: tempData[field] }));
      setEditMode(prev => ({ ...prev, [field]: false }));
      
      // localStorage에 저장
      const storedProfile = localStorage.getItem('profileInfo');
      const profile = storedProfile ? JSON.parse(storedProfile) : {};
      profile.nickname = tempData[field];
      localStorage.setItem('profileInfo', JSON.stringify(profile));
      
      console.log(`${field} 변경:`, tempData[field]);
      alert('고객명이 변경되었습니다.');
      return;
    }

    // 연락처는 인증번호 발송
    if (field === 'phone') {
      sendVerificationCode();
    }
  };

  const sendVerificationCode = () => {
    if (!tempData.phone) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }

    // 실제로는 API 호출
    console.log('인증번호 발송:', tempData.phone);
    
    setVerification(prev => ({
      ...prev,
      sent: true,
      timer: 132, // 2:12 = 132초
      verified: false,
    }));

    // 타이머 시작
    const interval = setInterval(() => {
      setVerification(prev => {
        if (prev.timer <= 1) {
          clearInterval(interval);
          return { ...prev, timer: 0, sent: false };
        }
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);

    setTimerInterval(interval);
  };

  const verifyCode = () => {
    if (!verification.code) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    // 실제로는 API 호출
    console.log('인증번호 확인:', verification.code);
    
    setVerification(prev => ({
      ...prev,
      verified: true,
    }));

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    // 인증 완료 후 연락처 저장
    setFormData(prev => ({ ...prev, phone: tempData.phone }));
    setEditMode(prev => ({ ...prev, phone: false }));
    
    // localStorage에 저장
    const storedProfile = localStorage.getItem('profileInfo');
    const profile = storedProfile ? JSON.parse(storedProfile) : {};
    profile.phone = tempData.phone;
    localStorage.setItem('profileInfo', JSON.stringify(profile));
    
    alert('인증이 완료되어 연락처가 변경되었습니다.');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePasswordChange = () => {
    // 비밀번호 검증
    if (!formData.currentPassword) {
      alert('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (!formData.newPassword) {
      alert('새 비밀번호를 입력해주세요.');
      return;
    }
    if (!formData.confirmPassword) {
      alert('새 비밀번호 확인을 입력해주세요.');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 실제로는 API 호출
    console.log('비밀번호 변경:', formData);
    alert('비밀번호가 변경되었습니다.');
    
    // 비밀번호 필드 초기화
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  return (
    <div className="min-h-screen w-full max-w-mobile mx-auto bg-white">
      {/* 헤더 */}
      <Header title="회원 정보 관리" showBackButton={true} showIcons={true} />

      {/* 메인 컨텐츠 */}
      <div className="flex-1">
        {/* 기본정보 섹션 */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-bold mb-6">기본정보</h2>

          <div className="space-y-6">
            {/* 고객명 */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                <div className="flex items-center gap-8 flex-1">
                  <span className="text-base text-gray-500">고객명</span>
                  {!editMode.nickname ? (
                    <span className="text-base text-gray-900 font-medium">{formData.nickname}</span>
                  ) : (
                    <input
                      type="text"
                      value={tempData.nickname}
                      onChange={(e) => handleTempChange('nickname', e.target.value)}
                      className="flex-1 text-base focus:outline-none"
                    />
                  )}
                </div>
                {!editMode.nickname ? (
                  <button 
                    onClick={() => startEditMode('nickname')}
                    className="text-base text-gray-500"
                  >
                    수정
                  </button>
                ) : (
                  <button 
                    onClick={() => saveEdit('nickname')}
                    className="text-base text-black font-medium"
                  >
                    완료
                  </button>
                )}
              </div>
            </div>

            {/* 연락처 */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                <div className="flex items-center gap-8 flex-1">
                  <span className="text-base text-gray-500">연락처</span>
                  {!editMode.phone ? (
                    <span className="text-base text-gray-900 font-medium">{formData.phone}</span>
                  ) : (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleTempChange('phone', e.target.value)}
                      className="flex-1 text-base focus:outline-none"
                    />
                  )}
                </div>
                {!editMode.phone ? (
                  <button 
                    onClick={() => startEditMode('phone')}
                    className="text-base text-gray-500"
                  >
                    수정
                  </button>
                ) : (
                  <button 
                    onClick={() => saveEdit('phone')}
                    className="text-base text-black font-medium"
                  >
                    인증
                  </button>
                )}
              </div>

              {/* 인증 섹션 (연락처 편집 모드일 때만 표시) */}
              {editMode.phone && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    *휴대폰 인증을 하셔야 변경할 수 있습니다.
                  </p>
                  
                  {/* 인증번호 입력 */}
                  {verification.sent && (
                    <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                      <input
                        type="text"
                        value={verification.code}
                        onChange={(e) => setVerification(prev => ({ ...prev, code: e.target.value }))}
                        placeholder="인증 번호 6자리 입력"
                        className="flex-1 text-base focus:outline-none placeholder:text-gray-400"
                        disabled={verification.verified}
                      />
                      <button
                        onClick={verifyCode}
                        className="text-base text-gray-600 whitespace-nowrap ml-4"
                        disabled={verification.verified}
                      >
                        {verification.verified ? '인증 완료' : `${formatTimer(verification.timer)} 완료`}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-2 bg-gray-100"></div>

        {/* 비밀번호 변경 섹션 */}
        <div className="px-5 py-6">
          <h2 className="text-xl font-bold mb-6">비밀번호 변경</h2>

          <div className="space-y-4">
            {/* 현재 비밀번호 */}
            <div>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => handleChange('currentPassword', e.target.value)}
                placeholder="현재 비밀번호 입력*"
                className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
              />
            </div>

            {/* 새 비밀번호 */}
            <div>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                placeholder="새 비밀번호 입력*"
                className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
              />
            </div>

            {/* 새 비밀번호 확인 */}
            <div>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="새 비밀번호 확인*"
                className="w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* 비밀번호 변경 버튼 */}
          <button
            onClick={handlePasswordChange}
            className="w-full mt-8 bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
}

