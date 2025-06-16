import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import { fetchWeather, fetchForecast } from './utils/api';
import { transformWeatherData, transformForecastData } from './utils/transformers';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);

      setWeather(transformWeatherData(weatherData));
      setForecast(transformForecastData(forecastData));
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <SearchForm onSearch={handleSearch} />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {weather && <WeatherCard weather={weather} />}
      {forecast && <ForecastList forecast={forecast} />}
    </div>
  );
}

export default App;
