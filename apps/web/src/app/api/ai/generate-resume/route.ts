import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getLinkedInProfileByUserId } from "@portfolio/db";
import { createResume, getResumesByUserId } from "@portfolio/db";

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

    const resumeContent = JSON.stringify({
      summary: linkedInProfile.about || "",
      experience,
      education,
      skills,
      certifications: safeParse(linkedInProfile.certifications),
    });

    const resume = await createResume({
      userId: user.id,
      title: `${user.name || "My"}'s Resume`,
      content: resumeContent,
      template: "professional",
    });

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await requireUser();
    const resumes = await getResumesByUserId(user.id);
    return NextResponse.json({ resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}
