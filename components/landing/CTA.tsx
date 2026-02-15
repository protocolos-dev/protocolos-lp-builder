export interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  variant: "primary" | "secondary" | "gradient";
  size: "normal" | "large";
}

export function CTA({
  title,
  description,
  buttonText,
  buttonUrl,
  variant = "primary",
  size = "normal",
}: CTAProps) {
  const variants = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-gray-900 text-white",
    gradient: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
  };

  const sizes = {
    normal: "py-16",
    large: "py-24",
  };

  return (
    <section className={`${sizes[size]} px-6 ${variants[variant]}`}>
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-8 opacity-90">{description}</p>
        <a
          href={buttonUrl}
          className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
