import {
  Code2,
  Server,
  Database,
  Wrench,
  Globe,
  Layers,
  Shield,
  Zap,
  GitBranch,
  Terminal,
  Cloud,
  Cpu,
} from "lucide-react";

export const personalInfo = {
  name: "Muhammad Bilawal",
  title: "Full Stack Developer",
  tagline: "Building the Future, One Commit at a Time",
  email: "its.bilawal33@gmail.com",
  phone: "+92 317 0236726",
  github: "https://github.com/malik-bilawal",
  linkedin: "https://linkedin.com/in/malik-bilawal-/",
  twitter: "https://twitter.com/muhammad-bilawal",
  location: "Karachi, Pakistan",
  summary:
    "Full Stack Developer with hands-on experience building and maintaining robust web applications using modern technologies. Strong backend engineering expertise with PHP, Laravel, and Node.js, along with solid frontend skills using React.js, Next.js, and Tailwind CSS. Proven ability to design scalable APIs, optimize databases, implement secure authentication and authorization systems, and integrate third-party services. Passionate about delivering efficient, maintainable, and user-centric software solutions.",
};

export const stats = [
  { label: "Projects Delivered", value: 15 },
  { label: "Years Experience", value: 3 },
  { label: "Technologies", value: 20 },
  { label: "Cups of Coffee", value: 999 },
];

export type SkillCategory = "backend" | "frontend" | "databases" | "tools";

export interface Skill {
  name: string;
  icon: typeof Code2;
  proficiency: number;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // Backend
  { name: "PHP", icon: Code2, proficiency: 90, category: "backend" },
  { name: "Laravel", icon: Server, proficiency: 92, category: "backend" },
  { name: "Node.js", icon: Zap, proficiency: 85, category: "backend" },
  { name: "Python", icon: Terminal, proficiency: 75, category: "backend" },
  { name: "REST APIs", icon: Globe, proficiency: 90, category: "backend" },
  { name: "Authentication", icon: Shield, proficiency: 88, category: "backend" },
  { name: "Redis", icon: Database, proficiency: 80, category: "backend" },

  // Frontend
  { name: "React.js", icon: Code2, proficiency: 88, category: "frontend" },
  { name: "Next.js", icon: Layers, proficiency: 85, category: "frontend" },
  { name: "Tailwind CSS", icon: Code2, proficiency: 92, category: "frontend" },
  { name: "TypeScript", icon: Code2, proficiency: 82, category: "frontend" },
  { name: "Alpine.js", icon: Zap, proficiency: 78, category: "frontend" },

  // Databases
  { name: "MySQL", icon: Database, proficiency: 88, category: "databases" },
  { name: "PostgreSQL", icon: Database, proficiency: 82, category: "databases" },
  { name: "MongoDB", icon: Database, proficiency: 80, category: "databases" },

  // Tools
  { name: "Git & GitHub", icon: GitBranch, proficiency: 90, category: "tools" },
  { name: "Docker", icon: Cloud, proficiency: 75, category: "tools" },
  { name: "VS Code", icon: Terminal, proficiency: 95, category: "tools" },
  { name: "Postman", icon: Cpu, proficiency: 88, category: "tools" },
  { name: "Linux", icon: Terminal, proficiency: 78, category: "tools" },
];

export const experiences = [
  {
    company: "THE HELPEX",
    role: "Full Stack Developer",
    period: "2023 — Present",
    current: true,
    description:
      "Developed and maintained full-stack web applications with a strong focus on reliable backend systems and user experience.",
    achievements: [
      "Built RESTful APIs using Laravel and integrated them with modern frontend frameworks",
      "Designed and optimized SQL database schemas for performance and scalability",
      "Implemented authentication, authorization, and role-based access control systems",
      "Contributed to application architecture, backend logic, API development, and frontend integration",
    ],
  },
  {
    company: "SYBRID",
    role: "Frontend Developer (Intern)",
    period: "2022 — 2023",
    current: false,
    description:
      "Developed responsive and interactive user interfaces while collaborating within a fast-paced development environment.",
    achievements: [
      "Developed responsive and interactive user interfaces",
      "Integrated frontend applications with backend APIs",
      "Improved application performance and overall user experience",
      "Collaborated within a development environment to implement frontend features",
    ],
  },
];

export const projects = [
  {
    title: "LUMIS",
    subtitle: "Luxorix Commerce Management System",
    description:
      "Enterprise-level commerce management system with 40+ modules including custom ERP, HRMS, SOC, and POS functionality. Built over 1.3 years of continuous development.",
    tech: ["Laravel", "MySQL", "Redis", "Firebase", "PHP", "JavaScript"],
    highlights: [
      "40+ custom modules",
      "SOC/SOAR capabilities",
      "AI integrations",
      "Real-time features",
      "Meta integrations",
    ],
    featured: true,
  },
  {
    title: "Multi-Vendor E-Commerce",
    subtitle: "Marketplace Platform",
    description:
      "Multi-vendor e-commerce solution with custom marketplace functionality, role-based access control, and analytics.",
    tech: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    highlights: [
      "Multi-vendor support",
      "Role-based access",
      "Analytics dashboard",
      "Third-party integrations",
    ],
    featured: false,
  },
  {
    title: "Employee Management",
    subtitle: "MERN Stack Application",
    description:
      "Full-stack employee management system built with the MERN stack, featuring real-time data management and communication.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Full-stack MERN",
      "Real-time updates",
      "REST API",
      "Responsive UI",
    ],
    featured: false,
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
