import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortfolioView } from "@/components/public/PortfolioView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { getPortfolioBySlug } = await import("@portfolio/db");
  const portfolio = await getPortfolioBySlug(params.slug);
  if (!portfolio) {
    return { title: "Portfolio Not Found" };
  }

  const content = portfolio.content ? JSON.parse(portfolio.content) : {};
  const hero = content.sections?.hero || {};
  const name = hero.name || portfolio.title?.replace("'s Portfolio", "") || portfolio.title;

  return {
    title: `${name} | PortfolioVerse`,
    description: hero.summary || "Professional portfolio powered by PortfolioVerse",
    openGraph: {
      title: `${name} | PortfolioVerse`,
      description: hero.summary || "Professional portfolio powered by PortfolioVerse",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | PortfolioVerse`,
      description: hero.summary || "Professional portfolio powered by PortfolioVerse",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { getPortfolioBySlug } = await import("@portfolio/db");
  const portfolio = await getPortfolioBySlug(params.slug);
  if (!portfolio || !portfolio.published) {
    notFound();
  }

  const content = portfolio.content ? JSON.parse(portfolio.content) : {};
  const hero = content.sections?.hero || {};
  const name = hero.name || portfolio.title?.replace("'s Portfolio", "") || portfolio.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description: hero.summary || "",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/portfolio/${portfolio.slug}`,
    ...(hero.title && { jobTitle: hero.title }),
    ...(content.sections?.skills && {
      knowsAbout: Array.isArray(content.sections.skills)
        ? content.sections.skills.map((s: any) =>
            typeof s === "string" ? s : s.name || s.category || ""
          ).filter(Boolean)
        : [],
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioView portfolio={portfolio as any} content={content} />
    </>
  );
}
