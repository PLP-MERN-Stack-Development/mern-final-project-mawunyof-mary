import React, { useState, useEffect } from 'react';
import BugList from '../components/BugList';
import BugForm from '../components/BugForm';

function Dashboard({ user, onLogout }) {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bugs');
      const data = await response.json();
      setBugs(data);
    } catch (err) {
      console.error('Error fetching bugs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🐛 Bug Tracker</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <BugForm onBugAdded={fetchBugs} />
          {loading ? <p>Loading...</p> : <BugList bugs={bugs} />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
