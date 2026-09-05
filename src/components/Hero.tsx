import React from "react";
import { motion } from "motion/react";
import { Phone, Shield, Star, Award, CheckCircle, Clock, Flame, ChevronRight } from "lucide-react";
import { COMPANY_INFO } from "../data/siteData";

interface HeroProps {
  onOpenQuote: () => void;
  onOpenBoilerEstimator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  // Headline words for staggered cinematic reveal with blur-to-sharp effect
  const headlineWords = [
    { text: "24/7", highlight: false },
    { text: "Emergency", highlight: false },
    { text: "Plumbing", highlight: false },
    { text: "&", highlight: false },
    { text: "Heating", highlight: false },
    { text: "Across", highlight: true, italic: true },
    { text: "London", highlight: true, italic: true },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800"
    >
      {/* Cinematic Animated Background Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Step 1: Small Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              {/* Google Reviews Badge */}
              <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm hover:border-amber-400/40 transition-colors">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-amber-300 font-bold">5.0 Google Rating</span>
                <span className="text-slate-400 hidden sm:inline">|</span>
                <span className="text-slate-300 font-normal">179+ Happy Customer Reviews</span>
              </div>

              {/* Gas Safe Badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gas Safe Registered</span>
              </div>
            </motion.div>

            {/* Step 2: Main Headline with Staggered Word Reveal & Blur-to-Sharp */}
            <div className="space-y-4">
              <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]/tight font-serif font-bold tracking-tight text-white flex flex-wrap gap-x-3 gap-y-1"
              >
                {headlineWords.map((item, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className={
                      item.highlight
                        ? "italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 inline-block"
                        : "inline-block text-white"
                    }
                  >
                    {item.text}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Step 3: Supporting Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
              >
                Fast, reliable plumbing, boiler and heating services from experienced Gas Safe registered professionals. Available 24 hours a day for emergencies across London.
              </motion.p>
            </div>

            {/* Feature Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs sm:text-sm font-medium text-slate-300"
            >
              {[
                "30-45 Min Avg Response",
                "No Hidden Fees",
                "All Boiler Makes Serviced",
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Step 4 & 5: CTA Buttons with Micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Call Now CTA */}
              <motion.a
                id="hero-call-now-cta"
                href={COMPANY_INFO.phoneTel}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 animate-bounce" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-black tracking-wider text-slate-900">
                    Emergency Dispatch
                  </span>
                  <span className="text-base sm:text-lg font-black tracking-tight">Call Now: {COMPANY_INFO.phone}</span>
                </div>
              </motion.a>

              {/* Secondary Request Quote CTA */}
              <motion.button
                id="hero-request-quote-cta"
                onClick={onOpenQuote}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group flex items-center justify-center gap-2 px-6 py-4 bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-sm sm:text-base rounded-2xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shadow-md hover:shadow-slate-800/50"
              >
                <span>Request a Quote</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Step 6: Trust Signal Badges Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
              className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-slate-800/70 text-xs text-slate-400"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-300">50+ Years of Plumbing Experience</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-slate-300">24 Hours / 365 Days</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-semibold text-slate-300">Boiler &amp; Gas Specialists</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Showcase with Reveal and Subtle Scale */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glowing halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-amber-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000"></div>

              {/* Main Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-850 border border-slate-700/80 shadow-2xl">
                {/* Hero Image */}
                <div className="relative h-72 sm:h-80 lg:h-96 w-full overflow-hidden bg-slate-900 group">
                  <motion.img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80"
                    alt="Experienced London Gas Safe plumber performing maintenance and boiler repair"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none"></div>

                  {/* Overlaid Floating Live Status Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="bg-slate-900/90 backdrop-blur-md text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-lg"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      On-Duty in London
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75, duration: 0.4 }}
                      className="bg-slate-900/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/30 shadow-lg"
                    >
                      24/7 Rapid Response
                    </motion.span>
                  </div>

                  {/* Overlaid Bottom Card Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.4 }}
                    className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white space-y-2 shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Gas Safe Registered Engineers</p>
                          <p className="text-[11px] text-slate-300">Fully Qualified &amp; Insured</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-amber-400 font-bold block">100% Guaranteed</span>
                        <span className="text-[10px] text-slate-400">Fixed Clear Rates</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Sub-strip with live dispatch counter */}
                <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Average Dispatch: <strong className="text-white">30–45 Mins</strong></span>
                  </div>
                  <a
                    href={COMPANY_INFO.phoneTel}
                    className="text-amber-400 font-bold hover:underline flex items-center gap-1 group"
                  >
                    <span>Direct Call Line</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
