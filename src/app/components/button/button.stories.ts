import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  excludeStories: /.*Data$/,
  args: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<Button>;

export const Default: Story = {
  args: {
    type: 'button',
    style: 'normal',
    disabled: false,
    full: false,
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    style: 'ghost',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    style: 'outline',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
