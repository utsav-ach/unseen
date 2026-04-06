"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

// Custom center marker
const centerMarkerIcon = L.divIcon({
  className: 'center-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background-color: #166534;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

interface MapUpdaterProps {
  center: [number, number];
  radius: number;
}

function MapUpdater({ center, radius }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      // Calculate zoom level based on radius
      const radiusInMeters = radius * 1000;
      const zoom = Math.floor(14 - Math.log2(radiusInMeters / 1000));
      map.setView(center, Math.max(8, Math.min(zoom, 15)), { animate: true });
    }
  }, [center, radius, map]);

  return null;
}

interface ServiceAreaMapProps {
  center: [number, number];
  radius: number;
}

export default function ServiceAreaMap({ center, radius }: ServiceAreaMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const mapId = useMemo(() => `service-map-${Math.random().toString(36).substr(2, 9)}`, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-gray-50 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm" id={mapId}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="grayscale"
        />
        
        <MapUpdater center={center} radius={radius} />
        
        {/* Service area circle */}
        <Circle
          center={center}
          radius={radius * 1000}
          pathOptions={{
            fillColor: '#166534',
            fillOpacity: 0.15,
            color: '#166534',
            weight: 2,
            opacity: 0.6,
          }}
        />
        
        {/* Center marker */}
        <Marker position={center} icon={centerMarkerIcon} />
      </MapContainer>
    </div>
  );
}
