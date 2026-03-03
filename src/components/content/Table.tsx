import React from 'react';
import { Box, Text } from 'ink';
import type { Token, Tokens } from 'marked';
import { useUITheme } from '../../context/ThemeContext.js';
import { decodeHtml } from '../../utils/decodeHtml.js';
import type { UITheme } from '../../themes/uiThemes.js';

interface TableProps {
  token: Tokens.Table;
}

// Calculate the visual width of tokens (what's actually displayed)
function getVisualWidth(tokens: Token[] | undefined, fallbackText: string): number {
  if (!tokens || tokens.length === 0) {
    return decodeHtml(fallbackText).length;
  }

  return tokens.reduce((width, token) => {
    switch (token.type) {
      case 'text':
        return width + decodeHtml((token as Tokens.Text).text).length;
      case 'codespan':
        return width + decodeHtml((token as Tokens.Codespan).text).length;
      case 'strong':
        return width + getVisualWidth((token as Tokens.Strong).tokens, (token as Tokens.Strong).text);
      case 'em':
        return width + getVisualWidth((token as Tokens.Em).tokens, (token as Tokens.Em).text);
      case 'link':
        return width + decodeHtml((token as Tokens.Link).text).length;
      case 'del':
        return width + getVisualWidth((token as Tokens.Del).tokens, '');
      default:
        if ('text' in token) {
          return width + decodeHtml((token as { text: string }).text).length;
        }
        return width;
    }
  }, 0);
}

// Render inline tokens within a table cell
function renderCellTokens(tokens: Token[], uiTheme: UITheme): React.ReactNode {
  return tokens.map((token, index) => {
    switch (token.type) {
      case 'text':
        return <Text key={index}>{decodeHtml((token as Tokens.Text).text)}</Text>;
      case 'codespan':
        return (
          <Text key={index} color={uiTheme.inlineCode}>
            {decodeHtml((token as Tokens.Codespan).text)}
          </Text>
        );
      case 'strong':
        return (
          <Text key={index} bold>
            {(token as Tokens.Strong).tokens
              ? renderCellTokens((token as Tokens.Strong).tokens, uiTheme)
              : decodeHtml((token as Tokens.Strong).text)}
          </Text>
        );
      case 'em':
        return (
          <Text key={index} italic>
            {(token as Tokens.Em).tokens
              ? renderCellTokens((token as Tokens.Em).tokens, uiTheme)
              : decodeHtml((token as Tokens.Em).text)}
          </Text>
        );
      case 'link':
        return (
          <Text key={index} color={uiTheme.accent} underline>
            {decodeHtml((token as Tokens.Link).text)}
          </Text>
        );
      case 'del':
        return (
          <Text key={index} strikethrough>
            {(token as Tokens.Del).tokens
              ? renderCellTokens((token as Tokens.Del).tokens, uiTheme)
              : ''}
          </Text>
        );
      default:
        if ('text' in token) {
          return <Text key={index}>{decodeHtml((token as { text: string }).text)}</Text>;
        }
        return null;
    }
  });
}

export function Table({ token }: TableProps): React.ReactElement {
  const uiTheme = useUITheme();
  const { header, rows, align } = token;

  // Calculate column widths based on visual width (rendered content)
  const colWidths = header.map((cell, colIndex) => {
    const headerWidth = getVisualWidth(cell.tokens, cell.text);
    const maxRowWidth = rows.reduce((max, row) => {
      const rowCell = row[colIndex];
      if (!rowCell) return max;
      return Math.max(max, getVisualWidth(rowCell.tokens, rowCell.text));
    }, 0);
    return Math.max(headerWidth, maxRowWidth);
  });

  // Box drawing characters
  const chars = {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
    leftT: '├',
    rightT: '┤',
    topT: '┬',
    bottomT: '┴',
    cross: '┼',
  };

  // Calculate padding needed for a cell
  const getPadding = (cell: Tokens.TableCell, width: number, alignment: string | null) => {
    const visualWidth = getVisualWidth(cell.tokens, cell.text);
    const padding = width - visualWidth;
    if (padding <= 0) return { left: 0, right: 0 };

    if (alignment === 'right') {
      return { left: padding, right: 0 };
    } else if (alignment === 'center') {
      const left = Math.floor(padding / 2);
      return { left, right: padding - left };
    }
    return { left: 0, right: padding };
  };

  // Build horizontal border line
  const buildHorizontalLine = (left: string, right: string, t: string) => {
    return (
      left +
      colWidths.map((w) => chars.horizontal.repeat(w + 2)).join(t) +
      right
    );
  };

  const topBorder = buildHorizontalLine(chars.topLeft, chars.topRight, chars.topT);
  const headerSeparator = buildHorizontalLine(chars.leftT, chars.rightT, chars.cross);
  const bottomBorder = buildHorizontalLine(chars.bottomLeft, chars.bottomRight, chars.bottomT);

  // Render a cell with proper padding and formatting
  const renderCell = (cell: Tokens.TableCell, colIndex: number, isBold: boolean) => {
    const padding = getPadding(cell, colWidths[colIndex], align[colIndex]);
    const content = cell.tokens ? renderCellTokens(cell.tokens, uiTheme) : decodeHtml(cell.text);

    return (
      <React.Fragment key={colIndex}>
        <Text>
          {' '}{' '.repeat(padding.left)}
        </Text>
        {isBold ? <Text bold>{content}</Text> : <Text>{content}</Text>}
        <Text>
          {' '.repeat(padding.right)}{' '}
        </Text>
        <Text color={uiTheme.border}>{chars.vertical}</Text>
      </React.Fragment>
    );
  };

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color={uiTheme.border}>{topBorder}</Text>
      <Text>
        <Text color={uiTheme.border}>{chars.vertical}</Text>
        {header.map((cell, i) => renderCell(cell, i, true))}
      </Text>
      <Text color={uiTheme.border}>{headerSeparator}</Text>
      {rows.map((row, rowIndex) => (
        <Text key={rowIndex}>
          <Text color={uiTheme.border}>{chars.vertical}</Text>
          {row.map((cell, i) => renderCell(cell, i, false))}
        </Text>
      ))}
      <Text color={uiTheme.border}>{bottomBorder}</Text>
    </Box>
  );
}
