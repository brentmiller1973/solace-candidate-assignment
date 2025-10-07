import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '../components/MultiSelect';
import { useState } from 'react';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' },
    },
    selectedValues: {
      control: { type: 'object' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    onSelectionChange: { action: 'selection changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    selectedValues: [],
    placeholder: 'Select specialties',
    onSelectionChange: () => {},
  },
};

export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    selectedValues: [],
    placeholder: 'Select specialties',
    label: 'Medical Specialties',
    onSelectionChange: () => {},
  },
};

export const WithPreselectedValues: Story = {
  args: {
    options: sampleOptions,
    selectedValues: ['Cardiology', 'Neurology'],
    placeholder: 'Select specialties',
    label: 'Medical Specialties',
    onSelectionChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['Cardiology']);

    return (
      <div className="w-80 space-y-4">
        <MultiSelect
          options={sampleOptions}
          selectedValues={selectedValues}
          onSelectionChange={setSelectedValues}
          placeholder="Select specialties"
          label="Medical Specialties"
        />
        <div className="text-sm text-neutral-dark-grey">
          <strong>Selected:</strong>{' '}
          {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const FewOptions: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedValues: [],
    placeholder: 'Select options',
    label: 'Simple Options',
    onSelectionChange: () => {},
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      'Allergy and Immunology',
      'Anesthesiology',
      'Cardiology',
      'Dermatology',
      'Emergency Medicine',
      'Endocrinology',
      'Family Medicine',
      'Gastroenterology',
      'Geriatrics',
      'Hematology',
      'Infectious Disease',
      'Internal Medicine',
      'Nephrology',
      'Neurology',
      'Obstetrics and Gynecology',
      'Oncology',
      'Ophthalmology',
      'Orthopedics',
      'Otolaryngology',
      'Pathology',
      'Pediatrics',
      'Physical Medicine',
      'Psychiatry',
      'Pulmonology',
      'Radiology',
      'Rheumatology',
      'Surgery',
      'Urology',
    ],
    selectedValues: [],
    placeholder: 'Select from many specialties',
    label: 'All Medical Specialties',
    onSelectionChange: () => {},
  },
};
