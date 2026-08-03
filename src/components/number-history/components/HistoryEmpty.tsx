import { History } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HistoryEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-dark-bg-secondary/40 p-10 text-center">
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-dark-bg-secondary text-linqo-green">
        <History className="h-5 w-5" />
      </span>
      <p className="font-semibold text-dark-text">{t('history.empty.title')}</p>
      <p className="mt-1 text-sm text-dark-text-tertiary">
        {t('history.empty.description')}
      </p>
    </div>
  );
};
