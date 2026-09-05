import React from "react";
import { motion } from "motion/react";
import { PhoneCall, Navigation, Wrench, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { HOW_IT_WORKS_STEPS, COMPANY_INFO } from "../data/siteData";

interface HowItWorksProps {
  onOpenQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuote }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "PhoneCall":
        return <PhoneCall className="w-6 h-6 text-amber-500" />;
      case "Navigation":
        return <Navigation className="w-6 h-6 text-blue-500" />;
      case "Wrench":
        return <Wrench className="w-6 h-6 text-emerald-500" />;
      default:
        return <PhoneCall className="w-6 h-6 text-amber-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Simple 3-Step Process
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            How We Solve Your <span className="italic text-blue-700">Plumbing Problem</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From the moment you dial our 24/7 hotline to the final quality inspection, here is our transparent, hassle-free process.
          </p>
        </motion.div>

        {/* 3 Step Sequence with Animated Connecting Line */}
        <div className="relative">
          {/* Animated SVG connecting line across desktop */}
          <div className="hidden lg:block absolute top-1/3 left-16 right-16 h-0.5 pointer-events-none -z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-amber-400 via-blue-400 to-emerald-400 origin-left"
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10"
          >
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                variants={stepVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                id={`how-it-works-step-${step.step}`}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:border-slate-300 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-50 transition-all">
                      {getStepIcon(step.iconName)}
                    </div>

                    <span className="text-4xl font-serif font-black text-slate-200 group-hover:text-amber-400 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Sub-action / micro badge */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Gas Safe Certified
                  </span>
                  <span className="text-slate-400">Step {idx + 1} of 3</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Action Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 text-center space-y-4"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3">
            <motion.a
              id="how-it-works-call-cta"
              href={COMPANY_INFO.phoneTel}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5" /> Start With a 24/7 Call: {COMPANY_INFO.phone}
            </motion.a>

            <motion.button
              id="how-it-works-quote-btn"
              onClick={onOpenQuote}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-2xl border border-slate-300 transition-all cursor-pointer shadow-sm"
            >
              Or Book Online via Quote Form
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
