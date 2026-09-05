import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Navigation, Clock, CheckCircle2, Search, ArrowRight, Shield } from "lucide-react";
import { LONDON_AREAS, COMPANY_INFO } from "../data/siteData";

export const AreasServed: React.FC = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>("central-london");
  const [postcodeInput, setPostcodeInput] = useState<string>("");
  const [postcodeCheckResult, setPostcodeCheckResult] = useState<{
    found: boolean;
    areaName?: string;
    responseTime?: string;
    message?: string;
  } | null>(null);

  const selectedArea = LONDON_AREAS.find((a) => a.id === selectedAreaId) || LONDON_AREAS[0];

  const handlePostcodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcodeInput.trim()) return;

    const cleaned = postcodeInput.trim().toUpperCase().replace(/\s+/g, "");
    const prefix = cleaned.slice(0, cleaned.length >= 3 ? 3 : 2);

    let match = LONDON_AREAS.find((area) =>
      area.postcodes.some((pc) => cleaned.startsWith(pc) || pc.startsWith(prefix))
    );

    if (match) {
      setPostcodeCheckResult({
        found: true,
        areaName: match.name,
        responseTime: match.typicalArrivalMins,
        message: `Priority 24/7 Coverage confirmed for ${postcodeInput.toUpperCase()} (${match.name}). Typical arrival is ${match.typicalArrivalMins}.`,
      });
    } else {
      setPostcodeCheckResult({
        found: true,
        areaName: "Greater London Area",
        responseTime: "30–45 mins",
        message: `Active 24/7 emergency plumbers covering ${postcodeInput.toUpperCase()} across Greater London. Estimated arrival: 30–45 mins.`,
      });
    }
  };

  return (
    <section id="areas-served" className="py-20 lg:py-28 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            London-Wide Coverage
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Professional Plumbing Services <span className="italic text-blue-700">Across London</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you need emergency plumbers in London for a midnight pipe rupture or a certified gas engineer in London for same-day boiler repairs, our mobile engineers are stationed across all boroughs.
          </p>
        </motion.div>

        {/* Interactive Postcode Quick Check Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-14 bg-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Live Postcode Response Check</h4>
              <p className="text-xs text-slate-400">Enter your London postcode (e.g., SW1, N1, W8, E1, SE10) for instant arrival estimate:</p>
            </div>
          </div>

          <form onSubmit={handlePostcodeCheck} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="postcode-search-input"
                type="text"
                placeholder="Enter London postcode (e.g. SW1, NW3, E14)..."
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <motion.button
              id="postcode-check-submit-btn"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check Arrival Time</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Result Alert Box with Animation */}
          <AnimatePresence>
            {postcodeCheckResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-white block font-bold">{postcodeCheckResult.message}</strong>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-300 pt-1">
                    <span>⚡ On-Call Vans in Sector</span>
                    <span>• No Out-of-Hours Surcharge</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {LONDON_AREAS.map((area) => (
            <button
              key={area.id}
              id={`area-tab-${area.id}`}
              onClick={() => setSelectedAreaId(area.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedAreaId === area.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>

        {/* Selected Area Detail Showcase with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArea.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">{selectedArea.name}</h3>
                    <p className="text-xs font-semibold text-blue-700">Dedicated Mobile Engineering Unit</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedArea.description}
                </p>

                {/* Key Boroughs Covered */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block">
                    Key Boroughs &amp; Neighborhoods:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedArea.boroughs.map((b, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 shadow-xs"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Postcodes Covered */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block">
                    Postcodes Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArea.postcodes.map((pc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded-lg text-xs font-mono font-bold border border-blue-200/60"
                      >
                        {pc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Speed Card */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Response Time</span>
                  </div>
                  <span className="text-base font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {selectedArea.typicalArrivalMins}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Available 24 Hours / 7 Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Gas Safe Certified Engineers on Standby</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Fully Stocked Emergency Vans</span>
                  </div>
                </div>

                <motion.a
                  id={`area-call-btn-${selectedArea.id}`}
                  href={COMPANY_INFO.phoneTel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Dispatch Plumber to {selectedArea.name}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
