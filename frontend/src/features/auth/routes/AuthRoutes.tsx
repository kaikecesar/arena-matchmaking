import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Login } from '@/features/auth/Login'
import { CreateAccount } from '@/features/auth/CreateAccount/CreateAccount'
import { ForgotPassword } from '@/features/auth/ForgotPassword/ForgotPassword'
import { ResetPassword } from '@/features/auth/ResetPassword/ResetPassword'
import { OrganizerDashboard } from '@/features/auth/Dashboard/OrganizerDashboard'
import { AthleteDashboard } from '@/features/auth/Dashboard/AthleteDashboard'
import { CoachDashboard } from '@/features/auth/Dashboard/CoachDashboard'
import { UserRole } from '@/features/auth/types'
import { GuestRoute } from './GuestRoute'
import { ProtectedRoute } from './ProtectedRoute'

export function AuthRoutes(): ReactElement {
  return (
    <Routes>
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

      <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
    </Routes>
  )
}
