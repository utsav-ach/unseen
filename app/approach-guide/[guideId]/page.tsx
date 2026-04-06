"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { guides } from "@/data/trek-dai";
import { CheckCircle, MapPin, Calendar, Users, Mountain, Star, Award } from "lucide-react";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
    </div>
  ),
});

export default function ApproachGuidePage() {
    const router = useRouter();
    const params = useParams();
    const guideId = params.guideId as string;
    
    const guide = guides.find(g => g.id === parseInt(guideId));
    
    const [formData, setFormData] = useState({
        // Tourist Information
        touristName: "",
        email: "",
        phone: "",
        
        // Trip Details
        destination: "",
        fromLocation: "",
        toLocation: "",
        startDate: "",
        endDate: "",
        numberOfDays: "",
        numberOfPeople: "",
        budget: "",
        experience: "Intermediate",
        accommodation: "Tea houses",
        transportation: "Flight",
        
        // Health & Dietary
        dietaryRestrictions: "",
        medicalConditions: "",
        
        // Emergency Contact
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        
        // Remarks
        remarks: "",
    });
    
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            
            // Redirect after 2 seconds
            setTimeout(() => {
                router.push("/my-requests");
            }, 2000);
        }, 1000);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    if (!guide) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-cream pt-20 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-ink mb-4">Guide not found</h1>
                        <button
                            onClick={() => router.push("/trek-dai")}
                            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                        >
                            Back to Guides
                        </button>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream pt-20">
                {/* Hero Section with Guide Info */}
                <section className="relative py-6 bg-white/80 backdrop-blur-sm border-b border-border">
                    <div className="max-w-6xl mx-auto px-6 md:px-12">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                            {/* Guide Avatar & Basic Info */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <img
                                        src={guide.avatar}
                                        alt={guide.name}
                                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-border object-cover"
                                    />
                                    {guide.verified && (
                                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                            <Award className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Guide Details */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-1">
                                    {guide.name}
                                </h1>

                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-sage" />
                                    <span className="text-sm text-inkSoft">{guide.location}</span>
                                </div>

                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <div className="flex items-center gap-1">
                                        {renderStars(guide.rating)}
                                    </div>
                                    <span className="text-sm font-semibold text-gold">{guide.rating}</span>
                                    <span className="text-xs text-warmGray">({guide.reviews} reviews)</span>
                                </div>

                                <p className="text-inkSoft text-sm leading-relaxed mb-3 max-w-2xl">
                                    {guide.bio}
                                </p>

                                <div className="flex items-center justify-center md:justify-start gap-3 text-warmGray text-xs">
                                    <span className="px-3 py-1 bg-sage/10 text-sage rounded-full font-medium">
                                        {guide.experience}
                                    </span>
                                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full font-medium">
                                        {guide.priceRange}
                                    </span>
                                    <span className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full font-medium">
                                        {guide.totalTrips} Treks
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="py-16">
                    <div className="max-w-5xl mx-auto px-6 md:px-12">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Send Trek Request
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Fill in your trek details below. {guide.name} will review your request and get back to you shortly.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                            {/* Form Header */}
                            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
                                <h3 className="text-white text-xl font-bold">Trek Information</h3>
                                <p className="text-green-50 text-sm mt-1">Please provide details about your planned trek</p>
                            </div>

                            <div className="p-8 md:p-10 space-y-8">
                                {/* Tourist Information Section */}
                                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        Your Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.touristName}
                                                onChange={(e) => setFormData(prev => ({ ...prev, touristName: e.target.value }))}
                                                placeholder="John Doe"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="john@example.com"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                placeholder="+1-555-0123"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Destination */}
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                        <Mountain className="w-4 h-4 text-green-600" />
                                        Destination
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.destination}
                                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                                        placeholder="e.g., Everest Base Camp, Annapurna Circuit"
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                        required
                                    />
                                </div>

                                {/* Route Section */}
                                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                        Trek Route
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Starting Point <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.fromLocation}
                                                onChange={(e) => setFormData(prev => ({ ...prev, fromLocation: e.target.value }))}
                                                placeholder="e.g., Lukla, Pokhara"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Ending Point <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.toLocation}
                                                onChange={(e) => setFormData(prev => ({ ...prev, toLocation: e.target.value }))}
                                                placeholder="e.g., Gorak Shep, Jomsom"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Trek Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            <Calendar className="w-4 h-4 text-green-600" />
                                            Start Date
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 font-medium"
                                            required
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            <Calendar className="w-4 h-4 text-green-600" />
                                            End Date
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 font-medium"
                                            required
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            <Calendar className="w-4 h-4 text-green-600" />
                                            Duration
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.numberOfDays}
                                                onChange={(e) => setFormData(prev => ({ ...prev, numberOfDays: e.target.value }))}
                                                placeholder="7"
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                                days
                                            </span>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            <Users className="w-4 h-4 text-green-600" />
                                            Group Size
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.numberOfPeople}
                                                onChange={(e) => setFormData(prev => ({ ...prev, numberOfPeople: e.target.value }))}
                                                placeholder="2"
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                                {formData.numberOfPeople === "1" ? "person" : "people"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Budget and Preferences */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            Budget Range
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.budget}
                                            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                                            placeholder="e.g., $2000-$3000 per person"
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                            required
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            Experience Level
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.experience}
                                            onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 font-medium"
                                            required
                                        >
                                            <option value="Beginner - First trek">Beginner - First trek</option>
                                            <option value="Intermediate - Some experience">Intermediate - Some experience</option>
                                            <option value="Advanced - Experienced trekker">Advanced - Experienced trekker</option>
                                        </select>
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            Accommodation Preference
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.accommodation}
                                            onChange={(e) => setFormData(prev => ({ ...prev, accommodation: e.target.value }))}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 font-medium"
                                            required
                                        >
                                            <option value="Tea houses">Tea houses</option>
                                            <option value="Hotels">Hotels</option>
                                            <option value="Camping">Camping</option>
                                            <option value="Mix of tea houses and hotels">Mix of tea houses and hotels</option>
                                            <option value="Tea houses and camping">Tea houses and camping</option>
                                        </select>
                                    </div>

                                    <div className="group">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                            Transportation
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.transportation}
                                            onChange={(e) => setFormData(prev => ({ ...prev, transportation: e.target.value }))}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 font-medium"
                                            required
                                        >
                                            <option value="Flight to Lukla included">Flight to Lukla included</option>
                                            <option value="Road transport">Road transport</option>
                                            <option value="Private vehicle to starting point">Private vehicle to starting point</option>
                                            <option value="Local bus from Kathmandu">Local bus from Kathmandu</option>
                                            <option value="Flight and road">Flight and road</option>
                                            <option value="Private jeep to trailhead">Private jeep to trailhead</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Health & Dietary Information */}
                                <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Health & Dietary Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Dietary Restrictions
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.dietaryRestrictions}
                                                onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                                                placeholder="e.g., Vegetarian, Vegan, None"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Medical Conditions
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.medicalConditions}
                                                onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                                                placeholder="e.g., Asthma, None"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Emergency Contact */}
                                <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Emergency Contact
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Contact Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.emergencyContactName}
                                                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                                                placeholder="Jane Doe"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.emergencyContactPhone}
                                                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                                                placeholder="+1-555-0124"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                                Relationship <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.emergencyContactRelationship}
                                                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactRelationship: e.target.value }))}
                                                placeholder="e.g., Spouse, Parent"
                                                className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400 font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Remarks Section */}
                                <div className="group">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Additional Remarks
                                        <span className="text-xs text-gray-500 normal-case font-normal">(Optional)</span>
                                    </label>
                                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-100 transition-all">
                                        <RichTextEditor
                                            value={formData.remarks}
                                            onChange={(value) => setFormData(prev => ({ ...prev, remarks: value }))}
                                            placeholder="Share any special requirements, preferences, or questions you have about the trek..."
                                            minHeight="200px"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 ml-1">
                                        You can use markdown formatting to structure your message
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="border-t-2 border-gray-200"></div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => router.push("/trek-dai")}
                                        className="w-full sm:w-auto px-8 py-4 text-gray-700 font-bold rounded-xl transition-all hover:bg-gray-100 border-2 border-gray-300 hover:border-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Sending Request...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                Send Trek Request
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-24 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-in slide-in-from-right">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Request Sent Successfully!</span>
                </div>
            )}

            <Footer />
        </>
    );
}
