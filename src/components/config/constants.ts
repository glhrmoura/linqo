export const LANGUAGES = [
  { value: 'pt-BR', labelKey: 'langPt' },
  { value: 'en-US', labelKey: 'langEn' },
  { value: 'es-ES', labelKey: 'langEs' },
] as const;

export type AppLanguage = (typeof LANGUAGES)[number]['value'];
