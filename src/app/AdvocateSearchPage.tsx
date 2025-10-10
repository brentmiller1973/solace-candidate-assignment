'use client';

import { useEffect, useState, useCallback, lazy, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Advocate } from '../models/advocate';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ViewControl } from '../components/ViewControl';
import { Banner } from '../components/Banner';
import { AdvocateSearch, AdvancedSearchCriteria } from '../components/AdvocateSearch';
import { Pagination, PaginationInfo } from '../components/Pagination';
import { SkipLinks } from '../components/SkipLink';

const AdvocateCardGrid = lazy(() => import('../components/AdvocateCardGrid'));
const AdvocateList = lazy(() =>
  import('../components/AdvocateList').then((module) => ({ default: module.AdvocateList })),
);

interface AdvocateSearchPageProps {
  specialties: string[];
}

export default function AdvocateSearchPage({ specialties }: AdvocateSearchPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'card' | 'table'>('card');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 25,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [currentSearchCriteria, setCurrentSearchCriteria] = useState<AdvancedSearchCriteria | null>(
    null,
  );
  const advocateSearchResetRef = useRef<(() => void) | null>(null);
  const searchSectionRef = useRef<HTMLElement>(null);

  const updateURL = useCallback(
    (
      page: number = 1,
      limit: number = 25,
      searchCriteria?: AdvancedSearchCriteria | null,
      basicSearch?: string,
    ) => {
      const params = new URLSearchParams();

      if (page > 1) params.set('page', page.toString());
      if (limit !== 25) params.set('limit', limit.toString());
      if (basicSearch) params.set('search', basicSearch);

      if (searchCriteria) {
        if (searchCriteria.name) params.set('name', searchCriteria.name);
        if (searchCriteria.location) params.set('location', searchCriteria.location);
        if (searchCriteria.specialties.length > 0) {
          searchCriteria.specialties.forEach((specialty) => params.append('specialty', specialty));
        }
        if (searchCriteria.experienceLevel)
          params.set('experience', searchCriteria.experienceLevel.toString());
      }

      const newURL = params.toString() ? `?${params.toString()}` : '/';
      router.push(newURL, { scroll: false });
    },
    [router],
  );

  const initializeFromURL = useCallback(() => {
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '25');
    const search = searchParams.get('search') || '';
    const name = searchParams.get('name') || '';
    const location = searchParams.get('location') || '';
    const specialties = searchParams.getAll('specialty');
    const experience = searchParams.get('experience') || '';

    setSearchTerm(search);

    if (name || location || specialties.length > 0 || experience) {
      const criteria: AdvancedSearchCriteria = {
        name,
        location,
        specialties,
        experienceLevel: experience ? parseInt(experience) : '',
      };
      setCurrentSearchCriteria(criteria);
      setIsAdvancedSearch(true);
      return { page, limit, searchCriteria: criteria, basicSearch: '' };
    } else {
      setCurrentSearchCriteria(null);
      setIsAdvancedSearch(false);
      return { page, limit, searchCriteria: null, basicSearch: search };
    }
  }, [searchParams]);

  const buildSearchParams = (
    page: number,
    limit: number,
    searchCriteria?: AdvancedSearchCriteria | null,
    basicSearch?: string,
  ) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (basicSearch) {
      params.append('search', basicSearch);
    }

    if (searchCriteria) {
      if (searchCriteria.name.trim()) {
        params.append('name', searchCriteria.name);
      }
      if (searchCriteria.location.trim()) {
        params.append('location', searchCriteria.location);
      }
      if (searchCriteria.specialties.length > 0) {
        searchCriteria.specialties.forEach((specialty) => {
          params.append('specialty', specialty);
        });
      }
      if (searchCriteria.experienceLevel !== '' && searchCriteria.experienceLevel > 0) {
      }
    }
    return params;
  };

  const fetchAdvocatesFromAPI = useCallback(
    async (
      page: number = 1,
      limit: number = 25,
      searchCriteria?: AdvancedSearchCriteria | null,
      basicSearch?: string,
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const searchParams = buildSearchParams(page, limit, searchCriteria, basicSearch);
        const response = await fetch(`/api/advocates?${searchParams}`);

        if (!response.ok) {
          throw new Error(`Unable to load advocates (Error ${response.status}). Please try again.`);
        }

        const apiResponse = await response.json();

        if (apiResponse.error) {
          throw new Error(apiResponse.message || 'Failed to load advocates. Please try again.');
        }

        setAdvocates(apiResponse.data);
        setPagination(apiResponse.pagination);
        setIsLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Something went wrong. Please try again.';
        setError(errorMessage);
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    setIsClient(true);
    const urlState = initializeFromURL();
    fetchAdvocatesFromAPI(
      urlState.page,
      urlState.limit,
      urlState.searchCriteria,
      urlState.basicSearch,
    );
  }, [fetchAdvocatesFromAPI, initializeFromURL]);

  useEffect(() => {
    if (!isClient) return;

    const urlState = initializeFromURL();
    fetchAdvocatesFromAPI(
      urlState.page,
      urlState.limit,
      urlState.searchCriteria,
      urlState.basicSearch,
    );
  }, [searchParams, isClient, fetchAdvocatesFromAPI, initializeFromURL]);
  const handleBasicSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setIsAdvancedSearch(false);
    setCurrentSearchCriteria(null);
    updateURL(1, pagination.limit, null, newSearchTerm);
  };

  const resetAllSearchFilters = () => {
    setSearchTerm('');
    setIsAdvancedSearch(false);
    setCurrentSearchCriteria(null);
    updateURL(1, pagination.limit, null, '');
  };

  const handleNewSearchButtonClick = () => {
    if (advocateSearchResetRef.current) {
      advocateSearchResetRef.current();
    } else {
      resetAllSearchFilters();
    }
    if (searchSectionRef.current) {
      searchSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAdvancedSearchSubmit = (criteria: AdvancedSearchCriteria) => {
    setIsAdvancedSearch(true);
    setSearchTerm('');
    setCurrentSearchCriteria(criteria);
    updateURL(1, pagination.limit, criteria, '');
  };

  const handlePaginationPageChange = (page: number) => {
    updateURL(page, pagination.limit, currentSearchCriteria, searchTerm);
  };

  const handlePaginationLimitChange = (limit: number) => {
    updateURL(1, limit, currentSearchCriteria, searchTerm);
  };

  const retryLastRequest = () => {
    fetchAdvocatesFromAPI(pagination.page, pagination.limit, currentSearchCriteria, searchTerm);
  };

  const ViewLoadingFallback = () => (
    <div className="bg-neutral-white/90 backdrop-blur-sm rounded-2xl shadow-card border border-opal p-8">
      <div className="flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-default"></div>
        <p className="ml-4 text-neutral-dark-grey">Loading view...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <SkipLinks />
      <Header />

      <main id="main-content" className="bg-gradient-hero min-h-screen">
        <Banner
          title="Find Your Patient Advocate"
          subtitle="Connect with expert patient advocates who can help you navigate the healthcare system and solve any medical problem."
        />

        <div className="max-w-[1231px] mx-auto px-4 py-8">
          <section id="search-section" ref={searchSectionRef} className="mb-8">
            <AdvocateSearch
              searchTerm={searchTerm}
              onChange={handleBasicSearchChange}
              onReset={resetAllSearchFilters}
              onAdvancedSearch={handleAdvancedSearchSubmit}
              isAdvancedSearchActive={isAdvancedSearch}
              resetRef={advocateSearchResetRef}
              specialties={specialties}
            />
          </section>

          <section id="results-section">
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {isLoading && 'Loading advocates...'}
              {!isLoading && error && `Error: ${error}`}
              {!isLoading &&
                !error &&
                advocates.length > 0 &&
                `Found ${pagination.totalCount} advocates. Showing page ${pagination.page} of ${pagination.totalPages}.`}
              {!isLoading &&
                !error &&
                advocates.length === 0 &&
                'No advocates found. Try adjusting your search criteria.'}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl md:text-3xl font-normal">Available Advocates</h2>
            </div>

            <div className="flex justify-between items-center mb-4">
              <Button variant="primary" size="sm" onClick={handleNewSearchButtonClick}>
                New Search
              </Button>
              <ViewControl view={view} onViewChange={setView} />
            </div>

            {!isLoading && advocates.length > 0 && (
              <div className="mb-6">
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePaginationPageChange}
                  onLimitChange={handlePaginationLimitChange}
                />
              </div>
            )}

            <div aria-live="assertive" aria-atomic="true" className="sr-only">
              {isLoading && 'Searching for advocates, please wait...'}
            </div>

            {isLoading && !isPaginating ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-default"></div>
                <p className="mt-4 text-neutral-dark-grey">Loading advocates...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-red-50/90 backdrop-blur-sm rounded-2xl border-2 border-red-200">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-normal mb-2 text-red-800">
                    Unable to Load Advocates
                  </h3>
                  <p className="text-red-700 mb-6">{error}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="primary" size="sm" onClick={retryLastRequest}>
                      Try Again
                    </Button>
                    <Button variant="secondary" size="sm" onClick={resetAllSearchFilters}>
                      Reset Search
                    </Button>
                  </div>
                </div>
              </div>
            ) : advocates.length === 0 ? (
              <div className="text-center py-16 bg-neutral-white/50 rounded-2xl">
                <div className="max-w-md mx-auto">
                  <h3 className="font-heading text-xl font-normal mb-2">No advocates found</h3>
                  <p className="text-neutral-dark-grey mb-4">
                    Try adjusting your search terms or browse all available advocates.
                  </p>
                  <Button variant="secondary" size="sm" onClick={resetAllSearchFilters}>
                    Show All Advocates
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                {isPaginating && (
                  <div className="absolute inset-0 bg-neutral-white/50 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
                    <div className="bg-neutral-white rounded-lg shadow-card p-4 flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-default"></div>
                      <span className="text-primary-default font-medium">Loading...</span>
                    </div>
                  </div>
                )}
                <Suspense fallback={<ViewLoadingFallback />}>
                  {view === 'card' ? (
                    <AdvocateCardGrid advocates={advocates} />
                  ) : (
                    <AdvocateList advocates={advocates} />
                  )}
                </Suspense>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
