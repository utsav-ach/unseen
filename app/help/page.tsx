"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, Mail, Key, AlertCircle } from "lucide-react";

export default function HelpPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-heading font-bold text-ink mb-4">
                            Need Help Logging In?
                        </h1>
                        <p className="text-warmGray text-lg">
                            Follow these simple steps to access your account
                        </p>
                    </div>

                    {/* Current Status */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-8">
                        <h2 className="text-2xl font-heading font-bold text-ink mb-6">
                            Current Status
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-sage flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-ink">Signup Works!</p>
                                    <p className="text-sm text-warmGray">You already have an account (that's why you see "email already exists")</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <XCircle className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-ink">Can't Login</p>
                                    <p className="text-sm text-warmGray">You need to confirm your email first OR disable email confirmation</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Solution 1 */}
                    <div className="bg-gold/10 border-2 border-gold rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-ink font-bold">
                                1
                            </div>
                            <h2 className="text-2xl font-heading font-bold text-ink">
                                Fastest Solution: Disable Email Confirmation
                            </h2>
                        </div>

                        <div className="space-y-4 ml-13">
                            <div className="bg-white rounded-xl p-4">
                                <p className="font-semibold text-ink mb-2">Step 1: Go to Supabase Dashboard</p>
                                <a
                                    href="https://supabase.com/dashboard/project/gwhfdibumtvrritxpoxp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gold hover:text-goldLight underline text-sm"
                                >
                                    Open Supabase Dashboard →
                                </a>
                            </div>

                            <div className="bg-white rounded-xl p-4">
                                <p className="font-semibold text-ink mb-2">Step 2: Navigate to Email Settings</p>
                                <ol className="text-sm text-warmGray space-y-1 list-decimal list-inside">
                                    <li>Click "Authentication" in left sidebar</li>
                                    <li>Click "Providers"</li>
                                    <li>Click on "Email" provider</li>
                                    <li>Find "Confirm email" toggle</li>
                                    <li>Turn it OFF (disable it)</li>
                                    <li>Click "Save"</li>
                                </ol>
                            </div>

                            <div className="bg-white rounded-xl p-4">
                                <p className="font-semibold text-ink mb-2">Step 3: Create New Account</p>
                                <ol className="text-sm text-warmGray space-y-1 list-decimal list-inside">
                                    <li>Go to <a href="/auth/signup" className="text-gold hover:underline">/auth/signup</a></li>
                                    <li>Use a DIFFERENT email (not the one you used before)</li>
                                    <li>Fill in the form and submit</li>
                                    <li>You can login immediately - no email needed!</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Solution 2 */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center text-white font-bold">
                                2
                            </div>
                            <h2 className="text-2xl font-heading font-bold text-ink">
                                Alternative: Confirm Your Email
                            </h2>
                        </div>

                        <div className="space-y-3 ml-13">
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-sage flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-ink">Check Your Email</p>
                                    <p className="text-sm text-warmGray">Look for an email from Supabase in your inbox</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-ink">Click Confirmation Link</p>
                                    <p className="text-sm text-warmGray">Click the link in the email to activate your account</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Key className="w-5 h-5 text-sage flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-ink">Login</p>
                                    <p className="text-sm text-warmGray">Go to <a href="/auth/login" className="text-gold hover:underline">/auth/login</a> and use your credentials</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why This Happens */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-heading font-bold text-ink">
                                Why This Happens
                            </h2>
                        </div>
                        <p className="text-warmGray mb-4">
                            Supabase has email confirmation <strong>enabled by default</strong> for security. This means:
                        </p>
                        <ul className="space-y-2 text-warmGray">
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                <span>When you signup → Supabase sends a confirmation email</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                <span>You must click the link → Account gets activated</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                <span>Only then you can login</span>
                            </li>
                        </ul>
                        <p className="text-warmGray mt-4">
                            For development/testing, it's easier to disable this feature.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8 flex gap-4 justify-center">
                        <a
                            href="/auth/signup"
                            className="px-6 py-3 bg-gold hover:bg-goldLight text-ink rounded-full font-semibold transition-all"
                        >
                            Try Signup Again
                        </a>
                        <a
                            href="/auth/login"
                            className="px-6 py-3 bg-white hover:bg-cream text-ink rounded-full font-semibold transition-all border-2 border-border"
                        >
                            Try Login
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
