// Core
import { ReactElement } from 'react';

// Config
import { theme } from '@/config/theme';

// Libraries
import { ThemeProvider } from 'styled-components';

// Style
import { GlobalStyles } from '@/styles';

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export { App };
