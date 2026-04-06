"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/backend/backend/services";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const result = await authService.getCurrentUser();
        if (result.isSuccess && result.data) {
            setAuthenticated(true);
        } else {
            router.push("/auth/login");
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-warmGray">Loading...</p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }

    return <>{children}</>;
}
