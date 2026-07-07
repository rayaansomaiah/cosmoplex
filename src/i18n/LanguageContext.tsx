import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang } from './translations'

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'English',   native: 'English' },
  { code: 'hi', label: 'Hindi',     native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi',   native: 'मराठी' },
  { code: 'ta', label: 'Tamil',     native: 'தமிழ்' },
  { code: 'te', label: 'Telugu',    native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada',   native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
]

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  /** Translate by dot-path key, e.g. t('hero.para'). Falls back to English, then the key. */
  t: (key: string) => string
  /** Fetch an array/object value by key (for lists), with English fallback. */
  tv: <T = unknown>(key: string) => T
}

const LanguageCtx = createContext<Ctx | null>(null)

function lookup(obj: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined), obj)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null
    return (saved && saved in translations ? saved : 'en') as Lang
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)

  const resolve = (key: string): unknown => {
    const path = key.split('.')
    const val = lookup(translations[lang], path)
    return val !== undefined ? val : lookup(translations.en, path)
  }

  const t = (key: string): string => {
    const v = resolve(key)
    return typeof v === 'string' ? v : key
  }

  const tv = <T,>(key: string): T => resolve(key) as T

  return <LanguageCtx.Provider value={{ lang, setLang, t, tv }}>{children}</LanguageCtx.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageCtx)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
