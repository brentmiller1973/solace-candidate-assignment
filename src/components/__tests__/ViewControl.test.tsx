import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewControl } from '../ViewControl';

describe('ViewControl', () => {
  const defaultProps = {
    view: 'card' as const,
    onViewChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both view buttons', () => {
    render(<ViewControl {...defaultProps} />);

    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Table')).toBeInTheDocument();
  });

  it('shows card view as active when view is card', () => {
    render(<ViewControl {...defaultProps} view="card" />);

    const cardButton = screen.getByText('Cards').closest('button');
    const tableButton = screen.getByText('Table').closest('button');

    expect(cardButton).toHaveClass('bg-primary-default', 'text-neutral-white');
    expect(tableButton).toHaveClass('text-neutral-dark-grey');
  });

  it('shows table view as active when view is table', () => {
    render(<ViewControl {...defaultProps} view="table" />);

    const cardButton = screen.getByText('Cards').closest('button');
    const tableButton = screen.getByText('Table').closest('button');

    expect(tableButton).toHaveClass('bg-primary-default', 'text-neutral-white');
    expect(cardButton).toHaveClass('text-neutral-dark-grey');
  });

  it('calls onViewChange with card when card button is clicked', () => {
    const mockOnViewChange = jest.fn();
    render(<ViewControl {...defaultProps} view="table" onViewChange={mockOnViewChange} />);

    const cardButton = screen.getByText('Cards').closest('button');
    fireEvent.click(cardButton!);

    expect(mockOnViewChange).toHaveBeenCalledWith('card');
  });

  it('calls onViewChange with table when table button is clicked', () => {
    const mockOnViewChange = jest.fn();
    render(<ViewControl {...defaultProps} view="card" onViewChange={mockOnViewChange} />);

    const tableButton = screen.getByText('Table').closest('button');
    fireEvent.click(tableButton!);

    expect(mockOnViewChange).toHaveBeenCalledWith('table');
  });

  it('applies correct container styling', () => {
    const { container } = render(<ViewControl {...defaultProps} />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass(
      'flex',
      'items-center',
      'bg-neutral-white',
      'border',
      'border-neutral-light-grey',
      'rounded-lg',
      'p-1',
    );
  });

  it('applies correct button styling for active state', () => {
    render(<ViewControl {...defaultProps} view="card" />);

    const cardButton = screen.getByText('Cards').closest('button');
    expect(cardButton).toHaveClass(
      'flex',
      'items-center',
      'px-3',
      'py-2',
      'rounded-md',
      'text-sm',
      'font-medium',
      'transition-all',
      'duration-200',
      'bg-primary-default',
      'text-neutral-white',
      'shadow-sm',
    );
  });

  it('applies correct button styling for inactive state', () => {
    render(<ViewControl {...defaultProps} view="card" />);

    const tableButton = screen.getByText('Table').closest('button');
    expect(tableButton).toHaveClass(
      'flex',
      'items-center',
      'px-3',
      'py-2',
      'rounded-md',
      'text-sm',
      'font-medium',
      'transition-all',
      'duration-200',
      'text-neutral-dark-grey',
      'hover:text-primary-default',
      'hover:bg-neutral-light-grey',
    );
  });

  it('renders SVG icons for both buttons', () => {
    const { container } = render(<ViewControl {...defaultProps} />);

    const svgElements = container.querySelectorAll('svg');
    expect(svgElements).toHaveLength(2);

    svgElements.forEach((svg) => {
      expect(svg).toHaveClass('w-4', 'h-4', 'mr-2');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<ViewControl {...defaultProps} />);

    const cardButton = screen.getByLabelText('Card view');
    const tableButton = screen.getByLabelText('Table view');

    expect(cardButton).toBeInTheDocument();
    expect(tableButton).toBeInTheDocument();
  });

  it('maintains button functionality when view changes', () => {
    const mockOnViewChange = jest.fn();
    const { rerender } = render(<ViewControl view="card" onViewChange={mockOnViewChange} />);

    const tableButton = screen.getByText('Table').closest('button');
    fireEvent.click(tableButton!);

    expect(mockOnViewChange).toHaveBeenCalledWith('table');

    rerender(<ViewControl view="table" onViewChange={mockOnViewChange} />);

    const cardButton = screen.getByText('Cards').closest('button');
    fireEvent.click(cardButton!);

    expect(mockOnViewChange).toHaveBeenCalledWith('card');
  });

  it('does not call onViewChange when clicking already active button', () => {
    const mockOnViewChange = jest.fn();
    render(<ViewControl view="card" onViewChange={mockOnViewChange} />);

    const cardButton = screen.getByText('Cards').closest('button');
    fireEvent.click(cardButton!);

    expect(mockOnViewChange).toHaveBeenCalledWith('card');
  });

  it('applies hover styles correctly', () => {
    render(<ViewControl {...defaultProps} view="card" />);

    const tableButton = screen.getByText('Table').closest('button');
    expect(tableButton).toHaveClass('hover:text-primary-default', 'hover:bg-neutral-light-grey');
  });

  it('applies transition styles', () => {
    render(<ViewControl {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('transition-all', 'duration-200');
    });
  });

  it('renders correct SVG paths for card icon', () => {
    const { container } = render(<ViewControl {...defaultProps} />);

    const cardButton = screen.getByText('Cards').closest('button');
    const cardSvg = cardButton?.querySelector('svg');
    const cardPath = cardSvg?.querySelector('path');

    expect(cardPath).toHaveAttribute(
      'd',
      'M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM9 7v10m6-10v10',
    );
  });

  it('renders correct SVG paths for table icon', () => {
    const { container } = render(<ViewControl {...defaultProps} />);
    const tableButton = screen.getByText('Table').closest('button');
    const tableSvg = tableButton?.querySelector('svg');
    const tablePath = tableSvg?.querySelector('path');

    expect(tablePath).toHaveAttribute('d', 'M3 10h18M3 6h18m-9 8h9M3 14h6m-6 4h6m4 0h9');
  });

  it('handles rapid clicking without issues', () => {
    const mockOnViewChange = jest.fn();
    render(<ViewControl view="card" onViewChange={mockOnViewChange} />);

    const tableButton = screen.getByText('Table').closest('button');

    fireEvent.click(tableButton!);
    fireEvent.click(tableButton!);
    fireEvent.click(tableButton!);

    expect(mockOnViewChange).toHaveBeenCalledTimes(3);
    expect(mockOnViewChange).toHaveBeenCalledWith('table');
  });

  it('maintains consistent styling across re-renders', () => {
    const { container, rerender } = render(<ViewControl view="card" onViewChange={jest.fn()} />);
    const initialHTML = container.innerHTML;

    rerender(<ViewControl view="card" onViewChange={jest.fn()} />);
    expect(container.innerHTML).toBe(initialHTML);
  });
});
