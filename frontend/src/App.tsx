// Config
import { theme } from '@/config/theme';

// React
import { GlobalStyles } from '@/styles';
import type { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export { App };
