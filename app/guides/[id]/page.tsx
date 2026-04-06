"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, DollarSign, Languages, Calendar } from "lucide-react";
import Image from "next/image";
import { guideService, authService } from "@/backend/backend/services";

export default function GuideProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [guide, setGuide] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        loadGuide();
        checkAuth();
    }, [params.id]);

    const checkAuth = async () => {
        const result = await authService.getCurrentUser();
        if (result.isSuccess && result.data) {
            setUser(result.data);
        }
    };

    const loadGuide = async () => {
        const result = await guideService.getFullGuideData(params.id as string);
        if (result.isSuccess && result.data) {
            setGuide(result.data);
        }
        setLoading(false);
    };

    const handleBooking = () => {
        if (!user) {
            router.push("/auth/login");
            return;
        }
        // TODO: Implement booking modal or redirect to booking page
        alert("Booking feature coming soon!");
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-cream py-20 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-warmGray">Loading guide profile...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!guide) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-cream py-20 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-warmGray text-lg">Guide not found</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-8">
                        <div className="flex items-start gap-6 flex-wrap">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold bg-gold/10">
                                {guide.avatar_url ? (
                                    <Image
                                        src={guide.avatar_url}
                                        alt={guide.full_name}
                                        width={128}
                                        height={128}
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl">
                                        👤
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-heading font-bold text-ink">
                                        {guide.full_name}
                                    </h1>
                                    {guide.is_verified && (
                                        <span className="px-3 py-1 bg-sage/20 text-sage rounded-full text-xs font-semibold">
                                            Verified
                                        </span>
                                    )}
                                    {guide.is_available && (
                                        <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold">
                                            Available
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Star className="w-5 h-5 fill-gold text-gold" />
                                    <span className="font-semibold text-lg">{guide.avg_rating || 0}</span>
                                    <span className="text-warmGray">({guide.reviews?.length || 0} reviews)</span>
                                </div>

                                <p className="text-warmGray mb-6">{guide.bio || "Experienced guide"}</p>

                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-warmGray mb-2">
                                        <Languages className="w-4 h-4 text-gold" />
                                        <span>{Array.isArray(guide.known_languages) ? guide.known_languages.join(", ") : "Nepali, English"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign className="w-4 h-4 text-gold" />
                                        <span className="font-semibold">${guide.hourly_rate || 25}/hour</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBooking}
                                    className="px-8 py-3 bg-gold hover:bg-goldLight text-ink rounded-full font-semibold transition-all flex items-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Book This Guide
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Service Areas */}
                    {guide.service_areas && guide.service_areas.length > 0 && (
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-8">
                            <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                                Service Areas
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {guide.service_areas.map((area: any) => (
                                    <div key={area.id} className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                                        <MapPin className="w-5 h-5 text-gold" />
                                        <div>
                                            <p className="font-semibold text-ink">{area.location_name || "Service Area"}</p>
                                            <p className="text-sm text-warmGray">{(area.radius_meters / 1000).toFixed(0)} km radius</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Reviews
                        </h2>
                        {guide.reviews && guide.reviews.length > 0 ? (
                            <div className="space-y-4">
                                {guide.reviews.map((review: any) => (
                                    <div key={review.id} className="border-b border-border pb-4 last:border-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-border'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-ink mb-2">{review.comment || "Great guide!"}</p>
                                        <p className="text-sm text-warmGray">
                                            {review.reviewer?.name || "Anonymous"} • {new Date(review.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-warmGray">No reviews yet</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
