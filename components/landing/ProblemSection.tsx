"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProblemSectionProps {
  mainHeading: string;
  subHeading: string;
  problems: {
    label: string;
    cost: number;
    emoji: string;
    reaction: string;
  }[];
  progressText: string;
  costCounterLabel: string;
  costCounterSuffix: string;
  allCheckedTitle: string;
  allCheckedDescription: string;
  allCheckedCtaText: string;
  allCheckedCtaUrl: string;
  empathyBadge: string;
  empathyHeading: string;
  empathyParagraphs: { text: string; variant: "blue" | "pink" }[];
  empathyClosing: string;
  empathyClosingSubtext: string;
  inlineCtaHeading: string;
  inlineCtaDescription: string;
  inlineCtaButtonText: string;
  inlineCtaButtonUrl: string;
  inlineCtaGuarantee: string;
}

export const ProblemSection = ({
  mainHeading,
  subHeading,
  problems,
  progressText,
  costCounterLabel,
  costCounterSuffix,
  allCheckedTitle,
  allCheckedDescription,
  allCheckedCtaText,
  allCheckedCtaUrl,
  empathyBadge,
  empathyHeading,
  empathyParagraphs,
  empathyClosing,
  empathyClosingSubtext,
  inlineCtaHeading,
  inlineCtaDescription,
  inlineCtaButtonText,
  inlineCtaButtonUrl,
  inlineCtaGuarantee,
}: ProblemSectionProps) => {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [lastToggled, setLastToggled] = useState<number | null>(null);

  const totalCost = Array.from(checked).reduce((sum, i) => sum + problems[i].cost, 0);
  const allChecked = checked.size === problems.length;

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    setLastToggled(index);
  };

  return (
    <>
      <section className="py-16 px-5 bg-card">
        <div className="container">
          <h2 className="text-2xl md:text-[2.2rem] leading-tight font-bold text-center mb-2 font-heading text-foreground">
            {mainHeading}
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-8">{subHeading}</p>

          <div className="max-w-2xl mx-auto bg-card p-6 md:p-10 rounded-2xl shadow-md border border-border relative overflow-hidden">
            {/* Progress bar */}
            <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                animate={{ width: `${(checked.size / problems.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </div>

            <p className="text-center mb-5 text-xl md:text-2xl text-foreground font-bold">
              {progressText} <span className="text-muted-foreground font-normal text-lg">({checked.size}/{problems.length})</span>
            </p>

            <div className="space-y-3">
              {problems.map((item, i) => {
                const isChecked = checked.has(i);
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggle(i)}
                    className={`p-4 rounded-xl cursor-pointer transition-colors flex items-center gap-4 border-2 ${
                      isChecked
                        ? "bg-brand-pink-100 border-accent/30 shadow-sm"
                        : "bg-surface-light border-transparent hover:border-primary/20 hover:bg-muted"
                    }`}
                  >
                    <motion.div
                      animate={isChecked ? { rotate: [0, -10, 10, 0], scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      className="text-2xl shrink-0"
                    >
                      {isChecked ? "✅" : item.emoji}
                    </motion.div>
                    <div className="flex-1">
                      <span className={`font-medium ${isChecked ? "text-foreground line-through decoration-accent/50 decoration-2" : "text-foreground"}`}>
                        {item.label}
                      </span>
                      <AnimatePresence>
                        {isChecked && lastToggled === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: -5 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-accent font-semibold mt-1"
                          >
                            {item.reaction}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    {isChecked && item.cost > 0 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-accent font-bold text-sm bg-accent/10 px-3 py-1 rounded-full shrink-0"
                      >
                        -${item.cost}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Cost counter */}
            <motion.div
              className="mt-8 p-5 rounded-2xl text-center bg-brand-pink-100 border border-accent/20"
              animate={totalCost > 0 ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-muted-foreground font-medium mb-1">{costCounterLabel}</p>
              <motion.p
                key={totalCost}
                initial={{ scale: 1.2, color: "hsl(var(--accent))" }}
                animate={{ scale: 1, color: "hsl(var(--accent))" }}
                className="text-4xl md:text-5xl font-black"
              >
                ${totalCost}
              </motion.p>
              {totalCost > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-accent font-semibold mt-2"
                >
                  {costCounterSuffix}
                </motion.p>
              )}
            </motion.div>

            {/* All checked reveal */}
            <AnimatePresence>
              {allChecked && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  className="mt-6 p-5 bg-surface-green-light border-2 border-secondary/30 rounded-2xl text-center"
                >
                  <p className="text-lg font-bold text-secondary">{allCheckedTitle}</p>
                  <p className="text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: allCheckedDescription.replace('$totalCost', `$${totalCost}`) }} />
                  <a
                    href={allCheckedCtaUrl}
                    className="inline-block mt-4 cta-gradient px-8 py-3 rounded-full text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    {allCheckedCtaText}
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Empathy card */}
          <div className="max-w-3xl mx-auto mt-12 bg-card p-8 md:p-10 rounded-2xl shadow-md border border-border relative">
            <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
              {empathyBadge}
            </div>
            <p className="text-lg font-bold text-foreground mt-2" dangerouslySetInnerHTML={{ __html: empathyHeading }} />
            <div className="space-y-4 mt-4">
              {empathyParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-muted-foreground p-4 rounded-xl border ${
                    para.variant === "blue"
                      ? "bg-surface-blue-light border-primary/10"
                      : "bg-brand-pink-100 border-accent/15"
                  }`}
                  dangerouslySetInnerHTML={{ __html: para.text }}
                />
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border text-center">
              <p className="text-xl font-bold text-foreground">{empathyClosing}</p>
              <p className="text-sm text-muted-foreground mt-1">{empathyClosingSubtext}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inline CTA #1 */}
      <section className="hero-gradient py-10 px-5">
        <div className="container text-center">
          <h3 className="text-primary-foreground text-2xl md:text-3xl font-bold mb-4 font-heading">
            {inlineCtaHeading}
          </h3>
          <p className="text-primary-foreground/90 text-lg mb-6">
            {inlineCtaDescription}
          </p>
          <a
            href={inlineCtaButtonUrl}
            className="inline-block cta-gradient px-10 py-4 rounded-full text-primary-foreground font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            {inlineCtaButtonText}
          </a>
          <p className="text-primary-foreground/80 mt-4 text-sm">
            {inlineCtaGuarantee}
          </p>
        </div>
      </section>
    </>
  );
};
