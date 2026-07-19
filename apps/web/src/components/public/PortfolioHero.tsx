"use client";

interface PortfolioHeroProps {
  name: string;
  title: string;
  headline: string;
  summary: string;
}

export function PortfolioHero({
  name,
  title,
  headline,
  summary,
}: PortfolioHeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-2xl px-6 py-20 sm:px-12 sm:py-28"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
      }}
    >
      <div className="relative z-10">
        {name && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
            {name}
          </p>
        )}

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {headline || title || "Welcome to My Portfolio"}
        </h1>

        {title && !headline && (
          <p className="mt-3 text-xl font-medium text-white/80 sm:text-2xl">
            {title}
          </p>
        )}

        {summary && (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {summary}
          </p>
        )}
      </div>
    </section>
  );
}
