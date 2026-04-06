"use client";

import { useEffect, useRef, useState } from 'react';
import { Guide } from '@/data/trek-dai';
import GuideList from './GuideList';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface BottomSheetMobileProps {
  guides: Guide[];
  selectedGuide: Guide | null;
  onGuideSelect: (guide: Guide) => void;
  onViewProfile: (guide: Guide) => void;
  isVisible: boolean;
}

type SheetPosition = 'collapsed' | 'half' | 'full';

export default function BottomSheetMobile({ 
  guides, 
  selectedGuide, 
  onGuideSelect, 
  onViewProfile,
  isVisible 
}: BottomSheetMobileProps) {
  const [position, setPosition] = useState<SheetPosition>('collapsed');
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const positions = {
    collapsed: 'translate-y-[calc(100%-120px)]',
    half: 'translate-y-[50%]',
    full: 'translate-y-[10%]'
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaY = currentY - startY;
    const threshold = 50;
    
    if (deltaY > threshold) {
      // Dragging down
      if (position === 'full') setPosition('half');
      else if (position === 'half') setPosition('collapsed');
    } else if (deltaY < -threshold) {
      // Dragging up
      if (position === 'collapsed') setPosition('half');
      else if (position === 'half') setPosition('full');
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setCurrentY(e.clientY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaY = currentY - startY;
    const threshold = 50;
    
    if (deltaY > threshold) {
      if (position === 'full') setPosition('half');
      else if (position === 'half') setPosition('collapsed');
    } else if (deltaY < -threshold) {
      if (position === 'collapsed') setPosition('half');
      else if (position === 'half') setPosition('full');
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, currentY]);

  const togglePosition = () => {
    if (position === 'collapsed') setPosition('half');
    else if (position === 'half') setPosition('full');
    else setPosition('collapsed');
  };

  if (!isVisible) return null;

  return (
    <div
      ref={sheetRef}
      className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-40 transition-transform duration-300 ease-out ${
        positions[position]
      } ${isDragging ? 'transition-none' : ''}`}
      style={{
        height: '90vh',
        transform: isDragging 
          ? `translateY(${Math.max(10, Math.min(100, ((currentY - startY) / window.innerHeight) * 100 + (position === 'collapsed' ? 88 : position === 'half' ? 50 : 10)))}%)`
          : undefined
      }}
    >
      {/* Handle */}
      <div
        className="flex items-center justify-center py-4 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      {/* Header */}
      <div className="px-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {guides.length} Guide{guides.length !== 1 ? 's' : ''} Available
          </h3>
          <button
            onClick={togglePosition}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {position === 'collapsed' ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <GuideList
          guides={guides}
          selectedGuide={selectedGuide}
          onGuideSelect={onGuideSelect}
          onViewProfile={onViewProfile}
        />
      </div>
    </div>
  );
}