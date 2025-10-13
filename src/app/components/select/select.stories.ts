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
        <app-select-item [label]="'Test 5'" [value]="'test5'" [key]="'5'" />
        <app-select-item [label]="'Test 6'" [value]="'test6'" [key]="'6'" />
        <app-select-item [label]="'Test 7'" [value]="'test7'" [key]="'7'" />
        <app-select-item [label]="'Test 8'" [value]="'test8'" [key]="'8'" />
        <app-select-item [label]="'Test 9'" [value]="'test9'" [key]="'9'" />
        <app-select-item [label]="'Test 10'" [value]="'test10'" [key]="'10'" />
        <app-select-item [label]="'Test 11'" [value]="'test11'" [key]="'11'" />
      </app-select-content>
    </app-select>
    `,
  }),
};
