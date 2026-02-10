import React from 'react';
import { Box } from 'ink';
import type { Token } from 'marked';
import { tokenToComponent } from '../utils/tokenToComponent.js';
import { useConfig } from '../context/ThemeContext.js';

interface SlideContentProps {
  tokens: Token[];
}

export function SlideContent({ tokens }: SlideContentProps): React.ReactElement {
  const { padding } = useConfig();

  return (
    <Box flexDirection="column" paddingX={padding}>
      {tokens.map((token, index) => tokenToComponent(token, index))}
    </Box>
  );
}
