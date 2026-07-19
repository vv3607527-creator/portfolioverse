import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getLinkedInProfileByUserId, createProfileAnalysis, updateProfileAnalysis } from "@portfolio/db";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const linkedInProfile = await getLinkedInProfileByUserId(user.id);

    if (!linkedInProfile) {
      return NextResponse.json(
        { error: "No LinkedIn profile found. Please import your profile first." },
        { status: 400 }
      );
    }

    const analysis = await createProfileAnalysis({
      userId: user.id,
      rawData: JSON.stringify(linkedInProfile),
      status: "processing",
    });

    // Simulate AI analysis with mock data
    const mockAnalysis = {
      summary: "Experienced professional with strong background in software development and leadership",
      strengths: JSON.stringify([
        "Technical leadership",
        "Full-stack development",
        "Team management",
        "Problem-solving",
      ]),
      improvements: JSON.stringify([
        "Could expand cloud computing expertise",
        "Consider public speaking opportunities",
      ]),
      suggestedRole: "Senior Software Engineer",
      industry: "Technology",
      experienceLevel: "Senior",
      status: "completed",
    };

    const updateAnalysis = await updateProfileAnalysis(analysis.id, mockAnalysis);

    return NextResponse.json({ analysis: updateAnalysis });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze profile" },
      { status: 500 }
    );
  }
}
