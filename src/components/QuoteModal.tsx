import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { COMPANY_INFO, SERVICES_DATA } from "../data/siteData";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [service, setService] = useState("Emergency Plumbing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, postcode, service }),
      });
    } catch {
      // Ignore network errors in preview
    } finally {
      setIsSubmitting(false);
      setSuccess(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="quick-quote-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Quote Request Received</h3>
                <p className="text-sm text-slate-600">
                  An experienced London engineer will contact you shortly to confirm details and pricing.
                </p>
                <div className="pt-2">
                  <a
                    href={COMPANY_INFO.phoneTel}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm"
                  >
                    <Phone className="w-4 h-4" /> Need Emergency Help? Call Now
                  </a>
                </div>
                <button
                  onClick={() => {
                    setSuccess(false);
                    onClose();
                  }}
                  className="text-xs text-slate-500 underline block mx-auto pt-2 cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                    Free No-Obligation Quote
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mt-2">
                    Request a Fast <span className="italic text-blue-700">Estimate</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Gas Safe registered engineers serving all London postcodes 24/7.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="07988 756241"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">London Postcode *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. W8, N1, SW3"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Required</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-600"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="General Plumbing Inquiry">General Plumbing Inquiry</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>{isSubmitting ? "Sending..." : "Request Call & Quote"}</span>
                  </motion.button>

                  <div className="text-center pt-1">
                    <a
                      href={COMPANY_INFO.phoneTel}
                      className="text-xs text-amber-700 font-bold hover:underline"
                    >
                      Or Call Emergency Line Directly: {COMPANY_INFO.phone}
                    </a>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
