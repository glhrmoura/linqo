import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Check,
  CircleAlert,
  Globe,
  ClipboardPaste,
  MessageCircle,
  Send,
  PhoneCall,
} from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { formatPhoneNumber, openChatUrl, type Platform } from '@/lib/chat';
import { addToNumberHistory } from '@/components/number-history/hooks/useNumberHistory';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/ui/header';
import { cn } from '@/lib/utils';

const platforms: {
  id: Platform;
  icon: typeof MessageCircle;
  activeClass: string;
}[] = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    activeClass: 'bg-linqo-green text-white shadow-sm shadow-linqo-green/20',
  },
  {
    id: 'telegram',
    icon: Send,
    activeClass: 'bg-[#229ED9] text-white shadow-sm shadow-[#229ED9]/20',
  },
  {
    id: 'viber',
    icon: PhoneCall,
    activeClass: 'bg-[#7360F2] text-white shadow-sm shadow-[#7360F2]/20',
  },
];

const countryCodes = [
  { code: '+55', countryCode: 'BR', flag: '🇧🇷' },
  { code: '+1', countryCode: 'US', flag: '🇺🇸' },
  { code: '+34', countryCode: 'ES', flag: '🇪🇸' },
  { code: '+351', countryCode: 'PT', flag: '🇵🇹' },
  { code: '+44', countryCode: 'GB', flag: '🇬🇧' },
  { code: '+33', countryCode: 'FR', flag: '🇫🇷' },
  { code: '+49', countryCode: 'DE', flag: '🇩🇪' },
  { code: '+39', countryCode: 'IT', flag: '🇮🇹' },
  { code: '+52', countryCode: 'MX', flag: '🇲🇽' },
  { code: '+54', countryCode: 'AR', flag: '🇦🇷' },
  { code: '+56', countryCode: 'CL', flag: '🇨🇱' },
  { code: '+57', countryCode: 'CO', flag: '🇨🇴' },
  { code: '+51', countryCode: 'PE', flag: '🇵🇪' },
  { code: '+86', countryCode: 'CN', flag: '🇨🇳' },
  { code: '+81', countryCode: 'JP', flag: '🇯🇵' },
  { code: '+91', countryCode: 'IN', flag: '🇮🇳' },
];

const Index = () => {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState<Platform>('whatsapp');
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const { toast } = useToast();

  const validatePhoneNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    const isValid = cleaned.length >= 8 && cleaned.length <= 15;
    setIsValidNumber(isValid);
    return isValid;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const handlePastePhone = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const value = clipboardText.trim();
      setPhoneNumber(value);
      validatePhoneNumber(value);
    } catch {
      toast({
        title: t('toast.pasteError.title'),
        description: t('toast.pasteError.description'),
        variant: 'destructive',
      });
    }
  };

  const openChat = () => {
    if (!isValidNumber) {
      toast({
        title: t('toast.invalidNumber.title'),
        description: t('toast.invalidNumber.description'),
        variant: 'destructive',
      });
      return;
    }

    const formattedNumber = formatPhoneNumber(countryCode, phoneNumber);

    addToNumberHistory({
      platform,
      countryCode,
      phoneNumber,
      formattedNumber,
    });

    openChatUrl(platform, formattedNumber);

    toast({
      title: t('toast.success.title'),
      description: t('toast.success.description'),
      variant: 'success',
    });
  };

  return (
    <div className="page-shell">
      <Header />

      <div className="container mx-auto flex max-w-2xl animate-fade-in flex-col gap-6 px-4 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-[calc(5.5rem+env(safe-area-inset-top,0px))]">
        <header>
          <h2 className="text-xl font-semibold tracking-tight text-dark-text">
            {t('card.title')}
          </h2>
          <p className="mt-1 text-sm text-dark-text-tertiary">{t('card.description')}</p>
        </header>

        <section className="surface-panel p-5 sm:p-6">
          <div className="space-y-5">
            <div className="space-y-2.5">
              <label className="text-sm font-medium text-dark-text-secondary">
                {t('form.platform.label')}
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-2xl border border-white/[0.06] bg-dark-bg/40 p-1.5">
                {platforms.map(({ id, icon: Icon, activeClass }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPlatform(id)}
                    className={cn(
                      'flex h-11 items-center justify-center gap-1.5 rounded-xl px-1 text-xs font-medium transition-all duration-200 sm:gap-2 sm:text-sm',
                      platform === id
                        ? activeClass
                        : 'text-dark-text-tertiary hover:bg-white/[0.04] hover:text-dark-text'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{t(`form.platform.${id}`)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-medium text-dark-text-secondary">
                {t('form.countryCode.label')}
              </label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="h-12 rounded-xl border-white/[0.08] bg-dark-bg/40 text-dark-text transition-colors focus:border-white/15 focus:ring-0 focus:ring-offset-0">
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-dark-text-tertiary" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-dark-bg-secondary">
                  {countryCodes.map((country) => (
                    <SelectItem
                      key={country.code}
                      value={country.code}
                      className="text-dark-text focus:bg-white/5 focus:text-dark-text"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{country.flag}</span>
                        <span className="font-medium tabular-nums">{country.code}</span>
                        <span className="text-dark-text-tertiary">
                          {t(`countries.${country.countryCode}`)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-medium text-dark-text-secondary">
                {t('form.phoneNumber.label')}
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-text-tertiary" />
                <Input
                  type="tel"
                  placeholder={t('form.phoneNumber.placeholder')}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="h-14 rounded-xl border-white/[0.08] bg-dark-bg/40 pl-11 pr-28 text-base text-dark-text transition-colors placeholder:text-dark-text-tertiary focus-visible:border-white/15 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                  {phoneNumber && (
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg',
                        isValidNumber
                          ? 'bg-linqo-green/15 text-linqo-green'
                          : 'bg-red-500/15 text-red-400'
                      )}
                    >
                      {isValidNumber ? (
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <CircleAlert className="h-4 w-4" />
                      )}
                    </span>
                  )}
                  <Button
                    type="button"
                    onClick={handlePastePhone}
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 text-xs text-dark-text-secondary transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-dark-text"
                  >
                    <ClipboardPaste className="h-3.5 w-3.5" />
                    {t('form.paste')}
                  </Button>
                </div>
              </div>
              {phoneNumber && !isValidNumber ? (
                <p className="flex items-center gap-1.5 text-sm text-red-400">
                  <CircleAlert className="h-3.5 w-3.5 shrink-0" />
                  {t('form.phoneNumber.error')}
                </p>
              ) : (
                <p className="text-xs text-dark-text-tertiary">
                  {t('form.phoneNumber.helper')}
                </p>
              )}
            </div>

            <Button
              onClick={openChat}
              disabled={!phoneNumber || !isValidNumber}
              className={cn(
                'mt-1 h-14 w-full gap-2 rounded-xl text-base font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40',
                platform === 'telegram' && 'bg-[#229ED9] hover:bg-[#1b8fc7]',
                platform === 'viber' && 'bg-[#7360F2] hover:bg-[#6250e0]',
                platform === 'whatsapp' && 'linqo-gradient'
              )}
            >
              {platform === 'telegram' && <Send className="h-5 w-5" />}
              {platform === 'viber' && <PhoneCall className="h-5 w-5" />}
              {platform === 'whatsapp' && <MessageCircle className="h-5 w-5" />}
              {t(`form.submit.${platform}`)}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
