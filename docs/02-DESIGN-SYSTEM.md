# 02 — Design System (Pixel-Perfect Specification)

This is the single source of truth for colors, type, spacing, and motion.
Every component must conform. No one-off values.

---

## 1. Theme Strategy

- **Dark mode = default** (matches current identity, better for dev portfolios)
- **Light mode = full parity**, not an afterthought — user asked for it explicitly
- Implement with `next-themes` (class-based `dark` on `<html>`, no FOUC)
- All colors defined as **CSS variables** consumed through Tailwind `@theme` so
  every component auto-switches

### Theme Toggle
- Positioned in Navbar (desktop) + mobile menu
- Sun/Moon icon, persisted to localStorage, respects `prefers-color-scheme` on first visit

---

## 2. Color Palette

### Philosophy
Neutrals carry 95% of the UI. One **electric indigo** accent for actions and key
emphasis. One **green** only for availability status. No pink. No cyan. No gradients
on text (gradients are what made it feel like a template).

### CSS Variables (both themes)

```css
/* ── Dark (default) ─────────────────────────── */
--bg:            #09090b;   /* page background (zinc-950) */
--surface:       #101013;   /* cards, panels */
--surface-2:     #17171b;   /* hover / elevated */
--border:        #232329;   /* 1px hairlines */
--border-strong: #34343c;   /* focused / active edges */
--text:          #f4f4f5;   /* primary (zinc-100) */
--text-2:        #a1a1aa;   /* secondary (zinc-400) */
--text-3:        #71717a;   /* muted (zinc-500) */
--accent:        #6366f1;   /* indigo-500 — actions, links, focus */
--accent-hover:  #818cf8;   /* indigo-400 */
--accent-soft:   rgba(99,102,241,0.12); /* chips, hovers */
--success:       #22c55e;   /* "Available for work" dot */
--success-soft:  rgba(34,197,94,0.12);

/* ── Light ──────────────────────────────────── */
--bg:            #ffffff;
--surface:       #fafafa;
--surface-2:     #f4f4f5;
--border:        #e4e4e7;
--border-strong: #d4d4d8;
--text:          #09090b;
--text-2:        #52525b;
--text-3:        #a1a1aa;
--accent:        #4f46e5;   /* indigo-600 — darker for AA contrast on white */
--accent-hover:  #4338ca;
--accent-soft:   rgba(79,70,229,0.08);
--success:       #16a34a;
--success-soft:  rgba(22,163,74,0.10);
```

### Contrast Rules (accessibility, non-negotiable)
- Body text on `--bg`: ≥ 7:1 (`--text` passes in both themes)
- Secondary text: ≥ 4.5:1 (`--text-2` passes)
- Accent on `--bg`: indigo-500 passes on dark; use indigo-600 on light
- Interactive focus ring: `2px solid var(--accent)` with 2px offset, visible in both themes

### Deliberately Removed
`--color-cyan`, `--color-pink`, `glow-*`, `text-glow-*`, `gradient-border`,
rainbow animations, noise overlay, scrollbar purple.

---

## 3. Typography

Keep existing fonts (Inter + JetBrains Mono) — they're correct choices.

```css
--font-sans:  var(--font-inter);        /* everything */
--font-mono:  var(--font-jetbrains);    /* ONLY: code refs, labels, data */
```

### Type Scale (desktop / mobile)
| Role | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| Display | 64/40px | 700 | 1.05 | Hero name, tracking `-0.03em` |
| H2 | 36/28px | 600 | 1.15 | Section titles, tracking `-0.02em` |
| H3 | 20/18px | 600 | 1.3 | Card titles |
| Body | 16/15px | 400 | 1.65 | Paragraphs, max-width `65ch` |
| Small | 14/13px | 400 | 1.5 | Descriptions |
| Label | 12px mono | 500 | 1 | Uppercase, `tracking-widest`, `--text-3` |

### Rules
- Mono font **only** for labels, section eyebrows, code-ish details. Never for paragraphs.
- No gradient-clipped text. Solid colors only.
- Tracked-tight on large sizes, tracked-wide only on 12px uppercase labels.

---

## 4. Spacing & Layout

- Section padding: `py-24 md:py-32` (keep)
- Content max-width: `max-w-6xl` (1152px) — keep; prose blocks capped at `max-w-3xl`
- Grid gap: `gap-6` (24px) cards, `gap-12` (48px) columns
- Card radius: `rounded-xl` (12px) — calmer than `rounded-2xl`
- Card padding: `p-6 md:p-8`
- Border style: `1px solid var(--border)` — hairlines, never glowing

---

## 5. Motion Rules

```yaml
entrance:   opacity 0 → 1, y 16 → 0, 400ms, ease [0.16,1,0.3,1]
hover:      150–200ms, border-color + background only (no scale > 1.02)
stagger:    60–80ms between siblings, capped at 6 items
looping:    NONE (no pulse, float, glitch, typewriter, gradient-shift)
reduced-motion: fully respected (keep existing media query)
```

**Delete:** `glitch-1/2`, `typing-cursor`, `pulse-glow`, `float`, `gradient-shift`,
`constellation-pulse`, `noise-overlay`.

---

## 6. Component Specifications

### Button — Primary
`bg-accent text-white font-medium h-11 px-5 rounded-lg hover:bg-accent-hover transition-colors`
Focus ring included. No gradient, no glow, no `hover:scale`.

### Button — Secondary
`border border-border text-text hover:bg-surface-2 h-11 px-5 rounded-lg`

### Card
```
bg-surface border border-border rounded-xl p-6
hover: border-border-strong + bg-surface-2   (150ms)
```
Solid surface, not glass. No blur, no gradient border.

### Chip / Tag
```
mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md
bg-accent-soft text-accent border border-accent/20
```
Tech stack chips: neutral (`bg-surface-2 text-text-2 border-border`) — accent is reserved.

### Section Eyebrow (replaces `// About Me`)
```
mono 12px uppercase tracking-[0.2em] text-text-3
```
Content examples: `ABOUT`, `SELECTED WORK`, `EXPERIENCE`. No slashes, no comments.

### Status Dot
```
6px green circle + subtle ring + "Available for work"
```

---

## 7. Page-Level Effects

| Keep | Remove |
|---|---|
| Scroll progress bar (2px, `--accent` solid) | Section glow dividers → plain `1px border-border` |
| Smooth scroll + scroll-padding | Gradient orbs in Hero |
| | Noise overlay |
| | Particle background canvas |
| | Tech Constellation canvas |

---

## 8. Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| CLS | < 0.1 |
| JS on first load | Remove three.js / R3F entirely → save ~150KB |
| LCP | Hero text, not an image |
| Fonts | `font-display: swap`, preconnect |

Removing particle/constellation/3D is required to hit these numbers — they are
the single biggest bundle + CPU cost, and they carry no information.
