"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { TutorAvatar } from "@/components/ai-tutor/TutorAvatar";
import { cn } from "@/lib/utils/cn";
import { trpc } from "@/lib/trpc/client";

// ============================================================
// Types
// ============================================================

type MessageRole = "student" | "tutor";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

interface TutorPanelProps {
  conceptId: string;
  isOpen: boolean;
  onClose: () => void;
  sceneState?: unknown;
}

// ============================================================
// Helpers
// ============================================================

function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ============================================================
// Sub-components
// ============================================================

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2" aria-label="Tutor is typing">
      <span className="h-2 w-2 rounded-full bg-nm-text-muted animate-[bounce_1.4s_ease-in-out_0s_infinite]" />
      <span className="h-2 w-2 rounded-full bg-nm-text-muted animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
      <span className="h-2 w-2 rounded-full bg-nm-text-muted animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isStudent = message.role === "student";

  return (
    <div
      className={cn(
        "flex w-full gap-2",
        isStudent ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isStudent && <TutorAvatar speaking={false} mood="neutral" />}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isStudent
            ? "bg-nm-accent-indigo text-white rounded-br-md"
            : "bg-nm-bg-surface text-nm-text-primary rounded-bl-md",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ============================================================
// TutorPanel
// ============================================================

/**
 * T093 - TutorPanel
 *
 * Bottom sheet chat panel for the AI tutor. Displays a scrollable
 * message list with student and tutor messages, a text input, and
 * a streaming typing indicator while the tutor is responding.
 *
 * Uses tRPC mutation `trpc.tutor.sendMessage.useMutation()` to
 * communicate with the AI backend.
 */
function TutorPanel({
  conceptId,
  isOpen,
  onClose,
  sceneState,
}: TutorPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, scrollToBottom]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let the sheet animation finish
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // tRPC mutation for sending messages
  const sendMessageMutation = trpc.tutor.sendMessage.useMutation({
    onSuccess(data) {
      const tutorMessage: ChatMessage = {
        id: generateMessageId(),
        role: "tutor",
        content: typeof data === "object" && data !== null && "reply" in data
          ? String((data as Record<string, unknown>)["reply"])
          : "I'm here to help! Could you rephrase that?",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, tutorMessage]);
      setIsStreaming(false);
    },
    onError() {
      const errorMessage: ChatMessage = {
        id: generateMessageId(),
        role: "tutor",
        content:
          "Sorry, I had trouble understanding that. Could you try again?",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsStreaming(false);
    },
  });

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isStreaming) return;

    const studentMessage: ChatMessage = {
      id: generateMessageId(),
      role: "student",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, studentMessage]);
    setInputValue("");
    setIsStreaming(true);

    sendMessageMutation.mutate({
      conceptId,
      message: text,
      currentSceneState: sceneState,
    });
  }, [inputValue, isStreaming, conceptId, sceneState, sendMessageMutation]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="AI Tutor"
      snapPoints={[60, 90]}
      className="flex flex-col"
    >
      {/* Message list */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-2">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-nm-text-muted">
            <TutorAvatar mood="happy" />
            <p className="mt-3 text-sm">
              Hi! Ask me anything about this concept.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isStreaming && (
          <div className="flex items-start gap-2">
            <TutorAvatar speaking mood="thinking" />
            <div className="rounded-2xl rounded-bl-md bg-nm-bg-surface px-2 py-1">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 border-t border-nm-bg-surface/30 pt-3">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          disabled={isStreaming}
          className={cn(
            "flex-1 rounded-xl bg-nm-bg-surface px-4 py-2.5",
            "text-sm text-nm-text-primary placeholder:text-nm-text-muted",
            "outline-none focus:ring-2 focus:ring-nm-accent-indigo/50",
            "disabled:opacity-50",
          )}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputValue.trim() || isStreaming}
          aria-label="Send message"
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            "bg-nm-accent-indigo text-white",
            "transition-all duration-150 ease-out",
            "hover:brightness-110 active:brightness-95",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-accent-indigo",
          )}
        >
          <SendIcon />
        </button>
      </div>
    </BottomSheet>
  );
}

export { TutorPanel };
export type { TutorPanelProps, ChatMessage, MessageRole };
