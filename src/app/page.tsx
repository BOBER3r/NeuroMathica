import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-dvh bg-nm-bg-primary text-nm-text-primary">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-16">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-nm-accent-indigo to-nm-accent-cyan shadow-lg shadow-nm-accent-indigo/20">
          <span className="text-3xl font-bold text-white">N</span>
        </div>
        <h1 className="mb-3 text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Neuro<span className="text-nm-accent-indigo">Mathica</span>
        </h1>
        <p className="mb-8 max-w-md text-center text-lg text-nm-text-secondary">
          See math. Understand math.<br />
          <span className="text-nm-text-muted">72 interactive lessons for grades 6-8</span>
        </p>
        <Link
          href="/learn"
          className="rounded-2xl bg-nm-accent-indigo px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-nm-accent-indigo/25 transition-all hover:shadow-xl hover:shadow-nm-accent-indigo/30 active:scale-95"
        >
          Start Learning
        </Link>
      </section>

      {/* What makes this different */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Brain-first learning</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-nm-bg-secondary p-5">
            <div className="mb-3 text-2xl">{"🎬"}</div>
            <h3 className="mb-1 font-semibold">Cinematic Hooks</h3>
            <p className="text-sm text-nm-text-secondary">
              Every lesson starts with a 3Blue1Brown-style animation that makes you curious
            </p>
          </div>
          <div className="rounded-2xl bg-nm-bg-secondary p-5">
            <div className="mb-3 text-2xl">{"🖐️"}</div>
            <h3 className="mb-1 font-semibold">Touch & Explore</h3>
            <p className="text-sm text-nm-text-secondary">
              Drag number lines, shade fractions, rotate angles — understand before you memorize
            </p>
          </div>
          <div className="rounded-2xl bg-nm-bg-secondary p-5">
            <div className="mb-3 text-2xl">{"🧠"}</div>
            <h3 className="mb-1 font-semibold">7-Stage Sequence</h3>
            <p className="text-sm text-nm-text-secondary">
              Hook, Explore, Discover, Notation, Real World, Practice, Reflect — based on how your brain learns
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum overview */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="mb-6 text-center text-2xl font-bold">72 Lessons, 5 Domains</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { name: "Numbers", color: "#60a5fa", count: 18 },
            { name: "Number Theory", color: "#a78bfa", count: 7 },
            { name: "Algebra", color: "#34d399", count: 18 },
            { name: "Geometry", color: "#fbbf24", count: 19 },
            { name: "Statistics", color: "#fb7185", count: 10 },
          ].map((d) => (
            <div key={d.name} className="rounded-xl p-3 text-center" style={{ backgroundColor: `${d.color}10`, borderLeft: `3px solid ${d.color}` }}>
              <div className="text-2xl font-bold" style={{ color: d.color }}>{d.count}</div>
              <div className="text-xs text-nm-text-muted">{d.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Open source note */}
      <section className="mx-auto max-w-2xl px-6 pb-16">
        <div className="rounded-2xl border border-nm-bg-surface bg-nm-bg-secondary p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold">A note from the developer</h2>
          <div className="space-y-3 text-sm text-nm-text-secondary leading-relaxed">
            <p>
              This app was vibe-coded in a single session using AI assistance. It{"'"}s not perfect —
              some lessons need polish, some visualizations are basic, and the backend isn{"'"}t fully wired yet.
            </p>
            <p>
              But the core idea works: <strong className="text-nm-text-primary">spatial understanding before symbolic notation</strong>,
              backed by neuroscience research on how the brain actually learns math.
            </p>
            <p>
              I{"'"}m making this <strong className="text-nm-text-primary">open source and free forever</strong> because every child
              deserves access to quality math education. No ads, no paywalls, no data selling.
            </p>
            <p>
              If you{"'"}re a developer, educator, or just someone who cares about math education —
              I{"'"}d love your help making this better.
            </p>
          </div>

          {/* GitHub CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/BOBER3r/NeuroMathica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-nm-bg-primary px-5 py-3 text-sm font-medium text-nm-text-primary border border-nm-bg-surface transition-all hover:border-nm-accent-indigo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
            <a
              href="https://github.com/BOBER3r/NeuroMathica/stargazers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-nm-accent-amber/10 px-5 py-3 text-sm font-medium text-nm-accent-amber border border-nm-accent-amber/20 transition-all hover:bg-nm-accent-amber/20"
            >
              {"⭐"} Star on GitHub
            </a>
            <a
              href="https://github.com/BOBER3r/NeuroMathica/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-nm-text-muted transition-all hover:text-nm-text-secondary"
            >
              Report an issue
            </a>
          </div>
        </div>
      </section>

      {/* Tech credits */}
      <footer className="border-t border-nm-bg-surface px-6 py-8">
        <div className="mx-auto max-w-2xl text-center text-xs text-nm-text-muted">
          <p className="mb-2">
            Video animations powered by{" "}
            <a href="https://github.com/3b1b/manim" target="_blank" rel="noopener noreferrer" className="text-nm-accent-indigo hover:underline">
              Manim
            </a>{" "}
            (3Blue1Brown). Built with{" "}
            <a href="https://claude.ai/claude-code" target="_blank" rel="noopener noreferrer" className="text-nm-accent-indigo hover:underline">
              Claude Code
            </a>.
          </p>
          <p>
            CC BY-NC-SA 4.0 — Free for non-commercial use.{" "}
            <a href="https://github.com/BOBER3r/NeuroMathica" target="_blank" rel="noopener noreferrer" className="text-nm-accent-indigo hover:underline">
              Contribute on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
