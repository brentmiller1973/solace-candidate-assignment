import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdvocateSearch } from '../AdvocateSearch';

jest.mock('../Button', () => ({
  Button: ({ children, onClick, variant, size, className, ...props }: any) => (
    <button
      data-testid="mock-button"
      data-variant={variant}
      data-size={size}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock('../MultiSelect', () => ({
  MultiSelect: ({ options, selectedValues, onSelectionChange, placeholder, label, id }: any) => (
    <div data-testid="mock-multiselect">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        multiple
        value={selectedValues}
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, (option: any) => option.value);
          onSelectionChange(values);
        }}
        data-placeholder={placeholder}
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe('AdvocateSearch', () => {
  const defaultProps = {
    searchTerm: '',
    onChange: jest.fn(),
    onReset: jest.fn(),
    onAdvancedSearch: jest.fn(),
    isAdvancedSearchActive: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders basic search input', () => {
    render(<AdvocateSearch {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/Search by name, city, specialty/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('id', 'advocate-search');
  });

  it('displays search term in input', () => {
    render(<AdvocateSearch {...defaultProps} searchTerm="John Doe" />);

    const searchInput = screen.getByDisplayValue('John Doe');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onChange when typing in search input', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<AdvocateSearch {...defaultProps} onChange={mockOnChange} />);

    const searchInput = screen.getByPlaceholderText(/Search by name, city, specialty/i);
    await user.type(searchInput, 'test');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('shows search results indicator when searchTerm is provided', () => {
    render(<AdvocateSearch {...defaultProps} searchTerm="John" />);

    expect(screen.getByText(/Showing results for:/)).toBeInTheDocument();
    expect(screen.getByText(/John/)).toBeInTheDocument();
  });

  it('shows advanced search results indicator when isAdvancedSearchActive is true', () => {
    render(<AdvocateSearch {...defaultProps} isAdvancedSearchActive={true} />);

    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText('advanced search')).toBeInTheDocument();
  });

  it('shows Clear Search button when search is active', () => {
    render(<AdvocateSearch {...defaultProps} searchTerm="test" />);

    const clearButton = screen.getByText('Clear Search');
    expect(clearButton).toBeInTheDocument();
  });

  it('calls reset function when Clear Search is clicked', () => {
    const mockReset = jest.fn();
    render(<AdvocateSearch {...defaultProps} searchTerm="test" onReset={mockReset} />);

    const clearButton = screen.getByText('Clear Search');
    fireEvent.click(clearButton);

    expect(mockReset).toHaveBeenCalled();
  });

  it('toggles advanced search visibility', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText('Hide Advanced Search')).toBeInTheDocument();
      expect(screen.getByText('Advanced Search')).toBeInTheDocument();
    });
  });

  it('renders advanced search form when expanded', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Location')).toBeInTheDocument();
      expect(screen.getByLabelText('Specialties')).toBeInTheDocument();
      expect(screen.getByLabelText('Years of Experience')).toBeInTheDocument();
    });
  });

  it('updates advanced search criteria when form fields change', async () => {
    const user = userEvent.setup();
    render(<AdvocateSearch {...defaultProps} />);

    // Open advanced search
    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(async () => {
      const nameInput = screen.getByLabelText('Name');
      await user.type(nameInput, 'John Doe');
      expect(nameInput).toHaveValue('John Doe');

      const locationInput = screen.getByLabelText('Location');
      await user.type(locationInput, 'New York');
      expect(locationInput).toHaveValue('New York');

      const experienceInput = screen.getByLabelText('Years of Experience');
      await user.type(experienceInput, '5');
      expect(experienceInput).toHaveValue(5);
    });
  });

  it('calls onAdvancedSearch with criteria when Search button is clicked', async () => {
    const mockAdvancedSearch = jest.fn();
    render(<AdvocateSearch {...defaultProps} onAdvancedSearch={mockAdvancedSearch} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(async () => {
      const nameInput = screen.getByLabelText('Name');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      const searchButtons = screen.getAllByText('Search');
      const advancedSearchButton = searchButtons.find(
        (button) =>
          button.closest('[data-testid="mock-button"]')?.getAttribute('data-variant') === 'primary',
      );
      fireEvent.click(advancedSearchButton!);
    });

    expect(mockAdvancedSearch).toHaveBeenCalledWith({
      name: 'John Doe',
      location: '',
      specialties: [],
      experienceLevel: '',
    });
  });

  it('does not call onAdvancedSearch when no criteria are provided', async () => {
    const mockAdvancedSearch = jest.fn();
    render(<AdvocateSearch {...defaultProps} onAdvancedSearch={mockAdvancedSearch} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const searchButtons = screen.getAllByText('Search');
      const advancedSearchButton = searchButtons.find(
        (button) =>
          button.closest('[data-testid="mock-button"]')?.getAttribute('data-variant') === 'primary',
      );
      fireEvent.click(advancedSearchButton!);
    });

    expect(mockAdvancedSearch).not.toHaveBeenCalled();
  });

  it('clears advanced search criteria when Clear button is clicked', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      expect(nameInput).toHaveValue('John Doe');

      const clearButton = screen.getByText('Clear');
      fireEvent.click(clearButton);

      expect(nameInput).toHaveValue('');
    });
  });

  it('handles specialty selection through MultiSelect', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const multiSelect = screen.getByTestId('mock-multiselect');
      expect(multiSelect).toBeInTheDocument();

      const select = multiSelect.querySelector('select');
      expect(select).toHaveAttribute('data-placeholder', 'Select specialties');
    });
  });

  it('validates experience level input', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const experienceInput = screen.getByLabelText('Years of Experience');
      expect(experienceInput).toHaveAttribute('type', 'number');
      expect(experienceInput).toHaveAttribute('min', '0');
    });
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<AdvocateSearch {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/Search by name, city, specialty/i);
    expect(searchInput).toHaveClass(
      'w-full',
      'bg-neutral-white',
      'border',
      'border-neutral-dark-grey',
      'rounded-lg',
      'px-6',
      'py-4',
    );
  });

  it('has proper accessibility attributes', () => {
    render(<AdvocateSearch {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/Search by name, city, specialty/i);
    expect(searchInput).toHaveAttribute('aria-describedby', 'search-help');

    const label = screen.getByLabelText(/Search advocates by name, city, degree/i);
    expect(label).toBeInTheDocument();
  });

  it('handles resetRef properly', () => {
    const resetRef: React.MutableRefObject<(() => void) | null> = { current: null };
    const mockOnReset = jest.fn();

    render(<AdvocateSearch {...defaultProps} onReset={mockOnReset} resetRef={resetRef} />);

    expect(resetRef.current).toBeTruthy();

    // Calling the ref function should trigger reset
    if (resetRef.current) {
      act(() => {
        resetRef.current!();
      });
      expect(mockOnReset).toHaveBeenCalled();
    }
  });

  it('shows transition animation for advanced search', async () => {
    const { container } = render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    const advancedSection = container.querySelector('.transition-all.duration-300');
    expect(advancedSection).toBeInTheDocument();
  });

  it('handles all specialty options correctly', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const multiSelect = screen.getByTestId('mock-multiselect');
      const options = multiSelect.querySelectorAll('option');

      expect(options.length).toBeGreaterThan(0);
      expect(options[0]).toHaveTextContent('Attention and Hyperactivity (ADHD)');
    });
  });

  it('maintains form state when toggling advanced search', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    let toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name');
      fireEvent.change(nameInput, { target: { value: 'John' } });
      expect(nameInput).toHaveValue('John');
    });

    toggleButton = screen.getByText('Hide Advanced Search');
    fireEvent.click(toggleButton);

    toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name');
      expect(nameInput).toHaveValue('John');
    });
  });

  it('handles edge cases for experience level input', async () => {
    render(<AdvocateSearch {...defaultProps} />);

    const toggleButton = screen.getByText('Show Advanced Search');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const experienceInput = screen.getByLabelText('Years of Experience');

      fireEvent.change(experienceInput, { target: { value: '' } });
      expect(experienceInput).toHaveValue(null);

      fireEvent.change(experienceInput, { target: { value: '10' } });
      expect(experienceInput).toHaveValue(10);
    });
  });
});
