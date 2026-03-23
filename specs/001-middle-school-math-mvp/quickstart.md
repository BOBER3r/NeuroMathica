# Developer Quickstart: NeuroMathica

**Branch**: `001-middle-school-math-mvp` | **Date**: 2026-03-22

## Prerequisites

- Node.js 20+ (LTS)
- pnpm 9+ (package manager)
- PostgreSQL 16+ (local or Docker)
- Redis 7+ (local or Docker)
- Git

## 1. Clone & Install

```bash
git clone <repo-url> neuromathica
cd neuromathica
pnpm install
```

## 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/neuromathica"
REDIS_URL="redis://localhost:6379"

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# AI (Anthropic)
ANTHROPIC_API_KEY="sk-ant-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 3. Database Setup

```bash
# Start PostgreSQL and Redis (Docker)
docker compose up -d postgres redis

# Run migrations
pnpm prisma migrate dev

# Seed curriculum data (72 topics + dependency graph + problems)
pnpm prisma db seed
```

## 4. Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5. Key Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server (port 3000) |
| `pnpm build` | Production build |
| `pnpm test` | Run Vitest unit + integration tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm test:math` | Run math correctness tests only (DR-2) |
| `pnpm storybook` | Start Storybook for visual component dev |
| `pnpm lint` | ESLint + TypeScript strict check |
| `pnpm prisma studio` | Open Prisma database GUI |
| `pnpm prisma migrate dev` | Create/apply migrations |

## 6. Project Layout

```
src/
├── app/          # Next.js App Router pages + API routes
├── components/   # React components
│   ├── math-scene/   # <MathScene> animation engine (core IP)
│   ├── lesson/       # NLS 7-stage lesson player
│   ├── gamification/ # XP, levels, streaks, achievements UI
│   ├── ai-tutor/     # AI tutor panel + avatar
│   └── ui/           # Shared primitives (Button, Card, etc.)
├── server/       # Backend: tRPC routers + services
│   ├── trpc/         # tRPC router definitions
│   └── services/     # Business logic (SRS, gamification, AI)
├── content/      # Lesson content (MDX + JSON) — open curriculum
├── lib/          # Shared utilities, hooks, stores
└── tests/        # Unit, integration, E2E tests
```

## 7. Content Authoring

Lessons live in `src/content/domains/<domain>/<concept-id>/`:

```
src/content/domains/numbers-operations/NO-1.4a/
├── lesson.mdx        # 7-stage lesson content
├── animations.json   # MathScene scene definitions per stage
├── problems.json     # Practice problem bank
└── meta.json         # Prerequisites, successors, grade level
```

See [contracts/animation-dsl.md](contracts/animation-dsl.md) for the MathScene
JSON schema.

## 8. Testing Math Correctness (DR-2)

Every math computation must have tests:

```bash
# Run only math correctness tests
pnpm test:math

# These live in tests/unit/math/
# Add epsilon comparisons for floating-point:
# expect(result).toBeCloseTo(expected, 10)
```

## 9. Mobile Testing

Test on real devices, not just Chrome DevTools:

```bash
# Expose dev server to local network
pnpm dev --hostname 0.0.0.0

# Access from phone: http://<your-ip>:3000
```

For Capacitor (Phase 2):

```bash
npx cap init
npx cap add ios
npx cap add android
npx cap sync
npx cap open ios  # Opens Xcode
```

## 10. Architecture Decisions

Read these before contributing:

| Document | Content |
|----------|---------|
| [plan.md](plan.md) | Full implementation plan, project structure, constitution check |
| [research.md](research.md) | Technology decisions with rationale |
| [data-model.md](data-model.md) | Prisma schema, entity relationships |
| [contracts/api-routes.md](contracts/api-routes.md) | tRPC router specs |
| [contracts/animation-dsl.md](contracts/animation-dsl.md) | MathScene JSON schema |
| [curriculum.md](curriculum.md) | 72 topics with hooks and visual representations |
| [gamification-design.md](gamification-design.md) | XP, levels, streaks, achievements |
| [../../.specify/memory/constitution.md](../../.specify/memory/constitution.md) | Project constitution (7 principles, 7 dev rules) |
