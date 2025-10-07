import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-accent-gold', 'bg-gradient-primary');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-neutral-white', 'border', 'border-neutral-grey');
  });

  it('applies link variant styles', () => {
    render(<Button variant="link">Link Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent', '!border-0');
  });

  it('applies small size styles', () => {
    render(<Button size="sm">Small Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-5', 'py-2', 'text-sm');
  });

  it('applies medium size styles by default', () => {
    render(<Button>Medium Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-[4.5rem]', 'py-4');
  });

  it('applies large size styles', () => {
    render(<Button size="lg">Large Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-[5.75rem]', 'py-4', 'text-xl');
  });

  it('applies link variant size styles correctly', () => {
    render(
      <Button variant="link" size="sm">
        Link Small
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-1', 'py-1', 'text-sm');
  });

  it('applies link variant medium size styles', () => {
    render(
      <Button variant="link" size="md">
        Link Medium
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-2', 'py-1', 'text-[1rem]');
  });

  it('applies link variant large size styles', () => {
    render(
      <Button variant="link" size="lg">
        Link Large
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-2', 'py-1', 'text-lg');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes through HTML button attributes', () => {
    render(
      <Button type="submit" id="submit-btn" data-testid="submit-button">
        Submit
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('id', 'submit-btn');
    expect(button).toHaveAttribute('data-testid', 'submit-button');
  });

  it('applies focus styles', () => {
    render(<Button>Focus Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-accent-gold-light',
    );
  });

  it('applies hover styles for primary variant', () => {
    render(<Button variant="primary">Hover Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-gradient-primary-hover', 'hover:translate-y-[-4px]');
  });

  it('applies hover styles for secondary variant', () => {
    render(<Button variant="secondary">Hover Secondary</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-neutral-grey');
  });

  it('applies hover styles for link variant', () => {
    render(<Button variant="link">Hover Link</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:text-accent-gold', 'hover:underline');
  });

  it('renders children correctly', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>,
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('combines all style classes correctly', () => {
    render(
      <Button variant="primary" size="lg" className="extra-class">
        Combined
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'font-body',
      'font-bold',
      'text-center',
      'cursor-pointer',
      'rounded-[10px]',
      'bg-accent-gold',
      'px-[5.75rem]',
      'py-4',
      'text-xl',
      'extra-class',
    );
  });

  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    render(<Button onKeyDown={handleKeyDown}>Keyboard Button</Button>);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('maintains accessibility attributes', () => {
    render(<Button aria-label="Accessible button">Accessible</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Accessible button');
  });
});
