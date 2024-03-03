import type { Meta, StoryObj } from '@storybook/react';

import { SendMessage } from './ui';

const meta: Meta<typeof SendMessage> = {
  component: SendMessage,
  title: 'Features/SendMessage'
};

export default meta;
type Story = StoryObj<typeof SendMessage>;

export const Default: Story = {};
