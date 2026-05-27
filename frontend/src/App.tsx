// React
import type { ReactElement } from 'react'

// Style
import { GlobalStyles, theme } from '@/styles'

// Libraries
import { ThemeProvider } from 'styled-components'

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  )
}

export { App }
