import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { openChatUrl } from '@/lib/chat';
import { useToast } from '@/hooks/use-toast';
import { useHistoryEnabled } from '@/components/config/hooks/useHistoryEnabled';
import { Header } from '@/components/ui/header';

import { ClearHistoryDialog } from './components/ClearHistoryDialog';
import { HistoryDisabled } from './components/HistoryDisabled';
import { HistoryEmpty } from './components/HistoryEmpty';
import { HistoryHeader } from './components/HistoryHeader';
import { HistoryItem } from './components/HistoryItem';
import { useNumberHistory } from './hooks/useNumberHistory';
import type { NumberHistoryItem } from './types';

const HIDDEN_KEY = 'linqo-history-numbers-hidden';

const readNumbersHidden = () => {
  try {
    return localStorage.getItem(HIDDEN_KEY) === '1';
  } catch {
    return false;
  }
};

export const NumberHistory = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [historyEnabled] = useHistoryEnabled();
  const { items, clearItems, removeItem, touchItem } = useNumberHistory();
  const [clearOpen, setClearOpen] = useState(false);
  const [numbersHidden, setNumbersHidden] = useState(readNumbersHidden);

  useEffect(() => {
    localStorage.setItem(HIDDEN_KEY, numbersHidden ? '1' : '0');
  }, [numbersHidden]);

  const handleOpen = (item: NumberHistoryItem) => {
    openChatUrl(item.platform, item.formattedNumber);
    touchItem(item.id);

    toast({
      title: t('toast.success.title'),
      description: t('toast.success.description'),
      variant: 'success',
    });
  };

  const handleRequestClear = () => {
    if (items.length === 0) {
      return;
    }

    setClearOpen(true);
  };

  const handleConfirmClear = () => {
    clearItems();
    setClearOpen(false);
    toast({
      title: t('toast.historyCleared.title'),
      description: t('toast.historyCleared.description'),
      variant: 'success',
    });
  };

  return (
    <div className="page-shell">
      <Header />
      <div className="container mx-auto flex max-w-2xl animate-fade-in flex-col gap-6 px-4 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-[calc(5.5rem+env(safe-area-inset-top,0px))]">
        <HistoryHeader
          count={historyEnabled ? items.length : 0}
          numbersHidden={numbersHidden}
          showActions={historyEnabled}
          onToggleNumbers={() => setNumbersHidden((current) => !current)}
          onClear={handleRequestClear}
        />
        {!historyEnabled ? (
          <HistoryDisabled />
        ) : items.length === 0 ? (
          <HistoryEmpty />
        ) : (
          <div className="surface-panel overflow-hidden">
            {items.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                numbersHidden={numbersHidden}
                onOpen={handleOpen}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>

      <ClearHistoryDialog
        open={clearOpen}
        onOpenChange={setClearOpen}
        onConfirm={handleConfirmClear}
      />
    </div>
  );
};

export default NumberHistory;
