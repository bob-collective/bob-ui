import { Flex } from '@interlay/ui';

import { StyledWrapper } from './Header.style';

type Props = {};

type InheritAttrs = Omit<any, keyof Props>;

type HeaderProps = Props & InheritAttrs;

const Header = ({}: HeaderProps): JSX.Element => {
  return (
    <StyledWrapper alignItems='center' elementType='header' justifyContent='space-between'>
      <Flex>
        <a aria-label='navigate to home page' href='/'>
          <img
            alt='logo'
            src='https://uploads-ssl.webflow.com/64e85c2f3609488b3ed725f4/64ede4ad095a0a3801df095f_BobLogo.svg'
            width='137'
          />
        </a>
      </Flex>
    </StyledWrapper>
  );
};

export { Header };
export type { HeaderProps };
