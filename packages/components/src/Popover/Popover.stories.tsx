import { Meta, StoryObj } from '@storybook/react';

import { CTA } from '../CTA';

import { Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverProps, PopoverTrigger } from '.';

type StoryProps = PopoverProps & { title?: string; footer?: boolean };

const Render = ({ title, footer, children, placement = 'left', ...args }: StoryProps) => {
  return (
    <>
      <Popover {...args}>
        <PopoverTrigger>
          <CTA style={{ [placement]: 0, position: 'absolute', margin: 20 }}>Open Popover</CTA>
        </PopoverTrigger>
        <PopoverContent>
          {title && <PopoverHeader>Popover Header</PopoverHeader>}
          <PopoverBody>{children}</PopoverBody>
          {footer && (
            <PopoverFooter>
              <CTA>Confirm</CTA>
            </PopoverFooter>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default {
  title: 'Overlays/Popover',
  component: Popover,
  argTypes: {
    footer: {
      control: 'boolean'
    },
    title: {
      control: 'text'
    }
  },
  render: Render
} as Meta<typeof Popover>;

const children = (
  <>
    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
    leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
    consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
    eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  </>
);

export const OnlyBody: StoryObj<StoryProps> = {
  args: {
    children
  }
};

export const BodyWithTitle: StoryObj<StoryProps> = {
  args: {
    children,
    title: 'Title'
  }
};

export const BodyWithFooter: StoryObj<StoryProps> = {
  args: {
    children,
    footer: true
  }
};
