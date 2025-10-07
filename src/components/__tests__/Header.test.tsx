import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, priority, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-priority={priority}
      {...props}
    />
  ),
}));

describe('Header', () => {
  it('renders header element', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders Solace logo image', () => {
    render(<Header />);

    const logo = screen.getByAltText('Solace Health');
    expect(logo).toBeInTheDocument();
  });

  it('applies correct logo image attributes', () => {
    render(<Header />);

    const logo = screen.getByAltText('Solace Health');
    expect(logo).toHaveAttribute('src', '/solace.svg');
    expect(logo).toHaveAttribute('width', '120');
    expect(logo).toHaveAttribute('height', '40');
    expect(logo).toHaveAttribute('data-priority', 'true');
  });

  it('applies correct CSS classes to header', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(
      'bg-neutral-white',
      'text-primary-default',
      'sticky',
      'top-0',
      'z-50',
      'shadow-lg',
      'border-b',
      'border-neutral-light-grey',
    );
  });

  it('applies correct CSS classes to logo', () => {
    render(<Header />);

    const logo = screen.getByAltText('Solace Health');
    expect(logo).toHaveClass('h-10', 'w-auto');
  });

  it('has proper navigation structure', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('applies container styling', () => {
    const { container } = render(<Header />);

    const containerDiv = container.querySelector('.max-w-\\[1231px\\]');
    expect(containerDiv).toHaveClass('max-w-[1231px]', 'mx-auto', 'px-4');
  });

  it('applies navigation styling', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex', 'items-center', 'py-5');
  });

  it('has sticky positioning', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0');
  });

  it('has proper z-index for layering', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('z-50');
  });

  it('has shadow styling', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('shadow-lg');
  });

  it('has border styling', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('border-b', 'border-neutral-light-grey');
  });

  it('renders without crashing', () => {
    expect(() => render(<Header />)).not.toThrow();
  });

  it('maintains semantic HTML structure', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    const outerDiv = header?.querySelector('.max-w-\\[1231px\\]');
    const nav = outerDiv?.querySelector('nav');
    const innerDiv = nav?.querySelector('.flex.items-center');

    expect(header).toBeInTheDocument();
    expect(outerDiv).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(innerDiv).toBeInTheDocument();
  });

  it('logo is contained within navigation', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');
    const logo = screen.getByAltText('Solace Health');

    expect(nav).toContainElement(logo);
  });

  it('applies responsive design classes', () => {
    const { container } = render(<Header />);

    const containerDiv = container.querySelector('.max-w-\\[1231px\\]');
    expect(containerDiv).toHaveClass('mx-auto', 'px-4');
  });

  it('has accessibility attributes', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('role', 'navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    const logo = screen.getByAltText('Solace Health');
    expect(logo).toHaveAttribute('alt', 'Solace Health');
  });

  it('renders consistently', () => {
    const { container: container1 } = render(<Header />);
    const { container: container2 } = render(<Header />);

    expect(container1.innerHTML).toBe(container2.innerHTML);
  });
});
