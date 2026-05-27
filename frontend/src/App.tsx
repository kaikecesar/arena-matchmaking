// React
import { GlobalStyles, theme } from '@/styles';
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
