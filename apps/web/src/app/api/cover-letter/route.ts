import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import {
  getCoverLettersByUserId,
  getCoverLetterById,
  createCoverLetter,
  updateCoverLetter,
} from "@portfolio/db";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const coverLetter = await getCoverLetterById(id);
      if (!coverLetter || coverLetter.userId !== user.id) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, coverLetter });
    }

    const coverLetters = await getCoverLettersByUserId(user.id);
    return NextResponse.json({ success: true, coverLetters });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch cover letters" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();

    const coverLetter = await createCoverLetter({
      userId: user.id,
      title: body.title,
      content: body.content,
      targetCompany: body.targetCompany,
      targetRole: body.targetRole,
      jobDescription: body.jobDescription,
      writingStyle: body.writingStyle || "professional",
    });

    return NextResponse.json({ success: true, coverLetter });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create cover letter" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Cover letter ID is required" },
        { status: 400 }
      );
    }

    const existing = await getCoverLetterById(id);
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const coverLetter = await updateCoverLetter(id, data);
    return NextResponse.json({ success: true, coverLetter });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update cover letter" },
      { status: 500 }
    );
  }
}
