import React from 'react';
import { Box } from 'ink';
import type { Slide as SlideType, BorderStyle } from '../types/index.js';
import { Border } from './Border.js';
import { SlideContent } from './SlideContent.js';

interface SlideProps {
  slide: SlideType;
  width: number;
  height: number;
  borderStyle?: BorderStyle;
}

export function Slide({
  slide,
  width,
  height,
  borderStyle = 'rounded',
}: SlideProps): React.ReactElement {
  return (
    <Box>
      <Border width={width} height={height} style={borderStyle}>
        <SlideContent tokens={slide.tokens} />
      </Border>
    </Box>
  );
}
