"use client";

export interface GuaranteeSectionProps {
  headerBadge: string;
  mainIcon: string;
  mainHeading: string;
  mainDescription: string;
  earlySignalsText: string;
  signalsLabel: string;
  signals: { emoji: string; text: string }[];
  refundPromise: string;
  confidenceStatement: string;
  confidencePercentage: string;
  ctaText: string;
  ctaUrl: string;
  ctaSubtext: string;
  trustBadges: {
    emoji: string;
    title: string;
    sub: string;
    bgColor: string;
  }[];
}

export const GuaranteeSection = ({
  headerBadge,
  mainIcon,
  mainHeading,
  mainDescription,
  earlySignalsText,
  signalsLabel,
  signals,
  refundPromise,
  confidenceStatement,
  confidencePercentage,
  ctaText,
  ctaUrl,
  ctaSubtext,
  trustBadges,
}: GuaranteeSectionProps) => {
  return (
    <section className="py-16 px-5 bg-card">
      <div className="container">
        <div className="max-w-3xl mx-auto -mx-5 md:mx-auto">
          {/* Main guarantee card */}
          <div className="bg-surface-green-light border-2 border-secondary/25 rounded-none md:rounded-2xl overflow-hidden shadow-lg relative">
            {/* Header bar */}
            <div className="bg-secondary text-secondary-foreground text-center py-3 px-6">
              <p className="font-bold text-sm tracking-wide uppercase">{headerBadge}</p>
            </div>

            <div className="p-8 md:p-10 text-center">
              <div className="text-6xl mb-4">{mainIcon}</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">
                {mainHeading}
              </h2>

              <p className="text-lg leading-relaxed text-foreground max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: mainDescription }} />

              {/* Signal checklist — visual cards */}
              <div className="mt-8 mb-8">
                <p className="font-bold text-lg text-foreground mb-4">{signalsLabel}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
                  {signals.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 bg-card p-3.5 rounded-xl border border-secondary/15 ${
                        i === signals.length - 1 ? "sm:col-span-2 bg-secondary/10 border-secondary/30" : ""
                      }`}
                    >
                      <span className="text-2xl shrink-0">{s.emoji}</span>
                      <span className={`text-foreground ${i === signals.length - 1 ? "font-bold" : ""}`}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refund promise */}
              <div className="bg-card border border-border rounded-xl p-5 max-w-xl mx-auto">
                <p className="text-foreground text-lg font-medium" dangerouslySetInnerHTML={{ __html: refundPromise }} />
              </div>

              {/* Confidence stat */}
              <div className="mt-6 cta-gradient rounded-xl p-5 max-w-xl mx-auto">
                <p className="text-primary-foreground text-lg font-bold" dangerouslySetInnerHTML={{ __html: confidenceStatement.replace('{percentage}', `<span class="text-2xl font-black">${confidencePercentage}</span>`) }} />
              </div>

              {/* CTA */}
              <a
                href={ctaUrl}
                className="inline-block mt-8 cta-gradient px-10 py-4 rounded-full text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                {ctaText}
              </a>
              <p className="text-sm text-muted-foreground mt-3">{ctaSubtext}</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mt-12">
          {trustBadges.map((badge, i) => (
            <div key={i} className="text-center bg-card border border-border rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200" style={{ background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--muted) / 0.3) 100%)' }}>
              <div className={`w-14 h-14 rounded-full ${badge.bgColor} flex items-center justify-center mx-auto mb-3 shadow-lg text-3xl`}>
                {badge.emoji}
              </div>
              <p className="text-sm font-extrabold text-foreground leading-tight">{badge.title}</p>
              <p className="text-xs font-medium text-muted-foreground mt-1">{badge.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
