"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, DollarSign, Languages } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { guideService } from "@/backend/backend/services";

export default function GuidesPage() {
    const [guides, setGuides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGuides();
    }, []);

    const loadGuides = async () => {
        const result = await guideService.getTopRated(20);
        if (result.isSuccess && result.data) {
            setGuides(result.data);
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                {/* Hero */}
                <section className="bg-ink text-white py-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl font-heading font-bold mb-4">
                            Find Your Perfect Guide
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                            Connect with experienced local guides for an authentic Nepal experience
                        </p>
                    </div>
                </section>

                {/* Guides Grid */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-warmGray">Loading guides...</p>
                            </div>
                        ) : guides.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-warmGray text-lg">No guides available at the moment</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {guides.map((guide) => (
                                    <Link
                                        key={guide.id}
                                        href={`/guides/${guide.id}`}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="relative h-64">
                                            <Image
                                                src={guide.profiles?.avatar_url || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"}
                                                alt={`${guide.profiles?.first_name} ${guide.profiles?.last_name}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-heading font-bold text-ink mb-2">
                                                {guide.profiles?.first_name} {guide.profiles?.last_name}
                                            </h3>
                                            <p className="text-warmGray mb-4 line-clamp-2">{guide.bio || "Experienced guide"}</p>

                                            <div className="flex items-center gap-2 mb-3">
                                                <Star className="w-4 h-4 fill-gold text-gold" />
                                                <span className="font-semibold">{guide.avg_rating || 0}</span>
                                                <span className="text-warmGray text-sm">(reviews)</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-warmGray mb-2">
                                                <MapPin className="w-4 h-4" />
                                                {guide.location || "Nepal"}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-warmGray mb-4">
                                                <Languages className="w-4 h-4" />
                                                {Array.isArray(guide.known_languages) ? guide.known_languages.join(", ") : "Nepali, English"}
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="w-5 h-5 text-gold" />
                                                    <span className="text-xl font-bold text-gold">{guide.hourly_rate || 25}</span>
                                                    <span className="text-sm text-warmGray">/hour</span>
                                                </div>
                                                <button className="px-4 py-2 bg-gold hover:bg-goldLight text-ink rounded-full font-semibold transition-all">
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-heading font-bold text-ink mb-4">
                            Want to Become a Guide?
                        </h2>
                        <p className="text-warmGray mb-8">
                            Share your knowledge and earn money by guiding travelers
                        </p>
                        <Link
                            href="/guides/apply"
                            className="inline-block px-8 py-4 bg-gold hover:bg-goldLight text-ink rounded-full font-semibold transition-all"
                        >
                            Apply Now
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
