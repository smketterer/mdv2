import React from 'react';
import { Box, Text } from 'ink';
import { Presentation } from './components/Presentation.js';
import { parseMarkdown } from './utils/parseMarkdown.js';
import { ThemeProvider } from './context/ThemeContext.js';
import type { BorderStyle, CodeTheme, BulletStyle } from './types/index.js';

interface AppProps {
  content: string;
  startSlide?: number;
  borderStyle?: BorderStyle;
  theme?: CodeTheme;
  padding?: number;
  bulletStyle?: BulletStyle;
  onQuit: () => void;
}

export function App({
  content,
  startSlide = 1,
  borderStyle = 'rounded',
  theme = 'default',
  padding = 1,
  bulletStyle = 'disc',
  onQuit,
}: AppProps): React.ReactElement {
  const slides = parseMarkdown(content);

  if (slides.length === 0 || (slides.length === 1 && slides[0].tokens.length === 0)) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="yellow">No slides found in the presentation file.</Text>
        <Text dimColor>Make sure your markdown file contains content separated by --- (horizontal rules).</Text>
      </Box>
    );
  }

  return (
    <ThemeProvider themeName={theme} padding={padding} bulletStyle={bulletStyle}>
      <Presentation
        slides={slides}
        startSlide={startSlide}
        borderStyle={borderStyle}
        onQuit={onQuit}
      />
    </ThemeProvider>
  );
}
