"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

// Content sections are server-rendered so crawlers and AI agents receive
// real HTML. Only the chat widget stays client-only (sessionStorage history).
const Hero = dynamic(() => import("@/components/Hero"));
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Experience = dynamic(() => import("@/components/Experience"));
const Education = dynamic(() => import("@/components/Education"));
const Projects = dynamic(() => import("@/components/Projects"));
const Faq = dynamic(() => import("@/components/Faq"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Faq />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
