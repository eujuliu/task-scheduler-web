import { type Meta, type StoryObj } from '@storybook/angular';
import { InputComponent } from './input';
import { expect, userEvent } from 'storybook/test';

const meta: Meta<InputComponent> = {
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
    label: '',
    icon: '',
    errors: [],
    invalid: false,
    dirty: false,
    touched: false,
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
  play: async ({ canvas, canvasElement }) => {
    await userEvent.type(canvas.getByPlaceholderText(Default.args?.placeholder ?? ''), '123456789');

    await expect(canvasElement.querySelector('input[type="text"]')).toBeFalsy();

    await userEvent.click(canvas.getByRole('button'));

    await expect(canvasElement.querySelector('input[type="text"]')).toBeTruthy();

    await userEvent.clear(canvas.getByPlaceholderText(Default.args?.placeholder ?? ''));
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Label',
  },
};

export const Invalid: Story = {
  args: {
    ...Default.args,
    invalid: true,
    dirty: true,
    // @ts-expect-error this will be transform into an array of strings
    errors: { required: true },
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    icon: 'heart-outline',
  },
};
