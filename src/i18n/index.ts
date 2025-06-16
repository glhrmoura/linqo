import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
import esES from './locales/es-ES.json';

const resources = {
  'pt-BR': { translation: ptBR },
  'en-US': { translation: enUS },
  'es-ES': { translation: esES },
};

const supportedLanguages = Object.keys(resources);
const defaultLanguage = 'pt-BR';

// Get browser language and check if it's supported
const getBrowserLanguage = () => {
  const browserLang = navigator.language;
  const mainLang = browserLang.split('-')[0];
  
  // Check if the full language code is supported
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }
  
  // Check if the main language is supported
  const supportedLang = supportedLanguages.find(lang => lang.startsWith(mainLang));
  if (supportedLang) {
    return supportedLang;
  }
  
  return defaultLanguage;
};

// Get language from localStorage or browser
const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }
  return getBrowserLanguage();
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Save language to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n; 