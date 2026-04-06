"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { authService } from "@/backend/backend/services";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const result = await authService.signUp(
            formData.email,
            formData.password,
            {
                first_name: formData.firstName,
                last_name: formData.lastName
            }
        );

        if (result.isSuccess) {
            alert("Signup successful! Please check your email to confirm your account.");
            router.push("/auth/login");
        } else {
            // Extract error message properly
            let errorMsg = "Signup failed. Please try again.";

            if (result.backendError) {
                if (typeof result.backendError === 'string') {
                    errorMsg = result.backendError;
                } else if (result.backendError instanceof Error) {
                    errorMsg = result.backendError.message;
                } else {
                    errorMsg = String(result.backendError);
                }
            }

            // Handle specific error messages
            if (errorMsg.includes("already registered")) {
                errorMsg = "Email already registered. Please use the login page instead.";
            } else if (errorMsg.includes("Password should be at least")) {
                errorMsg = "Password must be at least 8 characters long.";
            }

            setError(errorMsg);
        }

        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-heading font-bold text-ink mb-3">
                            Create Account
                        </h1>
                        <p className="text-warmGray">
                            Start your Nepal adventure today
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
                        {error && (
                            <div className="mb-4 p-4 bg-terracotta/10 border border-terracotta/30 rounded-xl text-terracotta text-sm">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-ink mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        placeholder="John"
                                        className="w-full px-4 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none transition-all duration-200 focus:border-gold"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-ink mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none transition-all duration-200 focus:border-gold"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-ink mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warmGray" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none transition-all duration-200 focus:border-gold"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-ink mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warmGray" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none transition-all duration-200 focus:border-gold"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-warmGray hover:text-ink"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-ink mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border-2 border-border rounded-xl bg-white text-ink outline-none transition-all duration-200 focus:border-gold"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gold hover:bg-goldLight text-ink py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? "Creating account..." : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-warmGray">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-gold hover:text-goldLight font-semibold">
                                Sign in
                            </Link>
                        </div>

                        <div className="mt-4 p-4 bg-gold/10 border border-gold/30 rounded-xl">
                            <p className="text-xs text-warmGray">
                                💡 <strong>Note:</strong> After signing up, you may need to verify your email.
                                Check your inbox for a verification link from Supabase.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
