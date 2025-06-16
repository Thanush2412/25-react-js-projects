import React from 'react';
import WeatherIcon from './WeatherIcon';

const ForecastList = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const formatTemp = (temp) => `${Math.round(temp)}°C`;
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="forecast-list">
      <h3>5-Day Forecast</h3>
      <div className="forecast-items">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p className="forecast-date">{formatDate(day.date)}</p>
            <WeatherIcon code={day.icon} />
            <p className="forecast-temp">{formatTemp(day.temp)}</p>
            <p className="forecast-desc">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList; 