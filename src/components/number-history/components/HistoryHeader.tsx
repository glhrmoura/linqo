import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type HistoryHeaderProps = {
  count: number;
  onClear: () => void;
};

export const HistoryHeader = ({ count, onClear }: HistoryHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-dark-text">
          {t('history.title')}
        </h2>
        <p className="mt-1 text-sm text-dark-text-tertiary">
          {t('history.subtitle', { count })}
        </p>
      </div>
      <button
        type="button"
        onClick={onClear}
        disabled={count === 0}
        aria-label={t('history.clear')}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-dark-text-tertiary transition-colors hover:border-white/15 hover:bg-white/[0.05] hover:text-dark-text disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </header>
  );
};
