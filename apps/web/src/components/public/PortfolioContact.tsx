"use client";

import { motion } from "framer-motion";

interface PortfolioContactProps {
  contact?: {
    email?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export function PortfolioContact({ contact }: PortfolioContactProps) {
  const year = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-8 text-center shadow-lg"
      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
    >
      <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
      <p className="mt-3 text-sm opacity-70">
        Interested in working together? Let&apos;s connect.
      </p>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <a
          href={contact?.email ? `mailto:${contact.email}` : "mailto:hello@example.com"}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Email
        </a>

        <div className="flex gap-4">
          <a
            href={contact?.linkedin || "#"}
            className="rounded-full p-3 transition-all hover:opacity-80"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            aria-label="LinkedIn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href={contact?.github || "#"}
            className="rounded-full p-3 transition-all hover:opacity-80"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.343.297.648.882.648 1.778 0 1.283-.011 2.319-.011 2.634 0 .316.216.698.824.58C20.565 21.795 24 17.304 24 12 24 5.373 18.627 0 12 0z" />
            </svg>
          </a>

          <a
            href={contact?.twitter || "#"}
            className="rounded-full p-3 transition-all hover:opacity-80"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            aria-label="Twitter"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>

      <p className="mt-8 text-xs opacity-50">
        {'\u00A9'} {year} PortfolioVerse. All rights reserved.
      </p>
    </motion.div>
  );
}
