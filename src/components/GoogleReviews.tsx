import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, CheckCircle, MapPin, Quote, ShieldCheck, ThumbsUp } from "lucide-react";
import { REVIEWS_DATA, COMPANY_INFO } from "../data/siteData";

export const GoogleReviews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Emergency Plumbing",
    "Boiler Repairs",
    "Boiler Replacement",
    "Central Heating",
    "Gas Services",
  ];

  const filteredReviews =
    selectedCategory === "All"
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.serviceCategory === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Verified Customer Satisfaction
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            What Our Customers <span className="italic text-blue-700">Say</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Read authentic feedback from London homeowners, landlords, and businesses who rely on our 24/7 plumbing and boiler repair services.
          </p>

          {/* Prominent Overall Google Rating Summary Box */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-50 border border-slate-200 px-6 py-4 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-800 shadow-xs">
                G
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-slate-900">5.0</span>
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  Based on <strong className="text-slate-900">{COMPANY_INFO.reviewCount} Google Reviews</strong>
                </p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-300" />

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% 5-Star Customer Feedback
            </div>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-reviews-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid with Staggered Motion */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              id={`review-card-${review.id}`}
              className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:bg-white hover:border-slate-300 transition-colors duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header with Star Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                </div>

                {/* Service Tag */}
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-3 border border-blue-200/60">
                  {review.serviceCategory}
                </div>

                {/* Review Text */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-2 -left-1 -z-0 opacity-70" />
                  <p className="text-sm font-serif italic text-slate-700 leading-relaxed pl-2 relative z-10">
                    "{review.reviewText}"
                  </p>
                </div>
              </div>

              {/* Author & Location Footer */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span>{review.author}</span>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" title="Verified Customer Review" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{review.location}</span>
                  </div>
                </div>

                {review.engineerName && (
                  <div className="text-right text-[11px] text-slate-500 font-medium">
                    <span className="text-slate-400 block text-[10px]">Engineer:</span>
                    <span className="text-slate-800 font-semibold">{review.engineerName}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note on Verified Google Reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
          <span>All reviews reflect real customer experiences across London and can be verified on Google.</span>
        </motion.div>
      </div>
    </section>
  );
};
