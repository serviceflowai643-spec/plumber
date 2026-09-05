import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wrench, Shield, Sparkles } from "lucide-react";

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  // Stage: 0 = center logo reveal, 1 = logo gliding toward header, 2 = complete/fading out
  const [stage, setStage] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Step 1: Center reveal lasts ~0.65s
    const timer1 = setTimeout(() => {
      setStage(1); // Move toward header
    }, 650);

    // Step 2: Gliding completes, curtain dissolves at ~1.2s
    const timer2 = setTimeout(() => {
      setStage(2);
      onComplete();
    }, 1150);

    // Step 3: Unmount curtain
    const timer3 = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          key="opening-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-slate-950/98 backdrop-blur-md overflow-hidden"
        >
          {/* Subtle Ambient Background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.8, 1.1, 0.9] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-600/30 to-amber-500/20 rounded-full blur-3xl pointer-events-none"
          />

          {/* Gliding Logo Container */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={
              stage === 0
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: [1, 0.8, 0],
                    x: ["0vw", "-25vw", "-35vw"],
                    y: ["0vh", "-30vh", "-42vh"],
                    scale: [1, 0.85, 0.7],
                  }
            }
            transition={
              stage === 0
                ? { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.55, ease: [0.25, 1, 0.5, 1] }
            }
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            {/* Logo Emblem */}
            <div className="relative mb-3">
              <motion.div
                initial={{ rotate: -15, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 p-0.5 shadow-2xl shadow-blue-500/30 border border-blue-400/40 flex items-center justify-center"
              >
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                </div>
              </motion.div>

              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 p-1 rounded-full shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.span>
            </div>

            {/* Logo Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
              className="space-y-1"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
                  My London <span className="text-amber-400 italic">Plumbers</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                  Ltd
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="text-xs sm:text-sm text-slate-400 font-medium flex items-center justify-center gap-2"
              >
                <span>24/7 Emergency Response</span>
                <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Gas Safe Certified
                </span>
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
