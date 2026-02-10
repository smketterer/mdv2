import React, { createContext, useContext } from 'react';
import type { CodeTheme, BulletStyle, PresentationConfig } from '../types/index.js';
import { codeThemes } from '../themes/codeThemes.js';
import { uiThemes, type UITheme } from '../themes/uiThemes.js';
import type { Theme } from 'cli-highlight';

const BULLET_CHARS: Record<BulletStyle, string> = {
  disc: '•',
  circle: '○',
  square: '■',
  dash: '-',
  arrow: '→',
};

interface ThemeContextValue {
  codeTheme: Theme;
  uiTheme: UITheme;
  config: PresentationConfig;
  bulletChar: string;
}

const defaultConfig: PresentationConfig = {
  padding: 1,
  bulletStyle: 'disc',
};

const ThemeContext = createContext<ThemeContextValue>({
  codeTheme: codeThemes.default,
  uiTheme: uiThemes.default,
  config: defaultConfig,
  bulletChar: BULLET_CHARS.disc,
});

interface ThemeProviderProps {
  themeName: CodeTheme;
  padding?: number;
  bulletStyle?: BulletStyle;
  children: React.ReactNode;
}

export function ThemeProvider({
  themeName,
  padding = 1,
  bulletStyle = 'disc',
  children,
}: ThemeProviderProps): React.ReactElement {
  const codeTheme = codeThemes[themeName] || codeThemes.default;
  const uiTheme = uiThemes[themeName] || uiThemes.default;
  const config: PresentationConfig = { padding, bulletStyle };
  const bulletChar = BULLET_CHARS[bulletStyle];

  return (
    <ThemeContext.Provider value={{ codeTheme, uiTheme, config, bulletChar }}>
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

export function useConfig(): PresentationConfig {
  const { config } = useContext(ThemeContext);
  return config;
}

export function useBulletChar(): string {
  const { bulletChar } = useContext(ThemeContext);
  return bulletChar;
}
