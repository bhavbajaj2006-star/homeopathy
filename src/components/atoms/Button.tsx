// ============================================================================
// src/components/atoms/Button.tsx
// ============================================================================

import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "gold"
  | "ghost-inverse";

export type ButtonSize = "sm" | "md" | "lg";

interface RippleInstance {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly size: number;
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
  readonly fullWidth?: boolean;
  readonly children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-primary-500 to-primary-600 text-white shadow-ambient-sm ring-1 ring-inset ring-white/15 hover:from-primary-500 hover:to-primary-700 hover:shadow-ambient active:to-primary-800 disabled:from-primary-200 disabled:to-primary-200",
  secondary:
    "bg-secondary-100 text-primary-800 hover:bg-secondary-200 active:bg-secondary-300 dark:bg-primary-900/40 dark:text-secondary-200 dark:hover:bg-primary-900/60",
  ghost:
    "bg-transparent text-primary-700 hover:bg-primary-50 active:bg-primary-100 dark:text-secondary-200 dark:hover:bg-primary-900/30",
  outline:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary-50 active:bg-primary-100 dark:border-secondary-400 dark:text-secondary-300 dark:hover:bg-primary-900/30",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-ambient-sm disabled:bg-red-200",
  gold:
    "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-800 shadow-ambient-sm ring-1 ring-inset ring-white/30 hover:from-gold-200 hover:to-gold-400 hover:shadow-ambient active:to-gold-600 disabled:from-gold-100 disabled:to-gold-100",
  "ghost-inverse":
    "bg-white/5 text-ink-50 ring-1 ring-inset ring-white/15 hover:bg-white/10 active:bg-white/15",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 gap-1.5 rounded-full",
  md: "text-base px-6 py-3 gap-2 rounded-full",
  lg: "text-lg px-8 py-4 gap-2.5 rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leadingIcon,
      trailingIcon,
      fullWidth = false,
      disabled,
      className = "",
      onClick,
      children,
      ...rest
    },
    ref
  ) {
    const [ripples, setRipples] = useState<readonly RippleInstance[]>([]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (disabled || isLoading) {
        return;
      }

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const newRipple: RippleInstance = {
        id: Date.now(),
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      };

      setRipples((previous) => [...previous, newRipple]);
      window.setTimeout(() => {
        setRipples((previous) =>
          previous.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 620);

      onClick?.(event);
    };

    return (
      <motion.button
        ref={ref}
        type="button"
        whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        disabled={disabled || isLoading}
        onClick={handleClick}
        aria-busy={isLoading}
        className={`relative inline-flex items-center justify-center overflow-hidden font-sans font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-clinical-ivory disabled:cursor-not-allowed disabled:opacity-70 dark:focus-visible:ring-offset-clinical-background-dark ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...rest}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-white/40 animate-ripple-out"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}

        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leadingIcon
        )}

        <span>{children}</span>

        {!isLoading ? trailingIcon : null}
      </motion.button>
    );
  }
);
