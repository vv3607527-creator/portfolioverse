import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { validateLinkedInUrl, extractLinkedInUsername } from "@/lib/linkedin";
import { createLinkedInProfile, getLinkedInProfileByUserId } from "@portfolio/db";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const { url } = await req.json();

    if (!url || !validateLinkedInUrl(url)) {
      return NextResponse.json(
        { error: "Invalid LinkedIn URL" },
        { status: 400 }
      );
    }

    const username = extractLinkedInUsername(url);

    // Check if profile already exists
    const existing = await getLinkedInProfileByUserId(user.id);
    if (existing) {
      return NextResponse.json({ profile: existing });
    }

    // Create a new LinkedIn profile entry with the URL
    const profile = await createLinkedInProfile({
      userId: user.id,
      rawData: url,
      importMethod: "url",
    });

    return NextResponse.json({ profile, username });
  } catch (error) {
    console.error("LinkedIn parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse LinkedIn URL" },
      { status: 500 }
    );
  }
}
