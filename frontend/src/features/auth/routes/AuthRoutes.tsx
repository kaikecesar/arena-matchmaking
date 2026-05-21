// Core
import type { ReactElement } from 'react'

// Libraries
import { Navigate, Route, Routes } from 'react-router-dom'

// Components
import { CreateAccount } from '@/features/auth/CreateAccount/CreateAccount'
import { AthleteDashboard } from '@/features/auth/Dashboard/AthleteDashboard'
import { CoachDashboard } from '@/features/auth/Dashboard/CoachDashboard'
import { OrganizerDashboard } from '@/features/auth/Dashboard/OrganizerDashboard'
import { ForgotPassword } from '@/features/auth/ForgotPassword/ForgotPassword'
import { Login } from '@/features/auth/Login'
import { ResetPassword } from '@/features/auth/ResetPassword/ResetPassword'
import { GuestRoute } from '@/features/auth/routes/GuestRoute'
import { ProtectedRoute } from '@/features/auth/routes/ProtectedRoute'

// Constants
import { ROUTES } from '@/constants/routes'

// Types
import { UserRole } from '@/features/auth/types'

const AuthRoutes = (): ReactElement => {
  return (
    <Routes>
      {/* ******************************************************************************************
        *************************************** GUEST ROUTES ***************************************
        **************************************************************************************** */}
      <Route
        path={ROUTES.login}
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.register}
        element={
          <GuestRoute>
            <CreateAccount />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.forgotPassword}
        element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        }
      />
      <Route
        path={ROUTES.resetPassword}
        element={
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        }
      />

      {/* ******************************************************************************************
        ************************************* PROTECTED ROUTES *************************************
        **************************************************************************************** */}
      <Route
        path={ROUTES.dashboardEvents}
        element={
          <ProtectedRoute allowedRoles={[UserRole.organizer]}>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.dashboardAthletes}
        element={
          <ProtectedRoute allowedRoles={[UserRole.coach]}>
            <CoachDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.profile}
        element={
          <ProtectedRoute allowedRoles={[UserRole.athlete]}>
            <AthleteDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.dashboard}
        element={
          <ProtectedRoute>
            <Navigate to={ROUTES.dashboardEvents} replace />
          </ProtectedRoute>
        }
      />

      {/* ******************************************************************************************
        ************************************* FALLBACK ROUTES **************************************
        **************************************************************************************** */}
      <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
    </Routes>
  )
}

export { AuthRoutes }
