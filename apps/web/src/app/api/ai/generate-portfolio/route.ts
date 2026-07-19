import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getLinkedInProfileByUserId } from "@portfolio/db";
import {
  createPortfolio,
  getPortfoliosByUserId,
} from "@portfolio/db";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const linkedInProfile = await getLinkedInProfileByUserId(user.id);

    if (!linkedInProfile) {
      return NextResponse.json(
        { error: "No LinkedIn profile found" },
        { status: 400 }
      );
    }

    function safeParse(str: string | null | undefined): any {
      if (!str) return [];
      try { return JSON.parse(str); } catch { return []; }
    }

    const experience = safeParse(linkedInProfile.experience);
    const skills = safeParse(linkedInProfile.skills);
    const education = safeParse(linkedInProfile.education);

    const portfolioContent = JSON.stringify({
      sections: {
        hero: {
          headline: linkedInProfile.headline || "Professional Portfolio",
          summary: linkedInProfile.about || "",
        },
        experience,
        education,
        skills,
      },
      theme: {
        primary: "#6366f1",
        secondary: "#ec4899",
        background: "#ffffff",
        text: "#1f2937",
      },
    });

    const name = user.name || "portfolio";
    const slug = slugify(name) + "-" + Date.now().toString(36);

    const portfolio = await createPortfolio({
      userId: user.id,
      title: `${user.name || "My"}'s Portfolio`,
      slug,
      content: portfolioContent,
      template: "minimal-white",
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Portfolio generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate portfolio" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await requireUser();
    const portfolios = await getPortfoliosByUserId(user.id);
    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}
