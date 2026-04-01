"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Loader2 } from "lucide-react";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerProps {
    onLocationChange: (location: { lat: number; lng: number; name: string }) => void;
    initialLocation?: { lat: number; lng: number };
    editable?: boolean;
}

function MapClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function LocationPicker({
    onLocationChange,
    initialLocation = { lat: 27.7172, lng: 85.324 }, // Kathmandu default
    editable = true,
}: LocationPickerProps) {
    const [position, setPosition] = useState<[number, number]>([
        initialLocation.lat,
        initialLocation.lng,
    ]);
    const [locationName, setLocationName] = useState<string>("Loading...");
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchLocationName(initialLocation.lat, initialLocation.lng);
    }, []);

    const fetchLocationName = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            const name =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                data.address?.county ||
                data.display_name.split(",")[0];
            setLocationName(name);
            onLocationChange({ lat, lng, name });
        } catch (error) {
            setLocationName("Unknown location");
            onLocationChange({ lat, lng, name: "Unknown location" });
        }
    };

    const handleMapClick = (lat: number, lng: number) => {
        if (!editable) return;
        setPosition([lat, lng]);
        fetchLocationName(lat, lng);
    };

    const handleUseCurrentLocation = () => {
        setIsLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setPosition([lat, lng]);
                    fetchLocationName(lat, lng);
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to get your location. Please enable location services.");
                    setIsLoading(false);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            setIsLoading(false);
        }
    };

    if (!isMounted) {
        return (
            <div className="w-full h-64 bg-cream rounded-xl flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-border shadow-sm">
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} />
                    {editable && <MapClickHandler onClick={handleMapClick} />}
                </MapContainer>
            </div>

            {editable && (
                <button
                    onClick={handleUseCurrentLocation}
                    disabled={isLoading}
                    className="w-full bg-gold text-ink px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-goldLight disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Getting location...
                        </>
                    ) : (
                        <>
                            <MapPin className="w-5 h-5" />
                            Use Current Location
                        </>
                    )}
                </button>
            )}

            <div className="flex items-center gap-2 text-sm text-inkSoft bg-cream p-4 rounded-xl">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="font-medium">{locationName}</span>
            </div>
        </div>
    );
}
