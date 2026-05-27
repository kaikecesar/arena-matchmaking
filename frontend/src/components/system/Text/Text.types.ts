// Core
import { ReactNode } from 'react';

export enum TextVariant {
  body = 'body',
  label = 'label',
  eyebrow = 'eyebrow',
  heading = 'heading',
  subheading = 'subheading',
}

export interface TextProps {
  children: ReactNode;
  testId?: string | undefined;
  variant?: TextVariant;
}
