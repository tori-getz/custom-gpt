import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './modal.component';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'UI-Kit/Modal'
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: <h1>Modal</h1>
  }
}
