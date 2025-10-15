export function randomString(length: number) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}

export function isISODate(value: unknown): boolean {
  if (typeof value === 'string') {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
  }

  return false;
}

export function toLocalDateString(value: string, showTime = false, locale = 'en-US') {
  const date = new Date(value);

  const timeConfig: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(showTime ? timeConfig : {}),
  }).format(date);
}
