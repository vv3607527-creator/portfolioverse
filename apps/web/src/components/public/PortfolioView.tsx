"use client";

import { PortfolioHero } from "./PortfolioHero";
import { PortfolioAbout } from "./PortfolioAbout";
import { PortfolioExperience } from "./PortfolioExperience";
import { PortfolioSkills } from "./PortfolioSkills";
import { PortfolioEducation } from "./PortfolioEducation";
import { PortfolioContact } from "./PortfolioContact";

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Theme {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
}

interface Content {
  theme?: Theme;
  sections?: {
    hero?: {
      name?: string;
      title?: string;
      headline?: string;
      summary?: string;
    };
    about?: {
      summary?: string;
    };
    experience?: Array<{
      title: string;
      company: string;
      dates: string;
      description: string;
      achievements: string[];
    }>;
    skills?: Array<{ category: string; items: string[] }> | string[];
    education?: Array<{
      school: string;
      degree: string;
      field: string;
      dates: string;
    }>;
    contact?: {
      email?: string;
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
}

interface PortfolioViewProps {
  portfolio: Portfolio;
  content: Content;
}

export function PortfolioView({ portfolio, content }: PortfolioViewProps) {
  const theme = content.theme || {};
  const sections = content.sections || {};

  const cssVars = {
    "--color-primary": theme.primary || "#6366f1",
    "--color-secondary": theme.secondary || "#a78bfa",
    "--color-bg": theme.background || "#ffffff",
    "--color-text": theme.text || "#0f172a",
    backgroundColor: theme.background || "#ffffff",
    color: theme.text || "#0f172a",
  } as React.CSSProperties;

  return (
    <div style={cssVars} className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {sections.hero && (
          <PortfolioHero
            name={sections.hero.name || ""}
            title={sections.hero.title || ""}
            headline={sections.hero.headline || ""}
            summary={sections.hero.summary || ""}
          />
        )}

        {sections.about?.summary && (
          <section id="about" className="py-16">
            <PortfolioAbout summary={sections.about.summary} />
          </section>
        )}

        {sections.experience && sections.experience.length > 0 && (
          <section id="experience" className="py-16">
            <h2 className="mb-10 text-3xl font-bold tracking-tight">
              Experience
            </h2>
            <PortfolioExperience experience={sections.experience} />
          </section>
        )}

        {sections.skills && sections.skills.length > 0 && (
          <section id="skills" className="py-16">
            <h2 className="mb-10 text-3xl font-bold tracking-tight">
              Skills
            </h2>
            <PortfolioSkills skills={sections.skills as string[]} />
          </section>
        )}

        {sections.education && sections.education.length > 0 && (
          <section id="education" className="py-16">
            <h2 className="mb-10 text-3xl font-bold tracking-tight">
              Education
            </h2>
            <PortfolioEducation education={sections.education} />
          </section>
        )}

        <section id="contact" className="py-16">
          <PortfolioContact contact={sections.contact} />
        </section>
      </main>
    </div>
  );
}
