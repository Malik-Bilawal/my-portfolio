"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
