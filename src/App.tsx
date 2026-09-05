import React, { useState, useCallback } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { EmergencyBanner } from "./components/EmergencyBanner";
import { ServicesSection } from "./components/ServicesSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { GoogleReviews } from "./components/GoogleReviews";
import { EmergencyBoilerSection } from "./components/EmergencyBoilerSection";
import { HowItWorks } from "./components/HowItWorks";
import { AreasServed } from "./components/AreasServed";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { AIChatbot } from "./components/AIChatbot";
import { QuoteModal } from "./components/QuoteModal";
import { OpeningSequence } from "./components/OpeningSequence";

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isOpeningDone, setIsOpeningDone] = useState(false);

  const handleOpeningComplete = useCallback(() => {
    setIsOpeningDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Website Opening Cinematic Sequence */}
      <OpeningSequence onComplete={handleOpeningComplete} />

      {/* Sticky Header */}
      <Header onOpenQuote={() => setIsQuoteModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenQuote={() => setIsQuoteModalOpen(true)} />

        {/* High Impact Emergency Banner */}
        <EmergencyBanner />

        {/* 6 Curved Service Cards Section */}
        <ServicesSection onOpenQuote={() => setIsQuoteModalOpen(true)} />

        {/* Why Choose Us & Animated Statistics */}
        <WhyChooseUs />

        {/* 5.0 Google Reviews Testimonials */}
        <GoogleReviews />

        {/* Emergency Boiler Replacement & Sizer Section */}
        <EmergencyBoilerSection onOpenQuote={() => setIsQuoteModalOpen(true)} />

        {/* 3-Step How It Works Section */}
        <HowItWorks />

        {/* Interactive Areas Served London Map & Postcode Checker */}
        <AreasServed />

        {/* About Us & FAQ Section */}
        <AboutSection />

        {/* Contact & Quote Form Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Call Bar */}
      <StickyMobileCTA />

      {/* Floating Circular 24/7 AI Assistant */}
      <AIChatbot />

      {/* Quick Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
