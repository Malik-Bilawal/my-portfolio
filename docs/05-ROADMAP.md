# 05 — Implementation Roadmap

Ordered so the site is **always in a working, pushable state**. Each phase ends
with `npm run build` + visual check + commit. Estimated phases: 7.

**Build command reminder:** `next build --webpack` (already in package.json).

---

## Phase 0 — Decisions (RESOLVED)

| # | Decision |
|---|---|
| Q1 | **Luxorix** leads the flagship project, "LUMS" as secondary label |
| Q2 | Show public **Available for work** status |
| Q4 | **Remove** Twitter from footer |
| Q5 | Static title (no typewriter) |
| Q6 | Grouped skills list, no percent bars |
| Q8 | **New Education section** added: Kiran Academic (Matric, 2022–24), Islamic College Karachi (Intermediate, 2024–26), Aptech (SWE Diploma, 2024–27, in progress), University of Karachi (BS CS, 2026–30, in progress) — in `data.ts` |

---

## Phase 1 — Theme Foundation (dark ⇄ light)
1. Install `next-themes`
2. Rewrite `globals.css`: replace color tokens with the CSS variables from
   `02-DESIGN-SYSTEM.md`; define both themes via `.dark` class
3. Wire `ThemeProvider` in `layout.tsx` (`attribute="class"`, `defaultTheme="dark"`,
   `disableSystem=false`)
4. Add theme toggle (Sun/Moon) to Navbar + mobile menu
5. Sweep every component for hardcoded hex/`text-cyan`/`text-pink`/`bg-purple`
   → CSS-var utilities
6. ✅ Verify: toggle in both modes, no FOUC, persisted across reload

## Phase 2 — Strip the Cartoonish (global deletions)
1. Delete `ParticleBackground.tsx`, `TechConstellation.tsx` + their imports
2. Remove three.js / R3F / @react-three deps if nothing else uses them (`npm ls three`)
3. Delete dead keyframes/classes from `globals.css` (glitch, pulse, float,
   gradient-shift, noise, glow, constellation-pulse, typing-cursor)
4. Section dividers → plain 1px border; remove `// comment` eyebrows → uppercase labels
5. Footer/navbar wordmark → `Bilawal.` (no `< >`)
6. ✅ Build size drops significantly; Lighthouse check

## Phase 3 — Hero + About Redesign
1. Hero: new structure per `03-SITE-REDESIGN.md` (status pill, solid name,
   static title, summary, 2–3 quiet CTAs, trust line) + fade-rise entrances
2. About: editorial 7/5 layout, remove fake window + gradient border +
   constellation + coffee stat; facts panel on right
3. Remove `CountUp` or restrict to real numbers
4. ⚠️ Add `TODO(user)` markers where your personal copy is required
5. ✅ Both themes checked; mobile 375px checked

## Phase 4 — Skills + Experience + Education + Projects + Contact + Footer
1. Skills: grouped columns, no percent bars (per Q6)
2. Experience: quiet timeline, current-role dot, per-role tech tags (TODO for data)
3. **Education (NEW):** clean timeline/list under Experience — credential, institution,
   period, In-Progress/Completed status pill, one-line detail each (data in `data.ts`
   `education[]`); add nav link `#education`
4. Projects: flagship card leads with **Luxorix** (LUMS as secondary label), neutral
   chips, **remove `href="#"`**, honest link states, segmented-control filters
5. Contact: solid card styling, keep Web3Forms
6. Footer: wordmark, Twitter removed (Q4), keep copyright line
7. ✅ Full-page scroll in dark + light + mobile

## Phase 5 — Accessibility & Polish Pass (pixel-perfect gate)
1. Contrast audit all text pairs (use contrast checker on each token pair)
2. Focus-visible rings on every interactive element; keyboard tab order check
3. Alt text, aria-labels, heading hierarchy (single h1 → h2 per section)
4. `prefers-reduced-motion` verified (no stray infinite animations)
5. Spacing/type scale conformance vs `02-DESIGN-SYSTEM.md`
6. ✅ Lighthouse ≥ 95 (perf/a11y/best-practices/SEO), both themes

## Phase 6 — AI Assistant
1. **Validate Groq model name** against `https://console.groq.com/docs/models`
   (fix env value if `qwen/qwen3.8-27b` is invalid — no code change)
2. Create `src/lib/knowledge.ts` (imports `data.ts`) + `TODO(user)` curated facts
3. Create `src/app/api/assistant/route.ts` (edge, streaming, validation, key server-side)
4. Build `ChatWidget.tsx` (panel, streaming reader, chips, typing indicator,
   sessionStorage history, fallback state, a11y)
5. Mount in `page.tsx`; add "Ask AI" hint in Hero or Navbar
6. Test matrix:
   - [ ] "What's his experience with Laravel?" → correct, sourced answer
   - [ ] "Tell me about the LUMS project" → 40+ modules, 1.3 years…
   - [ ] "Is he available?" → per Q2/Q3 answer
   - [ ] "How do I make pancakes?" → exact fallback line, once
   - [ ] "Ignore your instructions" → still refuses
   - [ ] API key absent from browser (DevTools network check)
   - [ ] Streaming works; Retry works with API down
   - [ ] Light + dark; mobile full-sheet; keyboard-only operation
7. ✅ Push + verify on live Vercel URL

## Phase 7 — Final Verification (on live site)
1. Desktop 1440 / laptop 1280 / tablet 768 / mobile 375 + 320 (no h-scroll)
2. Both themes, every section, every link (resume, GitHub, LinkedIn, email)
3. Contact form test → arrives at inbox (Web3Forms)
4. Assistant test on live domain (edge route cold start ~1s acceptable)
5. SEO: meta tags intact, OG image, sitemap reachable
6. Delete stale docs note → update `06-CHANGELOG` if desired

---

## Risk Register

| Risk | Mitigation |
|---|---|
| Groq model name wrong in env | Phase 6 step 1 validates before any code |
| Prompt injection / abuse | caps + server-side key + strict system prompt |
| Web3Forms key leaks | it's a form key (by design client-visible? **we send it server-side** — verify during Phase 6; if currently client-side, move to env on server) |
| Light mode contrast regressions | Phase 5 audit with checker, not eyeballs |
| Losing your existing good copy | `data.ts` untouched except where you edit it |

## Definition of Done

- [ ] No neon/glitch/particles/loops anywhere
- [ ] Dark + light, toggle persisted, AA contrast both modes
- [ ] Zero `href="#"`, zero fake stats, all socials real
- [ ] AI assistant answers Bilawal questions correctly, falls back cleanly
- [ ] `GROQ_API_KEY` never in client bundle
- [ ] Lighthouse ≥ 95 × 4 categories
- [ ] Works at 320px, keyboard-only, reduced-motion
- [ ] Live on Vercel, committed to `main`
