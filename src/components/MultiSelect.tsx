import React, { useState, useEffect, useRef } from 'react';

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onSelectionChange: (selectedValues: string[]) => void;
  placeholder?: string;
  label?: string;
  id?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = 'Select options',
  label,
  id,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleOption = (option: string) => {
    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option];

    onSelectionChange(newSelection);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-primary mb-2">
          {label}
        </label>
      )}
      <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
        <button
          id={id}
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full bg-neutral-white border border-neutral-dark-grey rounded-lg px-4 py-2 text-left focus:border-accent-gold-light focus:ring-2 focus:ring-accent-gold-light focus:ring-offset-2 focus:outline-none transition-all duration-200 flex justify-between items-center"
        >
          <span className="text-neutral-dark-grey">
            {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              showDropdown ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-neutral-white border border-neutral-dark-grey rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-4 py-2 hover:bg-opal cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleToggleOption(option)}
                  className="mr-3 rounded border-neutral-dark-grey text-accent-gold focus:ring-accent-gold-light"
                />
                <span className="text-sm text-primary">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
