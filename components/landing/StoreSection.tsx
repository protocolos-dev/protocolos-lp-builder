"use client";

export interface StorySectionProps {
  badge: string;
  title: string;
  byline: string;
  chapter1Label: string;
  chapter1Opening: string;
  chapter1Subtitle: string;
  chapter1Paragraph: string;
  triedEverythingLabel: string;
  triedEverythingItems: { item: string }[];
  chapter1Closing: string;
  chapter2Label: string;
  chapter2Opening: string;
  chapter2Paragraph1: string;
  chapter2Paragraph2: string;
  searchQuery: string;
  chapter2Paragraph3: string;
  chapter2Paragraph4: string;
  keyQuote: string;
  chapter2Reaction1: string;
  chapter2Reaction2: string;
  chapter3Label: string;
  chapter3Opening: string;
  discoveryItems: { item: string }[];
  discoveryStatement1: string;
  discoveryStatement2: string;
  week2Label: string;
  week2Items: { item: string }[];
  day90Label: string;
  day90Items: { item: string }[];
  closingParagraph1: string;
  closingParagraph2: string;
  closingParagraph3: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaTimeline: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  ctaGuarantee: string;
}

export const StorySection = ({
  badge,
  title,
  byline,
  chapter1Label,
  chapter1Opening,
  chapter1Subtitle,
  chapter1Paragraph,
  triedEverythingLabel,
  triedEverythingItems,
  chapter1Closing,
  chapter2Label,
  chapter2Opening,
  chapter2Paragraph1,
  chapter2Paragraph2,
  searchQuery,
  chapter2Paragraph3,
  chapter2Paragraph4,
  keyQuote,
  chapter2Reaction1,
  chapter2Reaction2,
  chapter3Label,
  chapter3Opening,
  discoveryItems,
  discoveryStatement1,
  discoveryStatement2,
  week2Label,
  week2Items,
  day90Label,
  day90Items,
  closingParagraph1,
  closingParagraph2,
  closingParagraph3,
  ctaHeading,
  ctaDescription,
  ctaTimeline,
  ctaButtonText,
  ctaButtonUrl,
  ctaGuarantee,
}: StorySectionProps) => {
  return (
    <>
      <section className="py-16 md:py-24 px-5 bg-card">
        <div className="container">
          {/* Editorial-style header */}
          <div className="max-w-[720px] mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">{badge}</p>
            <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.15] font-bold font-heading text-foreground">
              {title}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
            <p className="text-sm text-muted-foreground mt-4">{byline}</p>
          </div>

          {/* Article body — narrow, editorial column */}
          <article className="max-w-[640px] mx-auto text-[1.05rem] md:text-[1.1rem] leading-[1.85] text-foreground">

            {/* Chapter 1 */}
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4 border-b border-primary/20 pb-2">{chapter1Label}</p>

            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85]">
              {chapter1Opening}
            </p>

            <p className="text-xl font-bold my-6 text-foreground tracking-tight">{chapter1Subtitle}</p>

            <p className="text-muted-foreground">{chapter1Paragraph}</p>

            {/* Pull-quote style callout */}
            <div className="my-8 border-l-4 border-accent pl-6 py-2">
              <p className="font-bold text-foreground mb-3">{triedEverythingLabel}</p>
              <ul className="space-y-2 text-muted-foreground italic">
                {triedEverythingItems.map((entry, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent not-italic shrink-0">•</span> {entry.item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-muted-foreground">{chapter1Closing}</p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-10">
              <span className="w-2 h-2 rounded-full bg-primary/30" />
              <span className="w-2 h-2 rounded-full bg-primary/50" />
              <span className="w-2 h-2 rounded-full bg-primary/30" />
            </div>

            {/* Chapter 2 */}
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4 border-b border-primary/20 pb-2">{chapter2Label}</p>

            <p className="text-xl font-semibold text-foreground mb-4">{chapter2Opening}</p>

            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: chapter2Paragraph1 }} />

            <p className="text-muted-foreground mt-4">{chapter2Paragraph2}</p>

            {/* Search query — editorial highlight */}
            <div className="my-8 bg-surface-blue-light rounded-xl px-8 py-6 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">🔍 Search Query</p>
              <p className="text-xl md:text-2xl font-bold text-primary font-heading">{searchQuery}</p>
            </div>

            <p className="text-muted-foreground">{chapter2Paragraph3}</p>

            <p className="text-muted-foreground mt-4">{chapter2Paragraph4}</p>

            {/* Key quote — prominent pull-quote */}
            <blockquote className="my-8 border-l-4 border-primary pl-6 py-2">
              <p className="text-lg italic text-foreground leading-relaxed">
                {keyQuote}
              </p>
            </blockquote>

            <p className="text-lg font-bold text-foreground">{chapter2Reaction1}</p>
            <p className="text-lg mt-2">{chapter2Reaction2}</p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-10">
              <span className="w-2 h-2 rounded-full bg-primary/30" />
              <span className="w-2 h-2 rounded-full bg-primary/50" />
              <span className="w-2 h-2 rounded-full bg-primary/30" />
            </div>

            {/* Chapter 3 */}
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4 border-b border-primary/20 pb-2">{chapter3Label}</p>

            <p className="text-muted-foreground">{chapter3Opening}</p>
            <ul className="my-4 space-y-2 text-muted-foreground ml-6">
              {discoveryItems.map((entry, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">{i + 1}.</span> {entry.item}
                </li>
              ))}
            </ul>

            <p className="text-xl font-semibold text-primary my-6">{discoveryStatement1}</p>
            <p className="text-xl font-bold text-primary">{discoveryStatement2}</p>

            {/* Results — side by side timeline feel */}
            <div className="my-10 space-y-6">
              <div className="bg-surface-green-light rounded-xl p-6 border border-secondary/15">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">{week2Label}</p>
                <ul className="space-y-2 text-muted-foreground">
                  {week2Items.map((entry, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary font-bold shrink-0">✓</span> {entry.item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface-green-light rounded-xl p-6 border-2 border-secondary/25 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">{day90Label}</p>
                <ul className="space-y-2 text-muted-foreground">
                  {day90Items.map((entry, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary font-bold shrink-0">✓</span> {entry.item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground">{closingParagraph1}</p>
            <p className="text-muted-foreground mt-4">{closingParagraph2}</p>
            <p className="text-xl font-semibold mt-6 text-foreground">{closingParagraph3}</p>
          </article>
        </div>
      </section>

      {/* Inline CTA #2 */}
      <section className="bg-surface-green-light border-y border-secondary/20 py-12 px-5">
        <div className="container text-center max-w-3xl">
          <h3 className="text-secondary text-2xl md:text-3xl font-bold mb-5 font-heading">
            {ctaHeading}
          </h3>
          <p className="text-lg mb-4 text-foreground">
            {ctaDescription}
          </p>
          <p className="text-lg mb-8 text-muted-foreground">
            {ctaTimeline}
          </p>
          <a
            href={ctaButtonUrl}
            className="inline-block cta-gradient px-10 py-4 rounded-full text-primary-foreground font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            {ctaButtonText}
          </a>
          <p className="mt-5 text-sm text-muted-foreground">
            {ctaGuarantee}
          </p>
        </div>
      </section>
    </>
  );
};
