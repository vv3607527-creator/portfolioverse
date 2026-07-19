"use client";

import { motion } from "framer-motion";

interface PortfolioAboutProps {
  summary: string;
}

export function PortfolioAbout({ summary }: PortfolioAboutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl text-center"
    >
      <h2 className="mb-6 text-3xl font-bold tracking-tight">About Me</h2>
      <p className="text-lg leading-relaxed opacity-80">{summary}</p>
    </motion.div>
  );
}
