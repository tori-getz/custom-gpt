import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './tabs.component';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'UI-Kit/Tabs'
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      {
        title: 'One',
        component: <h1>Content 1</h1>
      },
      {
        title: 'Two',
        component: <h1>Content 2</h1>
      },
      {
        title: 'Three',
        component: <h1>Content 3</h1>
      }
    ]
  }
}
