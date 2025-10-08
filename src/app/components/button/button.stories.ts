import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
  excludeStories: /.*Data$/,
  args: {
    type: 'button',
    style: 'normal',
  },
  argTypes: {},
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<app-button [type]="type" [style]="style" [disabled]="disabled">Text <ion-icon name="heart"></ion-icon></app-button>`,
  }),
};

export default meta;

type Story = StoryObj<Button>;

export const Default: Story = {
  args: {
    type: 'button',
    style: 'normal',
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

export const DefaultDisabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
