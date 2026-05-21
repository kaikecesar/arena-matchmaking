export enum StackDirection {
  Row = 'row',
  Column = 'column',
}

export enum StackGap {
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl',
}

export enum StackAlign {
  Stretch = 'stretch',
  FlexStart = 'flex-start',
  Center = 'center',
  FlexEnd = 'flex-end',
  Baseline = 'baseline',
}

export enum StackJustify {
  FlexStart = 'flex-start',
  Center = 'center',
  FlexEnd = 'flex-end',
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around',
  SpaceEvenly = 'space-evenly',
}

export interface StackProps {
  children: React.ReactNode
  direction?: StackDirection
  gap?: StackGap
  align?: StackAlign
  justify?: StackJustify
}
