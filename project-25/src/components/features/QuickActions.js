import React from 'react';
import './QuickActions.css';

const QuickActions = ({ actions }) => {
  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className="action-button"
            onClick={action.onClick}
            disabled={action.disabled}
          >
            <div className="action-icon">{action.icon}</div>
            <div className="action-label">{action.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions; 