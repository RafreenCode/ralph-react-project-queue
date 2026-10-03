import { createContext, useContext, useState, useEffect } from "react";

/**
 * Module-scoped context for theme management.
 */
export const ThemeContext = createContext(null);

/**
 * ThemeProvider component managing global visual theme state ("light" | "dark").
 * Wrapped at root level in main.jsx to provide synchronous access to all consumers.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("helpdesk-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    } catch {
      // Fallback if localStorage is inaccessible
    }
    return "light";
  });

  const toggleTheme = () => {
    setTheme(previous => (previous === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    try {
      localStorage.setItem("helpdesk-theme", theme);
    } catch {
      // Ignore theme storage errors
    }
    // Also reflect on document element for seamless global CSS variables
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to safely consume theme context in any descendant component.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeContext;
