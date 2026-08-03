import { History } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HistoryEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-dashed border-slate-500/30 bg-slate-950/20 p-10 text-center sm:p-12">
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linqo-green/15 text-linqo-green">
        <History className="h-5 w-5" />
      </span>
      <p className="font-semibold tracking-tight text-dark-text">{t('history.empty.title')}</p>
      <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-dark-text-tertiary">
        {t('history.empty.description')}
      </p>
    </div>
  );
};
