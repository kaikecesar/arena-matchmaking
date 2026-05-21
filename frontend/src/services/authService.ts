import type { LoginApiResponse, LoginFormValues } from '@/features/auth/Login/Login.types'

const AUTH_ENDPOINT = '/api/v1/auth/login'

export const authService = {
  async login(payload: LoginFormValues): Promise<LoginApiResponse> {
    const response = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorBody = (await response.json()) as unknown
      throw { status: response.status, body: errorBody }
    }

    return response.json()
  },
}
