# NeuroMathica

**See math. Understand math.**

A neuroscience-driven math learning platform with interactive 3Blue1Brown-quality visualizations. Built to help children actually *understand* math, not just memorize it.

> **This is a vibe-coded app** — built in a single session with AI assistance. It's rough around the edges but the core experience works. We're making it open source so anyone can use it, improve it, and help kids learn math.

**[neuromathica.com](https://neuromathica.com)**

---

## What This Is

72 interactive math lessons covering the complete middle school curriculum (grades 6-8):

- **Numbers & Operations** (18 lessons) — Place value through real number system
- **Number Theory** (7 lessons) — Factors, primes, exponents, GCF/LCM
- **Algebra** (18 lessons) — Variables through quadratic equations
- **Geometry** (19 lessons) — Angles through coordinate geometry
- **Statistics & Probability** (10 lessons) — Mean/median/mode through statistical reasoning

Each lesson follows the **7-Stage Neural Learning Sequence**:

1. **Hook** — Cinematic Manim animation that sparks curiosity
2. **Spatial Experience** — Interactive visualization you can touch and explore
3. **Guided Discovery** — Prompts that lead you to the insight (not tell you)
4. **Symbol Bridge** — Mathematical notation overlaid on the spatial model
5. **Real World** — How this concept appears in everyday life
6. **Practice** — 9 problems across recall, procedure, and understanding
7. **Reflection** — Explain it in your own words

## Why This Order?

The sequence is based on how the brain actually learns math:

- **Spatial before symbolic** — Building a mental model before seeing notation creates stronger neural pathways ([Dehaene, 2011](https://en.wikipedia.org/wiki/The_Number_Sense))
- **Discovery over telling** — Self-discovered insights trigger stronger dopamine responses than told information
- **Retrieval practice** — Actively recalling beats passive re-reading
- **Self-explanation** — Explaining in your own words multiplies retention 2-3x

Full neuroscience rationale: [`specs/lessons/NEUROSCIENCE-PATTERNS.md`](specs/lessons/NEUROSCIENCE-PATTERNS.md)

## Video Animations

Hook animations are generated using [**Manim**](https://github.com/3b1b/manim) — the engine created by [3Blue1Brown](https://www.3blue1brown.com/) for his math videos. We use the [Manim Community Edition](https://github.com/ManimCommunity/manim).

70 video hooks rendered as WebM files (13MB total). See [`manim_scenes/README.md`](manim_scenes/README.md) for how to render more.

## Tech Stack

- **Framework**: Next.js 15+ (App Router, TypeScript strict)
- **Animations**: Framer Motion + Manim (video hooks)
- **Database**: PostgreSQL via Prisma ORM
- **API**: tRPC (type-safe end-to-end)
- **Auth**: Clerk (COPPA compliant)
- **AI Tutor**: Anthropic Claude API (Socratic mode)
- **SRS**: FSRS algorithm + IRT adaptive difficulty
- **Gamification**: XP, levels, streaks, achievements, Knowledge Nebula
- **Offline**: Service workers + IndexedDB

## Quick Start

```bash
# Clone
git clone https://github.com/BOBER3r/NeuroMathica.git
cd NeuroMathica

# Install
pnpm install

# Database
cp .env.example .env.local
docker compose up -d
pnpm prisma migrate dev --name init
pnpm prisma db seed

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js pages and routes
├── components/
│   ├── lessons/            # 72 interactive lesson components (85K+ lines)
│   │   ├── ui/             # Reusable lesson UI kit (11 components)
│   │   └── VideoHook.tsx   # Manim video player
│   ├── math-scene/         # SVG math visualization engine
│   ├── gamification/       # XP, levels, streaks, achievements
│   └── ai-tutor/           # AI tutor chat panel
├── server/
│   ├── trpc/               # API routers (8 routers)
│   └── services/           # SRS, gamification, AI engines
├── lib/
│   ├── math/               # Pure math utilities (204 tests)
│   └── stores/             # Zustand state management
└── content/                # Lesson content (MDX + JSON)

manim_scenes/               # Python scripts for video generation
specs/lessons/              # Design docs, templates, guides
```

## Contributing

We welcome contributions! This project needs:

- **Lesson improvements** — Better visualizations, more interactive elements, bug fixes
- **Content review** — Math accuracy, pedagogical quality, age-appropriateness
- **Accessibility** — Screen reader support, keyboard navigation, color blind modes
- **Translations** — i18n infrastructure is in place, English only currently
- **Backend wiring** — Connect lesson completion to XP/progress tracking
- **Testing** — More E2E tests, visual regression tests

### How to contribute

1. Fork the repo
2. Read [`specs/lessons/DEVELOPER-GUIDE.md`](specs/lessons/DEVELOPER-GUIDE.md) for coding rules
3. Read [`specs/lessons/TEMPLATE.md`](specs/lessons/TEMPLATE.md) for lesson structure
4. Make your changes
5. Run `pnpm build && pnpm test` to verify
6. Submit a PR

### How to add a Manim animation

See [`manim_scenes/README.md`](manim_scenes/README.md)

## Known Issues

- Hydration warnings in dev mode (cosmetic, not in production)
- Some later lessons have minimal interactivity compared to the first 12
- Backend not fully connected — lesson progress, XP, AI tutor need auth setup
- Desktop-first — mobile needs polish

## License

**CC BY-NC-SA 4.0** — Free to use, modify, and share for non-commercial purposes. You must give credit and share under the same license. Not for commercial use.

## Acknowledgments

- [3Blue1Brown / Manim](https://github.com/3b1b/manim) — Animation engine for video hooks
- [Manim Community](https://github.com/ManimCommunity/manim) — Community edition used for rendering
- Built with [Claude Code](https://claude.ai/claude-code) (Anthropic)
- Inspired by the belief that every child deserves to see math come alive
