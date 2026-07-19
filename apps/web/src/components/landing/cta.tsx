"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-500/10 to-cyan-400/10" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-[100px]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to transform your{" "}
            <span className="gradient-text">professional identity</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of professionals using AI to create portfolios that
            open doors. Start free, no credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-purple-500/20">
                Create Your Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#templates">
              <Button variant="outline" size="lg" className="h-14 px-8 text-base">
                Browse Templates
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
