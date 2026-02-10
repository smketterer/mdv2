import type { Theme } from '../types/index.js';

export const defaultTheme: Theme = {
  border: {
    color: 'cyan',
    style: 'rounded',
  },
  heading: {
    h1: 'cyan',
    h2: 'green',
    h3: 'yellow',
    h4: 'blue',
    h5: 'magenta',
    h6: 'white',
  },
  text: 'white',
  code: {
    background: 'gray',
    text: 'yellow',
  },
  blockquote: {
    border: 'gray',
    text: 'gray',
  },
  statusBar: {
    background: 'gray',
    text: 'white',
  },
};
