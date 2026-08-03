import { useTranslation } from 'react-i18next';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { LANGUAGES } from '@/components/config/constants';

type LanguageSelectorProps = {
  className?: string;
};

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (value: string) => {
    void i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger
        aria-label={t('config.language')}
        className={cn(
          'h-12 w-full rounded-xl border-white/[0.08] bg-dark-bg/40 px-5 text-dark-text focus:border-white/15 focus:ring-0 focus:ring-offset-0',
          className
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-white/10 bg-dark-bg-secondary">
        {LANGUAGES.map((lang) => (
          <SelectItem
            key={lang.value}
            value={lang.value}
            className="text-dark-text focus:bg-white/5 focus:text-dark-text"
          >
            {t(`config.${lang.labelKey}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
