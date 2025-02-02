import { useState, useEffect } from 'react'
import { WeatherProvider } from './context/WeatherContext'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import './App.css'

function App() {
  return (
    <WeatherProvider>
      <div className="weather-dashboard">
        <h1>Weather Dashboard</h1>
        <SearchBar />
        <ErrorMessage />
        <WeatherDisplay />
      </div>
    </WeatherProvider>
  )
}

export default App
