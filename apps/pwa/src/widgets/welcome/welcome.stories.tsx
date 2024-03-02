import type { Meta, StoryObj } from '@storybook/react';

import { Welcome } from './welcome.component';

const meta: Meta<typeof Welcome> = {
  component: Welcome,
  title: 'Widgets/Welcome'
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
