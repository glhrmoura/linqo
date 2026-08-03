import { useTranslation } from 'react-i18next';

import { Switch } from '@/components/ui/switch';

import { useHistoryEnabled } from '../hooks/useHistoryEnabled';

export function HistorySetting() {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useHistoryEnabled();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-dark-text">
          {t('config.history')}
        </h3>
        <p className="mt-0.5 text-xs text-dark-text-tertiary">
          {t('config.historyDescription')}
        </p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        aria-label={t('config.history')}
        className="[&>span]:bg-white data-[state=checked]:bg-linqo-green data-[state=unchecked]:bg-white/15"
      />
    </div>
  );
}
