import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, updateUser } from "@portfolio/db";

export async function PATCH(request: Request) {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByClerkId(clerkId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name } = body;

    if (typeof name !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const trimmed = name.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      return NextResponse.json({ error: "Name must be between 1 and 100 characters" }, { status: 400 });
    }

    const updated = await updateUser(user.id, { name: trimmed });
    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
