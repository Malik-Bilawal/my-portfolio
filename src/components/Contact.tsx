"use client";

import { EASE_OUT } from "@/lib/motion";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { personalInfo } from "@/lib/data";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 10) errs.message = "Min 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (hasError?: string) =>
    `w-full px-4 py-3.5 rounded-lg bg-surface border text-sm text-foreground placeholder:text-faint transition-colors ${
      hasError ? "border-danger" : "border-edge focus:border-accent"
    }`;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay, ease: EASE_OUT },
  });

  return (
    <section id="contact" className="relative py-14 md:py-28 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div {...fade(0)} className="mb-8 md:mb-12">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Let&rsquo;s talk about your project
          </h2>
          <p className="mt-3 text-sm text-muted max-w-[60ch]">
            Have a role or project in mind? Send a message — I reply within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div {...fade(0.1)}>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

              <div>
                <label htmlFor="contact-name" className="eyebrow block mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass(errors.name)}
                  placeholder="Your name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-danger text-xs mt-1.5"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="contact-email" className="eyebrow block mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={inputClass(errors.email)}
                  placeholder="you@company.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-danger text-xs mt-1.5"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="contact-message" className="eyebrow block mb-2">Message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className={`${inputClass(errors.message)} resize-none`}
                  placeholder="Tell me about the role or project…"
                />
                <div className="flex justify-between items-center mt-1.5">
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-danger text-xs"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <span className="text-xs text-faint font-mono ml-auto">
                    {form.message.length}/500
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full h-12 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                  status === "loading"
                    ? "bg-surface border border-edge text-faint cursor-not-allowed"
                    : status === "success"
                    ? "bg-success-soft border border-success text-success"
                    : status === "error"
                    ? "bg-danger-soft border border-danger text-danger"
                    : "bg-accent hover:bg-accent-hover text-white"
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <CheckCircle size={16} /> Message sent
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <AlertCircle size={16} /> {errorMsg}
                    </motion.span>
                  )}
                  {status === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Send message <Send size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>

          {/* Direct channels */}
          <motion.div {...fade(0.2)} className="space-y-4">
            <div className="card p-6 space-y-1">
              {[
                { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}` },
                { icon: MapPin, label: "Location", value: personalInfo.location, href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-2.5">
                  <item.icon size={17} className="text-faint shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-faint">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-foreground hover:text-accent transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-6">
              <p className="eyebrow mb-4">Elsewhere</p>
              <div className="flex gap-3">
                {[
                  {
                    href: personalInfo.github,
                    label: "GitHub",
                    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                  },
                  {
                    href: personalInfo.linkedin,
                    label: "LinkedIn",
                    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-lg border border-edge flex items-center justify-center text-muted hover:text-foreground hover:border-edge-strong transition-colors"
                    aria-label={social.label}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" width="18" height="18">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
