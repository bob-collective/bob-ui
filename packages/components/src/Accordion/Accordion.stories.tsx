import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Key, useState } from 'react';

import { P } from '../Text';

import { Accordion, AccordionItem, AccordionProps } from '.';

export default {
  title: 'Content/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered'
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem key='1' hasChildItems={false} title='Item 1'>
        <P>This is item 1 section</P>
      </AccordionItem>
      <AccordionItem key='2' hasChildItems={false} title='Item 2'>
        <P>This is item 2 section</P>
      </AccordionItem>
      <AccordionItem key='3' hasChildItems={false} title='Item 3'>
        <P>This is item 3 section</P>
      </AccordionItem>
    </Accordion>
  )
} as Meta<typeof Accordion>;

export const Default: StoryObj<AccordionProps> = {};

export const DefaultExpanded: StoryObj<AccordionProps> = {
  args: {
    defaultExpandedKeys: ['1']
  }
};

export const DisabledKeys: StoryObj<AccordionProps> = {
  args: {
    disabledKeys: ['1', '2']
  }
};

export const ControlledKeys: StoryFn<AccordionProps> = (args) => {
  const [state, setState] = useState<Set<Key>>();

  return (
    <Accordion {...args} expandedKeys={state} onExpandedChange={setState}>
      <AccordionItem key='1' hasChildItems={false} title='Item 1'>
        <P>This is item 1 section</P>
      </AccordionItem>
      <AccordionItem key='2' hasChildItems={false} title='Item 2'>
        <P>This is item 2 section</P>
      </AccordionItem>
      <AccordionItem key='3' hasChildItems={false} title='Item 3'>
        <P>This is item 3 section</P>
      </AccordionItem>
    </Accordion>
  );
};
