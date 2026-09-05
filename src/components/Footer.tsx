import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  ShieldCheck,
  MapPin,
  Clock,
  Heart,
  Wrench,
  ChevronRight,
  Shield,
  Star,
  Globe,
} from "lucide-react";
import { COMPANY_INFO, SERVICES_DATA } from "../data/siteData";

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer id="footer" className="bg-slate-950 text-slate-400 border-t border-slate-850 pt-16 pb-24 md:pb-16 text-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Emergency Action Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-1 text-center md:text-left">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              24/7 Priority Emergency Attendance
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">Need a London Plumber <span className="italic text-amber-400">Right Now?</span></h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Our Gas Safe registered engineers are stationed across all London boroughs for rapid 30–45 minute arrival.
            </p>
          </div>

          <motion.a
            id="footer-emergency-call-cta"
            href={COMPANY_INFO.phoneTel}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base rounded-2xl shadow-lg transition-all flex items-center gap-3 cursor-pointer"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span>Call Now: {COMPANY_INFO.phone}</span>
          </motion.a>
        </motion.div>

        {/* 4-Column Layout with Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Column 1: Brand & Credentials */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-slate-900 border border-blue-400/30 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-lg font-serif font-bold text-white tracking-tight">
                My London <span className="text-amber-400 italic">Plumbers</span> Ltd
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              24/7 Plumbing &amp; Heating Services Across London. Experienced Gas Safe registered professionals providing rapid emergency diagnostics, boiler repairs, and complete heating replacements.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>5.0 Rating on Google (179+ Reviews)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Gas Safe Registered
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Home", href: "#hero" },
                { label: "Our Services", href: "#services" },
                { label: "Why Choose Us", href: "#why-choose-us" },
                { label: "Customer Reviews", href: "#reviews" },
                { label: "Emergency Boiler Replacement", href: "#emergency-boiler" },
                { label: "London Areas We Serve", href: "#areas-served" },
                { label: "About Us", href: "#about-us" },
                { label: "Contact & Quotes", href: "#contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollTo(item.href)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Plumbing & Heating Services */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Our Services</h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleScrollTo("#services")}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Coverage Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact &amp; Coverage</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href={COMPANY_INFO.phoneTel} className="font-bold hover:text-amber-300 block">
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="text-[11px] text-slate-500">24/7 Emergency Line</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.website}</span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>24 Hours a Day / 7 Days a Week</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>All Greater London Boroughs (EC, WC, W, SW, NW, N, E, SE)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal("privacy")}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal("terms")}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Legal Information Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white">
              {legalModal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
            </h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>My London Plumbers Ltd</strong> respects your privacy and is committed to protecting your personal data. Any contact details provided via this website or phone are used strictly to coordinate emergency plumbing, boiler servicing, and quote requests.
              </p>
              <p>
                All gas work is conducted by certified Gas Safe registered engineers under strict adherence to UK Building Regulations and Gas Safety (Installation and Use) Regulations 1998.
              </p>
              <p>
                Workmanship guarantees and manufacturer warranties apply to installations as specified in written work orders.
              </p>
            </div>
            <button
              onClick={() => setLegalModal(null)}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold block ml-auto cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
