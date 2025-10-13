import { type Meta, type StoryObj } from '@storybook/angular';
import { DataTable } from './datatable';

const meta: Meta<DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  excludeStories: /.*Data$/,
  args: {},
  argTypes: {},
  tags: ['autodocs'],
};

function generateData(length = 100) {
  const status = ['RUNNING', 'PENDING', 'COMPLETED', 'FAILED'];
  const startDate = new Date(2026, 0, 1);
  const endDate = new Date(2028, 0, 1);

  return Array.from({ length }, (_, idx) => {
    const randomDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()),
    );

    return {
      id: idx + 1,
      status: status[Math.floor(Math.random() * status.length)],
      createdAt: randomDate.toJSON(),
      updatedAt: randomDate.toJSON(),
    };
  });
}

const data = generateData();

export default meta;

type Story = StoryObj<DataTable>;

export const Default: Story = {
  args: {
    idCol: 'id',
    total: data.length,
    columns: {
      id: {
        label: 'ID',
        sort: false,
      },
      status: {
        label: 'Status',
        sort: true,
      },
      createdAt: {
        label: 'Created At',
        sort: true,
      },
      updatedAt: {
        label: 'Update At',
        sort: true,
      },
    },
    data,
  },
};
