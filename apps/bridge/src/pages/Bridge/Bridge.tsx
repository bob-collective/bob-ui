import { H1, H2, P, TextLink } from '@interlay/ui';

import { StyledBridge, StyledCard, StyledSection } from './Bridge.style';
import { ActivityCard, BridgeForm } from './components';

// TODO: limit activity list to 6 items
const Bridge = (): JSX.Element => {
  return (
    <StyledBridge gap='spacing4'>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H1 size='base'>Bridge</H1>
        <BridgeForm />
      </StyledSection>
      <StyledSection direction='column' flex='0 0 50%' gap='spacing4'>
        <H2 size='base'>Activity</H2>
        <StyledCard gap='spacing2'>
          <P align='center' size='xs'>
            No bridging operations in process
          </P>
        </StyledCard>
        <ActivityCard status='completed' />
        <ActivityCard status='ongoing' />
        <TextLink external icon size='xs'>
          View All Transactions
        </TextLink>
      </StyledSection>
    </StyledBridge>
  );
};

export { Bridge };
