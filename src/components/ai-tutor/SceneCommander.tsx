"use client";

import { useEffect, useRef, type RefObject } from "react";

interface SceneHandle {
  executeCommand: (cmd: unknown) => void;
}

interface SceneCommanderProps {
  commands?: unknown[];
  sceneRef: RefObject<SceneHandle | null>;
}

/**
 * Validate that a command has the minimal expected shape before execution.
 * MVP: checks that the command is a non-null object with an "action" string.
 */
function isValidCommand(cmd: unknown): boolean {
  if (cmd === null || typeof cmd !== "object") {
    return false;
  }
  const record = cmd as Record<string, unknown>;
  return typeof record["action"] === "string";
}

/**
 * T094 - SceneCommander
 *
 * Receives AI-generated scene commands and executes them against the
 * current MathScene via its imperative handle. Validates each command
 * before execution and logs invalid ones to the console.
 *
 * This component renders nothing to the DOM.
 */
function SceneCommander({ commands, sceneRef }: SceneCommanderProps) {
  const prevCommandsRef = useRef<unknown[] | undefined>(undefined);

  useEffect(() => {
    if (!commands || commands === prevCommandsRef.current) {
      return;
    }

    prevCommandsRef.current = commands;

    for (const cmd of commands) {
      if (!isValidCommand(cmd)) {
        console.warn("[SceneCommander] Invalid command skipped:", cmd);
        continue;
      }

      if (!sceneRef.current) {
        console.warn(
          "[SceneCommander] sceneRef.current is null, cannot execute command:",
          cmd,
        );
        continue;
      }

      sceneRef.current.executeCommand(cmd);
    }
  }, [commands, sceneRef]);

  return null;
}

export { SceneCommander };
export type { SceneCommanderProps, SceneHandle };
