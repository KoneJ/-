'use client';

import { useState } from 'react';

interface TabBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function TabBar({ activeTab: controlledTab, onTabChange }: TabBarProps) {
  const [internalTab, setInternalTab] = useState('전체');
  const activeTab = controlledTab || internalTab;

  const tabs = ['전체', '상품', '출장 진료'];

  const handleTabClick = (tab: string) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 py-4 text-mobile-base font-semibold transition-colors relative
              ${activeTab === tab ? 'text-black' : 'text-gray-300'}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

