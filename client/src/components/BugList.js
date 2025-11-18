import React, { useState, useEffect } from 'react';
import bugService from '../services/bugService';
import BugCard from './BugCard';
import ErrorBoundary from './ErrorBoundary';

function BugList({ filterObj }) {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadBugs = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching bugs with filter:', filterObj);
        const response = await bugService.getAllBugs(filterObj);
        if (isMounted) {
          console.log('Bugs received:', response.data);
          setBugs(response.data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching bugs:', err);
          setError(err.message || 'Failed to fetch bugs');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBugs();

    return () => {
      isMounted = false;
    };
  }, [filterObj]);

  if (loading) return <div className="loading">Loading bugs...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <ErrorBoundary>
      <div className="bug-list">
        <h2>Bugs ({bugs.length})</h2>
        {bugs && bugs.length > 0 ? (
          bugs.map(bug => (
            <BugCard key={bug._id} bug={bug} />
          ))
        ) : (
          <div className="no-bugs">No bugs found</div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default BugList;