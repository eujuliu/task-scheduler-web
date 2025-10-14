import { type Meta, type StoryObj } from '@storybook/angular';
import { Dialog } from './dialog';

const meta: Meta<Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {},
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
    <app-dialog [buttonStyle]="buttonStyle" [buttonSize]="buttonSize" [persistent]="persistent">
      <ng-template #content let-close="close">
        <h2>Dialog Title</h2>
        <p>This is the dialog content.</p>
      </ng-template>
    </app-dialog>

    `,
  }),
};

export default meta;

type Story = StoryObj<Dialog>;

export const Default: Story = {
  args: {
    buttonStyle: 'outline',
    buttonSize: 'md',
    persistent: false,
  },
};

export const Persistent: Story = {
  args: {
    buttonStyle: 'outline',
    buttonSize: 'md',
    persistent: true,
  },
};
