import React from "react";
import { Phone, Shield, Clock } from "lucide-react";
import { COMPANY_INFO } from "../data/siteData";

export const StickyMobileCTA: React.FC = () => {
  return (
    <div
      id="sticky-mobile-cta-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 shadow-2xl safe-bottom"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col text-left pl-1">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            24/7 Emergency Plumber
          </span>
          <span className="text-xs font-bold text-white tracking-tight">London Dispatch</span>
        </div>

        <a
          id="sticky-mobile-call-btn"
          href={COMPANY_INFO.phoneTel}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-400 active:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span>Call Now ({COMPANY_INFO.phone})</span>
        </a>
      </div>
    </div>
  );
};
