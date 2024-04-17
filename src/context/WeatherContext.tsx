import { createContext, ReactNode, useContext, useState } from 'react';

// Define the type for the context
interface WeatherContextType {
  recentSearches: string[];
  measurement: string;
  city: string;
  addRecentSearch: (search: string) => void;
  setMeasurement: (measurement: string) => void;
  setCity: (city: string) => void;
}

const defaultValue: WeatherContextType = {
  recentSearches: [],
  measurement: 'metric',
  city: '',
  addRecentSearch: () => {},
  setMeasurement: () => {},
  setCity: () => {},
};

const WeatherContext = createContext<WeatherContextType>(defaultValue);

interface WeatherContextProviderProps {
  children: ReactNode;
}

export const WeatherContextProvider = ({
  children,
}: WeatherContextProviderProps) => {
  const getInitialRecentSearches = () => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (!savedSearches) {
      return [];
    }
    return JSON.parse(savedSearches);
  };
  const [recentSearches, setRecentSearches] = useState<string[]>(
    getInitialRecentSearches
  );
  const [measurement, setMeasurement] = useState<string>('metric');
  const [city, setCity] = useState<string>('');

  const addRecentSearch = (search: string) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = [search, ...prevSearches];

      if (updatedSearches.length > 5) {
        updatedSearches.pop();
      }

      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

      return updatedSearches;
    });
  };

  const updateMeasurement = (measurement: string) => {
    setMeasurement(measurement);
  };

  const updateCity = (city: string) => {
    setCity(city);
  };

  return (
    <WeatherContext.Provider
      value={{
        recentSearches,
        measurement,
        city,
        addRecentSearch,
        setMeasurement: updateMeasurement,
        setCity: updateCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};
