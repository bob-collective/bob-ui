import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useAccount } from '@gobob/wagmi';
import { useButton, AriaButtonOptions } from '@react-aria/button';
import { chain } from '@react-aria/utils';
import { useRef } from 'react';
import { Flex, Span } from '@interlay/ui';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { StyledButton, StyledConnectWallet } from './ConnectWallet.style';

const truncateAddress = (address: string) => address.substring(0, 4) + '...' + address.substring(address.length - 4);

type Props = {};

type InheritAttrs = AriaButtonOptions<'button'>;

type ConnectWalletProps = Props & InheritAttrs;

const ConnectWallet = ({ onPress, ...props }: ConnectWalletProps): JSX.Element => {
  const ref = useRef(null);
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const { buttonProps } = useButton({ onPress: chain(open, onPress), ...props }, ref);

  return (
    <StyledButton ref={ref} {...buttonProps}>
      {address ? (
        <Flex alignItems='center' elementType='span' gap='spacing2'>
          <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
          <Span size='s'>{truncateAddress(address)}</Span>
        </Flex>
      ) : (
        <StyledConnectWallet size='s'>Connect Wallet</StyledConnectWallet>
      )}
    </StyledButton>
  );
};

export { ConnectWallet };
export type { ConnectWalletProps };
