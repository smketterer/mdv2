import React from 'react';
import { Text } from 'ink';
import type { Token, Tokens } from 'marked';
import { useUITheme } from '../../context/ThemeContext.js';
import type { UITheme } from '../../themes/uiThemes.js';
import { decodeHtml } from '../../utils/decodeHtml.js';

interface TextFormattingProps {
  tokens: Token[] | undefined;
}

export function TextFormatting({ tokens }: TextFormattingProps): React.ReactElement {
  const uiTheme = useUITheme();

  if (!tokens || tokens.length === 0) {
    return <Text></Text>;
  }

  return (
    <Text>
      {tokens.map((token, index) => renderInlineToken(token, index, uiTheme))}
    </Text>
  );
}

function renderInlineToken(token: Token, key: number, uiTheme: UITheme): React.ReactNode {
  switch (token.type) {
    case 'text':
      return <Text key={key}>{decodeHtml((token as Tokens.Text).text)}</Text>;

    case 'strong':
      return (
        <Text key={key} bold>
          {(token as Tokens.Strong).tokens?.map((t, i) => renderInlineToken(t, i, uiTheme))}
        </Text>
      );

    case 'em':
      return (
        <Text key={key} italic>
          {(token as Tokens.Em).tokens?.map((t, i) => renderInlineToken(t, i, uiTheme))}
        </Text>
      );

    case 'codespan':
      return (
        <Text key={key} color={uiTheme.inlineCode}>
          {decodeHtml((token as Tokens.Codespan).text)}
        </Text>
      );

    case 'link':
      return (
        <Text key={key} color={uiTheme.accent} underline>
          {decodeHtml((token as Tokens.Link).text)}
        </Text>
      );

    case 'del':
      return (
        <Text key={key} strikethrough>
          {(token as Tokens.Del).tokens?.map((t, i) => renderInlineToken(t, i, uiTheme))}
        </Text>
      );

    case 'escape':
      return <Text key={key}>{decodeHtml((token as Tokens.Escape).text)}</Text>;

    default:
      if ('text' in token) {
        return <Text key={key}>{decodeHtml((token as { text: string }).text)}</Text>;
      }
      return null;
  }
}
