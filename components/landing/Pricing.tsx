export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
  highlighted?: boolean;
}

export interface PricingProps {
  title: string;
  subtitle?: string;
  tiers: PricingTier[];
}

export function Pricing({ title, subtitle, tiers }: PricingProps) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${
                tier.highlighted
                  ? "bg-purple-600 text-white shadow-2xl scale-105"
                  : "bg-gray-50 text-gray-900"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">{tier.price}</span>
                <span className="text-lg">/{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.ctaUrl}
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-white text-purple-600 hover:bg-gray-100"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {tier.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
