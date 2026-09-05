"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/lib/data";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan font-mono text-sm mb-3">// The Journey</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-cyan to-pink bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-purple to-pink" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              className={`relative mb-12 pl-16 md:pl-0 ${
                i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
              }`}
            >
              {/* Node */}
              <div
                className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${
                  exp.current
                    ? "bg-cyan border-cyan pulse-glow"
                    : "bg-background border-purple"
                }`}
              />

              {/* Card */}
              <div className="glass-card rounded-2xl p-6 hover:border-cyan/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-cyan font-mono text-sm flex items-center gap-2">
                      <Briefcase size={14} />
                      {exp.company}
                    </p>
                  </div>
                  {exp.current && (
                    <span className="px-2 py-1 rounded-full text-[10px] font-mono bg-cyan/10 text-cyan border border-cyan/20">
                      CURRENT
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-mono mb-3">
                  {exp.period}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  {exp.description}
                </p>
                <ul className="space-y-2">
                  {exp.achievements.map((ach, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + j * 0.1 }}
                      className="flex items-start gap-2 text-sm text-gray-400"
                    >
                      <span className="text-cyan mt-1 shrink-0">▸</span>
                      {ach}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
