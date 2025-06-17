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
      <SelectTrigger className="w-auto gap-2 bg-dark-bg-tertiary border-dark-bg-quaternary text-dark-text focus:border-whatsapp-green focus:ring-whatsapp-green/20 h-10">
        <div className="flex items-center gap-2">
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-dark-bg-tertiary border-dark-bg-quaternary">
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            className="text-dark-text hover:bg-dark-bg-quaternary focus:bg-dark-bg-quaternary"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{lang.flag}</span>
              <span>{t(`languages.${lang.code}`)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 