"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface EnemySectionProps {
  mainHeading: string;
  gutBlockBadge: string;
  gutBlockImageUrl: string;
  gutBlockImageAlt: string;
  tapToRevealTitle: string;
  tapToRevealSubtext: string;
  gutBlockCaptionTitle: string;
  gutBlockCaptionDescription: string;
  criticalInsightBadge: string;
  gutBlockVillainImageUrl: string;
  villainTitle: string;
  villainExplanation: string;
  gutBlockReasonsLabel: string;
  gutBlockReasons: { text: string; icon: string }[];
  heroVsGutblockImageUrl: string;
  solutionTexts: string[];
  lies: { title: string; truth: string; icon: string }[];
  liesHeading: string;
  bridgeQuoteBadge: string;
  bridgeQuoteQuestion: string;
  bridgeQuoteAnswer: string;
  bridgeQuoteClosing: string;
}

export const EnemySection = ({
  mainHeading,
  gutBlockBadge,
  gutBlockImageUrl,
  gutBlockImageAlt,
  tapToRevealTitle,
  tapToRevealSubtext,
  gutBlockCaptionTitle,
  gutBlockCaptionDescription,
  criticalInsightBadge,
  gutBlockVillainImageUrl,
  villainTitle,
  villainExplanation,
  gutBlockReasonsLabel,
  gutBlockReasons,
  heroVsGutblockImageUrl,
  solutionTexts,
  lies,
  liesHeading,
  bridgeQuoteBadge,
  bridgeQuoteQuestion,
  bridgeQuoteAnswer,
  bridgeQuoteClosing,
}: EnemySectionProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="bg-surface-blue-light py-16 px-5 text-foreground">
      <div className="container">
        <h2 className="text-2xl md:text-[2.2rem] leading-tight font-bold text-center mb-5 text-foreground font-heading">
          {mainHeading}
        </h2>

        {/* Gut Block Reveal */}
        <div className="max-w-3xl mx-auto my-10">
          <div
            className="rounded-2xl overflow-hidden shadow-xl border-2 border-accent/30 cursor-pointer relative"
            onClick={() => setRevealed(true)}
          >
            {/* Dark header band */}
            <div className="bg-[hsl(var(--primary))] p-4 text-center relative">
              <span className="bg-accent text-accent-foreground px-5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                {gutBlockBadge}
              </span>
            </div>

            {/* Image area */}
            <div className="relative bg-[hsl(220,30%,12%)]">
              <img
                src={gutBlockImageUrl}
                alt={gutBlockImageAlt}
                className="w-full"
              />

              {/* Overlay prompt if not revealed */}
              <AnimatePresence>
                {!revealed && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[hsl(220,30%,12%)]/60 backdrop-blur-sm flex flex-col items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="bg-accent text-accent-foreground px-8 py-4 rounded-2xl shadow-lg text-center"
                    >
                      <p className="text-xl font-bold">{tapToRevealTitle}</p>
                      <p className="text-sm opacity-90 mt-1">{tapToRevealSubtext}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom caption */}
            <div className="bg-card p-5 text-center border-t border-accent/20">
              <p className="text-2xl font-black text-accent font-heading tracking-wide">{gutBlockCaptionTitle}</p>
              <p className="text-muted-foreground mt-1">
                {gutBlockCaptionDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Gut Block Explainer */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto my-10"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-accent/20">
                <div className="bg-accent/10 border-b border-accent/20 p-6 text-center">
                  <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-bold inline-block mb-3">{criticalInsightBadge}</span>
                  <img src={gutBlockVillainImageUrl} alt="Gut Block villain character" className="w-32 h-32 mx-auto my-3 object-contain" />
                  <h3 className="text-foreground text-2xl md:text-3xl font-bold font-heading">
                    {villainTitle}
                  </h3>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-lg leading-relaxed text-foreground">
                    {villainExplanation}
                  </p>

                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mt-6 mb-3">{gutBlockReasonsLabel}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {gutBlockReasons.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-3 bg-brand-pink-100 p-4 rounded-xl border border-accent/15"
                      >
                        <span className="text-accent font-bold text-lg shrink-0">{item.icon}</span>
                        <span className="text-sm text-foreground">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 bg-surface-green-light border-2 border-secondary/25 rounded-xl p-6 text-center">
                    <img src={heroVsGutblockImageUrl} alt="Hero fighting the Gut Block villain" className="w-48 mx-auto mb-4 object-contain" />
                    {solutionTexts.map((text, i) => (
                      <p key={i} className={i === solutionTexts.length - 1 ? "text-xl font-black text-secondary mt-2" : "text-lg font-bold text-secondary leading-relaxed"}>
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always-visible explainer fallback for non-interactors */}
        {!revealed && (
          <div className="max-w-3xl mx-auto my-10">
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-accent/20">
              <div className="bg-accent/10 border-b border-accent/20 p-6 text-center">
                <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-bold inline-block mb-3">{criticalInsightBadge}</span>
                <img src={gutBlockVillainImageUrl} alt="Gut Block villain character" className="w-32 h-32 mx-auto my-3 object-contain" />
                <h3 className="text-foreground text-2xl md:text-3xl font-bold font-heading">
                  {villainTitle}
                </h3>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-lg leading-relaxed text-foreground">
                  {villainExplanation}
                </p>

                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mt-6 mb-3">{gutBlockReasonsLabel}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gutBlockReasons.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-brand-pink-100 p-4 rounded-xl border border-accent/15">
                      <span className="text-accent font-bold text-lg shrink-0">{item.icon}</span>
                      <span className="text-sm text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-surface-green-light border-2 border-secondary/25 rounded-xl p-6 text-center">
                  <img src={heroVsGutblockImageUrl} alt="Hero fighting the Gut Block villain" className="w-48 mx-auto mb-4 object-contain" />
                  {solutionTexts.map((text, i) => (
                    <p key={i} className={i === solutionTexts.length - 1 ? "text-xl font-black text-secondary mt-2" : "text-lg font-bold text-secondary leading-relaxed"}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Three Lies */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center text-2xl font-bold font-heading text-foreground mb-8">
            {liesHeading}
          </h3>

          <div className="space-y-4">
            {lies.map((lie, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
              >
                <div className="flex items-start gap-3 p-4 md:p-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-pink-100 border border-accent/20 flex items-center justify-center text-xl md:text-2xl shrink-0">
                    {lie.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-accent text-base md:text-lg font-bold font-heading mb-1.5">{lie.title}</h4>
                    <div className="flex items-start gap-2">
                      <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs font-bold shrink-0 mt-0.5">TRUTH</span>
                      <p className="text-sm md:text-base text-muted-foreground">{lie.truth}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge Quote */}
        <div className="max-w-3xl mx-auto mt-10 bg-card p-8 rounded-2xl shadow-sm border border-primary/15 relative">
          <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
            {bridgeQuoteBadge}
          </div>
          <p className="italic text-primary text-lg mt-2 mb-4">
            {bridgeQuoteQuestion}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {bridgeQuoteAnswer}
          </p>
          <p className="mt-4 text-foreground font-semibold">
            {bridgeQuoteClosing}
          </p>
        </div>
      </div>
    </section>
  );
};
