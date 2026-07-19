import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { parseLinkedInPdf } from "@/lib/linkedin";
import { createLinkedInProfile, getLinkedInProfileByUserId } from "@portfolio/db";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const text = await file.text();
    const parsed = parseLinkedInPdf(text);

    const existing = await getLinkedInProfileByUserId(user.id);
    if (existing) {
      return NextResponse.json({ profile: existing });
    }

    const profile = await createLinkedInProfile({
      userId: user.id,
      headline: parsed.headline,
      about: parsed.about,
      experience: JSON.stringify(parsed.experience),
      education: JSON.stringify(parsed.education),
      skills: JSON.stringify(parsed.skills),
      importMethod: "pdf",
      rawData: text,
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("LinkedIn PDF parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse LinkedIn PDF" },
      { status: 500 }
    );
  }
}
