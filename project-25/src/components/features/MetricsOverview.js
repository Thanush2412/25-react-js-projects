import React from 'react';
import './MetricsOverview.css';

const MetricsOverview = () => {
  const metrics = [
    {
      id: 1,
      title: 'Total Page Views',
      value: '12,345',
      change: '+12.5%',
      trend: 'up',
    },
    {
      id: 2,
      title: 'Unique Visitors',
      value: '8,234',
      change: '+8.2%',
      trend: 'up',
    },
    {
      id: 3,
      title: 'Average Session',
      value: '2m 45s',
      change: '-3.1%',
      trend: 'down',
    },
    {
      id: 4,
      title: 'Bounce Rate',
      value: '42.3%',
      change: '-1.8%',
      trend: 'up',
    },
  ];

  return (
    <div className="metrics-overview">
      <h2>Key Metrics</h2>
      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.id} className="metric-card">
            <h3>{metric.title}</h3>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.trend}`}>
              {metric.change}
              <span className="trend-icon">
                {metric.trend === 'up' ? '↑' : '↓'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsOverview; 