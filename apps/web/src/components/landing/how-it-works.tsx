"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Linkedin, Github, FileText, Wand2, Eye, Rocket } from "lucide-react";

const steps = [
  {
    icon: Linkedin,
    title: "Connect Your Profile",
    description: "Paste your LinkedIn URL, upload a resume, or connect GitHub. Our AI immediately starts analyzing your professional background.",
    step: "01",
  },
  {
    icon: Wand2,
    title: "AI Enhancement",
    description: "The AI enriches your content — improving storytelling, adding measurable impact, filling gaps, and generating compelling case studies.",
    step: "02",
  },
  {
    icon: Eye,
    title: "Choose & Customize",
    description: "Pick from 30+ premium templates and customize everything with our live editor. Text, colors, animations — all in real-time.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Deploy Instantly",
    description: "One-click deployment to Vercel, Netlify, or your custom domain. Your AI-powered portfolio goes live in minutes.",
    step: "04",
  },
];

export function HowItWorks() {
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
            From LinkedIn to{" "}
            <span className="gradient-text">live in minutes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps to transform your professional profile into an
            immersive portfolio experience.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg shadow-purple-500/20">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <span className="mb-2 block text-sm font-medium text-purple-600">
                Step {step.step}
              </span>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/sign-up">
            <Button size="lg" className="h-14 px-8 text-base">
              Start Your Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
