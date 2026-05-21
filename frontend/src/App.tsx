// Types
import type { ReactElement } from 'react'

// Libraries
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

// Components
import { AuthRoutes } from '@/features/auth/routes/AuthRoutes'

// Context
import { AuthProvider } from '@/features/auth/context/AuthProvider'

// Styles
import { GlobalStyles, theme } from '@/styles'

const App = (): ReactElement => {
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
