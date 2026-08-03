import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type HistoryHeaderProps = {
  count: number;
  numbersHidden: boolean;
  showActions?: boolean;
  onToggleNumbers: () => void;
  onClear: () => void;
};

export const HistoryHeader = ({
  count,
  numbersHidden,
  showActions = true,
  onToggleNumbers,
  onClear,
}: HistoryHeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-dark-text">
          {t('history.title')}
        </h2>
        <p className="mt-1 text-sm text-dark-text-tertiary">
          {t('history.description')}
        </p>
      </div>
      {showActions && count > 0 && (
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onToggleNumbers}
            aria-label={
              numbersHidden ? t('history.showNumbers') : t('history.hideNumbers')
            }
            aria-pressed={numbersHidden}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-dark-text-tertiary transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-dark-text"
          >
            {numbersHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onClear}
            aria-label={t('history.clear')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-dark-text-tertiary transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-dark-text"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
};
