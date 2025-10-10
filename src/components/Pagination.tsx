import React from 'react';

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onLimitChange,
}) => {
  const { page, limit, totalCount, totalPages, hasNextPage, hasPreviousPage } = pagination;

  // Calculate visible page numbers (show up to 5 pages around current page)
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 p-4 bg-neutral-white/50 backdrop-blur-sm rounded-xl border border-accent-gold-light">
      {/* Results info */}
      <div className="text-sm text-neutral-dark-grey">
        Showing <span className="font-semibold text-primary-default">{startItem}</span> to{' '}
        <span className="font-semibold text-primary-default">{endItem}</span> of{' '}
        <span className="font-semibold text-primary-default">{totalCount}</span> advocates
      </div>

      {/* Spacer to push page size selector to the right */}
      <div className="flex-1"></div>

      {/* Page size selector */}
      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="pageSize" className="text-neutral-dark-grey">
          Show:
        </label>
        <select
          id="pageSize"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-3 py-1 border border-accent-gold-light rounded-lg bg-neutral-white text-primary-default focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
        </select>
        <span className="text-neutral-dark-grey">per page</span>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPreviousPage}
            className="px-3 py-2 text-sm font-medium text-primary-default border border-accent-gold-light rounded-lg hover:bg-accent-gold-light hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary-default transition-colors"
            aria-label="Previous page"
          >
            ← Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-2">
            {visiblePages.map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === '...' ? (
                  <span className="px-2 py-1 text-neutral-dark-grey">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(pageNum as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pageNum === page
                        ? 'bg-primary-default text-neutral-white'
                        : 'text-primary-default border border-accent-gold-light hover:bg-accent-gold-light hover:text-primary-dark'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={pageNum === page ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            className="px-3 py-2 text-sm font-medium text-primary-default border border-accent-gold-light rounded-lg hover:bg-accent-gold-light hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary-default transition-colors"
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
