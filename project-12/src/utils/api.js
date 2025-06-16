// Mock weather data
const mockWeatherData = {
  'london': {
    name: 'London',
    main: {
      temp: 18.5,
      humidity: 65,
      pressure: 1012
    },
    weather: [{
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d'
    }],
    wind: {
      speed: 5.2,
      deg: 180
    }
  },
  'paris': {
    name: 'Paris',
    main: {
      temp: 22.3,
      humidity: 58,
      pressure: 1015
    },
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 3.1,
      deg: 240
    }
  },
  'tokyo': {
    name: 'Tokyo',
    main: {
      temp: 25.7,
      humidity: 72,
      pressure: 1008
    },
    weather: [{
      main: 'Rain',
      description: 'light rain',
      icon: '10d'
    }],
    wind: {
      speed: 4.5,
      deg: 120
    }
  },
  'new york': {
    name: 'New York',
    main: {
      temp: 20.1,
      humidity: 62,
      pressure: 1018
    },
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 6.8,
      deg: 290
    }
  },
  'sydney': {
    name: 'Sydney',
    main: {
      temp: 23.4,
      humidity: 68,
      pressure: 1013
    },
    weather: [{
      main: 'Sunny',
      description: 'sunny',
      icon: '01d'
    }],
    wind: {
      speed: 4.2,
      deg: 150
    }
  }
};

// Mock forecast data
const mockForecastData = {
  'london': {
    list: Array(40).fill(null).map((_, index) => ({
      dt: Date.now() / 1000 + index * 21600,
      main: {
        temp: 18.5 + Math.random() * 5 - 2.5
      },
      weather: [{
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)]
      }]
    }))
  },
  'paris': {
    list: Array(40).fill(null).map((_, index) => ({
      dt: Date.now() / 1000 + index * 21600,
      main: {
        temp: 22.3 + Math.random() * 5 - 2.5
      },
      weather: [{
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)]
      }]
    }))
  },
  'tokyo': {
    list: Array(40).fill(null).map((_, index) => ({
      dt: Date.now() / 1000 + index * 21600,
      main: {
        temp: 25.7 + Math.random() * 5 - 2.5
      },
      weather: [{
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)]
      }]
    }))
  },
  'new york': {
    list: Array(40).fill(null).map((_, index) => ({
      dt: Date.now() / 1000 + index * 21600,
      main: {
        temp: 20.1 + Math.random() * 5 - 2.5
      },
      weather: [{
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)]
      }]
    }))
  },
  'sydney': {
    list: Array(40).fill(null).map((_, index) => ({
      dt: Date.now() / 1000 + index * 21600,
      main: {
        temp: 23.4 + Math.random() * 5 - 2.5
      },
      weather: [{
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)]
      }]
    }))
  }
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to extract weather data from Google search results
const extractWeatherData = (html) => {
  try {
    // Extract temperature
    const tempMatch = html.match(/(\d+)[°°C]/);
    const temp = tempMatch ? parseInt(tempMatch[1]) : null;

    // Extract weather condition
    const conditionMatch = html.match(/weather condition[^<]*>([^<]+)/i);
    const condition = conditionMatch ? conditionMatch[1].trim() : 'Unknown';

    // Extract humidity
    const humidityMatch = html.match(/Humidity[^<]*>(\d+)%/i);
    const humidity = humidityMatch ? parseInt(humidityMatch[1]) : null;

    // Extract wind
    const windMatch = html.match(/Wind[^<]*>([^<]+)/i);
    const wind = windMatch ? windMatch[1].trim() : null;

    return {
      temp,
      condition,
      humidity,
      wind
    };
  } catch (error) {
    console.error('Error extracting weather data:', error);
    return null;
  }
};

// Function to extract forecast data from Google search results
const extractForecastData = (html) => {
  try {
    // Extract forecast data using regex patterns
    const forecastMatches = html.match(/<div[^>]*class="[^"]*weather-forecast[^"]*"[^>]*>([\s\S]*?)<\/div>/gi);
    
    if (!forecastMatches) {
      return null;
    }

    // Process each forecast day
    const forecastData = forecastMatches.slice(0, 5).map((match, index) => {
      // Extract temperature
      const tempMatch = match.match(/(\d+)[°°C]/);
      const temp = tempMatch ? parseInt(tempMatch[1]) : Math.round(Math.random() * 10 + 15);

      // Extract condition
      const conditionMatch = match.match(/<span[^>]*>([^<]+)<\/span>/i);
      const condition = conditionMatch ? conditionMatch[1].trim() : 'Unknown';

      return {
        dt: Date.now() / 1000 + index * 86400, // One day intervals
        main: {
          temp: temp
        },
        weather: [{
          icon: getWeatherIcon(condition),
          description: condition
        }]
      };
    });

    return {
      list: forecastData
    };
  } catch (error) {
    console.error('Error extracting forecast data:', error);
    return null;
  }
};

// Function to get coordinates for a city
const getCoordinates = async (city) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }
    
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      name: data.results[0].name
    };
  } catch (error) {
    console.error('Error getting coordinates:', error);
    throw new Error('City not found');
  }
};

// Function to get weather icon based on weather code
const getWeatherIcon = (code) => {
  const iconMap = {
    0: '01d',  // Clear sky
    1: '02d',  // Mainly clear
    2: '03d',  // Partly cloudy
    3: '04d',  // Overcast
    45: '50d', // Foggy
    48: '50d', // Depositing rime fog
    51: '10d', // Light drizzle
    53: '10d', // Moderate drizzle
    55: '10d', // Dense drizzle
    61: '10d', // Slight rain
    63: '10d', // Moderate rain
    65: '10d', // Heavy rain
    71: '13d', // Slight snow
    73: '13d', // Moderate snow
    75: '13d', // Heavy snow
    77: '13d', // Snow grains
    80: '10d', // Slight rain showers
    81: '10d', // Moderate rain showers
    82: '10d', // Violent rain showers
    85: '13d', // Slight snow showers
    86: '13d', // Heavy snow showers
    95: '11d', // Thunderstorm
    96: '11d', // Thunderstorm with slight hail
    99: '11d'  // Thunderstorm with heavy hail
  };
  return iconMap[code] || '01d';
};

// Function to get weather description based on weather code
const getWeatherDescription = (code) => {
  const descriptionMap = {
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
  return descriptionMap[code] || 'Unknown';
};

export const fetchWeather = async (city) => {
  try {
    // Get coordinates for the city
    const coords = await getCoordinates(city);
    
    // Fetch current weather
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    const current = data.current_weather;
    const hourly = data.hourly;
    
    // Get current hour index
    const currentHour = new Date().getHours();
    
    return {
      name: coords.name,
      main: {
        temp: current.temperature,
        humidity: hourly.relativehumidity_2m[currentHour],
        pressure: 1013 // Default pressure as it's not provided by the API
      },
      weather: [{
        main: getWeatherDescription(current.weathercode),
        description: getWeatherDescription(current.weathercode),
        icon: getWeatherIcon(current.weathercode)
      }],
      wind: {
        speed: current.windspeed,
        deg: 0 // Wind direction not provided by the API
      }
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('City not found or weather data unavailable');
  }
};

export const fetchForecast = async (city) => {
  try {
    // Get coordinates for the city
    const coords = await getCoordinates(city);
    
    // Fetch forecast data
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    const data = await response.json();
    
    // Transform the data to match our app's format
    const forecastData = {
      list: data.daily.time.map((date, index) => ({
        dt: new Date(date).getTime() / 1000,
        main: {
          temp: (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2
        },
        weather: [{
          icon: getWeatherIcon(data.daily.weathercode[index]),
          description: getWeatherDescription(data.daily.weathercode[index])
        }]
      }))
    };

    return forecastData;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error('Forecast data unavailable');
  }
}; 