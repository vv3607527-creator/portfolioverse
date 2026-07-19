"use client";

import { motion } from "framer-motion";

interface EducationItem {
  school: string;
  degree: string;
  field: string;
  dates: string;
}

interface PortfolioEducationProps {
  education: EducationItem[];
}

export function PortfolioEducation({ education }: PortfolioEducationProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {education.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="rounded-xl p-6 shadow-lg"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
            >
              {item.dates}
            </span>
          </div>
          <h3 className="text-lg font-bold">{item.degree}</h3>
          <p className="mt-1 text-sm opacity-70">{item.field}</p>
          <p className="mt-2 text-sm opacity-60">{item.school}</p>
        </motion.div>
      ))}
    </div>
  );
}