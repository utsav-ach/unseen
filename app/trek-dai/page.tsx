"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { guides } from "@/data/trek-dai";
import { Guide } from "@/data/trek-dai";
import SearchBar from "@/components/SearchBar";
import FilterPanel, { FilterOptions } from "@/components/FilterPanel";
import BottomSheetMobile from "@/components/BottomSheetMobile";
import { 
    Star, 
    MapPin, 
    Phone, 
    Mail, 
    X,
    CheckCircle,
    Filter
} from "lucide-react";

// Dynamic import for Leaflet Map to avoid SSR issues
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

export default function TrekDaiPage() {
    const router = useRouter();
    const guidesRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProfile, setSelectedProfile] = useState<any>(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [comment, setComment] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([28.3949, 84.1240]);
    const [mapZoom, setMapZoom] = useState(7);
    const [isMobile, setIsMobile] = useState(false);
    const [sortBy, setSortBy] = useState<'rating' | 'price' | 'experience'>('rating');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [searchedLocation, setSearchedLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
    const [locationRadius, setLocationRadius] = useState(50); // km radius for filtering (default 50km)
    
    // Filter state
    const [filters, setFilters] = useState<FilterOptions>({
        region: 'All Regions',
        minRating: 0,
        experience: 'Any Experience',
        languages: [],
        priceRange: 'Any Price',
        customPriceMin: undefined,
        customPriceMax: undefined
    });

    // Check if mobile on mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper to calculate distance between two coordinates (Haversine formula)
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Helper to check price match
    const matchesPriceFilter = (guidePrice: string, filterPrice: string, customMin?: number, customMax?: number): boolean => {
        if (filterPrice === 'Any Price' && !customMin && !customMax) return true;
        
        const guidePriceMatch = guidePrice.match(/\$(\d+)/);
        if (!guidePriceMatch) return false;
        const guideMinPrice = parseInt(guidePriceMatch[1]);
        
        if (customMin !== undefined || customMax !== undefined) {
            const min = customMin ?? 0;
            const max = customMax ?? Infinity;
            return guideMinPrice >= min && guideMinPrice <= max;
        }
        
        if (filterPrice === '$20-40/day') return guideMinPrice >= 20 && guideMinPrice <= 40;
        if (filterPrice === '$40-60/day') return guideMinPrice >= 40 && guideMinPrice <= 60;
        if (filterPrice === '$60-80/day') return guideMinPrice >= 60 && guideMinPrice <= 80;
        if (filterPrice === '$80+/day') return guideMinPrice >= 80;
        
        return true;
    };

    // Filter guides based on search and filters
    const filteredGuides = guides.filter(guide => {
        const matchesSearch = searchQuery === "" || 
            guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));

        // Location-based filtering
        const matchesLocation = !searchedLocation || !guide.coordinates || 
            calculateDistance(
                searchedLocation.lat, 
                searchedLocation.lng, 
                guide.coordinates[0], 
                guide.coordinates[1]
            ) <= locationRadius;

        const matchesRegion = filters.region === 'All Regions' || guide.region === filters.region;
        const matchesRating = guide.rating >= filters.minRating;
        const matchesExperience = filters.experience === 'Any Experience' || 
            (filters.experience === '1-3 years' && parseInt(guide.experience) >= 1 && parseInt(guide.experience) <= 3) ||
            (filters.experience === '3-5 years' && parseInt(guide.experience) >= 3 && parseInt(guide.experience) <= 5) ||
            (filters.experience === '5-10 years' && parseInt(guide.experience) >= 5 && parseInt(guide.experience) <= 10) ||
            (filters.experience === '10+ years' && parseInt(guide.experience) >= 10);

        const matchesLanguages = filters.languages.length === 0 || 
            filters.languages.some(lang => guide.languages.includes(lang));

        const matchesPrice = matchesPriceFilter(guide.priceRange, filters.priceRange, filters.customPriceMin, filters.customPriceMax);

        return matchesSearch && matchesLocation && matchesRegion && matchesRating && matchesExperience && matchesLanguages && matchesPrice;
    });

    // Sort guides
    const sortedGuides = [...filteredGuides].sort((a, b) => {
        let comparison = 0;
        
        if (sortBy === 'rating') {
            comparison = a.rating - b.rating;
        } else if (sortBy === 'price') {
            // Extract numeric price from priceRange (e.g., "$40-60/day" -> 40)
            const priceA = parseInt(a.priceRange.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.priceRange.replace(/[^0-9]/g, ''));
            comparison = priceA - priceB;
        } else if (sortBy === 'experience') {
            const expA = parseInt(a.experience);
            const expB = parseInt(b.experience);
            comparison = expA - expB;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const handleLocationSelect = (location: { name: string; lat: number; lng: number; region: string }) => {
        setMapCenter([location.lat, location.lng]);
        setMapZoom(10);
        setSearchedLocation({ lat: location.lat, lng: location.lng, name: location.name });
        setFilters(prev => ({ ...prev, region: location.region }));
        
        // Scroll to guides section
        setTimeout(() => {
            guidesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    const handleMapBoundsChange = (bounds: any) => {
        // Can be used for bounds-based filtering if needed
    };

    const handleGuideSelect = (guide: Guide) => {
        setSelectedGuide(guide);
    };

    const handleLocationPicked = (location: { lat: number; lng: number; name?: string }) => {
        setMapCenter([location.lat, location.lng]);
        setMapZoom(12);
        setSearchedLocation({ lat: location.lat, lng: location.lng, name: location.name || 'Selected Location' });
        console.log('Location picked:', location);
    };

    const handleViewProfile = (guide: Guide) => {
        setSelectedProfile({ ...guide, type: 'guide' });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-gold text-gold' : 'text-warmGray'}`}
            />
        ));
    };

    const handleSubmitRating = () => {
        setShowRatingModal(false);
        setSelectedRating(0);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleSubmitComment = () => {
        setShowCommentModal(false);
        setComment("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-ink via-inkSoft to-ink overflow-hidden mt-20">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                        }} />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
                        <div className="inline-flex items-center gap-3 text-goldLight text-xs font-semibold tracking-[2.5px] uppercase mb-6">
                            <span className="w-8 h-[1px] bg-goldLight opacity-70" />
                            Trek Dai
                            <span className="w-8 h-[1px] bg-goldLight opacity-70" />
                        </div>

                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                            Find Your Perfect<br />
                            <em className="italic text-goldLight">Trek Companion</em>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                            Connect with verified trek guides, discover authentic homestays, and find trusted accommodations. 
                            Rate, review, and share experiences with Nepal's finest service providers.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative mb-8">
                            <SearchBar
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                onLocationSelect={handleLocationSelect}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <button
                                onClick={() => router.push('/trek-dai/Registerguide')}
                                className="bg-gold text-ink px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-goldLight hover:scale-105 hover:shadow-2xl shadow-lg"
                            >
                                Register as Guide
                            </button>
                        </div>
                    </div>
                </section>

                {/* Map-Based Guide Discovery Section */}
                <section ref={guidesRef} className="py-24 bg-white relative">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="mb-16">
                            <div className="inline-flex items-center gap-3 text-gold text-xs font-bold tracking-[2.5px] uppercase mb-4">
                                <span className="w-6 h-[1.5px] bg-gold" />
                                Trek Guides
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-ink leading-tight tracking-tight">
                                    Find Your Perfect <em className="italic text-terracotta">Guide</em>
                                </h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowFilterPanel(true)}
                                        className="flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-gold hover:text-ink"
                                    >
                                        <Filter className="w-4 h-4" />
                                        Filters
                                    </button>
                                    <button
                                        onClick={() => router.push('/trek-dai/Registerguide')}
                                        className="bg-gold text-ink px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-goldLight hover:scale-105"
                                    >
                                        Register as Guide
                                    </button>
                                </div>
                            </div>
                            <p className="text-lg text-warmGray leading-relaxed max-w-2xl">
                                Discover experienced guides on our interactive map. Click on markers to view profiles and connect with local experts.
                            </p>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:block">
                            {/* Centered Map */}
                            <div className="mb-8 relative" style={{ zIndex: 1 }}>
                                <div className="h-[600px] w-full overflow-hidden rounded-2xl">
                                    <LeafletMap
                                        guides={sortedGuides}
                                        selectedGuide={selectedGuide}
                                        onGuideSelect={handleGuideSelect}
                                        onBoundsChange={handleMapBoundsChange}
                                        initialCenter={mapCenter}
                                        initialZoom={mapZoom}
                                        onLocationPicked={handleLocationPicked}
                                    />
                                </div>
                            </div>

                            {/* Sorting Controls */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-2xl font-bold text-ink">
                                        {sortedGuides.length} Guide{sortedGuides.length !== 1 ? 's' : ''} Found
                                    </h3>
                                    {searchedLocation && (
                                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                                            <MapPin className="w-4 h-4 text-green-600" />
                                            <span className="text-sm text-green-700 font-medium">
                                                Near {searchedLocation.name}
                                            </span>
                                            <select
                                                value={locationRadius}
                                                onChange={(e) => setLocationRadius(Number(e.target.value))}
                                                className="text-xs bg-transparent border-l border-green-300 pl-2 text-green-700 font-semibold focus:outline-none"
                                            >
                                                <option value={25}>25km</option>
                                                <option value={50}>50km</option>
                                                <option value={75}>75km</option>
                                                <option value={100}>100km</option>
                                            </select>
                                            <button
                                                onClick={() => {
                                                    setSearchedLocation(null);
                                                    setMapCenter([28.3949, 84.1240]);
                                                    setMapZoom(7);
                                                }}
                                                className="ml-1 text-green-600 hover:text-green-800 transition-colors"
                                                title="Clear location filter"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-semibold text-gray-700">Sort by:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'experience')}
                                        className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-green-500 transition-colors"
                                    >
                                        <option value="rating">Rating</option>
                                        <option value="price">Price</option>
                                        <option value="experience">Experience</option>
                                    </select>
                                    <button
                                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                                        className="px-4 py-2 border-2 border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                                    >
                                        {sortOrder === 'asc' ? '↑ Low to High' : '↓ High to Low'}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Guide List Below Map */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedGuides.map((guide) => (
                                    <div
                                        key={guide.id}
                                        onClick={() => handleGuideSelect(guide)}
                                        className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                                            selectedGuide?.id === guide.id
                                                ? 'border-green-500 shadow-lg ring-2 ring-green-200'
                                                : 'border-gray-200 hover:border-green-300'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="relative">
                                                <img
                                                    src={guide.avatar}
                                                    alt={guide.name}
                                                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                                                />
                                                {guide.verified && (
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
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
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                                            {guide.bio}
                                        </p>
                                        
                                        <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                                            <span className="font-medium">{guide.experience} experience</span>
                                            <span className="font-semibold text-green-600">{guide.priceRange}</span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {guide.specialties.slice(0, 2).map((specialty, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                            {guide.specialties.length > 2 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                                    +{guide.specialties.length - 2}
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

                        {/* Mobile Layout */}
                        <div className="md:hidden">
                            <div className="h-[500px] relative mb-8 overflow-hidden rounded-2xl" style={{ zIndex: 1 }}>
                                <LeafletMap
                                    guides={sortedGuides}
                                    selectedGuide={selectedGuide}
                                    onGuideSelect={handleGuideSelect}
                                    onBoundsChange={handleMapBoundsChange}
                                    initialCenter={mapCenter}
                                    initialZoom={mapZoom}
                                    onLocationPicked={handleLocationPicked}
                                />
                            </div>

                            {/* Mobile Sorting */}
                            <div className="mb-4 px-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold text-ink">
                                        {sortedGuides.length} Guide{sortedGuides.length !== 1 ? 's' : ''}
                                    </h3>
                                    <select
                                        value={`${sortBy}-${sortOrder}`}
                                        onChange={(e) => {
                                            const [sort, order] = e.target.value.split('-');
                                            setSortBy(sort as 'rating' | 'price' | 'experience');
                                            setSortOrder(order as 'asc' | 'desc');
                                        }}
                                        className="px-3 py-2 border-2 border-gray-200 rounded-lg bg-white text-sm"
                                    >
                                        <option value="rating-desc">Rating (High to Low)</option>
                                        <option value="rating-asc">Rating (Low to High)</option>
                                        <option value="price-asc">Price (Low to High)</option>
                                        <option value="price-desc">Price (High to Low)</option>
                                        <option value="experience-desc">Experience (High to Low)</option>
                                        <option value="experience-asc">Experience (Low to High)</option>
                                    </select>
                                </div>
                                {searchedLocation && (
                                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                                        <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-green-700 font-medium truncate flex-1">
                                            Near {searchedLocation.name}
                                        </span>
                                        <select
                                            value={locationRadius}
                                            onChange={(e) => setLocationRadius(Number(e.target.value))}
                                            className="text-xs bg-transparent border-l border-green-300 pl-2 text-green-700 font-semibold focus:outline-none"
                                        >
                                            <option value={25}>25km</option>
                                            <option value={50}>50km</option>
                                            <option value={75}>75km</option>
                                            <option value={100}>100km</option>
                                        </select>
                                        <button
                                            onClick={() => {
                                                setSearchedLocation(null);
                                                setMapCenter([28.3949, 84.1240]);
                                                setMapZoom(7);
                                            }}
                                            className="ml-1 text-green-600 hover:text-green-800 transition-colors"
                                            title="Clear location filter"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile Bottom Sheet */}
                <BottomSheetMobile
                    guides={sortedGuides}
                    selectedGuide={selectedGuide}
                    onGuideSelect={handleGuideSelect}
                    onViewProfile={handleViewProfile}
                    isVisible={isMobile}
                />

                {/* Filter Panel */}
                <FilterPanel
                    isOpen={showFilterPanel}
                    onClose={() => setShowFilterPanel(false)}
                    filters={filters}
                    onFiltersChange={setFilters}
                    onApplyFilters={() => {}}
                    onResetFilters={() => {}}
                />

                {/* Success Message */}
                {showSuccess && (
                    <div className="fixed top-24 right-6 bg-sage text-white px-6 py-4 rounded-xl shadow-lg z-[110] flex items-center gap-3">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Thank you for your feedback!</span>
                    </div>
                )}
            </main>

            <Footer />

            {/* Profile Modal */}
            {selectedProfile && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={selectedProfile.avatar}
                                        alt={selectedProfile.name}
                                        width={80}
                                        height={80}
                                        className="rounded-full border-2 border-border"
                                    />
                                    <div>
                                        <h2 className="font-heading text-2xl font-bold text-ink mb-2">
                                            {selectedProfile.name}
                                        </h2>
                                        <div className="flex items-center gap-2 text-warmGray mb-3">
                                            <MapPin className="w-4 h-4" />
                                            {selectedProfile.location}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                {renderStars(selectedProfile.rating)}
                                            </div>
                                            <span className="text-lg font-bold text-ink">
                                                {selectedProfile.rating}/5
                                            </span>
                                            <span className="text-sm text-warmGray">
                                                ({selectedProfile.reviews} reviews)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProfile(null)}
                                    className="text-warmGray hover:text-ink transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-inkSoft leading-relaxed mb-8">
                                {selectedProfile.bio}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                                    <Phone className="w-5 h-5 text-gold" />
                                    <span className="text-sm text-ink">{selectedProfile.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                                    <Mail className="w-5 h-5 text-gold" />
                                    <span className="text-sm text-ink">{selectedProfile.email}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowRatingModal(true)}
                                    className="flex-1 bg-gold text-ink px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-goldLight"
                                >
                                    Rate This Guide
                                </button>
                                <button
                                    onClick={() => setShowCommentModal(true)}
                                    className="flex-1 bg-ink text-cream px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-terracotta"
                                >
                                    Leave Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rating Modal */}
            {showRatingModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-heading text-xl font-bold text-ink">Rate This Profile</h3>
                            <button
                                onClick={() => setShowRatingModal(false)}
                                className="text-warmGray hover:text-ink transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex justify-center gap-2 mb-8">
                            {Array.from({ length: 5 }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedRating(i + 1)}
                                    className="transition-all duration-200 hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${
                                            i < selectedRating ? 'fill-gold text-gold' : 'text-warmGray hover:text-gold'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmitRating}
                            disabled={selectedRating === 0}
                            className="w-full bg-gold text-ink px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-goldLight disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Rating
                        </button>
                    </div>
                </div>
            )}

            {/* Comment Modal */}
            {showCommentModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-heading text-xl font-bold text-ink">Leave a Review</h3>
                            <button
                                onClick={() => setShowCommentModal(false)}
                                className="text-warmGray hover:text-ink transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience..."
                            rows={4}
                            className="w-full p-4 border-2 border-border rounded-xl bg-cream text-ink placeholder-warmGray resize-none focus:outline-none focus:border-gold transition-all duration-300 mb-6"
                        />

                        <button
                            onClick={handleSubmitComment}
                            disabled={comment.trim() === ""}
                            className="w-full bg-ink text-cream px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-terracotta disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
