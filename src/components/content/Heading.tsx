import React from 'react';
import { Text, Box } from 'ink';
import type { Tokens } from 'marked';
import { useUITheme } from '../../context/ThemeContext.js';
import { decodeHtml } from '../../utils/decodeHtml.js';

interface HeadingProps {
  token: Tokens.Heading;
}

export function Heading({ token }: HeadingProps): React.ReactElement {
  const { depth, text } = token;
  const uiTheme = useUITheme();

  const getColor = () => {
    if (depth === 1) return uiTheme.heading.h1;
    if (depth === 2) return uiTheme.heading.h2;
    return uiTheme.heading.h3;
  };

  const prefix = depth === 1 ? '' : '#'.repeat(depth) + ' ';

  return (
    <Box marginBottom={depth <= 2 ? 1 : 0}>
      <Text bold color={getColor()}>
        {prefix}{decodeHtml(text)}
      </Text>
    </Box>
  );
}
