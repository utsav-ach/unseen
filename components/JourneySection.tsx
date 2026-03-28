"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Building2, Mountain, Castle, MountainSnow } from "lucide-react";

const journeyStops = [
    {
        id: 1,
        name: "Kathmandu",
        title: "Your Journey Begins",
        description: "Start your adventure in the vibrant capital, where ancient temples meet modern energy.",
        icon: Building2,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        color: "#C9A96E"
    },
    {
        id: 2,
        name: "Pokhara",
        title: "Lake Paradise",
        description: "Discover serene lakes surrounded by the majestic Annapurna range.",
        icon: Mountain,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        color: "#C4704A"
    },
    {
        id: 3,
        name: "Mustang",
        title: "Hidden Kingdom",
        description: "Explore the ancient walled city and dramatic desert landscapes.",
        icon: Castle,
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
        color: "#6B8C6B"
    },
    {
        id: 4,
        name: "Dolpo",
        title: "Remote Wilderness",
        description: "Experience untouched beauty in one of Nepal's most isolated regions.",
        icon: MountainSnow,
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=600&fit=crop",
        color: "#8C8480"
    }
];

export default function JourneySection() {
    const containerRef = useRef(null);
    const router = useRouter();
    const [activeDestination, setActiveDestination] = useState<string | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Path progress (0 to 100%)
    const pathProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);

    // Track which destination is active based on scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest < 0.2) setActiveDestination(null);
            else if (latest >= 0.2 && latest < 0.4) setActiveDestination("kathmandu");
            else if (latest >= 0.4 && latest < 0.6) setActiveDestination("pokhara");
            else if (latest >= 0.6 && latest < 0.8) setActiveDestination("mustang");
            else if (latest >= 0.8) setActiveDestination("dolpo");
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative py-40 px-4 bg-gradient-to-b from-cream via-[#F5F3EF] to-cream overflow-hidden">
            {/* Smooth Wave Divider Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient5" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,0 C250,70 450,70 600,40 C750,10 950,10 1200,40 L1200,0 L0,0 Z" fill="url(#waveGradient5)"></path>
                </svg>
            </div>

            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                        <span className="w-6 h-[1.5px] bg-gold" />
                        Journey
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-heading font-bold text-ink mb-4"
                    >
                        Your Nepal Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-warmGray text-xl"
                    >
                        Follow the path less traveled
                    </motion.p>
                </div>

                {/* Journey Path */}
                <div className="relative">
                    {/* SVG Path Line */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"
                        viewBox="0 0 1000 800"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#C9A96E" />
                                <stop offset="33%" stopColor="#C4704A" />
                                <stop offset="66%" stopColor="#6B8C6B" />
                                <stop offset="100%" stopColor="#8C8480" />
                            </linearGradient>
                        </defs>

                        {/* Background path */}
                        <motion.path
                            d="M 100,200 Q 300,100 500,200 T 900,200"
                            stroke="#E8E3DC"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="10,10"
                        />

                        {/* Animated path */}
                        <motion.path
                            d="M 100,200 Q 300,100 500,200 T 900,200"
                            stroke="url(#journeyGradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            style={{
                                pathLength: useTransform(scrollYProgress, [0.1, 0.9], [0, 1])
                            }}
                        />
                    </svg>

                    {/* Journey Stops */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {journeyStops.map((stop, index) => {
                            const startProgress = 0.1 + (index * 0.2);
                            const endProgress = startProgress + 0.15;

                            const opacity = useTransform(
                                scrollYProgress,
                                [startProgress - 0.1, startProgress, endProgress, endProgress + 0.1],
                                [0, 1, 1, 0.7]
                            );

                            const scale = useTransform(
                                scrollYProgress,
                                [startProgress - 0.1, startProgress, endProgress],
                                [0.8, 1.05, 1]
                            );

                            const isActive = activeDestination === stop.name.toLowerCase();

                            return (
                                <motion.div
                                    key={stop.id}
                                    style={{ opacity, scale }}
                                    className="relative cursor-pointer"
                                    onClick={() => router.push(`/destinations/${stop.name.toLowerCase()}`)}
                                >
                                    {/* Card */}
                                    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-border ${isActive ? 'ring-4 ring-gold scale-105 shadow-2xl' : ''
                                        }`}>
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={stop.image}
                                                alt={stop.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                            {/* Icon Badge */}
                                            <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                <stop.icon className="w-8 h-8" style={{ color: stop.color }} />
                                            </div>

                                            {/* Step Number */}
                                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                                <div
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                                    style={{ backgroundColor: stop.color }}
                                                >
                                                    {index + 1}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-2xl font-heading font-bold text-ink mb-2">
                                                {stop.name}
                                            </h3>
                                            <h4 className="text-lg font-semibold text-inkSoft mb-3">
                                                {stop.title}
                                            </h4>
                                            <p className="text-warmGray leading-relaxed">
                                                {stop.description}
                                            </p>
                                        </div>

                                        {/* Progress Indicator */}
                                        <motion.div
                                            className="h-1"
                                            style={{
                                                backgroundColor: stop.color,
                                                scaleX: useTransform(
                                                    scrollYProgress,
                                                    [startProgress, endProgress],
                                                    [0, 1]
                                                ),
                                                originX: 0
                                            }}
                                        />
                                    </div>

                                    {/* Connecting Dot (Desktop) */}
                                    <motion.div
                                        className="hidden md:block absolute -top-32 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg"
                                        style={{
                                            backgroundColor: stop.color,
                                            scale: useTransform(
                                                scrollYProgress,
                                                [startProgress - 0.05, startProgress],
                                                [0, 1]
                                            )
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-warmGray mb-6 text-lg">
                        Ready to start your own journey?
                    </p>
                    <button className="bg-gold hover:bg-[#D4B478] text-ink px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 transform">
                        Plan Your Adventure
                    </button>
                </motion.div>
            </div>

            {/* Smooth Wave Divider Bottom - removed, let natural gradient flow */}
        </section>
    );
}
