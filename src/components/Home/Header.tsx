'use client';

import Header from '@/components/common/Header';

interface HomeHeaderProps {
  onHomeClick?: () => void;
  onCalendarClick?: () => void;
}

export default function HomeHeader({ onHomeClick, onCalendarClick }: HomeHeaderProps) {
  return <Header showBackButton={false} showIcons={true} onHomeClick={onHomeClick} onCalendarClick={onCalendarClick} />;
}

