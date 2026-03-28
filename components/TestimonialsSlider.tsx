"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "United States",
        rating: 5,
        text: "Unseen Nepal showed me places I never knew existed. The hidden trails and authentic experiences were beyond my expectations!",
        image: "🧑‍🦰"
    },
    {
        id: 2,
        name: "Raj Patel",
        location: "United Kingdom",
        rating: 5,
        text: "Best travel experience of my life. The guides were knowledgeable and the destinations were absolutely breathtaking.",
        image: "👨"
    },
    {
        id: 3,
        name: "Emma Wilson",
        location: "Australia",
        rating: 5,
        text: "As a solo female traveler, I felt completely safe. The team went above and beyond to ensure an unforgettable journey.",
        image: "👩"
    },
    {
        id: 4,
        name: "Michael Chen",
        location: "Canada",
        rating: 5,
        text: "The hidden gems we discovered were incredible. This isn't your typical tourist experience - it's authentic Nepal!",
        image: "👨‍💼"
    }
];

export default function TestimonialsSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 px-4 bg-gradient-to-b from-cream via-[#F5F3EF] to-cream relative">
            {/* Wave Divider Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient11" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#F5F3EF', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,0 C200,70 400,70 600,40 C800,10 1000,10 1200,40 L1200,0 L0,0 Z" fill="url(#waveGradient11)"></path>
                </svg>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                        <span className="w-6 h-[1.5px] bg-gold" />
                        Testimonials
                    </div>
                    <h2 className="text-5xl font-heading font-bold text-ink mb-4">
                        What Travelers Say
                    </h2>
                    <p className="text-warmGray text-xl">Real experiences from real adventurers</p>
                </div>

                <div className="relative h-80 md:h-64">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 h-full flex flex-col justify-between border border-border">
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonials[current].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                                        ))}
                                    </div>
                                    <p className="text-inkSoft text-lg md:text-xl italic mb-6">
                                        &ldquo;{testimonials[current].text}&rdquo;
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">{testimonials[current].image}</div>
                                    <div>
                                        <div className="font-bold text-ink text-lg">
                                            {testimonials[current].name}
                                        </div>
                                        <div className="text-warmGray">
                                            {testimonials[current].location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-gold w-8" : "bg-border"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Wave Divider Bottom with smooth gradient to dark */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient12" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FAF8F4', stopOpacity: 1 }} />
                            <stop offset="40%" style={{ stopColor: '#E8E3DC', stopOpacity: 1 }} />
                            <stop offset="70%" style={{ stopColor: '#8C8480', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#1A1612', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path d="M0,120 C200,50 400,50 600,80 C800,110 1000,110 1200,80 L1200,120 L0,120 Z" fill="url(#waveGradient12)"></path>
                </svg>
            </div>

            {/* Soft glow for smooth transition */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-ink/10 via-warmGray/5 to-transparent pointer-events-none"></div>
        </section>
    );
}
