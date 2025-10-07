import type { Meta, StoryObj } from '@storybook/react';
import { AdvocateSearch, AdvancedSearchCriteria } from '../components/AdvocateSearch';
import { useState, useRef } from 'react';

const meta: Meta<typeof AdvocateSearch> = {
  title: 'Components/AdvocateSearch',
  component: AdvocateSearch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    searchTerm: {
      control: { type: 'text' },
    },
    isAdvancedSearchActive: {
      control: { type: 'boolean' },
    },
    onChange: { action: 'search term changed' },
    onReset: { action: 'search reset' },
    onAdvancedSearch: { action: 'advanced search performed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchTerm: '',
    onChange: () => {},
    onReset: () => {},
  },
};

export const WithSearchTerm: Story = {
  args: {
    searchTerm: 'Sarah Johnson',
    onChange: () => {},
    onReset: () => {},
  },
};

export const AdvancedSearchActive: Story = {
  args: {
    searchTerm: '',
    isAdvancedSearchActive: true,
    onChange: () => {},
    onReset: () => {},
    onAdvancedSearch: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);
    const resetRef = useRef<(() => void) | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleReset = () => {
      setSearchTerm('');
      setIsAdvancedSearchActive(false);
      if (resetRef.current) {
        resetRef.current();
      }
    };

    const handleAdvancedSearch = (criteria: AdvancedSearchCriteria) => {
      setIsAdvancedSearchActive(true);
      console.log('Advanced search criteria:', criteria);
    };

    return (
      <div className="max-w-4xl">
        <AdvocateSearch
          searchTerm={searchTerm}
          onChange={handleChange}
          onReset={handleReset}
          onAdvancedSearch={handleAdvancedSearch}
          isAdvancedSearchActive={isAdvancedSearchActive}
          resetRef={resetRef}
        />
        <div className="mt-4 p-4 bg-neutral-light-grey rounded-lg">
          <h4 className="font-heading text-lg font-medium text-primary mb-2">Current State:</h4>
          <p><strong>Search Term:</strong> {searchTerm || 'None'}</p>
          <p><strong>Advanced Search Active:</strong> {isAdvancedSearchActive ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  },
};

export const WithPrefilledAdvancedSearch: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('Dr. Smith');
    const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(true);
    const resetRef = useRef<(() => void) | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleReset = () => {
      setSearchTerm('');
      setIsAdvancedSearchActive(false);
      if (resetRef.current) {
        resetRef.current();
      }
    };

    const handleAdvancedSearch = (criteria: AdvancedSearchCriteria) => {
      setIsAdvancedSearchActive(true);
      console.log('Advanced search criteria:', criteria);
    };

    return (
      <div className="max-w-4xl">
        <AdvocateSearch
          searchTerm={searchTerm}
          onChange={handleChange}
          onReset={handleReset}
          onAdvancedSearch={handleAdvancedSearch}
          isAdvancedSearchActive={isAdvancedSearchActive}
          resetRef={resetRef}
        />
      </div>
    );
  },
};

export const MobileView: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);
    const resetRef = useRef<(() => void) | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleReset = () => {
      setSearchTerm('');
      setIsAdvancedSearchActive(false);
      if (resetRef.current) {
        resetRef.current();
      }
    };

    const handleAdvancedSearch = (criteria: AdvancedSearchCriteria) => {
      setIsAdvancedSearchActive(true);
      console.log('Advanced search criteria:', criteria);
    };

    return (
      <div className="max-w-sm">
        <AdvocateSearch
          searchTerm={searchTerm}
          onChange={handleChange}
          onReset={handleReset}
          onAdvancedSearch={handleAdvancedSearch}
          isAdvancedSearchActive={isAdvancedSearchActive}
          resetRef={resetRef}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the search component adapts to mobile screen sizes.',
      },
    },
  },
};
