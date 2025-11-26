'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';

export default function ReportPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    // 실제로는 API 호출
    console.log('제보 내용:', formData);
    console.log('첨부 파일:', attachedFiles);
    
    // 제보 완료 페이지로 이동
    router.push('/report/success');
  };

  return (
    <div className="fixed inset-0 w-full max-w-mobile mx-auto bg-white flex flex-col">
      {/* 헤더 - 고정 */}
      <div className="flex-shrink-0">
        <Header title="제보 게시판" showBackButton={true} showIcons={true} />
      </div>

      {/* 메인 컨텐츠 - 헤더와 푸터 사이 공간에 fit */}
      <div className="flex-1 flex flex-col px-5 py-6 pt-20 min-h-0">
        {/* 제목 + 내용 입력 영역 */}
        <div className="flex-1 flex flex-col border border-gray-300 rounded-2xl p-4 min-h-0 overflow-hidden">
          {/* 제목 입력 */}
          <div className="flex items-center justify-between flex-shrink-0 mb-3">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="제목"
              className="flex-1 text-base focus:outline-none placeholder:text-gray-400"
            />
            {/* 첨부 아이콘 */}
            <button
              onClick={handleFileClick}
              className="p-1 flex-shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 첨부 파일 목록 - 제목 바로 아래 */}
          {attachedFiles.length > 0 && (
            <div className="flex-shrink-0 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">첨부 {attachedFiles.length}개</span>
                <span className="text-sm text-gray-500">
                  {(attachedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(1)}MB
                </span>
              </div>
              <div className="space-y-2">
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
                          <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : isPDF ? (
                          <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#DC2626" stroke="#DC2626" strokeWidth="2"/>
                              <path d="M14 2v6h6M10 13h4M10 17h4M10 9h1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M13 2v7h7" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* 파일 정보 */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 구분선 */}
          <div className="border-t border-gray-200 mb-3 flex-shrink-0"></div>

          {/* 내용 입력 - 남은 공간 모두 차지 */}
          <textarea
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="내용을 작성해주세요"
            className="flex-1 w-full text-base focus:outline-none placeholder:text-gray-400 resize-none min-h-0"
          />
        </div>
      </div>

      {/* 하단 제보하기 버튼 */}
      <div className="flex-shrink-0 px-5 pb-8 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl active:bg-gray-800 transition-colors"
        >
          제보하기
        </button>
      </div>
    </div>
  );
}

