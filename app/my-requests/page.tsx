"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Users, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { touristRequests } from "@/data/tourists";
import { guides } from "@/data/trek-dai";

export default function MyRequestsPage() {
    const router = useRouter();
    
    // In real app, this would come from auth/session
    // For now, we'll show all requests as if they're from the current user
    const currentUserId = "user-1"; // This would come from auth
    
    // Filter requests for current user (in real app)
    // For demo purposes, showing all requests
    const userRequests = touristRequests.map(request => {
        // Find the guide info
        const guide = guides.find(g => g.id.toString() === request.guideId.replace('guide-', ''));
        
        return {
            id: request.id,
            guideName: guide?.name || 'Unknown Guide',
            guideAvatar: guide?.avatar || request.touristAvatar,
            destination: request.destination,
            fromLocation: request.route.split(' → ')[0] || request.route,
            toLocation: request.route.split(' → ')[1] || request.route,
            numberOfDays: request.duration,
            numberOfPeople: request.groupSize,
            status: request.status,
            requestedDate: request.submittedAt,
            prepaymentAmount: request.prepaymentAmount
        };
    });
    
    const [requests] = useState(userRequests);
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

    const filteredRequests = filterStatus === "all" 
        ? requests 
        : requests.filter(req => req.status === filterStatus);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                        <Clock className="w-4 h-4" />
                        Pending
                    </span>
                );
            case "approved":
                return (
                    <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Approved
                    </span>
                );
            case "rejected":
                return (
                    <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        <XCircle className="w-4 h-4" />
                        Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    const statusCounts = {
        all: requests.length,
        pending: requests.filter(r => r.status === "pending").length,
        approved: requests.filter(r => r.status === "approved").length,
        rejected: requests.filter(r => r.status === "rejected").length
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream pt-20">
                {/* Header Section */}
                <section className="py-12 bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            My Trek Requests
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Track the status of your guide requests and manage your upcoming treks.
                        </p>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="py-8 bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2">
                            <button
                                onClick={() => setFilterStatus("all")}
                                className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all whitespace-nowrap ${
                                    filterStatus === "all"
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-900 hover:text-gray-900"
                                }`}
                            >
                                All Requests ({statusCounts.all})
                            </button>
                            <button
                                onClick={() => setFilterStatus("pending")}
                                className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all whitespace-nowrap ${
                                    filterStatus === "pending"
                                        ? "bg-yellow-600 text-white border-yellow-600"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-yellow-600 hover:text-yellow-600"
                                }`}
                            >
                                Pending ({statusCounts.pending})
                            </button>
                            <button
                                onClick={() => setFilterStatus("approved")}
                                className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all whitespace-nowrap ${
                                    filterStatus === "approved"
                                        ? "bg-green-600 text-white border-green-600"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-green-600 hover:text-green-600"
                                }`}
                            >
                                Approved ({statusCounts.approved})
                            </button>
                            <button
                                onClick={() => setFilterStatus("rejected")}
                                className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all whitespace-nowrap ${
                                    filterStatus === "rejected"
                                        ? "bg-red-600 text-white border-red-600"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-red-600 hover:text-red-600"
                                }`}
                            >
                                Rejected ({statusCounts.rejected})
                            </button>
                        </div>
                    </div>
                </section>

                {/* Requests List Section */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {filteredRequests.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Requests Found</h3>
                                <p className="text-gray-600 mb-6">
                                    {filterStatus === "all" 
                                        ? "You haven't made any trek requests yet." 
                                        : `You don't have any ${filterStatus} requests.`}
                                </p>
                                <button
                                    onClick={() => router.push("/trek-dai")}
                                    className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                                >
                                    Find a Guide
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            {/* Left Section - Guide & Trip Info */}
                                            <div className="flex items-start gap-4 flex-1">
                                                <img
                                                    src={request.guideAvatar}
                                                    alt={request.guideName}
                                                    className="w-16 h-16 rounded-full border-2 border-gray-200 flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 text-lg mb-1">
                                                                {request.destination}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">
                                                                Guide: <span className="font-semibold text-gray-900">{request.guideName}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-2 text-sm text-gray-600">
                                                        <div className="flex items-start gap-2">
                                                            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                                                            <span>{request.fromLocation} → {request.toLocation}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-4 h-4 text-green-600" />
                                                                <span>{request.numberOfDays} days</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Users className="w-4 h-4 text-green-600" />
                                                                <span>{request.numberOfPeople} {request.numberOfPeople === 1 ? 'person' : 'people'}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            Requested on {new Date(request.requestedDate).toLocaleDateString('en-US', { 
                                                                year: 'numeric', 
                                                                month: 'long', 
                                                                day: 'numeric' 
                                                            })}
                                                        </p>
                                                        {request.prepaymentAmount && (
                                                            <button
                                                                onClick={() => {
                                                                    const params = new URLSearchParams({
                                                                        trekName: request.destination,
                                                                        guideName: request.guideName,
                                                                        route: `${request.fromLocation} → ${request.toLocation}`,
                                                                        duration: request.numberOfDays.toString(),
                                                                        groupSize: request.numberOfPeople.toString(),
                                                                        amount: request.prepaymentAmount?.toString() || "0",
                                                                        requestDate: request.requestedDate,
                                                                        guideAvatar: request.guideAvatar,
                                                                    });
                                                                    router.push(`/my-requests/checkout?${params.toString()}`);
                                                                }}
                                                                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all cursor-pointer"
                                                            >
                                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                                <span className="text-sm font-semibold text-green-700">
                                                                    Requested Prepayment: ${request.prepaymentAmount.toLocaleString()}
                                                                </span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Section - Status */}
                                            <div className="flex items-center justify-end md:justify-center">
                                                {getStatusBadge(request.status)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                Ready for Your Next Adventure?
                            </h2>
                            <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
                                Explore more guides and destinations. Find the perfect companion for your next trek in Nepal.
                            </p>
                            <button
                                onClick={() => router.push("/trek-dai")}
                                className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Browse Guides
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
