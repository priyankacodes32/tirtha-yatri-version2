import { createContext, useContext, useEffect, useState } from 'react';
import { getSettings } from '../api/settingsApi.js';
import { darken, lighten } from '../utils/color.js';

const ThemeContext = createContext(null);

/**
 * Fetches SiteSettings once at boot and pushes the admin's theme colors
 * onto :root as CSS custom property overrides. Every component in this
 * app reads color exclusively through the variables in styles/tokens.css
 * (a deliberate design decision), so this is the ONLY place that needs to
 * know about theming — no component needs to change when the admin edits
 * colors in the dashboard.
 */
export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getSettings()
      .then(({ data }) => {
        if (cancelled) return;
        setSettings(data);
        applyTheme(data.theme);
      })
      .catch(() => {
        // Fall back to the static defaults already baked into tokens.css —
        // the site still works, just without admin-edited colors.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <ThemeContext.Provider value={{ settings, loading }}>{children}</ThemeContext.Provider>;
}

function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement.style;

  if (theme.primary) {
    root.setProperty('--color-deep-blue', theme.primary);
    root.setProperty('--color-deep-blue-dark', darken(theme.primary, 0.2));
    root.setProperty('--color-slate', lighten(theme.primary, 0.15));
  }
  if (theme.secondary) {
    root.setProperty('--color-saffron', theme.secondary);
    root.setProperty('--color-saffron-dark', darken(theme.secondary, 0.15));
  }
  if (theme.accent) {
    root.setProperty('--color-gold', theme.accent);
  }
  if (theme.base) {
    root.setProperty('--color-ivory', theme.base);
    root.setProperty('--color-ivory-soft', lighten(theme.base, 0.4));
  }
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
