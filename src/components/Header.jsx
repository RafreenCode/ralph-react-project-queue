import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Header component displaying the laboratory queue title and theme switch trigger.
 * Subscribes to ThemeContext directly to avoid prop drilling.
 */
export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="brand-text">
          <h1 className="header-title">HelpDesk Queue</h1>
          <p className="header-subtitle">Laboratory Student Assistance Portal</p>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          id="theme-toggle-btn"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <>
              <svg className="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span className="theme-toggle-label">Dark Mode</span>
            </>
          ) : (
            <>
              <svg className="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <span className="theme-toggle-label">Light Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
