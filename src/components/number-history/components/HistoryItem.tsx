import { MessageCircle, PhoneCall, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import type { NumberHistoryItem } from '../types';
import { formatHistoryDateTime, formatHistoryPhone } from '../utils/format';

const platformIcons = {
  whatsapp: MessageCircle,
  telegram: Send,
  viber: PhoneCall,
} as const;

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
  onOpen: (item: NumberHistoryItem) => void;
  onRemove: (id: string) => void;
};

export const HistoryItem = ({ item, onOpen, onRemove }: HistoryItemProps) => {
  const { t, i18n } = useTranslation();
  const Icon = platformIcons[item.platform];
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
          <Icon className="size-4" strokeWidth={2} />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex min-w-0 items-baseline gap-1.5">
            <span className="shrink-0 text-xs font-medium tabular-nums text-dark-text-tertiary">
              {item.countryCode}
            </span>
            <span className="truncate text-sm font-semibold leading-none tracking-tight tabular-nums text-dark-text">
              {displayPhone}
            </span>
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
        className="mr-3 flex size-8 shrink-0 items-center justify-center rounded-lg text-dark-text-tertiary opacity-45 transition-all duration-200 hover:opacity-100 hover:text-dark-text"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};
