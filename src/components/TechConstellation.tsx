"use client";

import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  name: string;
  color: string;
  radius: number;
  pulsePhase: number;
}

interface Particle {
  fromIdx: number;
  toIdx: number;
  t: number;
  speed: number;
  color: string;
}

interface Props {
  isVisible: boolean;
}

const NODES: Omit<Node, "vx" | "vy" | "radius" | "pulsePhase" | "x" | "y" | "baseX" | "baseY">[] = [
  { name: "Laravel", color: "#f87171" },
  { name: "React", color: "#00f0ff" },
  { name: "Node.js", color: "#4ade80" },
  { name: "MySQL", color: "#60a5fa" },
  { name: "TypeScript", color: "#818cf8" },
  { name: "PHP", color: "#c084fc" },
  { name: "Docker", color: "#38bdf8" },
  { name: "Redis", color: "#fb923c" },
];

const CONNECTIONS: [number, number][] = [
  [0, 6], [0, 3], [1, 2], [1, 4], [1, 6],
  [2, 4], [3, 5], [5, 0], [7, 1], [7, 0],
  [4, 3], [6, 2], [0, 7], [2, 3],
];

const BG_DOT_SPACING = 40;

export default function TechConstellation({ isVisible }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  const initNodes = useCallback((w: number, h: number) => {
    const pad = 0.1;
    const positions = [
      { x: 0.12, y: 0.15 }, { x: 0.78, y: 0.12 }, { x: 0.88, y: 0.52 },
      { x: 0.18, y: 0.72 }, { x: 0.58, y: 0.82 }, { x: 0.08, y: 0.42 },
      { x: 0.72, y: 0.32 }, { x: 0.42, y: 0.08 },
    ];

    nodesRef.current = NODES.map((n, i) => {
      const px = (pad + positions[i].x * (1 - pad * 2)) * w;
      const py = (pad + positions[i].y * (1 - pad * 2)) * h;
      return {
        ...n,
        x: px, y: py, baseX: px, baseY: py,
        vx: 0, vy: 0, radius: 4,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  const initParticles = useCallback(() => {
    particlesRef.current = [];
    for (const [from, to] of CONNECTIONS) {
      for (let k = 0; k < 2; k++) {
        particlesRef.current.push({
          fromIdx: from, toIdx: to,
          t: Math.random(), speed: 0.002 + Math.random() * 0.003,
          color: NODES[from].color,
        });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes(rect.width, rect.height);
      initParticles();
    };

    resize();
    startTimeRef.current = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      // Background dot grid
      ctx.fillStyle = "rgba(139, 92, 246, 0.04)";
      for (let gx = BG_DOT_SPACING; gx < w; gx += BG_DOT_SPACING) {
        for (let gy = BG_DOT_SPACING; gy < h; gy += BG_DOT_SPACING) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Scanning line
      const scanY = ((elapsed * 0.15) % 1.2 - 0.1) * h;
      const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      scanGrad.addColorStop(0, "rgba(0, 240, 255, 0)");
      scanGrad.addColorStop(0.5, "rgba(0, 240, 255, 0.06)");
      scanGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 20, w, 40);

      const nodes = nodesRef.current;

      // Update node physics (mouse reactive)
      for (const node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 100;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 0.8;
          node.vx -= (dx / dist) * force;
          node.vy -= (dy / dist) * force;
        }

        // Spring back to base
        node.vx += (node.baseX - node.x) * 0.03;
        node.vy += (node.baseY - node.y) * 0.03;
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;
      }

      // Draw connections
      for (const [fromIdx, toIdx] of CONNECTIONS) {
        const a = nodes[fromIdx];
        const b = nodes[toIdx];
        const dx = mx - (a.x + b.x) / 2;
        const dy = my - (a.y + b.y) / 2;
        const mdist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - mdist / 200);

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, a.color + Math.round((0.2 + proximity * 0.4) * 255).toString(16).padStart(2, "0"));
        grad.addColorStop(1, b.color + Math.round((0.2 + proximity * 0.4) * 255).toString(16).padStart(2, "0"));

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1 + proximity;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw energy particles
      for (const p of particlesRef.current) {
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, p.color + "cc");
        grad.addColorStop(1, p.color + "00");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(elapsed * 2 + node.pulsePhase) * 0.5 + 0.5;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20 + pulse * 10);
        glowGrad.addColorStop(0, node.color + "40");
        glowGrad.addColorStop(1, node.color + "00");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20 + pulse * 10, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulse * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // White center
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = node.color + "aa";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + 18);
      }

      // Center core
      const cx = w / 2;
      const cy = h / 2;
      const corePulse = Math.sin(elapsed * 1.5) * 0.3 + 0.7;

      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
      coreGlow.addColorStop(0, `rgba(0, 240, 255, ${0.15 * corePulse})`);
      coreGlow.addColorStop(0.5, `rgba(139, 92, 246, ${0.08 * corePulse})`);
      coreGlow.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fill();

      // Core ring
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 * corePulse})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.stroke();

      // Core text
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(0, 240, 255, ${0.6 + corePulse * 0.4})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Full", cx, cy - 6);
      ctx.fillText("Stack", cx, cy + 6);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [isVisible, initNodes, initParticles]);

  return (
    <div className="glass-card rounded-2xl relative overflow-hidden h-56 md:h-64">
      {/* Gradient border shimmer */}
      <div className="absolute inset-0 rounded-2xl border border-cyan/10 pointer-events-none" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan/20 rounded-tl" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-purple/20 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-pink/20 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan/20 rounded-br" />
    </div>
  );
}
