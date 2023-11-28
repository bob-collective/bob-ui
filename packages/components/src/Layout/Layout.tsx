import { HTMLAttributes } from 'react';

import { Header } from './Header';
import { StyledLayout, StyledMain } from './Layout.style';
import { Footer } from './Footer';

type Props = {};

type NattiveAttrs = Omit<HTMLAttributes<unknown>, keyof Props>;

type LayoutProps = Props & NattiveAttrs;

const Layout = (props: LayoutProps): JSX.Element => (
  <StyledLayout direction='column'>
    <Header />
    <StyledMain direction='column' elementType='main' flex={1} {...props} />
    <Footer />
  </StyledLayout>
);

export { Layout };
export type { LayoutProps };
