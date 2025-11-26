'use client';

import { useState, useEffect } from 'react';

export default function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const banners = [
    {
      date: '25.7.13.(일)',
      title: '동편원장 출장진료',
      locations: [
        { place: '부산역', time: '10시10분' },
        { place: '울산', subPlace: '(동도시)', suffix: '역', time: '12시30분' },
        { place: '동대구역', time: '14시' },
      ],
    },
    {
      date: '',
      title: '',
      locations: [],
    },
    {
      date: '',
      title: '',
      locations: [],
    },
    {
      date: '',
      title: '',
      locations: [],
    },
    {
      date: '',
      title: '',
      locations: [],
    },
  ];

  const totalSlides = banners.length;

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(timer);
  }, [totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // 왼쪽으로 스와이프 (다음)
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }

    if (touchStart - touchEnd < -50) {
      // 오른쪽으로 스와이프 (이전)
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((banner, index) => (
          <div key={index} className="min-w-full flex-shrink-0">
            <div className="px-6 pt-12 pb-8 text-center relative">
              {/* 날짜 */}
              {banner.date && (
                <p className="text-lg text-blue-600 font-semibold mb-4" style={{ color: '#4A5BA8' }}>
                  {banner.date}
                </p>
              )}

              {/* 제목 */}
              {banner.title && (
                <h2 className="text-3xl font-black mb-10" style={{ letterSpacing: '-0.5px' }}>
                  {banner.title}
                </h2>
              )}

              {/* 출장 정보 */}
              {banner.locations.length > 0 && (
                <div className="space-y-3 mb-8">
                  {banner.locations.map((location, idx) => (
                    <p key={idx} className="text-2xl font-bold" style={{ letterSpacing: '-0.5px' }}>
                      <span className="text-orange-500">{location.place}</span>
                      {location.subPlace && (
                        <span className="text-orange-400 text-sm align-super">{location.subPlace}</span>
                      )}
                      {location.suffix && <span className="text-orange-500">{location.suffix}</span>}{' '}
                      <span className="text-black">{location.time}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* 빈 슬라이드를 위한 최소 높이 */}
              {banner.locations.length === 0 && <div className="h-48"></div>}

              {/* 산 이미지 배경 */}
              <div className="relative h-32">
                <div className="absolute inset-0 -mx-6">
                  {/* 산 실루엣 */}
                  <svg className="w-full h-full" viewBox="0 0 390 130" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`mountainGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 0.5 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,130 L0,80 Q50,60 80,70 Q110,80 130,50 Q150,20 180,40 Q210,60 240,35 Q270,10 300,50 Q330,90 360,70 L390,85 L390,130 Z"
                      fill={`url(#mountainGradient-${index})`}
                    />
                    <path
                      d="M0,130 L0,95 Q60,75 90,85 Q120,95 150,70 Q180,45 210,65 Q240,85 270,60 Q300,35 330,75 Q360,100 390,90 L390,130 Z"
                      fill={`url(#mountainGradient-${index})`}
                      opacity="0.6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지 인디케이터 */}
      <div className="flex justify-center gap-1.5 pb-8">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === currentSlide ? 'bg-gray-700' : 'bg-gray-300'
            }`}
            aria-label={`슬라이드 ${i + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}

