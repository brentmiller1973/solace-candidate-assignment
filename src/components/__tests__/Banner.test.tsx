import React from 'react';
import { render, screen } from '@testing-library/react';
import { Banner } from '../Banner';

describe('Banner', () => {
  const defaultProps = {
    title: 'Welcome to Solace',
    subtitle: 'Find the perfect healthcare advocate for your needs',
  };

  it('renders title and subtitle correctly', () => {
    render(<Banner {...defaultProps} />);

    expect(screen.getByText('Welcome to Solace')).toBeInTheDocument();
    expect(
      screen.getByText('Find the perfect healthcare advocate for your needs'),
    ).toBeInTheDocument();
  });

  it('renders title as h1 heading', () => {
    render(<Banner {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to Solace');
  });

  it('applies correct CSS classes to title', () => {
    render(<Banner {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass(
      'font-heading',
      'text-5xl',
      'md:text-7xl',
      'font-normal',
      'leading-tight',
      'mb-6',
      'text-primary-default',
    );
  });

  it('applies correct CSS classes to subtitle', () => {
    render(<Banner {...defaultProps} />);

    const subtitle = screen.getByText('Find the perfect healthcare advocate for your needs');
    expect(subtitle).toHaveClass(
      'text-xl',
      'md:text-2xl',
      'font-light',
      'leading-relaxed',
      'max-w-2xl',
      'mx-auto',
      'mb-8',
      'text-neutral-dark-grey',
    );
  });

  it('has proper semantic structure', () => {
    const { container } = render(<Banner {...defaultProps} />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('applies responsive design classes', () => {
    const { container } = render(<Banner {...defaultProps} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('text-center', 'pb-8', 'pt-12');

    const contentDiv = container.querySelector('.max-w-4xl');
    expect(contentDiv).toHaveClass('max-w-4xl', 'mx-auto', 'px-4');
  });

  it('handles empty title', () => {
    render(<Banner title="" subtitle={defaultProps.subtitle} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('');
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  it('handles empty subtitle', () => {
    render(<Banner title={defaultProps.title} subtitle="" />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();

    const subtitle = screen.getByText('', { selector: 'p' });
    expect(subtitle).toBeInTheDocument();
  });

  it('handles long title text', () => {
    const longTitle =
      'This is a very long title that should still render correctly and maintain proper styling';
    render(<Banner title={longTitle} subtitle={defaultProps.subtitle} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('handles long subtitle text', () => {
    const longSubtitle =
      'This is a very long subtitle that provides detailed information about the healthcare advocate platform and should render with proper line breaks and spacing';
    render(<Banner title={defaultProps.title} subtitle={longSubtitle} />);

    expect(screen.getByText(longSubtitle)).toBeInTheDocument();
  });

  it('handles special characters in title and subtitle', () => {
    const specialTitle = 'Welcome to Solace™ & Partners';
    const specialSubtitle = 'Find healthcare advocates with 24/7 support & premium care';

    render(<Banner title={specialTitle} subtitle={specialSubtitle} />);

    expect(screen.getByText(specialTitle)).toBeInTheDocument();
    expect(screen.getByText(specialSubtitle)).toBeInTheDocument();
  });

  it('maintains proper text hierarchy', () => {
    render(<Banner {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 1 });
    const subtitle = screen.getByText(defaultProps.subtitle);

    expect(heading.tagName).toBe('H1');
    expect(subtitle.tagName).toBe('P');
  });

  it('applies correct container structure', () => {
    const { container } = render(<Banner {...defaultProps} />);
    const section = container.querySelector('section');
    const contentDiv = section?.querySelector('.max-w-4xl');
    const heading = contentDiv?.querySelector('h1');
    const paragraph = contentDiv?.querySelector('p');

    expect(section).toBeInTheDocument();
    expect(contentDiv).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it('renders with different title and subtitle combinations', () => {
    const { rerender } = render(<Banner title="Title 1" subtitle="Subtitle 1" />);

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Subtitle 1')).toBeInTheDocument();

    rerender(<Banner title="Title 2" subtitle="Subtitle 2" />);

    expect(screen.getByText('Title 2')).toBeInTheDocument();
    expect(screen.getByText('Subtitle 2')).toBeInTheDocument();
    expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Subtitle 1')).not.toBeInTheDocument();
  });
});
