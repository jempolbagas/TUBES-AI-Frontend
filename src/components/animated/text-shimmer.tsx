"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
}

export function TextShimmer({ children, className }: TextShimmerProps) {
  return (
    <span
      className={cn(
        "inline-flex bg-gradient-to-r from-text-secondary via-accent-green-light to-text-secondary bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse duration-1000 font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}
