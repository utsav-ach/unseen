"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Mail, Phone, MapPin, Edit, Camera, LogOut } from "lucide-react";
import Image from "next/image";
import { authService, profileService } from "@/backend/backend/services";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profileData, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const userResult = await authService.getCurrentUser();
        if (!userResult.isSuccess || !userResult.data) {
            router.push("/auth/login");
            return;
        }

        setUser(userResult.data);

        // Try to get profile data using RPC
        const profileResult = await profileService.getMyPrivateData(userResult.data.id);

        if (profileResult.isSuccess && profileResult.data && profileResult.data.profile) {
            setProfileData(profileResult.data);
        } else {
            // RPC failed, try direct fetch from profiles table
            const directResult = await profileService.getById(userResult.data.id);

            if (directResult.isSuccess && directResult.data) {
                // Create a structure similar to what RPC would return
                setProfileData({
                    profile: directResult.data,
                    recent_stories: [],
                    recent_bookings: [],
                    recent_reviews_given: []
                });
            } else {
                // Profile doesn't exist at all, create a basic one from user metadata
                setProfileData({
                    profile: {
                        id: userResult.data.id,
                        email: userResult.data.email,
                        first_name: userResult.data.user_metadata?.first_name || "User",
                        last_name: userResult.data.user_metadata?.last_name || "",
                        role: "traveler",
                        is_verified: false,
                        avatar_url: null,
                        phone_number: null,
                        home_location_name: null
                    },
                    recent_stories: [],
                    recent_bookings: [],
                    recent_reviews_given: []
                });
            }
        }

        setLoading(false);
    };

    const handleLogout = async () => {
        await authService.logout();
        router.push("/");
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-cream py-20 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-warmGray">Loading profile...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!profileData) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-cream py-20 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-warmGray">Profile not found</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const profile = profileData.profile;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-6">
                        <div className="flex items-start gap-6 flex-wrap">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold bg-gold/10">
                                    {profile.avatar_url ? (
                                        <Image
                                            src={profile.avatar_url}
                                            alt={profile.first_name || "User"}
                                            width={128}
                                            height={128}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-16 h-16 text-gold" />
                                        </div>
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg hover:bg-goldLight transition-colors">
                                    <Camera className="w-5 h-5 text-ink" />
                                </button>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-heading font-bold text-ink">
                                        {profile.first_name} {profile.last_name}
                                    </h1>
                                    {profile.is_verified && (
                                        <span className="px-3 py-1 bg-sage/20 text-sage rounded-full text-xs font-semibold">
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <p className="text-warmGray mb-4 capitalize">{profile.role}</p>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-6 py-2 bg-gold hover:bg-goldLight text-ink rounded-full font-semibold transition-all">
                                        <Edit className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-6 py-2 bg-terracotta hover:bg-terracotta/80 text-white rounded-full font-semibold transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-6">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Personal Information
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-sm text-warmGray">Email</p>
                                    <p className="font-semibold text-ink">{profile.email || user?.email || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-sm text-warmGray">Phone</p>
                                    <p className="font-semibold text-ink">{profile.phone_number || "Not provided"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-sm text-warmGray">Location</p>
                                    <p className="font-semibold text-ink">{profile.home_location_name || "Not provided"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <button className="bg-white hover:bg-cream p-6 rounded-2xl border border-border transition-all text-center">
                            <div className="text-3xl mb-2">📚</div>
                            <h3 className="font-semibold text-ink mb-1">My Stories</h3>
                            <p className="text-sm text-warmGray">{profileData.recent_stories?.length || 0} stories</p>
                        </button>
                        <button className="bg-white hover:bg-cream p-6 rounded-2xl border border-border transition-all text-center">
                            <div className="text-3xl mb-2">📅</div>
                            <h3 className="font-semibold text-ink mb-1">My Bookings</h3>
                            <p className="text-sm text-warmGray">{profileData.recent_bookings?.length || 0} bookings</p>
                        </button>
                        <button className="bg-white hover:bg-cream p-6 rounded-2xl border border-border transition-all text-center">
                            <div className="text-3xl mb-2">⭐</div>
                            <h3 className="font-semibold text-ink mb-1">My Reviews</h3>
                            <p className="text-sm text-warmGray">{profileData.recent_reviews_given?.length || 0} reviews</p>
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
