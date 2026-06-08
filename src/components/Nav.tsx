import { Show, type Accessor } from 'solid-js'
import { KunLink } from '~/components/kun/KunLink'
import { KunImage } from '~/components/kun/KunImage'
import {
  MdiGitHub,
  UilSun,
  UilMoon,
  UilMonitor,
  LucideLanguages
} from '~/components/kun/icons'
import { useI18n } from '~/i18n'
import type { KunThemeType } from '~/hooks/useTheme'

const GITHUB_REPO = 'https://github.com/KUN1007/kun-galgame-nav-solid'

// light -> dark -> system -> light
const nextTheme: Record<KunThemeType, KunThemeType> = {
  'kun-light': 'kun-dark',
  'kun-dark': 'kun-system',
  'kun-system': 'kun-light'
}

interface NavProps {
  theme: Accessor<KunThemeType>
  setTheme: (value: KunThemeType) => void
}

export default function Nav(props: NavProps) {
  const { t, locale, localePath, switchLocalePath } = useI18n()

  const themeTitle = () => {
    switch (props.theme()) {
      case 'kun-light':
        return t('kun.lightMode')
      case 'kun-dark':
        return t('kun.darkMode')
      default:
        return t('kun.systemMode')
    }
  }

  return (
    <nav class="border-default-200 bg-background sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-md sm:px-8">
      <KunLink
        to={localePath('/')}
        underline="none"
        color="default"
        class="flex items-center gap-2 text-lg font-medium"
      >
        <KunImage class="size-8" src="/favicon.webp" alt="kun" />
        <span>{t('kun.title')}</span>
      </KunLink>

      <div class="flex items-center gap-2">
        {/* Theme cycle: light -> dark -> system */}
        <button
          type="button"
          title={themeTitle()}
          aria-label={themeTitle()}
          onClick={() => props.setTheme(nextTheme[props.theme()])}
          class="text-default-600 hover:bg-default-500/15 flex cursor-pointer items-center justify-center rounded-lg p-2 text-xl transition-colors"
        >
          <Show when={props.theme() === 'kun-light'}>
            <UilSun />
          </Show>
          <Show when={props.theme() === 'kun-dark'}>
            <UilMoon />
          </Show>
          <Show when={props.theme() === 'kun-system'}>
            <UilMonitor />
          </Show>
        </button>

        {/* Language toggle: zh <-> en (path based) */}
        <KunLink
          to={switchLocalePath()}
          underline="none"
          color="default"
          class="border-default-200 hover:bg-default-500/15 flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm"
          aria-label={locale() === 'zh-cn' ? 'Switch to English' : '切换到中文'}
        >
          <LucideLanguages class="text-base" />
          <span>{locale() === 'zh-cn' ? 'EN' : '中文'}</span>
        </KunLink>

        {/* GitHub repository */}
        <KunLink
          to={GITHUB_REPO}
          target="_blank"
          rel="noreferrer"
          underline="none"
          color="default"
          class="hover:bg-default-500/15 flex rounded-lg p-2 text-xl"
          aria-label={t('kun.github')}
        >
          <MdiGitHub />
        </KunLink>
      </div>
    </nav>
  )
}
