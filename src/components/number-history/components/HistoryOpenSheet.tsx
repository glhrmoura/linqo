import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PlatformIcon } from '@/components/platform-icon';
import type { Platform } from '@/lib/chat';
import { cn } from '@/lib/utils';

import type { NumberHistoryItem } from '../types';
import { formatHistoryPhone } from '../utils/format';

const EXIT_MS = 250;

const platforms: {
  id: Platform;
  buttonClass: string;
}[] = [
  {
    id: 'whatsapp',
    buttonClass: 'bg-linqo-green text-white hover:bg-linqo-green-dark',
  },
  {
    id: 'telegram',
    buttonClass: 'bg-[#229ED9] text-white hover:bg-[#1b8fc7]',
  },
  {
    id: 'viber',
    buttonClass: 'bg-[#7360F2] text-white hover:bg-[#6250e0]',
  },
];

type HistoryOpenSheetProps = {
  item: NumberHistoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenPlatform: (platform: Platform) => void;
};

export const HistoryOpenSheet = ({
  item,
  open,
  onOpenChange,
  onOpenPlatform,
}: HistoryOpenSheetProps) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);
  const [activeItem, setActiveItem] = useState(item);

  useEffect(() => {
    if (open && item) {
      setActiveItem(item);
      setMounted(true);
      setVisible(true);
      return;
    }

    setVisible(false);
    const timeout = window.setTimeout(() => {
      setMounted(false);
      setActiveItem(null);
    }, EXIT_MS);

    return () => window.clearTimeout(timeout);
  }, [open, item]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mounted, onOpenChange]);

  if (!mounted || !activeItem) {
    return null;
  }

  const displayPhone = formatHistoryPhone(
    activeItem.countryCode,
    activeItem.phoneNumber,
  );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
      <button
        type="button"
        aria-label={t('history.openSheet.cancel')}
        className={cn(
          'absolute inset-0 bg-black/70',
          visible ? 'animate-sheet-overlay-in' : 'animate-sheet-overlay-out',
        )}
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-open-sheet-title"
        className={cn(
          'relative z-10 w-full md:max-w-md',
          visible ? 'history-sheet-panel-in' : 'history-sheet-panel-out',
        )}
      >
        <div className="rounded-t-2xl border border-b-0 border-white/[0.08] bg-dark-bg-secondary px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-3 shadow-2xl md:rounded-2xl md:border md:px-5 md:pb-5 md:pt-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 md:hidden" />

          <div className="relative mb-6 text-center md:mb-5 md:pr-8 md:text-left">
            <h2
              id="history-open-sheet-title"
              className="text-base font-semibold tracking-tight text-dark-text md:text-lg"
            >
              {t('history.openSheet.title')}
            </h2>
            <p className="mt-2.5 text-xs font-normal tabular-nums tracking-wide text-dark-text-tertiary md:text-sm">
              <span>{activeItem.countryCode}</span>
              <span className="mx-1.5 text-dark-text-tertiary/50">·</span>
              <span>{displayPhone}</span>
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={t('history.openSheet.cancel')}
              className="absolute -right-1 -top-1 hidden size-8 items-center justify-center rounded-lg text-dark-text-tertiary transition-colors hover:bg-white/[0.06] hover:text-dark-text md:flex"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5 md:gap-3">
            {platforms.map(({ id, buttonClass }) => (
              <button
                key={id}
                type="button"
                onClick={() => onOpenPlatform(id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 rounded-xl px-2 py-3.5 text-xs font-semibold transition-colors sm:text-sm md:gap-2.5 md:px-3 md:py-4',
                  buttonClass,
                )}
              >
                <PlatformIcon platform={id} className="size-5 md:size-6" />
                <span className="leading-none">{t(`form.platform.${id}`)}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-dark-text-secondary transition-colors hover:bg-white/[0.06] hover:text-dark-text"
          >
            {t('history.openSheet.cancel')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
