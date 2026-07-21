import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, CheckCircle, AlertCircle, Globe } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/ui/header';

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
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const { toast } = useToast();

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

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
        title: 'Nao foi possivel colar',
        description: 'Permita acesso a area de transferencia no navegador.',
        variant: 'destructive',
      });
    }
  };

  const formatPhoneNumber = (countryCode: string, number: string) => {
    const cleaned = number.replace(/\D/g, '');
    const countryCodeDigits = countryCode.replace('+', '');
    return countryCodeDigits + cleaned;
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
    
    let chatUrl;
    
    if (isMobileDevice()) {
      chatUrl = `whatsapp://send?phone=${formattedNumber}`;
    } else {
      chatUrl = `https://wa.me/${formattedNumber}`;
    }
    
    window.open(chatUrl, '_blank');
    
    toast({
      title: t('toast.success.title'),
      description: t('toast.success.description'),
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg" />
      <main className="flex-1 flex items-start justify-center p-4 pt-24">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="bg-dark-bg-secondary border-dark-bg-tertiary shadow-2xl">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-text-secondary">
                  {t('form.countryCode.label')}
                </label>
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="bg-dark-bg-tertiary border-dark-bg-quaternary text-dark-text focus:border-linqo-green focus:ring-linqo-green/20 h-12">
                    <div className="flex items-center gap-2">
                      <Globe size={20} className="text-dark-text-secondary" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-dark-bg-tertiary border-dark-bg-quaternary">
                    {countryCodes.map((country) => (
                      <SelectItem 
                        key={country.code} 
                        value={country.code}
                        className="text-dark-text hover:bg-dark-bg-quaternary focus:bg-dark-bg-quaternary"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-medium">{country.code}</span>
                          <span className="text-dark-text-secondary">{t(`countries.${country.countryCode}`)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-text-secondary">
                  {t('form.phoneNumber.label')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" size={20} />
                  <Input
                    type="tel"
                    placeholder={t('form.phoneNumber.placeholder')}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="pl-12 pr-28 bg-dark-bg-tertiary border-dark-bg-quaternary text-dark-text placeholder:text-dark-text-secondary focus:border-linqo-green focus:ring-linqo-green/20 text-lg h-14"
                  />
                  <Button
                    type="button"
                    onClick={handlePastePhone}
                    variant="ghost"
                    className="absolute right-2 top-1/2 h-8 -translate-y-1/2 rounded-md border border-dark-bg-quaternary bg-dark-bg-tertiary px-2 text-xs text-dark-text-secondary transition-all duration-200 hover:border-linqo-green/40 hover:bg-dark-bg-quaternary hover:text-dark-text"
                  >
                    Colar
                  </Button>
                  {phoneNumber && (
                    <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                      {isValidNumber ? (
                        <CheckCircle className="text-linqo-green" size={20} />
                      ) : (
                        <AlertCircle className="text-red-500" size={20} />
                      )}
                    </div>
                  )}
                </div>
                {phoneNumber && !isValidNumber && (
                  <p className="text-red-400 text-sm">
                    {t('form.phoneNumber.error')}
                  </p>
                )}
                <p className="text-dark-text-secondary text-xs">
                  {t('form.phoneNumber.helper')}
                </p>
              </div>
              <Button
                onClick={openChat}
                disabled={!phoneNumber || !isValidNumber}
                className="w-full linqo-gradient hover:shadow-lg hover:shadow-linqo-green/25 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg h-14 transition-all duration-300 transform hover:scale-105"
              >
                {t('form.submit')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
