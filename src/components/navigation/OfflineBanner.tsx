"use client";

import { useOfflineSync } from "@/lib/hooks/useOfflineSync";
import { motion, AnimatePresence } from "framer-motion";

export function OfflineBanner() {
  const { isOnline, isSyncing } = useOfflineSync();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden bg-nm-accent-amber/10 text-center"
        >
          <p className="px-4 py-1.5 text-xs font-medium text-nm-accent-amber">
            You&apos;re offline — progress will sync when you reconnect
          </p>
        </motion.div>
      )}
      {isOnline && isSyncing && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden bg-nm-accent-indigo/10 text-center"
        >
          <p className="px-4 py-1.5 text-xs font-medium text-nm-accent-indigo">
            Syncing your progress...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
