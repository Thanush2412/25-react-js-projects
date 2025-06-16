export const transformWeatherData = (data) => {
  return {
    city: data.name,
    date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure
  };
};

export const transformForecastData = (data) => {
  // Group forecast by day
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Calculate daily averages and get first weather condition
  return Object.entries(dailyForecast).map(([date, items]) => {
    const temps = items.map(item => item.main.temp);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

    return {
      date,
      temp: avgTemp,
      icon: items[0].weather[0].icon,
      description: items[0].weather[0].description
    };
  }).slice(0, 5); // Get only 5 days
}; 