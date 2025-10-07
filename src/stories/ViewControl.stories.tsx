import type { Meta, StoryObj } from '@storybook/react';
import { ViewControl } from '../components/ViewControl';
import { useState } from 'react';

const meta: Meta<typeof ViewControl> = {
  title: 'Components/ViewControl',
  component: ViewControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: { type: 'select' },
      options: ['card', 'table'],
    },
    onViewChange: { action: 'view changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CardView: Story = {
  args: {
    view: 'card',
    onViewChange: () => {},
  },
};

export const TableView: Story = {
  args: {
    view: 'table',
    onViewChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [view, setView] = useState<'card' | 'table'>('card');
    
    return (
      <div className="space-y-4">
        <ViewControl view={view} onViewChange={setView} />
        <div className="text-center text-neutral-dark-grey">
          Current view: <strong>{view}</strong>
        </div>
      </div>
    );
  },
};
