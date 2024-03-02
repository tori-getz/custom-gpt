import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './icon-button.component';

import { MdHeartBroken } from 'react-icons/md';
import { ButtonType } from '../button-base';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'UI-Kit/Buttons/IconButton'
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: MdHeartBroken
  }
}

export const Transparent: Story = {
  args: {
    icon: MdHeartBroken,
    type: ButtonType.Transparent
  }
}

export const Disabled: Story = {
  args: {
    icon: MdHeartBroken,
    // @ts-ignore
    disabled: true,
  },
}
