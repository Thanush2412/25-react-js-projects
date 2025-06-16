import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, change, trend }) => {
  return (
    <div className="stats-card">
      <h3 className="stats-title">{title}</h3>
      <div className="stats-value">{value}</div>
      <div className={`stats-change ${trend === 'up' ? 'positive' : 'negative'}`}>
        {trend === 'up' ? '↑' : '↓'} {change}%
      </div>
    </div>
  );
};

export default StatsCard;
