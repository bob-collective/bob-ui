import { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertProps } from '.';

export default {
  title: 'Status/Alert',
  component: Alert,
  parameters: {
    layout: 'centered'
  }
} as Meta<typeof Alert>;

export const Success: StoryObj<AlertProps> = {
  args: {
    status: 'success',
    children: 'Transaction was succesful!'
  }
};

export const Warning: StoryObj<AlertProps> = {
  args: {
    status: 'warning',
    children: 'This is a warning message...'
  }
};

export const Error: StoryObj<AlertProps> = {
  args: {
    status: 'error',
    children: 'Error happened, please contact our support.'
  }
};
