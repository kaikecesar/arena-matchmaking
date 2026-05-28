// Core
import { JSX } from 'react';

// Config
import { theme } from '@/styles';

// Libraries
import { render, RenderResult, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

// Component
import {
  BrandMark,
  BrandMarkProps,
} from '.';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps = {
  testId: 'brand-mark-test',
} satisfies BrandMarkProps;

const BrandMarkElement = (props: BrandMarkProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <BrandMark {...props} />
  </ThemeProvider>
);

const renderBrandMark = (
  overrides: Partial<BrandMarkProps> = {},
): RenderResult => {
  const props: BrandMarkProps = {
    ...defaultProps,
    ...overrides,
  };

  return render(<BrandMarkElement {...props} />);
};

/* *************** TEST EXECUTION *************** */

describe('BrandMark', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // DEFAULT PROPS *******************************

  it('should match snapshot when [defaultProps] is passed', (): void => {
    render(<BrandMarkElement {...defaultProps} />);

    expect(screen.getByTestId(defaultProps.testId)).toMatchSnapshot();
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
