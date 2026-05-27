// Core
import type { ReactNode } from 'react';

export enum TextVariant {
  body = 'body',
  label = 'label',
  eyebrow = 'eyebrow',
  heading = 'heading',
  subheading = 'subheading',
}

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
}
