"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { userProfile } from "@/data/profile";
import {
    MapPin,
    Calendar,
    Mail,
    Edit3,
    Star,
    Heart,
    MessageCircle,
    ThumbsUp,
    CheckCircle,
    Clock,
    User,
} from "lucide-react";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("bookings");
    const [showAllActivities, setShowAllActivities] = useState(false);
    const [showAllStats, setShowAllStats] = useState(false);

    const displayedActivities = showAllActivities
        ? userProfile.recentReviews
        : userProfile.recentReviews.slice(0, 1);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream pt-20">
                {/* Hero Section */}
                <section className="relative py-6 bg-white/80 backdrop-blur-sm border-b border-border">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                            {/* Profile Image */}
                            <div className="relative flex-shrink-0">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border">
                                    <Image
                                        src={userProfile.avatar}
                                        alt={userProfile.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-1">
                                    {userProfile.name}
                                </h1>

                                <p className="text-inkSoft text-sm leading-relaxed mb-2 max-w-2xl">
                                    {userProfile.bio}
                                </p>

                                <div className="flex items-center justify-center md:justify-start gap-3 text-warmGray text-xs mb-3">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>{userProfile.location}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>
                                            Joined{" "}
                                            {new Date(userProfile.joinedDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center md:justify-start">
                                    <Link
                                        href="/profile/edit"
                                        className="bg-ink text-white px-5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-inkSoft flex items-center gap-2"
                                    >
                                        <Edit3 className="w-3 h-3" />
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Activities & Unseen Stats Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Activities */}
                            <div className="bg-cream rounded-2xl p-8 shadow-sm border border-border">
                                <h3 className="font-heading text-2xl font-bold text-ink mb-6">
                                    Recent Activities
                                </h3>
                                <div className="space-y-4">
                                    {displayedActivities.map((review) => (
                                        <div
                                            key={review.id}
                                            className="bg-white rounded-xl p-4 border border-border hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-semibold text-ink">
                                                    {review.destinationName}
                                                </h4>
                                                <span className="text-xs text-warmGray">
                                                    {review.timeAgo}
                                                </span>
                                            </div>
                                            <p className="text-sm text-inkSoft mb-3 line-clamp-2">
                                                {review.reviewText}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < review.rating
                                                                ? "fill-gold text-gold"
                                                                : "text-border"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {userProfile.recentReviews.length > 3 && (
                                    <button
                                        onClick={() => setShowAllActivities(!showAllActivities)}
                                        className="w-full mt-4 text-sm text-gold hover:text-terracotta font-semibold transition-colors"
                                    >
                                        {showAllActivities ? "Show Less" : "Show More"}
                                    </button>
                                )}
                            </div>

                            {/* Unseen Stats */}
                            <div className="bg-cream rounded-2xl p-8 shadow-sm border border-border">
                                <h3 className="font-heading text-2xl font-bold text-ink mb-6">
                                    Unseen Stats
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-3 border-b border-border">
                                        <span className="text-sm text-warmGray">
                                            Destinations Planned
                                        </span>
                                        <span className="text-sm font-semibold text-ink">
                                            {userProfile.stats.destinationsPlanned}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-border">
                                        <span className="text-sm text-warmGray">Stories Shared</span>
                                        <span className="text-sm font-semibold text-ink">
                                            {userProfile.stats.storiesShared}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-border">
                                        <span className="text-sm text-warmGray">Bookings Made</span>
                                        <span className="text-sm font-semibold text-ink">
                                            {userProfile.stats.bookingsMade}
                                        </span>
                                    </div>
                                    {showAllStats && (
                                        <>
                                            <div className="flex items-center justify-between py-3 border-b border-border">
                                                <span className="text-sm text-warmGray">Average Rating</span>
                                                <span className="text-sm font-semibold text-ink flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-gold text-gold" />
                                                    {userProfile.stats.averageRating}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowAllStats(!showAllStats)}
                                    className="w-full mt-4 text-sm text-gold hover:text-terracotta font-semibold transition-colors"
                                >
                                    {showAllStats ? "Show Less" : "Show More"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Sections */}
                <section className="py-16 bg-cream">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {/* Tab Navigation */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 overflow-x-auto border-b border-border pb-4">
                                {[
                                    { id: "bookings", label: "Bookings" },
                                    { id: "stories", label: "Stories" },
                                    { id: "interactions", label: "Interactions" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? "bg-ink text-cream border-ink"
                                                : "bg-white text-inkSoft border-border hover:border-gold hover:text-ink hover:shadow-sm"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div>
                            {/* Bookings Tab */}
                            {activeTab === "bookings" && (
                                <div>
                                    <h2 className="font-heading text-3xl font-bold text-ink mb-8">
                                        Recent Bookings
                                    </h2>
                                    <div className="space-y-4">
                                        {userProfile.bookings.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="flex items-start gap-4 flex-1">
                                                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <User className="w-6 h-6 text-gold" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-heading text-lg font-bold text-ink mb-1">
                                                                {booking.destination}
                                                            </h3>
                                                            <p className="text-sm text-inkSoft mb-2">
                                                                Guide: {booking.guideName}
                                                            </p>
                                                            <div className="flex items-center gap-3 text-sm text-warmGray">
                                                                <div className="flex items-center gap-1">
                                                                    <Calendar className="w-4 h-4" />
                                                                    <span>
                                                                        {new Date(
                                                                            booking.date
                                                                        ).toLocaleDateString("en-US", {
                                                                            year: "numeric",
                                                                            month: "short",
                                                                            day: "numeric",
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {booking.status === "Completed" ? (
                                                            <span className="flex items-center gap-2 px-4 py-2 bg-sage/20 text-sage rounded-full text-sm font-semibold">
                                                                <CheckCircle className="w-4 h-4" />
                                                                Completed
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-2 px-4 py-2 bg-gold/20 text-terracotta rounded-full text-sm font-semibold">
                                                                <Clock className="w-4 h-4" />
                                                                Upcoming
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Stories Tab */}
                            {activeTab === "stories" && (
                                <div>
                                    <h2 className="font-heading text-3xl font-bold text-ink mb-8">
                                        Stories
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {userProfile.stories.map((story) => (
                                            <div
                                                key={story.id}
                                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                                            >
                                                <div className="relative h-48 overflow-hidden">
                                                    <Image
                                                        src={story.image}
                                                        alt={story.title}
                                                        width={400}
                                                        height={300}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="font-heading text-lg font-bold text-ink mb-2 line-clamp-2">
                                                        {story.title}
                                                    </h3>
                                                    <div className="flex items-center justify-between text-sm text-warmGray">
                                                        <span>{story.publishedTime}</span>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-1">
                                                                <Heart className="w-4 h-4" />
                                                                <span>{story.likes}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <MessageCircle className="w-4 h-4" />
                                                                <span>{story.comments}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Interactions Tab */}
                            {activeTab === "interactions" && (
                                <div>
                                    <h2 className="font-heading text-3xl font-bold text-ink mb-8">
                                        Recent Interactions
                                    </h2>
                                    <div className="space-y-3">
                                        {userProfile.interactions.map((interaction) => (
                                            <div
                                                key={interaction.id}
                                                className="bg-white rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-300"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                            interaction.type === "Liked"
                                                                ? "bg-terracotta/10"
                                                                : "bg-gold/10"
                                                        }`}
                                                    >
                                                        {interaction.type === "Liked" ? (
                                                            <ThumbsUp className="w-5 h-5 text-terracotta" />
                                                        ) : (
                                                            <MessageCircle className="w-5 h-5 text-gold" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-1">
                                                            <p className="text-sm font-semibold text-ink">
                                                                <span
                                                                    className={
                                                                        interaction.type === "Liked"
                                                                            ? "text-terracotta"
                                                                            : "text-gold"
                                                                    }
                                                                >
                                                                    {interaction.type}
                                                                </span>{" "}
                                                                {interaction.target}
                                                            </p>
                                                            <span className="text-xs text-warmGray">
                                                                {interaction.timeAgo}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-inkSoft line-clamp-1">
                                                            {interaction.preview}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
