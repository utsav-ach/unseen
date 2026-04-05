"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    MapPin,
    Calendar,
    Users,
    CreditCard,
    Smartphone,
    Wallet,
    Lock,
    CheckCircle,
    ArrowLeft,
    Shield,
} from "lucide-react";

interface CheckoutData {
    trekName: string;
    guideName: string;
    route: string;
    duration: number;
    groupSize: number;
    requestedAmount: number;
    requestDate: string;
    guideAvatar?: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "esewa" | "khalti" | "cash">("card");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [cardDetails, setCardDetails] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
    });

    const [billingDetails, setBillingDetails] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const data: CheckoutData = {
            trekName: searchParams.get("trekName") || "Trek",
            guideName: searchParams.get("guideName") || "Guide",
            route: searchParams.get("route") || "Route",
            duration: parseInt(searchParams.get("duration") || "0"),
            groupSize: parseInt(searchParams.get("groupSize") || "0"),
            requestedAmount: parseFloat(searchParams.get("amount") || "0"),
            requestDate: searchParams.get("requestDate") || new Date().toISOString(),
            guideAvatar: searchParams.get("guideAvatar") || undefined,
        };
        setCheckoutData(data);
    }, [searchParams]);

    const serviceFee = checkoutData ? checkoutData.requestedAmount * 0.05 : 0;
    const totalAmount = checkoutData ? checkoutData.requestedAmount + serviceFee : 0;

    const handlePayment = () => {
        if (!agreedToTerms) {
            alert("Please agree to the terms and conditions");
            return;
        }

        setIsProcessing(true);
        
        setTimeout(() => {
            setIsProcessing(false);
            setShowSuccess(true);
            
            setTimeout(() => {
                router.push("/my-requests");
            }, 3000);
        }, 2000);
    };

    if (!checkoutData) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-cream flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600">Loading checkout...</p>
                    </div>
                </div>
            </>
        );
    }

    if (showSuccess) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full animate-scale-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                            Payment Successful! 🎉
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Your prepayment of <span className="font-bold text-green-600">${checkoutData.requestedAmount.toLocaleString()}</span> has been processed.
                        </p>
                        <p className="text-sm text-gray-500">
                            Redirecting you back to your requests...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream pt-20 pb-12">
                <section className="py-8 bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Requests</span>
                        </button>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            Complete Your Booking
                        </h1>
                        <p className="text-lg text-gray-600">
                            Secure your trek by completing the prepayment
                        </p>
                    </div>
                </section>

                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                                    <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                                        Trek Summary
                                    </h2>
                                    
                                    {checkoutData.guideAvatar && (
                                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                                            <img
                                                src={checkoutData.guideAvatar}
                                                alt={checkoutData.guideName}
                                                className="w-12 h-12 rounded-full border-2 border-gray-200"
                                            />
                                            <div>
                                                <p className="text-sm text-gray-600">Your Guide</p>
                                                <p className="font-semibold text-gray-900">{checkoutData.guideName}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Trek</p>
                                            <p className="font-bold text-gray-900 text-lg">{checkoutData.trekName}</p>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-600">Route</p>
                                                <p className="font-medium text-gray-900">{checkoutData.route}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Duration</p>
                                                <p className="font-medium text-gray-900">{checkoutData.duration} days</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Group Size</p>
                                                <p className="font-medium text-gray-900">
                                                    {checkoutData.groupSize} {checkoutData.groupSize === 1 ? "person" : "people"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                        <div className="flex justify-between text-gray-700">
                                            <span>Prepayment Amount</span>
                                            <span className="font-semibold">${checkoutData.requestedAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Service Fee (5%)</span>
                                            <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-green-600 pt-3 border-t border-gray-200">
                                            <span>Total Amount</span>
                                            <span>${totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        <span>Secure payment processing</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                                        Payment Method
                                    </h2>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                paymentMethod === "card"
                                                    ? "border-green-600 bg-green-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <CreditCard className={`w-6 h-6 ${paymentMethod === "card" ? "text-green-600" : "text-gray-600"}`} />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">Card Payment</p>
                                                <p className="text-xs text-gray-600">Visa, Mastercard</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("esewa")}
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                paymentMethod === "esewa"
                                                    ? "border-green-600 bg-green-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <Smartphone className={`w-6 h-6 ${paymentMethod === "esewa" ? "text-green-600" : "text-gray-600"}`} />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">eSewa</p>
                                                <p className="text-xs text-gray-600">Digital wallet</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("khalti")}
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                paymentMethod === "khalti"
                                                    ? "border-green-600 bg-green-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <Wallet className={`w-6 h-6 ${paymentMethod === "khalti" ? "text-green-600" : "text-gray-600"}`} />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">Khalti</p>
                                                <p className="text-xs text-gray-600">Digital wallet</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("cash")}
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                                paymentMethod === "cash"
                                                    ? "border-green-600 bg-green-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <Wallet className={`w-6 h-6 ${paymentMethod === "cash" ? "text-green-600" : "text-gray-600"}`} />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">Cash</p>
                                                <p className="text-xs text-gray-600">Pay in person</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {paymentMethod === "card" && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                        <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
                                            Card Details
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cardDetails.name}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cardDetails.number}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={cardDetails.expiry}
                                                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={cardDetails.cvv}
                                                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                        placeholder="123"
                                                        maxLength={3}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {(paymentMethod === "esewa" || paymentMethod === "khalti") && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                        <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">
                                            {paymentMethod === "esewa" ? "eSewa" : "Khalti"} Payment
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            You will be redirected to {paymentMethod === "esewa" ? "eSewa" : "Khalti"} to complete your payment securely.
                                        </p>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <p className="text-sm text-green-800">
                                                <Lock className="w-4 h-4 inline mr-2" />
                                                Secure payment gateway
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === "cash" && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                        <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">
                                            Cash Payment
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            You can pay in cash when you meet your guide. Please confirm this arrangement with your guide.
                                        </p>
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <p className="text-sm text-yellow-800">
                                                Note: Cash payments should be confirmed with your guide before the trek.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
                                        Billing Details
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={billingDetails.fullName}
                                                onChange={(e) => setBillingDetails({ ...billingDetails, fullName: e.target.value })}
                                                placeholder="Your full name"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={billingDetails.email}
                                                onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={billingDetails.phone}
                                                onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                                                placeholder="+977 98XXXXXXXX"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-start gap-3 mb-6">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-600"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-700">
                                            I agree to the{" "}
                                            <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                                                terms and conditions
                                            </a>{" "}
                                            and understand the cancellation policy
                                        </label>
                                    </div>

                                    <div className="hidden sm:flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => router.back()}
                                            className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handlePayment}
                                            disabled={!agreedToTerms || isProcessing}
                                            className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                                                agreedToTerms && !isProcessing
                                                    ? "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="w-5 h-5" />
                                                    Pay ${totalAmount.toFixed(2)}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mobile Sticky Payment Button */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
                    <button
                        onClick={handlePayment}
                        disabled={!agreedToTerms || isProcessing}
                        className={`w-full px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                            agreedToTerms && !isProcessing
                                ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Lock className="w-5 h-5" />
                                Pay ${totalAmount.toFixed(2)}
                            </>
                        )}
                    </button>
                </div>
            </main>

            <Footer />
        </>
    );
}
