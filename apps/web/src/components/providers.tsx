import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#09090b",
          colorBackground: "#ffffff",
          colorText: "#09090b",
          colorTextSecondary: "#71717a",
          colorInputBackground: "#ffffff",
          colorInputText: "#09090b",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "shadow-none border",
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
