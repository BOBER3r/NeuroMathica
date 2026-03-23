import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5435/neuromathica";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Domains
// ---------------------------------------------------------------------------

const domains = [
  { id: "numbers-operations", name: "Numbers & Operations", color: "#60a5fa", sortOrder: 0 },
  { id: "number-theory", name: "Number Theory", color: "#a78bfa", sortOrder: 1 },
  { id: "algebra", name: "Algebra", color: "#34d399", sortOrder: 2 },
  { id: "geometry", name: "Geometry", color: "#fbbf24", sortOrder: 3 },
  { id: "statistics-probability", name: "Statistics & Probability", color: "#fb7185", sortOrder: 4 },
];

// ---------------------------------------------------------------------------
// Concepts (72 topics across grades 6-8)
// ---------------------------------------------------------------------------

interface ConceptSeed {
  id: string;
  domainId: string;
  name: string;
  description: string;
  gradeLevel: number;
  sortOrder: number;
}

const concepts: ConceptSeed[] = [
  // ── Numbers & Operations (18) ──────────────────────────────────────────
  { id: "NO-1.1", domainId: "numbers-operations", name: "Place Value", description: "Understanding positional value in the base-10 number system", gradeLevel: 6, sortOrder: 0 },
  { id: "NO-1.2", domainId: "numbers-operations", name: "Integers", description: "Positive and negative whole numbers and the number line", gradeLevel: 6, sortOrder: 1 },
  { id: "NO-1.2a", domainId: "numbers-operations", name: "Integer Addition & Subtraction", description: "Adding and subtracting positive and negative integers", gradeLevel: 6, sortOrder: 2 },
  { id: "NO-1.2b", domainId: "numbers-operations", name: "Integer Multiplication & Division", description: "Multiplying and dividing positive and negative integers", gradeLevel: 6, sortOrder: 3 },
  { id: "NO-1.3", domainId: "numbers-operations", name: "Decimals", description: "Decimal representation, comparison, and basic operations", gradeLevel: 6, sortOrder: 4 },
  { id: "NO-1.4", domainId: "numbers-operations", name: "Fractions", description: "Understanding fractions as parts of a whole and on the number line", gradeLevel: 6, sortOrder: 5 },
  { id: "NO-1.4a", domainId: "numbers-operations", name: "Fraction Operations", description: "Adding, subtracting, multiplying, and dividing fractions", gradeLevel: 6, sortOrder: 6 },
  { id: "NO-1.5", domainId: "numbers-operations", name: "Ratios", description: "Comparing quantities using ratios and equivalent ratios", gradeLevel: 6, sortOrder: 7 },
  { id: "NO-1.5a", domainId: "numbers-operations", name: "Proportions", description: "Solving proportional relationships and cross-multiplication", gradeLevel: 7, sortOrder: 8 },
  { id: "NO-1.6", domainId: "numbers-operations", name: "Percents", description: "Understanding percents as ratios out of 100", gradeLevel: 7, sortOrder: 9 },
  { id: "NO-1.6a", domainId: "numbers-operations", name: "Percent Applications", description: "Discounts, tax, tips, interest, and percent change", gradeLevel: 7, sortOrder: 10 },
  { id: "NO-1.7", domainId: "numbers-operations", name: "Rational Numbers", description: "Numbers that can be expressed as a fraction of two integers", gradeLevel: 7, sortOrder: 11 },
  { id: "NO-1.7a", domainId: "numbers-operations", name: "Rational Number Operations", description: "Arithmetic operations with rational numbers including negatives", gradeLevel: 7, sortOrder: 12 },
  { id: "NO-1.8", domainId: "numbers-operations", name: "Irrational Numbers", description: "Numbers that cannot be expressed as a fraction, such as pi and sqrt(2)", gradeLevel: 8, sortOrder: 13 },
  { id: "NO-1.8a", domainId: "numbers-operations", name: "Square Roots", description: "Finding and estimating square roots of perfect and non-perfect squares", gradeLevel: 8, sortOrder: 14 },
  { id: "NO-1.9", domainId: "numbers-operations", name: "Scientific Notation", description: "Expressing very large or very small numbers compactly", gradeLevel: 8, sortOrder: 15 },
  { id: "NO-1.9a", domainId: "numbers-operations", name: "Scientific Notation Operations", description: "Arithmetic operations with numbers in scientific notation", gradeLevel: 8, sortOrder: 16 },
  { id: "NO-1.10", domainId: "numbers-operations", name: "Real Number System", description: "Classification and relationships among number sets (N, Z, Q, R)", gradeLevel: 8, sortOrder: 17 },

  // ── Number Theory (7) ──────────────────────────────────────────────────
  { id: "NT-2.1", domainId: "number-theory", name: "Factors & Multiples", description: "Finding factors, multiples, and divisibility rules", gradeLevel: 6, sortOrder: 0 },
  { id: "NT-2.2", domainId: "number-theory", name: "Prime Numbers", description: "Identifying primes, composites, and prime factorization", gradeLevel: 6, sortOrder: 1 },
  { id: "NT-2.3", domainId: "number-theory", name: "GCF & LCM", description: "Greatest Common Factor and Least Common Multiple", gradeLevel: 6, sortOrder: 2 },
  { id: "NT-2.4", domainId: "number-theory", name: "Exponents", description: "Repeated multiplication and powers of numbers", gradeLevel: 6, sortOrder: 3 },
  { id: "NT-2.4a", domainId: "number-theory", name: "Exponent Rules", description: "Product, quotient, power, and zero/negative exponent rules", gradeLevel: 8, sortOrder: 4 },
  { id: "NT-2.5", domainId: "number-theory", name: "Order of Operations", description: "Evaluating expressions using PEMDAS/BODMAS conventions", gradeLevel: 6, sortOrder: 5 },
  { id: "NT-2.6", domainId: "number-theory", name: "Number Patterns", description: "Identifying and extending arithmetic and geometric patterns", gradeLevel: 6, sortOrder: 6 },

  // ── Algebra (18) ───────────────────────────────────────────────────────
  { id: "AL-3.1", domainId: "algebra", name: "Variables & Expressions", description: "Using letters to represent unknowns and writing algebraic expressions", gradeLevel: 6, sortOrder: 0 },
  { id: "AL-3.2", domainId: "algebra", name: "One-Step Equations", description: "Solving equations requiring a single inverse operation", gradeLevel: 6, sortOrder: 1 },
  { id: "AL-3.3", domainId: "algebra", name: "Two-Step Equations", description: "Solving equations requiring two inverse operations", gradeLevel: 7, sortOrder: 2 },
  { id: "AL-3.4", domainId: "algebra", name: "Multi-Step Equations", description: "Solving equations with variables on both sides and distribution", gradeLevel: 7, sortOrder: 3 },
  { id: "AL-3.5", domainId: "algebra", name: "Inequalities", description: "Solving and graphing one- and two-step inequalities", gradeLevel: 7, sortOrder: 4 },
  { id: "AL-3.6", domainId: "algebra", name: "Coordinate Plane", description: "Plotting points and understanding the four-quadrant plane", gradeLevel: 6, sortOrder: 5 },
  { id: "AL-3.7", domainId: "algebra", name: "Functions", description: "Understanding input-output relationships and function concepts", gradeLevel: 8, sortOrder: 6 },
  { id: "AL-3.7a", domainId: "algebra", name: "Function Notation", description: "Reading and using f(x) notation to evaluate functions", gradeLevel: 8, sortOrder: 7 },
  { id: "AL-3.8", domainId: "algebra", name: "Linear Equations", description: "Equations whose graphs are straight lines", gradeLevel: 8, sortOrder: 8 },
  { id: "AL-3.8a", domainId: "algebra", name: "Slope", description: "Rate of change and steepness of a line", gradeLevel: 8, sortOrder: 9 },
  { id: "AL-3.8b", domainId: "algebra", name: "Slope-Intercept Form", description: "Writing and interpreting y = mx + b", gradeLevel: 8, sortOrder: 10 },
  { id: "AL-3.9", domainId: "algebra", name: "Systems of Equations", description: "Solving pairs of linear equations by graphing, substitution, or elimination", gradeLevel: 8, sortOrder: 11 },
  { id: "AL-3.10", domainId: "algebra", name: "Polynomials", description: "Expressions with multiple terms involving variables and exponents", gradeLevel: 8, sortOrder: 12 },
  { id: "AL-3.10a", domainId: "algebra", name: "Polynomial Operations", description: "Adding, subtracting, and multiplying polynomials", gradeLevel: 8, sortOrder: 13 },
  { id: "AL-3.11", domainId: "algebra", name: "Factoring", description: "Breaking polynomials into products of simpler expressions", gradeLevel: 8, sortOrder: 14 },
  { id: "AL-3.12", domainId: "algebra", name: "Quadratic Equations", description: "Solving equations of the form ax^2 + bx + c = 0", gradeLevel: 8, sortOrder: 15 },
  { id: "AL-3.13", domainId: "algebra", name: "Sequences", description: "Arithmetic and geometric sequences and their rules", gradeLevel: 7, sortOrder: 16 },
  { id: "AL-3.14", domainId: "algebra", name: "Direct & Inverse Variation", description: "Relationships where y = kx or y = k/x", gradeLevel: 7, sortOrder: 17 },

  // ── Geometry (19) ──────────────────────────────────────────────────────
  { id: "GE-4.1", domainId: "geometry", name: "Angles", description: "Types, measurement, and classification of angles", gradeLevel: 6, sortOrder: 0 },
  { id: "GE-4.1a", domainId: "geometry", name: "Angle Relationships", description: "Complementary, supplementary, vertical, and adjacent angles", gradeLevel: 7, sortOrder: 1 },
  { id: "GE-4.2", domainId: "geometry", name: "Triangles", description: "Classification by sides and angles, angle sum property", gradeLevel: 7, sortOrder: 2 },
  { id: "GE-4.2a", domainId: "geometry", name: "Triangle Properties", description: "Medians, altitudes, exterior angles, and triangle inequality", gradeLevel: 7, sortOrder: 3 },
  { id: "GE-4.3", domainId: "geometry", name: "Pythagorean Theorem", description: "Relationship between sides of a right triangle: a^2 + b^2 = c^2", gradeLevel: 8, sortOrder: 4 },
  { id: "GE-4.3a", domainId: "geometry", name: "Pythagorean Applications", description: "Distance, 3D diagonals, and real-world uses of the Pythagorean Theorem", gradeLevel: 8, sortOrder: 5 },
  { id: "GE-4.4", domainId: "geometry", name: "Quadrilaterals", description: "Properties of parallelograms, rectangles, rhombi, and trapezoids", gradeLevel: 6, sortOrder: 6 },
  { id: "GE-4.5", domainId: "geometry", name: "Circles", description: "Radius, diameter, circumference, and basic circle vocabulary", gradeLevel: 7, sortOrder: 7 },
  { id: "GE-4.5a", domainId: "geometry", name: "Circle Measurements", description: "Calculating circumference and area of circles using pi", gradeLevel: 7, sortOrder: 8 },
  { id: "GE-4.6", domainId: "geometry", name: "Area & Perimeter", description: "Calculating area and perimeter of common polygons", gradeLevel: 6, sortOrder: 9 },
  { id: "GE-4.6a", domainId: "geometry", name: "Composite Figures", description: "Finding area and perimeter of shapes made from simpler figures", gradeLevel: 7, sortOrder: 10 },
  { id: "GE-4.7", domainId: "geometry", name: "Volume", description: "Calculating volume of prisms, cylinders, cones, and spheres", gradeLevel: 8, sortOrder: 11 },
  { id: "GE-4.7a", domainId: "geometry", name: "Surface Area", description: "Calculating surface area of 3D solids", gradeLevel: 8, sortOrder: 12 },
  { id: "GE-4.8", domainId: "geometry", name: "Cross-Sections", description: "Identifying shapes formed by slicing 3D solids with a plane", gradeLevel: 8, sortOrder: 13 },
  { id: "GE-4.9", domainId: "geometry", name: "Transformations", description: "Translations, reflections, rotations, and dilations", gradeLevel: 8, sortOrder: 14 },
  { id: "GE-4.9a", domainId: "geometry", name: "Congruence", description: "Identifying congruent figures through rigid transformations", gradeLevel: 8, sortOrder: 15 },
  { id: "GE-4.9b", domainId: "geometry", name: "Similarity", description: "Similar figures, scale factor, and dilations", gradeLevel: 8, sortOrder: 16 },
  { id: "GE-4.10", domainId: "geometry", name: "Coordinate Geometry", description: "Midpoint, distance formula, and geometric proofs on the plane", gradeLevel: 8, sortOrder: 17 },
  { id: "GE-4.11", domainId: "geometry", name: "Constructions", description: "Compass and straightedge constructions of basic geometric figures", gradeLevel: 7, sortOrder: 18 },

  // ── Statistics & Probability (10) ──────────────────────────────────────
  { id: "SP-5.1", domainId: "statistics-probability", name: "Mean, Median, Mode", description: "Measures of central tendency for data sets", gradeLevel: 6, sortOrder: 0 },
  { id: "SP-5.2", domainId: "statistics-probability", name: "Data Displays", description: "Bar graphs, histograms, line plots, and circle graphs", gradeLevel: 6, sortOrder: 1 },
  { id: "SP-5.3", domainId: "statistics-probability", name: "Box Plots", description: "Five-number summary and box-and-whisker plots", gradeLevel: 6, sortOrder: 2 },
  { id: "SP-5.4", domainId: "statistics-probability", name: "Probability Basics", description: "Theoretical and experimental probability of simple events", gradeLevel: 7, sortOrder: 3 },
  { id: "SP-5.4a", domainId: "statistics-probability", name: "Compound Probability", description: "Probability of independent and dependent compound events", gradeLevel: 7, sortOrder: 4 },
  { id: "SP-5.5", domainId: "statistics-probability", name: "Sampling", description: "Random sampling, bias, and making inferences about populations", gradeLevel: 7, sortOrder: 5 },
  { id: "SP-5.6", domainId: "statistics-probability", name: "Scatter Plots", description: "Plotting bivariate data and identifying trends", gradeLevel: 8, sortOrder: 6 },
  { id: "SP-5.6a", domainId: "statistics-probability", name: "Line of Best Fit", description: "Drawing and interpreting trend lines for scatter plots", gradeLevel: 8, sortOrder: 7 },
  { id: "SP-5.7", domainId: "statistics-probability", name: "Two-Way Tables", description: "Organizing and analyzing categorical data in two-way frequency tables", gradeLevel: 8, sortOrder: 8 },
  { id: "SP-5.8", domainId: "statistics-probability", name: "Statistical Reasoning", description: "Drawing conclusions, evaluating claims, and understanding variability", gradeLevel: 8, sortOrder: 9 },
];

// ---------------------------------------------------------------------------
// Prerequisite relationships (dependency graph)
// ---------------------------------------------------------------------------

interface PrerequisiteSeed {
  conceptId: string;
  prerequisiteId: string;
  strength?: number;
}

const prerequisites: PrerequisiteSeed[] = [
  // ── Numbers & Operations chains ────────────────────────────────────────
  { conceptId: "NO-1.2", prerequisiteId: "NO-1.1" },
  { conceptId: "NO-1.2a", prerequisiteId: "NO-1.2" },
  { conceptId: "NO-1.2b", prerequisiteId: "NO-1.2a" },
  { conceptId: "NO-1.3", prerequisiteId: "NO-1.1" },
  { conceptId: "NO-1.4", prerequisiteId: "NO-1.1" },
  { conceptId: "NO-1.4a", prerequisiteId: "NO-1.4" },
  { conceptId: "NO-1.5", prerequisiteId: "NO-1.4a" },
  { conceptId: "NO-1.5a", prerequisiteId: "NO-1.5" },
  { conceptId: "NO-1.6", prerequisiteId: "NO-1.5" },
  { conceptId: "NO-1.6", prerequisiteId: "NO-1.3" },
  { conceptId: "NO-1.6a", prerequisiteId: "NO-1.6" },
  { conceptId: "NO-1.7", prerequisiteId: "NO-1.4a" },
  { conceptId: "NO-1.7", prerequisiteId: "NO-1.2b" },
  { conceptId: "NO-1.7", prerequisiteId: "NO-1.3" },
  { conceptId: "NO-1.7a", prerequisiteId: "NO-1.7" },
  { conceptId: "NO-1.8", prerequisiteId: "NO-1.7" },
  { conceptId: "NO-1.8a", prerequisiteId: "NO-1.8" },
  { conceptId: "NO-1.9", prerequisiteId: "NO-1.3" },
  { conceptId: "NO-1.9", prerequisiteId: "NT-2.4" },
  { conceptId: "NO-1.9a", prerequisiteId: "NO-1.9" },
  { conceptId: "NO-1.10", prerequisiteId: "NO-1.7" },
  { conceptId: "NO-1.10", prerequisiteId: "NO-1.8" },

  // ── Number Theory chains ───────────────────────────────────────────────
  { conceptId: "NT-2.2", prerequisiteId: "NT-2.1" },
  { conceptId: "NT-2.3", prerequisiteId: "NT-2.1" },
  { conceptId: "NT-2.3", prerequisiteId: "NT-2.2" },
  { conceptId: "NT-2.4", prerequisiteId: "NO-1.2b", strength: 0.7 },
  { conceptId: "NT-2.4a", prerequisiteId: "NT-2.4" },
  { conceptId: "NT-2.5", prerequisiteId: "NT-2.4" },
  { conceptId: "NT-2.6", prerequisiteId: "NO-1.2a" },

  // ── Algebra chains ─────────────────────────────────────────────────────
  { conceptId: "AL-3.1", prerequisiteId: "NO-1.1" },
  { conceptId: "AL-3.1", prerequisiteId: "NT-2.5" },
  { conceptId: "AL-3.2", prerequisiteId: "AL-3.1" },
  { conceptId: "AL-3.3", prerequisiteId: "AL-3.2" },
  { conceptId: "AL-3.4", prerequisiteId: "AL-3.3" },
  { conceptId: "AL-3.5", prerequisiteId: "AL-3.3" },
  { conceptId: "AL-3.6", prerequisiteId: "NO-1.2" },
  { conceptId: "AL-3.7", prerequisiteId: "AL-3.6" },
  { conceptId: "AL-3.7", prerequisiteId: "AL-3.4" },
  { conceptId: "AL-3.7a", prerequisiteId: "AL-3.7" },
  { conceptId: "AL-3.8", prerequisiteId: "AL-3.6" },
  { conceptId: "AL-3.8", prerequisiteId: "AL-3.7" },
  { conceptId: "AL-3.8a", prerequisiteId: "AL-3.8" },
  { conceptId: "AL-3.8b", prerequisiteId: "AL-3.8a" },
  { conceptId: "AL-3.9", prerequisiteId: "AL-3.8b" },
  { conceptId: "AL-3.10", prerequisiteId: "AL-3.1" },
  { conceptId: "AL-3.10", prerequisiteId: "NT-2.4a" },
  { conceptId: "AL-3.10a", prerequisiteId: "AL-3.10" },
  { conceptId: "AL-3.11", prerequisiteId: "AL-3.10a" },
  { conceptId: "AL-3.11", prerequisiteId: "NT-2.3", strength: 0.5 },
  { conceptId: "AL-3.12", prerequisiteId: "AL-3.11" },
  { conceptId: "AL-3.12", prerequisiteId: "NO-1.8a" },
  { conceptId: "AL-3.13", prerequisiteId: "NT-2.6" },
  { conceptId: "AL-3.13", prerequisiteId: "AL-3.1" },
  { conceptId: "AL-3.14", prerequisiteId: "NO-1.5a" },
  { conceptId: "AL-3.14", prerequisiteId: "AL-3.7" },

  // ── Geometry chains ────────────────────────────────────────────────────
  { conceptId: "GE-4.1a", prerequisiteId: "GE-4.1" },
  { conceptId: "GE-4.2", prerequisiteId: "GE-4.1a" },
  { conceptId: "GE-4.2a", prerequisiteId: "GE-4.2" },
  { conceptId: "GE-4.3", prerequisiteId: "GE-4.2" },
  { conceptId: "GE-4.3", prerequisiteId: "AL-3.8a", strength: 0.6 },
  { conceptId: "GE-4.3a", prerequisiteId: "GE-4.3" },
  { conceptId: "GE-4.3a", prerequisiteId: "NO-1.8a" },
  { conceptId: "GE-4.5", prerequisiteId: "GE-4.1" },
  { conceptId: "GE-4.5a", prerequisiteId: "GE-4.5" },
  { conceptId: "GE-4.6", prerequisiteId: "GE-4.4" },
  { conceptId: "GE-4.6", prerequisiteId: "GE-4.1" },
  { conceptId: "GE-4.6a", prerequisiteId: "GE-4.6" },
  { conceptId: "GE-4.6a", prerequisiteId: "GE-4.5a" },
  { conceptId: "GE-4.7", prerequisiteId: "GE-4.6" },
  { conceptId: "GE-4.7a", prerequisiteId: "GE-4.7" },
  { conceptId: "GE-4.8", prerequisiteId: "GE-4.7" },
  { conceptId: "GE-4.9", prerequisiteId: "AL-3.6" },
  { conceptId: "GE-4.9", prerequisiteId: "GE-4.1a" },
  { conceptId: "GE-4.9a", prerequisiteId: "GE-4.9" },
  { conceptId: "GE-4.9a", prerequisiteId: "GE-4.2a" },
  { conceptId: "GE-4.9b", prerequisiteId: "GE-4.9a" },
  { conceptId: "GE-4.9b", prerequisiteId: "NO-1.5a" },
  { conceptId: "GE-4.10", prerequisiteId: "AL-3.8b" },
  { conceptId: "GE-4.10", prerequisiteId: "GE-4.3" },
  { conceptId: "GE-4.11", prerequisiteId: "GE-4.1a" },

  // ── Statistics & Probability chains ────────────────────────────────────
  { conceptId: "SP-5.1", prerequisiteId: "NO-1.3" },
  { conceptId: "SP-5.1", prerequisiteId: "NO-1.4a", strength: 0.5 },
  { conceptId: "SP-5.2", prerequisiteId: "SP-5.1" },
  { conceptId: "SP-5.3", prerequisiteId: "SP-5.1" },
  { conceptId: "SP-5.4", prerequisiteId: "NO-1.6" },
  { conceptId: "SP-5.4a", prerequisiteId: "SP-5.4" },
  { conceptId: "SP-5.5", prerequisiteId: "SP-5.4" },
  { conceptId: "SP-5.5", prerequisiteId: "NO-1.6a" },
  { conceptId: "SP-5.6", prerequisiteId: "AL-3.6" },
  { conceptId: "SP-5.6", prerequisiteId: "SP-5.2" },
  { conceptId: "SP-5.6a", prerequisiteId: "SP-5.6" },
  { conceptId: "SP-5.6a", prerequisiteId: "AL-3.8a" },
  { conceptId: "SP-5.7", prerequisiteId: "SP-5.4a" },
  { conceptId: "SP-5.7", prerequisiteId: "NO-1.6" },
  { conceptId: "SP-5.8", prerequisiteId: "SP-5.5" },
  { conceptId: "SP-5.8", prerequisiteId: "SP-5.6a" },
];

// ---------------------------------------------------------------------------
// Achievement definitions
// ---------------------------------------------------------------------------

interface AchievementSeed {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: string;
  xpReward: number;
  neuronReward: number;
  criteria: Record<string, string | number | boolean>;
  isHidden?: boolean;
}

const achievements: AchievementSeed[] = [
  {
    id: "first-light",
    name: "First Light",
    description: "Complete your very first lesson",
    category: "exploration",
    rarity: "common",
    xpReward: 50,
    neuronReward: 10,
    criteria: { type: "lessons_completed", threshold: 1 },
  },
  {
    id: "curious-mind",
    name: "Curious Mind",
    description: "Complete 5 lessons",
    category: "exploration",
    rarity: "common",
    xpReward: 100,
    neuronReward: 25,
    criteria: { type: "lessons_completed", threshold: 5 },
  },
  {
    id: "deep-thinker",
    name: "Deep Thinker",
    description: "Score 5/5 on a reflection prompt",
    category: "mastery",
    rarity: "uncommon",
    xpReward: 200,
    neuronReward: 50,
    criteria: { type: "reflection_perfect_score", threshold: 5 },
  },
  {
    id: "streak-starter",
    name: "Streak Starter",
    description: "Maintain a 3-day learning streak",
    category: "persistence",
    rarity: "common",
    xpReward: 75,
    neuronReward: 15,
    criteria: { type: "streak_days", threshold: 3 },
  },
  {
    id: "streak-keeper",
    name: "Streak Keeper",
    description: "Maintain a 7-day learning streak",
    category: "persistence",
    rarity: "uncommon",
    xpReward: 150,
    neuronReward: 40,
    criteria: { type: "streak_days", threshold: 7 },
  },
  {
    id: "domain-explorer",
    name: "Domain Explorer",
    description: "Complete at least one topic in each domain",
    category: "exploration",
    rarity: "rare",
    xpReward: 300,
    neuronReward: 100,
    criteria: { type: "domains_with_completion", threshold: 5 },
  },
  {
    id: "connection-maker",
    name: "Connection Maker",
    description: "Reference a prior concept in a reflection response",
    category: "discovery",
    rarity: "uncommon",
    xpReward: 150,
    neuronReward: 35,
    criteria: { type: "cross_concept_reference", threshold: 1 },
  },
  {
    id: "pythagorean-explorer",
    name: "Pythagorean Explorer",
    description: "Complete the Pythagorean Theorem lesson with maximum interaction",
    category: "discovery",
    rarity: "rare",
    xpReward: 250,
    neuronReward: 75,
    criteria: { type: "concept_max_interaction", conceptId: "GE-4.3" },
  },
  {
    id: "number-ninja",
    name: "Number Ninja",
    description: "Master all Numbers & Operations topics",
    category: "mastery",
    rarity: "epic",
    xpReward: 500,
    neuronReward: 200,
    criteria: { type: "domain_mastery", domainId: "numbers-operations" },
  },
  {
    id: "math-architect",
    name: "Math Architect",
    description: "Reach level 50",
    category: "mastery",
    rarity: "legendary",
    xpReward: 1000,
    neuronReward: 500,
    criteria: { type: "level_reached", threshold: 50 },
  },
  {
    id: "algebra-ace",
    name: "Algebra Ace",
    description: "Master all Algebra topics",
    category: "mastery",
    rarity: "epic",
    xpReward: 500,
    neuronReward: 200,
    criteria: { type: "domain_mastery", domainId: "algebra" },
  },
  {
    id: "geometry-guru",
    name: "Geometry Guru",
    description: "Master all Geometry topics",
    category: "mastery",
    rarity: "epic",
    xpReward: 500,
    neuronReward: 200,
    criteria: { type: "domain_mastery", domainId: "geometry" },
  },
  {
    id: "perfect-session",
    name: "Perfect Session",
    description: "Complete a practice session with 100% accuracy",
    category: "mastery",
    rarity: "uncommon",
    xpReward: 150,
    neuronReward: 30,
    criteria: { type: "session_perfect", threshold: 1 },
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Complete a lesson after 10 PM",
    category: "discovery",
    rarity: "common",
    xpReward: 50,
    neuronReward: 10,
    criteria: { type: "time_of_day", afterHour: 22 },
    isHidden: true,
  },
  {
    id: "marathon-learner",
    name: "Marathon Learner",
    description: "Maintain a 30-day learning streak",
    category: "persistence",
    rarity: "epic",
    xpReward: 400,
    neuronReward: 150,
    criteria: { type: "streak_days", threshold: 30 },
  },
];

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log("🌱 Seeding NeuroMathica database...\n");

  // ── Domains ──────────────────────────────────────────────────────────
  console.log("  Seeding domains...");
  for (const domain of domains) {
    await prisma.domain.upsert({
      where: { id: domain.id },
      update: { name: domain.name, color: domain.color, sortOrder: domain.sortOrder },
      create: domain,
    });
  }
  console.log(`  ✓ ${domains.length} domains upserted`);

  // ── Concepts ─────────────────────────────────────────────────────────
  console.log("  Seeding concepts...");
  for (const concept of concepts) {
    await prisma.concept.upsert({
      where: { id: concept.id },
      update: {
        domainId: concept.domainId,
        name: concept.name,
        description: concept.description,
        gradeLevel: concept.gradeLevel,
        sortOrder: concept.sortOrder,
        contentPath: `${concept.domainId}/${concept.id}`,
      },
      create: {
        id: concept.id,
        domainId: concept.domainId,
        name: concept.name,
        description: concept.description,
        gradeLevel: concept.gradeLevel,
        sortOrder: concept.sortOrder,
        contentPath: `${concept.domainId}/${concept.id}`,
      },
    });
  }
  console.log(`  ✓ ${concepts.length} concepts upserted`);

  // ── Prerequisites ────────────────────────────────────────────────────
  console.log("  Seeding prerequisite relationships...");
  for (const prereq of prerequisites) {
    await prisma.conceptPrerequisite.upsert({
      where: {
        conceptId_prerequisiteId: {
          conceptId: prereq.conceptId,
          prerequisiteId: prereq.prerequisiteId,
        },
      },
      update: { strength: prereq.strength ?? 1.0 },
      create: {
        conceptId: prereq.conceptId,
        prerequisiteId: prereq.prerequisiteId,
        strength: prereq.strength ?? 1.0,
      },
    });
  }
  console.log(`  ✓ ${prerequisites.length} prerequisite relationships upserted`);

  // ── Achievements ─────────────────────────────────────────────────────
  console.log("  Seeding achievement definitions...");
  for (const achievement of achievements) {
    await prisma.achievementDefinition.upsert({
      where: { id: achievement.id },
      update: {
        name: achievement.name,
        description: achievement.description,
        category: achievement.category,
        rarity: achievement.rarity,
        xpReward: achievement.xpReward,
        neuronReward: achievement.neuronReward,
        criteria: achievement.criteria,
        isHidden: achievement.isHidden ?? false,
      },
      create: {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        category: achievement.category,
        rarity: achievement.rarity,
        xpReward: achievement.xpReward,
        neuronReward: achievement.neuronReward,
        criteria: achievement.criteria,
        isHidden: achievement.isHidden ?? false,
      },
    });
  }
  console.log(`  ✓ ${achievements.length} achievement definitions upserted`);

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((error: unknown) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
