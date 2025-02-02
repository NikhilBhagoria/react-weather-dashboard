import { useWeather } from '../context/WeatherContext';
import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  const { error } = useWeather();

  if (!error) return null;

  return (
    <div className={styles.error}>
      {error}
    </div>
  );
};

export default ErrorMessage; 