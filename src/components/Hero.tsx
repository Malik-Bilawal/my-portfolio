"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE_OUT },
  }),
};

const facts = [
  { label: "Status", value: "Available for work", dot: true },
  { label: "Based in", value: "Karachi, Pakistan · UTC+5" },
  { label: "Last role", value: "Full Stack Developer @ THE HELPEX" },
  { label: "Experience", value: "2+ years · 10+ projects shipped" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center px-4">
      <div className="max-w-6xl mx-auto w-full pt-28 pb-16 md:pt-32">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          {/* Left — identity */}
          <div>
            <motion.div custom={0} variants={rise} initial="hidden" animate="show">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-edge bg-surface text-xs text-muted">
                <span className="status-dot" />
                Available for work
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.p
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-4 text-lg md:text-xl text-muted"
            >
              {personalInfo.title}
              <span className="text-muted"> — engineering with precision</span>
            </motion.p>

            <motion.p
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-[58ch] text-sm md:text-base leading-relaxed text-muted"
            >
              I engineer backend systems, APIs, and full-stack products with
              Laravel, Node.js, React, and Next.js — precise at every layer,
              from database schema to production deployment.
            </motion.p>

            <motion.div
              custom={4}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="h-11 px-5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors inline-flex items-center"
              >
                View selected work
              </a>
              <a
                href="#contact"
                className="h-11 px-5 rounded-lg border border-edge hover:border-edge-strong hover:bg-elevated text-sm font-medium transition-colors inline-flex items-center"
              >
                Get in touch
              </a>
              <a
                href="/Muhammad-Bilawal-Resume.pdf"
                download
                className="h-11 px-5 rounded-lg text-sm font-medium text-muted hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                Download CV <Download size={15} />
              </a>
            </motion.div>

            <motion.p
              custom={5}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 text-xs text-faint font-mono"
            >
              Previously THE HELPEX &amp; SYBRID · Open to remote roles
            </motion.p>
          </div>

          {/* Right — quick facts card (desktop) */}
          <motion.aside
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="hidden lg:block rounded-xl border border-edge overflow-hidden"
            style={{ background: "var(--surface)" }}
            aria-label="Quick facts"
          >
            <div className="px-5 py-3 border-b border-edge flex items-center justify-between">
              <span className="eyebrow">Profile</span>
              <span className="text-[11px] font-mono text-faint" suppressHydrationWarning>
                {new Date().getFullYear()} ©
              </span>
            </div>
            <dl className="divide-y divide-edge">
              {facts.map((f) => (
                <div key={f.label} className="px-5 py-4 flex items-start justify-between gap-4">
                  <dt className="eyebrow pt-0.5">{f.label}</dt>
                  <dd className="text-sm text-right text-muted flex items-center gap-2 max-w-[60%]">
                    {f.dot && <span className="status-dot" />}
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={`mailto:${personalInfo.email}`}
              className="block px-5 py-4 border-t border-edge text-sm text-foreground hover:text-accent transition-colors flex items-center gap-2.5"
            >
              <Mail size={15} className="text-faint shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
