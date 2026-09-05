import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  Check,
} from "lucide-react";
import { BOILER_BRANDS, COMPANY_INFO } from "../data/siteData";

interface EmergencyBoilerSectionProps {
  onOpenQuote: () => void;
}

export const EmergencyBoilerSection: React.FC<EmergencyBoilerSectionProps> = ({ onOpenQuote }) => {
  // Quick interactive Boiler Sizer calculation tool
  const [propertyType, setPropertyType] = useState<"flat" | "terraced" | "semi" | "detached">("flat");
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [urgency, setUrgency] = useState<"immediate" | "this-week" | "planning">("immediate");

  const getRecommendedKw = () => {
    if (propertyType === "flat" && bathroomCount === 1) return "24–28 kW Combi";
    if (propertyType === "terraced" || bathroomCount === 1) return "28–32 kW Combi";
    if (propertyType === "semi" || bathroomCount === 2) return "32–36 kW Combi or System";
    return "36–42 kW System / Regular Boiler";
  };

  const getEstimatedInstallTime = () => {
    if (urgency === "immediate") return "Same-Day Emergency Installation (Subject to survey)";
    return "Next-Day Scheduled Fitting";
  };

  return (
    <section id="emergency-boiler" className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & Urgency */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-red-400 animate-pulse" />
              Emergency Boiler Replacement Specialists
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Boiler Broken Down? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 italic">
                Fast Same-Day Replacement Across London
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              No heating or hot water in London? Our certified Gas Safe heating engineers supply and install A-rated energy-efficient boilers from leading UK brands with up to 10-year manufacturer warranties.
            </p>

            {/* Checklist of Advantages */}
            <div className="space-y-3 pt-2">
              {[
                { title: "Same-Day Emergency Installation", desc: "Fast survey and installation when your boiler cannot be safely repaired." },
                { title: "Top Boiler Brands Supplied & Fitted", desc: "Worcester Bosch, Vaillant, Ideal, Baxi, Viessmann & Glow-worm." },
                { title: "Up to 10-Year Manufacturer Warranty", desc: "Complete peace of mind with full parts and labour guarantees." },
                { title: "Chemical Powerflush & Magnetic Filter", desc: "Every replacement includes system cleansing for peak efficiency." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div>
                    <strong className="text-sm font-bold text-white block">{item.title}</strong>
                    <span className="text-xs text-slate-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Hotline CTA with Breathing Glow */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <motion.a
                id="boiler-emergency-call-cta"
                href={COMPANY_INFO.phoneTel}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <span>Call Boiler Line: {COMPANY_INFO.phone}</span>
              </motion.a>

              <motion.button
                id="boiler-online-quote-btn"
                onClick={onOpenQuote}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 bg-slate-850 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl border border-slate-700 transition-colors cursor-pointer"
              >
                Get a Fixed Price Quote
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Boiler Sizer Tool */}
          <motion.div
            initial={{ opacity: 0, x: 25, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 bg-slate-900 rounded-3xl p-7 sm:p-9 border border-slate-800 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Instant London Boiler Sizer</h3>
                  <p className="text-xs text-slate-400">Select your property details for instant recommendation:</p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-amber-400 px-2 py-1 rounded-md border border-slate-700">
                Live Tool
              </span>
            </div>

            {/* Step 1: Property Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                1. Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "flat", label: "Flat / Apt" },
                  { id: "terraced", label: "Terraced" },
                  { id: "semi", label: "Semi-Det." },
                  { id: "detached", label: "Detached" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPropertyType(type.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      propertyType === type.id
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md"
                        : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Bathrooms */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                2. Bathrooms / Showers
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: 1, label: "1 Bathroom" },
                  { count: 2, label: "2 Bathrooms" },
                  { count: 3, label: "3+ Bathrooms" },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setBathroomCount(item.count)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      bathroomCount === item.count
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md"
                        : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                3. Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "immediate", label: "🚨 No Heat Now" },
                  { id: "this-week", label: "📅 This Week" },
                  { id: "planning", label: "💡 Planning" },
                ].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      urgency === u.id
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md"
                        : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Result Box with Smooth Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${propertyType}-${bathroomCount}-${urgency}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Recommended Output:</span>
                  <span className="text-sm font-black text-amber-400">{getRecommendedKw()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Fitting Timeline:</span>
                  <span className="text-xs font-bold text-emerald-400">{getEstimatedInstallTime()}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                  <span>Available Brands: Worcester Bosch, Vaillant, Ideal</span>
                  <span className="text-slate-400 font-bold">10-Yr Warranty</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action inside Tool */}
            <motion.button
              id="boiler-sizer-book-survey-btn"
              onClick={onOpenQuote}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm Availability &amp; Fixed Price Survey</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Brand Logos Bar */}
        <div className="mt-16 pt-8 border-t border-slate-850 text-center">
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-6">
            Authorized Installers &amp; Specialists for Premier UK Boiler Brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70">
            {BOILER_BRANDS.map((brand, i) => (
              <span
                key={i}
                className="text-base sm:text-lg font-serif font-bold text-slate-300 tracking-wider hover:text-amber-400 transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
