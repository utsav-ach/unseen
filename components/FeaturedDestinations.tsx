import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { Star } from "lucide-react";

export default function FeaturedDestinations() {
    // Show first 4 destinations
    const featuredDestinations = destinations.slice(0, 4);
    return (
        <section className="py-32 px-4 max-w-7xl mx-auto bg-white relative">
            {/* Smooth Wave Divider Top - Transition from cream */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#F5F3EF', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,0 C200,70 400,70 600,40 C800,10 1000,10 1200,40 L1200,0 L0,0 Z" fill="url(#waveGradient1)"></path>
                </svg>
            </div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30 pointer-events-none"></div>

            <div className="text-center mb-20 relative z-10">
                <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                    <span className="w-6 h-[1.5px] bg-gold" />
                    Featured
                </div>
                <h2 className="text-5xl font-heading font-bold text-ink mb-4">Featured Destinations</h2>
                <p className="text-warmGray text-xl">Explore Nepal&apos;s most breathtaking hidden gems</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {featuredDestinations.map((destination) => (
                    <Link
                        key={destination.id}
                        href={`/destinations/${destination.slug}`}
                        className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 block border border-border"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <Image
                                src={destination.image}
                                alt={destination.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${destination.difficulty === 'Easy' || destination.difficulty === 'Easy to Moderate' ? 'bg-sage/90' :
                                    destination.difficulty === 'Moderate' ? 'bg-gold/90' : 'bg-terracotta/90'
                                    } text-white`}>
                                    {destination.difficulty}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ink/90 backdrop-blur-sm text-white">
                                    {destination.region.split(' ')[0]}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-heading font-bold text-ink mb-3">{destination.name}</h3>
                            <p className="text-warmGray text-sm mb-4 leading-relaxed">{destination.description}</p>

                            <div className="flex justify-between items-center text-sm text-warmGray">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-gold text-gold" />
                                    <span className="font-semibold text-inkSoft">{destination.rating}</span>
                                </div>
                                <span className="font-medium">{destination.duration}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center">
                <Link
                    href="/destinations"
                    className="inline-block bg-gold hover:bg-[#D4B478] text-ink px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 transform"
                >
                    View More Destinations
                </Link>
            </div>

            {/* Wave Divider Bottom - Transition to light gray */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#F8FAFC', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#F5F3EF', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,0 C200,70 400,70 600,40 C800,10 1000,10 1200,40 L1200,0 L0,0 Z" fill="url(#waveGradient2)"></path>
                </svg>
            </div>
        </section>
    );
}
