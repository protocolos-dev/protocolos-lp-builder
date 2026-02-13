import { Config } from "@measured/puck";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export const puckConfig: Config = {
  components: {
    Hero: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        ctaText: { type: "text" },
        ctaUrl: { type: "text" },
        backgroundImage: { type: "text" },
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
      render: Hero,
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
      render: Features,
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
      render: Pricing,
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
      render: CTA,
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
            avatar: { type: "text" },
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
      render: Testimonials,
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
      render: Footer,
    },
  },
};
