"use client";

import Link from "next/link";
import { BookOpen, Backpack, Flower2, Mountain } from "lucide-react";

const stories = [
    {
        id: 1,
        title: "Lost in the Clouds",
        description: "My unexpected adventure when fog descended on Everest Base Camp trek...",
        author: "Sarah Johnson",
        date: "Dec 15, 2024",
        icon: BookOpen,
        color: "#C9A96E"
    },
    {
        id: 2,
        title: "Tea Houses and Friendships",
        description: "How a broken ankle led to the most meaningful connections of my life...",
        author: "Mike Chen",
        date: "Dec 10, 2024",
        icon: Backpack,
        color: "#C4704A"
    },
    {
        id: 3,
        title: "Festival in the Mountains",
        description: "Celebrating Tihar with a local family in remote Mustang region...",
        author: "Priya Sharma",
        date: "Dec 5, 2024",
        icon: Flower2,
        color: "#6B8C6B"
    },
    {
        id: 4,
        title: "Solo Female Trekker",
        description: "Safety tips and empowering moments from my solo Manaslu trek...",
        author: "Emma Wilson",
        date: "Nov 28, 2024",
        icon: Mountain,
        color: "#8C8480"
    }
];

export default function FeaturedStories() {

    return (
        <section
            className="relative py-32 px-4 max-w-7xl mx-auto overflow-hidden"
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafafa] to-white" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.15) 0%, transparent 70%)',
                        animation: 'pulse 8s ease-in-out infinite'
                    }}
                />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'linear-gradient(135deg, rgba(196, 112, 74, 0.1) 0%, rgba(107, 140, 107, 0.1) 100%)',
                        animation: 'gradientShift 15s ease infinite'
                    }}
                />
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.1); opacity: 0.5; }
                }
                @keyframes gradientShift {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    50% { transform: translateX(20px) translateY(-20px); }
                }
            `}</style>

            {/* Content */}
            <div className="relative" style={{ zIndex: 10 }}>
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                        <span className="w-6 h-[1.5px] bg-gold" />
                        Stories
                    </div>
                    <h2 className="text-5xl font-heading font-bold text-ink mb-4">Featured Stories</h2>
                    <p className="text-warmGray text-xl">Read inspiring tales from fellow travelers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {stories.map((story) => {
                        const IconComponent = story.icon;
                        return (
                            <article
                                key={story.id}
                                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-border"
                            >
                                <div
                                    className="h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                    style={{ background: `linear-gradient(135deg, ${story.color}20, ${story.color}10)` }}
                                >
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: `${story.color}20` }}
                                    >
                                        <IconComponent className="w-10 h-10" style={{ color: story.color }} />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-ink mb-3">{story.title}</h3>
                                    <p className="text-warmGray text-sm mb-4 leading-relaxed">{story.description}</p>

                                    <div className="flex justify-between items-center text-xs text-warmGray pt-4 border-t border-border">
                                        <span className="font-medium">By {story.author}</span>
                                        <span>{story.date}</span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Link
                        href="/stories"
                        className="inline-block bg-gold hover:bg-[#D4B478] text-ink px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 transform"
                    >
                        Read More Stories
                    </Link>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ zIndex: 5 }}>
                <svg
                    className="relative block w-full h-24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="waveGradient10" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#F8FAFC', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,120 C200,50 400,50 600,80 C800,110 1000,110 1200,80 L1200,120 L0,120 Z"
                        fill="url(#waveGradient10)"
                    />
                </svg>
            </div>

            <div
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/3 to-transparent pointer-events-none"
                style={{ zIndex: 6 }}
            />
        </section>
    );
}
