import { Meta, StoryObj } from '@storybook/angular';
import { SelectItem } from './select-item';

const meta: Meta<SelectItem> = {
  title: 'Components/SelectItem',
  component: SelectItem,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SelectItem>;

export const Default: Story = {
  args: {
    label: 'Test',
    value: 'test',
    icon: '',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Test',
    value: 'test',
    icon: 'heart',
  },
};
