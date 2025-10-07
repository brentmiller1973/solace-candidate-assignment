import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdvocateCard } from '../AdvocateCard';
import { Advocate } from '../../models/advocate';

// Mock the Button component
jest.mock('../Button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="mock-button" {...props}>
      {children}
    </button>
  ),
}));

describe('AdvocateCard', () => {
  const mockAdvocate: Advocate = {
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'MD',
    specialties: ['Cardiology', 'Internal Medicine', 'Emergency Medicine'],
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
  };

  it('renders advocate information correctly', () => {
    render(<AdvocateCard advocate={mockAdvocate} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('MD')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('10 years')).toBeInTheDocument();
    expect(screen.getByText('5551234567')).toBeInTheDocument();
  });

  it('renders all specialties', () => {
    render(<AdvocateCard advocate={mockAdvocate} />);

    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('Internal Medicine')).toBeInTheDocument();
    expect(screen.getByText('Emergency Medicine')).toBeInTheDocument();
  });

  it('renders phone link with correct href', () => {
    render(<AdvocateCard advocate={mockAdvocate} />);

    const phoneLink = screen.getByRole('link');
    expect(phoneLink).toHaveAttribute('href', 'tel:5551234567');
  });

  it('renders Connect button', () => {
    render(<AdvocateCard advocate={mockAdvocate} />);

    const connectButton = screen.getByTestId('mock-button');
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toHaveTextContent('Connect');
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<AdvocateCard advocate={mockAdvocate} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('bg-neutral-white', 'rounded-2xl', 'p-6', 'shadow-card');
  });

  it('renders with single specialty', () => {
    const singleSpecialtyAdvocate: Advocate = {
      ...mockAdvocate,
      specialties: ['Cardiology'],
    };

    render(<AdvocateCard advocate={singleSpecialtyAdvocate} />);

    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.queryByText('Internal Medicine')).not.toBeInTheDocument();
  });

  it('renders with no specialties', () => {
    const noSpecialtiesAdvocate: Advocate = {
      ...mockAdvocate,
      specialties: [],
    };

    render(<AdvocateCard advocate={noSpecialtiesAdvocate} />);
    expect(screen.queryByText('Cardiology')).not.toBeInTheDocument();
  });

  it('handles long names correctly', () => {
    const longNameAdvocate: Advocate = {
      ...mockAdvocate,
      firstName: 'Christopher',
      lastName: 'Montgomery-Williams',
    };

    render(<AdvocateCard advocate={longNameAdvocate} />);

    expect(screen.getByText('Christopher Montgomery-Williams')).toBeInTheDocument();
  });

  it('handles zero years of experience', () => {
    const newAdvocate: Advocate = {
      ...mockAdvocate,
      yearsOfExperience: 0,
    };

    render(<AdvocateCard advocate={newAdvocate} />);

    expect(screen.getByText('0 years')).toBeInTheDocument();
  });

  it('renders SVG icons', () => {
    const { container } = render(<AdvocateCard advocate={mockAdvocate} />);

    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('has proper semantic structure', () => {
    render(<AdvocateCard advocate={mockAdvocate} />);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('John Doe');
  });
});
