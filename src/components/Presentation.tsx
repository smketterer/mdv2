import React, { useState } from 'react';
import { Box } from 'ink';
import type { Slide as SlideType, BorderStyle } from '../types/index.js';
import { Slide } from './Slide.js';
import { StatusBar } from './StatusBar.js';
import { GoToSlideInput } from './GoToSlideInput.js';
import { useTerminalSize } from '../hooks/useTerminalSize.js';
import { useKeyboardNav } from '../hooks/useKeyboardNav.js';
import { useSlides } from '../hooks/useSlides.js';

interface PresentationProps {
  slides: SlideType[];
  startSlide?: number;
  borderStyle?: BorderStyle;
  onQuit: () => void;
}

export function Presentation({
  slides,
  startSlide = 1,
  borderStyle = 'rounded',
  onQuit,
}: PresentationProps): React.ReactElement {
  const { width, height } = useTerminalSize();
  const [isGoToActive, setIsGoToActive] = useState(false);
  const { currentSlide, totalSlides, next, previous, goToFirst, goToLast, goTo } =
    useSlides(slides, startSlide);

  useKeyboardNav({
    onNext: next,
    onPrevious: previous,
    onFirst: goToFirst,
    onLast: goToLast,
    onQuit,
    onJumpTo: goTo,
    onGoToSlide: () => setIsGoToActive(true),
    isActive: !isGoToActive,
  });

  const slideHeight = height - 2; // Reserve space for status bar
  const currentSlideData = slides[currentSlide];

  return (
    <Box flexDirection="column" width={width} height={height}>
      <Slide
        slide={currentSlideData}
        width={width}
        height={slideHeight}
        borderStyle={borderStyle}
      />
      <StatusBar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        width={width}
      />
      {isGoToActive && (
        <Box
          position="absolute"
          width={width}
          height={height}
          justifyContent="center"
          alignItems="center"
        >
          <GoToSlideInput
            totalSlides={totalSlides}
            onSubmit={(n) => {
              goTo(n);
              setIsGoToActive(false);
            }}
            onCancel={() => setIsGoToActive(false)}
          />
        </Box>
      )}
    </Box>
  );
}
