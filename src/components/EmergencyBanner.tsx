import React from "react";
import { motion } from "motion/react";
import { Phone, AlertTriangle, Zap } from "lucide-react";
import { COMPANY_INFO } from "../data/siteData";

export const EmergencyBanner: React.FC = () => {
  return (
    <motion.section
      id="emergency-banner"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="24/7 Emergency Plumbing Notice"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-1 shadow-2xl shadow-amber-950/20">
        <div className="rounded-[22px] bg-slate-950 px-6 py-6 sm:px-8 sm:py-7 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Emergency Alert Icon & Text */}
            <div className="flex items-start sm:items-center gap-4 text-left">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center flex-shrink-0"
              >
                <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              </motion.div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-red-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
                    Immediate London Response
                  </span>
                  <span className="hidden sm:inline-block text-xs text-amber-300 font-semibold">
                    • 30-45 Mins Average Arrival
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
                  Plumbing <span className="italic text-amber-300">Emergency?</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-normal">
                  Don't wait. Our emergency plumbing team is available 24/7 across London.
                </p>
              </div>
            </div>

            {/* Right: Big Impact Call Button with Micro-interactions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <motion.a
                id="emergency-banner-call-btn"
                href={COMPANY_INFO.phoneTel}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-amber-400/30 hover:shadow-amber-400/50 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 animate-bounce" />
                </div>
                <span>Call {COMPANY_INFO.phone}</span>
              </motion.a>

              <div className="text-center lg:text-left text-[11px] text-slate-400 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero call-out surcharge on arrival estimate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
