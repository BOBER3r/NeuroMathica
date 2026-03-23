# Content Authoring Guide — NeuroMathica

This guide explains how to author lesson content for NeuroMathica. Lessons
are stored as structured JSON files and can be contributed via pull requests.

## Lesson Directory Structure

Each lesson lives in `src/content/domains/<domain-id>/<concept-id>/`:

```
src/content/domains/numbers-operations/NO-1.4/
├── meta.json          # Lesson metadata
├── animations.json    # MathScene scene definitions per stage
└── problems.json      # Practice problem bank
```

## meta.json

```json
{
  "conceptId": "NO-1.4",
  "name": "Fractions",
  "gradeLevel": 6,
  "domain": "numbers-operations",
  "prerequisites": ["NO-1.1"],
  "successors": ["NO-1.4a", "NO-1.5"],
  "estimatedMinutes": 25,
  "hooks": {
    "visual": "Description of the hook animation",
    "question": "An engaging question to spark curiosity"
  },
  "realWorldContext": "Text explaining how this concept appears in real life",
  "reflectionPrompt": "A question asking students to explain the concept"
}
```

## animations.json — MathScene DSL

Each scene follows the `SceneDefinition` schema:

```typescript
interface SceneDefinition {
  id: string;
  renderer: "auto" | "svg" | "three";
  viewBox: [xMin, yMin, width, height];
  background?: string;
  objects: SceneObject[];
  animations: AnimationSequence[];
  interactions: Interaction[];
}
```

### Scene Objects

| Type | Description |
|------|------------|
| `coordinateGrid` | Background grid with step and majorStep |
| `axes` | X/Y axes with labels and ticks |
| `point` | Point with optional label, draggable |
| `line` | Line segment between two points |
| `vector` | Arrow with direction |
| `functionPlot` | Graph of a math expression |
| `numberLine` | Horizontal number line with markers |
| `fractionBar` | Visual fraction representation |
| `geometricShape` | Triangle, rectangle, circle, polygon |
| `angle` | Two rays with optional arc |
| `annotation` | KaTeX LaTeX label |
| `group` | Container for grouping objects |

### Animation Steps

| Action | Description |
|--------|------------|
| `fadeIn` | Animate opacity 0→1, optional direction |
| `fadeOut` | Animate opacity 1→0 |
| `draw` | SVG path drawing animation |
| `transform` | Animate arbitrary properties |
| `morphTo` | Morph object to new state |
| `moveTo` | Move to position |
| `highlight` | Color change with optional pulse |
| `cameraMove` | Pan/zoom the viewport |
| `wait` | Pause between steps |
| `parallel` | Run multiple steps simultaneously |

### Interactions

| Type | Description |
|------|------------|
| `drag` | Drag an object, updates bound properties |
| `click` | Click triggers an animation |
| `hover` | Hover triggers an animation |

## problems.json

Array of problems with 3 layers (3+ problems each):

```json
[
  {
    "id": "unique-problem-id",
    "layer": 0,
    "templateType": "multiple-choice",
    "content": {
      "question": "What is the question?",
      "options": ["A", "B", "C", "D"],
      "solution": "B",
      "solutionExplanation": "Because..."
    },
    "explanationPrompt": "Why does this work?",
    "difficultyB": 0.5
  }
]
```

### Problem Layers

- **Layer 0 (Recall)**: Can the student state facts/formulas? (IRT difficulty: -1.5 to -0.5)
- **Layer 1 (Procedure)**: Can the student execute methods? (IRT difficulty: 0.0 to 1.0)
- **Layer 2 (Understanding)**: Can the student explain WHY? (IRT difficulty: 1.0 to 2.0)

### Required Fields

Every problem MUST include an `explanationPrompt` field (Constitution Principle I:
Understanding Over Memorization). This prompt is shown after correct answers.

## 7-Stage Neural Learning Sequence

Each lesson follows these stages:

1. **Hook** (30-60s) — Stunning visual that sparks curiosity
2. **Spatial Experience** (2-4min) — Interactive exploration
3. **Guided Discovery** (3-5min) — Prompted exploration with "aha" moments
4. **Symbol Bridge** (2-3min) — KaTeX notation overlaid on spatial scene
5. **Real-World Anchor** (1-2min) — Context from everyday life
6. **Practice** (5-10min) — Adaptive problems across 3 layers
7. **Reflection** (1min) — Self-explanation in own words

## Contribution Workflow

1. Fork the repository
2. Create a new branch: `content/<concept-id>`
3. Create the lesson directory with all 3 files
4. Ensure the concept ID exists in the curriculum seed data
5. Submit a pull request with the content for review

## License

Lesson content is licensed under CC BY-SA 4.0 (Creative Commons Attribution-ShareAlike).
The platform code is proprietary.
