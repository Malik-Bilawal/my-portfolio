"use client";

import { EASE_OUT } from "@/lib/motion";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/lib/data";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-14 md:py-28 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-8 md:mb-12"
        >
          <p className="eyebrow">Education</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Academic background
          </h2>
        </motion.div>

        <div className="relative pl-6 md:pl-8">
          {/* Timeline spine */}
          <div
            className="absolute left-[3px] md:left-[5px] top-2 bottom-2 w-px"
            style={{ background: "var(--border)" }}
          />

          {education.map((entry, i) => {
            const inProgress = entry.status === "In Progress";
            return (
              <motion.div
                key={entry.credential}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.1,
                  ease: EASE_OUT,
                }}
                className="relative pb-10 last:pb-0"
              >
                {/* Node */}
                <span
                  className="absolute -left-6 md:-left-8 top-1.5 w-2 h-2 rounded-full border"
                  style={{
                    background: inProgress ? "var(--accent)" : "var(--bg)",
                    borderColor: inProgress ? "var(--accent)" : "var(--border-strong)",
                  }}
                  aria-hidden
                />

                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight">
                    {entry.credential}
                  </h3>
                  <span className={`chip ${inProgress ? "chip-accent" : ""}`}>
                    {entry.status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted">
                  {entry.institution}
                  <span className="text-faint"> · {entry.period}</span>
                </p>

                <p className="mt-2 text-sm leading-relaxed text-muted max-w-[65ch]">
                  {entry.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
