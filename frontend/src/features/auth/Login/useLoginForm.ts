import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  loginSchema,
  LoginErrorCode,
  ROLE_REDIRECT,
} from './Login.types';
import type { LoginFormValues, LoginApiResponse, LoginApiError } from './Login.types';
import { authStrings } from '@/i18n/pt-BR/auth';

// ─── CPF display formatting ───────────────────────────────────────────────────

function formatCPF(digits: string): string {
  const d = digits.slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

// ─── Return type (fully typed — no any) ──────────────────────────────────────

export interface UseLoginFormReturn {
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  generalError: string | null;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  keepSession: boolean;
  onKeepSessionChange: (checked: boolean) => void;
  identifierDisplayValue: string;
  onIdentifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
}

// ─── Type guard for API error shape ──────────────────────────────────────────

function isLoginApiError(value: unknown): value is LoginApiError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    typeof (value as Record<string, unknown>).error === 'string'
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLoginForm(): UseLoginFormReturn {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', keepSession: true },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [identifierDisplayValue, setIdentifierDisplayValue] = useState('');

  const keepSession = watch('keepSession');
  const passwordValue = watch('password') ?? '';

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onKeepSessionChange = (checked: boolean): void => {
    setValue('keepSession', checked);
  };

  const onIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value;
    const isEmail = raw.includes('@');

    if (isEmail) {
      setIdentifierDisplayValue(raw);
      setValue('identifier', raw, { shouldValidate: false });
    } else {
      const digits = raw.replace(/\D/g, '');
      setIdentifierDisplayValue(formatCPF(digits));
      // Store raw digits — backend expects no formatting
      setValue('identifier', digits, { shouldValidate: false });
    }
  };

  const onValid = async (data: LoginFormValues): Promise<void> => {
    setIsLoading(true);
    setGeneralError(null);

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
          keepSession: data.keepSession,
        }),
      });

      if (response.ok) {
        const body = (await response.json()) as LoginApiResponse;
        void navigate(ROLE_REDIRECT[body.user.role]);
        return;
      }

      const errorBody: unknown = await response.json();

      if (response.status === 429) {
        setGeneralError(authStrings.errorRateLimited);
        return;
      }

      if (response.status === 401) {
        setGeneralError(
          isLoginApiError(errorBody) &&
          errorBody.error === LoginErrorCode.INVALID_CREDENTIALS
            ? authStrings.errorInvalidCredentials
            : authStrings.errorGeneric,
        );
        return;
      }

      setGeneralError(authStrings.errorGeneric);
    } catch {
      setGeneralError(authStrings.errorGeneric);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    void rhfHandleSubmit(onValid)(e);
  };

  return {
    register,
    errors,
    handleSubmit,
    isLoading,
    generalError,
    isPasswordVisible,
    togglePasswordVisibility,
    keepSession,
    onKeepSessionChange,
    identifierDisplayValue,
    onIdentifierChange,
    passwordValue,
  };
}
