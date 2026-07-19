const { initDatabase, createUser, getUserByClerkId } = require("./src/client");

async function test() {
  await initDatabase();
  console.log("Database initialized successfully");

  const user = await createUser({
    email: "test@example.com",
    name: "Test User",
    clerkId: "clerk_test_123",
  });
  console.log("Created user:", JSON.stringify(user, null, 2));

  const found = await getUserByClerkId("clerk_test_123");
  console.log("Found user:", JSON.stringify(found, null, 2));

  console.log("All tests passed!");
}

test().catch(console.error);
