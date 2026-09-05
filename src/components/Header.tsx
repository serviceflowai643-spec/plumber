import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X, Shield, Clock, Wrench, ChevronRight } from "lucide-react";
import { COMPANY_INFO } from "../data/siteData";

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Boiler Replacement", href: "#emergency-boiler" },
    { label: "Areas We Serve", href: "#areas-served" },
    { label: "About", href: "#about-us" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top emergency announcement ticker */}
      <div id="top-announcement-bar" className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 relative z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              24/7 LONDON DISPATCH ACTIVE
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Gas Safe Registered Engineers
            </span>
            <span className="hidden lg:inline text-slate-400">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Avg. Response: 30–45 Mins
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto font-medium">
            <span className="text-amber-400 flex items-center gap-1">
              ★★★★★ <span className="text-slate-200">5.0 (179 Reviews)</span>
            </span>
            <motion.a
              id="top-bar-phone-link"
              href={COMPANY_INFO.phoneTel}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="text-white hover:text-amber-300 transition-colors flex items-center gap-1.5 font-bold tracking-tight bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 shadow-sm"
            >
              <Phone className="w-3 h-3 text-amber-400 animate-pulse" />
              {COMPANY_INFO.phone}
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <motion.header
        id="main-sticky-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-950/20 border-b border-slate-800/80 py-2.5"
            : "bg-slate-900 border-b border-slate-800 py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 to-slate-950 p-0.5 shadow-md shadow-blue-900/30 flex items-center justify-center border border-blue-400/30"
            >
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Wrench className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-white leading-none">
                  My London <span className="text-amber-400 italic">Plumbers</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-400/30">
                  Ltd
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-normal mt-0.5 flex items-center gap-1.5">
                <span>24/7 Plumbing &amp; Heating</span>
                <span className="inline-block w-1 h-1 rounded-full bg-amber-400"></span>
                <span className="text-emerald-400">Gas Safe</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation with Animated Link Highlight */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setHoveredNav(link.label)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer rounded-lg"
              >
                <span className="relative z-10">{link.label}</span>
                {hoveredNav === link.label && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-slate-850 rounded-lg -z-0 border border-slate-700/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Header Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.button
              id="header-quote-btn"
              onClick={onOpenQuote}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 hover:text-white rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm"
            >
              Request Quote
            </motion.button>

            <motion.a
              id="header-emergency-call-btn"
              href={COMPANY_INFO.phoneTel}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-slate-950/10 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-slate-950 group-hover:animate-bounce" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-900/80">
                  24/7 Emergency Call
                </span>
                <span className="text-xs sm:text-sm font-black tracking-tight">{COMPANY_INFO.phone}</span>
              </div>
            </motion.a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <motion.a
              id="mobile-header-call-icon"
              href={COMPANY_INFO.phoneTel}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-amber-500 text-slate-950 rounded-xl shadow-md"
              aria-label="Call My London Plumbers Emergency Line"
            >
              <Phone className="w-4 h-4" />
            </motion.a>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl border border-slate-700 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Motion */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-slate-900/98 border-b border-slate-800 px-4 pt-4 pb-6 mt-2 space-y-3 overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-xl transition-colors text-left"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </motion.button>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <a
                  href={COMPANY_INFO.phoneTel}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md"
                >
                  <Phone className="w-4 h-4" /> Call Now: {COMPANY_INFO.phone}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm border border-slate-700"
                >
                  Request a Free Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
