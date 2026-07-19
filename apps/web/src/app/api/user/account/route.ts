import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getUserByClerkId, deleteUser } from "@portfolio/db";

export async function DELETE() {
  try {
    const { userId: clerkId } = auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserByClerkId(clerkId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete from local database
    await deleteUser(user.id);

    // Delete from Clerk
    try {
      await clerkClient.users.deleteUser(clerkId);
    } catch (e) {
      console.error("Failed to delete Clerk user:", e);
      // Continue - local DB deletion is the critical part
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
