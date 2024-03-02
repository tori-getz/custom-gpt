import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './spinner.component';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'UI-Kit/Spinner'
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {}
