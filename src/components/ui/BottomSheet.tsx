"use client";

import { type ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { cn } from "@/lib/utils/cn";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  /** Snap points as percentages of viewport height (e.g. [40, 80]). Defaults to [50]. */
  snapPoints?: number[];
  className?: string;
}

/** Minimum drag distance (px) to dismiss the sheet. */
const DISMISS_THRESHOLD = 120;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

/**
 * Sliding bottom sheet with drag-to-dismiss gesture.
 * Uses framer-motion AnimatePresence for enter/exit animation and
 * @use-gesture/react for drag-to-dismiss on the handle.
 */
function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  snapPoints = [50],
  className,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragY = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const maxSnapPoint = Math.max(...snapPoints);

  const bindDrag = useDrag(
    ({ active, movement: [, my], last, cancel }) => {
      // Prevent dragging upward beyond sheet origin
      if (my < 0) {
        dragY.set(0);
        return;
      }

      setIsDragging(active);
      dragY.set(my);

      if (last) {
        if (my > DISMISS_THRESHOLD) {
          onClose();
        }
        // Spring back
        dragY.set(0);
        setIsDragging(false);
      }
    },
    {
      axis: "y",
      filterTaps: true,
    },
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="bottom-sheet-overlay"
            className="fixed inset-0 z-40 bg-black/60"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            key="bottom-sheet-content"
            ref={sheetRef}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50",
              "bg-nm-bg-secondary rounded-t-3xl",
              "shadow-2xl",
              "flex flex-col",
              className,
            )}
            style={{
              maxHeight: `${maxSnapPoint}vh`,
              y: dragY,
            }}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={
              isDragging
                ? { type: "tween", duration: 0 }
                : {
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                  }
            }
          >
            {/* Drag handle — touch target for swipe-to-dismiss */}
            <div
              className="flex items-center justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
              {...bindDrag()}
            >
              <div className="w-10 h-1 rounded-full bg-nm-bg-elevated" />
            </div>

            {/* Title */}
            {title && (
              <div className="px-4 pb-3 border-b border-nm-bg-surface/20">
                <h2 className="text-lg font-semibold text-nm-text-primary">
                  {title}
                </h2>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { BottomSheet };
export type { BottomSheetProps };
