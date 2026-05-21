export interface StackProps {
  children: React.ReactNode;
  as?: React.ElementType;
  direction?: 'row' | 'column';
  gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  align?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}
