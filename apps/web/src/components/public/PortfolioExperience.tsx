"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  title: string;
  company: string;
  dates: string;
  description: string;
  achievements: string[];
}

interface PortfolioExperienceProps {
  experience: ExperienceItem[];
}

export function PortfolioExperience({ experience }: PortfolioExperienceProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-white/10 sm:left-1/2 sm:-translate-x-px" />

      <div className="space-y-12">
        {experience.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col sm:flex-row ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 top-1 z-10 hidden h-3 w-3 rounded-full border-2 border-white sm:block sm:left-1/2 sm:-translate-x-1/2" style={{ backgroundColor: "var(--color-primary)" }} />

            {/* Content card */}
            <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
              <div
                className="rounded-xl p-6 shadow-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
                  >
                    {item.dates}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-1 text-sm opacity-70">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{item.description}</p>
                {item.achievements && item.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                        <span className="opacity-80">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}