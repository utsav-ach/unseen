"use client";

import { useState } from 'react';
import { X, Filter, Star, MapPin, Globe, DollarSign, RotateCcw } from 'lucide-react';

export interface FilterOptions {
  region: string;
  minRating: number;
  experience: string;
  languages: string[];
  priceRange: string;
  customPriceMin?: number;
  customPriceMax?: number;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const regions = [
  'All Regions',
  'Everest Region',
  'Annapurna Region',
  'Langtang Region',
  'Mustang Region',
  'Manaslu Region',
  'Dolpo Region',
  'Kanchenjunga Region',
  'Makalu Region',
  'Central Nepal',
  'Western Nepal'
];

const experienceLevels = [
  'Any Experience',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years'
];

const languages = [
  'English',
  'Nepali',
  'Hindi',
  'Sherpa',
  'Tibetan',
  'Japanese',
  'French',
  'German'
];

const priceRanges = [
  'Any Price',
  '$20-40/day',
  '$40-60/day',
  '$60-80/day',
  '$80+/day'
];

// Helper to check if guide price matches filter
const matchesPriceFilter = (guidePrice: string, filterPrice: string, customMin?: number, customMax?: number): boolean => {
  if (filterPrice === 'Any Price' && !customMin && !customMax) return true;
  
  // Extract numeric price from guide's priceRange (e.g., "$40-60/day" -> 40)
  const guidePriceMatch = guidePrice.match(/\$(\d+)/);
  if (!guidePriceMatch) return false;
  const guideMinPrice = parseInt(guidePriceMatch[1]);
  
  // Check custom price range first
  if (customMin !== undefined || customMax !== undefined) {
    const min = customMin ?? 0;
    const max = customMax ?? Infinity;
    return guideMinPrice >= min && guideMinPrice <= max;
  }
  
  // Check predefined price ranges
  if (filterPrice === '$20-40/day') return guideMinPrice >= 20 && guideMinPrice <= 40;
  if (filterPrice === '$40-60/day') return guideMinPrice >= 40 && guideMinPrice <= 60;
  if (filterPrice === '$60-80/day') return guideMinPrice >= 60 && guideMinPrice <= 80;
  if (filterPrice === '$80+/day') return guideMinPrice >= 80;
  
  return true;
};

export default function FilterPanel({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onApplyFilters, 
  onResetFilters 
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleLanguageToggle = (language: string) => {
    const currentLanguages = localFilters.languages;
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(lang => lang !== language)
      : [...currentLanguages, language];
    
    handleFilterChange('languages', newLanguages);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      region: 'All Regions',
      minRating: 0,
      experience: 'Any Experience',
      languages: [],
      priceRange: 'Any Price',
      customPriceMin: undefined,
      customPriceMax: undefined
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onResetFilters();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] transition-opacity duration-300"
        onClick={handleBackdropClick}
      />
      
      {/* Centered Filter Modal */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 pointer-events-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 180px)' }}>
            <div className="space-y-8">
              {/* Region Filter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <label className="text-lg font-semibold text-gray-900">Region</label>
                </div>
                <select
                  value={localFilters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-green-500 transition-colors"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-green-600" />
                  <label className="text-lg font-semibold text-gray-900">Minimum Rating</label>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[0, 3, 4, 4.5, 4.8].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('minRating', rating)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        localFilters.minRating === rating
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-green-600" />
                  <label className="text-lg font-semibold text-gray-900">Experience</label>
                </div>
                <select
                  value={localFilters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-green-500 transition-colors"
                >
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Languages Filter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-green-600" />
                  <label className="text-lg font-semibold text-gray-900">Languages</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map(language => (
                    <button
                      key={language}
                      onClick={() => handleLanguageToggle(language)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        localFilters.languages.includes(language)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <label className="text-lg font-semibold text-gray-900">Price Range (per day)</label>
                </div>
                <select
                  value={localFilters.priceRange}
                  onChange={(e) => {
                    handleFilterChange('priceRange', e.target.value);
                    if (e.target.value !== 'Custom') {
                      handleFilterChange('customPriceMin', undefined);
                      handleFilterChange('customPriceMax', undefined);
                    }
                  }}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-green-500 transition-colors mb-3"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                  <option value="Custom">Custom Range</option>
                </select>
                
                {/* Custom Price Range Inputs */}
                {localFilters.priceRange === 'Custom' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min ($)</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={localFilters.customPriceMin ?? ''}
                        onChange={(e) => handleFilterChange('customPriceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-full p-2 border-2 border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max ($)</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Max"
                        value={localFilters.customPriceMax ?? ''}
                        onChange={(e) => handleFilterChange('customPriceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="w-full p-2 border-2 border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0">
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}