import { Button, Input, Select, Spinner } from '../../../components';
import { useWeatherData } from '../../../hooks';
import { WeatherResults } from '../../../components/weatherResults';
import { useWeatherContext } from '../../../context';

interface WeatherDataType {
  sys?: {
    country?: string;
  };
  coord?: {
    lat?: number;
    lon?: number;
  };
  main?: {
    pressure?: number;
    temp?: number;
    humidity?: number;
    sea_level?: number;
  };
  weather?: Array<{
    description?: string;
  }>;
  wind?: {
    gust?: number;
    speed?: number;
  };
}
const Display = () => {
  const { city, measurement, setCity, setMeasurement } = useWeatherContext();

  const { loading, data, error } = useWeatherData(city, measurement) as {
    loading: boolean;
    data: WeatherDataType | null;
    error: string | null;
  };

  return (
    <main className='w-full px-2 pb-8 bg-black/10 backdrop-blur-sm md:px-8'>
      <section className='grid md:grid-cols-4 gap-4 my-10 w-full'>
        <aside className='md:col-span-3'>
          <form className='relative border border-black/35 mx-auto rounded-full overflow-hidden flex justify-between h-10 md:h-12 p-1 bg-gray/15 backdrop-blur-sm'>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='flex-1'
              placeholder='Type a city'
            />
            <Button
              variant='fill-blue'
              className=' h-full flex justify-center items-center whitespace-nowrap absolute top-0 right-0 rounded-full border-none text-xs'
            >
              Search
            </Button>
          </form>
        </aside>

        <aside className='w-10 md:w-auto '>
          <Select
            options={[
              { label: 'Celsius', value: 'metric' },
              { label: 'Farenheit', value: 'imperial' },
            ]}
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
          />
        </aside>
      </section>

      {city === '' ? (
        <section className='min-h-10'>
          <p className='p-10 border-dashed border font-medium rounded-2xl border-whitishgray'>
            No data Yet
          </p>
        </section>
      ) : (
        <section>
          {loading ? (
            <Spinner />
          ) : error ? (
            <div>
              <p className='p-10 border-dashed border font-medium rounded-2xl border-whitishgray'>
                {error}
              </p>
            </div>
          ) : (
            <WeatherResults
              city={city}
              country={data?.sys?.country}
              lat={data?.coord?.lat}
              lon={data?.coord?.lon}
              pressure={data?.main?.pressure}
              temp={data?.main?.temp}
              humidity={data?.main?.humidity}
              description={data?.weather?.[0]?.description}
              sealevel={data?.main?.sea_level}
              windGust={data?.wind?.gust}
              windSpeed={data?.wind?.speed}
            />
          )}
        </section>
      )}
    </main>
  );
};

export { Display };
