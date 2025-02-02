import { useWeather } from '../../context/WeatherContext';
import styles from './WeatherDisplay.module.css';

const WeatherDisplay = () => {
  const { weatherData, unit, setUnit, convertTemp } = useWeather();

  if (!weatherData) return null;

  const {
    main: { temp, feels_like, humidity },
    wind: { speed },
    weather: [{ description, icon }],
    name,
    sys: { country }
  } = weatherData;

  // Get current day and next days
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const nextDays = days.slice(today.getDay() + 1).concat(days.slice(0, today.getDay() + 1)).slice(0, 6);

  // Create forecast data (we'll replace temperatures with actual API data when available)
  const weeklyForecast = nextDays.map(day => ({
    day,
    temp: Math.round(temp), // Using current temp as placeholder
    icon: icon
  }));

  return (
    <div className={styles.weatherDisplay}>
      <div className={styles.location}>
        <h2>{name}, {country}</h2>
        <p>{new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })}</p>
      </div>

      <div className={styles.mainWeather}>
        <div className={styles.currentTemp}>
          <span className={styles.tempNumber}>{convertTemp(temp)}°</span>
          <button 
            onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
            className={styles.unitToggle}
          >
            {unit === 'celsius' ? 'C' : 'F'}
          </button>
        </div>
        
        <div className={styles.weatherDetails}>
          <img 
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className={styles.weatherIcon}
          />
          <div className={styles.weatherStats}>
            <p>Feels like: {convertTemp(feels_like)}°</p>
            <p>Wind: {speed.toFixed(1)} m/s</p>
            <p>Humidity: {humidity}%</p>
          </div>
        </div>
      </div>

      <div className={styles.forecast}>
        {weeklyForecast.map((day) => (
          <div key={day.day} className={styles.forecastDay}>
            <span className={styles.dayName}>{day.day}</span>
            <img 
              src={`http://openweathermap.org/img/wn/${day.icon}.png`}
              alt="weather"
              className={styles.smallIcon}
            />
            <span className={styles.dayTemp}>{convertTemp(day.temp)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay; 