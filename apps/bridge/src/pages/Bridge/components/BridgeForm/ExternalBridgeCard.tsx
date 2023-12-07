import { Card, Flex, P } from '@interlay/ui';
import { ArrowTopRightOnSquare } from '@interlay/icons';

import { StyledAnchor } from './BridgeForm.style';
import { AcrossProtocol, SuperBridge, SynapseProtocol, TBTC } from './ExternalBridges';

type Bridges = 'across-protocol' | 't-btc' | 'synapse-protocol' | 'super-bridge';

// TODO: add missing links
const bridges: Record<Bridges, { icon: () => JSX.Element; href: string; name: string }> = {
  'across-protocol': {
    href: '#',
    icon: AcrossProtocol,
    name: 'Across Protocol'
  },
  't-btc': {
    href: '#',
    icon: TBTC,
    name: 'tBTC'
  },
  'synapse-protocol': {
    href: '#',
    icon: SynapseProtocol,
    name: 'Synapse Protocol'
  },
  'super-bridge': {
    href: '#',
    icon: SuperBridge,
    name: 'Super Bridge'
  }
};

type Props = { bridge: Bridges };

type ExternalBridgeCardProps = Props;

const ExternalBridgeCard = ({ bridge }: ExternalBridgeCardProps): JSX.Element => {
  const { href, name, icon: Icon } = bridges[bridge];

  return (
    <StyledAnchor href={href}>
      <Card
        isHoverable
        isPressable
        alignItems='center'
        background='secondary'
        direction='row'
        justifyContent='space-between'
        padding='spacing4'
        shadowed={false}
      >
        <Flex alignItems='center' gap='spacing2'>
          <Icon />
          <P size='xs'>{name}</P>
        </Flex>
        <ArrowTopRightOnSquare size='s' />
      </Card>
    </StyledAnchor>
  );
};

export { ExternalBridgeCard };
