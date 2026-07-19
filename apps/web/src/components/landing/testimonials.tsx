"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer at Stripe",
    content:
      "I got my current job because the recruiter mentioned my portfolio was the best she'd seen all month. PortfolioVerse made it effortless.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Designer at Figma",
    content:
      "The AI content generator is incredible. It turned my scattered experience into a compelling narrative. The 3D portfolio option sealed the deal.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Founder at DevStudio",
    content:
      "We use PortfolioVerse for our entire team. The GitHub integration and automatic project case studies save us hours each week.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden bg-muted/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loved by{" "}
            <span className="gradient-text">professionals</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of professionals who transformed their careers with
            AI-powered portfolios.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
