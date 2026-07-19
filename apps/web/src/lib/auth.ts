import { auth } from "@clerk/nextjs/server";
import {
  getUserByClerkId,
  createUser,
  initDatabase,
} from "@portfolio/db";

export async function requireAuth() {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    throw new Error("Unauthorized");
  }
  return clerkId;
}

export async function getCurrentUser() {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);
  return user;
}

export async function requireUser() {
  const clerkId = await requireAuth();
  const user = await getUserByClerkId(clerkId);
  if (!user) {
    throw new Error("User not found in database");
  }
  return user;
}
