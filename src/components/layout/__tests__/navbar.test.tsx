import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../navbar";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/i18n";

describe("Navbar Theme Toggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  const renderNavbar = () => {
    return render(
      <LanguageProvider>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </LanguageProvider>
    );
  };

  test("toggles theme correctly and stores choice", () => {
    renderNavbar();

    // Default theme should be dark
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();

    // Click theme toggle to switch to light
    const toggleBtn = screen.getByTestId("theme-toggle");
    fireEvent.click(toggleBtn);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("aqi-theme")).toBe("light");
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();

    // Click again to switch back to dark
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("aqi-theme")).toBe("dark");
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });
});
