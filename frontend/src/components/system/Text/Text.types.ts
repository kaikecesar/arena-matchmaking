export enum TextVariant {
  body = 'body',
  label = 'label',
  eyebrow = 'eyebrow',
  heading = 'heading',
  subheading = 'subheading',
}

export interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
}
