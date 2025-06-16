import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './AnalyticsChart.css';

const AnalyticsChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    const config = {
      type: 'line',
      data: {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          borderColor: dataset.borderColor,
          backgroundColor: isDarkMode 
            ? dataset.borderColor.replace(')', ', 0.2)')
            : dataset.backgroundColor,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: isDarkMode ? '#e5e7eb' : '#1f2937',
            },
          },
          title: {
            display: true,
            text: 'Website Traffic Analytics',
            font: {
              size: 16,
            },
            color: isDarkMode ? '#e5e7eb' : '#1f2937',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: isDarkMode ? '#9ca3af' : '#6b7280',
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: isDarkMode ? '#9ca3af' : '#6b7280',
            },
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="analytics-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default AnalyticsChart; 