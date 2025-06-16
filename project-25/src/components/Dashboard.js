import React, { useState, useEffect, Suspense, lazy } from 'react';
import './Dashboard.css';

// Lazy load components
const StatsCard = lazy(() => import('./features/StatsCard'));
const ActivityChart = lazy(() => import('./features/ActivityChart'));
const RecentActivity = lazy(() => import('./features/RecentActivity'));
const QuickActions = lazy(() => import('./features/QuickActions'));

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState([]);
  const [activityData, setActivityData] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [quickActions, setQuickActions] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const fetchDashboardData = () => {
      // Stats data
      setStats([
        {
          title: 'Total Users',
          value: '12,345',
          change: 12,
          trend: 'up',
        },
        {
          title: 'Revenue',
          value: '$45,678',
          change: 8,
          trend: 'up',
        },
        {
          title: 'Active Projects',
          value: '23',
          change: 3,
          trend: 'down',
        },
        {
          title: 'Conversion Rate',
          value: '3.2%',
          change: 0.5,
          trend: 'up',
        },
      ]);

      // Activity chart data
      setActivityData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Users',
            data: [650, 590, 800, 810, 960, 1000],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: '#3b82f6',
            borderWidth: 1,
          },
          {
            label: 'Revenue',
            data: [400, 450, 500, 550, 600, 650],
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            borderColor: '#10b981',
            borderWidth: 1,
          },
        ],
      });

      // Recent activities
      setRecentActivities([
        {
          icon: '👤',
          title: 'New user registration',
          time: '2 minutes ago',
          status: 'completed',
        },
        {
          icon: '💰',
          title: 'Payment received',
          time: '15 minutes ago',
          status: 'success',
        },
        {
          icon: '📝',
          title: 'Project update',
          time: '1 hour ago',
          status: 'pending',
        },
        {
          icon: '🔔',
          title: 'System notification',
          time: '2 hours ago',
          status: 'info',
        },
      ]);

      // Quick actions
      setQuickActions([
        {
          icon: '➕',
          label: 'Add User',
          onClick: () => console.log('Add user clicked'),
        },
        {
          icon: '📊',
          label: 'Generate Report',
          onClick: () => console.log('Generate report clicked'),
        },
        {
          icon: '📢',
          label: 'Send Notification',
          onClick: () => console.log('Send notification clicked'),
        },
        {
          icon: '⚙️',
          label: 'Settings',
          onClick: () => console.log('Settings clicked'),
        },
      ]);
    };

    fetchDashboardData();
  }, []);

  const FeatureLoading = () => (
    <div className="feature-loading">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Suspense key={index} fallback={<FeatureLoading />}>
              <StatsCard {...stat} />
            </Suspense>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="chart-section">
            <Suspense fallback={<FeatureLoading />}>
              <ActivityChart data={activityData} />
            </Suspense>
          </div>

          <div className="activity-section">
            <Suspense fallback={<FeatureLoading />}>
              <RecentActivity activities={recentActivities} />
            </Suspense>
          </div>

          <div className="actions-section">
            <Suspense fallback={<FeatureLoading />}>
              <QuickActions actions={quickActions} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;