import { Flex } from '@interlay/ui';

import { ConnectWallet, ConnectWalletProps } from '../ConnectWallet';

import { StyledBadge, StyledLogo, StyledHeader } from './Layout.style';

type Props = {};

type InheritAttrs = Omit<ConnectWalletProps, keyof Props>;

type HeaderProps = Props & InheritAttrs;

const Header = ({}: HeaderProps): JSX.Element => {
  return (
    <StyledHeader alignItems='center' elementType='header' justifyContent='space-between'>
      <Flex alignItems='center'>
        <StyledLogo aria-label='navigate to home page' to='/'>
          <img
            alt='logo'
            src='https://uploads-ssl.webflow.com/64e85c2f3609488b3ed725f4/64ede4ad095a0a3801df095f_BobLogo.svg'
            width='83'
          />
        </StyledLogo>
        <StyledBadge size='s'>Testnet</StyledBadge>
      </Flex>
      <ConnectWallet />
    </StyledHeader>
  );
};

export { Header };
export type { HeaderProps };
