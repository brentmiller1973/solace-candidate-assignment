import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from '../MultiSelect';

describe('MultiSelect', () => {
  const defaultProps = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedValues: [],
    onSelectionChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<MultiSelect {...defaultProps} />);

    expect(screen.getByText('Select options')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<MultiSelect {...defaultProps} placeholder="Choose items" />);

    expect(screen.getByText('Choose items')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<MultiSelect {...defaultProps} label="Select Specialties" id="specialties" />);

    expect(screen.getByText('Select Specialties')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Specialties')).toBeInTheDocument();
  });

  it('shows selected count when items are selected', () => {
    render(<MultiSelect {...defaultProps} selectedValues={['Option 1', 'Option 2']} />);

    expect(screen.getByText('2 selected')).toBeInTheDocument();
  });

  it('opens dropdown when button is clicked', async () => {
    render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  it('closes dropdown when button is clicked again', async () => {
    render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');

    // Open dropdown
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  it('calls onSelectionChange when option is selected', async () => {
    const mockOnChange = jest.fn();
    render(<MultiSelect {...defaultProps} onSelectionChange={mockOnChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox', { name: /Option 1/i });
      fireEvent.click(checkbox);
    });

    expect(mockOnChange).toHaveBeenCalledWith(['Option 1']);
  });

  it('calls onSelectionChange when option is deselected', async () => {
    const mockOnChange = jest.fn();
    render(
      <MultiSelect
        {...defaultProps}
        selectedValues={['Option 1']}
        onSelectionChange={mockOnChange}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox', { name: /Option 1/i });
      fireEvent.click(checkbox);
    });

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('shows checked state for selected options', async () => {
    render(<MultiSelect {...defaultProps} selectedValues={['Option 1', 'Option 3']} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const checkbox1 = screen.getByRole('checkbox', { name: /Option 1/i });
      const checkbox2 = screen.getByRole('checkbox', { name: /Option 2/i });
      const checkbox3 = screen.getByRole('checkbox', { name: /Option 3/i });

      expect(checkbox1).toBeChecked();
      expect(checkbox2).not.toBeChecked();
      expect(checkbox3).toBeChecked();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <MultiSelect {...defaultProps} />
        <div data-testid="outside">Outside element</div>
      </div>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    const outsideElement = screen.getByTestId('outside');
    fireEvent.mouseDown(outsideElement);

    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  it('rotates chevron icon when dropdown is open', async () => {
    const { container } = render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');
    const chevron = container.querySelector('svg');

    expect(chevron).not.toHaveClass('rotate-180');

    fireEvent.click(button);

    await waitFor(() => {
      expect(chevron).toHaveClass('rotate-180');
    });
  });

  it('applies correct CSS classes', () => {
    render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'w-full',
      'bg-neutral-white',
      'border',
      'border-neutral-dark-grey',
      'rounded-lg',
      'px-4',
      'py-2',
    );
  });

  it('applies focus styles', () => {
    render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'focus:border-accent-gold-light',
      'focus:ring-2',
      'focus:ring-accent-gold-light',
      'focus:ring-offset-2',
      'focus:outline-none',
    );
  });

  it('handles empty options array', () => {
    render(<MultiSelect {...defaultProps} options={[]} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const dropdown = document.querySelector('.absolute.z-10');
    expect(dropdown).toBeInTheDocument();
  });

  it('handles multiple selections correctly', async () => {
    const mockOnChange = jest.fn();
    render(<MultiSelect {...defaultProps} onSelectionChange={mockOnChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const checkbox1 = screen.getByRole('checkbox', { name: /Option 1/i });
      fireEvent.click(checkbox1);
    });

    expect(mockOnChange).toHaveBeenCalledWith(['Option 1']);

    await waitFor(() => {
      const checkbox2 = screen.getByRole('checkbox', { name: /Option 2/i });
      fireEvent.click(checkbox2);
    });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenLastCalledWith(['Option 2']);
  });

  it('applies hover styles to options', async () => {
    const { container } = render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const optionLabels = container.querySelectorAll('label');
      optionLabels.forEach((label) => {
        expect(label).toHaveClass('hover:bg-opal', 'cursor-pointer');
      });
    });
  });

  it('has proper accessibility attributes', () => {
    render(<MultiSelect {...defaultProps} id="test-select" label="Test Label" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'test-select');
    expect(button).toHaveAttribute('type', 'button');

    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-select');
  });

  it('maintains dropdown position with z-index', async () => {
    const { container } = render(<MultiSelect {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const dropdown = container.querySelector('.absolute.z-10');
      expect(dropdown).toHaveClass('z-10', 'absolute');
    });
  });

  it('handles long option lists with scrolling', async () => {
    const longOptions = Array.from({ length: 20 }, (_, i) => `Option ${i + 1}`);
    render(<MultiSelect {...defaultProps} options={longOptions} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const dropdown = document.querySelector('.max-h-48.overflow-y-auto');
      expect(dropdown).toBeInTheDocument();
    });
  });
});
