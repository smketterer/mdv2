import React from 'react';
import { Box, Text } from 'ink';
import type { Tokens } from 'marked';
import SyntaxHighlight from 'ink-syntax-highlight';
import { useCodeTheme } from '../../context/ThemeContext.js';

interface CodeBlockProps {
  token: Tokens.Code;
}

export function CodeBlock({ token }: CodeBlockProps): React.ReactElement {
  const { text, lang } = token;
  const theme = useCodeTheme();
  const lines = text.split('\n');

  // Only apply syntax highlighting if a language is specified
  const hasSyntaxHighlighting = lang && lang.trim() !== '';

  return (
    <Box flexDirection="column" marginBottom={1}>
      {hasSyntaxHighlighting && (
        <Text dimColor>[{lang}]</Text>
      )}
      <Box paddingLeft={2} flexDirection="column">
        {hasSyntaxHighlighting ? (
          <SyntaxHighlight code={text} language={lang} theme={theme} />
        ) : (
          lines.map((line, index) => (
            <Text key={index}>{line}</Text>
          ))
        )}
      </Box>
    </Box>
  );
}
