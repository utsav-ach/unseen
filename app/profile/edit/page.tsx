
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { userProfile } from "@/data/profile";
import { Camera, Save, Lock, AlertCircle } from "lucide-react";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-64 bg-cream rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
    ),
});

const countryCodes = [
    { code: "+93", country: "🇦🇫 Afghanistan" },
    { code: "+355", country: "🇦🇱 Albania" },
    { code: "+213", country: "🇩🇿 Algeria" },
    { code: "+1", country: "🇺🇸 USA" },
    { code: "+44", country: "🇬🇧 UK" },
    { code: "+91", country: "🇮🇳 India" },
    { code: "+977", country: "🇳🇵 Nepal" },
    { code: "+86", country: "🇨🇳 China" },
    { code: "+81", country: "🇯🇵 Japan" },
    { code: "+82", country: "🇰🇷 South Korea" },
    { code: "+61", country: "🇦🇺 Australia" },
    { code: "+64", country: "🇳🇿 New Zealand" },
    { code: "+33", country: "🇫🇷 France" },
    { code: "+49", country: "🇩🇪 Germany" },
    { code: "+39", country: "🇮🇹 Italy" },
    { code: "+34", country: "🇪🇸 Spain" },
    { code: "+7", country: "🇷🇺 Russia" },
    { code: "+55", country: "🇧🇷 Brazil" },
    { code: "+52", country: "🇲🇽 Mexico" },
    { code: "+27", country: "🇿🇦 South Africa" },
];

export default function EditProfilePage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(userProfile.avatar);


    const [formData, setFormData] = useState({
        firstName: userProfile.firstName || "",
        middleName: userProfile.middleName || "",
        lastName: userProfile.lastName || "",
        username: userProfile.username || "",
        bio: userProfile.bio,
        countryCode: userProfile.countryCode || "+977",
        phone: userProfile.phone || "",
        email: userProfile.email,
        location: {
            lat: 27.7172,
            lng: 85.324,
            name: userProfile.location,
        },
        locationInput: userProfile.location,
        emergencyContactName: userProfile.emergencyContact?.name || "",
        emergencyContactPhone: userProfile.emergencyContact?.phone || "",
        emergencyCountryCode: "+977",
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLocationChange = (location: { lat: number; lng: number; name: string }) => {
        setFormData((prev) => ({ ...prev, location, locationInput: location.name }));
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        console.log("Saving profile:", formData);
        alert("Profile updated successfully!");
        router.push("/profile");
    };

    const handleCancel = () => {
        router.push("/profile");
    };

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream pt-20">
                <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-border">
                    <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-ink mb-2">
                            Edit Profile
                        </h1>
                        <p className="text-warmGray text-base">
                            Manage your personal details and how others see you on Unseen Nepal
                        </p>
                    </div>
                </section>

                <section className="py-16 bg-white">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <div className="bg-cream rounded-2xl shadow-sm border border-border p-8 md:p-12">
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative mb-4">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border shadow-lg">
                                        <Image
                                            src={avatarPreview}
                                            alt="Profile"
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute bottom-0 right-0 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg hover:bg-goldLight transition-all duration-300 cursor-pointer"
                                    >
                                        <Camera className="w-5 h-5 text-ink" />
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        className="hidden"
                                    />
                                </div>
                                <label
                                    htmlFor="avatar-upload"
                                    className="px-6 py-2 bg-white text-ink rounded-lg font-medium hover:bg-border transition-colors cursor-pointer border border-border"
                                >
                                    Upload Photo
                                </label>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-heading text-2xl font-bold text-ink mb-6">
                                    Personal Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-inkSoft mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        firstName: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-inkSoft mb-2">
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.middleName}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        middleName: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink"
                                                placeholder="Middle Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-inkSoft mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        lastName: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium text-inkSoft mb-2">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warmGray">
                                                @
                                            </span>
                                            <input
                                                type="text"
                                                value={formData.username}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        username: e.target.value,
                                                    }))
                                                }
                                                className="w-full pl-8 pr-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink"
                                                placeholder="useless.insaan"
                                            />
                                        </div>
                                        <p className="text-xs text-warmGray mt-2">
                                            Used for your public story contributions
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-inkSoft">
                                                Bio
                                            </label>
                                            <button
                                                onClick={() => setPreviewMode(!previewMode)}
                                                className="text-xs text-gold hover:text-terracotta font-medium transition-colors"
                                            >
                                                {previewMode ? "Edit" : "Preview"}
                                            </button>
                                        </div>
                                        {previewMode ? (
                                            <div className="w-full min-h-[150px] px-4 py-3 bg-white border border-border rounded-lg text-ink prose prose-sm max-w-none">
                                                {formData.bio || "No bio yet..."}
                                            </div>
                                        ) : (
                                            <textarea
                                                value={formData.bio}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        bio: e.target.value,
                                                    }))
                                                }
                                                rows={6}
                                                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink resize-none"
                                                placeholder="Tell us about your love for Nepal..."
                                            />
                                        )}
                                       
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-heading text-2xl font-bold text-ink mb-6">
                                    Contact & Reach
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-inkSoft mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={formData.countryCode}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        countryCode: e.target.value,
                                                    }))
                                                }
                                                className="w-24 px-2 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink text-sm"
                                            >
                                                {countryCodes.map((item) => (
                                                    <option key={item.code} value={item.code}>
                                                        {item.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        phone: e.target.value,
                                                    }))
                                                }
                                                className="flex-1 min-w-0 px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink"
                                                placeholder="XXXXXXXXXX"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-inkSoft mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={formData.email}
                                                readOnly
                                                className="w-full px-4 py-3 pr-12 bg-white border border-border rounded-lg text-inkSoft cursor-not-allowed"
                                            />
                                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-inkSoft mb-3">
                                            Home Location
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.locationInput}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    locationInput: e.target.value,
                                                }))
                                            }
                                            className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink mb-3"
                                            placeholder="Enter your location (e.g., Kathmandu, Nepal)"
                                        />
                                        <LocationPicker
                                            onLocationChange={handleLocationChange}
                                            initialLocation={{
                                                lat: formData.location.lat,
                                                lng: formData.location.lng,
                                            }}
                                            editable={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="font-heading text-2xl font-bold text-ink mb-6">
                                    Emergency Contact
                                </h2>
                                <div className="space-y-6">
                                    <div className="bg-goldLight/30 border border-gold/20 rounded-xl p-4 flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-ink mb-1">
                                                Travel Safety
                                            </h3>
                                            <p className="text-sm text-inkSoft leading-relaxed">
                                                Providing emergency contact helps our guides ensure your safety during high-altitude treks. This information is kept strictly confidential.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-inkSoft mb-2">
                                            Contact Person Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.emergencyContactName}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    emergencyContactName: e.target.value,
                                                }))
                                            }
                                            className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink"
                                            placeholder="Full name of contact"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-inkSoft mb-2">
                                            Emergency Phone
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={formData.emergencyCountryCode}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        emergencyCountryCode: e.target.value,
                                                    }))
                                                }
                                                className="w-24 px-2 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink text-sm"
                                            >
                                                {countryCodes.map((item) => (
                                                    <option key={item.code} value={item.code}>
                                                        {item.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                value={formData.emergencyContactPhone}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        emergencyContactPhone: e.target.value,
                                                    }))
                                                }
                                                className="flex-1 min-w-0 px-4 py-3 bg-white border border-border rounded-lg focus:border-gold focus:outline-none transition-colors text-ink"
                                                placeholder="XXXXXXXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
                                <button
                                    onClick={handleCancel}
                                    className="px-8 py-3 text-inkSoft font-medium rounded-lg transition-colors hover:bg-white"
                                >
                                    Cancel Changes
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-ink text-white font-semibold rounded-lg transition-all duration-300 hover:bg-inkSoft flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
