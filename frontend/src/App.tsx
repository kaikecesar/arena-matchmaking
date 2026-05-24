// React
import type { ReactElement } from 'react'

// Libs
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

// Context
import { AuthProvider } from '@/context/AuthProvider'

// Features
import { AuthRoutes } from '@/routes/AuthRoutes'

// Style
import { GlobalStyles, theme } from '@/styles'

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <AuthRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export { App }
