"use client";

import dynamic from 'next/dynamic';
import { Guide } from '@/data/trek-dai';

interface MapViewProps {
  guides: Guide[];
  selectedGuide: Guide | null;
  onGuideSelect: (guide: Guide) => void;
  onBoundsChange?: (bounds: any) => void;
  onMapClick?: (lat: number, lng: number) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
}

// Dynamically import Leaflet map to avoid SSR issues
const LeafletMap = dynamic(
  () => import('./LeafletMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-gray-500">Loading map...</div>
      </div>
    ),
  }
);

export default function MapView({ 
  guides, 
  selectedGuide, 
  onGuideSelect, 
  onBoundsChange,
  onMapClick,
  initialCenter = [28.3949, 84.1240],
  initialZoom = 7
}: MapViewProps) {
  return (
    <div className="h-full w-full relative">
      <LeafletMap 
        guides={guides}
        selectedGuide={selectedGuide}
        onGuideSelect={onGuideSelect}
        onBoundsChange={onBoundsChange}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
    </div>
  );
}
