import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SkipLink, SkipLinks } from '../SkipLink';

describe('SkipLink', () => {
  it('renders skip link with correct href and text', () => {
    render(<SkipLink href="#main-content">Skip to main content</SkipLink>);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
    expect(link).toHaveTextContent('Skip to main content');
  });

  it('applies correct accessibility classes', () => {
    render(<SkipLink href="#search">Skip to search</SkipLink>);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('sr-only');
    expect(link).toHaveClass('focus:not-sr-only');
    expect(link).toHaveClass('focus:absolute');
    expect(link).toHaveClass('focus:z-50');
  });

  it('has proper focus styling', () => {
    render(<SkipLink href="#results">Skip to results</SkipLink>);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('focus:bg-primary-default');
    expect(link).toHaveClass('focus:text-neutral-white');
    expect(link).toHaveClass('focus:ring-2');
    expect(link).toHaveClass('focus:ring-accent-gold-light');
  });
});

describe('SkipLinks', () => {
  it('renders all skip links', () => {
    render(<SkipLinks />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
    expect(screen.getByText('Skip to search')).toBeInTheDocument();
    expect(screen.getByText('Skip to results')).toBeInTheDocument();
  });

  it('has correct href attributes for all links', () => {
    render(<SkipLinks />);

    expect(screen.getByText('Skip to main content')).toHaveAttribute('href', '#main-content');
    expect(screen.getByText('Skip to search')).toHaveAttribute('href', '#search-section');
    expect(screen.getByText('Skip to results')).toHaveAttribute('href', '#results-section');
  });

  it('applies proper container styling', () => {
    const { container } = render(<SkipLinks />);
    const skipLinksContainer = container.firstChild;

    expect(skipLinksContainer).toHaveClass('sr-only');
    expect(skipLinksContainer).toHaveClass('focus-within:not-sr-only');
  });
});
