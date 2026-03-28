"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function StatsSection() {
    const stats = [
        { value: 10000, label: "Travelers", suffix: "+", showIcon: false },
        { value: 150, label: "Hidden Destinations", suffix: "+", showIcon: false },
        { value: 4.9, label: "Average Rating", suffix: "", decimals: true, showIcon: true },
        { value: 25, label: "Years Experience", suffix: "+", showIcon: false },
    ];

    return (
        <section className="relative py-40 px-4 bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] overflow-hidden">
            {/* Smooth Wave Divider Top - Gentle curve */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient7" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: '#E8E3DC', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#C9C5BE', stopOpacity: 1 }} />
                            <stop offset="75%" style={{ stopColor: '#4A4A4A', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,0 C300,40 600,40 900,20 C1050,10 1150,10 1200,15 L1200,0 L0,0 Z" fill="url(#waveGradient7)"></path>
                </svg>
            </div>

            {/* Soft radial glow in center - very subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-radial from-gold/8 via-gold/3 to-transparent blur-3xl pointer-events-none opacity-60" />

            {/* Barely visible dot pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="text-5xl md:text-6xl font-heading font-bold text-white/95 mb-3 flex items-center justify-center gap-2">
                                {stat.decimals ? (
                                    <div className="flex items-center gap-2">
                                        <span>{stat.value}</span>
                                        {stat.showIcon && <Star className="w-7 h-7 fill-gold text-gold" />}
                                    </div>
                                ) : (
                                    <>
                                        <Counter end={stat.value} />
                                        {stat.suffix}
                                    </>
                                )}
                            </div>
                            <div className="text-white/60 text-sm md:text-base font-medium tracking-wide">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Smooth Wave Divider Bottom - Gentle curve */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient8" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                            <stop offset="25%" style={{ stopColor: '#4A4A4A', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#C9C5BE', stopOpacity: 1 }} />
                            <stop offset="75%" style={{ stopColor: '#E8E3DC', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,120 C300,80 600,80 900,100 C1050,110 1150,110 1200,105 L1200,120 L0,120 Z" fill="url(#waveGradient8)"></path>
                </svg>
            </div>
        </section>
    );
}

