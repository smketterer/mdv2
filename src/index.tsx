import React from 'react';
import { render } from 'ink';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from 'commander';
import { App } from './app.js';
import type { BorderStyle, CodeTheme } from './types/index.js';
import { codeThemeNames } from './themes/codeThemes.js';

const program = new Command();

program
  .name('cli-present')
  .description('A CLI presentation tool that displays Markdown files as terminal slides')
  .version('1.0.0')
  .argument('<file>', 'Markdown file to present')
  .option('-s, --start <number>', 'Starting slide number', '1')
  .option(
    '-b, --border <style>',
    'Border style (single, double, rounded, bold)',
    'rounded'
  )
  .option(
    '-t, --theme <theme>',
    'Color theme (default, monokai, dracula, github, nord)',
    'default'
  )
  .action((file: string, options: { start: string; border: string; theme: string }) => {
    const filePath = resolve(process.cwd(), file);

    if (!existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(1);
    }

    let content: string;
    try {
      content = readFileSync(filePath, 'utf-8');
    } catch (err) {
      console.error(`Error reading file: ${(err as Error).message}`);
      process.exit(1);
    }

    const startSlide = parseInt(options.start, 10);
    if (isNaN(startSlide) || startSlide < 1) {
      console.error('Error: --start must be a positive integer');
      process.exit(1);
    }

    const validBorderStyles = ['single', 'double', 'rounded', 'bold'];
    if (!validBorderStyles.includes(options.border)) {
      console.error(
        `Error: --border must be one of: ${validBorderStyles.join(', ')}`
      );
      process.exit(1);
    }

    if (!codeThemeNames.includes(options.theme)) {
      console.error(
        `Error: --theme must be one of: ${codeThemeNames.join(', ')}`
      );
      process.exit(1);
    }

    const borderStyle = options.border as BorderStyle;
    const theme = options.theme as CodeTheme;

    const { unmount, waitUntilExit } = render(
      <App
        content={content}
        startSlide={startSlide}
        borderStyle={borderStyle}
        theme={theme}
        onQuit={() => {
          unmount();
        }}
      />
    );

    waitUntilExit().then(() => {
      process.exit(0);
    });
  });

export function main(): void {
  program.parse();
}

// Run if executed directly
const isDirectRun = process.argv[1]?.includes('index.tsx') ||
                    process.argv[1]?.includes('cli-present');
if (isDirectRun) {
  main();
}
