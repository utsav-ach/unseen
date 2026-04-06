import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollPlane from "@/components/ScrollPlane";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import JourneySection from "@/components/JourneySection";
import ExperienceSection from "@/components/ExperienceSection";
import StatsSection from "@/components/StatsSection";
import FeaturedStories from "@/components/FeaturedStories";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <ScrollProgress />
            <Navbar />
            <ScrollPlane />
            <FloatingCTA />
            <Hero />
            <main className="bg-gradient-to-b from-cream via-white to-cream">
                {/* Quick Setup Banner */}
                <div className="bg-gold/10 border-b border-gold/30 py-3">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-sm text-ink">
                            🚀 <strong>First time here?</strong> Make sure to{" "}
                            <Link href="/test-db" className="underline font-semibold hover:text-gold">
                                test your database connection
                            </Link>
                            {" "}and{" "}
                            <Link href="/auth/signup" className="underline font-semibold hover:text-gold">
                                create an account
                            </Link>
                        </p>
                    </div>
                </div>

                <FeaturedDestinations />
                <JourneySection />
                <ExperienceSection />
                <StatsSection />
                <FeaturedStories />
                <TestimonialsSlider />
            </main>
            <Footer />
        </>
    );
}
