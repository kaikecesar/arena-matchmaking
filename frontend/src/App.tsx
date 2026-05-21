import type { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme } from '@/styles'
import { AuthProvider } from '@/features/auth/context/AuthProvider'
import { AuthRoutes } from '@/features/auth/routes/AuthRoutes'

export function App(): ReactElement {
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
