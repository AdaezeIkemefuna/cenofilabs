import { useState, useEffect } from 'react';
import axios from 'axios';
import { useWeatherContext } from '../context';

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

const useWeatherData = (city: string, unit: string) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addRecentSearch } = useWeatherContext();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setError(null);
      if (city !== '') {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
          );
          setWeatherData(response.data);
          addRecentSearch(city);
        } catch (error) {
          setError('No data available for this location.');
        } finally {
          setLoading(false);
        }
      }
    };

    const getData = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(getData);
  }, [city, unit]);

  return { weatherData, loading, error };
};

export { useWeatherData };
