import React from 'react';
import { Box } from 'ink';
import type { Token } from 'marked';
import { tokenToComponent } from '../utils/tokenToComponent.js';

interface SlideContentProps {
  tokens: Token[];
}

export function SlideContent({ tokens }: SlideContentProps): React.ReactElement {
  return (
    <Box flexDirection="column" paddingX={1}>
      {tokens.map((token, index) => tokenToComponent(token, index))}
    </Box>
  );
}
