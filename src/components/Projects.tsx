"use client";

import { EASE_OUT } from "@/lib/motion";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";

const filters = ["All", "Featured", "Laravel", "React"];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Featured") return p.featured;
    return p.tech.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <section id="projects" className="relative py-14 md:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-10"
        >
          <p className="eyebrow">Selected Work</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Systems that ship and scale
          </h2>
        </motion.div>

        {/* Segmented filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="inline-flex items-center gap-1 p-1 rounded-lg border border-edge bg-surface mb-10"
          role="tablist"
          aria-label="Filter projects"
        >
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                filter === f
                  ? "bg-elevated text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.06,
                  ease: EASE_OUT,
                }}
                className={`card p-6 flex flex-col ${
                  project.featured ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {project.title === "LUMS"
                          ? "Luxorix Commerce Management System"
                          : project.title}
                      </h3>
                      {project.featured && (
                        <span className="chip chip-accent">Flagship</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-faint">
                      {project.title === "LUMS" ? "LUMS · Internal codename" : project.subtitle}
                    </p>
                  </div>
                  <a
                    href="https://github.com/Malik-Bilawal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-edge flex items-center justify-center text-muted hover:text-foreground hover:border-edge-strong transition-colors shrink-0"
                    aria-label="View GitHub profile"
                  >
                    <GitHubIcon className="w-4 h-4" />
                  </a>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted max-w-[70ch]">
                  {project.description}
                </p>

                {/* Metrics for flagship */}
                {project.featured && (
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {[
                      { k: "Modules", v: "40+" },
                      { k: "Duration", v: "1.3 years" },
                      { k: "Stack", v: "Laravel · MySQL · Redis" },
                    ].map((m) => (
                      <div key={m.k}>
                        <span className="text-faint text-xs block">{m.k}</span>
                        <span className="font-medium">{m.v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
