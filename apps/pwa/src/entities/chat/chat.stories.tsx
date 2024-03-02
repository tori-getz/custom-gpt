import type { Meta, StoryObj } from '@storybook/react';

import { ChatCard } from './ui';

const meta: Meta<typeof ChatCard> = {
  component: ChatCard,
  title: 'Entities/Chat'
};

export default meta;
type Story = StoryObj<typeof ChatCard>;

export const Default: Story = {
  args: {
    title: 'default chat',
  },
};
