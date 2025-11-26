'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8 px-5 mt-4">
      <div className="max-w-mobile mx-auto">
        {/* 회사명 */}
        <h3 className="text-lg font-bold mb-4 text-black">데카펫</h3>
        
        {/* 회사 정보 */}
        <div className="text-xs text-gray-500 space-y-1 mb-4 leading-relaxed">
          <p>대표자명 : 김두현</p>
          <p>위치 : 사당역 11번 출구 바나프레쉬 3층</p>
          <p>영업시간 : 평일 10시 ~ 17시 (점심시간 13시 ~ 14시)</p>
          <p>사업자등록번호 : 000-00-00000 [사업자정보확인]</p>
        </div>

        {/* 약관 링크 */}
        <div className="flex gap-3 mb-6">
          <button className="text-xs text-gray-600">이용약관</button>
          <span className="text-gray-300">|</span>
          <button className="text-xs text-gray-600 font-semibold">개인정보처리방침</button>
        </div>

        {/* SNS 아이콘 */}
        <div className="flex gap-3 mb-6">
          {/* 인스타그램 */}
          <a href="#" className="w-9 h-9 flex items-center justify-center">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
          </a>
          
          {/* 카카오톡 */}
          <a href="#" className="w-9 h-9 flex items-center justify-center">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-yellow-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C6.5 3 2 6.58 2 11c0 2.89 1.86 5.43 4.64 7l-.86 3.14c-.08.29.21.52.48.4l4.09-2.46c.55.08 1.12.12 1.65.12 5.5 0 10-3.58 10-8s-4.5-8-10-8z" fill="#3C1E1E"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}

