import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const formatTemp = (temp) => `${Math.round(temp)}°C`;
  const formatWind = (speed) => `${Math.round(speed)} m/s`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.city}</h2>
        <p className="weather-date">{weather.date}</p>
      </div>
      
      <div className="weather-main">
        <WeatherIcon code={weather.icon} />
        <div className="weather-temp">
          <h1>{formatTemp(weather.temp)}</h1>
          <p>{weather.description}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span>Humidity</span>
          <span>{weather.humidity}%</span>
        </div>
        <div className="detail">
          <span>Wind</span>
          <span>{formatWind(weather.windSpeed)}</span>
        </div>
        <div className="detail">
          <span>Pressure</span>
          <span>{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 