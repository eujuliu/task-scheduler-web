import { type Meta, type StoryObj } from '@storybook/angular';
import { Form } from './form';
import { Validators } from '@angular/forms';
import { expect, userEvent } from 'storybook/internal/test';

const meta: Meta<Form> = {
  title: 'Components/Form',
  component: Form,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {
    onSubmit: { action: 'click' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<Form>;

export const Default: Story = {
  args: {
    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Type your name',
        validators: [Validators.required],
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Type your email',
        validators: [Validators.required, Validators.email],
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Type your password',
        validators: [Validators.required],
      },
    ],
  },

  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('button:disabled')).toBeTruthy();

    await userEvent.type(canvasElement.querySelector('#name') as HTMLElement, 'Test');
    await userEvent.type(canvasElement.querySelector('#email') as HTMLElement, 'test@email.com');
    await userEvent.type(canvasElement.querySelector('#password') as HTMLElement, 'Password@1');

    await expect(canvasElement.querySelector('button:enabled')).toBeTruthy();

    await userEvent.clear(canvasElement.querySelector('#name') as HTMLElement);
    await userEvent.clear(canvasElement.querySelector('#email') as HTMLElement);
    await userEvent.clear(canvasElement.querySelector('#password') as HTMLElement);
  },
};

export const RowDirection: Story = {
  args: {
    fields: [
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Type your email',
        validators: [Validators.required, Validators.email],
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Type your password',
        validators: [Validators.required],
      },
    ],
    direction: 'row',
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('button:disabled')).toBeTruthy();

    await userEvent.type(canvasElement.querySelector('#email') as HTMLElement, 'test@email.com');
    await userEvent.type(canvasElement.querySelector('#password') as HTMLElement, 'Password@1');

    await expect(canvasElement.querySelector('button:enabled')).toBeTruthy();
  },
};
