export type TextVariant = 'body' | 'label' | 'eyebrow' | 'heading' | 'subheading'

export interface TextProps {
  children: React.ReactNode
  as?: React.ElementType
  variant?: TextVariant
}
