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

export default function Home() {
    return (
        <>
            <ScrollProgress />
            <Navbar />
            <ScrollPlane />
            <FloatingCTA />
            <Hero />
            <main className="bg-gradient-to-b from-cream via-white to-cream">
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
