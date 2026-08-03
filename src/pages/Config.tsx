import { Header } from '@/components/ui/header';
import { ConfigPage as ConfigSettings } from '@/components/config';

const Config = () => {
  return (
    <div className="page-shell">
      <Header />
      <ConfigSettings />
    </div>
  );
};

export default Config;
