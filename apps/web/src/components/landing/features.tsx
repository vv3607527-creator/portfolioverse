"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Brain,
  Palette,
  Globe,
  Zap,
  Shield,
  Sparkles,
  Code2,
  Video,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Our AI analyzes your LinkedIn profile, GitHub, and resume to understand your unique professional story and craft content that resonates.",
  },
  {
    icon: Palette,
    title: "30+ Premium Templates",
    description:
      "From Minimal White to Cyberpunk, each template is carefully designed with unique animations, typography, and interaction patterns.",
  },
  {
    icon: Globe,
    title: "One-Click Deploy",
    description:
      "Deploy to Vercel, Netlify, or Cloudflare Pages with a single click. Connect your custom domain for a professional touch.",
  },
  {
    icon: Code2,
    title: "Interactive 3D Worlds",
    description:
      "Stand out with immersive 3D portfolio experiences — virtual offices, floating islands, or futuristic cities that showcase your work.",
  },
  {
    icon: Shield,
    title: "ATS-Ready Resume",
    description:
      "Automatically generate professional, ATS-optimized resumes in multiple formats alongside your portfolio.",
  },
  {
    icon: Zap,
    title: "Live Editor",
    description:
      "Everything updates in real-time. Edit text, colors, layout, and animations with instant preview of your changes.",
  },
  {
    icon: Sparkles,
    title: "AI Content Enhancement",
    description:
      "Automatically improve grammar, storytelling, and impact metrics. Generate case studies, blog posts, and SEO metadata.",
  },
  {
    icon: Video,
    title: "GitHub Integration",
    description:
      "Connect your GitHub to auto-generate project cards, detect technologies, and showcase your contribution graph.",
  },
];

export function Features() {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to{" "}
            <span className="gradient-text">stand out</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From AI-powered content generation to immersive 3D experiences —
            build a portfolio that recruiters remember.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-500/10 group-hover:from-purple-600/20 group-hover:to-blue-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
