import { ConnectWallet, ConnectWalletProps } from '../ConnectWallet';

import { StyledLogo, StyledHeader } from './Layout.style';

type Props = {};

type InheritAttrs = Omit<ConnectWalletProps, keyof Props>;

type HeaderProps = Props & InheritAttrs;

const Header = ({}: HeaderProps): JSX.Element => {
  return (
    <StyledHeader alignItems='center' elementType='header' justifyContent='space-between'>
      <StyledLogo aria-label='navigate to home page' to='/'>
        <img
          alt='logo'
          src='https://uploads-ssl.webflow.com/64e85c2f3609488b3ed725f4/64ede4ad095a0a3801df095f_BobLogo.svg'
          width='83'
        />
      </StyledLogo>
      <ConnectWallet />
    </StyledHeader>
  );
};

export { Header };
export type { HeaderProps };
