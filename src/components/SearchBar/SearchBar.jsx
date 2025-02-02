import { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const { setCity } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input.trim());
      setInput('');
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar; 