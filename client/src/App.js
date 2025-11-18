import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setView('login');
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!user) {
    return (
      <div className="app">
        {view === 'login' ? (
          <>
            <Login onLogin={handleLogin} />
            <p className="auth-toggle">
              Don't have an account? 
              <button onClick={() => setView('register')}>Register</button>
            </p>
          </>
        ) : (
          <>
            <Register onRegister={handleRegister} />
            <p className="auth-toggle">
              Already have an account? 
              <button onClick={() => setView('login')}>Login</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;