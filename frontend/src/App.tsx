import type { ReactElement } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme } from '@/styles'
import { Login } from '@/features/auth/Login'
import { ROUTES } from '@/constants/routes'

export function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
