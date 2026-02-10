import React from 'react';
import { Box } from 'ink';
import type { Tokens } from 'marked';
import { TextFormatting } from './TextFormatting.js';

interface ParagraphProps {
  token: Tokens.Paragraph;
}

export function Paragraph({ token }: ParagraphProps): React.ReactElement {
  return (
    <Box marginBottom={1}>
      <TextFormatting tokens={token.tokens} />
    </Box>
  );
}
