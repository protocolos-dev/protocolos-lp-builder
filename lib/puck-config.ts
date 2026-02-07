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
            { label: "Esquerda", value: "left" },
            { label: "Centro", value: "center" },
            { label: "Direita", value: "right" },
          ],
        },
      },
      defaultProps: {
        title: "Seu Produto Incrível",
        subtitle: "A solução que você estava procurando",
        ctaText: "Comprar Agora",
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
            { label: "2 colunas", value: 2 },
            { label: "3 colunas", value: 3 },
            { label: "4 colunas", value: 4 },
          ],
        },
      },
      defaultProps: {
        title: "Funcionalidades",
        subtitle: "Tudo o que você precisa em um só lugar",
        features: [
          {
            icon: "⚡",
            title: "Rápido",
            description: "Desempenho excepcional",
          },
          {
            icon: "🔒",
            title: "Seguro",
            description: "Seus dados protegidos",
          },
          {
            icon: "💎",
            title: "Premium",
            description: "Qualidade superior",
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
            highlighted: { type: "radio", options: [{ label: "Sim", value: true }, { label: "Não", value: false }] },
          },
        },
      },
      defaultProps: {
        title: "Planos e Preços",
        subtitle: "Escolha o melhor plano para você",
        tiers: [
          {
            name: "Básico",
            price: "R$ 29",
            period: "mês",
            features: ["Funcionalidade 1", "Funcionalidade 2"],
            ctaText: "Começar",
            ctaUrl: "#checkout",
            highlighted: false,
          },
          {
            name: "Pro",
            price: "R$ 99",
            period: "mês",
            features: ["Tudo do Básico", "Funcionalidade 3", "Suporte prioritário"],
            ctaText: "Começar",
            ctaUrl: "#checkout",
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "R$ 299",
            period: "mês",
            features: ["Tudo do Pro", "API ilimitada", "Suporte 24/7"],
            ctaText: "Contato",
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
            { label: "Primário", value: "primary" },
            { label: "Secundário", value: "secondary" },
            { label: "Gradiente", value: "gradient" },
          ],
        },
        size: {
          type: "radio",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Grande", value: "large" },
          ],
        },
      },
      defaultProps: {
        title: "Pronto para começar?",
        description: "Junte-se a milhares de clientes satisfeitos",
        buttonText: "Começar Agora",
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
        title: "O que nossos clientes dizem",
        subtitle: "Veja por que milhares confiam em nós",
        testimonials: [
          {
            quote: "Produto excelente! Mudou completamente meu negócio.",
            author: "João Silva",
            role: "CEO, Empresa XYZ",
          },
          {
            quote: "Suporte excepcional e funcionalidades incríveis.",
            author: "Maria Santos",
            role: "Gerente de Marketing",
          },
          {
            quote: "Melhor investimento que já fiz para minha empresa.",
            author: "Pedro Oliveira",
            role: "Empreendedor",
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
        companyName: "Minha Empresa",
        description: "Transformando ideias em realidade",
        columns: [
          {
            title: "Produto",
            links: [
              { label: "Funcionalidades", url: "#features" },
              { label: "Preços", url: "#pricing" },
            ],
          },
          {
            title: "Empresa",
            links: [
              { label: "Sobre", url: "#about" },
              { label: "Contato", url: "#contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacidade", url: "#privacy" },
              { label: "Termos", url: "#terms" },
            ],
          },
        ],
        socialLinks: {},
      },
      render: Footer,
    },
  },
};
