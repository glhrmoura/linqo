import type { NumberHistoryItem } from '../types';

const STORAGE_KEY = 'linqo-number-history';
const MAX_ITEMS = 50;

export const readHistory = (): NumberHistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is NumberHistoryItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.platform === 'string' &&
        typeof item.countryCode === 'string' &&
        typeof item.phoneNumber === 'string' &&
        typeof item.formattedNumber === 'string' &&
        typeof item.usedAt === 'number'
    );
  } catch {
    return [];
  }
};

export const writeHistory = (items: NumberHistoryItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
};

export const createHistoryId = (platform: string, formattedNumber: string) => {
  return `${platform}:${formattedNumber}`;
};

export const upsertHistoryItem = (
  items: NumberHistoryItem[],
  entry: Omit<NumberHistoryItem, 'id' | 'usedAt'> & { usedAt?: number }
): NumberHistoryItem[] => {
  const id = createHistoryId(entry.platform, entry.formattedNumber);
  const nextItem: NumberHistoryItem = {
    id,
    platform: entry.platform,
    countryCode: entry.countryCode,
    phoneNumber: entry.phoneNumber,
    formattedNumber: entry.formattedNumber,
    usedAt: entry.usedAt ?? Date.now(),
  };

  return [nextItem, ...items.filter((item) => item.id !== id)].slice(0, MAX_ITEMS);
};
