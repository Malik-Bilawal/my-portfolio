"use client";

import { EASE_OUT } from "@/lib/motion";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { personalInfo } from "@/lib/data";

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE_OUT },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4"
    >
      <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
        {/* Availability */}
        <motion.div custom={0} variants={rise} initial="hidden" animate="show">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-edge bg-surface text-xs text-muted">
            <span className="status-dot" />
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-4 text-lg md:text-xl text-muted"
        >
          {personalInfo.title}
        </motion.p>

        {/* Summary */}
        <motion.p
          custom={3}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-[62ch] text-sm md:text-base leading-relaxed text-muted"
        >
          I build backend systems, APIs, and full-stack products with Laravel,
          Node.js, React, and Next.js — from database schema to production
          deployment.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-3"
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

        {/* Trust line */}
        <motion.p
          custom={5}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-8 text-xs text-faint font-mono"
        >
          Currently at THE HELPEX · Previously SYBRID · Karachi, Pakistan
        </motion.p>
      </div>
    </section>
  );
}
