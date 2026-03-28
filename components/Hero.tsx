"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { destinations } from "@/data/destinations";
import { Search, ArrowRight } from "lucide-react";

export default function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Filter destinations based on search query
    const filteredDestinations = searchQuery.trim()
        ? destinations.filter(d =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.region.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (slug: string) => {
        router.push(`/destinations/${slug}`);
        setSearchQuery("");
        setShowResults(false);
    };

    const handleSearchClick = () => {
        if (filteredDestinations.length > 0) {
            handleSearch(filteredDestinations[0].slug);
        }
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/bg.jpg')"
                }}
            />

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <div className="inline-flex items-center gap-3 text-goldLight text-xs font-semibold tracking-[2.5px] uppercase mb-5">
                    <span className="w-7 h-[1px] bg-goldLight opacity-70" />
                    Discover Nepal
                    <span className="w-7 h-[1px] bg-goldLight opacity-70" />
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-tight tracking-tight mb-5">
                    Explore the Unseen Side<br />of <em className="italic text-goldLight">Nepal</em>
                </h1>

                <p className="text-base md:text-lg text-white/80 font-light tracking-wide mb-11 leading-relaxed max-w-2xl mx-auto">
                    Hidden gems, untouched beauty, and unforgettable journeys await in the heart of the Himalayas
                </p>

                {/* Search Bar with Results */}
                <div className="max-w-2xl mx-auto mb-8" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search destinations, regions, or experiences..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowResults(true);
                            }}
                            onFocus={() => setShowResults(true)}
                            className="w-full px-6 py-5 pr-32 rounded-full text-lg text-ink placeholder-warmGray focus:outline-none focus:ring-4 focus:ring-gold/50 shadow-2xl"
                        />
                        <button
                            onClick={handleSearchClick}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-[#D4B478] text-ink px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Search
                        </button>

                        {/* Search Results Dropdown */}
                        {showResults && searchQuery.trim() && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto z-50">
                                {filteredDestinations.length > 0 ? (
                                    <div className="py-2">
                                        {filteredDestinations.map((dest) => (
                                            <button
                                                key={dest.id}
                                                onClick={() => handleSearch(dest.slug)}
                                                className="w-full px-6 py-4 hover:bg-cream transition-colors text-left flex items-center gap-4 group"
                                            >
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${dest.color}15` }}>
                                                    {/* Icon placeholder - will be dynamic */}
                                                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: dest.color }} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-ink group-hover:text-gold transition-colors">
                                                        {dest.name}
                                                    </h3>
                                                    <p className="text-sm text-warmGray">{dest.region} • {dest.difficulty}</p>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-warmGray group-hover:text-gold transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-6 py-8 text-center">
                                        <p className="text-warmGray text-lg mb-2">😔 No destinations found</p>
                                        <p className="text-warmGray/70 text-sm">Try searching for "Pokhara", "Mustang", or "Kathmandu"</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <Link
                    href="/destinations"
                    className="inline-block bg-gold hover:bg-[#D4B478] text-ink px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 transform"
                >
                    Explore Destinations
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {/* Smooth Wave Divider Bottom - Transition to cream */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'rgba(0,0,0,0)', stopOpacity: 0 }} />
                            <stop offset="50%" style={{ stopColor: '#1A1612', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,120 C200,50 400,50 600,80 C800,110 1000,110 1200,80 L1200,120 L0,120 Z" fill="url(#heroWaveGradient)"></path>
                </svg>
            </div>
        </section>
    );
}
