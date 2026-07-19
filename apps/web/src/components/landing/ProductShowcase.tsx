"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const tabs = [
  {
    id: "portfolio",
    label: "Portfolio",
    icon: Briefcase,
    title: "AI-Generated Portfolio",
    description:
      "Transform your LinkedIn experience into a stunning, interactive portfolio website that captivates employers and clients.",
    features: [
      "Auto-generated from your LinkedIn profile",
      "Beautiful 3D templates",
      "Custom domain support",
      "Real-time preview editor",
      "One-click publish",
    ],
  },
  {
    id: "resume",
    label: "Resume",
    icon: FileText,
    title: "Smart Resume Builder",
    description:
      "Create ATS-optimized resumes that highlight your achievements and pass automated screening systems.",
    features: [
      "AI-powered content optimization",
      "Multiple professional templates",
      "ATS-friendly formatting",
      "PDF export with one click",
      "Tailored for each application",
    ],
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    icon: Mail,
    title: "Cover Letter Generator",
    description:
      "Craft compelling cover letters tailored to each job application, powered by your professional experience.",
    features: [
      "Personalized for each role",
      "Multiple writing styles",
      "Company-specific content",
      "Professional tone suggestions",
      "Download as PDF",
    ],
  },
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("portfolio");

  const activeData = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="showcase"
      className="relative py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background" />

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              stand out
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From portfolio to resume to cover letter — generate everything you
            need for your next career move from a single Linkedin import.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-1 rounded-full border bg-background/50 p-1.5 backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-4xl"
          >
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <activeData.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{activeData.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {activeData.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {activeData.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link href="/sign-up">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl border bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 flex items-center justify-center">
                  <activeData.icon className="h-24 w-24 text-primary/20" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
