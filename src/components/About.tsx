"use client";

import { EASE_OUT } from "@/lib/motion";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";

const focusChips = [
  "Backend engineering",
  "API design",
  "Full-stack delivery",
  "System design",
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay, ease: EASE_OUT },
  });

  return (
    <section id="about" className="relative py-14 md:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div {...fade(0)} className="mb-8 md:mb-12">
          <p className="eyebrow">About</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Building software that holds up in production
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          {/* Bio — 7 cols */}
          <motion.div {...fade(0.1)} className="md:col-span-7">
            <p className="text-base md:text-[17px] leading-relaxed text-muted max-w-[65ch]">
              {personalInfo.summary}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted max-w-[65ch]">
              Over three years I&rsquo;ve worked across Laravel backends, Node.js
              services, and React and Next.js frontends — designing REST APIs,
              modeling relational data, and building authentication and
              role-based access systems that stay maintainable as products grow.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted max-w-[65ch]">
              I&rsquo;m currently deepening that foundation formally as well — a BS in
              Computer Science at the University of Karachi alongside an Aptech
              software engineering diploma, while working full-time.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Laravel", "Node.js", "React", "Next.js", "TypeScript", "MySQL"].map(
                (tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Facts panel — 5 cols */}
          <motion.div {...fade(0.2)} className="md:col-span-5">
            <div
              className="rounded-xl border border-edge overflow-hidden"
              style={{ background: "var(--surface)" }}
            >
              {/* Real stats */}
              <div className="grid grid-cols-3 divide-x divide-edge">
                {stats
                  .filter((s) => s.label !== "Cups of Coffee")
                  .map((stat) => (
                    <div key={stat.label} className="px-4 py-5 text-center">
                      <div className="text-2xl font-semibold tracking-tight">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-[11px] text-faint leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="h-px" style={{ background: "var(--border)" }} />

              <dl className="p-5 space-y-4 text-sm">
                <div>
                  <dt className="eyebrow">Focus</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {focusChips.map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Currently</dt>
                  <dd className="mt-1.5 text-muted">
                    Full Stack Developer @ THE HELPEX
                    <span className="text-faint"> · 2023 — Present</span>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Location</dt>
                  <dd className="mt-1.5 text-muted">{personalInfo.location}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Status</dt>
                  <dd className="mt-1.5 flex items-center gap-2 text-muted">
                    <span className="status-dot" />
                    Available for work
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
