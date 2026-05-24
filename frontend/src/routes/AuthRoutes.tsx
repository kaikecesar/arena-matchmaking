// Core
import type { JSX } from 'react'

// Libraries
import { Navigate, Route, Routes } from 'react-router-dom'

// Components
import { CreateAccount } from '@/views/CreateAccount/CreateAccount'
import { AthleteDashboard } from '@/views/Dashboard/AthleteDashboard'
import { CoachDashboard } from '@/views/Dashboard/CoachDashboard'
import { OrganizerDashboard } from '@/views/Dashboard/OrganizerDashboard'
import { ForgotPassword } from '@/views/ForgotPassword/ForgotPassword'
import { Login } from '@/views/Login'
import { ResetPassword } from '@/views/ResetPassword/ResetPassword'
import { GuestRoute } from '@/routes/GuestRoute'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

// Constants
import { ROUTES } from '@/routes/routes'

// Types
import { UserRole } from '@/types/auth'

function AuthRoutes(): JSX.Element {
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
