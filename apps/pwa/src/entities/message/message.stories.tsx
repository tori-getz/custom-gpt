import type { Meta, StoryObj } from '@storybook/react';

import { MessageCard } from './ui';
import { MessageFrom } from '.';

const meta: Meta<typeof MessageCard> = {
  component: MessageCard,
  title: 'Entities/Message'
};

export default meta;
type Story = StoryObj<typeof MessageCard>;

export const FromUser: Story = {
  args: {
    content: 'Hello, Bot!',
    from: MessageFrom.User,
  },
};

export const FromBot: Story = {
  args: {
    content: 'Hello, User!',
    from: MessageFrom.Bot,
  },
};
