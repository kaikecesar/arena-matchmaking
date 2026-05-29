// Application
import { apiClient } from '@/plugins/api';
import {
  loginBodySchema,
  registerBodySchema,
} from './auth.schemas';

// Types
import { LoginBody, RegisterBody, RegisterResponse } from '@/types/api';

const login = async (body: LoginBody): Promise<void> => {
  const payload = loginBodySchema.parse(body);

  await apiClient.post('/login', payload);
};

const logout = async (): Promise<void> => {
  await apiClient.post('/logout');
};

const register = async (body: RegisterBody): Promise<RegisterResponse> => {
  const payload = registerBodySchema.parse(body);
  const { data } = await apiClient.post<RegisterResponse>('/users', payload);

  return data;
};

const authService = {
  login,
  logout,
  register,
};

export { authService };
