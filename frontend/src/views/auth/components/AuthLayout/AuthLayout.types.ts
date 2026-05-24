import type { ReactNode } from 'react'

export interface AuthLayoutProps {
  children: ReactNode;
  footer?: ReactNode | undefined;
  wide?: boolean | undefined;
}
