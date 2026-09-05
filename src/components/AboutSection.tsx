import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Award, Clock, Wrench, CheckCircle, Phone, HeartHandshake } from "lucide-react";
import { COMPANY_INFO, FAQS } from "../data/siteData";

export const AboutSection: React.FC = () => {
  return (
    <section id="about-us" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Principles */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Over 50 Years Combined Plumbing Experience
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Experienced Plumbing Professionals <span className="italic text-amber-400">You Can Rely On</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              <strong>My London Plumbers Ltd</strong> provides professional plumbing, boiler, heating and gas services across London. Built on more than 50 years of combined plumbing experience, our business is dedicated to delivering fast emergency response, honest advice, and impeccable workmanship 24 hours a day.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
                  title: "Gas Safe Registered",
                  desc: "Every heating engineer is certified and vetted to safely work on domestic and commercial gas infrastructure.",
                },
                {
                  icon: <Clock className="w-4 h-4 text-blue-400" />,
                  title: "24/7 Emergency Support",
                  desc: "Plumbing crises don't keep office hours. Our emergency dispatch operates 24 hours every day of the year.",
                },
                {
                  icon: <Wrench className="w-4 h-4 text-orange-400" />,
                  title: "Professional Workmanship",
                  desc: "We use genuine OEM parts, adhere to British Standards, and leave your home as clean as we found it.",
                },
                {
                  icon: <HeartHandshake className="w-4 h-4 text-amber-400" />,
                  title: "Honest & Reliable",
                  desc: "Upfront transparent pricing with no hidden surprises, backed by 179+ 5-star verified Google reviews.",
                },
              ].map((val, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="bg-slate-800/60 p-4 rounded-2xl border border-slate-750 space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    {val.icon}
                    <span>{val.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <motion.a
                id="about-call-now-btn"
                href={COMPANY_INFO.phoneTel}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Speak to an Engineer: {COMPANY_INFO.phone}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion / Trust Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  id={`about-faq-${i}`}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5"
                >
                  <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
