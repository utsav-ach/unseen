"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-cream/95 backdrop-blur-lg shadow-xl border-b border-border'
            : 'bg-gradient-to-b from-black/50 to-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className={`text-2xl font-heading font-bold transition-colors duration-300 ${isScrolled ? 'text-ink' : 'text-white'
                        }`}>
                        Unseen Nepal
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-8">
                        <li><Link href="/" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Home</Link></li>
                        <li><Link href="/destinations" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Destinations</Link></li>
                        <li><Link href="/stories" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Stories</Link></li>
                        <li><Link href="/photos" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Photos</Link></li>
                        <li><Link href="/trek-diary" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>TrekDai</Link></li>
                        <li><Link href="/profile" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Profile</Link></li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden focus:outline-none transition-colors duration-300 ${isScrolled ? 'text-ink' : 'text-white'
                            }`}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-cream/95 backdrop-blur-lg border-t border-border">
                    <ul className="px-4 py-4 space-y-3">
                        <li><Link href="/" className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Home</Link></li>
                        <li><Link href="/destinations" className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Destinations</Link></li>
                        <li><Link href="/stories" className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Stories</Link></li>
                        <li><Link href="/photos" className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Photos</Link></li>
                        <li><Link href="/trek-diary" className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Trek Diary</Link></li>
                        <li><Link href="/profile" className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Profile</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
