import { MessageStatus } from '@eth-optimism/sdk';
import { useAccount } from '@gobob/wagmi';
import { H1, H2, P, Spinner, TextLink } from '@interlay/ui';

import { StyledBridge, StyledCard, StyledSection } from './Bridge.style';
import { ActivityCard, BridgeForm } from './components';
import { useGetDeposits } from './hooks/useGetDeposits';
import { useGetWithdraws } from './hooks/useGetWithdraws';

function compareObjects(a, b) {
  if (a.blockNumber < b.blockNumber) {
    return -1;
  } else if (a.blockNumber > b.blockNumber) {
    return 1;
  } else {
    if (a.logIndex < b.logIndex) {
      return -1;
    } else if (a.logIndex > b.logIndex) {
      return 1;
    } else {
      return 0;
    }
  }
}

const EmptyCard = () => (
  <StyledCard gap='spacing2'>
    <P align='center' size='xs'>
      No bridging operations in process
    </P>
  </StyledCard>
);

const LoadingCard = () => (
  <StyledCard gap='spacing2'>
    <Spinner color='secondary' />

    <P align='center' size='xs'>
      No bridging operations in process
    </P>
  </StyledCard>
);

// TODO: limit activity list to 6 items
const Bridge = (): JSX.Element => {
  const { address } = useAccount();
  const { data: deposits, isLoading: isLoadingDeposits } = useGetDeposits();
  const { data: withdraws, isLoading: isLoadingWithdraws } = useGetWithdraws();

  // const ongoingDeposits = useMemo(
  //   () =>
  //     deposits
  //       ? deposits?.filter(
  //           (deposit) =>
  //             deposit.status !== MessageStatus.RELAYED && deposit.status !== MessageStatus.FAILED_L1_TO_L2_MESSAGE
  //         )
  //       : [],
  //   [deposits]
  // );

  // const completedDeposits = useMemo(
  //   () => (deposits ? deposits?.filter((deposit) => deposit.status === MessageStatus.RELAYED) : []),
  //   [deposits]
  // );

  const transactions = [...(deposits || []), ...(withdraws || [])].sort((a, b) => {
    // First, compare blockNumber
    if (a.blockNumber !== b.blockNumber) {
      return a.blockNumber - b.blockNumber;
    }

    // If blockNumbers are equal, then compare logIndex
    return a.logIndex - b.logIndex;
  });

  const latestDeposits = transactions?.slice(0, 6);

  // const isLoading = isLoadingDeposits || isLoadingWithdraws

  return (
    <StyledBridge gap='spacing4'>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H1 size='base'>Bridge</H1>
        <BridgeForm />
      </StyledSection>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H2 size='base'>Activity</H2>

        {!!latestDeposits?.length ? (
          latestDeposits.map((deposit) => (
            <ActivityCard
              key={deposit.transactionHash}
              deposit={deposit}
              status={
                deposit.status !== MessageStatus.RELAYED && deposit.status !== MessageStatus.FAILED_L1_TO_L2_MESSAGE
                  ? 'ongoing'
                  : 'completed'
              }
            />
          ))
        ) : (
          <EmptyCard />
        )}
        {/* {ongoingDeposits.length > 0 ? (
          ongoingDeposits.map((deposit) => (
            <ActivityCard key={deposit.transactionHash} deposit={deposit} status='ongoing' />
          ))
        ) : (
          <EmptyCard />
        )}
        {completedDeposits.length > 0 &&
          completedDeposits.map((deposit) => (
            <ActivityCard key={deposit.transactionHash} deposit={deposit} status='completed' />
          ))} */}
        <TextLink external href={`https://sepolia.etherscan.io/address/${address}`} icon size='xs'>
          View All Transactions
        </TextLink>
      </StyledSection>
    </StyledBridge>
  );
};

export { Bridge };
