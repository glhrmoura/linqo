import type { Platform } from '@/lib/chat';

export type NumberHistoryItem = {
  id: string;
  platform: Platform;
  countryCode: string;
  phoneNumber: string;
  formattedNumber: string;
  usedAt: number;
};
