import { type ParentComponent, Suspense } from 'solid-js'
import { Title, Meta } from '@solidjs/meta'
import Nav from '~/components/Nav'
import { KunImage } from '~/components/kun/KunImage'
import { useTheme } from '~/hooks/useTheme'
import { useI18n } from '~/i18n'

export const RootLayout: ParentComponent = (props) => {
  // Single source of truth for the theme; the toggle in <Nav> drives it.
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()

  return (
    <div class="text-default-900 min-h-lvh">
      <Title>{t('kun.title')}</Title>
      <Meta name="description" content={t('kun.title')} />

      {/* Background layer */}
      <div class="fixed inset-0 -z-10">
        <div class="absolute inset-0 bg-white dark:bg-black" />
        <div class="absolute inset-0 opacity-10 dark:opacity-15">
          <KunImage class="h-full w-full object-cover" src="/bg.avif" alt="" />
        </div>
      </div>

      <Nav theme={theme} setTheme={setTheme} />

      <Suspense>{props.children}</Suspense>
    </div>
  )
}
