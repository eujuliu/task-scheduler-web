import { type Meta, type StoryObj } from '@storybook/angular';
import { InputComponent } from './input';

const meta: Meta<InputComponent & HTMLInputElement> = {
  title: 'Components/Input',
  component: InputComponent,
  excludeStories: /.*Data$/,
  args: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Type some text',
    type: 'text',
    label: 'Text',
    icon: '',
  },
};

export const Email: Story = {
  args: {
    ...Default.args,
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    type: 'password',
  },
};
