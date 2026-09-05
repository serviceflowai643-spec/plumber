import React from "react";
import { motion } from "motion/react";
import {
  Clock,
  ShieldCheck,
  Award,
  Star,
  Zap,
  CheckCircle2,
  Flame,
  MapPin,
  Check,
  Phone,
} from "lucide-react";
import { TRUST_PILLARS, STATS_DATA, COMPANY_INFO } from "../data/siteData";
import { AnimatedCounter } from "./AnimatedCounter";

export const WhyChooseUs: React.FC = () => {
  const getPillarIcon = (name: string) => {
    switch (name) {
      case "Clock":
        return <Clock className="w-6 h-6 text-blue-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case "Award":
        return <Award className="w-6 h-6 text-amber-400" />;
      case "Star":
        return <Star className="w-6 h-6 text-amber-400 fill-amber-400" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-yellow-400" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-6 h-6 text-blue-400" />;
      case "Flame":
        return <Flame className="w-6 h-6 text-orange-400" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-rose-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-blue-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-750 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            London's Trusted Plumbing &amp; Heating Experts
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Why London Homeowners <span className="italic text-amber-400">Choose Us</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            With more than 50 years of combined craftsmanship and Gas Safe certified expertise, we have earned the trust of homeowners and businesses across London with prompt, honest, and lasting solutions.
          </p>
        </motion.div>

        {/* Animated Statistics Banner with Smooth Count-Up */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              id={`stat-card-${idx}`}
              className="bg-slate-850/80 backdrop-blur-sm border border-slate-750 p-6 sm:p-7 rounded-3xl text-center shadow-lg hover:border-amber-400/40 hover:bg-slate-800/80 transition-colors duration-300"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 mb-2">
                <AnimatedCounter value={stat.value} duration={1.5} />
              </div>
              <div className="text-sm sm:text-base font-bold text-white mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 8 Core Trust Pillars Grid with Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TRUST_PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              id={`trust-pillar-${idx}`}
              className="bg-slate-800/60 border border-slate-750/80 hover:border-slate-600 p-6 rounded-3xl transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {getPillarIcon(pillar.iconName)}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Gas Safe Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 bg-gradient-to-r from-blue-950/80 via-slate-850 to-slate-900 border border-blue-900/60 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Gas Safe Registered &amp; Fully Insured</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Every engineer on our team is legally certified to work on London domestic and commercial gas and boiler systems.
              </p>
            </div>
          </div>

          <motion.a
            id="why-choose-us-call-btn"
            href={COMPANY_INFO.phoneTel}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4" /> Call 24/7: {COMPANY_INFO.phone}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
