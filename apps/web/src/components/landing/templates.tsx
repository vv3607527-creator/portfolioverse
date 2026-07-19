"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    name: "Minimal White",
    category: "Clean",
    gradient: "from-white to-gray-100",
    border: true,
  },
  {
    name: "Developer Terminal",
    category: "Tech",
    gradient: "from-gray-900 via-slate-800 to-gray-900",
    border: false,
  },
  {
    name: "Cyberpunk",
    category: "Bold",
    gradient: "from-fuchsia-600 via-purple-600 to-cyan-500",
    border: false,
  },
  {
    name: "Glassmorphism",
    category: "Modern",
    gradient: "from-white/10 to-white/5",
    border: true,
  },
  {
    name: "Luxury Black",
    category: "Premium",
    gradient: "from-zinc-900 to-neutral-800",
    border: false,
  },
  {
    name: "Space Explorer",
    category: "3D",
    gradient: "from-indigo-950 via-purple-900 to-slate-900",
    border: false,
  },
];

export function Templates() {
  return (
    <section id="templates" className="section-padding relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            30+ Premium{" "}
            <span className="gradient-text">Templates</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Each template is meticulously designed with its own animation language,
            typography system, and visual identity.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div
                className={`relative mb-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${template.gradient} ${
                  template.border ? "border" : ""
                } transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]`}
              >
                <div className="text-center">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm" />
                  <div className="mx-auto h-2 w-24 rounded-full bg-white/20" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
