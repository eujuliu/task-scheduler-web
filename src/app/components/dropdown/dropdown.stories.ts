import { type Meta, type StoryObj } from '@storybook/angular';
import { Dropdown } from './dropdown';

const meta: Meta<Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<Dropdown>;

export const Default: Story = {
  args: {
    buttonStyle: 'outline',
    buttonSize: 'md',
  },
};
