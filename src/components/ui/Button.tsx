"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-nm-accent-indigo text-white hover:brightness-110 active:brightness-95",
  secondary:
    "bg-nm-bg-surface text-nm-text-primary border border-nm-bg-elevated hover:brightness-110 active:brightness-95",
  ghost:
    "bg-transparent text-nm-text-secondary hover:bg-nm-bg-surface active:bg-nm-bg-surface/80",
  danger:
    "bg-nm-error text-white hover:brightness-110 active:brightness-95",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[44px] px-3 py-1.5 text-sm",
  md: "min-h-[44px] px-4 py-2 text-base",
  lg: "min-h-[44px] px-6 py-3 text-lg",
};

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/**
 * Versatile button component with variant, size, loading, and disabled states.
 * All sizes meet the 44px minimum touch target requirement (DR-5).
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    children,
    className,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "min-w-[44px] select-none",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-accent-indigo",
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
});

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
