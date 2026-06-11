"use client";

import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import Image from "next/image";

export function ThemedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Initial server-side rendering / hydration fallback
    return (
      <div className="fixed inset-0 -z-10 bg-[#121814]" aria-hidden="true" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Light Mode Background: Day cityscape */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          theme === "light" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/jakarta-bg.webp"
          alt="Jakarta Day Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft overlay: 15% dark tint with slight backdrop-blur for text legibility */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]" />
      </div>

      {/* Dark Mode Background: Night cityscape */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/jakarta-malam-bg.webp"
          alt="Jakarta Night Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft overlay: 45% dark tint with slight backdrop-blur for text legibility */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      </div>
    </div>
  );
}
