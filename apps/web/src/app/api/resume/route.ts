import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import {
  getResumesByUserId,
  getResumeById,
  createResume,
  updateResume,
} from "@portfolio/db";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const resume = await getResumeById(id);
      if (!resume || resume.userId !== user.id) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, resume });
    }

    const resumes = await getResumesByUserId(user.id);
    return NextResponse.json({ success: true, resumes });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();

    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const resume = await createResume({
      userId: user.id,
      title: body.title.trim(),
      content: body.content,
      template: body.template || "professional",
    });

    return NextResponse.json({ success: true, resume });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create resume" },
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
        { error: "Resume ID is required" },
        { status: 400 }
      );
    }

    const existing = await getResumeById(id);
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const resume = await updateResume(id, data);
    return NextResponse.json({ success: true, resume });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update resume" },
      { status: 500 }
    );
  }
}
