import { useState } from 'react';

import { MessageCircle, Phone, CheckCircle, AlertCircle, Globe } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const countryCodes = [
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+34', country: 'Espanha', flag: '🇪🇸' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧' },
  { code: '+33', country: 'França', flag: '🇫🇷' },
  { code: '+49', country: 'Alemanha', flag: '🇩🇪' },
  { code: '+39', country: 'Itália', flag: '🇮🇹' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colômbia', flag: '🇨🇴' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japão', flag: '🇯🇵' },
  { code: '+91', country: 'Índia', flag: '🇮🇳' },
];

const Index = () => {
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
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

  const formatPhoneNumber = (countryCode: string, number: string) => {
    const cleaned = number.replace(/\D/g, '');
    const countryCodeDigits = countryCode.replace('+', '');
    return countryCodeDigits + cleaned;
  };

  const openWhatsApp = () => {
    if (!isValidNumber) {
      toast({
        title: 'Número inválido',
        description: 'Por favor, insira um número de telefone válido.',
        variant: 'destructive',
      });
      return;
    }

    const formattedNumber = formatPhoneNumber(countryCode, phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}${message ? `?text=${encodedMessage}` : ''}`;
    
    console.log('Opening WhatsApp with URL:', whatsappUrl);
    console.log('Country Code:', countryCode, 'Phone Number:', phoneNumber, 'Formatted:', formattedNumber);
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: 'WhatsApp aberto!',
      description: 'A conversa foi iniciada em uma nova aba.',
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <MessageCircle 
                size={64} 
                className="text-whatsapp-green" 
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-dark-text">
            WhatsApp <br /> Direct Message
          </h1>
          <p className="text-dark-text-secondary text-lg">
            Inicie conversas no WhatsApp sem adicionar aos contatos
          </p>
        </div>
        <Card className="bg-dark-bg-secondary border-dark-bg-tertiary shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-dark-text">
              Digite o número
            </CardTitle>
            <CardDescription className="text-dark-text-secondary">
              Escolha o país e insira o número de telefone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text-secondary">
                Código do país
              </label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="bg-dark-bg-tertiary border-dark-bg-quaternary text-dark-text focus:border-whatsapp-green focus:ring-whatsapp-green/20 h-12">
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
                        <span className="text-dark-text-secondary">{country.country}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text-secondary">
                Número de telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" size={20} />
                <Input
                  type="tel"
                  placeholder="Ex: 11 99999-9999"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="pl-12 pr-12 bg-dark-bg-tertiary border-dark-bg-quaternary text-dark-text placeholder:text-dark-text-secondary focus:border-whatsapp-green focus:ring-whatsapp-green/20 text-lg h-14"
                />
                {phoneNumber && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValidNumber ? (
                      <CheckCircle className="text-whatsapp-green" size={20} />
                    ) : (
                      <AlertCircle className="text-red-500" size={20} />
                    )}
                  </div>
                )}
              </div>
              {phoneNumber && !isValidNumber && (
                <p className="text-red-400 text-sm">
                  Número deve ter entre 8 e 15 dígitos
                </p>
              )}
              <p className="text-dark-text-secondary text-xs">
                Digite apenas os números sem o código do país
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text-secondary">
                Mensagem inicial (opcional)
              </label>
              <textarea
                placeholder="Digite uma mensagem para iniciar a conversa..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-dark-bg-tertiary border border-dark-bg-quaternary rounded-lg text-dark-text placeholder:text-dark-text-secondary focus:border-whatsapp-green focus:ring-2 focus:ring-whatsapp-green/20 resize-none"
                rows={3}
              />
            </div>
            <Button
              onClick={openWhatsApp}
              disabled={!phoneNumber || !isValidNumber}
              className="w-full whatsapp-gradient hover:shadow-lg hover:shadow-whatsapp-green/25 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg h-14 transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="mr-2" size={24} />
              Abrir no WhatsApp
            </Button>
          </CardContent>
        </Card>
        <div className="text-center space-y-2">
          <p className="text-dark-text-secondary text-sm">
            Funciona em desktop e mobile
          </p>
          <p className="text-dark-text-secondary text-xs">
            Seus dados não são armazenados ou compartilhados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
