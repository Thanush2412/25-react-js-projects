import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CityInsights.css';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Open-Meteo API configuration
const BASE_URL = 'https://api.open-meteo.com/v1';

// Map click handler component
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const CityInsights = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data for a location
  const fetchWeatherData = useCallback(async (latlng) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?latitude=${latlng.lat}&longitude=${latlng.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation,cloud_cover&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const current = data.current;
      
      // Convert weather code to description
      const weatherDescriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
      };

      return {
        id: `${latlng.lat}-${latlng.lng}-${Date.now()}`,
        name: `Location (${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)})`,
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        weather: weatherDescriptions[current.weather_code] || 'Unknown',
        description: weatherDescriptions[current.weather_code] || 'Unknown',
        windSpeed: current.wind_speed_10m,
        precipitation: current.precipitation,
        cloudCover: current.cloud_cover,
        lat: latlng.lat,
        lng: latlng.lng,
        lastUpdated: new Date().toLocaleTimeString()
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }, []);

  // Handle map click
  const handleMapClick = useCallback(async (latlng) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await fetchWeatherData(latlng);
      setLocations(prev => [...prev, weatherData]);
      setSelectedLocation(weatherData);
    } catch (error) {
      setError('Failed to fetch weather data for selected location');
    } finally {
      setLoading(false);
    }
  }, [fetchWeatherData]);

  // Remove a location
  const removeLocation = useCallback((locationId) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
    if (selectedLocation?.id === locationId) {
      setSelectedLocation(null);
    }
  }, [selectedLocation]);

  return (
    <div className="city-insights">
      <div className="insights-header">
        <h2>Real-Time Weather Map</h2>
        <div className="controls">
          <button 
            className="refresh-btn" 
            onClick={() => setLocations([])}
            disabled={loading}
          >
            Clear All Locations
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading weather data...</div>}

      <div className="dashboard-grid">
        <div className="map-container">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler onMapClick={handleMapClick} />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                eventHandlers={{
                  click: () => setSelectedLocation(location)
                }}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>{location.name}</h3>
                    <p>Temperature: {location.temperature.toFixed(1)}°C</p>
                    <p>Weather: {location.weather}</p>
                    <p>Humidity: {location.humidity}%</p>
                    <p>Wind: {location.windSpeed} km/h</p>
                    <p>Precipitation: {location.precipitation} mm</p>
                    <p>Cloud Cover: {location.cloudCover}%</p>
                    <p>Last Updated: {location.lastUpdated}</p>
                    <button 
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLocation(location.id);
                      }}
                    >
                      Remove Location
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {selectedLocation && (
          <div className="city-details">
            <h3>{selectedLocation.name}</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Temperature</span>
                <span className="detail-value">{selectedLocation.temperature.toFixed(1)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Weather</span>
                <span className="detail-value">{selectedLocation.weather}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{selectedLocation.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{selectedLocation.windSpeed} km/h</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Precipitation</span>
                <span className="detail-value">{selectedLocation.precipitation} mm</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cloud Cover</span>
                <span className="detail-value">{selectedLocation.cloudCover}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Updated</span>
                <span className="detail-value">{selectedLocation.lastUpdated}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="performance-tips">
        <h3>How to Use</h3>
        <ul>
          <li>Click anywhere on the map to get real-time weather data</li>
          <li>Click on markers to view detailed weather information</li>
          <li>Remove individual locations using the "Remove Location" button in the popup</li>
          <li>Clear all locations using the "Clear All Locations" button</li>
        </ul>
      </div>
    </div>
  );
};

export default CityInsights; 