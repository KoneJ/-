'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';

export default function PrescriptionPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [content, setContent] = useState('');

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (attachedFiles.length === 0) {
      alert('처방전 이미지를 첨부해주세요.');
      return;
    }

    // 실제로는 API 호출
    console.log('처방전 내용:', content);
    console.log('첨부 파일:', attachedFiles);
    
    alert('처방 신청이 완료되었습니다.');
    router.back();
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 - 고정 */}
      <div className="flex-shrink-0">
        <Header title="추가 처방 신청" showBackButton={true} showIcons={true} />
      </div>

      {/* 메인 컨텐츠 - 헤더와 푸터 사이 공간에 fit */}
      <div className="flex-1 flex flex-col px-5 min-h-0 overflow-y-auto pt-20 pb-6">
        {/* 처방전 이미지 섹션 */}
        <div className="flex-shrink-0 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            처방전 이미지<span className="text-red-500">*</span>
          </h3>
          
          <p className="text-sm text-red-500 mb-4">
            * 내용이 선명하게 보이는 처방전 이미지 또는 파일을 준비해주세요.
          </p>

          {/* 첨부 파일 정보와 아이콘 */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-gray-900">첨부 {attachedFiles.length}개</span>
              <span className="text-base text-gray-500">
                {(attachedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(1)}MB
              </span>
            </div>
            <button
              onClick={handleFileClick}
              className="p-1"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 첨부 파일 목록 */}
          {attachedFiles.length > 0 && (
            <div className="space-y-3 mb-6">
              {attachedFiles.map((file, index) => {
                const isImage = file.type.startsWith('image/');
                const isPDF = file.type === 'application/pdf';
                
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2"
                  >
                    {/* 파일 아이콘/썸네일 */}
                    <div className="flex-shrink-0">
                      {isImage ? (
                        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : isPDF ? (
                        <div className="w-12 h-12 rounded flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="2" fill="#DC2626"/>
                            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PDF</text>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 2v7h7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* 파일 정보 */}
                    <div className="flex-1 min-w-0">
                      <p className="text-base text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.size >= 1024 * 1024 
                          ? `${(file.size / (1024 * 1024)).toFixed(1)}MB`
                          : `${(file.size / 1024).toFixed(1)}KB`
                        }
                      </p>
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="p-1 flex-shrink-0"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 주치의 소견 및 추가 설명 */}
        <div className="flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            주치의 소견 및 추가 설명
          </h3>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="주치의 소견 또는 추가로 확인이 필요한 내용을 작성해주세요"
            className="w-full h-64 text-base focus:outline-none placeholder:text-gray-400 resize-none p-4 border border-gray-300 rounded-2xl"
          />
        </div>
      </div>

      {/* 하단 신청하기 버튼 */}
      <div className="flex-shrink-0 px-6 pb-6 pt-4">
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

