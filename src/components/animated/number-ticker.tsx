"use client";

import { useEffect, useState } from "react";
import { animate } from "motion/react";

interface NumberTickerProps {
  value: number;
  className?: string;
  delay?: number; // in seconds
}

export function NumberTicker({ value, className, delay = 0 }: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      delay: delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest * 10) / 10);
      },
    });
    return () => controls.stop();
  }, [value, delay]);

  return <span className={className}>{displayValue}</span>;
}
