import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  excludeStories: /.*Data$/,
  args: {
    type: 'button',
  },
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<Button>;

export const Default: Story = {
  args: {
    icon: '',
    text: 'test',
    type: 'button',
    style: 'normal',
  },
};

export const Ghost: Story = {
  args: {
    icon: '',
    text: 'test',
    type: 'button',
    style: 'ghost',
  },
};
