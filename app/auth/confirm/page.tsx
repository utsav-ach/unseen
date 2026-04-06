"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/backend/supabase/client";

export default function ConfirmPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token_hash = searchParams.get("token_hash");
        const type = searchParams.get("type");

        if (token_hash && type) {
            verifyEmail(token_hash, type);
        } else {
            setStatus("error");
            setMessage("Invalid confirmation link");
        }
    }, [searchParams]);

    const verifyEmail = async (token_hash: string, type: string) => {
        try {
            const { error } = await supabase.auth.verifyOtp({
                token_hash,
                type: type as any,
            });

            if (error) {
                setStatus("error");
                setMessage(error.message);
            } else {
                setStatus("success");
                setMessage("Email confirmed successfully!");
                setTimeout(() => router.push("/"), 2000);
            }
        } catch (err: any) {
            setStatus("error");
            setMessage(err.message || "Verification failed");
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
                        {status === "loading" && (
                            <>
                                <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <h1 className="text-2xl font-heading font-bold text-ink mb-2">
                                    Confirming Email
                                </h1>
                                <p className="text-warmGray">Please wait...</p>
                            </>
                        )}

                        {status === "success" && (
                            <>
                                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">✓</span>
                                </div>
                                <h1 className="text-2xl font-heading font-bold text-ink mb-2">
                                    Email Confirmed!
                                </h1>
                                <p className="text-warmGray mb-4">{message}</p>
                                <p className="text-sm text-warmGray">Redirecting to home...</p>
                            </>
                        )}

                        {status === "error" && (
                            <>
                                <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">✗</span>
                                </div>
                                <h1 className="text-2xl font-heading font-bold text-ink mb-2">
                                    Confirmation Failed
                                </h1>
                                <p className="text-terracotta mb-4">{message}</p>
                                <button
                                    onClick={() => router.push("/auth/login")}
                                    className="px-6 py-3 bg-gold hover:bg-goldLight text-ink rounded-full font-semibold transition-all"
                                >
                                    Go to Login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
