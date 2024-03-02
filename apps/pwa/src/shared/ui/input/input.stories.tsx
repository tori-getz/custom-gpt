import type { Meta, StoryObj } from '@storybook/react';

import { MdSearch, MdMenu } from 'react-icons/md';

import { Input } from './input.component';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'UI-Kit/Input'
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    // @ts-ignore
    placeholder: 'Введите текст',
    defaultValue: 'hello'
  }
}

export const Icons: Story = {
  args: {
    // @ts-ignore
    placeholder: 'Введите текст',
    left: <MdSearch />,
    right: <MdMenu />
  }
}
