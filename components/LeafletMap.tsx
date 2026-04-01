"use client";

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Guide } from '@/data/trek-dai';
import { Search, Plus, Minus, MapPin as MapPinIcon, X } from 'lucide-react';

// Fix for default marker icons in Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

// Custom green marker icon
const createCustomIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${isSelected ? '36px' : '28px'};
        height: ${isSelected ? '36px' : '28px'};
        background-color: ${isSelected ? '#059669' : '#10b981'};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        ${isSelected ? 'animation: bounce 0.5s ease;' : ''}
      "></div>
      <style>
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      </style>
    `,
    iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
    iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
  });
};

// Center marker for location picker
const centerMarkerIcon = L.divIcon({
  className: 'center-marker',
  html: `
    <div style="
      width: 40px;
      height: 40px;
      background-color: #ef4444;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

interface MapControllerProps {
  center: [number, number];
  zoom: number;
  selectedGuide: Guide | null;
}

function MapController({ center, zoom, selectedGuide }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  useEffect(() => {
    if (selectedGuide?.coordinates) {
      map.setView(selectedGuide.coordinates, 12, { animate: true });
    }
  }, [selectedGuide, map]);

  return null;
}

interface BoundsTrackerProps {
  onBoundsChange?: (bounds: any) => void;
}

function BoundsTracker({ onBoundsChange }: BoundsTrackerProps) {
  const map = useMapEvents({
    moveend: () => {
      if (onBoundsChange) {
        const bounds = map.getBounds();
        onBoundsChange({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        });
      }
    },
  });

  return null;
}

interface CenterMarkerTrackerProps {
  onCenterChange: (center: [number, number]) => void;
}

function CenterMarkerTracker({ onCenterChange }: CenterMarkerTrackerProps) {
  const map = useMapEvents({
    move: () => {
      const center = map.getCenter();
      onCenterChange([center.lat, center.lng]);
    },
  });

  return null;
}

interface LeafletMapProps {
  guides: Guide[];
  selectedGuide: Guide | null;
  onGuideSelect: (guide: Guide) => void;
  onBoundsChange?: (bounds: any) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export default function LeafletMap({
  guides,
  selectedGuide,
  onGuideSelect,
  onBoundsChange,
  initialCenter = [28.3949, 84.1240],
  initialZoom = 7,
}: LeafletMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(initialCenter);
  const [mapZoom, setMapZoom] = useState(initialZoom);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [markerPickerActive, setMarkerPickerActive] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setMapCenter(initialCenter);
    setMapZoom(initialZoom);
  }, [initialCenter, initialZoom]);

  // Geocoding search using Nominatim API
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Nepal')}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Geocoding error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch(value);
      }, 500);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleLocationSelect = (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setMapCenter([lat, lng]);
    setMapZoom(12);
    setShowResults(false);
    setSearchQuery(result.display_name.split(',')[0]);
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleMarkerPickerToggle = () => {
    setMarkerPickerActive(!markerPickerActive);
    if (!markerPickerActive && mapRef.current) {
      const center = mapRef.current.getCenter();
      setPickedLocation([center.lat, center.lng]);
    } else {
      setPickedLocation(null);
    }
  };

  const handleConfirmLocation = () => {
    if (pickedLocation) {
      console.log('Selected location:', pickedLocation);
      alert(`Location selected: ${pickedLocation[0].toFixed(4)}, ${pickedLocation[1].toFixed(4)}`);
      setMarkerPickerActive(false);
      setPickedLocation(null);
    }
  };

  const handleCenterChange = (center: [number, number]) => {
    if (markerPickerActive) {
      setPickedLocation(center);
    }
  };

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        zoomControl={false}
        ref={(mapInstance) => {
          if (mapInstance) {
            mapRef.current = mapInstance;
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={mapCenter} zoom={mapZoom} selectedGuide={selectedGuide} />
        <BoundsTracker onBoundsChange={onBoundsChange} />
        {markerPickerActive && <CenterMarkerTracker onCenterChange={handleCenterChange} />}

        {/* Guide Markers */}
        {guides.map((guide) => {
          if (!guide.coordinates) return null;
          
          return (
            <Marker
              key={guide.id}
              position={guide.coordinates}
              icon={createCustomIcon(selectedGuide?.id === guide.id)}
              eventHandlers={{
                click: () => onGuideSelect(guide),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-12 h-12 rounded-full border-2 border-green-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{guide.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {guide.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{guide.rating}</span>
                        <span className="text-xs text-gray-500">({guide.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{guide.bio}</p>
                  <div className="text-xs text-gray-600 mb-2">
                    <span className="font-semibold text-green-600">{guide.priceRange}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Center Marker for Location Picker */}
        {markerPickerActive && pickedLocation && (
          <Marker position={pickedLocation} icon={centerMarkerIcon} />
        )}
      </MapContainer>

      {/* Search Bar - Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search location (e.g., Everest, Annapurna, Pokhara...)"
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-lg border-2 border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all"
          />
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto">
              <button
                onClick={() => {
                  setShowResults(false);
                  setSearchQuery('');
                }}
                className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(result)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-start gap-2 border-b border-gray-100 last:border-b-0"
                >
                  <MapPinIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-900 pr-6">{result.display_name}</span>
                </button>
              ))}
            </div>
          )}
          
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Zoom Controls - Top Left */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center border border-gray-200"
          title="Zoom in"
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center border border-gray-200"
          title="Zoom out"
        >
          <Minus className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Marker Picker Tool - Top Right */}
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={handleMarkerPickerToggle}
          className={`w-10 h-10 rounded-lg shadow-lg transition-all flex items-center justify-center border-2 ${
            markerPickerActive
              ? 'bg-red-500 border-red-600 hover:bg-red-600'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
          title={markerPickerActive ? 'Cancel location picker' : 'Pick location on map'}
        >
          <MapPinIcon className={`w-5 h-5 ${markerPickerActive ? 'text-white' : 'text-gray-700'}`} />
        </button>
      </div>

      {/* Location Picker Instructions */}
      {markerPickerActive && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow-xl px-6 py-4 max-w-md">
          <p className="text-sm text-gray-700 mb-3 text-center">
            Move the map to position the red marker at your desired location
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMarkerPickerActive(false);
                setPickedLocation(null);
              }}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLocation}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
