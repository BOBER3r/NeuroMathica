// ---------------------------------------------------------------------------
// Achievement Engine — T074
// Evaluates student activity against achievement criteria and returns
// newly unlocked achievement IDs.
// ---------------------------------------------------------------------------

export interface AchievementCriteria {
  type: string;
  threshold?: number;
  conceptId?: string;
  domain?: string;
}

export interface AchievementDefinition {
  id: string;
  name: string;
  category: AchievementCategory;
  rarity: Rarity;
  criteria: AchievementCriteria;
}

export type AchievementCategory =
  | "exploration"
  | "mastery"
  | "creativity"
  | "persistence"
  | "collaboration"
  | "discovery";

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface StudentActivity {
  lessonsCompleted: number;
  totalXp: number;
  currentLevel: number;
  currentStreak: number;
  reflectionScores: number[];
  domainsExplored: string[];
  conceptsMastered: string[];
  connectionsMade: number;
  peerHelpConfirmations: number;
  challengeProblemsCompleted: number;
  realWorldSubmissions: number;
  whyQuestionsAsked: number;
  edgeCasesTested: number;
  explanationsRatedFive: number;
  longestStreak: number;
  streakRepairsUsed: number;
  revisedExplanations: number;
}

/**
 * Built-in achievement definitions based on the gamification design spec.
 * These cover all 6 categories with varying rarity levels.
 */
const ACHIEVEMENT_DEFINITIONS: readonly AchievementDefinition[] = [
  // ---- Exploration (Electric Blue) ----
  {
    id: "first_light",
    name: "First Light",
    category: "exploration",
    rarity: "common",
    criteria: { type: "lessons_completed", threshold: 1 },
  },
  {
    id: "cartographer",
    name: "Cartographer",
    category: "exploration",
    rarity: "common",
    criteria: { type: "domains_explored", threshold: 5 },
  },
  {
    id: "edge_walker",
    name: "Edge Walker",
    category: "exploration",
    rarity: "uncommon",
    criteria: { type: "edge_cases_tested", threshold: 10 },
  },
  {
    id: "dimension_hopper",
    name: "Dimension Hopper",
    category: "exploration",
    rarity: "uncommon",
    criteria: { type: "domains_explored", threshold: 3 },
  },
  {
    id: "the_questioner",
    name: "The Questioner",
    category: "exploration",
    rarity: "uncommon",
    criteria: { type: "why_questions_asked", threshold: 50 },
  },
  {
    id: "polymath",
    name: "Polymath",
    category: "exploration",
    rarity: "rare",
    criteria: { type: "domains_explored", threshold: 8 },
  },

  // ---- Mastery (Gold) ----
  {
    id: "solid_ground",
    name: "Solid Ground",
    category: "mastery",
    rarity: "common",
    criteria: { type: "concepts_mastered", threshold: 1 },
  },
  {
    id: "the_teacher",
    name: "The Teacher",
    category: "mastery",
    rarity: "uncommon",
    criteria: { type: "explanations_rated_five", threshold: 1 },
  },
  {
    id: "the_explainer",
    name: "The Explainer",
    category: "mastery",
    rarity: "epic",
    criteria: { type: "explanations_rated_five", threshold: 10 },
  },

  // ---- Creativity (Purple) ----
  {
    id: "pattern_hunter",
    name: "Pattern Hunter",
    category: "creativity",
    rarity: "uncommon",
    criteria: { type: "connections_made", threshold: 1 },
  },

  // ---- Persistence (Amber) ----
  {
    id: "second_wind",
    name: "Second Wind",
    category: "persistence",
    rarity: "common",
    criteria: { type: "challenge_problems_completed", threshold: 1 },
  },
  {
    id: "unbreakable",
    name: "Unbreakable",
    category: "persistence",
    rarity: "uncommon",
    criteria: { type: "longest_streak", threshold: 30 },
  },
  {
    id: "iron_pulse",
    name: "Iron Pulse",
    category: "persistence",
    rarity: "epic",
    criteria: { type: "longest_streak", threshold: 100 },
  },
  {
    id: "iteration_master",
    name: "Iteration Master",
    category: "persistence",
    rarity: "uncommon",
    criteria: { type: "revised_explanations", threshold: 3 },
  },

  // ---- Collaboration (Green) ----
  {
    id: "first_assist",
    name: "First Assist",
    category: "collaboration",
    rarity: "common",
    criteria: { type: "peer_help_confirmations", threshold: 1 },
  },
  {
    id: "peer_tutor",
    name: "Peer Tutor",
    category: "collaboration",
    rarity: "rare",
    criteria: { type: "peer_help_confirmations", threshold: 5 },
  },
  {
    id: "community_pillar",
    name: "Community Pillar",
    category: "collaboration",
    rarity: "epic",
    criteria: { type: "peer_help_confirmations", threshold: 20 },
  },

  // ---- Discovery (Cyan) ----
  {
    id: "eyes_open",
    name: "Eyes Open",
    category: "discovery",
    rarity: "common",
    criteria: { type: "real_world_submissions", threshold: 1 },
  },
  {
    id: "urban_geometer",
    name: "Urban Geometer",
    category: "discovery",
    rarity: "uncommon",
    criteria: { type: "real_world_submissions", threshold: 5 },
  },

  // ---- XP / Level milestones ----
  {
    id: "xp_1000",
    name: "Kiloelectron",
    category: "exploration",
    rarity: "common",
    criteria: { type: "total_xp", threshold: 1000 },
  },
  {
    id: "xp_10000",
    name: "Megavolt",
    category: "exploration",
    rarity: "rare",
    criteria: { type: "total_xp", threshold: 10000 },
  },
  {
    id: "level_10",
    name: "Signal Spark",
    category: "mastery",
    rarity: "common",
    criteria: { type: "current_level", threshold: 10 },
  },
  {
    id: "level_25",
    name: "Synapse Surge",
    category: "mastery",
    rarity: "uncommon",
    criteria: { type: "current_level", threshold: 25 },
  },
  {
    id: "level_50",
    name: "Network Node",
    category: "mastery",
    rarity: "rare",
    criteria: { type: "current_level", threshold: 50 },
  },
] as const;

/**
 * Returns the numeric value from StudentActivity corresponding to a criteria type.
 */
function getActivityValue(
  activity: StudentActivity,
  criteriaType: string,
): number {
  switch (criteriaType) {
    case "lessons_completed":
      return activity.lessonsCompleted;
    case "total_xp":
      return activity.totalXp;
    case "current_level":
      return activity.currentLevel;
    case "current_streak":
      return activity.currentStreak;
    case "longest_streak":
      return activity.longestStreak;
    case "domains_explored":
      return activity.domainsExplored.length;
    case "concepts_mastered":
      return activity.conceptsMastered.length;
    case "connections_made":
      return activity.connectionsMade;
    case "peer_help_confirmations":
      return activity.peerHelpConfirmations;
    case "challenge_problems_completed":
      return activity.challengeProblemsCompleted;
    case "real_world_submissions":
      return activity.realWorldSubmissions;
    case "why_questions_asked":
      return activity.whyQuestionsAsked;
    case "edge_cases_tested":
      return activity.edgeCasesTested;
    case "explanations_rated_five":
      return activity.explanationsRatedFive;
    case "revised_explanations":
      return activity.revisedExplanations;
    default:
      return 0;
  }
}

/**
 * Checks whether a single achievement's criteria are met.
 */
function isCriteriaMet(
  criteria: AchievementCriteria,
  activity: StudentActivity,
): boolean {
  const value = getActivityValue(activity, criteria.type);

  if (criteria.threshold !== undefined) {
    return value >= criteria.threshold;
  }

  // For criteria without a threshold, any positive value qualifies
  return value > 0;
}

/**
 * Evaluates all achievements against the student's activity and returns
 * an array of newly unlocked achievement IDs (those not already in
 * `unlockedIds`).
 */
export function evaluateAchievements(
  activity: StudentActivity,
  unlockedIds: string[],
): string[] {
  const alreadyUnlocked = new Set(unlockedIds);
  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENT_DEFINITIONS) {
    if (alreadyUnlocked.has(achievement.id)) {
      continue;
    }

    if (isCriteriaMet(achievement.criteria, activity)) {
      newlyUnlocked.push(achievement.id);
    }
  }

  return newlyUnlocked;
}

/**
 * Returns all achievement definitions. Useful for displaying the full
 * achievement catalog in the UI.
 */
export function getAllAchievements(): readonly AchievementDefinition[] {
  return ACHIEVEMENT_DEFINITIONS;
}
