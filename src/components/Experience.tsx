"use client";

import { EASE_OUT } from "@/lib/motion";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-14 md:py-28 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-8 md:mb-12"
        >
          <p className="eyebrow">Experience</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Where I&rsquo;ve shipped
          </h2>
        </motion.div>

        <div className="relative pl-6 md:pl-8">
          {/* Timeline spine */}
          <div
            className="absolute left-[3px] md:left-[5px] top-2 bottom-2 w-px"
            style={{ background: "var(--border)" }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.12,
                ease: EASE_OUT,
              }}
              className="relative pb-10 last:pb-0"
            >
              {/* Node */}
              <span
                className={`absolute -left-6 md:-left-8 top-1.5 w-2 h-2 rounded-full ${
                  exp.current ? "" : "border"
                }`}
                style={{
                  background: exp.current ? "var(--success)" : "var(--bg)",
                  borderColor: "var(--border-strong)",
                  boxShadow: exp.current ? "0 0 0 3px var(--success-soft)" : undefined,
                }}
                aria-hidden
              />

              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold tracking-tight">
                  {exp.role}
                </h3>
                {exp.current && (
                  <span className="chip chip-accent">Current</span>
                )}
              </div>

              <p className="mt-1 text-sm text-accent font-medium">
                {exp.company}
                <span className="text-faint font-normal"> · {exp.period}</span>
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted max-w-[65ch]">
                {exp.description}
              </p>

              <ul className="mt-4 space-y-2 max-w-[65ch]">
                {exp.achievements.map((ach, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-faint shrink-0" />
                    {ach}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
