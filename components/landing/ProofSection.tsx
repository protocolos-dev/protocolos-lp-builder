"use client";

import { useState, useEffect } from "react";

export interface ProofSectionProps {
  reviewsHeading: string;
  socialProofAvatarUrls: { url: string }[];
  socialProofParentsLabel: string;
  initialParentsCount: number;
  ratingStars: string;
  ratingText: string;
  resultsPercentage: string;
  reviews: {
    text: string;
    author: string;
    subtitle: string;
    avatarUrl: string;
  }[];
  verifiedBadge: string;
  reviewDisclaimer: string;
  resultsHeading: string;
  resultsDescription: string;
  resultTiers: {
    percentage: string;
    label: string;
    description: string;
    bgColor: string;
    borderColor: string;
  }[];
  commitmentText: string;
  transformationsHeading: string;
  transformationsDescription: string;
  transformations: {
    title: string;
    text: string;
    author: string;
    day: string;
    avatarUrl: string;
    colorIndex: number;
  }[];
  closingEmoji: string;
  closingTitle: string;
  closingDescription: string;
  closingAvatarsLabel: string;
}

export const ProofSection = ({
  reviewsHeading,
  socialProofAvatarUrls,
  socialProofParentsLabel,
  initialParentsCount,
  ratingStars,
  ratingText,
  resultsPercentage,
  reviews,
  verifiedBadge,
  reviewDisclaimer,
  resultsHeading,
  resultsDescription,
  resultTiers,
  commitmentText,
  transformationsHeading,
  transformationsDescription,
  transformations,
  closingEmoji,
  closingTitle,
  closingDescription,
  closingAvatarsLabel,
}: ProofSectionProps) => {
  const [parentsCount, setParentsCount] = useState(initialParentsCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setParentsCount((prev) => prev + 1);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Reviews */}
      <section className="py-16 px-5 bg-card">
        <div className="container">
          <h2 className="text-2xl md:text-[2.2rem] leading-tight font-bold text-center mb-8 font-heading text-foreground">
            {reviewsHeading}
          </h2>

          {/* Social Proof Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-3 bg-surface-blue-light px-5 py-3 rounded-full border border-primary/15">
              <div className="flex -space-x-3">
                {socialProofAvatarUrls.map((avatar, i) => (
                  <img key={i} src={avatar.url} alt="" className="w-9 h-9 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">
                <span className="text-primary font-bold text-lg">{parentsCount.toLocaleString()}+</span> {socialProofParentsLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface-green-light px-5 py-3 rounded-full border border-secondary/15">
              <span className="text-lg">{ratingStars}</span>
              <span className="text-sm font-semibold text-foreground">{ratingText}</span>
            </div>
            <div className="bg-brand-pink-100 px-5 py-3 rounded-full border border-accent/15">
              <span className="text-sm font-semibold text-foreground">{resultsPercentage}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
            {reviews.map((review, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl shadow-md border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <img src={review.avatarUrl} alt={review.author} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                  <div>
                    <p className="font-bold text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.subtitle}</p>
                    <div className="text-sm mt-0.5">{ratingStars}</div>
                  </div>
                </div>
                <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-semibold mb-4">
                  {verifiedBadge}
                </span>
                <p className="italic leading-relaxed text-muted-foreground">{review.text}</p>
                <p className="text-xs text-muted-foreground/70 mt-4">{reviewDisclaimer}</p>
              </div>
            ))}
          </div>

          {/* Results Distribution */}
          <div className="text-center mt-10">
            <h3 className="text-2xl font-bold font-heading text-foreground">{resultsHeading}</h3>
            <p className="text-lg my-5 text-muted-foreground">{resultsDescription}</p>

            <div className="max-w-2xl mx-auto space-y-3">
              {resultTiers.map((tier, i) => (
                <div key={i} className={`${tier.bgColor} p-5 rounded-xl border ${tier.borderColor}`}>
                  <strong>{tier.percentage} ({tier.label}):</strong> {tier.description}
                </div>
              ))}
            </div>

            <p className="mt-8 font-semibold text-lg text-foreground">
              {commitmentText}
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 px-5 bg-surface-light">
        <div className="container">
          <h2 className="text-center text-2xl md:text-[2.2rem] leading-tight font-bold mb-5 font-heading text-foreground">
            {transformationsHeading}
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            {transformationsDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {transformations.map((t, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md border border-border">
                <div className={`h-1.5 ${
                  t.colorIndex === 0 ? "bg-primary" : t.colorIndex === 1 ? "bg-secondary" : "bg-accent"
                }`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.avatarUrl} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-border" />
                    <div>
                      <p className="font-bold text-sm text-foreground">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.day}</p>
                    </div>
                  </div>
                  <h3 className={`text-lg font-bold mb-3 font-heading ${
                    t.colorIndex === 0 ? "text-primary" : t.colorIndex === 1 ? "text-secondary" : "text-accent"
                  }`}>
                    {t.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 bg-card p-10 rounded-2xl max-w-3xl mx-auto shadow-sm border border-border">
            <p className="text-xl font-semibold text-secondary mb-4">
              {closingEmoji} {closingTitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {closingDescription}
            </p>
            {/* Mini avatar row */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex -space-x-2">
                {socialProofAvatarUrls.slice(0, 3).map((avatar, i) => (
                  <img key={i} src={avatar.url} alt="" className="w-8 h-8 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{closingAvatarsLabel}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
