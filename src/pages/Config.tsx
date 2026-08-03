import { Header } from '@/components/ui/header';
import { ConfigPage as ConfigSettings } from '@/components/config';

const Config = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <Header />
      <ConfigSettings />
    </div>
  );
};

export default Config;
