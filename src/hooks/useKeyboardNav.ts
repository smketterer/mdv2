import { useInput } from 'ink';

interface UseKeyboardNavOptions {
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  onQuit: () => void;
  onJumpTo: (slide: number) => void;
}

export function useKeyboardNav({
  onNext,
  onPrevious,
  onFirst,
  onLast,
  onQuit,
  onJumpTo,
}: UseKeyboardNavOptions): void {
  useInput((input, key) => {
    // Next slide: →, l, n, Space, Enter
    if (
      key.rightArrow ||
      input === 'l' ||
      input === 'n' ||
      input === ' ' ||
      key.return
    ) {
      onNext();
      return;
    }

    // Previous slide: ←, h, p, Backspace
    if (
      key.leftArrow ||
      input === 'h' ||
      input === 'p' ||
      key.backspace ||
      key.delete
    ) {
      onPrevious();
      return;
    }

    // First slide: g, Home
    if (input === 'g' || (key.ctrl && input === 'a')) {
      onFirst();
      return;
    }

    // Last slide: G, End
    if (input === 'G' || (key.ctrl && input === 'e')) {
      onLast();
      return;
    }

    // Quit: q, Escape
    if (input === 'q' || key.escape) {
      onQuit();
      return;
    }

    // Jump to slide: 1-9
    const num = parseInt(input, 10);
    if (!isNaN(num) && num >= 1 && num <= 9) {
      onJumpTo(num);
      return;
    }
  });
}
