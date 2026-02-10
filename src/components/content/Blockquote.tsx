import React from 'react';
import { Box, Text } from 'ink';
import type { Tokens } from 'marked';
import { useUITheme } from '../../context/ThemeContext.js';
import { decodeHtml } from '../../utils/decodeHtml.js';

interface BlockquoteProps {
  token: Tokens.Blockquote;
}

export function Blockquote({ token }: BlockquoteProps): React.ReactElement {
  const uiTheme = useUITheme();

  // Extract text from blockquote tokens
  const getText = (tokens: Tokens.Blockquote['tokens']): string => {
    return tokens
      .map((t) => {
        if (t.type === 'paragraph') {
          return t.text;
        }
        if ('text' in t) {
          return t.text;
        }
        return '';
      })
      .join('\n');
  };

  const text = decodeHtml(getText(token.tokens));
  const lines = text.split('\n');

  return (
    <Box flexDirection="column" marginY={1}>
      {lines.map((line, index) => (
        <Box key={index}>
          <Text color={uiTheme.blockquoteBorder}>│ </Text>
          <Text color={uiTheme.muted} italic>
            {line}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
