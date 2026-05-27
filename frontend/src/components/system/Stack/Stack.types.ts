export enum StackDirection {
  row = 'row',
  column = 'column',
}

export enum StackGap {
  xxs = 'xxs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
  xxxl = 'xxxl',
}

export enum StackAlign {
  stretch = 'stretch',
  flexStart = 'flex-start',
  center = 'center',
  flexEnd = 'flex-end',
  baseline = 'baseline',
}

export enum StackJustify {
  flexStart = 'flex-start',
  center = 'center',
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
}

export interface StackProps {
  children: React.ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
}
