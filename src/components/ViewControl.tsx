import React from 'react';

interface ViewControlProps {
  view: 'card' | 'table';
  onViewChange: (view: 'card' | 'table') => void;
}

export const ViewControl: React.FC<ViewControlProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center bg-neutral-white border border-neutral-light-grey rounded-lg p-1">
      <button
        onClick={() => onViewChange('card')}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          view === 'card'
            ? 'bg-primary-default text-neutral-white shadow-sm'
            : 'text-neutral-dark-grey hover:text-primary-default hover:bg-neutral-light-grey'
        }`}
        aria-label="Card view"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM9 7v10m6-10v10" />
        </svg>
        Cards
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          view === 'table'
            ? 'bg-primary-default text-neutral-white shadow-sm'
            : 'text-neutral-dark-grey hover:text-primary-default hover:bg-neutral-light-grey'
        }`}
        aria-label="Table view"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9M3 14h6m-6 4h6m4 0h9" />
        </svg>
        Table
      </button>
    </div>
  );
};
