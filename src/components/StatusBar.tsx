import React from 'react';
import { Box, Text } from 'ink';
import { useUITheme } from '../context/ThemeContext.js';

interface StatusBarProps {
  currentSlide: number;
  totalSlides: number;
  width: number;
}

export function StatusBar({
  currentSlide,
  totalSlides,
  width,
}: StatusBarProps): React.ReactElement {
  const uiTheme = useUITheme();
  const leftText = '← prev | next →';
  const centerText = `${currentSlide + 1} of ${totalSlides}`;
  const rightText = 'q: quit';

  const innerWidth = width - 2; // Account for paddingX={1}
  const sideWidth = Math.floor((innerWidth - centerText.length) / 2);

  return (
    <Box width={width} paddingX={1}>
      <Box width={sideWidth}>
        <Text color={uiTheme.muted}>{leftText}</Text>
      </Box>
      <Box width={centerText.length} justifyContent="center">
        <Text bold color={uiTheme.border}>
          {centerText}
        </Text>
      </Box>
      <Box width={sideWidth} justifyContent="flex-end">
        <Text color={uiTheme.muted}>{rightText}</Text>
      </Box>
    </Box>
  );
}
