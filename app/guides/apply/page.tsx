"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Upload, FileText, Languages, MapPin } from "lucide-react";

export default function ApplyGuidePage() {
    const [formData, setFormData] = useState({
        documentType: "citizenship",
        idNumber: "",
        description: "",
        experience: "",
        languages: [] as string[]
    });
    const [idPhoto, setIdPhoto] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement with guideApplicationService
        console.log("Application:", formData, idPhoto);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-heading font-bold text-ink mb-4">
                            Become a Guide
                        </h1>
                        <p className="text-warmGray text-lg">
                            Share your knowledge and earn money by guiding travelers
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-ink mb-2">
                                    Document Type
                                </label>
                                <select
                                    value={formData.documentType}
                                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold"
                                >
                                    <option value="citizenship">Citizenship</option>
                                    <option value="nid">National ID</option>
                                    <option value="license">License</option>
                                    <option value="pan">PAN Card</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-ink mb-2">
                                    ID Number
                                </label>
                                <input
                                    type="text"
                                    value={formData.idNumber}
                                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                                    placeholder="Enter your ID number"
                                    className="w-full px-4 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-ink mb-2">
                                    Upload ID Photo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setIdPhoto(e.target.files?.[0] || null)}
                                    className="w-full px-4 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none focus:border-gold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold/10 file:text-gold"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gold hover:bg-goldLight text-ink py-3 rounded-xl font-semibold transition-all"
                            >
                                Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
