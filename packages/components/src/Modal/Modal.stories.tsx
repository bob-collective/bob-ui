import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CTA } from '../CTA';

import { Modal, ModalProps } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

type StoryProps = ModalProps & { title?: string; footer?: boolean };

const Render = ({ title, footer, children, ...args }: StoryProps) => {
  const [state, setState] = useState(true);

  return (
    <>
      <CTA onPress={() => setState(true)}>Open Modal</CTA>
      <Modal {...args} isOpen={state} onClose={() => setState(false)}>
        {title && (
          <>
            <ModalHeader align='center' color='secondary'>
              {title}
            </ModalHeader>
          </>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && (
          <ModalFooter>
            <CTA fullWidth>Procced</CTA>
          </ModalFooter>
        )}
      </Modal>
    </>
  );
};

export default {
  title: 'Overlays/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    footer: {
      control: 'boolean'
    },
    title: {
      control: 'text'
    }
  },
  render: Render
} as Meta<typeof Modal>;

const children = (
  <>
    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
    leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
    consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
    eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
    scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
    cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo
    odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
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

export const LargeContent: StoryObj<StoryProps> = {
  args: {
    title: 'Title',
    footer: true,
    hasMaxHeight: true,
    children: (
      <>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras
        mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi
        leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      </>
    )
  }
};
