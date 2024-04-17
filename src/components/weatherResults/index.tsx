import { useWeatherContext } from '../../context';
interface WeatherProps {
  city: string;
  country: string | null | undefined; // Accept string, null, or undefined
  lat: number | null | undefined;
  lon: number | null | undefined;
  pressure: number | null | undefined;
  temp: number | null | undefined;
  humidity: number | null | undefined;
  description: string | null | undefined; // Accept string, null, or undefined
  sealevel: number | null | undefined;
  windGust: number | null | undefined;
  windSpeed: number | null | undefined;
}

const WeatherResults = ({
  city,
  country,
  lat,
  lon,
  temp,
  humidity,
  pressure,
  sealevel,
  windSpeed,
  windGust,
  description,
}: WeatherProps) => {
  const { measurement } = useWeatherContext();
  const degree = measurement === 'metric' ? '°C' : '°F';
  const todayFormattedDate = formatTodayDate();

  return (
    <div className='border-2 text-black border-whitishgray min-h-24 flex flex-col rounded-xl p-4 justify-center items-center relative'>
      <p className='absolute top-4 left-4 text-md'>
        Today, {todayFormattedDate}
      </p>
      <h1 className='text-2xl font-semibold uppercase mt-10'>
        {city}, <span className='text-lg'>{country}</span>
      </h1>
      <div className='space-x-6 text-md my-2 text-xl'>
        {' '}
        <span>Lat {lat}°</span> <span>Lon {lon}°</span>
      </div>
      <h2 className='text-4xl md:text-6xl py-4'>
        {temp}
        {degree}
      </h2>
      <div className='flex items-center gap-2 md:gap-4 flex-wrap justify-center md:text-lg'>
        <span>
          Humidity:{' '}
          <strong>
            {humidity}
            {degree}
          </strong>
        </span>
        <span>
          Pressure:{' '}
          <strong>
            {pressure}
            {degree}
          </strong>
        </span>
        <span>
          Sea Level:{' '}
          <strong>
            {sealevel}
            {degree}
          </strong>
        </span>
      </div>
      <div className='flex items-center gap-2 md:gap-4 flex-wrap justify-center mt-6 mb-2 md:text-lg'>
        <span>
          Wind Speed:{' '}
          <strong>
            {windSpeed}
            {degree}
          </strong>{' '}
        </span>{' '}
        <span>
          Wind gust:{' '}
          <strong>
            {windGust}
            {degree}
          </strong>
        </span>
        <span className='capitalize'> Description: {description}</span>
      </div>
    </div>
  );
};

export { WeatherResults };

function formatTodayDate() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${
    months[month]
  }, ${year}`;

  return formattedDate;
}
