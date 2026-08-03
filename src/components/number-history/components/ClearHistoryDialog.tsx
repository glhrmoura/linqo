import { useTranslation } from 'react-i18next';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ClearHistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const ClearHistoryDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: ClearHistoryDialogProps) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-2xl border-white/10 bg-dark-bg-secondary text-dark-text sm:rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dark-text">
            {t('history.clearConfirm.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-dark-text-tertiary">
            {t('history.clearConfirm.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2 sm:space-x-0">
          <AlertDialogCancel className="mt-0 flex-1 rounded-xl border-white/10 bg-transparent text-dark-text-secondary hover:bg-white/5 hover:text-dark-text">
            {t('history.clearConfirm.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="mt-0 flex-1 rounded-xl bg-red-500 text-white hover:bg-red-500/90"
          >
            {t('history.clearConfirm.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
