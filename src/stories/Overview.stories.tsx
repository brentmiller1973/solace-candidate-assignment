import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { AdvocateSearch } from '../components/AdvocateSearch';
import { ViewControl } from '../components/ViewControl';
import { AdvocateCard } from '../components/AdvocateCard';
import { AdvocateList } from '../components/AdvocateList';
import { Button } from '../components/Button';
import { MultiSelect } from '../components/MultiSelect';
import { Advocate } from '../models/advocate';
import { useState, useRef } from 'react';

const meta: Meta = {
  title: 'Overview/Complete Application',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const sampleAdvocates: Advocate[] = [
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    city: 'San Francisco, CA',
    degree: 'RN, MSN, Patient Advocate',
    specialties: ['Cardiology', 'Geriatrics', 'Chronic Care'],
    yearsOfExperience: 12,
    phoneNumber: 4155551234,
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    city: 'Boston, MA',
    degree: 'MD, Healthcare Advocate',
    specialties: ['Oncology'],
    yearsOfExperience: 8,
    phoneNumber: 6175551234,
  },
  {
    firstName: 'Dr. Emily',
    lastName: 'Rodriguez',
    city: 'Los Angeles, CA',
    degree: 'PhD, RN, Certified Patient Advocate',
    specialties: ['Pediatrics', 'Neurology', 'Mental Health'],
    yearsOfExperience: 15,
    phoneNumber: 3235551234,
  },
];

export const FullApplication: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState<'card' | 'table'>('card');
    const [isAdvancedSearchActive, setIsAdvancedSearchActive] = useState(false);
    const resetRef = useRef<(() => void) | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleReset = () => {
      setSearchTerm('');
      setIsAdvancedSearchActive(false);
      if (resetRef.current) {
        resetRef.current();
      }
    };

    const handleAdvancedSearch = () => {
      setIsAdvancedSearchActive(true);
    };

    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />

        <main className="max-w-[1231px] mx-auto px-4 py-8">
          <Banner
            title="Find Your Advocate"
            subtitle="Connect with healthcare advocates who understand your needs and can guide you through your healthcare journey."
          />

          <div className="space-y-8">
            <AdvocateSearch
              searchTerm={searchTerm}
              onChange={handleSearchChange}
              onReset={handleReset}
              onAdvancedSearch={handleAdvancedSearch}
              isAdvancedSearchActive={isAdvancedSearchActive}
              resetRef={resetRef}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="font-heading text-2xl font-semibold text-primary">
                  Available Advocates
                </h2>
                <span className="text-neutral-dark-grey">({sampleAdvocates.length} found)</span>
              </div>
              <ViewControl view={view} onViewChange={setView} />
            </div>

            {view === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleAdvocates.map((advocate, index) => (
                  <AdvocateCard key={index} advocate={advocate} />
                ))}
              </div>
            ) : (
              <AdvocateList advocates={sampleAdvocates} />
            )}
          </div>
        </main>
      </div>
    );
  },
};

export const ComponentShowcase: Story = {
  render: () => {
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['Cardiology']);

    return (
      <div className="max-w-4xl mx-auto p-8 space-y-12">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-primary mb-6">
            Component Showcase
          </h2>
          <p className="text-neutral-dark-grey mb-8">
            A comprehensive overview of all components used in the Solace Healthcare Advocate
            application.
          </p>
        </div>

        <section>
          <h3 className="font-heading text-2xl font-medium text-primary mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        <section>
          <h3 className="font-heading text-2xl font-medium text-primary mb-4">MultiSelect</h3>
          <div className="max-w-md">
            <MultiSelect
              options={['Cardiology', 'Neurology', 'Pediatrics', 'Oncology', 'Geriatrics']}
              selectedValues={selectedSpecialties}
              onSelectionChange={setSelectedSpecialties}
              placeholder="Select specialties"
              label="Medical Specialties"
            />
          </div>
        </section>

        <section>
          <h3 className="font-heading text-2xl font-medium text-primary mb-4">Typography</h3>
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold text-primary">Heading 1</h1>
            <h2 className="font-heading text-3xl font-semibold text-primary">Heading 2</h2>
            <h3 className="font-heading text-2xl font-medium text-primary">Heading 3</h3>
            <p className="font-body text-base text-neutral-black leading-relaxed">
              This is body text using the Inter font family. It demonstrates the default text
              styling used throughout the application with proper line height for optimal
              readability.
            </p>
          </div>
        </section>

        <section>
          <h3 className="font-heading text-2xl font-medium text-primary mb-4">Advocate Card</h3>
          <div className="max-w-sm">
            <AdvocateCard advocate={sampleAdvocates[0]} />
          </div>
        </section>
      </div>
    );
  },
};
