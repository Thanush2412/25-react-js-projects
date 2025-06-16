import React, { Suspense, lazy, useState, useEffect } from 'react';
import './Analytics.css';

// Lazy load analytics features
const AnalyticsChart = lazy(() => import('./features/AnalyticsChart'));
const DataTable = lazy(() => import('./features/DataTable'));
const MetricsOverview = lazy(() => import('./features/MetricsOverview'));

// Loading component for features
const FeatureLoading = () => (
  <div className="feature-loading">
    <div className="loading-spinner"></div>
  </div>
);

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    metrics: {
      pageViews: 0,
      uniqueVisitors: 0,
      avgSession: '0m 0s',
      bounceRate: '0%',
    },
    chartData: {
      labels: [],
      datasets: [],
    },
    tableData: [],
  });

  // Simulate data fetching based on date range
  useEffect(() => {
    // Generate dates based on selected range
    const generateDates = () => {
      const dates = [];
      const today = new Date();
      const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    };

    // Generate random data for demonstration
    const generateRandomData = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const dates = generateDates();
    const pageViews = dates.map(() => generateRandomData(800, 2000));
    const uniqueVisitors = dates.map(() => generateRandomData(500, 1500));

    // Update metrics
    const totalPageViews = pageViews.reduce((a, b) => a + b, 0);
    const totalUniqueVisitors = uniqueVisitors.reduce((a, b) => a + b, 0);
    const avgSession = `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 60)}s`;
    const bounceRate = `${(Math.random() * 20 + 30).toFixed(1)}%`;

    // Update chart data
    const chartData = {
      labels: dates.map(date => date.split('-')[2]), // Show only day
      datasets: [
        {
          label: 'Page Views',
          data: pageViews,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Unique Visitors',
          data: uniqueVisitors,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };

    // Update table data
    const tableData = dates.map((date, index) => ({
      id: index + 1,
      date,
      page: ['/home', '/products', '/about', '/contact', '/blog'][index % 5],
      views: pageViews[index],
      uniqueVisitors: uniqueVisitors[index],
      bounceRate: `${(Math.random() * 20 + 30).toFixed(1)}%`,
    }));

    setAnalyticsData({
      metrics: {
        pageViews: totalPageViews,
        uniqueVisitors: totalUniqueVisitors,
        avgSession,
        bounceRate,
      },
      chartData,
      tableData,
    });
  }, [dateRange]);

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <div className="date-range">
          <select value={dateRange} onChange={handleDateRangeChange}>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="analytics-content">
        <div className="metrics-section">
          <Suspense fallback={<FeatureLoading />}>
            <MetricsOverview metrics={analyticsData.metrics} />
          </Suspense>
        </div>

        <div className="chart-section">
          <Suspense fallback={<FeatureLoading />}>
            <AnalyticsChart data={analyticsData.chartData} />
          </Suspense>
        </div>

        <div className="table-section">
          <Suspense fallback={<FeatureLoading />}>
            <DataTable data={analyticsData.tableData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 