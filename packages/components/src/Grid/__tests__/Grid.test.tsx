import { render } from '@testing-library/react';

import { Grid, GridItem } from '..';

describe('Grid', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Grid>
        <GridItem desktop={{ span: 1 }} mobile={{ span: 1 }}>
          item
        </GridItem>
      </Grid>
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });
});
