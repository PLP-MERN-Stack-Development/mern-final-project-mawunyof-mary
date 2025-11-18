import React, { useState } from 'react';
import bugService from '../services/bugService';

function BugForm({ onBugAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    priority: 2,
    status: 'open'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'priority' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('Creating bug with data:', formData);
      await bugService.createBug(formData);
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        severity: 'medium',
        priority: 2,
        status: 'open'
      });
      if (onBugAdded) {
        onBugAdded();
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error creating bug:', err);
      setError(err.message || 'Failed to create bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <h2>Create New Bug</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">✓ Bug created successfully!</div>}

      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter bug title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter bug description"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="severity">Severity:</label>
        <select
          id="severity"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="1">1 (Highest)</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 (Lowest)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Bug'}
      </button>
    </form>
  );
}

export default BugForm;