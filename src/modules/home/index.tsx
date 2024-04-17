import { Display } from './display';
import { Recent } from './recent';

const HomeUI = () => {
  return (
    <div className='flex flex-col-reverse md:min-h-screen md:flex-row'>
      <Recent />
      <Display />
    </div>
  );
};

export { HomeUI };
