"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-xl bg-accent-green px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-accent-green-light active:scale-[0.98] shadow-md shadow-accent-green/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 block rounded-xl border border-white/25" />
        <span className="absolute inset-0 block translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[100%]" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
