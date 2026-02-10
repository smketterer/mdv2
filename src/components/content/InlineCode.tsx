import React from 'react';
import { Text } from 'ink';
import type { Tokens } from 'marked';

interface InlineCodeProps {
  token: Tokens.Codespan;
}

export function InlineCode({ token }: InlineCodeProps): React.ReactElement {
  return (
    <Text color="yellow" backgroundColor="gray">
      {` ${token.text} `}
    </Text>
  );
}
