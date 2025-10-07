import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from '../components/Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    subtitle: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Find Your Advocate',
    subtitle:
      'Connect with healthcare advocates who understand your needs and can guide you through your healthcare journey.',
  },
};

export const Short: Story = {
  args: {
    title: 'Welcome',
    subtitle: 'Get started today.',
  },
};

export const Long: Story = {
  args: {
    title: 'Comprehensive Healthcare Advocacy Services',
    subtitle:
      'Our experienced healthcare advocates are here to help you navigate complex medical systems, understand your options, and ensure you receive the best possible care tailored to your unique situation and needs.',
  },
};

export const WithBackground: Story = {
  args: {
    title: 'Find Your Advocate',
    subtitle:
      'Connect with healthcare advocates who understand your needs and can guide you through your healthcare journey.',
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-hero min-h-screen">
        <Story />
      </div>
    ),
  ],
};
