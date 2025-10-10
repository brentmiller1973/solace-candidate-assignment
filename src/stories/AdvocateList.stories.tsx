import type { Meta, StoryObj } from '@storybook/react';
import { AdvocateList } from '../components/AdvocateList';
import { Advocate } from '../models/advocate';

const meta: Meta<typeof AdvocateList> = {
  title: 'Components/AdvocateList',
  component: AdvocateList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    advocates: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    city: 'San Francisco, CA',
    degree: 'RN, MSN, Patient Advocate',
    specialties: ['Cardiology', 'Geriatrics', 'Chronic Care'],
    yearsOfExperience: 12,
    phoneNumber: 4155551234,
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    city: 'Boston, MA',
    degree: 'MD, Healthcare Advocate',
    specialties: ['Oncology'],
    yearsOfExperience: 8,
    phoneNumber: 6175551234,
  },
  {
    id: 3,
    firstName: 'Dr. Emily',
    lastName: 'Rodriguez',
    city: 'Los Angeles, CA',
    degree: 'PhD, RN, Certified Patient Advocate',
    specialties: ['Pediatrics', 'Neurology', 'Mental Health'],
    yearsOfExperience: 15,
    phoneNumber: 3235551234,
  },
  {
    id: 4,
    firstName: 'James',
    lastName: 'Wilson',
    city: 'Austin, TX',
    degree: 'BSN, Patient Advocate',
    specialties: ['General Medicine', 'Preventive Care'],
    yearsOfExperience: 2,
    phoneNumber: 5125551234,
  },
  {
    id: 5,
    firstName: 'Dr. Margaret',
    lastName: 'Thompson',
    city: 'New York, NY',
    degree: 'MD, JD, Senior Healthcare Advocate',
    specialties: ['Medical Malpractice', 'Complex Cases'],
    yearsOfExperience: 25,
    phoneNumber: 2125551234,
  },
];

const singleAdvocate: Advocate[] = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    city: 'San Francisco, CA',
    degree: 'RN, MSN, Patient Advocate',
    specialties: ['Cardiology', 'Geriatrics', 'Chronic Care'],
    yearsOfExperience: 12,
    phoneNumber: 4155551234,
  },
];

const manyAdvocates: Advocate[] = [
  ...sampleAdvocates,
  {
    id: 6,
    firstName: 'David',
    lastName: 'Kim',
    city: 'Seattle, WA',
    degree: 'RN, Patient Advocate',
    specialties: ['Emergency Medicine', 'Trauma Care'],
    yearsOfExperience: 7,
    phoneNumber: 2065551234,
  },
  {
    id: 7,
    firstName: 'Lisa',
    lastName: 'Anderson',
    city: 'Chicago, IL',
    degree: 'MSW, Healthcare Social Worker',
    specialties: ['Mental Health', 'Social Services'],
    yearsOfExperience: 10,
    phoneNumber: 3125551234,
  },
  {
    id: 8,
    firstName: 'Robert',
    lastName: 'Garcia',
    city: 'Miami, FL',
    degree: 'MD, Patient Advocate',
    specialties: ['Internal Medicine', 'Diabetes Care'],
    yearsOfExperience: 18,
    phoneNumber: 3055551234,
  },
  {
    id: 9,
    firstName: 'Jennifer',
    lastName: 'Brown',
    city: 'Denver, CO',
    degree: 'RN, BSN, Certified Patient Advocate',
    specialties: ['Orthopedics', 'Rehabilitation'],
    yearsOfExperience: 6,
    phoneNumber: 3035551234,
  },
  {
    id: 10,
    firstName: 'Thomas',
    lastName: 'Lee',
    city: 'Portland, OR',
    degree: 'PharmD, Medication Advocate',
    specialties: ['Pharmacy', 'Medication Management'],
    yearsOfExperience: 9,
    phoneNumber: 5035551234,
  },
];

export const Default: Story = {
  args: {
    advocates: sampleAdvocates,
  },
};

export const SingleAdvocate: Story = {
  args: {
    advocates: singleAdvocate,
  },
};

export const EmptyList: Story = {
  args: {
    advocates: [],
  },
};

export const ManyAdvocates: Story = {
  args: {
    advocates: manyAdvocates,
  },
};

export const ScrollableTable: Story = {
  args: {
    advocates: [...manyAdvocates, ...manyAdvocates], // Double the data to show scrolling
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are many advocates, the table becomes scrollable with sticky headers.',
      },
    },
  },
};
