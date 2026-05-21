export enum TextVariant {
  Body = 'body',
  Label = 'label',
  Eyebrow = 'eyebrow',
  Heading = 'heading',
  Subheading = 'subheading',
}

export interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
}
