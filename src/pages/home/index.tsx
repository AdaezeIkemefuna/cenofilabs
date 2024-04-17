import { LandingLayout } from '../../layout';
import { HomeUI } from '../../modules';

// structure layout better when router is installed
const Home = () => {
  return (
    <LandingLayout>
      <HomeUI />
    </LandingLayout>
  );
};

export { Home };
