import React from 'react';
import type { Token, Tokens } from 'marked';
import { Heading } from '../components/content/Heading.js';
import { Paragraph } from '../components/content/Paragraph.js';
import { CodeBlock } from '../components/content/CodeBlock.js';
import { List } from '../components/content/List.js';
import { Blockquote } from '../components/content/Blockquote.js';
import { Table } from '../components/content/Table.js';
import { Text } from 'ink';
import { decodeHtml } from './decodeHtml.js';

export function tokenToComponent(token: Token, key: number): React.ReactNode {
  switch (token.type) {
    case 'heading':
      return <Heading key={key} token={token as Tokens.Heading} />;

    case 'paragraph':
      return <Paragraph key={key} token={token as Tokens.Paragraph} />;

    case 'code':
      return <CodeBlock key={key} token={token as Tokens.Code} />;

    case 'list':
      return <List key={key} token={token as Tokens.List} />;

    case 'blockquote':
      return <Blockquote key={key} token={token as Tokens.Blockquote} />;

    case 'space':
      return null;

    case 'html':
      // Skip HTML tokens in terminal
      return null;

    case 'table':
      return <Table key={key} token={token as Tokens.Table} />;

    default:
      // For any unhandled token types, try to render text if available
      if ('text' in token && typeof token.text === 'string') {
        return <Text key={key}>{decodeHtml(token.text)}</Text>;
      }
      return null;
  }
}
