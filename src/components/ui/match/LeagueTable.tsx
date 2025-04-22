
import React, { useState, useEffect } from 'react';
import LeagueTableWidget from '../sections/LeagueTableWidget';
import LoadingState from '../common/LoadingState';

const LeagueTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingState variant="spinner" />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">League Table</h2>
      <LeagueTableWidget />
    </div>
  );
};

export default React.memo(LeagueTable);
