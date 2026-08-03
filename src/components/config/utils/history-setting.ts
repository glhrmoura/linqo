const STORAGE_KEY = 'linqo-history-enabled';
export const HISTORY_ENABLED_EVENT = 'linqo-history-enabled-change';

export function isHistoryEnabled(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== '0';
}

export function setHistoryEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  window.dispatchEvent(
    new CustomEvent(HISTORY_ENABLED_EVENT, { detail: enabled })
  );
}
