import { Link } from 'react-router-dom';
import { History, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HistoryDisabled = () => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-dashed border-slate-500/30 bg-slate-950/20 p-10 text-center sm:p-12">
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-dark-text-tertiary">
        <History className="h-5 w-5" />
      </span>
      <p className="font-semibold tracking-tight text-dark-text">
        {t('history.disabled.title')}
      </p>
      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-dark-text-tertiary">
        {t('history.disabled.description')}
      </p>
      <Link
        to="/config"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-dark-text transition-colors hover:border-white/15 hover:bg-white/[0.05]"
      >
        <Settings className="h-4 w-4 text-dark-text-tertiary" />
        {t('history.disabled.openSettings')}
      </Link>
    </div>
  );
};
