"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface HeroSectionProps {
  logoUrl: string;
  badgeText: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  socialProofCount: string;
  rating: string;
  guaranteeText: string;
  scratchBoxTeaser: string;
  scratchBoxReveal: string;
  beforeImageUrl: string;
  beforeImageLabel: string;
  afterImageUrl: string;
  afterImageLabel: string;
  avatarUrls: { url: string }[];
  pressLogos: { url: string; alt: string }[];
  ctaBenefits: { icon: string; text: string }[];
}

export const HeroSection = ({
  logoUrl,
  badgeText,
  headline,
  subheadline,
  ctaText,
  ctaUrl,
  socialProofCount,
  rating,
  guaranteeText,
  scratchBoxTeaser,
  scratchBoxReveal,
  beforeImageUrl,
  beforeImageLabel,
  afterImageUrl,
  afterImageLabel,
  avatarUrls = [],
  pressLogos = [],
  ctaBenefits = [],
}: HeroSectionProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <section className="hero-gradient py-14 md:py-20 px-5">
        <div className="container max-w-4xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-11 w-auto mx-auto brightness-0 invert"
              />
            )}
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <span className="inline-block bg-card/90 backdrop-blur-sm border border-primary-foreground/20 px-6 py-2 rounded-full shadow-sm text-sm font-semibold tracking-wide text-primary">
              {badgeText}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-center text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.18] font-bold mb-8 font-heading text-primary-foreground max-w-5xl mx-auto tracking-tight drop-shadow-sm"
            dangerouslySetInnerHTML={{ __html: headline }}
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-center text-base md:text-lg max-w-2xl mx-auto mb-8 text-primary-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subheadline }}
          />

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md">
              <div className="flex -space-x-2">
                {avatarUrls.slice(0, 3).map((avatar, i) => (
                  <img key={i} src={avatar.url} alt="" className="w-8 h-8 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">{socialProofCount}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md">
              <span className="text-sm">⭐⭐⭐⭐⭐</span>
              <span className="text-sm font-bold text-foreground">{rating}</span>
            </div>
            <div className="bg-card/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md">
              <span className="text-sm font-bold text-foreground">✓ {guaranteeText}</span>
            </div>
          </motion.div>

          {/* CTA + Scratch Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            {/* Primary CTA */}
            <a
              href={ctaUrl}
              className="block w-full cta-gradient text-center py-5 rounded-full text-primary-foreground font-extrabold text-lg md:text-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-1 mb-3 tracking-wide"
            >
              {ctaText}
            </a>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {ctaBenefits.map((item) => (
                <span
                  key={item.text}
                  className="inline-flex items-center gap-1.5 bg-card/20 backdrop-blur-sm border border-primary-foreground/20 px-4 py-1.5 rounded-full text-xs font-bold text-primary-foreground shadow-sm"
                >
                  <span>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>

            {/* Scratch Box */}
            <div
              onClick={() => setRevealed(true)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] text-center ${
                revealed
                  ? "bg-[hsl(50,100%,90%)] border-[hsl(50,100%,70%)] shadow-lg"
                  : "bg-card/95 border-dashed border-primary-foreground/30 hover:border-primary-foreground/50 shadow-md"
              }`}
            >
              {!revealed && (
                <p className="text-base font-bold text-foreground" dangerouslySetInnerHTML={{ __html: scratchBoxTeaser }} />
              )}
              {revealed && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-lg font-extrabold text-foreground"
                  dangerouslySetInnerHTML={{ __html: scratchBoxReveal }}
                />
              )}
            </div>
          </motion.div>

          {/* Before/After */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-10"
          >
            <div className="bg-card rounded-2xl p-4 text-center shadow-md">
              <div className="relative rounded-xl overflow-hidden">
                <img src={beforeImageUrl} alt="Before" className="w-full aspect-square object-cover grayscale brightness-[0.7]" />
                <div className="absolute inset-0 rounded-xl" style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.4)' }} />
              </div>
              <p className="text-foreground mt-3 text-sm font-bold font-heading">{beforeImageLabel}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center shadow-md">
              <img src={afterImageUrl} alt="After" className="w-full rounded-xl aspect-square object-cover" />
              <p className="text-foreground mt-3 text-sm font-bold font-heading">{afterImageLabel}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured In Bar */}
      <section className="bg-card py-5 px-5 border-y border-border">
        <div className="container max-w-[900px]">
          <p className="text-center text-xs text-muted-foreground font-semibold tracking-widest mb-2 uppercase">
            As Featured In
          </p>
          <div className="flex justify-center items-center flex-wrap gap-8 opacity-60">
            {pressLogos.map((logo) => (
              <img key={logo.alt} src={logo.url} alt={logo.alt} className="h-3.5 md:h-4 w-auto object-contain" style={{ imageRendering: 'auto' }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
