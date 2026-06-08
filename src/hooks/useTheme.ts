import {
  createEffect,
  createSignal,
  createMemo,
  onMount,
  onCleanup
} from 'solid-js'
import { cookieStorage, makePersisted } from '@solid-primitives/storage'
import { isServer } from 'solid-js/web'

export const KunTheme = ['kun-light', 'kun-dark', 'kun-system'] as const
export type KunThemeType = (typeof KunTheme)[number]
const THREE_MONTHS = 1000 * 60 * 60 * 24 * 90

// Create a reactive signal for system preference that works with SSR
const createPrefersDark = () => {
  const [prefersDark, setPrefersDark] = createSignal(false)

  onMount(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setPrefersDark(mediaQuery.matches)

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setPrefersDark(e.matches)
    mediaQuery.addEventListener('change', handler)

    onCleanup(() => {
      mediaQuery.removeEventListener('change', handler)
    })
  })

  return prefersDark
}

export const useTheme = () => {
  const prefersDark = createPrefersDark()
  const [ready, setReady] = createSignal(false)

  const signal = createSignal<KunThemeType>('kun-system')
  const [theme, setTheme] = makePersisted(signal, {
    name: 'kun-theme',
    storage: cookieStorage.withOptions({
      expires: new Date(Date.now() + THREE_MONTHS),
      path: '/',
      sameSite: 'lax',
      secure: true
    })
  })

  // Mark as ready after system preference is detected
  onMount(() => {
    setReady(true)
  })

  // Resolve the actual theme class to apply
  const resolvedTheme = createMemo(() => {
    const current = theme()
    if (current === 'kun-system') {
      // Follow system preference
      return prefersDark() ? 'kun-dark' : 'kun-light'
    }
    return current
  })

  createEffect(() => {
    // Skip on server or if document is not available
    if (isServer || typeof document === 'undefined') return

    // If theme is not 'kun-system', we can apply immediately
    // If theme is 'kun-system', wait until system preference is detected
    const current = theme()
    if (current === 'kun-system' && !ready()) {
      // Don't override inline script's work until we have proper system preference
      return
    }

    const resolved = resolvedTheme()
    const html = document.documentElement

    html.classList.remove('kun-light', 'kun-dark')
    html.classList.add(resolved)
  })

  return { theme, setTheme, resolvedTheme }
}
