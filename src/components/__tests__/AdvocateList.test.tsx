import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdvocateList } from '../AdvocateList';
import { Advocate } from '../../models/advocate';

jest.mock('../Button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="mock-button" {...props}>
      {children}
    </button>
  ),
}));

describe('AdvocateList', () => {
  const mockAdvocates: Advocate[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      city: 'New York',
      degree: 'MD',
      specialties: ['Cardiology', 'Internal Medicine'],
      yearsOfExperience: 10,
      phoneNumber: 5551234567,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      city: 'Los Angeles',
      degree: 'DO',
      specialties: ['Pediatrics', 'Family Medicine', 'Emergency Medicine', 'Dermatology'],
      yearsOfExperience: 5,
      phoneNumber: 5559876543,
    },
  ];

  it('renders table with correct headers', () => {
    render(<AdvocateList advocates={mockAdvocates} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Degree')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Specialties')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders all advocates in the list', () => {
    render(<AdvocateList advocates={mockAdvocates} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('displays advocate information correctly', () => {
    render(<AdvocateList advocates={mockAdvocates} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('MD')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('10 years')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('DO')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('5 years')).toBeInTheDocument();
  });

  it('renders specialties correctly with limit of 3', () => {
    render(<AdvocateList advocates={mockAdvocates} />);

    // First advocate has 2 specialties - should show both
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('Internal Medicine')).toBeInTheDocument();

    expect(screen.getByText('Pediatrics')).toBeInTheDocument();
    expect(screen.getByText('Family Medicine')).toBeInTheDocument();
    expect(screen.getByText('Emergency Medicine')).toBeInTheDocument();
    expect(screen.getByText('+1 more')).toBeInTheDocument();
    expect(screen.queryByText('Dermatology')).not.toBeInTheDocument();
  });

  it('renders phone links with correct href attributes', () => {
    render(<AdvocateList advocates={mockAdvocates} />);

    const phoneLinks = screen.getAllByRole('link');
    expect(phoneLinks[0]).toHaveAttribute('href', 'tel:5551234567');
    expect(phoneLinks[1]).toHaveAttribute('href', 'tel:5559876543');
  });

  it('renders Connect buttons for each advocate', () => {
    render(<AdvocateList advocates={mockAdvocates} />);

    const connectButtons = screen.getAllByTestId('mock-button');
    expect(connectButtons).toHaveLength(2);
    connectButtons.forEach((button) => {
      expect(button).toHaveTextContent('Connect');
    });
  });

  it('applies alternating row colors', () => {
    const { container } = render(<AdvocateList advocates={mockAdvocates} />);

    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).toHaveClass('bg-neutral-white');
    expect(rows[1]).toHaveClass('bg-green-100/20');
  });

  it('renders with empty advocates list', () => {
    render(<AdvocateList advocates={[]} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Degree')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('renders with single advocate', () => {
    const singleAdvocate = [mockAdvocates[0]];
    render(<AdvocateList advocates={singleAdvocate} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('has proper table structure', () => {
    render(<AdvocateList advocates={mockAdvocates} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(7);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); // 1 header row + 2 data rows
  });

  it('applies sticky header styling', () => {
    const { container } = render(<AdvocateList advocates={mockAdvocates} />);

    const thead = container.querySelector('thead');
    expect(thead).toHaveClass('sticky', 'top-0', 'z-10');
  });

  it('has scrollable container', () => {
    const { container } = render(<AdvocateList advocates={mockAdvocates} />);

    const scrollContainer = container.querySelector('.max-h-\\[600px\\]');
    expect(scrollContainer).toHaveClass('overflow-y-auto', 'overflow-x-auto');
  });

  it('truncates long phone numbers', () => {
    const { container } = render(<AdvocateList advocates={mockAdvocates} />);

    const phoneSpans = container.querySelectorAll('.truncate.max-w-\\[120px\\]');
    expect(phoneSpans.length).toBeGreaterThan(0);
  });

  it('renders SVG icons for location and phone', () => {
    const { container } = render(<AdvocateList advocates={mockAdvocates} />);

    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('generates unique keys for advocates', () => {
    const duplicateAdvocates = [mockAdvocates[0], mockAdvocates[0]];

    expect(() => {
      render(<AdvocateList advocates={duplicateAdvocates} />);
    }).not.toThrow();
  });
});
