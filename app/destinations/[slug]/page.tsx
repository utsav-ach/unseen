import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Check, Calendar, Mountain as MountainIcon, TrendingUp } from "lucide-react";
import * as LucideIcons from "lucide-react";

export async function generateStaticParams() {
    return destinations.map((dest) => ({
        slug: dest.slug,
    }));
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
    const destination = destinations.find(d => d.slug === params.slug);

    if (!destination) {
        notFound();
    }

    // Get the icon component dynamically
    const IconComponent = (LucideIcons as any)[destination.iconName] || MountainIcon;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative h-[60vh] overflow-hidden">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                        <div>
                            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <IconComponent className="w-10 h-10" style={{ color: destination.color }} />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 drop-shadow-2xl">
                                {destination.name}
                            </h1>
                            <p className="text-2xl md:text-3xl text-white/90 font-light drop-shadow-lg">
                                {destination.title}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quick Info Bar */}
                <section className="bg-primary text-white py-6">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <p className="text-accent font-semibold mb-1">Difficulty</p>
                                <p className="text-lg">{destination.difficulty}</p>
                            </div>
                            <div>
                                <p className="text-accent font-semibold mb-1">Duration</p>
                                <p className="text-lg">{destination.duration}</p>
                            </div>
                            <div>
                                <p className="text-accent font-semibold mb-1">Altitude</p>
                                <p className="text-lg">{destination.altitude}</p>
                            </div>
                            <div>
                                <p className="text-accent font-semibold mb-1">Best Season</p>
                                <p className="text-lg">{destination.bestSeason}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-12">
                            {/* Left Column - Main Content */}
                            <div className="md:col-span-2">
                                <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                                    About {destination.name}
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                    {destination.longDescription}
                                </p>

                                <h3 className="text-3xl font-heading font-bold text-primary mb-6">
                                    Highlights
                                </h3>
                                <ul className="space-y-3 mb-12">
                                    {destination.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                                            <span className="text-lg text-gray-700">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Gallery */}
                                <h3 className="text-3xl font-heading font-bold text-primary mb-6">
                                    Gallery
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {destination.gallery.map((img, index) => (
                                        <div key={index} className="relative h-64 rounded-xl overflow-hidden group">
                                            <Image
                                                src={img}
                                                alt={`${destination.name} ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div>
                                {/* Booking Card */}
                                <div className="bg-gray-50 rounded-2xl p-8 shadow-lg sticky top-24">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-3xl font-bold text-primary">{destination.price}</p>
                                            <p className="text-gray-600">per person</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'fill-accent text-accent' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600">{destination.reviews} reviews</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-accent hover:bg-accentDark text-white py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 mb-4">
                                        Book Now
                                    </button>

                                    <button className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-white py-4 rounded-full font-semibold text-lg transition-all duration-300">
                                        Contact Us
                                    </button>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-accent" /> Professional guide
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-accent" /> Accommodation
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-accent" /> Meals during trek
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-accent" /> Permits & fees
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-accent" /> Transportation
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Destinations */}
                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
                            More Destinations
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {destinations
                                .filter(d => d.id !== destination.id)
                                .slice(0, 3)
                                .map((dest) => (
                                    <Link
                                        key={dest.id}
                                        href={`/destinations/${dest.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                            <div className="relative h-48">
                                                <Image
                                                    src={dest.image}
                                                    alt={dest.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                                                    {dest.name}
                                                </h3>
                                                <p className="text-gray-600 mb-4">{dest.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-accent font-semibold">{dest.price}</span>
                                                    <span className="text-gray-500 text-sm">{dest.difficulty}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
