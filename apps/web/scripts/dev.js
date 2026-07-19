// Patch process.platform to "linux" for Termux (Android) compatibility
// Termux runs on the Linux kernel and the Linux ARM64 SWC binary is compatible
Object.defineProperty(process, "platform", {
  value: "linux",
});

// Load Next.js dev server
require("next/dist/cli/next-dev");
