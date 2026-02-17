import React from "react";
import { Config } from "@measured/puck";
import { ImagePickerField } from "@/components/admin/ImagePickerField";
import { Hero } from "@/components/landing/Hero";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { EnemySection } from "@/components/landing/EnemySection";
import { StorySection } from "@/components/landing/StoreSection";
import { MechanismSection } from "@/components/landing/MechanismSection";
import { ProofSection } from "@/components/landing/ProofSection";
import { OfferSection } from "@/components/landing/OfferSection";
import { GuaranteeSection } from "@/components/landing/GuaranteeSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

// ── Container helpers ────────────────────────────────────────────────────────

const containerMaxWidthField = {
  type: "select" as const,
  options: [
    { label: "Global default", value: "" },
    { label: "960px", value: "960px" },
    { label: "1280px", value: "1280px" },
    { label: "1440px", value: "1440px" },
    { label: "1600px", value: "1600px" },
    { label: "Full width", value: "100%" },
  ],
};

// Wraps a component with an optional centered max-width container.
// When containerMaxWidth is empty the component renders as-is (inherits root).
function withContainer(Component: any) {
  return function ContainerWrapper(props: any) {
    const { containerMaxWidth, ...rest } = props;
    if (!containerMaxWidth) return React.createElement(Component, rest);
    return React.createElement(
      "div",
      {
        style: {
          maxWidth: containerMaxWidth,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        },
      },
      React.createElement(Component, rest)
    );
  };
}

// ── Background color helpers ──────────────────────────────────────────────────

const backgroundColorField = {
  type: "custom" as const,
  render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 8, alignItems: "center" } },
      React.createElement("input", {
        type: "color",
        value: value || "#ffffff",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
        style: { width: 36, height: 30, padding: 2, cursor: "pointer", borderRadius: 4, border: "1px solid #d1d5db" },
      }),
      React.createElement("input", {
        type: "text",
        value: value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
        placeholder: "e.g. #ffffff or transparent",
        style: {
          flex: 1,
          padding: "4px 8px",
          fontSize: 12,
          border: "1px solid #d1d5db",
          borderRadius: 4,
          fontFamily: "monospace",
        },
      }),
      value
        ? React.createElement(
            "button",
            {
              type: "button",
              onClick: () => onChange(""),
              style: {
                fontSize: 11,
                color: "#6b7280",
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "0 4px",
                whiteSpace: "nowrap",
              },
            },
            "Clear"
          )
        : null
    ),
};

// Custom image picker field — shows a preview, file upload button, and URL input.
const imagePickerField = {
  type: "custom" as const,
  render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) =>
    React.createElement(ImagePickerField, { value: value ?? "", onChange }),
};

// Wraps a component with an optional background color that always spans the
// full viewport width, even when inside a centered max-width root container.
// Uses the full-bleed technique: width:100vw + margin-left:calc(50% - 50vw).
function withBackgroundColor(Component: any) {
  return function BackgroundColorWrapper(props: any) {
    const { backgroundColor, ...rest } = props;
    if (!backgroundColor) return React.createElement(Component, rest);
    return React.createElement(
      "div",
      {
        style: {
          backgroundColor,
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
        },
      },
      React.createElement(Component, rest)
    );
  };
}

// ── Config ───────────────────────────────────────────────────────────────────

export const puckConfig: Config = {
  root: {
    fields: {
      maxWidth: {
        type: "select",
        options: [
          { label: "960px", value: "960px" },
          { label: "1280px", value: "1280px" },
          { label: "1440px (default)", value: "1440px" },
          { label: "1600px", value: "1600px" },
          { label: "Full width", value: "100%" },
        ],
      },
    },
    defaultProps: { maxWidth: "1440px" },
    render: (({ children, maxWidth }: { children: React.ReactNode; maxWidth: string }) =>
      React.createElement(
        "div",
        {
          style: {
            maxWidth: maxWidth || "1440px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          },
        },
        children
      )) as any,
  },
  components: {
    HeroSection: {
      fields: {
        logoUrl: imagePickerField,
        badgeText: { type: "text" },
        headline: { type: "textarea" },
        subheadline: { type: "textarea" },
        ctaText: { type: "text" },
        ctaUrl: { type: "text" },
        socialProofCount: { type: "text" },
        rating: { type: "text" },
        guaranteeText: { type: "text" },
        scratchBoxTeaser: { type: "textarea" },
        scratchBoxReveal: { type: "textarea" },
        beforeImageUrl: imagePickerField,
        beforeImageLabel: { type: "text" },
        afterImageUrl: imagePickerField,
        afterImageLabel: { type: "text" },
        avatarUrls: {
          type: "array",
          arrayFields: {
            url: imagePickerField,
          },
        },
        ctaBenefits: {
          type: "array",
          arrayFields: {
            icon: { type: "text" },
            text: { type: "text" },
          },
        },
        pressLogos: {
          type: "array",
          arrayFields: {
            url: imagePickerField,
            alt: { type: "text" },
          },
        },
      },
      defaultProps: {
        logoUrl: "https://joyspringvitamins.com/_next/static/media/logo.ee08c9ef.svg",
        badgeText: "The 90-Day Gut Reset For Kids™",
        headline: 'Why Does Your Pediatrician Keep Saying <span class="font-extrabold text-[hsl(50,100%,80%)] underline decoration-[hsl(50,100%,80%)]/40 decoration-[3px] underline-offset-4">"It\'s Normal"</span> When Your Child Goes <span class="font-extrabold text-[hsl(355,92%,80%)]">4 Days Without Pooping</span>, Eats Only <span class="font-extrabold text-[hsl(355,92%,80%)]">6 Foods</span>, and Has <span class="font-extrabold text-[hsl(355,92%,80%)]">Dark Circles Under Their Eyes</span>?',
        subheadline: 'The accidental discovery by a desperate mom that revealed the <span class="font-bold text-[hsl(50,100%,85%)]">3-phase sequence doctors don\'t learn in med school</span>... and how <span class="font-bold">1,247 parents</span> have used it to transform their children\'s digestive health in just <span class="font-bold">90 days</span>',
        ctaText: "SEE THE 3-PHASE PROTOCOL →",
        ctaUrl: "#choose-option",
        socialProofCount: "1,247+ parents joined",
        rating: "4.8/5 rating",
        guaranteeText: "30-Day Guarantee",
        scratchBoxTeaser: '👆 Scratch here to discover the <span class="text-accent">#1 mistake</span> keeping your child stuck in the picky-eating, constipation cycle',
        scratchBoxReveal: '⚠️ You\'re trying to fix appetite without addressing <span class="text-accent">DIGESTION FIRST</span>',
        beforeImageUrl: "https://placehold.co/400x400",
        beforeImageLabel: "BEFORE: Bloated, Picky, Struggling",
        afterImageUrl: "https://placehold.co/400x400",
        afterImageLabel: "AFTER: Comfortable, Eating, Thriving",
        avatarUrls: [
          { url: "https://i.pravatar.cc/150?img=1" },
          { url: "https://i.pravatar.cc/150?img=2" },
          { url: "https://i.pravatar.cc/150?img=3" },
        ],
        ctaBenefits: [
          { icon: "🔓", text: "No commitment" },
          { icon: "🛡️", text: "30-day guarantee" },
          { icon: "📦", text: "Free shipping" },
        ],
        pressLogos: [
          { url: "https://placehold.co/120x40/png?text=Press+1", alt: "Press 1" },
          { url: "https://placehold.co/120x40/png?text=Press+2", alt: "Press 2" },
          { url: "https://placehold.co/120x40/png?text=Press+3", alt: "Press 3" },
        ],
      },
      render: HeroSection as any,
    },
    ProblemSection: {
      fields: {
        mainHeading: { type: "text" },
        subHeading: { type: "text" },
        problems: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            cost: { type: "number" },
            emoji: { type: "text" },
            reaction: { type: "text" },
          },
        },
        progressText: { type: "text" },
        costCounterLabel: { type: "text" },
        costCounterSuffix: { type: "text" },
        allCheckedTitle: { type: "text" },
        allCheckedDescription: { type: "textarea" },
        allCheckedCtaText: { type: "text" },
        allCheckedCtaUrl: { type: "text" },
        empathyBadge: { type: "text" },
        empathyHeading: { type: "textarea" },
        empathyParagraphs: {
          type: "array",
          arrayFields: {
            text: { type: "textarea" },
            variant: {
              type: "radio",
              options: [
                { label: "Blue", value: "blue" },
                { label: "Pink", value: "pink" },
              ],
            },
          },
        },
        empathyClosing: { type: "text" },
        empathyClosingSubtext: { type: "text" },
        inlineCtaHeading: { type: "text" },
        inlineCtaDescription: { type: "textarea" },
        inlineCtaButtonText: { type: "text" },
        inlineCtaButtonUrl: { type: "text" },
        inlineCtaGuarantee: { type: "text" },
      },
      defaultProps: {
        mainHeading: "You've Already Spent $400+ On Solutions That Didn't Work...",
        subHeading: "Here's Why 👇",
        problems: [
          { label: '"Just add more fiber" (your pediatrician)', cost: 80, emoji: "🥦", reaction: "Spoiler: fiber alone isn't the answer" },
          { label: "Miralax dependency concerns", cost: 50, emoji: "💊", reaction: "Dependency isn't a solution..." },
          { label: "5 different probiotic brands (no change)", cost: 150, emoji: "🦠", reaction: "$150 down the drain" },
          { label: "Gluten-free, dairy-free diet (made picky eating WORSE)", cost: 200, emoji: "🚫", reaction: "Restriction ≠ resolution" },
          { label: "Bribery, rewards, mealtime battles (stressful for everyone)", cost: 100, emoji: "🎁", reaction: "Exhausting for the whole family" },
          { label: '"They\'ll grow out of it" (been waiting 2 years...)', cost: 0, emoji: "⏰", reaction: "Still waiting..." },
        ],
        progressText: "👇 Tap each one you've tried",
        costCounterLabel: "Money wasted on things that didn't work:",
        costCounterSuffix: "💸 ...and counting",
        allCheckedTitle: "😮 You've tried EVERYTHING...",
        allCheckedDescription: "That's $totalCost spent — and none of it addressed the <strong class=\"text-foreground\">root cause</strong>.",
        allCheckedCtaText: "See What Actually Works →",
        allCheckedCtaUrl: "#choose-option",
        empathyBadge: "😔 SOUND FAMILIAR?",
        empathyHeading: "<strong>Every morning you wake up hoping TODAY will be different.</strong>",
        empathyParagraphs: [
          { text: "Maybe today they'll try a new food. Maybe today the bathroom trip won't end in tears. Maybe today you won't feel like a failure as a parent.", variant: "blue" },
          { text: "But by dinner, you're back to negotiating over chicken nuggets... AGAIN.", variant: "blue" },
          { text: 'By bedtime, you\'re googling "child hasn\'t pooped in 5 days" while your pediatrician\'s voice echoes: <em>"It\'s normal."</em>', variant: "pink" },
        ],
        empathyClosing: "But here's what they DON'T tell you...",
        empathyClosingSubtext: "👇 Keep reading — the answer will surprise you",
        inlineCtaHeading: "Stop Wasting Money on Random Solutions...",
        inlineCtaDescription: "See the proven 3-phase system that worked for 1,247+ parents",
        inlineCtaButtonText: "SHOW ME THE SOLUTION →",
        inlineCtaButtonUrl: "#choose-option",
        inlineCtaGuarantee: "✓ 30-Day Guarantee • ✓ Cancel Anytime",
      },
      render: ProblemSection as any,
    },
    EnemySection: {
      fields: {
        mainHeading: { type: "text" },
        gutBlockBadge: { type: "text" },
        gutBlockImageUrl: imagePickerField,
        gutBlockImageAlt: { type: "text" },
        tapToRevealTitle: { type: "text" },
        tapToRevealSubtext: { type: "text" },
        gutBlockCaptionTitle: { type: "text" },
        gutBlockCaptionDescription: { type: "text" },
        criticalInsightBadge: { type: "text" },
        gutBlockVillainImageUrl: imagePickerField,
        villainTitle: { type: "text" },
        villainExplanation: { type: "textarea" },
        gutBlockReasonsLabel: { type: "text" },
        gutBlockReasons: {
          type: "array",
          arrayFields: {
            text: { type: "text" },
            icon: { type: "text" },
          },
        },
        heroVsGutblockImageUrl: imagePickerField,
        solutionTexts: {
          type: "array",
          arrayFields: {
            text: { type: "text" },
          },
        },
        lies: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            truth: { type: "textarea" },
            icon: { type: "text" },
          },
        },
        liesHeading: { type: "text" },
        bridgeQuoteBadge: { type: "text" },
        bridgeQuoteQuestion: { type: "textarea" },
        bridgeQuoteAnswer: { type: "textarea" },
        bridgeQuoteClosing: { type: "text" },
      },
      defaultProps: {
        mainHeading: "The $47 Billion Supplement Industry Doesn't Want You To Know This...",
        gutBlockBadge: "🔍 THE HIDDEN PROBLEM",
        gutBlockImageUrl: "https://placehold.co/800x600/png?text=Gut+Block+Diagram",
        gutBlockImageAlt: "Gut Block illustration showing inflamed gut lining, bloating, poor absorption, and toxin buildup",
        tapToRevealTitle: "👆 Tap to reveal",
        tapToRevealSubtext: "What's REALLY happening inside your child's gut",
        gutBlockCaptionTitle: '"GUT BLOCK"',
        gutBlockCaptionDescription: "The hidden barrier stopping everything from working",
        criticalInsightBadge: "⚠️ CRITICAL INSIGHT",
        gutBlockVillainImageUrl: "https://placehold.co/200x200/png?text=Villain",
        villainTitle: 'The REAL Villain: "Gut Block"',
        villainExplanation: "Here's what no one tells you: When your child's gut is blocked with inflammation and backed-up waste, it creates a protective shutdown. The body literally says \"STOP eating - I can't handle what's already here.\"",
        gutBlockReasonsLabel: 'This "Gut Block" is why:',
        gutBlockReasons: [
          { text: "Probiotics won't colonize (the terrain is hostile)", icon: "✗" },
          { text: "Appetite boosters fail (the body refuses food as protection)", icon: "✗" },
          { text: "Fiber makes it worse (adds bulk to an already blocked system)", icon: "✗" },
          { text: "Your child gets MORE picky over time (the block worsens)", icon: "✗" },
        ],
        heroVsGutblockImageUrl: "https://placehold.co/300x300/png?text=Hero+vs+Block",
        solutionTexts: [
          { text: "You can't fix appetite until you remove the Gut Block." },
          { text: "You can't remove the Gut Block with a single supplement." },
          { text: "You need the RIGHT SEQUENCE. →" },
        ],
        lies: [
          {
            title: 'LIE #1: "Probiotics Fix Everything"',
            truth: "Beneficial bacteria can't colonize a gut that's backed up and inflamed. You're planting seeds in concrete.",
            icon: "🧫",
          },
          {
            title: 'LIE #2: "Just Try This ONE Supplement"',
            truth: "Digestive comfort, elimination rhythm, and appetite are three DIFFERENT systems. One ingredient can't address all three.",
            icon: "💊",
          },
          {
            title: 'LIE #3: "Natural Solutions Are Too Slow/Weak"',
            truth: "Harsh laxatives create dependency. Gentle, sequential support creates lasting transformation.",
            icon: "🌿",
          },
        ],
        liesHeading: "The Three Lies Keeping You Stuck:",
        bridgeQuoteBadge: "💡 THE REAL QUESTION",
        bridgeQuoteQuestion: '"Why hasn\'t anyone told you about sequential gut support before?',
        bridgeQuoteAnswer: "Because there's no money in it for pediatricians (they're not trained in nutrition). Supplement companies make more selling you 5 different bottles. And pharmaceutical companies would rather hook your child on Miralax.",
        bridgeQuoteClosing: 'But one mom accidentally discovered the sequence that changes everything..."',
      },
      render: EnemySection as any,
    },
    StorySection: {
      fields: {
        badge: { type: "text" },
        title: { type: "textarea" },
        byline: { type: "text" },
        chapter1Label: { type: "text" },
        chapter1Opening: { type: "textarea" },
        chapter1Subtitle: { type: "text" },
        chapter1Paragraph: { type: "textarea" },
        triedEverythingLabel: { type: "text" },
        triedEverythingItems: {
          type: "array",
          arrayFields: {
            item: { type: "text" },
          },
        },
        chapter1Closing: { type: "textarea" },
        chapter2Label: { type: "text" },
        chapter2Opening: { type: "text" },
        chapter2Paragraph1: { type: "textarea" },
        chapter2Paragraph2: { type: "text" },
        searchQuery: { type: "text" },
        chapter2Paragraph3: { type: "text" },
        chapter2Paragraph4: { type: "text" },
        keyQuote: { type: "textarea" },
        chapter2Reaction1: { type: "text" },
        chapter2Reaction2: { type: "text" },
        chapter3Label: { type: "text" },
        chapter3Opening: { type: "text" },
        discoveryItems: {
          type: "array",
          arrayFields: {
            item: { type: "text" },
          },
        },
        discoveryStatement1: { type: "text" },
        discoveryStatement2: { type: "text" },
        week2Label: { type: "text" },
        week2Items: {
          type: "array",
          arrayFields: {
            item: { type: "text" },
          },
        },
        day90Label: { type: "text" },
        day90Items: {
          type: "array",
          arrayFields: {
            item: { type: "text" },
          },
        },
        closingParagraph1: { type: "text" },
        closingParagraph2: { type: "text" },
        closingParagraph3: { type: "text" },
        ctaHeading: { type: "text" },
        ctaDescription: { type: "text" },
        ctaTimeline: { type: "text" },
        ctaButtonText: { type: "text" },
        ctaButtonUrl: { type: "text" },
        ctaGuarantee: { type: "text" },
      },
      defaultProps: {
        badge: "True Story • Verified Parent",
        title: "How A Desperate Mom's 2 AM Google Search Led To The Discovery That Changed 1,247 Children's Lives",
        byline: "By Rachel M. · Parent · Updated February 2026",
        chapter1Label: "Chapter 1 — The Before State",
        chapter1Opening: "Rachel's 5-year-old daughter Mia ate exactly 6 foods. Chicken nuggets (only one brand). White rice. Applesauce. Goldfish crackers. Cheese sticks. And on rare occasions, a banana.",
        chapter1Subtitle: "Every. Single. Day.",
        chapter1Paragraph: "Mia's belly was visibly distended after meals. She went 4-5 days between bowel movements, often ending in tears. Dark circles under her eyes made strangers ask if she was sick.",
        triedEverythingLabel: "Rachel had tried EVERYTHING:",
        triedEverythingItems: [
          { item: 'Three different pediatricians ("she\'ll grow out of it")' },
          { item: "Five probiotic brands (no change)" },
          { item: "Elimination diet (Mia literally stopped eating for 2 days)" },
          { item: "Fiber gummies (she refused them)" },
          { item: "Miralax (worked but Rachel worried about dependency)" },
        ],
        chapter1Closing: "The stress was destroying their family. Mealtimes were battles. Rachel cried herself to sleep wondering what she was doing wrong.",
        chapter2Label: "Chapter 2 — The Breaking Point",
        chapter2Opening: "Then came the moment that changed everything.",
        chapter2Paragraph1: 'Mia started kindergarten. The teacher called: <em>"Mia refused lunch for 3 days straight. She\'s falling asleep during reading time. We\'re concerned."</em>',
        chapter2Paragraph2: "That night at 2 AM, unable to sleep, Rachel typed into Google:",
        searchQuery: '"Why won\'t my child eat AND poop?"',
        chapter2Paragraph3: "Most results were the same: probiotics, fiber, pediatrician advice she'd already tried.",
        chapter2Paragraph4: "But then she found a research thread from a functional medicine forum...",
        keyQuote: "\"You can't restore appetite when elimination is backed up. You can't regulate elimination when the gut is inflamed. It's a SEQUENCE, not a single fix.\"",
        chapter2Reaction1: "Rachel sat up in bed.",
        chapter2Reaction2: "THAT'S what she'd been missing.",
        chapter3Label: "Chapter 3 — The Discovery",
        chapter3Opening: "The next day, Rachel dove into research. She discovered:",
        discoveryItems: [
          { item: "Traditional medicine used digestive comfort herbs FIRST (Phase 1)" },
          { item: "Then regularity support to establish rhythm (Phase 2)" },
          { item: "THEN appetite and nutritional support (Phase 3)" },
        ],
        discoveryStatement1: "It was never about finding the ONE magic supplement.",
        discoveryStatement2: "It was about SEQUENCE.",
        week2Label: "📅 Week 2 — First Signs",
        week2Items: [
          { item: "Mia tried a strawberry (first new food in 8 months)" },
          { item: "Bathroom trips became daily, tearless" },
          { item: "Dark circles started fading" },
          { item: "Rachel cried - but this time from hope" },
        ],
        day90Label: "📅 Day 90 — Full Transformation",
        day90Items: [
          { item: "Mia ate 17 different foods (including vegetables!)" },
          { item: "Asked for seconds at dinner" },
          { item: "Had regular, comfortable bathroom habits" },
          { item: 'Teacher reported: "She\'s a different child - engaged, energetic, thriving"' },
        ],
        closingParagraph1: "Rachel shared her discovery in her autism mom's Facebook group.",
        closingParagraph2: "Within 3 months, 47 moms reported similar transformations.",
        closingParagraph3: "That's when we knew we had to systematize this...",
        ctaHeading: "Ready to Write Your Own Success Story?",
        ctaDescription: "Join 1,247 parents who discovered the sequential approach that actually works",
        ctaTimeline: "⏱️ Early signals in 2-4 weeks • Full transformation in 90 days",
        ctaButtonText: "YES, START MY CHILD'S 90-DAY RESET",
        ctaButtonUrl: "#choose-option",
        ctaGuarantee: "✓ Subscribe & Save from $83.23 • ✓ One-Time from $99.87 • ✓ Risk-Free Guarantee",
      },
      render: StorySection as any,
    },
    MechanismSection: {
      fields: {
        mainHeading: { type: "text" },
        subtitle: { type: "textarea" },
        gutResetHeroUrl: imagePickerField,
        phases: {
          type: "array",
          arrayFields: {
            number: { type: "text" },
            title: { type: "text" },
            productName: { type: "text" },
            subtitle: { type: "text" },
            badge: { type: "text" },
            timeline: { type: "text" },
            color: {
              type: "radio",
              options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
                { label: "Accent", value: "accent" },
              ],
            },
            borderColor: { type: "text" },
            bgLight: { type: "text" },
            badgeBg: { type: "text" },
            problem: { type: "textarea" },
            whyFailed: { type: "textarea" },
            solutionTitle: { type: "text" },
            solutionDesc: { type: "text" },
            ingredients: {
              type: "array",
              arrayFields: {
                item: { type: "text" },
              },
            },
            quotes: {
              type: "array",
              arrayFields: {
                quote: { type: "text" },
              },
            },
            solutionBg: { type: "text" },
            productImgUrl: imagePickerField,
            customerPhotoUrls: {
              type: "array",
              arrayFields: {
                url: imagePickerField,
              },
            },
          },
        },
        wrongOrderBadge: { type: "text" },
        wrongOrderHeading: { type: "text" },
        wrongOrderItems: {
          type: "array",
          arrayFields: {
            item: { type: "text" },
          },
        },
        wrongOrderCost: { type: "text" },
        wrongOrderResult: { type: "text" },
        rightOrderBadge: { type: "text" },
        rightOrderHeading: { type: "text" },
        rightOrderItems: {
          type: "array",
          arrayFields: {
            month: { type: "text" },
            text: { type: "text" },
          },
        },
        rightOrderResult: { type: "text" },
        rightOrderSubresult: { type: "text" },
        rightOrderProvenBadge: { type: "text" },
        ctaHeading: { type: "text" },
        ctaParagraph1: { type: "text" },
        ctaParagraph2: { type: "text" },
        ctaButtonText: { type: "text" },
        ctaButtonUrl: { type: "text" },
        ctaUnitsLabel: { type: "text" },
        initialUnitsRemaining: { type: "number" },
      },
      defaultProps: {
        mainHeading: "The 3-Phase Protocol Your Child's Body Needs",
        subtitle: 'Each phase builds on the last — <strong class="text-foreground">sequence is everything</strong>',
        gutResetHeroUrl: "https://placehold.co/1200x400/png?text=Gut+Reset+Hero",
        phases: [
          {
            number: "01",
            title: "PHASE 1: Digestive Comfort",
            productName: "Detox Zee Herbal",
            subtitle: "(Must Come First)",
            badge: "CLEANSE",
            timeline: "Days 1-30",
            color: "primary",
            borderColor: "border-primary",
            bgLight: "bg-surface-blue-light",
            badgeBg: "bg-primary",
            problem: 'Inflammation in the gut signals: "STOP eating - I can\'t process what\'s already here."',
            whyFailed: "Probiotics can't colonize inflamed tissue. It's like planting flowers in toxic soil.",
            solutionTitle: "Detox Zee Herbal:",
            solutionDesc: "Gentle herbal blend containing botanicals traditionally used to support digestive wellness:",
            ingredients: [
              { item: "Chlorella — nutrient-dense green algae" },
              { item: "Cilantro — traditionally used herb for digestive support" },
              { item: "Milk Thistle — traditionally used to support liver wellness" },
              { item: "Turmeric & Dandelion — traditional comfort botanicals" },
            ],
            quotes: [
              { quote: '"After 2 weeks noticed changes in his appetite, more engaged"' },
              { quote: '"Less dark circles under his eyes"' },
              { quote: '"My little one sleeps better"' },
            ],
            solutionBg: "bg-surface-blue-light",
            productImgUrl: "https://placehold.co/300x400/png?text=Phase+1+Product",
            customerPhotoUrls: [
              { url: "https://i.pravatar.cc/150?img=10" },
              { url: "https://i.pravatar.cc/150?img=11" },
              { url: "https://i.pravatar.cc/150?img=12" },
            ],
          },
          {
            number: "02",
            title: "PHASE 2: Elimination Rhythm",
            productName: "PottyWise",
            subtitle: "(Can't Skip This)",
            badge: "REGULATE",
            timeline: "Days 31-60",
            color: "secondary",
            borderColor: "border-secondary",
            bgLight: "bg-surface-green-light",
            badgeBg: "bg-secondary",
            problem: "Irregular bathroom habits create vicious cycle: pain → avoidance → harder stool → more pain → more avoidance.",
            whyFailed: "Miralax creates dependency. Fiber alone doesn't address the RHYTHM issue.",
            solutionTitle: "PottyWise:",
            solutionDesc: "Gentle herbal blend to support comfortable, regular bowel movements:",
            ingredients: [
              { item: "Senna Leaf — traditionally used to support regularity" },
              { item: "Fennel Seed — supports digestive comfort" },
              { item: "Licorice Root — soothing botanical properties" },
              { item: "Elderberry — pleasant taste with additional support" },
            ],
            quotes: [
              { quote: '"Able to poop every day and eats well"' },
              { quote: '"Say goodbye to tears and stress"' },
              { quote: '"Bathroom trips are comfortable now"' },
            ],
            solutionBg: "bg-surface-green-light",
            productImgUrl: "https://placehold.co/300x400/png?text=Phase+2+Product",
            customerPhotoUrls: [
              { url: "https://i.pravatar.cc/150?img=13" },
              { url: "https://i.pravatar.cc/150?img=14" },
              { url: "https://i.pravatar.cc/150?img=15" },
            ],
          },
          {
            number: "03",
            title: "PHASE 3: Nutritional Metabolism",
            productName: "Hungry Hero",
            subtitle: "(Only Works When 1+2 Are Set)",
            badge: "RESTORE",
            timeline: "Days 61-90",
            color: "accent",
            borderColor: "border-accent",
            bgLight: "bg-surface-orange-light",
            badgeBg: "bg-accent",
            problem: "Body won't signal appetite when gut is uncomfortable OR backed up. It's protective.",
            whyFailed: "Appetite boosters alone can't work when underlying systems are disrupted.",
            solutionTitle: "Hungry Hero:",
            solutionDesc: "Essential minerals & B vitamins with EFSA-authorized health claims:",
            ingredients: [
              { item: "Zinc Citrate 6mg — contributes to normal macronutrient metabolism* (EFSA)" },
              { item: "Vitamin B1 1.2mg — contributes to normal energy-yielding metabolism* (EFSA)" },
              { item: "L-Lysine — essential amino acid for growth" },
              { item: "Ginger, Lemon Balm & Fennel — traditional digestive botanicals" },
            ],
            quotes: [
              { quote: '"Child shows more interest in food, mealtime is easier"' },
              { quote: '"More willing to try new foods"' },
              { quote: '"Finishing what\'s on their plate"' },
            ],
            solutionBg: "bg-surface-orange-light",
            productImgUrl: "https://placehold.co/300x400/png?text=Phase+3+Product",
            customerPhotoUrls: [
              { url: "https://i.pravatar.cc/150?img=16" },
              { url: "https://i.pravatar.cc/150?img=17" },
              { url: "https://i.pravatar.cc/150?img=18" },
            ],
          },
        ],
        wrongOrderBadge: "❌ WRONG ORDER",
        wrongOrderHeading: "What Most Parents Do",
        wrongOrderItems: [
          { item: "Try appetite booster first (child still uncomfortable, won't eat)" },
          { item: "Add probiotics (can't colonize backed-up system)" },
          { item: "Force fiber (makes bloating worse)" },
          { item: "Repeat with different brands, same chaos" },
        ],
        wrongOrderCost: "$400+ spent, zero progress",
        wrongOrderResult: "Frustrated child, frustrated parent",
        rightOrderBadge: "✅ RIGHT ORDER",
        rightOrderHeading: "Gut Reset For Kids",
        rightOrderItems: [
          { month: "Month 1:", text: "Establish digestive comfort (foundation)" },
          { month: "Month 2:", text: "Create elimination rhythm (builds on comfort)" },
          { month: "Month 3:", text: "Support appetite & metabolism (NOW it works)" },
        ],
        rightOrderResult: "Systematic transformation",
        rightOrderSubresult: "Lasting change, thriving child",
        rightOrderProvenBadge: "⭐ PROVEN BY 1,247+ PARENTS",
        ctaHeading: "Now You Understand Why Sequence Matters...",
        ctaParagraph1: "The question is: Will you keep trying random supplements?",
        ctaParagraph2: "Or start the proven 3-phase protocol today?",
        ctaButtonText: "SHOW ME PRICING OPTIONS",
        ctaButtonUrl: "#choose-option",
        ctaUnitsLabel: "⚡ Current batch:",
        initialUnitsRemaining: 153,
      },
      render: MechanismSection as any,
    },
    ProofSection: {
      fields: {
        reviewsHeading: { type: "text" },
        socialProofAvatarUrls: {
          type: "array",
          arrayFields: {
            url: imagePickerField,
          },
        },
        socialProofParentsLabel: { type: "text" },
        initialParentsCount: { type: "number" },
        ratingStars: { type: "text" },
        ratingText: { type: "text" },
        resultsPercentage: { type: "text" },
        reviews: {
          type: "array",
          arrayFields: {
            text: { type: "textarea" },
            author: { type: "text" },
            subtitle: { type: "text" },
            avatarUrl: imagePickerField,
          },
        },
        verifiedBadge: { type: "text" },
        reviewDisclaimer: { type: "text" },
        resultsHeading: { type: "text" },
        resultsDescription: { type: "text" },
        resultTiers: {
          type: "array",
          arrayFields: {
            percentage: { type: "text" },
            label: { type: "text" },
            description: { type: "textarea" },
            bgColor: { type: "text" },
            borderColor: { type: "text" },
          },
        },
        commitmentText: { type: "textarea" },
        transformationsHeading: { type: "text" },
        transformationsDescription: { type: "textarea" },
        transformations: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            text: { type: "textarea" },
            author: { type: "text" },
            day: { type: "text" },
            avatarUrl: imagePickerField,
            colorIndex: {
              type: "radio",
              options: [
                { label: "Primary (Blue)", value: 0 },
                { label: "Secondary (Green)", value: 1 },
                { label: "Accent (Orange)", value: 2 },
              ],
            },
          },
        },
        closingEmoji: { type: "text" },
        closingTitle: { type: "text" },
        closingDescription: { type: "textarea" },
        closingAvatarsLabel: { type: "text" },
      },
      defaultProps: {
        reviewsHeading: "Over 1,247 Parents Have Already Discovered The Secret...",
        socialProofAvatarUrls: [
          { url: "https://i.pravatar.cc/150?img=1" },
          { url: "https://i.pravatar.cc/150?img=2" },
          { url: "https://i.pravatar.cc/150?img=3" },
        ],
        socialProofParentsLabel: "parents joined",
        initialParentsCount: 1247,
        ratingStars: "⭐⭐⭐⭐⭐",
        ratingText: "4.8/5 Average Rating",
        resultsPercentage: "✓ 89% See Results in 90 Days",
        reviews: [
          {
            text: '"Have been using for 2 weeks Now with my 3 year old son, we have notice changes in his appetite, has been More engage and open to try new things and eats more in general, bowl Movement are frequent. Notice also less dark circles under his eyes!!! Overall very happy and will be buying again for another detox in a few months!"',
            author: "Sarah M.",
            subtitle: "Verified Amazon Customer",
            avatarUrl: "https://i.pravatar.cc/150?img=1",
          },
          {
            text: '"My little one has become calmer, more focused, sleeps better, and is talking so much more. Every small progress means the world to me, and I truly believe these drops have been a big part of it. What I love most is that they\'re natural, gentle, and safe."',
            author: "Jennifer K.",
            subtitle: "Mom of Neurodiverse Child",
            avatarUrl: "https://i.pravatar.cc/150?img=2",
          },
          {
            text: '"This has been a game changer. The supplement is high-quality with unique ingredients. He loves the taste, and the benefits are enormous. With the detox Zee He is able to poop every day and eats well. I recommend this to every parent for their children with constipation issues."',
            author: "Michael T.",
            subtitle: "Frustrated Dad Turned Believer",
            avatarUrl: "https://i.pravatar.cc/150?img=3",
          },
        ],
        verifiedBadge: "✓ Verified Purchase",
        reviewDisclaimer: "*Individual results may vary. This is an actual customer review.",
        resultsHeading: "Honest Results Distribution",
        resultsDescription: "Based on 1,247 parents who completed full 90 days:",
        resultTiers: [
          {
            percentage: "62%",
            label: "Most",
            description: "Noticed significant improvements - Regular bathroom habits, expanded food variety, reduced bloating, better energy",
            bgColor: "bg-surface-green-light",
            borderColor: "border-secondary/15",
          },
          {
            percentage: "28%",
            label: "Some",
            description: "Noticed moderate improvements - Some appetite changes, somewhat better elimination, gradual progress",
            bgColor: "bg-surface-blue-light",
            borderColor: "border-primary/15",
          },
          {
            percentage: "10%",
            label: "Few",
            description: "Minimal changes or discontinued - Child refused consistently, needed specialized medical intervention, didn't complete sequence",
            bgColor: "bg-brand-pink-100",
            borderColor: "border-accent/15",
          },
        ],
        commitmentText: "Our Commitment: We stand behind the 62% majority with our 30-day guarantee.",
        transformationsHeading: "Real Transformations From Real Parents",
        transformationsDescription: "These aren't stock photos. These are actual before/after stories from parents who followed the 90-day protocol.",
        transformations: [
          {
            title: '"From 4 Days Between BMs to Daily Regularity"',
            text: '"My 6-year-old went from crying on the toilet 4 days apart to comfortable daily bathroom trips. The dark circles under her eyes faded, and she started asking for foods she\'d refused for years."',
            author: "Sarah M.",
            day: "Day 67 of protocol",
            avatarUrl: "https://i.pravatar.cc/150?img=4",
            colorIndex: 0,
          },
          {
            title: '"From 6 Foods to Actually Excited for Dinner"',
            text: '"I cried when my son asked to try broccoli. For 3 years he\'d only eat chicken nuggets, fries, crackers, applesauce, bananas, and yogurt. Now he eats 20+ foods and actually looks forward to meals."',
            author: "Jennifer L.",
            day: "Day 82 of protocol",
            avatarUrl: "https://i.pravatar.cc/150?img=5",
            colorIndex: 1,
          },
          {
            title: '"From Exhausted to Full of Energy"',
            text: '"The dark circles under my daughter\'s eyes were so bad, strangers would ask if she was sick. Two months into the protocol, they\'re completely gone. She has energy to play after school now."',
            author: "Marcus T.",
            day: "Day 90 of protocol",
            avatarUrl: "https://i.pravatar.cc/150?img=6",
            colorIndex: 2,
          },
        ],
        closingEmoji: "💚",
        closingTitle: "Your Child's Story Could Be Next",
        closingDescription: "Join 1,247 parents who took the leap and discovered what proper digestive sequencing can do. The 30-day guarantee means you risk nothing.",
        closingAvatarsLabel: "and 1,244 more parents...",
      },
      render: ProofSection as any,
    },
    OfferSection: {
      fields: {
        heading: { type: "text" },
        protocolHeading: { type: "text" },
        protocolValueTotal: { type: "text" },
        bonusesHeading: { type: "text" },
        bonusBadge: { type: "text" },
        bonusSubheading: { type: "textarea" },
        bonusValueTotal: { type: "text" },
        bonusValueFree: { type: "text" },
        bonusExpiry: { type: "text" },
        totalValueHeading: { type: "text" },
        totalValue: { type: "text" },
        subscribePrice: { type: "text" },
        subscribePricePerDay: { type: "text" },
        savingsAmount: { type: "text" },
        savingsPercent: { type: "text" },
        compareHeading: { type: "text" },
        compareSubheading: { type: "text" },
        chooseHeading: { type: "text" },
        subscribeHeading: { type: "text" },
        subscribeBadge: { type: "text" },
        subscribeNoCommitment: { type: "textarea" },
        subscribeCheckoutUrl: { type: "text" },
        subscribeCtaText: { type: "text" },
        oneTimeHeading: { type: "text" },
        oneTimeCheckoutUrl: { type: "text" },
        oneTimeCtaText: { type: "text" },
        bumpHeading: { type: "text" },
        bumpSubheading: { type: "text" },
        bumpDescription: { type: "textarea" },
        bumpImageUrl: imagePickerField,
        bumpUnitPrice: { type: "number" },
        bumpOriginalPrice: { type: "number" },
        bumpCheckoutUrl: { type: "text" },
        countdownWarning: { type: "text" },
      },
      defaultProps: {
        heading: "Choose Your 90-Day Gut Reset Protocol",
        protocolHeading: "What's Included in The Complete Protocol",
        protocolValueTotal: "$110.97",
        bonusesHeading: "3 FREE Bonuses When You Order Today",
        bonusBadge: "🎁 LIMITED TIME ONLY",
        bonusSubheading: "These bonuses help you <strong>maximize results</strong> and <strong>stay on track</strong>",
        bonusValueTotal: "$163.00",
        bonusValueFree: "FREE TODAY",
        bonusExpiry: "Only available with today's order · expires at midnight",
        totalValueHeading: "⭐ COMPLETE VALUE BREAKDOWN",
        totalValue: "$273.97",
        subscribePrice: "$83.23",
        subscribePricePerDay: "That's just $0.92/day",
        savingsAmount: "$190.74",
        savingsPercent: "70% OFF",
        compareHeading: "Compare: One-Time vs Subscribe & Save",
        compareSubheading: "Both include the full 90-day protocol + all bonuses",
        chooseHeading: "Choose Your Option",
        subscribeHeading: "Subscribe & Save",
        subscribeBadge: "⭐ RECOMMENDED — SAVE 30-40%",
        subscribeNoCommitment: '<strong class="text-secondary">Cancel or pause anytime</strong> · No commitment · No hassle',
        subscribeCheckoutUrl: "https://checkout.joyspringvitamins.com/subscribe",
        subscribeCtaText: "START SUBSCRIPTION (SAVE 30%)",
        oneTimeHeading: "One-Time Purchase",
        oneTimeCheckoutUrl: "https://checkout.joyspringvitamins.com/one-time",
        oneTimeCtaText: "BUY ONE-TIME",
        bumpHeading: "🔥 YES! Add D3+K2 Drops (Immune & Bone Support)",
        bumpSubheading: "Perfect complement to Phase 3 · One-time offer",
        bumpDescription: 'The missing piece for <strong>immune function</strong> and <strong>healthy growth</strong>. D3+K2 work synergistically — D3 supports immunity*, K2 directs calcium to bones* (not soft tissues).',
        bumpImageUrl: "https://placehold.co/300x400/png?text=D3+K2+Product",
        bumpUnitPrice: 22.99,
        bumpOriginalPrice: 34.99,
        bumpCheckoutUrl: "https://checkout.joyspringvitamins.com/bump",
        countdownWarning: "⚠️ Bonus bundle expires at midnight",
      },
      render: OfferSection as any,
    },
    GuaranteeSection: {
      fields: {
        headerBadge: { type: "text" },
        mainIcon: { type: "text" },
        mainHeading: { type: "text" },
        mainDescription: { type: "textarea" },
        earlySignalsText: { type: "text" },
        signalsLabel: { type: "text" },
        signals: {
          type: "array",
          arrayFields: {
            emoji: { type: "text" },
            text: { type: "text" },
          },
        },
        refundPromise: { type: "textarea" },
        confidenceStatement: { type: "textarea" },
        confidencePercentage: { type: "text" },
        ctaText: { type: "text" },
        ctaUrl: { type: "text" },
        ctaSubtext: { type: "text" },
        trustBadges: {
          type: "array",
          arrayFields: {
            emoji: { type: "text" },
            title: { type: "text" },
            sub: { type: "text" },
            bgColor: { type: "text" },
          },
        },
      },
      defaultProps: {
        headerBadge: "🔒 Iron-Clad 30-Day Money-Back Guarantee",
        mainIcon: "🛡️",
        mainHeading: 'The "Better Than It Works" Guarantee',
        mainDescription: 'We don\'t just guarantee the Gut Reset For Kids works — we guarantee you\'ll see <strong class="text-secondary">EARLY SIGNALS within 30 days</strong> or we refund 100%.',
        earlySignalsText: "EARLY SIGNALS within 30 days",
        signalsLabel: "Here's what to watch for:",
        signals: [
          { emoji: "😊", text: "Child seems more comfortable after meals" },
          { emoji: "🧩", text: "Slightly more engaged during play" },
          { emoji: "🚽", text: "Any bathroom pattern shifts (even small)" },
          { emoji: "😴", text: "Better sleep quality" },
          { emoji: "✨", text: "ANY positive signal at all" },
        ],
        refundPromise: 'If you complete 30 days and see <span class="text-accent font-bold">ZERO</span> positive changes — <strong>full refund. No questions. No hassle.</strong>',
        confidenceStatement: "Why can we offer this? Because {percentage} of parents notice something within the first month.",
        confidencePercentage: "89%",
        ctaText: "TRY IT RISK-FREE TODAY →",
        ctaUrl: "#choose-option",
        ctaSubtext: "You're protected by our 30-day guarantee",
        trustBadges: [
          { emoji: "🛡️", title: "Made in USA", sub: "cGMP Certified", bgColor: "bg-primary" },
          { emoji: "🔬", title: "Third-Party Tested", sub: "Verified Purity", bgColor: "bg-secondary" },
          { emoji: "🌿", title: "100% Natural", sub: "Vegan Friendly", bgColor: "bg-secondary" },
          { emoji: "❤️", title: "Family-Owned", sub: "Since 2015", bgColor: "bg-accent" },
          { emoji: "🏆", title: "30-Day Guarantee", sub: "Full Refund", bgColor: "bg-primary" },
          { emoji: "🚚", title: "Free Shipping", sub: "US Orders", bgColor: "bg-secondary" },
          { emoji: "👨‍👩‍👧‍👦", title: "1,247+ Families", sub: "Trust Us", bgColor: "bg-accent" },
        ],
      },
      render: GuaranteeSection as any,
    },
    FAQSection: {
      fields: {
        heading: { type: "text" },
        faqs: {
          type: "array",
          arrayFields: {
            q: { type: "text" },
            a: { type: "textarea" },
          },
        },
      },
      defaultProps: {
        heading: "Your Questions Answered",
        faqs: [
          {
            q: "Is this safe for my 3-year-old?",
            a: "Yes. This program is designed for children ages 2-12 with age-appropriate dosing. All products are made in cGMP-certified facilities and third-party tested. However, we recommend consulting your healthcare provider before starting any new supplement, especially if your child has existing health conditions.",
          },
          {
            q: "What if my child won't take it?",
            a: 'From parent reviews: "The taste must not be that bad because my picky eater takes it every evening without complaint." The liquid dropper format makes it easy to mix into juice, smoothies, or water. Our products are unflavored or lightly flavored (elderberry in Phase 2). Parent tips: Mix in morning juice, try evening dosing if preferred, start with smallest amount in favorite drink. Plus, 30-day satisfaction guarantee - if your child genuinely won\'t take it after trying all tips, we\'ll refund.',
          },
          {
            q: "How long until I see results?",
            a: 'Every child is different. Many parents report noticing changes within 2-4 weeks: "Notice changes in his appetite, more engaged after 2 weeks." Full benefits typically emerge over the complete 90-day program as each phase builds on the previous. Timeline: Week 1-2: Early signals (comfort, engagement). Week 3-4: Physical changes (dark circles fading). Week 5-8: Bathroom rhythm establishing. Week 9-12: Appetite improvements visible. Individual results vary.',
          },
          {
            q: "Can I give all 3 products at once?",
            a: "We designed this as a sequential program for a reason. Each phase builds on the previous: Phase 1 establishes digestive comfort (foundation), Phase 2 supports regular elimination (builds on comfort), Phase 3 provides nutritional support (works best when comfort + elimination are established). For best results, follow the 30-day sequence for each phase.",
          },
          {
            q: "Will my child become dependent on these supplements?",
            a: "No. These are food supplements with traditional herbs and essential minerals, not pharmaceutical laxatives. Phase 2 (regularity support) is designed for 30 days to help establish a healthy rhythm, not create dependency. Many parents use this as a seasonal reset (every 90 days) for ongoing support.",
          },
          {
            q: "What happens after 90 days?",
            a: "You have options: Continue with the maintenance program for ongoing support, or take a break and repeat the 90-day cycle seasonally. Many parents find that the initial 90-day protocol establishes a strong foundation, and periodic resets help maintain the benefits.",
          },
        ],
      },
      render: FAQSection as any,
    },
    FinalCTASection: {
      fields: {
        mainHeading: { type: "text" },
        choice1Badge: { type: "text" },
        choice1Heading: { type: "text" },
        choice1Items: {
          type: "array",
          arrayFields: {
            item: { type: "text" },
          },
        },
        choice1Closing: { type: "text" },
        choice2Badge: { type: "text" },
        choice2Heading: { type: "text" },
        choice2Items: {
          type: "array",
          arrayFields: {
            text: { type: "text" },
            bold: {
              type: "radio",
              options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
              ],
            },
          },
        },
        choice2Closing: { type: "text" },
        ctaQuestion: { type: "text" },
        primaryCtaText: { type: "text" },
        primaryCtaUrl: { type: "text" },
        primaryCtaSubtext: { type: "text" },
        secondaryCtaText: { type: "text" },
        secondaryCtaUrl: { type: "text" },
        trustBadges: {
          type: "array",
          arrayFields: {
            text: { type: "text" },
          },
        },
        securityBadges: {
          type: "array",
          arrayFields: {
            text: { type: "text" },
          },
        },
        psMessages: {
          type: "array",
          arrayFields: {
            text: { type: "textarea" },
          },
        },
        finalCtaText: { type: "text" },
        finalCtaUrl: { type: "text" },
        footerLogoUrl: imagePickerField,
        footerCopyright: { type: "text" },
      },
      defaultProps: {
        mainHeading: "Let's Be Honest: You Have Two Choices Right Now",
        choice1Badge: "❌ Choice 1",
        choice1Heading: "Do Nothing",
        choice1Items: [
          { item: "Tomorrow looks the same as today" },
          { item: "Chicken nuggets. Again." },
          { item: "Bathroom struggles. Again." },
          { item: "Googling at 2 AM. Again." },
          { item: "$400+ on random supplements. Again." },
        ],
        choice1Closing: "Same frustration, different day",
        choice2Badge: "✅ Choice 2",
        choice2Heading: "Start the 90-Day Sequence",
        choice2Items: [
          { text: "Follow the Clear-Regulate-Restore method", bold: false },
          { text: "Watch for early signals in 2-4 weeks", bold: false },
          { text: "See transformation over 90 days", bold: false },
          { text: "Join 1,247 parents who chose differently", bold: false },
          { text: "Risk nothing with 30-day guarantee", bold: true },
        ],
        choice2Closing: "Systematic, lasting transformation",
        ctaQuestion: "Which path makes sense?",
        primaryCtaText: "START MY CHILD'S 90-DAY TRANSFORMATION",
        primaryCtaUrl: "#choose-option",
        primaryCtaSubtext: "Subscribe & Save — $83.23/quarter (25% off)",
        secondaryCtaText: "I PREFER ONE-TIME PURCHASE — $99.87",
        secondaryCtaUrl: "#choose-option",
        trustBadges: [
          { text: "✓ 30-Day Guarantee" },
          { text: "✓ SSL Encrypted" },
          { text: "✓ Ships in 24hrs" },
          { text: "✓ Free Shipping" },
        ],
        securityBadges: [
          { text: "🔒 Norton Secured" },
          { text: "🇺🇸 Made in USA" },
          { text: "✅ cGMP Certified" },
        ],
        psMessages: [
          { text: "<strong>P.S.</strong> Remember: This isn't about finding a magic ingredient. It's about SEQUENCE. Cleanse → Regulate → Restore. In that order. That's what 1,247 parents discovered." },
          { text: "<strong>P.P.S.</strong> You risk nothing. 30-day guarantee means if you don't see ANY positive signals in the first month - full refund. We're betting you'll see something (89% do). But if not? We refund. Simple." },
          { text: '<strong>P.P.P.S.</strong> Current batch: <span class="text-accent font-bold">153</span> units remaining. Bonuses expire at midnight. Next batch (if we sell out): 14-21 days with reduced bonuses.' },
          { text: "<strong>P.P.P.P.S.</strong> Your child doesn't have the words to ask for help. But their body is giving you signals: dark circles, bloating, food refusal, irregular bathroom trips. They need you to take action. Today is the day you look back on as when things changed." },
        ],
        finalCtaText: "YES, START MY CHILD'S TRANSFORMATION NOW →",
        finalCtaUrl: "#choose-option",
        footerLogoUrl: "https://joyspringvitamins.com/_next/static/media/logo.ee08c9ef.svg",
        footerCopyright: "© 2026 JoySpring®. All Rights Reserved.",
      },
      render: FinalCTASection as any,
    },
    StickyCTA: {
      fields: {
        promoText: { type: "text" },
        ctaText: { type: "text" },
        ctaUrl: { type: "text" },
      },
      defaultProps: {
        promoText: "🎯 90-Day Gut Reset For Kids™ • Subscribe from $83.23",
        ctaText: "GET STARTED NOW",
        ctaUrl: "#choose-option",
      },
      render: StickyCTA as any,
    },
    Hero: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        ctaText: { type: "text" },
        ctaUrl: { type: "text" },
        backgroundImage: imagePickerField,
        align: {
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        title: "Your Amazing Product",
        subtitle: "The solution you have been looking for",
        ctaText: "Buy Now",
        ctaUrl: "#checkout",
        align: "center",
      },
      render: Hero as any,
    },
    Features: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        features: {
          type: "array",
          arrayFields: {
            icon: { type: "text" },
            title: { type: "text" },
            description: { type: "textarea" },
          },
        },
        columns: {
          type: "radio",
          options: [
            { label: "2 columns", value: 2 },
            { label: "3 columns", value: 3 },
            { label: "4 columns", value: 4 },
          ],
        },
      },
      defaultProps: {
        title: "Features",
        subtitle: "Everything you need in one place",
        features: [
          {
            icon: "⚡",
            title: "Fast",
            description: "Exceptional performance",
          },
          {
            icon: "🔒",
            title: "Secure",
            description: "Your data protected",
          },
          {
            icon: "💎",
            title: "Premium",
            description: "Superior quality",
          },
        ],
        columns: 3,
      },
      render: Features as any,
    },
    Pricing: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        tiers: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            period: { type: "text" },
            features: {
              type: "array",
              arrayFields: {
                feature: { type: "text" },
              },
            },
            ctaText: { type: "text" },
            ctaUrl: { type: "text" },
            highlighted: { type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
          },
        },
      },
      defaultProps: {
        title: "Plans and Pricing",
        subtitle: "Choose the best plan for you",
        tiers: [
          {
            name: "Basic",
            price: "R$ 29",
            period: "month",
            features: ["Feature 1", "Feature 2"],
            ctaText: "Get Started",
            ctaUrl: "#checkout",
            highlighted: false,
          },
          {
            name: "Pro",
            price: "R$ 99",
            period: "month",
            features: ["Everything in Basic", "Feature 3", "Priority support"],
            ctaText: "Get Started",
            ctaUrl: "#checkout",
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "R$ 299",
            period: "month",
            features: ["Everything in Pro", "Unlimited API", "24/7 support"],
            ctaText: "Contact",
            ctaUrl: "#checkout",
            highlighted: false,
          },
        ],
      },
      render: Pricing as any,
    },
    CTA: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
        buttonUrl: { type: "text" },
        variant: {
          type: "radio",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Gradient", value: "gradient" },
          ],
        },
        size: {
          type: "radio",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        title: "Ready to get started?",
        description: "Join thousands of satisfied customers",
        buttonText: "Get Started Now",
        buttonUrl: "#checkout",
        variant: "primary",
        size: "normal",
      },
      render: CTA as any,
    },
    Testimonials: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        testimonials: {
          type: "array",
          arrayFields: {
            quote: { type: "textarea" },
            author: { type: "text" },
            role: { type: "text" },
            avatar: imagePickerField,
          },
        },
      },
      defaultProps: {
        title: "What our customers say",
        subtitle: "See why thousands trust us",
        testimonials: [
          {
            quote: "Excellent product! It completely changed my business.",
            author: "John Smith",
            role: "CEO, Company XYZ",
          },
          {
            quote: "Exceptional support and amazing features.",
            author: "Mary Santos",
            role: "Marketing Manager",
          },
          {
            quote: "Best investment I have made for my company.",
            author: "Peter Oliveira",
            role: "Entrepreneur",
          },
        ],
      },
      render: Testimonials as any,
    },
    Footer: {
      fields: {
        companyName: { type: "text" },
        description: { type: "textarea" },
        columns: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            links: {
              type: "array",
              arrayFields: {
                label: { type: "text" },
                url: { type: "text" },
              },
            },
          },
        },
        socialLinks: {
          type: "object",
          objectFields: {
            facebook: { type: "text" },
            twitter: { type: "text" },
            instagram: { type: "text" },
            linkedin: { type: "text" },
          },
        },
        copyright: { type: "text" },
      },
      defaultProps: {
        companyName: "My Company",
        description: "Turning ideas into reality",
        columns: [
          {
            title: "Product",
            links: [
              { label: "Features", url: "#features" },
              { label: "Pricing", url: "#pricing" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", url: "#about" },
              { label: "Contact", url: "#contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy", url: "#privacy" },
              { label: "Terms", url: "#terms" },
            ],
          },
        ],
        socialLinks: {},
      },
      render: Footer as any,
    },
  },
};

// ── Inject shared fields into every component ────────────────────────────────
// Adds backgroundColor and containerMaxWidth to every component in the Puck
// editor sidebar without touching individual component files.
for (const key of Object.keys(puckConfig.components) as Array<keyof typeof puckConfig.components>) {
  const comp = puckConfig.components[key] as any;
  comp.fields = {
    backgroundColor: backgroundColorField,
    containerMaxWidth: containerMaxWidthField,
    ...comp.fields,
  };
  comp.defaultProps = {
    backgroundColor: "",
    containerMaxWidth: "",
    ...comp.defaultProps,
  };
  // Wrap order: backgroundColor (outermost) → containerMaxWidth → component
  comp.render = withBackgroundColor(withContainer(comp.render));
}
