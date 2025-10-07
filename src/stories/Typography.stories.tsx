import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl font-bold text-primary mb-2">
          Heading 1 - Main Title
        </h1>
        <p className="text-neutral-grey text-sm">font-heading, text-4xl, font-bold, text-primary</p>
      </div>

      <div>
        <h2 className="font-heading text-3xl font-semibold text-primary mb-2">
          Heading 2 - Section Title
        </h2>
        <p className="text-neutral-grey text-sm">
          font-heading, text-3xl, font-semibold, text-primary
        </p>
      </div>

      <div>
        <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
          Heading 3 - Subsection Title
        </h3>
        <p className="text-neutral-grey text-sm">
          font-heading, text-2xl, font-semibold, text-primary
        </p>
      </div>

      <div>
        <h4 className="font-heading text-xl font-medium text-primary mb-2">
          Heading 4 - Minor Title
        </h4>
        <p className="text-neutral-grey text-sm">
          font-heading, text-xl, font-medium, text-primary
        </p>
      </div>

      <div>
        <h5 className="font-heading text-lg font-medium text-primary mb-2">
          Heading 5 - Small Title
        </h5>
        <p className="text-neutral-grey text-sm">
          font-heading, text-lg, font-medium, text-primary
        </p>
      </div>

      <div>
        <h6 className="font-heading text-base font-medium text-primary mb-2">
          Heading 6 - Smallest Title
        </h6>
        <p className="text-neutral-grey text-sm">
          font-heading, text-base, font-medium, text-primary
        </p>
      </div>
    </div>
  ),
};

export const Paragraphs: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="font-body text-base text-neutral-black leading-relaxed mb-2">
          This is a regular paragraph using the body font family. It demonstrates the default text
          styling used throughout the application. The text uses Inter font family with proper line
          height for optimal readability.
        </p>
        <p className="text-neutral-grey text-sm">
          font-body, text-base, text-neutral-black, leading-relaxed
        </p>
      </div>

      <div>
        <p className="font-body text-lg text-neutral-black leading-relaxed mb-2">
          This is a large paragraph that might be used for introductory text or important content
          that needs to stand out from regular body text.
        </p>
        <p className="text-neutral-grey text-sm">
          font-body, text-lg, text-neutral-black, leading-relaxed
        </p>
      </div>

      <div>
        <p className="font-body text-sm text-neutral-dark-grey leading-normal mb-2">
          This is a small paragraph typically used for captions, footnotes, or secondary information
          that supports the main content.
        </p>
        <p className="text-neutral-grey text-sm">
          font-body, text-sm, text-neutral-dark-grey, leading-normal
        </p>
      </div>

      <div>
        <p className="font-body text-base text-neutral-black leading-relaxed mb-2">
          <strong className="font-bold text-primary">Bold text</strong> can be used for emphasis,
          while <em className="italic text-accent-gold">italic text</em> provides subtle emphasis.
          <a href="#" className="text-primary hover:text-accent-gold underline transition-colors">
            Links
          </a>{' '}
          are styled with primary color and gold hover state.
        </p>
        <p className="text-neutral-grey text-sm">
          Various text treatments: bold, italic, and links
        </p>
      </div>
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-primary font-medium mb-1">Primary Text</p>
        <p className="text-neutral-grey text-sm">text-primary (#1d4339)</p>
      </div>

      <div>
        <p className="text-accent-gold font-medium mb-1">Accent Gold Text</p>
        <p className="text-neutral-grey text-sm">text-accent-gold (#d7a13b)</p>
      </div>

      <div>
        <p className="text-neutral-black font-medium mb-1">Black Text</p>
        <p className="text-neutral-grey text-sm">text-neutral-black (#101010)</p>
      </div>

      <div>
        <p className="text-neutral-dark-grey font-medium mb-1">Dark Grey Text</p>
        <p className="text-neutral-grey text-sm">text-neutral-dark-grey (#5a5a5a)</p>
      </div>

      <div>
        <p className="text-neutral-grey font-medium mb-1">Grey Text</p>
        <p className="text-neutral-grey text-sm">text-neutral-grey (#9a9a9a)</p>
      </div>
    </div>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
          Heading Font Family (Crimson Text)
        </h3>
        <p className="text-neutral-grey text-sm mb-4">
          Used for all headings and titles throughout the application
        </p>
        <div className="space-y-2">
          <p className="font-heading text-lg font-light">Light weight example</p>
          <p className="font-heading text-lg font-normal">Regular weight example</p>
          <p className="font-heading text-lg font-semibold">Semibold weight example</p>
          <p className="font-heading text-lg font-bold">Bold weight example</p>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
          Body Font Family (Inter)
        </h3>
        <p className="text-neutral-grey text-sm mb-4">
          Used for all body text, buttons, and UI elements
        </p>
        <div className="space-y-2">
          <p className="font-body text-base font-light">Light weight example</p>
          <p className="font-body text-base font-normal">Regular weight example</p>
          <p className="font-body text-base font-medium">Medium weight example</p>
          <p className="font-body text-base font-semibold">Semibold weight example</p>
          <p className="font-body text-base font-bold">Bold weight example</p>
        </div>
      </div>
    </div>
  ),
};
