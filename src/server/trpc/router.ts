import { router } from "./trpc";
import { authRouter } from "./routers/auth";
import { curriculumRouter } from "./routers/curriculum";
import { lessonRouter } from "./routers/lesson";
import { practiceRouter } from "./routers/practice";
import { progressRouter } from "./routers/progress";
import { gamificationRouter } from "./routers/gamification";
import { aiTutorRouter } from "./routers/ai-tutor";
import { socialRouter } from "./routers/social";

export const appRouter = router({
  auth: authRouter,
  curriculum: curriculumRouter,
  lesson: lessonRouter,
  practice: practiceRouter,
  progress: progressRouter,
  gamification: gamificationRouter,
  tutor: aiTutorRouter,
  social: socialRouter,
});

export type AppRouter = typeof appRouter;
