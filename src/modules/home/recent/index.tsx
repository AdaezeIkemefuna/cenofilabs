import { useWeatherContext } from '../../../context';

const Recent = () => {
  const { recentSearches, setCity } = useWeatherContext();
  return (
    <section className=' md:w-1/4 px-2 py-6 md:p-10'>
      <h2 className='text-xl text-purple text-center uppercase'>
        Recent Searches{' '}
      </h2>
      <section>
        {recentSearches?.map((city) => (
          <p
            className='capitalize font-semibold py-2 bg-purple/5 hover:bg-purple/10 cursor-pointer my-2 px-2 rounded-xl'
            onClick={() => setCity(city)}
          >
            {city}
          </p>
        ))}
      </section>
    </section>
  );
};

export { Recent };
