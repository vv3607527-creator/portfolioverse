import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import {
  getLinkedInProfileByUserId,
  createCoverLetter,
} from "@portfolio/db";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { targetCompany, targetRole, jobDescription } = body;

    const linkedInProfile = await getLinkedInProfileByUserId(user.id);
    if (!linkedInProfile) {
      return NextResponse.json(
        { error: "No LinkedIn profile found. Please import your profile first." },
        { status: 400 }
      );
    }

    const coverLetter = await createCoverLetter({
      userId: user.id,
      title: `Cover Letter - ${targetRole || "General"}`,
      content: JSON.stringify({
        subject: `Application for ${targetRole || "Position"} at ${targetCompany || "Company"}`,
        salutation: `Dear Hiring Manager at ${targetCompany || "Company"},`,
        body: `I am writing to express my interest in the ${targetRole || "position"} role at ${targetCompany || "your company"}. With my background and experience, I believe I would be a strong addition to your team.`,
        closing: "Sincerely,\n" + (user.name || "Applicant"),
      }),
      targetCompany: targetCompany || null,
      targetRole: targetRole || null,
      jobDescription: jobDescription || null,
    });

    return NextResponse.json({
      success: true,
      coverLetter,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
