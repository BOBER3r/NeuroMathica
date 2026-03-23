import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "domains");

// ============================================================
// Types
// ============================================================

export interface LessonContent {
  conceptId: string;
  meta: LessonMeta;
  animations: Record<string, unknown>;
  problems: ProblemContent[];
}

export interface LessonMeta {
  conceptId: string;
  name: string;
  gradeLevel: number;
  domain: string;
  prerequisites: string[];
  successors: string[];
  estimatedMinutes: number;
  hooks: { visual: string; question: string };
  realWorldContext: string;
  reflectionPrompt: string;
}

export interface ProblemContent {
  id: string;
  layer: number; // 0=recall, 1=procedure, 2=understanding
  templateType: string;
  content: {
    question: string;
    options?: string[];
    solution: string;
    solutionExplanation: string;
    visualization?: unknown;
  };
  explanationPrompt: string;
  difficultyB: number;
}

// ============================================================
// Error types
// ============================================================

export class LessonNotFoundError extends Error {
  constructor(contentPath: string) {
    super(`Lesson not found at path: ${contentPath}`);
    this.name = "LessonNotFoundError";
  }
}

export class LessonParseError extends Error {
  constructor(
    contentPath: string,
    fileName: string,
    cause: unknown,
  ) {
    const causeMessage =
      cause instanceof Error ? cause.message : String(cause);
    super(
      `Failed to parse ${fileName} for lesson at ${contentPath}: ${causeMessage}`,
    );
    this.name = "LessonParseError";
  }
}

// ============================================================
// File reading helpers
// ============================================================

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

// ============================================================
// Public API
// ============================================================

/**
 * Loads a complete lesson from the file system.
 *
 * @param contentPath - Path relative to the content domains directory,
 *   e.g. "numbers-operations/NO-1.1"
 * @returns Structured lesson content including meta, animations, and problems
 * @throws {LessonNotFoundError} if the lesson directory does not exist
 * @throws {LessonParseError} if any content file is malformed
 */
export async function loadLesson(
  contentPath: string,
): Promise<LessonContent> {
  const lessonDir = path.join(CONTENT_DIR, contentPath);

  if (!(await directoryExists(lessonDir))) {
    throw new LessonNotFoundError(contentPath);
  }

  const metaPath = path.join(lessonDir, "meta.json");
  const animationsPath = path.join(lessonDir, "animations.json");
  const problemsPath = path.join(lessonDir, "problems.json");

  // Load all three files in parallel
  const [meta, animations, problems] = await Promise.all([
    readJsonFile<LessonMeta>(metaPath).catch((cause: unknown) => {
      throw new LessonParseError(contentPath, "meta.json", cause);
    }),
    readJsonFile<Record<string, unknown>>(animationsPath).catch(
      (cause: unknown) => {
        throw new LessonParseError(contentPath, "animations.json", cause);
      },
    ),
    readJsonFile<ProblemContent[]>(problemsPath).catch((cause: unknown) => {
      throw new LessonParseError(contentPath, "problems.json", cause);
    }),
  ]);

  return {
    conceptId: meta.conceptId,
    meta,
    animations,
    problems,
  };
}

/**
 * Lists all lesson directories within a domain.
 *
 * @param domainId - Domain directory name, e.g. "numbers-operations"
 * @returns Array of content paths relative to the domains directory,
 *   e.g. ["numbers-operations/NO-1.1", "numbers-operations/NO-1.2"]
 */
export async function listLessons(domainId: string): Promise<string[]> {
  const domainDir = path.join(CONTENT_DIR, domainId);

  if (!(await directoryExists(domainDir))) {
    return [];
  }

  const entries = await fs.readdir(domainDir, { withFileTypes: true });

  const lessonPaths: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    // Verify the directory contains a meta.json to confirm it's a lesson
    const metaPath = path.join(domainDir, entry.name, "meta.json");
    try {
      await fs.access(metaPath);
      lessonPaths.push(path.join(domainId, entry.name));
    } catch {
      // Directory without meta.json is not a lesson — skip silently
    }
  }

  return lessonPaths.sort();
}

/**
 * Lists all domain directories in the content directory.
 *
 * @returns Array of domain directory names, e.g. ["numbers-operations", "algebra"]
 */
export async function listDomains(): Promise<string[]> {
  if (!(await directoryExists(CONTENT_DIR))) {
    return [];
  }

  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}
