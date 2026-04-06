"use client";

import { useEffect, useState } from "react";
import { authService, profileService } from "@/backend/backend/services";
import { createClient } from "@/backend/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TestDBPage() {
    const [results, setResults] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        runTests();
    }, []);

    const runTests = async () => {
        const testResults: any = {};

        // Test 1: Get current user
        const userResult = await authService.getCurrentUser();
        testResults.currentUser = {
            success: userResult.isSuccess,
            data: userResult.data ? {
                id: userResult.data.id,
                email: userResult.data.email,
                metadata: userResult.data.user_metadata
            } : null,
            error: userResult.backendError
        };

        if (userResult.isSuccess && userResult.data) {
            const userId = userResult.data.id;

            // Test 2: Direct profile fetch
            const supabase = createClient();
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            testResults.directProfile = {
                success: !profileError,
                data: profileData,
                error: profileError?.message
            };

            // Test 3: Using profileService.getById
            const serviceResult = await profileService.getById(userId);
            testResults.serviceProfile = {
                success: serviceResult.isSuccess,
                data: serviceResult.data,
                error: serviceResult.backendError
            };

            // Test 4: Using RPC function
            const rpcResult = await profileService.getMyPrivateData(userId);
            testResults.rpcProfile = {
                success: rpcResult.isSuccess,
                data: rpcResult.data,
                error: rpcResult.backendError
            };

            // Test 5: Check if profile exists
            const { count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('id', userId);

            testResults.profileExists = {
                count: count,
                exists: count && count > 0
            };
        }

        setResults(testResults);
        setLoading(false);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-cream p-8 pt-24">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-4">Testing Database Connection...</h1>
                        <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full"></div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-cream p-8 pt-24">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Database Test Results</h1>

                    {Object.entries(results).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-white rounded-lg p-6 mb-4 shadow">
                            <h2 className="text-xl font-semibold mb-3 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h2>
                            <div className="mb-2">
                                <span className={`inline-block px-3 py-1 rounded ${value.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {value.success ? '✓ Success' : '✗ Failed'}
                                </span>
                            </div>
                            {value.error && (
                                <div className="bg-red-50 p-3 rounded mb-2">
                                    <strong>Error:</strong> {JSON.stringify(value.error)}
                                </div>
                            )}
                            <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm max-h-96">
                                {JSON.stringify(value.data, null, 2)}
                            </pre>
                        </div>
                    ))}

                    <button
                        onClick={runTests}
                        className="mt-4 px-6 py-3 bg-gold hover:bg-goldLight text-ink rounded-lg font-semibold"
                    >
                        Run Tests Again
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
