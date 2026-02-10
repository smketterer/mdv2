import type { Token } from 'marked';

export interface Slide {
  tokens: Token[];
  index: number;
}

export interface SlideState {
  currentSlide: number;
  totalSlides: number;
  slides: Slide[];
}

export interface Theme {
  border: {
    color: string;
    style: BorderStyle;
  };
  heading: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
  };
  text: string;
  code: {
    background: string;
    text: string;
  };
  blockquote: {
    border: string;
    text: string;
  };
  statusBar: {
    background: string;
    text: string;
  };
}

export type BorderStyle = 'single' | 'double' | 'rounded' | 'bold';

export interface BorderChars {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  vertical: string;
}

export interface TerminalSize {
  width: number;
  height: number;
}

export type CodeTheme = 'default' | 'monokai' | 'dracula' | 'github' | 'nord';

export interface CLIOptions {
  start?: number;
  border?: BorderStyle;
  theme?: string;
  codeTheme?: CodeTheme;
}
