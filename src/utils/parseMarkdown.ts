import { Lexer, type Token } from 'marked';
import type { Slide } from '../types/index.js';

export function parseMarkdown(content: string): Slide[] {
  const lexer = new Lexer();
  const tokens = lexer.lex(content);

  const slides: Slide[] = [];
  let currentSlideTokens: Token[] = [];
  let slideIndex = 0;

  for (const token of tokens) {
    if (token.type === 'hr') {
      // Horizontal rule marks slide boundary
      if (currentSlideTokens.length > 0) {
        slides.push({
          tokens: currentSlideTokens,
          index: slideIndex++,
        });
        currentSlideTokens = [];
      }
    } else {
      currentSlideTokens.push(token);
    }
  }

  // Don't forget the last slide
  if (currentSlideTokens.length > 0) {
    slides.push({
      tokens: currentSlideTokens,
      index: slideIndex,
    });
  }

  // If no slides were created, create one empty slide
  if (slides.length === 0) {
    slides.push({
      tokens: [],
      index: 0,
    });
  }

  return slides;
}
