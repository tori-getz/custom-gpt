import type { Meta, StoryObj } from '@storybook/react';

import { Register } from './ui';

const meta: Meta<typeof Register> = {
  component: Register,
  title: 'Features/Register'
};

export default meta;
type Story = StoryObj<typeof Register>;

export const Default: Story = {};
