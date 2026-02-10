import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { useUITheme } from '../context/ThemeContext.js';

interface GoToSlideInputProps {
  totalSlides: number;
  onSubmit: (slideNumber: number) => void;
  onCancel: () => void;
}

export function GoToSlideInput({
  totalSlides,
  onSubmit,
  onCancel,
}: GoToSlideInputProps): React.ReactElement {
  const [value, setValue] = useState('');
  const uiTheme = useUITheme();

  useInput((input, key) => {
    if (key.escape) {
      onCancel();
      return;
    }

    if (key.return) {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 1) {
        onSubmit(num);
      } else {
        onCancel();
      }
      return;
    }

    if (key.backspace || key.delete) {
      setValue((prev) => prev.slice(0, -1));
      return;
    }

    if (input >= '0' && input <= '9') {
      setValue((prev) => prev + input);
    }
  });

  return (
    <Box
      borderStyle="round"
      borderColor={uiTheme.accent}
      paddingX={2}
      paddingY={0}
      flexDirection="column"
      alignItems="center"
    >
      <Text color={uiTheme.text}>
        Go to slide (1-{totalSlides}):{' '}
        <Text color={uiTheme.accent} bold>
          {value}
        </Text>
        <Text color={uiTheme.muted}>_</Text>
      </Text>
    </Box>
  );
}
