import { useTranslation } from 'react-i18next';

import { LanguageSelector } from '@/components/ui/language-selector';

export function ConfigPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto flex max-w-2xl animate-fade-in flex-col gap-6 px-4 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-[calc(5.5rem+env(safe-area-inset-top,0px))]">
      <header>
        <h2 className="text-xl font-semibold tracking-tight text-dark-text">
          {t('config.title')}
        </h2>
        <p className="mt-1 text-sm text-dark-text-tertiary">{t('config.description')}</p>
      </header>

      <section className="surface-panel p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-dark-text">{t('config.language')}</h3>
          <p className="mt-0.5 text-xs text-dark-text-tertiary">
            {t('config.languageDescription')}
          </p>
        </div>
        <LanguageSelector />
      </section>
    </div>
  );
}

export default ConfigPage;
