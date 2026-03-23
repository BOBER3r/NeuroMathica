<!--
=== SYNC IMPACT REPORT ===
Version change: N/A (initial creation) -> 1.0.0
Modified principles: N/A (initial creation)

Added sections:
  - Core Principles (7 principles)
  - Pedagogical Framework (Five Pillars + Neural Learning Sequence)
  - Development Rules (7 rules)
  - Governance

Removed sections: N/A

Templates requiring updates:
  - .specify/templates/plan-template.md — Constitution Check section
    references generic gates; principles now defined. ⚠ pending
    (will be populated dynamically by /speckit.plan at runtime)
  - .specify/templates/spec-template.md — no structural conflicts. ✅ ok
  - .specify/templates/tasks-template.md — no structural conflicts. ✅ ok

Follow-up TODOs: None. All placeholders resolved.
=== END SYNC IMPACT REPORT ===
-->

# NeuroMathica Constitution

## Core Principles

### I. Understanding Over Memorization

Every feature, lesson, and interaction MUST serve conceptual understanding.
If a student can solve a problem but cannot explain why the solution works,
the platform has failed. Drill-and-practice without comprehension is
explicitly rejected as a design pattern.

- All practice problems MUST include a "why does this work?" component.
- The AI tutor MUST default to Socratic guidance over direct answers.
- Assessment MUST measure explanation ability, not only correct answers.

### II. Visual First, Symbolic Second

No mathematical concept is introduced as a formula. The spatial/visual
experience MUST always precede symbolic formalization. This is a
neuroscience-backed architectural constraint, not a stylistic preference.

- Lesson content MUST follow the Neural Learning Sequence (see
  Pedagogical Framework below) where spatial experience precedes
  symbol bridging.
- Content review MUST reject any lesson that presents notation before
  its visual-spatial grounding.
- The animation engine is a first-class platform component, not an
  optional enhancement.

### III. No Dead-End Content

Every topic MUST connect forward (what it enables) and backward (what it
builds on). The curriculum is a connected directed graph, not a linear list.

- Each lesson MUST declare its prerequisite topics and successor topics.
- The platform MUST surface these connections visually to students.
- Orphan content (no forward or backward links) MUST NOT ship.

### IV. Accessibility Is Architecture

Screen reader support, keyboard navigation, color-blind safe palettes, and
dyslexia-friendly fonts MUST be built in from day one, not retrofitted.

- All interactive canvas elements MUST have ARIA labels and keyboard
  equivalents.
- Color MUST NOT be the sole channel for conveying mathematical meaning.
- WCAG 2.1 AA compliance is the minimum standard for all UI surfaces.
- Touch targets MUST meet minimum 44x44px sizing on mobile.

### V. Performance Is UX

Animations MUST run at 60fps on mid-range hardware. A stuttering animation
is worse than no animation because it breaks the spatial encoding the brain
is attempting to form.

- P95 frame rate on target hardware MUST be >= 55fps; target is 60fps.
- Animation assets MUST be lazy-loaded and progressively enhanced.
- WebGL rendering pipeline MUST include performance budgets enforced
  in CI.
- Heavy computations MUST be offloaded to Web Workers where possible.

### VI. Privacy by Design

Student data — especially error patterns, struggle metrics, and emotional
state inferences — is extremely sensitive. The platform MUST comply with
GDPR and COPPA from day one.

- Data minimization: collect only what is required for adaptive learning.
- Student data MUST NOT be sold, shared, or used for advertising. Ever.
- All personally identifiable data MUST be encrypted at rest and in
  transit.
- Students (or guardians) MUST be able to export and delete their data.

### VII. Open Curriculum, Proprietary Platform

Curriculum content (lesson scripts, animation definitions, MDX files) MUST
be open-source to invite community contribution. The platform (animation
engine, AI tutor, spaced repetition system) is proprietary.

- Content repositories MUST use permissive licensing (e.g., CC BY-SA).
- Platform code MUST remain in private repositories with appropriate
  licensing.
- The content authoring format MUST be documented publicly so community
  contributors can author lessons without access to proprietary code.

## Pedagogical Framework

The pedagogical architecture is grounded in six neuroscience principles.
Every design decision MUST trace back to one or more of these:

1. **Spatial-Mathematical Neural Overlap** — Spatial representation is the
   primary mode of initial concept delivery, leveraging the intraparietal
   sulcus and visuospatial sketchpad.
2. **Dual Coding Theory** — Every concept is presented through synchronized
   visual animation and verbal/textual narration. Visual and verbal
   channels MUST be complementary, never redundant or competing. Labels
   MUST be integrated directly into animations (no split-attention panels).
3. **Embodied Cognition** — Interactive manipulation (drag, rotate, scale)
   recruits motor cortex pathways for richer memory traces. Every lesson
   MUST include at least one interactive manipulation step.
4. **Spacing Effect** — The scheduling engine MUST implement spaced
   repetition calibrated to individual forgetting curves. Review timing
   MUST target the point where retrieval is effortful but still possible.
5. **Interleaving for Discrimination** — Practice problems MUST interleave
   different problem types across sessions. Blocked practice (20 identical
   problems in a row) is explicitly prohibited.
6. **Math Anxiety Reduction** — Mathematics MUST be presented as visual
   exploration and play before formal assessment. The "experience first,
   formalize later" sequence reduces perceived stakes of initial concept
   encounters.

### The Neural Learning Sequence

Every lesson MUST follow this seven-stage pipeline:

| Stage | Duration | Purpose |
|-------|----------|---------|
| 1. Hook | 30-60s | Real-world scenario or stunning animation to activate curiosity and the brain's reward-prediction system |
| 2. Spatial Experience | 2-4 min | Interactive 3D/2D visual exploration — no formulas yet |
| 3. Guided Discovery | 3-5 min | AI tutor or narration guides the student to notice relationships via elaborative interrogation |
| 4. Symbol Bridge | 2-3 min | Formal notation overlaid onto the spatial representation; each symbol's spatial meaning made explicit |
| 5. Real-World Anchor | 1-2 min | Concrete example from engineering, nature, finance, gaming, or daily life |
| 6. Practice | Adaptive | Interleaved problems with previously learned material; difficulty adapts in real time |
| 7. Reflection | ~1 min | Student self-explains in their own words (retrieval practice); captured for the student model |

Content that skips stages or reorders the sequence MUST NOT pass
pedagogical review.

## Development Rules

### DR-1: TypeScript Strict Mode Everywhere

No `any` types. No `implicit any`. `strict: true` in all `tsconfig.json`
files. The math engine demands precision in code as well as in content.

### DR-2: Test Mathematical Correctness

Every mathematical computation in the codebase MUST have a corresponding
test that verifies numerical accuracy. Floating-point edge cases MUST be
handled explicitly (epsilon comparisons, special values).

### DR-3: Animation Review Process

Every animation goes through a two-stage review:

1. **Technical review**: renders correctly, meets 60fps budget, no
   visual artifacts.
2. **Pedagogical review**: teaches the intended concept correctly,
   follows the Neural Learning Sequence, does not introduce
   misconceptions.

### DR-4: Content-Code Separation

Lesson content MUST be defined in structured data (MDX + JSON animation
configs), not hardcoded in components. A content author MUST NOT need to
touch engine code to create or modify a lesson.

### DR-5: Mobile-First Responsive

Design for phone screens first, then scale up. Touch targets, gesture
support (drag, pinch-zoom, rotate via use-gesture), and responsive canvas
layouts are mandatory. Canvas elements MUST reflow gracefully across
viewport sizes.

### DR-6: Offline-First Where Possible

Core lessons MUST be cacheable via service workers for low-connectivity
environments. The AI tutor requires connectivity, but static content and
previously loaded animations MUST work offline.

### DR-7: i18n from Day One

All user-facing strings MUST be externalized into locale files. RTL layout
support MUST be planned from the start. Mathematical notation is universal;
the surrounding UI MUST be localizable.

## Governance

This constitution is the highest-authority document for NeuroMathica
project decisions. All implementation plans, feature specifications, and
code reviews MUST verify compliance with the Core Principles, Pedagogical
Framework, and Development Rules defined above.

### Amendment Procedure

1. Propose the amendment in writing with rationale and impact analysis.
2. Identify all downstream artifacts affected (specs, plans, tasks,
   content).
3. Obtain approval from project leads (product + engineering + pedagogy).
4. Update this document with a version bump and amended date.
5. Propagate changes to all dependent templates and active specifications.

### Versioning Policy

This constitution follows semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Backward-incompatible principle removals or redefinitions.
- **MINOR**: New principle/section added or materially expanded guidance.
- **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements.

### Compliance Review

- Every PR MUST be checked against applicable principles before merge.
- Animation PRs MUST pass both technical and pedagogical review (DR-3).
- Quarterly audits SHOULD verify that shipped content follows the Neural
  Learning Sequence without exceptions.

**Version**: 1.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-22
