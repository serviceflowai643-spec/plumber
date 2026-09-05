import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Droplets,
  Flame,
  ShieldAlert,
  Thermometer,
  ShieldCheck,
  Wrench,
  ArrowRight,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";
import { SERVICES_DATA, COMPANY_INFO } from "../data/siteData";
import { ServiceItem } from "../types";
import { ServiceDetailModal } from "./ServiceDetailModal";

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Droplets":
        return <Droplets className="w-7 h-7 text-blue-600" />;
      case "Flame":
        return <Flame className="w-7 h-7 text-amber-500" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-7 h-7 text-red-500" />;
      case "Thermometer":
        return <Thermometer className="w-7 h-7 text-orange-500" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-7 h-7 text-emerald-600" />;
      case "Wrench":
        return <Wrench className="w-7 h-7 text-indigo-600" />;
      default:
        return <Wrench className="w-7 h-7 text-blue-600" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staggered Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            24/7 Professional Heating &amp; Plumbing
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Our Plumbing &amp; <span className="italic text-blue-700">Heating Services</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Delivering precision plumbing, expert Gas Safe boiler diagnostics, emergency installations, and central heating solutions tailored to London homes and businesses.
          </p>
        </motion.div>

        {/* 6 Curved Service Cards Grid with Stagger & Rich Hover State */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              id={`service-card-${service.id}`}
              className="group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-300 transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-all duration-300 border border-slate-200/80 group-hover:border-blue-200 group-hover:scale-105">
                    {getServiceIcon(service.iconName)}
                  </div>

                  {service.badge && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 group-hover:bg-amber-100 text-slate-700 group-hover:text-amber-900 transition-colors border border-slate-200">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Title & Description */}
                <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Response time micro indicator */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-6">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Avg arrival: <strong className="text-slate-800">{service.typicalResponse}</strong></span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <button
                  id={`learn-more-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900 group/btn transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <motion.a
                  href={COMPANY_INFO.phoneTel}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-colors"
                  title="Direct Call for this service"
                  aria-label={`Call for ${service.title}`}
                >
                  <Phone className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Fast Booking Strip with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">Unsure what plumbing or heating service you need?</h4>
            <p className="text-sm text-slate-400">
              Speak directly with an on-duty London Gas Safe engineer. We diagnose issues and provide transparent advice.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              id="services-bottom-call-btn"
              href={COMPANY_INFO.phoneTel}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" /> Call {COMPANY_INFO.phone}
            </motion.a>
            <motion.button
              id="services-bottom-quote-btn"
              onClick={onOpenQuote}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              Request a Free Quote
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenQuote={onOpenQuote}
        />
      )}
    </section>
  );
};
