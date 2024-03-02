import type { Meta, StoryObj } from '@storybook/react';

import { ButtonBase } from './button-base.component';
import { ButtonType } from '.';

const meta: Meta<typeof ButtonBase> = {
  component: ButtonBase,
  title: 'UI-Kit/Buttons/ButtonBase'
};

export default meta;
type Story = StoryObj<typeof ButtonBase>;

export const Default: Story = {
  args: {
    children: 'Default'
  }
}

export const Transparent: Story = {
  args: {
    children: 'Transparent',
    type: ButtonType.Transparent,
  }
}
