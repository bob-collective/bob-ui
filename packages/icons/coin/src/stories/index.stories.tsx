import { Meta, StoryObj } from '@storybook/react';
import { Icon, IconProps } from '@interlay/icons';

import * as SVGS from '..';

export default {
  title: 'Icons/Coins',
  component: Icon,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Story />
      </div>
    )
  ]
} as Meta<typeof Icon>;

export const Coins: StoryObj<IconProps> = {
  args: {
    size: 'md'
  },
  render: (args) => (
    <>
      {Object.entries(SVGS)
        .filter(([key]) => key !== 'Icon')
        .map(([key, Comp]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12,
              gap: 8,
              minWidth: 100,
              maxWidth: 100
            }}
          >
            <Comp {...args} />
            <span
              style={{
                fontWeight: '600',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '100%',
                textAlign: 'center'
              }}
            >
              {key}
            </span>
          </div>
        ))}
    </>
  )
};
