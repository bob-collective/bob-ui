import { useAccount } from '@gobob/wagmi';
import { Flex, H1, H2, P, Spinner, TextLink } from '@interlay/ui';

import { StyledBridge, StyledCard, StyledSection } from './Bridge.style';
import { ActivityCard, BridgeForm } from './components';
import { useGetTransactions } from './hooks/useGetTransactions';

const EmptyCard = () => (
  <StyledCard gap='spacing2'>
    <P align='center' size='xs'>
      No bridging operations in process
    </P>
  </StyledCard>
);

const LoadingCard = () => (
  <Flex direction='row' gap='spacing2' justifyContent='center'>
    <Spinner color='secondary' />
  </Flex>
);

const Bridge = (): JSX.Element => {
  const { address } = useAccount();
  const { data: transactions, isLoading: isTransactionLoading } = useGetTransactions();

  const sortedTransactions = (transactions || []).sort((a, b) => {
    if (a.date.getTime() !== b.date.getTime()) {
      return b.date.getTime() - a.date.getTime();
    }

    return b.logIndex - a.logIndex;
  });

  const latestDeposits = sortedTransactions?.slice(0, 6);

  console.log(latestDeposits);

  return (
    <StyledBridge gap='spacing4'>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H1 size='base'>Bridge</H1>
        <BridgeForm />
      </StyledSection>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H2 size='base'>Activity</H2>
        {isTransactionLoading ? (
          <LoadingCard />
        ) : (
          <>
            {latestDeposits?.length ? (
              latestDeposits.map((deposit) => <ActivityCard key={deposit.transactionHash} data={deposit} />)
            ) : (
              <EmptyCard />
            )}
            <TextLink external href={`https://sepolia.etherscan.io/address/${address}`} icon size='xs'>
              View All Transactions
            </TextLink>
          </>
        )}
      </StyledSection>
    </StyledBridge>
  );
};

export { Bridge };
