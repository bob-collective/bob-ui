import { Meta, StoryFn } from '@storybook/react';

import { Grid, GridItem, GridProps } from '.';

export default {
  title: 'Layout/Grid',
  component: Grid,
  subcomponents: { GridItem }
} as Meta<typeof Grid>;

export const Default: StoryFn<GridProps> = (args) => (
  <Grid {...args}>
    <GridItem desktop={{ span: 6, start: 1 }} mobile={{ span: 4, start: 1 }}>
      <h2>Grid content</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nam minima non modi consequuntur corporis est
        itaque, exercitationem amet, fugiat optio, facilis repellendus inventore vero perferendis. Possimus porro eaque
        facere.
      </p>
    </GridItem>
    <GridItem desktop={{ span: 6, start: 7 }} mobile={{ span: 4, start: 1 }}>
      <h2>Grid content</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nam minima non modi consequuntur corporis est
        itaque, exercitationem amet, fugiat optio, facilis repellendus inventore vero perferendis. Possimus porro eaque
        facere.
      </p>
    </GridItem>
  </Grid>
);
