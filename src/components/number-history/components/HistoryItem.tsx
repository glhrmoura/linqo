import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PlatformIcon } from '@/components/platform-icon';
import { cn } from '@/lib/utils';

import type { NumberHistoryItem } from '../types';
import { formatHistoryDateTime, formatHistoryPhone } from '../utils/format';

const platformIconStyles = {
  whatsapp: 'bg-linqo-green/15 text-linqo-green',
  telegram: 'bg-[#229ED9]/15 text-[#229ED9]',
  viber: 'bg-[#7360F2]/15 text-[#7360F2]',
} as const;

const platformBadgeStyles = {
  whatsapp: 'bg-linqo-green/10 text-linqo-green',
  telegram: 'bg-[#229ED9]/10 text-[#229ED9]',
  viber: 'bg-[#7360F2]/10 text-[#7360F2]',
} as const;

type HistoryItemProps = {
  item: NumberHistoryItem;
  numbersHidden: boolean;
  onOpen: (item: NumberHistoryItem) => void;
  onRemove: (id: string) => void;
};

export const HistoryItem = ({
  item,
  numbersHidden,
  onOpen,
  onRemove,
}: HistoryItemProps) => {
  const { t, i18n } = useTranslation();
  const displayPhone = formatHistoryPhone(item.countryCode, item.phoneNumber);
  const { day, time } = formatHistoryDateTime(item.usedAt, i18n.language, {
    today: t('history.date.today'),
    yesterday: t('history.date.yesterday'),
  });

  return (
    <div className="group relative flex items-center border-b border-white/[0.05] transition-colors duration-200 last:border-b-0 hover:bg-white/[0.035]">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left"
      >
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-[10px]',
            platformIconStyles[item.platform]
          )}
        >
          <PlatformIcon platform={item.platform} className="size-6" />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="relative flex min-h-[14px] min-w-0 items-center">
            <span
              className={cn(
                'flex min-w-0 items-baseline gap-1.5',
                numbersHidden && 'invisible'
              )}
              aria-hidden={numbersHidden}
            >
              <span className="shrink-0 text-xs font-medium tabular-nums text-dark-text-tertiary">
                {item.countryCode}
              </span>
              <span className="truncate text-sm font-semibold leading-none tracking-tight tabular-nums text-dark-text">
                {displayPhone}
              </span>
            </span>
            {numbersHidden && (
              <span className="absolute inset-0 flex items-center gap-1.5">
                <span className="h-3 w-7 shrink-0 rounded-full bg-white/10" />
                <span className="h-3.5 w-[9.5rem] max-w-[70%] rounded-full bg-white/10" />
              </span>
            )}
          </span>

          <span className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                'inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                platformBadgeStyles[item.platform]
              )}
            >
              {t(`form.platform.${item.platform}`)}
            </span>
            <span className="truncate text-[11px] leading-none text-dark-text-tertiary">
              {day}
              <span className="mx-1.5 inline-block h-0.5 w-0.5 shrink-0 rounded-full bg-dark-text-tertiary/70 align-middle" />
              <span className="tabular-nums">{time}</span>
            </span>
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={t('history.remove')}
        className="mr-3 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-dark-text-tertiary transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:text-dark-text"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};
