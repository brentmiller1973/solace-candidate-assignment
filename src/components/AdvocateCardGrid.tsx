import React from 'react';
import { Advocate } from '../models/advocate';
import { AdvocateCard } from './AdvocateCard';

interface AdvocateCardGridProps {
  advocates: Advocate[];
}

const AdvocateCardGrid: React.FC<AdvocateCardGridProps> = ({ advocates }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {advocates.map((advocate: Advocate) => (
        <AdvocateCard key={advocate.id} advocate={advocate} />
      ))}
    </div>
  );
};

export default AdvocateCardGrid;
