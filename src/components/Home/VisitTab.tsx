'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function VisitTab() {
    const router = useRouter();
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedMonth, setSelectedMonth] = useState(11);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // 달력 생성 로직
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month - 1, 1).getDay();
    };

    // 선택 가능한 날짜 (랜덤으로 생성)
    const availableDates = useMemo(() => {
        const dates = new Set<number>();
        const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

        // 5~8개의 랜덤 날짜 생성
        const count = Math.floor(Math.random() * 4) + 5;
        while (dates.size < count && dates.size < daysInMonth) {
            const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
            dates.add(randomDay);
        }

        return dates;
    }, [selectedYear, selectedMonth]);

    // 시간 옵션
    const timeSlots = [
        { time: '오전 10시', location: '서초병원' },
        { time: '오후 2시', location: '강남역' },
        { time: '오후 6시', location: '사당역' },
    ];

    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

    // 달력 날짜 배열 생성
    const calendarDays = [];

    // 빈 칸 추가 (첫 주의 이전 달 날짜)
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }

    // 실제 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const handlePrevMonth = () => {
        setSelectedDate(null);
        setSelectedTime(null);
        if (selectedMonth === 1) {
            setSelectedYear(selectedYear - 1);
            setSelectedMonth(12);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        setSelectedDate(null);
        setSelectedTime(null);
        if (selectedMonth === 12) {
            setSelectedYear(selectedYear + 1);
            setSelectedMonth(1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const handleDateClick = (day: number) => {
        if (availableDates.has(day)) {
            setSelectedDate(day);
            setSelectedTime(null);
        }
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };

    const handleConfirm = () => {
        if (!selectedDate) {
            alert('날짜를 선택해주세요.');
            return;
        }
        if (!selectedTime) {
            alert('시간을 선택해주세요.');
            return;
        }

        // 예약 정보를 localStorage에 저장
        const selectedSlot = timeSlots.find(slot => slot.time === selectedTime);
        const dayOfWeek = getDayOfWeek(selectedYear, selectedMonth, selectedDate);

        if (typeof window !== 'undefined') {
            localStorage.setItem('visitReservation', JSON.stringify({
                date: `${selectedYear.toString().slice(2)}.${selectedMonth}.${selectedDate}`,
                time: selectedTime,
                location: selectedSlot?.location || '',
                dayOfWeek: dayOfWeek,
            }));
        }

        // 상품 페이지로 이동
        router.push('/visit/products');
    };

    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // 요일 가져오기
    const getDayOfWeek = (year: number, month: number, day: number) => {
        const date = new Date(year, month - 1, day);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days[date.getDay()];
    };

    return (
        <div className="bg-white pb-20">
            {/* 안내 문구 */}
            <div className="px-5 py-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">
                    진료 예약 날짜를 선택해주세요
                </h2>
            </div>

            {/* 달력 - 세로 가운데 정렬 */}
            <div className="flex flex-col justify-center min-h-[60vh]">
                <div className="px-5">
                    {/* 월 선택 헤더 */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={handlePrevMonth}
                            className="p-2 active:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    d="M15 18l-6-6 6-6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <h3 className="text-lg font-bold text-gray-900">
                            {selectedYear}년 {selectedMonth}월
                        </h3>

                        <button
                            onClick={handleNextMonth}
                            className="p-2 active:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    d="M9 18l6-6-6-6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* 요일 헤더 */}
                    <div className="grid grid-cols-7 gap-2 mb-3">
                        {weekDays.map((day, index) => (
                            <div
                                key={day}
                                className={`text-center text-sm font-medium py-2 ${index === 0
                                    ? 'text-red-500'
                                    : index === 6
                                        ? 'text-blue-500'
                                        : 'text-gray-600'
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* 날짜 그리드 */}
                    <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((day, index) => {
                            const dayOfWeek = index % 7;
                            const isSunday = dayOfWeek === 0;
                            const isSaturday = dayOfWeek === 6;
                            const isSelected = day === selectedDate;
                            const isAvailable = day && availableDates.has(day);

                            return (
                                <button
                                    key={index}
                                    onClick={() => day && handleDateClick(day)}
                                    disabled={!day || !isAvailable}
                                    className={`
                  aspect-square flex items-center justify-center text-base rounded-lg
                  transition-colors
                  ${!day ? 'invisible' : ''}
                  ${isSelected
                                            ? 'bg-gray-400 text-white font-bold'
                                            : isAvailable
                                                ? 'bg-white text-gray-900 active:bg-gray-100 font-semibold'
                                                : 'bg-white text-gray-300 cursor-not-allowed'
                                        }
                  ${!isSelected && isAvailable && isSunday ? 'text-red-500' : ''}
                  ${!isSelected && isAvailable && isSaturday ? 'text-blue-500' : ''}
                `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 시간 선택 섹션 */}
            {selectedDate && (
                <div className="px-5 mt-8 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        {selectedYear}.{selectedMonth}.{selectedDate}.{getDayOfWeek(selectedYear, selectedMonth, selectedDate)}요일
                    </h3>
                    <div className="space-y-3">
                        {timeSlots.map((slot) => (
                            <button
                                key={slot.time}
                                onClick={() => handleTimeClick(slot.time)}
                                className={`
                  w-full px-5 py-4 rounded-2xl border-2 flex items-center justify-between
                  transition-colors
                  ${selectedTime === slot.time
                                        ? 'border-gray-400 bg-gray-50'
                                        : 'border-gray-200 bg-white active:bg-gray-50'
                                    }
                `}
                            >
                                <span className="text-base font-medium text-gray-900">
                                    {slot.time}
                                </span>
                                <span className="text-base text-gray-600">
                                    {slot.location}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 확인 버튼 - 항상 보이도록 */}
            <div className="px-5 py-4 bg-white">
                <button
                    onClick={handleConfirm}
                    className="w-full bg-black text-white text-base font-semibold py-4 rounded-2xl active:bg-gray-800 transition-colors"
                >
                    확인
                </button>
            </div>
        </div>
    );
}

