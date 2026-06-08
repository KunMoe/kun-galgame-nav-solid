import * as i18n from '@solid-primitives/i18n'
import { useLocation } from '@solidjs/router'
import {
  createContext,
  createMemo,
  useContext,
  type Accessor,
  type ParentComponent
} from 'solid-js'
import zh from '../language/zh-cn/kun.json'
import en from '../language/en-us/kun.json'

export type Locale = 'zh-cn' | 'en-us'

const flatDicts = {
  'zh-cn': i18n.flatten({ kun: zh }),
  'en-us': i18n.flatten({ kun: en })
}

export type Dictionary = (typeof flatDicts)['zh-cn']

interface I18nState {
  /** Current locale, derived from the URL path (default: zh-cn). */
  locale: Accessor<Locale>
  /** Translator over the flattened dictionary, e.g. t('kun.forum.title'). */
  t: i18n.Translator<Dictionary>
  /** Prefix a zh-relative path with the current locale (en -> /en/...). */
  localePath: (path: string) => string
  /** The current path switched to the other locale (for the language toggle). */
  switchLocalePath: () => string
}

const isEnPath = (pathname: string) =>
  pathname === '/en' || pathname.startsWith('/en/')

const I18nContext = createContext<I18nState>()

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within an <I18nProvider>')
  }
  return ctx
}

export const I18nProvider: ParentComponent = (props) => {
  const location = useLocation()

  const locale = createMemo<Locale>(() =>
    isEnPath(location.pathname) ? 'en-us' : 'zh-cn'
  )

  const dict = createMemo(() => flatDicts[locale()])
  const t = i18n.translator(dict, i18n.resolveTemplate)

  const localePath = (path: string) => {
    if (locale() === 'zh-cn') return path
    return path === '/' ? '/en' : `/en${path}`
  }

  const switchLocalePath = () => {
    const { pathname, search } = location
    if (isEnPath(pathname)) {
      const stripped = pathname.slice('/en'.length)
      return (stripped || '/') + search
    }
    return (pathname === '/' ? '/en' : `/en${pathname}`) + search
  }

  const state: I18nState = { locale, t, localePath, switchLocalePath }

  return (
    <I18nContext.Provider value={state}>{props.children}</I18nContext.Provider>
  )
}
