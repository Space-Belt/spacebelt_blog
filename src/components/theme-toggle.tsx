"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const themes: { value: Theme; label: string; icon: typeof Moon }[] = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor }
];

function resolveTheme(theme: Theme) {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  return theme;
}

function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme);
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as Theme | null;
    const nextTheme = savedTheme ?? "system";
    setTheme(nextTheme);
    applyTheme(nextTheme);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => {
      const storedTheme = window.localStorage.getItem("theme") as Theme | null;

      if (!storedTheme || storedTheme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="theme-toggle" aria-label="Theme">
      {themes.map((item) => {
        const Icon = item.icon;

        return (
          <button
            type="button"
            key={item.value}
            className={theme === item.value ? "active" : ""}
            onClick={() => selectTheme(item.value)}
            aria-label={`${item.label} theme`}
            title={`${item.label} theme`}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
