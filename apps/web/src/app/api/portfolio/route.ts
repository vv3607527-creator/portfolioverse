import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import {
  getPortfoliosByUserId,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
} from "@portfolio/db";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const portfolio = await getPortfolioById(id);
      if (!portfolio || portfolio.userId !== user.id) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, portfolio });
    }

    const portfolios = await getPortfoliosByUserId(user.id);
    return NextResponse.json({ success: true, portfolios });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch portfolios" },
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

    const portfolio = await createPortfolio({
      userId: user.id,
      title: body.title.trim(),
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      description: body.description,
      template: body.template || "minimal-white",
      content: body.content,
    });

    return NextResponse.json({ success: true, portfolio });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create portfolio" },
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
        { error: "Portfolio ID is required" },
        { status: 400 }
      );
    }

    const existing = await getPortfolioById(id);
    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const portfolio = await updatePortfolio(id, data);
    return NextResponse.json({ success: true, portfolio });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update portfolio" },
      { status: 500 }
    );
  }
}
