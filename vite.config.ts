import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'node18',
    outDir: 'dist',
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        /^node:/,
        'react',
        'react/jsx-runtime',
        'ink',
        'ink-syntax-highlight',
        'chalk',
        'commander',
        'marked',
      ],
      output: {
        banner: '#!/usr/bin/env node',
      },
    },
    emptyOutDir: true,
  },
});
