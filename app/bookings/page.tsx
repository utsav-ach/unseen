"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, DollarSign, Clock } from "lucide-react";
import Image from "next/image";

export default function BookingsPage() {
    // TODO: Fetch from bookingService.getUserBookings()
    const mockBookings = [
        {
            id: "1",
            guideName: "Ram Bahadur",
            guideAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
            destination: "Everest Base Camp",
            startDate: "2026-05-01",
            endDate: "2026-05-15",
            status: "confirmed",
            totalAmount: 1500
        }
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-ink mb-8">
                        My Bookings
                    </h1>

                    <div className="space-y-6">
                        {mockBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-lg border border-border">
                                <div className="flex items-start gap-6 flex-wrap">
                                    <Image
                                        src={booking.guideAvatar}
                                        alt={booking.guideName}
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-heading font-bold text-ink mb-2">
                                            {booking.destination}
                                        </h3>
                                        <p className="text-warmGray mb-4">Guide: {booking.guideName}</p>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4 text-gold" />
                                                <span>{booking.startDate} - {booking.endDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <DollarSign className="w-4 h-4 text-gold" />
                                                <span>${booking.totalAmount}</span>
                                            </div>
                                            <div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-sage/20 text-sage' : 'bg-gold/20 text-gold'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
