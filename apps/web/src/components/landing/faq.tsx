"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI analyze my LinkedIn profile?",
    answer:
      "When you paste your LinkedIn URL, our AI extracts and analyzes your complete profile — experience, education, skills, recommendations, and more. It identifies gaps, improves language, and generates new content that tells a compelling professional story.",
  },
  {
    question: "Can I edit the AI-generated content?",
    answer:
      "Absolutely. You have full control over every piece of content. Our live editor lets you modify text, images, colors, layout, and animations in real-time. The AI provides a powerful starting point, but you can fine-tune everything.",
  },
  {
    question: "What templates are available?",
    answer:
      "We offer 30+ premium templates including Minimal White, Developer Terminal, Cyberpunk, Luxury Black, Glassmorphism, Space Explorer, and many more. Each template has unique animations, typography, and interaction patterns.",
  },
  {
    question: "Do I need coding skills?",
    answer:
      "Not at all. PortfolioVerse is designed for everyone. The AI handles all the complexity — from content generation to deployment. If you want to customize further, you can export the code and modify it.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! Pro and Enterprise plans support custom domains. You can connect any domain you own and we'll handle the SSL certificate and configuration automatically.",
  },
  {
    question: "What happens if I cancel my subscription?",
    answer:
      "Your portfolio stays live indefinitely on the free tier. You only lose access to premium features like advanced AI tools, 3D templates, and custom domains if you downgrade from a paid plan.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-muted/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently asked{" "}
            <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-12 max-w-3xl space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-48" : "max-h-0",
                )}
              >
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
