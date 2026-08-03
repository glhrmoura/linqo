type HistoryDateLabels = {
  today: string;
  yesterday: string;
};

const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const formatHistoryDateTime = (
  usedAt: number,
  locale: string,
  labels: HistoryDateLabels
) => {
  const date = new Date(usedAt);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  let day: string;

  if (isSameDay(date, now)) {
    day = labels.today;
  } else if (isSameDay(date, yesterday)) {
    day = labels.yesterday;
  } else {
    day = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
    })
      .format(date)
      .replace(/\./g, '')
      .replace(/\s+de\s+/gi, ' ')
      .trim();
  }

  return { day, time };
};

export const formatHistoryPhone = (countryCode: string, phoneNumber: string) => {
  const digits = phoneNumber.replace(/\D/g, '');

  if (countryCode === '+55' && digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (countryCode === '+55' && digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return phoneNumber.trim();
};
