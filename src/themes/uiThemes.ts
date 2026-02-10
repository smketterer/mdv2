export interface UITheme {
  border: string;
  heading: {
    h1: string;
    h2: string;
    h3: string;
  };
  text: string;
  accent: string;
  muted: string;
  blockquoteBorder: string;
  inlineCode: string;
}

export const uiThemes: Record<string, UITheme> = {
  default: {
    border: 'cyan',
    heading: {
      h1: 'cyan',
      h2: 'green',
      h3: 'yellow',
    },
    text: 'white',
    accent: 'cyan',
    muted: 'gray',
    blockquoteBorder: 'gray',
    inlineCode: 'yellow',
  },

  monokai: {
    border: '#A6E22E',      // Green
    heading: {
      h1: '#F92672',        // Pink
      h2: '#A6E22E',        // Green
      h3: '#E6DB74',        // Yellow
    },
    text: '#F8F8F2',        // White
    accent: '#66D9EF',      // Cyan
    muted: '#75715E',       // Comment gray
    blockquoteBorder: '#75715E',
    inlineCode: '#E6DB74',  // Yellow
  },

  dracula: {
    border: '#BD93F9',      // Purple
    heading: {
      h1: '#FF79C6',        // Pink
      h2: '#50FA7B',        // Green
      h3: '#F1FA8C',        // Yellow
    },
    text: '#F8F8F2',        // White
    accent: '#8BE9FD',      // Cyan
    muted: '#6272A4',       // Comment
    blockquoteBorder: '#6272A4',
    inlineCode: '#F1FA8C',  // Yellow
  },

  github: {
    border: '#005CC5',      // Blue
    heading: {
      h1: '#005CC5',        // Blue
      h2: '#6F42C1',        // Purple
      h3: '#22863A',        // Green
    },
    text: '#24292E',        // Dark gray
    accent: '#005CC5',      // Blue
    muted: '#6A737D',       // Gray
    blockquoteBorder: '#6A737D',
    inlineCode: '#D73A49',  // Red
  },

  nord: {
    border: '#88C0D0',      // Frost cyan
    heading: {
      h1: '#88C0D0',        // Frost cyan
      h2: '#81A1C1',        // Frost blue
      h3: '#A3BE8C',        // Green
    },
    text: '#ECEFF4',        // Snow white
    accent: '#88C0D0',      // Frost cyan
    muted: '#616E88',       // Comment
    blockquoteBorder: '#616E88',
    inlineCode: '#EBCB8B',  // Yellow
  },
};
