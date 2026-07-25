import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const languages = [
  { code: 'pt-BR', flag: '🇧🇷' },
  { code: 'en-US', flag: '🇺🇸' },
  { code: 'es-ES', flag: '🇪🇸' },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="h-10 w-auto gap-2 rounded-xl border-white/10 bg-white/5 text-dark-text transition-colors focus:border-linqo-green/50 focus:ring-linqo-green/20">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-linqo-green" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="border-white/10 bg-dark-bg-secondary">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="text-dark-text focus:bg-white/5 focus:text-dark-text"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{lang.flag}</span>
              <span>{t(`languages.${lang.code}`)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
