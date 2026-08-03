import { useTranslation } from 'react-i18next';

import { openChatUrl } from '@/lib/chat';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/ui/header';

import { HistoryEmpty } from './components/HistoryEmpty';
import { HistoryHeader } from './components/HistoryHeader';
import { HistoryItem } from './components/HistoryItem';
import { useNumberHistory } from './hooks/useNumberHistory';
import type { NumberHistoryItem } from './types';

export const NumberHistory = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { items, clearItems, removeItem, touchItem } = useNumberHistory();

  const handleOpen = (item: NumberHistoryItem) => {
    openChatUrl(item.platform, item.formattedNumber);
    touchItem(item.id);

    toast({
      title: t('toast.success.title'),
      description: t('toast.success.description'),
      variant: 'success',
    });
  };

  const handleClear = () => {
    if (items.length === 0) {
      return;
    }

    clearItems();
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
        <HistoryHeader count={items.length} onClear={handleClear} />
        {items.length === 0 ? (
          <HistoryEmpty />
        ) : (
          <div className="surface-panel overflow-hidden">
            {items.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                onOpen={handleOpen}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberHistory;
