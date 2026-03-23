import { describe, it, expect } from "vitest";
import {
  processStreakDay,
  isScheduledDay,
  earnShield,
  type StreakInput,
} from "@/server/services/gamification/streak-manager";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Creates a Date for a specific day, stripping time. */
function day(year: number, month: number, date: number): Date {
  return new Date(year, month - 1, date);
}

/** Returns a default StreakInput for testing. */
function defaultInput(overrides: Partial<StreakInput> = {}): StreakInput {
  return {
    currentStreak: 5,
    longestStreak: 10,
    streakMode: "daily",
    scheduledDays: [0, 1, 2, 3, 4, 5, 6],
    shieldsAvailable: 1,
    lastActiveDate: day(2026, 3, 20), // Friday
    streakDecayFloor: 2,
    isOnBreak: false,
    breakEndDate: null,
    repairsUsedThisMonth: 0,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// isScheduledDay
// ---------------------------------------------------------------------------
describe("isScheduledDay", () => {
  it("returns true for any day in 'daily' mode", () => {
    // Sunday
    expect(isScheduledDay(day(2026, 3, 22), "daily", [])).toBe(true);
    // Wednesday
    expect(isScheduledDay(day(2026, 3, 18), "daily", [])).toBe(true);
  });

  it("returns true for weekdays in 'weekday' mode", () => {
    // Monday 2026-03-16
    expect(isScheduledDay(day(2026, 3, 16), "weekday", [])).toBe(true);
    // Friday 2026-03-20
    expect(isScheduledDay(day(2026, 3, 20), "weekday", [])).toBe(true);
  });

  it("returns false for weekends in 'weekday' mode", () => {
    // Saturday 2026-03-21
    expect(isScheduledDay(day(2026, 3, 21), "weekday", [])).toBe(false);
    // Sunday 2026-03-22
    expect(isScheduledDay(day(2026, 3, 22), "weekday", [])).toBe(false);
  });

  it("uses scheduledDays for 'custom' mode", () => {
    const mondayWednesday = [1, 3]; // Mon, Wed
    // Monday
    expect(isScheduledDay(day(2026, 3, 16), "custom", mondayWednesday)).toBe(
      true,
    );
    // Tuesday
    expect(isScheduledDay(day(2026, 3, 17), "custom", mondayWednesday)).toBe(
      false,
    );
    // Wednesday
    expect(isScheduledDay(day(2026, 3, 18), "custom", mondayWednesday)).toBe(
      true,
    );
  });
});

// ---------------------------------------------------------------------------
// earnShield
// ---------------------------------------------------------------------------
describe("earnShield", () => {
  it("earns a shield at day 7", () => {
    expect(earnShield(0, 7)).toBe(1);
  });

  it("earns a shield at day 14", () => {
    expect(earnShield(1, 14)).toBe(2);
  });

  it("does not earn a shield at day 5", () => {
    expect(earnShield(0, 5)).toBe(0);
  });

  it("caps shields at 3", () => {
    expect(earnShield(3, 21)).toBe(3);
  });

  it("does not earn a shield at day 0", () => {
    expect(earnShield(0, 0)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// processStreakDay — first activity
// ---------------------------------------------------------------------------
describe("processStreakDay — first activity ever", () => {
  it("starts streak at 1 when no prior activity", () => {
    const input = defaultInput({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.newStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.shieldUsed).toBe(false);
    expect(result.repairUsed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// processStreakDay — same day
// ---------------------------------------------------------------------------
describe("processStreakDay — same day activity", () => {
  it("does not increment streak for same-day activity", () => {
    const input = defaultInput({
      lastActiveDate: day(2026, 3, 22),
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.newStreak).toBe(5);
    expect(result.shieldUsed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// processStreakDay — consecutive day
// ---------------------------------------------------------------------------
describe("processStreakDay — consecutive day", () => {
  it("increments streak when next day is scheduled", () => {
    const input = defaultInput({
      lastActiveDate: day(2026, 3, 20), // Friday
    });
    // Saturday 2026-03-21 in daily mode
    const result = processStreakDay(input, day(2026, 3, 21));
    expect(result.newStreak).toBe(6);
    expect(result.longestStreak).toBe(10);
  });

  it("updates longestStreak when new streak exceeds it", () => {
    const input = defaultInput({
      currentStreak: 10,
      longestStreak: 10,
      lastActiveDate: day(2026, 3, 20),
    });
    const result = processStreakDay(input, day(2026, 3, 21));
    expect(result.newStreak).toBe(11);
    expect(result.longestStreak).toBe(11);
  });

  it("holds streak on non-scheduled day (weekday mode, Saturday)", () => {
    const input = defaultInput({
      streakMode: "weekday",
      lastActiveDate: day(2026, 3, 20), // Friday
    });
    // Saturday is not scheduled in weekday mode
    const result = processStreakDay(input, day(2026, 3, 21));
    expect(result.newStreak).toBe(5); // unchanged
    expect(result.shieldUsed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Layer 1: Weekend/non-scheduled day grace
// ---------------------------------------------------------------------------
describe("processStreakDay — Layer 1: non-scheduled day grace", () => {
  it("skips weekend days in weekday mode without breaking streak", () => {
    const input = defaultInput({
      streakMode: "weekday",
      lastActiveDate: day(2026, 3, 20), // Friday
    });
    // Monday 2026-03-23 — Sat/Sun were not scheduled
    const result = processStreakDay(input, day(2026, 3, 23));
    expect(result.newStreak).toBe(6);
    expect(result.shieldUsed).toBe(false);
  });

  it("skips non-scheduled days in custom mode", () => {
    const input = defaultInput({
      streakMode: "custom",
      scheduledDays: [1, 3, 5], // Mon, Wed, Fri
      lastActiveDate: day(2026, 3, 20), // Friday
    });
    // Next scheduled day: Monday 2026-03-23
    const result = processStreakDay(input, day(2026, 3, 23));
    expect(result.newStreak).toBe(6);
    expect(result.shieldUsed).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Layer 2: Streak shields
// ---------------------------------------------------------------------------
describe("processStreakDay — Layer 2: shields", () => {
  it("auto-consumes a shield for 1 missed scheduled day", () => {
    const input = defaultInput({
      streakMode: "daily",
      shieldsAvailable: 2,
      lastActiveDate: day(2026, 3, 20), // Friday
    });
    // Skip Saturday (1 missed day), come back Sunday
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.shieldUsed).toBe(true);
    expect(result.shieldsAvailable).toBe(1);
    expect(result.newStreak).toBe(6); // continues
  });

  it("does not use shield if not enough shields for all missed days", () => {
    const input = defaultInput({
      streakMode: "daily",
      shieldsAvailable: 1,
      lastActiveDate: day(2026, 3, 18), // Wednesday
    });
    // Skip Thu + Fri + Sat (3 missed), come back Sunday
    // Only 1 shield, can't cover 3 missed days
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.shieldUsed).toBe(false);
  });

  it("consumes multiple shields for multiple missed days", () => {
    const input = defaultInput({
      streakMode: "daily",
      shieldsAvailable: 3,
      lastActiveDate: day(2026, 3, 19), // Thursday
    });
    // Skip Fri + Sat (2 missed), come back Sunday
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.shieldUsed).toBe(true);
    expect(result.shieldsAvailable).toBe(1);
    expect(result.newStreak).toBe(6);
  });
});

// ---------------------------------------------------------------------------
// Layer 3: Repair window
// ---------------------------------------------------------------------------
describe("processStreakDay — Layer 3: repair window", () => {
  it("allows repair within 2-day gap when repairs available", () => {
    const input = defaultInput({
      streakMode: "daily",
      shieldsAvailable: 0,
      lastActiveDate: day(2026, 3, 20), // Friday
      repairsUsedThisMonth: 0,
    });
    // Come back Sunday (gap = 2 days, 1 missed scheduled day)
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.repairUsed).toBe(true);
    expect(result.newStreak).toBe(5); // maintained
  });

  it("does not repair when max repairs used this month", () => {
    const input = defaultInput({
      streakMode: "daily",
      shieldsAvailable: 0,
      lastActiveDate: day(2026, 3, 20),
      repairsUsedThisMonth: 2,
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.repairUsed).toBe(false);
    // Falls through to decay
  });
});

// ---------------------------------------------------------------------------
// Layer 4: Decay not death
// ---------------------------------------------------------------------------
describe("processStreakDay — Layer 4: decay not death", () => {
  it("decays streak by 50% instead of resetting to 0", () => {
    const input = defaultInput({
      currentStreak: 20,
      streakMode: "daily",
      shieldsAvailable: 0,
      lastActiveDate: day(2026, 3, 15), // 7 days ago
      streakDecayFloor: 5,
      repairsUsedThisMonth: 2,
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    // Decay = ceil(20 * 0.5) = 10, floor is 5, so 10
    // +1 because today is scheduled in daily mode
    expect(result.newStreak).toBe(11);
    expect(result.repairUsed).toBe(false);
    expect(result.shieldUsed).toBe(false);
  });

  it("respects the decay floor", () => {
    const input = defaultInput({
      currentStreak: 6,
      streakMode: "daily",
      shieldsAvailable: 0,
      lastActiveDate: day(2026, 3, 15),
      streakDecayFloor: 5,
      repairsUsedThisMonth: 2,
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    // Decay = ceil(6 * 0.5) = 3, but floor is 5, so 5
    // +1 for today
    expect(result.newStreak).toBe(6);
  });

  it("never resets streak to 0", () => {
    const input = defaultInput({
      currentStreak: 1,
      streakMode: "daily",
      shieldsAvailable: 0,
      lastActiveDate: day(2026, 3, 1),
      streakDecayFloor: 0,
      repairsUsedThisMonth: 2,
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    // Decay = ceil(1 * 0.5) = 1, floor is 0, so 1
    // +1 for today
    expect(result.newStreak).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Layer 5: Break mode
// ---------------------------------------------------------------------------
describe("processStreakDay — Layer 5: break mode", () => {
  it("freezes streak during break", () => {
    const input = defaultInput({
      isOnBreak: true,
      breakEndDate: day(2026, 3, 30),
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.isOnBreak).toBe(true);
    expect(result.newStreak).toBe(5); // unchanged
    expect(result.shieldUsed).toBe(false);
    expect(result.repairUsed).toBe(false);
  });

  it("resumes streak when break has ended", () => {
    const input = defaultInput({
      isOnBreak: true,
      breakEndDate: day(2026, 3, 20),
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.isOnBreak).toBe(false);
    expect(result.newStreak).toBe(5);
    expect(result.message).toContain("Welcome back");
  });

  it("keeps streak frozen if break end date has not passed", () => {
    const input = defaultInput({
      isOnBreak: true,
      breakEndDate: day(2026, 3, 25),
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.isOnBreak).toBe(true);
    expect(result.newStreak).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// Decay floor updates
// ---------------------------------------------------------------------------
describe("processStreakDay — decay floor", () => {
  it("updates decay floor to 50% of new streak on increment", () => {
    const input = defaultInput({
      currentStreak: 10,
      longestStreak: 10,
      streakDecayFloor: 3,
      lastActiveDate: day(2026, 3, 21),
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.newStreak).toBe(11);
    // floor(11 * 0.5) = 5, max(3, 5) = 5
    expect(result.streakDecayFloor).toBe(5);
  });

  it("never decreases the decay floor", () => {
    const input = defaultInput({
      currentStreak: 4,
      streakDecayFloor: 5,
      lastActiveDate: day(2026, 3, 21),
    });
    const result = processStreakDay(input, day(2026, 3, 22));
    expect(result.newStreak).toBe(5);
    // floor(5 * 0.5) = 2, max(5, 2) = 5
    expect(result.streakDecayFloor).toBe(5);
  });
});
