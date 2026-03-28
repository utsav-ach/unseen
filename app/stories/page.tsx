"use client";

import { stories } from "@/data/stories";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/RichTextEditor";
import { BookOpen, Clock, User, Search, Bookmark, MapPin } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";

export default function StoriesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [savedStories, setSavedStories] = useState<number[]>([]);
    const [storyContent, setStoryContent] = useState("");

    const categories = ["All", "Adventure", "Culture", "Photography"];

    const filteredStories = stories.filter((story) => {
        const matchesSearch =
            story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === "All" || story.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleSave = (id: number) => {
        setSavedStories((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    // Featured stories (first 3)
    const featuredStories = stories.slice(0, 3);
    const gridStories = filteredStories.slice(3);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                {/* Hero Section */}
                <section className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "linear-gradient(to bottom, rgba(26,22,18,0.25) 0%, rgba(26,22,18,0.45) 55%, rgba(26,22,18,0.75) 100%), url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1800&q=80')",
                        }}
                    />

                    {/* Grain Texture */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")"
                    }} />

                    {/* Content */}
                    <div className="relative z-10 text-center px-6 max-w-3xl">
                        <div className="inline-flex items-center gap-3 text-goldLight text-xs font-semibold tracking-[2.5px] uppercase mb-5">
                            <span className="w-7 h-[1px] bg-goldLight opacity-70" />
                            Community Stories
                            <span className="w-7 h-[1px] bg-goldLight opacity-70" />
                        </div>

                        <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-5">
                            Share Your Journey<br />with <em className="italic text-goldLight">Nepal</em>
                        </h1>

                        <p className="text-base md:text-lg text-white/80 font-light tracking-wide mb-11 leading-relaxed max-w-2xl mx-auto">
                            Real adventures, honest experiences, and inspiring journeys from fellow travelers exploring the hidden wonders of Nepal.
                        </p>

                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <Link
                                href="#featured"
                                className="bg-gold text-ink px-9 py-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:bg-[#D4B478] hover:scale-105 hover:shadow-2xl shadow-lg"
                            >
                                Explore Stories
                            </Link>
                            <Link
                                href="#submit"
                                className="bg-transparent text-white px-8 py-[14px] rounded-full text-sm font-semibold tracking-wide border-[1.5px] border-white/50 transition-all duration-300 hover:bg-white/10 hover:border-white/90"
                            >
                                Submit Your Story
                            </Link>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                        <span className="text-[10px] tracking-[2px] uppercase text-white/50 font-medium">Scroll</span>
                        <div className="w-[1.5px] h-9 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
                    </div>
                </section>

                {/* Featured Stories Section */}
                <section id="featured" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
                            <div>
                                <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                                    <span className="w-6 h-[1.5px] bg-gold" />
                                    Featured
                                </div>
                                <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-ink leading-tight tracking-tight">
                                    Top <em className="italic text-terracotta">Stories</em>
                                </h2>
                            </div>
                        </div>

                        {/* Featured Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
                            {/* Hero Card */}
                            <Link
                                href={`/stories/${featuredStories[0].slug}`}
                                className="group lg:row-span-2 relative overflow-hidden rounded-2xl bg-ink cursor-pointer transition-all duration-[400ms] ease-out hover:-translate-y-1 hover:shadow-2xl min-h-[560px]"
                            >
                                <Image
                                    src={featuredStories[0].image}
                                    alt={featuredStories[0].title}
                                    fill
                                    className="object-cover opacity-85 transition-all duration-[600ms] ease-out group-hover:scale-105 group-hover:opacity-75"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,15,10,0.92)] via-[rgba(20,15,10,0.35)] to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[1.5px] uppercase mb-3 bg-gold/25 text-goldLight border border-gold/30">
                                        {featuredStories[0].category}
                                    </span>
                                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-3">
                                        {featuredStories[0].title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs text-white/65 mb-4">
                                        <span>{featuredStories[0].author}</span>
                                        <span className="w-[3px] h-[3px] rounded-full bg-white/35" />
                                        <span>{featuredStories[0].readTime}</span>
                                        <span className="w-[3px] h-[3px] rounded-full bg-white/35" />
                                        <span>{featuredStories[0].date}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={featuredStories[0].authorImage}
                                            alt={featuredStories[0].author}
                                            width={32}
                                            height={32}
                                            className="rounded-full border-2 border-white/30"
                                        />
                                        <span className="text-xs font-semibold text-white/80">
                                            {featuredStories[0].author}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Side Cards Container */}
                            <div className="grid grid-cols-1 gap-6">
                                {featuredStories.slice(1, 3).map((story) => (
                                    <Link
                                        key={story.id}
                                        href={`/stories/${story.slug}`}
                                        className="group relative overflow-hidden rounded-2xl bg-ink cursor-pointer transition-all duration-[400ms] ease-out hover:-translate-y-1 hover:shadow-2xl min-h-[264px]"
                                    >
                                        <Image
                                            src={story.image}
                                            alt={story.title}
                                            fill
                                            className="object-cover opacity-85 transition-all duration-[600ms] ease-out group-hover:scale-105 group-hover:opacity-75"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,15,10,0.92)] via-[rgba(20,15,10,0.35)] to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                                            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[1.5px] uppercase mb-3 bg-gold/25 text-goldLight border border-gold/30">
                                                {story.category}
                                            </span>
                                            <h3 className="font-heading text-lg font-bold text-white leading-tight tracking-tight mb-3">
                                                {story.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs text-white/65">
                                                <span>{story.author}</span>
                                                <span className="w-[3px] h-[3px] rounded-full bg-white/35" />
                                                <span>{story.readTime}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sticky Search & Filter Bar */}
                <div className="sticky top-[65px] z-40 bg-cream py-12 border-b border-border shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="flex items-center gap-5 flex-wrap">
                            {/* Search */}
                            <div className="flex-1 min-w-[220px] relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warmGray pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search stories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-5 py-[13px] border-[1.5px] border-border rounded-full bg-white text-sm text-ink outline-none transition-all duration-200 focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.12)]"
                                />
                            </div>

                            {/* Category Filters */}
                            <div className="flex items-center gap-3 flex-wrap">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-5 py-[10px] rounded-full border-[1.5px] text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${activeCategory === category
                                            ? "bg-ink text-cream border-ink"
                                            : "bg-white text-inkSoft border-border hover:border-gold hover:text-ink hover:shadow-sm"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stories Grid */}
                <section className="py-24 bg-cream">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {gridStories.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                {gridStories.map((story) => {
                                    const IconComponent = (LucideIcons as any)[story.iconName] || LucideIcons.BookOpen;
                                    const isSaved = savedStories.includes(story.id);

                                    return (
                                        <div
                                            key={story.id}
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-[350ms] ease-out hover:-translate-y-1.5"
                                        >
                                            {/* Image */}
                                            <div className="relative h-52 overflow-hidden group/card">
                                                <Link href={`/stories/${story.slug}`}>
                                                    <Image
                                                        src={story.image}
                                                        alt={story.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                                                    />
                                                </Link>

                                                {/* Category Tag */}
                                                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-[1.5px] uppercase bg-cream/90 text-terracotta backdrop-blur-sm">
                                                    {story.category}
                                                </span>

                                                {/* Save Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleSave(story.id);
                                                    }}
                                                    className={`absolute top-3 right-3 w-[34px] h-[34px] rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-sm ${isSaved
                                                        ? "bg-white text-terracotta"
                                                        : "bg-white/90 text-warmGray hover:bg-white hover:text-terracotta hover:scale-110"
                                                        }`}
                                                >
                                                    <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                                                </button>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase text-gold mb-3">
                                                    <MapPin className="w-3 h-3 text-terracotta" />
                                                    <span>Nepal</span>
                                                </div>

                                                <Link href={`/stories/${story.slug}`}>
                                                    <h3 className="font-heading text-lg font-bold text-ink leading-tight tracking-tight mb-4 hover:text-gold transition-colors">
                                                        {story.title}
                                                    </h3>
                                                </Link>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={story.authorImage}
                                                            alt={story.author}
                                                            width={28}
                                                            height={28}
                                                            className="rounded-full border-[1.5px] border-border"
                                                        />
                                                        <span className="text-xs font-semibold text-inkSoft">
                                                            {story.author}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-[11px] text-warmGray">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-[13px] h-[13px]" />
                                                            {story.readTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-4">📖</div>
                                <h3 className="font-heading text-2xl text-ink mb-3">No stories found</h3>
                                <p className="text-warmGray text-base">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="bg-ink text-cream py-16">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: "250+", label: "Stories Shared" },
                                { number: "50K+", label: "Monthly Readers" },
                                { number: "120+", label: "Contributors" },
                                { number: "15+", label: "Countries" },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center py-0 px-8 border-r border-white/10 last:border-r-0"
                                >
                                    <div className="font-heading text-4xl md:text-5xl font-black text-goldLight leading-none mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-[13px] font-medium text-white/55 tracking-wide">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Submit Story Section */}
                <section id="submit" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid md:grid-cols-2 gap-18 items-center">
                            {/* Left - Info */}
                            <div>
                                <div className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2.5px] uppercase mb-4">
                                    <span className="w-6 h-[1.5px] bg-gold" />
                                    Share Your Story
                                </div>

                                <h2 className="font-heading text-3xl md:text-4xl font-bold italic text-ink leading-snug tracking-tight mb-5">
                                    "Every journey has a story worth telling"
                                </h2>

                                <p className="text-base text-warmGray leading-relaxed mb-7">
                                    Share your Nepal adventure with our community. Inspire others with your journey, challenges, and triumphs. Your story could be the spark that ignites someone else's dream.
                                </p>

                                <ul className="flex flex-col gap-3">
                                    {[
                                        { icon: "✍️", text: "Rich text formatting tools" },
                                        { icon: "🌟", text: "Get featured on homepage" },
                                        { icon: "💬", text: "Connect with travelers" },
                                        { icon: "📸", text: "Embed images in your story" },
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-sm text-inkSoft font-medium">
                                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gold/10 flex-shrink-0 text-base">
                                                {feature.icon}
                                            </div>
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right - Enhanced Form with Rich Text Editor */}
                            <div className="bg-cream rounded-3xl p-10 border border-border shadow-sm">
                                <h3 className="font-heading text-2xl font-bold text-ink mb-6">
                                    Submit Your Story
                                </h3>

                                <form className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold tracking-wide text-ink uppercase mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 border-[1.5px] border-border rounded-xl bg-white text-sm text-ink outline-none transition-all duration-200 focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.12)]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold tracking-wide text-ink uppercase mb-2">
                                            Story Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="My Amazing Nepal Adventure"
                                            className="w-full px-4 py-3 border-[1.5px] border-border rounded-xl bg-white text-sm text-ink outline-none transition-all duration-200 focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.12)]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold tracking-wide text-ink uppercase mb-2">
                                            Your Story
                                        </label>
                                        <RichTextEditor
                                            content={storyContent}
                                            onChange={setStoryContent}
                                            placeholder="Share your experience in detail... Use the toolbar to format your story with headings, bold text, lists, and more."
                                        />
                                        <p className="text-xs text-warmGray mt-2 leading-relaxed">
                                            💡 Tip: Use headings to organize your story, bold for emphasis, and lists for key points
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold tracking-wide text-ink uppercase mb-2">
                                            Upload Images (Optional)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="w-full px-4 py-3 border-[1.5px] border-border rounded-xl bg-white text-sm text-ink outline-none transition-all duration-200 focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.12)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
                                        />
                                        <p className="text-xs text-warmGray mt-2 leading-relaxed">
                                            📸 You can upload multiple images for your story
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-ink text-cream py-3 rounded-full text-[13px] font-bold tracking-wide cursor-pointer border-none transition-all duration-200 hover:bg-gold hover:text-ink hover:-translate-y-[1px]"
                                    >
                                        Submit Story
                                    </button>

                                    <p className="text-center text-xs text-warmGray leading-relaxed mt-5">
                                        By submitting, you agree to our <strong className="text-gold">terms</strong> and <strong className="text-gold">privacy policy</strong>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#2C1F14] via-ink to-[#0E2218]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,169,110,0.1)_0%,transparent_60%)]" />

                    <div className="relative max-w-2xl mx-auto px-6 md:px-12 text-center">
                        <div className="inline-flex items-center gap-3 text-goldLight text-[11px] font-bold tracking-[2.5px] uppercase mb-4 justify-center">
                            <span className="w-6 h-[1.5px] bg-goldLight" />
                            Newsletter
                        </div>

                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
                            Never Miss a Story
                        </h2>

                        <p className="text-base text-white/60 leading-relaxed mb-9">
                            Get the latest travel stories, tips, and inspiration delivered to your inbox every week.
                        </p>

                        <form className="flex gap-3 bg-white/[0.07] border border-white/[0.12] rounded-full p-[6px] pl-6">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/40 min-w-0"
                            />
                            <button
                                type="submit"
                                className="bg-gold text-ink px-6 py-3 rounded-full text-[13px] font-bold border-none cursor-pointer transition-all duration-200 hover:bg-goldLight hover:translate-x-[2px] whitespace-nowrap tracking-wide"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
