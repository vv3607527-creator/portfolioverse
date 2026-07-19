"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
                  <span className="text-sm font-bold text-white">P</span>
                </div>
                <span className="text-lg font-bold tracking-tight">
                  PortfolioVerse
                </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Transform your professional identity with AI-powered portfolio
                websites that impress recruiters and land interviews.
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="mb-4 text-sm font-semibold">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PortfolioVerse. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
