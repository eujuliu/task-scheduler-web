import { type Meta, type StoryObj } from '@storybook/angular';
import { PopOver } from './popover';

const meta: Meta<PopOver> = {
  title: 'Components/PopOver',
  component: PopOver,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<PopOver>;

export const Default: Story = {
  args: {
    offsetY: 'bottom',
    offsetX: 'left',
  },
};
