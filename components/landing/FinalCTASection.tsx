"use client";

export interface FinalCTASectionProps {
  mainHeading: string;
  choice1Badge: string;
  choice1Heading: string;
  choice1Items: { item: string }[];
  choice1Closing: string;
  choice2Badge: string;
  choice2Heading: string;
  choice2Items: { text: string; bold: boolean }[];
  choice2Closing: string;
  ctaQuestion: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  primaryCtaSubtext: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  trustBadges: { text: string }[];
  securityBadges: { text: string }[];
  psMessages: { text: string }[];
  finalCtaText: string;
  finalCtaUrl: string;
  footerLogoUrl: string;
  footerCopyright: string;
}

export const FinalCTASection = ({
  mainHeading,
  choice1Badge,
  choice1Heading,
  choice1Items,
  choice1Closing,
  choice2Badge,
  choice2Heading,
  choice2Items,
  choice2Closing,
  ctaQuestion,
  primaryCtaText,
  primaryCtaUrl,
  primaryCtaSubtext,
  secondaryCtaText,
  secondaryCtaUrl,
  trustBadges,
  securityBadges,
  psMessages,
  finalCtaText,
  finalCtaUrl,
  footerLogoUrl,
  footerCopyright,
}: FinalCTASectionProps) => {
  return (
    <>
      {/* Final CTA */}
      <section className="hero-gradient py-16 px-5">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-primary-foreground font-heading text-center">
            {mainHeading}
          </h2>

          {/* Side-by-side choice cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Choice 1 — Do Nothing */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6 md:p-8 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-5 py-1.5 rounded-full text-sm font-bold shadow-sm whitespace-nowrap">
                {choice1Badge}
              </div>
              <h3 className="text-primary-foreground text-xl font-bold text-center mt-2 mb-5">{choice1Heading}</h3>
              <ul className="space-y-3 text-primary-foreground/90">
                {choice1Items.map((entry, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5 shrink-0">✗</span>
                    <span>{entry.item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-primary-foreground/15 text-center">
                <p className="text-accent font-bold text-lg">{choice1Closing}</p>
              </div>
            </div>

            {/* Choice 2 — Take Action */}
            <div className="bg-secondary/20 backdrop-blur-sm border-2 border-secondary/40 rounded-2xl p-6 md:p-8 relative shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-5 py-1.5 rounded-full text-sm font-bold shadow-sm whitespace-nowrap">
                {choice2Badge}
              </div>
              <h3 className="text-primary-foreground text-xl font-bold text-center mt-2 mb-5">{choice2Heading}</h3>
              <ul className="space-y-3 text-primary-foreground">
                {choice2Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-primary-foreground/10 p-2.5 rounded-lg">
                    <span className="text-secondary font-bold mt-0.5 shrink-0">✓</span>
                    <span className={item.bold ? "font-bold" : ""}>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-secondary/30 text-center">
                <p className="text-primary-foreground font-bold text-lg">{choice2Closing}</p>
              </div>
            </div>
          </div>

          {/* CTA area — contained card for contrast */}
          <div className="max-w-xl mx-auto bg-card rounded-none md:rounded-2xl p-6 md:p-10 shadow-2xl text-center -mx-5 md:mx-auto">
            <p className="text-foreground text-xl mb-6 font-bold">{ctaQuestion}</p>

            <a
              href={primaryCtaUrl}
              className="block w-full cta-gradient text-center py-5 rounded-full text-primary-foreground font-bold text-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 animate-pulse-glow"
            >
              {primaryCtaText}
            </a>
            <p className="text-muted-foreground mt-3 font-medium text-sm">{primaryCtaSubtext}</p>

            <a
              href={secondaryCtaUrl}
              className="block w-full bg-primary text-center py-4 rounded-full text-primary-foreground font-semibold text-lg mt-4 hover:opacity-90 transition-all"
            >
              {secondaryCtaText}
            </a>

            <div className="flex justify-center flex-wrap gap-x-5 gap-y-2 mt-6 text-muted-foreground text-xs font-medium">
              {trustBadges.map((badge, i) => (
                <span key={i}>{badge.text}</span>
              ))}
            </div>

            <div className="flex justify-center flex-wrap gap-3 mt-5">
              {securityBadges.map((badge, i) => (
                <div key={i} className="bg-surface-blue-light px-4 py-2 rounded-full font-semibold text-foreground text-xs border border-primary/15">
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PS Section */}
      <section className="py-16 px-5 bg-surface-light">
        <div className="container">
          <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
            {psMessages.map((msg, i) => (
              <p key={i} className="font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: msg.text }} />
            ))}

            <div className="text-center mt-10">
              <a
                href={finalCtaUrl}
                className="inline-block cta-gradient px-10 py-4 rounded-full text-primary-foreground font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                {finalCtaText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-10 px-5 text-center">
        <div className="container">
          <img
            src={footerLogoUrl}
            alt="Logo"
            className="h-12 w-auto mx-auto brightness-0 invert"
          />
          <p className="mt-5 text-primary-foreground/70 text-sm">
            {footerCopyright}
          </p>
        </div>
      </footer>
    </>
  );
};
