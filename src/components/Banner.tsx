import React from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
}

export const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  return (
    <section className="text-center pb-8 pt-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-heading text-5xl md:text-7xl font-normal leading-tight mb-6 text-primary-default">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-8 text-neutral-dark-grey">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
