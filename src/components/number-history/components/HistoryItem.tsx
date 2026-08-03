import { MessageCircle, PhoneCall, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import type { NumberHistoryItem } from '../types';

const platformIcons = {
  whatsapp: MessageCircle,
  telegram: Send,
  viber: PhoneCall,
} as const;

const platformStyles = {
  whatsapp: 'bg-linqo-green/15 text-linqo-green',
  telegram: 'bg-[#229ED9]/15 text-[#229ED9]',
  viber: 'bg-[#7360F2]/15 text-[#7360F2]',
} as const;

type HistoryItemProps = {
  item: NumberHistoryItem;
  onOpen: (item: NumberHistoryItem) => void;
  onRemove: (id: string) => void;
};

const formatUsedAt = (usedAt: number, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(usedAt));
};

export const HistoryItem = ({ item, onOpen, onRemove }: HistoryItemProps) => {
  const { t, i18n } = useTranslation();
  const Icon = platformIcons[item.platform];

  return (
    <div className="group relative flex items-center border-b border-white/[0.05] transition-colors duration-200 last:border-b-0 hover:bg-white/[0.035]">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex min-w-0 flex-1 items-center gap-3.5 px-4 py-4 text-left"
      >
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            platformStyles[item.platform]
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-medium tracking-tight tabular-nums text-dark-text">
            {item.countryCode} {item.phoneNumber}
          </span>
          <span className="mt-1 flex items-center gap-2 text-xs text-dark-text-tertiary">
            <span>{t(`form.platform.${item.platform}`)}</span>
            <span className="text-white/15">·</span>
            <span>{formatUsedAt(item.usedAt, i18n.language)}</span>
          </span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={t('history.remove')}
        className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-dark-text-tertiary opacity-50 transition-all duration-200 hover:opacity-100 hover:text-dark-text"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
