"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showTrekDaiDropdown, setShowTrekDaiDropdown] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowTrekDaiDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                    <ul className="hidden md:flex space-x-8 items-center">
                        <li><Link href="/" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Home</Link></li>
                        <li><Link href="/destinations" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Destinations</Link></li>
                        <li><Link href="/stories" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Stories</Link></li>
                        <li><Link href="/photos" className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                            }`}>Photos</Link></li>
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowTrekDaiDropdown(!showTrekDaiDropdown)}
                                className={`font-medium transition-colors duration-300 flex items-center gap-1 ${isScrolled ? 'text-inkSoft hover:text-gold' : 'text-white hover:text-goldLight'
                                }`}
                            >
                                TrekDai
                                <ChevronDown className={`w-4 h-4 transition-transform ${showTrekDaiDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showTrekDaiDropdown && (
                                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50">
                                    <Link
                                        href="/trek-dai"
                                        onClick={() => setShowTrekDaiDropdown(false)}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                    >
                                        Find Guides
                                    </Link>
                                    <Link
                                        href="/my-requests"
                                        onClick={() => setShowTrekDaiDropdown(false)}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                    >
                                        My Requests
                                    </Link>
                                    <Link
                                        href="/guide/requests"
                                        onClick={() => setShowTrekDaiDropdown(false)}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                    >
                                        Guide Dashboard
                                    </Link>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <Link
                                        href="/trek-dai/Registerguide"
                                        onClick={() => setShowTrekDaiDropdown(false)}
                                        className="block px-4 py-2 text-green-600 hover:bg-green-50 font-semibold transition-colors"
                                    >
                                        Register as Guide
                                    </Link>
                                </div>
                            )}
                        </li>
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
                        <li><Link href="/" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Home</Link></li>
                        <li><Link href="/destinations" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Destinations</Link></li>
                        <li><Link href="/stories" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Stories</Link></li>
                        <li><Link href="/photos" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Photos</Link></li>
                        <li>
                            <div className="space-y-2">
                                <div className="font-semibold text-ink">TrekDai</div>
                                <div className="pl-4 space-y-2">
                                    <Link href="/trek-dai" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 text-sm">Find Guides</Link>
                                    <Link href="/my-requests" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 text-sm">My Requests</Link>
                                    <Link href="/guide/requests" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 text-sm">Guide Dashboard</Link>
                                    <Link href="/trek-dai/Registerguide" onClick={() => setIsOpen(false)} className="block text-green-600 hover:text-green-700 transition-colors duration-300 text-sm font-semibold">Register as Guide</Link>
                                </div>
                            </div>
                        </li>
                        <li><Link href="/profile" onClick={() => setIsOpen(false)} className="block text-inkSoft hover:text-gold transition-colors duration-300 font-medium">Profile</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
