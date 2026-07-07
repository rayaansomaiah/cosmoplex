import en, { type Dict } from './locales/en'
import hi from './locales/hi'
import mr from './locales/mr'
import ta from './locales/ta'
import te from './locales/te'
import kn from './locales/kn'
import ml from './locales/ml'

export type Lang = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'kn' | 'ml'
export type { Dict }

// Non-English locales may be partial; missing keys fall back to English at lookup time.
export const translations: Record<Lang, Dict> = {
  en,
  hi: hi as Dict,
  mr: mr as Dict,
  ta: ta as Dict,
  te: te as Dict,
  kn: kn as Dict,
  ml: ml as Dict,
}
