import React from 'react';

const BugCard = ({ bug }) => {
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return '#ff4444';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#999';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'open': return 'Open';
      case 'in-progress': return 'In Progress';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  return (
    <div className="bug-card" style={{ borderLeft: `4px solid ${getSeverityColor(bug.severity)}` }}>
      <h3>{bug.title}</h3>
      <p className="description">{bug.description}</p>
      
      <div className="bug-meta">
        <span className="severity" style={{ backgroundColor: getSeverityColor(bug.severity) }}>
          {bug.severity.toUpperCase()}
        </span>
        <span className="priority">Priority: {bug.priority}</span>
        <span className="status">{getStatusLabel(bug.status)}</span>
      </div>

      {bug.createdAt && (
        <div className="bug-date">
          Created: {new Date(bug.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default BugCard;