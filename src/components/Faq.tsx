"use client";

import { EASE_OUT } from "@/lib/motion";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { faqs } from "@/lib/faq";

export default function Faq() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay, ease: EASE_OUT },
  });

  return (
    <section id="faq" className="relative py-14 md:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div {...fade(0)} className="mb-8 md:mb-12">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Answers before you ask
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {faqs.map((f, i) => (
            <motion.div key={f.question} {...fade(0.1 + i * 0.05)} className="card p-6">
              <h3 className="text-base font-semibold tracking-tight">
                {f.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
