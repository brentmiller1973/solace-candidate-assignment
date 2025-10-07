import React from 'react';
import Image from 'next/image';

export const Header: React.FC = () => {
  return (
    <header className="bg-neutral-white text-primary-default sticky top-0 z-50 shadow-lg border-b border-neutral-light-grey">
      <div className="max-w-[1231px] mx-auto px-4">
        <nav className="flex items-center py-5" role="navigation" aria-label="Main navigation">
          <div className="flex items-center">
            <Image
              src="/solace.svg"
              alt="Solace Health"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
