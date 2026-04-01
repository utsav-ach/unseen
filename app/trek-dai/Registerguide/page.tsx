"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

export default function RegisterGuidePage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    phone: "",
    email: "",
    bio: "",
    citizenship: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      router.push("/trek-dai");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 text-gold text-xs font-bold tracking-[2.5px] uppercase mb-4">
              <span className="w-6 h-[1.5px] bg-gold" />
              Join Our Team
              <span className="w-6 h-[1.5px] bg-gold" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-ink leading-tight tracking-tight mb-4">
              Register as <em className="italic text-terracotta">Trek Guide</em>
            </h1>
            <p className="text-lg text-warmGray leading-relaxed max-w-2xl mx-auto">
              Share your expertise with travelers from around the world.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, District"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977-XXXXXXXXXX"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-2">Bio *</label>
                <textarea
                  name="bio"
                  required
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink placeholder-gray-400 resize-none focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Profile Photo *</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 focus:outline-none focus:border-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">Citizenship Number *</label>
                  <input
                    type="text"
                    name="citizenship"
                    required
                    value={formData.citizenship}
                    onChange={handleChange}
                    placeholder="Citizenship number"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-2">Citizenship Document *</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-ink file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 focus:outline-none focus:border-green-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-8 py-4 rounded-full text-base font-bold tracking-wide transition-all hover:bg-green-700 hover:scale-105 shadow-lg"
              >
                Submit Application
              </button>

              <p className="text-center text-sm text-gray-600 leading-relaxed">
                By submitting, you agree to our terms and privacy policy.
              </p>
            </form>
          </div>
        </div>

        {showSuccess && (
          <div className="fixed top-24 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Application submitted!</span>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
