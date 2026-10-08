# 03 — Section-by-Section Redesign

Every section: what dies, what's born, why. Copy tone: **specific > clever**.

Global replacements first:

| Instead of | Write |
|---|---|
| `// About Me` | `ABOUT` |
| `// The Showcase` | `SELECTED WORK` |
| `<hello world />` | *(gone entirely)* |
| `<Affan />` logo | `MB.` or `Bilawal.` wordmark, plain type |
| Name in gradient | Solid `--text`, weight does the work |
| Gradient h2s | Solid `--text` |

---

## Hero

**Remove:** particles canvas, glitch name, typewriter loop, gradient orbs,
`<hello world />`, gradient buttons, 3 gradient CTAs.

**Structure (single screen, centered or left-aligned editorial):**

```
● Available for work                          ← status pill (top)
Muhammad Bilawal                              ← solid, 64px, tight tracking
Full Stack Developer                          ← 20px, --text-2
Karachi, Pakistan · 3+ years building
        → backend systems, APIs, and full-stack
          products with Laravel, Node.js,
          React, and Next.js.       ← 65ch max, --text-2

[ View selected work ] [ Download CV ] [ Get in touch ]
                                        ← 2 buttons + text link, or 3 quiet ones
```

**Trust line under CTAs (optional):**
`Currently at THE HELPEX · Previously SYBRID`

- Entrance: fade + rise 400ms, staggered 80ms — plays once
- Scroll indicator: minimal chevron, no float animation, or delete
- CV download keeps working (file already correct)

---

## About

**Remove:** fake window (colored dots + `about.tsx` label), rainbow gradient border,
Tech Constellation canvas, `999+ Cups of Coffee`.

**Replace with editorial layout (grid 7/5):**

Left — **bio**, no chrome:
- Lead paragraph = `personalInfo.summary` as-is (it's genuinely strong copy)
- Then 2 short paragraphs *not yet written* that need your input:
  - **How I work** (e.g., "I start from the data model and API contract…")
  - **What I'm looking for** (e.g., "…looking for backend-heavy product teams")
  - *BLOCKER: you must supply these — I won't invent your voice*

Right — **facts panel** (replaces fake stats):

```
EXPERIENCE
  3+ years        2 companies

FOCUS
  Backend engineering · API design
  Full-stack delivery · System design

CURRENTLY
  Full Stack Developer @ THE HELPEX (2023—Present)

STATUS
  ● Available for work
```

- Remove `CountUp` animation, or keep for exactly the numbers shown above
- Skills preview: 6 neutral chips → link "Full skill set →" scrolling to Skills

---

## Skills

**Keep the data (it's good). Change the presentation:**

- **Remove:** animated percent bars (proficiency numbers are subjective and
  recruiters discount them), glow effects
- **Replace with 4 grouped columns** (Backend / Frontend / Databases / Tools):
  each item = name + small neutral chip, grouped under a label
- Optional: years/context per skill from CV (`Laravel — 3 yrs, production`)
- Layout: real `grid`, works at 160px width, no hover-scale

---

## Experience

**Highest-ROI trust section. Enhance, don't reinvent:**

- Timeline: simple 1px left border + dots, no glow line
- Each role: company, title, period, description, achievement bullets
- `current: true` → subtle green dot + "Current" label
- Add **tech tags per role** (needs your 1-line input per job, or infer from achievements)
- Motion: fade-up on scroll-in, once
- Metrics: if any achievement can be quantified ("cut query time 40%"), promote it —
  *needs your input; I will not fabricate numbers*

---

## Projects (most important section)

**Data was updated — cards must reflect reality:**

1. **LUMS (Luxorix)** — make this the flagship:
   - Larger card (spans 2 cols), "Featured" becomes a quiet neutral label
   - Pull metrics from description: `40+ modules · 1.3 years · ERP/HRMS/POS`
   - Honest labeling: titled "LUMS", subtitle "Luxorix Commerce Management System" —
     consider making the internal codename secondary; *your call which name leads*
2. **Multi-Vendor E-Commerce**
3. **Campus Coin / Budget Bee** (AI budget tracker)
4. **Shahid Insaf Shoes** (MERN ecommerce)

**Trust fixes (critical):**
- No live links you don't have → replace `href="#"` with **"Case study on request"**
  or remove the icon entirely. A working state > a fake link
- GitHub icon links to profile — keep, but if repo is private say `Private repo`
- Highlights: neutral chips, not neon pink
- Filters: keep, but style = segmented control (surface + border), not gradient pill

---

## Contact

- Web3Forms already wired and key is live — **keep mechanism**
- Visuals: drop glass/glow → solid card, clean inputs, focus ring `--accent`
- Success/error states: calm, inline, mono label + message
- Keep: email, phone, LinkedIn, GitHub as direct links (trust: real channels visible)

---

## Footer

- Wordmark `Bilawal.` (no brackets)
- Links + socials (GitHub/LinkedIn real, **remove broken Twitter or fix URL** —
  current `#` placeholder is a trust leak)
- Bottom line: `© 2026 Muhammad Bilawal. Crafted with ♥ from Karachi` (keep — it's good)

---

## Navbar

- Wordmark change, add **theme toggle**, keep scroll-progress (2px solid accent)
- Active section highlight (exists?) — keep subtle: `--text` vs `--text-3`
- Mobile menu: same, with theme toggle + "Ask AI" entry

---

## Global Deletions Checklist

- [ ] `ParticleBackground` (component + import + three.js dep if unused elsewhere)
- [ ] `TechConstellation` (component + import)
- [ ] glitch / typewriter / pulse / float / gradient-shift / constellation-pulse keyframes
- [ ] `.noise-overlay` (and its usage)
- [ ] `.glow-*`, `.text-glow-*`, `.gradient-border`
- [ ] Section glow dividers → 1px `border-border`
- [ ] Neon color tokens (`cyan`, `pink`, purple-as-primary)
- [ ] `Cups of Coffee` stat
- [ ] All `href="#"` links
