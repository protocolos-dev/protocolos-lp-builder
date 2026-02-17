"use client";

import { useState, useEffect } from "react";

interface Phase {
  number: string;
  title: string;
  productName: string;
  subtitle: string;
  badge: string;
  timeline: string;
  color: "primary" | "secondary" | "accent";
  borderColor: string;
  bgLight: string;
  badgeBg: string;
  problem: string;
  whyFailed: string;
  solutionTitle: string;
  solutionDesc: string;
  ingredients: { item: string }[];
  quotes: { quote: string }[];
  solutionBg: string;
  productImgUrl: string;
  customerPhotoUrls: { url: string }[];
}

export interface MechanismSectionProps {
  mainHeading: string;
  subtitle: string;
  gutResetHeroUrl: string;
  phases: Phase[];
  wrongOrderBadge: string;
  wrongOrderHeading: string;
  wrongOrderItems: { item: string }[];
  wrongOrderCost: string;
  wrongOrderResult: string;
  rightOrderBadge: string;
  rightOrderHeading: string;
  rightOrderItems: { month: string; text: string }[];
  rightOrderResult: string;
  rightOrderSubresult: string;
  rightOrderProvenBadge: string;
  ctaHeading: string;
  ctaParagraph1: string;
  ctaParagraph2: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  ctaUnitsLabel: string;
  initialUnitsRemaining: number;
}

export const MechanismSection = ({
  mainHeading,
  subtitle,
  gutResetHeroUrl,
  phases,
  wrongOrderBadge,
  wrongOrderHeading,
  wrongOrderItems,
  wrongOrderCost,
  wrongOrderResult,
  rightOrderBadge,
  rightOrderHeading,
  rightOrderItems,
  rightOrderResult,
  rightOrderSubresult,
  rightOrderProvenBadge,
  ctaHeading,
  ctaParagraph1,
  ctaParagraph2,
  ctaButtonText,
  ctaButtonUrl,
  ctaUnitsLabel,
  initialUnitsRemaining,
}: MechanismSectionProps) => {
  const [unitsRemaining, setUnitsRemaining] = useState(initialUnitsRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnitsRemaining((prev) => (prev > 100 ? prev - 1 : prev));
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="py-16 px-5 bg-surface-light">
        <div className="container">
          <h2 className="text-2xl md:text-[2.2rem] leading-tight font-bold text-center mb-4 font-heading text-foreground">
            {mainHeading}
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-8" dangerouslySetInnerHTML={{ __html: subtitle }} />

          <div className="max-w-4xl mx-auto mb-12">
            <img src={gutResetHeroUrl} alt="The Gut Reset" className="w-full rounded-2xl shadow-lg" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-10">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className={`bg-card rounded-2xl shadow-md border-t-4 ${phase.borderColor} overflow-hidden`}
              >
                {/* Card Header */}
                <div className={`${phase.bgLight} p-6 pb-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${phase.badgeBg} text-primary-foreground px-3 py-1 rounded-full text-xs font-bold`}>
                      {phase.badge}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground bg-card px-3 py-1 rounded-full">
                      📅 {phase.timeline}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold font-heading ${
                    phase.color === "primary" ? "text-primary" :
                    phase.color === "secondary" ? "text-secondary" : "text-accent"
                  }`}>
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">{phase.subtitle}</p>
                </div>

                {/* Product Image */}
                <div className="flex justify-center py-4">
                  <img src={phase.productImgUrl} alt={phase.productName} className="h-48 object-contain" />
                </div>

                <div className="p-6 space-y-5">
                  {/* Problem */}
                  <div className="bg-brand-pink-100 p-4 rounded-xl border border-accent/15">
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">⚠️ The Problem</p>
                    <p className="text-sm text-foreground">{phase.problem}</p>
                  </div>

                  {/* Why Failed */}
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Why Previous Solutions Failed</p>
                    <p className="text-sm text-muted-foreground">{phase.whyFailed}</p>
                  </div>

                  {/* Solution */}
                  <div className={`${phase.solutionBg} p-4 rounded-xl border ${phase.borderColor}/15`}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 ${
                      phase.color === 'primary' ? 'text-primary' :
                      phase.color === 'secondary' ? 'text-secondary' : 'text-accent'
                    }">✅ {phase.solutionTitle}</p>
                    <p className="text-sm text-muted-foreground mb-2">{phase.solutionDesc}</p>
                    <ul className="space-y-1.5">
                      {phase.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className={`shrink-0 font-bold mt-0.5 ${
                            phase.color === "primary" ? "text-primary" :
                            phase.color === "secondary" ? "text-secondary" : "text-accent"
                          }`}>✓</span>
                          {ing.item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Parent Quotes */}
                  <div className="bg-surface-green-light p-4 rounded-xl border border-secondary/15">
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">👁️ What Parents Notice</p>
                    {phase.quotes.map((q, i) => (
                      <p key={i} className="italic text-sm text-muted-foreground leading-relaxed">{q.quote}</p>
                    ))}
                  </div>
                  {/* Customer Photos */}
                  {phase.customerPhotoUrls && phase.customerPhotoUrls.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">📸 Real Families Using {phase.productName}</p>
                      <div className="flex gap-2">
                        {phase.customerPhotoUrls.map((photo, i) => (
                          <img key={i} src={photo.url} alt={`Customer using ${phase.productName}`} className="w-20 h-20 rounded-xl object-cover border border-border" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Why Sequence Matters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            {/* WRONG ORDER */}
            <div className="bg-brand-pink-100 p-8 rounded-2xl border-2 border-accent/30 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-5 py-1.5 rounded-full font-bold text-sm shadow-sm whitespace-nowrap">
                {wrongOrderBadge}
              </div>
              <h4 className="text-accent text-lg font-bold mb-5 font-heading text-center mt-2">{wrongOrderHeading}</h4>
              <ul className="space-y-3 text-foreground">
                {wrongOrderItems.map((entry, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5 shrink-0">✗</span>
                    <span>{entry.item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-accent/20 text-center">
                <p className="font-bold text-lg text-accent">{wrongOrderCost}</p>
                <p className="text-sm text-muted-foreground mt-1">{wrongOrderResult}</p>
              </div>
            </div>

            {/* RIGHT ORDER */}
            <div className="bg-surface-green-light p-8 rounded-2xl border-2 border-secondary/30 relative shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-5 py-1.5 rounded-full font-bold text-sm shadow-sm whitespace-nowrap">
                {rightOrderBadge}
              </div>
              <h4 className="text-secondary text-lg font-bold mb-5 font-heading text-center mt-2">{rightOrderHeading}</h4>
              <ul className="space-y-3 text-foreground">
                {rightOrderItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-card/60 p-3 rounded-xl">
                    <span className="text-secondary font-bold mt-0.5 shrink-0">✓</span>
                    <span><strong>{item.month}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-secondary/20 text-center">
                <p className="font-bold text-lg text-secondary">{rightOrderResult}</p>
                <p className="text-sm text-muted-foreground mt-1">{rightOrderSubresult}</p>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-bold shadow-sm">
                {rightOrderProvenBadge}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline CTA #3 */}
      <section className="hero-gradient py-12 px-5">
        <div className="container text-center">
          <h3 className="text-primary-foreground text-2xl md:text-3xl font-bold mb-4 font-heading">
            {ctaHeading}
          </h3>
          <p className="text-primary-foreground/90 text-lg mb-2">
            {ctaParagraph1}
          </p>
          <p className="text-primary-foreground text-xl font-semibold mb-8">
            {ctaParagraph2}
          </p>
          <a
            href={ctaButtonUrl}
            className="inline-block cta-gradient px-10 py-4 rounded-full text-primary-foreground font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            {ctaButtonText}
          </a>
          <p className="text-primary-foreground/80 mt-4 font-medium">
            {ctaUnitsLabel} {unitsRemaining} units remaining
          </p>
        </div>
      </section>
    </>
  );
};
