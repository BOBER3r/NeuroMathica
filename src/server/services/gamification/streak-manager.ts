// ---------------------------------------------------------------------------
// Streak Manager — T073
// Neural Pulse streak system with 5-layer protection.
// Humane, not punitive — streak decay not death, break mode, shields.
// ---------------------------------------------------------------------------

export interface StreakInput {
  currentStreak: number;
  longestStreak: number;
  streakMode: "daily" | "weekday" | "custom";
  /** Scheduled active days: 0 = Sunday through 6 = Saturday */
  scheduledDays: number[];
  shieldsAvailable: number;
  lastActiveDate: Date | null;
  /** Floor below which streak decay cannot reduce the streak */
  streakDecayFloor: number;
  isOnBreak: boolean;
  breakEndDate: Date | null;
  repairsUsedThisMonth: number;
}

export interface StreakUpdate {
  newStreak: number;
  longestStreak: number;
  shieldsAvailable: number;
  streakDecayFloor: number;
  isOnBreak: boolean;
  shieldUsed: boolean;
  repairUsed: boolean;
  message: string;
}

const MAX_SHIELDS = 3;
const SHIELD_EARN_INTERVAL = 7;
const MAX_REPAIRS_PER_MONTH = 2;

/**
 * Returns whether a given date falls on a scheduled activity day.
 *
 * - "daily": every day is scheduled
 * - "weekday": Monday (1) through Friday (5)
 * - "custom": only the days in `scheduledDays`
 */
export function isScheduledDay(
  date: Date,
  mode: string,
  scheduledDays: number[],
): boolean {
  const dayOfWeek = date.getDay(); // 0 = Sunday

  switch (mode) {
    case "daily":
      return true;
    case "weekday":
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    case "custom":
      return scheduledDays.includes(dayOfWeek);
    default:
      return true;
  }
}

/**
 * Calculates the number of calendar days between two dates (ignoring time).
 * Returns a non-negative integer.
 */
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const aDay = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bDay = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round(Math.abs(aDay.getTime() - bDay.getTime()) / msPerDay);
}

/**
 * Counts how many scheduled days were missed between lastActive and today
 * (exclusive of both endpoints).
 */
function countMissedScheduledDays(
  lastActive: Date,
  today: Date,
  mode: string,
  scheduledDays: number[],
): number {
  let missed = 0;
  const current = new Date(lastActive);
  current.setDate(current.getDate() + 1);

  const todayNorm = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  while (current < todayNorm) {
    if (isScheduledDay(current, mode, scheduledDays)) {
      missed++;
    }
    current.setDate(current.getDate() + 1);
  }

  return missed;
}

/**
 * Processes a streak day: determines whether the streak is maintained, shielded,
 * decayed, or repaired.
 *
 * Implements the 5-layer protection system:
 * 1. Weekend/non-scheduled day grace
 * 2. Streak shields (auto-consume on missed day, max 3)
 * 3. Repair window (within 24h of break, max 2 per month)
 * 4. Decay not death (streak reduces by 50%, never resets to 0)
 * 5. Break mode (planned breaks freeze the streak)
 */
export function processStreakDay(
  input: StreakInput,
  today: Date,
): StreakUpdate {
  const {
    currentStreak,
    longestStreak,
    streakMode,
    scheduledDays,
    shieldsAvailable,
    lastActiveDate,
    streakDecayFloor,
    isOnBreak,
    breakEndDate,
    repairsUsedThisMonth,
  } = input;

  // Layer 5: Break mode — streak is frozen
  if (isOnBreak) {
    if (breakEndDate && today > breakEndDate) {
      // Break has ended, welcome back
      return {
        newStreak: currentStreak,
        longestStreak,
        shieldsAvailable,
        streakDecayFloor,
        isOnBreak: false,
        shieldUsed: false,
        repairUsed: false,
        message: "Welcome back! Your streak is right where you left it.",
      };
    }
    return {
      newStreak: currentStreak,
      longestStreak,
      shieldsAvailable,
      streakDecayFloor,
      isOnBreak: true,
      shieldUsed: false,
      repairUsed: false,
      message: "You're on break. Your streak is safely frozen.",
    };
  }

  // First ever activity
  if (lastActiveDate === null) {
    const newStreak = 1;
    return {
      newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      shieldsAvailable,
      streakDecayFloor: 0,
      isOnBreak: false,
      shieldUsed: false,
      repairUsed: false,
      message: "Your Neural Pulse has started!",
    };
  }

  const gapDays = daysBetween(lastActiveDate, today);

  // Same day — streak already counted
  if (gapDays === 0) {
    return {
      newStreak: currentStreak,
      longestStreak,
      shieldsAvailable,
      streakDecayFloor,
      isOnBreak: false,
      shieldUsed: false,
      repairUsed: false,
      message: "Keep it up! You've already logged activity today.",
    };
  }

  // Consecutive day (gap = 1) — check if today is scheduled
  if (gapDays === 1) {
    // Layer 1: If yesterday was not a scheduled day and today is, streak continues
    // If today is scheduled, increment
    if (isScheduledDay(today, streakMode, scheduledDays)) {
      const newStreak = currentStreak + 1;
      const newFloor = Math.max(
        streakDecayFloor,
        Math.floor(newStreak * 0.5),
      );
      return {
        newStreak,
        longestStreak: Math.max(longestStreak, newStreak),
        shieldsAvailable,
        streakDecayFloor: newFloor,
        isOnBreak: false,
        shieldUsed: false,
        repairUsed: false,
        message: `Day ${newStreak}! Your Neural Pulse grows stronger.`,
      };
    }

    // Today is not a scheduled day — streak holds without increment
    return {
      newStreak: currentStreak,
      longestStreak,
      shieldsAvailable,
      streakDecayFloor,
      isOnBreak: false,
      shieldUsed: false,
      repairUsed: false,
      message: "Not a scheduled day — your streak is safe.",
    };
  }

  // Gap > 1 day — check how many scheduled days were missed
  const missedScheduled = countMissedScheduledDays(
    lastActiveDate,
    today,
    streakMode,
    scheduledDays,
  );

  // Layer 1: No scheduled days missed — streak continues
  if (missedScheduled === 0) {
    if (isScheduledDay(today, streakMode, scheduledDays)) {
      const newStreak = currentStreak + 1;
      const newFloor = Math.max(
        streakDecayFloor,
        Math.floor(newStreak * 0.5),
      );
      return {
        newStreak,
        longestStreak: Math.max(longestStreak, newStreak),
        shieldsAvailable,
        streakDecayFloor: newFloor,
        isOnBreak: false,
        shieldUsed: false,
        repairUsed: false,
        message: `Day ${newStreak}! Your Neural Pulse grows stronger.`,
      };
    }
    return {
      newStreak: currentStreak,
      longestStreak,
      shieldsAvailable,
      streakDecayFloor,
      isOnBreak: false,
      shieldUsed: false,
      repairUsed: false,
      message: "Not a scheduled day — your streak is safe.",
    };
  }

  // Layer 2: Streak shields — auto-consume for missed scheduled days
  if (missedScheduled <= shieldsAvailable) {
    const remainingShields = shieldsAvailable - missedScheduled;
    const newStreak = isScheduledDay(today, streakMode, scheduledDays)
      ? currentStreak + 1
      : currentStreak;
    return {
      newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      shieldsAvailable: remainingShields,
      streakDecayFloor,
      isOnBreak: false,
      shieldUsed: true,
      repairUsed: false,
      message: `Shield activated! ${missedScheduled} shield${missedScheduled > 1 ? "s" : ""} used. ${remainingShields} remaining.`,
    };
  }

  // Layer 3: Repair window — within 24h of the break, max 2 per month
  if (gapDays <= 2 && repairsUsedThisMonth < MAX_REPAIRS_PER_MONTH) {
    const newStreak = currentStreak;
    return {
      newStreak,
      longestStreak,
      shieldsAvailable,
      streakDecayFloor,
      isOnBreak: false,
      shieldUsed: false,
      repairUsed: true,
      message:
        "Streak repaired! A small crack shows your resilience. " +
        `${MAX_REPAIRS_PER_MONTH - repairsUsedThisMonth - 1} repair${MAX_REPAIRS_PER_MONTH - repairsUsedThisMonth - 1 !== 1 ? "s" : ""} left this month.`,
    };
  }

  // Layer 4: Decay not death — streak reduces by 50%, never below floor
  const decayedStreak = Math.max(
    streakDecayFloor,
    Math.ceil(currentStreak * 0.5),
  );
  const newStreak = isScheduledDay(today, streakMode, scheduledDays)
    ? decayedStreak + 1
    : decayedStreak;

  return {
    newStreak,
    longestStreak,
    shieldsAvailable,
    streakDecayFloor,
    isOnBreak: false,
    shieldUsed: false,
    repairUsed: false,
    message: `Your streak cooled to ${decayedStreak}, but it's not gone! Keep going to rebuild.`,
  };
}

/**
 * Determines whether a shield is earned based on streak length.
 * One shield is earned every 7 streak days, up to a maximum of 3.
 *
 * Returns the new shield count.
 */
export function earnShield(
  currentShields: number,
  streakDays: number,
): number {
  if (streakDays > 0 && streakDays % SHIELD_EARN_INTERVAL === 0) {
    return Math.min(MAX_SHIELDS, currentShields + 1);
  }
  return currentShields;
}
