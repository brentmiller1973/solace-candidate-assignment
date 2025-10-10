import React, { useState, useCallback, useEffect } from 'react';
import { Button } from './Button';
import { MultiSelect } from './MultiSelect';

export interface AdvancedSearchCriteria {
  name: string;
  location: string;
  specialties: string[];
  experienceLevel: number | '';
}

interface AdvocateSearchProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onAdvancedSearch?: (criteria: AdvancedSearchCriteria) => void;
  isAdvancedSearchActive?: boolean;
  resetRef?: React.MutableRefObject<(() => void) | null>;
  specialties: string[];
}

export const AdvocateSearch: React.FC<AdvocateSearchProps> = ({
  searchTerm,
  onChange,
  onReset,
  onAdvancedSearch,
  isAdvancedSearchActive = false,
  resetRef,
  specialties,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedCriteria, setAdvancedCriteria] = useState<AdvancedSearchCriteria>({
    name: '',
    location: '',
    specialties: [],
    experienceLevel: '',
  });

  const handleSpecialtyChange = (selectedSpecialties: string[]) => {
    setAdvancedCriteria((prev) => ({
      ...prev,
      specialties: selectedSpecialties,
    }));
  };

  const handleAdvancedSearch = () => {
    if (onAdvancedSearch) {
      const hasAnyCriteria =
        advancedCriteria.name.trim() !== '' ||
        advancedCriteria.location.trim() !== '' ||
        advancedCriteria.specialties.length > 0 ||
        (advancedCriteria.experienceLevel !== '' && advancedCriteria.experienceLevel > 0);

      if (hasAnyCriteria) {
        onAdvancedSearch(advancedCriteria);
      }
    }
  };

  const resetAdvancedSearch = useCallback(() => {
    setAdvancedCriteria({
      name: '',
      location: '',
      specialties: [],
      experienceLevel: '',
    });
  }, []);

  const handleFullReset = useCallback(() => {
    onReset();
    resetAdvancedSearch();
  }, [onReset, resetAdvancedSearch]);

  // Expose the full reset function to parent via ref
  useEffect(() => {
    if (resetRef) {
      resetRef.current = handleFullReset;
    }
  }, [resetRef, handleFullReset]);

  return (
    <div className="bg-neutral-white/90 backdrop-blur-sm rounded-2xl shadow-card border-2 border-accent-gold-light p-8 space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl md:text-3xl font-normal text-primary-default mb-2">
          Find Your Patient Advocate
        </h2>
        <p id="search-help" className="text-neutral-dark-grey text-lg">
          Search by name, location, specialty, or experience to find the perfect advocate for your
          needs.
        </p>
      </div>

      <div className="relative">
        <label htmlFor="advocate-search" className="sr-only">
          Search advocates by name, city, degree, specialty, or experience
        </label>
        <input
          id="advocate-search"
          type="text"
          value={searchTerm}
          onChange={onChange}
          placeholder="Search by name, city, specialty, degree, or years of experience..."
          className="w-full bg-neutral-white border border-neutral-dark-grey rounded-lg px-6 py-4 pr-32 text-lg focus:border-accent-gold-light focus:ring-2 focus:ring-accent-gold-light focus:ring-offset-2 focus:outline-none transition-all duration-200"
          aria-describedby="search-help"
        />
      </div>

      {(searchTerm || isAdvancedSearchActive) && (
        <div className="flex items-center justify-between bg-green-100 rounded-lg p-4">
          <p className="text-primary-default font-medium">
            {searchTerm ? (
              <>
                Showing results for: <span className="font-bold">&ldquo;{searchTerm}&rdquo;</span>
              </>
            ) : (
              <>
                Showing <span className="font-bold">advanced search</span> results
              </>
            )}
          </p>
          <Button variant="secondary" size="sm" onClick={handleFullReset}>
            Clear Search
          </Button>
        </div>
      )}

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-primary hover:text-accent-gold"
        >
          {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
        </Button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          showAdvanced ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="bg-opal rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-primary mb-4">Advanced Search</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="adv-name" className="block text-sm font-medium text-primary mb-2">
                Name
              </label>
              <input
                id="adv-name"
                type="text"
                value={advancedCriteria.name}
                onChange={(e) => setAdvancedCriteria((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter advocate name"
                className="w-full bg-neutral-white border border-neutral-dark-grey rounded-lg px-4 py-2 focus:border-accent-gold-light focus:ring-2 focus:ring-accent-gold-light focus:ring-offset-2 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="adv-location" className="block text-sm font-medium text-primary mb-2">
                Location
              </label>
              <input
                id="adv-location"
                type="text"
                value={advancedCriteria.location}
                onChange={(e) =>
                  setAdvancedCriteria((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="Enter city or location"
                className="w-full bg-neutral-white border border-neutral-dark-grey rounded-lg px-4 py-2 focus:border-accent-gold-light focus:ring-2 focus:ring-accent-gold-light focus:ring-offset-2 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MultiSelect
              options={specialties}
              selectedValues={advancedCriteria.specialties}
              onSelectionChange={handleSpecialtyChange}
              placeholder="Select specialties"
              label="Specialties"
              id="adv-specialties"
            />

            <div>
              <label
                htmlFor="adv-experience"
                className="block text-sm font-medium text-primary mb-2"
              >
                Years of Experience
              </label>
              <input
                id="adv-experience"
                type="number"
                min="0"
                value={advancedCriteria.experienceLevel}
                onChange={(e) =>
                  setAdvancedCriteria((prev) => ({
                    ...prev,
                    experienceLevel: e.target.value === '' ? '' : parseInt(e.target.value),
                  }))
                }
                placeholder="Enter minimum years"
                className="w-full bg-neutral-white border border-neutral-dark-grey rounded-lg px-4 py-2 focus:border-accent-gold-light focus:ring-2 focus:ring-accent-gold-light focus:ring-offset-2 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
            <Button variant="primary" onClick={handleAdvancedSearch}>
              Search
            </Button>
            <Button variant="secondary" onClick={resetAdvancedSearch}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
