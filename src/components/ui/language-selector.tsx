import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const languages = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px] bg-dark-bg-tertiary border-dark-bg-quaternary text-dark-text focus:border-whatsapp-green focus:ring-whatsapp-green/20 h-10">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-dark-text-secondary" />
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
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 