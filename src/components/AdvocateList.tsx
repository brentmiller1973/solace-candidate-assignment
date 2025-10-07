import React from 'react';
import { Advocate } from '../models/advocate';
import { Button } from './Button';

interface AdvocateListProps {
  advocates: Advocate[];
}

export const AdvocateList: React.FC<AdvocateListProps> = ({ advocates }) => {
  return (
    <div className="bg-neutral-white rounded-2xl shadow-card border border-opal overflow-hidden">
      <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-100 border-b border-opal sticky top-0 z-10">
            <tr>
              <th className="text-left px-6 py-4 font-heading text-lg font-normal text-primary-default bg-green-100">
                Name
              </th>
              <th className="text-left px-6 py-4 font-heading text-lg font-normal text-primary-default bg-green-100">
                Degree
              </th>
              <th className="text-left px-6 py-4 font-heading text-lg font-normal text-primary-default bg-green-100">
                Location
              </th>
              <th className="text-left px-6 py-4 font-heading text-lg font-normal text-primary-default bg-green-100">
                Experience
              </th>
              <th className="text-left px-6 py-4 font-heading text-lg font-normal text-primary-default bg-green-100">
                Specialties
              </th>
              <th className="text-left px-6 py-4 font-heading text-lg font-normal text-primary-default bg-green-100">
                Contact
              </th>
              <th className="text-left px-6 py-4 font-heading text-lg font-normal text-primary-default bg-green-100">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {advocates.map((advocate, index) => (
              <tr 
                key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`}
                className={`border-b border-neutral-light-grey hover:bg-green-100/50 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-neutral-white' : 'bg-green-100/20'
                }`}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-heading text-lg font-normal text-primary-default">
                      {advocate.firstName} {advocate.lastName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-neutral-dark-grey font-medium">
                    {advocate.degree}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-neutral-dark-grey">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{advocate.city}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-accent-gold-light text-primary-default px-3 py-1 rounded-full text-sm font-bold inline-block">
                    {advocate.yearsOfExperience} years
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {advocate.specialties.slice(0, 3).map((specialty: string, sIndex: number) => (
                      <span 
                        key={`${advocate.firstName}-${advocate.lastName}-specialty-${sIndex}`}
                        className="bg-opal text-primary-default px-2 py-1 rounded text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {advocate.specialties.length > 3 && (
                      <span className="bg-neutral-light-grey text-neutral-dark-grey px-2 py-1 rounded text-xs font-medium">
                        +{advocate.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a 
                    href={`tel:${advocate.phoneNumber}`}
                    className="flex items-center text-primary-default hover:text-primary-focused transition-colors duration-200 font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="truncate max-w-[120px]">{advocate.phoneNumber}</span>
                  </a>
                </td>
                <td className="px-6 py-4">
                  <Button variant="primary" size="sm">
                    Connect
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};