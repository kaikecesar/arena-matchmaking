// Core
import { BrandMark } from '@/components/ui/BrandMark';
import type { BrandMarkProps } from '@/components/ui/BrandMark/BrandMark.types';
import { theme } from '@/styles';
import { render, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import type { JSX } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
/* *************** TEST SUPPORT VARS *************** */

const renderBrandMark = (
  overrides: Partial<BrandMarkProps> = {},
): RenderResult => {
  const props: BrandMarkProps = {
    ...overrides,
  };

  const element: JSX.Element = (
    <ThemeProvider theme={theme}>
      <BrandMark {...props} />
    </ThemeProvider>
  );

  return render(element);
};

/* *************** TEST EXECUTION *************** */

describe('BrandMark', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // WORDMARK *******************************

  it('should render the arena wordmark', (): void => {
    renderBrandMark();

    expect(screen.getByText('ARENA')).toBeInTheDocument();
  });

  it('should render the matchmaking subtitle', (): void => {
    renderBrandMark();

    expect(screen.getByText('MATCHMAKING')).toBeInTheDocument();
  });

  // ICON *******************************

  it('should render the icon mark as an svg', (): void => {
    const { container }: RenderResult = renderBrandMark();

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render the default icon size when no size is provided', (): void => {
    const { container }: RenderResult = renderBrandMark();

    const svg: SVGSVGElement | null = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '16');
  });

  it('should scale the icon size relative to the provided size', (): void => {
    const { container }: RenderResult = renderBrandMark({ size: 56 });

    const svg: SVGSVGElement | null = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '32');
  });
});
