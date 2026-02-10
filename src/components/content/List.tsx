import React from 'react';
import { Box, Text } from 'ink';
import type { Tokens } from 'marked';
import { TextFormatting } from './TextFormatting.js';
import { decodeHtml } from '../../utils/decodeHtml.js';

interface ListProps {
  token: Tokens.List;
}

export function List({ token }: ListProps): React.ReactElement {
  const { ordered, start, items } = token;

  return (
    <Box flexDirection="column" marginBottom={1}>
      {items.map((item, index) => {
        const bullet = ordered ? `${(start || 1) + index}.` : '•';
        return (
          <Box key={index} paddingLeft={1}>
            <Text>{bullet} </Text>
            <Box flexDirection="column">
              {item.tokens.map((itemToken, tokenIndex) => {
                if (itemToken.type === 'text' && 'tokens' in itemToken && itemToken.tokens) {
                  return <TextFormatting key={tokenIndex} tokens={itemToken.tokens} />;
                }
                if (itemToken.type === 'text') {
                  return <Text key={tokenIndex}>{decodeHtml(itemToken.text)}</Text>;
                }
                if (itemToken.type === 'list') {
                  return (
                    <Box key={tokenIndex} paddingLeft={2}>
                      <List token={itemToken as Tokens.List} />
                    </Box>
                  );
                }
                return null;
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
