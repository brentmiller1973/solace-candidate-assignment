import React from 'react';
import { Advocate } from '../models/advocate';
import { Button } from './Button';

interface AdvocateCardProps {
  advocate: Advocate;
}

export const AdvocateCard: React.FC<AdvocateCardProps> = ({ advocate }) => {
  return (
    <article className="bg-neutral-white rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-200 border border-opal flex flex-col justify-between">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-heading text-xl font-normal text-primary-default mb-1">
              {advocate.firstName} {advocate.lastName}
            </h3>
            <p className="text-neutral-dark-grey font-medium">{advocate.degree}</p>
          </div>
          <div className="bg-accent-gold-light text-primary-default px-3 py-1 rounded-full text-sm font-bold">
            {advocate.yearsOfExperience} years
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-neutral-dark-grey">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{advocate.city}</span>
          </div>
          
          <div className="flex items-start text-neutral-dark-grey">
            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="flex flex-wrap gap-1">
              {advocate.specialties.map((specialty: string, sIndex: number) => (
                <span 
                  key={`${advocate.firstName}-${advocate.lastName}-specialty-${sIndex}`}
                  className="bg-opal text-primary-default px-2 py-1 rounded text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-neutral-light-grey">
        <a 
          href={`tel:${advocate.phoneNumber}`}
          className="flex items-center text-primary-default hover:text-primary-focused transition-colors duration-200 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {advocate.phoneNumber}
        </a>
        <Button variant="primary" size="sm">
          Connect
        </Button>
      </div>
    </article>
  );
};
