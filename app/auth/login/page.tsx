"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { authService } from "@/backend/backend/services";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await authService.loginWithEmail(email, password);

        if (result.isSuccess && result.data) {
            router.push("/");
        } else {
            // Extract error message properly
            let errorMsg = "Invalid login credentials";

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
            if (errorMsg.includes("Invalid login credentials")) {
                errorMsg = "Invalid login credentials. Make sure your email is confirmed in Supabase.";
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
                            Welcome Back
                        </h1>
                        <p className="text-warmGray">
                            Sign in to continue your Nepal adventure
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
                        {error && (
                            <div className="mb-4 p-4 bg-terracotta/10 border border-terracotta/30 rounded-xl text-terracotta text-sm">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-ink mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warmGray" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                                    <span className="text-warmGray">Remember me</span>
                                </label>
                                <Link href="/auth/forgot-password" className="text-gold hover:text-goldLight">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gold hover:bg-goldLight text-ink py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-warmGray">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="text-gold hover:text-goldLight font-semibold">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
