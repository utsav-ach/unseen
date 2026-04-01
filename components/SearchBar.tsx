"use client";

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLocationSelect: (location: { name: string; lat: number; lng: number; region: string }) => void;
}

const popularLocations = [
  { name: "Everest Base Camp", lat: 28.0026, lng: 86.8528, region: "Everest Region" },
  { name: "Annapurna Base Camp", lat: 28.5312, lng: 83.8719, region: "Annapurna Region" },
  { name: "Langtang Valley", lat: 28.2096, lng: 85.5240, region: "Langtang Region" },
  { name: "Mustang", lat: 28.7917, lng: 83.8333, region: "Mustang Region" },
  { name: "Manaslu Base Camp", lat: 28.5500, lng: 84.5667, region: "Manaslu Region" },
  { name: "Gokyo Lakes", lat: 27.9600, lng: 86.6900, region: "Everest Region" },
  { name: "Poon Hill", lat: 28.3667, lng: 83.6667, region: "Annapurna Region" },
  { name: "Namche Bazaar", lat: 27.8056, lng: 86.7139, region: "Everest Region" },
  { name: "Pokhara", lat: 28.2096, lng: 83.9856, region: "Annapurna Region" },
  { name: "Lukla", lat: 27.6869, lng: 86.7320, region: "Everest Region" },
  { name: "Kathmandu", lat: 27.7172, lng: 85.3240, region: "Central Nepal" },
  { name: "Dolpo", lat: 28.9667, lng: 82.9000, region: "Dolpo Region" },
  { name: "Kanchenjunga Base Camp", lat: 27.3500, lng: 87.8667, region: "Kanchenjunga Region" },
  { name: "Makalu Base Camp", lat: 27.8894, lng: 87.0889, region: "Makalu Region" },
];

export default function SearchBar({ searchQuery, onSearchChange, onLocationSelect }: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(popularLocations);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = popularLocations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationClick = (location: typeof popularLocations[0]) => {
    onLocationSelect(location);
    onSearchChange(location.name);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search location (e.g., Everest, Annapurna, Pokhara...)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-14 pr-6 py-4 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 shadow-lg"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
          {filteredLocations.length > 0 ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Popular Destinations
                </span>
              </div>
              {filteredLocations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationClick(location)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{location.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({location.region})</span>
                </button>
              ))}
            </>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p>No locations found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
