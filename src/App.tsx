import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from '@/pages/Index';
import History from '@/pages/History';
import Config from '@/pages/Config';

import { Toaster } from '@/components/ui/toaster';

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/history" element={<History />} />
        <Route path="/config" element={<Config />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
