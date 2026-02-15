export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage?: string;
  align: "left" | "center" | "right";
}

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaUrl,
  backgroundImage,
  align = "center",
}: HeroProps) {
  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center px-6 py-20"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`container mx-auto max-w-4xl text-${align}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <a
          href={ctaUrl}
          className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
