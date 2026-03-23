import { TRPCError } from "@trpc/server";
import { redis } from "@/server/db/redis";

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  "tutor": { maxRequests: 60, windowMs: 60_000 },
  "practice.submitAnswer": { maxRequests: 120, windowMs: 60_000 },
  "gamification.claimReward": { maxRequests: 10, windowMs: 60_000 },
  default: { maxRequests: 300, windowMs: 60_000 },
};

export function getRateLimitConfig(path: string): RateLimitConfig {
  const exact = RATE_LIMITS[path];
  if (exact) return exact;

  const prefix = path.split(".")[0];
  const prefixConfig = prefix ? RATE_LIMITS[prefix] : undefined;
  if (prefixConfig) return prefixConfig;

  // "default" key is always present in RATE_LIMITS
  return RATE_LIMITS["default"]!;
}

export async function checkRateLimit(
  userId: string,
  path: string,
): Promise<void> {
  const config = getRateLimitConfig(path);
  const key = `ratelimit:${userId}:${path}`;
  const windowSeconds = Math.ceil(config.windowMs / 1000);

  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }

  if (current > config.maxRequests) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Rate limit exceeded for ${path}. Max ${config.maxRequests} requests per ${windowSeconds}s.`,
    });
  }
}
