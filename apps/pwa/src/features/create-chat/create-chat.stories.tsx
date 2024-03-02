import type { Meta, StoryObj } from '@storybook/react';

import { CreateChat } from './ui';

const meta: Meta<typeof CreateChat> = {
  component: CreateChat,
  title: 'Features/CreateChat'
};

export default meta;
type Story = StoryObj<typeof CreateChat>;

export const Default: Story = {};
