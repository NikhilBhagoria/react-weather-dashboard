import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => localStorage.getItem('lastCity') || '');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [forecastData, setForecastData] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found or API error');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
      localStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
      const interval = setInterval(() => {
        fetchWeatherData(city);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [city]);

  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return ((temp * 9/5) + 32).toFixed(1);
    }
    return temp.toFixed(1);
  };

  return (
    <WeatherContext.Provider 
      value={{
        city,
        setCity,
        weatherData,
        forecastData,
        error,
        unit,
        setUnit,
        convertTemp
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}; 