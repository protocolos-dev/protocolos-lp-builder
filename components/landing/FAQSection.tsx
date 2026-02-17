"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQSectionProps {
  heading: string;
  faqs: {
    q: string;
    a: string;
  }[];
}

export const FAQSection = ({ heading, faqs }: FAQSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-5 bg-surface-light">
      <div className="container">
        <h2 className="text-2xl md:text-[2.2rem] leading-tight font-bold text-center mb-10 font-heading text-foreground">
          {heading}
        </h2>

        <div className="max-w-[900px] mx-auto space-y-4 -mx-5 md:mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="bg-card p-6 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-foreground pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  className="text-primary text-lg shrink-0"
                >
                  ▼
                </motion.span>
              </div>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
