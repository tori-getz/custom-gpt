import type { Meta, StoryObj } from '@storybook/react';

import { ChatList } from './ui';

const meta: Meta<typeof ChatList> = {
  component: ChatList,
  title: 'Widgets/ChatList'
};

export default meta;
type Story = StoryObj<typeof ChatList>;

export const Default: Story = {
  args: {
    children: <h1>top children</h1>, 
  },
};
