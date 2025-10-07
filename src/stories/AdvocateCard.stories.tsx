import type { Meta, StoryObj } from '@storybook/react';
import { AdvocateCard } from '../components/AdvocateCard';
import { Advocate } from '../models/advocate';

const meta: Meta<typeof AdvocateCard> = {
  title: 'Components/AdvocateCard',
  component: AdvocateCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    advocate: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAdvocate: Advocate = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  city: 'San Francisco, CA',
  degree: 'RN, MSN, Patient Advocate',
  specialties: ['Cardiology', 'Geriatrics', 'Chronic Care'],
  yearsOfExperience: 12,
  phoneNumber: 4155551234,
};

const shortSpecialtiesAdvocate: Advocate = {
  firstName: 'Michael',
  lastName: 'Chen',
  city: 'Boston, MA',
  degree: 'MD, Healthcare Advocate',
  specialties: ['Oncology'],
  yearsOfExperience: 8,
  phoneNumber: 6175551234,
};

const manySpecialtiesAdvocate: Advocate = {
  firstName: 'Dr. Emily',
  lastName: 'Rodriguez',
  city: 'Los Angeles, CA',
  degree: 'PhD, RN, Certified Patient Advocate',
  specialties: [
    'Pediatrics',
    'Neurology',
    'Mental Health',
    'Chronic Disease Management',
    'Insurance Navigation',
    'Care Coordination',
  ],
  yearsOfExperience: 15,
  phoneNumber: 3235551234,
};

const newAdvocate: Advocate = {
  firstName: 'James',
  lastName: 'Wilson',
  city: 'Austin, TX',
  degree: 'BSN, Patient Advocate',
  specialties: ['General Medicine', 'Preventive Care'],
  yearsOfExperience: 2,
  phoneNumber: 5125551234,
};

const experiencedAdvocate: Advocate = {
  firstName: 'Dr. Margaret',
  lastName: 'Thompson',
  city: 'New York, NY',
  degree: 'MD, JD, Senior Healthcare Advocate',
  specialties: ['Medical Malpractice', 'Complex Cases', 'Legal Advocacy'],
  yearsOfExperience: 25,
  phoneNumber: 2125551234,
};

export const Default: Story = {
  args: {
    advocate: sampleAdvocate,
  },
};

export const ShortSpecialties: Story = {
  args: {
    advocate: shortSpecialtiesAdvocate,
  },
};

export const ManySpecialties: Story = {
  args: {
    advocate: manySpecialtiesAdvocate,
  },
};

export const NewAdvocate: Story = {
  args: {
    advocate: newAdvocate,
  },
};

export const ExperiencedAdvocate: Story = {
  args: {
    advocate: experiencedAdvocate,
  },
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <AdvocateCard advocate={sampleAdvocate} />
      <AdvocateCard advocate={shortSpecialtiesAdvocate} />
      <AdvocateCard advocate={manySpecialtiesAdvocate} />
      <AdvocateCard advocate={newAdvocate} />
      <AdvocateCard advocate={experiencedAdvocate} />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
