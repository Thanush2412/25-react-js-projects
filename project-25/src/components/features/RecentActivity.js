import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities }) => {
  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">
              {activity.icon}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
            {activity.status && (
              <div className={`activity-status ${activity.status}`}>
                {activity.status}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity; 