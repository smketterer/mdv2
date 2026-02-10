import React, { createContext, useContext } from 'react';
import type { CodeTheme } from '../types/index.js';
import { codeThemes } from '../themes/codeThemes.js';
import { uiThemes, type UITheme } from '../themes/uiThemes.js';
import type { Theme } from 'cli-highlight';

interface ThemeContextValue {
  codeTheme: Theme;
  uiTheme: UITheme;
}

const ThemeContext = createContext<ThemeContextValue>({
  codeTheme: codeThemes.default,
  uiTheme: uiThemes.default,
});

interface ThemeProviderProps {
  themeName: CodeTheme;
  children: React.ReactNode;
}

export function ThemeProvider({
  themeName,
  children,
}: ThemeProviderProps): React.ReactElement {
  const codeTheme = codeThemes[themeName] || codeThemes.default;
  const uiTheme = uiThemes[themeName] || uiThemes.default;

  return (
    <ThemeContext.Provider value={{ codeTheme, uiTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useCodeTheme(): Theme {
  const { codeTheme } = useContext(ThemeContext);
  return codeTheme;
}

export function useUITheme(): UITheme {
  const { uiTheme } = useContext(ThemeContext);
  return uiTheme;
}
