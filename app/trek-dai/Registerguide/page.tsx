"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Upload, FileText, MapPin, DollarSign, Search } from "lucide-react";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
    </div>
  ),
});

const ServiceAreaMap = dynamic(() => import("@/components/ServiceAreaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-50 rounded-xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>
  ),
});



const languages = ["Nepali", "English", "Hindi", "Chinese", "Japanese", "Korean", "French", "German", "Spanish"];

export default function RegisterGuidePage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    documentType: "National ID / Nagarikta",
    idNumber: "",
    idFile: null as File | null,
    professionalBio: "",
    previousExperience: "",
    knownLanguages: ["Nepali", "English"] as string[],
    baseRate: "",
    currentLocation: "",
    serviceRadius: 15,
    locationCoords: [27.7172, 85.324] as [number, number],
  });

  const [idFilePreview, setIdFilePreview] = useState<string | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      router.push("/trek-dai");
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, idFile: file }));
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setIdFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setIdFilePreview(null);
      }
    }
  };

  const toggleLanguage = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      knownLanguages: prev.knownLanguages.includes(lang)
        ? prev.knownLanguages.filter(l => l !== lang)
        : [...prev.knownLanguages, lang]
    }));
  };

  const geocodeLocation = async (locationName: string) => {
    if (!locationName.trim()) return;
    
    setIsGeocoding(true);
    try {
      // Using Nominatim OpenStreetMap API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName + ', Nepal')}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setFormData(prev => ({
          ...prev,
          locationCoords: [parseFloat(lat), parseFloat(lon)]
        }));
      } else {
        alert("Location not found. Please try a different location name.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Failed to geocode location. Please try again.");
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleLocationSearch = () => {
    if (formData.currentLocation) {
      geocodeLocation(formData.currentLocation);
    }
  };

  const handleLocationKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLocationSearch();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Header Section */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Become a Local Guide
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join our list of elite guides, and make yourself visible to our travelers across the globe.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Government ID Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900">
                    Government ID
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Type
                      </label>
                      <select
                        value={formData.documentType}
                        onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all text-gray-900"
                      >
                        <option>National ID / Nagarikta</option>
                        <option>Passport</option>
                        <option>Driving License</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID Number
                      </label>
                      <input
                        type="text"
                        value={formData.idNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                        placeholder="Enter ID/Passport number (e.g. year-id)"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clear ID Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="id-upload"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        required
                      />
                      <label
                        htmlFor="id-upload"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        {idFilePreview ? (
                          <img src={idFilePreview} alt="ID Preview" className="h-full w-auto object-contain rounded-lg" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 font-medium">
                              Drag and drop files here, or click to browse files
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Supported formats: JPG, PNG, PDF (Max 5MB)
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Expertise Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-gray-900">
                    Professional Expertise
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Bio
                    </label>
                    <RichTextEditor
                      value={formData.professionalBio}
                      onChange={(value) => setFormData(prev => ({ ...prev, professionalBio: value }))}
                      placeholder="Tell us about your philosophy as a guide..."
                      minHeight="150px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Experience
                    </label>
                    <RichTextEditor
                      value={formData.previousExperience}
                      onChange={(value) => setFormData(prev => ({ ...prev, previousExperience: value }))}
                      placeholder="List major treks, routes, or heritage sites you've guided..."
                      minHeight="150px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Known Languages
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.knownLanguages.includes(lang)
                              ? 'bg-green-600 text-white shadow-sm'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing + Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Rate
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.baseRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, baseRate: e.target.value }))}
                      placeholder="25"
                      className="w-full pl-12 pr-16 py-3 bg-white border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                      /hr
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Base Location
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.currentLocation}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentLocation: e.target.value }))}
                        onKeyPress={handleLocationKeyPress}
                        placeholder="e.g., Pokhara, Kathmandu"
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all text-gray-900 placeholder-gray-400"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleLocationSearch}
                      disabled={!formData.currentLocation || isGeocoding}
                      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGeocoding ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          <span className="hidden sm:inline">Search</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Enter a location and click Search or press Enter
                  </p>
                </div>
              </div>

              {/* Service Area Radius Section */}
              {formData.currentLocation && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <div className="mb-6">
                    <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                      Service Area Radius
                    </h2>
                    <p className="text-sm text-gray-600">
                      Define the area up to 50 km in radius around {formData.currentLocation}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700">
                          Radius
                        </label>
                        <span className="text-lg font-bold text-green-600">
                          {formData.serviceRadius} km
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={formData.serviceRadius}
                        onChange={(e) => setFormData(prev => ({ ...prev, serviceRadius: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                        style={{
                          background: `linear-gradient(to right, #166534 0%, #166534 ${(formData.serviceRadius / 50) * 100}%, #e5e7eb ${(formData.serviceRadius / 50) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 km</span>
                        <span>50 km</span>
                      </div>
                    </div>

                    <ServiceAreaMap 
                      center={formData.locationCoords}
                      radius={formData.serviceRadius}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => console.log("Draft saved")}
                  className="w-full sm:w-auto px-8 py-3 text-gray-700 font-semibold rounded-lg transition-all hover:bg-gray-100 border border-gray-300"
                >
                  Save Progress Draft
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Submit Application
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-in slide-in-from-right">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Application submitted successfully!</span>
        </div>
      )}

      <Footer />
    </>
  );
}
