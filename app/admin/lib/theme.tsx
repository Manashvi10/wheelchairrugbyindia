"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  // Load saved preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin-theme") as Theme | null;
      if (saved === "dark" || saved === "light") {
        setThemeState(saved);
      } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
      }
    } catch {}
  }, []);

  // Toggle class on <html> so it cascades everywhere
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("admin-dark");
    else root.classList.remove("admin-dark");
    return () => root.classList.remove("admin-dark");
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("admin-theme", t); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem("admin-theme", next); } catch {}
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAdminTheme must be used inside AdminThemeProvider");
  return ctx;
}
