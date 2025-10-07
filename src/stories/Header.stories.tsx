import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithScrolledBackground: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="h-96 bg-gradient-hero p-8">
          <p className="text-neutral-dark-grey">
            This content shows how the header looks when positioned above other content.
            The header is sticky and will remain at the top when scrolling.
          </p>
        </div>
      </div>
    ),
  ],
};
