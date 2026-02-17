"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface StickyCTAProps {
  promoText: string;
  ctaText: string;
  ctaUrl: string;
}

export const StickyCTA = ({ promoText, ctaText, ctaUrl }: StickyCTAProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      const offerSection = document.getElementById("choose-option");
      if (offerSection) {
        const rect = offerSection.getBoundingClientRect();
        const sectionVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setVisible(window.scrollY > 500 && !sectionVisible);
      } else {
        setVisible(window.scrollY > 500);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-0 left-0 right-0 bg-card px-5 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border"
        >
          <div className="text-foreground font-semibold text-sm sm:text-base text-center sm:text-left">
            {promoText}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={ctaUrl}
              className="cta-gradient text-primary-foreground px-6 py-3 rounded-full font-bold text-sm sm:text-base whitespace-nowrap shadow-md hover:-translate-y-0.5 transition-all"
            >
              {ctaText}
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="bg-muted border-none text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-border transition-colors"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
