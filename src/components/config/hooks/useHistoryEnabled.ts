import { useCallback, useEffect, useState } from 'react';

import {
  HISTORY_ENABLED_EVENT,
  isHistoryEnabled,
  setHistoryEnabled,
} from '../utils/history-setting';

export function useHistoryEnabled() {
  const [enabled, setEnabled] = useState(isHistoryEnabled);

  useEffect(() => {
    const sync = () => setEnabled(isHistoryEnabled());

    const onCustom = (event: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === 'boolean') {
        setEnabled(event.detail);
        return;
      }
      sync();
    };

    window.addEventListener(HISTORY_ENABLED_EVENT, onCustom);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener(HISTORY_ENABLED_EVENT, onCustom);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const update = useCallback((next: boolean) => {
    setHistoryEnabled(next);
    setEnabled(next);
  }, []);

  return [enabled, update] as const;
}
