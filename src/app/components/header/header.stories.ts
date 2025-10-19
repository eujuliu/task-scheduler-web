import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { Header } from './header';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

const meta: Meta<Header> = {
  title: 'Components/Header',
  component: Header,
  excludeStories: /.*Data$/,
  args: {},
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter(routes)],
    }),
  ],
};

export default meta;

type Story = StoryObj<Header>;

export const Default: Story = {
  args: {
    navigation: [
      {
        id: '1',
        to: '/tasks',
        text: 'task',
      },
      {
        id: '2',
        to: '/emails',
        text: 'email',
      },
    ],
  },
};
