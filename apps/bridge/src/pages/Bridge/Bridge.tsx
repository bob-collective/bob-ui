import { MessageStatus } from '@eth-optimism/sdk';
import { useAccount } from '@gobob/wagmi';
import { H1, H2, P, TextLink } from '@interlay/ui';
import { useMemo } from 'react';

import { StyledBridge, StyledCard, StyledSection } from './Bridge.style';
import { ActivityCard, BridgeForm } from './components';
import { useGetDeposits } from './hooks/useGetDeposits';

// TODO: limit activity list to 6 items
const Bridge = (): JSX.Element => {
  const { address } = useAccount();
  const { data: deposits } = useGetDeposits();

  const ongoingDeposits = useMemo(
    () =>
      deposits
        ? deposits?.filter(
            (deposit) =>
              deposit.status !== MessageStatus.RELAYED && deposit.status !== MessageStatus.FAILED_L1_TO_L2_MESSAGE
          )
        : [],
    [deposits]
  );

  const completedDeposits = useMemo(
    () => (deposits ? deposits?.filter((deposit) => deposit.status === MessageStatus.RELAYED) : []),
    [deposits]
  );

  return (
    <StyledBridge gap='spacing4'>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H1 size='base'>Bridge</H1>
        <BridgeForm />
      </StyledSection>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H2 size='base'>Activity</H2>
        {ongoingDeposits.length > 0 ? (
          ongoingDeposits.map((deposit) => (
            <ActivityCard key={deposit.transactionHash} deposit={deposit} status='ongoing' />
          ))
        ) : (
          <StyledCard gap='spacing2'>
            <P align='center' size='xs'>
              No bridging operations in process
            </P>
          </StyledCard>
        )}

        {completedDeposits.length > 0 &&
          completedDeposits.map((deposit) => (
            <ActivityCard key={deposit.transactionHash} deposit={deposit} status='completed' />
          ))}
        <TextLink external href={`https://sepolia.etherscan.io/address/${address}`} icon size='xs'>
          View All Transactions
        </TextLink>
      </StyledSection>
    </StyledBridge>
  );
};

export { Bridge };
