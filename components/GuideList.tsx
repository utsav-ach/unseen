"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Guide } from '@/data/trek-dai';
import { Star, MapPin, Globe, Award } from 'lucide-react';

interface GuideListProps {
  guides: Guide[];
  selectedGuide: Guide | null;
  onGuideSelect: (guide: Guide) => void;
  onViewProfile: (guide: Guide) => void;
}

export default function GuideList({ guides, selectedGuide, onGuideSelect, onViewProfile }: GuideListProps) {
  const router = useRouter();
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (guides.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No guides found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex-shrink-0">
        <h3 className="text-lg font-bold text-gray-900">
          {guides.length} Guide{guides.length !== 1 ? 's' : ''} Found
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto guide-list-container">
        <div className="p-4 space-y-4">
          {guides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => onGuideSelect(guide)}
            className={`bg-white rounded-2xl p-4 border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
              selectedGuide?.id === guide.id
                ? 'border-green-500 shadow-lg ring-2 ring-green-200'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <Image
                  src={guide.avatar}
                  alt={guide.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-gray-200"
                />
                {guide.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 mb-1 truncate">{guide.name}</h4>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{guide.location}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(guide.rating)}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {guide.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({guide.reviews})
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>{guide.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-green-600">{guide.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">
              {guide.bio}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {guide.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                >
                  {specialty}
                </span>
              ))}
              {guide.specialties.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  +{guide.specialties.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/approach-guide/${guide.id}`);
                }}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                Approach
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle contact action
                }}
                className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}