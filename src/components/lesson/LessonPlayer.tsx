"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLessonStore } from "@/lib/stores/lesson-store";
import { LessonNav } from "@/components/navigation/LessonNav";
import { TutorButton } from "@/components/ai-tutor/TutorButton";
import { TutorPanel } from "@/components/ai-tutor/TutorPanel";
import { Hook } from "./stages/Hook";
import { SpatialExperience } from "./stages/SpatialExperience";
import { GuidedDiscovery } from "./stages/GuidedDiscovery";
import { SymbolBridge } from "./stages/SymbolBridge";
import { RealWorldAnchor } from "./stages/RealWorldAnchor";
import { Practice } from "./stages/Practice";
import { Reflection } from "./stages/Reflection";
import type { LessonData } from "./types";

const TOTAL_STAGES = 7;

const stageTransition = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

interface LessonPlayerProps {
  lessonData: LessonData;
  onComplete?: () => void;
}

/**
 * T041 - LessonPlayer
 *
 * Orchestrates the 7 Neuro-Learning Sequence (NLS) stages in order:
 * Hook -> Spatial -> Discovery -> Symbol -> RealWorld -> Practice -> Reflection.
 *
 * Uses the lesson store to track the current stage, and AnimatePresence
 * to animate transitions between stages.
 */
export function LessonPlayer({ lessonData, onComplete }: LessonPlayerProps) {
  const {
    currentStage,
    stageIndex,
    isActive,
    startLesson,
    advanceStage,
    completeStage,
    endLesson,
  } = useLessonStore();

  // Initialize lesson on mount
  useEffect(() => {
    startLesson(lessonData.conceptId, lessonData.lessonId);
    return () => {
      endLesson();
    };
    // Only run on mount; lessonData identity is stable from the parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonData.conceptId, lessonData.lessonId]);

  const handleStageComplete = useCallback(() => {
    completeStage(currentStage);

    // If we are on the last stage, finish the lesson
    if (stageIndex >= TOTAL_STAGES - 1) {
      endLesson();
      onComplete?.();
      return;
    }

    advanceStage();
  }, [currentStage, stageIndex, completeStage, advanceStage, endLesson, onComplete]);

  const handleReflectionComplete = useCallback(
    (text: string) => {
      // The reflection text would be sent to the server in a real implementation.
      // For now we simply complete the stage.
      void text;
      completeStage(currentStage);
      endLesson();
      onComplete?.();
    },
    [currentStage, completeStage, endLesson, onComplete],
  );

  const [tutorOpen, setTutorOpen] = useState(false);

  // AI Tutor is available during stages 2-6 (spatial through practice)
  const tutorAvailable = ["spatial", "discovery", "symbol", "realWorld", "practice"].includes(currentStage);

  if (!isActive) {
    return null;
  }

  function renderStage() {
    switch (currentStage) {
      case "hook":
        return (
          <Hook
            animation={lessonData.stages.hook.animation}
            onComplete={handleStageComplete}
          />
        );
      case "spatial":
        return (
          <SpatialExperience
            scene={lessonData.stages.spatial.scene}
            onComplete={handleStageComplete}
          />
        );
      case "discovery":
        return (
          <GuidedDiscovery
            scene={lessonData.stages.discovery.scene}
            prompts={lessonData.stages.discovery.prompts}
            onComplete={handleStageComplete}
          />
        );
      case "symbol":
        return (
          <SymbolBridge
            scene={lessonData.stages.symbol.scene}
            notation={lessonData.stages.symbol.notation}
            onComplete={handleStageComplete}
          />
        );
      case "realWorld":
        return (
          <RealWorldAnchor
            context={lessonData.stages.realWorld.context}
            illustration={lessonData.stages.realWorld.illustration}
            onComplete={handleStageComplete}
          />
        );
      case "practice":
        return (
          <Practice
            problems={lessonData.stages.practice.problems}
            onComplete={handleStageComplete}
          />
        );
      case "reflection":
        return (
          <Reflection
            prompt={lessonData.stages.reflection.prompt}
            onComplete={handleReflectionComplete}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-nm-bg-primary">
      {/* Stage progress header */}
      <LessonNav totalStages={TOTAL_STAGES} currentStage={stageIndex} />

      {/* Stage content area — padded for the fixed nav */}
      <main className="flex flex-1 flex-col pt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            className="flex flex-1 flex-col"
            initial={stageTransition.initial}
            animate={stageTransition.animate}
            exit={stageTransition.exit}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Tutor (T096) — available during stages 2-6 */}
      {tutorAvailable && (
        <>
          <TutorButton onClick={() => setTutorOpen(true)} />
          <TutorPanel
            conceptId={lessonData.conceptId}
            isOpen={tutorOpen}
            onClose={() => setTutorOpen(false)}
          />
        </>
      )}
    </div>
  );
}
