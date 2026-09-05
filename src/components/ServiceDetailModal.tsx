import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, ShieldCheck, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { ServiceItem } from "../types";
import { COMPANY_INFO } from "../data/siteData";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenQuote,
}) => {
  return (
    <AnimatePresence>
      {service && (
        <div
          id="service-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden text-slate-900 border border-slate-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 sm:p-7 relative">
              <button
                id="close-service-modal-btn"
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {service.badge && (
                <span className="inline-block px-3 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-full mb-2">
                  {service.badge}
                </span>
              )}

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">{service.title}</h3>
              <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Response window: <strong>{service.typicalResponse}</strong> across London</span>
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Service Overview</h4>
                <p className="text-base text-slate-700 leading-relaxed">{service.fullDesc}</p>
              </div>

              {/* Highlights */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  What Our London Engineers Provide:
                </h4>
                <ul className="space-y-2.5">
                  {service.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency Safety Box if present */}
              {service.emergencyNote && (
                <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl flex items-start gap-3 text-amber-900 text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Important London Emergency Advice:</strong>
                    <span>{service.emergencyNote}</span>
                  </div>
                </div>
              )}

              {/* Price guide */}
              {service.priceGuide && (
                <p className="text-xs text-slate-500 font-medium">
                  * Pricing Note: {service.priceGuide}
                </p>
              )}
            </div>

            {/* Modal Footer CTAs */}
            <div className="p-5 sm:p-6 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <motion.a
                id="service-modal-call-btn"
                href={COMPANY_INFO.phoneTel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" /> Call 24/7: {COMPANY_INFO.phone}
              </motion.a>

              <motion.button
                id="service-modal-quote-btn"
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                <span>Request Online Quote</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
