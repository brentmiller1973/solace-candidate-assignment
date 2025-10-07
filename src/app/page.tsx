'use client';

import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import { Advocate } from '../models/advocate';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { AdvocateCard } from '../components/AdvocateCard';
import { ViewControl } from '../components/ViewControl';
import { Banner } from '../components/Banner';
import { AdvocateSearch, AdvancedSearchCriteria } from '../components/AdvocateSearch';

const AdvocateList = lazy(() =>
  import('../components/AdvocateList').then((module) => ({ default: module.AdvocateList })),
);

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'card' | 'table'>('card');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const advocateSearchResetRef = useRef<(() => void) | null>(null);
  const searchSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);
    fetch('/api/advocates')
      .then((response) => response.json())
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching advocates:', error);
        setIsLoading(false);
      });
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const filtered = advocates.filter((advocate) => {
      const searchLower = newSearchTerm.toLowerCase();

      return (
        advocate.firstName?.toLowerCase().includes(searchLower) ||
        advocate.lastName?.toLowerCase().includes(searchLower) ||
        advocate.city?.toLowerCase().includes(searchLower) ||
        advocate.degree?.toLowerCase().includes(searchLower) ||
        advocate.specialties?.some((specialty) => specialty?.toLowerCase().includes(searchLower)) ||
        advocate.yearsOfExperience?.toString().includes(newSearchTerm)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const onReset = () => {
    setSearchTerm('');
    setFilteredAdvocates(advocates);
    setIsAdvancedSearch(false);
  };

  const handleNewSearch = () => {
    if (advocateSearchResetRef.current) {
      advocateSearchResetRef.current();
    } else {
      onReset();
    }
    if (searchSectionRef.current) {
      searchSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onAdvancedSearch = (criteria: AdvancedSearchCriteria) => {
    setIsAdvancedSearch(true);
    setSearchTerm('');

    const filtered = advocates.filter((advocate) => {
      if (criteria.name.trim()) {
        const nameLower = criteria.name.toLowerCase();
        const fullName = `${advocate.firstName} ${advocate.lastName}`.toLowerCase();
        if (
          !fullName.includes(nameLower) &&
          !advocate.firstName?.toLowerCase().includes(nameLower) &&
          !advocate.lastName?.toLowerCase().includes(nameLower)
        ) {
          return false;
        }
      }

      if (criteria.location.trim()) {
        const locationLower = criteria.location.toLowerCase();
        if (!advocate.city?.toLowerCase().includes(locationLower)) {
          return false;
        }
      }

      if (criteria.specialties.length > 0) {
        const hasMatchingSpecialty = criteria.specialties.some((selectedSpecialty) =>
          advocate.specialties?.some((advocateSpecialty) =>
            advocateSpecialty?.toLowerCase().includes(selectedSpecialty.toLowerCase()),
          ),
        );
        if (!hasMatchingSpecialty) {
          return false;
        }
      }

      if (criteria.experienceLevel !== '' && criteria.experienceLevel > 0) {
        if (!advocate.yearsOfExperience || advocate.yearsOfExperience < criteria.experienceLevel) {
          return false;
        }
      }

      return true;
    });

    setFilteredAdvocates(filtered);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-hero min-h-screen">
        <Banner
          title="Find Your Patient Advocate"
          subtitle="Connect with expert patient advocates who can help you navigate the healthcare system and solve any medical problem."
        />

        <main className="max-w-7xl mx-auto px-4 pb-16">
          <section
            ref={searchSectionRef}
            className="bg-neutral-white/90 backdrop-blur-sm rounded-2xl border-2 border-accent-gold-light p-8 mb-12 shadow-card"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-normal text-center mb-6">
                Search Our Network of Advocates
              </h2>
              <p className="text-lg text-neutral-dark-grey text-center mb-8">
                Find the perfect advocate by name, location, specialty, or experience level
              </p>

              <AdvocateSearch
                searchTerm={searchTerm}
                onChange={onSearchChange}
                onReset={onReset}
                onAdvancedSearch={onAdvancedSearch}
                isAdvancedSearchActive={isAdvancedSearch}
                resetRef={advocateSearchResetRef}
              />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl md:text-3xl font-normal">Available Advocates</h2>
              <div className="text-neutral-dark-grey">
                <span className="font-medium text-primary-default">{filteredAdvocates.length}</span>{' '}
                of {advocates.length} advocates
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <Button variant="primary" size="sm" onClick={handleNewSearch}>
                New Search
              </Button>
              <ViewControl view={view} onViewChange={setView} />
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-default"></div>
                <p className="mt-4 text-neutral-dark-grey">Loading advocates...</p>
              </div>
            ) : filteredAdvocates.length === 0 ? (
              <div className="text-center py-16 bg-neutral-white/50 rounded-2xl">
                <div className="max-w-md mx-auto">
                  <h3 className="font-heading text-xl font-normal mb-2">No advocates found</h3>
                  <p className="text-neutral-dark-grey mb-4">
                    Try adjusting your search terms or browse all available advocates.
                  </p>
                  <Button variant="secondary" size="sm" onClick={onReset}>
                    Show All Advocates
                  </Button>
                </div>
              </div>
            ) : view === 'card' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAdvocates.map((advocate, index) => (
                  <AdvocateCard
                    key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`}
                    advocate={advocate}
                  />
                ))}
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="bg-neutral-white rounded-2xl shadow-card border border-opal p-8">
                    <div className="flex items-center justify-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-default"></div>
                      <p className="ml-4 text-neutral-dark-grey">Loading table view...</p>
                    </div>
                  </div>
                }
              >
                <AdvocateList advocates={filteredAdvocates} />
              </Suspense>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
