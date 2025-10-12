import { type Meta, type StoryObj } from '@storybook/angular';
import { Select, SelectOption } from './select';
import { randomString } from '../../shared/services/helpers.service';

const meta: Meta<Select> = {
  title: 'Components/Select',
  component: Select,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {},
  tags: ['autodocs'],
};

function generateData(): SelectOption[] {
  return Array.from({ length: Math.random() * 100 }, (_, idx) => ({
    id: `${idx + 1}`,
    label: randomString(5),
    value: randomString(5),
    icon: Math.round(Math.random() * 1) % 2 === 0 ? 'heart' : undefined,
  }));
}

export default meta;

type Story = StoryObj<Select>;

export const Default: Story = {
  args: {
    options: generateData(),
  },
};
