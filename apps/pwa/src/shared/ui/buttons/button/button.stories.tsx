import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button.component';

import { MdHeartBroken } from 'react-icons/md';
import { ButtonType } from '../button-base';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI-Kit/Buttons/Button'
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default'
  }
}

export const Transparent: Story = {
  args: {
    children: 'Default',
    type: ButtonType.Transparent,
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    // @ts-ignore
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Button',
    left: <MdHeartBroken />
  }
}

export const WithIconTransparent: Story = {
  args: {
    children: 'Button',
    left: <MdHeartBroken />,
    type: ButtonType.Transparent
  }
}
