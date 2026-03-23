import { offlineDb, type PendingAction } from "./db";

const MAX_RETRIES = 5;

export async function queueAction(
  type: PendingAction["type"],
  payload: Record<string, unknown>,
): Promise<void> {
  await offlineDb.pendingActions.add({
    id: crypto.randomUUID(),
    type,
    payload: JSON.stringify(payload),
    createdAt: new Date(),
    retryCount: 0,
    synced: false,
  });
}

export async function syncPendingActions(): Promise<{
  synced: number;
  failed: number;
}> {
  const pending = await offlineDb.pendingActions
    .where("synced")
    .equals(0) // false stored as 0 in IndexedDB
    .toArray();

  let synced = 0;
  let failed = 0;

  for (const action of pending) {
    if (action.retryCount >= MAX_RETRIES) {
      failed++;
      continue;
    }

    try {
      const payload = JSON.parse(action.payload);
      const response = await fetch("/api/trpc/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: action.type, payload }),
      });

      if (response.ok) {
        await offlineDb.pendingActions.update(action.id, { synced: true });
        synced++;
      } else {
        await offlineDb.pendingActions.update(action.id, {
          retryCount: action.retryCount + 1,
        });
        failed++;
      }
    } catch {
      await offlineDb.pendingActions.update(action.id, {
        retryCount: action.retryCount + 1,
      });
      failed++;
    }
  }

  return { synced, failed };
}

export async function prefetchLesson(contentPath: string): Promise<void> {
  try {
    const cache = await caches.open("lesson-content");
    const urls = [
      `/content/${contentPath}/meta.json`,
      `/content/${contentPath}/animations.json`,
      `/content/${contentPath}/problems.json`,
    ];

    await Promise.all(
      urls.map((url) =>
        cache.match(url).then((cached) => {
          if (!cached) {
            return cache.add(url).catch(() => {
              // Silently fail prefetch — not critical
            });
          }
        }),
      ),
    );
  } catch {
    // Prefetch is best-effort
  }
}
