import type { DefaultTheme } from 'styled-components';
import { StyledEyebrow } from './Eyebrow.styles';

export interface EyebrowProps {
  children: React.ReactNode;
  $color?: keyof DefaultTheme['colors'];
  as?: React.ElementType;
}

export function Eyebrow({ children, $color, as }: EyebrowProps): React.ReactElement {
  return (
    <StyledEyebrow as={as} $color={$color}>
      {children}
    </StyledEyebrow>
  );
}
