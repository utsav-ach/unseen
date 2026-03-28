import { destinations } from "@/data/destinations";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Clock, TrendingUp } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function DestinationsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                {/* Hero Section with Premium Gradient */}
                <section className="relative h-[50vh] bg-black flex items-center justify-center overflow-hidden">
                    {/* Golden glow effect */}
                    <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold/20 blur-[120px] pointer-events-none" />

                    {/* Subtle dot pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

                    {/* Floating elements */}
                    <div className="absolute w-32 h-32 bg-gold/10 rounded-full top-10 left-10 animate-pulse" />
                    <div className="absolute w-24 h-24 bg-gold/10 rounded-full bottom-20 right-20 animate-pulse" style={{ animationDelay: '1s' }} />

                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 animate-float">
                            All Destinations
                        </h1>
                        <p className="text-xl text-white/80 mb-6">
                            Explore {destinations.length} incredible destinations across Nepal
                        </p>
                        <div className="flex items-center justify-center gap-6 text-white/70 text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>8 Regions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>4-25 Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                <span>All Levels</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Destinations Grid */}
                <section className="py-20 px-4 bg-gradient-to-b from-white to-cream">
                    <div className="max-w-7xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                                <span className="w-6 h-[1.5px] bg-gold" />
                                Destinations
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-ink mb-4">
                                Choose Your Adventure
                            </h2>
                            <p className="text-warmGray text-lg max-w-2xl mx-auto">
                                From cultural capitals to remote wilderness, find your perfect Nepal experience
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {destinations.map((destination) => {
                                const IconComponent = (LucideIcons as any)[destination.iconName] || LucideIcons.Mountain;

                                return (
                                    <Link
                                        key={destination.id}
                                        href={`/destinations/${destination.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 active:scale-95 border border-border">
                                            {/* Image */}
                                            <div className="relative h-64 overflow-hidden">
                                                <Image
                                                    src={destination.image}
                                                    alt={destination.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                                {/* Icon Badge */}
                                                <div className="absolute top-4 right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                    <IconComponent className="w-7 h-7" style={{ color: destination.color }} />
                                                </div>

                                                {/* Badges */}
                                                <div className="absolute bottom-4 left-4 flex gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${destination.difficulty === 'Easy' || destination.difficulty === 'Easy to Moderate'
                                                            ? 'bg-sage/90 text-white'
                                                            : destination.difficulty === 'Moderate'
                                                                ? 'bg-gold/90 text-white'
                                                                : 'bg-terracotta/90 text-white'
                                                        }`}>
                                                        {destination.difficulty}
                                                    </span>
                                                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-ink">
                                                        {destination.duration}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-2xl font-heading font-bold text-ink group-hover:text-gold transition-colors">
                                                        {destination.name}
                                                    </h3>
                                                </div>

                                                <p className="text-sm text-warmGray mb-3 flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {destination.region}
                                                </p>

                                                <p className="text-warmGray mb-4 line-clamp-2 leading-relaxed">
                                                    {destination.description}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                                    <div>
                                                        <div className="flex items-center gap-1 mb-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3 h-3 ${i < Math.floor(destination.rating) ? 'fill-gold text-gold' : 'text-border'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="text-xs text-warmGray">{destination.reviews.toLocaleString()} reviews</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold text-gold">{destination.price}</p>
                                                        <p className="text-xs text-warmGray">per person</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="text-center mt-16">
                            <div className="inline-block bg-white rounded-2xl p-8 max-w-2xl border border-border shadow-sm">
                                <h3 className="text-2xl font-heading font-bold text-ink mb-3">
                                    Can't Decide?
                                </h3>
                                <p className="text-warmGray mb-6">
                                    Let our travel experts help you plan the perfect Nepal adventure tailored to your interests and experience level.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-block bg-gold hover:bg-goldLight text-ink px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    Get Expert Advice
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
