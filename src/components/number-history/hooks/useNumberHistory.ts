import { useCallback, useState } from 'react';

import type { Platform } from '@/lib/chat';
import { isHistoryEnabled } from '@/components/config/utils/history-setting';

import type { NumberHistoryItem } from '../types';
import {
  readHistory,
  upsertHistoryItem,
  writeHistory,
} from '../utils/storage';

export type AddHistoryInput = {
  platform: Platform;
  countryCode: string;
  phoneNumber: string;
  formattedNumber: string;
};

export const useNumberHistory = () => {
  const [items, setItems] = useState<NumberHistoryItem[]>(() => readHistory());

  const persist = useCallback((next: NumberHistoryItem[]) => {
    writeHistory(next);
    setItems(next);
  }, []);

  const addItem = useCallback(
    (entry: AddHistoryInput) => {
      if (!isHistoryEnabled()) {
        return;
      }
      persist(upsertHistoryItem(readHistory(), entry));
    },
    [persist]
  );

  const removeItem = useCallback(
    (id: string) => {
      persist(readHistory().filter((item) => item.id !== id));
    },
    [persist]
  );

  const clearItems = useCallback(() => {
    persist([]);
  }, [persist]);

  const touchItem = useCallback(
    (id: string) => {
      const current = readHistory();
      const item = current.find((entry) => entry.id === id);
      if (!item) {
        return;
      }

      persist(
        upsertHistoryItem(current, {
          ...item,
          usedAt: Date.now(),
        })
      );
    },
    [persist]
  );

  return {
    items,
    addItem,
    removeItem,
    clearItems,
    touchItem,
  };
};

export const addToNumberHistory = (entry: AddHistoryInput) => {
  if (!isHistoryEnabled()) {
    return;
  }
  const items = readHistory();
  writeHistory(upsertHistoryItem(items, entry));
};
