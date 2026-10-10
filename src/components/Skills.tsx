"use client";

import { EASE_OUT } from "@/lib/motion";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, type SkillCategory } from "@/lib/data";
import { brandIcons } from "@/lib/brand-icons";

const categories: { key: SkillCategory; label: string }[] = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "databases", label: "Databases" },
  { key: "tools", label: "Tools" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-14 md:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-8 md:mb-12"
        >
          <p className="eyebrow">Skills</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            The stack I engineer with
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + ci * 0.07,
                ease: EASE_OUT,
              }}
            >
              <h3 className="eyebrow mb-4">{cat.label}</h3>
              <ul className="space-y-2">
                {skills
                  .filter((s) => s.category === cat.key)
                  .map((skill) => {
                    const brand = brandIcons[skill.name];
                    const Icon = skill.icon;
                    return (
                      <li
                        key={skill.name}
                        style={
                          brand
                            ? ({ "--brand": brand.hex } as React.CSSProperties)
                            : undefined
                        }
                        className="group flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-edge bg-surface text-sm text-foreground hover:border-edge-strong transition-colors"
                      >
                        {brand ? (
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="text-faint shrink-0 transition-colors duration-200 group-hover:text-[color:var(--brand)]"
                            aria-hidden
                          >
                            <path d={brand.path} />
                          </svg>
                        ) : (
                          <Icon
                            size={16}
                            className="text-faint shrink-0"
                            aria-hidden
                          />
                        )}
                        <span>{skill.name}</span>
                      </li>
                    );
                  })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
