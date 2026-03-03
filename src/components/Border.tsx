import React from 'react';
import { Box, Text } from 'ink';
import type { BorderStyle, BorderChars } from '../types/index.js';
import { useUITheme } from '../context/ThemeContext.js';

const BORDER_CHARS: Record<BorderStyle, BorderChars> = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
  },
  rounded: {
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    vertical: '│',
  },
  bold: {
    topLeft: '┏',
    topRight: '┓',
    bottomLeft: '┗',
    bottomRight: '┛',
    horizontal: '━',
    vertical: '┃',
  },
};

interface BorderProps {
  width: number;
  height: number;
  style?: BorderStyle;
  children: React.ReactNode;
  title?: string;
}

export function Border({
  width,
  height,
  style = 'rounded',
  children,
  title,
}: BorderProps): React.ReactElement {
  const chars = BORDER_CHARS[style];
  const uiTheme = useUITheme();
  const color = uiTheme.border;
  const innerWidth = width - 2;
  const innerHeight = height - 2;

  // Build top border with optional title
  let topLine = chars.horizontal.repeat(innerWidth);
  if (title && title.length < innerWidth - 4) {
    const titleWithPadding = ` ${title} `;
    const leftPadding = Math.floor((innerWidth - titleWithPadding.length) / 2);
    const rightPadding = innerWidth - leftPadding - titleWithPadding.length;
    topLine =
      chars.horizontal.repeat(leftPadding) +
      titleWithPadding +
      chars.horizontal.repeat(rightPadding);
  }

  return (
    <Box flexDirection="column" width={width}>
      {/* Top border */}
      <Text color={color}>
        {chars.topLeft}
        {topLine}
        {chars.topRight}
      </Text>

      {/* Content with side borders */}
      <Box flexDirection="row" height={innerHeight}>
        <Box flexDirection="column">
          {Array.from({ length: innerHeight }).map((_, i) => (
            <Text key={i} color={color}>{chars.vertical}</Text>
          ))}
        </Box>
        <Box width={innerWidth} flexDirection="column" overflow="hidden">
          {children}
        </Box>
        <Box flexDirection="column">
          {Array.from({ length: innerHeight }).map((_, i) => (
            <Text key={i} color={color}>{chars.vertical}</Text>
          ))}
        </Box>
      </Box>

      {/* Bottom border */}
      <Text color={color}>
        {chars.bottomLeft}
        {chars.horizontal.repeat(innerWidth)}
        {chars.bottomRight}
      </Text>
    </Box>
  );
}
