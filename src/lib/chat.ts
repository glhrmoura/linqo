export type Platform = 'whatsapp' | 'telegram' | 'viber';

export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const formatPhoneNumber = (selectedCountryCode: string, number: string) => {
  const cleaned = number.replace(/\D/g, '');
  const countryCodeDigits = selectedCountryCode.replace('+', '');
  return countryCodeDigits + cleaned;
};

export const buildChatUrl = (selectedPlatform: Platform, phone: string) => {
  const mobile = isMobileDevice();

  if (selectedPlatform === 'telegram') {
    return mobile ? `tg://resolve?phone=${phone}` : `https://t.me/+${phone}`;
  }

  if (selectedPlatform === 'viber') {
    return mobile
      ? `viber://chat?number=${encodeURIComponent(`+${phone}`)}`
      : `https://viber.me/${phone}`;
  }

  return mobile ? `whatsapp://send?phone=${phone}` : `https://wa.me/${phone}`;
};

export const openChatUrl = (selectedPlatform: Platform, phone: string) => {
  const chatUrl = buildChatUrl(selectedPlatform, phone);
  window.open(chatUrl, '_blank');
};
