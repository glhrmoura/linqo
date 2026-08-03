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
      <AlertDialogContent className="max-w-sm rounded-2xl border-white/10 bg-dark-bg-secondary text-dark-text sm:rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dark-text">
            {t('history.clearConfirm.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-dark-text-tertiary">
            {t('history.clearConfirm.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl border-white/10 bg-transparent text-dark-text-secondary hover:bg-white/5 hover:text-dark-text">
            {t('history.clearConfirm.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-xl bg-red-500 text-white hover:bg-red-500/90"
          >
            {t('history.clearConfirm.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
