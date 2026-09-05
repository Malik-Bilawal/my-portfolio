"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats } from "@/lib/data";
import CountUp from "./CountUp";
import TechConstellation from "./TechConstellation";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan font-mono text-sm mb-3">// About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              The Story So Far
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="gradient-border p-8"
          >
            <div className="gradient-border-inner p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-pink" />
                <div className="w-3 h-3 rounded-full bg-purple" />
                <div className="w-3 h-3 rounded-full bg-cyan" />
                <span className="text-gray-500 font-mono text-xs ml-2">
                  about.tsx
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                {personalInfo.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Laravel", "React", "Next.js", "Node.js", "TypeScript", "MySQL"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-purple/10 text-purple border border-purple/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats + Tech Constellation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-6 text-center hover:border-cyan/30 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold font-mono text-cyan mb-2">
                    <CountUp
                      target={stat.value}
                      isInView={isInView}
                      delay={i * 0.2}
                    />
                    {stat.label === "Cups of Coffee" ? "+" : "+"}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <TechConstellation isVisible={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
