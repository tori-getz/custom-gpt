import type { Meta, StoryObj } from '@storybook/react';

import { Layout } from './layout.component';

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'Widgets/Layout'
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: <h1>top children</h1>, 
  },
};
