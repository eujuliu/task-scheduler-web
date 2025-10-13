import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Select } from './select';
import { SelectContent } from './select-content/select-content';
import { SelectItem } from './select-item/select-item';
import { fn } from 'storybook/internal/test';

const meta: Meta<Select> = {
  title: 'Components/Select',
  component: Select,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {
    changed: { action: 'click' },
  },
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SelectContent, SelectItem],
    }),
  ],
  subcomponents: { SelectContent, SelectItem },
};

export default meta;

type Story = StoryObj<Select>;

export const Default: Story = {
  args: {
    defaultValue: '',
    changed: fn(),
  },
  render: (args) => ({
    props: args,
    template: `
    <app-select
      [defaultValue]="defaultValue"
      (changed)="changed"
    >
      <app-select-content>
        <app-select-item [label]="'Test 1'" [value]="'test1'" [key]="'1'" />
        <app-select-item [label]="'Test 2'" [value]="'test2'" [key]="'2'" />
        <app-select-item [label]="'Test 3'" [value]="'test3'" [key]="'3'" />
        <app-select-item [label]="'Test 4'" [value]="'test4'" [key]="'4'" />
        <app-select-item [label]="'Test 4'" [value]="'test5'" [key]="'4'" />
        <app-select-item [label]="'Test 4'" [value]="'test6'" [key]="'4'" />
        <app-select-item [label]="'Test 4'" [value]="'test7'" [key]="'4'" />
        <app-select-item [label]="'Test 4'" [value]="'test8'" [key]="'4'" />
        <app-select-item [label]="'Test 4'" [value]="'test9'" [key]="'4'" />
        <app-select-item [label]="'Test 4'" [value]="'test10'" [key]="'4'" />
        <app-select-item [label]="'Test 4'" [value]="'test11'" [key]="'4'" />
      </app-select-content>
    </app-select>
    `,
  }),
};
