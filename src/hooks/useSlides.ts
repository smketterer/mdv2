import { useState, useCallback } from 'react';
import type { Slide, SlideState } from '../types/index.js';

interface UseSlidesReturn extends SlideState {
  next: () => void;
  previous: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  goTo: (slideNumber: number) => void;
}

export function useSlides(slides: Slide[], startSlide: number = 1): UseSlidesReturn {
  const [currentSlide, setCurrentSlide] = useState(
    Math.max(0, Math.min(startSlide - 1, slides.length - 1))
  );

  const next = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const previous = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToFirst = useCallback(() => {
    setCurrentSlide(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentSlide(slides.length - 1);
  }, [slides.length]);

  const goTo = useCallback(
    (slideNumber: number) => {
      const index = slideNumber - 1;
      if (index >= 0 && index < slides.length) {
        setCurrentSlide(index);
      }
    },
    [slides.length]
  );

  return {
    currentSlide,
    totalSlides: slides.length,
    slides,
    next,
    previous,
    goToFirst,
    goToLast,
    goTo,
  };
}
