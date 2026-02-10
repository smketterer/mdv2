#!/usr/bin/env node
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('tsx', pathToFileURL('./'));

const { main } = await import('../src/index.tsx');
main();
