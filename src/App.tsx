import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from '@/pages/Index';
import History from '@/pages/History';
import Config from '@/pages/Config';

import { Toaster } from '@/components/ui/toaster';

function DocumentTitle() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = `${t('title')} — ${t('subtitle')}`;
  }, [t, i18n.language]);

  return null;
}

const App = () => (
  <>
    <DocumentTitle />
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
