import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-default focus:text-neutral-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-gold-light"
    >
      {children}
    </a>
  );
};

export const SkipLinks: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#search-section">Skip to search</SkipLink>
      <SkipLink href="#results-section">Skip to results</SkipLink>
    </div>
  );
};
