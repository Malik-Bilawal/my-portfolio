"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, type SkillCategory } from "@/lib/data";

const categories: { key: SkillCategory; label: string }[] = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "databases", label: "Databases" },
  { key: "tools", label: "Tools" },
];

export default function Skills() {
  const [active, setActive] = useState<SkillCategory>("backend");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan font-mono text-sm mb-3">// The Arsenal</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === cat.key
                  ? "bg-gradient-to-r from-cyan to-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  : "glass-card text-gray-400 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="glass-card rounded-2xl p-5 group hover:border-cyan/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
                style={{
                  perspective: "1000px",
                }}
              >
                <div className="transition-transform duration-300 group-hover:rotate-x-12 group-hover:-rotate-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan group-hover:bg-cyan/20 transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="font-medium text-sm">{skill.name}</span>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan to-purple skill-bar-fill"
                      style={{
                        width: isInView ? `${skill.proficiency}%` : "0%",
                        transitionDelay: `${0.3 + i * 0.1}s`,
                      }}
                    />
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1 font-mono">
                    {skill.proficiency}%
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
